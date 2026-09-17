import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { uploadFileToR2 } from '@/features/shared/services/storage-service';
import { getR2Client, getR2BucketName, getR2PublicDomain, resetR2Client } from '@/features/shared/services/r2-client';
import { POST } from '@/app/api/upload/route';

// Mock Supabase server client for auth check
let mockAuthUser: { id: string } | null = { id: 'test-user-id' };
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
  })),
}));

// Mock AWS SDK S3Client
const mockSend = vi.fn().mockResolvedValue({});
vi.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: class {
      send = mockSend;
    },
    PutObjectCommand: class {
      constructor(public input: unknown) {}
    },
  };
});

describe('Cloudflare R2 Storage Pipeline Unit Tests', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    resetR2Client();
    mockAuthUser = { id: 'test-user-id' };
    process.env.R2_ACCOUNT_ID = 'test-account-id';
    process.env.R2_ACCESS_KEY_ID = 'test-access-key';
    process.env.R2_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.R2_BUCKET_NAME = 'vokid-storage';
    process.env.R2_PUBLIC_DOMAIN = 'https://pub-test.r2.dev';
  });

  describe('lib/storage/r2.ts Client Configuration', () => {
    it('harus mengembalikan S3Client instance yang valid', () => {
      const client = getR2Client();
      expect(client).toBeDefined();
      expect(getR2BucketName()).toBe('vokid-storage');
      expect(getR2PublicDomain()).toBe('https://pub-test.r2.dev');
    });

    it('harus memotong trailing slash pada R2_PUBLIC_DOMAIN', () => {
      process.env.R2_PUBLIC_DOMAIN = 'https://pub-test.r2.dev///';
      expect(getR2PublicDomain()).toBe('https://pub-test.r2.dev');
    });

    it('harus menyediakan fallback aman dan tidak memicu unhandled runtime error saat kredensial kosong di build time', () => {
      delete process.env.R2_ACCOUNT_ID;
      delete process.env.R2_ACCESS_KEY_ID;
      delete process.env.R2_SECRET_ACCESS_KEY;
      delete process.env.R2_BUCKET_NAME;
      delete process.env.R2_PUBLIC_DOMAIN;

      resetR2Client();

      expect(() => getR2Client()).not.toThrow();
      expect(getR2BucketName()).toBe('vokid-storage');
      expect(getR2PublicDomain()).toBe('https://pub-vokid.r2.dev');
    });
  });

  describe('uploadFileToR2 Service', () => {
    it('harus menolak jika sub-folder tidak diizinkan', async () => {
      const res = await uploadFileToR2({
        folder: 'invalid-folder' as any,
        fileName: 'test.webm',
        fileBuffer: Buffer.from('dummy'),
        contentType: 'audio/webm',
      });

      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error).toContain('Sub-folder R2 tidak valid');
      }
    });

    it('harus berhasil mengunggah berkas ke R2 dan menghasilkan URL publik yang sesuai', async () => {
      const res = await uploadFileToR2({
        folder: 'submissions',
        fileName: 'rekaman audio siswa.webm',
        fileBuffer: Buffer.from('dummy-audio-content'),
        contentType: 'audio/webm',
      });

      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.key).toContain('submissions/');
        expect(res.data.key).toContain('rekaman_audio_siswa.webm');
        expect(res.data.publicUrl).toBe(`https://pub-test.r2.dev/${res.data.key}`);
      }
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('harus mendukung folder materials dan audio-prompts', async () => {
      const resMaterials = await uploadFileToR2({
        folder: 'materials',
        fileName: 'modul_baca.pdf',
        fileBuffer: Buffer.from('pdf-data'),
        contentType: 'application/pdf',
      });
      expect(resMaterials.success).toBe(true);

      const resAudio = await uploadFileToR2({
        folder: 'audio-prompts',
        fileName: 'panduan_guru.webm',
        fileBuffer: Buffer.from('audio-data'),
        contentType: 'audio/webm',
      });
      expect(resAudio.success).toBe(true);
    });
  });

  describe('app/api/upload/route.ts API Handler', () => {
    it('harus menolak request tanpa berkas file', async () => {
      const formData = new FormData();
      formData.append('folder', 'submissions');

      const req = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error).toContain('Berkas tidak ditemukan');
    });

    it('harus berhasil memproses upload multipart formData ke Cloudflare R2', async () => {
      const file = new File(['sample-voice-content'], 'tugas_suara.webm', { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', file, 'tugas_suara.webm');
      formData.append('fileName', 'tugas_suara.webm');
      formData.append('folder', 'submissions');

      const req = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.url).toContain('https://pub-test.r2.dev/submissions/tugas_suara.webm');
    });

    it('harus menolak request dengan status 401 saat di mode production tanpa sesi otentikasi pengguna', async () => {
      vi.stubEnv('NODE_ENV', 'production');
      mockAuthUser = null;

      const file = new File(['data'], 'test.webm', { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('file', file, 'test.webm');

      const req = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const res = await POST(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error).toMatch(/tidak diizinkan|login terlebih dahulu/i);

      vi.unstubAllEnvs();
      mockAuthUser = { id: 'test-user-id' };
    });
  });
});
