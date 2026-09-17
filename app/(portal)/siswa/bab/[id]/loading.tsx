import React from 'react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import { Lock } from 'lucide-react';

export default function StudentBabLoading() {
  return (
    <StudentLayoutShell
      maxWidth="sm"
    >
      <div className="w-full space-y-4 select-none font-sans animate-pulse">
        {/* 1. Skeleton Progres Bar Piala (Sesuai BabAdventureProgressBar) */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-b-6 border-slate-200/90 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border-2 border-amber-300 flex items-center justify-center font-black text-xl shadow-2xs shrink-0">
                🏆
              </div>
              <div className="min-w-0 space-y-1.5">
                <div className="h-3.5 w-36 bg-slate-200 rounded-md" />
                <div className="h-2.5 w-48 sm:w-56 bg-slate-100 rounded-md" />
              </div>
            </div>

            <div className="w-24 h-7 rounded-xl bg-teal-50 border border-teal-200 shrink-0" />
          </div>

          {/* Bar Shimmer */}
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div className="h-full w-1/3 bg-teal-200/70 rounded-full" />
          </div>
        </section>

        {/* 2. Skeleton Judul Jalur Petualangan */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🗺️</span>
              <div className="h-4 w-44 bg-slate-200 rounded-md" />
            </div>
            <div className="h-3 w-20 bg-teal-100/70 rounded-md" />
          </div>

          {/* 3. Skeleton Pos Berkelok-kelok (Stepping Stones Sesuai BabAdventurePath) */}
          <div className="py-6 flex flex-col items-center space-y-9 select-none">
            {/* Pos 1: Tengah (Aktif / Mulai Disini) */}
            <div className="relative flex flex-col items-center translate-x-0">
              <div className="mb-2 px-3 py-1 rounded-xl bg-teal-200/60 border-2 border-teal-300 flex items-center gap-1 shadow-sm">
                <div className="w-20 h-2.5 bg-teal-600/30 rounded-full" />
              </div>
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-teal-200 to-cyan-200 border-4 border-b-6 border-teal-400/80 shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 rounded-xl bg-teal-400/40" />
              </div>
              <div className="mt-2 w-14 h-3 bg-slate-200 rounded-full" />
            </div>

            {/* Pos 2: Bergeser ke Kiri (-translate-x-12) */}
            <div className="relative flex flex-col items-center -translate-x-10 sm:-translate-x-14">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-100 border-4 border-b-6 border-slate-300 shadow-md flex items-center justify-center">
                <Lock className="w-7 h-7 text-slate-300 stroke-[2.5]" />
              </div>
              <div className="mt-2 w-16 h-3 bg-slate-200 rounded-full" />
            </div>

            {/* Pos 3: Tengah (translate-x-0) */}
            <div className="relative flex flex-col items-center translate-x-0">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-100 border-4 border-b-6 border-slate-300 shadow-md flex items-center justify-center">
                <Lock className="w-7 h-7 text-slate-300 stroke-[2.5]" />
              </div>
              <div className="mt-2 w-14 h-3 bg-slate-200 rounded-full" />
            </div>

            {/* Pos 4: Bergeser ke Kanan (+translate-x-12) */}
            <div className="relative flex flex-col items-center translate-x-10 sm:translate-x-14">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-100 border-4 border-b-6 border-slate-300 shadow-md flex items-center justify-center">
                <Lock className="w-7 h-7 text-slate-300 stroke-[2.5]" />
              </div>
              <div className="mt-2 w-16 h-3 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* Pembatas Garis Putus-putus */}
          <div className="w-full max-w-xs mx-auto border-t-2 border-dashed border-slate-200 pt-2" />

          {/* 4. Skeleton Tombol Gerbang Bab Selanjutnya */}
          <div className="w-full min-h-[56px] p-4 rounded-3xl bg-slate-100 border-3 border-b-6 border-slate-300 flex items-center justify-between gap-3 opacity-80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-xl shrink-0">
                <Lock className="w-5 h-5 text-slate-400 stroke-[2.5]" />
              </div>
              <div className="min-w-0 space-y-1.5 text-left">
                <div className="w-28 h-2.5 bg-slate-200 rounded-md" />
                <div className="w-36 h-3.5 bg-slate-300 rounded-md" />
              </div>
            </div>
            <div className="w-16 h-6 rounded-xl bg-slate-200/70" />
          </div>
        </section>
      </div>
    </StudentLayoutShell>
  );
}