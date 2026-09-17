// data/types.ts
// Definisi antarmuka universal untuk seeding seluruh mata pelajaran Fase A/SD

export interface SeedQuizQuestion {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
}

export interface SeedAssignment {
    type: 'PHOTO_HOMEWORK' | 'VOICE_TASK' | 'QUIZ_CBT';
    prompt: string;
    quiz_question_count?: number;
    passing_score?: number;
    quiz_questions?: SeedQuizQuestion[];
}

export interface SeedLkpdItem {
    id: string | number;
    type: string;
    question: string;
    answer_key?: string;
    explanation?: string;
    data?: Record<string, unknown>;
}

export interface SeedLessonItem {
    title: string;
    order_index: number;
    content_type: 'TEXT' | 'VIDEO' | 'AUDIO' | 'PDF';
    content_text: string;
    learning_objectives: string;
    allocated_minutes: number;
    required_materials: string[];
    intro_guide: {
        duration_minutes: number;
        greeting: string;
        ice_breaker: string;
        apperception: string;
        trigger_question: string;
    };
    mindful_guide: {
        duration_minutes: number;
        concept_focus: string;
        concrete_steps: string[];
        script_parent: string;
    };
    joyful_guide: {
        duration_minutes: number;
        game_title: string;
        game_rules: string[];
        multi_grade_adaptation: {
            child_level_basic: string;
            child_level_advanced: string;
        };
    };
    meaningful_guide: {
        duration_minutes: number;
        task_focus: string;
        worksheet_print_ready: {
            title: string;
            instructions: string;
            section_a_basic: SeedLkpdItem[];
            section_b_enrichment: SeedLkpdItem[];
        };
        reflection_questions: string[];
    };
    assignments: SeedAssignment[];
}

export interface SeedModuleItem {
    title: string;
    order_index: number;
    target_semester: number;
    week_target: number;
    lessons: SeedLessonItem[];
}