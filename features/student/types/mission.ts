// 1. KONTRAK DATA DARI DATABASE (Tetap dipakai)
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

// 2. KONTRAK DATA TAMPILAN UI MISI GAME
export type MissionStatus = 'AVAILABLE' | 'LOCKED' | 'COMPLETED';

export interface StudentMission {
    id: string;
    assignmentType: StudentAssignmentType;
    chapterTitle: string;  // diambil dari lesson.module.title atau lesson.title
    taskTitle: string;     // diambil dari prompt atau ringkasan tugas
    rewardStars: number;
    status: MissionStatus;
    lockReason?: string;
    actionUrl: string;
}

/**
 * Mapper: Mengubah data relasi database menjadi format kartu misi pos
 */
export function mapAssignmentToMission(
    assignment: AssignmentWithHierarchy,
    isLessonCompleted: boolean,
    isTaskSubmitted: boolean
): StudentMission {
    let status: MissionStatus = 'LOCKED';
    let lockReason: string | undefined = 'Selesaikan pos materi ini terlebih dahulu!';

    if (isTaskSubmitted) {
        status = 'COMPLETED';
        lockReason = undefined;
    } else if (isLessonCompleted) {
        status = 'AVAILABLE';
        lockReason = undefined;
    }

    const moduleName = assignment.lesson?.module?.title || 'Pos Materi';
    const lessonName = assignment.lesson?.title || 'Tantangan Belajar';

    return {
        id: assignment.id,
        assignmentType: assignment.type,
        chapterTitle: `${moduleName} • ${lessonName}`,
        taskTitle: assignment.prompt || 'Tugas Petualang',
        rewardStars: assignment.type === 'VOICE_TASK' ? 15 : 10,
        status,
        lockReason,
        actionUrl: `/siswa/tugas/${assignment.id}`,
    };
}