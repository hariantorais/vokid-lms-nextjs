'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { LessonDetailView } from './LessonDetailView';
import { LessonEditDrawer } from './LessonEditDrawer';
import {
  AssignmentDrawer,
  type QuizQuestionState,
} from './AssignmentDrawer';
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

  // Drawer Buat Tugas
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

  return (
    <TeacherLayoutShell
      title={lesson.title}
      subtitle={`${mod.title} • ${classData.name}`}
      badgeText={isFaseA ? 'Fase A (Kelas 1–2)' : 'Fase B/C (Kelas 3–6)'}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref={`/guru/bab/${mod.id}`}
      activeNavTab="CURRICULUM"
      defaultClassId={classData.id}
      headerAction={
        <button
          type="button"
          onClick={() => handleOpenEditLesson(lesson)}
          className="h-8 px-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Edit Materi Ini"
        >
          <span>Edit</span>
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

      {/* Drawer Edit Materi */}
      <LessonEditDrawer
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

      {/* Drawer Buat Tugas */}
      <AssignmentDrawer
        isOpen={isCreateAssignmentOpen}
        onClose={() => setIsCreateAssignmentOpen(false)}
        activeLesson={lesson}
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
    </TeacherLayoutShell>
  );
}
