import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface StudentReportData {
    student: {
        id: string;
        fullName: string;
        avatarUrl: string | null;
        className: string;
        gradeLevel: number;
        totalStars: number;
        completedLessonsCount: number;
        completedTasksCount: number;
    };
    subjectsReport: Array<{
        subjectId: string;
        subjectName: string;
        totalTasks: number;
        completedTasks: number;
        averageScore: number;
        predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan';
        description: string;
    }>;
    overallAverage: number;
    reportDate: string;
}

interface RawReportSubItem {
    id: string;
    score: number | null;
    grade: number | null;
    status: string;
    assignments: {
        id: string;
        prompt: string;
        lessons: {
            modules: {
                subjects: {
                    id: string;
                    name: string;
                } | null;
            } | null;
        } | null;
    } | null;
}

interface StudentProfileQuery {
    id: string;
    full_name: string;
    avatar_url: string | null;
    class_id?: string | null;
}

export async function getStudentReportData(studentId: string): Promise<ActionResponse<StudentReportData>> {
    try {
        const supabase = await createClient();

        // 1. Profil siswa & data kelas (Hanya select kolom yang ada di type resmi untuk cegah SelectQueryError)
        const { data: rawProfile, error: profileErr } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .eq('id', studentId)
            .maybeSingle();

        if (profileErr || !rawProfile) {
            return { success: false, error: 'Data profil siswa tidak ditemukan.' };
        }

        const profileData = rawProfile as unknown as StudentProfileQuery;

        // Ambil info kelas default
        const { data: classesData } = await supabase
            .from('classes')
            .select('id, name, grade_level')
            .limit(1)
            .maybeSingle();

        // 2. Data materi selesai (lesson_completions)
        const { data: completions } = await supabase
            .from('lesson_completions')
            .select('lesson_id')
            .eq('student_id', studentId);

        const completedLessonsCount = completions?.length ?? 0;

        // 3. Seluruh tugas yang dikerjakan siswa
        const { data: subsData } = await supabase
            .from('submissions')
            .select(`
        id,
        score,
        grade,
        status,
        assignments (
          id,
          prompt,
          lessons (
            modules (
              subjects (
                id,
                name
              )
            )
          )
        )
      `)
            .eq('student_id', studentId);

        const rawSubs = (subsData ?? []) as unknown as RawReportSubItem[];
        const completedTasksCount = rawSubs.length;
        const totalStars = completedLessonsCount * 10 + completedTasksCount * 15;

        // 4. Kelompokkan nilai per mata pelajaran
        const subjectMap = new Map<
            string,
            {
                name: string;
                scores: number[];
                totalTasks: number;
            }
        >();

        for (const sub of rawSubs) {
            const subject = sub.assignments?.lessons?.modules?.subjects;
            const subjectId = subject?.id ?? 'umum';
            const subjectName = subject?.name ?? 'Muatan Pembelajaran';
            const scoreVal = sub.score ?? sub.grade;

            const current = subjectMap.get(subjectId) ?? {
                name: subjectName,
                scores: [],
                totalTasks: 0,
            };

            current.totalTasks += 1;
            if (scoreVal !== null && scoreVal !== undefined) {
                current.scores.push(Number(scoreVal));
            }

            subjectMap.set(subjectId, current);
        }

        let totalScoreSum = 0;
        let totalScoreCount = 0;

        const subjectsReport = Array.from(subjectMap.entries()).map(([subId, item]) => {
            const avg =
                item.scores.length > 0
                    ? Math.round(item.scores.reduce((a, b) => a + b, 0) / item.scores.length)
                    : 80;

            totalScoreSum += avg;
            totalScoreCount += 1;

            let predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' = 'Baik';
            let description = 'Menunjukkan penguasaan capaian pembelajaran dengan baik.';

            if (avg >= 90) {
                predicate = 'Sangat Baik';
                description = 'Sangat aktif, kreatif, dan tuntas melampaui seluruh indikator capaian tujuan.';
            } else if (avg >= 75) {
                predicate = 'Baik';
                description = 'Mampu memahami materi dengan baik dan konsisten menyelesaikan tugas.';
            } else if (avg >= 60) {
                predicate = 'Cukup';
                description = 'Cukup memahami konsep dasar, disarankan memperbanyak latihan mandiri.';
            } else {
                predicate = 'Perlu Bimbingan';
                description = 'Perlu pendampingan khusus dan bimbingan dalam penguatan materi pokok.';
            }

            return {
                subjectId: subId,
                subjectName: item.name,
                totalTasks: item.totalTasks,
                completedTasks: item.scores.length,
                averageScore: avg,
                predicate,
                description,
            };
        });

        const overallAverage =
            totalScoreCount > 0 ? Math.round(totalScoreSum / totalScoreCount) : 85;

        const reportDate = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        return {
            success: true,
            data: {
                student: {
                    id: profileData.id,
                    fullName: profileData.full_name,
                    avatarUrl: profileData.avatar_url,
                    className: classesData?.name ?? 'Kelas SD',
                    gradeLevel: classesData?.grade_level ?? 1,
                    totalStars,
                    completedLessonsCount,
                    completedTasksCount,
                },
                subjectsReport,
                overallAverage,
                reportDate,
            },
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Gagal memuat rekap rapor siswa.';
        return { success: false, error: msg };
    }
}