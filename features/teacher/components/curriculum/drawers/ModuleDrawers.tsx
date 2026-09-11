'use client';

import React from 'react';
import { Loader2, Layers } from 'lucide-react';
import { MobileDrawer } from '../../MobileDrawer';
import type { SubjectOption } from '../../ModuleManagementCard';
import type { ModuleWithLessonsAndAssignments } from '../../AssignmentManagementCard';

interface ModuleDrawersProps {
  isCreateModuleOpen: boolean;
  setIsCreateModuleOpen: (open: boolean) => void;
  newModuleTitle: string;
  setNewModuleTitle: (title: string) => void;
  handleCreateModule: (e: React.FormEvent) => void;

  editingModule: { id: string; title: string } | null;
  setEditingModule: (module: { id: string; title: string } | null) => void;
  editModuleTitle: string;
  setEditModuleTitle: (title: string) => void;
  handleUpdateModule: (e: React.FormEvent) => void;

  activeSubject: SubjectOption | null | undefined;
  subjectModulesCount: number;
  isPending: boolean;
}

export function ModuleDrawers({
  isCreateModuleOpen,
  setIsCreateModuleOpen,
  newModuleTitle,
  setNewModuleTitle,
  handleCreateModule,
  editingModule,
  setEditingModule,
  editModuleTitle,
  setEditModuleTitle,
  handleUpdateModule,
  activeSubject,
  subjectModulesCount,
  isPending,
}: ModuleDrawersProps) {
  return (
    <>
      {/* Drawer Tambah Bab Baru */}
      <MobileDrawer
        isOpen={isCreateModuleOpen}
        onClose={() => setIsCreateModuleOpen(false)}
        title={`Tambah BAB ${subjectModulesCount + 1}`}
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
    </>
  );
}
