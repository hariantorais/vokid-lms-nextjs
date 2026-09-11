'use client';

import React from 'react';
import {
  Loader2,
  Mic,
  Camera,
  ListChecks,
  Plus,
} from 'lucide-react';
import { MobileDrawer } from '../../MobileDrawer';
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
      title={activeLesson ? `Buat Tugas: ${activeLesson.title}` : 'Buat Tugas'}
    >
      <form onSubmit={handleCreateAssignment} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Tipe Tugas
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setNewTaskType('QUIZ_CBT')}
              className={`p-2.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                newTaskType === 'QUIZ_CBT'
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs ring-2 ring-amber-400/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5 text-amber-600" />
                <span>Kuis CBT</span>
              </div>
              <span className="text-[9.5px] text-amber-600 font-normal mt-0.5 block">
                Pilihan Ganda Acak
              </span>
            </button>

            <button
              type="button"
              onClick={() => setNewTaskType('VOICE_TASK')}
              className={`p-2.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                newTaskType === 'VOICE_TASK'
                  ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-purple-600" />
                <span>Suara</span>
              </div>
              <span className="text-[9.5px] text-purple-600 font-normal mt-0.5 block">
                Audio / Fonik
              </span>
            </button>

            <button
              type="button"
              onClick={() => setNewTaskType('PHOTO_HOMEWORK')}
              className={`p-2.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                newTaskType === 'PHOTO_HOMEWORK'
                  ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-sky-600" />
                <span>Foto PR</span>
              </div>
              <span className="text-[9.5px] text-sky-600 font-normal mt-0.5 block">
                Buku tugas / LKPD
              </span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            {newTaskType === 'QUIZ_CBT' ? 'Judul / Petunjuk Kuis *' : 'Instruksi Soal *'}
          </label>
          <textarea
            rows={2}
            required
            placeholder={
              newTaskType === 'QUIZ_CBT'
                ? 'Contoh: Pilihlah satu jawaban yang paling tepat dari soal-soal berikut ini!'
                : 'Contoh: Sebutkan 3 nama hewan mamalia yang ada di sekitarmu...'
            }
            value={newTaskPrompt}
            onChange={(e) => setNewTaskPrompt(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
          />
        </div>

        {/* Khusus Kuis CBT: Pengaturan Jumlah Soal Tampil & Bank Soal */}
        {newTaskType === 'QUIZ_CBT' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Soal Tampil Siswa *
                </label>
                <input
                  type="number"
                  min={1}
                  max={newQuizQuestions.length || 50}
                  value={newQuizQuestionCount}
                  onChange={(e) => setNewQuizQuestionCount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Diacak dari bank soal
                </span>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Batas KKM (0-100) *
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={newPassingScore}
                  onChange={(e) => setNewPassingScore(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Nilai kelulusan minimum
                </span>
              </div>
            </div>

            {/* Bank Soal List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Bank Soal ({newQuizQuestions.length} Soal)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setNewQuizQuestions((prev) => [
                      ...prev,
                      {
                        questionText: '',
                        optionA: '',
                        optionB: '',
                        optionC: '',
                        optionD: '',
                        correctAnswer: 'A',
                        explanation: '',
                      },
                    ])
                  }
                  className="h-7 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1 border border-amber-200 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Soal</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {newQuizQuestions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        Nomor {qIdx + 1}
                      </span>
                      {newQuizQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setNewQuizQuestions((prev) => prev.filter((_, i) => i !== qIdx))
                          }
                          className="text-[11px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer"
                        >
                          Hapus Soal
                        </button>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder={`Tulis pertanyaan soal #${qIdx + 1}...`}
                        value={q.questionText}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNewQuizQuestions((prev) =>
                            prev.map((item, i) => (i === qIdx ? { ...item, questionText: val } : item))
                          );
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    {/* Pilihan Jawaban A, B, C, D */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                        const optField = `option${letter}` as 'optionA' | 'optionB' | 'optionC' | 'optionD';
                        const isCorrect = q.correctAnswer === letter;
                        return (
                          <div key={letter} className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setNewQuizQuestions((prev) =>
                                  prev.map((item, i) =>
                                    i === qIdx ? { ...item, correctAnswer: letter } : item
                                  )
                                );
                              }}
                              title="Klik untuk jadikan kunci jawaban yang benar"
                              className={`w-6 h-6 rounded-lg font-black text-xs shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                                isCorrect
                                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {letter}
                            </button>
                            <input
                              type="text"
                              required
                              placeholder={`Pilihan ${letter}...`}
                              value={q[optField]}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNewQuizQuestions((prev) =>
                                  prev.map((item, i) =>
                                    i === qIdx ? { ...item, [optField]: val } : item
                                  )
                                );
                              }}
                              className={`flex-1 px-2.5 py-1.5 rounded-lg bg-white border text-xs text-slate-800 placeholder:text-slate-400 ${
                                isCorrect ? 'border-emerald-500 font-semibold' : 'border-slate-200'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      * Kunci jawaban saat ini:{' '}
                      <strong className="text-emerald-700">Pilihan {q.correctAnswer}</strong> (klik
                      tombol huruf untuk mengubah kunci).
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Terbitkan Tugas'}
        </button>
      </form>
    </MobileDrawer>
  );
}
