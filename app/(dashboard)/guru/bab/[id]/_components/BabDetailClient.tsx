'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { ModuleDetailView } from './ModuleDetailView';
import { MobileConfirmDialog } from '@/features/teacher/components/MobileConfirmDialog';
import {
  createLessonAction,
  updateLessonAction,
  deleteLessonAction,
} from '@/features/teacher/actions/lesson-actions';
import {
  updateModuleAction,
  deleteModuleAction,
} from '@/features/teacher/actions/teacher-actions';
import { cleanModuleTitle, formatModuleTitle } from '@/lib/formatters';
import {
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Video,
  FileText,
  Target,
  UploadCloud,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import type { BabDetailData } from '../_services/bab-detail.service';
import type { Lesson } from '@/types/database';
import { uploadPdfFile } from '@/tests/features/teacher/utils/file-upload';

interface BabDetailClientProps {
  data: BabDetailData;
}

export function BabDetailClient({ data }: BabDetailClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { module: mod } = data;
  const classData = mod.subject.class;
  const isFaseA = classData.grade_level <= 2;

  // Drawers Bab
  const [editingModule, setEditingModule] = useState<{ id: string; title: string } | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');

  // Form Materi Baru (Full-Page Native)
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<Lesson['content_type']>('TEXT');
  const [newLessonText, setNewLessonText] = useState('');
  const [newLessonUrl, setNewLessonUrl] = useState('');
  const [newLessonObjectives, setNewLessonObjectives] = useState('');
  const [newPdfFileName, setNewPdfFileName] = useState('');
  const [isUploadingNewPdf, setIsUploadingNewPdf] = useState(false);

  // Drawers Edit Lesson
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonType, setEditLessonType] = useState<Lesson['content_type']>('TEXT');
  const [editLessonText, setEditLessonText] = useState('');
  const [editLessonUrl, setEditLessonUrl] = useState('');
  const [editLessonObjectives, setEditLessonObjectives] = useState('');
  const [editPdfFileName, setEditPdfFileName] = useState('');
  const [isUploadingEditPdf, setIsUploadingEditPdf] = useState(false);

  // Native Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => { },
  });

  const resetCreateLessonForm = () => {
    setIsCreateLessonOpen(false);
    setNewLessonTitle('');
    setNewLessonType('TEXT');
    setNewLessonText('');
    setNewLessonUrl('');
    setNewLessonObjectives('');
    setNewPdfFileName('');
    setIsUploadingNewPdf(false);
  };

  // Action Handlers: Update / Delete Module
  const handleUpdateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModule || !editModuleTitle.trim()) {
      toast.error('Judul bab wajib diisi');
      return;
    }
    startTransition(async () => {
      const res = await updateModuleAction({
        moduleId: editingModule.id,
        title: editModuleTitle.trim(),
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Judul bab berhasil diperbarui!');
      setEditingModule(null);
      setEditModuleTitle('');
      router.refresh();
    });
  };

  const handleDeleteModule = (moduleId: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Bab / Modul?',
      description: `Apakah Anda yakin ingin menghapus Bab "${title}"? Bab tidak dapat dihapus jika masih terdapat materi di dalamnya.`,
      confirmLabel: 'Ya, Hapus Bab',
      variant: 'danger',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteModuleAction(moduleId);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Bab berhasil dihapus.');
          router.push(`/guru/kelas/${classData.id}`);
          router.refresh();
        });
      },
    });
  };

  // Action Handlers: Create Lesson
  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) {
      toast.error('Lengkapi judul materi');
      return;
    }
    if (newLessonType === 'TEXT' && !newLessonText.trim()) {
      toast.error('Isi teks materi pembelajaran');
      return;
    }
    if (newLessonType === 'VIDEO' && !newLessonUrl.trim()) {
      toast.error('Tautan video wajib diisi');
      return;
    }
    if (newLessonType === 'PDF' && !newLessonUrl.trim()) {
      toast.error('Berkas PDF belum diunggah');
      return;
    }

    startTransition(async () => {
      const res = await createLessonAction({
        moduleId: mod.id,
        title: newLessonTitle.trim(),
        contentType: newLessonType,
        contentText: newLessonType === 'TEXT' ? newLessonText.trim() : null,
        contentUrl: newLessonType !== 'TEXT' ? newLessonUrl.trim() : null,
        learningObjectives: newLessonObjectives.trim() || null,
        orderIndex: (mod.lessons.length ?? 0) + 1,
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Materi baru berhasil ditambahkan!');
      resetCreateLessonForm();
      router.push(`/guru/pelajaran/${res.data.id}`);
      router.refresh();
    });
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setEditLessonTitle(lesson.title);
    setEditLessonType(lesson.content_type);
    setEditLessonText(lesson.content_text ?? '');
    setEditLessonUrl(lesson.content_url ?? '');
    setEditLessonObjectives(lesson.learning_objectives ?? '');
  };

  const handleUpdateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson || !editLessonTitle.trim()) {
      toast.error('Lengkapi judul materi');
      return;
    }
    startTransition(async () => {
      const res = await updateLessonAction({
        lessonId: editingLesson.id,
        title: editLessonTitle.trim(),
        contentType: editLessonType,
        contentText: editLessonType === 'TEXT' ? editLessonText.trim() : null,
        contentUrl: editLessonType !== 'TEXT' ? editLessonUrl.trim() : null,
        learningObjectives: editLessonObjectives.trim() || null,
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Materi berhasil diperbarui!');
      setEditingLesson(null);
      router.refresh();
    });
  };

  const handleDeleteLesson = (lessonId: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Materi Pembelajaran?',
      description: `Apakah Anda yakin ingin menghapus materi "${title}"? Materi tidak dapat dihapus jika masih terdapat penugasan siswa.`,
      confirmLabel: 'Ya, Hapus Materi',
      variant: 'danger',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteLessonAction(lessonId);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Materi berhasil dihapus.');
          router.refresh();
        });
      },
    });
  };

  // --- 1. FULL-PAGE: UBAH JUDUL BAB ---
  if (editingModule) {
    return (
      <TeacherLayoutShell
        title="Ubah Judul Bab"
        subtitle={`${mod.subject.name} • ${classData.name}`}
        onBackClick={() => {
          setEditingModule(null);
          setEditModuleTitle('');
        }}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="edit-module-form"
          onSubmit={handleUpdateModule}
          className="space-y-4 pt-1 pb-28"
        >
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Contoh: Operasi Penjumlahan dan Pengurangan"
              value={editModuleTitle}
              onChange={(e) => setEditModuleTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
              Judul bab pembelajaran untuk mata pelajaran {mod.subject.name}.
            </p>
          </div>
        </form>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setEditingModule(null);
                setEditModuleTitle('');
              }}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="edit-module-form"
              disabled={isPending}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </div>
      </TeacherLayoutShell>
    );
  }

  // --- 2. FULL-PAGE: TAMBAH MATERI BARU ---
  if (isCreateLessonOpen) {
    return (
      <TeacherLayoutShell
        title="Tambah Materi Baru"
        subtitle={`${formatModuleTitle(mod.order_index, mod.title)} • ${mod.subject.name}`}
        onBackClick={resetCreateLessonForm}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="create-lesson-form"
          onSubmit={handleCreateLesson}
          className="space-y-4 pt-1 pb-28"
        >
          {/* Judul Materi */}
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Materi *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Contoh: Mengenal Bilangan 1 sampai 10"
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
            />
          </div>

          {/* Tujuan Pembelajaran */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-sky-600" />
                <span>Tujuan Pembelajaran Siswa</span>
              </label>
              <span className="text-[10px] text-slate-400 font-medium">(Opsional)</span>
            </div>
            <textarea
              rows={2}
              placeholder="Contoh: Siswa mampu mengenali dan membilang angka 1 sampai 10 secara runtut..."
              value={newLessonObjectives}
              onChange={(e) => setNewLessonObjectives(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all leading-relaxed"
            />
          </div>

          {/* Format Konten */}
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Format Konten
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setNewLessonType('TEXT')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${newLessonType === 'TEXT'
                  ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs ring-2 ring-sky-400/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Teks</span>
              </button>
              <button
                type="button"
                onClick={() => setNewLessonType('VIDEO')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${newLessonType === 'VIDEO'
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs ring-2 ring-amber-400/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <Video className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Video</span>
              </button>
              <button
                type="button"
                onClick={() => setNewLessonType('PDF')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${newLessonType === 'PDF'
                  ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs ring-2 ring-rose-400/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Dynamic Input based on Format */}
          {newLessonType === 'TEXT' ? (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Isi Teks Bacaan / Penjelasan Materi *
              </label>
              <textarea
                rows={6}
                required
                placeholder="Tuliskan cerita bacaan, ringkasan konsep, atau petunjuk pembelajaran untuk siswa..."
                value={newLessonText}
                onChange={(e) => setNewLessonText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all leading-relaxed"
              />
            </div>
          ) : newLessonType === 'VIDEO' ? (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Tautan Media Video (YouTube, Video URL) *
              </label>
              <input
                type="url"
                required
                placeholder="Contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                value={newLessonUrl}
                onChange={(e) => setNewLessonUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                💡 Mendukung link YouTube (watch, embed, youtu.be, shorts), Google Drive, & tautan video MP4 langsung.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Unggah Dokumen PDF Modul *
              </label>
              <div className="space-y-2.5">
                <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50/70 rounded-3xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
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
                  <div className="w-12 h-12 rounded-2xl bg-white text-rose-600 flex items-center justify-center shadow-xs border border-rose-200 mb-2.5">
                    {isUploadingNewPdf ? (
                      <Loader2 className="w-6 h-6 animate-spin text-rose-600" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {isUploadingNewPdf
                      ? 'Sedang mengunggah berkas PDF...'
                      : newPdfFileName || 'Pilih Berkas PDF dari Perangkat (Maks 20MB)'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Format file .pdf untuk lembar kerja atau buku bacaan
                  </span>
                </label>

                {newLessonUrl && (
                  <div className="p-3 rounded-2xl bg-white border border-rose-200 flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-xs text-slate-700 truncate font-bold">
                        {newPdfFileName || 'Berkas PDF Siap'}
                      </span>
                    </div>
                    <a
                      href={newLessonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-rose-600 hover:text-rose-700 font-bold shrink-0 underline"
                    >
                      Pratinjau
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
            <button
              type="button"
              onClick={resetCreateLessonForm}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="create-lesson-form"
              disabled={isPending || isUploadingNewPdf}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Materi...</span>
                </>
              ) : (
                'Simpan Materi'
              )}
            </button>
          </div>
        </div>
      </TeacherLayoutShell>
    );
  }

  return (
    <TeacherLayoutShell
      title={formatModuleTitle(mod.order_index, mod.title)}
      subtitle={`${mod.subject.name} • ${classData.name}`}
      backHref={`/guru/kelas/${classData.id}`}
      activeNavTab="CURRICULUM"
      defaultClassId={classData.id}
      headerAction={
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              setEditingModule({ id: mod.id, title: mod.title });
              setEditModuleTitle(cleanModuleTitle(mod.title));
            }}
            className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xs"
            title="Edit Judul Bab"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteModule(mod.id, mod.title)}
            className="w-8 h-8 rounded-xl bg-white/15 hover:bg-rose-500 active:scale-90 text-white hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xs"
            title="Hapus Bab"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      }
    >
      <ModuleDetailView
        activeModule={mod}
      />

      {/* Floating Action Button (FAB) Tambah Materi ala Mobile Native */}
      <div className="fixed bottom-24 right-4 sm:right-6 md:right-8 z-40">
        <button
          type="button"
          onClick={() => setIsCreateLessonOpen(true)}
          className="h-12 px-4 sm:h-13 sm:px-5 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-95 transition-all cursor-pointer border border-white/20 ring-4 ring-white/30"
          title="Tambah Materi Baru"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white stroke-[3]" />
          </div>
          <span className="tracking-wide">Materi Baru</span>
        </button>
      </div>

      {/* Mobile Confirm Dialog */}

      <MobileConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmLabel={confirmDialog.confirmLabel}
        cancelLabel={confirmDialog.cancelLabel}
        variant={confirmDialog.variant ?? 'danger'}
        isLoading={isPending}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </TeacherLayoutShell>
  );
}
