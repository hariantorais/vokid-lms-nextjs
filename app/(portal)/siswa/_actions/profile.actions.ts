'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StudentProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
}

export async function getStudentProfileAction(): Promise<ActionResponse<StudentProfile>> {
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

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, role')
      .eq('id', activeUserId)
      .single();

    if (error || !profile) {
      return { success: false, error: 'Gagal memuat profil siswa.' };
    }

    return {
      success: true,
      data: profile as StudentProfile,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return { success: false, error: msg };
  }
}

export async function updateStudentAvatarAction(avatarUrl: string): Promise<ActionResponse<{ avatarUrl: string }>> {
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
      .update({ avatar_url: avatarUrl })
      .eq('id', activeUserId);

    if (error) {
      return { success: false, error: `Gagal memperbarui avatar: ${error.message}` };
    }

    revalidatePath('/siswa');
    revalidatePath('/siswa/profil');

    return {
      success: true,
      data: { avatarUrl },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return { success: false, error: msg };
  }
}
