import React from 'react';
import { notFound } from 'next/navigation';
import { getLessonTeachingDeskData } from '@/features/teacher/actions/acceleration-actions';
import { MejaAjarClient } from './_components/MejaAjarClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    lessonId: string;
  }>;
}

export default async function GuruMejaAjarPage({ params }: PageProps) {
  const { lessonId } = await params;

  const result = await getLessonTeachingDeskData(lessonId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <MejaAjarClient initialData={result.data} />;
}
