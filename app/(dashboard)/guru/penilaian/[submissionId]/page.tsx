import React from 'react';
import { notFound } from 'next/navigation';
import {
  Clock,
  Volume2,
  FileImage,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { GradingForm } from '@/features/teacher/components/GradingForm';
import { SubmissionImageViewer } from '@/features/teacher/components/SubmissionImageViewer';
import { TeacherLayoutShell } from '@/features/teacher/components/TeacherLayoutShell';
import { getMediaProxyUrl } from '@/features/shared/services/storage-service';

export const dynamic = 'force-dynamic';

interface TeacherGradingPageProps {
  params: Promise<{
    submissionId: string;
  }>;
}

export default async function TeacherGradingPage({ params }: TeacherGradingPageProps) {
  const { submissionId } = await params;

  const supabase = await createClient();

  const { data: subData } = await supabase
    .from('submissions')
    .select(`
      *,
      profiles (
        id,
        full_name,
        role,
        avatar_url
      ),
      assignments (
        id,
        type,
        prompt,
        instruction_audio_url,
        due_date,
        lessons (
          id,
          title,
          modules (
            id,
            title,
            subjects (
              id,
              name,
              code
            )
          )
        )
      )
    `)
    .eq('id', submissionId)
    .maybeSingle();

  if (!subData) {
    notFound();
  }

  const submission = subData;

  const studentName = submission.profiles?.full_name ?? 'Siswa Vokid';
  const assignment = submission.assignments;
  const lesson = assignment?.lessons;
  const modul = lesson?.modules;
  const subject = modul?.subjects;

  const isAudioSubmission =
    assignment?.type === 'VOICE_TASK' ||
    submission.file_url.endsWith('.webm') ||
    submission.file_url.endsWith('.mp3') ||
    submission.file_url.endsWith('.mp4');

  // Melewatkan file melalui proxy internal bila bucket masih private
  const resolvedMediaUrl = getMediaProxyUrl(submission.file_url);

  const formattedDate = new Date(submission.submitted_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TeacherLayoutShell
      title="Penilaian Tugas"
      subtitle={`${studentName} • ${subject?.name ?? 'Mata Pelajaran'}`}
      badgeText={assignment?.type === 'VOICE_TASK' ? 'Voice Task' : 'Photo Homework'}
      badgeVariant={assignment?.type === 'VOICE_TASK' ? 'purple' : 'sky'}
      backHref="/guru"
      maxWidth="md"
      activeNavTab="HOME"
      headerAction={
        <div className="h-10 flex items-center gap-1.5 px-3 rounded-2xl bg-slate-100 text-xs font-bold text-slate-500 border border-slate-200/80">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
        </div>
      }
    >
      {/* Info Header Tugas & Siswa */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
              {subject?.name ?? 'Mata Pelajaran SD'}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{modul?.title ?? 'Modul Pembelajaran'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lesson?.title ?? 'Tugas Siswa'}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Instruksi: {assignment?.prompt}
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 font-black flex items-center justify-center text-lg shadow-inner">
            👦
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Pengirim Tugas</p>
            <p className="text-sm font-black text-slate-900">{studentName}</p>
          </div>
        </div>
      </section>

      {/* Berkas Penyerahan Tugas Siswa */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            {isAudioSubmission ? (
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Volume2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <FileImage className="w-4 h-4" />
              </div>
            )}
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
              {isAudioSubmission ? 'Rekaman Suara Siswa' : 'Foto Pengerjaan Buku Tugas Siswa'}
            </h3>
          </div>

          <a
            href={resolvedMediaUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            Buka Berkas Asli ↗
          </a>
        </div>

        {isAudioSubmission ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-purple-900">
                Dengarkan jawaban suara siswa:
              </p>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                Audio Rekaman
              </span>
            </div>

            {/* Pasang src langsung di tag <audio> dengan crossOrigin anonymous */}
            <audio
              data-testid="student-audio-work"
              controls
              preload="metadata"
              crossOrigin="anonymous"
              src={resolvedMediaUrl}
              className="w-full h-11 rounded-xl"
            >
              Browser kamu tidak mendukung pemutar audio langsung.
            </audio>
          </div>
        ) : (
          <SubmissionImageViewer
            src={resolvedMediaUrl}
            alt={`Pengerjaan Tugas Siswa - ${studentName}`}
          />
        )}
      </section>

      {/* Formulir Penilaian & Umpan Balik Guru */}
      <GradingForm
        submissionId={submission.id}
        initialGrade={submission.grade ?? submission.score}
        initialFeedbackText={submission.teacher_feedback_text ?? submission.teacher_feedback}
        initialFeedbackAudioUrl={submission.teacher_feedback_audio_url}
        status={submission.status}
      />
    </TeacherLayoutShell>
  );
}