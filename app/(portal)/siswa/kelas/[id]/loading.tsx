import React from 'react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';

export default function SiswaKelasLoading() {
  return (
    <StudentLayoutShell
      title="Ruang Kelas SD"
      subtitle="Menyiapkan materi belajarmu..."
      badgeText="Memuat..."
      badgeVariant="amber"
      backHref="/siswa"
      activeNavTab="MATERI"
      maxWidth="sm"
    >
      <div className="space-y-4 animate-pulse select-none">
        {/* Banner Skeleton */}
        <div className="h-28 bg-gradient-to-br from-amber-400/30 via-amber-300/25 to-orange-400/30 rounded-3xl w-full border-2 border-amber-300/30" />

        {/* Subjects horizontal pill skeletons */}
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded-md w-28" />
          <div className="flex gap-2.5 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 w-36 rounded-2xl bg-white border border-slate-200 shadow-2xs shrink-0 flex items-center gap-2 px-3"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100/60 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3 bg-slate-200 rounded w-4/5" />
                  <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Box Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/40 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 bg-slate-200 rounded-md w-2/3" />
              <div className="h-2.5 bg-slate-100 rounded-md w-1/3" />
            </div>
          </div>

          {/* Lesson Skeletons */}
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-2xl bg-slate-200 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 bg-slate-200 rounded w-1/4" />
                      <div className="h-3.5 bg-slate-200 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="w-14 h-9 rounded-xl bg-slate-200 shrink-0" />
                </div>

                {/* Assignment skeleton */}
                <div className="p-3 bg-white rounded-xl border border-amber-200/60 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-amber-100 rounded w-20" />
                    <div className="h-3 bg-slate-100 rounded w-12" />
                  </div>
                  <div className="h-3.5 bg-slate-200 rounded w-4/5" />
                  <div className="h-10 bg-amber-400/30 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayoutShell>
  );
}
