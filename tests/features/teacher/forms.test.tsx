import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { LessonForm } from '@/features/teacher/components/LessonForm';
import { AssignmentForm } from '@/features/teacher/components/AssignmentForm';

// Mock server actions to isolate UI interaction tests
vi.mock('@/features/teacher/actions/lesson-actions', () => ({
  createLessonAction: vi.fn().mockResolvedValue({
    success: true,
    data: {
      id: 'lesson-new-1',
      title: 'Belajar Membaca Fonik',
      content_type: 'AUDIO',
    },
  }),
}));

vi.mock('@/features/teacher/actions/assignment-actions', () => ({
  createAssignmentAction: vi.fn().mockResolvedValue({
    success: true,
    data: {
      id: 'assignment-new-1',
      type: 'VOICE_TASK',
      prompt: 'Ucapkan kata apel dan bola',
    },
  }),
}));

describe('Unit & Integration Test Komponen Formulir Guru', () => {
  const mockModules = [
    {
      id: 'cccccccc-1111-0000-0000-000000000001',
      title: 'Membaca Suku Kata Ba-Bi-Bu',
      subjectName: 'Bahasa Indonesia',
    },
    {
      id: 'cccccccc-2222-0000-0000-000000000002',
      title: 'Berhitung Angka 1 sampai 10',
      subjectName: 'Matematika',
    },
  ];

  const mockLessons = [
    {
      id: 'dddddddd-1111-0000-0000-000000000001',
      title: 'Pengenalan Fonik Suku Kata Ba-Bi-Bu',
    },
    {
      id: 'dddddddd-2222-0000-0000-000000000002',
      title: 'Latihan Mengeja Vokal dan Konsonan',
    },
  ];

  describe('LessonForm Component', () => {
    it('harus merender formulir materi dengan label bahasa Indonesia yang benar', () => {
      render(<LessonForm modules={mockModules} />);

      expect(screen.getByLabelText(/Pilih Mata Pelajaran & Modul/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Judul Materi Pembelajaran/i)).toBeInTheDocument();
      expect(screen.getByText(/Teks Cerita \/ Bacaan/i)).toBeInTheDocument();
      expect(screen.getByText(/Video Pembelajaran/i)).toBeInTheDocument();
      expect(screen.getByText(/Dokumen \/ Lembar PDF/i)).toBeInTheDocument();
      expect(screen.getByText(/Rekaman Suara \/ Fonik/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Simpan Materi Pembelajaran/i })).toBeInTheDocument();
    });

    it('harus memvalidasi dan menampilkan pesan kesalahan jika judul diisi kurang dari 3 karakter', async () => {
      render(<LessonForm modules={mockModules} />);

      const titleInput = screen.getByLabelText(/Judul Materi Pembelajaran/i);
      const urlInput = screen.getByLabelText(/Tautan \/ Berkas Materi/i);
      const form = titleInput.closest('form')!;

      fireEvent.change(titleInput, { target: { value: 'AB' } });
      fireEvent.change(urlInput, { target: { value: 'https://youtube.com/watch?v=123' } });
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(/Judul materi minimal 3 karakter/i)).toBeInTheDocument();
      });
    });
  });

  describe('AssignmentForm Component', () => {
    it('harus merender formulir penugasan dengan opsi pilihan jenis tugas', () => {
      render(<AssignmentForm lessons={mockLessons} />);

      expect(screen.getByLabelText(/Pilih Materi Terkait/i)).toBeInTheDocument();
      expect(screen.getByText(/Tugas Rekam Suara \(Voice Task\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Foto PR \/ Buku Tulis \(Photo Homework\)/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Teks Instruksi \/ Soal Tugas/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Simpan & Terbitkan Penugasan/i })).toBeInTheDocument();
    });

    it('harus menampilkan input unggah audio petunjuk saat toggle audio instruksi diaktifkan', async () => {
      render(<AssignmentForm lessons={mockLessons} />);

      const audioToggle = screen.getByLabelText(/Audio Panduan Guru \(Fase A Adaptif\)/i);
      expect(screen.queryByLabelText(/Unggah Rekaman Suara Petunjuk/i)).not.toBeInTheDocument();

      // Aktifkan toggle audio
      fireEvent.click(audioToggle);

      expect(screen.getByLabelText(/Unggah Rekaman Suara Petunjuk/i)).toBeInTheDocument();
    });

    it('harus memvalidasi dan menampilkan pesan kesalahan jika teks instruksi kurang dari 5 karakter', async () => {
      render(<AssignmentForm lessons={mockLessons} />);

      const promptInput = screen.getByLabelText(/Teks Instruksi \/ Soal Tugas/i);
      const submitBtn = screen.getByRole('button', { name: /Simpan & Terbitkan Penugasan/i });

      fireEvent.change(promptInput, { target: { value: 'Soal' } });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText(/Instruksi tugas minimal 5 karakter/i)).toBeInTheDocument();
      });
    });

    it('harus mengunggah audio instruksi via POST /api/upload folder audio-prompts dan menyimpan url R2', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          url: 'https://pub-test.r2.dev/audio-prompts/petunjuk_guru.webm',
        }),
      });
      const originalFetch = global.fetch;
      global.fetch = mockFetch;

      try {
        render(<AssignmentForm lessons={mockLessons} />);

        // Aktifkan toggle audio panduan
        const audioToggle = screen.getByLabelText(/Audio Panduan Guru \(Fase A Adaptif\)/i);
        fireEvent.click(audioToggle);

        const fileInput = screen.getByLabelText(/Unggah Rekaman Suara Petunjuk/i);
        const file = new File(['mock audio data'], 'petunjuk_guru.webm', { type: 'audio/webm' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(
            '/api/upload',
            expect.objectContaining({
              method: 'POST',
              body: expect.any(FormData),
            })
          );
        });

        const callArgs = mockFetch.mock.calls[0];
        const formData = callArgs[1].body as FormData;
        expect(formData.get('folder')).toBe('audio-prompts');
        expect(formData.get('fileName')).toBe('petunjuk_guru.webm');
      } finally {
        global.fetch = originalFetch;
      }
    });

    it('harus mengunci pilihan materi dan tombol submit saat audio sedang diunggah ke R2', async () => {
      let resolveUpload: (val: unknown) => void = () => {};
      const delayedFetch = vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveUpload = resolve;
          })
      );
      const originalFetch = global.fetch;
      global.fetch = delayedFetch as unknown as typeof fetch;

      try {
        render(<AssignmentForm lessons={mockLessons} />);

        // Aktifkan toggle audio panduan
        const audioToggle = screen.getByLabelText(/Audio Panduan Guru \(Fase A Adaptif\)/i);
        fireEvent.click(audioToggle);

        const fileInput = screen.getByLabelText(/Unggah Rekaman Suara Petunjuk/i);
        const file = new File(['mock audio data'], 'petunjuk_guru.webm', { type: 'audio/webm' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        // Periksa bahwa pilihan materi dan submit terkunci disabled saat proses upload audio berlangsung
        const lessonSelect = screen.getByLabelText(/Pilih Materi Terkait/i);
        const submitBtn = screen.getByRole('button', { name: /Mengunggah Audio/i });

        expect(lessonSelect).toBeDisabled();
        expect(submitBtn).toBeDisabled();

        // Selesaikan upload
        resolveUpload({
          ok: true,
          json: () => Promise.resolve({ success: true, url: 'https://pub-test.r2.dev/audio.webm' }),
        });

        await waitFor(() => {
          expect(screen.queryByText(/Mengunggah audio ke R2/i)).not.toBeInTheDocument();
        });
      } finally {
        global.fetch = originalFetch;
      }
    });
  });

  describe('LessonForm Component File Upload', () => {
    it('harus mengunggah berkas materi via POST /api/upload folder materials dan menyimpan url R2', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          url: 'https://pub-test.r2.dev/materials/lembar_kerja.pdf',
        }),
      });
      const originalFetch = global.fetch;
      global.fetch = mockFetch;

      try {
        render(<LessonForm modules={mockModules} />);

        // Ganti ke mode Unggah Berkas
        const uploadModeBtn = screen.getByRole('button', { name: /Unggah Berkas/i });
        fireEvent.click(uploadModeBtn);

        const fileInput = document.getElementById('lesson-file-upload') as HTMLInputElement;
        expect(fileInput).toBeInTheDocument();

        const file = new File(['mock pdf content'], 'lembar_kerja.pdf', { type: 'application/pdf' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(
            '/api/upload',
            expect.objectContaining({
              method: 'POST',
              body: expect.any(FormData),
            })
          );
        });

        const callArgs = mockFetch.mock.calls[0];
        const formData = callArgs[1].body as FormData;
        expect(formData.get('folder')).toBe('materials');
        expect(formData.get('fileName')).toBe('lembar_kerja.pdf');
      } finally {
        global.fetch = originalFetch;
      }
    });
  });
});
