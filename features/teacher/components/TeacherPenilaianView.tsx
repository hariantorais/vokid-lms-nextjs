'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Mic,
  Camera,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import type { PendingReviewQueueItem } from '@/features/teacher/services/teacher-service';

interface TeacherPenilaianViewProps {
  queue: PendingReviewQueueItem[];
  defaultClassId?: string;
}

export function TeacherPenilaianView({ queue, defaultClassId }: TeacherPenilaianViewProps) {
  return (
    <TeacherLayoutShell
      title="Penilaian"
      subtitle={`${queue.length} tugas siap dinilai`}
      badgeText={`${queue.length} Tugas`}
      badgeVariant="amber"
      activeNavTab="PENILAIAN"
      defaultClassId={defaultClassId}
    >
      {/* Header Stat Ringkas */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Status Pemeriksaan
          </span>
          <p className="text-sm font-black text-slate-900 mt-0.5">
            {queue.length > 0 ? `${queue.length} Tugas Perlu Dinilai` : 'Semua Tugas Selesai! 🎉'}
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 font-black text-sm flex items-center justify-center border border-amber-200/70">
          {queue.length}
        </div>
      </div>

      {/* Feed Daftar Antrean Tugas */}
      <div className="space-y-3">
        {queue.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <p className="text-sm font-black text-slate-800">Antrean Pemeriksaan Bersih!</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Belum ada tugas siswa baru yang dikirimkan. Siswa akan muncul di sini saat mengumpulkan tugas suara atau foto PR.
            </p>
          </div>
        ) : (
          queue.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-2xs space-y-3 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {item.className} • {item.submittedAt}
                  </span>
                  <h3 className="text-base font-black text-slate-900 leading-tight mt-0.5">
                    {item.studentName}
                  </h3>
                </div>

                {item.type === 'VOICE_TASK' ? (
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-purple-100 text-purple-800 flex items-center gap-1">
                    <Mic className="w-3.5 h-3.5" />
                    <span>Tugas Suara</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-sky-100 text-sky-800 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Foto PR</span>
                  </span>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instruksi Soal:</p>
                <p className="text-xs font-bold text-slate-700 line-clamp-2 mt-0.5">
                  {item.assignmentTitle}
                </p>
              </div>

              <Link
                href={`/guru/penilaian/${item.id}`}
                className="w-full min-h-[46px] rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-98 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform"
              >
                <span>Buka Lembar Penilaian</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))
        )}
      </div>
    </TeacherLayoutShell>
  );
}
