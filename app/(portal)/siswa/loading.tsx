import React from 'react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';

export default function SiswaPortalLoading() {
  return (
    <StudentLayoutShell
      title="Halo, Teman Belajar!"
      subtitle="Memuat kelas belajarmu..."
      badgeText="SD"
      badgeVariant="amber"
      activeNavTab="KELAS"
      maxWidth="sm"
    >
      <div className="space-y-4 animate-pulse select-none">
        {/* Banner Skeleton */}
        <div className="h-32 bg-gradient-to-br from-amber-400/30 via-orange-400/25 to-amber-500/30 rounded-3xl w-full border-2 border-amber-300/30" />

        {/* Section title skeleton */}
        <div className="flex items-center justify-between px-1">
          <div className="h-4 bg-slate-200 rounded-md w-36" />
          <div className="h-3 bg-slate-100 rounded-md w-20" />
        </div>

        {/* Class Cards Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-3xl border-2 border-amber-200/50 bg-white shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/60 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-amber-200/50 rounded-md w-2/5" />
                    <div className="h-4 bg-slate-200 rounded-md w-3/5" />
                    <div className="h-3 bg-slate-100 rounded-md w-1/3" />
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 shrink-0" />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="h-3 bg-slate-100 rounded-md w-28" />
                <div className="h-3 bg-amber-200/60 rounded-md w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayoutShell>
  );
}
