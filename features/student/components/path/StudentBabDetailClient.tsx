'use client';

import React, { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  ChevronRight,
  Lock,
  ArrowLeft,
  Play,
  BookOpen,
  Mic,
  Camera,
  ListChecks,
} from 'lucide-react';
import { toast } from 'sonner';
import { cleanModuleTitle } from '@/lib/formatters';
import { markLessonAsStudiedAction } from '@/features/student/actions/lesson-learning.actions';
import {
  StudentLayoutShell,
  AudioPromptPlayer,
  UnifiedLessonContentCard,
  VoiceSubmission,
  PhotoHomeworkSubmission,
  QuizCbtModal,
  PathNodePopover,
  type PathNodeItem,
} from '@/features/student/components';
import type { StudentBabDetailData } from '@/features/student/services/student-bab.service';
interface StudentBabDetailClientProps {
  data: StudentBabDetailData;
  classId?: string;
}

export function StudentBabDetailClient({ data, classId }: StudentBabDetailClientProps) {
  const { module, nextModule } = data;
  const lessons = module.lessons ?? [];

  // Flatten: 1 Lesson + N Assignments menjadi urutan pos mandiri
  const pathNodes: PathNodeItem[] = useMemo(() => {
    const list: PathNodeItem[] = [];
    lessons.forEach((les, lIdx) => {
      list.push({
        id: `lesson-node-${les.id}`,
        nodeType: 'LESSON',
        lesson: les,
        title: les.title,
        orderLabel: `Tahap ${lIdx + 1}`,
      });

      (les.assignments ?? []).forEach((asg, aIdx) => {
        list.push({
          id: `asg-node-${asg.id}`,
          nodeType: 'ASSIGNMENT',
          lesson: les,
          assignment: asg,
          title: asg.prompt,
          orderLabel: `Misi ${lIdx + 1}.${aIdx + 1}`,
        });
      });
    });
    return list;
  }, [lessons]);

  const [focusedNode, setFocusedNode] = useState<PathNodeItem | null>(null);
  const [previewNode, setPreviewNode] = useState<{
    node: PathNodeItem;
    nodeIdx: number;
    isUnlocked: boolean;
  } | null>(null);

  const [studiedLessons, setStudiedLessons] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const les of lessons) {
      if (les.isStudied) initial[les.id] = true;
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
      toast.success('Materi selesai dipelajari! Pos berikutnya telah terbuka 🎉');
    });
  };

  const [activeQuizModal, setActiveQuizModal] = useState<{
    id: string;
    title: string;
    score?: number | null;
  } | null>(null);

  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const les of lessons) {
      for (const asg of les.assignments ?? []) {
        if (asg.hasSubmitted) initial[asg.id] = true;
      }
    }
    return initial;
  });

  const [taskScores, setTaskScores] = useState<Record<string, number | null>>(() => {
    const initial: Record<string, number | null> = {};
    for (const les of lessons) {
      for (const asg of les.assignments ?? []) {
        if (asg.score !== undefined && asg.score !== null) {
          initial[asg.id] = asg.score;
        } else if (asg.grade !== undefined && asg.grade !== null) {
          initial[asg.id] = asg.grade;
        }
      }
    }
    return initial;
  });

  const isNodeCompleted = (node: PathNodeItem): boolean => {
    if (node.nodeType === 'LESSON') return Boolean(studiedLessons[node.lesson.id]);
    return Boolean(submittedTasks[node.assignment.id]);
  };

  const isNodeUnlocked = (nodeIdx: number): boolean => {
    if (nodeIdx === 0) return true;
    const prevNode = pathNodes[nodeIdx - 1];
    return prevNode ? isNodeCompleted(prevNode) : true;
  };

  const totalNodesCount = pathNodes.length;
  const doneNodesCount = pathNodes.filter(isNodeCompleted).length;
  const isChapterFullyCompleted = totalNodesCount > 0 && doneNodesCount === totalNodesCount;

  const [bonusStars, setBonusStars] = useState<number>(0);
  const currentTotalStars = (data.totalStars ?? 0) + bonusStars;

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
        {/* Modal CBT Quiz */}
        {activeQuizModal && (
          <QuizCbtModal
            assignmentId={activeQuizModal.id}
            assignmentTitle={activeQuizModal.title}
            initialScore={activeQuizModal.score}
            isOpen={Boolean(activeQuizModal)}
            onClose={() => setActiveQuizModal(null)}
            onSuccess={(score) => {
              setSubmittedTasks((prev) => ({ ...prev, [activeQuizModal.id]: true }));
              if (score !== undefined) {
                setTaskScores((prev) => ({ ...prev, [activeQuizModal.id]: score }));
              }
              setBonusStars((prev) => prev + 50);
              toast.success('Hore! Kuis CBT berhasil diselesaikan! +50 Bintang ⭐');
            }}
          />
        )}

        {/* Tampilan 1 Pos Aktif */}
        {focusedNode ? (
          <div className="space-y-4 animate-in fade-in">
            <button
              type="button"
              onClick={() => setFocusedNode(null)}
              className="h-11 px-4 rounded-2xl bg-white border-2 border-b-4 border-slate-200 active:border-b-2 active:translate-y-0.5 text-slate-700 text-xs font-black flex items-center gap-2 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>Kembali ke Jalur Petualangan</span>
            </button>

            {focusedNode.nodeType === 'LESSON' ? (
              <div className="w-full">
                <UnifiedLessonContentCard
                  lesson={focusedNode.lesson}
                  isStudied={Boolean(studiedLessons[focusedNode.lesson.id])}
                  isPending={isStudyingPending}
                  onMarkAsStudied={handleMarkAsStudied}
                />
              </div>
            ) : (
              <div className="w-full">
                <div
                  className={`bg-white rounded-3xl border-2 border-b-6 p-5 sm:p-6 shadow-xs space-y-4 transition-all ${submittedTasks[focusedNode.assignment.id]
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-teal-300'
                    }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {focusedNode.assignment.type === 'QUIZ_CBT'
                          ? '🧠'
                          : focusedNode.assignment.type === 'VOICE_TASK'
                            ? '🎙️'
                            : '📷'}
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                          Materi: {focusedNode.lesson.title}
                        </span>
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                          {focusedNode.assignment.type === 'QUIZ_CBT'
                            ? 'Tantangan Kuis CBT'
                            : focusedNode.assignment.type === 'VOICE_TASK'
                              ? 'Misi Suara Petualang'
                              : 'Misi Foto PR'}
                        </h3>
                      </div>
                    </div>

                    {submittedTasks[focusedNode.assignment.id] ? (
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesai ✓</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-2xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>+50 Bintang</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                    {focusedNode.assignment.prompt}
                  </p>

                  {focusedNode.assignment.instruction_audio_url && (
                    <AudioPromptPlayer
                      audioUrl={focusedNode.assignment.instruction_audio_url}
                      title="Petunjuk Suara Guru"
                    />
                  )}

                  {submittedTasks[focusedNode.assignment.id] ? (
                    <div className="p-4 rounded-2xl bg-emerald-100/70 border-2 border-emerald-200 text-emerald-950 text-xs font-black flex items-center justify-between gap-2">
                      <span>
                        {focusedNode.assignment.type === 'QUIZ_CBT'
                          ? `Skor kuis kamu: ${taskScores[focusedNode.assignment.id] ?? 100}/100! 🎉`
                          : 'Misi ini sudah berhasil kamu kumpulkan! 🎉'}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {focusedNode.assignment.type === 'QUIZ_CBT' && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveQuizModal({
                                id: focusedNode.assignment.id,
                                title: focusedNode.assignment.prompt,
                                score: taskScores[focusedNode.assignment.id] ?? null,
                              })
                            }
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:translate-y-0.5 border-b-2 border-amber-700 text-white text-[11px] font-black cursor-pointer shadow-2xs"
                          >
                            Ulangi Kuis
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setFocusedNode(null)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:translate-y-0.5 border-b-2 border-emerald-800 text-white text-[11px] font-black cursor-pointer shadow-2xs"
                        >
                          Lanjut Peta ➔
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {focusedNode.assignment.type === 'QUIZ_CBT' ? (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveQuizModal({
                              id: focusedNode.assignment.id,
                              title: focusedNode.assignment.prompt,
                              score: taskScores[focusedNode.assignment.id] ?? null,
                            })
                          }
                          className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-2 border-b-5 border-indigo-900 active:border-b-2 active:translate-y-1 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>Mulai Kuis CBT ⚔️</span>
                        </button>
                      ) : focusedNode.assignment.type === 'VOICE_TASK' ? (
                        <VoiceSubmission
                          assignmentId={focusedNode.assignment.id}
                          onSuccess={() => {
                            setSubmittedTasks((prev) => ({ ...prev, [focusedNode.assignment.id]: true }));
                            setBonusStars((prev) => prev + 50);
                            toast.success('Hore! Misi Suara berhasil dikirim! +50 Bintang ⭐');
                          }}
                        />
                      ) : (
                        <PhotoHomeworkSubmission
                          assignmentId={focusedNode.assignment.id}
                          onSuccess={() => {
                            setSubmittedTasks((prev) => ({ ...prev, [focusedNode.assignment.id]: true }));
                            setBonusStars((prev) => prev + 50);
                            toast.success('Hore! Foto PR berhasil dikirim! +50 Bintang ⭐');
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Jalur Peta Duolingo Lengkap */
          <div className="space-y-4">
            <section className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border-2 border-b-6 border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl border-2 border-amber-300 shadow-2xs shrink-0">
                    🏆
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight truncate">
                      Misi Petualangan Bab Ini
                    </h2>
                    <p className="text-[10.5px] sm:text-xs font-semibold text-slate-500 truncate">
                      Taklukkan setiap pos belajar & misi untuk membuka bab berikutnya!
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-xl shadow-2xs shrink-0">
                  {doneNodesCount}/{totalNodesCount} Pos Selesai
                </span>
              </div>

              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 rounded-full transition-all duration-700 shadow-xs"
                  style={{
                    width: `${totalNodesCount > 0 ? Math.round((doneNodesCount / totalNodesCount) * 100) : 0}%`,
                  }}
                />
              </div>
            </section>

            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🗺️</span>
                  <span>Jalur Petualangan ({totalNodesCount} Pos Mandiri)</span>
                </h3>
                <span className="text-[11px] font-bold text-teal-700">Klik Ikon Pos</span>
              </div>

              {totalNodesCount === 0 ? (
                <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl mb-2">
                    ⛺
                  </div>
                  <p className="text-xs sm:text-sm font-black text-slate-700">Belum ada pos materi di bab ini.</p>
                </div>
              ) : (
                <div className="relative py-4 flex flex-col items-center select-none">
                  <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-7">
                    {pathNodes.map((node: PathNodeItem, nodeIdx: number) => {
                      const isUnlocked = isNodeUnlocked(nodeIdx);
                      const isDone = isNodeCompleted(node);
                      const isCurrentActive = isUnlocked && !isDone;
                      const isSelected = previewNode?.nodeIdx === nodeIdx;

                      const offsets = [
                        'translate-x-0',
                        '-translate-x-10 sm:-translate-x-14',
                        'translate-x-0',
                        'translate-x-10 sm:translate-x-14',
                      ];
                      const offsetClass = offsets[nodeIdx % offsets.length];

                      return (
                        <div
                          key={node.id}
                          className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                        >
                          {isCurrentActive && !isSelected && (
                            <div className="mb-2 px-3 py-1 rounded-xl bg-teal-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md border-2 border-teal-400 flex items-center gap-1 z-20 animate-bounce">
                              <span>Mulai Disini! 🎯</span>
                            </div>
                          )}

                          <div className="relative">
                            {/* Popover Bubble */}
                            {isSelected && (
                              <PathNodePopover
                                node={node}
                                nodeIdx={nodeIdx}
                                isUnlocked={isUnlocked}
                                isDone={isDone}
                                onClose={() => setPreviewNode(null)}
                                onSelect={(target) => {
                                  setPreviewNode(null);
                                  setFocusedNode(target);
                                }}
                              />
                            )}

                            {/* Tombol Lingkaran Pos 3D */}
                            <button
                              type="button"
                              onClick={() => {
                                if (previewNode?.nodeIdx === nodeIdx) {
                                  setPreviewNode(null);
                                } else {
                                  setPreviewNode({ node, nodeIdx, isUnlocked });
                                }
                              }}
                              className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 flex items-center justify-center text-2xl sm:text-3xl shadow-lg transition-all cursor-pointer select-none active:scale-95 ${!isUnlocked
                                ? 'bg-slate-200 border-b-6 border-slate-400 text-slate-400 opacity-80 hover:brightness-105'
                                : isDone
                                  ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 border-b-6 border-emerald-700 text-white active:border-b-2 active:translate-y-1 hover:brightness-105'
                                  : node.nodeType === 'LESSON'
                                    ? 'bg-gradient-to-tr from-teal-400 to-cyan-500 border-b-6 border-teal-700 text-white ring-4 ring-teal-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                    : node.assignment.type === 'QUIZ_CBT'
                                      ? 'bg-gradient-to-tr from-amber-400 to-orange-500 border-b-6 border-amber-700 text-white ring-4 ring-amber-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                      : node.assignment.type === 'VOICE_TASK'
                                        ? 'bg-gradient-to-tr from-purple-400 to-indigo-500 border-b-6 border-purple-700 text-white ring-4 ring-purple-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                        : 'bg-gradient-to-tr from-sky-400 to-blue-500 border-b-6 border-sky-700 text-white ring-4 ring-sky-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                }`}
                              title={node.title}
                            >
                              {!isUnlocked ? (
                                <Lock className="w-8 h-8 text-slate-400 stroke-[2.5]" />
                              ) : isDone ? (
                                <CheckCircle2 className="w-9 h-9 text-white stroke-[2.5]" />
                              ) : node.nodeType === 'LESSON' ? (
                                <BookOpen className="w-8 h-8 text-white stroke-[2.5]" />
                              ) : node.assignment.type === 'QUIZ_CBT' ? (
                                <ListChecks className="w-8 h-8 text-white stroke-[2.5]" />
                              ) : node.assignment.type === 'VOICE_TASK' ? (
                                <Mic className="w-8 h-8 text-white stroke-[2.5]" />
                              ) : (
                                <Camera className="w-8 h-8 text-white stroke-[2.5]" />
                              )}
                            </button>

                            <div className="mt-1.5 flex flex-col items-center gap-0.5">
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border shadow-2xs ${!isUnlocked
                                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                                  : 'bg-white text-slate-700 border-slate-200'
                                  }`}
                              >
                                Pos {nodeIdx + 1}
                              </span>
                              <span className="text-[9.5px] font-bold text-slate-400 max-w-[80px] truncate text-center">
                                {node.nodeType === 'LESSON' ? 'Materi' : 'Misi Tugas'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="w-full max-w-xs my-6 border-t-2 border-dashed border-slate-300" />

                  <div className="w-full max-w-sm px-4">
                    {nextModule ? (
                      isChapterFullyCompleted ? (
                        <Link
                          href={`/siswa/bab/${nextModule.id}`}
                          className="w-full min-h-[56px] p-4 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 border-3 border-b-6 border-orange-700 active:border-b-2 active:translate-y-1 text-white shadow-lg flex items-center justify-between gap-3 transition-all cursor-pointer group"
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
                          <div className="w-9 h-9 rounded-xl bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
                            <ChevronRight className="w-5 h-5 stroke-[3]" />
                          </div>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            toast.error(
                              `Selesaikan seluruh ${totalNodesCount} pos di Bab ${module.order_index} ini terlebih dahulu ya! 🔒`
                            )
                          }
                          className="w-full min-h-[56px] p-4 rounded-3xl bg-slate-100 border-3 border-b-6 border-slate-300 text-slate-400 flex items-center justify-between gap-3 cursor-not-allowed opacity-80"
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
                            {doneNodesCount}/{totalNodesCount} Pos
                          </div>
                        </button>
                      )
                    ) : (
                      <Link
                        href={classId ? `/siswa/kelas/${classId}` : '/siswa'}
                        className="w-full min-h-[56px] p-4 rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 border-3 border-b-6 border-teal-800 active:border-b-2 active:translate-y-1 text-white shadow-lg flex items-center justify-between gap-3 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0 border border-white/30">
                            🏆
                          </div>
                          <div className="min-w-0 text-left">
                            <span className="text-[10px] font-black uppercase tracking-wider text-teal-100 bg-black/15 px-2 py-0.5 rounded-md">
                              Hore! Bab Terakhir Selesai
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                              Kembali ke Daftar Bab & Kelas
                            </h4>
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-white text-teal-700 flex items-center justify-center shrink-0 shadow-xs">
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