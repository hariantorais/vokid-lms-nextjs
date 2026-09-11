import React from 'react';
import { getStudentClassrooms } from '@/features/student/services/student-service';
import { SiswaPortalClient } from './_components/SiswaPortalClient';
import type { ClassRecord } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function SiswaPortalPage() {
  const result = await getStudentClassrooms();
  const classrooms: ClassRecord[] = result.success && result.data ? result.data.classrooms : [];
  const totalStars: number = result.success && result.data?.totalStars !== undefined ? result.data.totalStars : 0;
  const userAvatarUrl: string | null = result.success && result.data?.userAvatarUrl ? result.data.userAvatarUrl : null;

  return <SiswaPortalClient classrooms={classrooms} starsCount={totalStars} userAvatarUrl={userAvatarUrl} />;
}