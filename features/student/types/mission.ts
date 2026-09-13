export type StudentAssignmentType = 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT';

export interface ClassRelation {
    id: string;
    name: string;
    grade_level: number;
}

export interface SubjectRelation {
    id: string;
    name: string;
    class: ClassRelation | null;
}

export interface ModuleRelation {
    id: string;
    title: string;
    subject: SubjectRelation | null;
}

export interface LessonRelation {
    id: string;
    title: string;
    module: ModuleRelation | null;
}

export interface AssignmentWithHierarchy {
    id: string;
    type: StudentAssignmentType;
    prompt: string;
    instruction_audio_url: string | null;
    due_date: string | null;
    lesson_id: string;
    lesson: LessonRelation | null;
}