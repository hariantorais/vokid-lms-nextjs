import { describe, it, expect } from 'vitest';
import { markLessonAsStudiedSchema } from '@/app/(portal)/siswa/bab/[id]/validations/lesson-learning-schema';

describe('markLessonAsStudiedSchema Validation', () => {
    it('berhasil memvalidasi input dengan format UUID yang benar', () => {
        const validUuid = '123e4567-e89b-12d3-a456-426614174000';
        const result = markLessonAsStudiedSchema.safeParse({ lessonId: validUuid });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.lessonId).toBe(validUuid);
        }
    });

    it('menolak input jika lessonId bukan UUID', () => {
        const result = markLessonAsStudiedSchema.safeParse({ lessonId: 'bukan-uuid-valid' });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain('UUID yang valid');
        }
    });

    it('menolak input jika lessonId tidak disediakan', () => {
        const result = markLessonAsStudiedSchema.safeParse({});

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain('ID Materi wajib diisi');
        }
    });
});