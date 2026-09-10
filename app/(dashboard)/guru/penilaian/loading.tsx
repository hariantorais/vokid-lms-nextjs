import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function PenilaianLoading() {
  return (
    <TeacherLayoutShell
      title="Penilaian & Evaluasi"
      subtitle="Memuat antrean koreksi..."
      badgeText="Memuat..."
      badgeVariant="amber"
      activeNavTab="PENILAIAN"
      maxWidth="sm"
    >
      <div className="space-y-3 animate-pulse select-none">
        {/* Header counter card skeleton */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-2xl shrink-0" />
        </div>

        {/* Task review item skeletons */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1.5 w-2/3">
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </div>
                <div className="w-20 h-6 bg-slate-200 rounded-xl" />
              </div>
              <div className="h-12 bg-slate-50 rounded-2xl border border-slate-100" />
              <div className="h-11 bg-amber-200/70 rounded-2xl w-full" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
