import React from 'react';
import { notFound } from 'next/navigation';
import { getBabDetail } from './_services/bab-detail.service';
import { BabDetailClient } from './_components/BabDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GuruBabDetailPage({ params }: PageProps) {
  const { id: babId } = await params;

  const result = await getBabDetail(babId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <BabDetailClient data={result.data} />;
}
