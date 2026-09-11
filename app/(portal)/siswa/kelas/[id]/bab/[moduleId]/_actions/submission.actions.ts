'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { submitAssignmentSchema } from '../_validations/submission-schema';
import type { Submission } from '@/types/database';
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

/**
 * Server Action: Penyerahan Tugas Siswa (Rekaman Suara / Foto PR)
 */
export async function submitAssignmentAction(
  payload: unknown
): Promise<ActionResponse<Submission>> {
  try {
    const rawPayload = parsePayload(payload);
    const validationResult = submitAssignmentSchema.safeParse(rawPayload);

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return {
        success: false,
        error: issue ? issue.message : 'Data penyerahan tugas tidak valid.',
      };
    }

    const { assignmentId, fileUrl } = validationResult.data;

    const supabase = await createClient();

    // 1. Verifikasi Autentikasi Pengguna (dengan guardrail dev fallback)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    let studentId: string;

    if (!user || authError) {
      if (process.env.NODE_ENV === 'development') {
        studentId = '22222222-2222-2222-2222-222222222222'; // Budi Pratama (Seed Dev)
      } else {
        return {
          success: false,
          error: 'Sesi siswa tidak valid atau telah kedaluwarsa. Silakan login kembali.',
        };
      }
    } else {
      studentId = user.id;

      // 2. Verifikasi Profil Siswa jika sesi aktif
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .single();

      if (profile && profile.role !== 'SISWA') {
        return {
          success: false,
          error: 'Akses ditolak. Pengiriman tugas hanya dapat dilakukan oleh akun Siswa.',
        };
      }
    }

    // 3. Verifikasi Keberadaan Tugas dan Ambil Info Kelas
    const { data: assignment, error: assignmentError } = await supabase
      .from('assignments')
      .select(`
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
      `)
      .eq('id', assignmentId)
      .single();

    if (assignmentError || !assignment) {
      return {
        success: false,
        error: 'Penugasan tidak ditemukan atau tidak aktif.',
      };
    }

    // 4. Simpan Entri Baru ke Tabel Submissions dengan Status 'PENDING'
    const { data: submission, error: insertError } = await supabase
      .from('submissions')
      .insert({
        assignment_id: assignmentId,
        student_id: studentId,
        file_url: fileUrl,
        status: 'PENDING',
      })
      .select()
      .single();

    if (insertError || !submission) {
      console.error('[Action Error] Gagal menyimpan penyerahan tugas:', insertError);
      return {
        success: false,
        error: `Gagal mengirimkan tugas: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    // Ekstrak ID kelas jika tersedia untuk revalidasi presisi
    const lessonData = assignment.lessons;
    const classId = lessonData?.modules?.subjects?.class_id;

    revalidatePath('/siswa');
    if (classId) {
      revalidatePath(`/siswa/kelas/${classId}`);
    }
    revalidatePath('/guru');

    return {
      success: true,
      data: submission,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in submitAssignmentAction:', err);
    const errorMsg =
      err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: errorMsg };
  }
}
