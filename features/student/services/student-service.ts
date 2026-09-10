import { createClient } from '@/lib/supabase/server';
import type { ClassRecord, Subject, Module, Lesson, Assignment } from '@/types/database';
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

export interface StudentClassroomData {
  classData: ClassRecord;
  subjects: Array<
    Subject & {
      modules: Array<
        Module & {
          lessons: LessonWithAssignment[];
        }
      >;
    }
  >;
}

/**
 * Service: Mengambil seluruh daftar kelas siswa
 */
export async function getStudentClassrooms(): Promise<ActionResponse<ClassRecord[]>> {
  try {
    const supabase = await createClient();

    const { data: classes, error } = await supabase
      .from('classes')
      .select('*')
      .order('grade_level', { ascending: true });

    if (error) {
      console.error('[Action Error] Gagal mengambil daftar kelas siswa:', error);
      return { success: false, error: 'Gagal memuat daftar kelas siswa.' };
    }

    return {
      success: true,
      data: (classes ?? []) as unknown as ClassRecord[],
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in getStudentClassrooms:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat memuat daftar kelas.';
    return { success: false, error: msg };
  }
}

/**
 * Service: Mengambil data kelas dan kurikulum lengkap untuk portal siswa
 */
export async function getStudentClassroom(
  classId: string
): Promise<ActionResponse<StudentClassroomData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data kelas
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .single();

    if (classError || !classData) {
      console.error('[Action Error] Gagal mengambil kelas siswa:', classError);
      return { success: false, error: 'Kelas tidak ditemukan.' };
    }

    // Identifikasi sesi siswa aktif (dengan dev fallback)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeStudentId =
      user?.id ??
      (process.env.NODE_ENV === 'development'
        ? '22222222-2222-2222-2222-222222222222'
        : undefined);

    // 2. Ambil subjects dari kelas
    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', classId);

    if (subjectsError) {
      console.error('[Action Error] Gagal mengambil subjects siswa:', subjectsError);
      return { success: false, error: 'Gagal memuat mata pelajaran siswa.' };
    }

    const subjectIds = (subjectsData ?? []).map((s) => s.id);

    // 3. Ambil modules
    const { data: modulesData, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .in('subject_id', subjectIds.length > 0 ? subjectIds : ['00000000-0000-0000-0000-000000000000'])
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (modulesError) {
      console.error('[Action Error] Gagal mengambil modules siswa:', modulesError);
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
      console.error('[Action Error] Gagal mengambil lessons siswa:', lessonsError);
      return { success: false, error: 'Gagal memuat materi pembelajaran.' };
    }

    const lessonIds = (lessonsData ?? []).map((l) => l.id);

    // 5. Ambil assignments
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from('assignments')
      .select('*')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000']);

    if (assignmentsError) {
      console.error('[Action Error] Gagal mengambil assignments siswa:', assignmentsError);
      return { success: false, error: 'Gagal memuat tugas siswa.' };
    }

    // 6. Query riwayat submissions siswa aktif
    const assignmentIds = (assignmentsData ?? []).map((a) => a.id);

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
      const { data: subsData, error: subsError } = await supabase
        .from('submissions')
        .select('id, assignment_id, status, grade, score, submitted_at')
        .eq('student_id', activeStudentId)
        .in('assignment_id', assignmentIds);

      if (subsError) {
        console.warn('[Student Service Warning] Gagal memuat status submissions siswa:', subsError);
      } else if (subsData) {
        studentSubmissions = subsData as unknown as StudentSubmissionSummary[];
      }
    }

    const subMap = new Map<string, StudentSubmissionSummary>(
      studentSubmissions.map((s) => [s.assignment_id, s])
    );

    // Bangun relasi pohon dengan metadata penyerahan tugas
    const structuredSubjects = (subjectsData ?? []).map((subj) => {
      const relatedModules = (modulesData ?? [])
        .filter((m) => m.subject_id === subj.id)
        .map((mod) => {
          const relatedLessons = (lessonsData ?? [])
            .filter((l) => l.module_id === mod.id)
            .map((les) => {
              const relatedAssignments: StudentAssignment[] = (assignmentsData ?? [])
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
                });

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
    console.error('[Action Error] Exception in getStudentClassroom:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat memuat portal siswa.';
    return { success: false, error: msg };
  }
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
