import { z } from 'zod';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const markLessonAsStudiedSchema = z.object({
    lessonId: z
        .string({ message: 'ID Materi wajib diisi' })
        .regex(UUID_REGEX, { message: 'ID Materi harus berupa format UUID yang valid' }),
});

export type MarkLessonAsStudiedInput = z.infer<typeof markLessonAsStudiedSchema>;