import React from 'react';
import { notFound } from 'next/navigation';
import { getKelasCurriculumDetail } from './_services/kelas-curriculum.service';
import { KelasDetailClient } from './_components/KelasDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GuruKelasDetailPage({ params }: PageProps) {
  const { id: classId } = await params;

  const result = await getKelasCurriculumDetail(classId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <KelasDetailClient data={result.data} />;
}
