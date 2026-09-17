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
    teacherName: string;
    subjectsReport: Array<{
        subjectId: string;
        subjectName: string;
        totalModules: number;
        totalTasks: number;
        completedTasks: number;
        averageScore: number;
        predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' | '-';
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
    assignment_id: string;
    assignments: {
        id: string;
        prompt: string;
        lesson_id: string;
        lessons: {
            id: string;
            module_id: string;
            modules: {
                id: string;
                subject_id: string;
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

interface RawAssignmentWithSubject {
    id: string;
    lessons: {
        modules: {
            subject_id: string;
        } | null;
    } | null;
}

interface RawModuleItem {
    id: string;
    subject_id: string;
}

export async function getStudentReportData(studentId: string): Promise<ActionResponse<StudentReportData>> {
    try {
        const supabase = await createClient();

        // 1. Ambil nama guru wali kelas yang sedang aktif
        const {
            data: { user },
        } = await supabase.auth.getUser();

        let teacherName = 'Guru Wali Kelas, S.Pd.';
        if (user?.id) {
            const { data: teacherProfile } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', user.id)
                .maybeSingle();

            if (teacherProfile?.full_name) {
                teacherName = teacherProfile.full_name;
            }
        }

        // 2. Profil siswa
        const { data: rawProfile, error: profileErr } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .eq('id', studentId)
            .maybeSingle();

        if (profileErr || !rawProfile) {
            return { success: false, error: 'Data profil siswa tidak ditemukan.' };
        }

        const profileData = rawProfile as unknown as StudentProfileQuery;

        // 3. Ambil data kelas
        const { data: classesData } = await supabase
            .from('classes')
            .select('id, name, grade_level')
            .limit(1)
            .maybeSingle();

        const classId = classesData?.id;

        // 4. Ambil SEMUA mata pelajaran di kelas
        let allSubjects: Array<{ id: string; name: string }> = [];
        if (classId) {
            const { data: subjectsData } = await supabase
                .from('subjects')
                .select('id, name')
                .eq('class_id', classId)
                .order('name', { ascending: true });

            allSubjects = subjectsData ?? [];
        }

        if (allSubjects.length === 0) {
            const { data: fallbackSubjects } = await supabase
                .from('subjects')
                .select('id, name')
                .order('name', { ascending: true });

            allSubjects = fallbackSubjects ?? [];
        }

        // 5. Hitung JUMLAH BAB (modules) per mata pelajaran
        const { data: rawModulesData } = await supabase
            .from('modules')
            .select('id, subject_id');

        const rawModules = (rawModulesData ?? []) as RawModuleItem[];
        const totalModulesPerSubject = new Map<string, number>();

        for (const mod of rawModules) {
            if (mod.subject_id) {
                totalModulesPerSubject.set(
                    mod.subject_id,
                    (totalModulesPerSubject.get(mod.subject_id) ?? 0) + 1
                );
            }
        }

        // 6. Hitung TOTAL SELURUH TUGAS per mata pelajaran
        const { data: rawAssignmentsData } = await supabase
            .from('assignments')
            .select(`
        id,
        lessons (
          modules (
            subject_id
          )
        )
      `);

        const rawAssignments = (rawAssignmentsData ?? []) as unknown as RawAssignmentWithSubject[];
        const totalAssignmentsPerSubject = new Map<string, number>();

        for (const asg of rawAssignments) {
            const subjectId = asg.lessons?.modules?.subject_id;
            if (subjectId) {
                totalAssignmentsPerSubject.set(
                    subjectId,
                    (totalAssignmentsPerSubject.get(subjectId) ?? 0) + 1
                );
            }
        }

        // 7. Data pos materi selesai
        const { data: completions } = await supabase
            .from('lesson_completions')
            .select('lesson_id')
            .eq('student_id', studentId);

        const completedLessonsCount = completions?.length ?? 0;

        // 8. Seluruh pengumpulan tugas siswa
        const { data: subsData } = await supabase
            .from('submissions')
            .select(`
        id,
        score,
        grade,
        status,
        assignment_id,
        assignments (
          id,
          prompt,
          lesson_id,
          lessons (
            id,
            module_id,
            modules (
              id,
              subject_id,
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

        // 9. Kelompokkan nilai per mata pelajaran
        const subjectScoresMap = new Map<
            string,
            {
                name: string;
                scores: number[];
            }
        >();

        for (const subj of allSubjects) {
            subjectScoresMap.set(subj.id, {
                name: subj.name,
                scores: [],
            });
        }

        for (const sub of rawSubs) {
            const subj = sub.assignments?.lessons?.modules?.subjects;
            if (!subj) continue;

            const current = subjectScoresMap.get(subj.id) ?? {
                name: subj.name,
                scores: [],
            };

            const val = sub.score ?? sub.grade;
            if (val !== null && val !== undefined) {
                current.scores.push(Number(val));
            }

            subjectScoresMap.set(subj.id, current);
        }

        // 10. Kalkulasi rata-rata per mapel dan rata-rata keseluruhan
        let totalScoreSum = 0;
        let gradedSubjectCount = 0;

        const subjectsReport = Array.from(subjectScoresMap.entries()).map(([subId, item]) => {
            const totalModules = totalModulesPerSubject.get(subId) ?? 0;
            const totalTasksInSubject = totalAssignmentsPerSubject.get(subId) ?? item.scores.length;
            const completedTasksCountForSub = item.scores.length;

            let avg = 0;
            if (totalTasksInSubject > 0) {
                const sumScore = item.scores.reduce((a, b) => a + b, 0);
                avg = Math.round(sumScore / totalTasksInSubject);
            }

            if (totalTasksInSubject > 0 && completedTasksCountForSub > 0) {
                totalScoreSum += avg;
                gradedSubjectCount += 1;
            }

            let predicate: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Bimbingan' | '-' = '-';
            let description = 'Belum ada tugas yang dikerjakan pada mata pelajaran ini.';

            if (totalTasksInSubject === 0) {
                description = 'Belum ada tugas yang dibuat untuk mata pelajaran ini.';
            } else if (completedTasksCountForSub > 0) {
                if (avg >= 90) {
                    predicate = 'Sangat Baik';
                    description = 'Menunjukkan penguasaan capaian pembelajaran dengan sangat baik dan konsisten di semua tugas.';
                } else if (avg >= 75) {
                    predicate = 'Baik';
                    description = 'Mampu menuntaskan sebagian besar tugas dengan pemahaman materi yang baik.';
                } else if (avg >= 60) {
                    predicate = 'Cukup';
                    description = 'Cukup memahami materi, perlu menuntaskan sisa tugas yang belum diserahkan.';
                } else {
                    predicate = 'Perlu Bimbingan';
                    description = 'Perlu pendampingan khusus dan penyelesaian tugas-tugas pembelajaran yang tertinggal.';
                }
            }

            return {
                subjectId: subId,
                subjectName: item.name,
                totalModules,
                totalTasks: totalTasksInSubject,
                completedTasks: completedTasksCountForSub,
                averageScore: avg,
                predicate,
                description,
            };
        });

        const overallAverage =
            gradedSubjectCount > 0 ? Math.round(totalScoreSum / gradedSubjectCount) : 0;

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
                teacherName,
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