import { createClient } from '@/lib/supabase/server';
import type { Lesson, Assignment } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StudentAssignment extends Assignment {
  hasSubmitted?: boolean;
  submissionId?: string;
  grade?: number | null;
  score?: number | null;
  submissionStatus?: 'PENDING' | 'GRADED' | 'RESUBMIT' | null;
  submittedAt?: string | null;
}

export interface LessonWithAssignment extends Lesson {
  assignments: StudentAssignment[];
}

/**
 * Service: Mengambil materi dan tugas dalam satu modul
 */
export async function getStudentLessons(
  moduleId: string
): Promise<ActionResponse<LessonWithAssignment[]>> {
  try {
    const supabase = await createClient();

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', moduleId)
      .order('order_index', { ascending: true });

    if (lessonsError) {
      console.error('[Action Error] Gagal mengambil materi modul:', lessonsError);
      return { success: false, error: 'Materi tidak dapat dimuat.' };
    }

    const lessonIds = (lessons ?? []).map((l) => l.id);

    const { data: assignments, error: assignmentsError } = await supabase
      .from('assignments')
      .select('*')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000']);

    if (assignmentsError) {
      console.error('[Action Error] Gagal mengambil tugas modul:', assignmentsError);
      return { success: false, error: 'Tugas tidak dapat dimuat.' };
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeStudentId =
      user?.id ??
      (process.env.NODE_ENV === 'development'
        ? '22222222-2222-2222-2222-222222222222'
        : undefined);

    const assignmentIds = (assignments ?? []).map((a) => a.id);

    interface StudentSubmissionSummary {
      id: string;
      assignment_id: string;
      status: 'PENDING' | 'GRADED' | 'RESUBMIT';
      grade: number | null;
      score: number | null;
      submitted_at: string;
    }

    let studentSubmissions: StudentSubmissionSummary[] = [];

    if (activeStudentId && assignmentIds.length > 0) {
      const { data: subsData } = await supabase
        .from('submissions')
        .select('id, assignment_id, status, grade, score, submitted_at')
        .eq('student_id', activeStudentId)
        .in('assignment_id', assignmentIds);

      if (subsData) {
        studentSubmissions = subsData as unknown as StudentSubmissionSummary[];
      }
    }

    const subMap = new Map<string, StudentSubmissionSummary>(
      studentSubmissions.map((s) => [s.assignment_id, s])
    );

    const combined: LessonWithAssignment[] = (lessons ?? []).map((les) => ({
      ...les,
      assignments: (assignments ?? [])
        .filter((a) => a.lesson_id === les.id)
        .map((asg) => {
          const sub = subMap.get(asg.id);
          return {
            ...asg,
            hasSubmitted: Boolean(sub),
            submissionId: sub?.id,
            grade: sub?.grade ?? sub?.score ?? null,
            score: sub?.score ?? sub?.grade ?? null,
            submissionStatus: sub?.status ?? null,
            submittedAt: sub?.submitted_at ?? null,
          };
        }),
    }));

    return {
      success: true,
      data: combined,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in getStudentLessons:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat memuat materi.';
    return { success: false, error: msg };
  }
}
