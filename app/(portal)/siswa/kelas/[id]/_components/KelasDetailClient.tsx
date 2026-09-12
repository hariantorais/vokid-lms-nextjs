'use client';

import React from 'react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import { AdaptivePortal } from './AdaptivePortal';
import type { StudentClassroomData } from '../_services/student-classroom.service';
import type { GradeLevel } from '@/types/database';

interface KelasDetailClientProps {
  classroomData: StudentClassroomData;
}

export function KelasDetailClient({ classroomData }: KelasDetailClientProps) {
  const gradeLevel = (classroomData.classData.grade_level ?? 1) as GradeLevel;
  const isFaseA = gradeLevel <= 2;
  const faseText = isFaseA ? 'Fase A' : gradeLevel <= 4 ? 'Fase B' : 'Fase C';

  return (
    <StudentLayoutShell
      title={classroomData.classData.name}
      subtitle={`Kelas ${gradeLevel} SD • ${faseText}`}
      badgeText={faseText}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref="/siswa"
      activeNavTab="DASHBOARD"
      showBottomNav={true}
      maxWidth="sm"
      starsCount={classroomData.totalStars ?? 0}
      userAvatarUrl={classroomData.userAvatarUrl}
    >
      <AdaptivePortal
        classroomData={classroomData}
        gradeLevel={gradeLevel}
      />
    </StudentLayoutShell>
  );
}
