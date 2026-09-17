'use client';

import React, { useState, useEffect, useCallback, useTransition, useMemo } from 'react';
import Image from 'next/image';
import {
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle2,
    Sparkles,
    Loader2,
    Layers,
    Volume2,
    Award,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { MarkdownContent } from '@/components/common/MarkdownContent';
import { markLessonAsStudiedAction } from '@/features/student/actions/lesson-learning.actions';
import type { LessonWithAssignment } from '../../types/learning-path';

export interface SlideItem {
    tag?: string;
    title: string;
    content: string;
    imageUrl?: string | null;
}

interface LessonSlideOverlayProps {
    lesson: LessonWithAssignment | null;
    isOpen: boolean;
    onClose: () => void;
    onCompleted?: (lessonId: string) => void;
    isInitiallyStudied?: boolean;
}

/**
 * Membaca raw content_text dari lesson:
 * 1. Jika berbentuk JSON array [{ tag, title, content, imageUrl }, ...], gunakan langsung.
 * 2. Jika berbentuk JSON object bertipe multimedia { text, imageUrl, ... }, pecah teksnya atau render.
 * 3. Jika teks biasa, pecah teks tersebut menjadi 1-3 slide yang ramah untuk anak Fase A SD.
 */
function parseContentToSlides(lesson: LessonWithAssignment | null): SlideItem[] {
    if (!lesson) return [];

    const rawText = lesson.content_text?.trim() || '';

    // 1. Coba parse JSON Array Slide
    if (rawText.startsWith('[') && rawText.endsWith(']')) {
        try {
            const parsed = JSON.parse(rawText);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map((item, idx) => ({
                    tag: item.tag || `Bagian ${idx + 1}`,
                    title: item.title || `Langkah ${idx + 1}`,
                    content: item.content || item.text || '',
                    imageUrl: item.imageUrl || item.image || lesson.image_url || null,
                }));
            }
        } catch {
            // Abaikan jika bukan JSON
        }
    }

    // 2. Coba parse JSON Multimedia Object {"text": "...", "imageUrl": "..."}
    let extractedText = rawText;
    let fallbackImage = lesson.image_url;

    if (rawText.startsWith('{') && rawText.endsWith('}')) {
        try {
            const parsedObj = JSON.parse(rawText);
            if (parsedObj.text) {
                extractedText = parsedObj.text;
            }
            if (parsedObj.imageUrl) {
                fallbackImage = parsedObj.imageUrl;
            }
        } catch {
            // Abaikan jika bukan JSON
        }
    }

    // 3. Fallback: Pecah teks biasa menjadi slide 1-3
    if (!extractedText) {
        return [
            {
                tag: 'Materi Belajar',
                title: lesson.title,
                content: lesson.learning_objectives || 'Mari kita simak dan pelajari materi menarik ini bersama-sama!',
                imageUrl: fallbackImage,
            },
        ];
    }

    // Pisahkan berdasarkan heading markdown (## atau ###) atau pembatas paragraf ganda
    const sections = extractedText
        .split(/\n(?=#{1,3}\s+)/g)
        .map((s) => s.trim())
        .filter(Boolean);

    if (sections.length > 1) {
        return sections.map((sec, idx) => {
            const lines = sec.split('\n');
            let slideTitle = `${lesson.title} - Bagian ${idx + 1}`;
            let contentBody = sec;

            if (lines[0].startsWith('#')) {
                slideTitle = lines[0].replace(/^#+\s*/, '').trim();
                contentBody = lines.slice(1).join('\n').trim();
            }

            return {
                tag: `Slide ${idx + 1}`,
                title: slideTitle,
                content: contentBody || lines[0],
                imageUrl: fallbackImage,
            };
        });
    }

    // Jika tidak ada heading, pecah berdasarkan 2 enter kosong
    const paragraphs = extractedText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    if (paragraphs.length >= 3) {
        // Bagi jadi 3 slide
        const chunkSize = Math.ceil(paragraphs.length / 3);
        const p1 = paragraphs.slice(0, chunkSize).join('\n\n');
        const p2 = paragraphs.slice(chunkSize, chunkSize * 2).join('\n\n');
        const p3 = paragraphs.slice(chunkSize * 2).join('\n\n');

        return [
            {
                tag: 'Pengenalan',
                title: `${lesson.title} - Bagian 1`,
                content: p1,
                imageUrl: fallbackImage,
            },
            {
                tag: 'Inti Cerita',
                title: `${lesson.title} - Bagian 2`,
                content: p2,
                imageUrl: fallbackImage,
            },
            {
                tag: 'Kesimpulan Seru',
                title: `${lesson.title} - Bagian 3`,
                content: p3,
                imageUrl: fallbackImage,
            },
        ];
    } else if (paragraphs.length === 2) {
        return [
            {
                tag: 'Awal Belajar',
                title: `${lesson.title} - Bagian 1`,
                content: paragraphs[0],
                imageUrl: fallbackImage,
            },
            {
                tag: 'Ayo Pahami',
                title: `${lesson.title} - Bagian 2`,
                content: paragraphs[1],
                imageUrl: fallbackImage,
            },
        ];
    }

    // Default 1 Slide
    return [
        {
            tag: 'Materi Lengkap',
            title: lesson.title,
            content: extractedText,
            imageUrl: fallbackImage,
        },
    ];
}

export function LessonSlideOverlay({
    lesson,
    isOpen,
    onClose,
    onCompleted,
    isInitiallyStudied = false,
}: LessonSlideOverlayProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStudied, setIsStudied] = useState(isInitiallyStudied);
    const [isPending, startTransition] = useTransition();

    // Reset index saat modal dibuka kembali
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            setIsStudied(isInitiallyStudied);
        }
    }, [isOpen, lesson?.id, isInitiallyStudied]);

    const slides = useMemo(() => parseContentToSlides(lesson), [lesson]);
    const totalSlides = slides.length;
    const currentSlide = slides[currentIndex];
    const isFirstSlide = currentIndex === 0;
    const isLastSlide = currentIndex === totalSlides - 1;

    // Navigasi Next & Prev
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

    // Navigasi Tombol Keyboard (Panah Kanan, Kiri, Escape)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                e.preventDefault();
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleNext, handlePrev, onClose]);

    // Tandai selesai di slide terakhir
    const handleCompleteLesson = () => {
        if (!lesson) return;

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
                    if (onCompleted) {
                        onCompleted(lesson.id);
                    }
                    setTimeout(() => {
                        onClose();
                    }, 1200);
                } else {
                    toast.error(res.error || 'Gagal menandai materi selesai.');
                }
            } catch {
                toast.error('Terjadi kesalahan saat menyimpan status materi.');
            }
        });
    };

    if (!isOpen || !lesson || !currentSlide) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-3 sm:p-6 select-none overflow-hidden font-sans animate-in fade-in duration-200">
            {/* 1. Bar Atas: Tombol Tutup/Keluar & Indikator Slide */}
            <header className="w-full max-w-5xl flex items-center justify-between gap-3 text-white pb-2 z-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-xs sm:text-sm font-black border border-slate-700 text-slate-200 transition-all shadow-md cursor-pointer"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                    <span className="hidden xs:inline">Tutup Slide</span>
                    <span className="xs:hidden">Tutup</span>
                </button>

                {/* Progress Bullets / Bar */}
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
                                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                                    i === currentIndex
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

                {/* Status Selesai Badge */}
                {isStudied ? (
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Tuntas</span>
                    </div>
                ) : (
                    <div className="hidden sm:block w-16" />
                )}
            </header>

            {/* 2. Kartu Utama Presentasi (Warna Putih Responsif untuk Fase A SD) */}
            <main className="w-full max-w-4xl flex-1 flex flex-col justify-center my-auto min-h-0 py-2 sm:py-4">
                <div className="w-full h-full max-h-[80vh] bg-white rounded-3xl sm:rounded-[2.5rem] border-4 sm:border-8 border-slate-200 shadow-2xl overflow-y-auto flex flex-col p-5 sm:p-8 md:p-10 relative transition-all animate-in fade-in-50 zoom-in-95 duration-200">
                    {/* Tag Top Badge */}
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

                    {/* Judul Slide */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-4 sm:mb-6 shrink-0">
                        {currentSlide.title}
                    </h1>

                    {/* Layout Konten: Teks + Gambar */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center overflow-y-auto pr-1">
                        {/* Area Teks / Poin Edukatif */}
                        <div
                            className={`${
                                currentSlide.imageUrl
                                    ? 'md:col-span-7 lg:col-span-7'
                                    : 'md:col-span-12'
                            } flex flex-col justify-center`}
                        >
                            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border-2 border-slate-200/80 shadow-xs">
                                <MarkdownContent
                                    content={currentSlide.content}
                                    size="base"
                                    className="!text-slate-800 !text-base sm:!text-lg !leading-relaxed font-semibold"
                                />
                            </div>
                        </div>

                        {/* Area Gambar Ilustrasi (Jika Ada) */}
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

                    {/* Aksi Khusus Slide Terakhir: Tombol Saya Sudah Paham Semuanya */}
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

            {/* 3. Bar Bawah: Navigasi Panah Kiri & Kanan */}
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

                {/* Petunjuk Pintasan Keyboard di Layar Desktop */}
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
