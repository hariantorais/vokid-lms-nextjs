import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function MateriLoading() {
  return (
    <TeacherLayoutShell
      title="Kurikulum Kelas"
      subtitle="Memuat materi & bab..."
      badgeText="Memuat..."
      badgeVariant="purple"
      activeNavTab="CURRICULUM"
      maxWidth="sm"
    >
      <div className="space-y-4 animate-pulse select-none">
        {/* Header bar skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-200 rounded w-1/3" />
          <div className="h-8 bg-slate-200 rounded-xl w-20" />
        </div>

        {/* Horizontal subject pills skeleton */}
        <div className="flex gap-2 overflow-x-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-28 bg-slate-200 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Chapter cards skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-slate-200 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
              <div className="w-5 h-5 bg-slate-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
