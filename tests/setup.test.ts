import { describe, it, expect } from 'vitest';
import type {
  UserRole,
  GradeLevel,
  ContentType,
  AssignmentType,
  SubmissionStatus,
  Profile,
  ClassRoom,
  Subject,
  Module,
  Lesson,
  Assignment,
  Submission,
  Database,
} from '@/types/database';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

describe('Vokid Vitest & Environment Setup', () => {
  it('should run in jsdom environment with browser globals available', () => {
    expect(typeof window).toBe('object');
    expect(typeof document).toBe('object');
    expect(document.createElement).toBeDefined();
  });

  it('should correctly resolve path aliases with @/*', () => {
    const role: UserRole = 'GURU';
    expect(role).toBe('GURU');
  });
});

describe('Strict Database Type Definitions', () => {
  it('should strictly type UserRole values', () => {
    const roles: UserRole[] = ['GURU', 'SISWA', 'ORANG_TUA'];
    expect(roles).toHaveLength(3);
    expect(roles).toContain('GURU');
    expect(roles).toContain('SISWA');
    expect(roles).toContain('ORANG_TUA');
  });

  it('should strictly type GradeLevel (1-6)', () => {
    const grades: GradeLevel[] = [1, 2, 3, 4, 5, 6];
    expect(grades).toHaveLength(6);
    expect(grades.reduce((a, b) => a + b, 0)).toBe(21);
  });

  it('should strictly type ContentType', () => {
    const contentTypes: ContentType[] = ['VIDEO', 'PDF', 'AUDIO'];
    expect(contentTypes).toEqual(['VIDEO', 'PDF', 'AUDIO']);
  });

  it('should strictly type AssignmentType', () => {
    const assignmentTypes: AssignmentType[] = ['VOICE_TASK', 'PHOTO_HOMEWORK'];
    expect(assignmentTypes).toEqual(['VOICE_TASK', 'PHOTO_HOMEWORK']);
  });

  it('should strictly type SubmissionStatus', () => {
    const statuses: SubmissionStatus[] = ['PENDING', 'GRADED'];
    expect(statuses).toEqual(['PENDING', 'GRADED']);
  });

  it('should instantiate valid Profile object adhering strictly to Profile interface', () => {
    const profile: Profile = {
      id: '11111111-1111-1111-1111-111111111111',
      role: 'SISWA',
      full_name: 'Budi Santoso',
      avatar_url: 'https://example.com/avatar.png',
      created_at: '2026-09-10T08:00:00Z',
    };

    expect(profile.role).toBe('SISWA');
    expect(profile.full_name).toBe('Budi Santoso');
  });

  it('should instantiate valid ClassRoom object adhering strictly to ClassRoom interface', () => {
    const classroom: ClassRoom = {
      id: 'aaaaaaaa-1111-0000-0000-000000000001',
      name: 'Kelas 1-A Amanah [Seed]',
      grade_level: 1,
      academic_year: '2026/2027',
      created_by: '11111111-1111-1111-1111-111111111111',
      created_at: '2026-09-10T08:00:00Z',
    };

    expect(classroom.grade_level).toBe(1);
    expect(classroom.name).toContain('Kelas 1-A');
  });

  it('should instantiate valid Subject, Module, and Lesson hierarchy', () => {
    const subject: Subject = {
      id: 'bbbbbbbb-1111-0000-0000-000000000001',
      class_id: 'aaaaaaaa-1111-0000-0000-000000000001',
      name: 'Bahasa Indonesia',
      code: 'BIND-1',
      created_at: '2026-09-10T08:00:00Z',
    };

    const moduleItem: Module = {
      id: 'cccccccc-1111-0000-0000-000000000001',
      subject_id: subject.id,
      title: 'Membaca Suku Kata [Seed]',
      order_index: 1,
      is_published: true,
      created_at: '2026-09-10T08:00:00Z',
    };

    const lesson: Lesson = {
      id: 'dddddddd-1111-0000-0000-000000000001',
      module_id: moduleItem.id,
      title: 'Pengenalan Fonik Suku Kata Ba-Bi-Bu',
      content_type: 'AUDIO',
      content_url: 'https://example.com/audio/vokid-seed-ba-bi-bu.mp3',
      content_text: null,
      order_index: 1,
      created_at: '2026-09-10T08:00:00Z',
    };

    expect(lesson.content_type).toBe('AUDIO');
    expect(lesson.module_id).toBe(moduleItem.id);
  });

  it('should instantiate valid Assignment and Submission models', () => {
    const assignment: Assignment = {
      id: 'eeeeeeee-1111-0000-0000-000000000001',
      lesson_id: 'dddddddd-1111-0000-0000-000000000001',
      type: 'VOICE_TASK',
      prompt: 'Tekan tombol mikrofon besar dan ucapkan "Buku Budi Baru"',
      instruction_audio_url: 'https://example.com/audio/instruction.mp3',
      due_date: '2026-09-17T23:59:59Z',
      created_at: '2026-09-10T08:00:00Z',
    };

    const submission: Submission = {
      id: 'ffffffff-1111-0000-0000-000000000001',
      assignment_id: assignment.id,
      student_id: '22222222-2222-2222-2222-222222222222',
      file_url: 'https://example.com/submissions/audio-budi.webm',
      score: 95.0,
      grade: 95.0,
      teacher_feedback: 'Bagus sekali!',
      teacher_feedback_text: 'Bagus sekali!',
      teacher_feedback_audio_url: null,
      status: 'GRADED',
      submitted_at: '2026-09-10T09:00:00Z',
      graded_at: '2026-09-10T10:00:00Z',
    };

    expect(assignment.type).toBe('VOICE_TASK');
    expect(submission.status).toBe('GRADED');
    expect(submission.file_url).toBeDefined();
  });
});

describe('Supabase Client Utilities', () => {
  it('should initialize browser client with fallback configuration', () => {
    const client = createBrowserClient();
    expect(client).toBeDefined();
    expect(typeof client.auth).toBe('object');
  });
});
