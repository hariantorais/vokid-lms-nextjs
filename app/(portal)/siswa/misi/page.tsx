import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  StudentMissionClient,
  type StarBreakdownData,
} from './_components/StudentMissionClient';
import { TrophyTier } from '@/features/student/types/trophy';

export default async function SiswaMisiPage() {
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
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, equipped_title, equipped_badge_icon, equipped_trophy_tier')
    .eq('id', activeUserId)
    .maybeSingle();

  const { count: completedLessonsCount } = await supabase
    .from('lesson_completions')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', activeUserId);

  const { count: completedTasksCount } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', activeUserId);

  const lessonsCount = completedLessonsCount ?? 0;
  const tasksCount = completedTasksCount ?? 0;
  const starsFromLessons = lessonsCount * 10;
  const starsFromTasks = tasksCount * 15;
  const totalStars = starsFromLessons + starsFromTasks;

  const validTier: TrophyTier = ['NONE', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND'].includes(
    profile?.equipped_trophy_tier ?? ''
  )
    ? (profile?.equipped_trophy_tier as TrophyTier)
    : 'NONE';

  const starBreakdown: StarBreakdownData = {
    lessonsCount,
    starsFromLessons,
    tasksCount,
    starsFromTasks,
    totalStars,
    currentEquippedTitle: profile?.equipped_title || 'Petualang Baru',
    currentEquippedIcon: profile?.equipped_badge_icon || '🌱',
    currentEquippedTier: validTier,
  };

  return (
    <StudentMissionClient
      starBreakdown={starBreakdown}
      studentName={profile?.full_name || 'Petualang'}
      avatarUrl={profile?.avatar_url || null}
    />
  );
}