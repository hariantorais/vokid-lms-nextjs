'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { ModuleDetailView } from './ModuleDetailView';
import { LessonCreateDrawer } from './LessonCreateDrawer';
import { LessonEditDrawer } from './LessonEditDrawer';
import { BabEditDrawer } from './BabEditDrawer';
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
import { cleanModuleTitle } from '@/lib/formatters';
import type { BabDetailData } from '../_services/bab-detail.service';
import type { Lesson } from '@/types/database';

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

  // Drawers Lesson (Materi Baru)
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
    onConfirm: () => {},
  });

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
          // Redirect kembali ke halaman kelas
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
      setIsCreateLessonOpen(false);
      setNewLessonTitle('');
      setNewLessonText('');
      setNewLessonUrl('');
      setNewLessonObjectives('');
      // Langsung arahkan guru masuk ke halaman materi baru
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

  return (
    <TeacherLayoutShell
      title={mod.title}
      subtitle={`${mod.subject.name} • ${classData.name}`}
      badgeText={isFaseA ? 'Fase A' : 'Fase B/C'}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref={`/guru/kelas/${classData.id}`}
      activeNavTab="CURRICULUM"
      defaultClassId={classData.id}
    >
      <ModuleDetailView
        activeModule={mod}
        activeSubject={mod.subject}
        onBackToSubject={() => {
          router.push(`/guru/kelas/${classData.id}`);
        }}
        onSelectLesson={(lessonId) => {
          // Navigasi ke halaman mandiri Pelajaran
          router.push(`/guru/pelajaran/${lessonId}`);
        }}
        onOpenCreateLesson={() => setIsCreateLessonOpen(true)}
        onOpenEditModule={(module) => {
          setEditingModule({ id: module.id, title: module.title });
          setEditModuleTitle(cleanModuleTitle(module.title));
        }}
        onDeleteModule={handleDeleteModule}
        onOpenEditLesson={handleOpenEditLesson}
        onDeleteLesson={handleDeleteLesson}
      />

      {/* Drawer Edit Judul Bab */}
      <BabEditDrawer
        editingModule={editingModule}
        setEditingModule={setEditingModule}
        editModuleTitle={editModuleTitle}
        setEditModuleTitle={setEditModuleTitle}
        handleUpdateModule={handleUpdateModule}
        activeSubject={mod.subject}
        isPending={isPending}
      />

      {/* Drawer Tambah Materi */}
      <LessonCreateDrawer
        isOpen={isCreateLessonOpen}
        onClose={() => setIsCreateLessonOpen(false)}
        activeModule={mod}
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
        isPending={isPending}
      />

      {/* Drawer Edit Materi */}
      <LessonEditDrawer
        editingLesson={editingLesson}
        setEditingLesson={setEditingLesson}
        editLessonTitle={editLessonTitle}
        setEditLessonTitle={setEditLessonTitle}
        editLessonType={editLessonType}
        setEditLessonType={setEditLessonType}
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
