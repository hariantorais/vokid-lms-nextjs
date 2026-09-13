'use client';

import React from 'react';
import { Star, CheckCircle2, Play, Lock } from 'lucide-react';
import type { PathNodeItem } from '../../types/learning-path';

interface PathNodePopoverProps {
    node: PathNodeItem;
    nodeIdx: number;
    isUnlocked: boolean;
    isDone: boolean;
    onClose: () => void;
    onSelect: (node: PathNodeItem) => void;
}

export function PathNodePopover({
    node,
    nodeIdx,
    isUnlocked,
    isDone,
    onClose,
    onSelect,
}: PathNodePopoverProps) {
    return (
        <>
            {/* Invisible backdrop: klik di luar popover untuk menutup */}
            < div
                className="fixed inset-0 z-30 cursor-default"
                onClick={onClose}
            />

            {/* Popover Card */}
            < div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-40 w-64 sm:w-72 bg-white rounded-3xl p-4 border-2 border-b-6 border-slate-200 shadow-2xl animate-in zoom-in-90 fade-in duration-150" >
                {/* Caret tail ke arah node */}
                < div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-200 rotate-45" />

                <div className="space-y-3 relative z-10 text-center" >
                    <div className="space-y-1" >
                        <span
                            className={
                                `inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${!isUnlocked
                                    ? 'bg-slate-100 text-slate-500 border-slate-200'
                                    : 'bg-teal-50 text-teal-800 border-teal-200'
                                }`
                            }
                        >
                            {!isUnlocked
                                ? '🔒 Pos Terkunci'
                                : node.nodeType === 'LESSON'
                                    ? '📖 Materi Pembelajaran'
                                    : node.assignment.type === 'QUIZ_CBT'
                                        ? '🧠 Kuis CBT'
                                        : node.assignment.type === 'VOICE_TASK'
                                            ? '🎙️ Misi Suara'
                                            : '📷 Misi Foto PR'
                            }
                        </span>

                        < h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2" >
                            {node.title}
                        </h4>
                    </div>

                    {
                        !isUnlocked ? (
                            /* KONDISI: TERKUNCI */
                            <div className="space-y-2.5" >
                                <div className="py-2 px-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-[11px] font-bold leading-relaxed flex items-center gap-2 text-left" >
                                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-base" >
                                        <Lock className="w-4 h-4 text-amber-700 stroke-[2.5]" />
                                    </div>
                                    <p>
                                        Selesaikan < b > Pos {nodeIdx} </b> terlebih dahulu untuk membuka langkah ini!
                                    </p>
                                </div>

                                < button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 active:translate-y-0.5 border-2 border-b-4 border-slate-300 text-slate-600 font-black text-xs flex items-center justify-center transition-all cursor-pointer"
                                >
                                    Nanti
                                </button>
                            </div>
                        ) : (
                            /* KONDISI: TERBUKA */
                            <div className="space-y-2.5" >
                                <div className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-black" >
                                    {
                                        isDone ? (
                                            <span className="text-emerald-700 flex items-center gap-1" >
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                Pos Sudah Selesai!
                                            </span>
                                        ) : (
                                            <span className="text-amber-700 flex items-center gap-1" >
                                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                                Hadiah + 50 Bintang
                                            </span>
                                        )
                                    }
                                </div>

                                < button
                                    type="button"
                                    onClick={() => onSelect(node)}
                                    className={`w-full h-11 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm active:translate-y-1 active:border-b-2 transition-all cursor-pointer ${node.nodeType === 'LESSON'
                                        ? 'bg-teal-500 hover:bg-teal-600 text-white border-teal-700 border-b-5'
                                        : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 border-b-5'
                                        }`}
                                >
                                    <Play className="w-3.5 h-3.5 fill-white" />
                                    <span>{isDone ? 'Buka Kembali' : 'Mulai Sekarang'} </span>
                                </button>

                                < button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full py-1 text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer transition-colors"
                                >
                                    Nanti
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}