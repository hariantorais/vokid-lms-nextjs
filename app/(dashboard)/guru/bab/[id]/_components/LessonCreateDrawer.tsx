'use client';

import React from 'react';
import {
  Loader2,
  BookOpen,
  Video,
  FileText,
  Target,
  UploadCloud,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { MobileDrawer } from '@/features/teacher/components/MobileDrawer';
import type { ModuleWithLessonsAndAssignments } from '@/features/teacher/types/curriculum';
import type { Lesson } from '@/types/database';

export const uploadPdfFile = async (file: File): Promise<string | null> => {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    toast.error('Berkas harus berupa dokumen PDF (.pdf)');
    return null;
  }

  const maxSize = 20 * 1024 * 1024; // 20MB
  if (file.size > maxSize) {
    toast.error('Ukuran berkas PDF maksimal 20MB.');
    return null;
  }

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
      throw new Error(data.error || 'Gagal mengunggah PDF ke Cloudflare R2.');
    }

    toast.success(`Berkas PDF "${file.name}" berhasil diunggah ke R2!`);
    return data.url as string;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat mengunggah PDF.';
    toast.error(msg);
    return null;
  }
};

interface LessonCreateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: ModuleWithLessonsAndAssignments | null | undefined;
  newLessonTitle: string;
  setNewLessonTitle: (title: string) => void;
  newLessonType: Lesson['content_type'];
  setNewLessonType: (type: Lesson['content_type']) => void;
  newLessonText: string;
  setNewLessonText: (text: string) => void;
  newLessonUrl: string;
  setNewLessonUrl: (url: string) => void;
  newLessonObjectives: string;
  setNewLessonObjectives: (obj: string) => void;
  newPdfFileName: string;
  setNewPdfFileName: (name: string) => void;
  isUploadingNewPdf: boolean;
  setIsUploadingNewPdf: (uploading: boolean) => void;
  handleCreateLesson: (e: React.FormEvent) => void;
  isPending: boolean;
}

export function LessonCreateDrawer({
  isOpen,
  onClose,
  activeModule,
  newLessonTitle,
  setNewLessonTitle,
  newLessonType,
  setNewLessonType,
  newLessonText,
  setNewLessonText,
  newLessonUrl,
  setNewLessonUrl,
  newLessonObjectives,
  setNewLessonObjectives,
  newPdfFileName,
  setNewPdfFileName,
  isUploadingNewPdf,
  setIsUploadingNewPdf,
  handleCreateLesson,
  isPending,
}: LessonCreateDrawerProps) {
  return (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={activeModule ? `Tambah Materi: ${activeModule.title}` : 'Tambah Materi'}
    >
      <form onSubmit={handleCreateLesson} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Judul Materi *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Belajar Membilang Bilangan 1-5"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-sky-600" />
              <span>Tujuan Pembelajaran Siswa</span>
            </label>
            <span className="text-[10px] text-slate-400 font-medium">(Opsional)</span>
          </div>
          <textarea
            rows={2}
            placeholder="Contoh: Siswa mampu mengenali dan membilang angka 1 sampai 5 dengan benar..."
            value={newLessonObjectives}
            onChange={(e) => setNewLessonObjectives(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Format Konten
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setNewLessonType('TEXT')}
              className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                newLessonType === 'TEXT'
                  ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Teks</span>
            </button>
            <button
              type="button"
              onClick={() => setNewLessonType('VIDEO')}
              className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                newLessonType === 'VIDEO'
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Video</span>
            </button>
            <button
              type="button"
              onClick={() => setNewLessonType('PDF')}
              className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                newLessonType === 'PDF'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {newLessonType === 'TEXT' ? (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Isi Teks Bacaan / Modul *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Tuliskan cerita bacaan atau penjelasan materi..."
              value={newLessonText}
              onChange={(e) => setNewLessonText(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
            />
          </div>
        ) : newLessonType === 'VIDEO' ? (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tautan Media Video (YouTube, Video URL) *
            </label>
            <input
              type="url"
              required
              placeholder="Contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/..."
              value={newLessonUrl}
              onChange={(e) => setNewLessonUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              💡 Mendukung link YouTube (watch, embed, youtu.be, shorts), Google Drive, & file MP4.
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Unggah Berkas PDF Modul *
            </label>
            <div className="space-y-2">
              <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  disabled={isUploadingNewPdf || isPending}
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setIsUploadingNewPdf(true);
                    setNewPdfFileName(file.name);
                    const url = await uploadPdfFile(file);
                    if (url) {
                      setNewLessonUrl(url);
                    } else {
                      setNewPdfFileName('');
                    }
                    setIsUploadingNewPdf(false);
                  }}
                />
                <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs border border-rose-200 mb-2">
                  {isUploadingNewPdf ? (
                    <Loader2 className="w-5 h-5 animate-spin text-rose-600" />
                  ) : (
                    <UploadCloud className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800 block">
                  {isUploadingNewPdf
                    ? 'Sedang mengunggah berkas...'
                    : newPdfFileName || 'Pilih Berkas PDF (Maksimal 20MB)'}
                </span>
              </label>

              {newLessonUrl && (
                <div className="p-2.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between gap-2 shadow-2xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs text-slate-700 truncate font-semibold">
                      {newPdfFileName || 'Berkas PDF Terunggah'}
                    </span>
                  </div>
                  <a
                    href={newLessonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-bold shrink-0 underline"
                  >
                    Pratinjau
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Materi'}
        </button>
      </form>
    </MobileDrawer>
  );
}
