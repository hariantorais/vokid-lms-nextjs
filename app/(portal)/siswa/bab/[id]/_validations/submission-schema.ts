import { z } from 'zod';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const SUBMISSION_MIME_TYPES = [
  'audio/webm',
  'audio/mp4',
  'image/jpeg',
  'image/png',
] as const;

export type SubmissionMimeType = (typeof SUBMISSION_MIME_TYPES)[number];

export const submitAssignmentSchema = z.object({
  assignmentId: z
    .string({ message: 'ID Penugasan wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Penugasan harus berupa format UUID yang valid' }),
  fileUrl: z
    .string({ message: 'Tautan berkas tugas wajib disertakan' })
    .min(1, { message: 'Tautan berkas tugas tidak boleh kosong' }),
  mimeType: z.enum(SUBMISSION_MIME_TYPES, {
    message: 'Tipe berkas tidak didukung. Gunakan audio (webm, mp4) atau gambar (jpeg, png)',
  }),
  studentNotes: z
    .string({ message: 'Catatan siswa harus berupa teks' })
    .max(500, { message: 'Catatan siswa maksimal 500 karakter' })
    .optional()
    .nullable(),
});

export type SubmitAssignmentInput = z.infer<typeof submitAssignmentSchema>;
