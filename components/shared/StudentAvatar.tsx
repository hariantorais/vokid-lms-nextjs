'use client';

import React from 'react';
import Image from 'next/image';
import { type TrophyTier, TROPHY_TIER_STYLES } from '@/features/student/types/trophy';

interface StudentAvatarProps {
    avatarUrl?: string | null;
    studentName: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showActiveBadge?: boolean;
    trophyTier?: TrophyTier;
    badgeIcon?: string | null;
    className?: string;
}

function isValidHttpUrl(stringUrl: string): boolean {
    try {
        const url = new URL(stringUrl);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

export function StudentAvatar({
    avatarUrl,
    studentName,
    size = 'md',
    showActiveBadge = false,
    trophyTier = 'NONE',
    badgeIcon,
    className = '',
}: StudentAvatarProps) {
    const sizeClass = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-11 h-11 text-sm',
        lg: 'w-14 h-14 text-base',
        xl: 'w-20 h-20 text-xl',
    }[size];

    const emojiSizeClass = {
        sm: 'text-sm',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-4xl',
    }[size];

    const ringStyle = TROPHY_TIER_STYLES[trophyTier] ?? TROPHY_TIER_STYLES.NONE;
    const initial = studentName?.trim()?.charAt(0)?.toUpperCase() || 'P';

    // Validasi: hanya lolos jika URL web (http/https) atau relative path root Next.js (/...)
    const isImageSrc =
        typeof avatarUrl === 'string' &&
        (isValidHttpUrl(avatarUrl) || (avatarUrl.startsWith('/') && !avatarUrl.startsWith('//')));

    return (
        <div className={`relative inline-block select-none ${className}`}>
            {/* LINGKARAN CINCIN TROFI */}
            <div
                className={`rounded-full overflow-hidden flex items-center justify-center bg-slate-100 transition-all ${sizeClass} ${ringStyle.containerRing}`}
            >
                {isImageSrc ? (
                    <Image
                        src={avatarUrl as string}
                        alt={studentName || 'Avatar'}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                    />
                ) : avatarUrl ? (
                    // JIKA BERISI EMOJI SEPERTI "🦊", RENDER TEXT SPAN BIASA
                    <span className={`${emojiSizeClass} leading-none flex items-center justify-center`}>
                        {avatarUrl}
                    </span>
                ) : (
                    // FALLBACK INISIAL
                    <span className="font-black text-slate-600">{initial}</span>
                )}
            </div>

            {/* BADGE ICON TROFI DI POJOK */}
            {badgeIcon && (
                <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs border shadow-xs ${ringStyle.badgeBg} ${ringStyle.badgeBorder}`}
                    title={`Tier: ${trophyTier}`}
                >
                    {badgeIcon}
                </div>
            )}

            {/* STATUS BULLET HIJAU (JIKA TANPA BADGE) */}
            {showActiveBadge && !badgeIcon && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            )}
        </div>
    );
}