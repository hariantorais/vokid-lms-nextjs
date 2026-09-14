import React from 'react';
import { getTeacherStudentsData } from '@/features/teacher/services/teacher-service';
import { TeacherStudentsView } from '@/features/teacher/components/TeacherStudentsView';

export const dynamic = 'force-dynamic';

export default async function GuruSiswaPage() {
  const result = await getTeacherStudentsData();

  const students = result.success ? result.data.students : [];
  const totalCount = result.success ? result.data.totalCount : 0;
  const classrooms = result.success ? result.data.classrooms : [];

  return (
    <TeacherStudentsView
      students={students}
      totalCount={totalCount}
      classrooms={classrooms}
    />
  );
}