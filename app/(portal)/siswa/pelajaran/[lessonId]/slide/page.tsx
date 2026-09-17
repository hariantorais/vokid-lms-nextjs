import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { LessonSlideReader } from '@/features/student/components/lesson/LessonSlideReader';
import type { Lesson } from '@/types/database';

export const dynamic = 'force-dynamic';

interface LessonSlidePageProps {
    params: Promise<{
        lessonId: string;
    }>;
}

export default async function LessonSlidePage({ params }: LessonSlidePageProps) {
    const { lessonId } = await params;
    const supabase = await createClient();

    // 1. Verifikasi pengguna aktif
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const activeStudentId =
        user?.id ??
        (process.env.NODE_ENV === 'development'
            ? '22222222-2222-2222-2222-222222222222'
            : null);

    if (!activeStudentId) {
        redirect('/auth/login');
    }

    // 2. Ambil data materi lesson
    const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

    if (lessonError || !lesson) {
        notFound();
    }

    // 3. Cek apakah sudah ditandai selesai (lesson_completions)
    const { data: completion } = await supabase
        .from('lesson_completions')
        .select('id')
        .eq('lesson_id', lessonId)
        .eq('student_id', activeStudentId)
        .maybeSingle();

    const isInitiallyStudied = !!completion;
    const backUrl = lesson.module_id ? `/siswa/bab/${lesson.module_id}` : '/siswa';

    return (
        <LessonSlideReader
            lesson={lesson as Lesson}
            backUrl={backUrl}
            isInitiallyStudied={isInitiallyStudied}
        />
    );
}
