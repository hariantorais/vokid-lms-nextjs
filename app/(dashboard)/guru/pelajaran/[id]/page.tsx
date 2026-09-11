import React from 'react';
import { notFound } from 'next/navigation';
import { getPelajaranDetail } from './_services/pelajaran-detail.service';
import { PelajaranDetailClient } from './_components/PelajaranDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GuruPelajaranDetailPage({ params }: PageProps) {
  const { id: lessonId } = await params;

  const result = await getPelajaranDetail(lessonId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <PelajaranDetailClient data={result.data} />;
}
