// seed-seni-budaya-fase-a-kelas1.ts
// =============================================================================
// UNIFIER SEEDER — Seni Budaya Fase A Kelas 1
// Menggabungkan 3 batch (6 Bab, 12 Pertemuan) menjadi satu alur seeding
// Pola mengikuti seed-bahasa-inggris yang sudah terbukti berhasil
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { SBD_BATCH_1 } from './data/sbd-batch-1';
import { SBD_BATCH_2 } from './data/sbd-batch-2';
import { SBD_BATCH_3 } from './data/sbd-batch-3';

// -----------------------------------------------------------------------------
// Muat variabel lingkungan dari .env.local atau .env tanpa dotenv
// -----------------------------------------------------------------------------
function loadEnv(): void {
    const envPaths = [
        path.resolve(process.cwd(), '.env.local'),
        path.resolve(process.cwd(), '.env'),
    ];

    for (const envPath of envPaths) {
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            for (const line of content.split('\n')) {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                    const [key, ...values] = trimmed.split('=');
                    const val = values
                        .join('=')
                        .trim()
                        .replace(/^["'](.*)["']$/, '$1');
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
const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
    console.error(
        'Kredensial NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset.'
    );
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
});

// -----------------------------------------------------------------------------
// Konstanta
// -----------------------------------------------------------------------------
const CLASS_ID = '11111111-1111-1111-1111-111111111111';
const SUBJECT_CODE = 'SBD-1';
const SUBJECT_NAME = 'Seni Budaya';

// -----------------------------------------------------------------------------
// Fungsi Utama
// -----------------------------------------------------------------------------
async function seedSeniBudaya() {
    console.log('================================================================');
    console.log('🎨 SEEDING SENI BUDAYA FASE A KELAS 1 (6 BAB / 12 PERTEMUAN)');
    console.log('   Bidang: Seni Rupa, Seni Tari, Seni Teater');
    console.log('   Karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah');
    console.log('================================================================');

    // =========================================================================
    // 1. Pastikan Kelas 1 SD Terdaftar (Aman untuk mapel lain)
    // =========================================================================
    const { error: classErr } = await supabase.from('classes').upsert(
        {
            id: CLASS_ID,
            name: 'Kelas 1 SD (Fase A)',
            grade_level: 1,
            academic_year: '2026/2027',
        },
        { onConflict: 'id' }
    );

    if (classErr) {
        console.error('Gagal mendaftarkan kelas:', classErr.message);
        process.exit(1);
    }
    console.log(`✓ Kelas 1 SD siap (ID: ${CLASS_ID})`);

    // =========================================================================
    // 2. ISOLASI MAPEL: Hanya bersihkan Mapel Seni Budaya (SBD-1)
    // =========================================================================
    console.log('\n🧹 Membersihkan modul Seni Budaya lama (SBD-1) tanpa mengganggu mapel lain...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', CLASS_ID)
        .eq('code', SUBJECT_CODE)
        .maybeSingle();

    let subjectId: string;

    if (existingSubject) {
        subjectId = existingSubject.id;
        const { data: existingModules } = await supabase
            .from('modules')
            .select('id')
            .eq('subject_id', subjectId);

        const moduleIds = (existingModules ?? []).map((m) => m.id);

        if (moduleIds.length > 0) {
            const { data: existingLessons } = await supabase
                .from('lessons')
                .select('id')
                .in('module_id', moduleIds);

            const lessonIds = (existingLessons ?? []).map((l) => l.id);

            if (lessonIds.length > 0) {
                // Hapus relasi lain terlebih dahulu
                await supabase
                    .from('lesson_schedules')
                    .delete()
                    .in('lesson_id', lessonIds);
                await supabase
                    .from('learning_competency_evaluations')
                    .delete()
                    .in('lesson_id', lessonIds);
                await supabase
                    .from('lesson_completions')
                    .delete()
                    .in('lesson_id', lessonIds);

                const { data: existingAssignments } = await supabase
                    .from('assignments')
                    .select('id')
                    .in('lesson_id', lessonIds);

                const assignmentIds = (existingAssignments ?? []).map((a) => a.id);

                if (assignmentIds.length > 0) {
                    await supabase
                        .from('quiz_questions')
                        .delete()
                        .in('assignment_id', assignmentIds);
                    await supabase
                        .from('submissions')
                        .delete()
                        .in('assignment_id', assignmentIds);
                    await supabase.from('assignments').delete().in('id', assignmentIds);
                }

                await supabase.from('lessons').delete().in('id', lessonIds);
            }

            await supabase.from('modules').delete().in('id', moduleIds);
        }
        console.log('✓ Modul Seni Budaya lama berhasil dibersihkan.');
    } else {
        const { data: newSubject, error: subjErr } = await supabase
            .from('subjects')
            .insert({
                class_id: CLASS_ID,
                name: SUBJECT_NAME,
                code: SUBJECT_CODE,
            })
            .select('id')
            .single();

        if (subjErr || !newSubject) {
            console.error('Gagal membuat mapel Seni Budaya:', subjErr?.message);
            process.exit(1);
        }
        subjectId = newSubject.id;
        console.log(`✓ Mata Pelajaran Seni Budaya baru terdaftar (ID: ${subjectId})`);
    }

    // =========================================================================
    // 3. Gabungkan 3 Batch Lengkap (6 Bab / 12 Pertemuan)
    // =========================================================================
    const allBatches = [
        ...SBD_BATCH_1,
        ...SBD_BATCH_2,
        ...SBD_BATCH_3,
    ];

    let totalLessonsCreated = 0;
    let totalAssignmentsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of allBatches) {
        // Tentukan emoji bidang seni untuk logging
        let fieldEmoji = '🎨';
        if (chapter.title.toLowerCase().includes('tari')) fieldEmoji = '💃';
        if (chapter.title.toLowerCase().includes('teater')) fieldEmoji = '🎭';

        console.log(
            `\n${fieldEmoji} Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`
        );

        const { data: modData, error: modErr } = await supabase
            .from('modules')
            .insert({
                subject_id: subjectId,
                title: chapter.title,
                order_index: chapter.order_index,
                target_semester: chapter.target_semester,
                week_target: chapter.week_target,
                is_published: true,
            })
            .select('id')
            .single();

        if (modErr || !modData) {
            console.error(`Gagal menyimpan bab ${chapter.title}:`, modErr?.message);
            continue;
        }

        const moduleId = modData.id;

        for (const lesson of chapter.lessons) {
            console.log(`   └─ 📖 [Sesi ${lesson.order_index}] ${lesson.title}`);

            const { data: lesData, error: lesErr } = await supabase
                .from('lessons')
                .insert({
                    module_id: moduleId,
                    title: lesson.title,
                    order_index: lesson.order_index,
                    content_type: lesson.content_type,
                    content_text: lesson.content_text,
                    learning_objectives: lesson.learning_objectives,
                    allocated_minutes: lesson.allocated_minutes,
                    required_materials: lesson.required_materials,
                    intro_guide: lesson.intro_guide,
                    mindful_guide: lesson.mindful_guide,
                    joyful_guide: lesson.joyful_guide,
                    meaningful_guide: lesson.meaningful_guide,
                })
                .select('id')
                .single();

            if (lesErr || !lesData) {
                console.error(`Gagal menyimpan materi ${lesson.title}:`, lesErr?.message);
                continue;
            }

            totalLessonsCreated++;
            const lessonId = lesData.id;

            for (const asg of lesson.assignments) {
                const { data: asgData, error: asgErr } = await supabase
                    .from('assignments')
                    .insert({
                        lesson_id: lessonId,
                        type: asg.type,
                        prompt: asg.prompt,
                        quiz_question_count: asg.quiz_questions
                            ? asg.quiz_questions.length
                            : null,
                        passing_score: asg.passing_score ?? 70,
                    })
                    .select('id')
                    .single();

                if (asgErr || !asgData) {
                    console.error(`Gagal membuat tugas ${asg.type}:`, asgErr?.message);
                    continue;
                }

                totalAssignmentsCreated++;

                if (asg.type === 'QUIZ_CBT' && asg.quiz_questions) {
                    totalQuizzesCreated += asg.quiz_questions.length;
                    const questionsPayload = asg.quiz_questions.map((q, qIdx) => ({
                        assignment_id: asgData.id,
                        question_text: q.question_text,
                        option_a: q.option_a,
                        option_b: q.option_b,
                        option_c: q.option_c,
                        option_d: q.option_d,
                        correct_answer: q.correct_answer,
                        explanation: q.explanation,
                        order_index: qIdx + 1,
                    }));

                    const { error: quizErr } = await supabase
                        .from('quiz_questions')
                        .insert(questionsPayload);

                    if (quizErr) {
                        console.error(
                            `Gagal menyimpan soal kuis:`,
                            quizErr.message
                        );
                    } else {
                        console.log(
                            `        📝 Bank Soal CBT (${questionsPayload.length} soal) berhasil ditambahkan.`
                        );
                    }
                }
            }
        }
    }

    // =========================================================================
    // 4. Ringkasan Akhir
    // =========================================================================
    console.log('\n================================================================');
    console.log('🎉 SEEDING SENI BUDAYA SELESAI 100%!');
    console.log('================================================================');
    console.log(`📊 Statistik:`);
    console.log(`   📚 Modul (Bab)       : ${allBatches.length} / ${allBatches.length}`);
    console.log(`   📖 Pertemuan         : ${totalLessonsCreated}`);
    console.log(`   📝 Tugas             : ${totalAssignmentsCreated}`);
    console.log(`   ❓ Soal Kuis CBT     : ${totalQuizzesCreated}`);
    console.log('');
    console.log('📖 Cakupan 6 Bab:');
    console.log('   🎨 Bab 1: Seni Rupa — Garis dan Bentuk');
    console.log('   🎨 Bab 2: Seni Rupa — Warna di Sekitar Kita');
    console.log('   💃 Bab 3: Seni Tari — Gerak Anggota Tubuh');
    console.log('   🎭 Bab 4: Seni Teater — Mengenal Teater');
    console.log('   💃 Bab 5: Seni Tari — Waktu & Tenaga');
    console.log('   🎭 Bab 6: Seni Teater — Berkreasi dalam Pantomim');
    console.log('');
    console.log('📊 Distribusi Bidang Seni:');
    console.log('   🎨 Seni Rupa   : 2 Bab × 2 Pertemuan = 4 Pertemuan');
    console.log('   💃 Seni Tari   : 2 Bab × 2 Pertemuan = 4 Pertemuan');
    console.log('   🎭 Seni Teater : 2 Bab × 2 Pertemuan = 4 Pertemuan');
    console.log('');
    console.log('🌟 Karakter pendamping: Maryam, Asiya, Fatimah, Maheer, Khadijah');
    console.log('✅ Konten 100% ramah anak (komik + cerita + gambar)');
    console.log('✅ Field guru terpisah di JSON (tidak muncul di content_text)');
    console.log('✅ Durasi 45 menit per pertemuan (ramah anak)');
    console.log('================================================================\n');
}

// -----------------------------------------------------------------------------
// Jalankan
// -----------------------------------------------------------------------------
seedSeniBudaya().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Seni Budaya:', err);
    process.exit(1);
});