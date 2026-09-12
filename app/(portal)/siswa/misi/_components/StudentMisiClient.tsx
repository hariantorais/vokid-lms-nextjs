'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Mic,
  Camera,
  HelpCircle,
  Star,
  ChevronRight,
  Flame,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import type { StudentMissionsData, StudentMissionItem } from '../../_services/student-missions.service';

interface StudentMisiClientProps {
  initialData: StudentMissionsData;
}

export function StudentMisiClient({ initialData }: StudentMisiClientProps) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'DONE'>('ALL');

  const filteredMissions = initialData.missions.filter((m) => {
    if (filter === 'PENDING') return !m.isCompleted;
    if (filter === 'DONE') return m.isCompleted;
    return true;
  });

  const getMissionIcon = (type: StudentMissionItem['type']) => {
    switch (type) {
      case 'VOICE_TASK':
        return { icon: <Mic className="w-5 h-5" />, label: 'Misi Suara', color: 'from-amber-400 to-orange-500', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
      case 'PHOTO_HOMEWORK':
        return { icon: <Camera className="w-5 h-5" />, label: 'Foto Tugas', color: 'from-sky-400 to-blue-500', text: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' };
      case 'QUIZ':
        return { icon: <HelpCircle className="w-5 h-5" />, label: 'Kuis Ceria', color: 'from-purple-400 to-indigo-500', text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
      default:
        return { icon: <Trophy className="w-5 h-5" />, label: 'Tantangan', color: 'from-teal-400 to-emerald-500', text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' };
    }
  };

  return (
    <StudentLayoutShell
      title="Papan Misi Petualang"
      backHref="/siswa"
      activeNavTab="MISI"
      showBottomNav={true}
      maxWidth="sm"
      starsCount={initialData.totalStars}
      userAvatarUrl={initialData.userAvatarUrl}
    >
      <div className="space-y-4 font-sans">
        {/* Banner Misi Game Quest Style */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-5 shadow-lg border-2 border-b-6 border-orange-700 text-white flex items-center justify-between gap-4">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 space-y-1.5 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full border border-white/20 shadow-2xs">
              <Flame className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>Quest Petualang</span>
            </div>
            <h1 className="text-base sm:text-xl font-black leading-snug drop-shadow-xs">
              Papan Misi & Tantangan! 📜
            </h1>
            <p className="text-xs text-orange-100 font-medium leading-relaxed">
              Selesaikan misi harian dari gurumu dan kumpulkan bintang emas bonus!
            </p>
          </div>

          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner border border-white/30 animate-bounce">
              🏆
            </div>
          </div>
        </section>

        {/* Quest Status Summary Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-2xl p-3.5 border-2 border-b-4 border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg">
              ⏳
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">Misi Aktif</div>
              <div className="text-lg font-black text-slate-900">{initialData.pendingCount} Misi</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border-2 border-b-4 border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg">
              ✨
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500">Tuntas</div>
              <div className="text-lg font-black text-emerald-600">{initialData.completedCount} Selesai</div>
            </div>
          </div>
        </div>

        {/* Filter Segmented Buttons (Game UI) */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
              filter === 'ALL'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({initialData.missions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('PENDING')}
            className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
              filter === 'PENDING'
                ? 'bg-amber-500 text-white shadow-xs border border-amber-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Belum ({initialData.pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('DONE')}
            className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
              filter === 'DONE'
                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-700'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tuntas ({initialData.completedCount})
          </button>
        </div>

        {/* Daftar Kartu Misi */}
        <div className="space-y-3">
          {filteredMissions.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 shadow-sm space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center text-3xl">
                🌟
              </div>
              <p className="font-black text-sm text-slate-800">
                {filter === 'PENDING' ? 'Hebat! Semua misi sudah kamu taklukkan!' : 'Belum ada misi dalam kategori ini.'}
              </p>
              <p className="text-xs text-slate-500">
                Terus tingkatkan prestasimu dan pantau misi baru dari guru!
              </p>
            </div>
          ) : (
            filteredMissions.map((m) => {
              const meta = getMissionIcon(m.type);
              const targetUrl = m.classId
                ? `/siswa/kelas/${m.classId}`
                : `/siswa/bab/${m.babId}`;

              return (
                <Link
                  key={m.id}
                  href={targetUrl}
                  className="group relative block p-4 bg-white rounded-3xl border-2 border-b-6 border-slate-200 hover:border-amber-400 active:border-b-2 active:translate-y-1 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {/* Icon Avatar Misi */}
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${meta.color} text-white flex items-center justify-center shrink-0 shadow-xs border-2 border-white group-hover:scale-105 transition-transform`}
                      >
                        {meta.icon}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${meta.bg} ${meta.text} ${meta.border}`}
                          >
                            {meta.label}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {m.className}
                          </span>
                        </div>

                        <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {m.prompt}
                        </h3>

                        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                          <span>{m.subjectName}</span>
                          <span>•</span>
                          <span>{m.lessonTitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge atau Tombol Aksi */}
                    <div className="shrink-0 pt-0.5">
                      {m.isCompleted ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-black shadow-2xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Selesai</span>
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border-2 border-amber-300 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all shadow-2xs">
                          <ArrowRight className="w-5 h-5 stroke-[2.8]" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </StudentLayoutShell>
  );
}
