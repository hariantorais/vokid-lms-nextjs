import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { Module, Subject, ClassRecord, Lesson, Assignment } from '@/types/database';

export interface BabDetailData {
  module: Module & {
    subject: Subject & {
      class: ClassRecord;
    };
    lessons: Array<
      Lesson & {
        assignments: Assignment[];
      }
    >;
  };
}

export async function getBabDetail(babId: string): Promise<ActionResponse<BabDetailData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data module/bab
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('*, subjects(*, classes(*))')
      .eq('id', babId)
      .single();

    if (moduleError || !moduleData) {
      return { success: false, error: 'Bab tidak ditemukan.' };
    }

    // 2. Ambil lessons di dalam bab ini
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', babId)
      .order('order_index', { ascending: true });

    if (lessonsError) {
      return { success: false, error: 'Gagal memuat materi bab.' };
    }

    const lessonIds = (lessonsData ?? []).map((l) => l.id);

    // 3. Ambil assignments di lessons bab ini
    const { data: assignmentsData } = await supabase
      .from('assignments')
      .select('*')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000'])
      .order('created_at', { ascending: true });

    // Gabungkan lessons dengan assignments
    const lessonsWithAssignments = (lessonsData ?? []).map((l) => ({
      ...l,
      assignments: (assignmentsData ?? []).filter((a) => a.lesson_id === l.id),
    }));

    const subjectData = moduleData.subjects as unknown as Subject & { classes: ClassRecord };

    return {
      success: true,
      data: {
        module: {
          id: moduleData.id,
          title: moduleData.title,
          order_index: moduleData.order_index,
          subject_id: moduleData.subject_id,
          is_published: moduleData.is_published,
          created_at: moduleData.created_at,
          subject: {
            id: subjectData.id,
            name: subjectData.name,
            code: subjectData.code,
            class_id: subjectData.class_id,
            created_at: subjectData.created_at,
            class: subjectData.classes,
          },
          lessons: lessonsWithAssignments,
        },
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return { success: false, error: msg };
  }
}
