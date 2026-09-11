import { redirect } from 'next/navigation';
import { getTeacherClassrooms } from '@/features/teacher/services/teacher-service';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    classId?: string;
  }>;
}

export default async function GuruMateriPage({ searchParams }: PageProps) {
  const { classId } = await searchParams;

  if (classId) {
    redirect(`/guru/kelas/${classId}`);
  }

  const result = await getTeacherClassrooms();
  const classrooms = result.success ? result.data : [];

  if (classrooms.length > 0) {
    redirect(`/guru/kelas/${classrooms[0].id}`);
  }

  redirect('/guru/kelas');
}
