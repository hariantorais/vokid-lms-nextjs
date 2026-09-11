'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  FolderPlus,
  Edit2,
  Trash2,
  Plus,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { MobileConfirmDialog } from './MobileConfirmDialog';
import {
  createModuleAction,
  updateModuleAction,
  deleteModuleAction,
} from '../actions/teacher-actions';
import { formatModuleTitle, cleanModuleTitle } from '@/lib/formatters';

export interface ModuleData {
  id: string;
  title: string;
  order_index: number;
  subject_id: string;
  subject_name?: string;
  lessons_count?: number;
}

export interface SubjectOption {
  id: string;
  name: string;
  code?: string;
}

interface ModuleManagementCardProps {
  classId: string;
  subjects: SubjectOption[];
  modules: ModuleData[];
}

export function ModuleManagementCard({
  classId,
  subjects,
  modules,
}: ModuleManagementCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? '');
  const [newTitle, setNewTitle] = useState('');
  const [newOrderIndex, setNewOrderIndex] = useState<number>(modules.length + 1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<ModuleData | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editOrderIndex, setEditOrderIndex] = useState<number>(0);

  // Native Mobile Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const handleOpenAdd = () => {
    setNewTitle('');
    setNewOrderIndex(modules.length + 1);
    if (subjects[0]) setSelectedSubjectId(subjects[0].id);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (mod: ModuleData) => {
    setEditingModule(mod);
    setEditTitle(cleanModuleTitle(mod.title));
    setEditOrderIndex(mod.order_index);
    setIsEditOpen(true);
  };

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error('Judul modul wajib diisi.');
      return;
    }

    startTransition(async () => {
      const res = await createModuleAction({
        subjectId: selectedSubjectId,
        title: newTitle.trim(),
        orderIndex: Number(newOrderIndex) || 0,
      });

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success('Modul bab berhasil ditambahkan!');
      setIsAddOpen(false);
      setNewTitle('');
      router.refresh();
    });
  };

  const handleUpdateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModule || !editTitle.trim()) return;

    startTransition(async () => {
      const res = await updateModuleAction({
        moduleId: editingModule.id,
        title: editTitle.trim(),
        orderIndex: Number(editOrderIndex) || 0,
      });

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success('Modul berhasil diperbarui!');
      setIsEditOpen(false);
      setEditingModule(null);
      router.refresh();
    });
  };

  const handleDeleteModule = (moduleId: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Bab / Modul?',
      description: `Apakah Anda yakin ingin menghapus "${title}"? Bab tidak dapat dihapus jika masih terdapat materi di dalamnya.`,
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteModuleAction(moduleId);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Modul berhasil dihapus.');
          router.refresh();
        });
      },
    });
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header Aksi Ringkas */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
            Daftar Bab & Modul
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            {modules.length} Bab Terdaftar
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          disabled={isPending}
          className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-40 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-sky-400" />
          <span>Tambah Bab</span>
        </button>
      </div>

      {/* Daftar Modul Feed Clean */}
      {modules.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">Belum ada bab atau modul</p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Klik tombol Tambah Bab di atas untuk membuat bab materi pertama.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="p-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {mod.order_index}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 leading-snug break-words">
                    {formatModuleTitle(mod.order_index, mod.title)}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {mod.subject_name ?? 'Matematika'} • {mod.lessons_count ?? 0} materi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  data-testid={`edit-module-btn-${mod.id}`}
                  onClick={() => handleOpenEdit(mod)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Ubah Judul"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  data-testid={`delete-module-btn-${mod.id}`}
                  onClick={() => handleDeleteModule(mod.id, mod.title)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Hapus Bab"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer Tambah Modul */}
      <MobileDrawer
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Bab Baru"
      >
        <form onSubmit={handleCreateModule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mata Pelajaran
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab Modul
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan judul bab..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Nomor bab akan dibuat otomatis sesuai urutan.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nomor Urutan
            </label>
            <input
              type="number"
              min={0}
              value={newOrderIndex}
              onChange={(e) => setNewOrderIndex(Number(e.target.value))}
              className="w-24 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
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

      {/* Drawer Ubah Modul */}
      <MobileDrawer
        isOpen={isEditOpen && Boolean(editingModule)}
        onClose={() => {
          setIsEditOpen(false);
          setEditingModule(null);
        }}
        title="Ubah Judul Bab"
      >
        <form onSubmit={handleUpdateModule} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Bab Modul
            </label>
            <input
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nomor Urutan
            </label>
            <input
              type="number"
              min={0}
              value={editOrderIndex}
              onChange={(e) => setEditOrderIndex(Number(e.target.value))}
              className="w-24 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Perbarui Bab'}
          </button>
        </form>
      </MobileDrawer>

      {/* Native-style Mobile Confirm Dialog */}
      <MobileConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        isLoading={isPending}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}