'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import type { ClassRecord } from '@/types/database';

interface SiswaPortalClientProps {
  classrooms: ClassRecord[];
  starsCount?: number;
  userAvatarUrl?: string | null;
}

export function SiswaPortalClient({ classrooms, starsCount = 0, userAvatarUrl }: SiswaPortalClientProps) {
  return (
    <StudentLayoutShell
      title="Pulau Belajar SD"
      subtitle="Pilih duniamu"
      badgeText="SD"
      activeNavTab="KELAS"
      showBottomNav={true}
      maxWidth="sm"
      starsCount={starsCount}
      userAvatarUrl={userAvatarUrl}
    >
      {/* Hero Quest Board (Banner Bergaya Game Adventure) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 rounded-3xl p-5 shadow-lg border-2 border-b-6 border-teal-700 text-white flex items-center justify-between gap-4">
        {/* Dekorasi Awan Game */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-cyan-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5 min-w-0">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/20 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
            <span>Misi Petualang Cilik</span>
          </div>
          <h1 className="text-base sm:text-xl md:text-2xl font-black leading-snug drop-shadow-xs">
            Selamat Datang di Dunia Belajar! 🏰
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 font-medium leading-relaxed">
            Pilih pulau kelasmu di bawah untuk mengumpulkan bintang emas dan membuka lencana baru!
          </p>
        </div>

        <div className="relative shrink-0 flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/30 animate-game-bounce">
            🏝️
          </div>
        </div>
      </section>

      {/* Pilihan Pulau Kelas (Responsive Grid: 1 Kolom di HP, 2 Kolom di Tablet) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>🗺️</span>
            <span>Pilih Pulau Petualangan</span>
          </h2>
          <span className="text-[11px] font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
            {classrooms.length} Pulau Terbuka
          </span>
        </div>

        {classrooms.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 shadow-sm space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl">
              🧭
            </div>
            <p className="font-black text-sm text-slate-800">Belum ada pulau kelas yang terbuka.</p>
            <p className="text-xs text-slate-500">Minta bapak/ibu gurumu untuk mendaftarkan kelasmu ya!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {classrooms.map((classroom, cIdx) => {
              const isFaseA = classroom.grade_level <= 2;
              const faseName = isFaseA
                ? 'Fase A (Kelas 1–2)'
                : classroom.grade_level <= 4
                ? 'Fase B (Kelas 3–4)'
                : 'Fase C (Kelas 5–6)';

              // Warna tema pulau per jenjang
              const islandThemes = [
                { bg: 'from-amber-400 to-orange-500', border: 'border-amber-600', icon: '🏝️', tag: 'Pulau Angka & Huruf' },
                { bg: 'from-sky-400 to-blue-600', border: 'border-blue-700', icon: '🚀', tag: 'Pulau Sains & Alam' },
                { bg: 'from-emerald-400 to-teal-600', border: 'border-teal-700', icon: '⛺', tag: 'Pulau Penjelajah Cilik' },
                { bg: 'from-purple-400 to-indigo-600', border: 'border-indigo-700', icon: '🔮', tag: 'Pulau Logika & Seni' },
              ];
              const theme = islandThemes[cIdx % islandThemes.length];

              return (
                <Link
                  key={classroom.id}
                  href={`/siswa/kelas/${classroom.id}`}
                  className="group relative block p-4 bg-white rounded-3xl border-2 border-b-6 border-slate-200/90 hover:border-teal-400 active:border-b-2 active:translate-y-1 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Avatar Pulau 3D */}
                      <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${theme.bg} text-white flex items-center justify-center text-2xl shrink-0 shadow-sm border-2 border-white group-hover:scale-105 transition-transform`}>
                        {theme.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                            Kelas {classroom.grade_level} SD
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {faseName}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate group-hover:text-teal-600 transition-colors">
                          {classroom.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          Tahun Pelajaran {classroom.academic_year}
                        </p>
                      </div>
                    </div>

                    {/* Tombol Masuk Pulau Taktil 3D */}
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border-2 border-teal-200 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-all shrink-0">
                      <ChevronRight className="w-5 h-5 stroke-[2.8]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </StudentLayoutShell>
  );
}
