'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Search,
    Clock,
    CheckCircle2,
    Volume2,
    FileImage,
    Award,
    ChevronRight,
} from 'lucide-react';
import { TeacherLayoutShell } from './TeacherLayoutShell';
import { StudentAvatar } from '@/components/shared/StudentAvatar';
import type { TeacherGradingListItem } from '../services/teacher-service';

interface TeacherGradingListViewProps {
    items: TeacherGradingListItem[];
    counts: {
        pending: number;
        graded: number;
        total: number;
    };
}

type TabType = 'PENDING' | 'GRADED';

export function TeacherGradingListView({
    items,
    counts,
}: TeacherGradingListViewProps) {
    const [activeTab, setActiveTab] = useState<TabType>('PENDING');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchTab = item.status === activeTab;
            const query = searchQuery.trim().toLowerCase();
            const matchSearch =
                !query ||
                item.studentName.toLowerCase().includes(query) ||
                item.subjectName.toLowerCase().includes(query) ||
                item.lessonTitle.toLowerCase().includes(query);

            return matchTab && matchSearch;
        });
    }, [items, activeTab, searchQuery]);

    return (
        <TeacherLayoutShell
            title="Penilaian Tugas"
            subtitle="Periksa dan evaluasi pengerjaan siswa"
            badgeText="Koreksi"
            badgeVariant="purple"
            activeNavTab="HOME"
            maxWidth="sm"
        >
            <div className="space-y-4 pb-12 select-none">
                {/* Kolom Pencarian Cepat */}
                <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Cari siswa, mapel, atau materi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-2xs"
                    />
                </div>

                {/* 2 Tab Filter: Menunggu & Selesai */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
                    <button
                        type="button"
                        onClick={() => setActiveTab('PENDING')}
                        className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'PENDING'
                                ? 'bg-white text-amber-700 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Menunggu ({counts.pending})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('GRADED')}
                        className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'GRADED'
                                ? 'bg-white text-emerald-700 shadow-xs'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesai ({counts.graded})</span>
                    </button>
                </div>

                {/* List Kartu Tugas */}
                <div className="space-y-2.5">
                    {filteredItems.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-1">
                            <p className="text-xs font-bold text-slate-700">
                                Tidak ada tugas pada kategori ini.
                            </p>
                            <p className="text-[11px] font-medium text-slate-400">
                                {activeTab === 'PENDING'
                                    ? 'Semua tugas yang masuk telah selesai diperiksa! 🎉'
                                    : 'Belum ada tugas yang selesai dinilai.'}
                            </p>
                        </div>
                    ) : (
                        filteredItems.map((item) => {
                            const isGraded = item.status === 'GRADED';
                            const formattedDate = new Date(item.submittedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                            });

                            return (
                                <Link
                                    key={item.id}
                                    href={`/guru/penilaian/${item.id}`}
                                    className={`block p-4 rounded-3xl border-2 transition-all shadow-2xs hover:shadow-sm ${isGraded
                                            ? 'bg-white border-slate-200 hover:border-emerald-300'
                                            : 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-3 mb-2.5">
                                        {/* Siswa & Kelas */}
                                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            <StudentAvatar
                                                avatarUrl={item.studentAvatar}
                                                studentName={item.studentName}
                                                size="sm"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                                                    {item.studentName}
                                                </h4>
                                                <p className="text-[10.5px] font-bold text-slate-400 truncate">
                                                    {item.className} • {formattedDate}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Badge Status */}
                                        {isGraded ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-black text-xs shrink-0">
                                                <Award className="w-3.5 h-3.5 text-emerald-600" />
                                                <span>{item.score ?? 0} Poin</span>
                                            </div>
                                        ) : (
                                            <div className="px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-900 rounded-xl font-black text-[11px] shrink-0 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                                <span>Periksa</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Detail Tugas */}
                                    <div className="p-2.5 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-purple-700">
                                                {item.taskType === 'VOICE_TASK' ? (
                                                    <Volume2 className="w-3.5 h-3.5 shrink-0" />
                                                ) : (
                                                    <FileImage className="w-3.5 h-3.5 shrink-0" />
                                                )}
                                                <span className="truncate">
                                                    {item.subjectName} • {item.taskType === 'VOICE_TASK' ? 'Tugas Suara' : 'Foto PR'}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-700 truncate mt-0.5">
                                                {item.lessonTitle}
                                            </p>
                                        </div>

                                        <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                                            <ChevronRight className="w-4 h-4 text-slate-400" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </TeacherLayoutShell>
    );
}