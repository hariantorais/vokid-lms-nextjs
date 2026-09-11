import { createClient } from '@/lib/supabase/server';
import type { ClassRecord, Subject, Module } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { StudentAssignment, LessonWithAssignment } from '../bab/[moduleId]/_services/student-bab.service';

export type { StudentAssignment, LessonWithAssignment };

export interface StudentClassroomData {
  totalStars?: number;
  userAvatarUrl?: string | null;
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
    let totalStarsEarned = 0;
    let userAvatarUrl: string | null = null;

    if (activeStudentId) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', activeStudentId)
        .maybeSingle();

      userAvatarUrl = profileData?.avatar_url ?? null;

      // Hitung seluruh bintang yang diperoleh dari seluruh submissions siswa
      const { data: allSubs } = await supabase
        .from('submissions')
        .select('grade, score, status')
        .eq('student_id', activeStudentId);

      if (allSubs && allSubs.length > 0) {
        for (const sub of allSubs) {
          const sc = sub.score ?? sub.grade ?? 80;
          if (sc >= 85) totalStarsEarned += 3;
          else if (sc >= 60) totalStarsEarned += 2;
          else totalStarsEarned += 1;
        }
      }

      if (assignmentIds.length > 0) {
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
        totalStars: totalStarsEarned,
        userAvatarUrl,
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
