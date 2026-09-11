'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Mic,
  Camera,
  Star,
  CheckCircle2,
  Video,
  X,
  ChevronRight,
  Check,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { AudioPromptPlayer } from './AudioPromptPlayer';
import { VoiceSubmission } from './VoiceSubmission';
import { PhotoHomeworkSubmission } from './PhotoHomeworkSubmission';
import { VideoPlayer } from '@/features/common/components/VideoPlayer';
import type { LessonWithAssignment, StudentClassroomData } from '../services/student-service';

interface StudentModuleLessonListProps {
  classId: string;
  subject: StudentClassroomData['subjects'][0];
  module: StudentClassroomData['subjects'][0]['modules'][0];
}

export function StudentModuleLessonList({
  classId,
  subject,
  module,
}: StudentModuleLessonListProps) {
  const lessons = module.lessons ?? [];

  // Active focused lesson (if tapping a lesson)
  const [focusedLesson, setFocusedLesson] = useState<LessonWithAssignment | null>(null);

  // Pop-up modal notice
  const [notice, setNotice] = useState<{ type: 'locked' | 'success'; message: string } | null>(null);

  // Submission tracking
  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const les of lessons) {
      for (const asg of les.assignments) {
        if (asg.hasSubmitted) {
          initial[asg.id] = true;
        }
      }
    }
    return initial;
  });

  // Helper sequential lock rule for lessons
  const isLessonUnlocked = (lIdx: number): boolean => {
    if (lIdx === 0) return true;
    const prevLesson = lessons[lIdx - 1];
    if (!prevLesson) return true;
    if (prevLesson.assignments.length === 0) return true;
    return prevLesson.assignments.every((asg) => submittedTasks[asg.id]);
  };

  // Progress count
  let totalTasks = 0;
  let doneTasks = 0;
  lessons.forEach((l) => {
    totalTasks += l.assignments.length;
    l.assignments.forEach((a) => {
      if (submittedTasks[a.id]) doneTasks++;
    });
  });

  return (
    <div className="w-full space-y-3.5 select-none font-sans">
      {/* Pop-up Modal Terkunci / Sukses */}
      {notice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-3.5 animate-in zoom-in-95">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                notice.type === 'success'
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
              className={`w-full h-11 rounded-2xl font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer ${
                notice.type === 'success'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {notice.type === 'success' ? 'Lanjutkan Belajar 🚀' : 'Mengerti, Siap Belajar! 👍'}
            </button>
          </div>
        </div>
      )}

      {/* JIKA SEDANG MEMBUKA 1 MATERI SECARA FOKUS */}
      {focusedLesson ? (
        <div className="space-y-3 animate-in fade-in">
          {/* Tombol Kembali ke Daftar Materi Bab Ini */}
          <button
            type="button"
            onClick={() => setFocusedLesson(null)}
            className="h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-black flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Kembali ke Daftar Materi</span>
          </button>

          {/* Kartu Konten Utama Materi */}
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
                <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug break-words">
                  {focusedLesson.title}
                </h3>
              </div>
            </div>

            {/* Video YouTube Embed Langsung */}
            {focusedLesson.content_type === 'VIDEO' && focusedLesson.content_url && (
              <div className="pt-1">
                <VideoPlayer url={focusedLesson.content_url} title={focusedLesson.title} />
              </div>
            )}

            {/* Dongeng Teks */}
            {focusedLesson.content_type === 'TEXT' && (
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                {focusedLesson.content_text ?? 'Belum ada teks bacaan.'}
              </div>
            )}

            {/* Audio Cerita Guru */}
            {focusedLesson.content_type === 'AUDIO' && focusedLesson.content_url && (
              <AudioPromptPlayer
                audioUrl={focusedLesson.content_url}
                title="Dengarkan Cerita Guru"
              />
            )}
          </div>

          {/* Misi / Penugasan Terkait Materi Ini */}
          {focusedLesson.assignments.map((assignment) => {
            const isTaskDone = submittedTasks[assignment.id];

            return (
              <div
                key={assignment.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm space-y-3 transition-all ${
                  isTaskDone
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-teal-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {assignment.type === 'VOICE_TASK' ? '🎤' : '📷'}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {assignment.type === 'VOICE_TASK' ? 'Misi Suara' : 'Misi Foto PR'}
                    </h4>
                  </div>

                  {isTaskDone ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selesai ✓</span>
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
                  <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-900 text-xs font-black flex items-center justify-between">
                    <span>Misi ini sudah kamu selesaikan dengan hebat! 🎉</span>
                    <button
                      type="button"
                      onClick={() => setFocusedLesson(null)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-black"
                    >
                      Lanjut ➔
                    </button>
                  </div>
                ) : (
                  <div>
                    {assignment.type === 'VOICE_TASK' ? (
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
        /* DAFTAR MATERI DALAM BAB INI */
        <div className="space-y-4">
          {/* Card Progres Belajar Bab ala Ruangguru Dafa & Lulu */}
          <section className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100/80 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-xs shrink-0">
                  🎯
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs font-black text-slate-800 tracking-tight truncate">
                    Progres Misi Bab Ini
                  </h2>
                  <p className="text-[10px] font-semibold text-slate-400 truncate">
                    Selesaikan semua misi untuk bintang penuh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {doneTasks}/{totalTasks} Selesai
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    totalTasks > 0
                      ? Math.round((doneTasks / totalTasks) * 100)
                      : lessons.length > 0
                      ? 35
                      : 0
                  }%`,
                }}
              />
            </div>
          </section>

          {/* List Materi Belajar Timeline Langsung (Tanpa Card di dalam Card) */}
          <section className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">
                Alur Materi ({lessons.length})
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">
                Selesaikan bertahap
              </span>
            </div>

            {lessons.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-xl mb-2">
                  📚
                </div>
                <p className="text-xs font-black text-slate-600">Belum ada materi di bab ini</p>
                <p className="text-[10.5px] text-slate-400 mt-0.5">Guru sedang menyiapkan materi seru untukmu!</p>
              </div>
            ) : (
              <div className="relative space-y-0">
                {lessons.map((lesson, lIdx) => {
                  const isUnlocked = isLessonUnlocked(lIdx);
                  const hasTasks = lesson.assignments.length > 0;
                  const totalLessonTasks = lesson.assignments.length;
                  const doneLessonTasks = lesson.assignments.filter((asg) => submittedTasks[asg.id]).length;
                  const isDone = hasTasks && doneLessonTasks === totalLessonTasks;
                  const isLast = lIdx === lessons.length - 1;

                  return (
                    <div key={lesson.id} className="relative flex items-center gap-3 group mb-3">
                      {/* Timeline Stem & Node Kolom Kiri (Pusat Vertikal di Tengah Kartu) */}
                      <div className="relative flex items-center justify-center shrink-0 w-8 self-stretch">
                        {/* Garis Atas (jika bukan materi pertama) */}
                        {lIdx > 0 && (
                          <div className="absolute top-0 bottom-1/2 w-0.5 bg-slate-200 -z-0" />
                        )}

                        {/* Garis Bawah (jika bukan materi terakhir) */}
                        {!isLast && (
                          <div
                            className={`absolute top-1/2 bottom-0 w-0.5 -z-0 transition-colors ${
                              isDone ? 'bg-emerald-200' : 'bg-slate-200'
                            }`}
                          />
                        )}

                        {/* Node Lingkaran Nomor (Posisi Presisi di Tengah Kartu) */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all z-10 ${
                            !isUnlocked
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 ring-4 ring-slate-100/80'
                              : isDone
                              ? 'bg-emerald-500 text-white shadow-xs ring-4 ring-emerald-50'
                              : 'bg-teal-600 text-white shadow-xs ring-4 ring-teal-50'
                          }`}
                        >
                          {!isUnlocked ? (
                            <Lock className="w-3 h-3 text-slate-400" />
                          ) : isDone ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <span>{lIdx + 1}</span>
                          )}
                        </div>
                      </div>

                      {/* Kartu Konten Materi di Kolom Kanan */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!isUnlocked) {
                            setNotice({
                              type: 'locked',
                              message: 'Selesaikan materi sebelumnya terlebih dahulu ya! 🔒',
                            });
                            return;
                          }
                          setFocusedLesson(lesson);
                        }}
                        className={`flex-1 p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          !isUnlocked
                            ? 'bg-slate-50/70 border-slate-200/70 text-slate-400 opacity-60 cursor-not-allowed'
                            : isDone
                            ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
                            : 'bg-white border-slate-200/90 hover:border-teal-400 hover:shadow-xs active:scale-98'
                        }`}
                      >
                        <div className="min-w-0 flex-1 py-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                              {lesson.content_type === 'VIDEO'
                                ? '🎬 Video'
                                : lesson.content_type === 'AUDIO'
                                ? '🎧 Cerita Suara'
                                : '📖 Bacaan'}
                            </span>
                            {hasTasks && (
                              <span className="text-[10.5px] font-semibold text-slate-400">
                                • {doneLessonTasks}/{totalLessonTasks} misi
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug break-words mt-1">
                            {lesson.title}
                          </h4>
                        </div>

                        {/* Sisi Kanan: Icon Centang (Hijau jika selesai, Muted jika belum) */}
                        <div className="flex items-center shrink-0 self-center">
                          {hasTasks && (
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                isDone
                                  ? 'bg-emerald-500 text-white shadow-2xs ring-2 ring-emerald-100'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}
                              title={isDone ? 'Misi selesai' : 'Misi belum selesai'}
                            >
                              <Check
                                className={`w-3 h-3 ${
                                  isDone ? 'stroke-[3]' : 'stroke-[2.5] text-slate-400'
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
