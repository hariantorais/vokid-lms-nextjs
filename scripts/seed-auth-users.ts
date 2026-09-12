import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

function loadEnv(): void {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim();
        }
      }
    }
  }
}

async function seedFamilyAuthUsers() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error('Kredensial NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum ada di .env.local');
    process.exit(1);
  }

  const adminClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const users = [
    // 1. GURU / ORANG TUA
    {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'harianto@vokid.sch.id',
      password: 'Password123!',
      full_name: 'Harianto Rais',
      role: 'GURU',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Harianto',
      grade_level: null,
    },
    // 2. SISWA 1: MARYAM (Target Kelas 3)
    {
      id: '22222222-2222-2222-2222-222222222222',
      email: 'maryam@vokid.sch.id',
      password: 'Password123!',
      full_name: 'Maryam',
      role: 'SISWA',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Maryam',
      grade_level: 3,
    },
    // 3. SISWA 2: ASIYAH (Target Kelas 2)
    {
      id: '33333333-3333-3333-3333-333333333333',
      email: 'asiyah@vokid.sch.id',
      password: 'Password123!',
      full_name: 'Asiyah',
      role: 'SISWA',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Asiyah',
      grade_level: 2,
    },
    // 4. SISWA 3: KHADIJAH (TK / Persiapan Kelas 1)
    {
      id: '44444444-4444-4444-4444-444444444444',
      email: 'khadijah@vokid.sch.id',
      password: 'Password123!',
      full_name: 'Khadijah',
      role: 'SISWA',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Khadijah',
      grade_level: 1, // Didaftarkan ke Grade 1 awal agar modul Fase A dasar bisa terbuka
    },
  ];

  console.log('================================================================');
  console.log('👨‍👩‍👧‍👧 MEMBUAT AKUN KELUARGA (AUTH.USERS & PUBLIC.PROFILES)');
  console.log('================================================================');

  for (const u of users) {
    // 1. Buat User di Auth
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      id: u.id,
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: {
        full_name: u.full_name,
        role: u.role,
        grade_level: u.grade_level,
      },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`ℹ️  Akun Auth ${u.email} sudah ada, memperbarui password & metadata...`);
        await adminClient.auth.admin.updateUserById(u.id, {
          password: u.password,
          user_metadata: {
            full_name: u.full_name,
            role: u.role,
            grade_level: u.grade_level,
          },
        });
      } else {
        console.error(`❌ Gagal membuat user auth ${u.email}:`, authError.message);
      }
    } else {
      console.log(`✓ Auth User dibuat: ${u.email} (ID: ${authData.user.id})`);
    }

    // 2. Pastikan Profil Terdaftar di public.profiles
    const { error: profileError } = await adminClient
      .from('profiles')
      .upsert({
        id: u.id,
        full_name: u.full_name,
        role: u.role as 'GURU' | 'SISWA' | 'ORANG_TUA',
        avatar_url: u.avatar_url,
      });

    if (profileError) {
      console.error(`❌ Gagal menyimpan profil ${u.full_name}:`, profileError.message);
    } else {
      console.log(`  └─ Profil tersimpan: ${u.full_name} [${u.role}]`);
    }
  }

  console.log('\n================================================================');
  console.log('🎉 SELURUH AKUN BERHASIL DIBUAT!');
  console.log('Semua password akun: Password123!');
  console.log('================================================================\n');
}

seedFamilyAuthUsers().catch((err) => {
  console.error('Terjadi kesalahan fatal:', err);
  process.exit(1);
});