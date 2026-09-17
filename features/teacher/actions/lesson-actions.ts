'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createLessonSchema } from '../validations';
import type { Lesson } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';
import { deleteFileFromR2 } from '@/features/shared/services/storage-service';

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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const role = profile?.role ?? (user.user_metadata?.role as string | undefined);

  if (!role) {
    return { authorized: false, error: 'Profil pengguna tidak ditemukan dalam basis data.' };
  }

  if (role !== 'GURU') {
    return { authorized: false, error: 'Akses ditolak. Tindakan ini hanya boleh dilakukan oleh Guru.' };
  }

  return { authorized: true, userId: user.id };
}

/**
 * Server Action: Pembuatan Materi Pembelajaran (Lesson) Baru oleh Guru
 */
export async function createLessonAction(formData: unknown): Promise<ActionResponse<Lesson>> {
  try {
    const rawPayload = parsePayload(formData);
    const validationResult = createLessonSchema.safeParse(rawPayload);

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      return { success: false, error: issue ? issue.message : 'Data materi tidak valid.' };
    }

    const { moduleId, title, contentType, contentUrl, contentText, learningObjectives, orderIndex } = validationResult.data;

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const { data: newLesson, error: insertError } = await supabase
      .from('lessons')
      .insert({
        module_id: moduleId,
        title,
        content_type: contentType,
        content_url: contentUrl ?? null,
        content_text: contentText ?? null,
        learning_objectives: learningObjectives ?? null,
        order_index: orderIndex,
      })
      .select()
      .single();

    if (insertError || !newLesson) {
      console.error('[Action Error] Gagal insert materi:', insertError);
      return {
        success: false,
        error: `Gagal menyimpan materi pembelajaran: ${insertError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: newLesson,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in createLessonAction:', err);
    const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: errorMsg };
  }
}

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

/**
 * Server Action: Menghapus Materi Pembelajaran oleh Guru
 */
export async function deleteLessonAction(
  lessonId: string
): Promise<ActionResponse<{ id: string }>> {
  try {
    if (!lessonId || !UUID_REGEX.test(lessonId)) {
      return { success: false, error: 'ID materi tidak valid (harus format UUID).' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    // 1. Proteksi Relasi: Periksa apakah materi ini memiliki penugasan
    const { count: assignmentCount, error: checkError } = await supabase
      .from('assignments')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', lessonId);

    if (checkError) {
      console.error('[Action Error] Gagal memeriksa relasi tugas materi:', checkError);
      return { success: false, error: 'Gagal memverifikasi keterkaitan data tugas pada materi ini.' };
    }

    if (assignmentCount && assignmentCount > 0) {
      return {
        success: false,
        error: `Materi tidak dapat dihapus karena masih memiliki ${assignmentCount} penugasan siswa di dalamnya. Hapus atau pindahkan penugasan terlebih dahulu.`,
      };
    }

    // 2. Ambil info materi terlebih dahulu untuk mendapatkan content_url R2 jika ada
    const { data: lessonToDelete } = await supabase
      .from('lessons')
      .select('id, content_url')
      .eq('id', lessonId)
      .maybeSingle();

    const { error: deleteError } = await supabase
      .from('lessons')
      .delete()
      .eq('id', lessonId);

    if (deleteError) {
      console.error('[Action Error] Gagal menghapus materi:', deleteError);
      return {
        success: false,
        error: `Gagal menghapus materi: ${deleteError.message}`,
      };
    }

    // 3. Hapus berkas fisik di Cloudflare R2 jika berkas tersimpan di R2
    if (lessonToDelete?.content_url) {
      try {
        await deleteFileFromR2(lessonToDelete.content_url);
      } catch (r2Err) {
        console.warn('[R2 Warning] Gagal menghapus berkas materi di Cloudflare R2:', r2Err);
      }
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: { id: lessonId },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in deleteLessonAction:', err);
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus materi.';
    return { success: false, error: msg };
  }
}

/**
 * Server Action: Memperbarui Materi Pembelajaran oleh Guru
 */
export async function updateLessonAction(formData: unknown): Promise<ActionResponse<Lesson>> {
  try {
    const rawPayload = parsePayload(formData);
    const lessonId = typeof rawPayload.lessonId === 'string' ? rawPayload.lessonId.trim() : '';
    const title = typeof rawPayload.title === 'string' ? rawPayload.title.trim() : '';
    const contentType = rawPayload.contentType as 'TEXT' | 'VIDEO' | 'AUDIO' | 'PDF';
    const contentText = typeof rawPayload.contentText === 'string' ? rawPayload.contentText.trim() : null;
    const contentUrl = typeof rawPayload.contentUrl === 'string' ? rawPayload.contentUrl.trim() : null;
    const learningObjectives =
      typeof rawPayload.learningObjectives === 'string' && rawPayload.learningObjectives.trim().length > 0
        ? rawPayload.learningObjectives.trim()
        : null;

    if (!lessonId || !UUID_REGEX.test(lessonId)) {
      return { success: false, error: 'ID materi tidak valid.' };
    }

    if (!title || title.length < 2) {
      return { success: false, error: 'Judul materi minimal 2 karakter.' };
    }

    if (contentType === 'TEXT' && (!contentText || contentText.length === 0)) {
      return { success: false, error: 'Isi teks modul/materi wajib diisi.' };
    }

    if (contentType !== 'TEXT' && (!contentUrl || contentUrl.length === 0)) {
      return { success: false, error: 'Tautan URL media wajib diisi.' };
    }

    const supabase = await createClient();
    const authCheck = await verifyTeacherRole(supabase);
    if (!authCheck.authorized) {
      return { success: false, error: authCheck.error };
    }

    const updateData: {
      title: string;
      content_type: 'TEXT' | 'VIDEO' | 'AUDIO' | 'PDF';
      content_text: string | null;
      content_url: string | null;
      learning_objectives: string | null;
    } = {
      title,
      content_type: contentType,
      content_text: contentType === 'TEXT' ? contentText : null,
      content_url: contentType !== 'TEXT' ? contentUrl : null,
      learning_objectives: learningObjectives,
    };

    // Ambil materi lama untuk memeriksa jika ada file R2 yang diganti
    const { data: oldLesson } = await supabase
      .from('lessons')
      .select('id, content_url')
      .eq('id', lessonId)
      .maybeSingle();

    const { data: updatedLesson, error: updateError } = await supabase
      .from('lessons')
      .update(updateData)
      .eq('id', lessonId)
      .select()
      .single();

    if (updateError || !updatedLesson) {
      console.error('[Action Error] Gagal update materi:', updateError);
      return {
        success: false,
        error: `Gagal memperbarui materi: ${updateError?.message ?? 'Kesalahan basis data'}`,
      };
    }

    // Jika berkas lama tersimpan di R2 dan URL-nya berubah/dihapus, bersihkan berkas lama dari R2
    const newContentUrl = updateData.content_url;
    if (oldLesson?.content_url && oldLesson.content_url !== newContentUrl) {
      try {
        await deleteFileFromR2(oldLesson.content_url);
      } catch (r2Err) {
        console.warn('[R2 Warning] Gagal menghapus berkas lama di Cloudflare R2:', r2Err);
      }
    }

    revalidatePath('/guru');
    revalidatePath('/siswa');

    return {
      success: true,
      data: updatedLesson,
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in updateLessonAction:', err);
    const errorMsg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem yang tidak diharapkan.';
    return { success: false, error: errorMsg };
  }
}
