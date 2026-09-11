'use client';

import React from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { MobileDrawer } from '@/features/teacher/components/MobileDrawer';
import type { SubjectOption } from '@/features/teacher/types/curriculum';

interface SubjectDrawersProps {
  isCreateSubjectOpen: boolean;
  setIsCreateSubjectOpen: (open: boolean) => void;
  newSubjectName: string;
  setNewSubjectName: (name: string) => void;
  handleCreateSubject: (e: React.FormEvent) => void;

  editingSubject: SubjectOption | null;
  setEditingSubject: (subject: SubjectOption | null) => void;
  editSubjectName: string;
  setEditSubjectName: (name: string) => void;
  handleUpdateSubject: (e: React.FormEvent) => void;
  handleDeleteSubject: (id: string, name: string) => void;

  isPending: boolean;
}

export function SubjectDrawers({
  isCreateSubjectOpen,
  setIsCreateSubjectOpen,
  newSubjectName,
  setNewSubjectName,
  handleCreateSubject,
  editingSubject,
  setEditingSubject,
  editSubjectName,
  setEditSubjectName,
  handleUpdateSubject,
  handleDeleteSubject,
  isPending,
}: SubjectDrawersProps) {
  return (
    <>
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
    </>
  );
}
