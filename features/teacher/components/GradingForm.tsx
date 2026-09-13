'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Award,
  Send,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { TeacherFeedbackRecorder } from './TeacherFeedbackRecorder';
import { gradeSubmissionAction } from '../actions/grading-actions';

interface GradingFormProps {
  submissionId: string;
  initialGrade?: number | null;
  initialFeedbackText?: string | null;
  initialFeedbackAudioUrl?: string | null;
  status: 'PENDING' | 'GRADED';
}

export function GradingForm({
  submissionId,
  initialGrade = null,
  initialFeedbackText = null,
  initialFeedbackAudioUrl = null,
  status,
}: GradingFormProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<'PENDING' | 'GRADED'>(status);
  const [grade, setGrade] = useState<number | string>(
    initialGrade !== null && initialGrade !== undefined ? initialGrade : 85
  );
  const [feedbackText, setFeedbackText] = useState<string>(
    initialFeedbackText ?? ''
  );
  const [feedbackAudioUrl, setFeedbackAudioUrl] = useState<string | null>(
    initialFeedbackAudioUrl ?? null
  );
  const [isPending, startTransition] = useTransition();

  const isGraded = currentStatus === 'GRADED';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericGrade = Number(grade);
    if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      toast.error('Nilai harus berupa angka antara 0 sampai 100.');
      return;
    }

    startTransition(async () => {
      try {
        const response = await gradeSubmissionAction({
          submissionId,
          grade: numericGrade,
          feedbackText: feedbackText.trim() ? feedbackText.trim() : null,
          feedbackAudioUrl: feedbackAudioUrl ?? null,
        });

        if (!response.success) {
          toast.error(response.error);
          return;
        }

        // Langsung ubah status antarmuka seketika
        setCurrentStatus('GRADED');
        toast.success(
          isGraded
            ? 'Penilaian & umpan balik berhasil diperbarui!'
            : 'Nilai dan umpan balik berhasil disimpan! Tugas selesai diperiksa.'
        );
        router.refresh();
      } catch (err: unknown) {
        console.error('[GradingForm] Submit error:', err);
        const msg =
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan saat menyimpan penilaian.';
        toast.error(msg);
      }
    });
  };

  return (
    <form
      data-testid="grading-form"
      onSubmit={handleSubmit}
      className={`p-5 sm:p-6 rounded-3xl border-2 transition-all space-y-6 shadow-xs ${isGraded
          ? 'bg-gradient-to-b from-emerald-50/40 via-white to-white border-emerald-300 ring-2 ring-emerald-100'
          : 'bg-white border-slate-200'
        }`}
    >
      {/* Header Card Dinamis */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-colors ${isGraded
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
              }`}
          >
            {isGraded ? <Sparkles className="w-5 h-5" /> : <Award className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-slate-900">
              {isGraded ? 'Hasil Evaluasi & Nilai Guru' : 'Formulir Penilaian & Koreksi'}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              {isGraded
                ? 'Penilaian sudah tersimpan dan dapat diubah sewaktu-waktu'
                : 'Kurikulum Merdeka • Berikan penilaian formatif dan saran'}
            </p>
          </div>
        </div>

        {/* Badge Status */}
        {isGraded ? (
          <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Sudah Dinilai ✓</span>
          </div>
        ) : (
          <div className="px-3 py-1 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Menunggu Penilaian</span>
          </div>
        )}
      </div>

      {/* Input Nilai Skala 0 - 100 */}
      <div className="space-y-1.5">
        <label
          htmlFor="grade-input"
          className="block text-xs font-black text-slate-700 uppercase tracking-wider"
        >
          Nilai Siswa (Skala 0–100) <span className="text-rose-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            id="grade-input"
            data-testid="grade-input"
            type="number"
            min={0}
            max={100}
            required
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={`w-36 px-4 py-2.5 rounded-2xl border-2 font-black text-2xl focus:outline-none transition-all ${isGraded
                ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950 focus:ring-2 focus:ring-emerald-400'
                : 'border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-sky-500'
              }`}
          />
          <span className="text-xs sm:text-sm font-bold text-slate-500">
            / 100 Poin
          </span>
        </div>
      </div>

      {/* Input Catatan Teks Guru */}
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-text"
          className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          <span>Catatan / Umpan Balik Teks Guru (Opsional)</span>
        </label>
        <textarea
          id="feedback-text"
          data-testid="feedback-text-input"
          rows={3}
          maxLength={1000}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Contoh: Lafal membaca sudah sangat lantang dan tepat! Pertahankan semangat belajarnya ya..."
          className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 leading-relaxed"
        />
        <p className="text-[10.5px] text-slate-400 text-right">
          Maksimal 1000 karakter
        </p>
      </div>

      {/* Perekam Ulasan Suara Guru */}
      <TeacherFeedbackRecorder
        submissionId={submissionId}
        initialAudioUrl={initialFeedbackAudioUrl}
        onAudioReady={(url) => setFeedbackAudioUrl(url)}
        disabled={isPending}
      />

      {/* Tombol Aksi Simpan / Perbarui Nilai */}
      <div className="pt-2 flex items-center justify-end border-t border-slate-100">
        <button
          data-testid="submit-grading-btn"
          type="submit"
          disabled={isPending}
          className={`min-h-[50px] px-7 py-3 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-95 shadow-md ${isGraded
              ? 'bg-emerald-600 hover:bg-emerald-700 border-b-4 border-emerald-800 shadow-emerald-200'
              : 'bg-sky-600 hover:bg-sky-700 border-b-4 border-sky-800 shadow-sky-200'
            }`}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isGraded ? 'Menyimpan Perubahan...' : 'Menyimpan Penilaian...'}</span>
            </>
          ) : isGraded ? (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Perbarui Nilai & Ulasan</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Simpan & Kirim Penilaian</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}