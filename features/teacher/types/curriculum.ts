import type { Module, Lesson, Assignment } from '@/types/database';

export interface SubjectOption {
  id: string;
  name: string;
  code?: string;
}

export interface ModuleData {
  id: string;
  title: string;
  order_index: number;
  subject_id: string;
  subject_name?: string;
  lessons_count?: number;
}

export interface ModuleWithLessonsAndAssignments extends Module {
  lessons: Array<
    Lesson & {
      assignments: Assignment[];
    }
  >;
}
