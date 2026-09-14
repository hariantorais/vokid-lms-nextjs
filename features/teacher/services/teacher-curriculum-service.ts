import { createClient } from '@/lib/supabase/server';
import type { ClassRecord, Subject, Module, Lesson, Assignment } from '@/types/database';
import type { ActionResponse } from '@/features/shared/types/storage';

export interface ClassCurriculumData {
    classData: ClassRecord;
    subjects: Array<
        Subject & {
            modules: Array<
                Module & {
                    lessons: Array<
                        Lesson & {
                            assignments: Assignment[];
                        }
                    >;
                }
            >;
        }
    >;
    flatModules: Array<{
        id: string;
        title: string;
        subjectName: string;
        subjectId?: string;
    }>;
    flatLessons: Array<{
        id: string;
        title: string;
        moduleTitle: string;
        moduleId?: string;
        contentType: Lesson['content_type'];
        assignments?: Assignment[];
    }>;
}

export interface GeneralCurriculumData {
    classrooms: ClassRecord[];
    activeClass: ClassRecord | null;
    subjects: Array<
        Subject & {
            modules: Array<
                Module & {
                    lessons: Array<
                        Lesson & {
                            assignments: Assignment[];
                        }
                    >;
                }
            >;
        }
    >;
    allCurriculumsByClass?: Record<
        string,
        Array<
            Subject & {
                modules: Array<
                    Module & {
                        lessons: Array<
                            Lesson & {
                                assignments: Assignment[];
                            }
                        >;
                    }
                >;
            }
        >
    >;
}

export async function getTeacherClassrooms(
    teacherId?: string
): Promise<ActionResponse<ClassRecord[]>> {
    try {
        const supabase = await createClient();

        let query = supabase
            .from('classes')
            .select('*')
            .order('grade_level', { ascending: true });

        if (teacherId) {
            query = query.eq('created_by', teacherId);
        }

        const { data, error } = await query;

        if (error) {
            console.error('[Teacher Curriculum] Gagal mengambil kelas:', error.message);
            return { success: false, error: 'Gagal memuat daftar kelas guru.' };
        }

        return { success: true, data: (data ?? []) as ClassRecord[] };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat mengambil kelas guru.';
        return { success: false, error: msg };
    }
}

export async function getClassCurriculum(
    classId: string
): Promise<ActionResponse<ClassCurriculumData>> {
    try {
        const supabase = await createClient();

        const { data: classData, error: classError } = await supabase
            .from('classes')
            .select('*')
            .eq('id', classId)
            .maybeSingle();

        if (classError || !classData) {
            return { success: false, error: 'Data kelas tidak ditemukan di basis data.' };
        }

        const { data: subjectsData, error: subjectsError } = await supabase
            .from('subjects')
            .select('*')
            .eq('class_id', classId)
            .order('created_at', { ascending: true });

        if (subjectsError) {
            return { success: false, error: 'Gagal memuat mata pelajaran kelas.' };
        }

        const subjectIds = (subjectsData ?? []).map((s) => s.id);

        const { data: modulesData, error: modulesError } = await supabase
            .from('modules')
            .select('*')
            .in('subject_id', subjectIds.length > 0 ? subjectIds : ['00000000-0000-0000-0000-000000000000'])
            .order('order_index', { ascending: true });

        if (modulesError) {
            return { success: false, error: 'Gagal memuat modul pembelajaran.' };
        }

        const moduleIds = (modulesData ?? []).map((m) => m.id);

        const { data: lessonsData, error: lessonsError } = await supabase
            .from('lessons')
            .select('*')
            .in('module_id', moduleIds.length > 0 ? moduleIds : ['00000000-0000-0000-0000-000000000000'])
            .order('order_index', { ascending: true });

        if (lessonsError) {
            return { success: false, error: 'Gagal memuat materi pembelajaran.' };
        }

        const lessonIds = (lessonsData ?? []).map((l) => l.id);

        const { data: assignmentsData, error: assignmentsError } = await supabase
            .from('assignments')
            .select('*, submissions(*)')
            .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000'])
            .order('created_at', { ascending: true });

        if (assignmentsError) {
            console.warn('[Teacher Curriculum Warning] Gagal mengambil tugas:', assignmentsError.message);
        }

        const flatModules: ClassCurriculumData['flatModules'] = [];
        const flatLessons: ClassCurriculumData['flatLessons'] = [];

        const structuredSubjects = (subjectsData ?? []).map((subj) => {
            const relatedModules = (modulesData ?? [])
                .filter((m) => m.subject_id === subj.id)
                .map((mod) => {
                    flatModules.push({
                        id: mod.id,
                        title: mod.title,
                        subjectName: subj.name,
                        subjectId: subj.id,
                    });

                    const relatedLessons = (lessonsData ?? [])
                        .filter((l) => l.module_id === mod.id)
                        .map((les) => {
                            const relatedAssignments = (assignmentsData ?? []).filter(
                                (a) => a.lesson_id === les.id
                            );

                            flatLessons.push({
                                id: les.id,
                                title: les.title,
                                moduleTitle: mod.title,
                                moduleId: mod.id,
                                contentType: les.content_type,
                                assignments: relatedAssignments,
                            });

                            return {
                                ...les,
                                assignments: relatedAssignments,
                            };
                        });

                    return {
                        ...mod,
                        lessons: relatedLessons,
                    };
                });

            return {
                ...subj,
                modules: relatedModules,
            };
        });

        return {
            success: true,
            data: {
                classData: classData as unknown as ClassRecord,
                subjects: structuredSubjects,
                flatModules,
                flatLessons,
            },
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Kesalahan internal saat mengambil kurikulum.';
        return { success: false, error: msg };
    }
}

export async function getAllCurriculumData(
    selectedClassId?: string
): Promise<ActionResponse<GeneralCurriculumData>> {
    try {
        const supabase = await createClient();

        const { data: classrooms, error: classError } = await supabase
            .from('classes')
            .select('*')
            .order('grade_level', { ascending: true });

        if (classError) {
            return { success: false, error: 'Gagal memuat daftar kelas.' };
        }

        const classList = (classrooms ?? []) as ClassRecord[];
        if (classList.length === 0) {
            return {
                success: true,
                data: {
                    classrooms: [],
                    activeClass: null,
                    subjects: [],
                    allCurriculumsByClass: {},
                },
            };
        }

        const classIds = classList.map((c) => c.id);

        const [subjectsRes, modulesRes, lessonsRes, assignmentsRes] = await Promise.all([
            supabase
                .from('subjects')
                .select('*')
                .in('class_id', classIds)
                .order('created_at', { ascending: true }),
            supabase
                .from('modules')
                .select('*')
                .order('order_index', { ascending: true }),
            supabase
                .from('lessons')
                .select('*')
                .order('order_index', { ascending: true }),
            supabase
                .from('assignments')
                .select('*, submissions(*)')
                .order('created_at', { ascending: true }),
        ]);

        if (subjectsRes.error) {
            return { success: false, error: 'Gagal memuat mata pelajaran.' };
        }

        const allSubjects = subjectsRes.data ?? [];
        const allModules = modulesRes.data ?? [];
        const allLessons = lessonsRes.data ?? [];
        const allAssignments = assignmentsRes.data ?? [];

        const allCurriculumsByClass: GeneralCurriculumData['allCurriculumsByClass'] = {};

        for (const cls of classList) {
            const classSubjects = allSubjects.filter((s) => s.class_id === cls.id);

            const structuredSubjects = classSubjects.map((subj) => {
                const relatedModules = allModules
                    .filter((m) => m.subject_id === subj.id)
                    .map((mod) => {
                        const relatedLessons = allLessons
                            .filter((l) => l.module_id === mod.id)
                            .map((les) => {
                                const relatedAssignments = allAssignments.filter(
                                    (a) => a.lesson_id === les.id
                                );
                                return {
                                    ...les,
                                    assignments: relatedAssignments,
                                };
                            });

                        return {
                            ...mod,
                            lessons: relatedLessons,
                        };
                    });

                return {
                    ...subj,
                    modules: relatedModules,
                };
            });

            allCurriculumsByClass[cls.id] = structuredSubjects;
        }

        const targetClass = selectedClassId ? classList.find((c) => c.id === selectedClassId) ?? null : null;
        const activeSubjects = targetClass ? (allCurriculumsByClass[targetClass.id] ?? []) : [];

        return {
            success: true,
            data: {
                classrooms: classList,
                activeClass: targetClass,
                subjects: activeSubjects,
                allCurriculumsByClass,
            },
        };
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Kesalahan internal saat mengambil kurikulum umum.';
        return { success: false, error: msg };
    }
}