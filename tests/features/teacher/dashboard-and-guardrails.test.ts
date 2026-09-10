import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTeacherDashboardData } from '@/features/teacher/services/teacher-service';
import { createModuleAction } from '@/features/teacher/actions/teacher-actions';
import { gradeSubmissionAction } from '@/features/teacher/actions/grading-actions';
import { submitAssignmentAction } from '@/features/student/actions/submission-actions';

// Mock Next.js cache revalidatePath
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Supabase mock state
let mockAuthUser: { id: string } | null = { id: 'teacher-dev' };
let mockProfileRole = 'GURU';
let mockPendingSubmissionsCount = 7;
let mockGradedSubmissionsCount = 10;
let mockProfilesCount = 25;
let mockModulesCount = 14;
let mockClassesData: Array<Record<string, unknown>> = [];
let mockPendingSubmissions: Array<Record<string, unknown>> = [];

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockImplementation(() => ({
    auth: {
      getUser: vi.fn().mockImplementation(() =>
        Promise.resolve({
          data: { user: mockAuthUser },
          error: mockAuthUser ? null : new Error('No session'),
        })
      ),
    },
    from: vi.fn((table: string) => {
      if (table === 'profiles') {
        return {
          select: vi.fn((cols: string, opts?: { count?: string; head?: boolean }) => {
            if (opts?.count === 'exact') {
              return {
                eq: vi.fn().mockResolvedValue({
                  count: mockProfilesCount,
                  error: null,
                }),
              };
            }
            const singleRes = {
              data: mockAuthUser
                ? { id: mockAuthUser.id, role: mockProfileRole, full_name: 'Pak Budi' }
                : null,
              error: mockAuthUser ? null : new Error('Profile not found'),
            };
            return {
              eq: vi.fn().mockReturnThis(),
              single: vi.fn().mockResolvedValue(singleRes),
              maybeSingle: vi.fn().mockResolvedValue(singleRes),
            };
          }),
        };
      }

      if (table === 'classes') {
        const classesBuilder: Record<string, unknown> = {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockImplementation(() =>
            Promise.resolve({
              data: mockClassesData,
              error: null,
            })
          ),
        };
        return classesBuilder;
      }

      if (table === 'submissions') {
        const pendingResult = { data: mockPendingSubmissions, error: null };
        const subChain: Record<string, unknown> = {
          ...pendingResult,
          then: (resolve: (val: typeof pendingResult) => void) => Promise.resolve(pendingResult).then(resolve),
        };
        subChain.eq = vi.fn().mockReturnValue(subChain);
        subChain.order = vi.fn().mockReturnValue(subChain);
        subChain.limit = vi.fn().mockReturnValue(subChain);

        return {
          select: vi.fn((cols: string, opts?: { count?: string; head?: boolean }) => {
            if (opts?.count === 'exact') {
              return {
                eq: vi.fn((field: string, val: string) =>
                  Promise.resolve({
                    count: val === 'PENDING' ? mockPendingSubmissionsCount : mockGradedSubmissionsCount,
                    error: null,
                  })
                ),
              };
            }
            return subChain;
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'new-sub-id', status: 'PENDING' },
                error: null,
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: { id: 'sub-graded-id', status: 'GRADED' },
                  error: null,
                }),
              }),
            }),
          }),
        };
      }

      if (table === 'modules') {
        return {
          select: vi.fn((cols: string, opts?: { count?: string; head?: boolean }) => {
            if (opts?.count === 'exact') {
              const res = { count: mockModulesCount, error: null };
              return {
                ...res,
                then: (resolve: (val: typeof res) => void) => Promise.resolve(res).then(resolve),
                eq: vi.fn().mockResolvedValue(res),
              };
            }
            return {
              eq: vi.fn().mockReturnThis(),
              order: vi.fn().mockResolvedValue({ data: [], error: null }),
            };
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'mod-new-1' },
                error: null,
              }),
            }),
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

describe('Teacher Dashboard Data Service (Real Supabase Queries)', () => {
  beforeEach(() => {
    mockAuthUser = { id: 'teacher-real-123' };
    mockProfileRole = 'GURU';
    mockProfilesCount = 25;
    mockPendingSubmissionsCount = 7;
    mockGradedSubmissionsCount = 10;
    mockModulesCount = 14;
    mockClassesData = [
      {
        id: 'class-uuid-1',
        name: 'Kelas 1-A Tematik',
        grade_level: 1,
        academic_year: '2026/2027',
      },
    ];
    mockPendingSubmissions = [
      {
        id: 'sub-uuid-101',
        student_id: 'student-uuid-1',
        file_url: 'https://r2.vokid.id/audio/answer.webm',
        status: 'PENDING',
        submitted_at: new Date(Date.now() - 3600000).toISOString(),
        profiles: { id: 'student-uuid-1', full_name: 'Ahmad Siswa' },
        assignments: {
          id: 'asg-uuid-1',
          prompt: 'Sebutkan huruf vokal',
          type: 'VOICE_TASK',
          lessons: {
            id: 'les-uuid-1',
            title: 'Pengenalan Huruf',
            modules: {
              id: 'mod-uuid-1',
              subjects: {
                id: 'sub-uuid-1',
                classes: { id: 'class-uuid-1', name: 'Kelas 1-A Tematik' },
              },
            },
          },
        },
      },
    ];
  });

  it('mengambil statistik dashboard dan antrean tugas secara dinamis dari tabel Supabase', async () => {
    const res = await getTeacherDashboardData();

    expect(res.success).toBe(true);
    if (!res.success) return;

    expect(res.data).toBeDefined();
    // Verifikasi metrik dinamis
    expect(res.data.stats.totalStudents).toBe(25);
    expect(res.data.stats.totalPending).toBe(7);
    expect(res.data.stats.totalGraded).toBe(10);
    expect(res.data.stats.totalModules).toBe(14);

    // Verifikasi pending review queue
    expect(res.data.pendingReviewQueue).toHaveLength(1);
    expect(res.data.pendingReviewQueue[0]?.studentName).toBe('Ahmad Siswa');
    expect(res.data.pendingReviewQueue[0]?.assignmentTitle).toBe('Sebutkan huruf vokal');
    expect(res.data.pendingReviewQueue[0]?.className).toBe('Kelas 1-A Tematik');
    expect(res.data.pendingReviewQueue[0]?.fileUrl).toBe('https://r2.vokid.id/audio/answer.webm');

    // Verifikasi classrooms
    expect(res.data.classrooms).toHaveLength(1);
    expect(res.data.classrooms[0]?.name).toBe('Kelas 1-A Tematik');
  });

  it('menangani empty state dengan data default ketika tabel kosong', async () => {
    mockClassesData = [];
    mockPendingSubmissions = [];
    mockProfilesCount = 0;
    mockPendingSubmissionsCount = 0;
    mockGradedSubmissionsCount = 0;
    mockModulesCount = 0;

    const res = await getTeacherDashboardData();

    expect(res.success).toBe(true);
    if (!res.success) return;

    expect(res.data.stats.totalStudents).toBe(0);
    expect(res.data.stats.totalPending).toBe(0);
    expect(res.data.pendingReviewQueue).toHaveLength(0);
    expect(res.data.classrooms).toHaveLength(0);
  });
});

describe('Production Developer Guardrails Enforcement', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('menolak teacher-actions saat di mode production tanpa sesi otentikasi valid', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    mockAuthUser = null; // Tidak ada sesi

    const formData = new FormData();
    formData.append('subjectId', '11111111-1111-1111-1111-111111111111');
    formData.append('title', 'Modul Baru');

    const result = await createModuleAction(formData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/sesi tidak valid|login kembali/i);
    }
  });

  it('menolak grading-actions saat di mode production tanpa sesi otentikasi valid', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    mockAuthUser = null; // Tidak ada sesi

    const result = await gradeSubmissionAction({
      submissionId: '11111111-1111-1111-1111-111111111111',
      grade: 90,
      feedbackText: 'Pekerjaan sangat baik!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/sesi tidak valid|login kembali/i);
    }
  });

  it('menolak submission-actions saat di mode production tanpa sesi otentikasi valid', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    mockAuthUser = null; // Tidak ada sesi

    const result = await submitAssignmentAction({
      assignmentId: '11111111-1111-1111-1111-111111111111',
      fileUrl: 'https://r2.vokid.id/audio/tugas-rekaman.webm',
      mimeType: 'audio/webm',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/sesi siswa tidak valid|login kembali/i);
    }
  });

  it('mengizinkan fallback pengembang saat di mode development', async () => {
    vi.stubEnv('NODE_ENV', 'development');
    mockAuthUser = null; // Di dev mode, verifyTeacherRole fallback ke teacher-dev

    const formData = new FormData();
    formData.append('subjectId', '11111111-1111-1111-1111-111111111111');
    formData.append('title', 'Modul Baru');

    const result = await createModuleAction(formData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe('mod-new-1');
    }
  });
});
