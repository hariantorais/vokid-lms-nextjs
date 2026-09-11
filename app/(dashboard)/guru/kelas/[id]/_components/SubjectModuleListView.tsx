'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, BookOpen, ChevronRight, Edit2 } from 'lucide-react';
import { formatModuleTitle } from '@/lib/formatters';
import type { SubjectOption, ModuleWithLessonsAndAssignments } from '@/features/teacher/types/curriculum';

interface SubjectModuleListViewProps {
  subjects: SubjectOption[];
  modules: ModuleWithLessonsAndAssignments[];
  selectedSubjectId: string | null;
  activeSubject: SubjectOption | null | undefined;
  subjectModules: ModuleWithLessonsAndAssignments[];
  onSelectSubject: (subjectId: string) => void;
  onSelectModule: (moduleId: string, subjectId: string) => void;
  onOpenCreateSubject: () => void;
  onOpenEditSubject: (subject: SubjectOption) => void;
  onOpenCreateModule: () => void;
}

export function SubjectModuleListView({
  subjects,
  modules,
  selectedSubjectId,
  activeSubject,
  subjectModules,
  onSelectSubject,
  onSelectModule,
  onOpenCreateSubject,
  onOpenEditSubject,
  onOpenCreateModule,
}: SubjectModuleListViewProps) {
  return (
    <div className="space-y-4 select-none">
      {/* Action Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
            Bab Pembelajaran
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Pilih mapel di bawah untuk mengelola bab dan materinya
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCreateSubject}
            className="h-9 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
            title="Tambah Mata Pelajaran Baru"
          >
            <Plus className="w-3.5 h-3.5 text-sky-600" />
            <span>Mapel</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreateModule}
            disabled={!activeSubject}
            className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Bab</span>
          </button>
        </div>
      </div>

      {/* Level 2: Tab Navigasi Mapel (Mata Pelajaran) */}
      {subjects.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar items-center">
          {subjects.map((sub) => {
            const count = modules.filter((m) => m.subject_id === sub.id).length;
            const isSelected = selectedSubjectId === sub.id;

            return (
              <div
                key={sub.id}
                className={`inline-flex items-center rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectSubject(sub.id)}
                  className="px-3.5 py-2 cursor-pointer flex items-center gap-1.5"
                >
                  <span>{sub.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count} Bab
                  </span>
                </button>

                {/* Tombol Edit Mapel Langsung */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenEditSubject(sub);
                  }}
                  className={`p-1.5 mr-1 rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={`Edit atau Hapus ${sub.name}`}
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Level 3: List Kartu Bab di Mapel Terpilih / Kosong */}
      {subjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto text-sky-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">
              Belum ada Mata Pelajaran di kelas ini
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Mulai dengan menambahkan mata pelajaran (seperti Bahasa Indonesia, Matematika, Seni Rupa).
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenCreateSubject}
            className="h-9 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat Mapel Pertama</span>
          </button>
        </div>
      ) : subjectModules.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            Belum ada Bab di mapel {activeSubject?.name ?? 'ini'}
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Klik tombol &quot;+ Bab&quot; di atas untuk menyusun bab kurikulum pertama.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {subjectModules.map((mod, idx) => {
            const lessonsCount = mod.lessons?.length ?? 0;
            const totalTasksInModule =
              mod.lessons?.reduce(
                (acc, l) => acc + (l.assignments?.length ?? 0),
                0
              ) ?? 0;

            return (
              <Link
                key={mod.id}
                href={`/guru/bab/${mod.id}`}
                prefetch={true}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 group-hover:bg-sky-500 text-sky-700 group-hover:text-white font-black text-sm flex items-center justify-center shrink-0 border border-sky-100 group-hover:border-sky-500 transition-all">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 leading-snug break-words transition-colors">
                      {formatModuleTitle(mod.order_index, mod.title)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-medium flex-wrap">
                      <span>{lessonsCount} Sub-bab / Materi</span>
                      <span>•</span>
                      <span>{totalTasksInModule} Tugas Terpasang</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 text-slate-300 group-hover:text-sky-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
