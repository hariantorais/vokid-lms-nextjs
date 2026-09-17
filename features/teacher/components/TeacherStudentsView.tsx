'use client';

import React, { useState } from 'react';
import {
  Search,
  Star,
  FileCheck,
  ChevronRight,
  Clock,
  Award,
} from 'lucide-react';
import { TeacherLayoutShell } from './TeacherLayoutShell';
import { MobileDrawer } from './MobileDrawer';
import { StudentAvatar } from '@/features/student/components';
import type { StudentListItem } from '../services/teacher-service';
import type { ClassRecord } from '@/types/database';
import Link from 'next/link';
import { Printer } from 'lucide-react';

interface TeacherStudentsViewProps {
  students: StudentListItem[];
  totalCount: number;
  classrooms: ClassRecord[];
  defaultClassId?: string;
}

export function TeacherStudentsView({
  students,
  totalCount,
}: TeacherStudentsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStudent, setActiveStudent] = useState<StudentListItem | null>(null);

  const filteredStudents = students.filter((s) =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TeacherLayoutShell
      title="Daftar Siswa"
      subtitle={`${totalCount} Siswa terdaftar aktif`}
      badgeText="Siswa"
      badgeVariant="emerald"
      activeNavTab="STUDENTS"
      maxWidth="sm"
    >
      <div className="space-y-4 pb-12 select-none">
        {/* Kolom Pencarian Siswa */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
          />
        </div>

        {/* Daftar Kartu Siswa */}
        <div className="space-y-2.5">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-xs font-bold text-slate-400">
                Tidak ada siswa yang ditemukan.
              </p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setActiveStudent(student)}
                className="p-3.5 sm:p-4 bg-white hover:bg-slate-50/80 active:scale-[0.99] rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 transition-all cursor-pointer"
              >
                {/* Identitas Siswa */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <StudentAvatar
                    avatarUrl={student.avatarUrl}
                    studentName={student.fullName}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      {student.fullName}
                    </h4>
                    <p className="text-[11px] font-bold text-slate-400 truncate">
                      {student.className}
                    </p>
                  </div>
                </div>

                {/* Badge Bintang & Status Tugas */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 text-amber-900 rounded-xl shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="text-xs font-black">{student.totalStars}</span>
                  </div>

                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-xs justify-end">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{student.completedSubmissions}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 block">
                      /{student.totalSubmissions} Tugas
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Drawer Pop-up Detail Kemajuan Lengkap */}
      <MobileDrawer
        isOpen={Boolean(activeStudent)}
        onClose={() => setActiveStudent(null)}
        title={activeStudent?.fullName ?? 'Kemajuan Siswa'}
        subtitle={
          activeStudent ? (
            <span className="text-xs font-bold text-slate-500">
              {activeStudent.className}
            </span>
          ) : undefined
        }
      >
        {activeStudent && (
          <div className="space-y-4 pt-1">
            {/* Banner Prestasi Bintang Emas */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-100">
                  Total Perolehan Prestasi
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black backdrop-blur-xs">
                  Aktif Belajar
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-7 h-7 fill-yellow-200 text-yellow-200 drop-shadow-xs" />
                <span className="text-3xl font-black">{activeStudent.totalStars}</span>
                <span className="text-xs font-bold text-amber-100">Bintang Emas</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/20 text-[11px] font-bold">
                <div className="bg-black/10 rounded-xl p-2">
                  <span className="text-amber-100 block text-[10px]">Pos Materi Takluk:</span>
                  <span className="text-white font-black text-xs">
                    {activeStudent.completedLessonsCount} Pos (×10 ⭐)
                  </span>
                </div>
                <div className="bg-black/10 rounded-xl p-2">
                  <span className="text-amber-100 block text-[10px]">Tugas Selesai:</span>
                  <span className="text-white font-black text-xs">
                    {activeStudent.completedTasksCount} Tugas (×15 ⭐)
                  </span>
                </div>
              </div>
            </div>

            {/* Riwayat 5 Tugas Terakhir */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Riwayat 5 Tugas Terakhir</span>
              </h4>

              {activeStudent.recentSubmissions.length === 0 ? (
                <div className="p-4 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 text-xs font-bold">
                  Belum ada tugas yang dikumpulkan oleh siswa ini.
                </div>
              ) : (
                <div className="space-y-2">
                  {activeStudent.recentSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-2.5 shadow-2xs"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                          {sub.subjectName} •{' '}
                          {sub.type === 'VOICE_TASK'
                            ? '🎙️ Suara'
                            : sub.type === 'QUIZ_CBT'
                              ? '🧠 CBT'
                              : '📷 Foto'}
                        </span>
                        <h5 className="text-xs font-black text-slate-900 truncate">
                          {sub.assignmentTitle}
                        </h5>
                      </div>

                      <div className="text-right shrink-0">
                        {sub.status === 'GRADED' && sub.score !== null ? (
                          <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-black text-xs inline-flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-600" />
                            <span>{sub.score} ⭐</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700 font-bold text-[10px] border border-sky-200">
                            Menunggu Dinilai
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol Tutup */}
            {/* Tombol Cetak / Lihat Rapor Siswa */}
            <div className="pt-3 space-y-2">
              <Link
                href={`/guru/siswa/${activeStudent.id}/rapor`}
                className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-200"
              >
                <Printer className="w-4 h-4" />
                <span>Lihat & Cetak Rapor Siswa</span>
              </Link>

              <button
                type="button"
                onClick={() => setActiveStudent(null)}
                className="w-full h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveStudent(null)}
                className="w-full h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Tutup Ringkasan
              </button>
            </div>
          </div>
        )}
      </MobileDrawer>
    </TeacherLayoutShell>
  );
}