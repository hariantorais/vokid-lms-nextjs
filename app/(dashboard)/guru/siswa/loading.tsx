import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function SiswaLoading() {
  return (
    <TeacherLayoutShell
      title="Daftar Siswa"
      subtitle="Memuat data murid..."
      badgeText="Memuat..."
      badgeVariant="emerald"
      activeNavTab="STUDENTS"
      maxWidth="sm"
    >
      <div className="space-y-3 animate-pulse select-none">
        {/* Search bar skeleton */}
        <div className="h-11 bg-white rounded-2xl border border-slate-200/90 shadow-2xs w-full" />

        {/* Header banner stats skeleton */}
        <div className="h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl w-full border border-emerald-500/10" />

        {/* Student item skeletons */}
        <div className="space-y-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-slate-200/80 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3.5 bg-slate-200 rounded-lg w-1/2" />
                  <div className="h-3 bg-slate-100 rounded-md w-1/3" />
                </div>
              </div>
              <div className="h-6 w-16 bg-slate-100 rounded-xl shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
