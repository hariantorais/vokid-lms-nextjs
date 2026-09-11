import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function BabDetailLoading() {
  return (
    <TeacherLayoutShell
      title="Memuat Bab..."
      subtitle="Menyiapkan daftar materi"
      badgeText="Memuat"
      badgeVariant="sky"
      backHref="/guru/kelas"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4 animate-pulse select-none max-w-full">
        {/* Navigation bar transparent button */}
        <div className="h-9 w-28 bg-slate-200/70 rounded-xl" />

        {/* Level 3: Bab Header Info Card (Aksen khas gelap shimmer) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 border border-slate-700/50 relative overflow-hidden space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 bg-sky-500/20 rounded-lg" />
            <div className="h-4 w-20 bg-slate-700/60 rounded-md" />
          </div>
          <div className="h-6 w-3/4 bg-slate-700/80 rounded-lg" />
        </div>

        {/* Level 4: List header */}
        <div className="flex items-center justify-between px-1">
          <div className="h-4 w-28 bg-slate-200 rounded-md" />
          <div className="h-8 w-24 bg-slate-900/80 rounded-xl" />
        </div>

        {/* Level 4: Lesson Cards Shimmer */}
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-16 bg-slate-200 rounded-sm" />
                <div className="h-4 w-4/5 bg-slate-200/90 rounded-md" />
                <div className="h-3 w-14 bg-slate-100 rounded-sm" />
              </div>
              <div className="w-5 h-5 bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
