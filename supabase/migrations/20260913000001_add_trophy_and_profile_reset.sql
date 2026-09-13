-- ==============================================================================
-- 1. TAMBAH KOLOM GELAR & TIER TROFI PADA TABEL PROFILES
-- ==============================================================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS equipped_title text NOT NULL DEFAULT 'Petualang Baru',
ADD COLUMN IF NOT EXISTS equipped_badge_icon text NOT NULL DEFAULT '🌱',
ADD COLUMN IF NOT EXISTS equipped_trophy_tier text NOT NULL DEFAULT 'NONE';

-- Berikan constraint agar equipped_trophy_tier hanya menerima nilai tier valid
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS check_equipped_trophy_tier;

ALTER TABLE public.profiles
ADD CONSTRAINT check_equipped_trophy_tier 
CHECK (equipped_trophy_tier IN ('NONE', 'BRONZE', 'SILVER', 'GOLD', 'DIAMOND'));

-- ==============================================================================
-- 2. BACKFILL DATA LAMA (JIKA ADA PROFIL DENGAN NILAI NULL)
-- ==============================================================================
UPDATE public.profiles
SET 
  equipped_title = COALESCE(equipped_title, 'Petualang Baru'),
  equipped_badge_icon = COALESCE(equipped_badge_icon, '🌱'),
  equipped_trophy_tier = COALESCE(equipped_trophy_tier, 'NONE')
WHERE 
  equipped_title IS NULL 
  OR equipped_badge_icon IS NULL 
  OR equipped_trophy_tier IS NULL;

-- ==============================================================================
-- 3. UPDATE / BUAT FUNGSI RESET PROGRES SISWA (ONE-CLICK CLEAN RESET)
-- ==============================================================================
-- Fungsi ini akan menghapus pos materi, kuis/tugas, streak, dan mengembalikan
-- gelar & bingkai cincin avatar ke setelan awal (NONE & Petualang Baru).
CREATE OR REPLACE FUNCTION public.reset_student_progress(target_student_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 1. Hapus riwayat penyelesaian pos materi
  DELETE FROM public.lesson_completions
  WHERE student_id = target_student_id;

  -- 2. Hapus riwayat pengumpulan tugas & evaluasi
  DELETE FROM public.submissions
  WHERE student_id = target_student_id;

  -- 3. Reset gelar, ikon badge, dan cincin avatar profil kembali ke default
  UPDATE public.profiles
  SET 
    equipped_title = 'Petualang Baru',
    equipped_badge_icon = '🌱',
    equipped_trophy_tier = 'NONE',
    updated_at = timezone('utc'::text, now())
  WHERE id = target_student_id;
END;
$$;

-- Berikan izin akses eksekusi fungsi ke pengguna terautentikasi (authenticated)
GRANT EXECUTE ON FUNCTION public.reset_student_progress(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_student_progress(uuid) TO service_role;

-- ==============================================================================
-- 4. UPDATE TRIGGER OTOMATIS SAAT USER BARU MENDAFTAR (HANDLE NEW USER)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    role,
    avatar_url,
    equipped_title,
    equipped_badge_icon,
    equipped_trophy_tier,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Petualang Baru'),
    COALESCE(new.raw_user_meta_data->>'role', 'STUDENT'),
    new.raw_user_meta_data->>'avatar_url',
    'Petualang Baru',
    '🌱',
    'NONE',
    timezone('utc'::text, now()),
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE
  SET
    equipped_title = EXCLUDED.equipped_title,
    equipped_badge_icon = EXCLUDED.equipped_badge_icon,
    equipped_trophy_tier = EXCLUDED.equipped_trophy_tier;

  RETURN new;
END;
$$;