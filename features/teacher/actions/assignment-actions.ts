'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAssignmentSchema } from '@/lib/validations/teacher';
import type { Assignment } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

function parsePayload(input: unknown): Record<string, unknown> {
  if (input instanceof FormData) {
    const obj: Record<string, unknown> = {};
    input.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  if (typeof input === 'object' && input !== null) {
    return input as Record<string, unknown>;
  }
  return {};
}

async function verifyTeacherRole(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<{ authorized: true; userId: string } | { authorized: false; error: string }> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { authorized: false, error: 'Sesi kedaluwarsa atau belum masuk. Silakan login kembali.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return { authorized: false, error: 'Profil pengguna tidak ditemukan dalam basis data.' };
  }

  if (profile.role !== 'GURU') {
    return { authorized: false, error: 'Akses ditolak. Tindakan ini hanya boleh dilakukan oleh Guru.' };
  }

  return { authorized: true, userId: user.id };
}

/**
 * Server Action: Pembuatan Tugas Siswa (Assignment) Baru oleh Guru
 */
export async function createAssignmentAction(formData: unknown): Promise<ActionResponse<Assignment>> {
  try {
    const rawPayload = parsePayload(formData);
    const validationResult = createAssignmentSchema.safeParse(rawPayload);

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return { success: false, error: issue ? issue.message : 'Data penugasan tidak valid.' };
    }

    const { lessonId, type, prompt, instructionAudioUrl, dueDate } = validationResult.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const { data: newAssignment, error: insertError } = await supabase
      .from('assignments')
      .insert({
        lesson_id: lessonId,
        type,
        prompt,
        instruction_audio_url: instructionAudioUrl,
        due_date: dueDate,
      })
      .select()
      .single();

    if (insertError || !newAssignment) {
      console.error('[Action Error] Gagal insert penugasan:', insertError);
      return {
        success: false,
        error: `Gagal menyimpan penugasan siswa: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: newAssignment,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in createAssignmentAction:', err);
    const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: errorMsg };
  }
}
