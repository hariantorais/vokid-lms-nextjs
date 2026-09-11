'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  ChevronRight,
} from 'lucide-react';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import type { StudentListItem } from '@/features/teacher/services/teacher-service';
import type { ClassRecord } from '@/types/database';

interface TeacherStudentsViewProps {
  students: StudentListItem[];
  classrooms: ClassRecord[];
  defaultClassId?: string;
}

export function TeacherStudentsView({
  students,
  classrooms,
  defaultClassId,
}: TeacherStudentsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TeacherLayoutShell
      title="Daftar Siswa"
      subtitle="Progres Murid"
      badgeText={`${students.length} Siswa`}
      badgeVariant="emerald"
      activeNavTab="STUDENTS"
      defaultClassId={defaultClassId}
    >
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Cari nama siswa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
        />
      </div>

      {/* Ringkasan Kelas */}
      {classrooms.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">
              Kelas Binaan
            </span>
            <h3 className="text-base font-black">{classrooms[0].name}</h3>
            <p className="text-xs text-emerald-100 font-medium">
              Level {classrooms[0].grade_level} SD • {classrooms[0].academic_year}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center font-black text-lg">
            🎒
          </div>
        </div>
      )}

      {/* List Siswa */}
      <div className="space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Tidak ada siswa yang ditemukan</p>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian Anda.</p>
          </div>
        ) : (
          filteredStudents.map((st, idx) => (
            <div
              key={st.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0">
                  {st.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {st.fullName}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-medium">
                    <span>{st.className}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">
                      {st.completedSubmissions} tugas selesai
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-slate-100 text-slate-600">
                  #{idx + 1}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </TeacherLayoutShell>
  );
}
