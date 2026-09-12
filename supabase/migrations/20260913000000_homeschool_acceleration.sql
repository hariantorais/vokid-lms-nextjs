-- ==============================================================================
-- MIGRASI: Kurikulum Merdeka Fase A (SD Kelas 1 & 2)
-- Sesi Terkalibrasi: 70 Menit / Sesi
-- Struktur Resmi: Alur Tujuan Pembelajaran (ATP) & Jadwal Pembelajaran Terstruktur
-- ==============================================================================

-- 1. Perbarui Tabel modules (Target Semester & Pekan Pembelajaran Resmi)
ALTER TABLE public.modules
  ADD COLUMN IF NOT EXISTS target_semester INT DEFAULT 1 CHECK (target_semester IN (1, 2)),
  ADD COLUMN IF NOT EXISTS week_target INT CHECK (week_target BETWEEN 1 AND 36);

-- Jika kolom lama target_sprint_week sempat dibuat, migrasikan datanya dan hapus
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'modules' AND column_name = 'target_sprint_week'
  ) THEN
    UPDATE public.modules SET week_target = target_sprint_week WHERE week_target IS NULL;
    ALTER TABLE public.modules DROP COLUMN target_sprint_week;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'modules' AND column_name = 'is_essential'
  ) THEN
    ALTER TABLE public.modules DROP COLUMN is_essential;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_modules_week_target ON public.modules(target_semester, week_target);

-- 2. Perbarui Tabel lessons (Sintaks 70 Menit Terkalibrasi)
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS allocated_minutes INT DEFAULT 70,
  ADD COLUMN IF NOT EXISTS intro_guide JSONB,
  ADD COLUMN IF NOT EXISTS mindful_guide JSONB,
  ADD COLUMN IF NOT EXISTS joyful_guide JSONB,
  ADD COLUMN IF NOT EXISTS meaningful_guide JSONB,
  ADD COLUMN IF NOT EXISTS required_materials TEXT[];

-- 3. Standarisasi Tabel Jadwal Pembelajaran (lesson_schedules)
-- Jika daily_schedules sempat ada, ganti nama tabelnya
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'daily_schedules'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'lesson_schedules'
  ) THEN
    ALTER TABLE public.daily_schedules RENAME TO lesson_schedules;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.lesson_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  time_block TEXT NOT NULL CHECK (time_block IN ('PAGI', 'SIANG', 'SORE')),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'RESCHEDULED')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_student_lesson_date UNIQUE (student_id, lesson_id, scheduled_date)
);

CREATE INDEX IF NOT EXISTS idx_lesson_schedules_student_date ON public.lesson_schedules(student_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_lesson_schedules_lesson ON public.lesson_schedules(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_schedules_status ON public.lesson_schedules(status);

-- 4. Buat Tabel learning_competency_evaluations (Formatif Ketercapaian TP Rapor Resmi)
CREATE TABLE IF NOT EXISTS public.learning_competency_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  tp_indicator_text TEXT NOT NULL,
  mastery_level TEXT NOT NULL CHECK (mastery_level IN ('NEEDS_HELP', 'DEVELOPING', 'PROFICIENT')),
  notes TEXT,
  evaluated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_student_lesson_tp UNIQUE (student_id, lesson_id, tp_indicator_text)
);

CREATE INDEX IF NOT EXISTS idx_learning_eval_student ON public.learning_competency_evaluations(student_id);
CREATE INDEX IF NOT EXISTS idx_learning_eval_lesson ON public.learning_competency_evaluations(lesson_id);

-- 5. Konfigurasi Row Level Security (RLS)
ALTER TABLE public.lesson_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_competency_evaluations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  -- Policy lesson_schedules untuk Guru (Akses Penuh)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'lesson_schedules' AND policyname = 'Guru dapat mengelola seluruh jadwal harian'
  ) THEN
    CREATE POLICY "Guru dapat mengelola seluruh jadwal harian"
      ON public.lesson_schedules FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.id = auth.uid() AND profiles.role = 'GURU'
        )
      );
  END IF;

  -- Policy lesson_schedules untuk Siswa (Membaca jadwalnya sendiri)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'lesson_schedules' AND policyname = 'Siswa dapat membaca jadwalnya sendiri'
  ) THEN
    CREATE POLICY "Siswa dapat membaca jadwalnya sendiri"
      ON public.lesson_schedules FOR SELECT
      USING (auth.uid() = student_id);
  END IF;

  -- Policy learning_competency_evaluations untuk Guru (Akses Penuh)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'learning_competency_evaluations' AND policyname = 'Guru dapat mengelola evaluasi kompetensi siswa'
  ) THEN
    CREATE POLICY "Guru dapat mengelola evaluasi kompetensi siswa"
      ON public.learning_competency_evaluations FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE profiles.id = auth.uid() AND profiles.role = 'GURU'
        )
      );
  END IF;

  -- Policy learning_competency_evaluations untuk Siswa (Membaca hasil evaluasi sendiri)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'learning_competency_evaluations' AND policyname = 'Siswa dapat membaca evaluasi kompetensi sendiri'
  ) THEN
    CREATE POLICY "Siswa dapat membaca evaluasi kompetensi sendiri"
      ON public.learning_competency_evaluations FOR SELECT
      USING (auth.uid() = student_id);
  END IF;
END $$;

-- 6. Reload schema cache PostgREST agar Supabase Client langsung mengenali kolom baru
NOTIFY pgrst, 'reload schema';