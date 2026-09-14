import { createClient } from '@/lib/supabase/server';
import type { ClassRecord } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface PendingReviewQueueItem {
    id: string;
    studentName: string;
    className: string;
    assignmentTitle: string;
    type: 'VOICE_TASK' | 'PHOTO_HOMEWORK';
    submittedAt: string;
    fileUrl: string;
}

export interface TeacherDashboardStats {
    totalStudents: number;
    totalPending: number;
    totalGraded: number;
    totalModules: number;
}

export interface TeacherDashboardData {
    teacherProfile: {
        id: string;
        fullName: string;
        role: string;
        avatarUrl: string | null;
    };
    classrooms: ClassRecord[];
    pendingReviewQueue: PendingReviewQueueItem[];
    stats: TeacherDashboardStats;
}

export function formatTimeAgo(isoString: string): string {
    try {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        if (diffMs < 0) return 'Baru saja';
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMin < 1) return 'Baru saja';
        if (diffMin < 60) return `${diffMin} menit yang lalu`;
        if (diffHours < 24) return `${diffHours} jam yang lalu`;
        if (diffDays === 1) return 'Kemarin';
        if (diffDays < 7) return `${diffDays} hari yang lalu`;
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    } catch {
        return 'Baru saja';
    }
}

interface RawPendingSubmission {
    id: string;
    file_url: string;
    status: string;
    submitted_at: string;
    student_id: string;
    profiles: {
        id: string;
        full_name: string;
    } | null;
    assignments: {
        id: string;
        prompt: string;
        type: 'VOICE_TASK' | 'PHOTO_HOMEWORK';
        lessons: {
            id: string;
            title: string;
            modules: {
                id: string;
                subjects: {
                    id: string;
                    classes: {
                        id: string;
                        name: string;
                    } | null;
                } | null;
            } | null;
        } | null;
    } | null;
}

export async function getTeacherDashboardData(
    teacherId?: string
): Promise<ActionResponse<TeacherDashboardData>> {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const activeTeacherId = teacherId ?? user?.id;

        let teacherProfile = {
            id: activeTeacherId ?? 'teacher-dev',
            fullName: 'Ibu Nurul Hidayah, S.Pd.',
            role: 'GURU',
            avatarUrl: null as string | null,
        };

        if (activeTeacherId) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('id, full_name, role, avatar_url')
                .eq('id', activeTeacherId)
                .maybeSingle();

            if (profile) {
                teacherProfile = {
                    id: profile.id,
                    fullName: profile.full_name,
                    role: profile.role,
                    avatarUrl: profile.avatar_url,
                };
            }
        }

        const { data: classesData, error: classErr } = await supabase
            .from('classes')
            .select('*')
            .order('grade_level', { ascending: true });

        if (classErr) {
            console.error('[Teacher Dashboard Error] Gagal memuat kelas:', classErr.message);
        }

        const classrooms: ClassRecord[] = (classesData ?? []) as unknown as ClassRecord[];

        const { data: pendingSubmissionsData, error: pendingError } = await supabase
            .from('submissions')
            .select(`
        id,
        file_url,
        status,
        submitted_at,
        student_id,
        profiles:student_id (
          id,
          full_name
        ),
        assignments:assignment_id (
          id,
          prompt,
          type,
          lessons:lesson_id (
            id,
            title,
            modules:module_id (
              id,
              subjects:subject_id (
                id,
                classes:class_id (
                  id,
                  name
                )
              )
            )
          )
        )
      `)
            .eq('status', 'PENDING')
            .order('submitted_at', { ascending: false });

        if (pendingError) {
            console.warn('[Teacher Dashboard Warning] Pending submissions lookup:', pendingError.message);
        }

        const rawPendingList = (pendingSubmissionsData ?? []) as unknown as RawPendingSubmission[];

        const pendingReviewQueue: PendingReviewQueueItem[] = rawPendingList.map((sub) => {
            const studentName = sub.profiles?.full_name ?? 'Siswa Vokid';
            const asg = sub.assignments;
            const lesson = asg?.lessons;
            const className = lesson?.modules?.subjects?.classes?.name ?? 'Kelas SD';
            const assignmentTitle = asg?.prompt ?? lesson?.title ?? 'Tugas Pembelajaran';
            const taskType: 'VOICE_TASK' | 'PHOTO_HOMEWORK' =
                asg?.type === 'PHOTO_HOMEWORK' ? 'PHOTO_HOMEWORK' : 'VOICE_TASK';

            return {
                id: sub.id,
                studentName,
                className,
                assignmentTitle,
                type: taskType,
                submittedAt: formatTimeAgo(sub.submitted_at),
                fileUrl: sub.file_url,
            };
        });

        const [studentsCountRes, pendingCountRes, gradedCountRes, modulesCountRes] = await Promise.all([
            supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'SISWA'),
            supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
            supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'GRADED'),
            supabase.from('modules').select('*', { count: 'exact', head: true }),
        ]);

        const stats: TeacherDashboardStats = {
            totalStudents: studentsCountRes.count ?? 0,
            totalPending: pendingCountRes.count ?? pendingReviewQueue.length,
            totalGraded: gradedCountRes.count ?? 0,
            totalModules: modulesCountRes.count ?? 0,
        };

        return {
            success: true,
            data: {
                teacherProfile,
                classrooms,
                pendingReviewQueue,
                stats,
            },
        };
    } catch (err: unknown) {
        console.error('[Teacher Dashboard] Error in getTeacherDashboardData:', err);
        const msg = err instanceof Error ? err.message : 'Kesalahan internal saat memuat data dashboard.';
        return { success: false, error: msg };
    }
}