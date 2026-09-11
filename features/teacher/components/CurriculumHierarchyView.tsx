'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { MobileConfirmDialog } from './MobileConfirmDialog';
import {
  createLessonAction,
  updateLessonAction,
  deleteLessonAction,
} from '../actions/lesson-actions';
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
import { cleanModuleTitle } from '@/lib/formatters';
import type { SubjectOption } from './ModuleManagementCard';
import type { ModuleWithLessonsAndAssignments } from './AssignmentManagementCard';
import type { Lesson } from '@/types/database';

// Modular Views & Drawers
import { SubjectModuleListView } from './curriculum/views/SubjectModuleListView';
import { ModuleDetailView } from './curriculum/views/ModuleDetailView';
import { LessonDetailView } from './curriculum/views/LessonDetailView';
import { SubjectDrawers } from './curriculum/drawers/SubjectDrawers';
import { ModuleDrawers } from './curriculum/drawers/ModuleDrawers';
import { LessonDrawers } from './curriculum/drawers/LessonDrawers';
import { AssignmentDrawer, type QuizQuestionState } from './curriculum/drawers/AssignmentDrawer';

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
  className: _className,
  gradeLevel,
  academicYear: _academicYear,
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
  }, [searchParams, modules, selectedModuleId]);

  // Drawers
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<{ id: string; name: string } | null>(null);
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);

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
  const [newLessonObjectives, setNewLessonObjectives] = useState('');
  const [newPdfFileName, setNewPdfFileName] = useState('');
  const [isUploadingNewPdf, setIsUploadingNewPdf] = useState(false);

  // Form states: Edit Materi
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editLessonTitle, setEditLessonTitle] = useState('');
  const [editLessonType, setEditLessonType] = useState<Lesson['content_type']>('TEXT');
  const [editLessonText, setEditLessonText] = useState('');
  const [editLessonUrl, setEditLessonUrl] = useState('');
  const [editLessonObjectives, setEditLessonObjectives] = useState('');
  const [editPdfFileName, setEditPdfFileName] = useState('');
  const [isUploadingEditPdf, setIsUploadingEditPdf] = useState(false);

  // Form states: Tugas (Assignment)
  const [newTaskType, setNewTaskType] = useState<'VOICE_TASK' | 'PHOTO_HOMEWORK' | 'QUIZ_CBT'>(
    gradeLevel <= 2 ? 'VOICE_TASK' : 'PHOTO_HOMEWORK'
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
          description:
            res.error ||
            'Terjadi kendala saat menyimpan bab ke sistem. Pastikan koneksi internet aktif dan coba lagi.',
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
          description:
            res.error ||
            'Terjadi kendala saat memperbarui judul bab. Silakan periksa kembali dan coba lagi.',
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
        learningObjectives: newLessonObjectives.trim() || null,
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
      setNewLessonObjectives('');
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
      description:
        'Apakah Anda yakin ingin menghapus penugasan ini? Tugas tidak dapat dihapus jika sudah ada siswa yang mengirim jawaban.',
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

  return (
    <>
      {/* 1. LEVEL 4 & 5: DETAIL MATERI */}
      {selectedLessonId && activeLesson && activeModule ? (
        <LessonDetailView
          activeLesson={activeLesson}
          activeModule={activeModule}
          activeSubject={activeSubject}
          onBackToModule={() => setSelectedLessonId(null)}
          onOpenEditLesson={handleOpenEditLesson}
          onOpenCreateAssignment={() => setIsCreateAssignmentOpen(true)}
          onDeleteAssignment={handleDeleteAssignment}
        />
      ) : /* 2. LEVEL 3: DETAIL BAB */
      selectedModuleId && activeModule ? (
        <ModuleDetailView
          activeModule={activeModule}
          activeSubject={activeSubject}
          onBackToSubject={() => {
            setSelectedModuleId(null);
            setSelectedLessonId(null);
            updateUrlParams({ moduleId: null });
          }}
          onSelectLesson={(lessonId) => setSelectedLessonId(lessonId)}
          onOpenCreateLesson={() => setIsCreateLessonOpen(true)}
          onOpenEditModule={(module) => {
            setEditingModule({ id: module.id, title: module.title });
            setEditModuleTitle(cleanModuleTitle(module.title));
          }}
          onDeleteModule={handleDeleteModule}
          onOpenEditLesson={handleOpenEditLesson}
          onDeleteLesson={handleDeleteLesson}
        />
      ) : (
        /* 3. LEVEL 1 & 2: LIST MAPEL & BAB */
        <SubjectModuleListView
          subjects={subjects}
          modules={modules}
          selectedSubjectId={selectedSubjectId}
          activeSubject={activeSubject}
          subjectModules={subjectModules}
          onSelectSubject={(subjectId) => {
            setSelectedSubjectId(subjectId);
            setSelectedModuleId(null);
            setSelectedLessonId(null);
            updateUrlParams({ subjectId, moduleId: null });
          }}
          onSelectModule={(moduleId, subjectId) => {
            setSelectedModuleId(moduleId);
            setSelectedLessonId(null);
            updateUrlParams({ moduleId, subjectId });
          }}
          onOpenCreateSubject={() => setIsCreateSubjectOpen(true)}
          onOpenEditSubject={(sub) => {
            setEditingSubject({ id: sub.id, name: sub.name });
            setEditSubjectName(sub.name);
          }}
          onOpenCreateModule={() => setIsCreateModuleOpen(true)}
        />
      )}

      {/* DRAWERS & DIALOGS */}
      <SubjectDrawers
        isCreateSubjectOpen={isCreateSubjectOpen}
        setIsCreateSubjectOpen={setIsCreateSubjectOpen}
        newSubjectName={newSubjectName}
        setNewSubjectName={setNewSubjectName}
        handleCreateSubject={handleCreateSubject}
        editingSubject={editingSubject}
        setEditingSubject={setEditingSubject}
        editSubjectName={editSubjectName}
        setEditSubjectName={setEditSubjectName}
        handleUpdateSubject={handleUpdateSubject}
        handleDeleteSubject={handleDeleteSubject}
        isPending={isPending}
      />

      <ModuleDrawers
        isCreateModuleOpen={isCreateModuleOpen}
        setIsCreateModuleOpen={setIsCreateModuleOpen}
        newModuleTitle={newModuleTitle}
        setNewModuleTitle={setNewModuleTitle}
        handleCreateModule={handleCreateModule}
        editingModule={editingModule}
        setEditingModule={setEditingModule}
        editModuleTitle={editModuleTitle}
        setEditModuleTitle={setEditModuleTitle}
        handleUpdateModule={handleUpdateModule}
        activeSubject={activeSubject}
        subjectModulesCount={subjectModules.length}
        isPending={isPending}
      />

      <LessonDrawers
        isCreateLessonOpen={isCreateLessonOpen}
        setIsCreateLessonOpen={setIsCreateLessonOpen}
        activeModule={activeModule}
        newLessonTitle={newLessonTitle}
        setNewLessonTitle={setNewLessonTitle}
        newLessonType={newLessonType}
        setNewLessonType={setNewLessonType}
        newLessonText={newLessonText}
        setNewLessonText={setNewLessonText}
        newLessonUrl={newLessonUrl}
        setNewLessonUrl={setNewLessonUrl}
        newLessonObjectives={newLessonObjectives}
        setNewLessonObjectives={setNewLessonObjectives}
        newPdfFileName={newPdfFileName}
        setNewPdfFileName={setNewPdfFileName}
        isUploadingNewPdf={isUploadingNewPdf}
        setIsUploadingNewPdf={setIsUploadingNewPdf}
        handleCreateLesson={handleCreateLesson}
        editingLesson={editingLesson}
        setEditingLesson={setEditingLesson}
        editLessonTitle={editLessonTitle}
        setEditLessonTitle={setEditLessonTitle}
        editLessonType={editLessonType}
        editLessonText={editLessonText}
        setEditLessonText={setEditLessonText}
        editLessonUrl={editLessonUrl}
        setEditLessonUrl={setEditLessonUrl}
        editLessonObjectives={editLessonObjectives}
        setEditLessonObjectives={setEditLessonObjectives}
        editPdfFileName={editPdfFileName}
        setEditPdfFileName={setEditPdfFileName}
        isUploadingEditPdf={isUploadingEditPdf}
        setIsUploadingEditPdf={setIsUploadingEditPdf}
        handleUpdateLesson={handleUpdateLesson}
        isPending={isPending}
      />

      <AssignmentDrawer
        isOpen={isCreateAssignmentOpen}
        onClose={() => setIsCreateAssignmentOpen(false)}
        activeLesson={activeLesson}
        newTaskType={newTaskType}
        setNewTaskType={setNewTaskType}
        newTaskPrompt={newTaskPrompt}
        setNewTaskPrompt={setNewTaskPrompt}
        newQuizQuestionCount={newQuizQuestionCount}
        setNewQuizQuestionCount={setNewQuizQuestionCount}
        newPassingScore={newPassingScore}
        setNewPassingScore={setNewPassingScore}
        newQuizQuestions={newQuizQuestions}
        setNewQuizQuestions={setNewQuizQuestions}
        handleCreateAssignment={handleCreateAssignment}
        isPending={isPending}
      />

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
    </>
  );
}
