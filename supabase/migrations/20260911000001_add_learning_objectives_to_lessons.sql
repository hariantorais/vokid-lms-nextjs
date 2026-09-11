-- =====================================================================
-- VOKID LMS - ADD LEARNING OBJECTIVES (TUJUAN PEMBELAJARAN) TO LESSONS
-- Migration: Menambahkan kolom learning_objectives pada tabel lessons
-- =====================================================================

-- 1. Tambahkan kolom learning_objectives ke tabel lessons
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS learning_objectives TEXT;

-- 2. Muat ulang cache skema PostgREST Supabase
NOTIFY pgrst, 'reload schema';
