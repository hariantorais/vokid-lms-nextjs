import React from 'react';

export default function StudentBabLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Header Bar Skeleton */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
        <div className="max-w-sm mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 animate-pulse" />
            <div className="space-y-1.5">
              <div className="w-20 h-3 bg-slate-200 rounded-full animate-pulse" />
              <div className="w-32 h-4 bg-slate-300 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="w-16 h-8 rounded-2xl bg-slate-200 animate-pulse" />
        </div>
      </div>

      <div className="max-w-sm mx-auto p-4 space-y-5">
        {/* 1. Skeleton Progres Bar Piala */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-b-6 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/70 animate-pulse border-2 border-amber-200" />
              <div className="space-y-1.5">
                <div className="w-36 h-3.5 bg-slate-200 rounded-md animate-pulse" />
                <div className="w-48 h-2.5 bg-slate-100 rounded-md animate-pulse" />
              </div>
            </div>
            <div className="w-20 h-6 rounded-xl bg-teal-50 border border-teal-100 animate-pulse" />
          </div>

          <div className="w-full h-3.5 bg-slate-100 rounded-full p-0.5 border border-slate-200">
            <div className="h-full w-1/3 bg-teal-200/70 rounded-full animate-pulse" />
          </div>
        </section>

        {/* 2. Skeleton Judul Jalur */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="w-36 h-4 bg-slate-200 rounded-md animate-pulse" />
          <div className="w-16 h-3 bg-slate-100 rounded-md animate-pulse" />
        </div>

        {/* 3. Skeleton Pos Berkelok-kelok (Stepping Stones) */}
        <div className="py-4 flex flex-col items-center space-y-7 select-none">
          {/* Pos 1: Tengah (Aktif) */}
          <div className="flex flex-col items-center gap-1.5 translate-x-0">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-teal-100 border-4 border-b-6 border-teal-200 shadow-md animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-teal-200/80 animate-pulse" />
            </div>
            <div className="w-12 h-3 bg-slate-200 rounded-full animate-pulse" />
          </div>

          {/* Pos 2: Geser Kiri */}
          <div className="flex flex-col items-center gap-1.5 -translate-x-10 sm:-translate-x-14">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-200/80 border-4 border-b-6 border-slate-300 shadow-md animate-pulse flex items-center justify-center">
              <div className="w-7 h-7 rounded-xl bg-slate-300/60 animate-pulse" />
            </div>
            <div className="w-12 h-3 bg-slate-200 rounded-full animate-pulse" />
          </div>

          {/* Pos 3: Tengah */}
          <div className="flex flex-col items-center gap-1.5 translate-x-0">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-200/80 border-4 border-b-6 border-slate-300 shadow-md animate-pulse flex items-center justify-center">
              <div className="w-7 h-7 rounded-xl bg-slate-300/60 animate-pulse" />
            </div>
            <div className="w-12 h-3 bg-slate-200 rounded-full animate-pulse" />
          </div>

          {/* Pos 4: Geser Kanan */}
          <div className="flex flex-col items-center gap-1.5 translate-x-10 sm:translate-x-14">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-slate-200/80 border-4 border-b-6 border-slate-300 shadow-md animate-pulse flex items-center justify-center">
              <div className="w-7 h-7 rounded-xl bg-slate-300/60 animate-pulse" />
            </div>
            <div className="w-12 h-3 bg-slate-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Pembatas Garis Putus-putus Skeleton */}
        <div className="w-full max-w-xs mx-auto border-t-2 border-dashed border-slate-200" />

        {/* 4. Skeleton Tombol Gerbang Bab Selanjutnya */}
        <div className="w-full h-16 rounded-3xl bg-slate-200/80 border-3 border-b-6 border-slate-300 animate-pulse" />
      </div>
    </div>
  );
}