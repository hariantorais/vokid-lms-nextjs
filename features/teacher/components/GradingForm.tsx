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

        toast.success('Nilai dan umpan balik berhasil disimpan!');
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
      className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Formulir Evaluasi & Nilai Guru
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Kurikulum Merdeka • Penilaian Formatif
            </p>
          </div>
        </div>

        {status === 'GRADED' && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sudah Dinilai</span>
          </span>
        )}
      </div>

      {/* Input Nilai Angka (0-100) */}
      <div>
        <label
          htmlFor="grade-input"
          className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5"
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
            className="w-32 px-4 py-3 rounded-xl border border-slate-300 font-black text-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <span className="text-sm font-bold text-slate-500">/ 100 Poin</span>
        </div>
      </div>

      {/* Input Catatan Teks Guru */}
      <div>
        <label
          htmlFor="feedback-text"
          className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
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
          placeholder="Contoh: Lafal membaca Ba-Bi-Bu sudah sangat lantang dan tepat! Pertahankan semangat belajarnya ya."
          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <p className="text-[11px] text-slate-400 text-right mt-1">
          Maksimal 1000 karakter
        </p>
      </div>

      {/* Perekam Audio Umpan Balik Guru */}
      <TeacherFeedbackRecorder
        submissionId={submissionId}
        initialAudioUrl={initialFeedbackAudioUrl}
        onAudioReady={(url) => setFeedbackAudioUrl(url)}
        disabled={isPending}
      />

      {/* Tombol Simpan & Kirim Penilaian */}
      <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
        <button
          data-testid="submit-grading-btn"
          type="submit"
          disabled={isPending}
          className="min-h-[52px] px-8 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-200 transition-all cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Menyimpan Penilaian...</span>
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
