'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { gradeSubmissionSchema } from '../validations/grading-schema';
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
    if (process.env.NODE_ENV === 'development') {
      return { authorized: true, userId: 'teacher-dev' };
    }
    return { authorized: false, error: 'Sesi tidak valid atau telah kedaluwarsa. Silakan login kembali.' };
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    if (process.env.NODE_ENV === 'development') {
      return { authorized: true, userId: user.id };
    }
    return { authorized: false, error: 'Profil guru tidak ditemukan dalam basis data.' };
  }

  if (profile.role !== 'GURU') {
    return { authorized: false, error: 'Akses ditolak. Tindakan ini hanya boleh dilakukan oleh Guru.' };
  }

  return { authorized: true, userId: user.id };
}

/**
 * Server Action: Penilaian Tugas Siswa (Grading & Audio Feedback) oleh Guru
 */
export async function gradeSubmissionAction(
  payload: unknown
): Promise<ActionResponse<{ id: string }>> {
  try {
    const rawPayload = parsePayload(payload);
    const validationResult = gradeSubmissionSchema.safeParse(rawPayload);

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return {
        success: false,
        error: issue ? issue.message : 'Data penilaian tidak valid.',
      };
    }

    const { submissionId, grade, feedbackText, feedbackAudioUrl } = validationResult.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    // Ambil info submission untuk revalidasi kelas siswa
    const { data: existingSub, error: fetchErr } = await supabase
      .from('submissions')
      .select(`
        id,
        assignment_id,
        assignments (
          id,
          lessons (
            id,
            modules (
              id,
              subjects (
                id,
                class_id
              )
            )
          )
        )
      `)
      .eq('id', submissionId)
      .single();

    if (fetchErr || !existingSub) {
      console.warn('[Action Warning] Submission info lookup warning:', fetchErr);
    }

    const { data: updatedSubmission, error: updateError } = await supabase
      .from('submissions')
      .update({
        grade,
        score: grade,
        teacher_feedback_text: feedbackText ?? null,
        teacher_feedback: feedbackText ?? null,
        teacher_feedback_audio_url: feedbackAudioUrl ?? null,
        status: 'GRADED',
        graded_at: new Date().toISOString(),
      })
      .eq('id', submissionId)
      .select('id')
      .single();

    if (updateError || !updatedSubmission) {
      console.error('[Action Error] Gagal memperbarui penilaian tugas:', updateError);
      return {
        success: false,
        error: `Gagal menyimpan penilaian tugas: ${updateError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    // Ekstrak ID kelas jika tersedia untuk revalidasi presisi
    const classId =
      existingSub?.assignments?.lessons?.modules?.subjects?.class_id;

    revalidatePath('/guru');
    revalidatePath(`/guru/penilaian/${submissionId}`);
    revalidatePath('/siswa');
    if (classId) {
      revalidatePath(`/siswa/kelas/${classId}`);
    }

    return {
      success: true,
      data: { id: updatedSubmission.id },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in gradeSubmissionAction:', err);
    const errorMsg =
      err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: errorMsg };
  }
}
