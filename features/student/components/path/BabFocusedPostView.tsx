'use client';

import React from 'react';
import {
    CheckCircle2,
    Play,
    Volume2,
    Award,
    Headphones,
    MessageSquare,
} from 'lucide-react';
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
                            <div className="space-y-3">
                                {/* Banner Status & Skor Nilai */}
                                <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                        <span className="text-xs sm:text-sm font-black text-slate-800">
                                            {node.assignment.submissionStatus === 'GRADED'
                                                ? 'Tugasmu sudah dinilai oleh Guru! 🎉'
                                                : 'Tugasmu sudah dikirim & menunggu dinilai guru ⏳'}
                                        </span>
                                    </div>

                                    {/* Badge Bintang Nilai Guru */}
                                    {node.assignment.submissionStatus === 'GRADED' &&
                                        node.assignment.score !== null &&
                                        node.assignment.score !== undefined && (
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-black text-xs sm:text-sm shadow-xs shrink-0">
                                                <Award className="w-4 h-4 fill-white" />
                                                <span>{node.assignment.score}</span>
                                            </div>
                                        )}
                                </div>

                                {/* Pemutar Suara Rekaman Jawaban Siswa Sendiri */}
                                {node.assignment.fileUrl && (
                                    <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
                                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                                            <Volume2 className="w-4 h-4 text-purple-600" />
                                            <span>Rekaman Suara Jawabanmu:</span>
                                        </div>
                                        <audio
                                            controls
                                            preload="metadata"
                                            src={node.assignment.fileUrl}
                                            className="w-full h-10 rounded-xl"
                                        />
                                    </div>
                                )}

                                {/* Hasil Review Guru: Komentar Teks & Feedback Suara */}
                                {node.assignment.submissionStatus === 'GRADED' && (
                                    <div className="space-y-2.5 pt-1">
                                        {/* Catatan Feedback Teks Guru */}
                                        {node.assignment.teacherNotes && (
                                            <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 flex items-start gap-2.5 shadow-2xs">
                                                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider block">
                                                        Ulasan Ibu/Bapak Guru:
                                                    </span>
                                                    <p className="text-xs font-semibold text-slate-700 leading-relaxed mt-0.5">
                                                        {node.assignment.teacherNotes}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Pesan Suara Feedback Guru */}
                                        {node.assignment.teacherAudioUrl && (
                                            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5 shadow-2xs">
                                                <div className="flex items-center gap-2 text-xs font-black text-emerald-950">
                                                    <Headphones className="w-4 h-4 text-emerald-700" />
                                                    <span>Dengarkan Pesan Suara dari Guru:</span>
                                                </div>
                                                <audio
                                                    controls
                                                    preload="metadata"
                                                    src={node.assignment.teacherAudioUrl}
                                                    className="w-full h-10 rounded-xl"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tombol Ulangi Kuis (Jika Tipe CBT) */}
                                {node.assignment.type === 'QUIZ_CBT' && (
                                    <div className="flex justify-end pt-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onOpenQuiz(
                                                    node.assignment.id,
                                                    node.assignment.prompt,
                                                    node.assignment.score ?? null
                                                )
                                            }
                                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:translate-y-0.5 text-white text-xs font-black cursor-pointer shadow-xs"
                                        >
                                            Ulangi Kuis CBT
                                        </button>
                                    </div>
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

            {/* Tombol Kembali ke Peta Jalur Petualangan */}
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