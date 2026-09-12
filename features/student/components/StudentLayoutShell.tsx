'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Compass,
  BookOpen,
  Trophy,
  User,
  LogOut,
} from 'lucide-react';
import { getMediaProxyUrl } from '@/features/shared/services/storage-service';
import { logoutAction } from '@/app/(auth)/actions/auth-actions';

interface StudentLayoutShellProps {
  children: React.ReactNode;
  backHref?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  starsCount?: number;
  userAvatarUrl?: string | null;
  activeNavTab?: 'DASHBOARD' | 'MISI' | 'PROFIL' | 'KELAS' | 'MATERI' | 'TUGAS';
  showBottomNav?: boolean;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'amber' | 'sky';
  transparentHeader?: boolean;
  headerAction?: React.ReactNode;
}

export function StudentLayoutShell({
  children,
  backHref,
  maxWidth = 'sm',
  starsCount = 0,
  userAvatarUrl,
  activeNavTab,
  showBottomNav = true,
  headerAction,
}: StudentLayoutShellProps) {
  const pathname = usePathname();

  // Deteksi tab aktif otomatis: DASHBOARD, MISI, PROFIL
  const effectiveNavTab: 'DASHBOARD' | 'MISI' | 'PROFIL' = (() => {
    if (activeNavTab === 'PROFIL' || activeNavTab === 'MISI' || activeNavTab === 'DASHBOARD') {
      return activeNavTab;
    }
    if (activeNavTab === 'TUGAS') return 'MISI';
    if (activeNavTab === 'KELAS' || activeNavTab === 'MATERI') return 'DASHBOARD';

    if (!pathname) return 'DASHBOARD';
    if (pathname.startsWith('/siswa/profil')) return 'PROFIL';
    if (pathname.startsWith('/siswa/misi') || pathname.includes('/tugas')) return 'MISI';
    return 'DASHBOARD';
  })();

  const maxWidthClass =
    maxWidth === 'full'
      ? 'max-w-full px-3 sm:px-6'
      : 'max-w-md md:max-w-2xl lg:max-w-3xl';

  const isCustomImage =
    userAvatarUrl &&
    (userAvatarUrl.startsWith('http') || userAvatarUrl.startsWith('/'));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center select-none font-sans">
      <div className={`w-full ${maxWidthClass} flex-1 flex flex-col min-h-screen relative pb-24`}>
        {/* ========================================================================= */}
        {/* HEADER 100% TRANSPARAN (Tanpa Judul, Tombol Back Kiri, Avatar, Bintang, & Logout Kanan) */}
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

          {/* Sisi Kanan: Avatar Siswa, Jumlah Bintang & Tombol Logout */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {headerAction}
            <Link
              href="/siswa/profil"
              title="Buka Profil & Ganti Avatar"
              className="group flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border-2 border-b-4 border-slate-200 hover:border-amber-300 active:border-b-2 active:translate-y-0.5 shadow-xs transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-300 flex items-center justify-center text-lg overflow-hidden border border-white shadow-2xs group-hover:scale-105 transition-transform">
                {isCustomImage ? (
                  <Image
                    src={getMediaProxyUrl(userAvatarUrl)}
                    alt="Avatar"
                    width={32}
                    height={32}
                    loading="eager"
                    unoptimized
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

            {/* Tombol Cepat Logout Siswa */}
            <form action={logoutAction}>
              <button
                type="submit"
                title="Keluar dari Akun Siswa"
                className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-b-4 border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-500 hover:text-rose-600 active:border-b-2 active:translate-y-0.5 flex items-center justify-center shadow-xs transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </header>

        {/* Konten Halaman */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 pt-1 pb-6 w-full">{children}</main>

        {/* ========================================================================= */}
        {/* BOTTOM NAVIGATION BAR (Game-styled: Dashboard, Misi, Profil) */}
        {/* ========================================================================= */}
        {showBottomNav && (
          <nav className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none px-3 pb-3">
            <div className={`w-full ${maxWidthClass} pointer-events-auto`}>
              <div className="bg-white/95 backdrop-blur-md border-2 border-b-4 border-slate-200/90 rounded-3xl p-1.5 shadow-lg flex items-center justify-around gap-1.5">
                {/* 1. Dashboard Petualangan */}
                <Link
                  href="/siswa"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${
                    effectiveNavTab === 'DASHBOARD'
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-black shadow-sm border border-teal-400'
                      : 'text-slate-500 hover:text-slate-900 font-bold hover:bg-slate-100/70'
                  }`}
                >
                  <Compass className={`w-5 h-5 ${effectiveNavTab === 'DASHBOARD' ? 'stroke-[2.8] animate-spin-slow' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase font-black">Dashboard</span>
                </Link>

                {/* 2. Misi & Tantangan */}
                <Link
                  href="/siswa/misi"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${
                    effectiveNavTab === 'MISI'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black shadow-sm border border-amber-400'
                      : 'text-slate-500 hover:text-slate-900 font-bold hover:bg-slate-100/70'
                  }`}
                >
                  <Trophy className={`w-5 h-5 ${effectiveNavTab === 'MISI' ? 'stroke-[2.8] animate-bounce' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase font-black">Misi</span>
                </Link>

                {/* 3. Profil Karakter */}
                <Link
                  href="/siswa/profil"
                  className={`flex-1 py-2 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${
                    effectiveNavTab === 'PROFIL'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black shadow-sm border border-purple-400'
                      : 'text-slate-500 hover:text-slate-900 font-bold hover:bg-slate-100/70'
                  }`}
                >
                  <User className={`w-5 h-5 ${effectiveNavTab === 'PROFIL' ? 'stroke-[2.8]' : ''}`} />
                  <span className="text-[10px] tracking-wider uppercase font-black">Profil</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}