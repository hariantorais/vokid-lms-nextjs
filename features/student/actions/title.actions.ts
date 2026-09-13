'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { ActionResponse } from '@/features/shared/types/storage';
import type { TrophyTier } from '../types/trophy';

export async function equipStudentTitleAction(
    title: string,
    icon: string,
    tier: TrophyTier
): Promise<ActionResponse<boolean>> {
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
            return { success: false, error: 'Sesi kedaluwarsa. Silakan login kembali.' };
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                equipped_title: title,
                equipped_badge_icon: icon,
                equipped_trophy_tier: tier,
            })
            .eq('id', activeUserId);

        if (error) {
            return { success: false, error: `Gagal memasang gelar: ${error.message}` };
        }

        revalidatePath('/siswa');
        revalidatePath('/siswa/misi');
        revalidatePath('/siswa/profil');

        return { success: true, data: true };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
        return { success: false, error: msg };
    }
}