import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { Lesson, Module, Subject, ClassRecord, Assignment, Submission } from '@/types/database';

export interface PelajaranDetailData {
  lesson: Lesson & {
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
    assignments: Array<
      Assignment & {
        submissions: Submission[];
      }
    >;
  };
}

export async function getPelajaranDetail(
  lessonId: string
): Promise<ActionResponse<PelajaranDetailData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data lesson berserta relasi modul, mapel, kelas
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select('*, modules(*, subjects(*, classes(*)))')
      .eq('id', lessonId)
      .single();

    if (lessonError || !lessonData) {
      return { success: false, error: 'Pelajaran / Materi tidak ditemukan.' };
    }

    const modData = lessonData.modules as unknown as Module & {
      subjects: Subject & { classes: ClassRecord };
    };

    // 2. Ambil penugasan dan pengumpulan siswa untuk pelajaran ini
    const { data: assignmentsData } = await supabase
      .from('assignments')
      .select('*, submissions(*)')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: true });

    return {
      success: true,
      data: {
        lesson: {
          ...lessonData,
          module: {
            id: modData.id,
            title: modData.title,
            order_index: modData.order_index,
            subject_id: modData.subject_id,
            is_published: modData.is_published,
            target_semester: modData.target_semester ?? null,
            week_target: modData.week_target ?? null,
            created_at: modData.created_at,
            subject: {
              id: modData.subjects.id,
              name: modData.subjects.name,
              code: modData.subjects.code,
              class_id: modData.subjects.class_id,
              created_at: modData.subjects.created_at,
              class: modData.subjects.classes,
            },
            lessons: [],
          },
          assignments: (assignmentsData ?? []) as unknown as Array<
            Assignment & { submissions: Submission[] }
          >,
        },
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return { success: false, error: msg };
  }
}
