'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MarkdownContent } from '@/components/common/MarkdownContent';
import {
  Printer,
  ArrowLeft,
  FileText,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import type { TeachingDeskData } from '@/features/teacher/actions/acceleration-actions';
import type { PedagogicLessonGuide, WorksheetPrintReady } from '@/types';
import { LkpdItemRenderer, parseLkpdQuestion, type LkpdItem } from '@/components/lkpd/LkpdRenderer';

interface CetakLkpdClientProps {
  data: TeachingDeskData;
}

export function CetakLkpdClient({ data }: CetakLkpdClientProps) {
  const { lesson, module: mod, classRecord } = data;
  const [level, setLevel] = useState<'DASAR' | 'LANJUTAN'>('DASAR');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(true);

  const meaningfulGuide = lesson.meaningful_guide as unknown as PedagogicLessonGuide['meaningful'] | null;
  const worksheetPrintReady: WorksheetPrintReady | undefined = meaningfulGuide?.worksheet_print_ready;

  // Judul dan Instruksi Dinamis dari database
  const lkpdTitle = worksheetPrintReady?.title || `LKPD: ${lesson.title.toUpperCase()}`;
  const lkpdInstructions =
    worksheetPrintReady?.instructions ||
    (level === 'DASAR'
      ? 'Kerjakan soal latihan dasar di bawah ini dengan teliti dan mandiri.'
      : 'Kerjakan soal tantangan penalaran logika di bawah ini dengan saksama.');

  // Daftar Soal Dinamis (mendukung objek LkpdItem terstruktur atau string)
  const questionsList: unknown[] =
    level === 'DASAR'
      ? worksheetPrintReady?.section_a_basic || []
      : worksheetPrintReady?.section_b_enrichment || [];

  const parsedQuestions: LkpdItem[] = questionsList.map((q, idx) => parseLkpdQuestion(q, idx));

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-6 sm:py-10">
      {/* ====================================================================
          1. SCREEN-ONLY TOP TOOLBAR (TIDAK TAMPIL SAAT PRINT)
         ==================================================================== */}
      <div className="max-w-4xl mx-auto px-4 mb-6 print:hidden">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/guru/pelajaran/${lesson.id}`}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                Lembar Kerja Peserta Didik (LKPD) A4
              </h1>
              <p className="text-xs text-slate-500">
                {mod.title} • {lesson.title}
              </p>
            </div>
          </div>

          {/* Level Toggle, Kunci Jawaban Toggle & Print Trigger */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Level Selector */}
            <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setLevel('DASAR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${level === 'DASAR'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Level 1: Dasar ({worksheetPrintReady?.section_a_basic?.length ?? 0} Soal)
              </button>
              <button
                type="button"
                onClick={() => setLevel('LANJUTAN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${level === 'LANJUTAN'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                Level 2: Pengayaan ({worksheetPrintReady?.section_b_enrichment?.length ?? 0} Soal)
              </button>
            </div>

            {/* Tombol Toggle Kunci Jawaban */}
            <button
              type="button"
              onClick={() => setShowAnswerKey((prev) => !prev)}
              className={`h-9 px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${showAnswerKey
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              title="Aktifkan/Nonaktifkan cetak Lembar Kunci Jawaban (Halaman 2)"
            >
              <KeyRound className={`w-3.5 h-3.5 ${showAnswerKey ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{showAnswerKey ? 'Kunci Jawaban Aktif' : 'Kunci Jawaban Disembunyikan'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Dokumen</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. A4 PRINT-READY WORKSHEET CONTAINER
             Layout 210mm x 297mm monokrom ramah tinta printer
         ==================================================================== */}
      <div className="max-w-[210mm] mx-auto bg-white p-8 sm:p-12 border border-slate-300 shadow-lg print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
        {/* CSS Khusus Print A4 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4 portrait;
              margin: 15mm 15mm 15mm 15mm;
            }
            @media print {
              body {
                background: #ffffff !important;
                color: #000000 !important;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `
        }} />

        {/* ====================================================================
            SEKSI 1: LEMBAR KERJA SISWA (SOAL + VISUAL + TEMPAT JAWABAN)
           ==================================================================== */}
        <section className="print:min-h-[280mm] flex flex-col justify-between">
          <div>
            {/* Kop Lembar Kerja Resmi Kurikulum Merdeka */}
            <div className="border-b-2 border-black pb-4 mb-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block">
                    KURIKULUM MERDEKA • FASE A (SD KELAS 1 &amp; 2)
                  </span>
                  <h2 className="text-xl font-black text-black tracking-tight">
                    {lkpdTitle}
                  </h2>
                  <p className="text-xs font-semibold text-slate-700">
                    Materi: <span className="font-bold">{lesson.title}</span> • {mod.title}
                  </p>
                </div>

                {/* Level Badge Monokrom */}
                <div className="border-2 border-black px-3 py-1.5 text-center min-w-[150px]">
                  <span className="text-[9px] font-black uppercase tracking-wider block">TINGKAT</span>
                  <span className="text-xs font-black">
                    {level === 'DASAR' ? 'LEVEL 1: DASAR (KONKRET)' : 'LEVEL 2: PENGAYAAN (LOGIKA)'}
                  </span>
                </div>
              </div>

              {/* Form Isian Siswa Monokrom */}
              <div className="grid grid-cols-3 gap-4 mt-5 pt-3 border-t border-slate-300 text-xs">
                <div>
                  <span className="text-slate-600 font-medium">Nama Siswa :</span>
                  <div className="border-b border-dotted border-black mt-3 w-full" />
                </div>
                <div>
                  <span className="text-slate-600 font-medium">Hari / Tanggal :</span>
                  <div className="border-b border-dotted border-black mt-3 w-full" />
                </div>
                <div>
                  <span className="text-slate-600 font-medium">Nilai / Paraf Guru :</span>
                  <div className="border-b border-dotted border-black mt-3 w-full" />
                </div>
              </div>
            </div>

            {/* Indikator Capaian & Tujuan Pembelajaran (TP) */}
            {lesson.learning_objectives && (
              <div className="border border-black p-3 mb-5 bg-slate-50/50 print:bg-transparent">
                <span className="text-[10px] font-black uppercase text-black block mb-0.5">
                  Tujuan Pembelajaran (TP):
                </span>
                <MarkdownContent
                  content={lesson.learning_objectives}
                  size="xs"
                  className="!text-slate-800"
                />
              </div>
            )}
            {/* Petunjuk Pengerjaan Dinamis */}
            <div className="mb-5 pb-2 border-b border-black">
              <span className="text-[10px] font-black uppercase text-black block mb-0.5">
                Petunjuk Pengerjaan:
              </span>
              <MarkdownContent
                content={lkpdInstructions}
                size="xs"
                className="!italic !text-slate-700"
              />
            </div>

            {/* ====================================================================
                3. ISI LEMBAR KERJA VISUAL PRINT-READY SESUAI TIPE SOAL
               ==================================================================== */}
            <div className="space-y-4 min-h-[420px]">
              {parsedQuestions.length > 0 ? (
                parsedQuestions.map((lkpdItem, index) => (
                  <LkpdItemRenderer
                    key={index}
                    item={lkpdItem}
                    index={index}
                  />
                ))
              ) : (
                <div className="border-2 border-dashed border-slate-300 p-8 text-center rounded-lg space-y-2">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">
                    Belum ada butir soal {level === 'DASAR' ? 'Level 1 (Dasar)' : 'Level 2 (Pengayaan)'} yang tersimpan di database.
                  </p>
                  <p className="text-xs text-slate-500">
                    Pastikan materi ini memiliki konfigurasi <code>meaningful_guide.worksheet_print_ready</code>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Lembar Kerja Ramah Tinta */}
          <div className="mt-8 pt-4 border-t border-black flex justify-between items-center text-[10px] text-slate-600">
            <span>Halaman 1 (Lembar Siswa) • Vokid LMS</span>
            <span>Kelas: {classRecord.name} • {mod.title}</span>
          </div>
        </section>

        {/* ====================================================================
            SEKSI 2: LEMBAR KUNCI JAWABAN & RUBRIK GURU
            Otomatis terpisah ke halaman A4 kedua via break-before-page
           ==================================================================== */}
        {showAnswerKey && (
          <section className="print:break-before-page break-before-page mt-12 print:mt-0 pt-8 print:pt-0 border-t-2 border-dashed border-slate-400 print:border-none print:min-h-[280mm] flex flex-col justify-between">
            <div>
              {/* Header Kunci Jawaban & Panduan Guru */}
              <div className="border-b-2 border-black pb-4 mb-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase block mb-1">
                      DOKUMEN PEGANGAN GURU &amp; ASESOR
                    </span>
                    <h2 className="text-xl font-black text-black tracking-tight flex items-center gap-2">
                      <KeyRound className="w-5 h-5 inline text-black print:hidden" />
                      KUNCI JAWABAN &amp; RUBRIK PENILAIAN
                    </h2>
                    <p className="text-xs font-semibold text-slate-700">
                      Materi: <span className="font-bold">{lesson.title}</span> • Tingkat: {level === 'DASAR' ? 'Level 1 (Dasar)' : 'Level 2 (Pengayaan)'}
                    </p>
                  </div>

                  <div className="border-2 border-black bg-slate-100 print:bg-transparent px-3 py-1.5 text-center min-w-[150px]">
                    <span className="text-[9px] font-black uppercase tracking-wider block">STATUS</span>
                    <span className="text-xs font-black">LEMBAR PENDIDIK</span>
                  </div>
                </div>
              </div>

              {/* Rubrik Penilaian Singkat Fase A */}
              <div className="border border-black p-3.5 mb-6 bg-slate-50/70 print:bg-transparent text-xs">
                <div className="flex items-center gap-1.5 font-black uppercase text-[10px] text-black mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Rubrik Penilaian Formatif Observasi Fase A:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-800">
                  <div className="p-2 border border-slate-300 rounded bg-white print:bg-transparent">
                    <span className="font-bold block text-slate-900 mb-0.5">● Perlu Bimbingan (0-60)</span>
                    <span>Siswa masih memerlukan manipulasi benda nyata penuh dan penghitungan ulang berkali-kali.</span>
                  </div>
                  <div className="p-2 border border-slate-300 rounded bg-white print:bg-transparent">
                    <span className="font-bold block text-slate-900 mb-0.5">● Berkembang (61-80)</span>
                    <span>Mampu memahami representasi visual bergambar namun kadang keliru saat menulis lambang angka.</span>
                  </div>
                  <div className="p-2 border border-slate-300 rounded bg-white print:bg-transparent">
                    <span className="font-bold block text-slate-900 mb-0.5">● Cakap &amp; Mandiri (81-100)</span>
                    <span>Menghitung cepat dengan subitizing/pasangan angka dan mampu menjelaskan penalarannya.</span>
                  </div>
                </div>
              </div>

              {/* Daftar Kunci Jawaban & Catatan Pedagogis per Butir Soal */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider border-b border-black pb-1">
                  Kunci Jawaban Soal ({level === 'DASAR' ? 'Level 1: Dasar' : 'Level 2: Pengayaan'}):
                </h3>

                {parsedQuestions.map((item, idx) => (
                  <div
                    key={item.id ?? idx}
                    className="p-3 border border-black rounded bg-slate-50/40 print:bg-transparent text-xs space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-slate-900">
                        Soal No. {idx + 1}: <span className="font-normal text-slate-700">{item.question}</span>
                      </div>
                      <span className="text-[9px] font-mono border border-black px-1.5 py-0.5 uppercase bg-white print:bg-transparent">
                        {item.type}
                      </span>
                    </div>

                    {/* Baris Kunci Jawaban */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-black text-black">Kunci Jawaban:</span>
                      <span className="font-bold text-black border-b-2 border-black px-1">
                        {item.answer_key ? item.answer_key : '(Jawaban eksplorasi siswa / guru memeriksa langsung)'}
                      </span>
                    </div>

                    {/* Penjelasan Pedagogis Jika Tersedia */}
                    {item.explanation && (
                      <div className="text-[11px] text-slate-600 italic bg-white/70 print:bg-transparent p-1.5 rounded border border-slate-200">
                        <span className="font-bold not-italic text-slate-700">Catatan Pedagogis: </span>
                        {item.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Lembar Kunci Jawaban */}
            <div className="mt-8 pt-4 border-t border-black flex justify-between items-center text-[10px] text-slate-600">
              <span>Halaman 2 (Pegangan Guru / Rubrik) • Vokid LMS</span>
              <span>Kelas: {classRecord.name} • {lesson.title}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
