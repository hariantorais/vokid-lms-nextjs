import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function DashboardLoading() {
  return (
    <TeacherLayoutShell
      title="Dashboard Guru"
      subtitle="Memuat ringkasan kelas..."
      badgeText="Memuat..."
      badgeVariant="sky"
      activeNavTab="HOME"
      maxWidth="sm"
    >
      <div className="space-y-3 animate-pulse select-none">
        {/* Top Banner Skeleton */}
        <div className="h-36 bg-gradient-to-br from-sky-600/30 to-indigo-700/30 rounded-3xl w-full" />

        {/* Tabs Segmented Skeleton */}
        <div className="h-11 bg-slate-200/80 rounded-2xl w-full" />

        {/* Feed Cards Skeleton */}
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded-full w-16" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="h-12 bg-slate-100 rounded-2xl w-full" />
              <div className="h-11 bg-slate-200/70 rounded-2xl w-full" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
