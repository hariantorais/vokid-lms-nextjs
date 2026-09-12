import { z } from 'zod';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

// Schema untuk Micro-Assessment Formatif Cepat Guru
export const evaluateCompetencySchema = z.object({
  studentId: z
    .string({ message: 'ID Siswa wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Siswa harus berupa format UUID yang valid' }),
  lessonId: z
    .string({ message: 'ID Pelajaran wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Pelajaran harus berupa format UUID yang valid' }),
  tpIndicatorText: z
    .string({ message: 'Indikator Tujuan Pembelajaran wajib diisi' })
    .min(3, { message: 'Indikator TP minimal 3 karakter' })
    .max(500, { message: 'Indikator TP maksimal 500 karakter' }),
  masteryLevel: z.enum(['NEEDS_HELP', 'DEVELOPING', 'PROFICIENT'], {
    message: 'Tingkat penguasaan harus bernilai NEEDS_HELP, DEVELOPING, atau PROFICIENT',
  }),
  notes: z
    .string()
    .max(500, { message: 'Catatan evaluasi maksimal 500 karakter' })
    .optional()
    .nullable(),
});

export type EvaluateCompetencyInput = z.infer<typeof evaluateCompetencySchema>;

// Schema untuk Penjadwalan Harian Siswa
export const createDailyScheduleSchema = z.object({
  studentId: z
    .string({ message: 'ID Siswa wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Siswa harus berupa UUID valid' }),
  lessonId: z
    .string({ message: 'ID Pelajaran wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Pelajaran harus berupa UUID valid' }),
  scheduledDate: z
    .string({ message: 'Tanggal terjadwal wajib diisi' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' }),
  timeBlock: z.enum(['PAGI', 'SIANG', 'SORE'], {
    message: 'Blok waktu harus PAGI, SIANG, atau SORE',
  }),
});

export type CreateDailyScheduleInput = z.infer<typeof createDailyScheduleSchema>;

// Schema untuk Menyelesaikan Sesi Ajar (Meja Ajar)
export const completeLessonSessionSchema = z.object({
  lessonId: z
    .string({ message: 'ID Pelajaran wajib diisi' })
    .regex(UUID_REGEX, { message: 'ID Pelajaran harus berupa UUID valid' }),
  studentId: z
    .string()
    .regex(UUID_REGEX, { message: 'ID Siswa harus berupa UUID valid' })
    .optional()
    .nullable(),
  scheduledDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .nullable(),
});

export type CompleteLessonSessionInput = z.infer<typeof completeLessonSessionSchema>;
