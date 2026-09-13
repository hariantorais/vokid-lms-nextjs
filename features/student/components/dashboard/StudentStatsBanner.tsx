'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Target, MapPin } from 'lucide-react';

interface StudentStatsBannerProps {
    streakDays: number;
    completedNodes: number;
    totalNodes: number;
    completedTasksCount?: number;
    totalTasksCount?: number;
}

export function StudentStatsBanner({
    streakDays,
    completedNodes,
    totalNodes,
    completedTasksCount = 0,
    totalTasksCount = 0,
}: StudentStatsBannerProps) {
    const percentage = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

    return (
        <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 rounded-3xl p-5 text-white shadow-lg space-y-4 select-none">
            <div className="grid grid-cols-3 gap-2">
                {/* 1. KONSISTENSI BELAJAR */}
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center border border-white/20 shadow-2xs">
                    <div className="flex items-center gap-1 text-amber-300">
                        <Flame className="w-5 h-5 fill-amber-400 stroke-amber-500 animate-pulse" />
                        <span className="text-base font-black">{streakDays}</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wide">
                        Hari Rajin
                    </span>
                </div>

                {/* 2. STATISTIK MISI/TUGAS (KLIK MENUJU HALAMAN MISI) */}
                <Link
                    href="/siswa/misi"
                    title="Lihat Papan Misi Belajar"
                    className="bg-white/15 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center border border-white/20 shadow-2xs group cursor-pointer"
                >
                    <div className="flex items-center gap-1 text-sky-200 group-hover:scale-105 transition-transform">
                        <Target className="w-5 h-5 stroke-[2.5]" />
                        <span className="text-base font-black">
                            {completedTasksCount}
                            {totalTasksCount > 0 && (
                                <span className="text-[11px] font-bold text-teal-100/90">/{totalTasksCount}</span>
                            )}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wide group-hover:text-white transition-colors">
                        Misi Tuntas
                    </span>
                </Link>

                {/* 3. PROGRES POS MATERI */}
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center border border-white/20 shadow-2xs">
                    <div className="flex items-center gap-1 text-emerald-200">
                        <MapPin className="w-5 h-5 stroke-[2.5]" />
                        <span className="text-base font-black">{completedNodes}</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wide">
                        Pos Takluk
                    </span>
                </div>
            </div>

            {/* METERAN JALUR PETUALANGAN */}
            <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-teal-100">Total Jalur Terjelajahi</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
                        {percentage}% Selesai
                    </span>
                </div>
                <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
                    <div
                        className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}