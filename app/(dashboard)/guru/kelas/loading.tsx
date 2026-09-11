import React from 'react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';

export default function GuruKelasListLoading() {
  return (
    <TeacherLayoutShell
      title="Daftar Kelas"
      backHref="/guru"
      activeNavTab="CURRICULUM"
    >
      <div className="space-y-4 animate-pulse select-none">

        {/* List Kelas Shimmer (Persis seperti KelasListClient) */}
        <div className="grid grid-cols-1 gap-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                {/* School Icon Box */}
                <div className="w-11 h-11 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-center justify-center shrink-0" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-32 bg-amber-50 border border-amber-200/50 rounded-md" />
                    <div className="h-3 w-20 bg-slate-100 rounded-md" />
                  </div>
                  <div className="h-4 w-3/5 bg-slate-200/90 rounded-md" />
                </div>
              </div>

              <div className="w-5 h-5 bg-slate-100 rounded-full shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </TeacherLayoutShell>
  );
}
