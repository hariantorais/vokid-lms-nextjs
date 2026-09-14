import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface TeacherGradingListItem {
    id: string;
    studentId: string;
    studentName: string;
    studentAvatar: string | null;
    lessonTitle: string;
    subjectName: string;
    className: string;
    taskType: 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT';
    assignmentPrompt: string;
    fileUrl: string;
    status: 'PENDING' | 'GRADED';
    score: number | null;
    submittedAt: string;
}

interface RawGradingSubItem {
    id: string;
    student_id: string;
    file_url: string;
    status: 'PENDING' | 'GRADED';
    score: number | null;
    grade: number | null;
    submitted_at: string;
    profiles: {
        id: string;
        full_name: string;
        avatar_url: string | null;
    } | null;
    assignments: {
        id: string;
        type: 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT';
        prompt: string;
        lessons: {
            id: string;
            title: string;
            modules: {
                id: string;
                subjects: {
                    id: string;
                    name: string;
                    classes: {
                        id: string;
                        name: string;
                    } | null;
                } | null;
            } | null;
        } | null;
    } | null;
}

export async function getTeacherGradingListData(): Promise<
    ActionResponse<{
        items: TeacherGradingListItem[];
        counts: {
            pending: number;
            graded: number;
            total: number;
        };
    }>
> {
    try {
        const supabase = await createClient();

        const { data: subsData, error: subsError } = await supabase
            .from('submissions')
            .select(`
        id,
        student_id,
        file_url,
        status,
        score,
        grade,
        submitted_at,
        profiles (
          id,
          full_name,
          avatar_url
        ),
        assignments (
          id,
          type,
          prompt,
          lessons (
            id,
            title,
            modules (
              id,
              subjects (
                id,
                name,
                classes (
                  id,
                  name
                )
              )
            )
          )
        )
      `)
            .order('submitted_at', { ascending: false });

        if (subsError) {
            console.error('[Teacher Grading] Error fetching submissions list:', subsError.message);
            return { success: false, error: 'Gagal memuat daftar tugas penilaian.' };
        }

        const rawSubs = (subsData ?? []) as unknown as RawGradingSubItem[];

        const items: TeacherGradingListItem[] = rawSubs.map((sub) => {
            const asg = sub.assignments;
            const lesson = asg?.lessons;
            const subject = lesson?.modules?.subjects;
            const classData = subject?.classes;

            return {
                id: sub.id,
                studentId: sub.student_id,
                studentName: sub.profiles?.full_name ?? 'Siswa Vokid',
                studentAvatar: sub.profiles?.avatar_url ?? null,
                lessonTitle: lesson?.title ?? 'Materi Pembelajaran',
                subjectName: subject?.name ?? 'Mata Pelajaran',
                className: classData?.name ?? 'Kelas SD',
                taskType: asg?.type ?? 'VOICE_TASK',
                assignmentPrompt: asg?.prompt ?? '',
                fileUrl: sub.file_url,
                status: sub.status,
                score: sub.score ?? sub.grade ?? null,
                submittedAt: sub.submitted_at,
            };
        });

        const pendingCount = items.filter((i) => i.status === 'PENDING').length;
        const gradedCount = items.filter((i) => i.status === 'GRADED').length;

        return {
            success: true,
            data: {
                items,
                counts: {
                    pending: pendingCount,
                    graded: gradedCount,
                    total: items.length,
                },
            },
        };
    } catch (err: unknown) {
        console.error('[Teacher Grading] Exception in getTeacherGradingListData:', err);
        const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
        return { success: false, error: msg };
    }
}