'use client';

import React from 'react';

export type LkpdItemType =
  | 'PICT_COUNT'
  | 'NUMBER_BOND'
  | 'SHAPE_CARD'
  | 'TEN_FRAME'
  | 'LENGTH_COMPARE'
  | 'PICT_CHART'
  | 'MATH_PROBLEM'
  | 'ENGLISH_CARD'
  | 'COLOR_PALETTE'
  | 'MATCH_PAIRS'
  // Seni Budaya
  | 'DRAWING_FRAME'
  | 'TRACE_PATTERN'
  | 'SHAPE_SORTING'
  | 'BODY_MOVEMENT_CARD'
  | 'EXPRESSION_CARD'
  | 'MIMESIS_ACTION'
  // Pendidikan Pancasila
  | 'IDENTITY_CARD'
  | 'RULES_CARD'
  | 'SYMBOL_CARD'
  | 'SELF_REFLECTION'
  // ⚡ Bahasa Indonesia (Baru - Literasi)
  | 'TRACE_LETTER'
  | 'MATCH_SYLLABLE'
  | 'READ_AND_MATCH'
  | 'FILL_THE_WORD'
  | 'READING_CARD'
  | 'WRITING_LINES';

// =============================================================================
// DATA INTERFACES (existing)
// =============================================================================

export interface PictCountData {
  total: number;
  crossed?: number;
  icon?: string;
  symbol?: string;
  label?: string;
}

export interface NumberBondData {
  parent?: number | string;
  left?: number | string;
  right?: number | string;
  whole?: number | string;
  part1?: number | string;
  part2?: number | string;
}

export interface ShapeCardData {
  shape?: 'SEGIEMPAT' | 'SEGITIGA' | 'LINGKARAN';
  shapes?: Array<{ name: string; type: string }>;
  showProperties?: boolean;
}

export interface TenFrameData {
  filled1?: number;
  filled2?: number;
  frames?: Array<{ filled: number }>;
  symbol?: string;
}

export interface LengthCompareData {
  itemA?: { name: string; units: number };
  itemB?: { name: string; units: number };
  items?: Array<{ name: string; units: number }>;
  unitName?: string;
}

export interface PictChartData {
  categories?: Array<{
    name: string;
    count: number;
    icon?: string;
  }>;
  unitLabel?: string;
}

export interface EnglishCardData {
  icon?: string;
  subtitle?: string;
  options?: string[];
  illustration?: string;
}

export interface ColorPaletteData {
  colors?: string[];
}

export interface MatchPairsData {
  pairs?: Array<{ left: string; right: string }>;
}

export interface DrawingFrameData {
  prompt?: string;
  guideLines?: 'dots' | 'grid' | 'none' | 'baseline';
  rows?: number;
  label?: string;
}

export interface TracePatternData {
  patterns?: Array<{
    name: string;
    type: 'straight' | 'curved' | 'zigzag' | 'spiral' | 'wavy';
    icon?: string;
  }>;
}

export interface ShapeSortingData {
  items?: Array<{
    label: string;
    icon: string;
    shape: 'circle' | 'square' | 'triangle';
  }>;
  categories?: Array<{
    name: string;
    shape: 'circle' | 'square' | 'triangle';
  }>;
}

export interface BodyMovementCardData {
  movements?: Array<{
    name: string;
    icon: string;
    instruction: string;
  }>;
}

export interface ExpressionCardData {
  expressions?: Array<{
    name: string;
    emoji: string;
    label: string;
  }>;
  single?: {
    emoji: string;
    label: string;
    options: string[];
  };
}

export interface MimesisActionData {
  actions?: Array<{
    name: string;
    icon: string;
    description: string;
  }>;
}

export interface IdentityCardData {
  fields?: Array<{
    label: string;
    icon: string;
    placeholder?: string;
  }>;
  avatar?: string;
}

export interface RulesCardData {
  rules?: Array<{
    name: string;
    icon: string;
    description?: string;
  }>;
  showCheckbox?: boolean;
}

export interface SymbolCardData {
  symbols?: Array<{
    sila: number;
    name: string;
    icon: string;
    meaning: string;
  }>;
}

export interface SelfReflectionData {
  question?: string;
  options?: Array<{
    emoji: string;
    label: string;
  }>;
}

// ⚡ Bahasa Indonesia Interfaces (Baru - Literasi)
export interface TraceLetterData {
  letters?: Array<{
    letter: string;
    word?: string;
    icon?: string;
  }>;
  showGuideDots?: boolean;
}

export interface MatchSyllableData {
  syllables?: Array<{
    part1: string;
    part2: string;
    result: string;
    icon?: string;
  }>;
}

export interface ReadAndMatchData {
  words?: Array<{
    word: string;
    icon: string;
  }>;
}

export interface FillTheWordData {
  word: string;
  displayWord: string;
  icon?: string;
  missingIndex?: number;
}

export interface ReadingCardData {
  sentences?: Array<{
    text: string;
    icon?: string;
  }>;
  showGuideLines?: boolean;
}

export interface WritingLinesData {
  lines?: number;
  prompt?: string;
  example?: string;
  guideText?: string;
}

export interface LkpdItem {
  id: string | number;
  type: LkpdItemType;
  question: string;
  answer_key?: string;
  explanation?: string;
  data?:
  | PictCountData
  | NumberBondData
  | ShapeCardData
  | TenFrameData
  | LengthCompareData
  | PictChartData
  | EnglishCardData
  | ColorPaletteData
  | MatchPairsData
  | DrawingFrameData
  | TracePatternData
  | ShapeSortingData
  | BodyMovementCardData
  | ExpressionCardData
  | MimesisActionData
  | IdentityCardData
  | RulesCardData
  | SymbolCardData
  | SelfReflectionData
  | TraceLetterData
  | MatchSyllableData
  | ReadAndMatchData
  | FillTheWordData
  | ReadingCardData
  | WritingLinesData
  | Record<string, unknown>;
}

// =============================================================================
// HELPER
// =============================================================================

export function parseLkpdQuestion(input: unknown, index: number): LkpdItem {
  if (typeof input === 'object' && input !== null && 'type' in input && 'question' in input) {
    const rawObj = input as LkpdItem;
    return {
      id: rawObj.id ?? index,
      type: rawObj.type ?? 'MATH_PROBLEM',
      question: typeof rawObj.question === 'string' ? rawObj.question : String(rawObj.question ?? ''),
      answer_key: rawObj.answer_key,
      explanation: rawObj.explanation,
      data: rawObj.data,
    };
  }

  const rawText = typeof input === 'string' ? input : String(input ?? '');
  const cleanText = rawText.replace(/^\d+[\.\)]\s*/, '').trim();

  return {
    id: index,
    type: 'MATH_PROBLEM',
    question: cleanText,
  };
}

// =============================================================================
// VISUAL COMPONENTS (Matematika + Bahasa Inggris + Seni Budaya + Pancasila)
// [Kode sebelumnya tetap sama - hanya menambahkan 6 komponen baru di bawah]
// =============================================================================

export function PictCountVisual({ data }: { data: PictCountData }) {
  const total = Number(data.total || 0);
  const crossed = Number(data.crossed || 0);
  const icon = data.icon || data.symbol || '●';
  const items = Array.from({ length: total }, (_, i) => i < crossed);

  return (
    <div className="border border-black p-3 bg-white rounded-none inline-flex flex-col gap-2 print:break-inside-avoid">
      <div className="flex flex-wrap items-center gap-2 max-w-[320px]">
        {items.map((isCrossed, idx) => (
          <div
            key={idx}
            className={`relative w-9 h-9 rounded-lg border-2 border-black flex items-center justify-center text-base font-black ${isCrossed ? 'bg-slate-100 opacity-60' : 'bg-white'
              }`}
          >
            <span>{icon}</span>
            {isCrossed && (
              <span className="absolute inset-0 flex items-center justify-center text-red-600 font-black text-2xl select-none">✕</span>
            )}
          </div>
        ))}
      </div>
      {crossed > 0 && (
        <span className="text-[10px] font-semibold text-slate-600 italic">
          (Total {total} benda, dicoret {crossed} buah)
        </span>
      )}
    </div>
  );
}

export function NumberBondVisual({ data }: { data: NumberBondData }) {
  const whole = data.whole ?? data.parent ?? 10;
  const part1 = data.part1 ?? data.left ?? '?';
  const part2 = data.part2 ?? data.right ?? '?';

  return (
    <div className="p-2 border border-black inline-block bg-white print:break-inside-avoid">
      <svg width="150" height="120" viewBox="0 0 150 120" className="mx-auto block">
        <line x1="75" y1="36" x2="35" y2="85" stroke="#000000" strokeWidth="2.5" />
        <line x1="75" y1="36" x2="115" y2="85" stroke="#000000" strokeWidth="2.5" />
        <circle cx="75" cy="28" r="22" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
        <text x="75" y="34" textAnchor="middle" fontSize="15" fontWeight="900" fill="#000000" fontFamily="monospace">{String(whole)}</text>
        <circle cx="35" cy="92" r="20" fill="#ffffff" stroke="#000000" strokeWidth="2" strokeDasharray={part1 === '?' ? '4,3' : 'none'} />
        <text x="35" y="97" textAnchor="middle" fontSize="14" fontWeight="800" fill={part1 === '?' ? '#94a3b8' : '#000000'} fontFamily="monospace">{String(part1)}</text>
        <circle cx="115" cy="92" r="20" fill="#ffffff" stroke="#000000" strokeWidth="2" strokeDasharray={part2 === '?' ? '4,3' : 'none'} />
        <text x="115" y="97" textAnchor="middle" fontSize="14" fontWeight="800" fill={part2 === '?' ? '#94a3b8' : '#000000'} fontFamily="monospace">{String(part2)}</text>
      </svg>
    </div>
  );
}

export function ShapeCardVisual({ data }: { data: ShapeCardData }) {
  const shapes = data.shapes && data.shapes.length > 0 ? data.shapes : data.shape ? [{ name: data.shape, type: data.shape.toLowerCase() }] : [{ name: 'Segiempat', type: 'square' }];

  return (
    <div className="border border-black p-3 bg-white inline-flex flex-wrap items-center gap-4 print:break-inside-avoid">
      {shapes.map((item, idx) => {
        const typeStr = (item.type || '').toLowerCase();
        const isTriangle = typeStr.includes('tri') || typeStr.includes('segitiga');
        const isCircle = typeStr.includes('circ') || typeStr.includes('lingkaran');
        return (
          <div key={idx} className="flex flex-col items-center gap-1.5 p-2 border border-slate-300 rounded bg-slate-50/50">
            <svg width="80" height="75" viewBox="0 0 80 75" className="block">
              {isTriangle ? <polygon points="40,8 10,65 70,65" fill="#ffffff" stroke="#000000" strokeWidth="2.5" /> : isCircle ? <circle cx="40" cy="37" r="28" fill="#ffffff" stroke="#000000" strokeWidth="2.5" /> : <rect x="10" y="10" width="60" height="55" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />}
            </svg>
            <span className="text-[11px] font-black text-black">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TenFrameVisual({ data }: { data: TenFrameData }) {
  const frames = data.frames && data.frames.length > 0 ? data.frames : [{ filled: data.filled1 ?? 10 }, ...(data.filled2 !== undefined ? [{ filled: data.filled2 }] : [])];
  const renderGrid = (filled: number, label: string) => (
    <div className="space-y-1">
      <span className="text-[10px] font-bold text-slate-700 block">{label}</span>
      <div className="grid grid-cols-5 gap-1 border-2 border-black p-1 bg-white inline-grid">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="w-7 h-7 border border-black flex items-center justify-center text-xs font-black">{i < filled ? '●' : ''}</div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="flex flex-wrap items-center gap-4 border border-black p-3 bg-white print:break-inside-avoid">
      {frames.map((frame, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="text-lg font-black">+</span>}
          {renderGrid(frame.filled, `Kotak ${idx + 1} (${frame.filled}/10)`)}
        </React.Fragment>
      ))}
    </div>
  );
}

export function LengthCompareVisual({ data }: { data: LengthCompareData }) {
  const items = data.items && data.items.length > 0 ? data.items : [data.itemA ?? { name: 'Benda A', units: 7 }, data.itemB ?? { name: 'Benda B', units: 4 }];
  const unitName = data.unitName || 'klip';
  return (
    <div className="border border-black p-3 bg-white space-y-3 print:break-inside-avoid">
      <div className="text-[11px] font-bold text-slate-700">Garis Pangkal Sejajar:</div>
      <div className="space-y-2 border-l-4 border-black pl-3 py-1">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-bold"><span>{item.name}</span><span>{item.units} {unitName}</span></div>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(item.units, 20) }, (_, i) => (
                <div key={i} className="w-5 h-4 border border-black bg-slate-100 rounded-xs flex items-center justify-center text-[8px]">📎</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PictChartVisual({ data }: { data: PictChartData }) {
  const categories = data.categories || [];
  const unitLabel = data.unitLabel || '1 ★ = 1 data';
  return (
    <div className="border border-black p-3 bg-white space-y-2 print:break-inside-avoid">
      <div className="flex justify-between items-center border-b border-black pb-1">
        <span className="text-xs font-black uppercase">DIAGRAM PIKTOGRAM</span>
        <span className="text-[10px] font-semibold text-slate-600 italic">{unitLabel}</span>
      </div>
      <div className="space-y-2 pt-1 text-xs">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="w-24 font-bold text-slate-900 truncate">{cat.name}</span>
            <div className="flex items-center gap-1.5 flex-1 border-l-2 border-black pl-2 py-0.5">
              {Array.from({ length: cat.count }, (_, i) => (
                <span key={i} className="w-6 h-6 rounded border border-black flex items-center justify-center text-xs font-bold bg-slate-50">{cat.icon || '★'}</span>
              ))}
              <span className="ml-2 font-mono text-xs font-bold text-slate-600">({cat.count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnglishCardVisual({ data }: { data: EnglishCardData }) {
  const icon = data.icon || data.illustration || '📖';
  return (
    <div className="border-2 border-black p-4 bg-white inline-flex flex-col gap-3 print:break-inside-avoid max-w-md">
      <div className="flex items-center gap-4 border-b border-black pb-3">
        <div className="w-16 h-16 rounded-2xl border-2 border-black bg-slate-50 flex items-center justify-center text-4xl shrink-0"><span>{icon}</span></div>
        {data.subtitle && (
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Keterangan:</span>
            <span className="text-sm font-black text-black leading-snug">{data.subtitle}</span>
          </div>
        )}
      </div>
      {data.options && data.options.length > 0 && (
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Pilihan Jawaban:</span>
          <div className="flex flex-col gap-2">
            {data.options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3 border border-black rounded-lg px-3 py-2 bg-white">
                <div className="w-6 h-6 border-2 border-black rounded flex items-center justify-center shrink-0"><span className="text-xs font-black text-slate-300">✓</span></div>
                <span className="text-sm font-bold text-black">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ColorPaletteVisual({ data }: { data: ColorPaletteData }) {
  const colors = data.colors || [];
  const colorMap: Record<string, string> = { red: '#ef4444', blue: '#3b82f6', yellow: '#facc15', green: '#22c55e', black: '#000000', white: '#ffffff', orange: '#f97316', purple: '#a855f7', pink: '#ec4899', brown: '#92400e' };
  return (
    <div className="border-2 border-black p-3 bg-white space-y-3 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">Palet Warna:</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, idx) => {
          const bgColor = colorMap[color.toLowerCase()] || '#e2e8f0';
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-lg border-2 border-black flex items-center justify-center shadow-2xs" style={{ backgroundColor: bgColor }} />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">{color}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MatchPairsVisual({ data }: { data: MatchPairsData }) {
  const pairs = data.pairs || [];
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">Jodohkan Pasangan Berikut:</span>
      </div>
      <div className="grid grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Kolom A</span>
          {pairs.map((pair, idx) => (
            <div key={idx} className="flex items-center gap-2 border border-black rounded-lg px-3 py-2.5 bg-white min-h-[48px]">
              <span className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black shrink-0">{String.fromCharCode(65 + idx)}</span>
              <span className="text-xs font-bold text-black leading-snug">{pair.left}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Kolom B</span>
          {pairs.map((pair, idx) => (
            <div key={idx} className="flex items-center gap-2 border border-black rounded-lg px-3 py-2.5 bg-white min-h-[48px]">
              <span className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black shrink-0">{idx + 1}</span>
              <span className="text-xs font-bold text-black leading-snug">{pair.right}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DrawingFrameVisual({ data }: { data: DrawingFrameData }) {
  const guideLines = data.guideLines || 'none';
  const rows = data.rows || 1;
  const label = data.label || 'Gambar di sini:';
  return (
    <div className="space-y-2 print:break-inside-avoid">
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-700">
        <span>✏️</span><span>{label}</span>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, rowIdx) => (
          <div key={rowIdx} className={`relative w-full h-32 border-2 border-dashed border-slate-400 bg-white rounded-lg overflow-hidden ${guideLines === 'grid' ? 'bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]' : ''}`}>
            {guideLines === 'baseline' && <div className="absolute bottom-6 left-4 right-4 border-b-2 border-dashed border-slate-300" />}
            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-slate-400" />
            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-slate-400" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-slate-400" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-slate-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TracePatternVisual({ data }: { data: TracePatternData }) {
  const patterns = data.patterns || [];
  const renderPath = (type: string) => {
    switch (type) {
      case 'straight': return <line x1="10" y1="25" x2="190" y2="25" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />;
      case 'curved': return <path d="M 10 30 Q 50 5, 90 30 T 170 30" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />;
      case 'zigzag': return <polyline points="10,35 30,15 50,35 70,15 90,35 110,15 130,35 150,15 170,35 190,15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />;
      case 'spiral': return <path d="M 100 25 m -5 0 a 5 5 0 1 1 10 0 a 10 10 0 1 1 -20 0 a 15 15 0 1 1 30 0 a 20 20 0 1 1 -40 0" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />;
      default: return <line x1="10" y1="25" x2="190" y2="25" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />;
    }
  };
  return (
    <div className="space-y-3 print:break-inside-avoid">
      {patterns.map((pattern, idx) => (
        <div key={idx} className="border border-black rounded-lg p-3 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">{idx + 1}. {pattern.name}</span>
          </div>
          <svg viewBox="0 0 200 50" className="w-full h-14" preserveAspectRatio="none">{renderPath(pattern.type)}</svg>
        </div>
      ))}
    </div>
  );
}

export function ShapeSortingVisual({ data }: { data: ShapeSortingData }) {
  const items = data.items || [];
  const categories = data.categories || [];
  const renderShape = (shape: string) => {
    switch (shape) {
      case 'circle': return <circle cx="20" cy="20" r="16" fill="none" stroke="#000000" strokeWidth="2" />;
      case 'square': return <rect x="4" y="4" width="32" height="32" fill="none" stroke="#000000" strokeWidth="2" />;
      case 'triangle': return <polygon points="20,4 4,36 36,36" fill="none" stroke="#000000" strokeWidth="2" />;
      default: return null;
    }
  };
  return (
    <div className="border-2 border-black p-4 bg-white space-y-4 print:break-inside-avoid">
      <div className="flex flex-wrap items-center gap-3 border border-dashed border-slate-400 p-3 rounded-lg bg-slate-50/50">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 p-2 border border-slate-300 rounded bg-white min-w-[60px]">
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-bold text-slate-700">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {categories.map((cat, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-2 bg-white space-y-2">
            <div className="flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 40 40">{renderShape(cat.shape)}</svg>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-black block">{cat.name}</span>
            </div>
            <div className="border-t border-dashed border-slate-300 pt-2 min-h-[60px]">
              <span className="text-[9px] italic text-slate-400">Isi di sini:</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BodyMovementCardVisual({ data }: { data: BodyMovementCardData }) {
  const movements = data.movements || [];
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="grid grid-cols-2 gap-3">
        {movements.map((mov, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white space-y-2">
            <div className="flex items-center gap-2 border-b border-dashed border-slate-300 pb-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">{mov.icon}</div>
              <span className="text-[11px] font-black text-black leading-tight">{mov.name}</span>
            </div>
            <p className="text-[10px] font-medium text-slate-700">{mov.instruction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExpressionCardVisual({ data }: { data: ExpressionCardData }) {
  if (data.single) {
    return (
      <div className="border-2 border-black p-4 bg-white inline-flex flex-col gap-3 print:break-inside-avoid max-w-md">
        <div className="flex items-center gap-4 border-b border-black pb-3">
          <div className="w-20 h-20 rounded-2xl border-2 border-black bg-amber-50 flex items-center justify-center text-5xl shrink-0"><span>{data.single.emoji}</span></div>
          <div className="min-w-0">
            <span className="text-base font-black text-black">{data.single.label}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
            {data.single.options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3 border border-black rounded-lg px-3 py-2 bg-white">
                <div className="w-6 h-6 border-2 border-black rounded flex items-center justify-center shrink-0"><span className="text-xs font-black text-slate-300">✓</span></div>
                <span className="text-sm font-bold text-black">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const expressions = data.expressions || [];
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {expressions.map((expr, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-black flex items-center justify-center text-4xl"><span>{expr.emoji}</span></div>
            <span className="text-[10px] font-black uppercase tracking-wider text-black">{expr.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MimesisActionVisual({ data }: { data: MimesisActionData }) {
  const actions = data.actions || [];
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white space-y-2">
            <div className="flex items-center justify-center border-b border-dashed border-slate-300 pb-2">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border-2 border-black flex items-center justify-center text-3xl"><span>{action.icon}</span></div>
            </div>
            <div className="text-center">
              <span className="text-[11px] font-black text-black uppercase tracking-wider block">{action.name}</span>
            </div>
            <p className="text-[10px] font-medium text-slate-600 text-center">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IdentityCardVisual({ data }: { data: IdentityCardData }) {
  const fields = data.fields || [];
  const avatar = data.avatar || '🧒';
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="flex items-center gap-3 border-b-2 border-black pb-3">
        <div className="w-20 h-20 rounded-2xl border-2 border-black bg-amber-50 flex items-center justify-center text-5xl shrink-0"><span>{avatar}</span></div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">🇮🇩 Kartu Identitas Diri</span>
          <span className="text-base font-black text-black">Aku Bangga Jadi Anak Indonesia</span>
        </div>
      </div>
      <div className="space-y-3">
        {fields.map((field, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-black text-slate-800">
              <span className="text-sm">{field.icon}</span>
              <span className="uppercase tracking-wider">{field.label}:</span>
            </div>
            <div className="flex items-center gap-2 pl-6">
              <div className="border-b-2 border-dotted border-black flex-1 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RulesCardVisual({ data }: { data: RulesCardData }) {
  const rules = data.rules || [];
  const showCheckbox = data.showCheckbox !== false;
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="space-y-2.5">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex items-center gap-3 border-2 border-black rounded-lg p-3 bg-white">
            {showCheckbox && (
              <div className="w-7 h-7 border-2 border-black rounded flex items-center justify-center shrink-0"><span className="text-xs font-black text-slate-300">✓</span></div>
            )}
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shrink-0">{rule.icon}</div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-black text-black block">{rule.name}</span>
              {rule.description && <span className="text-[10px] text-slate-600 italic block">{rule.description}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SymbolCardVisual({ data }: { data: SymbolCardData }) {
  const symbols = data.symbols || [];
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="space-y-2.5">
        {symbols.map((sym, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white grid grid-cols-[auto_1fr] gap-3 items-center">
            <div className="w-16 h-16 rounded-2xl border-2 border-black bg-amber-50 flex items-center justify-center text-3xl shrink-0">{sym.icon}</div>
            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border-2 border-black bg-amber-400 flex items-center justify-center text-[10px] font-black text-black shrink-0">{sym.sila}</span>
                <span className="text-[11px] font-black text-black uppercase tracking-wider">Sila ke-{sym.sila}</span>
              </div>
              <div className="border-b-2 border-dotted border-black h-5" />
              <div className="text-[9px] italic text-slate-500">💡 {sym.meaning}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelfReflectionVisual({ data }: { data: SelfReflectionData }) {
  const question = data.question || 'Bagaimana perasaanmu hari ini?';
  const options = data.options || [];
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="text-center">
        <p className="text-sm font-black text-black leading-snug px-2">{question}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl border-2 border-black bg-amber-50 flex items-center justify-center text-3xl">{opt.emoji}</div>
            <span className="text-[10px] font-black text-black text-center leading-tight">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// ⚡ BAHASA INDONESIA VISUAL COMPONENTS (BARU)
// =============================================================================

/**
 * TRACE_LETTER: Menebalkan huruf a-z dengan panduan titik
 */
export function TraceLetterVisual({ data }: { data: TraceLetterData }) {
  const letters = data.letters || [];
  const showDots = data.showGuideDots !== false;

  return (
    <div className="border-2 border-black p-4 bg-white space-y-4 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">
          ✏️ Tebalkan Huruf Berikut:
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {letters.map((item, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white space-y-2">
            {/* Ikon & Kata */}
            {item.icon && (
              <div className="flex items-center gap-2 border-b border-dashed border-slate-300 pb-2">
                <span className="text-3xl">{item.icon}</span>
                {item.word && (
                  <span className="text-xs font-black text-slate-700">{item.word}</span>
                )}
              </div>
            )}

            {/* Huruf besar (untuk ditirukan) */}
            <div className="text-center py-1">
              <span className="font-mono text-2xl font-black text-slate-800">
                {item.letter.toUpperCase()}
              </span>
              <span className="font-mono text-2xl font-black text-slate-800 ml-2">
                {item.letter.toLowerCase()}
              </span>
            </div>

            {/* Garis untuk menebalkan */}
            <div className="space-y-2">
              <div className="border-b-2 border-dashed border-slate-400 h-10 flex items-center px-2">
                <span className="font-mono text-2xl font-black text-slate-300 select-none">
                  {item.letter.toUpperCase()}
                </span>
                <span className="font-mono text-2xl font-black text-slate-300 select-none ml-2">
                  {item.letter.toLowerCase()}
                </span>
              </div>
              <div className="border-b-2 border-dashed border-slate-400 h-10" />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] italic text-slate-500">
        💡 Petunjuk: Tebalkan huruf putus-putus dengan pensil, lalu coba tulis sendiri di baris kosong.
      </p>
    </div>
  );
}

/**
 * MATCH_SYLLABLE: Menyambung 2 suku kata menjadi kata
 */
export function MatchSyllableVisual({ data }: { data: MatchSyllableData }) {
  const syllables = data.syllables || [];

  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">
          🔤 Sambung Suku Kata Berikut:
        </span>
      </div>
      <div className="space-y-3">
        {syllables.map((item, idx) => (
          <div key={idx} className="border-2 border-black rounded-lg p-3 bg-white">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Suku kata 1 */}
              <div className="px-4 py-2 border-2 border-black rounded-lg bg-amber-50 min-w-[60px] text-center">
                <span className="font-mono text-xl font-black text-black">{item.part1}</span>
              </div>
              <span className="text-2xl font-black text-slate-400">+</span>
              {/* Suku kata 2 */}
              <div className="px-4 py-2 border-2 border-black rounded-lg bg-sky-50 min-w-[60px] text-center">
                <span className="font-mono text-xl font-black text-black">{item.part2}</span>
              </div>
              <span className="text-2xl font-black text-slate-400">=</span>
              {/* Hasil (garis kosong) */}
              <div className="px-4 py-2 border-2 border-dashed border-slate-400 rounded-lg bg-white min-w-[80px] text-center">
                <span className="font-mono text-xl font-black text-slate-300">?</span>
              </div>
            </div>
            {/* Ikon kata */}
            {item.icon && (
              <div className="text-center mt-2">
                <span className="text-3xl">{item.icon}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-[9px] italic text-slate-500">
        💡 Petunjuk: Tuliskan hasil gabungan suku kata di kotak kosong.
      </p>
    </div>
  );
}

/**
 * READ_AND_MATCH: Baca kata → cocokkan dengan gambar
 */
export function ReadAndMatchVisual({ data }: { data: ReadAndMatchData }) {
  const words = data.words || [];

  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">
          📖 Baca Kata & Jodohkan dengan Gambar:
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Kolom Kata */}
        <div className="space-y-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">
            Kata
          </span>
          {words.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border-2 border-black rounded-lg px-3 py-2 bg-white min-h-[44px]"
            >
              <span className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="font-mono text-sm font-black text-black">
                {item.word}
              </span>
            </div>
          ))}
        </div>

        {/* Kolom Gambar */}
        <div className="space-y-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">
            Gambar
          </span>
          {words
            .slice()
            .reverse()
            .map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 border-2 border-black rounded-lg px-3 py-2 bg-white min-h-[44px]"
              >
                <span className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black shrink-0">
                  {words.length - idx}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>
            ))}
        </div>
      </div>
      <p className="text-[9px] italic text-slate-500">
        💡 Petunjuk: Tarik garis dari kata ke gambar yang sesuai.
      </p>
    </div>
  );
}

/**
 * FILL_THE_WORD: Melengkapi kata rumpang
 */
export function FillTheWordVisual({ data }: { data: FillTheWordData }) {
  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">
          ✏️ Lengkapi Kata Berikut:
        </span>
      </div>
      <div className="flex items-center gap-4 py-2">
        {data.icon && (
          <div className="w-20 h-20 rounded-2xl border-2 border-black bg-amber-50 flex items-center justify-center text-5xl shrink-0">
            {data.icon}
          </div>
        )}
        <div className="flex-1">
          <div className="font-mono text-3xl font-black tracking-widest text-center py-4 border-2 border-dashed border-slate-400 rounded-lg bg-white">
            {data.displayWord}
          </div>
        </div>
      </div>
      <p className="text-[9px] italic text-slate-500">
        💡 Petunjuk: Isi huruf yang hilang pada kotak bergaris.
      </p>
    </div>
  );
}

/**
 * READING_CARD: Kartu baca kalimat pendek
 */
export function ReadingCardVisual({ data }: { data: ReadingCardData }) {
  const sentences = data.sentences || [];

  return (
    <div className="border-2 border-black p-4 bg-white space-y-3 print:break-inside-avoid">
      <div className="border-b border-black pb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-black block">
          📖 Baca Kalimat Berikut dengan Nyaring:
        </span>
      </div>
      <div className="space-y-3">
        {sentences.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 border-2 border-black rounded-lg p-3 bg-white"
          >
            <span className="w-8 h-8 rounded-full border-2 border-black bg-amber-400 flex items-center justify-center text-xs font-black text-black shrink-0">
              {idx + 1}
            </span>
            {item.icon && <span className="text-2xl shrink-0">{item.icon}</span>}
            <span className="text-base font-black text-black leading-snug flex-1">
              {item.text}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-dashed border-slate-300">
        <span className="text-[9px] italic text-slate-500">
          💡 Petunjuk: Baca kalimat dengan nyaring. Minta Bapak/Ibu Guru mendengarkan.
        </span>
      </div>
    </div>
  );
}

/**
 * WRITING_LINES: Garis untuk menulis kalimat
 */
export function WritingLinesVisual({ data }: { data: WritingLinesData }) {
  const lines = data.lines || 3;
  const prompt = data.prompt || 'Tulis di sini:';

  return (
    <div className="space-y-3 print:break-inside-avoid">
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-700">
        <span>✏️</span>
        <span>{prompt}</span>
      </div>

      {/* Contoh tulisan (jika ada) */}
      {data.example && (
        <div className="border-2 border-black rounded-lg p-3 bg-amber-50">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 block mb-1">
            Contoh:
          </span>
          <span className="font-mono text-sm font-bold text-slate-700">
            {data.example}
          </span>
        </div>
      )}

      {/* Garis untuk menulis */}
      <div className="border-2 border-black rounded-lg p-4 bg-white space-y-6">
        {Array.from({ length: lines }, (_, idx) => (
          <div key={idx} className="flex items-end gap-2">
            <span className="text-[10px] font-black text-slate-400 w-4">
              {idx + 1}.
            </span>
            <div className="flex-1 border-b-2 border-dotted border-slate-500 h-8" />
          </div>
        ))}
      </div>

      <p className="text-[9px] italic text-slate-500">
        💡 Tulis dengan rapi di atas garis putus-putus.
      </p>
    </div>
  );
}

// =============================================================================
// MAIN VISUAL DISPATCHER
// =============================================================================

export function LkpdItemRenderer({ item, index }: { item: LkpdItem; index: number }) {
  const skipAnswerBox =
    item.type === 'ENGLISH_CARD' ||
    item.type === 'MATCH_PAIRS' ||
    item.type === 'DRAWING_FRAME' ||
    item.type === 'TRACE_PATTERN' ||
    item.type === 'SHAPE_SORTING' ||
    item.type === 'BODY_MOVEMENT_CARD' ||
    item.type === 'EXPRESSION_CARD' ||
    item.type === 'MIMESIS_ACTION' ||
    item.type === 'COLOR_PALETTE' ||
    item.type === 'IDENTITY_CARD' ||
    item.type === 'RULES_CARD' ||
    item.type === 'SYMBOL_CARD' ||
    item.type === 'SELF_REFLECTION' ||
    // Bahasa Indonesia
    item.type === 'TRACE_LETTER' ||
    item.type === 'MATCH_SYLLABLE' ||
    item.type === 'READ_AND_MATCH' ||
    item.type === 'FILL_THE_WORD' ||
    item.type === 'READING_CARD' ||
    item.type === 'WRITING_LINES';

  return (
    <div className="border border-black p-4 rounded-none space-y-3 print:break-inside-avoid">
      <div className="flex items-start gap-2.5">
        <span className="font-black text-sm w-6 shrink-0">{index + 1}.</span>
        <div className="flex-1 space-y-3">
          <p className="text-xs leading-relaxed font-semibold text-slate-900 whitespace-pre-line">
            {item.question}
          </p>

          {/* Matematika */}
          {item.type === 'PICT_COUNT' && item.data && <PictCountVisual data={item.data as PictCountData} />}
          {item.type === 'NUMBER_BOND' && item.data && <NumberBondVisual data={item.data as NumberBondData} />}
          {item.type === 'SHAPE_CARD' && item.data && <ShapeCardVisual data={item.data as ShapeCardData} />}
          {item.type === 'TEN_FRAME' && item.data && <TenFrameVisual data={item.data as TenFrameData} />}
          {item.type === 'LENGTH_COMPARE' && item.data && <LengthCompareVisual data={item.data as LengthCompareData} />}
          {item.type === 'PICT_CHART' && item.data && <PictChartVisual data={item.data as PictChartData} />}

          {/* Bahasa Inggris */}
          {item.type === 'ENGLISH_CARD' && item.data && <EnglishCardVisual data={item.data as EnglishCardData} />}
          {item.type === 'COLOR_PALETTE' && item.data && <ColorPaletteVisual data={item.data as ColorPaletteData} />}
          {item.type === 'MATCH_PAIRS' && item.data && <MatchPairsVisual data={item.data as MatchPairsData} />}

          {/* Seni Budaya */}
          {item.type === 'DRAWING_FRAME' && item.data && <DrawingFrameVisual data={item.data as DrawingFrameData} />}
          {item.type === 'TRACE_PATTERN' && item.data && <TracePatternVisual data={item.data as TracePatternData} />}
          {item.type === 'SHAPE_SORTING' && item.data && <ShapeSortingVisual data={item.data as ShapeSortingData} />}
          {item.type === 'BODY_MOVEMENT_CARD' && item.data && <BodyMovementCardVisual data={item.data as BodyMovementCardData} />}
          {item.type === 'EXPRESSION_CARD' && item.data && <ExpressionCardVisual data={item.data as ExpressionCardData} />}
          {item.type === 'MIMESIS_ACTION' && item.data && <MimesisActionVisual data={item.data as MimesisActionData} />}

          {/* Pendidikan Pancasila */}
          {item.type === 'IDENTITY_CARD' && item.data && <IdentityCardVisual data={item.data as IdentityCardData} />}
          {item.type === 'RULES_CARD' && item.data && <RulesCardVisual data={item.data as RulesCardData} />}
          {item.type === 'SYMBOL_CARD' && item.data && <SymbolCardVisual data={item.data as SymbolCardData} />}
          {item.type === 'SELF_REFLECTION' && item.data && <SelfReflectionVisual data={item.data as SelfReflectionData} />}

          {/* ⚡ Bahasa Indonesia */}
          {item.type === 'TRACE_LETTER' && item.data && <TraceLetterVisual data={item.data as TraceLetterData} />}
          {item.type === 'MATCH_SYLLABLE' && item.data && <MatchSyllableVisual data={item.data as MatchSyllableData} />}
          {item.type === 'READ_AND_MATCH' && item.data && <ReadAndMatchVisual data={item.data as ReadAndMatchData} />}
          {item.type === 'FILL_THE_WORD' && item.data && <FillTheWordVisual data={item.data as FillTheWordData} />}
          {item.type === 'READING_CARD' && item.data && <ReadingCardVisual data={item.data as ReadingCardData} />}
          {item.type === 'WRITING_LINES' && item.data && <WritingLinesVisual data={item.data as WritingLinesData} />}
        </div>
      </div>

      {!skipAnswerBox && (
        <div className="pl-8 pt-1 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium shrink-0">Jawaban:</span>
            <div className="border-b border-dotted border-black flex-1 h-5" />
          </div>
        </div>
      )}
    </div>
  );
}