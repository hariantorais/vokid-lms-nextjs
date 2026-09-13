'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { SubjectProgressItem } from '../../types/student-progress';

interface SubjectProgressGridProps {
    subjects: SubjectProgressItem[];
}

export function SubjectProgressGrid({ subjects }: SubjectProgressGridProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📚</span>
                    <span>Progres Mata Pelajaran</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {subjects.map((sub) => {
                    const percentage = sub.totalBabs > 0 ? Math.round((sub.completedBabs / sub.totalBabs) * 100) : 0;

                    return (
                        <Link
                            key={sub.id}
                            href={`/siswa/bab/${sub.currentBabId}`}
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

                            {/* Progress Bar Mapel */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10.5px] font-bold text-slate-500">
                                    <span>{sub.completedBabs} dari {sub.totalBabs} Bab Selesai</span>
                                    <span className="font-black text-slate-700">{percentage}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                    <div
                                        className="h-full bg-teal-500 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}