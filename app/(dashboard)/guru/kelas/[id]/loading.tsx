import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function KelasDetailLoading() {
  return (
    <TeacherLayoutShell
      title="Memuat Kelas..."
      subtitle="Menyiapkan mata pelajaran & bab"
      badgeText="Memuat"
      badgeVariant="sky"
      backHref="/guru/kelas"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4 animate-pulse select-none max-w-full">
        {/* Action Header Bar Shimmer (Persis SubjectModuleListView) */}
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-4 w-32 bg-slate-200/90 rounded-md" />
            <div className="h-3 w-52 bg-slate-100 rounded-md" />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="h-9 w-20 bg-white border border-slate-200/80 rounded-xl" />
            <div className="h-9 w-18 bg-slate-900/80 rounded-xl" />
          </div>
        </div>

        {/* Subject Tabs Pills Shimmer (Pills navigasi mapel) */}
        <div className="flex gap-1.5 pb-1 overflow-hidden items-center">
          <div className="h-9 w-32 bg-slate-900/80 rounded-xl" />
          <div className="h-9 w-28 bg-white border border-slate-200/80 rounded-xl" />
          <div className="h-9 w-28 bg-white border border-slate-200/80 rounded-xl" />
        </div>

        {/* List Kartu Bab Shimmer (Persis kartu Bab di kelas) */}
        <div className="grid grid-cols-1 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* Number Indicator Pill */}
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center font-bold text-xs shrink-0" />
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="h-4 w-3/4 bg-slate-200/90 rounded-md" />
                  <div className="h-3 w-28 bg-slate-100 rounded-md" />
                </div>
              </div>

              {/* Action and chevron shimmer */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50" />
                <div className="w-5 h-5 bg-slate-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}

