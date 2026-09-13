import type { LessonWithAssignment, StudentAssignment } from '@/app/(portal)/siswa/bab/[id]/services/student-bab.service';

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