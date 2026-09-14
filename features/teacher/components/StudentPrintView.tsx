'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, Star } from 'lucide-react';
import type { StudentReportData } from '../services/teacher-service';

interface StudentReportPrintViewProps {
    data: StudentReportData;
}

export function StudentReportPrintView({ data }: StudentReportPrintViewProps) {
    const { student, subjectsReport, overallAverage, reportDate } = data;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 print:p-0 print:bg-white text-slate-900">
            {/* Action Bar (Hanya tampil di browser, disembunyikan saat cetak) */}
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

            {/* Lembar Dokumen Rapor (Standar Kertas A4) */}
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

                {/* REKAP BINTANG & PRESTASI BELAJAR */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 text-center print:border-slate-300">
                        <div className="flex items-center justify-center gap-1.5 text-amber-900 font-black text-lg">
                            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                            <span>{student.totalStars}</span>
                        </div>
                        <span className="text-[10.5px] font-bold text-amber-800">Total Bintang Emas</span>
                    </div>

                    <div className="p-3.5 rounded-2xl border border-sky-200 bg-sky-50/50 text-center print:border-slate-300">
                        <span className="text-lg font-black text-sky-900 block">{student.completedLessonsCount} Pos</span>
                        <span className="text-[10.5px] font-bold text-sky-800">Materi Ditaklukkan</span>
                    </div>

                    <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center print:border-slate-300">
                        <span className="text-lg font-black text-emerald-900 block">{overallAverage} Poin</span>
                        <span className="text-[10.5px] font-bold text-emerald-800">Rerata Nilai Tugas</span>
                    </div>
                </div>

                {/* TABEL CAPAIAN KOMPETENSI / NILAI MATA PELAJARAN */}
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
                                    <th className="py-2.5 px-3 w-20 text-center border-r border-slate-300">Nilai Akhir</th>
                                    <th className="py-2.5 px-3 w-28 text-center border-r border-slate-300">Predikat</th>
                                    <th className="py-2.5 px-3">Capaian Kompetensi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {subjectsReport.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-6 text-center text-slate-400 font-bold">
                                            Belum ada catatan nilai tugas pada mata pelajaran.
                                        </td>
                                    </tr>
                                ) : (
                                    subjectsReport.map((sub, idx) => (
                                        <tr key={sub.subjectId} className="hover:bg-slate-50/50">
                                            <td className="py-2.5 px-3 text-center border-r border-slate-200 font-bold">
                                                {idx + 1}
                                            </td>
                                            <td className="py-2.5 px-3 border-r border-slate-200 font-black text-slate-900">
                                                {sub.subjectName}
                                            </td>
                                            <td className="py-2.5 px-3 text-center border-r border-slate-200 font-black text-slate-900 text-sm">
                                                {sub.averageScore}
                                            </td>
                                            <td className="py-2.5 px-3 text-center border-r border-slate-200 font-bold text-slate-700">
                                                {sub.predicate}
                                            </td>
                                            <td className="py-2.5 px-3 text-[11px] text-slate-600 font-medium leading-relaxed">
                                                {sub.description}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
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

                {/* TANDA TANGAN (LEMBAR PENGESAHAN) */}
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
                        <p className="font-black text-slate-900 underline">Ibu Guru Vokid, S.Pd.</p>
                        <p className="text-[10px] text-slate-500">NIP. 19920815 202601 2 001</p>
                    </div>
                </div>
            </div>
        </div>
    );
}