-- =====================================================================
-- VOKID LMS - DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) MIGRATION
-- Domain: Primary School (SD Kelas 1-6) Kurikulum Merdeka
-- =====================================================================

-- 1. ENUMS
CREATE TYPE public.user_role AS ENUM ('GURU', 'SISWA', 'ORANG_TUA');
CREATE TYPE public.content_type AS ENUM ('VIDEO', 'PDF', 'AUDIO');
CREATE TYPE public.assignment_type AS ENUM ('VOICE_TASK', 'PHOTO_HOMEWORK');
CREATE TYPE public.submission_status AS ENUM ('PENDING', 'GRADED');

-- 2. TABLES

-- Profiles (Linked to auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role public.user_role NOT NULL DEFAULT 'SISWA',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Classes (Kelas 1 s.d. 6 SD)
CREATE TABLE public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_level INT NOT NULL CHECK (grade_level >= 1 AND grade_level <= 6),
    name VARCHAR(100) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subjects (Mata Pelajaran: e.g., Bahasa Indonesia, IPAS, Matematika)
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Modules (Modul Pembelajaran Kurikulum Merdeka)
CREATE TABLE public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lessons (Materi Pelajaran: Video, PDF, Audio)
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content_type public.content_type NOT NULL,
    content_url TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assignments (Penugasan Siswa: Voice Task / Photo Homework)
CREATE TABLE public.assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    type public.assignment_type NOT NULL,
    prompt TEXT NOT NULL,
    instruction_audio_url TEXT,
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Submissions (Pengumpulan Tugas Siswa)
CREATE TABLE public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    score NUMERIC(5, 2),
    teacher_feedback TEXT,
    status public.submission_status NOT NULL DEFAULT 'PENDING',
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. INDEXES FOR PERFORMANCE
CREATE INDEX idx_classes_grade_level ON public.classes(grade_level);
CREATE INDEX idx_subjects_class_id ON public.subjects(class_id);
CREATE INDEX idx_modules_subject_id ON public.modules(subject_id);
CREATE INDEX idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX idx_assignments_lesson_id ON public.assignments(lesson_id);
CREATE INDEX idx_submissions_assignment_id ON public.submissions(assignment_id);
CREATE INDEX idx_submissions_student_id ON public.submissions(student_id);

-- 4. ROW LEVEL SECURITY (RLS) ACTIVATION
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 5. HELPER SECURITY DEFINER FUNCTION FOR ROLE CHECKING
-- Avoids recursive RLS evaluation when checking teacher privileges
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'GURU'
  );
$$;

-- 6. RLS POLICIES

-- 6.1 Profiles Policies
-- Pengguna hanya boleh membaca profilnya sendiri dan sesama anggota sekolah/kelas; pengguna hanya bisa update profil miliknya sendiri
CREATE POLICY "profiles_select_policy"
ON public.profiles FOR SELECT
TO authenticated
USING (
    id = auth.uid() OR public.is_teacher()
);

CREATE POLICY "profiles_insert_own"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 6.2 Classes Policies
-- Akses baca terbuka untuk user yang terautentikasi (authenticated);
-- Akses manipulasi (INSERT, UPDATE, DELETE) hanya diizinkan untuk user dengan role 'GURU'.
CREATE POLICY "classes_select_authenticated"
ON public.classes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "classes_teacher_insert"
ON public.classes FOR INSERT
TO authenticated
WITH CHECK (public.is_teacher());

CREATE POLICY "classes_teacher_update"
ON public.classes FOR UPDATE
TO authenticated
USING (public.is_teacher())
WITH CHECK (public.is_teacher());

CREATE POLICY "classes_teacher_delete"
ON public.classes FOR DELETE
TO authenticated
USING (public.is_teacher());

-- 6.3 Subjects Policies
CREATE POLICY "subjects_select_authenticated"
ON public.subjects FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "subjects_teacher_insert"
ON public.subjects FOR INSERT
TO authenticated
WITH CHECK (public.is_teacher());

CREATE POLICY "subjects_teacher_update"
ON public.subjects FOR UPDATE
TO authenticated
USING (public.is_teacher())
WITH CHECK (public.is_teacher());

CREATE POLICY "subjects_teacher_delete"
ON public.subjects FOR DELETE
TO authenticated
USING (public.is_teacher());

-- 6.4 Modules Policies
CREATE POLICY "modules_select_authenticated"
ON public.modules FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "modules_teacher_insert"
ON public.modules FOR INSERT
TO authenticated
WITH CHECK (public.is_teacher());

CREATE POLICY "modules_teacher_update"
ON public.modules FOR UPDATE
TO authenticated
USING (public.is_teacher())
WITH CHECK (public.is_teacher());

CREATE POLICY "modules_teacher_delete"
ON public.modules FOR DELETE
TO authenticated
USING (public.is_teacher());

-- 6.5 Lessons Policies
CREATE POLICY "lessons_select_authenticated"
ON public.lessons FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "lessons_teacher_insert"
ON public.lessons FOR INSERT
TO authenticated
WITH CHECK (public.is_teacher());

CREATE POLICY "lessons_teacher_update"
ON public.lessons FOR UPDATE
TO authenticated
USING (public.is_teacher())
WITH CHECK (public.is_teacher());

CREATE POLICY "lessons_teacher_delete"
ON public.lessons FOR DELETE
TO authenticated
USING (public.is_teacher());

-- 6.6 Assignments Policies
CREATE POLICY "assignments_select_authenticated"
ON public.assignments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "assignments_teacher_insert"
ON public.assignments FOR INSERT
TO authenticated
WITH CHECK (public.is_teacher());

CREATE POLICY "assignments_teacher_update"
ON public.assignments FOR UPDATE
TO authenticated
USING (public.is_teacher())
WITH CHECK (public.is_teacher());

CREATE POLICY "assignments_teacher_delete"
ON public.assignments FOR DELETE
TO authenticated
USING (public.is_teacher());

-- 6.7 Submissions Policies
-- Siswa hanya diizinkan melakukan INSERT dan SELECT pada tugas miliknya sendiri (student_id = auth.uid()).
-- Guru diizinkan melakukan SELECT dan UPDATE (memberi nilai/feedback) untuk seluruh submission.
CREATE POLICY "submissions_student_select_own"
ON public.submissions FOR SELECT
TO authenticated
USING (
    student_id = auth.uid() OR public.is_teacher()
);

CREATE POLICY "submissions_student_insert_own"
ON public.submissions FOR INSERT
TO authenticated
WITH CHECK (
    student_id = auth.uid()
);

CREATE POLICY "submissions_teacher_update_grade"
ON public.submissions FOR UPDATE
TO authenticated
USING (public.is_teacher())
WITH CHECK (public.is_teacher());

CREATE POLICY "submissions_teacher_delete"
ON public.submissions FOR DELETE
TO authenticated
USING (public.is_teacher());
