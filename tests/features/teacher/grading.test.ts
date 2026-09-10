import { describe, it, expect, vi, beforeEach } from 'vitest';
import { gradeSubmissionSchema } from '@/features/teacher/validations/grading-schema';
import { gradeSubmissionAction } from '@/features/teacher/actions/grading-actions';

// Mock Next.js cache revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock Supabase server client
const mockUpdate = vi.fn();
const mockSelect = vi.fn();
const mockSingle = vi.fn();
const mockEq = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockImplementation(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'teacher-123' } },
        error: null,
      }),
    },
    from: vi.fn((table: string) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: 'teacher-123', role: 'GURU' },
            error: null,
          }),
        };
      }
      if (table === 'submissions') {
        return {
          select: vi.fn().mockReturnThis(),
          update: vi.fn().mockImplementation((payload) => ({
            eq: vi.fn().mockImplementation((col, val) => ({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: { id: val },
                  error: null,
                }),
              }),
            })),
          })),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: {
              id: '11111111-1111-1111-1111-111111111111',
              assignment_id: 'asg-1',
              assignments: {
                id: 'asg-1',
                lessons: {
                  id: 'les-1',
                  modules: {
                    id: 'mod-1',
                    subjects: {
                      id: 'sub-1',
                      class_id: 'class-1',
                    },
                  },
                },
              },
            },
            error: null,
          }),
        };
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
      };
    }),
  })),
}));

describe('Fase 7: Teacher Grading & Audio Feedback Unit Testing', () => {
  const validSubmissionId = 'aaaaaaaa-1111-0000-0000-000000000001';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================
  // 1. Uji Skema Validasi Zod (grading-schema)
  // ==========================================
  describe('gradeSubmissionSchema Validation', () => {
    it('harus menerima payload penilaian yang valid', () => {
      const validPayload = {
        submissionId: validSubmissionId,
        grade: 95,
        feedbackText: 'Kerja bagus, lafal membaca sangat jelas!',
        feedbackAudioUrl: 'https://cdn.vokid.sch.id/audio/feedback-1.webm',
      };

      const result = gradeSubmissionSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.grade).toBe(95);
        expect(result.data.submissionId).toBe(validSubmissionId);
      }
    });

    it('harus menerima nilai 0 (batas minimal) dan 100 (batas maksimal)', () => {
      const payloadMin = { submissionId: validSubmissionId, grade: 0 };
      const payloadMax = { submissionId: validSubmissionId, grade: 100 };

      expect(gradeSubmissionSchema.safeParse(payloadMin).success).toBe(true);
      expect(gradeSubmissionSchema.safeParse(payloadMax).success).toBe(true);
    });

    it('harus melakukan koersi angka jika nilai dikirim sebagai string numerik', () => {
      const payloadCoerced = { submissionId: validSubmissionId, grade: '88' };
      const result = gradeSubmissionSchema.safeParse(payloadCoerced);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.grade).toBe(88);
      }
    });

    it('harus menolak jika nilai kurang dari 0', () => {
      const invalid = { submissionId: validSubmissionId, grade: -5 };
      const result = gradeSubmissionSchema.safeParse(invalid);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('minimal');
      }
    });

    it('harus menolak jika nilai lebih dari 100', () => {
      const invalid = { submissionId: validSubmissionId, grade: 105 };
      const result = gradeSubmissionSchema.safeParse(invalid);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('maksimal');
      }
    });

    it('harus menolak jika submissionId bukan format UUID yang valid', () => {
      const invalid = { submissionId: 'non-uuid-12345', grade: 90 };
      const result = gradeSubmissionSchema.safeParse(invalid);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('UUID');
      }
    });

    it('harus menolak jika feedbackText melebihi 1000 karakter', () => {
      const invalid = {
        submissionId: validSubmissionId,
        grade: 90,
        feedbackText: 'x'.repeat(1001),
      };
      const result = gradeSubmissionSchema.safeParse(invalid);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('1000 karakter');
      }
    });

    it('harus menerima feedbackText dan feedbackAudioUrl bernilai null atau tidak diisi', () => {
      const payload = {
        submissionId: validSubmissionId,
        grade: 80,
        feedbackText: null,
        feedbackAudioUrl: null,
      };

      const result = gradeSubmissionSchema.safeParse(payload);
      expect(result.success).toBe(true);
    });
  });

  // ==========================================
  // 2. Uji Server Action (gradeSubmissionAction)
  // ==========================================
  describe('gradeSubmissionAction Server Action', () => {
    it('harus sukses memperbarui nilai tugas dan status menjadi GRADED', async () => {
      const payload = {
        submissionId: validSubmissionId,
        grade: 92,
        feedbackText: 'Pengucapan suku kata sangat baik.',
        feedbackAudioUrl: 'https://storage.googleapis.com/vokid-cdn/feedback/fb-1.webm',
      };

      const response = await gradeSubmissionAction(payload);
      expect(response.success).toBe(true);
      if (response.success) {
        expect(response.data.id).toBe(validSubmissionId);
      }
    });

    it('harus menolak jika payload tidak valid tanpa menyentuh database', async () => {
      const invalidPayload = {
        submissionId: 'invalid-id',
        grade: 150,
      };

      const response = await gradeSubmissionAction(invalidPayload);
      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toBeDefined();
      }
    });
  });
});
