import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function KelolaKurikulumKelasPage({ params }: PageProps) {
  const { id: classId } = await params;
  redirect(`/guru/kelas/${classId}`);
}