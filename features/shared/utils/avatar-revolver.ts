import { getMediaProxyUrl } from '@/features/shared/services/storage-service';

export interface CuteIconPreset {
    icon: string;
    bgGradient: string;
    borderColor: string;
}

export const CUTE_ICON_PRESETS: CuteIconPreset[] = [
    { icon: '🦁', bgGradient: 'from-amber-100 to-yellow-200', borderColor: 'border-amber-300' },
    { icon: '🦊', bgGradient: 'from-orange-100 to-amber-200', borderColor: 'border-orange-300' },
    { icon: '🐼', bgGradient: 'from-slate-100 to-slate-200', borderColor: 'border-slate-300' },
    { icon: '🐰', bgGradient: 'from-pink-100 to-rose-200', borderColor: 'border-pink-300' },
    { icon: '🐨', bgGradient: 'from-emerald-100 to-teal-200', borderColor: 'border-emerald-300' },
    { icon: '🐱', bgGradient: 'from-indigo-100 to-purple-200', borderColor: 'border-indigo-300' },
];

/**
 * Hashing deterministik: selalu menghasilkan index yang sama untuk ID yang sama
 */
export function getDefaultCutePreset(identifier: string = 'default-student'): CuteIconPreset {
    const key = identifier.trim() || 'default-student';
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % CUTE_ICON_PRESETS.length;
    return CUTE_ICON_PRESETS[index];
}

export interface ResolvedAvatar {
    type: 'image' | 'cute-icon';
    value: string;
    bgGradient: string;
    borderColor: string;
    fallbackIcon: CuteIconPreset;
}

export function resolveAvatar(
    avatarUrl?: string | null,
    identifier: string = 'default-student'
): ResolvedAvatar {
    const defaultCute = getDefaultCutePreset(identifier);

    // Jika URL berupa file asli (R2/Supabase) dan bukan dicebear
    const isCustomFile =
        Boolean(avatarUrl) &&
        !avatarUrl?.includes('dicebear.com') &&
        (avatarUrl?.startsWith('http://') ||
            avatarUrl?.startsWith('https://') ||
            avatarUrl?.startsWith('/'));

    if (isCustomFile && avatarUrl) {
        return {
            type: 'image',
            value: getMediaProxyUrl(avatarUrl),
            bgGradient: 'from-slate-100 to-slate-200',
            borderColor: 'border-slate-300',
            fallbackIcon: defaultCute,
        };
    }

    // Jika berupa emoji tersimpan di DB
    if (avatarUrl && avatarUrl.trim().length <= 4) {
        return {
            type: 'cute-icon',
            value: avatarUrl.trim(),
            bgGradient: defaultCute.bgGradient,
            borderColor: defaultCute.borderColor,
            fallbackIcon: defaultCute,
        };
    }

    // Fallback default icon lucu
    return {
        type: 'cute-icon',
        value: defaultCute.icon,
        bgGradient: defaultCute.bgGradient,
        borderColor: defaultCute.borderColor,
        fallbackIcon: defaultCute,
    };
}