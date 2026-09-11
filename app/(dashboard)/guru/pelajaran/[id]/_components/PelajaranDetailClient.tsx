'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { LessonDetailView } from './LessonDetailView';
import {
  Edit2,
  Trash2,
  Camera,
  Mic,
  ListChecks,
  Plus,
  Loader2,
  BookOpen,
  Video,
  FileText,
  Target,
  UploadCloud,
  CheckCircle2,
} from 'lucide-react';
import { uploadPdfFile } from './LessonEditDrawer';
import type { QuizQuestionState } from './AssignmentDrawer';
import { MobileConfirmDialog } from '@/features/teacher/components/MobileConfirmDialog';
import {
  updateLessonAction,
  deleteLessonAction,
} from '@/features/teacher/actions/lesson-actions';
import { createAssignmentAction } from '@/features/teacher/actions/assignment-actions';
import { deleteAssignmentAction } from '@/features/teacher/actions/teacher-actions';
import type { PelajaranDetailData } from '../_services/pelajaran-detail.service';
import type { Lesson } from '@/types/database';
import type { ModuleWithLessonsAndAssignments } from '@/features/teacher/types/curriculum';

interface PelajaranDetailClientProps {
  data: PelajaranDetailData;
}

export function PelajaranDetailClient({ data }: PelajaranDetailClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { lesson } = data;
  const mod = lesson.module;
  const classData = mod.subject.class;
  const isFaseA = classData.grade_level <= 2;

  // Drawer Edit Lesson
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonType, setEditLessonType] = useState<Lesson['content_type']>('TEXT');
  const [editLessonText, setEditLessonText] = useState('');
  const [editLessonUrl, setEditLessonUrl] = useState('');
  const [editLessonObjectives, setEditLessonObjectives] = useState('');
  const [editPdfFileName, setEditPdfFileName] = useState('');
  const [isUploadingEditPdf, setIsUploadingEditPdf] = useState(false);

  // Form Buat Tugas (Full Page)
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [newTaskType, setNewTaskType] = useState<'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT'>(
    classData.grade_level <= 2 ? 'VOICE_TASK' : 'PHOTO_HOMEWORK'
  );
  const [newTaskPrompt, setNewTaskPrompt] = useState('');
  const [newQuizQuestionCount, setNewQuizQuestionCount] = useState<number>(5);
  const [newPassingScore, setNewPassingScore] = useState<number>(60);
  const [newQuizQuestions, setNewQuizQuestions] = useState<QuizQuestionState[]>([
    {
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: '',
    },
  ]);

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
    onConfirm: () => {},
  });

  const resetCreateAssignmentForm = () => {
    setIsCreateAssignmentOpen(false);
    setNewTaskPrompt('');
    setNewQuizQuestions([
      {
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'A',
        explanation: '',
      },
    ]);
  };

  // Action Handlers
  const handleOpenEditLesson = (les: Lesson) => {
    setEditingLesson(les);
    setEditLessonTitle(les.title);
    setEditLessonType(les.content_type);
    setEditLessonText(les.content_text ?? '');
    setEditLessonUrl(les.content_url ?? '');
    setEditLessonObjectives(les.learning_objectives ?? '');
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

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesson.id || newTaskPrompt.trim().length < 3) {
      toast.error('Petunjuk instruksi tugas minimal 3 karakter');
      return;
    }

    if (newTaskType === 'QUIZ_CBT') {
      const validQuestions = newQuizQuestions.filter(
        (q) =>
          q.questionText.trim().length > 0 &&
          q.optionA.trim().length > 0 &&
          q.optionB.trim().length > 0 &&
          q.optionC.trim().length > 0 &&
          q.optionD.trim().length > 0
      );
      if (validQuestions.length === 0) {
        toast.error('Tugas Kuis CBT wajib memiliki minimal 1 soal lengkap.');
        return;
      }
    }

    startTransition(async () => {
      const validQuestions = newQuizQuestions.filter(
        (q) =>
          q.questionText.trim().length > 0 &&
          q.optionA.trim().length > 0 &&
          q.optionB.trim().length > 0
      );

      const res = await createAssignmentAction({
        lessonId: lesson.id,
        type: newTaskType,
        prompt: newTaskPrompt.trim(),
        instructionAudioUrl: null,
        dueDate: null,
        quizQuestionCount: newTaskType === 'QUIZ_CBT' ? newQuizQuestionCount : null,
        passingScore: newTaskType === 'QUIZ_CBT' ? newPassingScore : null,
        questions: newTaskType === 'QUIZ_CBT' ? validQuestions : undefined,
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Tugas siswa berhasil diterbitkan!');
      resetCreateAssignmentForm();
      router.refresh();
    });
  };

  const handleDeleteAssignment = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Tugas Siswa?',
      description:
        'Apakah Anda yakin ingin menghapus tugas ini? Riwayat pengumpulan siswa untuk tugas ini juga akan dihapus.',
      confirmLabel: 'Ya, Hapus Tugas',
      variant: 'danger',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteAssignmentAction(id);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Tugas berhasil dihapus.');
          router.refresh();
        });
      },
    });
  };

  // --- 1. FULL-PAGE: EDIT MATERI PEMBELAJARAN ---
  if (editingLesson) {
    return (
      <TeacherLayoutShell
        title="Edit Materi Pembelajaran"
        subtitle={`${mod.title} • ${classData.name}`}
        onBackClick={() => setEditingLesson(null)}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="edit-lesson-form"
          onSubmit={handleUpdateLesson}
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
              placeholder="Contoh: Belajar Mengenal Angka 1-5"
              value={editLessonTitle}
              onChange={(e) => setEditLessonTitle(e.target.value)}
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
              placeholder="Contoh: Siswa mampu mengenali dan membilang angka 1 sampai 5 dengan benar..."
              value={editLessonObjectives}
              onChange={(e) => setEditLessonObjectives(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all leading-relaxed"
            />
          </div>

          {/* Format Konten (Readonly Badge) */}
          <div className="flex items-center gap-2 py-1">
            <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
              Format Konten :
            </label>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border ${
                editLessonType === 'TEXT'
                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                  : editLessonType === 'VIDEO'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {editLessonType === 'TEXT' ? (
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              ) : editLessonType === 'VIDEO' ? (
                <Video className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <FileText className="w-3.5 h-3.5 text-rose-600" />
              )}
              <span>
                {editLessonType === 'TEXT'
                  ? 'Teks'
                  : editLessonType === 'VIDEO'
                    ? 'Video'
                    : 'PDF'}
              </span>
            </span>
          </div>

          {/* Format Input Specific */}
          {editLessonType === 'TEXT' ? (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Isi Teks Bacaan / Modul Pembelajaran *
              </label>
              <textarea
                rows={6}
                required
                placeholder="Tuliskan cerita bacaan atau penjelasan materi..."
                value={editLessonText}
                onChange={(e) => setEditLessonText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all leading-relaxed"
              />
            </div>
          ) : editLessonType === 'VIDEO' ? (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Tautan Media URL (YouTube, Video URL) *
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={editLessonUrl}
                onChange={(e) => setEditLessonUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
              />
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Unggah Berkas PDF *
              </label>
              <div className="space-y-2.5">
                <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50/70 rounded-3xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    disabled={isUploadingEditPdf || isPending}
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsUploadingEditPdf(true);
                      setEditPdfFileName(file.name);
                      const url = await uploadPdfFile(file);
                      if (url) {
                        setEditLessonUrl(url);
                      } else {
                        setEditPdfFileName('');
                      }
                      setIsUploadingEditPdf(false);
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-white text-rose-600 flex items-center justify-center shadow-xs border border-rose-200 mb-2.5">
                    {isUploadingEditPdf ? (
                      <Loader2 className="w-6 h-6 animate-spin text-rose-600" />
                    ) : (
                      <UploadCloud className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {isUploadingEditPdf
                      ? 'Sedang mengunggah berkas...'
                      : editPdfFileName || 'Pilih Berkas PDF (Maksimal 20MB)'}
                  </span>
                </label>

                {editLessonUrl && (
                  <div className="p-3 rounded-2xl bg-white border border-rose-200 flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-xs text-slate-700 truncate font-bold">
                        {editPdfFileName || 'Berkas PDF Terunggah'}
                      </span>
                    </div>
                    <a
                      href={editLessonUrl}
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
              onClick={() => setEditingLesson(null)}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="edit-lesson-form"
              disabled={isPending || isUploadingEditPdf}
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

  // --- 2. FULL-PAGE: BUAT TUGAS SISWA ---
  if (isCreateAssignmentOpen) {
    return (
      <TeacherLayoutShell
        title="Buat Tugas Siswa"
        subtitle={`Materi: ${lesson.title}`}
        onBackClick={resetCreateAssignmentForm}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="create-assignment-form"
          onSubmit={handleCreateAssignment}
          className="space-y-4 pt-1 pb-28"
        >
          {/* Tipe Tugas */}
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Tipe Tugas / Penilaian
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setNewTaskType('PHOTO_HOMEWORK')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 text-center transition cursor-pointer ${
                  newTaskType === 'PHOTO_HOMEWORK'
                    ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs ring-2 ring-sky-400/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Camera className="w-5 h-5 mb-0.5" />
                <span className="text-[11px] font-bold leading-tight">Foto PR</span>
              </button>

              <button
                type="button"
                onClick={() => setNewTaskType('VOICE_TASK')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 text-center transition cursor-pointer ${
                  newTaskType === 'VOICE_TASK'
                    ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold shadow-xs ring-2 ring-purple-400/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Mic className="w-5 h-5 mb-0.5" />
                <span className="text-[11px] font-bold leading-tight">Suara</span>
              </button>

              <button
                type="button"
                onClick={() => setNewTaskType('QUIZ_CBT')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 text-center transition cursor-pointer ${
                  newTaskType === 'QUIZ_CBT'
                    ? 'bg-amber-50 border-amber-500 text-amber-700 font-bold shadow-xs ring-2 ring-amber-400/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ListChecks className="w-5 h-5 mb-0.5" />
                <span className="text-[11px] font-bold leading-tight">Kuis CBT</span>
              </button>
            </div>
          </div>

          {/* Form spesifik KUIS CBT */}
          {newTaskType === 'QUIZ_CBT' ? (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Judul Kuis *
                </label>
                <input
                  type="text"
                  value={newTaskPrompt}
                  onChange={(e) => setNewTaskPrompt(e.target.value)}
                  placeholder="Contoh: Kuis Pemahaman Bab 1"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Jumlah Soal
                  </label>
                  <select
                    value={newQuizQuestionCount}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      setNewQuizQuestionCount(count);
                      setNewQuizQuestions((prev) => {
                        const updated = [...prev];
                        while (updated.length < count) {
                          updated.push({
                            questionText: '',
                            optionA: '',
                            optionB: '',
                            optionC: '',
                            optionD: '',
                            correctAnswer: 'A',
                            explanation: '',
                          });
                        }
                        return updated.slice(0, count);
                      });
                    }}
                    className="w-full h-11 px-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs"
                  >
                    <option value={3}>3 Soal (Singkat)</option>
                    <option value={5}>5 Soal (Standar)</option>
                    <option value={10}>10 Soal (Lengkap)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    KKM (Nilai Lulus)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newPassingScore}
                    onChange={(e) => setNewPassingScore(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Builder Soal Kuis Interaktif */}
              <div className="space-y-3 pt-2">
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  Penyusun Butir Soal ({newQuizQuestions.length} Soal)
                </label>

                {newQuizQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">Soal #{idx + 1}</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        Kunci Jawaban: {q.correctAnswer}
                      </span>
                    </div>

                    <textarea
                      rows={2}
                      value={q.questionText}
                      onChange={(e) => {
                        const text = e.target.value;
                        setNewQuizQuestions((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, questionText: text } : item))
                        );
                      }}
                      placeholder={`Tuliskan pertanyaan nomor ${idx + 1}...`}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none leading-relaxed"
                      required
                    />

                    {/* 4 Opsi Pilihan Ganda */}
                    <div className="grid grid-cols-1 gap-2">
                      {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${idx}`}
                            checked={q.correctAnswer === opt}
                            onChange={() =>
                              setNewQuizQuestions((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, correctAnswer: opt } : item
                                )
                              )
                            }
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-600 w-3">{opt}.</span>
                          <input
                            type="text"
                            value={
                              opt === 'A'
                                ? q.optionA
                                : opt === 'B'
                                  ? q.optionB
                                  : opt === 'C'
                                    ? q.optionC
                                    : q.optionD
                            }
                            onChange={(e) => {
                              const val = e.target.value;
                              setNewQuizQuestions((prev) =>
                                prev.map((item, i) => {
                                  if (i !== idx) return item;
                                  if (opt === 'A') return { ...item, optionA: val };
                                  if (opt === 'B') return { ...item, optionB: val };
                                  if (opt === 'C') return { ...item, optionC: val };
                                  return { ...item, optionD: val };
                                })
                              );
                            }}
                            placeholder={`Pilihan ${opt}`}
                            className="flex-1 h-9 px-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Form PR Foto / Suara */
            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                {newTaskType === 'VOICE_TASK' ? 'Instruksi Rekaman Suara *' : 'Instruksi Foto Tugas *'}
              </label>
              <textarea
                rows={4}
                value={newTaskPrompt}
                onChange={(e) => setNewTaskPrompt(e.target.value)}
                placeholder={
                  newTaskType === 'VOICE_TASK'
                    ? 'Contoh: Bacakan teks materi di atas dengan lafal dan intonasi yang jelas...'
                    : 'Contoh: Kerjakan latihan di buku gambar/tulis, lalu foto dan unggah hasilnya...'
                }
                className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs resize-none leading-relaxed"
                required
              />
            </div>
          )}
        </form>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
            <button
              type="button"
              onClick={resetCreateAssignmentForm}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="create-assignment-form"
              disabled={isPending}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menerbitkan Tugas...</span>
                </>
              ) : (
                'Publikasikan Tugas'
              )}
            </button>
          </div>
        </div>
      </TeacherLayoutShell>
    );
  }

  return (
    <TeacherLayoutShell
      title={lesson.title}
      subtitle={`${mod.title} • ${classData.name}`}
      badgeText={isFaseA ? 'Fase A' : 'Fase B/C'}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref={`/guru/bab/${mod.id}`}
      activeNavTab="CURRICULUM"
      defaultClassId={classData.id}
      headerAction={
        <button
          type="button"
          onClick={() => handleOpenEditLesson(lesson)}
          className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xs"
          title="Edit Materi Ini"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      }
    >
      <LessonDetailView
        activeLesson={lesson as unknown as ModuleWithLessonsAndAssignments['lessons'][number]}
        activeModule={mod as unknown as ModuleWithLessonsAndAssignments}
        activeSubject={mod.subject}
        onBackToModule={() => {
          router.push(`/guru/bab/${mod.id}`);
        }}
        onOpenEditLesson={handleOpenEditLesson}
        onOpenCreateAssignment={() => setIsCreateAssignmentOpen(true)}
        onDeleteAssignment={handleDeleteAssignment}
      />

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
