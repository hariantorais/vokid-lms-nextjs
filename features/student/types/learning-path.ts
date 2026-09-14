import type { Lesson, Assignment, Submission } from '@/types/database';

export type SubmissionStatus = 'PENDING' | 'GRADED' | 'RESUBMIT' | null;

export interface StudentAssignment extends Assignment {
    submissions?: Submission[];
    hasSubmitted?: boolean;
    submissionId?: string;
    submissionStatus?: SubmissionStatus;
    submittedAt?: string | null;
    grade?: number | null;
    score?: number | null;
    fileUrl?: string | null;
    teacherNotes?: string | null;
    teacherAudioUrl?: string | null;
}

export interface LessonWithAssignment extends Lesson {
    assignments: StudentAssignment[];
    isCompleted?: boolean;
}

export interface SubjectLearningPath {
    id: string;
    name: string;
    lessons: LessonWithAssignment[];
}

export type PathNodeItem =
    | {
        id: string;
        nodeType: 'LESSON';
        lesson: LessonWithAssignment;
        title: string;
        orderLabel: string;
    }
    | {
        id: string;
        nodeType: 'ASSIGNMENT';
        lesson: LessonWithAssignment;
        assignment: StudentAssignment;
        title: string;
        orderLabel: string;
    };