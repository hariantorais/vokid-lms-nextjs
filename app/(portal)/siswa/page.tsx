import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { StudentDashboardClient } from '@/features/student/components/dashboard/StudentDashboardClient';
import type {
  StudentDashboardProgressData,
  SubjectProgressItem,
} from '@/features/student/types/student-progress';

export const dynamic = 'force-dynamic';

export default async function StudentDashboardPage() {
  const supabase = await createClient();

  // 1. Ambil session user aktif
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 2. Ambil profil siswa (tanpa kolom class_id)
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .eq('id', user.id)
    .single();

  // 3. Ambil data kelas siswa dari tabel classes
  const { data: studentClass } = await supabase
    .from('classes')
    .select('id, name')
    .limit(1)
    .maybeSingle();

  const classId = studentClass?.id;

  // 4. Ambil mata pelajaran, modul, dan lesson di kelas tersebut
  let subjectsProgress: SubjectProgressItem[] = [];
  let totalAllBabs = 0;
  let totalDoneBabs = 0;

  if (classId) {
    const { data: subjectsData } = await supabase
      .from('subjects')
      .select(`
        id,
        name,
        modules (
          id,
          title,
          order_index,
          lessons (
            id,
            title
          )
        )
      `)
      .eq('class_id', classId)
      .order('name');

    // Menggunakan tabel lesson_completions sesuai skema database
    const { data: completionLogs } = await supabase
      .from('lesson_completions')
      .select('lesson_id')
      .eq('student_id', user.id);

    const studiedLessonIds = new Set(
      (completionLogs ?? []).map((l) => l.lesson_id)
    );

    const iconPool = ['📐', '🔬', '🇮🇩', '🇬🇧', '🎨', '📖', '🏃'];

    subjectsProgress = (subjectsData ?? []).map((subj, idx) => {
      const modules = subj.modules ?? [];
      const totalBabs = modules.length;
      totalAllBabs += totalBabs;

      let completedBabsCount = 0;
      let activeBab = modules[0] ?? null;

      for (const mod of modules) {
        const modLessons = mod.lessons ?? [];
        const isAllStudied =
          modLessons.length > 0 &&
          modLessons.every((l) => studiedLessonIds.has(l.id));

        if (isAllStudied) {
          completedBabsCount++;
        } else if (!activeBab || mod.order_index < activeBab.order_index) {
          activeBab = mod;
        }
      }

      totalDoneBabs += completedBabsCount;

      return {
        id: subj.id,
        name: subj.name,
        icon: iconPool[idx % iconPool.length],
        colorTheme: 'teal',
        totalBabs,
        completedBabs: completedBabsCount,
        currentBabTitle: activeBab?.title ?? 'Bab 1',
        currentBabOrder: activeBab?.order_index ?? 1,
        currentBabId: activeBab?.id ?? '',
      };
    });
  }

  // 5. Susun data progress dashboard
  const dashboardData: StudentDashboardProgressData = {
    studentName: profile?.full_name ?? 'Petualang Cilik',
    totalCompletedNodes: totalDoneBabs,
    totalNodes: totalAllBabs > 0 ? totalAllBabs : 1,
    totalStars: totalDoneBabs * 50,
    streakDays: 1,
    nextMission:
      subjectsProgress.length > 0 && subjectsProgress[0].currentBabId
        ? {
          babId: subjectsProgress[0].currentBabId,
          babOrder: subjectsProgress[0].currentBabOrder,
          subjectName: subjectsProgress[0].name,
          nodeTitle: subjectsProgress[0].currentBabTitle,
          nodeType: 'LESSON',
        }
        : null,
    subjects: subjectsProgress,
  };

  return (
    <StudentDashboardClient
      data={dashboardData}
    />
  );
}