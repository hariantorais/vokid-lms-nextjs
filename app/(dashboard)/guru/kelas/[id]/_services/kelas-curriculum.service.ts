import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { ClassRecord, Subject, Module, Lesson, Assignment } from '@/types/database';

export interface ClassCurriculumDetail {
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
}

export async function getKelasCurriculumDetail(
  classId: string
): Promise<ActionResponse<ClassCurriculumDetail>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data kelas
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .single();

    if (classError || !classData) {
      return { success: false, error: 'Kelas tidak ditemukan.' };
    }

    // 2. Ambil subjects di kelas ini
    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', classId)
      .order('name', { ascending: true });

    if (subjectsError) {
      return { success: false, error: 'Gagal memuat mata pelajaran.' };
    }

    const subjectIds = (subjectsData ?? []).map((s) => s.id);

    // 3. Ambil modules
    const { data: modulesData, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .in('subject_id', subjectIds.length > 0 ? subjectIds : ['00000000-0000-0000-0000-000000000000'])
      .order('order_index', { ascending: true });

    if (modulesError) {
      return { success: false, error: 'Gagal memuat bab/modul.' };
    }

    const moduleIds = (modulesData ?? []).map((m) => m.id);

    // 4. Ambil lessons
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .in('module_id', moduleIds.length > 0 ? moduleIds : ['00000000-0000-0000-0000-000000000000'])
      .order('order_index', { ascending: true });

    if (lessonsError) {
      return { success: false, error: 'Gagal memuat materi.' };
    }

    const lessonIds = (lessonsData ?? []).map((l) => l.id);

    // 5. Ambil assignments
    const { data: assignmentsData } = await supabase
      .from('assignments')
      .select('*')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000'])
      .order('created_at', { ascending: true });

    // Strukturkan hierarki
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
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return { success: false, error: msg };
  }
}
