import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function PelajaranDetailLoading() {
  return (
    <TeacherLayoutShell
      title="Memuat Materi..."
      subtitle="Menyiapkan bacaan & tugas"
      badgeText="Memuat"
      badgeVariant="sky"
      backHref="/guru/kelas"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4 animate-pulse select-none max-w-full">
        {/* Navigation bar button */}
        <div className="flex items-center justify-between">
          <div className="h-9 w-28 bg-slate-200/70 rounded-xl" />
          <div className="h-9 w-24 bg-white border border-slate-200 rounded-xl" />
        </div>

        {/* Level 4 & 5a: Unified Lesson Post Card Shimmer */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="h-3 w-40 bg-slate-200 rounded-md" />
            <div className="h-5 w-16 bg-slate-100 rounded-md" />
          </div>

          <div className="h-6 w-3/4 bg-slate-200/90 rounded-lg" />

          {/* Learning Objectives box shimmer */}
          <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-100 space-y-2">
            <div className="h-3 w-36 bg-sky-200 rounded-sm" />
            <div className="h-3 w-4/5 bg-sky-100 rounded-sm" />
          </div>

          {/* Media / Content block shimmer */}
          <div className="h-44 rounded-xl bg-slate-100 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-slate-200/80" />
          </div>
        </div>

        {/* Level 5b: Tasks Header Shimmer */}
        <div className="flex items-center justify-between px-1">
          <div className="h-4 w-32 bg-slate-200 rounded-md" />
          <div className="h-8 w-24 bg-slate-900/80 rounded-xl" />
        </div>

        {/* Level 5b: Assignment Cards Shimmer */}
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 bg-amber-100 rounded-md" />
                <div className="h-3 w-10 bg-slate-200 rounded-sm" />
              </div>
              <div className="h-4 w-full bg-slate-200/80 rounded-md" />
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="h-3 w-32 bg-slate-100 rounded-sm" />
                <div className="h-3 w-16 bg-slate-100 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
