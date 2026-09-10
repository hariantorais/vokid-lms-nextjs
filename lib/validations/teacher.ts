import { z } from 'zod';

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

/**
 * Validasi skema pembuatan materi/pelajaran (Lesson) oleh Guru
 */
export const createLessonSchema = z
  .object({
    moduleId: z
      .string({ message: 'Modul ID wajib diisi' })
      .regex(uuidRegex, { message: 'Modul ID harus berupa UUID yang valid' }),
    title: z
      .string({ message: 'Judul materi wajib diisi' })
      .trim()
      .min(3, { message: 'Judul materi minimal 3 karakter' })
      .max(255, { message: 'Judul materi maksimal 255 karakter' }),
    contentType: z.enum(['TEXT', 'VIDEO', 'PDF', 'AUDIO'], {
      message: "Tipe materi harus berupa 'TEXT', 'VIDEO', 'PDF', atau 'AUDIO'",
    }),
    contentUrl: z
      .string()
      .trim()
      .nullable()
      .optional()
      .or(z.literal(''))
      .transform((val) => (val && val.length > 0 ? val : null)),
    contentText: z
      .string()
      .trim()
      .nullable()
      .optional()
      .or(z.literal(''))
      .transform((val) => (val && val.length > 0 ? val : null)),
    orderIndex: z.coerce
      .number({ message: 'Urutan materi harus berupa angka' })
      .int({ message: 'Urutan materi harus berupa bilangan bulat' })
      .nonnegative({ message: 'Urutan materi tidak boleh negatif' })
      .default(0),
  })
  .refine(
    (data) => {
      if (data.contentType === 'TEXT') {
        return Boolean(data.contentText && data.contentText.length > 0);
      }
      return true;
    },
    {
      message: 'Teks materi/cerita bacaan wajib diisi untuk format TEXT',
      path: ['contentText'],
    }
  )
  .refine(
    (data) => {
      if (data.contentType !== 'TEXT') {
        if (!data.contentUrl) return false;
        try {
          const parsed = new URL(data.contentUrl);
          return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
          return false;
        }
      }
      return true;
    },
    {
      message: 'URL konten harus berupa tautan URL yang valid',
      path: ['contentUrl'],
    }
  );

export type CreateLessonInput = z.infer<typeof createLessonSchema>;

/**
 * Validasi skema pembuatan penugasan (Assignment) oleh Guru
 */
export const createAssignmentSchema = z.object({
  lessonId: z
    .string({ message: 'Lesson ID wajib diisi' })
    .regex(uuidRegex, { message: 'Lesson ID harus berupa UUID yang valid' }),
  type: z.enum(['VOICE_TASK', 'PHOTO_HOMEWORK'], {
    message: "Tipe tugas harus berupa 'VOICE_TASK' atau 'PHOTO_HOMEWORK'",
  }),
  prompt: z
    .string({ message: 'Instruksi tugas wajib diisi' })
    .trim()
    .min(5, { message: 'Instruksi tugas minimal 5 karakter' }),
  instructionAudioUrl: z
    .string()
    .trim()
    .url({ message: 'URL audio panduan harus berupa tautan URL yang valid' })
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : null)),
  dueDate: z
    .string()
    .trim()
    .datetime({ message: 'Format batas waktu pengumpulan harus berupa format tanggal ISO valid' })
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : null)),
});

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;

/**
 * Validasi skema pembuatan modul pembelajaran oleh Guru
 */
export const createModuleSchema = z.object({
  subjectId: z
    .string({ message: 'Subject ID wajib diisi' })
    .regex(uuidRegex, { message: 'Subject ID harus berupa UUID yang valid' }),
  title: z
    .string({ message: 'Judul modul wajib diisi' })
    .trim()
    .min(3, { message: 'Judul modul minimal 3 karakter' })
    .max(255, { message: 'Judul modul maksimal 255 karakter' }),
  orderIndex: z.coerce
    .number({ message: 'Urutan modul harus berupa angka' })
    .int({ message: 'Urutan modul harus berupa bilangan bulat' })
    .nonnegative({ message: 'Urutan modul tidak boleh negatif' })
    .default(0),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;

/**
 * Validasi skema pembaruan modul pembelajaran oleh Guru
 */
export const updateModuleSchema = z.object({
  moduleId: z
    .string({ message: 'Module ID wajib diisi' })
    .regex(uuidRegex, { message: 'Module ID harus berupa UUID yang valid' }),
  title: z
    .string({ message: 'Judul modul wajib diisi' })
    .trim()
    .min(3, { message: 'Judul modul minimal 3 karakter' })
    .max(255, { message: 'Judul modul maksimal 255 karakter' }),
  orderIndex: z.coerce
    .number({ message: 'Urutan modul harus berupa angka' })
    .int({ message: 'Urutan modul harus berupa bilangan bulat' })
    .nonnegative({ message: 'Urutan modul tidak boleh negatif' })
    .optional(),
  isPublished: z.boolean().optional(),
});

export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;

/**
 * Validasi skema pembaruan penugasan (Assignment) oleh Guru
 */
export const updateAssignmentSchema = z.object({
  assignmentId: z
    .string({ message: 'Assignment ID wajib diisi' })
    .regex(uuidRegex, { message: 'Assignment ID harus berupa UUID yang valid' }),
  type: z
    .enum(['VOICE_TASK', 'PHOTO_HOMEWORK'], {
      message: "Tipe tugas harus berupa 'VOICE_TASK' atau 'PHOTO_HOMEWORK'",
    })
    .optional(),
  prompt: z
    .string({ message: 'Instruksi tugas wajib diisi' })
    .trim()
    .min(5, { message: 'Instruksi tugas minimal 5 karakter' })
    .optional(),
  instructionAudioUrl: z
    .string()
    .trim()
    .url({ message: 'URL audio panduan harus berupa tautan URL yang valid' })
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : null)),
  dueDate: z
    .string()
    .trim()
    .datetime({ message: 'Format batas waktu pengumpulan harus berupa format tanggal ISO valid' })
    .nullable()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : null)),
});

export type UpdateAssignmentInput = z.infer<typeof updateAssignmentSchema>;
