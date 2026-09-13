'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { StudentAvatar } from '@/components/shared/StudentAvatar';

interface StudentHeroGreetingProps {
    studentName: string;
    avatarUrl?: string | null;
}

export function StudentHeroGreeting({
    studentName,
    avatarUrl,
}: StudentHeroGreetingProps) {
    const firstName = studentName.trim().split(' ')[0] || 'Teman';

    return (
        <div className="relative overflow-hidden bg-white rounded-3xl p-4.5 sm:p-6 border-2 border-b-6 border-slate-200 shadow-xs">
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-amber-50 rounded-full blur-sm pointer-events-none" />
            <div className="absolute -bottom-8 right-12 w-24 h-24 bg-teal-50 rounded-full blur-sm pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3.5 sm:gap-4">
                {/* Avatar ukuran LG dengan badge aktif */}
                <StudentAvatar
                    avatarUrl={avatarUrl}
                    studentName={studentName}
                    size="lg"
                    showActiveBadge={true}
                />

                <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="inline-flex items-center gap-1 text-[10.5px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>Selamat Datang</span>
                    </div>

                    <h2 className="text-sm sm:text-base font-black text-slate-900 truncate">
                        Halo, {firstName}! ✨
                    </h2>

                    <p className="text-[11px] sm:text-xs font-bold text-slate-500 leading-snug">
                        Siap melanjutkan petualangan belajarmu hari ini?
                    </p>
                </div>
            </div>
        </div>
    );
}