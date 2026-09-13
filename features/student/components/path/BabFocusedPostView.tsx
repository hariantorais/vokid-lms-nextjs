'use client';

import React from 'react';
import { CheckCircle2, Play } from 'lucide-react';
import { UnifiedLessonContentCard } from '../lesson/UnifiedLessonContentCard';
import { AudioPromptPlayer } from '../lesson/AudioPromptPlayer';
import { VoiceSubmission } from '../submissions/VoiceSubmission';
import { PhotoHomeworkSubmission } from '../submissions/PhotoHomeworkSubmission';
import type { PathNodeItem } from '../../types/learning-path';

interface BabFocusedPostViewProps {
    node: PathNodeItem;
    isStudied: boolean;
    isStudyingPending: boolean;
    isTaskDone: boolean;
    onMarkAsStudied: (lessonId: string) => void;
    onTaskSuccess: (assignmentId: string) => void;
    onOpenQuiz: (assignmentId: string, prompt: string, score: number | null) => void;
    onBackToPath: () => void;
}

export function BabFocusedPostView({
    node,
    isStudied,
    isStudyingPending,
    isTaskDone,
    onMarkAsStudied,
    onTaskSuccess,
    onOpenQuiz,
    onBackToPath,
}: BabFocusedPostViewProps) {
    return (
        <div className="space-y-3 animate-in fade-in">
            {node.nodeType === 'LESSON' ? (
                <UnifiedLessonContentCard
                    lesson={node.lesson}
                    isStudied={isStudied}
                    isPending={isStudyingPending}
                    onMarkAsStudied={onMarkAsStudied}
                />
            ) : (
                <div className="w-full">
                    <div
                        className={`bg-white rounded-3xl border-2 border-b-6 p-5 sm:p-6 shadow-xs space-y-4 transition-all ${isTaskDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-teal-300'
                            }`}
                    >
                        {/* Header Pos Tugas */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">
                                    {node.assignment.type === 'QUIZ_CBT'
                                        ? '🧠'
                                        : node.assignment.type === 'VOICE_TASK'
                                            ? '🎙️'
                                            : '📷'}
                                </span>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                        Materi: {node.lesson.title}
                                    </span>
                                    <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                                        {node.assignment.type === 'QUIZ_CBT'
                                            ? 'Tantangan Kuis CBT'
                                            : node.assignment.type === 'VOICE_TASK'
                                                ? 'Misi Suara Petualang'
                                                : 'Misi Foto PR'}
                                    </h3>
                                </div>
                            </div>

                            {isTaskDone ? (
                                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Selesai ✓</span>
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full text-[11px] font-black bg-slate-100 text-slate-700 border border-slate-200">
                                    Tugas Mandiri
                                </span>
                            )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                            {node.assignment.prompt}
                        </p>

                        {node.assignment.instruction_audio_url && (
                            <AudioPromptPlayer
                                audioUrl={node.assignment.instruction_audio_url}
                                title="Petunjuk Suara Guru"
                            />
                        )}

                        {isTaskDone ? (
                            <div className="p-4 rounded-2xl bg-emerald-100/70 border-2 border-emerald-200 text-emerald-950 text-xs font-black flex items-center justify-between gap-3">
                                <span>
                                    {node.assignment.type === 'QUIZ_CBT'
                                        ? 'Kuis ini sudah berhasil kamu selesaikan! 🎉'
                                        : 'Misi ini sudah berhasil kamu kumpulkan! 🎉'}
                                </span>
                                {node.assignment.type === 'QUIZ_CBT' && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onOpenQuiz(
                                                node.assignment.id,
                                                node.assignment.prompt,
                                                node.assignment.score ?? null
                                            )
                                        }
                                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:translate-y-0.5 border-b-2 border-amber-700 text-white text-[11px] font-black cursor-pointer shadow-2xs shrink-0"
                                    >
                                        Ulangi Kuis
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div>
                                {node.assignment.type === 'QUIZ_CBT' ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onOpenQuiz(node.assignment.id, node.assignment.prompt, null)
                                        }
                                        className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-2 border-b-5 border-indigo-900 active:border-b-2 active:translate-y-1 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                                    >
                                        <Play className="w-4 h-4 fill-white" />
                                        <span>Mulai Kuis CBT ⚔️</span>
                                    </button>
                                ) : node.assignment.type === 'VOICE_TASK' ? (
                                    <VoiceSubmission
                                        assignmentId={node.assignment.id}
                                        onSuccess={() => onTaskSuccess(node.assignment.id)}
                                    />
                                ) : (
                                    <PhotoHomeworkSubmission
                                        assignmentId={node.assignment.id}
                                        onSuccess={() => onTaskSuccess(node.assignment.id)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tombol Nanti Aja di Bawah Card */}
            <div className="pt-1">
                <button
                    type="button"
                    onClick={onBackToPath}
                    className="w-full h-11 rounded-2xl bg-white hover:bg-slate-100 active:translate-y-0.5 border-2 border-b-4 border-slate-200 text-slate-600 font-black text-xs flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}