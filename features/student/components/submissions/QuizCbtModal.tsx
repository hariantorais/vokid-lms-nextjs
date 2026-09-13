'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Flame,
  Check,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import {
  getQuizSessionForStudentAction,
  submitQuizCbtAction,
  type QuizCbtSessionData,
  type QuizEvaluationResult,
} from '@/features/student/actions/quiz-cbt.actions';
import {
  triggerPerfectScoreFireworks,
  triggerExcellentCelebration,
  triggerGoodJobCelebration,
} from '@/features/student/utils/quiz-effects';

interface QuizCbtModalProps {
  assignmentId: string;
  assignmentTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (score?: number) => void;
  initialScore?: number | null;
}

export function QuizCbtModal({
  assignmentId,
  assignmentTitle,
  isOpen,
  onClose,
  onSuccess,
  initialScore,
}: QuizCbtModalProps) {
  const [session, setSession] = useState<QuizCbtSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [result, setResult] = useState<QuizEvaluationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  // Load / Reload Sesi Kuis (Soal Diacak Setiap Kali Memulai / Mengulang)
  const loadQuizSession = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentIndex(0);
    setSelectedAnswers({});

    const res = await getQuizSessionForStudentAction(assignmentId);
    if (!res.success) {
      setError(res.error || 'Gagal memuat soal kuis CBT.');
      setLoading(false);
      return;
    }

    setSession(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadQuizSession();
    }
  }, [isOpen, assignmentId]);

  if (!isOpen) return null;

  const questions = session?.questions ?? [];
  const currentQuestion = questions[currentIndex];
  const totalCount = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion || result) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleSubmitQuiz = () => {
    if (answeredCount < totalCount) {
      alert(`Mohon jawab semua soal terlebih dahulu (${answeredCount}/${totalCount} terjawab).`);
      return;
    }

    startTransition(async () => {
      const answersPayload = questions.map((q) => ({
        questionId: q.id,
        selectedOption: selectedAnswers[q.id] || 'A',
      }));

      const res = await submitQuizCbtAction({
        assignmentId,
        answers: answersPayload,
      });

      if (!res.success) {
        alert(res.error || 'Gagal mengirim jawaban.');
        return;
      }

      const evalResult = res.data;
      setResult(evalResult);

      // Efek selebrasi bertingkat berdasarkan skor:
      if (evalResult.isPerfect) {
        triggerPerfectScoreFireworks();
      } else if (evalResult.isExcellent) {
        triggerExcellentCelebration();
      } else if (evalResult.isGood) {
        triggerGoodJobCelebration();
      }

      if (onSuccess) {
        onSuccess(evalResult.score);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header Kuis CBT */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black tracking-wider uppercase text-purple-600">
                Ujian CBT Interaktif
              </span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                {assignmentTitle}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-600 font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
              <p className="text-xs font-bold text-slate-600">
                Menyiapkan soal acak dari bank soal...
              </p>
            </div>
          ) : error ? (
            <div className="py-12 text-center space-y-3 p-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-rose-600">{error}</p>
              <button
                type="button"
                onClick={loadQuizSession}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Coba Lagi
              </button>
            </div>
          ) : result ? (
            /* Tampilan Hasil Evaluasi & Nilai Instan */
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div
                className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${result.isPerfect
                  ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 ring-4 ring-amber-200'
                  : result.isExcellent
                    ? 'bg-gradient-to-tr from-sky-500 to-indigo-500 text-white ring-4 ring-sky-200'
                    : result.isGood
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white ring-4 ring-emerald-200'
                      : 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white ring-4 ring-rose-200'
                  }`}
              >
                {result.isPerfect ? (
                  <Flame className="w-10 h-10 animate-pulse" />
                ) : result.passed ? (
                  <Award className="w-10 h-10" />
                ) : (
                  <RotateCcw className="w-10 h-10" />
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  {result.isPerfect
                    ? '🌟 LUAR BIASA! SEMPURNA!'
                    : result.isExcellent
                      ? '🎉 SANGAT MEMUASKAN!'
                      : result.isGood
                        ? '👏 KERJA BAGUS, LULUS!'
                        : '💪 PERLU MENGULANG'}
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {result.score}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>
                <p className="text-xs font-semibold text-slate-600 max-w-xs mx-auto leading-relaxed mt-2">
                  {result.isPerfect
                    ? 'Keren sekali! Semua jawabanmu benar dan tepat. Terus pertahankan prestasimu!'
                    : result.isExcellent
                      ? `Hasil belajarmu istimewa! Kamu berhasil menjawab ${result.correctCount} dari ${result.totalQuestions} soal.`
                      : result.isGood
                        ? `Kamu lulus KKM (${result.passingScore}) dengan menjawab benar ${result.correctCount} dari ${result.totalQuestions} soal.`
                        : `Nilaimu belum mencapai batas KKM (${result.passingScore}). Soal berikutnya akan diacak kembali agar kamu makin paham.`}
                </p>
              </div>

              {/* Rincian Skor */}
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-left">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 block">Benar</span>
                    <span className="text-base font-black text-emerald-900">
                      {result.correctCount} Soal
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-rose-700 block">Salah</span>
                    <span className="text-base font-black text-rose-900">
                      {result.wrongCount} Soal
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {result.isNeedsRetry ? (
                  <button
                    type="button"
                    onClick={loadQuizSession}
                    className="h-11 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi dengan Soal Baru</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={loadQuizSession}
                      className="h-10 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Soal Acak Lain</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="h-10 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Selesai</span>
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : currentQuestion ? (
            /* Lembar Pengerjaan Soal CBT */
            <div className="space-y-4">
              {/* Progress & Navigator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>
                    Soal {currentIndex + 1} dari {totalCount}
                  </span>
                  <span className="text-purple-600">{answeredCount}/{totalCount} Terjawab</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Mini Quick Nav Numbers */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = Boolean(selectedAnswers[q.id]);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${isCurrent
                        ? 'bg-purple-600 text-white shadow-xs'
                        : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Kotak Soal Pertanyaan */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider bg-purple-100/70 px-2 py-0.5 rounded-md">
                  Pertanyaan #{currentIndex + 1}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-wrap">
                  {currentQuestion.question_text}
                </p>
              </div>

              {/* Pilihan Jawaban (A, B, C, D) */}
              <div className="space-y-2 pt-1">
                {[
                  { key: 'A', text: currentQuestion.option_a },
                  { key: 'B', text: currentQuestion.option_b },
                  { key: 'C', text: currentQuestion.option_c },
                  { key: 'D', text: currentQuestion.option_d },
                ].map((opt) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelectOption(opt.key as 'A' | 'B' | 'C' | 'D')}
                      className={`w-full p-3 sm:p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3 active:scale-[0.99] ${isSelected
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20 shadow-xs text-purple-950'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                        }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${isSelected
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                          }`}
                      >
                        {opt.key}
                      </div>
                      <span className="text-xs font-medium leading-relaxed flex-1 pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Navigasi Antar Soal */}
        {!result && !loading && !error && currentQuestion && (
          <div className="px-5 py-3 border-t border-slate-100 bg-white flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="h-10 px-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < totalCount - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(totalCount - 1, prev + 1))}
                className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={isPending || answeredCount < totalCount}
                className="h-10 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengoreksi...</span>
                  </>
                ) : (
                  <>
                    <span>Selesai & Kumpulkan</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
