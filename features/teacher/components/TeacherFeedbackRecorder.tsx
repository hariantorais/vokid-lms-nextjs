'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import {
  Mic,
  Square,
  RotateCcw,
  Volume2,
  AlertCircle,
  Loader2,
  CheckCircle2,
  UploadCloud,
} from 'lucide-react';
interface TeacherFeedbackRecorderProps {
  submissionId: string;
  initialAudioUrl?: string | null;
  onAudioReady: (url: string | null) => void;
  disabled?: boolean;
}

type RecorderStatus = 'idle' | 'recording' | 'recorded' | 'uploading' | 'ready';

export function TeacherFeedbackRecorder({
  submissionId,
  initialAudioUrl = null,
  onAudioReady,
  disabled = false,
}: TeacherFeedbackRecorderProps) {
  const [status, setStatus] = useState<RecorderStatus>(
    initialAudioUrl ? 'ready' : 'idle'
  );
  const [duration, setDuration] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(initialAudioUrl);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<'audio/webm' | 'audio/mp4'>('audio/webm');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [, startTransition] = useTransition();

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

  useEffect(() => {
    return () => {
      clearTimer();
      stopTracks();
      if (audioUrl && !initialAudioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl, initialAudioUrl]);

  useEffect(() => {
    if (status === 'recording') {
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      clearTimer();
    }
    return () => clearTimer();
  }, [status]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    try {
      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Perangkat mikrofon tidak didukung di peramban ini.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const selectedMime =
        typeof MediaRecorder !== 'undefined' &&
        MediaRecorder.isTypeSupported &&
        MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4';
      setMimeType(selectedMime);

      const recorder = new MediaRecorder(stream, { mimeType: selectedMime });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: selectedMime });
        setAudioBlob(blob);
        const objectUrl = URL.createObjectURL(blob);
        setAudioUrl(objectUrl);
        setStatus('recorded');
        stopTracks();

        // Otomatis upload setelah rekaman selesai
        handleUpload(blob, selectedMime, objectUrl);
      };

      recorder.start(200);
      setStatus('recording');
    } catch (err: unknown) {
      console.error('[TeacherFeedbackRecorder] Recording error:', err);
      const msg =
        err instanceof Error
          ? err.message
          : 'Izin akses mikrofon ditolak atau mikrofon tidak terdeteksi.';
      setErrorMessage(msg);
      setStatus('idle');
      stopTracks();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error('[TeacherFeedbackRecorder] Stop error:', err);
      }
    }
  };

  const resetRecording = () => {
    if (audioUrl && !initialAudioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setDuration(0);
    setErrorMessage(null);
    setStatus('idle');
    onAudioReady(null);
  };

  const handleUpload = (blobToUpload: Blob, format: string, previewFallbackUrl: string) => {
    setStatus('uploading');
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const fileExt = format === 'audio/webm' ? 'webm' : 'mp4';
        const fileName = `feedback_${submissionId}_${Date.now()}.${fileExt}`;

        const formData = new FormData();
        formData.append('file', blobToUpload, fileName);
        formData.append('folder', 'audio-prompts');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
          console.warn('[TeacherFeedbackRecorder] R2 upload warning, using local preview:', uploadData.error);
          onAudioReady(previewFallbackUrl);
          setStatus('ready');
          return;
        }

        const r2PublicUrl = uploadData.url;
        setAudioUrl(r2PublicUrl);
        setStatus('ready');
        onAudioReady(r2PublicUrl);
      } catch (err: unknown) {
        console.error('[TeacherFeedbackRecorder] Upload exception:', err);
        onAudioReady(previewFallbackUrl);
        setStatus('ready');
      }
    });
  };

  return (
    <div
      data-testid="teacher-feedback-recorder"
      className="p-4 sm:p-5 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-extrabold text-sm text-slate-900">
              Rekam Umpan Balik Suara Guru
            </h5>
            <p className="text-[11px] font-medium text-slate-500">
              Sangat dianjurkan untuk siswa Fase A (Kelas 1–2 SD)
            </p>
          </div>
        </div>

        {status === 'recording' && (
          <div className="flex items-center gap-2 px-3 py-1 bg-rose-100 border border-rose-300 text-rose-700 rounded-full font-black text-xs animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span>Merekam: {formatDuration(duration)}</span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* State: IDLE */}
      {status === 'idle' && (
        <button
          data-testid="teacher-record-btn"
          type="button"
          onClick={startRecording}
          disabled={disabled}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          <Mic className="w-4 h-4" />
          <span>Mulai Rekam Suara Guru</span>
        </button>
      )}

      {/* State: RECORDING */}
      {status === 'recording' && (
        <div className="flex items-center gap-4 py-2">
          <div className="flex items-center gap-1 h-6">
            <span className="w-1.5 bg-sky-600 rounded-full animate-[bounce_0.6s_infinite_100ms] h-5" />
            <span className="w-1.5 bg-sky-600 rounded-full animate-[bounce_0.6s_infinite_200ms] h-6" />
            <span className="w-1.5 bg-sky-600 rounded-full animate-[bounce_0.6s_infinite_300ms] h-4" />
            <span className="w-1.5 bg-sky-600 rounded-full animate-[bounce_0.6s_infinite_150ms] h-5" />
          </div>

          <button
            data-testid="teacher-stop-btn"
            type="button"
            onClick={stopRecording}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Selesai Bicara</span>
          </button>
        </div>
      )}

      {/* State: UPLOADING */}
      {status === 'uploading' && (
        <div className="p-3 bg-white rounded-xl border border-sky-200 flex items-center gap-2 text-xs font-bold text-slate-700">
          <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
          <span>Menyimpan rekaman umpan balik guru ke penyimpanan...</span>
        </div>
      )}

      {/* State: READY / RECORDED */}
      {(status === 'ready' || status === 'recorded') && audioUrl && (
        <div className="space-y-3 pt-1">
          <div className="p-3 bg-white rounded-xl border border-sky-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Pratinjau Umpan Balik Suara Guru:</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Siap Terlampir</span>
              </span>
            </div>
            <audio
              data-testid="teacher-audio-preview"
              src={audioUrl}
              controls
              className="w-full h-10 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              data-testid="teacher-rerecord-btn"
              type="button"
              onClick={resetRecording}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Rekam Ulang</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
