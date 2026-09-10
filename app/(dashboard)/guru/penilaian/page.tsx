import React from 'react';
import { getTeacherDashboardData } from '@/features/teacher/services/teacher-service';
import { TeacherPenilaianView } from '@/features/teacher/components/TeacherPenilaianView';

export const dynamic = 'force-dynamic';

export default async function GuruPenilaianPage() {
  const result = await getTeacherDashboardData();

  const queue = result.success ? result.data.pendingReviewQueue : [];
  const defaultClassId = result.success && result.data.classrooms[0] ? result.data.classrooms[0].id : undefined;

  return (
    <TeacherPenilaianView
      queue={queue}
      defaultClassId={defaultClassId}
    />
  );
}
