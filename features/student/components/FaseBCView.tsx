'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Video,
  Camera,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  UploadCloud,
  Check,
  X,
  Volume2,
  Sparkles,
  Layers,
  ListChecks,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react';
import { VoiceSubmission } from './VoiceSubmission';
import { PhotoHomeworkSubmission } from './PhotoHomeworkSubmission';
import { QuizCbtModal } from './QuizCbtModal';
import { VideoPlayer } from '@/features/common/components/VideoPlayer';
import { cleanModuleTitle } from '@/lib/formatters';
import type { StudentClassroomData, LessonWithAssignment } from '../services/student-service';
import { getMediaProxyUrl } from '@/features/shared/services/storage-service';

interface FaseBCViewProps {
  classroomData: StudentClassroomData;
}

export function FaseBCView({ classroomData }: FaseBCViewProps) {
  const { classData, subjects } = classroomData;
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [activeQuizModal, setActiveQuizModal] = useState<{
    id: string;
    title: string;
    score?: number | null;
  } | null>(null);

  // Selected subject & selected module state
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? '');
  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0];
  const activeModules = activeSubject?.modules ?? [];

  const [selectedModuleId, setSelectedModuleId] = useState(activeModules[0]?.id ?? '');
  const activeModule = activeModules.find((m) => m.id === selectedModuleId) ?? activeModules[0];
  const activeLessons = activeModule?.lessons ?? [];

  // Mobile Native Reading Sheet state
  const [readingLesson, setReadingLesson] = useState<LessonWithAssignment | null>(null);

  // Submission status toggle dihidrasi langsung dari server data
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

  return (
    <div className="w-full space-y-4">
      {/* 1. Mobile Navigation: Subjects and Modules */}
      <aside className="space-y-3">
        {/* Class Info Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-sky-100 text-sky-900">
              Kelas {classData.grade_level} SD • Fase {classData.grade_level <= 4 ? 'B' : 'C'}
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              {classData.academic_year}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 leading-tight">
            {classData.name}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Kurikulum Merdeka SD</p>
        </div>

        {/* Subjects Selector: Horizontal on Mobile, Vertical on Desktop */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
              Mata Pelajaran
            </h3>
            <span className="text-[10px] font-bold text-slate-400 lg:hidden">
              Geser ➔
            </span>
          </div>

          {/* Horizontal scrollable on mobile */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {subjects.map((subj) => {
              const isSelected = subj.id === activeSubject?.id;
              return (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubjectId(subj.id);
                    setSelectedModuleId(subj.modules[0]?.id ?? '');
                  }}
                  className={`min-h-[48px] lg:w-full shrink-0 flex items-center justify-between p-3 rounded-2xl text-left font-bold text-xs transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs font-black'
                      : 'bg-slate-50 lg:bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-200/60 lg:border-none'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap lg:whitespace-normal">{subj.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-slate-200 text-slate-600 font-semibold'
                    }`}
                  >
                    {subj.modules.length} Bab
                  </span>
                </button>
              );
            })}
          </div>

          {/* Module Selector: Horizontal pills on Mobile, vertical on Desktop */}
          {activeModules.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">
                Daftar Modul
              </h4>
              <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                {activeModules.map((mod) => {
                  const isModSelected = mod.id === activeModule?.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setSelectedModuleId(mod.id)}
                      className={`min-h-[42px] shrink-0 lg:w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all active:scale-95 cursor-pointer ${
                        isModSelected
                          ? 'bg-slate-900 text-white font-black shadow-xs'
                          : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200 font-medium'
                      }`}
                    >
                      <span className="whitespace-nowrap lg:truncate max-w-[200px]">
                        {mod.order_index}. {cleanModuleTitle(mod.title)}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1.5 hidden lg:block opacity-60" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* 2. Main Content Area (Mobile Native Feed) */}
      <section className="lg:col-span-3 space-y-5">
        {activeModule ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 lg:p-8 shadow-xs space-y-5">
            {/* Active Module Header */}
            <div className="border-b border-slate-100 pb-3 sm:pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-100 text-sky-800">
                  {activeSubject?.name}
                </span>
                <span className="text-xs text-slate-400">• Bab {activeModule.order_index}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 leading-tight">
                {cleanModuleTitle(activeModule.title)}
              </h1>
            </div>

            {/* List of Lessons */}
            <div className="space-y-4">
              {activeLessons.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl">
                  <p className="text-sm font-semibold text-slate-500">Belum ada materi pada modul ini.</p>
                </div>
              ) : (
                activeLessons.map((lesson) => {
                  const isText = lesson.content_type === 'TEXT';
                  const isPdf = lesson.content_type === 'PDF';
                  const isVideo = lesson.content_type === 'VIDEO';
                  const isAudio = lesson.content_type === 'AUDIO';

                  return (
                    <div
                      key={lesson.id}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-4"
                    >
                      {/* Top Lesson Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs mt-0.5 ${
                              isText
                                ? 'bg-emerald-100 text-emerald-700'
                                : isPdf
                                ? 'bg-sky-100 text-sky-700'
                                : isVideo
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {isText ? (
                              <BookOpen className="w-5 h-5" />
                            ) : isPdf ? (
                              <FileText className="w-5 h-5" />
                            ) : isVideo ? (
                              <Video className="w-5 h-5" />
                            ) : (
                              <Volume2 className="w-5 h-5" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                isText
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : isPdf
                                  ? 'bg-sky-100 text-sky-900'
                                  : isVideo
                                  ? 'bg-rose-100 text-rose-900'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              Materi {lesson.content_type}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                              {lesson.title}
                            </h3>
                          </div>
                        </div>

                        {/* Action: Open Reader Sheet or External URL */}
                        {isText ? (
                          <button
                            type="button"
                            onClick={() => setReadingLesson(lesson)}
                            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer shrink-0"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Baca</span>
                          </button>
                        ) : lesson.content_url ? (
                          <a
                            href={getMediaProxyUrl(lesson.content_url)}
                            target="_blank"
                            rel="noreferrer"
                            className="min-h-[44px] px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                          >
                            <span>Buka</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
                      </div>

                      {/* Inline Video Player jika Tipe Video (YouTube iframe / video) */}
                      {isVideo && lesson.content_url && (
                        <div className="pt-1">
                          <VideoPlayer url={lesson.content_url} title={lesson.title} />
                        </div>
                      )}

                      {/* Preview Singkat Teks Bacaan */}
                      {isText && lesson.content_text && (
                        <div
                          onClick={() => setReadingLesson(lesson)}
                          className="p-3.5 rounded-xl bg-white border border-emerald-200/80 cursor-pointer active:scale-98 transition-all hover:border-emerald-400 group"
                        >
                          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-medium">
                            {lesson.content_text}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[11px] font-black text-emerald-700">
                            <span>Sentuh untuk membaca materi penuh</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      )}

                      {/* Active Assignments */}
                      {lesson.assignments.map((asg) => {
                        const isDone = submittedTasks[asg.id];
                        return (
                          <div
                            key={asg.id}
                            className="mt-3 p-4 sm:p-5 rounded-2xl bg-white border border-sky-200 shadow-2xs space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                                  asg.type === 'QUIZ_CBT'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                    : asg.type === 'PHOTO_HOMEWORK'
                                    ? 'bg-sky-100 text-sky-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {asg.type === 'QUIZ_CBT'
                                  ? '📝 Kuis CBT Pilihan Ganda'
                                  : asg.type === 'PHOTO_HOMEWORK'
                                  ? '📷 Tugas Foto PR'
                                  : '🎤 Tugas Suara'}
                              </span>

                              {/* Status Badge / Score */}
                              {isDone ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>
                                    {asg.score !== null && asg.score !== undefined
                                      ? `Nilai: ${asg.score}/100`
                                      : 'Sudah Selesai'}
                                  </span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800">
                                  <Clock className="w-3 h-3" />
                                  <span>Belum Selesai</span>
                                </span>
                              )}
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-slate-900 leading-snug">{asg.prompt}</h4>
                              {asg.due_date && (
                                <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Tenggat: {new Date(asg.due_date).toLocaleDateString('id-ID')}</span>
                                </p>
                              )}
                            </div>

                            {/* Action Button & Interactive Submission */}
                            <div className="pt-2 border-t border-slate-100 space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] text-slate-500 leading-tight">
                                  {asg.type === 'QUIZ_CBT'
                                    ? isDone
                                      ? `Nilai terkoreksi: ${asg.score ?? 0}/100. Bisa diulang dengan soal acak baru.`
                                      : `${asg.quiz_question_count ?? 5} soal pilihan ganda acak dari bank soal.`
                                    : isDone
                                    ? 'Jawaban Anda telah tersimpan.'
                                    : asg.type === 'PHOTO_HOMEWORK'
                                    ? 'Kirim foto buku tulis tugasmu.'
                                    : 'Rekam suaramu untuk Ibu Guru.'}
                                </span>

                                {asg.type === 'QUIZ_CBT' ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setActiveQuizModal({
                                        id: asg.id,
                                        title: asg.prompt,
                                        score: asg.score ?? null,
                                      })
                                    }
                                    className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0 ${
                                      isDone
                                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                                    }`}
                                  >
                                    {isDone ? (
                                      <>
                                        <RotateCcw className="w-4 h-4 text-amber-700" />
                                        <span>Ulangi Kuis</span>
                                      </>
                                    ) : (
                                      <>
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Mulai Kuis</span>
                                      </>
                                    )}
                                  </button>
                                ) : (
                                  !isDone && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedTaskId(expandedTaskId === asg.id ? null : asg.id)
                                      }
                                      className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer shrink-0"
                                    >
                                      {asg.type === 'PHOTO_HOMEWORK' ? (
                                        <Camera className="w-4 h-4" />
                                      ) : (
                                        <UploadCloud className="w-4 h-4" />
                                      )}
                                      <span>{expandedTaskId === asg.id ? 'Tutup' : 'Kirim Tugas'}</span>
                                    </button>
                                  )
                                )}
                              </div>

                              {expandedTaskId === asg.id && !isDone && asg.type !== 'QUIZ_CBT' && (
                                <div className="mt-3">
                                  {asg.type === 'PHOTO_HOMEWORK' ? (
                                    <PhotoHomeworkSubmission
                                      assignmentId={asg.id}
                                      onSuccess={() => {
                                        setSubmittedTasks((prev) => ({ ...prev, [asg.id]: true }));
                                        setExpandedTaskId(null);
                                      }}
                                    />
                                  ) : (
                                    <VoiceSubmission
                                      assignmentId={asg.id}
                                      onSuccess={() => {
                                        setSubmittedTasks((prev) => ({ ...prev, [asg.id]: true }));
                                        setExpandedTaskId(null);
                                      }}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-sm font-bold text-slate-500">Pilih modul di atas untuk melihat materi.</p>
          </div>
        )}
      </section>

      {/* 3. Mobile Native Reader Sheet for Fase B/C */}
      {readingLesson && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4 animate-in fade-in"
        >
          <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] animate-in slide-in-from-bottom border-t sm:border border-slate-200">
            {/* Grab Bar */}
            <div className="pt-3 pb-1 flex justify-center sm:hidden">
              <div className="w-12 h-1.5 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                  📖
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                    Bahan Bacaan Siswa
                  </span>
                  <h3 className="text-base font-black text-slate-900 line-clamp-1">
                    {readingLesson.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReadingLesson(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Reader */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800 flex-1">
              {readingLesson.learning_objectives && (
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80 text-xs">
                  <div className="flex items-center gap-1.5 text-sky-800 font-extrabold text-[11px] uppercase tracking-wider mb-1">
                    <Target className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>🎯 Target Belajar:</span>
                  </div>
                  <p className="text-slate-700 font-semibold leading-relaxed pl-5 whitespace-pre-wrap">
                    {readingLesson.learning_objectives}
                  </p>
                </div>
              )}
              <div className="text-sm sm:text-base font-normal leading-relaxed whitespace-pre-wrap text-slate-800 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                {readingLesson.content_text ?? 'Belum ada isi materi bacaan.'}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-4 border-t border-slate-100 bg-white rounded-b-3xl shrink-0">
              <button
                type="button"
                onClick={() => setReadingLesson(null)}
                className="w-full min-h-[48px] rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 active:scale-98 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Selesai Membaca</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Interactive Quiz CBT Modal for Fase B/C */}
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

