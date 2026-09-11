import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

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

async function cleanDatabase() {
    loadEnv();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
        throw new Error('Kredensial Supabase belum lengkap di .env.local');
    }

    const supabase = createClient<Database>(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
    });

    console.log('================================================================');
    console.log('🧹 MEMBERSIHKAN DATABASE (MENYISAKAN USERS/PROFILES SAJA)');
    console.log('================================================================');

    // Cek jumlah profiles sebelum pembersihan untuk memastikan data user aman
    const { count: userCount, error: userErr } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    if (userErr) {
        console.error('Gagal membaca profiles:', userErr);
    } else {
        console.log(`👤 Jumlah profiles/users saat ini: ${userCount} akun (TETAP DIPERTAHANKAN)`);
    }

    // 1. Submissions
    console.log('Menghapus data submissions...');
    const { error: subErr } = await supabase
        .from('submissions')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    if (subErr) console.error('Error submissions:', subErr.message);
    else console.log('✅ Submissions berhasil dibersihkan');

    // 2. Assignments
    console.log('Menghapus data assignments...');
    const { error: assErr } = await supabase
        .from('assignments')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    if (assErr) console.error('Error assignments:', assErr.message);
    else console.log('✅ Assignments berhasil dibersihkan');

    // 3. Lessons
    console.log('Menghapus data lessons...');
    const { error: lesErr } = await supabase
        .from('lessons')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    if (lesErr) console.error('Error lessons:', lesErr.message);
    else console.log('✅ Lessons berhasil dibersihkan');

    // 4. Modules
    console.log('Menghapus data modules...');
    const { error: modErr } = await supabase
        .from('modules')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    if (modErr) console.error('Error modules:', modErr.message);
    else console.log('✅ Modules berhasil dibersihkan');

    // 5. Subjects
    console.log('Menghapus data subjects...');
    const { error: subjQueryErr } = await supabase
        .from('subjects')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    if (subjQueryErr) console.error('Error subjects:', subjQueryErr.message);
    else console.log('✅ Subjects berhasil dibersihkan');

    // 6. Classes
    console.log('Menghapus data classes...');
    const { error: classErr } = await supabase
        .from('classes')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
    if (classErr) console.error('Error classes:', classErr.message);
    else console.log('✅ Classes berhasil dibersihkan');

    // Verifikasi akhir
    const { count: finalUserCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

    const { count: finalClassCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });

    const { count: finalLessonCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true });

    console.log('================================================================');
    console.log('📊 STATUS AKHIR DATABASE:');
    console.log(`- Users / Profiles : ${finalUserCount} akun (Aman)`);
    console.log(`- Classes          : ${finalClassCount}`);
    console.log(`- Lessons          : ${finalLessonCount}`);
    console.log('✨ Pembersihan database selesai!');
    console.log('================================================================');
}

cleanDatabase().catch(err => {
    console.error('Terjadi kesalahan fatal saat membersihkan database:', err);
    process.exit(1);
});
