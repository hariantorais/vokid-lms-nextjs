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
        {/* Level 3: Bab Header Info Card (Sesuai ModuleDetailView asli) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-3xl shadow-sm border border-slate-700/50 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="space-y-2 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-5 w-24 bg-sky-500/20 rounded-lg" />
                <div className="h-4 w-28 bg-slate-700/60 rounded-md" />
              </div>
              <div className="h-6 w-3/4 bg-slate-700/80 rounded-lg" />
            </div>

            {/* Aksi Bab Skeleton (Edit & Hapus icons) */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-slate-800/80" />
              <div className="w-8 h-8 rounded-xl bg-slate-800/80" />
            </div>
          </div>
        </div>

        {/* Level 4: List header */}
        <div className="flex items-center justify-between px-1">
          <div className="h-4 w-28 bg-slate-200 rounded-md" />
          <div className="h-8 w-28 bg-slate-900/80 rounded-xl" />
        </div>

        {/* Level 4: Lesson Cards Shimmer (Presisi sama seperti Link card di ModuleDetailView) */}
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-slate-100 shrink-0 border border-slate-200/60" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="h-2.5 w-16 bg-slate-200 rounded-xs" />
                  <div className="h-4 w-3/5 bg-slate-200/90 rounded-md" />
                  <div className="h-3 w-14 bg-slate-100 rounded-xs" />
                </div>
              </div>

              {/* Action buttons & chevron shimmer */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-slate-50" />
                <div className="w-8 h-8 rounded-xl bg-slate-50" />
                <div className="w-5 h-5 bg-slate-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
