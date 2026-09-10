'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
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
import type { SubjectOption } from './ModuleManagementCard';
import type { ModuleWithLessonsAndAssignments } from './AssignmentManagementCard';
import type { Lesson, Assignment, Submission } from '@/types/database';

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
  const [isPending, startTransition] = useTransition();

  // LEVEL NAVIGATION STATE:
  // 1. Kelas (level) is the root scope
  // 2. selectedSubjectId: selected Mapel
  // 3. selectedModuleId: selected Bab
  // 4. selectedLessonId: selected Materi / Sub-bab (shows Level 5: Modul/Video/Tugas)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(subjects[0]?.id ?? null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

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
  const [newLessonType, setNewLessonType] = useState<'TEXT' | 'VIDEO' | 'AUDIO'>('TEXT');
  const [newLessonText, setNewLessonText] = useState('');
  const [newLessonUrl, setNewLessonUrl] = useState('');

  // Form states: Edit Materi
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonType, setEditLessonType] = useState<'TEXT' | 'VIDEO' | 'AUDIO'>('TEXT');
  const [editLessonText, setEditLessonText] = useState('');
  const [editLessonUrl, setEditLessonUrl] = useState('');

  // Form states: Tugas (Assignment)
  const [newTaskType, setNewTaskType] = useState<'VOICE_TASK' | 'PHOTO_HOMEWORK'>(
    gradeLevel <= 2 ? 'VOICE_TASK' : 'PHOTO_HOMEWORK'
  );
  const [newTaskPrompt, setNewTaskPrompt] = useState('');

  // Native Mobile Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    variant?: 'danger' | 'warning';
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
        return;
      }
      toast.success('Bab baru berhasil ditambahkan!');
      setIsCreateModuleOpen(false);
      setNewModuleTitle('');
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
    setEditLessonType((lesson.content_type as 'TEXT' | 'VIDEO' | 'AUDIO') || 'TEXT');
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
    if (!selectedLessonId || newTaskPrompt.trim().length < 5) {
      toast.error('Petunjuk instruksi tugas minimal 5 karakter');
      return;
    }
    startTransition(async () => {
      const res = await createAssignmentAction({
        lessonId: selectedLessonId,
        type: newTaskType,
        prompt: newTaskPrompt.trim(),
        instructionAudioUrl: null,
        dueDate: null,
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Tugas siswa berhasil diterbitkan!');
      setIsCreateAssignmentOpen(false);
      setNewTaskPrompt('');
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
          if (selectedModuleId === modId) setSelectedModuleId(null);
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
              <span>+ Buat Tugas</span>
            </button>
          </div>
        </div>

        {/* Level 4: Materi Header Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <span>{activeSubject?.name}</span>
            <span>•</span>
            <span>{activeModule.title}</span>
          </div>
          <h2 className="text-base font-black text-slate-900 leading-snug">
            {activeLesson.title}
          </h2>
        </div>

        {/* Level 5a: Konten Modul / Video / Audio */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                {activeLesson.content_type === 'VIDEO' ? '🎬' : activeLesson.content_type === 'AUDIO' ? '🎧' : '📖'}
              </div>
              <h3 className="text-xs font-bold text-slate-900">
                {activeLesson.content_type === 'VIDEO'
                  ? 'Video Pembelajaran'
                  : activeLesson.content_type === 'AUDIO'
                  ? 'Rekaman Audio / Fonik Guru'
                  : 'Teks Bacaan & Modul'}
              </h3>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Format: {activeLesson.content_type}
            </span>
          </div>

          {activeLesson.content_type === 'TEXT' ? (
            <div className="text-xs text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed whitespace-pre-wrap">
              {activeLesson.content_text ?? 'Belum ada isi teks modul.'}
            </div>
          ) : activeLesson.content_url ? (
            <div className="space-y-3">
              {activeLesson.content_type === 'VIDEO' && (
                <div>
                  {getVideoEmbedUrl(activeLesson.content_url) ? (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm">
                      <iframe
                        src={getVideoEmbedUrl(activeLesson.content_url)!}
                        title={`Video: ${activeLesson.title}`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm">
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

              {activeLesson.content_type === 'AUDIO' && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <audio controls src={activeLesson.content_url} className="w-full h-10 rounded-xl" />
                </div>
              )}

              <p className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1.5">
                <span className="text-slate-400">Tautan:</span>
                <a
                  href={activeLesson.content_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-600 font-bold hover:underline"
                >
                  {activeLesson.content_url}
                </a>
              </p>
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
                          asg.type === 'VOICE_TASK'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200/70'
                            : 'bg-sky-50 text-sky-700 border border-sky-200/70'
                        }`}
                      >
                        {asg.type === 'VOICE_TASK' ? <Mic className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                        <span>{asg.type === 'VOICE_TASK' ? 'Tugas Suara (Fase A)' : 'Foto PR / LKPD'}</span>
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

                      {pendingSubmissions.length > 0 ? (
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
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewTaskType('VOICE_TASK')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    newTaskType === 'VOICE_TASK'
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-purple-600" />
                    <span>Tugas Suara</span>
                  </div>
                  <span className="text-[10px] text-purple-600 font-normal mt-0.5 block">
                    Audio / Fonik Anak
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setNewTaskType('PHOTO_HOMEWORK')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    newTaskType === 'PHOTO_HOMEWORK'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-sky-600" />
                    <span>Foto PR</span>
                  </div>
                  <span className="text-[10px] text-sky-600 font-normal mt-0.5 block">
                    Buku tugas / LKPD
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instruksi Soal *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Contoh: Sebutkan 3 nama hewan mamalia yang ada di sekitarmu..."
                value={newTaskPrompt}
                onChange={(e) => setNewTaskPrompt(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
              />
            </div>

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
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    editLessonType === 'TEXT'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Teks Modul
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('AUDIO')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    editLessonType === 'AUDIO'
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Audio Fonik
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('VIDEO')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    editLessonType === 'VIDEO'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Video Ajar
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
            ) : (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tautan Media Video (Link YouTube / Video URL) *
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
            onClick={() => setSelectedModuleId(null)}
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
                setEditModuleTitle(activeModule.title);
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
              <span>+ Materi Baru</span>
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
                {activeModule.title}
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
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-sky-50 text-slate-700 group-hover:text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200 group-hover:border-sky-200 transition-colors">
                      {les.content_type === 'VIDEO' ? '🎬' : les.content_type === 'AUDIO' ? '🎧' : '📖'}
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
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    newLessonType === 'TEXT'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Teks Modul
                </button>
                <button
                  type="button"
                  onClick={() => setNewLessonType('AUDIO')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    newLessonType === 'AUDIO'
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Audio Fonik
                </button>
                <button
                  type="button"
                  onClick={() => setNewLessonType('VIDEO')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    newLessonType === 'VIDEO'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Video Ajar
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
            ) : (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tautan Media Video (Link YouTube / Video URL) *
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
        >
          <form onSubmit={handleUpdateModule} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Judul Bab *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Bab 1: Mengenal Bilangan 1-10"
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
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan Bab'}
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
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    editLessonType === 'TEXT'
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Teks Modul
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('AUDIO')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    editLessonType === 'AUDIO'
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Audio Fonik
                </button>
                <button
                  type="button"
                  onClick={() => setEditLessonType('VIDEO')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    editLessonType === 'VIDEO'
                      ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Video Ajar
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
            ) : (
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
            <span>+ Mapel</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModuleOpen(true)}
            disabled={!activeSubject}
            className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Bab</span>
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

      {/* Level 3: List Kartu Bab di Mapel Terpilih */}
      {subjectModules.length === 0 ? (
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
                }}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 group-hover:bg-sky-500 text-sky-700 group-hover:text-white font-black text-sm flex items-center justify-center shrink-0 border border-sky-100 group-hover:border-sky-500 transition-all">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 leading-snug break-words transition-colors">
                      {mod.title}
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
        title={`Tambah Bab Baru: ${activeSubject?.name ?? ''}`}
      >
        <form onSubmit={handleCreateModule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bab 1: Mengenal Bilangan 1-10"
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
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Bab'}
          </button>
        </form>
      </MobileDrawer>

      {/* Drawer Edit Judul Bab */}
      <MobileDrawer
        isOpen={Boolean(editingModule)}
        onClose={() => setEditingModule(null)}
        title="Edit Judul Bab"
      >
        <form onSubmit={handleUpdateModule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bab 1: Mengenal Bilangan 1-10"
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
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan Bab'}
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
