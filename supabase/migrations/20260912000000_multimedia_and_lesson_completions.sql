-- 1. Tambah nilai MULTIMEDIA ke enum content_type
ALTER TYPE public.content_type ADD VALUE IF NOT EXISTS 'MULTIMEDIA';

-- 2. Tambah kolom multimedia ke tabel lessons
ALTER TABLE public.lessons 
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS audio_url TEXT,
  ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- 3. Buat tabel lesson_completions
CREATE TABLE IF NOT EXISTS public.lesson_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_lesson_student UNIQUE(lesson_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_completions_student ON public.lesson_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_lesson_completions_lesson ON public.lesson_completions(lesson_id);

-- 4. Aktifkan RLS
ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'lesson_completions' AND policyname = 'Siswa dapat membaca data penyelesaian materi sendiri'
  ) THEN
    CREATE POLICY "Siswa dapat membaca data penyelesaian materi sendiri"
      ON public.lesson_completions FOR SELECT
      USING (auth.uid() = student_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'lesson_completions' AND policyname = 'Siswa dapat mencatat materi yang telah dipelajari'
  ) THEN
    CREATE POLICY "Siswa dapat mencatat materi yang telah dipelajari"
      ON public.lesson_completions FOR INSERT
      WITH CHECK (auth.uid() = student_id);
  END IF;
END $$;

-- 5. Reload schema cache PostgREST
NOTIFY pgrst, 'reload schema';