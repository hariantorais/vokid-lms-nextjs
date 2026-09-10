'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Sparkles,
  Star,
  Layers,
  BookOpen,
  LogOut,
  GraduationCap,
  Award,
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
}

export function StudentLayoutShell({
  children,
  title,
  subtitle,
  badgeText,
  badgeVariant = 'amber',
  backHref,
  onBackClick,
  headerAction,
  activeNavTab,
  showBottomNav = true,
  maxWidth = 'sm',
  headerSlot,
  starsCount = 120,
}: StudentLayoutShellProps) {
  const pathname = usePathname();

  const maxWidthClass = {
    sm: 'max-w-[440px]',
    md: 'max-w-2xl',
    lg: 'max-w-5xl',
    full: 'max-w-full',
  }[maxWidth];

  const badgeColors = {
    amber: 'bg-amber-100 text-amber-900 border-amber-300',
    sky: 'bg-sky-100 text-sky-900 border-sky-300',
    emerald: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  }[badgeVariant];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50/25 to-emerald-50/30 text-slate-900 flex flex-col antialiased relative selection:bg-amber-300 selection:text-slate-950">
      {/* Warm Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-amber-200/25 via-sky-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Mobile-Constrained Container */}
      <div
        className={`w-full ${maxWidthClass} mx-auto px-3 sm:px-4 pt-2.5 sm:pt-4 ${
          showBottomNav ? 'pb-32 sm:pb-36' : 'pb-12 sm:pb-16'
        }`}
      >
        {/* Mobile Native App Top Header / Navigation Bar */}
        <header className="bg-white/90 backdrop-blur-xl rounded-3xl px-3.5 py-2.5 min-h-[64px] border border-amber-200/70 shadow-xs flex items-center justify-between mb-3.5 sticky top-2 z-30 transition-all">
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
            {backHref ? (
              <Link
                href={backHref}
                className="w-9 h-9 rounded-2xl bg-amber-50 hover:bg-amber-100 active:scale-90 text-slate-700 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-2xs border border-amber-200/60"
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </Link>
            ) : onBackClick ? (
              <button
                type="button"
                onClick={onBackClick}
                className="w-9 h-9 rounded-2xl bg-amber-50 hover:bg-amber-100 active:scale-90 text-slate-700 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-2xs border border-amber-200/60"
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              /* Sleek Kid Avatar Squircle */
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-xs select-none ring-2 ring-white">
                  👦
                </div>
                {/* Active Learning Status Dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400/30" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-nowrap">
                <span className="text-sm font-black text-slate-900 tracking-tight leading-none truncate">
                  {title}
                </span>
                {badgeText && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider shrink-0 leading-none ${badgeColors}`}
                  >
                    {badgeText}
                  </span>
                )}
              </div>
              {subtitle ? (
                <p className="text-[10.5px] font-bold text-slate-400 leading-none mt-1 truncate">
                  {subtitle}
                </p>
              ) : (
                <p className="text-[10px] font-bold text-slate-400 leading-none mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Siswa Belajar SD</span>
                </p>
              )}
            </div>
          </div>

          {/* Right Action / Trailing: Star Badge & Header Action */}
          <div className="flex items-center gap-1.5 shrink-0">
            {headerAction ? (
              headerAction
            ) : (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 rounded-full border border-amber-300 text-amber-900 text-[11px] font-black shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{starsCount}</span>
              </div>
            )}
          </div>
        </header>

        {headerSlot && <div className="mb-4">{headerSlot}</div>}

        {/* Main Body */}
        <main className="space-y-4">{children}</main>
      </div>

      {/* Floating Bottom Navigation Dock (Mobile Native) */}
      {showBottomNav && (
        <div className="fixed bottom-3 inset-x-3 max-w-[440px] mx-auto z-40">
          <nav
            aria-label="Navigasi Siswa"
            className="bg-slate-900/95 backdrop-blur-xl text-white rounded-3xl p-1.5 shadow-2xl border border-slate-700/60 flex items-center justify-between gap-1"
          >
            {/* 1. Pilih Kelas */}
            {(() => {
              const isActive =
                activeNavTab === 'KELAS' ||
                pathname === '/siswa' ||
                pathname.startsWith('/siswa/kelas');
              return (
                <Link
                  href="/siswa"
                  className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-amber-400 font-black'
                      : 'text-slate-400 hover:text-slate-200 font-semibold'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-amber-400/20 text-amber-400 ring-1 ring-amber-400/40'
                        : 'text-slate-400'
                    }`}
                  >
                    <Layers className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] tracking-tight">Kelas</span>
                </Link>
              );
            })()}

            {/* 2. Scroll / Refresh Materi */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl text-slate-400 hover:text-sky-300 font-semibold transition-all cursor-pointer active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400">
                <BookOpen className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-[10px] tracking-tight">Materi</span>
            </button>

            {/* 3. Keluar Portal */}
            <Link
              href="/login"
              className="flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl text-slate-400 hover:text-rose-400 font-semibold transition-all cursor-pointer active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400">
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
