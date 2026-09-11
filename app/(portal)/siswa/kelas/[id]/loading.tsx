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
      <div className="space-y-3.5 animate-pulse select-none font-sans">
        {/* Header Progress Card (Dafa & Lulu Maskot Card Shimmer) */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-teal-50 shrink-0" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-24 bg-slate-200 rounded-sm" />
                <div className="h-3 w-16 bg-teal-50 rounded-sm" />
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/5 bg-teal-300 rounded-full" />
              </div>
            </div>
          </div>

          <div className="h-7 w-16 bg-amber-50 rounded-full border border-amber-200/60 shrink-0" />
        </div>

        {/* Horizontal Mapel Selector Carousel Shimmer */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          <div className="h-10 w-32 rounded-xl bg-teal-600/80 shrink-0" />
          <div className="h-10 w-28 rounded-xl bg-white border border-slate-200 shrink-0" />
          <div className="h-10 w-28 rounded-xl bg-white border border-slate-200 shrink-0" />
        </div>

        {/* Daftar Bab Accordion Card Shimmer (Sesuai FaseAView & FaseBCView) */}
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs p-3.5 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Number Circle Badge */}
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100/60 flex items-center justify-center font-bold text-xs shrink-0" />

                <div className="min-w-0 flex-1 space-y-1.5 py-0.5">
                  <div className="h-2.5 w-14 bg-teal-50 rounded-xs" />
                  <div className="h-4 w-4/5 bg-slate-200 rounded-md" />
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="h-3 w-12 bg-slate-100 rounded-sm" />
                <div className="w-7 h-7 rounded-lg bg-slate-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayoutShell>
  );
}

