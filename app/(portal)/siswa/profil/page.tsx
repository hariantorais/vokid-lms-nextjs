import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { StudentProfileClient } from './_components/StudentProfileClient';

export default async function SiswaProfilPage() {
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

  // 1. Fetch data profil siswa
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', activeUserId)
    .single();

  if (!profile) {
    redirect('/auth/login');
  }

  // 2. Fetch progres untuk akumulasi bintang (Pos Materi x10 + Tugas x15)
  const { count: completedLessonsCount } = await supabase
    .from('lesson_completions')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', activeUserId);

  const { count: completedTasksCount } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })
    .eq('student_id', activeUserId);

  const totalStars =
    (completedLessonsCount ?? 0) * 10 + (completedTasksCount ?? 0) * 15;

  return (
    <StudentProfileClient />
  );
}