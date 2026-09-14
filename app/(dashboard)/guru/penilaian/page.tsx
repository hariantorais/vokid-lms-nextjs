import React from 'react';
import { getTeacherGradingListData } from '@/features/teacher/services/teacher-service';
import { TeacherGradingListView } from '@/features/teacher/components/TeacherGradingListView';

export const dynamic = 'force-dynamic';

export default async function GuruPenilaianListPage() {
  const result = await getTeacherGradingListData();

  const items = result.success ? result.data.items : [];
  const counts = result.success
    ? result.data.counts
    : { pending: 0, graded: 0, total: 0 };

  return <TeacherGradingListView items={items} counts={counts} />;
}