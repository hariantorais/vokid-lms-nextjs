'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Trash2, Plus } from 'lucide-react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { SubjectModuleListView } from './SubjectModuleListView';
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

  // --- 1. FULL-PAGE: TAMBAH MAPEL BARU ---
  if (isCreateSubjectOpen) {
    return (
      <TeacherLayoutShell
        title="Tambah Mata Pelajaran"
        onBackClick={() => {
          setIsCreateSubjectOpen(false);
          setNewSubjectName('');
        }}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="create-subject-form"
          onSubmit={handleCreateSubject}
          className="space-y-4 pt-1 pb-24"
        >
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Mata Pelajaran *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Contoh: Bahasa Indonesia, Seni Rupa, IPAS"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
              Nama mata pelajaran akan tampil sebagai tab navigasi utama di kelas {classData.name}.
            </p>
          </div>
        </form>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setIsCreateSubjectOpen(false);
                setNewSubjectName('');
              }}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="create-subject-form"
              disabled={isPending}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Mapel...</span>
                </>
              ) : (
                'Simpan Mapel'
              )}
            </button>
          </div>
        </div>
      </TeacherLayoutShell>
    );
  }

  // --- 2. FULL-PAGE: EDIT / HAPUS MAPEL ---
  if (editingSubject) {
    return (
      <TeacherLayoutShell
        title="Edit Mata Pelajaran"
        onBackClick={() => {
          setEditingSubject(null);
          setEditSubjectName('');
        }}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="edit-subject-form"
          onSubmit={handleUpdateSubject}
          className="space-y-4 pt-1 pb-24"
        >
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Mata Pelajaran *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Nama mata pelajaran..."
              value={editSubjectName}
              onChange={(e) => setEditSubjectName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
            />
          </div>

          {/* Danger Zone: Hapus Mapel */}
          <div className="pt-4 border-t border-slate-200/80">
            <button
              type="button"
              disabled={isPending}
              onClick={() => handleDeleteSubject(editingSubject.id, editingSubject.name)}
              className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 border border-rose-200/70 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Hapus Mata Pelajaran Ini</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-1.5">
              Peringatan: Seluruh bab dan materi di dalam mapel ini akan ikut terhapus.
            </p>
          </div>
        </form>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setEditingSubject(null);
                setEditSubjectName('');
              }}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="edit-subject-form"
              disabled={isPending}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
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

  // --- 3. FULL-PAGE: TAMBAH BAB BARU ---
  if (isCreateModuleOpen) {
    return (
      <TeacherLayoutShell
        title={`Tambah Bab ${subjectModules.length + 1}`}
        subtitle={activeSubject?.name}
        onBackClick={() => {
          setIsCreateModuleOpen(false);
          setNewModuleTitle('');
        }}
        activeNavTab="CURRICULUM"
        showBottomNav={false}
      >
        <form
          id="create-module-form"
          onSubmit={handleCreateModule}
          className="space-y-4 pt-1 pb-24"
        >
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab / Modul *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Contoh: Pengenalan Fonik Suku Kata"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
              Bab ini akan ditambahkan ke mata pelajaran {activeSubject?.name}.
            </p>
          </div>
        </form>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-[440px] mx-auto p-3 flex gap-2.5">
            <button
              type="button"
              onClick={() => {
                setIsCreateModuleOpen(false);
                setNewModuleTitle('');
              }}
              className="h-12 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-600 font-bold text-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
            >
              Batal
            </button>

            <button
              type="submit"
              form="create-module-form"
              disabled={isPending}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:opacity-95 active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-50 transition-all"
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
          </div>
        </div>
      </TeacherLayoutShell>
    );
  }

  // --- 4. FULL-PAGE: EDIT JUDUL BAB ---
  if (editingModule) {
    return (
      <TeacherLayoutShell
        title="Edit Judul Bab"
        subtitle={activeSubject?.name}
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
          className="space-y-4 pt-1 pb-24"
        >
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Masukkan judul bab..."
              value={editModuleTitle}
              onChange={(e) => setEditModuleTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs transition-all"
            />
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
                  <span>Menyimpan...</span>
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

  // --- TAMPILAN UTAMA DETAIL KELAS ---
  return (
    <TeacherLayoutShell
      title={classData.name}
      subtitle={`T.A. ${classData.academic_year}`}
      badgeText={isFaseA ? 'Fase A' : 'Fase B/C'}
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

      {/* Floating Action Button (FAB) Tambah Bab ala Native Mobile */}
      {activeSubject && (
        <div className="fixed bottom-24 right-4 sm:right-6 md:right-8 z-40">
          <button
            type="button"
            onClick={() => setIsCreateModuleOpen(true)}
            className="h-12 px-4 sm:h-13 sm:px-5 rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-95 transition-all cursor-pointer border border-white/20 ring-4 ring-white/30"
            title={`Tambah Bab Baru ke ${activeSubject.name}`}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Plus className="w-4 h-4 text-white stroke-[3]" />
            </div>
            <span className="tracking-wide">Bab Baru</span>
          </button>
        </div>
      )}
    </TeacherLayoutShell>
  );
}
