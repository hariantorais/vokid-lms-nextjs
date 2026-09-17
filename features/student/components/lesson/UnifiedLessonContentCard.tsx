'use client';

import React from 'react';
import Image from 'next/image';
import { MarkdownContent } from '@/components/common/MarkdownContent';
import Link from 'next/link';
import { Target, FileText, ExternalLink, CheckCircle2, Sparkles, Loader2, Presentation } from 'lucide-react';
import { VideoPlayer } from '@/features/common/components/VideoPlayer';
import { AudioPromptPlayer } from './AudioPromptPlayer';
import { LessonWithAssignment } from '../../services/student-service';

interface UnifiedLessonContentCardProps {
    lesson: LessonWithAssignment;
    isStudied: boolean;
    isPending: boolean;
    onMarkAsStudied: (lessonId: string) => void;
}

export function UnifiedLessonContentCard({
    lesson,
    isStudied,
    isPending,
    onMarkAsStudied,
}: UnifiedLessonContentCardProps) {
    return (
        <section className="bg-white rounded-3xl border-2 border-b-6 border-slate-200/90 p-5 shadow-xs space-y-4">
            {/* Header Info Materi */}
            <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    Pos Materi Terpadu
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1.5 leading-snug">
                    {lesson.title}
                </h2>
            </div>

            {/* 1. Target Belajar / Tujuan Pembelajaran */}
            {lesson.learning_objectives && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-amber-900 font-black text-[11px] uppercase tracking-wider mb-1">
                        <Target className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Target Belajar Kita:</span>
                    </div>
                    <div className="pl-5">
                        <MarkdownContent
                            content={lesson.learning_objectives}
                            size="xs"
                            className="!text-amber-950"
                        />
                    </div>
                </div>
            )}

            {/* 2. Gambar Ilustrasi Materi */}
            {lesson.image_url && (
                <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-inner">
                    <Image
                        src={lesson.image_url}
                        alt={lesson.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 600px"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* 3. Teks Bacaan Materi */}
            {lesson.content_text && (
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100">
                    <MarkdownContent
                        content={lesson.content_text}
                        size="sm"
                        className="!text-slate-800"
                    />
                </div>
            )}

            {/* 4. Audio Penjelasan Guru (Opsional) */}
            {lesson.audio_url && (
                <AudioPromptPlayer
                    audioUrl={lesson.audio_url}
                    title="Dengarkan Suara Ibu / Bapak Guru"
                />
            )}

            {/* 5. Video Panduan Belajar (Opsional) */}
            {lesson.content_url && (
                <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-xs">
                    <VideoPlayer url={lesson.content_url} title={lesson.title} />
                </div>
            )}

            {/* 6. Dokumen PDF Lembar Materi (Opsional) */}
            {lesson.pdf_url && (
                <a
                    href={lesson.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 flex items-center justify-between text-rose-900 text-xs font-black transition-all group"
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                        <span>Buka Lembar PDF Bacaan</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-rose-500" />
                </a>
            )}

            {/* ========================================================================= */}
            {/* TOMBOL GERBANG: SAYA SUDAH MEMPELAJARI MATERI & MODE SLIDE LAYAR PENUH */}
            {/* ========================================================================= */}
            <div className="pt-2 space-y-2.5">
                {/* Tombol Link Mode Layar Penuh */}
                <Link
                    href={`/siswa/pelajaran/${lesson.id}/slide`}
                    className="w-full min-h-[48px] rounded-2xl bg-amber-400 hover:bg-amber-300 border-2 border-b-6 border-amber-700 active:border-b-2 active:translate-y-1 text-amber-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                    <Presentation className="w-4 h-4 text-amber-900" />
                    <span>Buka Materi Layar Penuh ➔</span>
                </Link>

                {isStudied ? (
                    <div className="p-3.5 rounded-2xl bg-emerald-100/80 border-2 border-emerald-300 text-emerald-950 text-xs font-black flex items-center justify-center gap-2 shadow-2xs animate-in zoom-in-95">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Kamu sudah mempelajari materi ini! Misi tugas di bawah sudah terbuka 🎉</span>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => onMarkAsStudied(lesson.id)}
                        disabled={isPending}
                        className="w-full min-h-[50px] rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 border-2 border-b-6 border-teal-800 active:border-b-2 active:translate-y-1 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Menyimpan status...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                <span>Saya Sudah Mempelajari Materi 👍</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </section>
    );
}