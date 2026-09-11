'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Video,
  FileText,
  Volume2,
  Target,
  Plus,
  ListChecks,
  Mic,
  Camera,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { formatModuleTitle } from '@/lib/formatters';
import { getMediaProxyUrl } from '@/features/shared/services/storage-service';
import { getVideoEmbedUrl } from '@/features/teacher/utils/media-embed';
import type { SubjectOption, ModuleWithLessonsAndAssignments } from '@/features/teacher/types/curriculum';
import type { Lesson, Assignment, Submission } from '@/types/database';

export type LessonWithAssignments = ModuleWithLessonsAndAssignments['lessons'][number];

interface LessonDetailViewProps {
  activeLesson: LessonWithAssignments;
  activeModule: ModuleWithLessonsAndAssignments;
  activeSubject: SubjectOption | null | undefined;
  onBackToModule: () => void;
  onOpenEditLesson: (lesson: Lesson) => void;
  onOpenCreateAssignment: () => void;
  onDeleteAssignment: (id: string) => void;
}

export function LessonDetailView({
  activeLesson,
  activeModule,
  activeSubject,
  onOpenEditLesson,
  onOpenCreateAssignment,
  onDeleteAssignment,
}: LessonDetailViewProps) {
  const assignments: Assignment[] = activeLesson.assignments ?? [];

  return (
    <div className="space-y-4">
      {/* Level 4 & 5a: Unified Lesson Post Card */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
        {/* Top Post Header: Breadcrumb & Format Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider min-w-0">
            <span className="truncate max-w-[120px] sm:max-w-none">{activeSubject?.name}</span>
            <span>•</span>
            <span className="truncate max-w-[150px] sm:max-w-none">
              {formatModuleTitle(activeModule.order_index, activeModule.title)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                activeLesson.content_type === 'VIDEO'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  : activeLesson.content_type === 'PDF'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                    : activeLesson.content_type === 'AUDIO'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200/60'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              }`}
            >
              {activeLesson.content_type === 'VIDEO' ? (
                <Video className="w-3 h-3" />
              ) : activeLesson.content_type === 'PDF' ? (
                <FileText className="w-3 h-3" />
              ) : activeLesson.content_type === 'AUDIO' ? (
                <Volume2 className="w-3 h-3" />
              ) : (
                <BookOpen className="w-3 h-3" />
              )}
              <span>
                {activeLesson.content_type === 'VIDEO'
                  ? 'Video'
                  : activeLesson.content_type === 'PDF'
                    ? 'PDF'
                    : activeLesson.content_type === 'AUDIO'
                      ? 'Audio'
                      : 'Teks'}
              </span>
            </span>
          </div>
        </div>

        {/* Lesson Title */}
        <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {activeLesson.title}
        </h2>

        {/* Tujuan Pembelajaran yang Ingin Dicapai Siswa */}
        {activeLesson.learning_objectives ? (
          <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80 text-sky-950 space-y-1">
            <div className="flex items-center gap-1.5 text-sky-700 font-extrabold text-[11px] uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Tujuan Pembelajaran Siswa</span>
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-relaxed whitespace-pre-wrap pl-5">
              {activeLesson.learning_objectives}
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400 font-medium text-[11px]">
              <Target className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Belum ada tujuan pembelajaran yang ditentukan.</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenEditLesson(activeLesson)}
              className="text-[11px] font-bold text-sky-600 hover:text-sky-700 underline cursor-pointer"
            >
              + Tambah Tujuan
            </button>
          </div>
        )}

        {/* Attached Media / Content Block */}
        {activeLesson.content_type === 'TEXT' ? (
          <div className="text-xs text-slate-800 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed whitespace-pre-wrap">
            {activeLesson.content_text ?? 'Belum ada isi teks modul.'}
          </div>
        ) : activeLesson.content_url ? (
          <div>
            {activeLesson.content_type === 'VIDEO' && (
              <div>
                {getVideoEmbedUrl(activeLesson.content_url) ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                    <iframe
                      src={getVideoEmbedUrl(activeLesson.content_url)!}
                      title={activeLesson.title}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-900 truncate">
                        {activeLesson.content_url}
                      </span>
                    </div>
                    <a
                      href={activeLesson.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-extrabold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg transition"
                    >
                      Buka Tautan
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeLesson.content_type === 'PDF' && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      Dokumen PDF Terlampir
                    </p>
                    <p className="text-[10px] text-slate-400">Siap dibaca siswa</p>
                  </div>
                </div>
                <a
                  href={getMediaProxyUrl(activeLesson.content_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition shrink-0"
                >
                  Buka Berkas
                </a>
              </div>
            )}

            {activeLesson.content_type === 'AUDIO' && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <audio
                  controls
                  src={getMediaProxyUrl(activeLesson.content_url)}
                  className="w-full h-10 rounded-lg"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Belum ada lampiran media/modul.</p>
        )}
      </div>

      {/* Level 5b: Daftar Tugas & Penilaian Siswa */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Tugas & Penilaian Siswa ({assignments.length})
          </h3>

          <button
            type="button"
            onClick={onOpenCreateAssignment}
            className="h-8 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Buat Tugas</span>
          </button>
        </div>

        {assignments.length === 0 ? (
          <div className="py-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center p-4 space-y-1">
            <p className="text-xs font-bold text-slate-700">Belum ada tugas untuk materi ini</p>
            <p className="text-[11px] text-slate-400">
              Klik tombol &quot;+ Buat Tugas&quot; untuk menambahkan tugas suara, foto PR, atau kuis CBT.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {assignments.map((asg) => {
              const submissions = (asg as unknown as { submissions?: Submission[] }).submissions ?? [];
              const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING');
              const gradedSubmissions = submissions.filter((s) => s.status === 'GRADED');

              return (
                <div
                  key={asg.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 ${
                        asg.type === 'QUIZ_CBT'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200/70'
                          : asg.type === 'VOICE_TASK'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200/70'
                            : 'bg-sky-50 text-sky-700 border border-sky-200/70'
                      }`}
                    >
                      {asg.type === 'QUIZ_CBT' ? (
                        <>
                          <ListChecks className="w-3 h-3" /> Kuis CBT
                        </>
                      ) : asg.type === 'VOICE_TASK' ? (
                        <>
                          <Mic className="w-3 h-3" /> Tugas Rekaman Suara
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3" /> Foto PR Buku Tulis
                        </>
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() => onDeleteAssignment(asg.id)}
                      className="text-[11px] font-bold text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>

                  <p className="text-xs font-bold text-slate-800 line-clamp-2">{asg.prompt}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    {asg.type === 'QUIZ_CBT' ? (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>KKM: {asg.passing_score ?? 75}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{gradedSubmissions.length} siswa selesai</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{pendingSubmissions.length} antrean</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{gradedSubmissions.length} dinilai</span>
                        </span>
                      </div>
                    )}

                    {asg.type !== 'QUIZ_CBT' &&
                      (pendingSubmissions.length > 0 ? (
                        <Link
                          href={`/guru/penilaian/${pendingSubmissions[0].id}`}
                          className="h-8 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                        >
                          <span>Buka Penilaian</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <Link
                          href="/guru"
                          className="font-bold text-slate-400 hover:text-slate-700 flex items-center gap-0.5"
                        >
                          <span>Lihat Antrean</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
