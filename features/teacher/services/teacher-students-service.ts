import { createClient } from '@/lib/supabase/server';
import type { ClassRecord } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StudentListItem {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    className: string;
    gradeLevel: number;
    totalSubmissions: number;
    completedSubmissions: number;
    totalStars: number;
    completedLessonsCount: number;
    completedTasksCount: number;
    recentSubmissions: Array<{
        id: string;
        assignmentTitle: string;
        subjectName: string;
        type: string;
        score: number | null;
        status: string;
        submittedAt: string;
    }>;
}

interface RawStudentSubmission {
    id: string;
    student_id: string;
    status: string;
    score: number | null;
    grade: number | null;
    submitted_at: string;
    assignments: {
        prompt: string;
        type: string;
        lessons: {
            title: string;
            modules: {
                subjects: {
                    name: string;
                } | null;
            } | null;
        } | null;
    } | null;
}

interface RawLessonCompletion {
    student_id: string;
    lesson_id: string;
}

interface RawProfileItem {
    id: string;
    full_name: string;
    role: string;
    avatar_url: string | null;
}

export async function getTeacherStudentsData(): Promise<
    ActionResponse<{
        students: StudentListItem[];
        totalCount: number;
        classrooms: ClassRecord[];
    }>
> {
    try {
        const supabase = await createClient();

        const [studentsRes, classesRes, submissionsRes, completionsRes] = await Promise.all([
            supabase
                .from('profiles')
                .select('id, full_name, role, avatar_url')
                .eq('role', 'SISWA')
                .order('full_name', { ascending: true }),
            supabase
                .from('classes')
                .select('*')
                .order('grade_level', { ascending: true }),
            supabase
                .from('submissions')
                .select(`
          id,
          student_id,
          status,
          score,
          grade,
          submitted_at,
          assignments (
            prompt,
            type,
            lessons (
              title,
              modules (
                subjects (
                  name
                )
              )
            )
          )
        `)
                .order('submitted_at', { ascending: false }),
            supabase
                .from('lesson_completions')
                .select('student_id, lesson_id'),
        ]);

        if (studentsRes.error) {
            console.error('[Teacher Students] Error fetching students:', studentsRes.error.message);
            return { success: false, error: 'Gagal memuat daftar siswa.' };
        }

        const studentsData = (studentsRes.data ?? []) as unknown as RawProfileItem[];
        const classrooms = (classesRes.data ?? []) as unknown as ClassRecord[];
        const defaultClass = classrooms[0];
        const subs = (submissionsRes.data ?? []) as unknown as RawStudentSubmission[];
        const completions = (completionsRes.data ?? []) as unknown as RawLessonCompletion[];

        const completionsMap = new Map<string, number>();
        for (const c of completions) {
            completionsMap.set(c.student_id, (completionsMap.get(c.student_id) ?? 0) + 1);
        }

        const students: StudentListItem[] = studentsData.map((st) => {
            const studentSubs = subs.filter((s) => s.student_id === st.id);
            const gradedCount = studentSubs.filter((s) => s.status === 'GRADED').length;
            const completedLessons = completionsMap.get(st.id) ?? 0;
            const completedTasks = studentSubs.length;

            // Rumus Vokid: (Pos Materi × 10) + (Tugas Selesai × 15)
            const totalStars = completedLessons * 10 + completedTasks * 15;

            const recentSubmissions = studentSubs.slice(0, 5).map((s) => ({
                id: s.id,
                assignmentTitle: s.assignments?.prompt ?? 'Tugas Pembelajaran',
                subjectName: s.assignments?.lessons?.modules?.subjects?.name ?? 'Mata Pelajaran',
                type: s.assignments?.type ?? 'VOICE_TASK',
                score: s.score ?? s.grade ?? null,
                status: s.status,
                submittedAt: s.submitted_at,
            }));

            return {
                id: st.id,
                fullName: st.full_name,
                avatarUrl: st.avatar_url,
                className: defaultClass ? defaultClass.name : 'Kelas 1 SD',
                gradeLevel: defaultClass ? defaultClass.grade_level : 1,
                totalSubmissions: studentSubs.length,
                completedSubmissions: gradedCount,
                totalStars,
                completedLessonsCount: completedLessons,
                completedTasksCount: completedTasks,
                recentSubmissions,
            };
        });

        return {
            success: true,
            data: {
                students,
                totalCount: students.length,
                classrooms,
            },
        };
    } catch (err: unknown) {
        console.error('[Teacher Students] Error in getTeacherStudentsData:', err);
        const msg = err instanceof Error ? err.message : 'Gagal memuat daftar siswa.';
        return { success: false, error: msg };
    }
}