import React from 'react';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';

export default function LessonSlideLoading() {
    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-3 sm:p-6 select-none overflow-hidden font-sans">
            {/* 1. Bar Atas: Skeleton Tombol Keluar & Indikator Slide */}
            <header className="w-full max-w-5xl flex items-center justify-between gap-3 text-white pb-2 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 text-slate-400 text-xs sm:text-sm font-black shadow-md animate-pulse">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400/60" />
                    <span>Kembali</span>
                </div>

                {/* Progress Indicator Skeleton */}
                <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl animate-pulse">
                    <Layers className="w-4 h-4 text-amber-400/60" />
                    <div className="w-20 h-4 bg-slate-800 rounded-lg" />
                    <div className="hidden sm:flex items-center gap-1.5 ml-2">
                        <div className="w-6 h-2.5 rounded-full bg-teal-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    </div>
                </div>

                {/* Status Badge Placeholder */}
                <div className="hidden sm:block w-20 h-8 rounded-2xl bg-slate-900/80 border border-slate-800 animate-pulse" />
            </header>

            {/* 2. Kartu Utama Presentasi Skeleton (Paduan tema anak SD) */}
            <main className="w-full max-w-4xl flex-1 flex flex-col justify-center my-auto min-h-0 py-2 sm:py-4">
                <div className="w-full h-full max-h-[80vh] bg-white rounded-3xl sm:rounded-[2.5rem] border-4 sm:border-8 border-slate-200 shadow-2xl overflow-hidden flex flex-col p-5 sm:p-8 md:p-10 relative">
                    {/* Header Kartu: Tag Badge & Audio Placeholder */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6 shrink-0">
                        <div className="w-28 h-6 rounded-xl bg-teal-100/70 border border-teal-200/80 animate-pulse" />
                        <div className="w-24 h-6 rounded-xl bg-amber-100/70 border border-amber-200/80 animate-pulse" />
                    </div>

                    {/* Judul Slide Skeleton */}
                    <div className="space-y-2 mb-6 shrink-0">
                        <div className="w-3/4 max-w-md h-7 sm:h-9 bg-slate-200 rounded-2xl animate-pulse" />
                        <div className="w-1/2 max-w-xs h-6 sm:h-8 bg-slate-100 rounded-2xl animate-pulse" />
                    </div>

                    {/* Konten Grid Skeleton: Teks & Ilustrasi */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center min-h-0">
                        {/* Area Teks Edukatif */}
                        <div className="md:col-span-7 flex flex-col justify-center space-y-3">
                            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200/80 space-y-3">
                                <div className="w-full h-4 bg-slate-200 rounded-lg animate-pulse" />
                                <div className="w-5/6 h-4 bg-slate-200 rounded-lg animate-pulse" />
                                <div className="w-4/6 h-4 bg-slate-200 rounded-lg animate-pulse" />
                                <div className="w-3/4 h-4 bg-slate-100 rounded-lg animate-pulse pt-2" />
                            </div>
                        </div>

                        {/* Area Gambar Ilustrasi */}
                        <div className="md:col-span-5 flex items-center justify-center">
                            <div className="relative w-full aspect-4/3 sm:aspect-square max-h-60 sm:max-h-72 rounded-3xl border-4 border-amber-200 bg-amber-50/70 shadow-md flex flex-col items-center justify-center gap-2 animate-pulse">
                                <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
                                <span className="text-[11px] font-black text-amber-700/80">Menyiapkan Gambar...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 3. Bar Bawah: Skeleton Tombol Navigasi Sebelumnya / Selanjutnya */}
            <footer className="w-full max-w-5xl flex items-center justify-between gap-4 pt-2 z-10">
                <div className="flex-1 sm:flex-initial min-w-[120px] sm:min-w-[160px] h-12 sm:h-14 rounded-2xl bg-slate-800/80 border-2 border-b-4 border-slate-900 animate-pulse flex items-center justify-center text-slate-500 font-black text-xs sm:text-sm">
                    Sebelumnya
                </div>

                <div className="hidden md:flex items-center gap-2 text-slate-500 text-xs font-bold animate-pulse">
                    <span>Sedang memuat materi belajar... 🚀</span>
                </div>

                <div className="flex-1 sm:flex-initial min-w-[120px] sm:min-w-[160px] h-12 sm:h-14 rounded-2xl bg-teal-500/50 border-2 border-b-4 border-teal-800/50 animate-pulse flex items-center justify-center text-teal-950 font-black text-xs sm:text-sm">
                    Selanjutnya
                </div>
            </footer>
        </div>
    );
}
