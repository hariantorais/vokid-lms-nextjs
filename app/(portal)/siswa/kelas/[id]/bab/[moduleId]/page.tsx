import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  Video,
  Volume2,
  FileText,
  Star,
} from 'lucide-react';
import { getStudentClassroom } from '@/features/student/services/student-service';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import { StudentModuleLessonList } from '@/features/student/components/StudentModuleLessonList';
import { cleanModuleTitle } from '@/lib/formatters';

export const dynamic = 'force-dynamic';

interface StudentModulePageProps {
  params: Promise<{
    id: string;
    moduleId: string;
  }>;
}

export default async function StudentModulePage({ params }: StudentModulePageProps) {
  const { id: classId, moduleId } = await params;

  const result = await getStudentClassroom(classId);
  if (!result.success || !result.data) {
    notFound();
  }

  const classroomData = result.data;

  // Cari module dan subject terkait
  let foundModule: (typeof classroomData.subjects)[0]['modules'][0] | null = null;
  let foundSubject: (typeof classroomData.subjects)[0] | null = null;

  for (const subj of classroomData.subjects) {
    const mod = subj.modules.find((m) => m.id === moduleId);
    if (mod) {
      foundModule = mod;
      foundSubject = subj;
      break;
    }
  }

  if (!foundModule || !foundSubject) {
    notFound();
  }

  return (
    <StudentLayoutShell
      title={cleanModuleTitle(foundModule.title)}
      subtitle={foundSubject.name}
      badgeText={`Bab ${foundModule.order_index}`}
      backHref={`/siswa/kelas/${classId}`}
      activeNavTab="MATERI"
      showBottomNav={true}
      maxWidth="sm"
      transparentHeader={true}
    >
      <StudentModuleLessonList
        classId={classId}
        subject={foundSubject}
        module={foundModule}
      />
    </StudentLayoutShell>
  );
}
