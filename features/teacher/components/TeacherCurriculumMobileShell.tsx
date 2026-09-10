'use client';

import React from 'react';
import { TeacherLayoutShell } from './TeacherLayoutShell';
import { CurriculumHierarchyView } from './CurriculumHierarchyView';
import type { SubjectOption, ModuleData } from './ModuleManagementCard';
import type { ModuleWithLessonsAndAssignments } from './AssignmentManagementCard';

interface TeacherCurriculumMobileShellProps {
  classId: string;
  classData: {
    id: string;
    name: string;
    grade_level: number;
    academic_year: string;
  };
  subjects: SubjectOption[];
  modulesList: ModuleData[];
  modulesWithLessonsAndAssignments: ModuleWithLessonsAndAssignments[];
  totalLessons: number;
  totalAssignments: number;
}

export function TeacherCurriculumMobileShell({
  classId,
  classData,
  subjects,
  modulesWithLessonsAndAssignments,
}: TeacherCurriculumMobileShellProps) {
  const isFaseA = classData.grade_level <= 2;
  const faseLabel = isFaseA ? 'Fase A (Kelas 1–2)' : 'Fase B/C (Kelas 3–6)';

  return (
    <TeacherLayoutShell
      title={`Kurikulum: ${classData.name}`}
      badgeText={faseLabel}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref="/guru"
      activeNavTab="CURRICULUM"
      defaultClassId={classId}
    >
      {/* Alur Bertingkat: Bab (Card) -> Klik -> Sub-bab (Materi) -> Tugas & Penilaian */}
      <CurriculumHierarchyView
        classId={classId}
        className={classData.name}
        gradeLevel={classData.grade_level}
        academicYear={classData.academic_year}
        subjects={subjects}
        modules={modulesWithLessonsAndAssignments}
      />
    </TeacherLayoutShell>
  );
}