'use client';

import React, { useState, useTransition } from 'react';
import {
  Mic,
  Camera,
  Calendar,
  Volume2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import { createAssignmentAction } from '../actions/assignment-actions';
import { validateAudioFile } from '@/features/shared/validations/media-validation';
import type { AssignmentType } from '@/types/database';

export interface LessonOption {
  id: string;
  title: string;
}

interface AssignmentFormProps {
  lessons: LessonOption[];
  onSuccess?: () => void;
}

export function AssignmentForm({ lessons, onSuccess }: AssignmentFormProps) {
  const [isPending, startTransition] = useTransition();

  // Form states
  const [lessonId, setLessonId] = useState(lessons[0]?.id ?? '');
  const [type, setType] = useState<AssignmentType>('VOICE_TASK');
  const [prompt, setPrompt] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Audio instruction toggle (Fase A low-literacy adaptation)
  const [hasAudioInstruction, setHasAudioInstruction] = useState(false);
  const [instructionAudioUrl, setInstructionAudioUrl] = useState('');
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAudioSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error ?? 'Berkas audio tidak sah.');
      return;
    }

    setErrorMessage(null);
    setAudioFileName(file.name);
    setIsUploadingAudio(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('folder', 'audio-prompts');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error ?? 'Gagal mengunggah berkas audio panduan guru.');
      }

      setInstructionAudioUrl(data.url);
    } catch (err: unknown) {
      console.error('[AssignmentForm] Audio upload error:', err);
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah audio instruksi ke Cloudflare R2.';
      setErrorMessage(msg);
      setAudioFileName(null);
      setInstructionAudioUrl('');
    } finally {
      setIsUploadingAudio(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!lessonId) {
      setErrorMessage('Silakan pilih materi pembelajaran terkait.');
      return;
    }

    if (prompt.trim().length < 5) {
      setErrorMessage('Instruksi tugas minimal 5 karakter.');
      return;
    }

    // Format dueDate jika diisi
    let formattedDueDate: string | null = null;
    if (dueDate.trim()) {
      try {
        formattedDueDate = new Date(dueDate).toISOString();
      } catch {
        setErrorMessage('Format batas waktu tidak valid.');
        return;
      }
    }

    startTransition(async () => {
      const response = await createAssignmentAction({
        lessonId,
        type,
        prompt: prompt.trim(),
        instructionAudioUrl: hasAudioInstruction && instructionAudioUrl.trim() ? instructionAudioUrl.trim() : null,
        dueDate: formattedDueDate,
      });

      if (!response.success) {
        setErrorMessage(response.error);
      } else {
        setSuccessMessage(`Tugas (${type === 'VOICE_TASK' ? 'Tugas Suara' : 'Foto PR'}) berhasil dibuat!`);
        setPrompt('');
        setDueDate('');
        setInstructionAudioUrl('');
        setAudioFileName(null);
        setHasAudioInstruction(false);
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alert Notifikasi Feedback */}
      {errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-xs animate-shake"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">Terjadi Kesalahan</p>
            <p className="text-xs mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 shadow-xs"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">Berhasil Disimpan</p>
            <p className="text-xs mt-0.5">{successMessage}</p>
          </div>
        </div>
      )}

      {/* 1. Pilih Materi Terkait */}
      <div>
        <label
          htmlFor="assignment-lesson"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
        >
          Pilih Materi Terkait <span className="text-rose-500">*</span>
        </label>
        {lessons.length > 0 ? (
          <select
            id="assignment-lesson"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
            disabled={isPending || isUploadingAudio}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm disabled:opacity-50"
          >
            {lessons.map((les) => (
              <option key={les.id} value={les.id}>
                {les.title}
              </option>
            ))}
          </select>
        ) : (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
            Belum ada materi pembelajaran yang tersedia. Buat materi terlebih dahulu di tab sebelah.
          </div>
        )}
      </div>

      {/* 2. Jenis Penugasan Siswa */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Jenis Penugasan Adaptif <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType('VOICE_TASK')}
            disabled={isPending || isUploadingAudio}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
              type === 'VOICE_TASK'
                ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-400 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">Tugas Rekam Suara (Voice Task)</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Ideal untuk Fase A (Kelas 1–2): Siswa membaca fonik atau berhitung satu sentuhan tombol mikrofon.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setType('PHOTO_HOMEWORK')}
            disabled={isPending || isUploadingAudio}
            className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
              type === 'PHOTO_HOMEWORK'
                ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-400 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">Foto PR / Buku Tulis (Photo Homework)</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Ideal untuk pengerjaan tulisan tangan, gambar diagram IPAS, atau lembar kerja siswa.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Teks Instruksi Tugas */}
      <div>
        <label
          htmlFor="assignment-prompt"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
        >
          Teks Instruksi / Soal Tugas <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="assignment-prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Contoh: Tekan tombol mikrofon besar, lalu ucapkan kalimat 'Buku Budi Baru' dengan lantang dan percaya diri!"
          disabled={isPending || isUploadingAudio}
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
        />
      </div>

      {/* 4. Fitur Adaptif Fase A: Toggle Audio Instruksi */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <label htmlFor="toggle-audio-instruction" className="text-xs font-bold text-slate-900 flex items-center gap-1 cursor-pointer">
                <span>Audio Panduan Guru (Fase A Adaptif)</span>
                <Sparkles className="w-3 h-3 text-amber-600" />
              </label>
              <p className="text-[11px] text-slate-500">
                Sediakan suara Anda membacakan instruksi bagi siswa yang belum lancar membaca.
              </p>
            </div>
          </div>
          <input
            id="toggle-audio-instruction"
            type="checkbox"
            checked={hasAudioInstruction}
            onChange={(e) => setHasAudioInstruction(e.target.checked)}
            disabled={isPending}
            className="w-5 h-5 text-amber-500 rounded-md focus:ring-amber-400 cursor-pointer"
          />
        </div>

        {hasAudioInstruction && (
          <div className="pt-2 border-t border-amber-200/60 space-y-2">
            <label htmlFor="audio-instruction-upload" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Unggah Rekaman Suara Petunjuk (MP3 / WebM)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="audio-instruction-upload"
                type="file"
                accept="audio/*"
                onChange={handleAudioSelection}
                disabled={isPending || isUploadingAudio}
                className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-500 cursor-pointer disabled:opacity-50"
              />
              {isUploadingAudio && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span>Mengunggah audio ke R2...</span>
                </div>
              )}
              {!isUploadingAudio && audioFileName && instructionAudioUrl && (
                <span className="text-xs font-semibold text-emerald-700 truncate max-w-xs">
                  ✓ {audioFileName}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Batas Waktu Pengumpulan (Opsional) */}
      <div>
        <label
          htmlFor="assignment-due-date"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
        >
          Batas Waktu Pengumpulan (Opsional)
        </label>
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Calendar className="w-4 h-4" />
          </div>
          <input
            id="assignment-due-date"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={isPending || isUploadingAudio}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
          />
        </div>
      </div>

      {/* 6. Tombol Aksi Submit */}
      <button
        type="submit"
        disabled={isPending || isUploadingAudio || lessons.length === 0}
        className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending || isUploadingAudio ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isUploadingAudio ? 'Mengunggah Audio...' : 'Membuat Tugas...'}</span>
          </>
        ) : (
          <span>Simpan & Terbitkan Penugasan</span>
        )}
      </button>
    </form>
  );
}
