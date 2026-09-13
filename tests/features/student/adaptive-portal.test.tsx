import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AdaptivePortal } from '@/features/student/components/AdaptivePortal';
import { AudioPromptPlayer } from '@/features/student/components/AudioPromptPlayer';
import type { StudentClassroomData } from '@/features/student/services/student-service';

describe('Unit & Integration Test AdaptivePortal (Fase A vs Fase B/C)', () => {
  const mockClassroomData: StudentClassroomData = {
    classData: {
      id: 'aaaaaaaa-1111-0000-0000-000000000001',
      name: 'Kelas 1-A Amanah [Seed]',
      grade_level: 1,
      academic_year: '2026/2027',
      created_by: '11111111-1111-1111-1111-111111111111',
      created_at: new Date().toISOString(),
    },
    subjects: [
      {
        id: 'bbbbbbbb-1111-0000-0000-000000000001',
        class_id: 'aaaaaaaa-1111-0000-0000-000000000001',
        name: 'Bahasa Indonesia',
        code: 'BIND-1',
        created_at: new Date().toISOString(),
        modules: [
          {
            id: 'cccccccc-1111-0000-0000-000000000001',
            subject_id: 'bbbbbbbb-1111-0000-0000-000000000001',
            title: 'Membaca Suku Kata Ba-Bi-Bu',
            order_index: 1,
            is_published: true,
            target_semester: 1,
            week_target: 1,
            created_at: new Date().toISOString(),
            lessons: [
              {
                id: 'dddddddd-1111-0000-0000-000000000001',
                module_id: 'cccccccc-1111-0000-0000-000000000001',
                title: 'Pengenalan Fonik Suku Kata Ba-Bi-Bu',
                content_type: 'AUDIO',
                content_url: 'https://storage.googleapis.com/vokid-cdn/audio/ba-bi-bu.mp3',
                content_text: null,
                learning_objectives: null,
                allocated_minutes: 70,
                audio_url: 'https://storage.googleapis.com/vokid-cdn/audio/ba-bi-bu.mp3',
                image_url: null,
                pdf_url: null,
                intro_guide: null,
                mindful_guide: null,
                joyful_guide: null,
                meaningful_guide: null,
                required_materials: null,
                order_index: 1,
                created_at: new Date().toISOString(),
                assignments: [
                  {
                    id: 'eeeeeeee-1111-0000-0000-000000000001',
                    lesson_id: 'dddddddd-1111-0000-0000-000000000001',
                    type: 'VOICE_TASK',
                    prompt: 'Ucapkan kalimat: Buku Budi Baru',
                    instruction_audio_url: 'https://storage.googleapis.com/vokid-cdn/audio/petunjuk.mp3',
                    due_date: null,
                    quiz_question_count: null,
                    passing_score: null,
                    created_at: new Date().toISOString(),
                    hasSubmitted: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  describe('AdaptivePortal Switcher Logic', () => {
    it('harus merender FaseAView jika gradeLevel bernilai 1 (Kelas 1 SD)', () => {
      render(<AdaptivePortal classroomData={mockClassroomData} gradeLevel={1} />);

      // Fase A memiliki salam ramah anak dan tombol sentuh besar
      expect(screen.getByText(/Halo Teman Belajar! 🎒/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /(Mulai|Tekan &) Rekam Suara/i })).toBeInTheDocument();
      // Pastikan sidebar Fase B/C tidak muncul di Fase A
      expect(screen.queryByText(/Daftar Modul/i)).not.toBeInTheDocument();
    });

    it('harus merender FaseAView jika gradeLevel bernilai 2 (Kelas 2 SD)', () => {
      render(<AdaptivePortal classroomData={mockClassroomData} gradeLevel={2} />);

      expect(screen.getByText(/Halo Teman Belajar! 🎒/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /(Mulai|Tekan &) Rekam Suara/i })).toBeInTheDocument();
    });

    it('harus merender FaseBCView jika gradeLevel bernilai 3 (Kelas 3 SD)', () => {
      render(<AdaptivePortal classroomData={mockClassroomData} gradeLevel={3} />);

      // Fase B/C memiliki sidebar mata pelajaran & daftar modul
      expect(screen.getByText(/Daftar Modul/i)).toBeInTheDocument();
      expect(screen.queryByText(/Halo Teman Belajar! 🎒/i)).not.toBeInTheDocument();
    });

    it('harus merender FaseBCView jika gradeLevel bernilai 5 (Kelas 5 SD)', () => {
      render(<AdaptivePortal classroomData={mockClassroomData} gradeLevel={5} />);

      expect(screen.getByText(/Daftar Modul/i)).toBeInTheDocument();
      expect(screen.queryByText(/Halo Teman Belajar! 🎒/i)).not.toBeInTheDocument();
    });
  });

  describe('AudioPromptPlayer Component', () => {
    it('harus merender tombol pemutar audio jika terdapat URL audio petunjuk', () => {
      render(
        <AudioPromptPlayer
          audioUrl="https://storage.googleapis.com/vokid-cdn/audio/petunjuk.mp3"
          title="Dengarkan Suara Ibu Guru"
        />
      );

      expect(screen.getByRole('button', { name: /Putar Audio Petunjuk Guru/i })).toBeInTheDocument();
      expect(screen.getByText(/Dengarkan Suara Ibu Guru/i)).toBeInTheDocument();
    });
  });
});
