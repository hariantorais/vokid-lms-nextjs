'use client';

import React, { useState, useTransition } from 'react';
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
  Target,
  Play,
} from 'lucide-react';
import { toast } from 'sonner';
import { AudioPromptPlayer } from './AudioPromptPlayer';
import { VoiceSubmission } from './VoiceSubmission';
import { PhotoHomeworkSubmission } from './PhotoHomeworkSubmission';
import { QuizCbtModal } from './QuizCbtModal';
import { VideoPlayer } from '@/features/common/components/VideoPlayer';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import { cleanModuleTitle } from '@/lib/formatters';
import { UnifiedLessonContentCard } from './UnifiedLessonContentCard';
import { markLessonAsStudiedAction } from '../_actions/lesson-learning.actions';
import type { StudentBabDetailData, LessonWithAssignment, StudentAssignment } from '../_services/student-bab.service';

interface StudentBabDetailClientProps {
  data: StudentBabDetailData;
  classId?: string;
}

export function StudentBabDetailClient({ data, classId }: StudentBabDetailClientProps) {
  const { module, nextModule } = data;
  const lessons = module.lessons ?? [];

  // Active focused lesson (if currently playing/learning)
  const [focusedLesson, setFocusedLesson] = useState<LessonWithAssignment | null>(null);

  // Preview lesson modal (saat node path diklik ala Duolingo popup)
  const [previewLesson, setPreviewLesson] = useState<{
    lesson: LessonWithAssignment;
    lIdx: number;
  } | null>(null);

  // State materi yang sudah dipelajari siswa
  const [studiedLessons, setStudiedLessons] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const les of lessons) {
      if (les.isStudied) {
        initial[les.id] = true;
      }
    }
    return initial;
  });

  const [isStudyingPending, startStudyingTransition] = useTransition();

  const handleMarkAsStudied = (lessonId: string) => {
    startStudyingTransition(async () => {
      const res = await markLessonAsStudiedAction(lessonId);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setStudiedLessons((prev) => ({ ...prev, [lessonId]: true }));
      toast.success('Hebat! Misi tugas sekarang terbuka untuk dikerjakan 🎉');
    });
  };

  // Pop-up modal notice
  const [notice, setNotice] = useState<{ type: 'locked' | 'success'; message: string } | null>(null);

  // Modal CBT Quiz state
  const [activeQuizModal, setActiveQuizModal] = useState<{
    id: string;
    title: string;
    score?: number | null;
  } | null>(null);

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

  // Task scores tracking (untuk menghitung bintang 1-3)
  const [taskScores, setTaskScores] = useState<Record<string, number | null>>(() => {
    const initial: Record<string, number | null> = {};
    for (const les of lessons) {
      for (const asg of les.assignments) {
        if (asg.score !== undefined && asg.score !== null) {
          initial[asg.id] = asg.score;
        } else if (asg.grade !== undefined && asg.grade !== null) {
          initial[asg.id] = asg.grade;
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
    return prevLesson.assignments.every((asg: StudentAssignment) => submittedTasks[asg.id]);
  };

  // Helper: Menghitung rating bintang (1 - 3) untuk sebuah materi/pos
  const getLessonStarsCount = (lesson: LessonWithAssignment): number => {
    const totalAsg = lesson.assignments.length;
    if (totalAsg === 0) return 3;

    const isAllSubmitted = lesson.assignments.every((a) => submittedTasks[a.id]);
    if (!isAllSubmitted) return 0;

    let totalScore = 0;
    let scoredCount = 0;

    for (const asg of lesson.assignments) {
      const score = taskScores[asg.id];
      if (score !== undefined && score !== null) {
        totalScore += score;
        scoredCount++;
      } else {
        totalScore += 80;
        scoredCount++;
      }
    }

    const avgScore = scoredCount > 0 ? totalScore / scoredCount : 100;
    if (avgScore >= 85) return 3;
    if (avgScore >= 60) return 2;
    return 1;
  };

  // Progress count
  let totalTasks = 0;
  let doneTasks = 0;
  lessons.forEach((l: LessonWithAssignment) => {
    totalTasks += l.assignments.length;
    l.assignments.forEach((a: StudentAssignment) => {
      if (submittedTasks[a.id]) doneTasks++;
    });
  });

  // Helper: Evaluasi ketuntasan bab saat ini
  // Bab dinyatakan tuntas jika:
  // 1. Semua pos materi telah dipelajari
  // 2. Semua penugasan telah dikumpulkan
  const isAllLessonsStudied = lessons.length > 0 && lessons.every((l) => studiedLessons[l.id]);
  const isAllTasksSubmitted = totalTasks === 0 || doneTasks === totalTasks;
  const isChapterFullyCompleted = isAllLessonsStudied && isAllTasksSubmitted;

  // State akumulasi bintang siswa
  const initialBaseStars = data.totalStars ?? 0;
  const [bonusStars, setBonusStars] = useState<number>(0);
  const currentTotalStars = initialBaseStars + bonusStars;

  return (
    <StudentLayoutShell
      title={cleanModuleTitle(module.title)}
      subtitle={module.subject?.name ?? 'Pelajaran'}
      badgeText={`Bab ${module.order_index}`}
      backHref={classId ? `/siswa/kelas/${classId}` : '/siswa'}
      activeNavTab="MATERI"
      showBottomNav={true}
      maxWidth="sm"
      transparentHeader={true}
      starsCount={currentTotalStars}
      userAvatarUrl={data.userAvatarUrl}
    >
      <div className="w-full space-y-4 select-none font-sans">
        {/* Pop-up Modal Terkunci / Sukses */}
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

        {/* Pop-up Dialog Info Materi Ala Duolingo (Saat Node Jalur Diklik) */}
        {previewLesson && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border-2 border-slate-200 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 relative">
              {/* Tombol Tutup */}
              <button
                type="button"
                onClick={() => setPreviewLesson(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Icon Besar Node Materi */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-teal-400 via-teal-500 to-cyan-500 border-3 border-b-6 border-teal-700 flex items-center justify-center text-4xl shadow-md text-white">
                🌟
              </div>

              <div className="space-y-1.5 w-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                  <span>Tahap {previewLesson.lIdx + 1}</span>
                  <span>•</span>
                  <span>Pos Belajar Terpadu</span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug px-2">
                  {previewLesson.lesson.title}
                </h3>

                {previewLesson.lesson.learning_objectives && (
                  <p className="text-xs font-semibold text-slate-500 line-clamp-2 px-2">
                    🎯 {previewLesson.lesson.learning_objectives}
                  </p>
                )}
              </div>

              {/* Info Misi & Rating Bintang yang Tersedia */}
              <div className="w-full bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-around text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span>⚔️</span>
                  <span>{previewLesson.lesson.assignments.length} Misi Tugas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {(() => {
                    const stars = getLessonStarsCount(previewLesson.lesson);
                    const isFinished =
                      isLessonUnlocked(previewLesson.lIdx) &&
                      (previewLesson.lesson.assignments.length === 0 ||
                        previewLesson.lesson.assignments.every((a) => submittedTasks[a.id]));

                    if (isFinished && stars > 0) {
                      return (
                        <div className="flex items-center gap-0.5 text-amber-500 font-black">
                          {[1, 2, 3].map((starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-4 h-4 ${starIdx <= stars
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'fill-slate-200 text-slate-300'
                                }`}
                            />
                          ))}
                          <span className="ml-1 text-[11px] text-amber-900 font-black">
                            {stars}/3 Bintang
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div className="flex items-center gap-1 text-amber-700 font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>Hingga 3 Bintang</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Tombol Membuka Materi Taktil 3D */}
              <button
                type="button"
                onClick={() => {
                  const target = previewLesson.lesson;
                  setPreviewLesson(null);
                  setFocusedLesson(target);
                }}
                className="w-full min-h-[50px] rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 border-2 border-b-6 border-teal-800 active:border-b-2 active:translate-y-1 text-white text-sm font-black flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Buka Materi Belajar 🚀</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal CBT Quiz */}
        {activeQuizModal && (
          <QuizCbtModal
            assignmentId={activeQuizModal.id}
            assignmentTitle={activeQuizModal.title}
            initialScore={activeQuizModal.score}
            isOpen={Boolean(activeQuizModal)}
            onClose={() => setActiveQuizModal(null)}
            onSuccess={(score) => {
              setSubmittedTasks((prev) => ({
                ...prev,
                [activeQuizModal.id]: true,
              }));
              if (score !== undefined) {
                setTaskScores((prev) => ({
                  ...prev,
                  [activeQuizModal.id]: score,
                }));
              }
              setBonusStars((prev) => prev + 50);
              setNotice({
                type: 'success',
                message: 'Hore! Kuis CBT berhasil diselesaikan! +50 Bintang ⭐',
              });
            }}
          />
        )}

        {/* JIKA SEDANG MEMBUKA 1 MATERI SECARA FOKUS */}
        {focusedLesson ? (
          <div className="space-y-4 animate-in fade-in">
            {/* Tombol Kembali Taktil 3D */}
            <button
              type="button"
              onClick={() => setFocusedLesson(null)}
              className="h-11 px-4 rounded-2xl bg-white border-2 border-b-4 border-slate-200 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-black flex items-center gap-2 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>Kembali ke Peta Petualangan</span>
            </button>

            {/* Grid Responsif: Di HP 1 kolom, Di Tablet/iPad (md:) 2 kolom seimbang */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              {/* Kolom Kiri: Wadah Materi Multimedia Terpadu */}
              <div className="w-full">
                <UnifiedLessonContentCard
                  lesson={focusedLesson}
                  isStudied={Boolean(studiedLessons[focusedLesson.id])}
                  isPending={isStudyingPending}
                  onMarkAsStudied={handleMarkAsStudied}
                />
              </div>

              {/* Kolom Kanan: Misi / Penugasan Terkait Materi Ini (RPG Quest Cards) */}
              <div className="space-y-3.5 w-full">
                <div className="px-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚔️</span>
                    <span>Misi Tantangan ({focusedLesson.assignments.length})</span>
                  </h4>
                </div>

                {/* GERBANG KUNCI: JIKA SISWA BELUM MEMPELAJARI MATERI */}
                {!studiedLessons[focusedLesson.id] ? (
                  <div className="p-6 sm:p-8 bg-amber-50/80 rounded-3xl border-2 border-dashed border-amber-300 text-center space-y-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl mx-auto shadow-2xs">
                      <Lock className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-amber-950">
                      Misi Tugas Masih Terkunci
                    </h5>
                    <p className="text-[11px] sm:text-xs font-bold text-amber-800/90 max-w-xs mx-auto leading-relaxed">
                      Pelajari materi di sebelah terlebih dahulu, lalu tekan tombol{' '}
                      <b className="text-amber-950">&quot;Saya Sudah Mempelajari Materi 👍&quot;</b> untuk membuka tugas ini!
                    </p>
                  </div>
                ) : focusedLesson.assignments.length === 0 ? (
                  <div className="p-6 bg-white rounded-3xl border-2 border-slate-200 text-center space-y-1">
                    <span className="text-2xl">🎉</span>
                    <p className="text-xs font-black text-slate-700">Materi ini tidak memiliki tugas.</p>
                    <p className="text-[11px] text-slate-400">Kamu bisa lanjut ke pos berikutnya!</p>
                  </div>
                ) : (
                  focusedLesson.assignments.map((assignment) => {
                    const isTaskDone = submittedTasks[assignment.id];

                    return (
                      <div
                        key={assignment.id}
                        className={`bg-white rounded-3xl border-2 border-b-6 p-4 sm:p-5 shadow-xs space-y-3.5 transition-all ${isTaskDone
                            ? 'border-emerald-300 bg-emerald-50/20'
                            : 'border-teal-300'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {assignment.type === 'QUIZ_CBT'
                                ? '🧠'
                                : assignment.type === 'VOICE_TASK'
                                  ? '🎙️'
                                  : '📷'}
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                              {assignment.type === 'QUIZ_CBT'
                                ? 'Tantangan Kuis CBT'
                                : assignment.type === 'VOICE_TASK'
                                  ? 'Misi Suara Petualang'
                                  : 'Misi Foto PR Ajaib'}
                            </h4>
                          </div>

                          {isTaskDone ? (
                            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Misi Selesai ✓</span>
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-2xs">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>+50 Bintang</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                          {assignment.prompt}
                        </p>

                        {assignment.instruction_audio_url && (
                          <AudioPromptPlayer
                            audioUrl={assignment.instruction_audio_url}
                            title="Petunjuk Suara Guru"
                          />
                        )}

                        {isTaskDone ? (
                          <div className="p-3.5 rounded-2xl bg-emerald-100/70 border-2 border-emerald-200 text-emerald-950 text-xs font-black flex items-center justify-between gap-2">
                            <span>
                              {assignment.type === 'QUIZ_CBT'
                                ? `Skor kuis kamu: ${assignment.score ?? 0}/100! 🎉`
                                : 'Misi ini sudah kamu selesaikan dengan hebat! 🎉'}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
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
                                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:translate-y-0.5 border-b-2 border-amber-700 text-white text-[11px] font-black cursor-pointer shadow-2xs"
                                >
                                  Ulangi Kuis
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setFocusedLesson(null)}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 border-b-2 border-emerald-800 text-white text-[11px] font-black cursor-pointer shadow-2xs"
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
                                className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-2 border-b-5 border-indigo-900 active:border-b-2 active:translate-y-1 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                              >
                                <Play className="w-4 h-4 fill-white" />
                                <span>Mulai Kuis CBT ({assignment.quiz_question_count ?? 5} Soal Acak) ⚔️</span>
                              </button>
                            ) : assignment.type === 'VOICE_TASK' ? (
                              <VoiceSubmission
                                assignmentId={assignment.id}
                                onSuccess={() => {
                                  setSubmittedTasks((prev) => ({
                                    ...prev,
                                    [assignment.id]: true,
                                  }));
                                  setBonusStars((prev) => prev + 50);
                                  setNotice({
                                    type: 'success',
                                    message: 'Hore! Misi Suara berhasil dikirim! +50 Bintang ⭐',
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
                                  setBonusStars((prev) => prev + 50);
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
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          /* DAFTAR MATERI SEBAGAI JALUR PETUALANGAN (STAGE ADVENTURE MAP) */
          <div className="space-y-4">
            {/* Card Progres Belajar Bab ala RPG Quest Progress */}
            <section className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-b-6 border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl border-2 border-amber-300 shadow-2xs shrink-0">
                    🏆
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight truncate flex items-center gap-1.5">
                      <span>Misi Petualangan Bab Ini</span>
                    </h2>
                    <p className="text-[10.5px] sm:text-xs font-semibold text-slate-500 truncate">
                      Taklukkan semua pos materi untuk bonus bintang penuh!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs font-black text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-xl shadow-2xs">
                    {doneTasks}/{totalTasks} Selesai
                  </span>
                </div>
              </div>

              {/* Progress Bar Bergaya HP / XP Bar Game */}
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 rounded-full transition-all duration-700 shadow-xs"
                  style={{
                    width: `${totalTasks > 0
                        ? Math.round((doneTasks / totalTasks) * 100)
                        : lessons.length > 0
                          ? 35
                          : 0
                      }%`,
                  }}
                />
              </div>
            </section>

            {/* PATH PERJALANAN MATERI ALA DUOLINGO (WINDING STEPPING STONES) */}
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🗺️</span>
                  <span>Jalur Petualangan ({lessons.length} Pos)</span>
                </h3>
                <span className="text-[11px] font-bold text-teal-700">
                  Klik Ikon Pos Belajar
                </span>
              </div>

              {lessons.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl mb-2">
                    ⛺
                  </div>
                  <p className="text-xs sm:text-sm font-black text-slate-700">Belum ada pos materi di bab ini.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Guru sedang menyiapkan petualangan seru untukmu!</p>
                </div>
              ) : (
                <div className="relative py-4 flex flex-col items-center select-none">
                  {/* Stepping Stones Winding Path ala Duolingo (Tengah Saja) */}
                  <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-6">
                    {lessons.map((lesson: LessonWithAssignment, lIdx: number) => {
                      const isUnlocked = isLessonUnlocked(lIdx);
                      const hasTasks = lesson.assignments.length > 0;
                      const totalLessonTasks = lesson.assignments.length;
                      const doneLessonTasks = lesson.assignments.filter(
                        (asg: StudentAssignment) => submittedTasks[asg.id]
                      ).length;
                      const isDone = hasTasks && doneLessonTasks === totalLessonTasks;
                      const isNextActive = isUnlocked && !isDone;

                      // Posisi meliuk bergantian ala Duolingo
                      const offsets = [
                        'translate-x-0',
                        '-translate-x-10 sm:-translate-x-14',
                        'translate-x-0',
                        'translate-x-10 sm:translate-x-14',
                      ];
                      const offsetClass = offsets[lIdx % offsets.length];

                      return (
                        <div
                          key={lesson.id}
                          className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                        >
                          {/* Floating Tooltip Banner untuk Pos yang Sedang Aktif Dikerjakan */}
                          {isNextActive && (
                            <div className="mb-2 px-3 py-1 rounded-xl bg-teal-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md border-2 border-teal-400 animate-game-bounce flex items-center gap-1 z-20">
                              <span>Mulai Disini! 🎯</span>
                            </div>
                          )}

                          {/* Tombol Lingkaran Node Taktil 3D */}
                          <div className="relative group">
                            <button
                              type="button"
                              onClick={() => {
                                if (!isUnlocked) {
                                  setNotice({
                                    type: 'locked',
                                    message: 'Selesaikan pos materi sebelumnya terlebih dahulu ya! 🔒',
                                  });
                                  return;
                                }
                                setPreviewLesson({ lesson, lIdx });
                              }}
                              className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 flex items-center justify-center text-3xl sm:text-4xl shadow-lg transition-all cursor-pointer select-none active:scale-95 ${!isUnlocked
                                  ? 'bg-slate-200 border-b-6 border-slate-400 text-slate-400 opacity-80 cursor-not-allowed'
                                  : isDone
                                    ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 border-b-6 border-emerald-700 text-white active:border-b-2 active:translate-y-1 hover:brightness-105'
                                    : 'bg-gradient-to-tr from-teal-400 to-cyan-500 border-b-6 border-teal-700 text-white active:border-b-2 active:translate-y-1 ring-4 ring-teal-200 hover:brightness-105'
                                }`}
                              title={lesson.title}
                            >
                              {!isUnlocked ? (
                                <Lock className="w-8 h-8 text-slate-400" />
                              ) : (
                                <span>🌟</span>
                              )}
                            </button>

                            {/* Rating Bintang 1-3 Jika Sudah Selesai */}
                            {(() => {
                              const stars = getLessonStarsCount(lesson);
                              if (!isDone || stars === 0) return null;

                              return (
                                <div className="absolute -top-2 inset-x-0 flex items-center justify-center gap-0.5 z-10 pointer-events-none">
                                  <div className="px-2 py-0.5 rounded-full bg-white/95 border border-amber-300 shadow-md flex items-center gap-0.5 animate-in zoom-in-75">
                                    {[1, 2, 3].map((starIdx) => (
                                      <Star
                                        key={starIdx}
                                        className={`w-3.5 h-3.5 ${starIdx <= stars
                                            ? 'fill-amber-400 text-amber-500 drop-shadow-2xs'
                                            : 'fill-slate-200 text-slate-300'
                                          }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Nomor Tahap di Bawah Node */}
                            <div className="mt-1.5 flex justify-center">
                              <span className="text-[10px] font-black uppercase text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                                Pos {lIdx + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Garis Pembatas Akhir Bab */}
                  <div className="w-full max-w-xs my-6 border-t-2 border-dashed border-slate-300" />

                  {/* TOMBOL MENUJU BAB BERIKUTNYA DI AKHIR PATH (DILENGKAPI GERBANG KUNCI) */}
                  <div className="w-full max-w-sm px-4">
                    {nextModule ? (
                      isChapterFullyCompleted ? (
                        /* JIKA BAB SUDAH TUNTAS 100%: TOMBOL TERBUKA */
                        <Link
                          href={`/siswa/bab/${nextModule.id}`}
                          className="w-full min-h-[56px] p-4 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 border-3 border-b-6 border-orange-700 active:border-b-2 active:translate-y-1 text-white shadow-lg flex items-center justify-between gap-3 transition-all cursor-pointer group animate-in zoom-in-95"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
                              🚀
                            </div>
                            <div className="min-w-0 text-left">
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 bg-black/15 px-2 py-0.5 rounded-md">
                                Bab Terbuka! • Bab {nextModule.order_index}
                              </span>
                              <h4 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                                {cleanModuleTitle(nextModule.title)}
                              </h4>
                            </div>
                          </div>

                          <div className="w-9 h-9 rounded-xl bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                            <ChevronRight className="w-5 h-5 stroke-[3]" />
                          </div>
                        </Link>
                      ) : (
                        /* JIKA MASIH ADA POS / TUGAS YANG BELUM SELESAI: TOMBOL TERKUNCI */
                        <button
                          type="button"
                          onClick={() =>
                            setNotice({
                              type: 'locked',
                              message: `Selesaikan semua pos materi dan tugas di Bab ${module.order_index} ini terlebih dahulu untuk membuka petualangan berikutnya! 🔒`,
                            })
                          }
                          className="w-full min-h-[56px] p-4 rounded-3xl bg-slate-100 border-3 border-b-6 border-slate-300 text-slate-400 flex items-center justify-between gap-3 cursor-not-allowed opacity-80 select-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-xl shrink-0">
                              <Lock className="w-5 h-5 stroke-[2.5]" />
                            </div>
                            <div className="min-w-0 text-left">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md">
                                Terkunci • Bab {nextModule.order_index}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-500 truncate mt-0.5">
                                {cleanModuleTitle(nextModule.title)}
                              </h4>
                            </div>
                          </div>

                          <div className="text-[10px] font-black text-slate-400 px-2 py-1 bg-slate-200/60 rounded-xl">
                            {doneTasks}/{totalTasks} Tugas
                          </div>
                        </button>
                      )
                    ) : (
                      /* JIKA INI BAB TERAKHIR DI MATA PELAJARAN INI */
                      <Link
                        href={classId ? `/siswa/kelas/${classId}` : '/siswa'}
                        className="w-full min-h-[56px] p-4 rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 border-3 border-b-6 border-teal-800 active:border-b-2 active:translate-y-1 text-white shadow-lg flex items-center justify-between gap-3 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
                            🏆
                          </div>
                          <div className="min-w-0 text-left">
                            <span className="text-[10px] font-black uppercase tracking-wider text-teal-100 bg-black/15 px-2 py-0.5 rounded-md">
                              Hore! Bab Terakhir Selesai
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                              Kembali ke Pilihan Bab & Pelajaran Lain
                            </h4>
                          </div>
                        </div>

                        <div className="w-9 h-9 rounded-xl bg-white text-teal-700 flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
                          <ChevronRight className="w-5 h-5 stroke-[3]" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </StudentLayoutShell>
  );
}