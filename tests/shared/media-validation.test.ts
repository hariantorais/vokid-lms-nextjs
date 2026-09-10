import { describe, it, expect } from 'vitest';
import {
  validateAudioFile,
  validateHomeworkFile,
  validateMaterialFile,
  generateStoragePath,
  STORAGE_LIMITS,
} from '@/features/shared/validations/media-validation';

describe('Unit Test Validasi Berkas Media & Storage', () => {
  describe('Validasi Berkas Audio (validateAudioFile)', () => {
    it('harus menolak berkas dengan format bukan audio', () => {
      const pdfFile = {
        name: 'dokumen.pdf',
        type: 'application/pdf',
        size: 1024 * 1024, // 1MB
      };

      const result = validateAudioFile(pdfFile);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Format berkas audio tidak didukung');
    });

    it('harus menolak berkas audio yang ukurannya melebihi 10MB', () => {
      const largeAudio = {
        name: 'rekaman-panjang.webm',
        type: 'audio/webm',
        size: 11 * 1024 * 1024, // 11MB
      };

      const result = validateAudioFile(largeAudio);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('melebihi batas maksimum 10MB');
    });

    it('harus menerima berkas audio/webm yang valid dengan ukuran wajar', () => {
      const validAudio = {
        name: 'rekaman-bacaan.webm',
        type: 'audio/webm',
        size: 2 * 1024 * 1024, // 2MB
      };

      const result = validateAudioFile(validAudio);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('harus menerima berkas audio/mpeg (MP3) yang valid', () => {
      const validMp3 = {
        name: 'suara-huruf.mp3',
        type: 'audio/mpeg',
        size: 500 * 1024, // 500KB
      };

      const result = validateAudioFile(validMp3);
      expect(result.valid).toBe(true);
    });
  });

  describe('Validasi Berkas Tugas Siswa (validateHomeworkFile)', () => {
    it('harus menolak berkas selain gambar atau audio yang diizinkan', () => {
      const exeFile = {
        name: 'program.exe',
        type: 'application/x-msdownload',
        size: 500 * 1024,
      };

      const result = validateHomeworkFile(exeFile);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Format berkas tugas tidak didukung');
    });

    it('harus menolak gambar tugas yang ukurannya melebihi 15MB', () => {
      const oversizedPhoto = {
        name: 'foto-tugas-raw.png',
        type: 'image/png',
        size: 16 * 1024 * 1024, // 16MB
      };

      const result = validateHomeworkFile(oversizedPhoto);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('melebihi batas maksimum 15MB');
    });

    it('harus menerima berkas foto tugas format image/jpeg yang valid', () => {
      const validJpg = {
        name: 'foto-halaman-1.jpg',
        type: 'image/jpeg',
        size: 3 * 1024 * 1024, // 3MB
      };

      const result = validateHomeworkFile(validJpg);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('harus menerima berkas foto tugas format image/png yang valid', () => {
      const validPng = {
        name: 'foto-halaman-2.png',
        type: 'image/png',
        size: 4 * 1024 * 1024, // 4MB
      };

      const result = validateHomeworkFile(validPng);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('Generator Path Berkas Unik (generateStoragePath)', () => {
    const studentA = '11111111-1111-1111-1111-111111111111';
    const studentB = '22222222-2222-2222-2222-222222222222';

    it('harus mengawali path dengan ID pengguna untuk isolasi RLS folder', () => {
      const path = generateStoragePath(studentA, 'voice-task', 'tugas-budi.webm');
      expect(path.startsWith(`${studentA}/voice-task/`)).toBe(true);
    });

    it('harus menghasilkan path berbeda untuk siswa berbeda meskipun nama berkas sama', () => {
      const pathA = generateStoragePath(studentA, 'tugas', 'jawaban.jpg');
      const pathB = generateStoragePath(studentB, 'tugas', 'jawaban.jpg');

      expect(pathA).not.toBe(pathB);
      expect(pathA.startsWith(studentA)).toBe(true);
      expect(pathB.startsWith(studentB)).toBe(true);
    });

    it('harus menghasilkan path unik dan mencegah tabrakan (collision) pada pengunggahan berulang', () => {
      const path1 = generateStoragePath(studentA, 'voice-task', 'rekaman.webm');
      const path2 = generateStoragePath(studentA, 'voice-task', 'rekaman.webm');

      expect(path1).not.toBe(path2);
    });

    it('harus membersihkan karakter spasi dan simbol khusus pada nama berkas', () => {
      const messyFilename = 'Tugas Siswa #1 (Matematika) & Sains.jpg';
      const path = generateStoragePath(studentA, 'submissions', messyFilename);

      expect(path).not.toContain('#');
      expect(path).not.toContain('(');
      expect(path).not.toContain(')');
      expect(path).not.toContain('&');
      expect(path).not.toContain(' ');
      expect(path.endsWith('.jpg')).toBe(true);
    });
  });
});
