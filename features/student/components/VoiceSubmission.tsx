'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import {
  Mic,
  Square,
  RotateCcw,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Volume2,
} from 'lucide-react';
import { submitAssignmentAction } from '../actions/submission-actions';
import type { Submission } from '@/types/database';

export type VoiceSubmissionStatus =
  | 'IDLE'
  | 'RECORDING'
  | 'RECORDED'
  | 'UPLOADING'
  | 'SUCCESS';

interface VoiceSubmissionProps {
  assignmentId: string;
  onSuccess?: (submission: Submission) => void;
  disabled?: boolean;
}

export function VoiceSubmission({
  assignmentId,
  onSuccess,
  disabled = false,
}: VoiceSubmissionProps) {
  // 1. Lifecycle State Machine
  const [status, setStatus] = useState<VoiceSubmissionStatus>('IDLE');
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<'audio/webm' | 'audio/mp4'>('audio/webm');

  // References for MediaRecorder & Timers
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [, startTransition] = useTransition();

  // Helper cleanup functions
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
      stopTracks();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // 3. Logika Timer
  useEffect(() => {
    if (status === 'RECORDING') {
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
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

  // 2. Logika Merekam Nyata (MediaRecorder API)
  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    try {
      if (
        typeof window === 'undefined' ||
        !navigator?.mediaDevices?.getUserMedia
      ) {
        throw new Error('Perangkat mikrofon tidak didukung di browser ini.');
      }

      // Meminta izin mikrofon nyata
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Deteksi format audio yang didukung
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
        const combinedBlob = new Blob(audioChunksRef.current, { type: selectedMime });
        setAudioBlob(combinedBlob);
        const objectUrl = URL.createObjectURL(combinedBlob);
        setAudioUrl(objectUrl);
        setStatus('RECORDED');
        stopTracks();
      };

      recorder.start(200); // Kumpulkan potongan tiap 200ms
      setStatus('RECORDING');
    } catch (err: unknown) {
      console.error('[VoiceSubmission] getUserMedia/MediaRecorder error:', err);
      const msg =
        err instanceof Error
          ? err.message
          : 'Akses mikrofon ditolak atau mikrofon tidak terdeteksi. Silakan berikan izin mikrofon di browsermu.';
      setErrorMessage(msg);
      setStatus('IDLE');
      stopTracks();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'RECORDING') {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error('[VoiceSubmission] Error stopping recorder:', err);
      }
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingDuration(0);
    setErrorMessage(null);
    setStatus('IDLE');
  };

  // 5. Integrasi Server & Storage
  const handleUploadAndSubmit = () => {
    if (!audioBlob) {
      setErrorMessage('Berkas rekaman suara tidak ditemukan.');
      return;
    }

    setStatus('UPLOADING');
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const fileExt = mimeType === 'audio/webm' ? 'webm' : 'mp4';
        const fileName = `voice_${assignmentId}_${Date.now()}.${fileExt}`;

        const formData = new FormData();
        formData.append('file', audioBlob, fileName);
        formData.append('folder', 'submissions');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
          throw new Error(
            uploadData.error ?? 'Gagal mengunggah rekaman suara ke Cloudflare R2.'
          );
        }

        const r2PublicUrl: string = uploadData.url;

        // Panggil Server Action submitAssignmentAction dengan URL publik R2
        const response = await submitAssignmentAction({
          assignmentId,
          fileUrl: r2PublicUrl,
          mimeType,
          studentNotes: 'Rekaman Suara Tugas Siswa',
        });

        if (!response.success) {
          throw new Error(response.error);
        }

        setStatus('SUCCESS');
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err: unknown) {
        console.error('[VoiceSubmission] Upload error:', err);
        const msg =
          err instanceof Error
            ? err.message
            : 'Terjadi kegagalan saat proses pengiriman tugas suara.';
        setErrorMessage(msg);
        setStatus('RECORDED');
      }
    });
  };

  return (
    <div
      data-testid="voice-submission"
      className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-orange-200 shadow-sm space-y-4"
    >
      {/* Header Interaktif */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-base shadow-xs">
            🎤
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
              Kirim Tugas Suara
            </h4>
            <p className="text-[11px] font-semibold text-slate-500">
              Format audio: {mimeType}
            </p>
          </div>
        </div>

        {status === 'RECORDING' && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-rose-100 border border-rose-300 text-rose-700 rounded-full font-black text-xs animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <span>Sedang merekam... {formatDuration(recordingDuration)}</span>
          </div>
        )}
      </div>

      {/* Pesan Error */}
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 4. Tampilan Antarmuka */}
      {/* A. Status: 'IDLE' */}
      {status === 'IDLE' && (
        <div className="flex flex-col items-center justify-center py-3 space-y-3">
          <button
            data-testid="record-btn"
            type="button"
            onClick={startRecording}
            disabled={disabled}
            className="min-h-[64px] min-w-[64px] w-full sm:w-auto px-8 py-4 rounded-3xl bg-linear-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:to-orange-600 active:scale-95 text-white font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-orange-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span>Mulai Rekam Suara</span>
          </button>
          <p className="text-xs font-bold text-slate-500 text-center">
            Sentuh tombol di atas dan mulailah berbicara dengan jelas.
          </p>
        </div>
      )}

      {/* B. Status: 'RECORDING' */}
      {status === 'RECORDING' && (
        <div className="flex flex-col items-center justify-center py-3 space-y-4">
          <div className="flex items-center gap-1.5 h-8">
            <span className="w-2 bg-rose-500 rounded-full animate-[bounce_0.6s_infinite_100ms] h-6" />
            <span className="w-2 bg-orange-500 rounded-full animate-[bounce_0.6s_infinite_200ms] h-8" />
            <span className="w-2 bg-amber-500 rounded-full animate-[bounce_0.6s_infinite_300ms] h-5" />
            <span className="w-2 bg-rose-500 rounded-full animate-[bounce_0.6s_infinite_150ms] h-7" />
            <span className="w-2 bg-orange-500 rounded-full animate-[bounce_0.6s_infinite_250ms] h-4" />
          </div>

          <button
            data-testid="stop-record-btn"
            type="button"
            onClick={stopRecording}
            className="min-h-[64px] min-w-[64px] w-full sm:w-auto px-8 py-4 rounded-3xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-base flex items-center justify-center gap-3 shadow-lg shadow-rose-200 transition-all cursor-pointer"
          >
            <Square className="w-6 h-6 fill-white" />
            <span>Selesai Merekam</span>
          </button>
        </div>
      )}

      {/* C. Status: 'RECORDED' */}
      {status === 'RECORDED' && audioUrl && (
        <div className="space-y-4 py-2">
          <div className="p-3.5 bg-orange-50/80 rounded-2xl border border-orange-200 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-orange-950">
              <Volume2 className="w-4 h-4 text-orange-600" />
              <span>Dengarkan Ulang Rekamanmu:</span>
            </div>
            {/* Pratinjau Audio HTML5 Nyata */}
            <audio
              data-testid="audio-preview"
              src={audioUrl}
              controls
              className="w-full h-11 rounded-xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              data-testid="rerecord-btn"
              type="button"
              onClick={resetRecording}
              className="min-h-[64px] min-w-[64px] w-full sm:w-1/3 px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 text-slate-500" />
              <span>Rekam Ulang</span>
            </button>

            <button
              data-testid="submit-voice-btn"
              type="button"
              onClick={handleUploadAndSubmit}
              className="min-h-[64px] min-w-[64px] w-full sm:w-2/3 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-base flex items-center justify-center gap-3 shadow-md shadow-emerald-200 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Kirim Tugas Suara</span>
            </button>
          </div>
        </div>
      )}

      {/* D. Status: 'UPLOADING' */}
      {status === 'UPLOADING' && (
        <div className="min-h-[80px] flex flex-col items-center justify-center py-4 space-y-3">
          <button
            disabled
            className="min-h-[64px] w-full px-6 py-3 rounded-2xl bg-slate-200 text-slate-500 font-black text-base flex items-center justify-center gap-3 cursor-not-allowed"
          >
            <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
            <span>Mengirim tugas...</span>
          </button>
          <p className="text-xs font-bold text-slate-500">
            Sedang mengunggah suaramu ke Ibu Guru, tunggu sebentar ya...
          </p>
        </div>
      )}

      {/* E. Status: 'SUCCESS' */}
      {status === 'SUCCESS' && (
        <div className="min-h-[72px] p-5 bg-emerald-50 border-2 border-emerald-300 rounded-3xl flex items-center gap-3 text-emerald-900">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <p className="font-black text-base">
              Tugas suara berhasil dikirim! Menunggu dinilai guru.
            </p>
            <p className="text-xs font-bold text-emerald-700">
              Hebat sekali! Kamu sudah menyelesaikan tugas rekaman suara ini.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
