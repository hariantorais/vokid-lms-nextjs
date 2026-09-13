// Re-export kontrak utama Supabase
export * from './database';

// Re-export eksplisit domain extensions (tanpa tabrakan nama)
export type {
    Tables,
    Enums,
    UserRole,
    GradeLevel,
    ContentType,
    AssignmentType,
    SubmissionStatus,
    PedagogicLessonGuide,
    WorksheetPrintReady,
    Profile,
    ClassRecord,
    ClassRoom,
    Subject,
    Module,
    Lesson,
    Assignment,
    Submission,
    LessonCompletion,
    LessonSchedule,
    LearningCompetencyEvaluation,
    QuizQuestion,
} from './domain';