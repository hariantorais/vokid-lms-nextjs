'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Trophy, Compass, Play, ChevronRight, Target } from 'lucide-react';
import type { StudentDashboardProgressData } from '../../types/student-progress';
import { StudentLayoutShell } from '../StudentLayoutShell';
import { StudentHeroGreeting } from './StudentHeroGreeting';

interface StudentDashboardClientProps {
    data: StudentDashboardProgressData;
}

export function StudentDashboardClient({
    data,
}: StudentDashboardClientProps) {
    const percentage =
        data.totalNodes > 0
            ? Math.round((data.totalCompletedNodes / data.totalNodes) * 100)
            : 0;

    return (
        <StudentLayoutShell maxWidth="sm">
            <div className="space-y-4 pb-8 select-none">
                {/* HERO SAMBUTAN RAMAH & ELEGAN */}
                <StudentHeroGreeting studentName={data.studentName} />

                {/* 1. KARTU STATISTIK PETUALANGAN (TANPA BINTANG) */}
                <section className="bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 rounded-3xl p-5 text-white shadow-md space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                        {/* Kolom 1: Hari Rajin / Streak */}
                        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center border border-white/20 shadow-2xs">
                            <div className="flex items-center gap-1 text-amber-300">
                                <Flame className="w-5 h-5 fill-amber-400 stroke-amber-500 animate-pulse" />
                                <span className="text-base font-black">{data.streakDays}</span>
                            </div>
                            <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wide">
                                Hari Rajin
                            </span>
                        </div>

                        {/* Kolom 2: Pengganti Bintang -> Misi Tuntas (Bisa Diklik ke Halaman Misi) */}
                        <Link
                            href="/siswa/misi"
                            title="Lihat Papan Misi & Pencapaian"
                            className="bg-white/15 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center border border-white/20 shadow-2xs group cursor-pointer"
                        >
                            <div className="flex items-center gap-1 text-sky-200 group-hover:scale-105 transition-transform">
                                <Target className="w-5 h-5 stroke-[2.5]" />
                                <span className="text-base font-black">
                                    {data.totalCompletedNodes}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wide group-hover:text-white transition-colors">
                                Misi Tuntas
                            </span>
                        </Link>

                        {/* Kolom 3: Bab Tuntas */}
                        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center border border-white/20 shadow-2xs">
                            <div className="flex items-center gap-1 text-emerald-200">
                                <Trophy className="w-5 h-5 stroke-[2.5]" />
                                <span className="text-base font-black">{data.totalCompletedNodes}</span>
                            </div>
                            <span className="text-[10px] font-bold text-teal-100 uppercase tracking-wide">
                                Bab Tuntas
                            </span>
                        </div>
                    </div>

                    {/* Meteran Kemajuan Belajar */}
                    <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-xs font-black">
                            <span className="text-teal-100">Total Petualangan</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
                                {percentage}% Selesai
                            </span>
                        </div>
                        <div className="w-full h-3.5 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
                            <div
                                className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </section>

                {/* 2. MISI SELANJUTNYA (CALL TO ACTION) */}
                {data.nextMission ? (
                    <section className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-b-6 border-slate-200 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                                    <Compass className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                                    Misi Selanjutnya
                                </span>
                            </div>
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800">
                                Bab {data.nextMission.babOrder}
                            </span>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-slate-500 block">
                                {data.nextMission.subjectName}
                            </span>
                            <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">
                                {data.nextMission.nodeTitle}
                            </h3>
                        </div>

                        <Link
                            href={`/siswa/bab/${data.nextMission.babId}`}
                            className="w-full h-11 rounded-2xl bg-teal-500 hover:bg-teal-600 active:translate-y-0.5 border-2 border-b-4 border-teal-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                        >
                            <Play className="w-4 h-4 fill-white" />
                            <span>Lanjutkan Petualangan Sekarang ➔</span>
                        </Link>
                    </section>
                ) : null}

                {/* 3. DAFTAR MATA PELAJARAN DENGAN BAR PROGRES DETAIL */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <span>📚</span>
                            <span>Mata Pelajaran Kamu</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {data.subjects.length === 0 ? (
                            <div className="p-6 text-center bg-white rounded-3xl border-2 border-slate-200">
                                <p className="text-xs font-black text-slate-500">
                                    Belum ada mata pelajaran yang terdaftar di kelasmu.
                                </p>
                            </div>
                        ) : (
                            data.subjects.map((sub) => {
                                const subPercentage =
                                    sub.totalBabs > 0
                                        ? Math.round((sub.completedBabs / sub.totalBabs) * 100)
                                        : 0;

                                return (
                                    <Link
                                        key={sub.id}
                                        href={sub.currentBabId ? `/siswa/bab/${sub.currentBabId}` : '#'}
                                        className="bg-white rounded-3xl p-4 border-2 border-b-6 border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col gap-3 group cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                                    {sub.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                                                        {sub.name}
                                                    </h4>
                                                    <span className="text-[11px] font-bold text-slate-500">
                                                        Sedang di Bab {sub.currentBabOrder}: {sub.currentBabTitle}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-slate-400 group-hover:text-teal-600 transition-colors">
                                                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[10.5px] font-bold text-slate-500">
                                                <span>
                                                    {sub.completedBabs} dari {sub.totalBabs} Bab Selesai
                                                </span>
                                                <span className="font-black text-slate-700">
                                                    {subPercentage}%
                                                </span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                                <div
                                                    className="h-full bg-teal-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${subPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </section>
            </div>
        </StudentLayoutShell>
    );
}