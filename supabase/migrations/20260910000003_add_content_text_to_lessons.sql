-- =====================================================================
-- VOKID LMS - ADD TEXT CONTENT & CONTENT_TEXT COLUMN TO LESSONS
-- Migration: Add content_text column and update content_type enum
-- =====================================================================

-- 1. Tambahkan nilai 'TEXT' ke enum content_type jika belum ada
ALTER TYPE public.content_type ADD VALUE IF NOT EXISTS 'TEXT';

-- 2. Tambahkan kolom content_text ke tabel lessons
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS content_text TEXT;

-- 3. Izinkan content_url menjadi NULL (karena format teks tidak memerlukan URL berkas/video)
ALTER TABLE public.lessons
  ALTER COLUMN content_url DROP NOT NULL;

-- 4. Muat ulang skema cache PostgREST agar kolom baru segera terdeteksi
NOTIFY pgrst, 'reload schema';
