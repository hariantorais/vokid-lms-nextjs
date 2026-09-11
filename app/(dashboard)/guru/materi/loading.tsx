import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function GuruMateriLoading() {
  return (
    <TeacherLayoutShell
      title="Kelola Materi & Kurikulum"
      subtitle="Memuat materi kurikulum kelas..."
      badgeText="Memuat..."
      badgeVariant="purple"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4 animate-pulse select-none">
        {/* Class selector bar skeleton */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100/70" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
            <div className="w-8 h-8 rounded-xl bg-slate-200" />
          </div>
          <div className="flex gap-2 overflow-x-hidden pt-1 border-t border-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-24 bg-slate-200/70 rounded-xl shrink-0" />
            ))}
          </div>
        </div>

        {/* Action button header skeleton */}
        <div className="flex items-center justify-between px-1">
          <div className="h-4 bg-slate-200 rounded w-32" />
          <div className="flex gap-2">
            <div className="h-8 bg-slate-200 rounded-xl w-20" />
            <div className="h-8 bg-purple-200 rounded-xl w-24" />
          </div>
        </div>

        {/* Subject pills skeleton */}
        <div className="flex gap-2 overflow-x-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-28 bg-slate-200/80 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Chapter/Module Cards skeleton */}
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-slate-200/70 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
              <div className="w-5 h-5 bg-slate-200/60 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
