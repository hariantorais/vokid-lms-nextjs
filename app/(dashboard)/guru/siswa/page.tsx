import React from 'react';
import { getTeacherStudentsData } from '@/features/teacher/services/teacher-service';
import { TeacherStudentsView } from '@/features/teacher/components/TeacherStudentsView';

export const dynamic = 'force-dynamic';

export default async function GuruSiswaPage() {
  const result = await getTeacherStudentsData();

  const students = result.success ? result.data.students : [];
  const classrooms = result.success ? result.data.classrooms : [];
  const defaultClassId = classrooms[0]?.id;

  return (
    <TeacherStudentsView
      students={students}
      classrooms={classrooms}
      defaultClassId={defaultClassId}
    />
  );
}
