'use client';

import React, { useState, useEffect, useCallback, useTransition, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Sparkles,
    Loader2,
    Layers,
    Volume2,
    Award
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { MarkdownContent } from '@/components/common/MarkdownContent';
import { markLessonAsStudiedAction } from '@/features/student/actions/lesson-learning.actions';
import type { Lesson } from '@/types/database';

export interface SlideItem {
    tag?: string;
    title: string;
    content: string;
    imageUrl?: string | null;
}

interface LessonSlideReaderProps {
    lesson: Lesson;
    backUrl?: string;
    isInitiallyStudied?: boolean;
}

/**
 * Membersihkan komentar HTML dengan segala variasi penutup (minus ganda, em-dash, tanda panah unicode, entitas)
 */
function cleanHtmlComments(text: string): string {
    if (!text) return '';
    return text
        .replace(/<!--[\s\S]*?(?:-->|—>|–>|→|&rarr;|&gt;|>)/gi, '')
        .replace(/&lt;!--[\s\S]*?(?:--&gt;|—&gt;|–&gt;|→|&rarr;|&gt;|>)/gi, '')
        .replace(/^[ \t]*<?!--[^\n]*>?/gim, '')
        .trim();
}

/**
 * Membaca raw content_text dari lesson:
 * 1. Mengurai JSON array [{ tag, title, content, imageUrl }, ...] jika ada.
 * 2. Membagi slide berdasarkan pemisah '---' atau '***'.
 * 3. Fallback: Membagi per heading markdown (# / ## / ###) atau paragraf.
 */
function parseContentToSlides(lesson: Lesson): SlideItem[] {
    const rawText = lesson.content_text?.trim() || '';

    // 1. Coba parse jika formatnya berupa JSON Array Slide
    if (rawText.startsWith('[') && rawText.endsWith(']')) {
        try {
            const parsed = JSON.parse(rawText);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map((item, idx) => ({
                    tag: item.tag || `Lembar ${idx + 1}`,
                    title: cleanHtmlComments(item.title || `Langkah ${idx + 1}`),
                    content: cleanHtmlComments(item.content || item.text || ''),
                    imageUrl: item.imageUrl || item.image || lesson.image_url || null,
                }));
            }
        } catch {
            // Lanjut ke fallback pengolahan teks markdown
        }
    }

    // 2. Bersihkan komentar HTML dan entitas panah
    const sanitizedText = cleanHtmlComments(rawText);
    const fallbackImage = lesson.image_url || null;

    if (!sanitizedText) {
        return [
            {
                tag: 'Materi Belajar',
                title: cleanHtmlComments(lesson.title),
                content: lesson.learning_objectives || 'Mari kita simak dan pelajari materi menarik ini bersama-sama!',
                imageUrl: fallbackImage,
            },
        ];
    }

    // 3. Pecah slide berdasarkan pembatas horizontal '---' atau '***'
    const rawSlideBlocks = sanitizedText
        .split(/\n\s*(?:---+|\*\*\*+)\s*\n/g)
        .map((b) => cleanHtmlComments(b))
        .filter(Boolean);

    if (rawSlideBlocks.length > 1) {
        return rawSlideBlocks.map((block, idx) => {
            const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
            let slideTitle = `${lesson.title} - Bagian ${idx + 1}`;
            let bodyContent = block;

            if (lines.length > 0 && lines[0].startsWith('#')) {
                slideTitle = cleanHtmlComments(lines[0].replace(/^#+\s*/, '')).trim();
                bodyContent = lines.slice(1).join('\n').trim();
            }

            return {
                tag: `Lembar ${idx + 1}`,
                title: cleanHtmlComments(slideTitle) || `${lesson.title} - Bagian ${idx + 1}`,
                content: cleanHtmlComments(bodyContent),
                imageUrl: fallbackImage,
            };
        });
    }

    // 4. Fallback pembagian slide per Heading jika pembatas '---' tidak ditemukan
    const headingSections = sanitizedText
        .split(/\n(?=#{1,3}\s+)/g)
        .map((s) => cleanHtmlComments(s))
        .filter((s) => s.length > 0);

    if (headingSections.length > 1) {
        return headingSections.map((sec, idx) => {
            const lines = sec.split('\n').map((l) => l.trim()).filter(Boolean);
            let slideTitle = `${lesson.title} - Bagian ${idx + 1}`;
            let bodyContent = sec;

            if (lines.length > 0 && lines[0].startsWith('#')) {
                slideTitle = cleanHtmlComments(lines[0].replace(/^#+\s*/, '')).trim();
                bodyContent = lines.slice(1).join('\n').trim();
            }

            return {
                tag: `Lembar ${idx + 1}`,
                title: cleanHtmlComments(slideTitle) || `${lesson.title} - Bagian ${idx + 1}`,
                content: cleanHtmlComments(bodyContent) || lines[0] || slideTitle,
                imageUrl: fallbackImage,
            };
        });
    }

    // 5. Default 1 lembar utuh
    return [
        {
            tag: 'Materi Lengkap',
            title: cleanHtmlComments(lesson.title),
            content: sanitizedText,
            imageUrl: fallbackImage,
        },
    ];
}

export function LessonSlideReader({
    lesson,
    backUrl,
    isInitiallyStudied = false,
}: LessonSlideReaderProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStudied, setIsStudied] = useState(isInitiallyStudied);
    const [isPending, startTransition] = useTransition();

    const slides = useMemo(() => parseContentToSlides(lesson), [lesson]);
    const totalSlides = slides.length;
    const currentSlide = slides[currentIndex];
    const isFirstSlide = currentIndex === 0;
    const isLastSlide = currentIndex === totalSlides - 1;

    const handleNext = useCallback(() => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    }, [currentIndex, totalSlides]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }, [currentIndex]);

    // Navigasi keyboard (Panah Kiri, Kanan, Spasi, Escape)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                e.preventDefault();
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'Escape') {
                if (backUrl) {
                    router.push(backUrl);
                } else {
                    router.back();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, backUrl, router]);

    const targetBackUrl = backUrl || (lesson.module_id ? `/siswa/bab/${lesson.module_id}` : '/siswa');

    const handleCompleteLesson = () => {
        startTransition(async () => {
            try {
                const res = await markLessonAsStudiedAction(lesson.id);
                if (res.success) {
                    setIsStudied(true);
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                    });
                    toast.success('Hore! Kamu hebat sudah menyelesaikan materi ini! 🎉');
                    setTimeout(() => {
                        router.push(targetBackUrl);
                    }, 1200);
                } else {
                    toast.error(res.error || 'Gagal menandai materi selesai.');
                }
            } catch {
                toast.error('Terjadi kesalahan saat menyimpan status materi.');
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-3 sm:p-6 select-none overflow-hidden font-sans">
            {/* 1. Header Bar: Tombol Keluar & Indikator Slide */}
            <header className="w-full max-w-5xl flex items-center justify-between gap-3 text-white pb-2 z-10">
                <Link
                    href={targetBackUrl}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-xs sm:text-sm font-black border border-slate-700 text-slate-200 transition-all shadow-md"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                    <span className="hidden xs:inline">Keluar Slide</span>
                    <span className="xs:hidden">Kembali</span>
                </Link>

                {/* Indikator Slide Bullets */}
                <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-black text-amber-300">
                        Slide {currentIndex + 1} / {totalSlides}
                    </span>
                    <div className="hidden sm:flex items-center gap-1.5 ml-2">
                        {slides.map((_, i: number) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2.5 rounded-full transition-all cursor-pointer ${i === currentIndex
                                        ? 'w-6 bg-teal-400'
                                        : i < currentIndex
                                            ? 'w-2.5 bg-teal-600/70'
                                            : 'w-2.5 bg-slate-700'
                                    }`}
                                aria-label={`Menuju slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Badge Status Selesai */}
                {isStudied && (
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Tuntas</span>
                    </div>
                )}
            </header>

            {/* 2. Kartu Utama Slide */}
            <main className="w-full max-w-4xl flex-1 flex flex-col justify-center my-auto min-h-0 py-2 sm:py-4">
                <div className="w-full h-full max-h-[80vh] bg-white rounded-3xl sm:rounded-[2.5rem] border-4 sm:border-8 border-slate-200 shadow-2xl overflow-y-auto flex flex-col p-5 sm:p-8 md:p-10 relative transition-all animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4 shrink-0">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-3.5 py-1 rounded-xl border border-teal-200">
                            {currentSlide.tag || 'Materi Seru'}
                        </span>
                        {lesson.audio_url && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                                Audio Tersedia
                            </span>
                        )}
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-4 sm:mb-6 shrink-0">
                        {cleanHtmlComments(currentSlide.title)}
                    </h1>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center overflow-y-auto pr-1">
                        <div
                            className={`${currentSlide.imageUrl
                                    ? 'md:col-span-7 lg:col-span-7'
                                    : 'md:col-span-12'
                                } flex flex-col justify-center`}
                        >
                            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border-2 border-slate-200/80 shadow-xs">
                                <MarkdownContent
                                    content={cleanHtmlComments(currentSlide.content)}
                                    size="base"
                                    className="!text-slate-800 !text-base sm:!text-lg !leading-relaxed font-semibold"
                                />
                            </div>
                        </div>

                        {currentSlide.imageUrl && (
                            <div className="md:col-span-5 lg:col-span-5 flex items-center justify-center">
                                <div className="relative w-full aspect-4/3 sm:aspect-square max-h-60 sm:max-h-80 rounded-3xl overflow-hidden border-4 border-amber-200 bg-amber-50 shadow-md">
                                    <Image
                                        src={currentSlide.imageUrl}
                                        alt={currentSlide.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tombol Tuntas di Slide Terakhir */}
                    {isLastSlide && (
                        <div className="mt-6 pt-4 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm font-bold">
                                <Award className="w-5 h-5 text-amber-500 shrink-0" />
                                <span>Kamu sudah tiba di slide terakhir materi ini!</span>
                            </div>

                            {isStudied ? (
                                <div className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>Sudah Dipelajari & Paham! 🎉</span>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleCompleteLesson}
                                    disabled={isPending}
                                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-2 border-b-6 border-emerald-800 active:border-b-2 active:translate-y-1 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all disabled:opacity-50"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Menyimpan Prestasi...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 text-amber-300" />
                                            <span>Saya Sudah Paham Semuanya! 👍</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* 3. Footer Bar: Navigasi Panah Kiri & Kanan */}
            <footer className="w-full max-w-5xl flex items-center justify-between gap-4 pt-2 z-10">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isFirstSlide}
                    className="flex-1 sm:flex-initial min-w-[120px] sm:min-w-[160px] h-12 sm:h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 border-2 border-b-4 border-slate-900 disabled:opacity-30 disabled:pointer-events-none text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                    <ChevronLeft className="w-5 h-5 text-teal-300" />
                    <span>Sebelumnya</span>
                </button>

                <span className="hidden md:inline-block text-[11px] text-slate-400 font-bold bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
                    Gunakan tombol keyboard <kbd className="text-amber-300 font-mono">←</kbd> dan <kbd className="text-amber-300 font-mono">→</kbd> untuk berpindah
                </span>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLastSlide}
                    className="flex-1 sm:flex-initial min-w-[120px] sm:min-w-[160px] h-12 sm:h-14 rounded-2xl bg-teal-500 hover:bg-teal-400 active:scale-95 border-2 border-b-4 border-teal-800 disabled:opacity-30 disabled:pointer-events-none text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-5 h-5 text-slate-950" />
                </button>
            </footer>
        </div>
    );
}