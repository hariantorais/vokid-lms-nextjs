'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Video,
  FileText,
  Volume2,
  ChevronRight,
} from 'lucide-react';
import type { ModuleWithLessonsAndAssignments } from '@/features/teacher/types/curriculum';

interface ModuleDetailViewProps {
  activeModule: ModuleWithLessonsAndAssignments;
}

export function ModuleDetailView({
  activeModule,
}: ModuleDetailViewProps) {
  const lessons = activeModule.lessons ?? [];

  return (
    <div className="space-y-4 select-none">
      {/* Level 4: List of Materi (Sub-bab) */}
      <div className="space-y-2.5">
        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">Belum ada materi di bab ini</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Klik tombol &quot;+ Materi Baru&quot; di bawah untuk menambahkan materi pertama.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {lessons.map((les, idx) => {
              const tasksCount = les.assignments?.length ?? 0;

              return (
                <Link
                  key={les.id}
                  href={`/guru/pelajaran/${les.id}`}
                  prefetch={true}
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

                  <div className="shrink-0 text-slate-300 group-hover:text-sky-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
