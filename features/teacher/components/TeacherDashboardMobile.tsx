'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Mic,
  Camera,
  Plus,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { TeacherLayoutShell } from './TeacherLayoutShell';

interface ClassroomItem {
  id: string;
  name: string;
  grade_level: number;
  academic_year: string;
}

interface PendingReviewItem {
  id: string;
  studentName: string;
  className: string;
  assignmentTitle: string;
  submittedAt: string;
  type: 'VOICE_TASK' | 'PHOTO_HOMEWORK';
}

interface StatsData {
  totalStudents: number;
  totalPending: number;
  totalGraded: number;
  totalModules: number;
}

interface TeacherProfile {
  id: string;
  fullName: string;
  role: string;
  avatarUrl: string | null;
}

interface TeacherDashboardMobileProps {
  teacherProfile: TeacherProfile;
  classrooms: ClassroomItem[];
  pendingReviewQueue: PendingReviewItem[];
  stats: StatsData;
}

export function TeacherDashboardMobile({
  teacherProfile,
  classrooms,
  pendingReviewQueue,
  stats,
}: TeacherDashboardMobileProps) {
  const [activeSegment, setActiveSegment] = useState<'REVIEWS' | 'CLASSES'>('REVIEWS');

  const firstClassId = classrooms[0]?.id;

  return (
    <TeacherLayoutShell
      title={teacherProfile.fullName}
      subtitle="Ruang Guru • Kurikulum Merdeka"
      badgeText="Pendidik SD"
      badgeVariant="sky"
      activeNavTab="HOME"
      defaultClassId={firstClassId}
      headerAction={
        <Link
          href="/siswa"
          className="h-9 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-700 font-extrabold text-[11px] border border-slate-200/60 transition-all flex items-center gap-1 shadow-2xs"
          title="Buka Ruang Siswa"
        >
          <span>Murid</span>
          <span className="text-slate-400 text-xs">↗</span>
        </Link>
      }
    >

      {/* 2. Banner Informasi Cepat */}
      <section className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white rounded-3xl p-5 shadow-sm space-y-3 mb-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/25 backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Tahun Ajaran 2026/2027</span>
          </span>
          <span className="text-[10px] font-bold text-sky-200">Fase A & B/C</span>
        </div>

        <div>
          <h2 className="text-xl font-black tracking-tight">
            Selamat Mengajar, {teacherProfile.fullName.split(',')[0]}!
          </h2>
          <p className="text-xs text-sky-100 font-medium mt-0.5">
            {stats.totalPending > 0
              ? `Ada ${stats.totalPending} tugas siswa baru menanti evaluasi Anda.`
              : 'Hebat! Semua tugas siswa sudah tuntas dinilai.'}
          </p>
        </div>

        {/* Metrik Kotak Ringkas */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-white/10 rounded-2xl p-2.5 text-center backdrop-blur-xs border border-white/10">
            <span className="text-[9px] font-bold text-sky-200 uppercase block">Menunggu</span>
            <span className="text-lg font-black text-amber-300 leading-none mt-1 block">
              {stats.totalPending}
            </span>
          </div>
          <div className="bg-white/10 rounded-2xl p-2.5 text-center backdrop-blur-xs border border-white/10">
            <span className="text-[9px] font-bold text-sky-200 uppercase block">Dinilai</span>
            <span className="text-lg font-black text-emerald-300 leading-none mt-1 block">
              {stats.totalGraded}
            </span>
          </div>
          <div className="bg-white/10 rounded-2xl p-2.5 text-center backdrop-blur-xs border border-white/10">
            <span className="text-[9px] font-bold text-sky-200 uppercase block">Modul</span>
            <span className="text-lg font-black text-white leading-none mt-1 block">
              {stats.totalModules}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Segmented Switcher Nyaman Jempol */}
      <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 mb-3">
        <button
          type="button"
          onClick={() => setActiveSegment('REVIEWS')}
          className={`flex-1 min-h-[44px] rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeSegment === 'REVIEWS'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          <Clock className={`w-4 h-4 ${activeSegment === 'REVIEWS' ? 'text-amber-500' : 'text-slate-400'}`} />
          <span>Antrean Koreksi</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900">
            {pendingReviewQueue.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSegment('CLASSES')}
          className={`flex-1 min-h-[44px] rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeSegment === 'CLASSES'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
            }`}
        >
          <GraduationCap className={`w-4 h-4 ${activeSegment === 'CLASSES' ? 'text-sky-600' : 'text-slate-400'}`} />
          <span>Kelas & Kurikulum</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-sky-100 text-sky-900">
            {classrooms.length}
          </span>
        </button>
      </div>

      {/* 4. Daftar Kartu Feed Sesuai Tab */}
      {activeSegment === 'REVIEWS' ? (
        <div className="space-y-3">
          {pendingReviewQueue.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-black text-slate-800">Antrean Bersih!</p>
              <p className="text-xs text-slate-400">Belum ada tugas siswa baru yang perlu dikoreksi.</p>
            </div>
          ) : (
            pendingReviewQueue.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400">{item.className} • {item.submittedAt}</span>
                    <h3 className="text-base font-black text-slate-900 leading-tight mt-0.5">
                      {item.studentName}
                    </h3>
                  </div>

                  {item.type === 'VOICE_TASK' ? (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-purple-100 text-purple-800 flex items-center gap-1">
                      <Mic className="w-3.5 h-3.5" />
                      <span>Suara</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-blue-100 text-blue-800 flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Foto PR</span>
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Soal:</p>
                  <p className="text-xs font-bold text-slate-700 line-clamp-2 mt-0.5">
                    {item.assignmentTitle}
                  </p>
                </div>

                <Link
                  href={`/guru/penilaian/${item.id}`}
                  className="w-full min-h-[48px] rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform"
                >
                  <span>Mulai Koreksi Tugas</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {classrooms.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                  Level {cls.grade_level} SD (Fase A)
                </span>
                <span className="text-[11px] font-bold text-slate-400">{cls.academic_year}</span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900">{cls.name}</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Kurikulum Merdeka: Matematika Bab 1 (Membilang, Banding & Hitung Mundur).
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <Link
                  href={`/guru/kelas/${cls.id}/materi`}
                  className="w-full min-h-[46px] rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buka Kelola Bab & Materi</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Bottom Navigation Dock provided by TeacherLayoutShell */}
    </TeacherLayoutShell>
  );
}