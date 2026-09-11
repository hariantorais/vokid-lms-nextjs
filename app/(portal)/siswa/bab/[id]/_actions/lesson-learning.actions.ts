'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { markLessonAsStudiedSchema } from '../_validations/lesson-learning-schema';
import type { ActionResponse } from '@/features/shared/types/storage';

export async function markLessonAsStudiedAction(
    rawInput: unknown
): Promise<ActionResponse<{ completed: boolean; completedAt: string }>> {
    try {
        const parseResult = markLessonAsStudiedSchema.safeParse(
            typeof rawInput === 'string' ? { lessonId: rawInput } : rawInput
        );

        if (!parseResult.success) {
            const issue = parseResult.error.issues[0];
            return {
                success: false,
                error: issue ? issue.message : 'Parameter materi tidak valid.',
            };
        }

        const { lessonId } = parseResult.data;
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        let studentId: string;
        if (!user || authError) {
            if (process.env.NODE_ENV === 'development') {
                studentId = '22222222-2222-2222-2222-222222222222';
            } else {
                return {
                    success: false,
                    error: 'Sesi belajar siswa berakhir. Silakan login kembali.',
                };
            }
        } else {
            studentId = user.id;
        }

        const { data: lesson, error: lessonError } = await supabase
            .from('lessons')
            .select('id, module_id')
            .eq('id', lessonId)
            .single();

        if (lessonError || !lesson) {
            return { success: false, error: 'Materi tidak ditemukan.' };
        }

        const now = new Date().toISOString();

        const { error: upsertError } = await supabase
            .from('lesson_completions')
            .upsert(
                {
                    lesson_id: lessonId,
                    student_id: studentId,
                    completed_at: now,
                },
                { onConflict: 'lesson_id,student_id' }
            );

        if (upsertError) {
            return {
                success: false,
                error: `Gagal memperbarui status materi: ${upsertError.message}`,
            };
        }

        revalidatePath('/siswa');
        if (lesson.module_id) {
            revalidatePath(`/siswa/bab/${lesson.module_id}`);
        }

        return {
            success: true,
            data: {
                completed: true,
                completedAt: now,
            },
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
        return { success: false, error: msg };
    }
}