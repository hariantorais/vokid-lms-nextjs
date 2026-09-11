'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Star,
  Compass,
  BookOpen,
  Trophy,
  User,
} from 'lucide-react';

interface StudentLayoutShellProps {
  children: React.ReactNode;
  backHref?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  starsCount?: number;
  userAvatarUrl?: string | null;
  activeNavTab?: 'KELAS' | 'MATERI' | 'TUGAS' | 'PROFIL';
  showBottomNav?: boolean;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'teal' | 'amber' | 'sky' | 'emerald' | 'purple';
  transparentHeader?: boolean;
}

export function StudentLayoutShell({
  children,
  backHref,
  maxWidth = 'sm',
  starsCount = 0,
  userAvatarUrl,
  activeNavTab = 'MATERI',
  showBottomNav = true,
}: StudentLayoutShellProps) {
  const maxWidthClass =
    maxWidth === 'sm'
      ? 'max-w-md'
      : maxWidth === 'md'
        ? 'max-w-2xl'
        : maxWidth === 'lg'
          ? 'max-w-4xl'
          : maxWidth === 'xl'
            ? 'max-w-5xl'
            : 'max-w-full';

  const isCustomImage =
    userAvatarUrl &&
    (userAvatarUrl.startsWith('http') || userAvatarUrl.startsWith('/'));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center select-none font-sans">
      <div className={`w-full ${maxWidthClass} flex-1 flex flex-col min-h-screen relative pb-24`}>
        {/* ========================================================================= */}
        {/* HEADER 100% TRANSPARAN (Tanpa Judul, Tombol Back Kiri, Avatar & Bintang Kanan) */}
        {/* ========================================================================= */}
        <header className="sticky top-0 z-40 w-full bg-transparent px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between pointer-events-none">
          {/* Sisi Kiri: Tombol Kembali Taktil 3D */}
          <div className="pointer-events-auto">
            {backHref ? (
              <Link
                href={backHref}
                aria-label="Kembali"
                className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-b-4 border-slate-200 active:border-b-2 active:translate-y-0.5 text-slate-700 flex items-center justify-center shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.8]" />
              </Link>
            ) : (
              <div className="w-11 h-11" />
            )}
          </div>

          {/* Sisi Kanan: Avatar Siswa & Jumlah Bintang */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <Link
              href="/siswa/profil"
              title="Buka Profil & Ganti Avatar"
              className="group flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border-2 border-b-4 border-slate-200 hover:border-amber-300 active:border-b-2 active:translate-y-0.5 shadow-xs transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-300 flex items-center justify-center text-lg overflow-hidden border border-white shadow-2xs group-hover:scale-105 transition-transform">
                {isCustomImage ? (
                  <Image
                    src={userAvatarUrl!}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{userAvatarUrl || '🦁'}</span>
                )}
              </div>

              <div className="flex items-center gap-1 pr-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500 drop-shadow-2xs animate-pulse" />
                <span className="text-xs font-black text-slate-900 tracking-tight">
                  {starsCount}
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Konten Halaman */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 pt-1 pb-6 w-full">{children}</main>

        {/* ========================================================================= */}
        {/* BOTTOM NAVIGATION BAR */}
        {/* ========================================================================= */}
        {showBottomNav && (
          <nav className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none px-3 pb-3">
            <div className={`w-full ${maxWidthClass} pointer-events-auto`}>
              <div className="bg-white/95 backdrop-blur-md border-2 border-b-4 border-slate-200/90 rounded-3xl p-1.5 shadow-lg flex items-center justify-around">
                <Link
                  href="/siswa"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${activeNavTab === 'KELAS'
                      ? 'bg-teal-500 text-white font-black shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 font-bold'
                    }`}
                >
                  <Compass className={`w-5 h-5 ${activeNavTab === 'KELAS' ? 'stroke-[2.8]' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase">Kelas</span>
                </Link>

                <Link
                  href="/siswa"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${activeNavTab === 'MATERI'
                      ? 'bg-teal-500 text-white font-black shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 font-bold'
                    }`}
                >
                  <BookOpen className={`w-5 h-5 ${activeNavTab === 'MATERI' ? 'stroke-[2.8]' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase">Materi</span>
                </Link>

                <Link
                  href="/siswa"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${activeNavTab === 'TUGAS'
                      ? 'bg-teal-500 text-white font-black shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 font-bold'
                    }`}
                >
                  <Trophy className={`w-5 h-5 ${activeNavTab === 'TUGAS' ? 'stroke-[2.8]' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase">Misi</span>
                </Link>

                <Link
                  href="/siswa/profil"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${activeNavTab === 'PROFIL'
                      ? 'bg-teal-500 text-white font-black shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 font-bold'
                    }`}
                >
                  <User className={`w-5 h-5 ${activeNavTab === 'PROFIL' ? 'stroke-[2.8]' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase">Profil</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}