'use client';

import React, { useState, useTransition } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Volume2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link2,
} from 'lucide-react';
import { createLessonAction } from '../actions/lesson-actions';
import { validateMaterialFile } from '@/features/shared/validations/media-validation';
import type { ContentType } from '@/types/database';

export interface ModuleOption {
  id: string;
  title: string;
  subjectName: string;
}

interface LessonFormProps {
  modules: ModuleOption[];
  onSuccess?: () => void;
}

export function LessonForm({ modules, onSuccess }: LessonFormProps) {
  const [isPending, startTransition] = useTransition();

  const [moduleId, setModuleId] = useState(modules[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState<ContentType>('TEXT');
  const [contentUrl, setContentUrl] = useState('');
  const [contentText, setContentText] = useState('');
  const [orderIndex, setOrderIndex] = useState(1);

  const [inputMode, setInputMode] = useState<'URL' | 'FILE'>('URL');
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateMaterialFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error ?? 'Format berkas tidak sah.');
      return;
    }

    setErrorMessage(null);
    setUploadFileName(file.name);
    setIsUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('folder', 'materials');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error ?? 'Gagal mengunggah berkas ke penyimpanan.');
      }

      setContentUrl(data.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah berkas materi.';
      setErrorMessage(msg);
      setUploadFileName(null);
      setContentUrl('');
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!moduleId) {
      setErrorMessage('Pilih bab modul terlebih dahulu.');
      return;
    }

    if (title.trim().length < 3) {
      setErrorMessage('Judul materi minimal 3 karakter.');
      return;
    }

    if (contentType === 'TEXT' && !contentText.trim()) {
      setErrorMessage('Teks bacaan atau cerita wajib diisi.');
      return;
    }

    startTransition(async () => {
      const response = await createLessonAction({
        moduleId,
        title: title.trim(),
        contentType,
        contentUrl: contentType === 'TEXT' ? null : contentUrl.trim(),
        contentText: contentType === 'TEXT' ? contentText.trim() : null,
        orderIndex,
      });

      if (!response.success) {
        setErrorMessage(response.error);
      } else {
        setSuccessMessage('Materi berhasil diterbitkan ke siswa!');
        setTitle('');
        setContentUrl('');
        setContentText('');
        setUploadFileName(null);
        setOrderIndex((prev) => prev + 1);
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 select-none">
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 1. Pilih Bab Modul */}
      <div>
        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
          Pilih Bab Modul *
        </label>
        {modules.length > 0 ? (
          <select
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-3 rounded-2xl border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:ring-2 focus:ring-sky-500"
          >
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.subjectName} — {m.title}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl">Belum ada modul aktif.</p>
        )}
      </div>

      {/* 2. Judul Materi */}
      <div>
        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
          Judul Materi Pembelajaran *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Subbab A: Menghitung Bilangan 1-10"
          disabled={isPending}
          required
          className="w-full px-3 py-3 rounded-2xl border border-slate-300 font-bold text-xs text-slate-900 focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* 3. Format Materi (Grid 2x2 Cepat Tekan) */}
      <div>
        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
          Format Konten *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { type: 'TEXT' as const, label: 'Teks Bacaan', icon: BookOpen, color: 'text-emerald-700 bg-emerald-50' },
            { type: 'VIDEO' as const, label: 'Video YouTube', icon: Video, color: 'text-rose-700 bg-rose-50' },
            { type: 'PDF' as const, label: 'Dokumen PDF', icon: FileText, color: 'text-sky-700 bg-sky-50' },
            { type: 'AUDIO' as const, label: 'Audio Fonik', icon: Volume2, color: 'text-amber-700 bg-amber-50' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = contentType === item.type;
            return (
              <button
                key={item.type}
                type="button"
                onClick={() => setContentType(item.type)}
                disabled={isPending}
                className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${isSelected
                    ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-300 font-black shadow-2xs'
                    : 'border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-900">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Input Dinamis: Teks Bacaan atau URL/File */}
      {contentType === 'TEXT' ? (
        <div>
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
            Teks Cerita Apersepsi / Materi *
          </label>
          <textarea
            rows={6}
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            placeholder="Tuliskan narasi cerita konkret Kurikulum Merdeka di sini..."
            required
            className="w-full p-3.5 rounded-2xl border border-slate-300 font-medium text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 leading-relaxed"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
            Tautan / Berkas Media *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Link2 className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={contentUrl}
              onChange={(e) => setContentUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
              required
              className="w-full pl-9 pr-3 py-3 rounded-2xl border border-slate-300 font-medium text-xs text-slate-900 focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      )}

      {/* 5. Tombol Terbitkan */}
      <button
        type="submit"
        disabled={isPending || isUploadingFile}
        className="w-full min-h-[52px] rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-200 transition-all cursor-pointer disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Menyimpan Materi...</span>
          </>
        ) : (
          <span>Terbitkan Materi Sekarang 🚀</span>
        )}
      </button>
    </form>
  );
}