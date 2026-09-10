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

async function seedAuthUsers() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const adminClient = createClient(url, serviceKey);

  const usersToCreate = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      email: 'guru.nurul@vokid.sch.id',
      password: 'Vokid2026!',
      user_metadata: { full_name: 'Ibu Nurul Hidayah, S.Pd.', role: 'GURU' },
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      email: 'budi.kelas1@vokid.sch.id',
      password: 'Vokid2026!',
      user_metadata: { full_name: 'Budi Pratama', role: 'SISWA', grade_level: 1 },
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      email: 'sarah.kelas5@vokid.sch.id',
      password: 'Vokid2026!',
      user_metadata: { full_name: 'Sarah Rahmadani', role: 'SISWA', grade_level: 5 },
    },
  ];

  console.log('Membuat akun Supabase Auth...');
  for (const u of usersToCreate) {
    const { data, error } = await adminClient.auth.admin.createUser({
      id: u.id,
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: u.user_metadata,
    });

    if (error) {
      console.log(`Akun ${u.email}: ${error.message}`);
    } else {
      console.log(`✓ Berhasil membuat akun: ${u.email} (${data.user.id})`);
    }
  }

  // Uji sign in dengan anon client
  console.log('\nMenguji login via Supabase client...');
  const anonClient = createClient(url, anonKey);
  const { data: signData, error: signErr } = await anonClient.auth.signInWithPassword({
    email: 'budi.kelas1@vokid.sch.id',
    password: 'Vokid2026!',
  });

  if (signErr) {
    console.error('❌ Login Budi Gagal:', signErr.message);
  } else {
    console.log('🎉 Login Budi Berhasil! User ID:', signData.user.id);
  }
}

seedAuthUsers();
