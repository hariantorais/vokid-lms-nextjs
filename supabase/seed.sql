-- =====================================================================
-- VOKID LMS - SEED DATA
-- Domain: Primary School (SD Kelas 1-6) Kurikulum Merdeka
-- =====================================================================

-- Clean existing seed data in reverse dependency order (optional/idempotent)
DELETE FROM public.submissions WHERE file_url LIKE '%vokid-seed%';
DELETE FROM public.assignments WHERE prompt LIKE '%vokid-seed%';
DELETE FROM public.lessons WHERE content_url LIKE '%vokid-seed%';
DELETE FROM public.modules WHERE title LIKE '%[Seed]%';
DELETE FROM public.subjects WHERE code IN ('BIND-1', 'IPAS-5');
DELETE FROM public.classes WHERE name LIKE '%[Seed]%';

-- Fixed UUIDs for predictable testing and verification
-- Guru: 11111111-1111-1111-1111-111111111111
-- Siswa Fase A (Kelas 1): 22222222-2222-2222-2222-222222222222
-- Siswa Fase C (Kelas 5): 33333333-3333-3333-3333-333333333333

-- 1. SEED AUTH USERS (Idempotent insert into Supabase auth schema if available)
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
)
VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'guru.nurul@vokid.sch.id',
        '$2a$10$wEkgvjCjG0wBup05J/0p6O5o.3Ff03vT02j0fI5eD99.rW9v0.o1G',
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Ibu Nurul Hidayah, S.Pd.","role":"GURU"}',
        now(),
        now()
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'budi.kelas1@vokid.sch.id',
        '$2a$10$wEkgvjCjG0wBup05J/0p6O5o.3Ff03vT02j0fI5eD99.rW9v0.o1G',
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Budi Pratama","role":"SISWA","grade_level":1}',
        now(),
        now()
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'sarah.kelas5@vokid.sch.id',
        '$2a$10$wEkgvjCjG0wBup05J/0p6O5o.3Ff03vT02j0fI5eD99.rW9v0.o1G',
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Sarah Rahmadani","role":"SISWA","grade_level":5}',
        now(),
        now()
    )
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PROFILES
INSERT INTO public.profiles (id, full_name, role, avatar_url, created_at)
VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        'Ibu Nurul Hidayah, S.Pd.',
        'GURU',
        'https://api.dicebear.com/7.x/bottts/svg?seed=guru_nurul',
        now()
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        'Budi Pratama',
        'SISWA',
        'https://api.dicebear.com/7.x/fun-emoji/svg?seed=budi_kelas1',
        now()
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        'Sarah Rahmadani',
        'SISWA',
        'https://api.dicebear.com/7.x/fun-emoji/svg?seed=sarah_kelas5',
        now()
    )
ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    avatar_url = EXCLUDED.avatar_url;

-- 3. SEED KELAS 1 SD (FASE A: AUDIO-FIRST & TARGET RAMAH ANAK)
INSERT INTO public.classes (id, grade_level, name, academic_year, created_by)
VALUES (
    'aaaaaaaa-1111-0000-0000-000000000001',
    1,
    'Kelas 1-A Amanah [Seed]',
    '2026/2027',
    '11111111-1111-1111-1111-111111111111'
)
ON CONFLICT (id) DO NOTHING;

-- Mata Pelajaran: Bahasa Indonesia Kelas 1
INSERT INTO public.subjects (id, class_id, name, code)
VALUES (
    'bbbbbbbb-1111-0000-0000-000000000001',
    'aaaaaaaa-1111-0000-0000-000000000001',
    'Bahasa Indonesia',
    'BIND-1'
)
ON CONFLICT (id) DO NOTHING;

-- Modul: Membaca Suku Kata
INSERT INTO public.modules (id, subject_id, title, order_index, is_published)
VALUES (
    'cccccccc-1111-0000-0000-000000000001',
    'bbbbbbbb-1111-0000-0000-000000000001',
    'Membaca Suku Kata [Seed]',
    1,
    true
)
ON CONFLICT (id) DO NOTHING;

-- Lesson: AUDIO Fonik
INSERT INTO public.lessons (id, module_id, title, content_type, content_url, order_index)
VALUES (
    'dddddddd-1111-0000-0000-000000000001',
    'cccccccc-1111-0000-0000-000000000001',
    'Pengenalan Fonik Suku Kata Ba-Bi-Bu',
    'AUDIO',
    'https://storage.googleapis.com/vokid-cdn/audio/vokid-seed-ba-bi-bu.mp3',
    1
)
ON CONFLICT (id) DO NOTHING;

-- Assignment: VOICE_TASK
INSERT INTO public.assignments (id, lesson_id, type, prompt, instruction_audio_url, due_date)
VALUES (
    'eeeeeeee-1111-0000-0000-000000000001',
    'dddddddd-1111-0000-0000-000000000001',
    'VOICE_TASK',
    'Tekan tombol mikrofon besar, lalu ucapkan kalimat: "Buku Budi Baru" dengan lantang [vokid-seed]',
    'https://storage.googleapis.com/vokid-cdn/audio/vokid-seed-instruksi-tugas1.mp3',
    now() + INTERVAL '7 days'
)
ON CONFLICT (id) DO NOTHING;

-- Submission Awal Siswa Kelas 1
INSERT INTO public.submissions (id, assignment_id, student_id, file_url, score, teacher_feedback, status, submitted_at)
VALUES (
    'ffffffff-1111-0000-0000-000000000001',
    'eeeeeeee-1111-0000-0000-000000000001',
    '22222222-2222-2222-2222-222222222222',
    'https://storage.googleapis.com/vokid-cdn/submissions/vokid-seed-audio-budi.webm',
    95.00,
    'Hebat sekali Budi! Pengucapan huruf B dan vokal sangat jelas dan percaya diri.',
    'GRADED',
    now() - INTERVAL '1 hour'
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED KELAS 5 SD (FASE C: MODULAR & PENALARAN KRITIS)
INSERT INTO public.classes (id, grade_level, name, academic_year, created_by)
VALUES (
    'aaaaaaaa-5555-0000-0000-000000000005',
    5,
    'Kelas 5-B Cendekia [Seed]',
    '2026/2027',
    '11111111-1111-1111-1111-111111111111'
)
ON CONFLICT (id) DO NOTHING;

-- Mata Pelajaran: IPAS Kelas 5
INSERT INTO public.subjects (id, class_id, name, code)
VALUES (
    'bbbbbbbb-5555-0000-0000-000000000005',
    'aaaaaaaa-5555-0000-0000-000000000005',
    'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    'IPAS-5'
)
ON CONFLICT (id) DO NOTHING;

-- Modul: Sistem Pencernaan
INSERT INTO public.modules (id, subject_id, title, order_index, is_published)
VALUES (
    'cccccccc-5555-0000-0000-000000000005',
    'bbbbbbbb-5555-0000-0000-000000000005',
    'Sistem Pencernaan [Seed]',
    1,
    true
)
ON CONFLICT (id) DO NOTHING;

-- Lesson: PDF Materi Pencernaan
INSERT INTO public.lessons (id, module_id, title, content_type, content_url, order_index)
VALUES (
    'dddddddd-5555-0000-0000-000000000005',
    'cccccccc-5555-0000-0000-000000000005',
    'Organ dan Mekanisme Sistem Pencernaan Manusia',
    'PDF',
    'https://storage.googleapis.com/vokid-cdn/docs/vokid-seed-sistem-pencernaan.pdf',
    1
)
ON CONFLICT (id) DO NOTHING;

-- Assignment: PHOTO_HOMEWORK
INSERT INTO public.assignments (id, lesson_id, type, prompt, instruction_audio_url, due_date)
VALUES (
    'eeeeeeee-5555-0000-0000-000000000005',
    'dddddddd-5555-0000-0000-000000000005',
    'PHOTO_HOMEWORK',
    'Gambarkan bagan sistem organ pencernaan manusia di buku gambarmu, beri label lengkap, lalu foto dan unggah di sini [vokid-seed]',
    NULL,
    now() + INTERVAL '5 days'
)
ON CONFLICT (id) DO NOTHING;

-- Submission Awal Siswa Kelas 5 (Pending Review Guru)
INSERT INTO public.submissions (id, assignment_id, student_id, file_url, score, teacher_feedback, status, submitted_at)
VALUES (
    'ffffffff-5555-0000-0000-000000000005',
    'eeeeeeee-5555-0000-0000-000000000005',
    '33333333-3333-3333-3333-333333333333',
    'https://storage.googleapis.com/vokid-cdn/submissions/vokid-seed-foto-sarah-pencernaan.jpg',
    NULL,
    NULL,
    'PENDING',
    now() - INTERVAL '30 minutes'
)
ON CONFLICT (id) DO NOTHING;
