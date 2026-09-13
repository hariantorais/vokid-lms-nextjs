'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Menghitung total bintang siswa secara realtime dari database
 * Rumus: (Materi Selesai x 10) + (Tugas Selesai x 15)
 */
export async function getStudentTotalStars(studentId: string): Promise<number> {
    try {
        const supabase = await createClient();

        // 1. Total pos materi selesai
        const { count: completedLessonsCount } = await supabase
            .from('lesson_completions')
            .select('*', { count: 'exact', head: true })
            .eq('student_id', studentId);

        // 2. Total tugas selesai
        const { count: completedTasksCount } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('student_id', studentId);

        const lessonsDone = completedLessonsCount ?? 0;
        const tasksDone = completedTasksCount ?? 0;

        return lessonsDone * 10 + tasksDone * 15;
    } catch {
        return 0;
    }
}