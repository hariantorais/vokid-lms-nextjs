import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  deleteModuleAction,
  deleteAssignmentAction,
  updateModuleAction,
  updateAssignmentAction,
  createModuleAction,
} from '@/features/teacher/actions/teacher-actions';
import {
  getTeacherClassrooms,
  getClassCurriculum,
} from '@/features/teacher/services/teacher-service';
import { ModuleManagementCard } from '@/features/teacher/components/ModuleManagementCard';
import { AssignmentManagementCard } from '@/features/teacher/components/AssignmentManagementCard';

// Mock Next.js cache revalidatePath & navigation
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock Supabase server client for Server Actions and Services
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockImplementation(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'teacher-dev-123' } },
        error: null,
      }),
    },
    from: vi.fn((table: string) => {
      if (table === 'profiles') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: { id: 'teacher-dev-123', role: 'GURU' },
            error: null,
          }),
        };
      }
      if (table === 'classes') {
        const mockClassItem = {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Kelas 1-A (Fase A)',
          grade_level: 1,
          academic_year: '2026/2027',
          created_by: 'teacher-dev-123',
          created_at: new Date().toISOString(),
        };
        const classesBuilder: Record<string, unknown> = {
          select: vi.fn().mockReturnThis(),
          order: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          single: vi.fn().mockResolvedValue({
            data: mockClassItem,
            error: null,
          }),
          maybeSingle: vi.fn().mockResolvedValue({
            data: mockClassItem,
            error: null,
          }),
          then: (resolve: (val: { data: typeof mockClassItem[]; error: null }) => void) =>
            Promise.resolve({ data: [mockClassItem], error: null }).then(resolve),
        };
        return classesBuilder;
      }
      if (table === 'subjects') {
        return {
          select: vi.fn().mockReturnThis(),
          eq: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'sub-1',
                class_id: '11111111-1111-1111-1111-111111111111',
                name: 'Bahasa Indonesia',
                code: 'BIND-1',
                created_at: new Date().toISOString(),
              },
            ],
            error: null,
          }),
        };
      }
      if (table === 'modules') {
        return {
          select: vi.fn().mockReturnThis(),
          in: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'mod-1',
                subject_id: 'sub-1',
                title: 'Membaca Suku Kata Ba-Bi-Bu',
                order_index: 1,
                is_published: true,
                created_at: new Date().toISOString(),
              },
            ],
            error: null,
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'mod-new-1' },
                error: null,
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: { id: 'mod-1' },
                  error: null,
                }),
              }),
            }),
          }),
          delete: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              error: null,
            }),
          }),
        };
      }
      if (table === 'lessons') {
        return {
          select: vi.fn().mockReturnThis(),
          in: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'les-1',
                module_id: 'mod-1',
                title: 'Pengenalan Fonik Suku Kata',
                content_type: 'AUDIO',
                content_url: 'https://cdn.vokid.sch.id/audio/sample.mp3',
                order_index: 1,
                created_at: new Date().toISOString(),
              },
            ],
            error: null,
          }),
        };
      }
      if (table === 'assignments') {
        return {
          select: vi.fn().mockReturnThis(),
          in: vi.fn().mockReturnThis(),
          order: vi.fn().mockResolvedValue({
            data: [
              {
                id: 'asg-1',
                lesson_id: 'les-1',
                type: 'VOICE_TASK',
                prompt: 'Ucapkan kalimat Buku Budi Baru',
                instruction_audio_url: null,
                due_date: null,
                created_at: new Date().toISOString(),
              },
            ],
            error: null,
          }),
          insert: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { id: 'asg-new-1' },
                error: null,
              }),
            }),
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: { id: 'asg-1' },
                  error: null,
                }),
              }),
            }),
          }),
          delete: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              error: null,
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

describe('Unit Test Kurikulum & Server Actions Guru', () => {
  const validUUID = 'aaaaaaaa-1111-0000-0000-000000000001';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('deleteModuleAction', () => {
    it('harus menolak jika ID modul bukan UUID valid', async () => {
      const res = await deleteModuleAction('bukan-uuid');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toContain('UUID');
      }
    });

    it('harus berhasil menghapus modul dengan UUID valid', async () => {
      const res = await deleteModuleAction(validUUID);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.id).toBe(validUUID);
      }
    });
  });

  describe('deleteAssignmentAction', () => {
    it('harus menolak jika ID penugasan bukan UUID valid', async () => {
      const res = await deleteAssignmentAction('invalid-asg-id');
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toContain('UUID');
      }
    });

    it('harus berhasil menghapus penugasan dengan UUID valid', async () => {
      const res = await deleteAssignmentAction(validUUID);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.id).toBe(validUUID);
      }
    });
  });

  describe('updateModuleAction', () => {
    it('harus menolak jika payload pembaruan modul tidak valid', async () => {
      const res = await updateModuleAction({
        moduleId: 'invalid-id',
        title: '',
      });
      expect(res.success).toBe(false);
    });

    it('harus sukses memperbarui modul dengan payload yang valid', async () => {
      const res = await updateModuleAction({
        moduleId: validUUID,
        title: 'Membaca Suku Kata Revisi',
        orderIndex: 2,
      });
      expect(res.success).toBe(true);
    });
  });

  describe('updateAssignmentAction', () => {
    it('harus menolak jika payload pembaruan penugasan tidak valid', async () => {
      const res = await updateAssignmentAction({
        assignmentId: 'invalid-asg-id',
        prompt: 'pendek',
      });
      expect(res.success).toBe(false);
    });

    it('harus sukses memperbarui penugasan dengan payload yang valid', async () => {
      const res = await updateAssignmentAction({
        assignmentId: validUUID,
        type: 'VOICE_TASK',
        prompt: 'Tirukan pengucapan huruf Budi dengan jelas!',
      });
      expect(res.success).toBe(true);
    });
  });

  describe('createModuleAction', () => {
    it('harus berhasil membuat modul baru', async () => {
      const res = await createModuleAction({
        subjectId: validUUID,
        title: 'Pengenalan Angka 1 sampai 10',
        orderIndex: 1,
      });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.id).toBeDefined();
      }
    });
  });

  describe('teacher-service Services', () => {
    it('getTeacherClassrooms harus mengembalikan daftar kelas binaan guru', async () => {
      const res = await getTeacherClassrooms('teacher-dev-123');
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.length).toBeGreaterThan(0);
      }
    });

    it('getClassCurriculum harus mengembalikan struktur kurikulum lengkap', async () => {
      const res = await getClassCurriculum('11111111-1111-1111-1111-111111111111');
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.classData).toBeDefined();
        expect(res.data.subjects).toBeDefined();
        expect(res.data.subjects.length).toBeGreaterThan(0);
        // Memastikan hierarki modul -> lessons -> assignments ada
        const firstModule = res.data.subjects[0]?.modules[0];
        expect(firstModule).toBeDefined();
        expect(firstModule?.lessons).toBeDefined();
      }
    });
  });
});

describe('Komponen UI Manajemen Kurikulum Guru', () => {
  it('harus merender ModuleManagementCard dengan daftar modul dan tombol tambah', () => {
    const mockSubjects = [
      { id: 'sub-1', name: 'Bahasa Indonesia' },
      { id: 'sub-2', name: 'Matematika' },
    ];

    const mockModules = [
      {
        id: 'mod-1',
        title: 'Membaca Suku Kata Ba-Bi-Bu',
        order_index: 1,
        subject_id: 'sub-1',
        subject_name: 'Bahasa Indonesia',
        lessons_count: 2,
      },
    ];

    render(
      <ModuleManagementCard
        classId="class-1"
        subjects={mockSubjects}
        modules={mockModules}
      />
    );

    expect(screen.getByText(/Kelola Modul Pembelajaran/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Tambah Modul/i)).toBeInTheDocument();
    expect(screen.getByText(/Membaca Suku Kata Ba-Bi-Bu/i)).toBeInTheDocument();
    expect(screen.getByTestId('edit-module-btn-mod-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-module-btn-mod-1')).toBeInTheDocument();
  });

  it('harus merender AssignmentManagementCard dengan daftar materi dan tugas', () => {
    const mockModules = [
      {
        id: 'mod-1',
        title: 'Membaca Suku Kata',
        order_index: 1,
        subject_id: 'sub-1',
        is_published: true,
        created_at: new Date().toISOString(),
        lessons: [
          {
            id: 'les-1',
            module_id: 'mod-1',
            title: 'Fonik Ba-Bi-Bu',
            content_type: 'AUDIO' as const,
            content_url: 'https://cdn.vokid.sch.id/audio/1.mp3',
            content_text: null,
            order_index: 1,
            created_at: new Date().toISOString(),
            assignments: [
              {
                id: 'asg-1',
                lesson_id: 'les-1',
                type: 'VOICE_TASK' as const,
                prompt: 'Ucapkan kata apel dan bola dengan lantang',
                instruction_audio_url: null,
                due_date: null,
                quiz_question_count: null,
                passing_score: null,
                created_at: new Date().toISOString(),
              },
            ],
          },
        ],
      },
    ];

    render(
      <AssignmentManagementCard
        classId="class-1"
        modules={mockModules}
        gradeLevel={1}
      />
    );

    expect(screen.getByText(/Kelola Penugasan Siswa/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Buat Tugas Baru/i)).toBeInTheDocument();
    expect(screen.getByText(/Ucapkan kata apel dan bola dengan lantang/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Tugas Suara/i).length).toBeGreaterThan(0);
    expect(screen.getByTestId('delete-assignment-btn-asg-1')).toBeInTheDocument();
  });
});
