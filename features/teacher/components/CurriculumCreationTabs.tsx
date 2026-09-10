'use client';

import React, { useState } from 'react';
import { BookOpen, Award, Sparkles } from 'lucide-react';
import { LessonForm, type ModuleOption } from './LessonForm';
import { AssignmentForm, type LessonOption } from './AssignmentForm';

interface CurriculumCreationTabsProps {
  modules: ModuleOption[];
  lessons: LessonOption[];
  gradeLevel: number;
}

export function CurriculumCreationTabs({
  modules,
  lessons,
  gradeLevel,
}: CurriculumCreationTabsProps) {
  const [activeTab, setActiveTab] = useState<'LESSON' | 'ASSIGNMENT'>('LESSON');

  const isFaseA = gradeLevel <= 2;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Tab Switcher Header */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-2 sm:p-3 flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('LESSON')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'LESSON'
              ? 'bg-white text-sky-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>1. Tambah Materi Pembelajaran</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ASSIGNMENT')}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === 'ASSIGNMENT'
              ? 'bg-white text-amber-700 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600" />
          <div className="flex items-center gap-1.5">
            <span>2. Buat Tugas Siswa</span>
            {isFaseA && (
              <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900">
                <Sparkles className="w-2.5 h-2.5" /> Fase A
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Tab Content Panel */}
      <div className="p-6 sm:p-8">
        {activeTab === 'LESSON' ? (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">Formulir Materi Pembelajaran Baru</h2>
              <p className="text-xs text-slate-500 mt-1">
                Unggah video interaktif, lembar bacaan PDF, atau fonik audio untuk murid.
              </p>
            </div>
            <LessonForm modules={modules} />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">Formulir Penugasan Adaptif Siswa</h2>
              <p className="text-xs text-slate-500 mt-1">
                Buat tugas rekaman suara (Voice Task) atau unggah foto PR (Photo Homework) dengan audio panduan guru.
              </p>
            </div>
            <AssignmentForm lessons={lessons} />
          </div>
        )}
      </div>
    </div>
  );
}
