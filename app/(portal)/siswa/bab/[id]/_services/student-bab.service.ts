import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { Module, Subject, ClassRecord, Lesson, Assignment } from '@/types/database';

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
  isStudied?: boolean;
}

export interface StudentBabDetailData {
  totalStars?: number;
  userAvatarUrl?: string | null;
  nextModule?: {
    id: string;
    title: string;
    order_index: number;
  } | null;
  module: Module & {
    subject: Subject & {
      class: ClassRecord;
    };
    lessons: LessonWithAssignment[];
  };
}

interface StudentSubmissionSummary {
  id: string;
  assignment_id: string;
  status: 'PENDING' | 'GRADED' | 'RESUBMIT';
  grade: number | null;
  score: number | null;
  submitted_at: string;
}

/**
 * Service: Mengambil data detail bab siswa beserta status materi yang telah dipelajari
 * dan penugasan aktif secara runtut dan aman.
 */
export async function getStudentBabDetail(
  babId: string
): Promise<ActionResponse<StudentBabDetailData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data module/bab berserta relasi mapel & kelas
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .select('*, subjects(*, classes(*))')
      .eq('id', babId)
      .single();

    if (moduleError || !moduleData) {
      return { success: false, error: 'Bab tidak ditemukan atau telah dihapus.' };
    }

    // 2. Ambil seluruh lessons di dalam bab ini secara terurut
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('module_id', babId)
      .order('order_index', { ascending: true });

    if (lessonsError) {
      return { success: false, error: 'Gagal memuat materi bab siswa.' };
    }

    const lessonIds = (lessonsData ?? []).map((l) => l.id);

    // 3. Ambil seluruh assignments di bawah lessons bab ini
    const { data: assignmentsData } = await supabase
      .from('assignments')
      .select('*')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000'])
      .order('created_at', { ascending: true });

    const assignmentIds = (assignmentsData ?? []).map((a) => a.id);

    // 4. Verifikasi sesi siswa aktif
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeStudentId =
      user?.id ??
      (process.env.NODE_ENV === 'development'
        ? '22222222-2222-2222-2222-222222222222'
        : undefined);

    let studentSubmissions: StudentSubmissionSummary[] = [];
    let totalStarsEarned = 0;
    let userAvatarUrl: string | null = null;
    let completedLessonIds: string[] = [];

    if (activeStudentId) {
      // A. Ambil profil & avatar siswa
      const { data: profileData } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', activeStudentId)
        .maybeSingle();

      userAvatarUrl = profileData?.avatar_url ?? null;

      // B. Hitung akumulasi bintang murni yang diperoleh dari pos tugas yang sudah dinilai
      const { data: allSubs } = await supabase
        .from('submissions')
        .select('grade, score, status')
        .eq('student_id', activeStudentId);

      if (allSubs && allSubs.length > 0) {
        for (const sub of allSubs) {
          const sc = sub.score ?? sub.grade;
          if (typeof sc === 'number') {
            if (sc >= 85) totalStarsEarned += 3;
            else if (sc >= 60) totalStarsEarned += 2;
            else if (sc > 0) totalStarsEarned += 1;
          }
        }
      }

      // C. Ambil data materi yang sudah ditandai "Saya Sudah Mempelajari Materi"
      if (lessonIds.length > 0) {
        const { data: completionsData } = await supabase
          .from('lesson_completions')
          .select('lesson_id')
          .eq('student_id', activeStudentId)
          .in('lesson_id', lessonIds);

        if (completionsData) {
          completedLessonIds = completionsData.map((c) => c.lesson_id);
        }
      }

      // D. Ambil submissions siswa untuk tugas di bab ini
      if (assignmentIds.length > 0) {
        const { data: subsData } = await supabase
          .from('submissions')
          .select('id, assignment_id, status, grade, score, submitted_at')
          .eq('student_id', activeStudentId)
          .in('assignment_id', assignmentIds);

        if (subsData) {
          studentSubmissions = subsData as unknown as StudentSubmissionSummary[];
        }
      }
    }

    const subMap = new Map<string, StudentSubmissionSummary>(
      studentSubmissions.map((s) => [s.assignment_id, s])
    );
    const completedLessonSet = new Set<string>(completedLessonIds);

    // 5. Gabungkan data lessons dengan assignments dan status isStudied
    const lessonsWithAssignments: LessonWithAssignment[] = (lessonsData ?? []).map((l) => ({
      ...l,
      isStudied: completedLessonSet.has(l.id),
      assignments: (assignmentsData ?? [])
        .filter((a) => a.lesson_id === l.id)
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

    const subjectData = moduleData.subjects as unknown as Subject & { classes: ClassRecord };

    // 6. Ambil referensi bab berikutnya jika ada
    const { data: nextModData } = await supabase
      .from('modules')
      .select('id, title, order_index')
      .eq('subject_id', moduleData.subject_id)
      .eq('is_published', true)
      .gt('order_index', moduleData.order_index)
      .order('order_index', { ascending: true })
      .limit(1)
      .maybeSingle();

    return {
      success: true,
      data: {
        totalStars: totalStarsEarned,
        userAvatarUrl,
        nextModule: nextModData
          ? {
            id: nextModData.id,
            title: nextModData.title,
            order_index: nextModData.order_index,
          }
          : null,
        module: {
          id: moduleData.id,
          title: moduleData.title,
          order_index: moduleData.order_index,
          subject_id: moduleData.subject_id,
          is_published: moduleData.is_published,
          target_semester: moduleData.target_semester ?? null,
          week_target: moduleData.week_target ?? null,
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