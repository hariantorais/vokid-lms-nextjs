import React from 'react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';

export default function SiswaBabDetailLoading() {
  return (
    <StudentLayoutShell
      title="Memuat Bab..."
      subtitle="Menyiapkan materi belajar..."
      badgeText="Memuat"
      backHref="/siswa"
      activeNavTab="MATERI"
      showBottomNav={true}
      maxWidth="sm"
      transparentHeader={true}
    >
      <div className="w-full space-y-4 animate-pulse select-none">
        {/* Card Progres Belajar Bab Shimmer */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100/80 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-teal-50 shrink-0" />
              <div className="space-y-1.5 min-w-0">
                <div className="h-3 w-28 bg-slate-200 rounded-sm" />
                <div className="h-2.5 w-36 bg-slate-100 rounded-sm" />
              </div>
            </div>

            <div className="h-5 w-16 bg-teal-50 rounded-md shrink-0" />
          </div>

          {/* Progress Bar Shimmer */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-teal-200 rounded-full" />
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between px-1">
          <div className="h-3 w-28 bg-slate-200 rounded-sm" />
          <div className="h-2.5 w-20 bg-slate-100 rounded-sm" />
        </div>

        {/* Timeline List Materi Belajar Shimmer */}
        <div className="space-y-0">
          {[1, 2, 3, 4].map((i, idx) => (
            <div key={i} className="relative flex items-center gap-3 mb-3">
              {/* Timeline Stem & Node Kolom Kiri */}
              <div className="relative flex items-center justify-center shrink-0 w-8 self-stretch">
                {idx > 0 && (
                  <div className="absolute top-0 bottom-1/2 w-0.5 bg-slate-200" />
                )}
                {idx < 3 && (
                  <div className="absolute top-1/2 bottom-0 w-0.5 bg-slate-200" />
                )}
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-300 z-10">
                  {idx + 1}
                </div>
              </div>

              {/* Kartu Konten Materi di Kolom Kanan */}
              <div className="flex-1 p-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex items-center">
                <div className="min-w-0 w-full space-y-1.5 py-0.5">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-16 bg-teal-50 rounded-sm" />
                    <div className="h-3 w-14 bg-slate-100 rounded-sm" />
                  </div>
                  <div className="h-4 w-5/6 bg-slate-200 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayoutShell>
  );
}
