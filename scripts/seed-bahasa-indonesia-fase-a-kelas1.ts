// seed-bahasa-indonesia-fase-a-kelas1.ts
// =============================================================================
// UNIFIER SEEDER — Bahasa Indonesia Fase A Kelas 1 (8 Bab / 24 Pertemuan)
// =============================================================================

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { ALL_BAHASA_INDONESIA_MODULES } from './data/bahasa-indonesia';

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
const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
    console.error('Kredensial NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
});

async function seedBahasaIndonesia() {
    console.log('================================================================');
    console.log('🇮🇩 SEEDING BAHASA INDONESIA FASE A KELAS 1 (8 BAB / 24 PERTEMUAN)');
    console.log('   Karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah');
    console.log('================================================================');

    // 1. Pastikan Kelas 1 SD Terdaftar
    const classId = '11111111-1111-1111-1111-111111111111';
    const { error: classErr } = await supabase.from('classes').upsert(
        {
            id: classId,
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
    console.log(`✓ Kelas 1 SD siap (ID: ${classId})`);

    // 2. ISOLASI MAPEL: Hanya bersihkan Mapel Bahasa Indonesia (BIN-1)
    console.log('\n🧹 Membersihkan modul Bahasa Indonesia lama (BIN-1) tanpa mengganggu mapel lain...');
    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('code', 'BIN-1')
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
                await supabase.from('lesson_schedules').delete().in('lesson_id', lessonIds);
                await supabase.from('learning_competency_evaluations').delete().in('lesson_id', lessonIds);
                await supabase.from('lesson_completions').delete().in('lesson_id', lessonIds);

                const { data: existingAssignments } = await supabase
                    .from('assignments')
                    .select('id')
                    .in('lesson_id', lessonIds);

                const assignmentIds = (existingAssignments ?? []).map((a) => a.id);

                if (assignmentIds.length > 0) {
                    await supabase.from('quiz_questions').delete().in('assignment_id', assignmentIds);
                    await supabase.from('submissions').delete().in('assignment_id', assignmentIds);
                    await supabase.from('assignments').delete().in('id', assignmentIds);
                }

                await supabase.from('lessons').delete().in('id', lessonIds);
            }

            await supabase.from('modules').delete().in('id', moduleIds);
        }
        console.log('✓ Modul Bahasa Indonesia lama berhasil dibersihkan.');
    } else {
        const { data: newSubject, error: subjErr } = await supabase
            .from('subjects')
            .insert({
                class_id: classId,
                name: 'Bahasa Indonesia',
                code: 'BIN-1',
            })
            .select('id')
            .single();

        if (subjErr || !newSubject) {
            console.error('Gagal membuat mapel Bahasa Indonesia:', subjErr?.message);
            process.exit(1);
        }
        subjectId = newSubject.id;
        console.log(`✓ Mata Pelajaran Bahasa Indonesia baru terdaftar (ID: ${subjectId})`);
    }

    // 3. Gunakan Seluruh Modul Terpusat (Bab 1 - Bab 8)
    const allBatches = ALL_BAHASA_INDONESIA_MODULES;

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of allBatches) {
        console.log(`\n📦 Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`);

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
                        quiz_question_count: asg.quiz_questions ? asg.quiz_questions.length : 5,
                        passing_score: 70,
                    })
                    .select('id')
                    .single();

                if (asgErr || !asgData) {
                    console.error(`Gagal membuat tugas ${asg.type}:`, asgErr?.message);
                    continue;
                }

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

                    await supabase.from('quiz_questions').insert(questionsPayload);
                }
            }
        }
    }

    console.log('\n================================================================');
    console.log('🎉 SEEDING BAHASA INDONESIA LENGKAP BERHASIL 100%!');
    console.log(`Total: 8 Bab, ${totalLessonsCreated} Pertemuan Ajar, dan ${totalQuizzesCreated} Butir Soal CBT.`);
    console.log('================================================================\n');
}

seedBahasaIndonesia().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Bahasa Indonesia:', err);
    process.exit(1);
});