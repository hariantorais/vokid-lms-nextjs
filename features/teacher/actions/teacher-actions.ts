'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import {
  createModuleSchema,
  updateModuleSchema,
  updateAssignmentSchema,
} from '../validations';
import { cleanModuleTitle } from '@/lib/formatters';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { ClassRecord, Subject, Module, Lesson, Assignment } from '@/types/database';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

function parsePayload(input: unknown): Record<string, unknown> {
  if (input instanceof FormData) {
    const obj: Record<string, unknown> = {};
    input.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  if (typeof input === 'object' && input !== null) {
    return input as Record<string, unknown>;
  }
  return {};
}

async function verifyTeacherRole(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<{ authorized: true; userId: string } | { authorized: false; error: string }> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    if (process.env.NODE_ENV === 'development') {
      return { authorized: true, userId: 'teacher-dev' };
    }
    return { authorized: false, error: 'Sesi tidak valid atau telah kedaluwarsa. Silakan login kembali.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    if (process.env.NODE_ENV === 'development') {
      return { authorized: true, userId: user.id };
    }
    return { authorized: false, error: 'Profil pengguna tidak ditemukan dalam basis data.' };
  }

  if (profile.role !== 'GURU') {
    return { authorized: false, error: 'Akses ditolak. Tindakan ini hanya boleh dilakukan oleh Guru.' };
  }

  return { authorized: true, userId: user.id };
}

/**
 * Server Action: Pembuatan Modul Pembelajaran Baru oleh Guru
 */
export async function createModuleAction(
  payload: unknown
): Promise<ActionResponse<{ id: string }>> {
  try {
    const raw = parsePayload(payload);
    const parsed = createModuleSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return { success: false, error: issue ? issue.message : 'Data modul tidak valid.' };
    }

    const { subjectId, title, orderIndex } = parsed.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const sanitizedTitle = cleanModuleTitle(title) || title;

    const { data: newModule, error: insertError } = await supabase
      .from('modules')
      .insert({
        subject_id: subjectId,
        title: sanitizedTitle,
        order_index: orderIndex,
        is_published: true,
      })
      .select('id')
      .single();

    if (insertError || !newModule) {
      console.error('[Action Error] Gagal insert modul:', insertError);
      return {
        success: false,
        error: `Gagal menyimpan modul: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: newModule.id },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in createModuleAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Pembaruan Modul Pembelajaran oleh Guru
 */
export async function updateModuleAction(
  payload: unknown
): Promise<ActionResponse<{ id: string }>> {
  try {
    const raw = parsePayload(payload);
    const parsed = updateModuleSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return { success: false, error: issue ? issue.message : 'Data pembaruan modul tidak valid.' };
    }

    const { moduleId, title, orderIndex, isPublished } = parsed.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const updateData: {
      title?: string;
      order_index?: number;
      is_published?: boolean;
    } = {};

    if (title !== undefined) updateData.title = cleanModuleTitle(title) || title;
    if (orderIndex !== undefined) updateData.order_index = orderIndex;
    if (isPublished !== undefined) updateData.is_published = isPublished;

    const { data: updatedModule, error: updateError } = await supabase
      .from('modules')
      .update(updateData)
      .eq('id', moduleId)
      .select('id')
      .single();

    if (updateError || !updatedModule) {
      console.error('[Action Error] Gagal update modul:', updateError);
      return {
        success: false,
        error: `Gagal memperbarui modul: ${updateError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: updatedModule.id },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in updateModuleAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Penghapusan Modul Pembelajaran oleh Guru
 */
export async function deleteModuleAction(
  moduleId: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    if (!moduleId || !UUID_REGEX.test(moduleId)) {
      return { success: false, error: 'ID modul tidak valid (harus format UUID).' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    // 1. Proteksi Relasi: Periksa apakah modul/bab ini masih memiliki materi (lessons)
    const { count: lessonCount, error: checkError } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true })
      .eq('module_id', moduleId);

    if (checkError) {
      console.error('[Action Error] Gagal memeriksa relasi materi pada bab:', checkError);
      return { success: false, error: 'Gagal memverifikasi keterkaitan materi pada bab ini.' };
    }

    if (lessonCount && lessonCount > 0) {
      return {
        success: false,
        error: `Bab/Modul tidak dapat dihapus karena masih memiliki ${lessonCount} materi pembelajaran di dalamnya. Pindahkan atau hapus materi terlebih dahulu.`,
      };
    }

    const { error: deleteError } = await supabase
      .from('modules')
      .delete()
      .eq('id', moduleId);

    if (deleteError) {
      console.error('[Action Error] Gagal menghapus modul:', deleteError);
      return {
        success: false,
        error: `Gagal menghapus modul: ${deleteError.message}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: moduleId },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in deleteModuleAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus modul.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Pembaruan Penugasan Siswa oleh Guru
 */
export async function updateAssignmentAction(
  payload: unknown
): Promise<ActionResponse<{ id: string }>> {
  try {
    const raw = parsePayload(payload);
    const parsed = updateAssignmentSchema.safeParse(raw);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return { success: false, error: issue ? issue.message : 'Data pembaruan tugas tidak valid.' };
    }

    const { assignmentId, type, prompt, instructionAudioUrl, dueDate } = parsed.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const updateData: {
      type?: 'VOICE_TASK' | 'PHOTO_HOMEWORK';
      prompt?: string;
      instruction_audio_url?: string | null;
      due_date?: string | null;
    } = {};

    if (type !== undefined) updateData.type = type;
    if (prompt !== undefined) updateData.prompt = prompt;
    if (instructionAudioUrl !== undefined) updateData.instruction_audio_url = instructionAudioUrl;
    if (dueDate !== undefined) updateData.due_date = dueDate;

    const { data: updatedAssignment, error: updateError } = await supabase
      .from('assignments')
      .update(updateData)
      .eq('id', assignmentId)
      .select('id')
      .single();

    if (updateError || !updatedAssignment) {
      console.error('[Action Error] Gagal update penugasan:', updateError);
      return {
        success: false,
        error: `Gagal memperbarui penugasan: ${updateError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: updatedAssignment.id },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in updateAssignmentAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Penghapusan Penugasan Siswa oleh Guru
 */
export async function deleteAssignmentAction(
  assignmentId: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    if (!assignmentId || !UUID_REGEX.test(assignmentId)) {
      return { success: false, error: 'ID penugasan tidak valid (harus format UUID).' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    // 1. Proteksi Relasi: Periksa apakah ada siswa yang sudah mengumpulkan tugas ini
    const { count: submissionCount, error: checkError } = await supabase
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('assignment_id', assignmentId);

    if (checkError) {
      console.error('[Action Error] Gagal memeriksa keterkaitan pengumpulan tugas:', checkError);
      return { success: false, error: 'Gagal memverifikasi pengumpulan tugas siswa.' };
    }

    if (submissionCount && submissionCount > 0) {
      return {
        success: false,
        error: `Penugasan tidak dapat dihapus karena sudah ada ${submissionCount} jawaban/rekaman yang dikumpulkan oleh siswa. Menghapusnya akan menghilangkan data nilai siswa.`,
      };
    }

    const { error: deleteError } = await supabase
      .from('assignments')
      .delete()
      .eq('id', assignmentId);

    if (deleteError) {
      console.error('[Action Error] Gagal menghapus penugasan:', deleteError);
      return {
        success: false,
        error: `Gagal menghapus penugasan: ${deleteError.message}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: assignmentId },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in deleteAssignmentAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus penugasan.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Pembuatan Mata Pelajaran Baru oleh Guru
 */
export async function createSubjectAction(
  payload: unknown
): Promise<ActionResponse<{ id: string; name: string }>> {
  try {
    const raw = parsePayload(payload);
    const classId = typeof raw.classId === 'string' ? raw.classId.trim() : '';
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const code = typeof raw.code === 'string' ? raw.code.trim() : name.slice(0, 4).toUpperCase();

    if (!classId || !UUID_REGEX.test(classId)) {
      return { success: false, error: 'ID kelas tidak valid.' };
    }

    if (!name || name.length < 2) {
      return { success: false, error: 'Nama mata pelajaran minimal 2 karakter.' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const { data: newSubject, error: insertError } = await supabase
      .from('subjects')
      .insert({
        class_id: classId,
        name,
        code,
      })
      .select('id, name')
      .single();

    if (insertError || !newSubject) {
      console.error('[Action Error] Gagal insert mata pelajaran:', insertError);
      return {
        success: false,
        error: `Gagal membuat mata pelajaran: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: newSubject.id, name: newSubject.name },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in createSubjectAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat mata pelajaran.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Pembaruan Nama Mata Pelajaran oleh Guru
 */
export async function updateSubjectAction(
  payload: unknown
): Promise<ActionResponse<{ id: string; name: string }>> {
  try {
    const raw = parsePayload(payload);
    const subjectId = typeof raw.subjectId === 'string' ? raw.subjectId.trim() : '';
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';

    if (!subjectId || !UUID_REGEX.test(subjectId)) {
      return { success: false, error: 'ID mata pelajaran tidak valid.' };
    }

    if (!name || name.length < 2) {
      return { success: false, error: 'Nama mata pelajaran minimal 2 karakter.' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const { data: updatedSubject, error: updateError } = await supabase
      .from('subjects')
      .update({ name })
      .eq('id', subjectId)
      .select('id, name')
      .single();

    if (updateError || !updatedSubject) {
      console.error('[Action Error] Gagal update mata pelajaran:', updateError);
      return {
        success: false,
        error: `Gagal memperbarui mata pelajaran: ${updateError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: updatedSubject.id, name: updatedSubject.name },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in updateSubjectAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui mata pelajaran.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Penghapusan Mata Pelajaran oleh Guru
 */
export async function deleteSubjectAction(
  subjectId: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    if (!subjectId || !UUID_REGEX.test(subjectId)) {
      return { success: false, error: 'ID mata pelajaran tidak valid.' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    // 1. Proteksi Relasi: Periksa apakah mata pelajaran ini masih memiliki bab/modul
    const { count: moduleCount, error: checkError } = await supabase
      .from('modules')
      .select('*', { count: 'exact', head: true })
      .eq('subject_id', subjectId);

    if (checkError) {
      console.error('[Action Error] Gagal memeriksa relasi bab pada mata pelajaran:', checkError);
      return { success: false, error: 'Gagal memverifikasi keterkaitan bab pada mata pelajaran ini.' };
    }

    if (moduleCount && moduleCount > 0) {
      return {
        success: false,
        error: `Mata pelajaran tidak dapat dihapus karena masih memiliki ${moduleCount} bab/modul di dalamnya. Hapus bab/modul terlebih dahulu.`,
      };
    }

    const { error: deleteError } = await supabase
      .from('subjects')
      .delete()
      .eq('id', subjectId);

    if (deleteError) {
      console.error('[Action Error] Gagal menghapus mata pelajaran:', deleteError);
      return {
        success: false,
        error: `Gagal menghapus mata pelajaran: ${deleteError.message}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return { success: true, data: { id: subjectId } };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in deleteSubjectAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus mata pelajaran.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Pembuatan Kelas Baru oleh Guru
 */
export async function createClassAction(
  payload: unknown
): Promise<ActionResponse<{ id: string; name: string }>> {
  try {
    const raw = parsePayload(payload);
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const gradeLevel = typeof raw.gradeLevel === 'number' ? raw.gradeLevel : Number(raw.gradeLevel) || 1;
    const academicYear = typeof raw.academicYear === 'string' ? raw.academicYear.trim() : '2026/2027';

    if (!name || name.length < 2) {
      return { success: false, error: 'Nama kelas minimal 2 karakter.' };
    }

    if (gradeLevel < 1 || gradeLevel > 6) {
      return { success: false, error: 'Tingkat kelas harus antara 1 sampai 6 SD.' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const { data: newClass, error: insertError } = await supabase
      .from('classes')
      .insert({
        name,
        grade_level: gradeLevel,
        academic_year: academicYear,
        created_by: authCheck.userId === 'teacher-dev' ? null : authCheck.userId,
      })
      .select('id, name')
      .single();

    if (insertError || !newClass) {
      console.error('[Action Error] Gagal insert kelas:', insertError);
      return {
        success: false,
        error: `Gagal membuat kelas: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/guru/materi');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: newClass.id, name: newClass.name },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in createClassAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat membuat kelas.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Mengambil kurikulum kelas terpilih secara dinamis dan instan
 */
export async function getClassCurriculumAction(
  classId: string
): Promise<ActionResponse<{
  classData: ClassRecord;
  subjects: Array<
    Subject & {
      modules: Array<
        Module & {
          lessons: Array<
            Lesson & {
              assignments: Assignment[];
            }
          >;
        }
      >;
    }
  >;
}>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data kelas
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .maybeSingle();

    if (classError || !classData) {
      return { success: false, error: 'Data kelas tidak ditemukan di basis data.' };
    }

    // 2. Ambil subjects
    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', classId)
      .order('created_at', { ascending: true });

    if (subjectsError) {
      return { success: false, error: 'Gagal memuat mata pelajaran kelas.' };
    }

    const subjectIds = (subjectsData ?? []).map((s) => s.id);

    // 3. Ambil modules
    const { data: modulesData, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .in('subject_id', subjectIds.length > 0 ? subjectIds : ['00000000-0000-0000-0000-000000000000'])
      .order('order_index', { ascending: true });

    if (modulesError) {
      return { success: false, error: 'Gagal memuat modul pembelajaran.' };
    }

    const moduleIds = (modulesData ?? []).map((m) => m.id);

    // 4. Ambil lessons
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .in('module_id', moduleIds.length > 0 ? moduleIds : ['00000000-0000-0000-0000-000000000000'])
      .order('order_index', { ascending: true });

    if (lessonsError) {
      return { success: false, error: 'Gagal memuat materi pembelajaran.' };
    }

    const lessonIds = (lessonsData ?? []).map((l) => l.id);

    // 5. Ambil assignments
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from('assignments')
      .select('*, submissions(*)')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000'])
      .order('created_at', { ascending: true });

    if (assignmentsError) {
      console.warn('[Action Warning] Gagal mengambil tugas:', assignmentsError.message);
    }

    const structuredSubjects = (subjectsData ?? []).map((subj) => {
      const relatedModules = (modulesData ?? [])
        .filter((m) => m.subject_id === subj.id)
        .map((mod) => {
          const relatedLessons = (lessonsData ?? [])
            .filter((l) => l.module_id === mod.id)
            .map((les) => {
              const relatedAssignments = (assignmentsData ?? []).filter(
                (a) => a.lesson_id === les.id
              );
              return {
                ...les,
                assignments: relatedAssignments,
              };
            });

          return {
            ...mod,
            lessons: relatedLessons,
          };
        });

      return {
        ...subj,
        modules: relatedModules,
      };
    });

    return {
      success: true,
      data: {
        classData: classData as unknown as ClassRecord,
        subjects: structuredSubjects,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat kurikulum kelas.';
    return { success: false, error: msg };
  }
}

