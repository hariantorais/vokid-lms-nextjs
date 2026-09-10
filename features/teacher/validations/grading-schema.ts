import { z } from 'zod';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const gradeSubmissionSchema = z.object({
  submissionId: z
    .string({ message: 'ID Tugas Siswa wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Penyerahan tugas harus berupa format UUID yang valid' }),
  grade: z
    .coerce
    .number({ message: 'Nilai harus berupa angka' })
    .min(0, { message: 'Nilai minimal adalah 0' })
    .max(100, { message: 'Nilai maksimal adalah 100' }),
  feedbackText: z
    .string({ message: 'Umpan balik teks harus berupa teks' })
    .max(1000, { message: 'Umpan balik teks maksimal 1000 karakter' })
    .optional()
    .nullable(),
  feedbackAudioUrl: z
    .string({ message: 'Tautan audio tidak valid' })
    .optional()
    .nullable(),
});

export type GradeSubmissionInput = z.infer<typeof gradeSubmissionSchema>;
