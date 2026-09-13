'use server';

import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StarSourceBreakdown {
    label: string;
    count: number;
    multiplier: number;
    total: number;
    icon: string;
    description: string;
}

export interface TrophyItem {
    id: string;
    title: string;
    description: string;
    rewardStars: number;
    icon: string;
    tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
    isUnlocked: boolean;
    currentProgress: number;
    targetProgress: number;
}

export interface StudentTrophyRoomData {
    totalStars: number;
    sources: StarSourceBreakdown[];
    trophies: TrophyItem[];
}

export async function getStudentTrophyRoomAction(): Promise<ActionResponse<StudentTrophyRoomData>> {
    try {
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
            return { success: false, error: 'Sesi kedaluwarsa.' };
        }

        // 1. Ambil jumlah pos materi selesai (1 pos = 10 Bintang)
        const { count: completedLessonsCount } = await supabase
            .from('lesson_completions')
            .select('*', { count: 'exact', head: true })
            .eq('student_id', activeUserId);

        // 2. Ambil jumlah pengumpulan tugas/kuis (1 tugas = 15 Bintang)
        const { count: completedSubmissionsCount } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('student_id', activeUserId);

        const lessonsDone = completedLessonsCount ?? 0;
        const tasksDone = completedSubmissionsCount ?? 0;

        const starsFromLessons = lessonsDone * 10;
        const starsFromTasks = tasksDone * 15;
        const grandTotalStars = starsFromLessons + starsFromTasks;

        // 3. Rincian Sumber Bintang
        const sources: StarSourceBreakdown[] = [
            {
                label: 'Pos Materi Takluk',
                count: lessonsDone,
                multiplier: 10,
                total: starsFromLessons,
                icon: '⛺',
                description: 'Tiap pos materi yang kamu baca dan pahami memberi +10 ⭐',
            },
            {
                label: 'Misi & Kuis Selesai',
                count: tasksDone,
                multiplier: 15,
                total: starsFromTasks,
                icon: '🎯',
                description: 'Tiap latihan atau tugas yang dikumpulkan memberi +15 ⭐',
            },
        ];

        // 4. Koleksi Piala Prestasi (Trophies)
        const trophies: TrophyItem[] = [
            {
                id: 't-pos-1',
                title: 'Penjelajah Pemula',
                description: 'Menyelesaikan 1 pos materi pertamamu',
                rewardStars: 10,
                icon: '🥉',
                tier: 'BRONZE',
                isUnlocked: lessonsDone >= 1,
                currentProgress: lessonsDone,
                targetProgress: 1,
            },
            {
                id: 't-tasks-1',
                title: 'Pejuang Kuis',
                description: 'Menyelesaikan 1 kuis atau misi latihan',
                rewardStars: 15,
                icon: '🎯',
                tier: 'BRONZE',
                isUnlocked: tasksDone >= 1,
                currentProgress: tasksDone,
                targetProgress: 1,
            },
            {
                id: 't-pos-5',
                title: 'Penakluk Pos Belajar',
                description: 'Menyelesaikan 5 pos materi di peta',
                rewardStars: 50,
                icon: '🥈',
                tier: 'SILVER',
                isUnlocked: lessonsDone >= 5,
                currentProgress: lessonsDone,
                targetProgress: 5,
            },
            {
                id: 't-tasks-5',
                title: 'Master Tantangan',
                description: 'Menuntaskan 5 tugas atau kuis petualangan',
                rewardStars: 75,
                icon: '🥇',
                tier: 'GOLD',
                isUnlocked: tasksDone >= 5,
                currentProgress: tasksDone,
                targetProgress: 5,
            },
            {
                id: 't-stars-100',
                title: 'Mahkota Seratus Cahaya',
                description: 'Mengumpulkan total akumulasi 100 Bintang Emas',
                rewardStars: 100,
                icon: '👑',
                tier: 'DIAMOND',
                isUnlocked: grandTotalStars >= 100,
                currentProgress: grandTotalStars,
                targetProgress: 100,
            },
        ];

        return {
            success: true,
            data: {
                totalStars: grandTotalStars,
                sources,
                trophies,
            },
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Gagal memuat trofi.';
        return { success: false, error: msg };
    }
}