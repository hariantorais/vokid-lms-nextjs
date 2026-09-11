import React from 'react';
import { getAllCurriculumData } from '@/features/teacher/services/teacher-service';
import { TeacherGeneralCurriculumView } from '@/features/teacher/components/TeacherGeneralCurriculumView';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    classId?: string;
    moduleId?: string;
    babId?: string;
    subjectId?: string;
  }>;
}

export default async function GuruMateriPage({ searchParams }: PageProps) {
  const { classId } = await searchParams;

  const result = await getAllCurriculumData(classId);

  const curriculumData = result.success
    ? result.data
    : {
        classrooms: [],
        activeClass: null,
        subjects: [],
      };

  return <TeacherGeneralCurriculumView data={curriculumData} />;
}
