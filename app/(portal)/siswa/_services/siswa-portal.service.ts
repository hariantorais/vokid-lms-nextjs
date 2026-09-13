import { createClient } from '@/lib/supabase/server';
import type { ClassRecord } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StudentPortalData {
  classrooms: ClassRecord[];
  totalStars?: number;
  userAvatarUrl?: string | null;
}

/**
 * Service: Mengambil seluruh daftar kelas siswa dan poin bintang riil
 */
export async function getStudentClassrooms(): Promise<ActionResponse<StudentPortalData>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeStudentId =
      user?.id ??
      (process.env.NODE_ENV === 'development'
        ? '22222222-2222-2222-2222-222222222222'
        : undefined);

    let totalStars = 0;
    let userAvatarUrl: string | null = null;

    if (activeStudentId) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', activeStudentId)
        .maybeSingle();

      userAvatarUrl = profileData?.avatar_url ?? null;

      // Ambil seluruh submissions siswa beserta nilai/skor untuk menghitung bintang murni yang diperoleh
      const { data: allSubs } = await supabase
        .from('submissions')
        .select('grade, score, status')
        .eq('student_id', activeStudentId);

      if (allSubs && allSubs.length > 0) {
        for (const sub of allSubs) {
          const sc = sub.score ?? sub.grade;
          if (typeof sc === 'number' && !Number.isNaN(sc)) {
            if (sc >= 85) totalStars += 3;
            else if (sc >= 60) totalStars += 2;
            else if (sc > 0) totalStars += 1;
          }
        }
      }
    }

    const { data: classes, error } = await supabase
      .from('classes')
      .select('*')
      .order('grade_level', { ascending: true });

    if (error) {
      console.error('[Action Error] Gagal mengambil daftar kelas siswa:', error);
      return { success: false, error: 'Gagal memuat daftar kelas siswa.' };
    }

    return {
      success: true,
      data: {
        classrooms: (classes ?? []) as unknown as ClassRecord[],
        totalStars,
        userAvatarUrl,
      },
    };
  } catch (err: unknown) {
    console.error('[Action Error] Exception in getStudentClassrooms:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat memuat daftar kelas.';
    return { success: false, error: msg };
  }
}
