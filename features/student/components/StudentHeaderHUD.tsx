'use client';

import React from 'react';
import Link from 'next/link';
import { useStudent } from '../context/StudentContext';
import { StudentAvatar } from './StudentAvatar';

export function StudentHeaderHUD() {
    const { studentId, studentName, avatarUrl, totalStars } = useStudent();

    return (
        <header className="sticky top-0 z-30 bg-transparent py-3 px-4 pointer-events-none">
            <div className="mx-auto flex items-center justify-between gap-3 max-w-sm sm:max-w-xl md:max-w-2xl">
                {/* KIRI: HOME DASHBOARD */}
                <div className="flex items-center gap-2 pointer-events-auto">
                    <Link
                        href="/siswa"
                        title="Ke Dashboard"
                        className="w-11 h-11 rounded-2xl bg-white hover:bg-amber-50 active:translate-y-0.5 border-2 border-b-4 border-amber-300 text-amber-900 flex items-center justify-center text-xl transition-all cursor-pointer shadow-sm shrink-0 select-none"
                    >
                        🏡
                    </Link>
                </div>

                {/* KANAN: BINTANG TETAP & AVATAR KONSISTEN */}
                <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
                    <Link
                        href="/siswa/misi"
                        title="Misi Petualang"
                        className="flex items-center gap-1.5 bg-white/95 hover:bg-amber-50 active:translate-y-0.5 backdrop-blur-xs border-2 border-b-4 border-amber-300 px-3 py-1.5 rounded-2xl shadow-xs transition-all cursor-pointer"
                    >
                        <span className="text-base">⭐</span>
                        <span className="text-xs sm:text-sm font-black text-amber-950">
                            {totalStars}
                        </span>
                    </Link>

                    <Link
                        href="/siswa/profil"
                        title="Profil Petualang"
                        className="transition-transform active:translate-y-0.5 cursor-pointer block"
                    >
                        <StudentAvatar
                            avatarUrl={avatarUrl}
                            studentName={studentId || studentName}
                            size="md"
                            className="shadow-xs"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}