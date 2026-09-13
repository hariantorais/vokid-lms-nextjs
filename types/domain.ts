import type { Database } from './database';

// Helper ekstrak baris tabel Supabase
export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];

export type Enums<T extends keyof Database['public']['Enums']> =
    Database['public']['Enums'][T];

// =============================================================================
// 1. DOMAIN ENUMS & UNION TYPES
// =============================================================================
export type UserRole = 'GURU' | 'SISWA' | 'ORANG_TUA' | 'ADMIN';
export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type ContentType = 'TEXT' | 'VIDEO' | 'AUDIO' | 'PDF';
export type AssignmentType = 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT';
export type SubmissionStatus = 'PENDING' | 'GRADED' | 'RESUBMIT';

// =============================================================================
// 2. PEDAGOGIC & ACCELERATION GUIDES (DEEP LEARNING FASE A)
// =============================================================================
export interface WorksheetPrintReady {
    title: string;
    instructions: string;
    section_a_basic: unknown[];
    section_b_enrichment: unknown[];
}

export interface PedagogicLessonGuide {
    intro?: {
        duration_minutes?: number;
        durationMinutes?: number;
        greeting?: string;
        ice_breaker?: string;
        iceBreaker?: string;
        apperception?: string;
        trigger_question?: string;
        triggerQuestion?: string;
    };
    mindful?: {
        duration_minutes?: number;
        durationMinutes?: number;
        concept_focus?: string;
        keyConcept?: string;
        concrete_steps?: string[];
        explorationSteps?: string[];
        script_parent?: string;
    };
    joyful?: {
        duration_minutes?: number;
        durationMinutes?: number;
        game_title?: string;
        gameName?: string;
        game_rules?: string[];
        gameRules?: string[];
        multi_grade_adaptation?: {
            child_level_basic: string;
            child_level_advanced: string;
        };
    };
    meaningful?: {
        duration_minutes?: number;
        durationMinutes?: number;
        task_focus?: string;
        worksheetDirections?: string;
        worksheet_print_ready?: WorksheetPrintReady;
        reflection_questions?: string[];
    };
}

// =============================================================================
// 3. TABLE ROWS & ALIASES
// =============================================================================
export type Profile = Tables<'profiles'>;
export type ClassRecord = Tables<'classes'>;
export type ClassRoom = ClassRecord;
export type Subject = Tables<'subjects'>;
export type Module = Tables<'modules'>;
export type Lesson = Tables<'lessons'>;
export type Assignment = Tables<'assignments'>;
export type Submission = Tables<'submissions'>;
export type LessonCompletion = Tables<'lesson_completions'>;
export type LessonSchedule = Tables<'lesson_schedules'>;
export type LearningCompetencyEvaluation = Tables<'learning_competency_evaluations'>;
export type QuizQuestion = Tables<'quiz_questions'>;