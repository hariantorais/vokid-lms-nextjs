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

  redirect('/guru/kelas');
}
