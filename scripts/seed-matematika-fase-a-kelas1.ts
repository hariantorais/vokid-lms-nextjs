import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { MATEMATIKA_BATCH_1 } from './data/matematika-batch-1';
import { MATEMATIKA_BATCH_2 } from './data/matematika-batch-2';
import { MATEMATIKA_BATCH_3 } from './data/matematika-batch-3';
import { MATEMATIKA_BATCH_4 } from './data/matematika-batch-4';

// Muat variabel lingkungan langsung dari .env.local atau .env tanpa dependensi dotenv
function loadEnv() {
  const envPaths = [
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '.env'),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...values] = trimmed.split('=');
          const val = values.join('=').trim().replace(/^["'](.*)["']$/, '$1');
          if (key && !process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Harap pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah disetel di .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedMatematika() {
  console.log('🚀 Memulai Seeding Kurikulum Lengkap Matematika Kelas 1 (8 Bab Penuh)...');

  // 1. Pastikan Kelas 1 ada (upsert agar record kelas dan mata pelajaran lain tidak terhapus)
  const classId = '11111111-1111-1111-1111-111111111111';
  const { error: classError } = await supabase.from('classes').upsert(
    {
      id: classId,
      name: 'Kelas 1 (Fase A)',
      grade_level: 1,
      academic_year: '2026/2027',
    },
    { onConflict: 'id' }
  );

  if (classError) {
    throw new Error(`Gagal mendaftarkan kelas: ${classError.message}`);
  }

  // 2. ISOLASI MAPEL: Bersihkan modul Matematika lama (MTK-1) saja
  console.log('🧹 Membersihkan modul Matematika lama (MTK-1) tanpa menyentuh mata pelajaran lain...');
  const { data: existingSubject } = await supabase
    .from('subjects')
    .select('id')
    .eq('class_id', classId)
    .eq('code', 'MTK-1')
    .maybeSingle();

  if (existingSubject) {
    const { data: existingModules } = await supabase
      .from('modules')
      .select('id')
      .eq('subject_id', existingSubject.id);

    const moduleIds = existingModules?.map((m) => m.id) ?? [];

    if (moduleIds.length > 0) {
      const { data: existingLessons } = await supabase
        .from('lessons')
        .select('id')
        .in('module_id', moduleIds);

      const lessonIds = existingLessons?.map((l) => l.id) ?? [];

      if (lessonIds.length > 0) {
        const { data: existingAssignments } = await supabase
          .from('assignments')
          .select('id')
          .in('lesson_id', lessonIds);

        const assignmentIds = existingAssignments?.map((a) => a.id) ?? [];

        if (assignmentIds.length > 0) {
          await supabase.from('quiz_questions').delete().in('assignment_id', assignmentIds);
          await supabase.from('assignments').delete().in('id', assignmentIds);
        }

        await supabase.from('lessons').delete().in('id', lessonIds);
      }

      await supabase.from('modules').delete().in('id', moduleIds);
    }

    await supabase.from('subjects').delete().eq('id', existingSubject.id);
  }

  // 3. Daftarkan Ulang Mapel Matematika
  const { data: subject, error: subjectError } = await supabase
    .from('subjects')
    .insert({
      class_id: classId,
      name: 'Matematika',
      code: 'MTK-1',
    })
    .select()
    .single();

  if (subjectError || !subject) {
    throw new Error(`Gagal membuat mata pelajaran Matematika: ${subjectError?.message}`);
  }

  console.log(`✅ Mata Pelajaran Terdaftar: ${subject.name} (ID: ${subject.id})`);

  // 4. Gabungkan Seluruh 4 Batch (Total 8 Bab)
  const allBatches = [
    ...MATEMATIKA_BATCH_1,
    ...MATEMATIKA_BATCH_2,
    ...MATEMATIKA_BATCH_3,
    ...MATEMATIKA_BATCH_4,
  ];

  for (const modData of allBatches) {
    const { data: moduleRecord, error: modError } = await supabase
      .from('modules')
      .insert({
        subject_id: subject.id,
        title: modData.title,
        order_index: modData.order_index,
        target_semester: modData.target_semester,
        week_target: modData.week_target,
        is_published: true,
      })
      .select()
      .single();

    if (modError || !moduleRecord) {
      console.error(`❌ Gagal membuat bab "${modData.title}":`, modError?.message);
      continue;
    }

    console.log(`  📂 Bab ${modData.order_index}: ${modData.title}`);

    for (const lessonData of modData.lessons) {
      const { data: lessonRecord, error: lessonError } = await supabase
        .from('lessons')
        .insert({
          module_id: moduleRecord.id,
          title: lessonData.title,
          order_index: lessonData.order_index,
          content_type: lessonData.content_type,
          content_text: lessonData.content_text,
          learning_objectives: lessonData.learning_objectives,
          allocated_minutes: lessonData.allocated_minutes,
          required_materials: lessonData.required_materials,
          intro_guide: lessonData.intro_guide,
          mindful_guide: lessonData.mindful_guide,
          joyful_guide: lessonData.joyful_guide,
          meaningful_guide: lessonData.meaningful_guide,
        })
        .select()
        .single();

      if (lessonError || !lessonRecord) {
        console.error(`    ❌ Gagal membuat materi "${lessonData.title}":`, lessonError?.message);
        continue;
      }

      console.log(`    📄 Materi: ${lessonData.title}`);

      for (const asgData of lessonData.assignments) {
        const { data: asgRecord, error: asgError } = await supabase
          .from('assignments')
          .insert({
            lesson_id: lessonRecord.id,
            type: asgData.type,
            prompt: asgData.prompt,
            quiz_question_count: asgData.quiz_question_count ?? null,
            passing_score: asgData.passing_score ?? null,
          })
          .select()
          .single();

        if (asgError || !asgRecord) {
          console.error(`      ❌ Gagal membuat tugas:`, asgError?.message);
          continue;
        }

        if (asgData.type === 'QUIZ_CBT' && asgData.quiz_questions && asgData.quiz_questions.length > 0) {
          const questionsPayload = asgData.quiz_questions.map((q, qIdx) => ({
            assignment_id: asgRecord.id,
            order_index: qIdx + 1,
            question_text: q.question_text,
            option_a: q.option_a,
            option_b: q.option_b,
            option_c: q.option_c,
            option_d: q.option_d,
            correct_answer: q.correct_answer,
            explanation: q.explanation,
          }));

          await supabase.from('quiz_questions').insert(questionsPayload);
          console.log(`        📝 Bank Soal CBT (${questionsPayload.length} soal) berhasil ditambahkan.`);
        }
      }
    }
  }

  console.log('\n🎉 Selesai! Seluruh 8 Bab Matematika Kelas 1 berhasil di-seed secara utuh dan terisolasi aman.');
}

seedMatematika().catch((err) => {
  console.error('Terjadi kesalahan fatal:', err);
  process.exit(1);
});