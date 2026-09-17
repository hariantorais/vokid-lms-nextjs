'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';
import type { StudentReportData } from '../services/teacher-service';

interface StudentReportPrintViewProps {
    data: StudentReportData;
}

export function StudentReportPrintView({ data }: StudentReportPrintViewProps) {
    const { student, teacherName, subjectsReport, overallAverage, reportDate } = data;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 print:p-0 print:bg-white text-slate-900">
            {/* Action Bar */}
            <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
                <Link
                    href="/guru/siswa"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Siswa</span>
                </Link>

                <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-xs font-black text-white transition-all shadow-md shadow-indigo-200 cursor-pointer"
                >
                    <Printer className="w-4 h-4" />
                    <span>Cetak / Simpan PDF</span>
                </button>
            </div>

            {/* Lembar Dokumen Rapor */}
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-200 print:border-none print:shadow-none print:p-6 print:rounded-none">
                {/* KOP RAPOR */}
                <div className="border-b-4 border-double border-slate-900 pb-5 mb-6 text-center">
                    <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900">
                        LAPORAN HASIL BELAJAR SISWA (RAPOR)
                    </h1>
                    <p className="text-sm font-bold text-slate-600 mt-1">
                        PLATFORM EDUKASI DIGITAL VOKID • KURIKULUM MERDEKA
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                        Tahun Ajaran 2026/2027 • Semester Ganjil
                    </p>
                </div>

                {/* IDENTITAS SISWA */}
                <div className="grid grid-cols-2 gap-4 text-xs font-bold mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 print:bg-transparent print:border-slate-300">
                    <div className="space-y-1.5">
                        <div className="flex">
                            <span className="w-32 text-slate-500">Nama Siswa</span>
                            <span className="text-slate-900 font-black">: {student.fullName}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-slate-500">NIS / ID Siswa</span>
                            <span className="text-slate-900">: {student.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex">
                            <span className="w-32 text-slate-500">Rombel / Kelas</span>
                            <span className="text-slate-900">: {student.className}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-slate-500">Tingkat Fase</span>
                            <span className="text-slate-900">: Fase A (Kelas {student.gradeLevel} SD)</span>
                        </div>
                    </div>
                </div>

                {/* TABEL CAPAIAN KOMPETENSI / NILAI SEMUA MATA PELAJARAN */}
                <div className="mb-6">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                        A. Capaian Nilai Formatif &amp; Sumatif
                    </h3>

                    <div className="overflow-hidden border border-slate-300 rounded-2xl print:rounded-none">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-black">
                                    <th className="py-2.5 px-3 w-10 text-center border-r border-slate-300">No</th>
                                    <th className="py-2.5 px-3 border-r border-slate-300">Mata Pelajaran</th>
                                    <th className="py-2.5 px-3 w-20 text-center border-r border-slate-300"> Total Bab</th>
                                    <th className="py-2.5 px-3 w-28 text-center border-r border-slate-300">Tugas</th>
                                    <th className="py-2.5 px-3 w-20 text-center border-r border-slate-300">Nilai</th>
                                    <th className="py-2.5 px-3 w-24 text-center border-r border-slate-300">Predikat</th>
                                    <th className="py-2.5 px-3">Capaian Kompetensi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {subjectsReport.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-6 text-center text-slate-400 font-bold">
                                            Belum ada mata pelajaran terdaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    subjectsReport.map((sub, idx) => {
                                        const isAllCompleted =
                                            sub.totalTasks > 0 && sub.completedTasks === sub.totalTasks;

                                        return (
                                            <tr key={sub.subjectId} className="hover:bg-slate-50/50">
                                                <td className="py-2.5 px-3 text-center border-r border-slate-200 font-bold">
                                                    {idx + 1}
                                                </td>
                                                <td className="py-2.5 px-3 border-r border-slate-200 font-black text-slate-900">
                                                    {sub.subjectName}
                                                </td>
                                                {/* Kolom Total Bab */}
                                                <td className="py-2.5 px-3 text-center border-r border-slate-200 font-bold text-slate-700">
                                                    {sub.totalModules}
                                                </td>
                                                {/* Kolom Progres Tugas */}
                                                <td className="py-2.5 px-3 text-center border-r border-slate-200 font-bold">
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded-lg text-xs ${isAllCompleted
                                                            ? 'bg-emerald-50 text-emerald-800 font-black'
                                                            : sub.completedTasks > 0
                                                                ? 'bg-amber-50 text-amber-800'
                                                                : 'bg-slate-100 text-slate-500'
                                                            }`}
                                                    >
                                                        {sub.completedTasks} / {sub.totalTasks} Tugas
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3 text-center border-r border-slate-200 font-black text-slate-900 text-sm">
                                                    {sub.completedTasks > 0 ? sub.averageScore : '-'}
                                                </td>
                                                <td className="py-2.5 px-3 text-center border-r border-slate-200 font-bold text-slate-700">
                                                    {sub.predicate}
                                                </td>
                                                <td className="py-2.5 px-3 text-[11px] text-slate-600 font-medium leading-relaxed">
                                                    {sub.description}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                            {/* Baris Rata-Rata Keseluruhan */}
                            {subjectsReport.length > 0 && (
                                <tfoot>
                                    <tr className="bg-slate-50 border-t-2 border-slate-300 font-black text-slate-900">
                                        <td colSpan={4} className="py-3 px-3 text-right border-r border-slate-300 uppercase tracking-wider text-[11px]">
                                            Nilai Rata-Rata Keseluruhan
                                        </td>
                                        <td className="py-3 px-3 text-center border-r border-slate-300 text-base text-emerald-700">
                                            {overallAverage}
                                        </td>
                                        <td colSpan={2} className="py-3 px-3 text-[11px] text-slate-600 font-bold">
                                            {overallAverage >= 85
                                                ? 'Predikat Umum: Memuaskan / Sangat Baik'
                                                : overallAverage >= 70
                                                    ? 'Predikat Umum: Baik'
                                                    : 'Predikat Umum: Perlu Bimbingan'}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>

                {/* CATATAN WALI KELAS */}
                <div className="mb-10 p-4 border border-slate-300 rounded-2xl print:rounded-none">
                    <h4 className="text-xs font-black uppercase text-slate-800 mb-1">
                        B. Catatan Perkembangan Belajar (Wali Kelas)
                    </h4>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                        &ldquo;Ananda {student.fullName} menunjukkan antusiasme yang sangat baik dalam kegiatan belajar mandiri maupun pengerjaan tugas suara dan foto. Pertahankan rasa ingin tahu dan tingkatkan kedisiplinan dalam menyelesaikan setiap pos materi.&rdquo;
                    </p>
                </div>

                {/* TANDA TANGAN */}
                <div className="grid grid-cols-2 text-center text-xs font-bold pt-4 text-slate-800 break-inside-avoid">
                    <div>
                        <p>Mengetahui,</p>
                        <p className="font-semibold text-slate-500">Orang Tua / Wali Murid</p>
                        <div className="h-20" />
                        <p className="border-b border-slate-400 w-40 mx-auto" />
                    </div>

                    <div>
                        <p>Batam, {reportDate}</p>
                        <p className="font-semibold text-slate-500">Guru Wali Kelas</p>
                        <div className="h-20" />
                        <p className="font-black text-slate-900 underline">{teacherName}</p>
                        <p className="text-[10px] text-slate-500">Wali Kelas {student.className}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}