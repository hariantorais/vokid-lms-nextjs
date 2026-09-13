export type TrophyTier = 'NONE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';

export interface TrophyRingStyle {
  containerRing: string;
  badgeBg: string;
  badgeBorder: string;
}

export const TROPHY_TIER_STYLES: Record<TrophyTier, TrophyRingStyle> = {
  NONE: {
    containerRing: 'border-2 border-slate-200',
    badgeBg: 'bg-slate-100',
    badgeBorder: 'border-slate-300',
  },
  BRONZE: {
    containerRing: 'border-[3px] border-amber-700/80 ring-2 ring-amber-600/30 shadow-xs',
    badgeBg: 'bg-amber-100 text-amber-900',
    badgeBorder: 'border-amber-600',
  },
  SILVER: {
    containerRing: 'border-[3px] border-slate-300 ring-2 ring-slate-400/40 shadow-xs',
    badgeBg: 'bg-slate-100 text-slate-800',
    badgeBorder: 'border-slate-400',
  },
  GOLD: {
    containerRing: 'border-[3.5px] border-amber-400 ring-3 ring-amber-300/50 shadow-md shadow-amber-200/50',
    badgeBg: 'bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-950',
    badgeBorder: 'border-amber-500',
  },
  DIAMOND: {
    containerRing: 'border-[3.5px] border-indigo-400 ring-3 ring-cyan-400/70 shadow-lg shadow-cyan-300/60 animate-pulse',
    badgeBg: 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-white',
    badgeBorder: 'border-white',
  },
};