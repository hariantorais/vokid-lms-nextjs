'use client';

import React from 'react';
import {
  Loader2,
  Mic,
  Camera,
  ListChecks,
  Plus,
} from 'lucide-react';
import { MobileDrawer } from '@/features/teacher/components/MobileDrawer';
import type { Lesson } from '@/types/database';

export interface QuizQuestionState {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
}

interface AssignmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeLesson: Lesson | null | undefined;

  newTaskType: 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT';
  setNewTaskType: (type: 'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT') => void;
  newTaskPrompt: string;
  setNewTaskPrompt: (prompt: string) => void;
  newQuizQuestionCount: number;
  setNewQuizQuestionCount: (count: number) => void;
  newPassingScore: number;
  setNewPassingScore: (score: number) => void;
  newQuizQuestions: QuizQuestionState[];
  setNewQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestionState[]>>;

  handleCreateAssignment: (e: React.FormEvent) => void;
  isPending: boolean;
}

export function AssignmentDrawer({
  isOpen,
  onClose,
  activeLesson,
  newTaskType,
  setNewTaskType,
  newTaskPrompt,
  setNewTaskPrompt,
  newQuizQuestionCount,
  setNewQuizQuestionCount,
  newPassingScore,
  setNewPassingScore,
  newQuizQuestions,
  setNewQuizQuestions,
  handleCreateAssignment,
  isPending,
}: AssignmentDrawerProps) {
  return (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Tugas Siswa"
      subtitle={activeLesson ? <span className="text-xs text-slate-500">Materi: {activeLesson.title}</span> : undefined}
    >
      <form onSubmit={handleCreateAssignment} className="space-y-4">
        {/* Tipe Tugas */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Tipe Tugas / Penilaian</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setNewTaskType('PHOTO_HOMEWORK')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${
                newTaskType === 'PHOTO_HOMEWORK'
                  ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">Foto PR</span>
            </button>

            <button
              type="button"
              onClick={() => setNewTaskType('VOICE_TASK')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${
                newTaskType === 'VOICE_TASK'
                  ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Mic className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">Suara</span>
            </button>

            <button
              type="button"
              onClick={() => setNewTaskType('QUIZ_CBT')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition cursor-pointer ${
                newTaskType === 'QUIZ_CBT'
                  ? 'bg-amber-50 border-amber-500 text-amber-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ListChecks className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">Kuis CBT</span>
            </button>
          </div>
        </div>

        {/* Form spesifik KUIS CBT */}
        {newTaskType === 'QUIZ_CBT' ? (
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Judul Kuis</label>
              <input
                type="text"
                value={newTaskPrompt}
                onChange={(e) => setNewTaskPrompt(e.target.value)}
                placeholder="Contoh: Kuis Pemahaman Bab 1"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Jumlah Soal</label>
                <select
                  value={newQuizQuestionCount}
                  onChange={(e) => {
                    const count = Number(e.target.value);
                    setNewQuizQuestionCount(count);
                    setNewQuizQuestions((prev) => {
                      const updated = [...prev];
                      while (updated.length < count) {
                        updated.push({
                          questionText: '',
                          optionA: '',
                          optionB: '',
                          optionC: '',
                          optionD: '',
                          correctAnswer: 'A',
                        });
                      }
                      return updated.slice(0, count);
                    });
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value={3}>3 Soal (Singkat)</option>
                  <option value={5}>5 Soal (Standar)</option>
                  <option value={10}>10 Soal (Lengkap)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">KKM (Nilai Lulus)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={newPassingScore}
                  onChange={(e) => setNewPassingScore(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Builder Soal Kuis Interaktif */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                Penyusun Butir Soal ({newQuizQuestions.length} Soal)
              </label>

              {newQuizQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">Soal #{idx + 1}</span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      Kunci: {q.correctAnswer}
                    </span>
                  </div>

                  <textarea
                    rows={2}
                    value={q.questionText}
                    onChange={(e) => {
                      const text = e.target.value;
                      setNewQuizQuestions((prev) =>
                        prev.map((item, i) => (i === idx ? { ...item, questionText: text } : item))
                      );
                    }}
                    placeholder={`Tuliskan pertanyaan nomor ${idx + 1}...`}
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                    required
                  />

                  {/* 4 Opsi Pilihan Ganda */}
                  <div className="grid grid-cols-1 gap-1.5">
                    {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                      <div key={opt} className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name={`correct-${idx}`}
                          checked={q.correctAnswer === opt}
                          onChange={() =>
                            setNewQuizQuestions((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, correctAnswer: opt } : item
                              )
                            )
                          }
                          className="h-3.5 w-3.5 text-amber-600 focus:ring-amber-500 border-slate-300"
                        />
                        <span className="text-xs font-bold text-slate-600 w-3">{opt}.</span>
                        <input
                          type="text"
                          value={
                            opt === 'A'
                              ? q.optionA
                              : opt === 'B'
                                ? q.optionB
                                : opt === 'C'
                                  ? q.optionC
                                  : q.optionD
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewQuizQuestions((prev) =>
                              prev.map((item, i) => {
                                if (i !== idx) return item;
                                if (opt === 'A') return { ...item, optionA: val };
                                if (opt === 'B') return { ...item, optionB: val };
                                if (opt === 'C') return { ...item, optionC: val };
                                return { ...item, optionD: val };
                              })
                            );
                          }}
                          placeholder={`Pilihan ${opt}`}
                          className="w-full h-8 px-2 rounded-md border border-slate-200 text-xs font-medium bg-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Form PR Foto / Suara */
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {newTaskType === 'VOICE_TASK' ? 'Instruksi Rekaman Suara' : 'Instruksi Foto Tugas'}
            </label>
            <textarea
              rows={3}
              value={newTaskPrompt}
              onChange={(e) => setNewTaskPrompt(e.target.value)}
              placeholder={
                newTaskType === 'VOICE_TASK'
                  ? 'Contoh: Bacakan teks paragraf 1 dengan lafal dan intonasi yang jelas...'
                  : 'Contoh: Kerjakan latihan di buku tulis halaman 45 nomor 1-5, lalu foto jawabannya...'
              }
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 resize-none"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          ) : (
            <Plus className="w-4 h-4 text-amber-400" />
          )}
          <span>Publikasikan Tugas</span>
        </button>
      </form>
    </MobileDrawer>
  );
}
