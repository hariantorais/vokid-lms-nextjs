'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Mic,
  Camera,
  Star,
  Sparkles,
  Volume2,
  CheckCircle2,
  Trophy,
  Play,
  FileText,
  Video,
  X,
  ChevronRight,
  Headphones,
  Check,
  Flame,
  Award,
  Compass,
  Smile,
  Lock,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { AudioPromptPlayer } from './AudioPromptPlayer';
import { VoiceSubmission } from './VoiceSubmission';
import { PhotoHomeworkSubmission } from './PhotoHomeworkSubmission';
import { VideoPlayer } from '@/features/common/components/VideoPlayer';
import type { StudentClassroomData, LessonWithAssignment } from '../services/student-service';

interface FaseAViewProps {
  classroomData: StudentClassroomData;
}

export function FaseAView({ classroomData }: FaseAViewProps) {
  const { classData, subjects } = classroomData;

  // Selected subject
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? '');
  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0];
  const activeModules = activeSubject?.modules ?? [];

  // Active Selected Module / Bab (Single Focused Bab)
  const [selectedModuleId, setSelectedModuleId] = useState(activeModules[0]?.id ?? '');
  const activeModule = activeModules.find((m) => m.id === selectedModuleId) ?? activeModules[0];
  const activeLessons = activeModule?.lessons ?? [];

  // Selected lesson to view in reader/modal sheet
  const [readingLesson, setReadingLesson] = useState<LessonWithAssignment | null>(null);
  // Active expanded assignment form
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Interaction states for submitted tasks
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

  // Progres di dalam Bab aktif saat ini
  let moduleTasksCount = 0;
  let moduleCompletedTasksCount = 0;

  activeLessons.forEach((les) => {
    moduleTasksCount += les.assignments.length;
    les.assignments.forEach((asg) => {
      if (submittedTasks[asg.id]) moduleCompletedTasksCount++;
    });
  });

  const moduleProgressPercent =
    moduleTasksCount > 0
      ? Math.round((moduleCompletedTasksCount / moduleTasksCount) * 100)
      : activeLessons.length > 0
      ? 50
      : 0;

  return (
    <div className="w-full space-y-4 select-none">
      {/* 1. GAMIFICATION HERO: Peta Misi Bab & XP Bar */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-4 sm:p-5 text-slate-950 shadow-md border-2 border-amber-300">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[10.5px] font-black text-slate-950 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-amber-800" />
            <span>Kelas {classData.grade_level} SD • Fase A</span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow-2xs border border-amber-300 text-xs font-black text-slate-900">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-400 animate-bounce" />
            <span>{moduleCompletedTasksCount * 50 + 100} XP</span>
          </div>
        </div>

        {/* Karakter & Progress Bab */}
        <div className="mt-3 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white/90 border-2 border-amber-200 flex items-center justify-center text-3xl shadow-sm shrink-0">
            🦁
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider truncate">
                {activeModule?.title ? `Bab: ${activeModule.title}` : activeSubject?.name}
              </span>
              <span className="text-xs font-black text-slate-950 shrink-0">
                {moduleCompletedTasksCount}/{moduleTasksCount} Misi
              </span>
            </div>

            {/* Gamified Health / Progress Bar */}
            <div className="mt-1.5 w-full h-3.5 bg-black/15 rounded-full p-0.5 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${Math.max(moduleProgressPercent, 12)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-amber-300/60 flex items-center justify-between text-[11px] font-bold text-slate-900/90">
          <span className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-900" />
            <span>Selesaikan semua materi & misi di bab ini!</span>
          </span>
          <span className="font-black text-xs">{moduleProgressPercent}%</span>
        </div>
      </section>

      {/* 2. PILIH MATA PELAJARAN (Tab Pulau Belajar) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pilih Pulau Mata Pelajaran</span>
          </h2>
          <span className="text-[10px] font-bold text-slate-400">
            {subjects.length} Pulau
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {subjects.map((subj, sIdx) => {
            const isSelected = subj.id === activeSubject?.id;
            const islandIcons = ['🏝️', '🚀', '🎨', '⛺', '🌈'];
            const icon = islandIcons[sIdx % islandIcons.length];

            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => {
                  setSelectedSubjectId(subj.id);
                  setSelectedModuleId(subj.modules[0]?.id ?? '');
                }}
                className={`min-h-[52px] px-3.5 py-2 rounded-2xl shrink-0 flex items-center gap-2.5 transition-all active:scale-95 text-left border-2 cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-white ring-3 ring-amber-300 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-amber-50/50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                    isSelected ? 'bg-amber-400 text-slate-950 shadow-2xs' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-black text-xs text-slate-900 line-clamp-1">
                    {subj.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400">{subj.modules.length} Bab</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. PILIH BAB / TINGKATAN POS DI DALAM MATA PELAJARAN (Focus Single Bab) */}
      {activeModules.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>Pilih Bab Pembelajaran</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-400">
              Geser bab ➔
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {activeModules.map((mod, mIdx) => {
              const isModActive = mod.id === activeModule?.id;

              // Hitung status selesai per bab
              let totalAsgInMod = 0;
              let doneAsgInMod = 0;
              mod.lessons.forEach((l) => {
                totalAsgInMod += l.assignments.length;
                l.assignments.forEach((a) => {
                  if (submittedTasks[a.id]) doneAsgInMod++;
                });
              });
              const isModDone = totalAsgInMod > 0 && doneAsgInMod === totalAsgInMod;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`min-h-[46px] px-3.5 py-1.5 rounded-2xl shrink-0 flex items-center gap-2 transition-all active:scale-95 text-left border-2 cursor-pointer ${
                    isModActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 ${
                      isModActive
                        ? 'bg-amber-400 text-slate-950'
                        : isModDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isModDone ? '✓' : mIdx + 1}
                  </span>

                  <span className="text-xs font-black whitespace-nowrap max-w-[160px] truncate">
                    {mod.title}
                  </span>

                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
                      isModActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {mod.lessons.length} Materi
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. LEARNING PATH POS MATERI DI DALAM BAB TERPILIH */}
      <section className="space-y-3">
        {!activeModule ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-2xs">
            <p className="text-sm font-bold text-slate-500">Belum ada bab aktif di mapel ini.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-4 sm:p-5 shadow-xs space-y-4 relative overflow-hidden">
            {/* Header Bab Aktif */}
            <div className="flex items-center gap-3 border-b border-amber-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs shrink-0 ring-2 ring-amber-200">
                #{activeModule.order_index}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  Bab {activeModule.order_index} • {activeLessons.length} Materi Belajar
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5 truncate">
                  {activeModule.title}
                </h3>
              </div>
            </div>

            {/* Jalur Vertikal Materi ke Materi di dalam 1 Bab */}
            {activeLessons.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl">
                <p className="text-xs font-bold text-slate-400">Belum ada materi di dalam bab ini.</p>
              </div>
            ) : (
              <div className="relative space-y-4 pl-3.5 before:absolute before:top-4 before:bottom-4 before:left-7 before:w-1 before:bg-gradient-to-b before:from-amber-300 before:via-orange-300 before:to-emerald-300 before:rounded-full">
                {activeLessons.map((lesson, lIdx) => {
                  const isText = lesson.content_type === 'TEXT';
                  const isAudio = lesson.content_type === 'AUDIO';
                  const isVideo = lesson.content_type === 'VIDEO';

                  // Cek apakah seluruh tugas di dalam materi ini sudah selesai
                  const hasTasks = lesson.assignments.length > 0;
                  const allTasksDone =
                    hasTasks &&
                    lesson.assignments.every((asg) => submittedTasks[asg.id]);

                  return (
                    <div key={lesson.id} className="relative flex items-start gap-3.5">
                      {/* Step Circle Node */}
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0 z-10 transition-transform ${
                          allTasksDone
                            ? 'bg-emerald-500 border-white text-white ring-2 ring-emerald-300 shadow-xs scale-105'
                            : 'bg-white border-amber-400 text-amber-900 ring-2 ring-amber-200 shadow-2xs'
                        }`}
                      >
                        {allTasksDone ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <span>{lIdx + 1}</span>
                        )}
                      </div>

                      {/* Card Materi */}
                      <div className="flex-1 bg-amber-50/35 hover:bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 space-y-3 transition-all shadow-2xs">
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                                isText
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : isAudio
                                  ? 'bg-amber-100 text-amber-700'
                                  : isVideo
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-sky-100 text-sky-700'
                              }`}
                            >
                              {isText ? (
                                <BookOpen className="w-4 h-4" />
                              ) : isAudio ? (
                                <Volume2 className="w-4 h-4" />
                              ) : isVideo ? (
                                <Video className="w-4 h-4" />
                              ) : (
                                <FileText className="w-4 h-4" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                                  isText
                                    ? 'bg-emerald-100 text-emerald-900'
                                    : isAudio
                                    ? 'bg-amber-100 text-amber-900'
                                    : isVideo
                                    ? 'bg-rose-100 text-rose-900'
                                    : 'bg-sky-100 text-sky-900'
                                }`}
                              >
                                {isText
                                  ? '📖 Cerita Teks'
                                  : isAudio
                                  ? '🎧 Suara Dongeng'
                                  : isVideo
                                  ? '🎬 Video YouTube'
                                  : '📄 Materi Gambar'}
                              </span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 leading-snug">
                                {lesson.title}
                              </h4>
                            </div>
                          </div>

                          {isText && (
                            <button
                              type="button"
                              onClick={() => setReadingLesson(lesson)}
                              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-transform shrink-0 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Baca</span>
                            </button>
                          )}
                        </div>

                        {/* Video Player YouTube di dalam materi */}
                        {isVideo && lesson.content_url && (
                          <div className="pt-1">
                            <VideoPlayer url={lesson.content_url} title={lesson.title} />
                          </div>
                        )}

                        {/* Preview Teks Bacaan */}
                        {isText && lesson.content_text && (
                          <div
                            onClick={() => setReadingLesson(lesson)}
                            className="p-3 rounded-xl bg-white border border-emerald-200/90 cursor-pointer active:scale-98 transition-all hover:border-emerald-400 group shadow-2xs"
                          >
                            <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-medium">
                              {lesson.content_text}
                            </p>
                            <div className="mt-2 flex items-center justify-between text-[10.5px] font-black text-emerald-700">
                              <span>Sentuh untuk membaca cerita penuh</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        )}

                        {/* TUGAS DI DALAM MATERI */}
                        {lesson.assignments.map((assignment) => {
                          const isTaskDone = submittedTasks[assignment.id];
                          const isExpanded = expandedTaskId === assignment.id;

                          return (
                            <div
                              key={assignment.id}
                              className={`p-3.5 rounded-2xl border-2 transition-all space-y-3 ${
                                isTaskDone
                                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                                  : 'bg-white border-amber-300 shadow-2xs'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                                  {assignment.type === 'VOICE_TASK' ? '🎤 Misi Suara' : '📷 Misi Foto PR'}
                                </span>

                                {isTaskDone ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Selesai! 🎉</span>
                                  </span>
                                ) : (
                                  <span className="text-[11px] font-black text-amber-700 flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    <span>+50 Bintang</span>
                                  </span>
                                )}
                              </div>

                              <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                {assignment.prompt}
                              </p>

                              {/* Audio Suara Guru */}
                              {assignment.instruction_audio_url && (
                                <AudioPromptPlayer
                                  audioUrl={assignment.instruction_audio_url}
                                  title="Dengarkan Suara Ibu Guru:"
                                />
                              )}

                              {/* Tombol Kerjakan Tugas */}
                              {isTaskDone ? (
                                <div className="p-2.5 bg-emerald-100/60 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-900">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <p className="font-extrabold text-xs">
                                    {assignment.grade !== null && assignment.grade !== undefined
                                      ? `Bintang Guru: ${assignment.grade} ⭐`
                                      : 'Hebat! Tugas sudah diterima guru.'}
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExpandedTaskId(isExpanded ? null : assignment.id)
                                    }
                                    className={`w-full min-h-[46px] rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs ${
                                      isExpanded
                                        ? 'bg-slate-100 text-slate-700'
                                        : 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 ring-2 ring-amber-300'
                                    }`}
                                  >
                                    {assignment.type === 'VOICE_TASK' ? (
                                      <Mic className="w-4 h-4" />
                                    ) : (
                                      <Camera className="w-4 h-4" />
                                    )}
                                    <span>
                                      {isExpanded
                                        ? 'Tutup Tugas'
                                        : assignment.type === 'VOICE_TASK'
                                        ? 'Mulai Rekam Suara 🎤'
                                        : 'Foto Buku PR 📸'}
                                    </span>
                                  </button>

                                  {isExpanded && (
                                    <div className="mt-3 pt-3 border-t border-amber-200 animate-in fade-in">
                                      {assignment.type === 'VOICE_TASK' ? (
                                        <VoiceSubmission
                                          assignmentId={assignment.id}
                                          onSuccess={() => {
                                            setSubmittedTasks((prev) => ({
                                              ...prev,
                                              [assignment.id]: true,
                                            }));
                                            setExpandedTaskId(null);
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
                                            setExpandedTaskId(null);
                                          }}
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. MODAL BACA BUKU CERITA */}
      {readingLesson && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4 animate-in fade-in"
        >
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom border-t sm:border border-slate-200">
            <div className="pt-3 pb-1 flex justify-center sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-slate-300" />
            </div>

            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg shadow-2xs">
                  📖
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                    Buku Dongeng Pembelajaran
                  </span>
                  <h3 className="text-base font-black text-slate-900 line-clamp-1">
                    {readingLesson.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReadingLesson(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800 flex-1">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bacalah dongeng ini bersama teman atau orang tua!</span>
              </div>

              <div className="text-base sm:text-lg font-medium leading-relaxed tracking-wide whitespace-pre-wrap text-slate-800 bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
                {readingLesson.content_text ?? 'Belum ada teks materi yang tersimpan.'}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white rounded-b-3xl shrink-0">
              <button
                type="button"
                onClick={() => setReadingLesson(null)}
                className="w-full min-h-[52px] rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-98 shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Hore, Saya Sudah Selesai Membaca! ⭐</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
