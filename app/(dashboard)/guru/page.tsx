import React from 'react';
import { getTeacherDashboardData } from '@/features/teacher/services/teacher-service';
import { TeacherDashboardMobile } from '@/features/teacher/components/TeacherDashboardMobile';

export const dynamic = 'force-dynamic';

export default async function GuruDashboardPage() {
  const result = await getTeacherDashboardData();

  const data = result.success
    ? result.data
    : {
      teacherProfile: {
        id: '11111111-1111-1111-1111-111111111111',
        fullName: 'Ibu Nurul Hidayah, S.Pd.',
        role: 'GURU',
        avatarUrl: null,
      },
      classrooms: [],
      pendingReviewQueue: [],
      stats: {
        totalStudents: 0,
        totalPending: 0,
        totalGraded: 0,
        totalModules: 0,
      },
    };

  const { teacherProfile, classrooms, pendingReviewQueue, stats } = data;

  return (
    <TeacherDashboardMobile
      teacherProfile={teacherProfile}
      classrooms={classrooms}
      pendingReviewQueue={pendingReviewQueue}
      stats={stats}
    />
  );
}