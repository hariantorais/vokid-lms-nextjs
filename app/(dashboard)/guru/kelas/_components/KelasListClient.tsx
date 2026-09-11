'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { School, Plus, ChevronRight, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { MobileDrawer } from '@/features/teacher/components/MobileDrawer';
import { createClassAction } from '@/features/teacher/actions/teacher-actions';
import type { ClassRecord } from '@/types/database';

interface KelasListClientProps {
  classrooms: ClassRecord[];
}

export function KelasListClient({ classrooms }: KelasListClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Drawer Tambah Kelas
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState<number>(1);
  const [newAcademicYear, setNewAcademicYear] = useState('2026/2027');

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      toast.error('Nama kelas tidak boleh kosong.');
      return;
    }

    startTransition(async () => {
      const res = await createClassAction({
        name: newClassName.trim(),
        gradeLevel: newGradeLevel,
        academicYear: newAcademicYear.trim(),
      });

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success(`Kelas ${res.data.name} berhasil dibuat!`);
      setIsCreateClassOpen(false);
      setNewClassName('');
      router.push(`/guru/kelas/${res.data.id}`);
      router.refresh();
    });
  };

  return (
    <TeacherLayoutShell
      title="Daftar Kelas"
      subtitle="Kelola mata pelajaran dan kurikulum kelas"
      badgeText="Manajemen Kurikulum"
      badgeVariant="purple"
      backHref="/guru"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4">
        {/* Action Header */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              Semua Kelas Binaan
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Pilih kelas untuk mengelola mapel, bab, dan materinya
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateClassOpen(true)}
            className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Kelas Baru</span>
          </button>
        </div>

        {/* List Kelas */}
        {classrooms.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-2xs border border-purple-100">
              <School className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                Belum Ada Kelas Terdaftar
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Mulai dengan membuat kelas binaan Anda untuk menyusun kurikulum, modul, dan materi pembelajaran.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateClassOpen(true)}
              className="h-11 px-5 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Kelas Pertama</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {classrooms.map((cls) => {
              const isFaseA = cls.grade_level <= 2;

              return (
                <Link
                  key={cls.id}
                  href={`/guru/kelas/${cls.id}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-purple-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 group-hover:bg-purple-600 text-purple-700 group-hover:text-white font-black text-sm flex items-center justify-center shrink-0 border border-purple-100 group-hover:border-purple-600 transition-all">
                      <School className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span
                          className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            isFaseA
                              ? 'bg-amber-50 text-amber-800 border-amber-200/70'
                              : 'bg-sky-50 text-sky-800 border-sky-200/70'
                          }`}
                        >
                          Tingkat {cls.grade_level} SD • {isFaseA ? 'Fase A' : 'Fase B/C'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          T.A. {cls.academic_year}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 leading-snug break-words transition-colors">
                        {cls.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 text-slate-300 group-hover:text-purple-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Drawer Tambah Kelas Baru */}
      <MobileDrawer
        isOpen={isCreateClassOpen}
        onClose={() => setIsCreateClassOpen(false)}
        title="Buat Kelas Baru"
        subtitle={
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 border border-purple-100 text-[10px] font-extrabold text-purple-700 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-purple-600" />
              Kurikulum Merdeka
            </span>
          </div>
        }
      >
        <form onSubmit={handleCreateClass} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Kelas *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Kelas 1-A, Kelas 2-B"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tingkat Kelas *
              </label>
              <select
                value={newGradeLevel}
                onChange={(e) => setNewGradeLevel(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Kelas {lvl} ({lvl <= 2 ? 'Fase A' : lvl <= 4 ? 'Fase B' : 'Fase C'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tahun Ajaran *
              </label>
              <input
                type="text"
                required
                placeholder="2026/2027"
                value={newAcademicYear}
                onChange={(e) => setNewAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Kelas...</span>
              </>
            ) : (
              'Simpan Kelas'
            )}
          </button>
        </form>
      </MobileDrawer>
    </TeacherLayoutShell>
  );
}
