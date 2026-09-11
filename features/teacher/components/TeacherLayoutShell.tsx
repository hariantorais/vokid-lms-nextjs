'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  School,
  Clock,
  BookOpen,
  Plus,
  Home,
  CheckCircle2,
  Users,
  LayoutDashboard,
} from 'lucide-react';

export interface TeacherLayoutShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'sky' | 'amber' | 'emerald' | 'purple';
  backHref?: string;
  onBackClick?: () => void;
  headerAction?: React.ReactNode;
  activeNavTab?: 'HOME' | 'PENILAIAN' | 'STUDENTS' | 'CURRICULUM';
  showBottomNav?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  headerSlot?: React.ReactNode;
  defaultClassId?: string;
  transparentHeader?: boolean;
}

export function TeacherLayoutShell({
  children,
  title,
  subtitle,
  badgeText,
  badgeVariant = 'sky',
  backHref,
  onBackClick,
  headerAction,
  activeNavTab,
  showBottomNav = true,
  maxWidth = 'sm',
  headerSlot,
  defaultClassId = '11111111-1111-1111-1111-111111111112',
  transparentHeader = true,
}: TeacherLayoutShellProps) {
  const pathname = usePathname();

  const maxWidthClass = {
    sm: 'max-w-[440px]',
    md: 'max-w-2xl',
    lg: 'max-w-5xl',
    full: 'max-w-full',
  }[maxWidth];

  const badgeColors = {
    sky: 'bg-sky-50 text-sky-700 border-sky-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
  }[badgeVariant];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100/90 via-sky-50/20 to-slate-100/90 text-slate-900 flex flex-col antialiased relative selection:bg-sky-500 selection:text-white">
      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-sky-200/30 via-indigo-100/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Standardized Teacher Shell Container */}
      <div className={`w-full ${maxWidthClass} mx-auto px-3 sm:px-4 pt-2.5 sm:pt-4 ${showBottomNav ? 'pb-32 sm:pb-36' : 'pb-12 sm:pb-16'}`}>
        
        {/* Native Mobile App Top Header / Navigation Bar */}
        <header
          className={`flex items-center justify-between transition-all ${
            transparentHeader
              ? 'bg-transparent border-0 shadow-none px-1 py-2 mb-2.5'
              : 'bg-white/80 backdrop-blur-xl rounded-3xl px-3.5 py-2.5 min-h-[64px] border border-slate-200/70 shadow-xs mb-3.5 sticky top-2 z-30'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
            {backHref ? (
              <Link
                href={backHref}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-90 ${
                  transparentHeader
                    ? 'bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 border border-slate-900/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-2xs border border-slate-200/50'
                }`}
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </Link>
            ) : onBackClick ? (
              <button
                type="button"
                onClick={onBackClick}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-90 ${
                  transparentHeader
                    ? 'bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 border border-slate-900/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 shadow-2xs border border-slate-200/50'
                }`}
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              /* Sleek Native Profile Pill / Avatar */
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-indigo-700 text-white font-black text-[11px] flex items-center justify-center shadow-xs select-none tracking-wider ring-2 ring-white">
                  {(() => {
                    const cleaned = title.replace(/^(Ibu|Bapak|Pak|Bu|Guru|Kelas|Kurikulum:)\s+/i, '').trim();
                    const parts = cleaned.split(' ');
                    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
                    return (parts[0]?.[0] ?? 'G').toUpperCase();
                  })()}
                </div>
                {/* Online / Active Indicator Dot */}
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
                <p className="text-[10.5px] font-semibold text-slate-400 leading-none mt-1 truncate">
                  {subtitle}
                </p>
              ) : (
                <p className="text-[10px] font-semibold text-slate-400 leading-none mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Guru Aktif</span>
                </p>
              )}
            </div>
          </div>

          {/* Right Action / Trailing Accessories */}
          <div className="flex items-center gap-1.5 shrink-0">
            {headerAction}
          </div>
        </header>

        {headerSlot && <div className="mb-4">{headerSlot}</div>}

        {/* Main Body */}
        <main className="space-y-4">
          {children}
        </main>
      </div>

      {/* 5-Menu Standardized Floating Bottom Navigation Dock (Teacher Mobile Native Dock) */}
      {showBottomNav && (
        <div className="fixed bottom-3 inset-x-3 max-w-[460px] mx-auto z-40">
          <nav
            aria-label="Navigasi Utama Guru"
            className="bg-slate-900/95 backdrop-blur-xl text-white rounded-3xl p-1.5 shadow-2xl border border-slate-700/60 flex items-center justify-between gap-0.5"
          >
            {/* 1. Home (Dashboard Guru) */}
            {(() => {
              const isActive =
                activeNavTab === 'HOME' ||
                pathname === '/guru' ||
                pathname === '/guru/dashboard';
              return (
                <Link
                  href="/guru/dashboard"
                  prefetch={true}
                  className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-sky-400 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 font-semibold'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-sky-400/15 text-sky-400 ring-1 ring-sky-400/30'
                        : 'text-slate-400'
                    }`}
                  >
                    <Home className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] tracking-tight">Home</span>
                </Link>
              );
            })()}

            {/* 2. Penilaian (Antrean Koreksi) */}
            {(() => {
              const isActive =
                activeNavTab === 'PENILAIAN' ||
                (pathname.startsWith('/guru/penilaian') && !pathname.includes('/guru/penilaian/'));
              return (
                <Link
                  href="/guru/penilaian"
                  prefetch={true}
                  className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-amber-400 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 font-semibold'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/30'
                        : 'text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] tracking-tight">Penilaian</span>
                </Link>
              );
            })()}

            {/* 3. Siswa */}
            {(() => {
              const isActive =
                activeNavTab === 'STUDENTS' || pathname.startsWith('/guru/siswa');
              return (
                <Link
                  href="/guru/siswa"
                  prefetch={true}
                  className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-emerald-400 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 font-semibold'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-emerald-400/15 text-emerald-400 ring-1 ring-emerald-400/30'
                        : 'text-slate-400'
                    }`}
                  >
                    <Users className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] tracking-tight">Siswa</span>
                </Link>
              );
            })()}

            {/* 4. Materi */}
            {(() => {
              const isActive =
                activeNavTab === 'CURRICULUM' || pathname.startsWith('/guru/materi') || pathname.includes('/materi');
              return (
                <Link
                  href="/guru/materi"
                  prefetch={true}
                  className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-2xl transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'text-purple-400 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 font-semibold'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-purple-400/15 text-purple-400 ring-1 ring-purple-400/30'
                        : 'text-slate-400'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] tracking-tight">Materi</span>
                </Link>
              );
            })()}
          </nav>
        </div>
      )}
    </div>
  );
}
