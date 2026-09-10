/**
 * Vokid LMS - Storage & Media Types
 * Adheres to AGENT_RULES.md (Result Pattern, zero 'any')
 */

export type StorageBucket =
  | 'learning-materials'
  | 'audio-prompts'
  | 'homework-submissions';

export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface UploadResult {
  path: string;
  publicUrl?: string;
}

export interface FileValidationOptions {
  maxSizeBytes: number;
  allowedMimeTypes: readonly string[];
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}
