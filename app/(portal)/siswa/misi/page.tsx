import React from 'react';
import { getStudentMissions } from '../_services/student-missions.service';
import { StudentMisiClient } from './_components/StudentMisiClient';

export const dynamic = 'force-dynamic';

export default async function SiswaMisiPage() {
  const result = await getStudentMissions();
  const initialData = result.success && result.data
    ? result.data
    : {
        totalStars: 0,
        completedCount: 0,
        pendingCount: 0,
        missions: [],
      };

  return <StudentMisiClient initialData={initialData} />;
}
