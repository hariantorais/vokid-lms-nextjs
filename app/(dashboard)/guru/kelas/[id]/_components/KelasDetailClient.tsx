'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { SubjectModuleListView } from './SubjectModuleListView';
import { SubjectDrawers } from './SubjectDrawers';
import { ModuleDrawers } from './ModuleDrawers';
import { MobileConfirmDialog } from '@/features/teacher/components/MobileConfirmDialog';
import {
  createSubjectAction,
  updateSubjectAction,
  deleteSubjectAction,
  createModuleAction,
  updateModuleAction,
} from '@/features/teacher/actions/teacher-actions';
import { cleanModuleTitle } from '@/lib/formatters';
import type { ClassCurriculumDetail } from '../_services/kelas-curriculum.service';
import type { SubjectOption } from '@/features/teacher/types/curriculum';

interface KelasDetailClientProps {
  data: ClassCurriculumDetail;
}

export function KelasDetailClient({ data }: KelasDetailClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { classData, subjects } = data;
  const isFaseA = classData.grade_level <= 2;

  // Selected Subject state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    subjects[0]?.id ?? null
  );

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) ?? subjects[0];
  const allModules = subjects.flatMap((s) => s.modules);
  const subjectModules = activeSubject ? activeSubject.modules : [];

  // Drawers Mapel
  const [isCreateSubjectOpen, setIsCreateSubjectOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingSubject, setEditingSubject] = useState<{ id: string; name: string } | null>(null);
  const [editSubjectName, setEditSubjectName] = useState('');

  // Drawers Bab
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editingModule, setEditingModule] = useState<{ id: string; title: string } | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState('');

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
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      toast.error('Nama mata pelajaran wajib diisi');
      return;
    }
    startTransition(async () => {
      const res = await createSubjectAction({ classId: classData.id, name: newSubjectName.trim() });
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
      title: 'Hapus Mata Pelajaran?',
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
      // Langsung arahkan guru masuk ke halaman bab baru
      router.push(`/guru/bab/${res.data.id}`);
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

  const subjectOptions: SubjectOption[] = subjects.map((s) => ({
    id: s.id,
    name: s.name,
    code: s.code,
  }));

  return (
    <TeacherLayoutShell
      title={classData.name}
      subtitle={`Kelas ${classData.grade_level} • T.A. ${classData.academic_year}`}
      badgeText={isFaseA ? 'Fase A (Kelas 1–2)' : 'Fase B/C (Kelas 3–6)'}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref="/guru/kelas"
      activeNavTab="CURRICULUM"
      defaultClassId={classData.id}
    >
      <SubjectModuleListView
        subjects={subjectOptions}
        modules={allModules}
        selectedSubjectId={selectedSubjectId}
        activeSubject={activeSubject}
        subjectModules={subjectModules}
        onSelectSubject={(subjectId) => setSelectedSubjectId(subjectId)}
        onSelectModule={(moduleId) => {
          // Navigasi ke halaman mandiri Bab
          router.push(`/guru/bab/${moduleId}`);
        }}
        onOpenCreateSubject={() => setIsCreateSubjectOpen(true)}
        onOpenEditSubject={(sub) => {
          setEditingSubject({ id: sub.id, name: sub.name });
          setEditSubjectName(sub.name);
        }}
        onOpenCreateModule={() => setIsCreateModuleOpen(true)}
      />

      {/* Drawers Mapel */}
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

      {/* Drawers Bab */}
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
