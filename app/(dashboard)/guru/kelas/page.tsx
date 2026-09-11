import React from 'react';
import { getTeacherClassrooms } from '@/features/teacher/services/teacher-service';
import { KelasListClient } from './_components/KelasListClient';

export const dynamic = 'force-dynamic';

export default async function GuruKelasListPage() {
  const result = await getTeacherClassrooms();
  const classrooms = result.success ? result.data : [];

  return <KelasListClient classrooms={classrooms} />;
}
