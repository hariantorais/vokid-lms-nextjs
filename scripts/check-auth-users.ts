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

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const adminClient = createClient(url, serviceKey);
  const { data: list, error: listErr } = await adminClient.auth.admin.listUsers();
  console.log('List users:', list?.users.map(u => ({ id: u.id, email: u.email, identities: u.identities?.length })));

  // Try signing in via anon client
  const anonClient = createClient(url, anonKey);
  const { data: signData, error: signErr } = await anonClient.auth.signInWithPassword({
    email: 'budi.kelas1@vokid.sch.id',
    password: 'Vokid2026!'
  });
  console.log('Sign in budi:', { user: signData?.user?.id, error: signErr?.message });
}

main();
