import React from 'react';
import { notFound } from 'next/navigation';
import { getClassCurriculum } from '@/features/teacher/services/teacher-service';
import { TeacherCurriculumMobileShell } from '@/features/teacher/components/TeacherCurriculumMobileShell';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function KelolaKurikulumKelasPage({ params }: PageProps) {
  const { id: classId } = await params;

  const result = await getClassCurriculum(classId);

  if (!result.success) {
    notFound();
  }

  const { classData, subjects } = result.data;

  const subjectOptions = subjects.map((s) => ({
    id: s.id,
    name: s.name,
    code: s.code,
  }));

  const modulesList = subjects.flatMap((s) =>
    s.modules.map((m) => ({
      id: m.id,
      title: m.title,
      order_index: m.order_index,
      subject_id: s.id,
      subject_name: s.name,
      lessons_count: m.lessons?.length ?? 0,
    }))
  );

  const modulesWithLessonsAndAssignments = subjects.flatMap((s) => s.modules);

  const totalLessons = modulesWithLessonsAndAssignments.reduce(
    (acc, m) => acc + (m.lessons?.length ?? 0),
    0
  );

  const totalAssignments = modulesWithLessonsAndAssignments.reduce(
    (acc, m) =>
      acc +
      (m.lessons?.reduce((lAcc, l) => lAcc + (l.assignments?.length ?? 0), 0) ?? 0),
    0
  );

  return (
    <TeacherCurriculumMobileShell
      classId={classId}
      classData={{
        id: classData.id,
        name: classData.name,
        grade_level: classData.grade_level,
        academic_year: classData.academic_year,
      }}
      subjects={subjectOptions}
      modulesList={modulesList}
      modulesWithLessonsAndAssignments={modulesWithLessonsAndAssignments}
      totalLessons={totalLessons}
      totalAssignments={totalAssignments}
    />
  );
}