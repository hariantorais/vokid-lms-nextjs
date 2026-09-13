'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Star,
  Lock,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Compass,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import { equipStudentTitleAction } from '@/features/student/actions/title.actions';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import { TrophyTier } from '@/features/student/types/trophy';


export interface StarBreakdownData {
  lessonsCount: number;
  starsFromLessons: number;
  tasksCount: number;
  starsFromTasks: number;
  totalStars: number;
  currentEquippedTitle: string;
  currentEquippedIcon: string;
  currentEquippedTier: TrophyTier;
}

interface StudentMissionClientProps {
  starBreakdown: StarBreakdownData;
  studentName?: string;
  avatarUrl?: string | null;
}

export function StudentMissionClient({
  starBreakdown,
  studentName = 'Petualang',
  avatarUrl = null,
}: StudentMissionClientProps) {
  const [activeTab, setActiveTab] = useState<'TROPHY' | 'GUIDE'>('TROPHY');
  const [isPending, startTransition] = useTransition();

  // State gelar dan cincin avatar aktif
  const [activeTitle, setActiveTitle] = useState(starBreakdown.currentEquippedTitle);
  const [activeIcon, setActiveIcon] = useState(starBreakdown.currentEquippedIcon);
  const [activeTier, setActiveTier] = useState<TrophyTier>(starBreakdown.currentEquippedTier);

  const { totalStars, lessonsCount, starsFromLessons, tasksCount, starsFromTasks } = starBreakdown;

  // 8 TINGKATAN TROFI & GELAR AVATAR
  // 8 TINGKATAN TROFI DENGAN SKALA BINTANG & POS YANG DIPERBESAR
  const trophies: Array<{
    id: string;
    title: string;
    avatarTitle: string;
    description: string;
    icon: string;
    tier: TrophyTier;
    tierLabel: string;
    isUnlocked: boolean;
    current: number;
    target: number;
    unit: string;
  }> = [
      {
        id: 't-1',
        title: 'Langkah Pertama',
        avatarTitle: 'Petualang Baru',
        description: 'Taklukkan 1 pos materi belajarmu',
        icon: '🌱',
        tier: 'BRONZE',
        tierLabel: 'Perunggu',
        isUnlocked: lessonsCount >= 1,
        current: lessonsCount,
        target: 1,
        unit: 'Pos',
      },
      {
        id: 't-2',
        title: 'Pemburu Tugas Tangguh',
        avatarTitle: 'Pejuang Misi',
        description: 'Selesaikan 5 tugas atau kuis tantangan',
        icon: '🎯',
        tier: 'BRONZE',
        tierLabel: 'Perunggu',
        isUnlocked: tasksCount >= 5,
        current: tasksCount,
        target: 5,
        unit: 'Tugas',
      },
      {
        id: 't-3',
        title: 'Bintang Terbit',
        avatarTitle: 'Pencari Cahaya',
        description: 'Kumpulkan total 100 Bintang Emas pertama',
        icon: '✨',
        tier: 'BRONZE',
        tierLabel: 'Perunggu',
        isUnlocked: totalStars >= 100,
        current: totalStars,
        target: 100,
        unit: '⭐',
      },
      {
        id: 't-4',
        title: 'Penjelajah Rimba Pos',
        avatarTitle: 'Penjelajah Tangguh',
        description: 'Selesaikan 20 pos materi pelajaran',
        icon: '🎒',
        tier: 'SILVER',
        tierLabel: 'Perak',
        isUnlocked: lessonsCount >= 20,
        current: lessonsCount,
        target: 20,
        unit: 'Pos',
      },
      {
        id: 't-5',
        title: 'Pendekar Ratusan Cahaya',
        avatarTitle: 'Pendekar Bintang',
        description: 'Kumpulkan total 500 Bintang Emas',
        icon: '⚔️',
        tier: 'SILVER',
        tierLabel: 'Perak',
        isUnlocked: totalStars >= 500,
        current: totalStars,
        target: 500,
        unit: '⭐',
      },
      {
        id: 't-6',
        title: 'Master Penakluk Bab',
        avatarTitle: 'Ksatria Ilmu',
        description: 'Tuntaskan 50 pos materi di seluruh peta',
        icon: '🛡️',
        tier: 'GOLD',
        tierLabel: 'Emas',
        isUnlocked: lessonsCount >= 50,
        current: lessonsCount,
        target: 50,
        unit: 'Pos',
      },
      {
        id: 't-7',
        title: 'Mahkota Seribu Bintang',
        avatarTitle: 'Raja Bintang',
        description: 'Kumpulkan total 1.000 Bintang Emas',
        icon: '👑',
        tier: 'GOLD',
        tierLabel: 'Emas',
        isUnlocked: totalStars >= 1000,
        current: totalStars,
        target: 1000,
        unit: '⭐',
      },
      {
        id: 't-8',
        title: 'Legenda Galaksi Belajar',
        avatarTitle: 'Dewa Bintang',
        description: 'Kumpulkan total 3.000 Bintang Kehormatan',
        icon: '🌌',
        tier: 'DIAMOND',
        tierLabel: 'Berlian',
        isUnlocked: totalStars >= 3000,
        current: totalStars,
        target: 3000,
        unit: '⭐',
      },
    ];

  const unlockedCount = trophies.filter((t) => t.isUnlocked).length;

  const handleEquipTitle = (title: string, icon: string, tier: TrophyTier) => {
    if (activeTitle === title && activeTier === tier) return;

    startTransition(async () => {
      const res = await equipStudentTitleAction(title, icon, tier);
      if (res.success) {
        setActiveTitle(title);
        setActiveIcon(icon);
        setActiveTier(tier);
        toast.success(`Gelar "${icon} ${title}" dan bingkai trofi berhasil dipasang!`);
      } else {
        toast.error(res.error || 'Gagal memasang gelar.');
      }
    });
  };

  return (
    <StudentLayoutShell maxWidth="sm">
      <div className="space-y-4 pb-12 select-none">
        {/* HERO BANNER: KARTU IDENTITAS PRESTASI DENGAN PREVIEW AVATAR BERCINCIN */}
        <section className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 text-white border-2 border-b-6 border-amber-600 shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                <Trophy className="w-3.5 h-3.5 text-yellow-200" />
                Ruang Trofi & Gelar
              </span>
              <span className="text-xs font-black bg-amber-950/40 px-2.5 py-0.5 rounded-xl">
                {unlockedCount}/{trophies.length} Terbuka
              </span>
            </div>

            {/* PREVIEW AVATAR BERCINCIN AKTIF */}
            <div className="flex items-center gap-3.5">
              <div className="p-1 bg-white/20 rounded-full backdrop-blur-xs shrink-0">
                <StudentAvatar
                  avatarUrl={avatarUrl}
                  studentName={studentName}
                  size="lg"
                  trophyTier={activeTier}
                  badgeIcon={activeIcon}
                />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-amber-100 uppercase tracking-wide block">
                  Gelar Terpasang
                </span>
                <h1 className="text-base sm:text-lg font-black leading-tight truncate">
                  {activeTitle}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs font-black text-amber-950 bg-yellow-300 px-2 py-0.5 rounded-lg shadow-2xs">
                    <Star className="w-3 h-3 fill-amber-700 text-amber-700" />
                    {totalStars} Bintang
                  </span>
                  <span className="text-[11px] font-bold text-amber-100">
                    Tier: {activeTier}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <span className="absolute -right-4 -bottom-6 text-8xl opacity-15 pointer-events-none">
            🏆
          </span>
        </section>

        {/* TAB TOGGLE: LEMARI TROFI VS ASAL BINTANG */}
        <div className="flex gap-2 p-1 bg-slate-200/70 rounded-2xl text-xs font-black">
          <button
            type="button"
            onClick={() => setActiveTab('TROPHY')}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'TROPHY'
              ? 'bg-white text-slate-800 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Lemari Trofi ({unlockedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('GUIDE')}
            className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeTab === 'GUIDE'
              ? 'bg-white text-teal-700 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-500" />
            <span>Dari Mana Bintang?</span>
          </button>
        </div>

        {/* TAB 1: LEMARI TROFI DAN PASANG CINCIN/GELAR AVATAR */}
        {activeTab === 'TROPHY' && (
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-slate-400 px-1">
              Trofi yang terbuka dapat dipasang untuk mengubah cincin dan gelar di avatarmu.
            </p>

            <div className="space-y-2.5">
              {trophies.map((trophy) => {
                const isEquipped = activeTitle === trophy.avatarTitle && activeTier === trophy.tier;
                const progressPercent = Math.min(
                  100,
                  Math.round((trophy.current / trophy.target) * 100)
                );

                return (
                  <div
                    key={trophy.id}
                    className={`p-4 rounded-3xl border-2 transition-all flex flex-col gap-3 ${trophy.isUnlocked
                      ? isEquipped
                        ? 'bg-amber-50/70 border-2 border-b-4 border-amber-400 shadow-xs'
                        : 'bg-white border-b-4 border-slate-200 shadow-xs'
                      : 'bg-slate-100/70 border-slate-200 opacity-75'
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* PREVIEW IKON TROFI */}
                      <div
                        className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-2 ${trophy.isUnlocked
                          ? 'bg-amber-100/80 border-amber-300 shadow-2xs'
                          : 'bg-slate-200 border-slate-300 grayscale'
                          }`}
                      >
                        {trophy.icon}
                      </div>

                      {/* INFORMASI DETAIL */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <h3
                            className={`text-xs sm:text-sm font-black truncate ${trophy.isUnlocked ? 'text-slate-900' : 'text-slate-500'
                              }`}
                          >
                            {trophy.title}
                          </h3>

                          {trophy.isUnlocked ? (
                            <span className="inline-flex items-center gap-0.5 text-[9.5px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                              <CheckCircle2 className="w-3 h-3" />
                              Terbuka
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 text-[9.5px] font-black text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md shrink-0">
                              <Lock className="w-2.5 h-2.5" />
                              Terkunci
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] font-bold text-slate-400 leading-tight">
                          {trophy.description}
                        </p>

                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                            Gelar: {trophy.avatarTitle}
                          </span>
                          <span className="text-[10px] font-bold text-amber-600">
                            Tingkat {trophy.tierLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9.5px] font-black text-slate-400">
                        <span>Progres Syarat</span>
                        <span>
                          {Math.min(trophy.current, trophy.target)} / {trophy.target} {trophy.unit}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${trophy.isUnlocked ? 'bg-amber-400' : 'bg-slate-400'
                            }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* ACTION BUTTON EQUIP */}
                    {trophy.isUnlocked && (
                      <div className="pt-1 flex justify-end">
                        {isEquipped ? (
                          <button
                            type="button"
                            disabled
                            className="text-[11px] font-black bg-amber-200/80 text-amber-900 px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-default border border-amber-300"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Cincin & Gelar Aktif</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleEquipTitle(trophy.avatarTitle, trophy.icon, trophy.tier)
                            }
                            disabled={isPending}
                            className="text-[11px] font-black bg-white hover:bg-slate-50 text-slate-800 active:translate-y-0.5 border-2 border-b-3 border-slate-300 px-3.5 py-1.5 rounded-xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            {isPending ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                            )}
                            <span>Pasang di Avatar</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: AUDIT SUMBER ASAL BINTANG */}
        {activeTab === 'GUIDE' && (
          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-b-6 border-slate-200 shadow-xs space-y-3">
              <h2 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Rincian Asal Bintang Kamu</span>
              </h2>

              <div className="space-y-2.5">
                {/* Pos Materi */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                      ⛺
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">
                        Pos Materi Ditaklukkan
                      </h4>
                      <p className="text-[11px] font-bold text-slate-500">
                        {lessonsCount} pos tuntas dibaca (×10 ⭐)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-800 bg-white border border-amber-300 px-2.5 py-1 rounded-xl shrink-0">
                    +{starsFromLessons} ⭐
                  </span>
                </div>

                {/* Tugas & Kuis */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                      🎯
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">
                        Tugas & Kuis Selesai
                      </h4>
                      <p className="text-[11px] font-bold text-slate-500">
                        {tasksCount} tugas dikumpulkan (×15 ⭐)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-white border border-emerald-300 px-2.5 py-1 rounded-xl shrink-0">
                    +{starsFromTasks} ⭐
                  </span>
                </div>
              </div>

              {/* Total Summary */}
              <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
                <span className="text-xs font-black text-slate-600">Total Bintang Terkumpul</span>
                <span className="text-sm font-black text-amber-600 bg-amber-100/80 px-3 py-0.5 rounded-xl border border-amber-300">
                  {totalStars} ⭐
                </span>
              </div>
            </div>

            {/* Rekomendasi Aksi */}
            <div className="bg-teal-50 border-2 border-b-4 border-teal-200 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-teal-950">Mau Tambah Bintang & Trofi?</h4>
                  <p className="text-[10.5px] font-bold text-teal-700/90">
                    Buka pos materi berikutnya di peta belajarmu!
                  </p>
                </div>
              </div>

              <Link
                href="/siswa"
                className="w-8 h-8 rounded-xl bg-white text-teal-700 border border-teal-200 flex items-center justify-center hover:bg-teal-100 transition-colors shrink-0 shadow-2xs"
              >
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </StudentLayoutShell>
  );
}