'use server';

import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';
import {
    StudentMission,
    AssignmentWithHierarchy,
    mapAssignmentToMission,
} from '../types/mission';

export async function getStudentMissionsAction(): Promise<ActionResponse<StudentMission[]>> {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const activeUserId =
            user?.id ??
            (process.env.NODE_ENV === 'development'
                ? '22222222-2222-2222-2222-222222222222'
                : null);

        if (!activeUserId) {
            return { success: false, error: 'Sesi belajar kedaluwarsa. Silakan login kembali.' };
        }

        // 1. Ambil semua tugas beserta hierarki materinya
        const { data: assignments, error: assignmentError } = await supabase
            .from('assignments')
            .select(`
        id,
        type,
        prompt,
        instruction_audio_url,
        due_date,
        lesson_id,
        lesson:lessons (
          id,
          title,
          module:modules (
            id,
            title,
            subject:subjects (
              id,
              name,
              class:classes (
                id,
                name,
                grade_level
              )
            )
          )
        )
      `)
            .order('created_at', { ascending: true });

        if (assignmentError) {
            return { success: false, error: `Gagal memuat tugas: ${assignmentError.message}` };
        }

        if (!assignments || assignments.length === 0) {
            return { success: true, data: [] };
        }

        // 2. Cek penyelesaian materi via tabel 'lesson_completions'
        const { data: completedLessons } = await supabase
            .from('lesson_completions')
            .select('lesson_id')
            .eq('student_id', activeUserId);

        const completedLessonIdSet = new Set(
            (completedLessons ?? []).map((item: { lesson_id: string }) => item.lesson_id)
        );

        // 3. Cek pengumpulan tugas via tabel 'submissions'
        const { data: completedSubmissions } = await supabase
            .from('submissions')
            .select('assignment_id')
            .eq('student_id', activeUserId);

        const submittedAssignmentIdSet = new Set(
            (completedSubmissions ?? []).map((item: { assignment_id: string }) => item.assignment_id)
        );

        // 4. Map ke kontrak UI StudentMission
        const missions: StudentMission[] = (assignments as unknown as AssignmentWithHierarchy[]).map(
            (assignment) => {
                const isLessonDone = completedLessonIdSet.has(assignment.lesson_id);
                const isTaskDone = submittedAssignmentIdSet.has(assignment.id);

                return mapAssignmentToMission(assignment, isLessonDone, isTaskDone);
            }
        );

        return {
            success: true,
            data: missions,
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem saat memuat misi.';
        return { success: false, error: msg };
    }
}