-- =====================================================================
-- VOKID LMS - STORAGE BUCKETS & STORAGE RLS POLICIES MIGRATION
-- Domain: Primary School (SD Kelas 1-6) Kurikulum Merdeka
-- =====================================================================

-- 1. REGISTER STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'learning-materials',
    'learning-materials',
    true,
    20971520, -- 20MB
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'video/mp4']
  ),
  (
    'audio-prompts',
    'audio-prompts',
    true,
    10485760, -- 10MB
    ARRAY['audio/webm', 'audio/mp4', 'audio/mpeg']
  ),
  (
    'homework-submissions',
    'homework-submissions',
    false,
    15728640, -- 15MB
    ARRAY['audio/webm', 'audio/mp4', 'audio/mpeg', 'image/jpeg', 'image/png']
  )
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. STORAGE OBJECTS RLS POLICIES

-- 2.1 Learning Materials & Audio Prompts (Publicly Readable by Authenticated Users, Managed by Guru)
CREATE POLICY "public_media_select_authenticated"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id IN ('learning-materials', 'audio-prompts')
);

CREATE POLICY "public_media_teacher_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('learning-materials', 'audio-prompts')
  AND public.is_teacher()
);

CREATE POLICY "public_media_teacher_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('learning-materials', 'audio-prompts')
  AND public.is_teacher()
)
WITH CHECK (
  bucket_id IN ('learning-materials', 'audio-prompts')
  AND public.is_teacher()
);

CREATE POLICY "public_media_teacher_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id IN ('learning-materials', 'audio-prompts')
  AND public.is_teacher()
);

-- 2.2 Homework Submissions (Private / Student-Isolated & Teacher Accessible)
-- Siswa hanya bisa upload ke folder miliknya: (storage.foldername(name))[1] = auth.uid()::text
CREATE POLICY "submissions_student_insert_own"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'homework-submissions'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Siswa hanya bisa membaca miliknya sendiri, Guru bisa membaca seluruh tugas siswa
CREATE POLICY "submissions_select_owner_or_teacher"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'homework-submissions'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_teacher()
  )
);

-- Siswa bisa menghapus draft tugas miliknya, atau Guru
CREATE POLICY "submissions_delete_owner_or_teacher"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'homework-submissions'
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_teacher()
  )
);
