'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Sparkles,
  Flame,
  Star,
  Compass,
  Trophy,
  Award,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import type { ClassRecord } from '@/types/database';

interface SiswaPortalClientProps {
  classrooms: ClassRecord[];
  starsCount?: number;
  userAvatarUrl?: string | null;
}

export function SiswaPortalClient({ classrooms, starsCount = 0, userAvatarUrl }: SiswaPortalClientProps) {
  // Hitung Level Petualang Berdasarkan Jumlah Bintang
  const playerLevel = Math.max(1, Math.floor(starsCount / 50) + 1);
  const currentLevelProgress = (starsCount % 50);
  const percentToNextLevel = Math.min(100, Math.round((currentLevelProgress / 50) * 100));

  return (
    <StudentLayoutShell
      title="Pulau Petualang SD"
      subtitle="Jelajahi Duniamu"
      badgeText="SD"
      activeNavTab="DASHBOARD"
      showBottomNav={true}
      maxWidth="sm"
      starsCount={starsCount}
      userAvatarUrl={userAvatarUrl}
    >
      <div className="space-y-4 font-sans select-none">
        {/* ========================================================================= */}
        {/* 1. HERO GAME QUEST BOARD: Banner RPG Petualangan Utama */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 rounded-3xl p-5 shadow-lg border-2 border-b-6 border-teal-900 text-white flex flex-col justify-between gap-4">
          {/* Efek Glow & Game Visual Background */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-300/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase bg-white/20 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full border border-white/20 shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
                <span>Peta Dunia Petualang</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black leading-tight drop-shadow-xs">
                Halo, Pendekar Belajar! ⚔️
              </h1>
              <p className="text-xs text-teal-100 font-medium leading-relaxed">
                Pilih pulau kelas di peta untuk mulai misi dan kumpulkan bintang!
              </p>
            </div>

            {/* Avatar Pulau 3D Beranimasi */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl sm:text-4xl shadow-inner border-2 border-white/30 animate-game-bounce">
                🏝️
              </div>
            </div>
          </div>

          {/* Player EXP / Star Progress Bar */}
          <div className="relative z-10 bg-teal-900/50 backdrop-blur-md rounded-2xl p-3 border border-teal-500/40 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Level {playerLevel} Petualang
              </span>
              <span className="text-teal-200 text-[11px]">
                {currentLevelProgress} / 50 EXP Bintang
              </span>
            </div>

            {/* EXP Bar Gauge */}
            <div className="w-full h-3 bg-teal-950/60 rounded-full p-0.5 border border-teal-700/60 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${percentToNextLevel}%` }}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. GAME QUICK ACTIONS: Jalan Pintas Misi & Lencana */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href="/siswa/misi"
            className="group p-3.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl text-white border-2 border-b-4 border-orange-700 shadow-xs active:border-b-2 active:translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
              📜
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase text-amber-200 tracking-wider">Quest Harian</div>
              <div className="text-sm font-black truncate">Papan Misi</div>
            </div>
          </Link>

          <Link
            href="/siswa/profil"
            className="group p-3.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl text-white border-2 border-b-4 border-indigo-700 shadow-xs active:border-b-2 active:translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
              👑
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase text-purple-200 tracking-wider">Karakter</div>
              <div className="text-sm font-black truncate">Profil & Avatar</div>
            </div>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 3. PETA DUNIA KELAS: Pulau Petualangan Game Map Grid */}
        {/* ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>🗺️</span>
              <span>Pilih Pulau Kelas Petualangan</span>
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

                // Visual tema pulau game 3D
                const islandThemes = [
                  {
                    gradient: 'from-amber-400 via-amber-500 to-orange-500',
                    border: 'hover:border-amber-400',
                    buttonBg: 'bg-amber-50 text-amber-700 border-amber-300 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500',
                    icon: '🏝️',
                    badge: 'bg-amber-50 text-amber-800 border-amber-200',
                  },
                  {
                    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
                    border: 'hover:border-blue-400',
                    buttonBg: 'bg-sky-50 text-sky-700 border-sky-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
                    icon: '🚀',
                    badge: 'bg-sky-50 text-sky-800 border-sky-200',
                  },
                  {
                    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
                    border: 'hover:border-teal-400',
                    buttonBg: 'bg-teal-50 text-teal-700 border-teal-300 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
                    icon: '⛺',
                    badge: 'bg-teal-50 text-teal-800 border-teal-200',
                  },
                  {
                    gradient: 'from-purple-400 via-violet-500 to-pink-600',
                    border: 'hover:border-purple-400',
                    buttonBg: 'bg-purple-50 text-purple-700 border-purple-300 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
                    icon: '🔮',
                    badge: 'bg-purple-50 text-purple-800 border-purple-200',
                  },
                ];
                const theme = islandThemes[cIdx % islandThemes.length];

                return (
                  <Link
                    key={classroom.id}
                    href={`/siswa/kelas/${classroom.id}`}
                    className={`group relative block p-4 bg-white rounded-3xl border-2 border-b-6 border-slate-200/90 ${theme.border} active:border-b-2 active:translate-y-1 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Avatar Pulau Game 3D */}
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white flex items-center justify-center text-2xl shrink-0 shadow-sm border-2 border-white group-hover:scale-105 group-hover:rotate-2 transition-all`}
                        >
                          {theme.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${theme.badge}`}>
                              Kelas {classroom.grade_level} SD
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
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
                      <div
                        className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all shrink-0 shadow-2xs ${theme.buttonBg}`}
                      >
                        <ChevronRight className="w-5 h-5 stroke-[3]" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </StudentLayoutShell>
  );
}
