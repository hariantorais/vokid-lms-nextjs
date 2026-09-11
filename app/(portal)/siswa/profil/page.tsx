import React from 'react';
import { notFound } from 'next/navigation';
import { getStudentProfileAction } from '../_actions/profile.actions';
import { StudentProfileClient } from './_components/StudentProfileClient';
import { getStudentClassrooms } from '../_services/siswa-portal.service';

export const dynamic = 'force-dynamic';

export default async function SiswaProfilPage() {
  const profileRes = await getStudentProfileAction();
  if (!profileRes.success || !profileRes.data) {
    notFound();
  }

  const portalRes = await getStudentClassrooms();
  const totalStars = portalRes.success ? (portalRes.data?.totalStars ?? 0) : 0;

  return (
    <StudentProfileClient
      initialProfile={profileRes.data}
      totalStars={totalStars}
    />
  );
}
