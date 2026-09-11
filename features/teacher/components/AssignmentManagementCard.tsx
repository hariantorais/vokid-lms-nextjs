'use client';

import React, { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Award,
  Mic,
  Camera,
  Plus,
  Trash2,
  Calendar,
  Volume2,
  Square,
  RotateCcw,
  Loader2,
  BookOpen,
  X,
  FileCheck,
  Video,
  FileText,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { MobileConfirmDialog } from './MobileConfirmDialog';
import { createAssignmentAction } from '../actions/assignment-actions';
import { deleteAssignmentAction } from '../actions/teacher-actions';
import { deleteLessonAction } from '../actions/lesson-actions';
import type { Assignment, Lesson, Module } from '@/types/database';

export interface ModuleWithLessonsAndAssignments extends Module {
  lessons: Array<
    Lesson & {
      assignments: Assignment[];
    }
  >;
}

interface AssignmentManagementCardProps {
  modules: ModuleWithLessonsAndAssignments[];
  classId: string;
  gradeLevel: number;
}

export function AssignmentManagementCard({
  modules,
  classId,
  gradeLevel,
}: AssignmentManagementCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const allLessons = modules.flatMap((m) =>
    m.lessons.map((l) => ({
      id: l.id,
      title: l.title,
      moduleTitle: m.title,
    }))
  );

  const [selectedModuleId, setSelectedModuleId] = useState<string>('ALL');
  const [collapsedLessonIds, setCollapsedLessonIds] = useState<Record<string, boolean>>({});

  const toggleExpandLesson = (lessonId: string) => {
    setCollapsedLessonIds((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [targetLessonId, setTargetLessonId] = useState<string>(allLessons[0]?.id ?? '');
  const [taskType, setTaskType] = useState<'VOICE_TASK' | 'PHOTO_HOMEWORK'>(
    gradeLevel <= 2 ? 'VOICE_TASK' : 'PHOTO_HOMEWORK'
  );
  const [promptText, setPromptText] = useState('');
  const [dueDateStr, setDueDateStr] = useState('');

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  // Native Mobile Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isFaseA = gradeLevel <= 2;

  const displayedModules =
    selectedModuleId === 'ALL'
      ? modules
      : modules.filter((m) => m.id === selectedModuleId);

  const totalAssignments = modules.reduce(
    (acc, m) =>
      acc + m.lessons.reduce((lAcc, l) => lAcc + (l.assignments?.length ?? 0), 0),
    0
  );

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAudioRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: mime });
        const localUrl = URL.createObjectURL(blob);
        setAudioUrl(localUrl);
        setIsRecording(false);
        stopTracks();

        setIsUploadingAudio(true);
        try {
          const formData = new FormData();
          formData.append('file', blob, `inst_${Date.now()}.${mime === 'audio/webm' ? 'webm' : 'mp4'}`);
          formData.append('folder', 'audio-prompts');
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.success && data.url) setAudioUrl(data.url);
        } catch (e) {
          console.warn(e);
        } finally {
          setIsUploadingAudio(false);
        }
      };

      recorder.start(200);
      setIsRecording(true);
      setRecordDuration(0);
      timerRef.current = setInterval(() => setRecordDuration((p) => p + 1), 1000);
    } catch (err) {
      toast.error('Gagal mengakses mikrofon.');
      setIsRecording(false);
      stopTracks();
    }
  };

  const stopAudioRecording = () => {
    clearTimer();
    mediaRecorderRef.current?.stop();
  };

  const resetAudioRecording = () => {
    clearTimer();
    stopTracks();
    setAudioUrl(null);
    setIsRecording(false);
    setRecordDuration(0);
  };

  const handleOpenAdd = () => {
    setPromptText('');
    setDueDateStr('');
    setAudioUrl(null);
    if (allLessons[0]) setTargetLessonId(allLessons[0].id);
    setIsAddModalOpen(true);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLessonId || promptText.trim().length < 5) {
      toast.error('Lengkapi instruksi tugas (minimal 5 karakter).');
      return;
    }

    startTransition(async () => {
      const res = await createAssignmentAction({
        lessonId: targetLessonId,
        type: taskType,
        prompt: promptText.trim(),
        instructionAudioUrl: audioUrl,
        dueDate: dueDateStr ? new Date(dueDateStr).toISOString() : null,
      });

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success('Tugas berhasil diterbitkan!');
      setIsAddModalOpen(false);
      resetAudioRecording();
      router.refresh();
    });
  };

  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);

  const handleDeleteLesson = (lessonId: string, title: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Materi Pembelajaran?',
      description: `Apakah Anda yakin ingin menghapus materi "${title}"? Materi tidak dapat dihapus jika masih ada penugasan siswa.`,
      confirmLabel: 'Ya, Hapus Materi',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteLessonAction(lessonId);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Materi berhasil dihapus.');
          router.refresh();
        });
      },
    });
  };

  const handleDeleteAssignment = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Penugasan Siswa?',
      description: 'Apakah Anda yakin ingin menghapus penugasan ini? Tugas tidak dapat dihapus jika sudah ada siswa yang mengirim jawaban.',
      confirmLabel: 'Ya, Hapus Tugas',
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        startTransition(async () => {
          const res = await deleteAssignmentAction(id);
          if (!res.success) {
            toast.error(res.error);
            return;
          }
          toast.success('Tugas berhasil dihapus.');
          router.refresh();
        });
      },
    });
  };

  return (
    <div className="space-y-4 select-none">
      {/* Action Header & Filter Ringkas */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
            Materi Pembelajaran & Tugas
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            {allLessons.length} Materi • {totalAssignments} Tugas
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          disabled={isPending || allLessons.length === 0}
          className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-40 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>Tugas Baru</span>
        </button>
      </div>

      {/* Filter Modul Horizontal Minimalis */}
      {modules.length > 1 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedModuleId('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedModuleId === 'ALL'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Semua ({modules.length})
          </button>
          {modules.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedModuleId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedModuleId === m.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
      )}

      {/* Daftar Materi & Tugas (Clean Cards) */}
      {displayedModules.length === 0 || (totalAssignments === 0 && modules.length === 0) ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800">Belum ada materi atau tugas</p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Gunakan menu entri baru untuk menambahkan materi pembelajaran kurikulum.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedModules.map((mod) => {
            if (!mod.lessons || mod.lessons.length === 0) return null;

            return (
              <div key={mod.id} className="space-y-2">
                {/* Judul Bab/Modul Simple */}
                <div className="flex items-center gap-2 pt-1 px-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    {mod.title}
                  </span>
                </div>

                {/* Lesson Cards */}
                <div className="space-y-2">
                  {mod.lessons.map((les) => {
                    const isCollapsed = collapsedLessonIds[les.id];
                    const assignmentsCount = les.assignments?.length ?? 0;

                    return (
                      <div
                        key={les.id}
                        className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all hover:border-slate-300"
                      >
                        {/* Header Baris Materi */}
                        <div
                          onClick={() => toggleExpandLesson(les.id)}
                          className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {les.content_type === 'VIDEO' ? '🎬' : les.content_type === 'AUDIO' ? '🎧' : '📖'}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xs font-bold text-slate-900 leading-snug break-words">
                                {les.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                {assignmentsCount > 0 ? `${assignmentsCount} tugas terpasang` : 'Belum ada tugas'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => setPreviewLesson(les)}
                              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Lihat Konten"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLesson(les.id, les.title)}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Hapus Materi"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleExpandLesson(les.id)}
                              className="p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                              {isCollapsed ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronUp className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Dropdown / Accordion Body: Penugasan */}
                        {!isCollapsed && les.assignments && les.assignments.length > 0 && (
                          <div className="border-t border-slate-100 bg-slate-50/50 p-3 space-y-2">
                            {les.assignments.map((asg) => (
                              <div
                                key={asg.id}
                                className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 ${
                                      asg.type === 'VOICE_TASK'
                                        ? 'bg-purple-50 text-purple-700 border border-purple-200/70'
                                        : 'bg-sky-50 text-sky-700 border border-sky-200/70'
                                    }`}
                                  >
                                    {asg.type === 'VOICE_TASK' ? <Mic className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                                    <span>{asg.type === 'VOICE_TASK' ? 'Tugas Suara' : 'Foto PR'}</span>
                                  </span>

                                  <button
                                    type="button"
                                    data-testid={`delete-assignment-btn-${asg.id}`}
                                    onClick={() => handleDeleteAssignment(asg.id)}
                                    className="text-[11px] font-semibold text-rose-500 hover:text-rose-700 hover:underline cursor-pointer"
                                  >
                                    Hapus
                                  </button>
                                </div>

                                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                                  {asg.prompt}
                                </p>

                                {asg.instruction_audio_url && (
                                  <div className="pt-1">
                                    <audio
                                      controls
                                      src={asg.instruction_audio_url}
                                      className="w-full h-8 rounded-lg"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Drawer Buat Tugas Baru */}
      <MobileDrawer
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Buat Penugasan Baru"
      >
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Pilih Materi Terkait
            </label>
            <select
              value={targetLessonId}
              onChange={(e) => setTargetLessonId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            >
              {allLessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.moduleTitle} • {l.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tipe Tugas
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTaskType('VOICE_TASK')}
                className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  taskType === 'VOICE_TASK'
                    ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-purple-600" />
                  <span>Tugas Suara</span>
                </div>
                <span className="text-[10px] text-purple-600 font-normal mt-0.5 block">
                  Cocok untuk Fonik / Membaca
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTaskType('PHOTO_HOMEWORK')}
                className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                  taskType === 'PHOTO_HOMEWORK'
                    ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-sky-600" />
                  <span>Foto PR</span>
                </div>
                <span className="text-[10px] text-sky-600 font-normal mt-0.5 block">
                  Buku tugas / lembar kerja
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Instruksi Soal
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tuliskan petunjuk yang jelas untuk siswa..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || isUploadingAudio}
            className="w-full h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 transition-all"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Terbitkan Tugas'}
          </button>
        </form>
      </MobileDrawer>

      {/* Drawer Pratinjau Materi */}
      <MobileDrawer
        isOpen={Boolean(previewLesson)}
        onClose={() => setPreviewLesson(null)}
        title={previewLesson?.title ?? 'Pratinjau Materi'}
      >
        <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          {previewLesson?.content_text ?? previewLesson?.content_url ?? 'Tidak ada teks materi terlampir.'}
        </div>
      </MobileDrawer>

      {/* Native-style Mobile Confirm Dialog */}
      <MobileConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmLabel={confirmDialog.confirmLabel}
        isLoading={isPending}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}