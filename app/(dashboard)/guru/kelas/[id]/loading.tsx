import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function KelasDetailLoading() {
  return (
    <TeacherLayoutShell
      title="Memuat Kelas..."
      subtitle="Menyiapkan materi & bab kurikulum"
      badgeText="Memuat"
      badgeVariant="sky"
      backHref="/guru/kelas"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4 animate-pulse select-none max-w-full">
        {/* Action Header Bar Shimmer */}
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-4 w-32 bg-slate-200/90 rounded-lg" />
            <div className="h-3 w-48 bg-slate-100 rounded-md" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-9 w-16 bg-slate-200/80 rounded-xl" />
            <div className="h-9 w-16 bg-slate-200/80 rounded-xl" />
          </div>
        </div>

        {/* Subject Tabs Pills Shimmer */}
        <div className="flex gap-2 pb-1 overflow-hidden">
          <div className="h-8 w-28 bg-slate-900/80 rounded-xl" />
          <div className="h-8 w-24 bg-slate-200/80 rounded-xl" />
          <div className="h-8 w-24 bg-slate-200/80 rounded-xl" />
        </div>

        {/* Native Mobile Chapter Cards Shimmer */}
        <div className="grid grid-cols-1 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-100/70 text-sky-600/50 flex items-center justify-center font-bold text-xs shrink-0">
                #{i}
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-slate-200/90 rounded-md" />
                <div className="h-3 w-1/2 bg-slate-100 rounded-md" />
              </div>
              <div className="w-5 h-5 bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
