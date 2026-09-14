'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  Check,
  Lock,
  Play,
  ArrowLeft,
  ChevronRight,
  Target,
} from 'lucide-react';
import { MarkdownContent } from '@/components/common/MarkdownContent';
import { AudioPromptPlayer } from '@/features/student/components/lesson/AudioPromptPlayer';
import { VoiceSubmission } from '@/features/student/components/submissions/VoiceSubmission';
import { PhotoHomeworkSubmission } from '@/features/student/components/submissions/PhotoHomeworkSubmission';
import { QuizCbtModal } from '@/features/student/components/submissions/QuizCbtModal';
import { VideoPlayer } from '@/features/common/components/VideoPlayer';
import { cleanModuleTitle } from '@/lib/formatters';
import type { StudentClassroomData } from '../_services/student-classroom.service';
import type { LessonWithAssignment, StudentAssignment } from '@/features/student/types/learning-path';

interface FaseAViewProps {
  classroomData: StudentClassroomData;
}

export function FaseAView({ classroomData }: FaseAViewProps) {
  const { subjects } = classroomData;

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? '');
  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0];
  const activeModules = activeSubject?.modules ?? [];

  const [focusedLesson, setFocusedLesson] = useState<LessonWithAssignment | null>(null);
  const [notice, setNotice] = useState<{ type: 'locked' | 'success'; message: string } | null>(null);

  const [activeQuizModal, setActiveQuizModal] = useState<{
    id: string;
    title: string;
    score?: number | null;
  } | null>(null);

  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const subj of subjects) {
      for (const mod of subj.modules) {
        for (const les of mod.lessons) {
          for (const asg of les.assignments) {
            if (asg.hasSubmitted) {
              initial[asg.id] = true;
            }
          }
        }
      }
    }
    return initial;
  });

  const checkIsModuleCompleted = (mod: typeof activeModules[0]): boolean => {
    if (!mod || mod.lessons.length === 0) return false;

    let totalAsg = 0;
    let doneAsg = 0;
    mod.lessons.forEach((l: LessonWithAssignment) => {
      totalAsg += l.assignments.length;
      l.assignments.forEach((a: StudentAssignment) => {
        if (submittedTasks[a.id]) doneAsg++;
      });
    });

    return totalAsg > 0 ? doneAsg === totalAsg : mod.lessons.length > 0;
  };

  const isModuleUnlocked = (modIndex: number): boolean => {
    if (modIndex === 0) return true;
    const prevMod = activeModules[modIndex - 1];
    if (!prevMod) return false;
    return checkIsModuleCompleted(prevMod);
  };

  let totalSubmittedCount = 0;
  Object.values(submittedTasks).forEach((v) => {
    if (v) totalSubmittedCount++;
  });

  return (
    <div className="w-full space-y-3.5 select-none font-sans">
      {notice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-3.5 animate-in zoom-in-95">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${notice.type === 'success'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700 ring-4 ring-amber-50'
                }`}
            >
              {notice.type === 'success' ? '🎉' : '🔒'}
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-slate-900">
                {notice.type === 'success' ? 'Hebat Sekali! ⭐' : 'Ups, Masih Terkunci!'}
              </h4>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed px-1">
                {notice.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotice(null)}
              className={`w-full h-11 rounded-2xl font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer ${notice.type === 'success'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
            >
              {notice.type === 'success' ? 'Lanjutkan Belajar 🚀' : 'Mengerti, Siap Belajar! 👍'}
            </button>
          </div>
        </div>
      )}

      {/* VIEW A: JIKA SEDANG MEMBUKA 1 MATERI SECARA FOKUS */}
      {focusedLesson ? (
        <div className="space-y-3 animate-in fade-in">
          <button
            type="button"
            onClick={() => setFocusedLesson(null)}
            className="h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-black flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Pilihan Bab</span>
          </button>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {focusedLesson.content_type === 'VIDEO'
                  ? '🎬'
                  : focusedLesson.content_type === 'AUDIO'
                    ? '🎧'
                    : '📖'}
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {focusedLesson.content_type === 'VIDEO'
                    ? 'Video Belajar'
                    : focusedLesson.content_type === 'AUDIO'
                      ? 'Cerita Suara'
                      : 'Buku Cerita'}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug">
                  {focusedLesson.title}
                </h3>
              </div>
            </div>

            {focusedLesson.learning_objectives && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50/70 border border-teal-200/90 shadow-2xs">
                <div className="flex items-center gap-1.5 text-teal-800 font-black text-[11px] uppercase tracking-wider mb-1">
                  <Target className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>🎯 Target Belajar Kita:</span>
                </div>
                <MarkdownContent
                  content={focusedLesson.learning_objectives}
                  size="xs"
                  className="pl-5 !text-teal-950 font-bold"
                />
              </div>
            )}

            {focusedLesson.content_type === 'VIDEO' && focusedLesson.content_url && (
              <div className="pt-1">
                <VideoPlayer url={focusedLesson.content_url} title={focusedLesson.title} />
              </div>
            )}

            {focusedLesson.content_type === 'TEXT' && (
              <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-100">
                <MarkdownContent
                  content={focusedLesson.content_text ?? 'Belum ada teks bacaan.'}
                  size="sm"
                />
              </div>
            )}

            {focusedLesson.content_type === 'AUDIO' && focusedLesson.content_url && (
              <AudioPromptPlayer
                audioUrl={focusedLesson.content_url}
                title="Dengarkan Cerita Guru"
              />
            )}
          </div>

          {focusedLesson.assignments.map((assignment) => {
            const isTaskDone = submittedTasks[assignment.id];

            return (
              <div
                key={assignment.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm space-y-3 transition-all ${isTaskDone
                  ? 'border-emerald-300 bg-emerald-50/30'
                  : 'border-teal-200'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {assignment.type === 'QUIZ_CBT'
                        ? '📝'
                        : assignment.type === 'VOICE_TASK'
                          ? '🎤'
                          : '📷'}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {assignment.type === 'QUIZ_CBT'
                        ? 'Misi Kuis CBT'
                        : assignment.type === 'VOICE_TASK'
                          ? 'Misi Suara'
                          : 'Misi Foto PR'}
                    </h4>
                  </div>

                  {isTaskDone ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {assignment.score !== null && assignment.score !== undefined
                          ? `Nilai: ${assignment.score}/100`
                          : 'Selesai ✓'}
                      </span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>+50 Bintang</span>
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-slate-700 leading-snug">
                  {assignment.prompt}
                </p>

                {assignment.instruction_audio_url && (
                  <AudioPromptPlayer
                    audioUrl={assignment.instruction_audio_url}
                    title="Petunjuk Suara Guru"
                  />
                )}

                {isTaskDone ? (
                  <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-900 text-xs font-black flex items-center justify-between gap-2">
                    <span>
                      {assignment.type === 'QUIZ_CBT'
                        ? `Skor kuis kamu: ${assignment.score ?? 0}/100! 🎉`
                        : 'Misi ini sudah kamu selesaikan dengan hebat! 🎉'}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {assignment.type === 'QUIZ_CBT' && (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveQuizModal({
                              id: assignment.id,
                              title: assignment.prompt,
                              score: assignment.score ?? null,
                            })
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-black"
                        >
                          Ulangi Kuis
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setFocusedLesson(null)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black"
                      >
                        Lanjut ➔
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {assignment.type === 'QUIZ_CBT' ? (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveQuizModal({
                            id: assignment.id,
                            title: assignment.prompt,
                            score: assignment.score ?? null,
                          })
                        }
                        className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-98 text-white text-xs font-black flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Mulai Misi Kuis CBT ({assignment.quiz_question_count ?? 5} Soal Acak)</span>
                      </button>
                    ) : assignment.type === 'VOICE_TASK' ? (
                      <VoiceSubmission
                        assignmentId={assignment.id}
                        onSuccess={() => {
                          setSubmittedTasks((prev) => ({
                            ...prev,
                            [assignment.id]: true,
                          }));
                          setNotice({
                            type: 'success',
                            message: 'Hore! Tugas berhasil dikirim! +50 Bintang ⭐',
                          });
                        }}
                      />
                    ) : (
                      <PhotoHomeworkSubmission
                        assignmentId={assignment.id}
                        onSuccess={() => {
                          setSubmittedTasks((prev) => ({
                            ...prev,
                            [assignment.id]: true,
                          }));
                          setNotice({
                            type: 'success',
                            message: 'Hore! Foto PR berhasil dikirim! +50 Bintang ⭐',
                          });
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW B: DAFTAR BAB */
        <div className="space-y-3.5">
          <section className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-2xl shrink-0">
                🦁
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 mb-1">
                  <span className="truncate">{activeSubject?.name ?? 'Belajar'}</span>
                  <span className="text-teal-700 font-extrabold text-[11px] shrink-0">
                    {totalSubmittedCount} Misi Selesai
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(15, totalSubmittedCount * 25))}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-900 text-xs font-black shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{totalSubmittedCount * 50 + 100}</span>
            </div>
          </section>

          {/* Navigasi Mata Pelajaran */}
          <section className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {subjects.map((subj, sIdx) => {
              const isSelected = subj.id === activeSubject?.id;
              const icons = ['📖', '🚀', '🎨', '⛺', '🌈'];
              const icon = icons[sIdx % icons.length];

              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    setNotice(null);
                  }}
                  className={`h-10 px-3 rounded-xl shrink-0 flex items-center gap-2 text-xs font-black transition-all active:scale-95 cursor-pointer border ${isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <span className="text-sm">{icon}</span>
                  <span className="truncate max-w-[120px]">{subj.name}</span>
                </button>
              );
            })}
          </section>

          {/* Daftar Bab */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚩</span>
                <span>Pos Ekspedisi Bab ({activeModules.length})</span>
              </h3>
              <span className="text-[11px] font-bold text-teal-700">
                Jelajahi Bertahap
              </span>
            </div>

            {activeModules.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200">
                <p className="text-xs sm:text-sm font-bold text-slate-400">Belum ada bab aktif di mata pelajaran ini.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {activeModules.map((mod, mIdx) => {
                  const isUnlocked = isModuleUnlocked(mIdx);
                  const isCompleted = checkIsModuleCompleted(mod);

                  return (
                    <div key={mod.id} className="transition-all">
                      {isUnlocked ? (
                        <Link
                          href={`/siswa/bab/${mod.id}`}
                          className={`w-full p-4 rounded-3xl border-2 border-b-6 active:border-b-2 active:translate-y-1 flex items-center justify-between gap-3.5 text-left transition-all cursor-pointer shadow-xs hover:shadow-md group ${isCompleted
                            ? 'bg-emerald-50/20 border-emerald-300 hover:border-emerald-400'
                            : 'bg-white border-slate-200/90 hover:border-teal-400'
                            }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border-2 border-b-4 transition-all shadow-xs ${isCompleted
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
                                : 'bg-teal-500 text-white border-teal-600 shadow-teal-200 group-hover:scale-105'
                                }`}
                            >
                              {isCompleted ? (
                                <Check className="w-5 h-5 stroke-[3.5]" />
                              ) : (
                                <span>{mIdx + 1}</span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1 py-0.5">
                              <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                                Bab {mod.order_index}
                              </span>
                              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug break-words group-hover:text-teal-600 transition-colors mt-1">
                                {cleanModuleTitle(mod.title)}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-center">
                            <span className="text-[10.5px] font-bold text-slate-500 whitespace-nowrap">
                              {mod.lessons.length} Pos
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border-2 border-teal-200 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                              <ChevronRight className="w-4 h-4 stroke-[2.8]" />
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setNotice({
                              type: 'locked',
                              message: `Bab ${mIdx + 1} masih terkunci! Selesaikan Bab ${mIdx} dulu ya 🔒`,
                            });
                          }}
                          className="w-full p-4 rounded-3xl border-2 border-b-4 border-slate-200 flex items-center justify-between gap-3.5 text-left bg-slate-50/80 opacity-70 cursor-not-allowed"
                        >
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className="w-12 h-12 rounded-2xl bg-slate-200 border-2 border-b-4 border-slate-300 text-slate-400 flex items-center justify-center font-black text-sm shrink-0">
                              <Lock className="w-5 h-5 text-slate-400" />
                            </div>

                            <div className="min-w-0 flex-1 py-0.5">
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                Bab {mod.order_index}
                              </span>
                              <h4 className="text-xs sm:text-sm font-black text-slate-500 leading-snug break-words mt-1">
                                {cleanModuleTitle(mod.title)}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-center">
                            <span className="text-[10.5px] font-bold text-slate-400 whitespace-nowrap">
                              Terkunci
                            </span>
                            <Lock className="w-4 h-4 text-slate-400" />
                          </div>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {activeQuizModal && (
        <QuizCbtModal
          isOpen={Boolean(activeQuizModal)}
          assignmentId={activeQuizModal.id}
          assignmentTitle={activeQuizModal.title}
          initialScore={activeQuizModal.score}
          onClose={() => setActiveQuizModal(null)}
          onSuccess={() => {
            setSubmittedTasks((prev) => ({ ...prev, [activeQuizModal.id]: true }));
          }}
        />
      )}
    </div>
  );
}