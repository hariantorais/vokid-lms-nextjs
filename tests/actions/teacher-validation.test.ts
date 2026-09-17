import { describe, it, expect } from 'vitest';
import {
  createLessonSchema,
  createAssignmentSchema,
  type CreateLessonInput,
  type CreateAssignmentInput,
} from '@/features/teacher/validations';

describe('Unit Test Validasi Zod Guru - createLessonSchema', () => {
  const validUUID = 'aaaaaaaa-1111-0000-0000-000000000001';

  it('harus menolak jika judul materi (title) kurang dari 3 karakter', () => {
    const invalidData = {
      moduleId: validUUID,
      title: 'AB',
      contentType: 'VIDEO',
      contentUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      orderIndex: 1,
    };

    const result = createLessonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('title'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('minimal 3 karakter');
    }
  });

  it('harus menolak jika URL materi (contentUrl) tidak valid', () => {
    const invalidData = {
      moduleId: validUUID,
      title: 'Pengenalan Abjad dan Angka',
      contentType: 'PDF',
      contentUrl: 'bukan-sebuah-tautan-url',
      orderIndex: 1,
    };

    const result = createLessonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('contentUrl'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('tautan URL yang valid');
    }
  });

  it('harus menolak jika contentType bukan VIDEO, PDF, atau AUDIO', () => {
    const invalidData = {
      moduleId: validUUID,
      title: 'Slide Presentasi Interaktif',
      contentType: 'PPTX',
      contentUrl: 'https://example.com/slides.pptx',
      orderIndex: 1,
    };

    const result = createLessonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('contentType'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain("Tipe materi harus berupa 'TEXT', 'VIDEO', 'PDF', atau 'AUDIO'");
    }
  });

  it('harus menerima contentType TEXT dengan contentText valid tanpa mewajibkan contentUrl', () => {
    const validTextData = {
      moduleId: validUUID,
      title: 'Cerita Kancil dan Buaya',
      contentType: 'TEXT',
      contentText: 'Pada suatu hari di pinggir hutan...',
      orderIndex: 1,
    };

    const result = createLessonSchema.safeParse(validTextData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contentType).toBe('TEXT');
      expect(result.data.contentText).toBe('Pada suatu hari di pinggir hutan...');
      expect(result.data.contentUrl).toBeNull();
    }
  });

  it('harus menolak contentType TEXT jika contentText kosong', () => {
    const invalidTextData = {
      moduleId: validUUID,
      title: 'Cerita Dongeng',
      contentType: 'TEXT',
      contentText: '',
      orderIndex: 1,
    };

    const result = createLessonSchema.safeParse(invalidTextData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('contentText'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('Teks materi/cerita bacaan wajib diisi');
    }
  });

  it('harus menolak jika moduleId bukan format UUID yang sah', () => {
    const invalidData = {
      moduleId: '123-bukan-uuid',
      title: 'Belajar Berhitung Seru',
      contentType: 'AUDIO',
      contentUrl: 'https://example.com/audio.mp3',
      orderIndex: 0,
    };

    const result = createLessonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('moduleId'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('UUID yang valid');
    }
  });

  it('harus menolak jika orderIndex bernilai negatif', () => {
    const invalidData = {
      moduleId: validUUID,
      title: 'Belajar Berhitung Seru',
      contentType: 'AUDIO',
      contentUrl: 'https://example.com/audio.mp3',
      orderIndex: -1,
    };

    const result = createLessonSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('orderIndex'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('tidak boleh negatif');
    }
  });

  it('harus lolos validasi saat diberikan data lengkap yang sah beserta learningObjectives', () => {
    const validData = {
      moduleId: validUUID,
      title: 'Materi Fonik Suku Kata Ba-Bi-Bu',
      contentType: 'AUDIO',
      contentUrl: 'https://storage.googleapis.com/vokid/audio/ba-bi-bu.mp3',
      learningObjectives: 'Siswa mampu melafalkan suku kata ba, bi, bu dengan fasih.',
      orderIndex: 1,
    };

    const result = createLessonSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('Materi Fonik Suku Kata Ba-Bi-Bu');
      expect(result.data.contentType).toBe('AUDIO');
      expect(result.data.learningObjectives).toBe('Siswa mampu melafalkan suku kata ba, bi, bu dengan fasih.');
      expect(result.data.orderIndex).toBe(1);
    }
  });
});

describe('Unit Test Validasi Zod Guru - createAssignmentSchema', () => {
  const validUUID = 'dddddddd-1111-0000-0000-000000000001';

  it('harus menolak jika instruksi tugas (prompt) kurang dari 3 karakter', () => {
    const invalidData = {
      lessonId: validUUID,
      type: 'VOICE_TASK',
      prompt: 'Ha',
    };

    const result = createAssignmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('prompt'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('minimal 3 karakter');
    }
  });

  it('harus menolak tipe penugasan di luar opsi yang sah', () => {
    const invalidData = {
      lessonId: validUUID,
      type: 'MULTIPLE_CHOICE',
      prompt: 'Pilihlah salah satu jawaban yang benar berikut.',
    };

    const result = createAssignmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('type'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain("Tipe tugas harus berupa 'VOICE_TASK', 'PHOTO_HOMEWORK', atau 'QUIZ_CBT'");
    }
  });

  it('harus menolak jika instructionAudioUrl berupa teks yang bukan URL', () => {
    const invalidData = {
      lessonId: validUUID,
      type: 'VOICE_TASK',
      prompt: 'Rekam suaramu saat membaca kalimat ini.',
      instructionAudioUrl: 'file-audio-lokal.mp3',
    };

    const result = createAssignmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path.includes('instructionAudioUrl'));
      expect(issue).toBeDefined();
      expect(issue?.message).toContain('URL audio panduan harus berupa tautan URL yang valid');
    }
  });

  it('harus lolos validasi saat instructionAudioUrl bernilai null, kosong, atau tidak diisi', () => {
    const validDataWithNull = {
      lessonId: validUUID,
      type: 'PHOTO_HOMEWORK',
      prompt: 'Foto buku tulismu pada halaman 14 latihan matematika.',
      instructionAudioUrl: null,
      dueDate: null,
    };

    const resultNull = createAssignmentSchema.safeParse(validDataWithNull);
    expect(resultNull.success).toBe(true);
    if (resultNull.success) {
      expect(resultNull.data.instructionAudioUrl).toBeNull();
      expect(resultNull.data.dueDate).toBeNull();
    }

    const validDataWithEmptyString = {
      lessonId: validUUID,
      type: 'PHOTO_HOMEWORK',
      prompt: 'Foto buku tulismu pada halaman 14 latihan matematika.',
      instructionAudioUrl: '',
      dueDate: '',
    };

    const resultEmpty = createAssignmentSchema.safeParse(validDataWithEmptyString);
    expect(resultEmpty.success).toBe(true);
    if (resultEmpty.success) {
      expect(resultEmpty.data.instructionAudioUrl).toBeNull();
      expect(resultEmpty.data.dueDate).toBeNull();
    }
  });

  it('harus lolos validasi saat diberikan data lengkap dengan audio petunjuk dan batas waktu (dueDate)', () => {
    const validData = {
      lessonId: validUUID,
      type: 'VOICE_TASK',
      prompt: 'Tekan tombol rekam dan tirukan bunyi hewan yang diperdengarkan!',
      instructionAudioUrl: 'https://storage.googleapis.com/vokid/audio/petunjuk.mp3',
      dueDate: '2026-09-20T23:59:59.000Z',
    };

    const result = createAssignmentSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.type).toBe('VOICE_TASK');
      expect(result.data.instructionAudioUrl).toBe('https://storage.googleapis.com/vokid/audio/petunjuk.mp3');
      expect(result.data.dueDate).toBe('2026-09-20T23:59:59.000Z');
    }
  });
});
