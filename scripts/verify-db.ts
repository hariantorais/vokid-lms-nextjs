/**
 * Vokid LMS - Cloud Database & Seed Integrity Verification Script
 * Connects directly to live Supabase Cloud database and verifies:
 * 1. Cloud database connectivity via @supabase/supabase-js
 * 2. Hierarchical relational integrity: classes -> subjects -> modules -> lessons -> assignments
 * 3. Kurikulum Merdeka adaptive pedagogical models:
 *    - Fase A (Kelas 1): AUDIO lesson, VOICE_TASK assignment
 *    - Fase C (Kelas 5): PDF lesson, PHOTO_HOMEWORK assignment
 * 4. User profiles & submission workflows (PENDING vs GRADED)
 */

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

async function verifyOnlineDatabase(): Promise<void> {
  console.log('================================================================');
  console.log('🌐 VOKID LMS - VERIFIKASI SUPABASE CLOUD DATABASE (ONLINE)');
  console.log('================================================================');

  loadEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL tidak ditemukan di .env.local');
  }

  const authKey = serviceRoleKey || anonKey;
  if (!authKey) {
    throw new Error('Kredensial API Supabase (SERVICE_ROLE_KEY / ANON_KEY) tidak ditemukan di .env.local');
  }

  console.log(`[1/5] Menghubungkan ke Supabase Cloud: ${supabaseUrl}`);
  const supabase = createClient<Database>(supabaseUrl, authKey, {
    auth: { persistSession: false },
  });

  // 1. Verify Profiles
  console.log('\n[2/5] Memeriksa Data Akun Pengguna & Profil (profiles)...');
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, role, avatar_url');

  if (profileError) {
    throw new Error(`Gagal mengambil data profiles: ${profileError.message}`);
  }

  console.log(`  ✓ Berhasil membaca ${profiles.length} profil dari database online:`);
  for (const p of profiles) {
    console.log(`    - [${p.role}] ${p.full_name} (${p.id})`);
  }

  const guru = profiles.find((p) => p.role === 'GURU');
  const siswa = profiles.filter((p) => p.role === 'SISWA');
  if (!guru) throw new Error('Profil dengan role "GURU" tidak ditemukan!');
  if (siswa.length < 2) throw new Error('Minimal 2 profil "SISWA" harus ada di database!');

  // 2. Verify Classes
  console.log('\n[3/5] Memeriksa Data Kelas (classes)...');
  const { data: classes, error: classError } = await supabase
    .from('classes')
    .select('id, name, grade_level, academic_year, created_by')
    .order('grade_level', { ascending: true });

  if (classError) {
    throw new Error(`Gagal mengambil data classes: ${classError.message}`);
  }

  console.log(`  ✓ Berhasil membaca ${classes.length} kelas:`);
  for (const c of classes) {
    console.log(`    - Kelas ${c.grade_level} SD: "${c.name}" (Tahun Ajaran ${c.academic_year})`);
  }

  const kelas1 = classes.find((c) => c.grade_level === 1);
  const kelas5 = classes.find((c) => c.grade_level === 5);
  if (!kelas1) throw new Error('Kelas 1 SD (Fase A) tidak ditemukan!');
  if (!kelas5) throw new Error('Kelas 5 SD (Fase C) tidak ditemukan!');

  // 3. Verify Relational Hierarchy: subjects -> modules -> lessons -> assignments
  console.log('\n[4/5] Memeriksa Relasi Hierarkis Kurikulum Merdeka (Fase A & Fase C)...');

  // Verify Fase A (Kelas 1)
  const { data: subjectsA, error: subjErrA } = await supabase
    .from('subjects')
    .select('id, name, code, class_id')
    .eq('class_id', kelas1.id);
  if (subjErrA || !subjectsA || subjectsA.length === 0) {
    throw new Error(`Gagal mengambil subjects untuk Kelas 1: ${subjErrA?.message}`);
  }
  const subjectA = subjectsA[0];

  const { data: modulesA, error: modErrA } = await supabase
    .from('modules')
    .select('id, title, order_index, is_published')
    .eq('subject_id', subjectA.id);
  if (modErrA || !modulesA || modulesA.length === 0) {
    throw new Error(`Gagal mengambil modules untuk Kelas 1: ${modErrA?.message}`);
  }
  const moduleA = modulesA[0];

  const { data: lessonsA, error: lesErrA } = await supabase
    .from('lessons')
    .select('id, title, content_type, content_url')
    .eq('module_id', moduleA.id);
  if (lesErrA || !lessonsA || lessonsA.length === 0) {
    throw new Error(`Gagal mengambil lessons untuk Kelas 1: ${lesErrA?.message}`);
  }
  const lessonA = lessonsA[0];

  const { data: assignmentsA, error: asgErrA } = await supabase
    .from('assignments')
    .select('id, type, prompt, instruction_audio_url')
    .eq('lesson_id', lessonA.id);
  if (asgErrA || !assignmentsA || assignmentsA.length === 0) {
    throw new Error(`Gagal mengambil assignments untuk Kelas 1: ${asgErrA?.message}`);
  }
  const assignmentA = assignmentsA[0];

  if (lessonA.content_type !== 'AUDIO') {
    throw new Error(`Fase A Lesson seharusnya bertipe "AUDIO", ditemukan: "${lessonA.content_type}"`);
  }
  if (assignmentA.type !== 'VOICE_TASK') {
    throw new Error(`Fase A Assignment seharusnya bertipe "VOICE_TASK", ditemukan: "${assignmentA.type}"`);
  }

  console.log('  ✓ Fase A (Kelas 1 SD):');
  console.log(`    * Mata Pelajaran: ${subjectA.name} (${subjectA.code})`);
  console.log(`    * Modul: ${moduleA.title}`);
  console.log(`    * Lesson: [${lessonA.content_type}] ${lessonA.title}`);
  console.log(`    * Assignment: [${assignmentA.type}] ${assignmentA.prompt}`);

  // Verify Fase C (Kelas 5)
  const { data: subjectsC, error: subjErrC } = await supabase
    .from('subjects')
    .select('id, name, code, class_id')
    .eq('class_id', kelas5.id);
  if (subjErrC || !subjectsC || subjectsC.length === 0) {
    throw new Error(`Gagal mengambil subjects untuk Kelas 5: ${subjErrC?.message}`);
  }
  const subjectC = subjectsC[0];

  const { data: modulesC, error: modErrC } = await supabase
    .from('modules')
    .select('id, title, order_index, is_published')
    .eq('subject_id', subjectC.id);
  if (modErrC || !modulesC || modulesC.length === 0) {
    throw new Error(`Gagal mengambil modules untuk Kelas 5: ${modErrC?.message}`);
  }
  const moduleC = modulesC[0];

  const { data: lessonsC, error: lesErrC } = await supabase
    .from('lessons')
    .select('id, title, content_type, content_url')
    .eq('module_id', moduleC.id);
  if (lesErrC || !lessonsC || lessonsC.length === 0) {
    throw new Error(`Gagal mengambil lessons untuk Kelas 5: ${lesErrC?.message}`);
  }
  const lessonC = lessonsC[0];

  const { data: assignmentsC, error: asgErrC } = await supabase
    .from('assignments')
    .select('id, type, prompt, instruction_audio_url')
    .eq('lesson_id', lessonC.id);
  if (asgErrC || !assignmentsC || assignmentsC.length === 0) {
    throw new Error(`Gagal mengambil assignments untuk Kelas 5: ${asgErrC?.message}`);
  }
  const assignmentC = assignmentsC[0];

  if (lessonC.content_type !== 'PDF') {
    throw new Error(`Fase C Lesson seharusnya bertipe "PDF", ditemukan: "${lessonC.content_type}"`);
  }
  if (assignmentC.type !== 'PHOTO_HOMEWORK') {
    throw new Error(`Fase C Assignment seharusnya bertipe "PHOTO_HOMEWORK", ditemukan: "${assignmentC.type}"`);
  }

  console.log('  ✓ Fase C (Kelas 5 SD):');
  console.log(`    * Mata Pelajaran: ${subjectC.name} (${subjectC.code})`);
  console.log(`    * Modul: ${moduleC.title}`);
  console.log(`    * Lesson: [${lessonC.content_type}] ${lessonC.title}`);
  console.log(`    * Assignment: [${assignmentC.type}] ${assignmentC.prompt}`);

  // 4. Verify Submissions
  console.log('\n[5/5] Memeriksa Pengumpulan Tugas Siswa (submissions)...');
  const { data: submissions, error: subErr } = await supabase
    .from('submissions')
    .select('id, assignment_id, student_id, file_url, score, teacher_feedback, status');

  if (subErr) {
    throw new Error(`Gagal mengambil data submissions: ${subErr.message}`);
  }

  console.log(`  ✓ Berhasil membaca ${submissions.length} submission dari database online:`);
  for (const s of submissions) {
    console.log(`    - Status [${s.status}] Nilai: ${s.score ?? 'Belum dinilai'} | Feedback: ${s.teacher_feedback ?? 'Menunggu review'}`);
  }

  const gradedSub = submissions.find((s) => s.status === 'GRADED');
  const pendingSub = submissions.find((s) => s.status === 'PENDING');
  if (!gradedSub) throw new Error('Submission dengan status "GRADED" tidak ditemukan!');
  if (!pendingSub) throw new Error('Submission dengan status "PENDING" tidak ditemukan!');

  console.log('\n================================================================');
  console.log('🎉 SELURUH DATA SUPABASE CLOUD TERVERIFIKASI & RELASI 100% VALID');
  console.log('================================================================\n');
}

async function run(): Promise<void> {
  try {
    await verifyOnlineDatabase();
    process.exit(0);
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error('\n❌ VERIFIKASI CLOUD DATABASE GAGAL:');
    console.error(errMessage);
    process.exit(1);
  }
}

void run();
