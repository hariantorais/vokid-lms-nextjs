import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
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
      title="Ruangbelajar SD"
      subtitle="Pilih kelas belajarmu"
      badgeText="SD"
      activeNavTab="KELAS"
      showBottomNav={true}
      maxWidth="sm"
    >
      {/* Banner Ringkas ala Ruangguru Dafa Lulu */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Kurikulum Merdeka</span>
          </div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">
            Hai, Mau Belajar Apa Hari Ini?
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Pilih kelas di bawah untuk mulai video & tugas interaktif.
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-3xl shrink-0">
          🎒
        </div>
      </section>

      {/* Daftar Kelas Kartu Bersih */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-600 uppercase tracking-wider">
            Kelas Tersedia
          </h2>
          <span className="text-[11px] font-bold text-teal-700">
            {classrooms.length} Kelas
          </span>
        </div>

        {classrooms.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 space-y-1 shadow-xs">
            <p className="font-extrabold text-sm text-slate-700">Belum ada kelas.</p>
            <p className="text-xs text-slate-400">Silakan hubungi bapak/ibu guru.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {classrooms.map((classroom) => {
              const isFaseA = classroom.grade_level <= 2;
              const faseName = isFaseA
                ? 'Fase A (Kelas 1–2)'
                : classroom.grade_level <= 4
                ? 'Fase B (Kelas 3–4)'
                : 'Fase C (Kelas 5–6)';

              const icon = isFaseA ? '📖' : classroom.grade_level <= 4 ? '🚀' : '🔬';

              return (
                <Link
                  key={classroom.id}
                  href={`/siswa/kelas/${classroom.id}`}
                  className="block p-3.5 bg-white rounded-2xl border border-slate-100 hover:border-teal-300 shadow-xs active:scale-98 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                        {icon}
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] font-black text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                          Kelas {classroom.grade_level} SD • {faseName}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 mt-0.5 truncate group-hover:text-teal-700 transition-colors">
                          {classroom.name}
                        </h3>
                        <p className="text-[10.5px] font-semibold text-slate-400">
                          Tahun {classroom.academic_year}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
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