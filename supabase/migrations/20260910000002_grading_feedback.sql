-- =====================================================================
-- VOKID LMS - GRADING & AUDIO FEEDBACK SCHEMA ENHANCEMENT
-- Domain: Primary School (SD Kelas 1-6) Kurikulum Merdeka
-- =====================================================================

ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS grade NUMERIC(5, 2),
  ADD COLUMN IF NOT EXISTS teacher_feedback_text TEXT,
  ADD COLUMN IF NOT EXISTS teacher_feedback_audio_url TEXT,
  ADD COLUMN IF NOT EXISTS graded_at TIMESTAMPTZ;

-- Sync existing columns
UPDATE public.submissions SET grade = score WHERE grade IS NULL AND score IS NOT NULL;
UPDATE public.submissions SET teacher_feedback_text = teacher_feedback WHERE teacher_feedback_text IS NULL AND teacher_feedback IS NOT NULL;
