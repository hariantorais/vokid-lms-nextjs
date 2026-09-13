'use client';

import React from 'react';
import Link from 'next/link';
import {
    CheckCircle2,
    Lock,
    BookOpen,
    ListChecks,
    Mic,
    Camera,
    ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { cleanModuleTitle } from '@/lib/formatters';
import { PathNodePopover } from './PathNodePopover';
import type { PathNodeItem } from '../../types/learning-path';
import type { Module } from '@/types/database';

// Ganti baris definisi props di BabAdventurePath.tsx:

interface BabAdventurePathProps {
    pathNodes: PathNodeItem[];
    previewNode: { node: PathNodeItem; nodeIdx: number; isUnlocked: boolean } | null;
    moduleOrderIndex: number;
    nextModule?: {
        id: string;
        title: string;
        order_index: number;
    } | null;
    classId?: string;
    isNodeUnlocked: (nodeIdx: number) => boolean;
    isNodeCompleted: (node: PathNodeItem) => boolean;
    isChapterFullyCompleted: boolean;
    onSelectNodePreview: (node: PathNodeItem, nodeIdx: number, isUnlocked: boolean) => void;
    onClosePreview: () => void;
    onFocusNode: (node: PathNodeItem) => void;
}
export function BabAdventurePath({
    pathNodes,
    previewNode,
    moduleOrderIndex,
    nextModule,
    classId,
    isNodeUnlocked,
    isNodeCompleted,
    isChapterFullyCompleted,
    onSelectNodePreview,
    onClosePreview,
    onFocusNode,
}: BabAdventurePathProps) {
    const totalCount = pathNodes.length;
    const doneCount = pathNodes.filter(isNodeCompleted).length;

    if (totalCount === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200 shadow-2xs">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl mb-2">
                    ⛺
                </div>
                <p className="text-xs sm:text-sm font-black text-slate-700">Belum ada pos materi di bab ini.</p>
            </div>
        );
    }

    return (
        <div className="relative py-4 flex flex-col items-center select-none">
            <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-7">
                {pathNodes.map((node, nodeIdx) => {
                    const isUnlocked = isNodeUnlocked(nodeIdx);
                    const isDone = isNodeCompleted(node);
                    const isCurrentActive = isUnlocked && !isDone;
                    const isSelected = previewNode?.nodeIdx === nodeIdx;

                    const offsets = [
                        'translate-x-0',
                        '-translate-x-10 sm:-translate-x-14',
                        'translate-x-0',
                        'translate-x-10 sm:translate-x-14',
                    ];
                    const offsetClass = offsets[nodeIdx % offsets.length];

                    return (
                        <div
                            key={node.id}
                            className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                        >
                            {isCurrentActive && !isSelected && (
                                <div className="mb-2 px-3 py-1 rounded-xl bg-teal-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md border-2 border-teal-400 flex items-center gap-1 z-20 animate-bounce">
                                    <span>Mulai Disini! 🎯</span>
                                </div>
                            )}

                            <div className="relative">
                                {isSelected && (
                                    <PathNodePopover
                                        node={node}
                                        nodeIdx={nodeIdx}
                                        isUnlocked={isUnlocked}
                                        isDone={isDone}
                                        onClose={onClosePreview}
                                        onSelect={(target) => onFocusNode(target)}
                                    />
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (previewNode?.nodeIdx === nodeIdx) {
                                            onClosePreview();
                                        } else {
                                            onSelectNodePreview(node, nodeIdx, isUnlocked);
                                        }
                                    }}
                                    className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 flex items-center justify-center text-2xl sm:text-3xl shadow-lg transition-all cursor-pointer select-none active:scale-95 ${!isUnlocked
                                        ? 'bg-slate-200 border-b-6 border-slate-400 text-slate-400 opacity-80 hover:brightness-105'
                                        : isDone
                                            ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 border-b-6 border-emerald-700 text-white active:border-b-2 active:translate-y-1 hover:brightness-105'
                                            : node.nodeType === 'LESSON'
                                                ? 'bg-gradient-to-tr from-teal-400 to-cyan-500 border-b-6 border-teal-700 text-white ring-4 ring-teal-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                                : node.assignment.type === 'QUIZ_CBT'
                                                    ? 'bg-gradient-to-tr from-amber-400 to-orange-500 border-b-6 border-amber-700 text-white ring-4 ring-amber-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                                    : node.assignment.type === 'VOICE_TASK'
                                                        ? 'bg-gradient-to-tr from-purple-400 to-indigo-500 border-b-6 border-purple-700 text-white ring-4 ring-purple-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                                        : 'bg-gradient-to-tr from-sky-400 to-blue-500 border-b-6 border-sky-700 text-white ring-4 ring-sky-200 active:border-b-2 active:translate-y-1 hover:brightness-105'
                                        }`}
                                    title={node.title}
                                >
                                    {!isUnlocked ? (
                                        <Lock className="w-8 h-8 text-slate-400 stroke-[2.5]" />
                                    ) : isDone ? (
                                        <CheckCircle2 className="w-9 h-9 text-white stroke-[2.5]" />
                                    ) : node.nodeType === 'LESSON' ? (
                                        <BookOpen className="w-8 h-8 text-white stroke-[2.5]" />
                                    ) : node.assignment.type === 'QUIZ_CBT' ? (
                                        <ListChecks className="w-8 h-8 text-white stroke-[2.5]" />
                                    ) : node.assignment.type === 'VOICE_TASK' ? (
                                        <Mic className="w-8 h-8 text-white stroke-[2.5]" />
                                    ) : (
                                        <Camera className="w-8 h-8 text-white stroke-[2.5]" />
                                    )}
                                </button>

                                <div className="mt-1.5 flex flex-col items-center gap-0.5">
                                    <span
                                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border shadow-2xs ${!isUnlocked
                                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                                            : 'bg-white text-slate-700 border-slate-200'
                                            }`}
                                    >
                                        Pos {nodeIdx + 1}
                                    </span>
                                    <span className="text-[9.5px] font-bold text-slate-400 max-w-[80px] truncate text-center">
                                        {node.nodeType === 'LESSON' ? 'Materi' : 'Misi Tugas'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full max-w-xs my-6 border-t-2 border-dashed border-slate-300" />

            {/* Navigasi Bab Berikutnya */}
            <div className="w-full max-w-sm px-4">
                {nextModule ? (
                    isChapterFullyCompleted ? (
                        <Link
                            href={`/siswa/bab/${nextModule.id}`}
                            className="w-full min-h-[56px] p-4 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 border-3 border-b-6 border-orange-700 active:border-b-2 active:translate-y-1 text-white shadow-lg flex items-center justify-between gap-3 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
                                    🚀
                                </div>
                                <div className="min-w-0 text-left">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-100 bg-black/15 px-2 py-0.5 rounded-md">
                                        Bab Terbuka! • Bab {nextModule.order_index}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                                        {cleanModuleTitle(nextModule.title)}
                                    </h4>
                                </div>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-white text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
                                <ChevronRight className="w-5 h-5 stroke-[3]" />
                            </div>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={() =>
                                toast.error(
                                    `Selesaikan seluruh ${totalCount} pos di Bab ${moduleOrderIndex} ini terlebih dahulu ya! 🔒`
                                )
                            }
                            className="w-full min-h-[56px] p-4 rounded-3xl bg-slate-100 border-3 border-b-6 border-slate-300 text-slate-400 flex items-center justify-between gap-3 cursor-not-allowed opacity-80"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-11 h-11 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-xl shrink-0">
                                    <Lock className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <div className="min-w-0 text-left">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md">
                                        Terkunci • Bab {nextModule.order_index}
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-500 truncate mt-0.5">
                                        {cleanModuleTitle(nextModule.title)}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-slate-400 px-2 py-1 bg-slate-200/60 rounded-xl">
                                {doneCount}/{totalCount} Pos
                            </div>
                        </button>
                    )
                ) : (
                    <Link
                        href={classId ? `/siswa/kelas/${classId}` : '/siswa'}
                        className="w-full min-h-[56px] p-4 rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 border-3 border-b-6 border-teal-800 active:border-b-2 active:translate-y-1 text-white shadow-lg flex items-center justify-between gap-3 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0 border border-white/30">
                                🏆
                            </div>
                            <div className="min-w-0 text-left">
                                <span className="text-[10px] font-black uppercase tracking-wider text-teal-100 bg-black/15 px-2 py-0.5 rounded-md">
                                    Hore! Bab Terakhir Selesai
                                </span>
                                <h4 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                                    Kembali ke Daftar Bab & Kelas
                                </h4>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-white text-teal-700 flex items-center justify-center shrink-0 shadow-xs">
                            <ChevronRight className="w-5 h-5 stroke-[3]" />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}