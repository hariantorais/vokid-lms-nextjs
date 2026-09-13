export interface SubjectProgressItem {
    id: string;
    name: string;
    icon: string; // misal: '📐', '🔬', '🇮🇩', '🇬🇧'
    colorTheme: 'teal' | 'amber' | 'rose' | 'indigo' | 'emerald';
    totalBabs: number;
    completedBabs: number;
    currentBabTitle: string;
    currentBabOrder: number;
    currentBabId: string;
}

export interface NextMissionTarget {
    babId: string;
    babOrder: number;
    subjectName: string;
    nodeTitle: string;
    nodeType: 'LESSON' | 'ASSIGNMENT';
}

export interface StudentDashboardProgressData {
    studentName: string;
    totalCompletedNodes: number;
    totalNodes: number;
    totalStars: number;
    streakDays: number;
    nextMission: NextMissionTarget | null;
    subjects: SubjectProgressItem[];
}