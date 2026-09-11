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

async function runSeederMatematikaKelas1() {
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
  console.log('🧹 BERSIHKAN DATA SEBELUMNYA & SEED DATA RIIL MATEMATIKA KELAS 1');
  console.log('================================================================');

  // 1. Identifikasi Kelas 1 SD
  const { data: existingClass } = await supabase
    .from('classes')
    .select('id, name')
    .eq('grade_level', 1)
    .limit(1)
    .maybeSingle();

  let classId: string;

  if (existingClass) {
    classId = existingClass.id;
    console.log(`[1] Kelas 1 SD: "${existingClass.name}" (${classId})`);
  } else {
    classId = 'aaaaaaaa-1111-0000-0000-000000000001';
    await supabase.from('classes').upsert({
      id: classId,
      grade_level: 1,
      name: 'Kelas 1 SD',
      academic_year: '2026/2027',
      created_by: '11111111-1111-1111-1111-111111111111',
    });
    console.log(`[1] Membuat Kelas 1 SD: ${classId}`);
  }

  // 2. Pastikan Mapel Matematika Tersedia
  const { data: existingSubject } = await supabase
    .from('subjects')
    .select('id, name')
    .eq('class_id', classId)
    .ilike('name', '%matematika%')
    .limit(1)
    .maybeSingle();

  let subjectId: string;

  if (existingSubject) {
    subjectId = existingSubject.id;
    console.log(`[2] Mapel Matematika: "${existingSubject.name}" (${subjectId})`);
  } else {
    subjectId = 'bbbbbbbb-1111-0000-0000-000000000001';
    await supabase.from('subjects').upsert({
      id: subjectId,
      class_id: classId,
      name: 'Matematika',
      code: 'MTK-1',
    });
    console.log(`[2] Membuat Mapel Matematika: ${subjectId}`);
  }

  // 3. PEMBERSIHAN DATA LAMA DI MAPEL MATEMATIKA
  console.log('\n[3] 🧹 Membersihkan seluruh modul, materi, tugas, kuis, dan submission lama di mapel ini...');

  // Cari semua modules di bawah subject ini
  const { data: oldModules } = await supabase
    .from('modules')
    .select('id')
    .eq('subject_id', subjectId);

  const oldModuleIds = (oldModules ?? []).map((m) => m.id);

  if (oldModuleIds.length > 0) {
    // Cari semua lessons di bawah modul-modul ini
    const { data: oldLessons } = await supabase
      .from('lessons')
      .select('id')
      .in('module_id', oldModuleIds);

    const oldLessonIds = (oldLessons ?? []).map((l) => l.id);

    if (oldLessonIds.length > 0) {
      // Cari semua assignments di bawah lessons ini
      const { data: oldAssignments } = await supabase
        .from('assignments')
        .select('id')
        .in('lesson_id', oldLessonIds);

      const oldAssignmentIds = (oldAssignments ?? []).map((a) => a.id);

      if (oldAssignmentIds.length > 0) {
        // Hapus submission tugas
        await supabase.from('submissions').delete().in('assignment_id', oldAssignmentIds);
        // Hapus butir soal kuis
        await supabase.from('quiz_questions').delete().in('assignment_id', oldAssignmentIds);
        // Hapus assignments
        await supabase.from('assignments').delete().in('id', oldAssignmentIds);
        console.log(`  ✓ Berhasil menghapus ${oldAssignmentIds.length} tugas & bank soal lama`);
      }

      // Hapus lessons
      await supabase.from('lessons').delete().in('id', oldLessonIds);
      console.log(`  ✓ Berhasil menghapus ${oldLessonIds.length} materi lama`);
    }

    // Hapus modules
    await supabase.from('modules').delete().in('id', oldModuleIds);
    console.log(`  ✓ Berhasil menghapus ${oldModuleIds.length} bab lama`);
  } else {
    console.log('  ✓ Tidak ada data lama di mapel ini.');
  }

  // 4. BUAT 2 BAB RIIL KURIKULUM MERDEKA
  console.log('\n[4] 📚 Menyimpan 2 Bab Riil Matematika...');
  const bab1Id = 'cccccccc-0001-0000-0000-000000000001';
  const bab2Id = 'cccccccc-0002-0000-0000-000000000002';

  const modules = [
    {
      id: bab1Id,
      subject_id: subjectId,
      title: 'Ayo Membilang sampai dengan 10',
      order_index: 1,
      is_published: true,
    },
    {
      id: bab2Id,
      subject_id: subjectId,
      title: 'Penjumlahan sampai dengan 10',
      order_index: 2,
      is_published: true,
    },
  ];

  for (const m of modules) {
    await supabase.from('modules').upsert(m);
    console.log(`  ✓ Bab ${m.order_index}: ${m.title}`);
  }

  // 5. BUAT 1 MATERI TEKS LENGKAP & RIIL DI BAB 1
  console.log('\n[5] 📝 Menyimpan 1 Materi Teks Riil di Bab 1...');
  const lesson1Id = 'dddddddd-0001-0000-0000-000000000001';
  const lessonData = {
    id: lesson1Id,
    module_id: bab1Id,
    title: 'Mengenal dan Menghitung Bilangan 1 sampai 10',
    content_type: 'TEXT' as const,
    learning_objectives:
      'Siswa mampu menunjukkan banyak benda, membilang bilangan 1 sampai 10 secara runtut, dan menghubungkan benda konkret dengan lambang bilangannya.',
    content_text: `
### Halo Anak Hebat! Mari Belajar Membilang

Pernahkah kamu menghitung benda-benda di sekitarmu?
Lihatlah jari-jari tanganmu! Ada berapa jari di tangan kananmu?
Mari kita hitung bersama: **1, 2, 3, 4, 5!**

---

### Mengenal Lambang Bilangan 1 sampai 10:

* **1 (Satu)** : Seperti pensil yang berdiri tegak. ✏️
* **2 (Dua)** : Seperti bebek yang sedang berenang di kolam. 🦆
* **3 (Tiga)** : Seperti burung yang sedang mengepakkan sayap. 🐦
* **4 (Empat)** : Seperti kursi yang terbalik. 🪑
* **5 (Lima)** : Badut dengan perut bulat dan bertopi. 🤡
* **6 (Enam)** : Lingkaran di bawah dengan ekor ke atas. 🐌
* **7 (Tujuh)** : Tongkat kakek yang kokoh. 🦯
* **8 (Delapan)** : Dua lingkaran bertumpuk seperti kacamata. 👓
* **9 (Sembilan)** : Lingkaran di atas dengan tangkai ke bawah. 🎈
* **10 (Sepuluh)** : Angka 1 berdampingan dengan angka 0. 🔟

---

### Ayo Berlatih Menghitung Maju dan Mundur:
1. **Membilang Maju:** 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
2. **Membilang Mundur (Roket Meluncur):** 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, **MELUNCUR!** 🚀
`.trim(),
    order_index: 1,
  };

  await supabase.from('lessons').upsert(lessonData);
  console.log(`  ✓ Materi: "${lessonData.title}"`);

  // 6. BUAT 2 TUGAS RIIL (FOTO PR & KUIS CBT)
  console.log('\n[6] 🎯 Menyimpan Tugas Foto PR & Kuis CBT...');

  // 6a. Tugas Foto PR
  const assignmentFotoId = 'eeeeeeee-0001-0000-0000-000000000001';
  await supabase.from('assignments').upsert({
    id: assignmentFotoId,
    lesson_id: lesson1Id,
    type: 'PHOTO_HOMEWORK',
    prompt:
      'Ambil 5 buah benda kecil yang ada di mejamu (misalnya: pensil, penghapus, atau krayon). Tata secara berjejer rapi, lalu minta bantuan orang tua untuk mengambil fotonya dan kirimkan hasilnya di sini ya!',
    due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    instruction_audio_url: null,
    quiz_question_count: null,
    passing_score: null,
  });
  console.log('  ✓ Tugas 1: Foto PR Benda Konkret (5 Benda)');

  // 6b. Tugas Kuis CBT Pilihan Ganda
  const assignmentQuizId = 'eeeeeeee-0002-0000-0000-000000000002';
  await supabase.from('assignments').upsert({
    id: assignmentQuizId,
    lesson_id: lesson1Id,
    type: 'QUIZ_CBT',
    prompt: 'Kuis Pemahaman Membilang Bilangan 1-10',
    quiz_question_count: 3,
    passing_score: 70,
    due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    instruction_audio_url: null,
  });
  console.log('  ✓ Tugas 2: Kuis CBT (3 Soal Interaktif)');

  // 6c. Masukkan 3 Butir Soal Kuis
  const quizQuestions = [
    {
      assignment_id: assignmentQuizId,
      question_text: 'Ada 3 buah apel merah dan 2 buah apel hijau di keranjang. Berapakah jumlah seluruh apel?',
      option_a: '4 apel',
      option_b: '5 apel',
      option_c: '6 apel',
      option_d: '3 apel',
      correct_answer: 'B' as const,
      explanation: '3 apel merah ditambah 2 apel hijau = 3 + 2 = 5 apel.',
      order_index: 1,
    },
    {
      assignment_id: assignmentQuizId,
      question_text: 'Lambang bilangan yang bentuknya mirip seperti bebek berenang adalah angka...',
      option_a: '1',
      option_b: '2',
      option_c: '3',
      option_d: '4',
      correct_answer: 'B' as const,
      explanation: 'Angka 2 memiliki lengkungan kepala dan leher seperti bebek berenang.',
      order_index: 2,
    },
    {
      assignment_id: assignmentQuizId,
      question_text: 'Urutan bilangan dari yang terkecil setelah angka 6 adalah...',
      option_a: '5',
      option_b: '7',
      option_c: '8',
      option_d: '9',
      correct_answer: 'B' as const,
      explanation: 'Membilang maju: 1, 2, 3, 4, 5, 6, lalu 7.',
      order_index: 3,
    },
  ];

  await supabase.from('quiz_questions').insert(quizQuestions);
  console.log('  ✓ 3 Butir Soal Kuis CBT berhasil dimasukkan ke bank soal.');

  console.log('\n================================================================');
  console.log('🎉 SEEDING SELESAI! DATA BERSIH & SIAP DISIMULASIKAN.');
  console.log('================================================================');
}

runSeederMatematikaKelas1().catch((err) => {
  console.error('❌ Gagal menjalankan seeder:', err);
  process.exit(1);
});
