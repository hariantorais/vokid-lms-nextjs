import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StudentMissionItem {
  id: string;
  type: 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ';
  prompt: string;
  instructionAudioUrl?: string | null;
  lessonId: string;
  lessonTitle: string;
  moduleTitle: string;
  subjectName: string;
  className: string;
  gradeLevel: number;
  classId: string;
  babId: string;
  isCompleted: boolean;
  score?: number | null;
  dueDate?: string | null;
}

export interface StudentMissionsData {
  totalStars: number;
  userAvatarUrl?: string | null;
  completedCount: number;
  pendingCount: number;
  missions: StudentMissionItem[];
}

/**
 * Mengambil seluruh misi/tugas siswa (Voice task, Foto tugas, Quiz) beserta status penyelesaiannya
 */
export async function getStudentMissions(): Promise<ActionResponse<StudentMissionsData>> {
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
    const completedAssignmentIds = new Map<string, number | null>();

    if (activeStudentId) {
      // 1. Profil avatar
      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', activeStudentId)
        .maybeSingle();
      userAvatarUrl = profile?.avatar_url ?? null;

      // 2. Submissions untuk identifikasi tugas yang sudah selesai
      const { data: subs } = await supabase
        .from('submissions')
        .select('assignment_id, score, grade')
        .eq('student_id', activeStudentId);

      if (subs) {
        for (const sub of subs) {
          const score = sub.score ?? sub.grade ?? null;
          completedAssignmentIds.set(sub.assignment_id, score);
          if (typeof score === 'number') {
            if (score >= 85) totalStars += 3;
            else if (score >= 60) totalStars += 2;
            else if (score > 0) totalStars += 1;
          }
        }
      }
    }

    // 3. Ambil seluruh data assignments dengan relasi hierarki
    const { data: assignments, error } = await supabase
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
          module_id,
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
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Action Error] getStudentMissions error:', error);
      return { success: false, error: 'Gagal memuat daftar misi siswa.' };
    }

    const missions: StudentMissionItem[] = [];

    for (const item of assignments ?? []) {
      const isCompleted = completedAssignmentIds.has(item.id);
      const score = completedAssignmentIds.get(item.id) ?? null;
      const lesson = item.lesson as any;
      const moduleData = lesson?.module;
      const subject = moduleData?.subject;
      const classData = subject?.class;

      missions.push({
        id: item.id,
        type: item.type as any,
        prompt: item.prompt,
        instructionAudioUrl: item.instruction_audio_url,
        lessonId: item.lesson_id,
        lessonTitle: lesson?.title ?? 'Pelajaran',
        moduleTitle: moduleData?.title ?? 'Bab Petualangan',
        subjectName: subject?.name ?? 'Materi Belajar',
        className: classData?.name ?? 'Kelas SD',
        gradeLevel: classData?.grade_level ?? 1,
        classId: classData?.id ?? '',
        babId: moduleData?.id ?? '',
        isCompleted,
        score,
        dueDate: item.due_date,
      });
    }

    const completedCount = missions.filter((m) => m.isCompleted).length;
    const pendingCount = missions.filter((m) => !m.isCompleted).length;

    return {
      success: true,
      data: {
        totalStars,
        userAvatarUrl,
        completedCount,
        pendingCount,
        missions,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
    return { success: false, error: msg };
  }
}
