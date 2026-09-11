'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  BookOpen,
  Plus,
  Trash2,
  Eye,
  Mic,
  Camera,
  Layers,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Clock,
  CheckCircle2,
  FileText,
  Video,
  Volume2,
  Sparkles,
  School,
  Edit2,
  MoreVertical,
  UploadCloud,
  HelpCircle,
  ListChecks,
} from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { MobileConfirmDialog } from './MobileConfirmDialog';
import { createLessonAction, updateLessonAction, deleteLessonAction } from '../actions/lesson-actions';
import { createAssignmentAction } from '../actions/assignment-actions';
import {
  deleteAssignmentAction,
  createModuleAction,
  updateModuleAction,
  deleteModuleAction,
  createSubjectAction,
  updateSubjectAction,
  deleteSubjectAction,
} from '../actions/teacher-actions';
import { formatModuleTitle, cleanModuleTitle } from '@/lib/formatters';
import type { SubjectOption } from './ModuleManagementCard';
import type { ModuleWithLessonsAndAssignments } from './AssignmentManagementCard';
import type { Lesson, Assignment, Submission } from '@/types/database';
import { getMediaProxyUrl } from '@/features/shared/services/storage-service';

function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube standard (watch?v=), short (youtu.be/), embed/, shorts/, or live/
  const ytMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Google Drive preview
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export interface CurriculumHierarchyViewProps {
  classId: string;
  className: string;
  gradeLevel: number;
  academicYear: string;
  subjects: SubjectOption[];
  modules: ModuleWithLessonsAndAssignments[];
}

export function CurriculumHierarchyView({
  classId,
  className,
  gradeLevel,
  academicYear,
  subjects,
  modules,
}: CurriculumHierarchyViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlModuleId = searchParams.get('moduleId') || searchParams.get('babId');
  const urlSubjectId = searchParams.get('subjectId');

  // Cari subject otomatis jika ada urlModuleId
  const initialSubjectId = (() => {
    if (urlSubjectId && subjects.some((s) => s.id === urlSubjectId)) {
      return urlSubjectId;
    }
    if (urlModuleId) {
      const parentMod = modules.find((m) => m.id === urlModuleId);
      if (parentMod && subjects.some((s) => s.id === parentMod.subject_id)) {
        return parentMod.subject_id;
      }
    }
    return subjects[0]?.id ?? null;
  })();

  const initialModuleId = urlModuleId && modules.some((m) => m.id === urlModuleId) ? urlModuleId : null;

  // LEVEL NAVIGATION STATE:
  // 1. Kelas (level) is the root scope
  // 2. selectedSubjectId: selected Mapel
  // 3. selectedModuleId: selected Bab
  // 4. selectedLessonId: selected Materi / Sub-bab (shows Level 5: Modul/Video/Tugas)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initialSubjectId);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(initialModuleId);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Helper untuk update query params di URL tanpa full page reload
  const updateUrlParams = (newParams: { moduleId?: string | null; subjectId?: string | null }) => {
    const current = new URLSearchParams(searchParams.toString());
    if (newParams.moduleId !== undefined) {
      if (newParams.moduleId) {
        current.set('moduleId', newParams.moduleId);
      } else {
        current.delete('moduleId');
        current.delete('babId');
      }
    }
    if (newParams.subjectId !== undefined) {
      if (newParams.subjectId) {
        current.set('subjectId', newParams.subjectId);
      } else {
        current.delete('subjectId');
      }
    }
    const query = current.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Sync jika URL berubah dari luar / browser back button
  useEffect(() => {
    const qModId = searchParams.get('moduleId') || searchParams.get('babId');
    if (qModId && modules.some((m) => m.id === qModId)) {
      setSelectedModuleId(qModId);
      const parentMod = modules.find((m) => m.id === qModId);
      if (parentMod) setSelectedSubjectId(parentMod.subject_id);
    } else if (!qModId && selectedModuleId) {
      setSelectedModuleId(null);
    }
  }, [searchParams, modules]);

  // Drawers
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<{ id: string; name: string } | null>(null);
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<{ title: string; type: string; body: string } | null>(null);

  // Form states: Mapel (Subject)
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editSubjectName, setEditSubjectName] = useState('');

  // Form states: Bab (Module)
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editingModule, setEditingModule] = useState<{ id: string; title: string } | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');

  // Form states: Materi (Lesson)
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<Lesson['content_type']>('TEXT');
  const [newLessonText, setNewLessonText] = useState('');
  const [newLessonUrl, setNewLessonUrl] = useState('');
  const [newPdfFileName, setNewPdfFileName] = useState('');
  const [isUploadingNewPdf, setIsUploadingNewPdf] = useState(false);

  // Form states: Edit Materi
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonType, setEditLessonType] = useState<Lesson['content_type']>('TEXT');
  const [editLessonText, setEditLessonText] = useState('');
  const [editLessonUrl, setEditLessonUrl] = useState('');
  const [editPdfFileName, setEditPdfFileName] = useState('');
  const [isUploadingEditPdf, setIsUploadingEditPdf] = useState(false);

  // Helper upload file PDF ke Cloudflare R2
  const uploadPdfFile = async (file: File): Promise<string | null> => {
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

  // Form states: Tugas (Assignment)
  const [newTaskType, setNewTaskType] = useState<'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT'>(
    gradeLevel <= 2 ? 'VOICE_TASK' : 'PHOTO_HOMEWORK'
  );
  const [newTaskPrompt, setNewTaskPrompt] = useState('');
  const [newQuizQuestionCount, setNewQuizQuestionCount] = useState<number>(5);
  const [newPassingScore, setNewPassingScore] = useState<number>(60);
  const [newQuizQuestions, setNewQuizQuestions] = useState<
    Array<{
      questionText: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: 'A' | 'B' | 'C' | 'D';
      explanation?: string;
    }>
  >([
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

  // Native Mobile Confirm Dialog State
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

  // Derived Active Items
  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0];
  const subjectModules = modules.filter((m) => m.subject_id === activeSubject?.id);
  const activeModule = modules.find((m) => m.id === selectedModuleId);
  const activeLesson = activeModule?.lessons.find((l) => l.id === selectedLessonId);

  // Actions
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      toast.error('Nama mata pelajaran wajib diisi');
      return;
    }
    startTransition(async () => {
      const res = await createSubjectAction({ classId, name: newSubjectName.trim() });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(`Mata pelajaran "${res.data.name}" berhasil dibuat!`);
      setIsCreateSubjectOpen(false);
      setNewSubjectName('');
      setSelectedSubjectId(res.data.id);
      router.refresh();
    });
  };

  const handleUpdateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject || !editSubjectName.trim()) {
      toast.error('Nama mata pelajaran wajib diisi');
      return;
    }
    startTransition(async () => {
      const res = await updateSubjectAction({
        subjectId: editingSubject.id,
        name: editSubjectName.trim(),
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(`Mata pelajaran berhasil diubah menjadi "${res.data.name}"`);
      setEditingSubject(null);
      setEditSubjectName('');
      router.refresh();
    });
  };

  const handleDeleteSubject = (subjectId: string, subjectName: string) => {
    setConfirmDialog({
      isOpen: true,
      title: `Hapus Mata Pelajaran?`,
      description: `Apakah Anda yakin ingin menghapus "${subjectName}"? Pastikan mata pelajaran tidak memiliki bab sebelum dihapus.`,
      confirmLabel: 'Ya, Hapus Mapel',
      variant: 'danger',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteSubjectAction(subjectId);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success(`Mata pelajaran "${subjectName}" berhasil dihapus.`);
          if (selectedSubjectId === subjectId) {
            const remaining = subjects.filter((s) => s.id !== subjectId);
            setSelectedSubjectId(remaining[0]?.id ?? null);
            setSelectedModuleId(null);
            setSelectedLessonId(null);
          }
          setEditingSubject(null);
          router.refresh();
        });
      },
    });
  };

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubject || !newModuleTitle.trim()) {
      toast.error('Pilih mata pelajaran dan isi judul bab');
      return;
    }
    startTransition(async () => {
      const res = await createModuleAction({
        subjectId: activeSubject.id,
        title: newModuleTitle.trim(),
        orderIndex: subjectModules.length + 1,
      });
      if (!res.success) {
        toast.error(res.error);
        setConfirmDialog({
          isOpen: true,
          title: 'Gagal Menyimpan Bab',
          description: res.error || 'Terjadi kendala saat menyimpan bab ke sistem. Pastikan koneksi internet aktif dan coba lagi.',
          variant: 'danger',
          confirmLabel: 'Tutup',
          cancelLabel: 'Batal',
          onConfirm: () => setConfirmDialog((prev) => ({ ...prev, isOpen: false })),
        });
        return;
      }
      toast.success('Bab baru berhasil ditambahkan!');
      setIsCreateModuleOpen(false);
      setNewModuleTitle('');
      if (res.data?.id) {
        setSelectedModuleId(res.data.id);
        updateUrlParams({ moduleId: res.data.id, subjectId: activeSubject.id });
      }
      router.refresh();
    });
  };

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
        setConfirmDialog({
          isOpen: true,
          title: 'Gagal Memperbarui Bab',
          description: res.error || 'Terjadi kendala saat memperbarui judul bab. Silakan periksa kembali dan coba lagi.',
          variant: 'danger',
          confirmLabel: 'Tutup',
          cancelLabel: 'Batal',
          onConfirm: () => setConfirmDialog((prev) => ({ ...prev, isOpen: false })),
        });
        return;
      }
      toast.success('Judul bab berhasil diperbarui!');
      setEditingModule(null);
      setEditModuleTitle('');
      router.refresh();
    });
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModuleId || !newLessonTitle.trim()) {
      toast.error('Lengkapi judul materi');
      return;
    }
    startTransition(async () => {
      const res = await createLessonAction({
        moduleId: selectedModuleId,
        title: newLessonTitle.trim(),
        contentType: newLessonType,
        contentText: newLessonType === 'TEXT' ? newLessonText.trim() : null,
        contentUrl: newLessonType !== 'TEXT' ? newLessonUrl.trim() : null,
        orderIndex: (activeModule?.lessons.length ?? 0) + 1,
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Materi baru berhasil ditambahkan!');
      setIsCreateLessonOpen(false);
      setNewLessonTitle('');
      setNewLessonText('');
      setNewLessonUrl('');
      router.refresh();
    });
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setEditLessonTitle(lesson.title);
    setEditLessonType(lesson.content_type);
    setEditLessonText(lesson.content_text ?? '');
    setEditLessonUrl(lesson.content_url ?? '');
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
    if (!selectedLessonId || newTaskPrompt.trim().length < 3) {
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
        lessonId: selectedLessonId,
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
          if (selectedLessonId === lessonId) setSelectedLessonId(null);
          router.refresh();
        });
      },
    });
  };

  const handleDeleteAssignment = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Penugasan Siswa?',
      description: 'Apakah Anda yakin ingin menghapus penugasan ini? Tugas tidak dapat dihapus jika sudah ada siswa yang mengirim jawaban.',
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

  const handleDeleteModule = (modId: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Bab / Modul?',
      description: `Apakah Anda yakin ingin menghapus Bab "${title}"? Bab tidak dapat dihapus jika masih terdapat materi di dalamnya.`,
      confirmLabel: 'Ya, Hapus Bab',
      variant: 'danger',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteModuleAction(modId);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Bab berhasil dihapus.');
          if (selectedModuleId === modId) {
            setSelectedModuleId(null);
            updateUrlParams({ moduleId: null });
          }
          router.refresh();
        });
      },
    });
  };

  // =========================================================================
  // VIEW TINGKAT 4 & 5: DETAIL MATERI -> MODUL, VIDEO, TUGAS & PENILAIAN
  // =========================================================================
  if (selectedLessonId && activeLesson && activeModule) {
    const assignments = activeLesson.assignments ?? [];

    return (
      <div className="space-y-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setSelectedLessonId(null)}
            className="h-9 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Bab</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleOpenEditLesson(activeLesson)}
              className="h-9 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
              title="Edit Materi Ini"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Materi</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateAssignmentOpen(true)}
              className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Buat Tugas</span>
            </button>
          </div>
        </div>

        {/* Level 4 & 5a: Unified Lesson Post Card (Modern Social-Media Post Style) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
          {/* Top Post Header: Breadcrumb & Format Badge */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider min-w-0">
              <span className="truncate max-w-[120px] sm:max-w-none">{activeSubject?.name}</span>
              <span>•</span>
              <span className="truncate max-w-[150px] sm:max-w-none">{formatModuleTitle(activeModule.order_index, activeModule.title)}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                activeLesson.content_type === 'VIDEO'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  : activeLesson.content_type === 'PDF'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                  : activeLesson.content_type === 'AUDIO'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200/60'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              }`}>
                {activeLesson.content_type === 'VIDEO' ? (
                  <Video className="w-3 h-3" />
                ) : activeLesson.content_type === 'PDF' ? (
                  <FileText className="w-3 h-3" />
                ) : activeLesson.content_type === 'AUDIO' ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <BookOpen className="w-3 h-3" />
                )}
                <span>{activeLesson.content_type === 'VIDEO' ? 'Video' : activeLesson.content_type === 'PDF' ? 'PDF' : activeLesson.content_type === 'AUDIO' ? 'Audio' : 'Teks'}</span>
              </span>
            </div>
          </div>

          {/* Lesson Title */}
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {activeLesson.title}
          </h2>

          {/* Attached Media / Content Block (Social Media Attachment Style) */}
          {activeLesson.content_type === 'TEXT' ? (
            <div className="text-xs text-slate-800 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed whitespace-pre-wrap">
              {activeLesson.content_text ?? 'Belum ada isi teks modul.'}
            </div>
          ) : activeLesson.content_url ? (
            <div>
              {activeLesson.content_type === 'VIDEO' && (
                <div>
                  {getVideoEmbedUrl(activeLesson.content_url) ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xs">
                      <iframe
                        src={getVideoEmbedUrl(activeLesson.content_url)!}
                        title={`Video: ${activeLesson.title}`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xs">
                      <video
                        controls
                        src={activeLesson.content_url}
                        className="w-full max-h-[360px] aspect-video object-contain"
                      >
                        Browser Anda tidak mendukung tag video.
                      </video>
                    </div>
                  )}
                </div>
              )}

              {activeLesson.content_type === 'PDF' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/90 transition-colors flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-rose-600 transition-colors">
                        Dokumen Materi PDF
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        Klik untuk melihat atau membaca dokumen
                      </p>
                    </div>
                  </div>
                  <a
                    href={getMediaProxyUrl(activeLesson.content_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="h-8 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs shrink-0 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Buka PDF</span>
                  </a>
                </div>
              )}

              {activeLesson.content_type === 'AUDIO' && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <audio controls src={getMediaProxyUrl(activeLesson.content_url)} className="w-full h-10 rounded-lg" />
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">Belum ada lampiran media/modul.</p>
          )}
        </div>

        {/* Level 5b: Daftar Tugas & Penilaian Siswa */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Tugas & Penilaian Siswa ({assignments.length})
            </h3>
          </div>

          {assignments.length === 0 ? (
            <div className="py-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center p-4 space-y-1">
              <p className="text-xs font-bold text-slate-700">Belum ada tugas untuk materi ini</p>
              <p className="text-[11px] text-slate-400">Klik tombol &quot;+ Buat Tugas&quot; di atas untuk menambahkan tugas suara atau foto PR.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {assignments.map((asg) => {
                const submissions = (asg as unknown as { submissions?: Submission[] }).submissions ?? [];
                const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING');
                const gradedSubmissions = submissions.filter((s) => s.status === 'GRADED');

                return (
                  <div
                    key={asg.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 ${
                          asg.type === 'QUIZ_CBT'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200/70'
                            : asg.type === 'VOICE_TASK'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200/70'
                            : 'bg-sky-50 text-sky-700 border border-sky-200/70'
                        }`}
                      >
                        {asg.type === 'QUIZ_CBT' ? (
                          <ListChecks className="w-3 h-3 text-amber-600" />
                        ) : asg.type === 'VOICE_TASK' ? (
                          <Mic className="w-3 h-3" />
                        ) : (
                          <Camera className="w-3 h-3" />
                        )}
                        <span>
                          {asg.type === 'QUIZ_CBT'
                            ? `Pilihan Ganda CBT (${asg.quiz_question_count ?? 5} Soal Acak)`
                            : asg.type === 'VOICE_TASK'
                            ? 'Tugas Suara (Fase A)'
                            : 'Foto PR / LKPD'}
                        </span>
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDeleteAssignment(asg.id)}
                        className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>

                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {asg.prompt}
                    </p>

                    {/* Quick Access to Grading */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      {asg.type === 'QUIZ_CBT' ? (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-purple-600" />
                            <span className="text-purple-700 font-bold">Koreksi Otomatis Server CBT</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>{gradedSubmissions.length} siswa selesai</span>
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>{pendingSubmissions.length} antrean</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>{gradedSubmissions.length} dinilai</span>
                          </span>
                        </div>
                      )}

                      {asg.type !== 'QUIZ_CBT' && (
                        pendingSubmissions.length > 0 ? (
                          <Link
                            href={`/guru/penilaian/${pendingSubmissions[0].id}`}
                            className="h-8 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                          >
                            <span>Buka Penilaian</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <Link
                            href="/guru"
                            className="font-bold text-slate-400 hover:text-slate-700 flex items-center gap-0.5"
                          >
                            <span>Lihat Antrean</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Tambah Tugas Siswa */}
        <MobileDrawer
          isOpen={isCreateAssignmentOpen}
          onClose={() => setIsCreateAssignmentOpen(false)}
          title={`Buat Tugas: ${activeLesson.title}`}
        >
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tipe Tugas
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setNewTaskType('QUIZ_CBT')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    newTaskType === 'QUIZ_CBT'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs ring-2 ring-amber-400/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <ListChecks className="w-3.5 h-3.5 text-amber-600" />
                    <span>Kuis CBT</span>
                  </div>
                  <span className="text-[9.5px] text-amber-600 font-normal mt-0.5 block">
                    Pilihan Ganda Acak
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setNewTaskType('VOICE_TASK')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    newTaskType === 'VOICE_TASK'
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-purple-600" />
                    <span>Suara</span>
                  </div>
                  <span className="text-[9.5px] text-purple-600 font-normal mt-0.5 block">
                    Audio / Fonik
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setNewTaskType('PHOTO_HOMEWORK')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    newTaskType === 'PHOTO_HOMEWORK'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-sky-600" />
                    <span>Foto PR</span>
                  </div>
                  <span className="text-[9.5px] text-sky-600 font-normal mt-0.5 block">
                    Buku tugas / LKPD
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {newTaskType === 'QUIZ_CBT' ? 'Judul / Petunjuk Kuis *' : 'Instruksi Soal *'}
              </label>
              <textarea
                rows={2}
                required
                placeholder={
                  newTaskType === 'QUIZ_CBT'
                    ? 'Contoh: Pilihlah satu jawaban yang paling tepat dari soal-soal berikut ini!'
                    : 'Contoh: Sebutkan 3 nama hewan mamalia yang ada di sekitarmu...'
                }
                value={newTaskPrompt}
                onChange={(e) => setNewTaskPrompt(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
              />
            </div>

            {/* Khusus Kuis CBT: Pengaturan Jumlah Soal Tampil & Bank Soal */}
            {newTaskType === 'QUIZ_CBT' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Soal Tampil Siswa *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={newQuizQuestions.length || 50}
                      value={newQuizQuestionCount}
                      onChange={(e) => setNewQuizQuestionCount(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Diacak dari bank soal
                    </span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Batas KKM (0-100) *
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={newPassingScore}
                      onChange={(e) => setNewPassingScore(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Nilai kelulusan minimum
                    </span>
                  </div>
                </div>

                {/* Bank Soal List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Bank Soal ({newQuizQuestions.length} Soal)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setNewQuizQuestions((prev) => [
                          ...prev,
                          {
                            questionText: '',
                            optionA: '',
                            optionB: '',
                            optionC: '',
                            optionD: '',
                            correctAnswer: 'A',
                            explanation: '',
                          },
                        ])
                      }
                      className="h-7 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1 border border-amber-200 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Soal</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {newQuizQuestions.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            Nomor {qIdx + 1}
                          </span>
                          {newQuizQuestions.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setNewQuizQuestions((prev) => prev.filter((_, i) => i !== qIdx))
                              }
                              className="text-[11px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                              Hapus Soal
                            </button>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder={`Tulis pertanyaan soal #${qIdx + 1}...`}
                            value={q.questionText}
                            onChange={(e) => {
                              const val = e.target.value;
                              setNewQuizQuestions((prev) =>
                                prev.map((item, i) => (i === qIdx ? { ...item, questionText: val } : item))
                              );
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        {/* Pilihan Jawaban A, B, C, D */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                            const optField = `option${letter}` as 'optionA' | 'optionB' | 'optionC' | 'optionD';
                            const isCorrect = q.correctAnswer === letter;
                            return (
                              <div key={letter} className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewQuizQuestions((prev) =>
                                      prev.map((item, i) =>
                                        i === qIdx ? { ...item, correctAnswer: letter } : item
                                      )
                                    );
                                  }}
                                  title="Klik untuk jadikan kunci jawaban yang benar"
                                  className={`w-6 h-6 rounded-lg font-black text-xs shrink-0 flex items-center justify-center cursor-pointer transition-all ${
                                    isCorrect
                                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 shadow-xs'
                                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  {letter}
                                </button>
                                <input
                                  type="text"
                                  required
                                  placeholder={`Pilihan ${letter}...`}
                                  value={q[optField]}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setNewQuizQuestions((prev) =>
                                      prev.map((item, i) =>
                                        i === qIdx ? { ...item, [optField]: val } : item
                                      )
                                    );
                                  }}
                                  className={`flex-1 px-2.5 py-1.5 rounded-lg bg-white border text-xs text-slate-800 placeholder:text-slate-400 ${
                                    isCorrect ? 'border-emerald-500 font-semibold' : 'border-slate-200'
                                  }`}
                                />
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-slate-400 italic">
                          * Kunci jawaban saat ini: <strong className="text-emerald-700">Pilihan {q.correctAnswer}</strong> (klik tombol huruf untuk mengubah kunci).
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Terbitkan Tugas'}
            </button>
          </form>
        </MobileDrawer>

        {/* Drawer Edit Materi */}
        <MobileDrawer
          isOpen={Boolean(editingLesson)}
          onClose={() => setEditingLesson(null)}
          title={`Edit Materi: ${editingLesson?.title ?? ''}`}
        >
          <form onSubmit={handleUpdateLesson} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Materi *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Belajar Mengenal Angka 1-5"
                value={editLessonTitle}
                onChange={(e) => setEditLessonTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Format Konten
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditLessonType('TEXT')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    editLessonType === 'TEXT'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Teks</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('VIDEO')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    editLessonType === 'VIDEO'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('PDF')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    editLessonType === 'PDF'
                      ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>PDF</span>
                </button>
              </div>
            </div>

            {editLessonType === 'TEXT' ? (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Isi Teks Bacaan / Modul *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tuliskan cerita bacaan atau penjelasan materi..."
                  value={editLessonText}
                  onChange={(e) => setEditLessonText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
                />
              </div>
            ) : editLessonType === 'VIDEO' ? (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tautan Media Video (YouTube, Video URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="Contoh: https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                  value={editLessonUrl}
                  onChange={(e) => setEditLessonUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  💡 Mendukung link YouTube (watch, embed, youtu.be, shorts), Google Drive, & file MP4.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Unggah Berkas PDF (Media R2) *
                </label>
                <div className="space-y-2">
                  <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
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
                    <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs border border-rose-200 mb-2">
                      {isUploadingEditPdf ? (
                        <Loader2 className="w-5 h-5 animate-spin text-rose-600" />
                      ) : (
                        <UploadCloud className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {isUploadingEditPdf
                        ? 'Sedang mengunggah berkas ke R2...'
                        : editPdfFileName || 'Pilih Berkas PDF untuk Diunggah'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Maksimal 20MB • Disimpan aman di Cloudflare R2
                    </span>
                  </label>

                  {editLessonUrl && (
                    <div className="p-2.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-xs text-slate-700 truncate font-semibold">
                          {editPdfFileName || 'Berkas PDF Terunggah'}
                        </span>
                      </div>
                      <a
                        href={editLessonUrl}
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
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan Materi'}
            </button>
          </form>
        </MobileDrawer>

        {/* Native-style Mobile Confirm Dialog */}
        <MobileConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          description={confirmDialog.description}
          confirmLabel={confirmDialog.confirmLabel}
          variant={confirmDialog.variant ?? 'danger'}
          isLoading={isPending}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        />
      </div>
    );
  }

  // =========================================================================
  // VIEW TINGKAT 3: DETAIL BAB TERPILIH -> DAFTAR MATERI (SUB-BAB)
  // =========================================================================
  if (selectedModuleId && activeModule) {
    const lessons = activeModule.lessons ?? [];

    return (
      <div className="space-y-4 select-none">
        {/* Navigation & Action Bar inside Bab */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedModuleId(null);
              setSelectedLessonId(null);
              updateUrlParams({ moduleId: null });
            }}
            className="h-9 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Kembali ke Bab</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setEditingModule({ id: activeModule.id, title: activeModule.title });
                setEditModuleTitle(cleanModuleTitle(activeModule.title));
              }}
              className="h-9 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
              title="Edit Nama Bab"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Bab</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateLessonOpen(true)}
              className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Materi Baru</span>
            </button>
          </div>
        </div>

        {/* Level 3: Bab Header Info Card with clean badges & actions */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[10px] font-extrabold text-sky-700 uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-sky-600" />
                  {activeSubject?.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {lessons.length} Materi / Sub-bab
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug break-words">
                {formatModuleTitle(activeModule.order_index, activeModule.title)}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteModule(activeModule.id, activeModule.title)}
              className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
              title="Hapus Bab Ini"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Level 4: List of Materi (Sub-bab) Cards */}
        {lessons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">Belum ada materi di bab ini</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Klik tombol &quot;+ Materi Baru&quot; di atas untuk menambahkan sub-bab materi pertama.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {lessons.map((les, idx) => {
              const tasksCount = les.assignments?.length ?? 0;

              return (
                <div
                  key={les.id}
                  onClick={() => setSelectedLessonId(les.id)}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      les.content_type === 'VIDEO'
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : les.content_type === 'PDF'
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : les.content_type === 'AUDIO'
                        ? 'bg-purple-50 text-purple-600 border-purple-200'
                        : 'bg-sky-50 text-sky-600 border-sky-200'
                    }`}>
                      {les.content_type === 'VIDEO' ? (
                        <Video className="w-4 h-4" />
                      ) : les.content_type === 'PDF' ? (
                        <FileText className="w-4 h-4" />
                      ) : les.content_type === 'AUDIO' ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block">
                        Materi {idx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 leading-snug break-words transition-colors">
                        {les.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {tasksCount} tugas terpasang
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleOpenEditLesson(les)}
                      className="p-2 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                      title="Edit Materi"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteLesson(les.id, les.title)}
                      className="p-2 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Hapus Materi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-600 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Drawer Buat Materi Baru */}
        <MobileDrawer
          isOpen={isCreateLessonOpen}
          onClose={() => setIsCreateLessonOpen(false)}
          title={`Tambah Materi: ${activeModule.title}`}
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
                  Unggah Berkas PDF (Media R2) *
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
                        ? 'Sedang mengunggah berkas ke R2...'
                        : newPdfFileName || 'Pilih Berkas PDF untuk Diunggah'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Maksimal 20MB • Disimpan aman di Cloudflare R2
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

        {/* Drawer Edit Judul Bab (Bisa dibuka langsung di dalam bab) */}
        <MobileDrawer
          isOpen={Boolean(editingModule)}
          onClose={() => setEditingModule(null)}
          title="Edit Judul Bab"
          subtitle={
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[10px] font-extrabold text-sky-700 uppercase tracking-wider">
                <Layers className="w-3 h-3 text-sky-600" />
                {activeSubject?.name}
              </span>
            </div>
          }
        >
          <form onSubmit={handleUpdateModule} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul *
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan judul bab..."
                value={editModuleTitle}
                onChange={(e) => setEditModuleTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : (
                'Simpan Perubahan Bab'
              )}
            </button>
          </form>
        </MobileDrawer>

        {/* Drawer Edit Materi (Bisa dibuka dari daftar materi di dalam bab) */}
        <MobileDrawer
          isOpen={Boolean(editingLesson)}
          onClose={() => setEditingLesson(null)}
          title={`Edit Materi: ${editingLesson?.title ?? ''}`}
        >
          <form onSubmit={handleUpdateLesson} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Materi *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Belajar Mengenal Angka 1-5"
                value={editLessonTitle}
                onChange={(e) => setEditLessonTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Format Konten
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditLessonType('TEXT')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    editLessonType === 'TEXT'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Teks</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('VIDEO')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    editLessonType === 'VIDEO'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('PDF')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    editLessonType === 'PDF'
                      ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>PDF</span>
                </button>
              </div>
            </div>

            {editLessonType === 'TEXT' ? (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Isi Teks Bacaan / Modul *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tuliskan cerita bacaan atau penjelasan materi..."
                  value={editLessonText}
                  onChange={(e) => setEditLessonText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
                />
              </div>
            ) : editLessonType === 'VIDEO' ? (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tautan Media URL (YouTube, Video URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={editLessonUrl}
                  onChange={(e) => setEditLessonUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Unggah Berkas PDF (Media R2) *
                </label>
                <div className="space-y-2">
                  <label className="border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/50 hover:bg-rose-50/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
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
                    <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-2xs border border-rose-200 mb-2">
                      {isUploadingEditPdf ? (
                        <Loader2 className="w-5 h-5 animate-spin text-rose-600" />
                      ) : (
                        <UploadCloud className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-800 block">
                      {isUploadingEditPdf
                        ? 'Sedang mengunggah berkas ke R2...'
                        : editPdfFileName || 'Pilih Berkas PDF untuk Diunggah'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Maksimal 20MB • Disimpan aman di Cloudflare R2
                    </span>
                  </label>

                  {editLessonUrl && (
                    <div className="p-2.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-xs text-slate-700 truncate font-semibold">
                          {editPdfFileName || 'Berkas PDF Terunggah'}
                        </span>
                      </div>
                      <a
                        href={editLessonUrl}
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
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan Materi'}
            </button>
          </form>
        </MobileDrawer>

        {/* Native-style Mobile Confirm Dialog */}
        <MobileConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          description={confirmDialog.description}
          confirmLabel={confirmDialog.confirmLabel}
          variant={confirmDialog.variant ?? 'danger'}
          isLoading={isPending}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        />
      </div>
    );
  }

  // =========================================================================
  // VIEW TINGKAT 2 & 3: PILIH MAPEL ➔ TAMPILKAN KARTU-KARTU BAB
  // =========================================================================
  return (
    <div className="space-y-4 select-none">
      {/* Action Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
            Bab Pembelajaran
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Pilih mapel di bawah untuk mengelola bab dan materinya
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsCreateSubjectOpen(true)}
            className="h-9 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
            title="Tambah Mata Pelajaran Baru"
          >
            <Plus className="w-3.5 h-3.5 text-sky-600" />
            <span>Mapel</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModuleOpen(true)}
            disabled={!activeSubject}
            className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Bab</span>
          </button>
        </div>
      </div>

      {/* Level 2: Tab Navigasi Mapel (Mata Pelajaran) */}
      {subjects.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar items-center">
          {subjects.map((sub) => {
            const count = modules.filter((m) => m.subject_id === sub.id).length;
            const isSelected = selectedSubjectId === sub.id;

            return (
              <div
                key={sub.id}
                className={`inline-flex items-center rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                    setSelectedModuleId(null);
                    setSelectedLessonId(null);
                    updateUrlParams({ subjectId: sub.id, moduleId: null });
                  }}
                  className="px-3.5 py-2 cursor-pointer flex items-center gap-1.5"
                >
                  <span>{sub.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count} Bab
                  </span>
                </button>

                {/* Tombol Edit Mapel Langsung */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSubject({ id: sub.id, name: sub.name });
                    setEditSubjectName(sub.name);
                  }}
                  className={`p-1.5 mr-1 rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={`Edit atau Hapus ${sub.name}`}
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Level 3: List Kartu Bab di Mapel Terpilih / Kosong */}
      {subjects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto text-sky-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">
              Belum ada Mata Pelajaran di kelas ini
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Mulai dengan menambahkan mata pelajaran (seperti Bahasa Indonesia, Matematika, Seni Rupa).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateSubjectOpen(true)}
            className="h-9 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat Mapel Pertama</span>
          </button>
        </div>
      ) : subjectModules.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">
            Belum ada Bab di mapel {activeSubject?.name ?? 'ini'}
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Klik tombol &quot;+ Bab&quot; di atas untuk menyusun bab kurikulum pertama.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5">
          {subjectModules.map((mod, idx) => {
            const lessonsCount = mod.lessons?.length ?? 0;
            const totalTasksInModule = mod.lessons?.reduce(
              (acc, l) => acc + (l.assignments?.length ?? 0),
              0
            ) ?? 0;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setSelectedLessonId(null);
                  updateUrlParams({ moduleId: mod.id, subjectId: mod.subject_id });
                }}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 group-hover:bg-sky-500 text-sky-700 group-hover:text-white font-black text-sm flex items-center justify-center shrink-0 border border-sky-100 group-hover:border-sky-500 transition-all">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 leading-snug break-words transition-colors">
                      {formatModuleTitle(mod.order_index, mod.title)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-medium flex-wrap">
                      <span>{lessonsCount} Sub-bab / Materi</span>
                      <span>•</span>
                      <span>{totalTasksInModule} Tugas Terpasang</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 text-slate-300 group-hover:text-sky-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Drawer Tambah Mapel Baru */}
      <MobileDrawer
        isOpen={isCreateSubjectOpen}
        onClose={() => setIsCreateSubjectOpen(false)}
        title="Tambah Mata Pelajaran Baru"
      >
        <form onSubmit={handleCreateSubject} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Mata Pelajaran *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bahasa Indonesia, Seni Rupa, PJOK"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Mapel'}
          </button>
        </form>
      </MobileDrawer>

      {/* Drawer Edit / Hapus Mata Pelajaran */}
      <MobileDrawer
        isOpen={Boolean(editingSubject)}
        onClose={() => setEditingSubject(null)}
        title={editingSubject ? `Edit Mapel: ${editingSubject.name}` : 'Edit Mapel'}
      >
        <div className="space-y-5">
          <form onSubmit={handleUpdateSubject} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Mata Pelajaran *
              </label>
              <input
                type="text"
                required
                placeholder="Nama mata pelajaran..."
                value={editSubjectName}
                onChange={(e) => setEditSubjectName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan'}
            </button>
          </form>

          {editingSubject && (
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDeleteSubject(editingSubject.id, editingSubject.name)}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Hapus Mata Pelajaran Ini</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-1.5">
                Peringatan: Bab dan materi di dalam mapel ini akan ikut terhapus.
              </p>
            </div>
          )}
        </div>
      </MobileDrawer>

      {/* Drawer Tambah Bab Baru */}
      <MobileDrawer
        isOpen={isCreateModuleOpen}
        onClose={() => setIsCreateModuleOpen(false)}
        title={`Tambah BAB ${subjectModules.length + 1}`}
        subtitle={
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[10px] font-extrabold text-sky-700 uppercase tracking-wider">
              <Layers className="w-3 h-3 text-sky-600" />
              {activeSubject?.name}
            </span>
          </div>
        }
      >
        <form onSubmit={handleCreateModule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul *
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan judul bab..."
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Bab...</span>
              </>
            ) : (
              'Simpan Bab'
            )}
          </button>
        </form>
      </MobileDrawer>

      {/* Drawer Edit Judul Bab */}
      <MobileDrawer
        isOpen={Boolean(editingModule)}
        onClose={() => setEditingModule(null)}
        title="Edit Judul Bab"
        subtitle={
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[10px] font-extrabold text-sky-700 uppercase tracking-wider">
              <Layers className="w-3 h-3 text-sky-600" />
              {activeSubject?.name}
            </span>
          </div>
        }
      >
        <form onSubmit={handleUpdateModule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul *
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan judul bab..."
              value={editModuleTitle}
              onChange={(e) => setEditModuleTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan Perubahan...</span>
              </>
            ) : (
              'Simpan Perubahan Bab'
            )}
          </button>
        </form>
      </MobileDrawer>

      {/* Native-style Mobile Confirm Dialog */}
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
    </div>
  );
}
