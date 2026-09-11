'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Plus,
  School,
  Sparkles,
  Loader2,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';
import { TeacherLayoutShell } from './TeacherLayoutShell';
import { CurriculumHierarchyView } from './CurriculumHierarchyView';
import { MobileDrawer } from './MobileDrawer';
import { createClassAction, getClassCurriculumAction } from '../actions/teacher-actions';
import type { ClassRecord } from '@/types/database';
import type { GeneralCurriculumData } from '../services/teacher-service';

interface TeacherGeneralCurriculumViewProps {
  data: GeneralCurriculumData;
}

export function TeacherGeneralCurriculumView({ data }: TeacherGeneralCurriculumViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { classrooms, allCurriculumsByClass = {} } = data;
  const [activeClass, setActiveClass] = useState<ClassRecord | null>(data.activeClass);
  const [subjects, setSubjects] = useState(data.subjects);
  // Cache to store curriculum per class in memory for 0ms instant switching
  const [curriculumCache, setCurriculumCache] = useState<Record<string, typeof data.subjects>>(allCurriculumsByClass);

  // Sync state if initial data changes from server
  React.useEffect(() => {
    setActiveClass(data.activeClass);
    setSubjects(data.subjects);
    if (data.allCurriculumsByClass) {
      setCurriculumCache((prev) => ({ ...prev, ...data.allCurriculumsByClass }));
    }
  }, [data.activeClass, data.subjects, data.allCurriculumsByClass]);

  // Drawer Create Class
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
      // Navigate to the newly created class
      router.push(`/guru/materi?classId=${res.data.id}`);
      router.refresh();
    });
  };

  const handleSelectClass = (cls: ClassRecord) => {
    if (cls.id === activeClass?.id) return;

    // 1. INSTAN: Jika kurikulum kelas sudah ada di cache memory (0ms latency, zero delay)
    if (curriculumCache[cls.id]) {
      setActiveClass(cls);
      setSubjects(curriculumCache[cls.id]);
      router.replace(`/guru/materi?classId=${cls.id}`, { scroll: false });
      return;
    }

    // 2. Fallback jika kelas baru atau belum ada di cache
    setActiveClass(cls);
    setSubjects([]);
    router.replace(`/guru/materi?classId=${cls.id}`, { scroll: false });

    startTransition(async () => {
      try {
        const res = await getClassCurriculumAction(cls.id);
        if (res.success) {
          setActiveClass(res.data.classData);
          setSubjects(res.data.subjects);
          setCurriculumCache((prev) => ({ ...prev, [cls.id]: res.data.subjects }));
        } else {
          toast.error(res.error);
        }
      } catch (err) {
        toast.error('Terjadi kesalahan saat memuat data kelas.');
      }
    });
  };

  // Convert subjects to format expected by CurriculumHierarchyView
  const subjectOptions = subjects.map((s) => ({
    id: s.id,
    name: s.name,
    code: s.code,
  }));

  const modulesWithLessonsAndAssignments = subjects.flatMap((s) => s.modules);

  const isFaseA = (activeClass?.grade_level ?? 1) <= 2;
  const faseLabel = isFaseA ? 'Fase A (Kelas 1–2)' : 'Fase B/C (Kelas 3–6)';

  return (
    <TeacherLayoutShell
      title="Kelola Materi & Kurikulum"
      subtitle={
        activeClass
          ? `Materi kurikulum untuk ${activeClass.name}`
          : 'Pilih kelas pembelajaran terlebih dahulu'
      }
      badgeText={
        activeClass
          ? activeClass.name
          : `${classrooms.length} Kelas Tersedia`
      }
      badgeVariant="purple"
      activeNavTab="CURRICULUM"
      defaultClassId={activeClass?.id}
    >
      <div className="space-y-4">
        {/* Class Selection & Quick Creation Bar */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <School className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Pilih Kelas
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsCreateClassOpen(true)}
              className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-2xs cursor-pointer transition-all active:scale-95 shrink-0"
              title="Tambah Kelas"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Horizontal Class Pills */}
          {classrooms.length > 0 ? (
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar pt-1 border-t border-slate-100">
              {classrooms.map((cls) => {
                const isActive = cls.id === activeClass?.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => handleSelectClass(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-2xs ring-2 ring-purple-600/30'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 active:scale-95'
                    }`}
                  >
                    <span>{cls.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-black ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                      }`}
                    >
                      Kls {cls.grade_level}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* Condition 1: Belum ada kelas sama sekali */}
        {classrooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-2xs border border-purple-100">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                Belum Ada Kelas Terdaftar
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Untuk mulai membuat mata pelajaran, bab modul, materi bacaan/video, dan tugas siswa, silakan buat kelas pertama Anda terlebih dahulu.
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
        ) : !activeClass ? (
          /* Condition 2: Kelas belum dipilih -> Bersih dan terarah ke card pilihan di atas */
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-purple-200/80 p-6 space-y-3 shadow-2xs animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-2xs border border-purple-100">
              <School className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-slate-800">
                Silakan Pilih Kelas di Atas
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Klik salah satu tombol kelas di atas untuk langsung melihat materi dan bab kurikulum.
              </p>
            </div>
          </div>
        ) : (
          /* Condition 3: Kelas terpilih -> Tampilkan Hierarchy Mapel -> Bab -> Materi -> Tugas */
          <CurriculumHierarchyView
            key={activeClass.id}
            classId={activeClass.id}
            className={activeClass.name}
            gradeLevel={activeClass.grade_level}
            academicYear={activeClass.academic_year}
            subjects={subjectOptions}
            modules={modulesWithLessonsAndAssignments}
          />
        )}

        {/* Drawer Tambah Kelas Baru */}
        <MobileDrawer
          isOpen={isCreateClassOpen}
          onClose={() => setIsCreateClassOpen(false)}
          title="Buat Kelas Baru"
        >
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Kelas *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Kelas 1A, Kelas 2 Bintang, Kelas 3..."
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tingkat Kelas (SD) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setNewGradeLevel(lvl)}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      newGradeLevel === lvl
                        ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Kelas {lvl} SD
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                {newGradeLevel <= 2
                  ? '💡 Kelas 1–2 masuk ke Fase A (Fokus audio & fonik ramah anak).'
                  : '💡 Kelas 3–6 masuk ke Fase B/C (Mendukung tugas foto PR & LKPD).'}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tahun Ajaran
              </label>
              <input
                type="text"
                value={newAcademicYear}
                onChange={(e) => setNewAcademicYear(e.target.value)}
                placeholder="2026/2027"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buat & Mulai Isi Materi'}
            </button>
          </form>
        </MobileDrawer>
      </div>
    </TeacherLayoutShell>
  );
}
