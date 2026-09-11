import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface StudentModulePageProps {
  params: Promise<{
    id: string;
    moduleId: string;
  }>;
}

export default async function StudentModulePage({ params }: StudentModulePageProps) {
  const { moduleId } = await params;
  redirect(`/siswa/bab/${moduleId}`);
}
