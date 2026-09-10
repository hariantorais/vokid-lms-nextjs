import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { submitAssignmentSchema } from '@/features/student/validations/submission-schema';
import { VoiceSubmission } from '@/features/student/components/VoiceSubmission';
import { PhotoHomeworkSubmission } from '@/features/student/components/PhotoHomeworkSubmission';

// Mock Supabase browser client
vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-student-123' } },
        error: null,
      }),
    },
    storage: {
      from: () => ({
        upload: vi.fn().mockResolvedValue({
          data: { path: 'test-student-123/task-1.webm' },
          error: null,
        }),
      }),
    },
  }),
}));

// Mock Server Action
vi.mock('@/features/student/actions/submission-actions', () => ({
  submitAssignmentAction: vi.fn().mockResolvedValue({
    success: true,
    data: {
      id: 'sub-123',
      assignment_id: '11111111-1111-1111-1111-111111111111',
      student_id: 'test-student-123',
      file_url: 'test-student-123/task-1.webm',
      status: 'PENDING',
      submitted_at: new Date().toISOString(),
    },
  }),
}));

// Mock MediaRecorder
class MockMediaRecorder {
  state: 'inactive' | 'recording' | 'paused' = 'inactive';
  ondataavailable: ((event: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  static isTypeSupported = vi.fn().mockReturnValue(true);

  start = vi.fn(() => {
    this.state = 'recording';
  });

  stop = vi.fn(() => {
    this.state = 'inactive';
    if (this.ondataavailable) {
      this.ondataavailable({ data: new Blob(['mock-audio'], { type: 'audio/webm' }) });
    }
    if (this.onstop) {
      this.onstop();
    }
  });
}

describe('Fase 6: Student Interactive Submissions Testing', () => {
  const originalMediaDevices = navigator.mediaDevices;
  const originalMediaRecorder = window.MediaRecorder;
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Setup Mock fetch for /api/upload
    global.fetch = vi.fn().mockImplementation((url: string | URL | Request) => {
      const urlStr = typeof url === 'string' ? url : url.toString();
      if (urlStr.includes('/api/upload')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              success: true,
              url: 'https://pub-test.r2.dev/submissions/test-task-1.webm',
            }),
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);
    });

    // Setup Mock MediaDevices & MediaRecorder
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: () => [{ stop: vi.fn() }],
        }),
      },
    });

    // @ts-expect-error Mock class assignment for testing
    window.MediaRecorder = MockMediaRecorder;

    // Setup ObjectURL mocks
    URL.createObjectURL = vi.fn().mockReturnValue('blob:http://localhost/mock-preview-url');
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: originalMediaDevices,
    });
    window.MediaRecorder = originalMediaRecorder;
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    vi.clearAllMocks();
  });

  // ==========================================
  // 1. Uji Skema Validasi Zod (submission-schema)
  // ==========================================
  describe('Zod Validation: submitAssignmentSchema', () => {
    const validPayload = {
      assignmentId: '11111111-1111-1111-1111-111111111111',
      fileUrl: 'submissions/student-1/voice.webm',
      mimeType: 'audio/webm',
      studentNotes: 'Tugas membaca suku kata selesai.',
    };

    it('harus menerima payload penyerahan tugas yang valid', () => {
      const result = submitAssignmentSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.assignmentId).toBe(validPayload.assignmentId);
        expect(result.data.mimeType).toBe('audio/webm');
      }
    });

    it('harus menolak jika fileUrl kosong', () => {
      const invalid = { ...validPayload, fileUrl: '' };
      const result = submitAssignmentSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Tautan berkas tugas');
      }
    });

    it('harus menolak jika assignmentId bukan UUID valid', () => {
      const invalid = { ...validPayload, assignmentId: 'invalid-id' };
      const result = submitAssignmentSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('UUID');
      }
    });

    it('harus menolak MIME type ilegal (misal application/pdf atau video/mp4)', () => {
      const invalidPdf = { ...validPayload, mimeType: 'application/pdf' };
      const resultPdf = submitAssignmentSchema.safeParse(invalidPdf);
      expect(resultPdf.success).toBe(false);

      const invalidVideo = { ...validPayload, mimeType: 'video/mp4' };
      const resultVideo = submitAssignmentSchema.safeParse(invalidVideo);
      expect(resultVideo.success).toBe(false);
    });

    it('harus menerima semua MIME type yang diizinkan (audio/webm, audio/mp4, image/jpeg, image/png)', () => {
      const allowedTypes = ['audio/webm', 'audio/mp4', 'image/jpeg', 'image/png'] as const;
      for (const mime of allowedTypes) {
        const payload = { ...validPayload, mimeType: mime };
        const result = submitAssignmentSchema.safeParse(payload);
        expect(result.success).toBe(true);
      }
    });

    it('harus menolak jika studentNotes melebihi 500 karakter', () => {
      const invalidNotes = { ...validPayload, studentNotes: 'a'.repeat(501) };
      const result = submitAssignmentSchema.safeParse(invalidNotes);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('500 karakter');
      }
    });
  });

  // ==========================================
  // 2. Uji Status Tombol pada VoiceSubmission
  // ==========================================
  describe('VoiceSubmission Component', () => {
    const mockAssignmentId = '11111111-1111-1111-1111-111111111111';

    it('harus merender tombol awal rekam suara ramah anak', () => {
      render(<VoiceSubmission assignmentId={mockAssignmentId} />);

      const recordBtn = screen.getByTestId('record-btn');
      expect(recordBtn).toBeInTheDocument();
      expect(screen.getByText(/Mulai Rekam Suara/i)).toBeInTheDocument();
    });

    it('harus bertransisi ke status merekam saat tombol rekam ditekan', async () => {
      render(<VoiceSubmission assignmentId={mockAssignmentId} />);

      const recordBtn = screen.getByTestId('record-btn');
      fireEvent.click(recordBtn);

      await waitFor(() => {
        expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
        expect(screen.getByTestId('stop-record-btn')).toBeInTheDocument();
        expect(screen.getByText(/Selesai Merekam/i)).toBeInTheDocument();
      });
    });

    it('harus bertransisi ke status review dan audio preview saat perekaman dihentikan', async () => {
      render(<VoiceSubmission assignmentId={mockAssignmentId} />);

      // Mulai rekam
      fireEvent.click(screen.getByTestId('record-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('stop-record-btn')).toBeInTheDocument();
      });

      // Stop rekam
      fireEvent.click(screen.getByTestId('stop-record-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('audio-preview')).toBeInTheDocument();
        expect(screen.getByTestId('rerecord-btn')).toBeInTheDocument();
        expect(screen.getByTestId('submit-voice-btn')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Kirim Tugas Suara/i })).toBeInTheDocument();
      });
    });

    it('harus dapat melakukan rekam ulang dan kembali ke status idle', async () => {
      render(<VoiceSubmission assignmentId={mockAssignmentId} />);

      fireEvent.click(screen.getByTestId('record-btn'));
      await waitFor(() => expect(screen.getByTestId('stop-record-btn')).toBeInTheDocument());

      fireEvent.click(screen.getByTestId('stop-record-btn'));
      await waitFor(() => expect(screen.getByTestId('rerecord-btn')).toBeInTheDocument());

      // Klik rekam ulang
      fireEvent.click(screen.getByTestId('rerecord-btn'));

      await waitFor(() => {
        expect(screen.getByTestId('record-btn')).toBeInTheDocument();
        expect(screen.queryByTestId('audio-preview')).not.toBeInTheDocument();
      });
    });

    it('harus dapat mengunggah dan menampilkan pesan sukses setelah dikirim', async () => {
      const onSuccessMock = vi.fn();
      render(<VoiceSubmission assignmentId={mockAssignmentId} onSuccess={onSuccessMock} />);

      fireEvent.click(screen.getByTestId('record-btn'));
      await waitFor(() => expect(screen.getByTestId('stop-record-btn')).toBeInTheDocument());

      fireEvent.click(screen.getByTestId('stop-record-btn'));
      await waitFor(() => expect(screen.getByTestId('submit-voice-btn')).toBeInTheDocument());

      fireEvent.click(screen.getByTestId('submit-voice-btn'));

      await waitFor(() => {
        expect(screen.getByText(/Tugas suara berhasil dikirim! Menunggu dinilai guru\./i)).toBeInTheDocument();
        expect(onSuccessMock).toHaveBeenCalled();
      });
    });
  });

  // ==========================================
  // 3. Uji Pratinjau Gambar pada PhotoHomeworkSubmission
  // ==========================================
  describe('PhotoHomeworkSubmission Component', () => {
    const mockAssignmentId = '11111111-1111-1111-1111-111111111111';

    it('harus merender tombol buka kamera dan galeri pada kondisi awal', () => {
      render(<PhotoHomeworkSubmission assignmentId={mockAssignmentId} />);

      expect(screen.getByTestId('open-camera-btn')).toBeInTheDocument();
      expect(screen.getByTestId('open-gallery-btn')).toBeInTheDocument();
    });

    it('harus menampilkan pratinjau gambar setelah berkas foto dipilih', async () => {
      render(<PhotoHomeworkSubmission assignmentId={mockAssignmentId} />);

      const fileInput = screen.getByTestId('gallery-input');
      const testFile = new File(['mock-image-bytes'], 'tugas-buku.jpg', { type: 'image/jpeg' });

      fireEvent.change(fileInput, { target: { files: [testFile] } });

      await waitFor(() => {
        const previewImg = screen.getByTestId('image-preview');
        expect(previewImg).toBeInTheDocument();
        expect(previewImg).toHaveAttribute('src', 'blob:http://localhost/mock-preview-url');
        expect(screen.getByTestId('submit-photo-btn')).toBeInTheDocument();
        expect(screen.getByTestId('reset-photo-btn')).toBeInTheDocument();
      });
    });

    it('harus menampilkan pesan error jika format berkas bukan JPG atau PNG', async () => {
      render(<PhotoHomeworkSubmission assignmentId={mockAssignmentId} />);

      const fileInput = screen.getByTestId('gallery-input');
      const invalidFile = new File(['text-bytes'], 'document.pdf', { type: 'application/pdf' });

      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      await waitFor(() => {
        expect(screen.getByText(/Format gambar harus JPG atau PNG/i)).toBeInTheDocument();
        expect(screen.queryByTestId('image-preview')).not.toBeInTheDocument();
      });
    });
  });
});
