import React from 'react';
import { notFound } from 'next/navigation';
import { getStudentBabDetail } from '@/features/student/services/student-bab.service';
import { StudentBabDetailClient } from '@/features/student/components';

export const dynamic = 'force-dynamic';

interface StudentBabPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentBabPage({ params }: StudentBabPageProps) {
  const { id: babId } = await params;

  const result = await getStudentBabDetail(babId);
  if (!result.success || !result.data) {
    notFound();
  }

  const { module } = result.data;
  const classId = module.subject?.class_id;

  return (
    <StudentBabDetailClient
      data={result.data}
      classId={classId}
    />
  );
}