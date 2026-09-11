'use client';

import React from 'react';
import {
  ArrowLeft,
  Layers,
  Edit2,
  Trash2,
  Plus,
  BookOpen,
  Video,
  FileText,
  Volume2,
  ChevronRight,
} from 'lucide-react';
import { formatModuleTitle, cleanModuleTitle } from '@/lib/formatters';
import type { SubjectOption } from '../../ModuleManagementCard';
import type { ModuleWithLessonsAndAssignments } from '../../AssignmentManagementCard';
import type { Lesson } from '@/types/database';

interface ModuleDetailViewProps {
  activeModule: ModuleWithLessonsAndAssignments;
  activeSubject: SubjectOption | null | undefined;
  onBackToSubject: () => void;
  onSelectLesson: (lessonId: string) => void;
  onOpenCreateLesson: () => void;
  onOpenEditModule: (module: ModuleWithLessonsAndAssignments) => void;
  onDeleteModule: (moduleId: string, title: string) => void;
  onOpenEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: string, title: string) => void;
}

export function ModuleDetailView({
  activeModule,
  activeSubject,
  onBackToSubject,
  onSelectLesson,
  onOpenCreateLesson,
  onOpenEditModule,
  onDeleteModule,
  onOpenEditLesson,
  onDeleteLesson,
}: ModuleDetailViewProps) {
  const lessons = activeModule.lessons ?? [];

  return (
    <div className="space-y-4 select-none">
      {/* Navigation & Action Bar inside Bab */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBackToSubject}
          className="h-9 px-2 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Mapel</span>
        </button>
      </div>

      {/* Level 3: Bab Header Info Card (Aksen khas & elegan pembeda bab vs materi) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-3xl shadow-sm border border-slate-700/50 relative overflow-hidden">
        {/* Subtle decoration background */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-sky-500/20 border border-sky-400/30 text-[10px] font-black text-sky-300 uppercase tracking-wider">
                <Layers className="w-3 h-3 text-sky-400" />
                {activeSubject?.name}
              </span>
              <span className="text-[11px] text-slate-300 font-semibold">
                {lessons.length} Materi / Sub-bab
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white leading-snug break-words">
              {formatModuleTitle(activeModule.order_index, activeModule.title)}
            </h2>
          </div>

          {/* Aksi Bab: Edit & Hapus (Icon Saja Berdampingan) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onOpenEditModule(activeModule)}
              className="p-2 rounded-xl text-slate-400 hover:text-sky-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Edit Nama Bab"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onDeleteModule(activeModule.id, activeModule.title)}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
              title="Hapus Bab Ini"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Level 4: List of Materi (Sub-bab) dengan Header & Tombol Materi Baru */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Daftar Materi ({lessons.length})
          </h3>

          <button
            type="button"
            onClick={onOpenCreateLesson}
            className="h-8 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Materi Baru</span>
          </button>
        </div>

        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">Belum ada materi di bab ini</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Klik tombol &quot;+ Materi Baru&quot; di atas untuk menambahkan sub-bab materi pertama.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {lessons.map((les, idx) => {
              const tasksCount = les.assignments?.length ?? 0;

              return (
                <div
                  key={les.id}
                  onClick={() => onSelectLesson(les.id)}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        les.content_type === 'VIDEO'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : les.content_type === 'PDF'
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : les.content_type === 'AUDIO'
                              ? 'bg-purple-50 text-purple-600 border-purple-200'
                              : 'bg-sky-50 text-sky-600 border-sky-200'
                      }`}
                    >
                      {les.content_type === 'VIDEO' ? (
                        <Video className="w-4 h-4" />
                      ) : les.content_type === 'PDF' ? (
                        <FileText className="w-4 h-4" />
                      ) : les.content_type === 'AUDIO' ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                        Materi {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 leading-snug break-words transition-colors">
                        {les.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {tasksCount} Tugas
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1.5 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onOpenEditLesson(les)}
                      className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                      title="Edit Materi"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteLesson(les.id, les.title)}
                      className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Hapus Materi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
