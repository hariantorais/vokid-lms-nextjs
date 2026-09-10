import type { FileValidationResult, StorageBucket } from '../types/storage';

export const STORAGE_LIMITS = {
  AUDIO_PROMPTS: {
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'audio/ogg',
      'audio/wav',
    ] as const,
  },
  HOMEWORK_SUBMISSIONS: {
    maxSizeBytes: 15 * 1024 * 1024, // 15MB
    allowedMimeTypes: [
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'image/jpeg',
      'image/png',
      'image/webp',
    ] as const,
  },
  LEARNING_MATERIALS: {
    maxSizeBytes: 20 * 1024 * 1024, // 20MB
    allowedMimeTypes: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'video/mp4',
    ] as const,
  },
} as const;

export interface FileMetadata {
  size: number;
  type: string;
  name?: string;
}

/**
 * Memvalidasi berkas rekaman suara atau audio petunjuk guru
 */
export function validateAudioFile(file: FileMetadata): FileValidationResult {
  const { maxSizeBytes, allowedMimeTypes } = STORAGE_LIMITS.AUDIO_PROMPTS;

  if (!allowedMimeTypes.includes(file.type as (typeof allowedMimeTypes)[number])) {
    return {
      valid: false,
      error: `Format berkas audio tidak didukung (${file.type}). Gunakan format WebM, MP3, atau MP4 audio.`,
    };
  }

  if (file.size > maxSizeBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Ukuran berkas audio (${sizeMB}MB) melebihi batas maksimum 10MB.`,
    };
  }

  return { valid: true };
}

/**
 * Memvalidasi berkas tugas siswa (foto buku atau rekaman suara)
 */
export function validateHomeworkFile(file: FileMetadata): FileValidationResult {
  const { maxSizeBytes, allowedMimeTypes } = STORAGE_LIMITS.HOMEWORK_SUBMISSIONS;

  if (!allowedMimeTypes.includes(file.type as (typeof allowedMimeTypes)[number])) {
    return {
      valid: false,
      error: `Format berkas tugas tidak didukung (${file.type}). Gunakan format gambar (JPEG, PNG, WebP) atau audio (WebM, MP3).`,
    };
  }

  if (file.size > maxSizeBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Ukuran berkas tugas (${sizeMB}MB) melebihi batas maksimum 15MB.`,
    };
  }

  return { valid: true };
}

/**
 * Memvalidasi materi pembelajaran guru (PDF, gambar, video)
 */
export function validateMaterialFile(file: FileMetadata): FileValidationResult {
  const { maxSizeBytes, allowedMimeTypes } = STORAGE_LIMITS.LEARNING_MATERIALS;

  if (!allowedMimeTypes.includes(file.type as (typeof allowedMimeTypes)[number])) {
    return {
      valid: false,
      error: `Format materi pembelajaran tidak didukung (${file.type}). Gunakan PDF, Gambar (JPEG, PNG), atau Video MP4.`,
    };
  }

  if (file.size > maxSizeBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Ukuran berkas materi (${sizeMB}MB) melebihi batas maksimum 20MB.`,
    };
  }

  return { valid: true };
}

/**
 * Menghasilkan path penyimpanan yang unik dan aman untuk mencegah penimpaan file (collision-free)
 * Format path: [userId]/[subfolder]/[timestamp]_[entropy]_[sanitizedFilename]
 */
export function generateStoragePath(
  userId: string,
  subfolder: string,
  originalFilename: string
): string {
  const sanitizedUserId = userId.trim();
  const sanitizedSubfolder = subfolder.replace(/[^a-zA-Z0-9_-]/g, '_');

  const extension = originalFilename.includes('.')
    ? originalFilename.split('.').pop()?.toLowerCase() ?? 'bin'
    : 'bin';

  const baseName = originalFilename
    .substring(0, originalFilename.lastIndexOf('.') !== -1 ? originalFilename.lastIndexOf('.') : undefined)
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 50);

  const timestamp = Date.now();
  const randomEntropy = Math.random().toString(36).substring(2, 8);

  return `${sanitizedUserId}/${sanitizedSubfolder}/${timestamp}_${randomEntropy}_${baseName}.${extension}`;
}
