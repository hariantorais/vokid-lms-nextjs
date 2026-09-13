'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import {
  Camera,
  Image as ImageIcon,
  RotateCcw,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { submitAssignmentAction } from '@/features/student/actions/submission.actions';
import type { Submission } from '@/types/database';

interface PhotoHomeworkSubmissionProps {
  assignmentId: string;
  onSuccess?: (submission: Submission) => void;
  disabled?: boolean;
}

type PhotoStatus = 'idle' | 'selected' | 'submitting' | 'submitted';

export function PhotoHomeworkSubmission({
  assignmentId,
  onSuccess,
  disabled = false,
}: PhotoHomeworkSubmissionProps) {
  const [status, setStatus] = useState<PhotoStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [studentNotes, setStudentNotes] = useState<string>('');

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate MIME type
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      setErrorMessage('Format gambar harus JPG atau PNG.');
      return;
    }

    // Validate size (max 15MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setErrorMessage('Ukuran foto maksimal 15MB.');
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setStatus('selected');
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    setStatus('idle');
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setErrorMessage('Silakan pilih atau ambil foto tugas terlebih dahulu.');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const fileExt = selectedFile.type === 'image/png' ? 'png' : 'jpeg';
        const fileName = `photo_${assignmentId}_${Date.now()}.${fileExt}`;

        const formData = new FormData();
        formData.append('file', selectedFile, fileName);
        formData.append('folder', 'submissions');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success || !uploadData.url) {
          throw new Error(
            uploadData.error ?? 'Gagal mengunggah foto tugas ke Cloudflare R2.'
          );
        }

        const r2PublicUrl: string = uploadData.url;

        // Call Server Action with public R2 URL
        const response = await submitAssignmentAction({
          assignmentId,
          fileUrl: r2PublicUrl,
          mimeType: selectedFile.type as 'image/jpeg' | 'image/png',
          studentNotes: studentNotes.trim() ? studentNotes.trim() : 'Foto Tugas Buku Siswa',
        });

        if (!response.success) {
          throw new Error(response.error);
        }

        setStatus('submitted');
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err: unknown) {
        console.error('[PhotoHomeworkSubmission] Submit error:', err);
        const msg =
          err instanceof Error ? err.message : 'Terjadi kegagalan saat mengirim foto tugas.';
        setErrorMessage(msg);
        setStatus('selected');
      }
    });
  };

  return (
    <div
      data-testid="photo-submission"
      className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3"
    >
      {/* Error Banner */}
      {errorMessage && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        data-testid="camera-input"
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        data-testid="gallery-input"
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* State 1: IDLE - Tombol Kamera & Galeri Cepat */}
      {status === 'idle' && (
        <div className="grid grid-cols-2 gap-2.5 py-1">
          <button
            data-testid="open-camera-btn"
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            disabled={disabled}
            className="h-12 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Camera className="w-4 h-4" />
            <span>Kamera 📸</span>
          </button>

          <button
            data-testid="open-gallery-btn"
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={disabled}
            className="h-12 rounded-xl border border-sky-300 bg-white hover:bg-sky-50 active:scale-95 text-sky-900 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <ImageIcon className="w-4 h-4 text-sky-600" />
            <span>Galeri Foto</span>
          </button>
        </div>
      )}

      {/* State 2: SELECTED - Preview Gambar & Tombol Kirim */}
      {status === 'selected' && previewUrl && (
        <div className="space-y-4 py-2">
          <div className="relative rounded-2xl overflow-hidden border-2 border-sky-200 bg-slate-100 max-h-80 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-testid="image-preview"
              src={previewUrl}
              alt="Pratinjau Tugas Foto PR"
              className="w-full h-auto max-h-72 object-contain"
            />
          </div>

          <div>
            <label
              htmlFor="student-notes"
              className="block text-xs font-bold text-slate-700 mb-1"
            >
              Pesan untuk Ibu Guru (Opsional):
            </label>
            <input
              id="student-notes"
              type="text"
              maxLength={500}
              placeholder="Contoh: Halaman 12 nomor 1 sampai 5 selesai, Bu Guru!"
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              data-testid="reset-photo-btn"
              type="button"
              onClick={handleReset}
              className="min-h-[64px] w-full sm:w-1/3 px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 text-slate-500" />
              <span>Ganti Foto</span>
            </button>

            <button
              data-testid="submit-photo-btn"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="min-h-[64px] w-full sm:w-2/3 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black text-base flex items-center justify-center gap-3 shadow-md shadow-sky-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Mengirim Foto...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Kirim Foto PR 🚀</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* State 3: SUBMITTING */}
      {status === 'submitting' && (
        <div className="min-h-[80px] flex flex-col items-center justify-center py-4 space-y-2">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
          <p className="text-sm font-bold text-slate-700">
            Sedang mengunggah foto tugasmu ke Ibu Guru...
          </p>
        </div>
      )}

      {/* State 4: SUBMITTED */}
      {status === 'submitted' && (
        <div className="min-h-[72px] p-4 bg-emerald-50 border-2 border-emerald-300 rounded-3xl flex items-center justify-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <p className="font-black text-base">Hore! Foto Tugas Berhasil Dikirim! 🎉</p>
            <p className="text-xs font-bold text-emerald-700">
              Ibu Guru akan segera memeriksa hasil kerjamu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
