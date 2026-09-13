'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Heart,
  Smile,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  ChevronRight,
  Package,
  Layers,
  Award,
  UserCheck,
  HelpCircle,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import {
  evaluateCompetencyAction,
  completeLessonSessionAction,
  type TeachingDeskData,
} from '@/features/teacher/actions/acceleration-actions';
import type { PedagogicLessonGuide, LearningCompetencyEvaluation } from '@/types';

interface PhaseConfig {
  id: 'intro' | 'mindful' | 'joyful' | 'meaningful' | 'reflection';
  label: string;
  durationMinutes: number;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: {
    active: string;
    border: string;
    text: string;
    bg: string;
  };
}

const PHASES: PhaseConfig[] = [
  {
    id: 'intro',
    label: 'Pendahuluan',
    durationMinutes: 10,
    badge: '10m',
    icon: Sparkles,
    color: {
      active: 'bg-amber-500 text-white',
      border: 'border-amber-300',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
    },
  },
  {
    id: 'mindful',
    label: 'Mindful Concrete',
    durationMinutes: 20,
    badge: '20m',
    icon: Heart,
    color: {
      active: 'bg-indigo-600 text-white',
      border: 'border-indigo-300',
      text: 'text-indigo-700',
      bg: 'bg-indigo-50',
    },
  },
  {
    id: 'joyful',
    label: 'Joyful Game',
    durationMinutes: 20,
    badge: '20m',
    icon: Smile,
    color: {
      active: 'bg-emerald-600 text-white',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
    },
  },
  {
    id: 'meaningful',
    label: 'Meaningful LKPD',
    durationMinutes: 15,
    badge: '15m',
    icon: BookOpen,
    color: {
      active: 'bg-sky-600 text-white',
      border: 'border-sky-300',
      text: 'text-sky-700',
      bg: 'bg-sky-50',
    },
  },
  {
    id: 'reflection',
    label: 'Refleksi Formatif',
    durationMinutes: 5,
    badge: '5m',
    icon: Award,
    color: {
      active: 'bg-purple-600 text-white',
      border: 'border-purple-300',
      text: 'text-purple-700',
      bg: 'bg-purple-50',
    },
  },
];

interface MejaAjarClientProps {
  initialData: TeachingDeskData;
}

export function MejaAjarClient({ initialData }: MejaAjarClientProps) {
  const { lesson, module: mod, classRecord, students: initialStudents } = initialData;

  // Cast guides
  const introGuide = lesson.intro_guide as unknown as PedagogicLessonGuide['intro'] | null;
  const mindfulGuide = lesson.mindful_guide as unknown as PedagogicLessonGuide['mindful'] | null;
  const joyfulGuide = lesson.joyful_guide as unknown as PedagogicLessonGuide['joyful'] | null;
  const meaningfulGuide = lesson.meaningful_guide as unknown as PedagogicLessonGuide['meaningful'] | null;
  const materials = lesson.required_materials ?? [];

  // State Timer
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = PHASES[activePhaseIndex];
  const [secondsRemaining, setSecondsRemaining] = useState<number>(activePhase.durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // State Checklist Bahan
  const [checkedMaterials, setCheckedMaterials] = useState<Record<number, boolean>>({});

  // State Siswa & Evaluasi Micro-Assessment
  const [students, setStudents] = useState(initialStudents);
  const [isSubmittingComplete, setIsSubmittingComplete] = useState<boolean>(false);
  const [evaluatingStudentId, setEvaluatingStudentId] = useState<string | null>(null);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
      toast.success(`Fase ${activePhase.label} selesai! Siap melangkah ke fase berikutnya.`);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, activePhase.label]);

  const handleSelectPhase = (index: number) => {
    setActivePhaseIndex(index);
    setSecondsRemaining(PHASES[index].durationMinutes * 60);
    setIsRunning(false);
  };

  const handleToggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSecondsRemaining(activePhase.durationMinutes * 60);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Toggle Alat Peraga Checklist
  const toggleMaterialCheck = (idx: number) => {
    setCheckedMaterials((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // One-Tap Micro-Assessment Handler
  const handleEvaluateOneTap = async (
    studentId: string,
    masteryLevel: 'NEEDS_HELP' | 'PROFICIENT'
  ) => {
    setEvaluatingStudentId(studentId);
    const tpText = lesson.learning_objectives || lesson.title;

    try {
      const res = await evaluateCompetencyAction({
        studentId,
        lessonId: lesson.id,
        tpIndicatorText: tpText,
        masteryLevel,
        notes: masteryLevel === 'PROFICIENT' ? 'Tuntas mandiri' : 'Butuh bimbingan konkret',
      });

      if (!res.success) {
        toast.error(res.error || 'Gagal menyimpan evaluasi');
        return;
      }

      if (!res.data) {
        toast.error('Data evaluasi tidak ditemukan');
        return;
      }

      setStudents((prev) =>
        prev.map((s) => (s.id === studentId ? { ...s, evaluation: res.data } : s))
      );
      toast.success(
        masteryLevel === 'PROFICIENT'
          ? 'Tercatat: Mahir / Tuntas! 🌟'
          : 'Tercatat: Perlu Bimbingan Konkret 💡'
      );
    } catch {
      toast.error('Gagal menghubungi server.');
    } finally {
      setEvaluatingStudentId(null);
    }
  };

  // Selesaikan Sesi Ajar (Semua siswa / Sesi umum)
  const handleCompleteSession = async () => {
    setIsSubmittingComplete(true);
    try {
      const res = await completeLessonSessionAction({
        lessonId: lesson.id,
      });

      if (!res.success) {
        toast.error(res.error || 'Gagal menyelesaikan sesi');
        return;
      }

      toast.success('Sesi ajar 70 menit berhasil diselesaikan & jadwal harian diperbarui! 🎉');
      setStudents((prev) => prev.map((s) => ({ ...s, isCompleted: true })));
    } catch {
      toast.error('Gagal menyelesaikan sesi ajar.');
    } finally {
      setIsSubmittingComplete(false);
    }
  };

  const progressPercent = Math.round(
    ((activePhase.durationMinutes * 60 - secondsRemaining) / (activePhase.durationMinutes * 60)) * 100
  );

  return (
    <TeacherLayoutShell
      title="Meja Ajar (Teaching Desk)"
      subtitle={`${lesson.title} • Alokasi 70 Menit`}
      badgeText={mod.week_target ? `Sprint Pekan ${mod.week_target}` : 'Fase A'}
      badgeVariant="amber"
      backHref={`/guru/pelajaran/${lesson.id}`}
      activeNavTab="CURRICULUM"
      defaultClassId={classRecord.id}
      maxWidth="lg"
      headerAction={
        <Link
          href={`/guru/pelajaran/${lesson.id}/cetak`}
          target="_blank"
          className="h-8 px-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs border border-white/20 transition-all cursor-pointer"
          title="Cetak LKPD A4"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Cetak LKPD</span>
        </Link>
      }
    >
      <div className="space-y-4 pb-28 pt-1">
        {/* ====================================================================
            1. LIVE TIMER & KONTROL FASE 70 MENIT
           ==================================================================== */}
        <div className="bg-slate-950 text-white rounded-3xl p-5 shadow-xl border border-slate-800 space-y-4">
          {/* Phase Tabs Selector */}
          <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
            {PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isCurrent = activePhaseIndex === idx;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => handleSelectPhase(idx)}
                  className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${isCurrent
                    ? `${phase.color.active} font-black shadow-md scale-102`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] sm:text-[11px] leading-tight text-center truncate max-w-full">
                    {phase.label.split(' ')[0]}
                  </span>
                  <span className="text-[9px] opacity-80">{phase.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Large Countdown Display */}
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Fase Aktif: {activePhase.label}</span>
              </span>
              <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                {formatTimer(secondsRemaining)}
              </div>
            </div>

            {/* Timer Control Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetTimer}
                className="w-11 h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center transition-all cursor-pointer border border-slate-700"
                title="Reset Timer Fase Ini"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleToggleTimer}
                className={`h-11 px-5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-lg ${isRunning
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-900/30'
                  }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mulai</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ====================================================================
            2. PANDUAN AKTIF SESUAI FASE (KARTU DINAMIS)
           ==================================================================== */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`p-2 rounded-xl ${activePhase.color.bg} ${activePhase.color.text}`}>
                <activePhase.icon className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Instruksi Mengajar: {activePhase.label}
                </h3>
                <p className="text-[11px] font-medium text-slate-500">
                  Ikuti panduan terstruktur di bawah ini selama {activePhase.durationMinutes} menit
                </p>
              </div>
            </div>

            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
              {activePhase.badge}
            </span>
          </div>

          {/* Phase 1: Pendahuluan */}
          {activePhaseIndex === 0 && (
            <div className="space-y-3">
              {/* Sapaan & Salam Pembuka */}
              {(introGuide?.greeting) && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                    👋 Salam Pembuka
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {introGuide.greeting}
                  </p>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                  🎉 Ice Breaker & Pemantik
                </span>
                <p className="text-xs font-bold text-slate-800">
                  {introGuide?.ice_breaker ?? introGuide?.iceBreaker ?? 'Lakukan tepuk semangat bersama anak sebelum memulai.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Apersepsi (Koneksi Pengalaman)
                  </span>
                  <p className="text-slate-700 font-medium">
                    {introGuide?.apperception ?? 'Hubungkan materi dengan kegiatan sehari-hari di rumah.'}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Pertanyaan Pemantik Logika
                  </span>
                  <p className="text-slate-700 font-medium">
                    {introGuide?.trigger_question ?? introGuide?.triggerQuestion ?? 'Mengapa hal ini penting kita pelajari hari ini?'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Mindful Concrete */}
          {activePhaseIndex === 1 && (
            <div className="space-y-3">
              {/* Konsep Kunci - membaca concept_focus dari database */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800">
                  🧠 Konsep Kunci yang Ditanamkan
                </span>
                <p className="text-xs font-bold text-slate-900 leading-relaxed">
                  {mindfulGuide?.concept_focus ?? mindfulGuide?.keyConcept ?? 'Pahami konsep melalui eksplorasi benda konkret.'}
                </p>
              </div>

              {/* Langkah Konkret - membaca concrete_steps dari database */}
              {(mindfulGuide?.concrete_steps ?? mindfulGuide?.explorationSteps) && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-slate-400">
                    Langkah Eksplorasi Benda Nyata:
                  </span>
                  <ol className="space-y-1.5 pl-4 list-decimal text-xs font-medium text-slate-700">
                    {(mindfulGuide?.concrete_steps ?? mindfulGuide?.explorationSteps ?? []).map((step, sIdx) => (
                      <li key={sIdx} className="pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Naskah Dialog Orang Tua - membaca script_parent dari database */}
              {mindfulGuide?.script_parent && (
                <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-indigo-600">
                    💬 Naskah Dialog untuk Orang Tua / Guru:
                  </span>
                  <p className="text-xs text-slate-700 font-medium italic">
                    {mindfulGuide.script_parent}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Phase 3: Joyful Game */}
          {activePhaseIndex === 2 && (
            <div className="space-y-3">
              {/* Nama Game - membaca game_title dari database */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">
                  🎲 Game Edukatif: {joyfulGuide?.game_title ?? joyfulGuide?.gameName ?? 'Permainan Matematika'}
                </span>
              </div>

              {/* Aturan Main - membaca game_rules dari database */}
              {(joyfulGuide?.game_rules ?? joyfulGuide?.gameRules) && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Aturan Main:
                  </span>
                  <ul className="space-y-1 list-disc pl-4 text-xs font-medium text-slate-700">
                    {(joyfulGuide?.game_rules ?? joyfulGuide?.gameRules ?? []).map((rule, rIdx) => (
                      <li key={rIdx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Adaptasi Multi-Level - membaca multi_grade_adaptation dari database */}
              {joyfulGuide?.multi_grade_adaptation && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-slate-500">
                      Level Dasar
                    </span>
                    <p className="text-slate-700 font-medium">
                      {joyfulGuide.multi_grade_adaptation.child_level_basic}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-indigo-200 space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-600">
                      Level Lanjutan
                    </span>
                    <p className="text-slate-700 font-medium">
                      {joyfulGuide.multi_grade_adaptation.child_level_advanced}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Phase 4: Meaningful LKPD */}
          {activePhaseIndex === 3 && (
            <div className="space-y-3">
              {/* Fokus Tugas - membaca task_focus dari database */}
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-800">
                  📝 Fokus Tugas Lembar Kerja
                </span>
                <p className="text-xs font-bold text-slate-900">
                  {meaningfulGuide?.task_focus ?? meaningfulGuide?.worksheetDirections ?? 'Kerjakan lembar kerja A4 sesuai level siswa (Level Dasar atau Pengayaan).'}
                </p>
              </div>

              {/* Pertanyaan Refleksi - membaca reflection_questions dari database */}
              {meaningfulGuide?.reflection_questions && meaningfulGuide.reflection_questions.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    💡 Pertanyaan Refleksi Penutup:
                  </span>
                  <ul className="space-y-1 list-disc pl-4 text-xs font-medium text-slate-700">
                    {meaningfulGuide.reflection_questions.map((q, qIdx) => (
                      <li key={qIdx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-1 flex items-center justify-end">
                <Link
                  href={`/guru/pelajaran/${lesson.id}/cetak`}
                  target="_blank"
                  className="h-9 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Buka Lembar Kerja Cetak A4</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Phase 5: Refleksi Formatif */}
          {activePhaseIndex === 4 && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800">
                  🌟 Refleksi Formatif Akhir Sesi (5 Menit)
                </span>
                <p className="text-xs font-bold text-slate-900">
                  Ajak anak bercerita tentang apa yang ia pelajari hari ini sebelum menutup sesi.
                </p>
              </div>
              {/* Pertanyaan Refleksi dari meaningful_guide.reflection_questions (jika ada) */}
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium pl-4 list-disc">
                {(meaningfulGuide?.reflection_questions && meaningfulGuide.reflection_questions.length > 0
                  ? meaningfulGuide.reflection_questions
                  : [
                    'Apa hal yang paling menyenangkan yang kamu coba hari ini?',
                    'Bagian mana yang tadi terasa sedikit menantang?',
                    'Bagaimana perasaanmu sekarang? (Senang, Bangga, Semangat!)',
                  ]
                ).map((q, qIdx) => (
                  <li key={qIdx}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ====================================================================
            3. KARTU ALAT PERAGA RUMAH (CHECKLIST MANDIRI)
           ==================================================================== */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Alat Peraga Rumah yang Perlu Disiapkan ({materials.length})
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {Object.values(checkedMaterials).filter(Boolean).length}/{materials.length} Siap
            </span>
          </div>

          {materials.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Tidak memerlukan alat peraga khusus untuk materi ini.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {materials.map((mat, mIdx) => {
                const isChecked = !!checkedMaterials[mIdx];
                return (
                  <button
                    key={mIdx}
                    type="button"
                    onClick={() => toggleMaterialCheck(mIdx)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${isChecked
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium'
                      }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                        }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                    <span className="text-xs leading-snug">{mat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ====================================================================
            4. ONE-TAP MICRO-ASSESSMENT FORMATIF SISWA
           ==================================================================== */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  One-Tap Formatif: Ketercapaian TP Siswa
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Ketuk status ketercapaian per anak tanpa berpindah halaman
              </p>
            </div>

            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
              {students.length} Siswa
            </span>
          </div>

          {students.length === 0 ? (
            <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
              Belum ada data siswa di kelas ini.
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((st) => {
                const evalData = st.evaluation;
                const isProficient = evalData?.mastery_level === 'PROFICIENT';
                const isNeedsHelp = evalData?.mastery_level === 'NEEDS_HELP';
                const isEvaluating = evaluatingStudentId === st.id;

                return (
                  <div
                    key={st.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs flex items-center justify-center shrink-0">
                        {st.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{st.full_name}</p>
                        <p className="text-[10px] text-slate-400">
                          {evalData
                            ? `Status: ${isProficient
                              ? 'Mahir / Tuntas'
                              : isNeedsHelp
                                ? 'Perlu Bimbingan'
                                : 'Berkembang'
                            }`
                            : 'Belum dievaluasi'}
                        </p>
                      </div>
                    </div>

                    {/* Action Tap Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        disabled={isEvaluating}
                        onClick={() => handleEvaluateOneTap(st.id, 'NEEDS_HELP')}
                        className={`h-8 px-3 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${isNeedsHelp
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white border border-rose-200 text-rose-700 hover:bg-rose-50'
                          }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Perlu Bimbingan</span>
                      </button>

                      <button
                        type="button"
                        disabled={isEvaluating}
                        onClick={() => handleEvaluateOneTap(st.id, 'PROFICIENT')}
                        className={`h-8 px-3 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${isProficient
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                          }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mahir 🌟</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ====================================================================
            5. TOMBOL CEPAT SELESAIKAN SESI AJAR
           ==================================================================== */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-5 shadow-lg border border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Selesaikan Sesi Mengajar Hari Ini</span>
            </h4>
            <p className="text-xs text-indigo-200 font-medium">
              Otomatis tandai status jadwal harian siswa menjadi COMPLETED.
            </p>
          </div>

          <button
            type="button"
            disabled={isSubmittingComplete}
            onClick={handleCompleteSession}
            className="w-full sm:w-auto h-11 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmittingComplete ? 'Menyimpan...' : 'Selesaikan Sesi (70 Menit)'}</span>
          </button>
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
