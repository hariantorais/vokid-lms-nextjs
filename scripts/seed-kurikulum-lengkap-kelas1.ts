import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { Database, UserRole } from '../types/database';

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

interface SeedUserDef {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatarUrl: string;
}

const DEFAULT_PASSWORD = 'Password123!';

const SEED_USERS: SeedUserDef[] = [
    // Akun Guru
    {
        id: '11111111-1111-1111-1111-111111111111',
        email: 'harianto@vokid.sch.id',
        fullName: 'Harianto, S.Kom.',
        role: 'GURU',
        avatarUrl: '👨‍🏫',
    },
    {
        id: '11111111-1111-1111-1111-111111111112',
        email: 'marian@vokid.sch.id',
        fullName: 'Marian Febriyola, S.AP.',
        role: 'GURU',
        avatarUrl: '👩‍🏫',
    },
    // Akun Siswa
    {
        id: '22222222-2222-2222-2222-222222222222',
        email: 'maryam@vokid.sch.id',
        fullName: 'Maryam Petualang Cilik',
        role: 'SISWA',
        avatarUrl: '🦁',
    },
    {
        id: '22222222-2222-2222-2222-222222222223',
        email: 'asiyah@vokid.sch.id',
        fullName: 'Asiyah Sahabat Belajar',
        role: 'SISWA',
        avatarUrl: '🦄',
    },
    {
        id: '22222222-2222-2222-2222-222222222224',
        email: 'khadijah@vokid.sch.id',
        fullName: 'Khadijah Bintang Ceria',
        role: 'SISWA',
        avatarUrl: '🐨',
    },
];

async function runCleanAndSeed() {
    loadEnv();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey) {
        throw new Error('Kredensial Supabase belum lengkap di .env.local');
    }

    // Gunakan service_role untuk hak akses auth admin dan bypass RLS
    const supabase = createClient<Database>(supabaseUrl, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });

    console.log('================================================================');
    console.log('👤 1. MEMASTIKAN AKUN USER (AUTH & PROFILES) TERSEDIA');
    console.log('================================================================');

    for (const userDef of SEED_USERS) {
        // 1. Cek / Buat di auth.users lewat Admin API
        const { data: existingUser } = await supabase.auth.admin.getUserById(userDef.id);

        if (!existingUser?.user) {
            const { data: createdAuth, error: errCreateAuth } = await supabase.auth.admin.createUser({
                id: userDef.id,
                email: userDef.email,
                password: DEFAULT_PASSWORD,
                email_confirm: true,
                user_metadata: {
                    full_name: userDef.fullName,
                    role: userDef.role,
                },
            });

            if (errCreateAuth) {
                console.warn(`  ⚠ Catatan Auth [${userDef.email}]: ${errCreateAuth.message}`);
            } else {
                console.log(`  ✓ Akun Auth Dibuat: ${userDef.email} (ID: ${createdAuth.user.id})`);
            }
        } else {
            console.log(`  ✓ Akun Auth Ada: ${userDef.email}`);
        }

        // 2. Pastikan terdaftar di public.profiles
        const { error: errProfile } = await supabase.from('profiles').upsert(
            {
                id: userDef.id,
                full_name: userDef.fullName,
                role: userDef.role,
                avatar_url: userDef.avatarUrl,
            },
            { onConflict: 'id' }
        );

        if (errProfile) {
            console.warn(`  ⚠ Profil error [${userDef.fullName}]: ${errProfile.message}`);
        } else {
            console.log(`    └─ Profil Sinkron: ${userDef.fullName} [${userDef.role}]`);
        }
    }

    console.log('\n================================================================');
    console.log('🧹 2. MEMBERSIHKAN DATA KURIKULUM & RESET BINTANG SISWA');
    console.log('================================================================');

    // Bersihkan data transaksi secara bertingkat
    await supabase.from('submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('lesson_completions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('quiz_questions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('assignments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('lessons').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('modules').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('✓ Seluruh data transaksi, kuis, tugas, dan materi dibersihkan.');
    console.log('✓ Poin bintang seluruh siswa ter-reset menjadi 0.');

    console.log('\n================================================================');
    console.log('🏫 3. MEMBUAT KELAS 1 SD & MATA PELAJARAN UTAMA');
    console.log('================================================================');

    const classId = 'aaaaaaaa-1111-0000-0000-000000000001';
    const teacherId = SEED_USERS[0].id; // Harianto, S.Kom.

    await supabase.from('classes').upsert({
        id: classId,
        name: 'Kelas 1 SD Tematik Ceria',
        grade_level: 1,
        academic_year: '2026/2027',
        created_by: teacherId,
    });
    console.log(`✓ Kelas Terdaftar: Kelas 1 SD Tematik Ceria (${classId})`);

    const subjectId = 'bbbbbbbb-1111-0000-0000-000000000001';
    await supabase.from('subjects').upsert({
        id: subjectId,
        class_id: classId,
        name: 'Matematika & Literasi Petualang',
        code: 'MTK-LIT-1',
    });
    console.log(`✓ Mapel Terdaftar: Matematika & Literasi Petualang (${subjectId})`);

    console.log('\n================================================================');
    console.log('📚 4. MEMBUAT 8 BAB x 10 MATERI x 2 TUGAS LENGKAP');
    console.log('================================================================');

    const babMeta = [
        { title: 'Ayo Mengenal Bilangan 1 sampai 10', tema: 'Membilang Bilangan' },
        { title: 'Penjumlahan Bilangan sampai dengan 10', tema: 'Menghitung Gabungan Benda' },
        { title: 'Pengurangan Bilangan sampai dengan 10', tema: 'Sisa Benda & Menghitung Mundur' },
        { title: 'Mengenal Bentuk Geometri dan Bangun Ruang', tema: 'Bentuk Bangun Datar' },
        { title: 'Ayo Membilang sampai dengan 20', tema: 'Puluhan dan Satuan' },
        { title: 'Membandingkan dan Mengukur Benda', tema: 'Pengukuran Panjang & Berat' },
        { title: 'Mengenal Pola Gambar dan Pola Bilangan', tema: 'Logika Urutan Pola' },
        { title: 'Penyajian Data Sederhana dan Evaluasi', tema: 'Diagram & Evaluasi Akhir' },
    ];

    const sampleImages = [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=900&auto=format&fit=crop&q=80',
    ];

    for (let b = 0; b < babMeta.length; b++) {
        const babIndex = b + 1;
        const moduleId = `cccccccc-${String(babIndex).padStart(4, '0')}-0000-0000-000000000000`;

        await supabase.from('modules').upsert({
            id: moduleId,
            subject_id: subjectId,
            title: `Bab ${babIndex}: ${babMeta[b].title}`,
            order_index: babIndex,
            is_published: true,
        });

        console.log(`\n▶ [Bab ${babIndex}/8] Bab ${babIndex}: ${babMeta[b].title}`);

        for (let m = 1; m <= 10; m++) {
            const lessonIndexStr = String(b * 10 + m).padStart(4, '0');
            const lessonId = `dddddddd-${lessonIndexStr}-0000-0000-000000000000`;
            const selectedImg = sampleImages[(b + m) % sampleImages.length];

            // 1. Buat Materi Multimedia Terpadu
            await supabase.from('lessons').upsert({
                id: lessonId,
                module_id: moduleId,
                title: `Pos ${m}: Belajar ${babMeta[b].tema} - Bagian ${m}`,
                order_index: m,
                content_type: 'MULTIMEDIA',
                learning_objectives: `Siswa mampu memahami konsep ${babMeta[b].tema} bagian ${m} secara konkret dan mandiri.`,
                content_text: `Halo Petualang Cilik! 🌟\n\nSelamat datang di Pos Belajar ke-${m} pada Bab ${babIndex}.\n\nAmati gambar di atas dengan saksama, dengarkan penjelasan suara Guru, dan tonton video panduannya.\n\nJika kamu sudah selesai mempelajari materi ini, silakan tekan tombol **"Saya Sudah Mempelajari Materi"** di bawah agar misi tugas pos ini terbuka ya!`,
                image_url: selectedImg,
                audio_url: 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
                content_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            });

            // 2. Tugas 1: Upload Foto Pekerjaan PR
            const asgPhotoId = `eeeeeeee-${lessonIndexStr}-0000-0000-000000000001`;
            await supabase.from('assignments').upsert({
                id: asgPhotoId,
                lesson_id: lessonId,
                type: 'PHOTO_HOMEWORK',
                prompt: `Buka buku latihanmu pada latihan Pos ${m}. Kerjakan soal nomor 1 sampai 3 dengan rapi, lalu foto buku latihanmu dan kirimkan fotonya di sini ya!`,
            });

            // 3. Tugas 2: Kuis CBT Pilihan Ganda
            const asgQuizId = `eeeeeeee-${lessonIndexStr}-0000-0000-000000000002`;
            await supabase.from('assignments').upsert({
                id: asgQuizId,
                lesson_id: lessonId,
                type: 'QUIZ_CBT',
                prompt: `Kuis Uji Pemahaman Pos ${m}`,
                quiz_question_count: 2,
                passing_score: 70,
            });

            // 4. Masukkan Butir Soal Kuis
            const q1Id = `ffffffff-${lessonIndexStr}-0000-0000-000000000001`;
            const q2Id = `ffffffff-${lessonIndexStr}-0000-0000-000000000002`;

            await supabase.from('quiz_questions').upsert([
                {
                    id: q1Id,
                    assignment_id: asgQuizId,
                    question_text: `Pertanyaan Pos ${m}: Manakah jawaban yang paling tepat mengenai ${babMeta[b].tema}?`,
                    option_a: 'Pilihan A (Benar)',
                    option_b: 'Pilihan B',
                    option_c: 'Pilihan C',
                    option_d: 'Pilihan D',
                    correct_answer: 'A',
                    explanation: `Pilihan A adalah jawaban yang benar sesuai pembahasan materi Pos ${m}.`,
                    order_index: 1,
                },
                {
                    id: q2Id,
                    assignment_id: asgQuizId,
                    question_text: `Berapakah hasil dari ${m} ditambah 1?`,
                    option_a: `${m}`,
                    option_b: `${m + 1} (Benar)`,
                    option_c: `${m + 2}`,
                    option_d: `${m + 3}`,
                    correct_answer: 'B',
                    explanation: `${m} ditambah 1 sama dengan ${m + 1}.`,
                    order_index: 2,
                },
            ]);
        }

        console.log(`  ✓ 10 Materi Multimedia & 20 Tugas terpasang di Bab ${babIndex}`);
    }

    console.log('\n================================================================');
    console.log('🎉 ALL-IN-ONE SEEDING SELESAI!');
    console.log('================================================================');
    console.log('Akun Guru:');
    console.log('  1. harianto@vokid.sch.id (Password: Password123!)');
    console.log('  2. marian@vokid.sch.id   (Password: Password123!)');
    console.log('Akun Siswa:');
    console.log('  1. maryam@vokid.sch.id   (Password: Password123!)');
    console.log('  2. asiyah@vokid.sch.id   (Password: Password123!)');
    console.log('  3. khadijah@vokid.sch.id (Password: Password123!)');
    console.log('Total Bab: 8 | Total Materi: 80 | Total Tugas: 160 | Bintang: 0');
}

runCleanAndSeed().catch((err) => {
    console.error('❌ Error saat eksekusi seeder:', err);
    process.exit(1);
});