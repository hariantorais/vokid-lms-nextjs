'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import {
  evaluateCompetencySchema,
  createDailyScheduleSchema,
  completeLessonSessionSchema,
} from '@/features/teacher/validations/acceleration-schema';
import type { ActionResponse } from '@/features/shared/types/storage';
import type {
  LessonSchedule,
  LearningCompetencyEvaluation,
  Lesson,
  Module,
  Subject,
  ClassRecord,
  Profile,
} from '@/types/database';

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
    return { authorized: false, error: 'Sesi kedaluwarsa atau belum masuk. Silakan login kembali.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const role = profile?.role ?? (user.user_metadata?.role as string | undefined);

  if (!role || role !== 'GURU') {
    return { authorized: false, error: 'Akses ditolak. Tindakan ini hanya boleh dilakukan oleh Guru.' };
  }

  return { authorized: true, userId: user.id };
}

/**
 * Server Action: Simpan / Update Evaluasi Formatif Ketercapaian TP (One-Tap Micro-Assessment)
 */
export async function evaluateCompetencyAction(
  formData: unknown
): Promise<ActionResponse<LearningCompetencyEvaluation>> {
  try {
    const rawPayload = parsePayload(formData);
    const parsed = evaluateCompetencySchema.safeParse(rawPayload);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((err) => err.message).join(', ');
      return { success: false, error: errorMsg };
    }

    const { studentId, lessonId, tpIndicatorText, masteryLevel, notes } = parsed.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    // Upsert evaluasi berdasarkan kombinasi studentId + lessonId + tpIndicatorText
    const { data: existingEval } = await supabase
      .from('learning_competency_evaluations')
      .select('id')
      .eq('student_id', studentId)
      .eq('lesson_id', lessonId)
      .eq('tp_indicator_text', tpIndicatorText)
      .maybeSingle();

    let evaluationResult: LearningCompetencyEvaluation | null = null;

    if (existingEval) {
      const { data, error } = await supabase
        .from('learning_competency_evaluations')
        .update({
          mastery_level: masteryLevel,
          notes: notes ?? null,
          evaluated_at: new Date().toISOString(),
        })
        .eq('id', existingEval.id)
        .select('*')
        .single();

      if (error || !data) {
        return { success: false, error: error?.message ?? 'Gagal memperbarui evaluasi kompetensi.' };
      }
      evaluationResult = data;
    } else {
      const { data, error } = await supabase
        .from('learning_competency_evaluations')
        .insert({
          student_id: studentId,
          lesson_id: lessonId,
          tp_indicator_text: tpIndicatorText,
          mastery_level: masteryLevel,
          notes: notes ?? null,
          evaluated_at: new Date().toISOString(),
        })
        .select('*')
        .single();

      if (error || !data) {
        return { success: false, error: error?.message ?? 'Gagal menyimpan evaluasi kompetensi.' };
      }
      evaluationResult = data;
    }

    revalidatePath(`/guru/meja-ajar/${lessonId}`);
    revalidatePath(`/guru/pelajaran/${lessonId}`);

    return { success: true, data: evaluationResult };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat evaluasi.';
    return { success: false, error: message };
  }
}

/**
 * Server Action: Tandai Selesai Sesi Ajar (Meja Ajar)
 * Otomatis memperbarui status di daily_schedules (menjadi COMPLETED) dan mencatat lesson_completions
 */
export async function completeLessonSessionAction(
  formData: unknown
): Promise<ActionResponse<{ completedAt: string }>> {
  try {
    const rawPayload = parsePayload(formData);
    const parsed = completeLessonSessionSchema.safeParse(rawPayload);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((err) => err.message).join(', ');
      return { success: false, error: errorMsg };
    }

    const { lessonId, studentId, scheduledDate } = parsed.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const now = new Date().toISOString();
    const today = scheduledDate ?? now.split('T')[0];

    // Jika studentId diberikan, update spesifik jadwal siswa tersebut
    if (studentId) {
      const { data: existingSchedule } = await supabase
        .from('lesson_schedules')
        .select('id')
        .eq('student_id', studentId)
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (existingSchedule) {
        await supabase
          .from('lesson_schedules')
          .update({
            status: 'COMPLETED',
            completed_at: now,
          })
          .eq('id', existingSchedule.id);
      } else {
        await supabase.from('lesson_schedules').insert({
          student_id: studentId,
          lesson_id: lessonId,
          scheduled_date: today,
          time_block: 'PAGI',
          status: 'COMPLETED',
          completed_at: now,
        });
      }

      // Catat juga ke lesson_completions jika belum tercatat
      await supabase
        .from('lesson_completions')
        .upsert(
          {
            lesson_id: lessonId,
            student_id: studentId,
            completed_at: now,
          },
          { onConflict: 'lesson_id, student_id' }
        );
    } else {
      // Jika studentId tidak ditentukan (selesai sesi kelas umum), update semua schedule PENDING hari ini untuk lesson tersebut
      await supabase
        .from('lesson_schedules')
        .update({
          status: 'COMPLETED',
          completed_at: now,
        })
        .eq('lesson_id', lessonId)
        .eq('scheduled_date', today);
    }

    revalidatePath(`/guru/meja-ajar/${lessonId}`);
    revalidatePath(`/guru/pelajaran/${lessonId}`);
    revalidatePath('/guru');

    return { success: true, data: { completedAt: now } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat menyelesaikan sesi.';
    return { success: false, error: message };
  }
}

/**
 * Server Action: Buat Jadwal Harian Siswa
 */
export async function createDailyScheduleAction(
  formData: unknown
): Promise<ActionResponse<LessonSchedule>> {
  try {
    const rawPayload = parsePayload(formData);
    const parsed = createDailyScheduleSchema.safeParse(rawPayload);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((err) => err.message).join(', ');
      return { success: false, error: errorMsg };
    }

    const { studentId, lessonId, scheduledDate, timeBlock } = parsed.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const { data, error } = await supabase
      .from('lesson_schedules')
      .upsert(
        {
          student_id: studentId,
          lesson_id: lessonId,
          scheduled_date: scheduledDate,
          time_block: timeBlock,
          status: 'PENDING',
        },
        { onConflict: 'student_id, lesson_id, scheduled_date' }
      )
      .select('*')
      .single();

    if (error || !data) {
      return { success: false, error: error?.message ?? 'Gagal membuat jadwal harian.' };
    }

    revalidatePath(`/guru/meja-ajar/${lessonId}`);
    revalidatePath(`/siswa/jadwal`);

    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat membuat jadwal.';
    return { success: false, error: message };
  }
}

export interface TeachingDeskData {
  lesson: Lesson;
  module: Module;
  classRecord: ClassRecord;
  subject: Subject;
  students: Array<
    Pick<Profile, 'id' | 'full_name' | 'avatar_url' | 'role' | 'created_at'> & {
      evaluation: LearningCompetencyEvaluation | null;
      schedule: LessonSchedule | null;
      isCompleted: boolean;
    }
  >;
}

/**
 * Service: Ambil Data Meja Ajar Terpadu (Data Lesson + Panduan + Daftar Siswa + Status Evaluasi)
 */
export async function getLessonTeachingDeskData(
  lessonId: string
): Promise<ActionResponse<TeachingDeskData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil Lesson + Modul + Mapel + Kelas
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select('*, modules(*, subjects(*, classes(*)))')
      .eq('id', lessonId)
      .single();

    if (lessonError || !lessonData) {
      return { success: false, error: 'Pelajaran tidak ditemukan.' };
    }

    const modData = lessonData.modules as unknown as Module & {
      subjects: Subject & { classes: ClassRecord };
    };

    const classData = modData.subjects.classes;
    const subjectData = modData.subjects;

    // 2. Ambil Siswa Aktif di sistem (role SISWA)
    const { data: studentsData } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role, created_at')
      .eq('role', 'SISWA')
      .order('full_name', { ascending: true });

    const studentList = studentsData ?? [];

    // 3. Ambil Evaluasi dan Penyelesaian Sesi untuk Lesson ini
    const { data: evaluations } = await supabase
      .from('learning_competency_evaluations')
      .select('*')
      .eq('lesson_id', lessonId);

    const { data: completions } = await supabase
      .from('lesson_completions')
      .select('student_id, completed_at')
      .eq('lesson_id', lessonId);

    const { data: schedules } = await supabase
      .from('lesson_schedules')
      .select('*')
      .eq('lesson_id', lessonId);

    const completedStudentIds = new Set((completions ?? []).map((c) => c.student_id));
    const evalMap = new Map((evaluations ?? []).map((e) => [e.student_id, e]));
    const scheduleMap = new Map((schedules ?? []).map((s) => [s.student_id, s]));

    const enrichedStudents = studentList.map((st) => ({
      ...st,
      evaluation: evalMap.get(st.id) ?? null,
      schedule: scheduleMap.get(st.id) ?? null,
      isCompleted: completedStudentIds.has(st.id),
    }));

    return {
      success: true,
      data: {
        lesson: lessonData as Lesson,
        module: modData,
        subject: subjectData,
        classRecord: classData,
        students: enrichedStudents,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal memuat data meja ajar.';
    return { success: false, error: message };
  }
}
