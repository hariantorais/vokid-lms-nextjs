-- Migration: Add QUIZ_CBT to assignment_type and create quiz_questions table
ALTER TYPE public.assignment_type ADD VALUE IF NOT EXISTS 'QUIZ_CBT';

ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS quiz_question_count INT DEFAULT 5;
ALTER TABLE public.assignments ADD COLUMN IF NOT EXISTS passing_score NUMERIC(5, 2) DEFAULT 60.0;

CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_assignment_id ON public.quiz_questions(assignment_id);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'quiz_questions_select_all'
  ) THEN
    CREATE POLICY "quiz_questions_select_all" ON public.quiz_questions FOR SELECT TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'quiz_questions_teacher_all'
  ) THEN
    CREATE POLICY "quiz_questions_teacher_all" ON public.quiz_questions FOR ALL TO authenticated USING (public.is_teacher()) WITH CHECK (public.is_teacher());
  END IF;
END $$;
