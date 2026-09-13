'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Compass } from 'lucide-react';
import type { NextMissionTarget } from '../../types/student-progress';

interface NextMissionCardProps {
    mission: NextMissionTarget | null;
}

export function NextMissionCard({ mission }: NextMissionCardProps) {
    if (!mission) {
        return (
            <div className="p-4 rounded-3xl bg-emerald-50 border-2 border-emerald-200 text-center space-y-1">
                <span className="text-2xl">🎉</span>
                <h4 className="text-xs sm:text-sm font-black text-emerald-900">Semua Misi Tuntas!</h4>
                <p className="text-[11px] font-bold text-emerald-700">Kamu hebat sekali, semua pos belajar telah selesai.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-b-6 border-slate-200 shadow-sm space-y-3">
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
                    Bab {mission.babOrder}
                </span>
            </div>

            <div>
                <span className="text-xs font-bold text-slate-500 block">{mission.subjectName}</span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">{mission.nodeTitle}</h3>
            </div>

            <Link
                href={`/siswa/bab/${mission.babId}`}
                className="w-full h-11 rounded-2xl bg-teal-500 hover:bg-teal-600 active:translate-y-0.5 border-2 border-b-4 border-teal-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
                <Play className="w-4 h-4 fill-white" />
                <span>Lanjutkan Petualangan Sekarang ➔</span>
            </Link>
        </div>
    );
}