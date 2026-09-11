'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Home,
    GraduationCap,
    ArrowLeft,
    RotateCcw,
    Volume2,
    VolumeX,
    ChevronRight,
    MapPinOff,
    Sparkles,
    BookOpen,
    HelpCircle
} from 'lucide-react';

export default function NotFound() {
    const router = useRouter();
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setSpeechSupported(true);
        }
    }, []);

    const speakMessage = () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(
                'Ups, halaman tidak ditemukan! Yuk tekan tombol kembali atau ke beranda.'
            );
            utterance.lang = 'id-ID';
            utterance.rate = 0.95;
            utterance.pitch = 1.1;
            utterance.onend = () => setSoundPlayed(false);
            setSoundPlayed(true);
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex justify-center selection:bg-teal-500 selection:text-white font-sans antialiased">
            {/* Native Mobile Shell: Max 440px on desktop with true native app layout */}
            <main className="w-full max-w-[440px] min-h-screen bg-slate-50 flex flex-col justify-between relative shadow-2xl overflow-hidden">
                
                {/* 1. NATIVE TOP APP BAR */}
                <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        type="button"
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                        aria-label="Kembali"
                    >
                        <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                    </button>

                    <div className="flex flex-col items-center">
                        <span className="text-xs font-black tracking-wider uppercase text-teal-800">
                            Vokid Mobile
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                            Status 404
                        </span>
                    </div>

                    {speechSupported ? (
                        <button
                            onClick={speakMessage}
                            type="button"
                            className="w-10 h-10 rounded-full bg-teal-50 hover:bg-teal-100 active:scale-90 flex items-center justify-center text-teal-700 transition-all cursor-pointer border border-teal-200/70"
                            aria-label="Bantuan Suara"
                        >
                            {soundPlayed ? (
                                <VolumeX className="w-5 h-5 text-amber-500 animate-pulse stroke-[2.5]" />
                            ) : (
                                <Volume2 className="w-5 h-5 stroke-[2.5]" />
                            )}
                        </button>
                    ) : (
                        <div className="w-10 h-10" />
                    )}
                </header>

                {/* 2. NATIVE SCROLLABLE CONTENT BODY */}
                <div className="flex-1 px-5 py-6 flex flex-col items-center justify-center text-center space-y-6">
                    
                    {/* Hero Mascot / Badge (Mobile Native Round Icon) */}
                    <div className="relative">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-linear-to-tr from-teal-500 via-teal-600 to-emerald-600 shadow-xl shadow-teal-600/30 flex items-center justify-center border-4 border-white text-6xl">
                            🧭
                        </div>
                        <div className="absolute -bottom-2 -right-1 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-md border-2 border-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3 fill-slate-950 text-slate-950" />
                            <span>404</span>
                        </div>
                    </div>

                    {/* Typography */}
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200/80 text-teal-900 text-xs font-black">
                            <MapPinOff className="w-3.5 h-3.5 text-teal-700" />
                            <span>Halaman Belum Tersedia</span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            Jalur Tidak Ditemukan
                        </h1>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[280px] mx-auto">
                            Tautan mungkin sudah berganti atau kamu belum memiliki akses ke ruang ini.
                        </p>
                    </div>

                    {/* Native List-Style Quick Actions */}
                    <div className="w-full space-y-2.5 pt-2">
                        <Link
                            href="/siswa"
                            className="w-full min-h-[58px] px-4 py-3 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-300 shadow-sm active:scale-[0.98] active:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-3.5 text-left">
                                <div className="w-11 h-11 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-xs">
                                    <Home className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <div className="font-extrabold text-slate-900 text-sm">
                                        Portal Siswa SD
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-medium">
                                        Kembali ke modul & pelajaran
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        </Link>

                        <Link
                            href="/guru"
                            className="w-full min-h-[58px] px-4 py-3 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 shadow-sm active:scale-[0.98] active:bg-slate-50 transition-all flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-3.5 text-left">
                                <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs">
                                    <GraduationCap className="w-5 h-5 stroke-[2.2]" />
                                </div>
                                <div>
                                    <div className="font-extrabold text-slate-900 text-sm">
                                        Ruang Guru & Kelas
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-medium">
                                        Dasbor nilai dan kelola materi
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        </Link>
                    </div>

                    {/* Secondary Refresh / Retry Button */}
                    <button
                        onClick={() => window.location.reload()}
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-teal-700 active:scale-95 transition-all py-1 cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Muat Ulang Halaman</span>
                    </button>
                </div>

                {/* 3. NATIVE BOTTOM ACTION DOCK */}
                <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-4 pb-6 flex items-center gap-3">
                    <button
                        onClick={handleBack}
                        type="button"
                        className="flex-1 min-h-[50px] rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                        <span>Kembali</span>
                    </button>

                    <Link
                        href="/"
                        className="flex-1 min-h-[50px] rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-teal-600/20"
                    >
                        <Home className="w-4 h-4 stroke-[2.5]" />
                        <span>Beranda</span>
                    </Link>
                </div>
            </main>
        </div>
    );
}