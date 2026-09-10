import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ChevronRight,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { getStudentClassrooms } from '@/features/student/services/student-service';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import type { ClassRecord } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function SiswaPortalPage() {
  const result = await getStudentClassrooms();
  const classrooms: ClassRecord[] = result.success ? result.data : [];

  return (
    <StudentLayoutShell
      title="Halo, Teman Belajar!"
      subtitle="Kurikulum Merdeka SD"
      badgeText="SD"
      badgeVariant="amber"
      activeNavTab="KELAS"
      showBottomNav={true}
      maxWidth="sm"
    >
      {/* Friendly Kid Welcome Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 text-slate-950 shadow-md border-2 border-amber-300">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 backdrop-blur-xs rounded-full text-[10.5px] font-black text-slate-950 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Pilih Kelas Belajar</span>
          </span>

          <div className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-full shadow-2xs text-[11px] font-black text-slate-900 border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{classrooms.length} Kelas</span>
          </div>
        </div>

        <div className="mt-3.5 space-y-1">
          <h1 className="text-2xl font-black tracking-tight leading-tight">
            Ayo Mulai Belajar! 🎒
          </h1>
          <p className="text-xs font-bold text-slate-900/85 leading-snug">
            Sentuh kelasmu di bawah untuk mendengarkan cerita suara guru, membaca materi seru, dan kirim tugas.
          </p>
        </div>
      </section>

      {/* Classroom List Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Daftar Kelas Tersedia</span>
          </h2>
          <span className="text-[10px] font-bold text-slate-400">
            Pilih satu kelas
          </span>
        </div>

        {classrooms.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-2 shadow-xs">
            <p className="font-extrabold text-sm text-slate-700">Belum ada kelas aktif.</p>
            <p className="text-xs text-slate-400">
              Silakan hubungi bapak/ibu guru untuk mendaftarkan kelasmu.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {classrooms.map((classroom) => {
              const isFaseA = classroom.grade_level <= 2;
              const faseName = isFaseA
                ? 'Fase A (Kelas 1–2)'
                : classroom.grade_level <= 4
                ? 'Fase B (Kelas 3–4)'
                : 'Fase C (Kelas 5–6)';

              const cardBorder = isFaseA
                ? 'border-amber-200/90 hover:border-amber-400'
                : 'border-sky-200/90 hover:border-sky-400';

              const badgeColor = isFaseA
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-sky-100 text-sky-900 border-sky-300';

              const icon = isFaseA ? '📖' : classroom.grade_level <= 4 ? '🚀' : '🔬';
              const iconBg = isFaseA ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800';

              return (
                <Link
                  key={classroom.id}
                  href={`/siswa/kelas/${classroom.id}`}
                  className={`block p-4 rounded-3xl border-2 bg-white shadow-xs active:scale-98 transition-all cursor-pointer group ${cardBorder}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl ${iconBg} flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform shrink-0`}
                      >
                        {icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${badgeColor}`}
                          >
                            Kelas {classroom.grade_level} SD • {faseName}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 mt-1 truncate group-hover:text-amber-700 transition-colors">
                          {classroom.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-400">
                          Tahun Ajaran {classroom.academic_year}
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500 transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isFaseA ? 'Suara, Foto & Cerita' : 'Modul & Penugasan'}</span>
                    </div>

                    <span className="font-black text-xs text-amber-700 group-hover:underline flex items-center gap-1">
                      <span>Buka Kelas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </StudentLayoutShell>
  );
}