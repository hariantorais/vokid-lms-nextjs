'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Star,
  Layers,
  BookOpen,
  LogOut,
  Flame,
} from 'lucide-react';

export interface StudentLayoutShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'amber' | 'sky' | 'emerald';
  backHref?: string;
  onBackClick?: () => void;
  headerAction?: React.ReactNode;
  activeNavTab?: 'KELAS' | 'MATERI' | 'KELUAR';
  showBottomNav?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  headerSlot?: React.ReactNode;
  starsCount?: number;
  transparentHeader?: boolean;
}

/**
 * StudentLayoutShell (Ruangguru Kids & Dafa Lulu Edition)
 * - Teal Brand: from-teal-500 to-cyan-600
 * - Rounded clean cards, modern floating bottom bar
 * - Light grayish background: bg-slate-50
 */
export function StudentLayoutShell({
  children,
  title,
  subtitle,
  badgeText,
  backHref,
  onBackClick,
  headerAction,
  activeNavTab,
  showBottomNav = true,
  maxWidth = 'sm',
  headerSlot,
  starsCount = 120,
  transparentHeader = true,
}: StudentLayoutShellProps) {
  const pathname = usePathname();

  const maxWidthClass = {
    sm: 'max-w-[440px]',
    md: 'max-w-2xl',
    lg: 'max-w-5xl',
    full: 'max-w-full',
  }[maxWidth];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col antialiased relative selection:bg-teal-500 selection:text-white">
      {/* Background Soft Pastel Teal-Cyan Gradient Accent */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-teal-100 via-teal-50 to-slate-100/70 -z-10 rounded-b-[36px]" />

      {/* Main Container */}
      <div
        className={`w-full ${maxWidthClass} mx-auto px-3.5 sm:px-4 pt-3 ${
          showBottomNav ? 'pb-28 sm:pb-32' : 'pb-12'
        }`}
      >
        {/* Top App Header (100% Transparent when transparentHeader is true) */}
        <header
          className={`px-1 py-2 flex items-center justify-between mb-2.5 transition-all ${
            transparentHeader
              ? 'bg-transparent border-0 shadow-none'
              : 'bg-white shadow-sm border border-slate-100 rounded-2xl px-3.5 py-2.5 mb-3.5 sticky top-2 z-30'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
            {backHref ? (
              <Link
                href={backHref}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-90 ${
                  transparentHeader
                    ? 'bg-teal-900/10 hover:bg-teal-900/15 text-teal-900 border border-teal-900/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </Link>
            ) : onBackClick ? (
              <button
                type="button"
                onClick={onBackClick}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-90 ${
                  transparentHeader
                    ? 'bg-teal-900/10 hover:bg-teal-900/15 text-teal-900 border border-teal-900/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              /* Dafa Lulu / Ruangguru Kids Mascot Avatar */
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white font-black text-sm flex items-center justify-center shadow-xs select-none">
                  🦁
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400/30" />
              </div>
            )}

            <div className="min-w-0 flex-1 py-0.5">
              {/* Baris Atas: Nomor Bab & Nama Mata Pelajaran di sampingnya */}
              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                {badgeText && (
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      transparentHeader
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-teal-100 text-teal-900 border border-teal-200'
                    }`}
                  >
                    {badgeText}
                  </span>
                )}
                {subtitle && (
                  <span
                    className={`text-[11px] font-bold truncate ${
                      transparentHeader ? 'text-teal-800' : 'text-slate-500'
                    }`}
                  >
                    • {subtitle}
                  </span>
                )}
              </div>

              {/* Judul Bab (Gelap Elegan, Bukan Hitam Pekat) */}
              <h1
                className={`text-sm sm:text-base font-black tracking-tight leading-snug line-clamp-2 ${
                  transparentHeader ? 'text-teal-950' : 'text-slate-900'
                }`}
              >
                {title}
              </h1>
            </div>
          </div>

          {/* Right Action: Points / Stars Pill */}
          <div className="flex items-center gap-1.5 shrink-0">
            {headerAction ? (
              headerAction
            ) : (
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black shadow-xs ${
                  transparentHeader
                    ? 'bg-amber-100/90 border border-amber-300/60 text-amber-900'
                    : 'bg-amber-50 border border-amber-200 text-amber-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                <span>{starsCount}</span>
              </div>
            )}
          </div>
        </header>

        {headerSlot && <div className="mb-3">{headerSlot}</div>}

        {/* Main Body */}
        <main className="space-y-3.5">{children}</main>
      </div>

      {/* Floating Bottom Navigation Dock (Ruangguru Signature Floating Pill) */}
      {showBottomNav && (
        <div className="fixed bottom-3 inset-x-3 max-w-[440px] mx-auto z-40">
          <nav
            aria-label="Navigasi Siswa"
            className="bg-white text-slate-700 rounded-2xl p-1.5 shadow-xl border border-slate-200/80 flex items-center justify-between gap-1"
          >
            {/* 1. Beranda / Pilih Kelas */}
            {(() => {
              const isActive =
                activeNavTab === 'KELAS' ||
                pathname === '/siswa' ||
                pathname.startsWith('/siswa/kelas');
              return (
                <Link
                  href="/siswa"
                  className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-teal-600 font-black'
                      : 'text-slate-400 hover:text-slate-600 font-semibold'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-teal-50 text-teal-600'
                        : 'text-slate-400'
                    }`}
                  >
                    <Layers className="w-4 h-4 stroke-[2.4]" />
                  </div>
                  <span className="text-[10px] tracking-tight">Kelas</span>
                </Link>
              );
            })()}

            {/* 2. Scroll / Refresh Materi */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl text-slate-400 hover:text-teal-600 font-semibold transition-all cursor-pointer active:scale-95"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400">
                <BookOpen className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] tracking-tight">Materi</span>
            </button>

            {/* 3. Keluar Portal */}
            <Link
              href="/login"
              className="flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl text-slate-400 hover:text-rose-500 font-semibold transition-all cursor-pointer active:scale-95"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400">
                <LogOut className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] tracking-tight">Keluar</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
