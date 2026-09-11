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
  LogOut,
} from 'lucide-react';
import { logoutAction } from '@/app/(auth)/actions/auth-actions';

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
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col antialiased relative selection:bg-sky-500 selection:text-white">
      {/* 1. Native Mobile Top Bar with Rich Color Gradient */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 text-white shadow-md border-b border-white/10">
        <div className={`w-full ${maxWidthClass} mx-auto px-3.5 sm:px-4 py-2.5 sm:py-3`}>
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
              {backHref ? (
                <Link
                  href={backHref}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer border border-white/20 shadow-xs"
                  title="Kembali"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </Link>
              ) : onBackClick ? (
                <button
                  type="button"
                  onClick={onBackClick}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer border border-white/20 shadow-xs"
                  title="Kembali"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
              ) : (
                /* Sleek Native Profile Pill / Avatar */
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-white/20 text-white font-black text-xs flex items-center justify-center shadow-xs select-none tracking-wider border border-white/30 backdrop-blur-xs">
                    {(() => {
                      const cleaned = title.replace(/^(Ibu|Bapak|Pak|Bu|Guru|Kelas|Kurikulum:)\s+/i, '').trim();
                      const parts = cleaned.split(' ');
                      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
                      return (parts[0]?.[0] ?? 'G').toUpperCase();
                    })()}
                  </div>
                  {/* Online / Active Indicator Dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-700 ring-1 ring-emerald-300" />
                </div>
              )}

              <div className="min-w-0 flex-1 py-0.5">
                <div className="flex items-center gap-2 flex-nowrap">
                  <h1 className="text-sm sm:text-base font-black text-white tracking-tight leading-snug truncate drop-shadow-xs">
                    {title}
                  </h1>
                  {badgeText && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider shrink-0 leading-none bg-white/20 text-white border-white/30 backdrop-blur-xs">
                      {badgeText}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-[11px] font-medium text-sky-100/90 leading-none mt-0.5 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Right Action / Trailing Accessories */}
            <div className="flex items-center gap-1.5 shrink-0">
              {headerAction}
              <button
                type="button"
                onClick={() => logoutAction()}
                title="Keluar dari Akun Guru"
                className="w-9 h-9 rounded-2xl bg-white/15 hover:bg-rose-600/90 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs border border-white/20"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>
        </div>
      </div>

      {/* Standardized Teacher Shell Container */}
      <div className={`w-full ${maxWidthClass} mx-auto px-3.5 sm:px-4 pt-3 sm:pt-4 ${showBottomNav ? 'pb-32 sm:pb-36' : 'pb-12 sm:pb-16'}`}>
        {headerSlot && <div className="mb-4">{headerSlot}</div>}

        {/* Main Body */}
        <main className="space-y-4">
          {children}
        </main>
      </div>

      {/* Standardized Bottom Navigation Bar (Mepet ke bawah tanpa margin ala Native Mobile App) */}
      {showBottomNav && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className={`w-full ${maxWidthClass} mx-auto px-2 py-1.5`}>
            <nav
              aria-label="Navigasi Utama Guru"
              className="text-white flex items-center justify-between gap-0.5"
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
                    className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'text-sky-400 font-extrabold'
                        : 'text-slate-400 hover:text-slate-200 font-semibold'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
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
                    className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'text-amber-400 font-extrabold'
                        : 'text-slate-400 hover:text-slate-200 font-semibold'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
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
                    className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'text-emerald-400 font-extrabold'
                        : 'text-slate-400 hover:text-slate-200 font-semibold'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
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

              {/* 4. Kelas & Kurikulum */}
              {(() => {
                const isActive =
                  activeNavTab === 'CURRICULUM' ||
                  pathname.startsWith('/guru/kelas') ||
                  pathname.startsWith('/guru/bab') ||
                  pathname.startsWith('/guru/pelajaran') ||
                  pathname.startsWith('/guru/materi');
                return (
                  <Link
                    href="/guru/kelas"
                    prefetch={true}
                    className={`flex-1 py-1.5 flex flex-col items-center gap-0.5 rounded-xl transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'text-purple-400 font-extrabold'
                        : 'text-slate-400 hover:text-slate-200 font-semibold'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-purple-400/15 text-purple-400 ring-1 ring-purple-400/30'
                          : 'text-slate-400'
                      }`}
                    >
                      <School className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] tracking-tight">Kelas</span>
                  </Link>
                );
              })()}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
