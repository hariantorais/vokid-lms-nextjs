import type { ClassRecord, Subject, Module, Lesson, Assignment } from '@/types/database';

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

export interface StudentListItem {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    className: string;
    gradeLevel: number;
    totalSubmissions: number;
    completedSubmissions: number;
    totalStars: number;
    completedLessonsCount: number;
    completedTasksCount: number;
    recentSubmissions: Array<{
        id: string;
        assignmentTitle: string;
        subjectName: string;
        type: string;
        score: number | null;
        status: string;
        submittedAt: string;
    }>;
}

export interface TeacherGradingListItem {
    id: string;
    studentId: string;
    studentName: string;
    studentAvatar: string | null;
    lessonTitle: string;
    subjectName: string;
    className: string;
    taskType: 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT';
    assignmentPrompt: string;
    fileUrl: string;
    status: 'PENDING' | 'GRADED';
    score: number | null;
    submittedAt: string;
}

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