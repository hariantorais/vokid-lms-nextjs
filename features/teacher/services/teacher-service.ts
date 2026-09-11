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

export interface PendingReviewQueueItem {
  id: string;
  studentName: string;
  className: string;
  assignmentTitle: string;
  type: 'VOICE_TASK' | 'PHOTO_HOMEWORK';
  submittedAt: string;
  fileUrl: string;
}

export interface TeacherDashboardStats {
  totalStudents: number;
  totalPending: number;
  totalGraded: number;
  totalModules: number;
}

export interface TeacherDashboardData {
  teacherProfile: {
    id: string;
    fullName: string;
    role: string;
    avatarUrl: string | null;
  };
  classrooms: ClassRecord[];
  pendingReviewQueue: PendingReviewQueueItem[];
  stats: TeacherDashboardStats;
}

export function formatTimeAgo(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return 'Baru saja';
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'Baru saja';
    if (diffMin < 60) return `${diffMin} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  } catch {
    return 'Baru saja';
  }
}

/**
 * Mengambil daftar kelas murni dari tabel classes
 */
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
      console.error('[Teacher Service] Gagal mengambil kelas:', error.message);
      return { success: false, error: 'Gagal memuat daftar kelas guru.' };
    }

    return { success: true, data: (data ?? []) as ClassRecord[] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Kesalahan sistem saat mengambil kelas guru.';
    return { success: false, error: msg };
  }
}

/**
 * Mengambil kurikulum hierarkis lengkap murni berdasarkan ID kelas riil
 */
export async function getClassCurriculum(
  classId: string
): Promise<ActionResponse<ClassCurriculumData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil data kelas
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', classId)
      .maybeSingle();

    if (classError || !classData) {
      return { success: false, error: 'Data kelas tidak ditemukan di basis data.' };
    }

    // 2. Ambil subjects
    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', classId)
      .order('created_at', { ascending: true });

    if (subjectsError) {
      return { success: false, error: 'Gagal memuat mata pelajaran kelas.' };
    }

    const subjectIds = (subjectsData ?? []).map((s) => s.id);

    // 3. Ambil modules
    const { data: modulesData, error: modulesError } = await supabase
      .from('modules')
      .select('*')
      .in('subject_id', subjectIds.length > 0 ? subjectIds : ['00000000-0000-0000-0000-000000000000'])
      .order('order_index', { ascending: true });

    if (modulesError) {
      return { success: false, error: 'Gagal memuat modul pembelajaran.' };
    }

    const moduleIds = (modulesData ?? []).map((m) => m.id);

    // 4. Ambil lessons
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .in('module_id', moduleIds.length > 0 ? moduleIds : ['00000000-0000-0000-0000-000000000000'])
      .order('order_index', { ascending: true });

    if (lessonsError) {
      return { success: false, error: 'Gagal memuat materi pembelajaran.' };
    }

    const lessonIds = (lessonsData ?? []).map((l) => l.id);

    // 5. Ambil assignments beserta submissions terkait untuk penilaian
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from('assignments')
      .select('*, submissions(*)')
      .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['00000000-0000-0000-0000-000000000000'])
      .order('created_at', { ascending: true });

    if (assignmentsError) {
      console.warn('[Teacher Service Warning] Gagal mengambil tugas:', assignmentsError.message);
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

/**
 * Mengambil data kurikulum secara umum (dengan daftar semua kelas & kurikulum seluruh kelas untuk navigasi instan)
 */
export async function getAllCurriculumData(
  selectedClassId?: string
): Promise<ActionResponse<GeneralCurriculumData>> {
  try {
    const supabase = await createClient();

    // 1. Ambil seluruh kelas
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

    // 2. Ambil seluruh data kurikulum (subjects, modules, lessons, assignments) secara paralel untuk SEMUA kelas
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

    // Strukturkan data kurikulum per kelas (dictionary classId -> subjects)
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

    // Tentukan kelas aktif jika ada selectedClassId yang valid
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

interface RawPendingSubmission {

  id: string;
  file_url: string;
  status: string;
  submitted_at: string;
  student_id: string;
  profiles: {
    id: string;
    full_name: string;
  } | null;
  assignments: {
    id: string;
    prompt: string;
    type: 'VOICE_TASK' | 'PHOTO_HOMEWORK';
    lessons: {
      id: string;
      title: string;
      modules: {
        id: string;
        subjects: {
          id: string;
          classes: {
            id: string;
            name: string;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
}

/**
 * Mengambil ringkasan data dasbor guru murni dari tabel
 */
export async function getTeacherDashboardData(
  teacherId?: string
): Promise<ActionResponse<TeacherDashboardData>> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const activeTeacherId = teacherId ?? user?.id;

    let teacherProfile = {
      id: activeTeacherId ?? 'teacher-dev',
      fullName: 'Ibu Nurul Hidayah, S.Pd.',
      role: 'GURU',
      avatarUrl: null as string | null,
    };

    if (activeTeacherId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name, role, avatar_url')
        .eq('id', activeTeacherId)
        .maybeSingle();

      if (profile) {
        teacherProfile = {
          id: profile.id,
          fullName: profile.full_name,
          role: profile.role,
          avatarUrl: profile.avatar_url,
        };
      }
    }

    // Ambil data kelas nyata yang ada di tabel classes
    const { data: classesData, error: classErr } = await supabase
      .from('classes')
      .select('*')
      .order('grade_level', { ascending: true });

    if (classErr) {
      console.error('[Dashboard Error] Gagal memuat kelas:', classErr.message);
    }

    const classrooms: ClassRecord[] = (classesData ?? []) as unknown as ClassRecord[];

    // Ambil antrean tugas siswa berstatus PENDING
    const { data: pendingSubmissionsData, error: pendingError } = await supabase
      .from('submissions')
      .select(`
        id,
        file_url,
        status,
        submitted_at,
        student_id,
        profiles:student_id (
          id,
          full_name
        ),
        assignments:assignment_id (
          id,
          prompt,
          type,
          lessons:lesson_id (
            id,
            title,
            modules:module_id (
              id,
              subjects:subject_id (
                id,
                classes:class_id (
                  id,
                  name
                )
              )
            )
          )
        )
      `)
      .eq('status', 'PENDING')
      .order('submitted_at', { ascending: false });

    if (pendingError) {
      console.warn('[Dashboard Warning] Pending submissions lookup:', pendingError.message);
    }

    const rawPendingList = (pendingSubmissionsData ?? []) as unknown as RawPendingSubmission[];

    const pendingReviewQueue: PendingReviewQueueItem[] = rawPendingList.map((sub) => {
      const studentName = sub.profiles?.full_name ?? 'Siswa Vokid';
      const asg = sub.assignments;
      const lesson = asg?.lessons;
      const className = lesson?.modules?.subjects?.classes?.name ?? 'Kelas SD';
      const assignmentTitle = asg?.prompt ?? lesson?.title ?? 'Tugas Pembelajaran';
      const taskType: 'VOICE_TASK' | 'PHOTO_HOMEWORK' =
        asg?.type === 'PHOTO_HOMEWORK' ? 'PHOTO_HOMEWORK' : 'VOICE_TASK';

      return {
        id: sub.id,
        studentName,
        className,
        assignmentTitle,
        type: taskType,
        submittedAt: formatTimeAgo(sub.submitted_at),
        fileUrl: sub.file_url,
      };
    });

    const [studentsCountRes, pendingCountRes, gradedCountRes, modulesCountRes] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'SISWA'),
      supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
      supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'GRADED'),
      supabase.from('modules').select('*', { count: 'exact', head: true }),
    ]);

    const stats: TeacherDashboardStats = {
      totalStudents: studentsCountRes.count ?? 0,
      totalPending: pendingCountRes.count ?? pendingReviewQueue.length,
      totalGraded: gradedCountRes.count ?? 0,
      totalModules: modulesCountRes.count ?? 0,
    };

    return {
      success: true,
      data: {
        teacherProfile,
        classrooms,
        pendingReviewQueue,
        stats,
      },
    };
  } catch (err: unknown) {
    console.error('[Teacher Service] Error in getTeacherDashboardData:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan internal saat memuat data dashboard.';
    return { success: false, error: msg };
  }
}

export interface StudentListItem {
  id: string;
  fullName: string;
  className: string;
  gradeLevel: number;
  totalSubmissions: number;
  completedSubmissions: number;
}

/**
 * Mengambil daftar seluruh murid yang terdaftar
 */
export async function getTeacherStudentsData(): Promise<
  ActionResponse<{
    students: StudentListItem[];
    totalCount: number;
    classrooms: ClassRecord[];
  }>
> {
  try {
    const supabase = await createClient();

    // 1. Ambil data profil siswa, kelas, dan submissions secara paralel (Promise.all)
    const [studentsRes, classesRes, submissionsRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('role', 'SISWA')
        .order('full_name', { ascending: true }),
      supabase
        .from('classes')
        .select('*')
        .order('grade_level', { ascending: true }),
      supabase
        .from('submissions')
        .select('id, student_id, status'),
    ]);

    if (studentsRes.error) {
      console.error('[Teacher Service] Error fetching students:', studentsRes.error.message);
      return { success: false, error: 'Gagal memuat daftar siswa.' };
    }

    const studentsData = studentsRes.data ?? [];
    const classrooms = (classesRes.data ?? []) as ClassRecord[];
    const defaultClass = classrooms[0];
    const subs = submissionsRes.data ?? [];

    const students: StudentListItem[] = (studentsData ?? []).map((st) => {
      const studentSubs = subs.filter((s) => s.student_id === st.id);
      const gradedCount = studentSubs.filter((s) => s.status === 'GRADED').length;

      return {
        id: st.id,
        fullName: st.full_name,
        className: defaultClass ? defaultClass.name : 'Kelas 1 SD',
        gradeLevel: defaultClass ? defaultClass.grade_level : 1,
        totalSubmissions: studentSubs.length,
        completedSubmissions: gradedCount,
      };
    });

    return {
      success: true,
      data: {
        students,
        totalCount: students.length,
        classrooms,
      },
    };
  } catch (err: unknown) {
    console.error('[Teacher Service] Error in getTeacherStudentsData:', err);
    const msg = err instanceof Error ? err.message : 'Gagal memuat daftar siswa.';
    return { success: false, error: msg };
  }
}