'use client';

import React from 'react';

interface BabAdventureProgressBarProps {
    doneCount: number;
    totalCount: number;
}

export function BabAdventureProgressBar({
    doneCount,
    totalCount,
}: BabAdventureProgressBarProps) {
    const percentage = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    return (
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
                    {doneCount}/{totalCount} Pos Selesai
                </span>
            </div>

            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                    className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </section>
    );
}