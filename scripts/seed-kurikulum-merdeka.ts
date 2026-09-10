import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

type LessonInsert = Database['public']['Tables']['lessons']['Insert'];
type AssignmentInsert = Database['public']['Tables']['assignments']['Insert'];

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

async function runSeed() {
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
    console.log('📚 SEED MATERI PEMBELAJARAN (TEKS LENGKAP & VIDEO)');
    console.log('================================================================');

    const LEVEL_1_ID = 'aaaaaaaa-1111-0000-0000-000000000001';
    const MAPEL_MTK_ID = 'bbbbbbbb-1111-0000-0000-000000000001';

    // 1. Pastikan Kelas & Mapel Tersedia
    await supabase.from('classes').upsert({
        id: LEVEL_1_ID,
        grade_level: 1,
        name: 'Level 1 (Fase A - Dasar)',
        academic_year: 'Kurikulum Merdeka',
        created_by: '11111111-1111-1111-1111-111111111111',
    });

    await supabase.from('subjects').upsert({
        id: MAPEL_MTK_ID,
        class_id: LEVEL_1_ID,
        name: 'Matematika',
        code: 'MTK-LV1',
    });

    // 2. Daftar 8 Modul Pembelajaran Bab 1 s.d. 8
    const modules = [
        {
            id: 'cccccccc-0001-0000-0000-000000000001',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 1: Ayo Membilang sampai dengan 10',
            order_index: 1,
            is_published: true,
        },
        {
            id: 'cccccccc-0002-0000-0000-000000000002',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 2: Penjumlahan sampai dengan 10',
            order_index: 2,
            is_published: true,
        },
        {
            id: 'cccccccc-0003-0000-0000-000000000003',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 3: Pengurangan sampai dengan 10',
            order_index: 3,
            is_published: true,
        },
        {
            id: 'cccccccc-0004-0000-0000-000000000004',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 4: Mengenal Bentuk (Segitiga, Segi Empat, Lengkung)',
            order_index: 4,
            is_published: true,
        },
        {
            id: 'cccccccc-0005-0000-0000-000000000005',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 5: Ayo Membilang sampai dengan 20',
            order_index: 5,
            is_published: true,
        },
        {
            id: 'cccccccc-0006-0000-0000-000000000006',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 6: Penjumlahan dan Pengurangan sampai dengan 20',
            order_index: 6,
            is_published: true,
        },
        {
            id: 'cccccccc-0007-0000-0000-000000000007',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 7: Mengukur Panjang Benda',
            order_index: 7,
            is_published: true,
        },
        {
            id: 'cccccccc-0008-0000-0000-000000000008',
            subject_id: MAPEL_MTK_ID,
            title: 'Bab 8: Mengenal Diagram',
            order_index: 8,
            is_published: true,
        },
    ];

    for (const m of modules) {
        await supabase.from('modules').upsert(m);
    }

    // 3. Materi Pembelajaran Lengkap dengan Narasi Teks, Video, dan Audio
    console.log('[+] Menyimpan teks bacaan dan media materi...');

    const lessons: LessonInsert[] = [
        // BAB 1
        {
            id: 'dddddddd-0001-0000-0000-000000000001',
            module_id: 'cccccccc-0001-0000-0000-000000000001',
            title: 'Menghitung, Membaca, dan Menulis Bilangan 1–10',
            content_type: 'VIDEO',
            content_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Tautan video animasi
            content_text: `
### Cerita Pembuka: Berhitung di Sekitar Kita
Halo anak hebat! Lihatlah jari tanganmu. Ada berapa jari di tangan kananmu? Mari kita hitung bersama: 1, 2, 3, 4, 5!

**Ayo Mengenal Angka 1 sampai 10:**
* 1 = Satu (seperti pensil tegak)
* 2 = Dua (seperti bebek berenang)
* 3 = Tiga (seperti burung terbang)
* 4 = Empat (seperti kursi terbalik)
* 5 = Lima (perut badut yang bulat)
* 6 = Enam
* 7 = Tujuh
* 8 = Delapan (seperti kacamata)
* 9 = Sembilan
* 10 = Sepuluh (angka 1 dan 0 berdampingan)

**Menghitung Mundur (Tangga Meluncur):**
Ayo sebutkan mundur dari atas ke bawah:
10, 9, 8, 7, 6, 5, 4, 3, 2, 1, SELESAI! Hebat sekali!
      `.trim(),
            order_index: 1,
        },
        // BAB 2
        {
            id: 'dddddddd-0002-0000-0000-000000000002',
            module_id: 'cccccccc-0002-0000-0000-000000000002',
            title: 'Cerita Penjumlahan: Bermain Lompat Tali',
            content_type: 'TEXT',
            content_url: null,
            content_text: `
### Cerita: Bermain Lompat Tali di Halaman
Di halaman sekolah, ada 4 anak yang sedang asyik bermain lompat tali.
Tiba-tiba, datang lagi 2 orang teman mereka ingin ikut bermain.

Berapa jumlah anak yang bermain lompat tali sekarang?
* Mula-mula ada: 4 anak
* Datang lagi: 2 anak
* Kalimat Matematika: **4 + 2 = 6**

Jadi, sekarang ada **6 anak** yang bermain bersama dengan gembira!
      `.trim(),
            order_index: 1,
        },
        // BAB 4
        {
            id: 'dddddddd-0004-0000-0000-000000000004',
            module_id: 'cccccccc-0004-0000-0000-000000000004',
            title: 'Mengenal Bentuk: Segitiga, Segi Empat, dan Bentuk Lengkung',
            content_type: 'TEXT',
            content_url: null,
            content_text: `
### Bentuk di Sekitar Kita
Coba perhatikan benda-benda yang ada di rumah dan kelasmu:

1. **Segitiga:** Memiliki 3 sisi dan 3 sudut runcing. Contoh: potongan piza, penggaris segitiga, dan atap rumah.
2. **Segi Empat:** Memiliki 4 sisi. Contoh: buku tulis, papan tulis, dan bingkai foto keluarga.
3. **Bentuk Lengkung (Lingkaran):** Garis melingkar mulus tanpa sudut siku. Contoh: uang koin, jam dinding bundar, dan roda sepeda.
      `.trim(),
            order_index: 1,
        },
        // BAB 7
        {
            id: 'dddddddd-0007-0000-0000-000000000007',
            module_id: 'cccccccc-0007-0000-0000-000000000007',
            title: 'Mengukur Panjang Benda dengan Jengkal Tangan',
            content_type: 'TEXT',
            content_url: null,
            content_text: `
### Apa itu Mengukur?
Mengukur adalah mencari tahu berapa panjang suatu benda. Jika kita belum memiliki penggaris, kita bisa menggunakan anggota tubuh kita!

* **Jengkal Tangan:** Rentangkan ibu jari dan jari kelingkingmu. Jarak dari ujung ibu jari ke ujung kelingking dinamakan **1 Jengkal**.
* **Tahukah Kamu?** Jarak aman saat membaca buku adalah sekitar **3 jengkal** dari mata agar mata kita tetap sehat.
      `.trim(),
            order_index: 1,
        },
    ];

    for (const l of lessons) {
        // Upsert materi dengan kolom content_text dan video/audio url
        await supabase.from('lessons').upsert(l);
    }

    // 4. Penugasan Siswa Adaptif
    console.log('[+] Menyimpan tugas interaktif...');
    const assignments: AssignmentInsert[] = [
        {
            id: 'eeeeeeee-0001-0000-0000-000000000001',
            lesson_id: 'dddddddd-0001-0000-0000-000000000001',
            type: 'VOICE_TASK',
            prompt:
                'Ayo tekan tombol mikrofon oranye besar, lalu ucapkan hitungan mundur dari angka 10 sampai 1 dengan suara lantang dan jelas!',
            instruction_audio_url: 'https://pub-vokid.r2.dev/audio-prompts/instruksi-hitung-mundur.mp3',
            due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
        },
        {
            id: 'eeeeeeee-0004-0000-0000-000000000004',
            lesson_id: 'dddddddd-0004-0000-0000-000000000004',
            type: 'PHOTO_HOMEWORK',
            prompt:
                'Temukan 2 benda di sekitarmu yang berbentuk kotak/segi empat dan 1 benda berbentuk bulat/lingkaran. Foto benda-benda tersebut lalu kirim di sini!',
            instruction_audio_url: null,
            due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
        },
    ];

    for (const a of assignments) {
        await supabase.from('assignments').upsert(a);
    }

    console.log('✅ SELURUH MATERI TEKS BACAAN & TUGAS SELESAI DI-SEED!');
}

runSeed().catch((err) => {
    console.error('❌ Gagal seeder materi:', err);
    process.exit(1);
});