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

  if (isCreateClassOpen) {
    return (
      <TeacherLayoutShell
        title="Buat Kelas Baru"
        onBackClick={() => {
          setIsCreateClassOpen(false);
          setNewClassName('');
        }}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="create-class-form"
          onSubmit={handleCreateClass}
          className="space-y-4 pt-1 pb-24"
        >
            {/* Input Nama Kelas */}
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Kelas *
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Contoh: Kelas 1-A, Kelas 2 Merak"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Gunakan nama yang mudah dikenali oleh guru dan siswa.
              </p>
            </div>

            {/* Input Tingkat Kelas & Tahun Ajaran */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Tingkat Kelas *
                </label>
                <select
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((lvl) => (
                    <option key={lvl} value={lvl}>
                      Kelas {lvl} SD ({lvl <= 2 ? 'Fase A' : lvl <= 4 ? 'Fase B' : 'Fase C'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Tahun Ajaran *
                </label>
                <input
                  type="text"
                  required
                  placeholder="2026/2027"
                  value={newAcademicYear}
                  onChange={(e) => setNewAcademicYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
                />
              </div>
            </div>
          </form>

          {/* Fixed Bottom Action Bar: Tombol Simpan di Bawah agar Mudah Dijangkau Jari */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
            <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCreateClassOpen(false);
                  setNewClassName('');
                }}
                className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
              >
                Batal
              </button>

              <button
                type="submit"
                form="create-class-form"
                disabled={isPending}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
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
            </div>
          </div>
      </TeacherLayoutShell>
    );
  }

  return (
    <TeacherLayoutShell
      title="Daftar Kelas"
      backHref="/guru"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4">
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
                          className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md border ${isFaseA
                            ? 'bg-amber-50 text-amber-800 border-amber-200/70'
                            : 'bg-sky-50 text-sky-800 border-sky-200/70'
                            }`}
                        >
                          Kelas {cls.grade_level} SD
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

      {/* Floating Action Button (FAB) Tambah Kelas ala Native Mobile */}
      <div className="fixed bottom-24 right-4 sm:right-6 md:right-8 z-40">
        <button
          type="button"
          onClick={() => setIsCreateClassOpen(true)}
          className="h-12 px-4 sm:h-13 sm:px-5 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-95 transition-all cursor-pointer border border-white/20 ring-4 ring-white/30"
          title="Tambah Kelas Baru"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white stroke-[3]" />
          </div>
          <span className="tracking-wide">Kelas Baru</span>
        </button>
      </div>
    </TeacherLayoutShell>
  );
}
