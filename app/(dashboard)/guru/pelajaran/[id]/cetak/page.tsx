import React from 'react';
import { notFound } from 'next/navigation';
import { getLessonTeachingDeskData } from '@/features/teacher/actions/acceleration-actions';
import { CetakLkpdClient } from './_components/CetakLkpdClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CetakLkpdPage({ params }: PageProps) {
  const { id: lessonId } = await params;

  const result = await getLessonTeachingDeskData(lessonId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <CetakLkpdClient data={result.data} />;
}
