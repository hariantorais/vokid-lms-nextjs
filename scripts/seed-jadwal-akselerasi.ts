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

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
    console.error('Kredensial Supabase belum ditemukan di .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
});

interface LessonRow {
    id: string;
    title: string;
    order_index: number;
    module_id: string;
    module_title: string;
    module_order: number;
    subject_id: string;
    subject_name: string;
}

interface ScheduleInsert {
    student_id: string;
    lesson_id: string;
    scheduled_date: string;
    time_block: 'PAGI' | 'SIANG' | 'SORE';
    status: 'PENDING';
}

/**
 * Helper: Format Date ke YYYY-MM-DD
 */
function formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

/**
 * Helper: Dapatkan Senin depan dari hari ini
 */
function getNextMonday(): Date {
    const today = new Date();
    const day = today.getDay();
    const daysUntilMonday = day === 1 ? 7 : (8 - day) % 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday;
}

/**
 * Helper: Dapatkan 5 hari efektif (Senin-Jumat) mulai dari tanggal tertentu
 */
function getNext5WorkDays(startDate: Date): Date[] {
    const days: Date[] = [];
    const current = new Date(startDate);

    while (days.length < 5) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            days.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
    }

    return days;
}

/**
 * Seeder: Jadwal Akselerasi Kelas 1 dengan Rotasi Mapel
 */
async function seedJadwalAkselerasi() {
    console.log('================================================================');
    console.log('🚀 SEEDING JADWAL AKSELERASI KELAS 1 (6 BULAN)');
    console.log('   Rotasi Mapel — Anti Bosan');
    console.log('================================================================');

    // 1. Cari Kelas 1 SD
    console.log('\n🏫 [1/5] Mencari Kelas 1 SD...');

    const { data: classData, error: classErr } = await supabase
        .from('classes')
        .select('id, name, grade_level')
        .eq('grade_level', 1)
        .maybeSingle();

    if (classErr || !classData) {
        console.error('❌ Kelas 1 SD tidak ditemukan. Jalankan seeder mapel dulu.');
        process.exit(1);
    }

    console.log(`   ✓ Kelas 1 SD ditemukan: ${classData.name} (ID: ${classData.id})`);

    // 2. Ambil semua siswa Kelas 1
    console.log('\n👥 [2/5] Mengambil data siswa Kelas 1...');

    const { data: students, error: studentErr } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'SISWA')
        .order('full_name', { ascending: true });

    if (studentErr || !students || students.length === 0) {
        console.error('❌ Tidak ada siswa. Jalankan seeder auth-users dulu.');
        process.exit(1);
    }

    console.log(`   ✓ Ditemukan ${students.length} siswa:`);
    for (const s of students) {
        console.log(`      - ${s.full_name} (ID: ${s.id})`);
    }

    // 3. Ambil semua lessons Kelas 1 dengan relasi mapel
    console.log('\n📚 [3/5] Mengambil semua lessons Kelas 1...');

    const { data: subjects, error: subjectErr } = await supabase
        .from('subjects')
        .select('id, name, code')
        .eq('class_id', classData.id)
        .order('name', { ascending: true });

    if (subjectErr || !subjects || subjects.length === 0) {
        console.error('❌ Tidak ada mata pelajaran. Jalankan seeder mapel dulu.');
        process.exit(1);
    }

    console.log(`   ✓ Ditemukan ${subjects.length} mapel:`);
    for (const s of subjects) {
        console.log(`      - ${s.name} (${s.code ?? 'N/A'})`);
    }

    const subjectIds = subjects.map((s) => s.id);

    const { data: modules, error: moduleErr } = await supabase
        .from('modules')
        .select('id, title, order_index, subject_id')
        .in('subject_id', subjectIds)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

    if (moduleErr || !modules || modules.length === 0) {
        console.error('❌ Tidak ada modul. Jalankan seeder mapel dulu.');
        process.exit(1);
    }

    const moduleIds = modules.map((m) => m.id);

    const { data: lessons, error: lessonErr } = await supabase
        .from('lessons')
        .select('id, title, order_index, module_id')
        .in('module_id', moduleIds)
        .order('order_index', { ascending: true });

    if (lessonErr || !lessons || lessons.length === 0) {
        console.error('❌ Tidak ada pelajaran. Jalankan seeder mapel dulu.');
        process.exit(1);
    }

    // Bangun mapping module -> subject
    const moduleMap = new Map(modules.map((m) => [m.id, m]));
    const subjectMap = new Map(subjects.map((s) => [s.id, s]));

    // Bangun daftar lengkap LessonRow dengan relasi
    const lessonRows: LessonRow[] = lessons.map((l) => {
        const mod = moduleMap.get(l.module_id);
        const subj = mod ? subjectMap.get(mod.subject_id) : null;
        return {
            id: l.id,
            title: l.title,
            order_index: l.order_index,
            module_id: l.module_id,
            module_title: mod?.title ?? '',
            module_order: mod?.order_index ?? 0,
            subject_id: subj?.id ?? '',
            subject_name: subj?.name ?? '',
        };
    });

    console.log(`   ✓ Total ${lessonRows.length} pelajaran ditemukan.`);

    // 4. Generate jadwal dengan rotasi mapel
    console.log('\n📅 [4/5] Generate jadwal rotasi 6 bulan...');

    // Kelompokkan lessons per mapel
    const lessonsBySubject = new Map<string, LessonRow[]>();
    for (const subj of subjects) {
        const subjLessons = lessonRows
            .filter((l) => l.subject_id === subj.id)
            .sort((a, b) => {
                if (a.module_order !== b.module_order) return a.module_order - b.module_order;
                return a.order_index - b.order_index;
            });
        lessonsBySubject.set(subj.id, subjLessons);
    }

    // Buat pointer per mapel (untuk rotasi)
    const lessonPointer = new Map<string, number>();
    for (const subjId of lessonsBySubject.keys()) {
        lessonPointer.set(subjId, 0);
    }

    // Cari mapel by name untuk prioritas
    const findSubjectByName = (name: string) =>
        subjects.find((s) => s.name.toLowerCase().includes(name.toLowerCase()));

    const matematika = findSubjectByName('matematika');
    const bIndonesia = findSubjectByName('bahasa indonesia');
    const bInggris = findSubjectByName('bahasa inggris');
    const ipas = findSubjectByName('ipas');
    const ppkn = findSubjectByName('pancasila');
    const seniBudaya = findSubjectByName('seni budaya');

    console.log('\n   🎯 Mapel prioritas:');
    console.log(`      - Matematika: ${matematika ? '✓' : '✗'}`);
    console.log(`      - Bahasa Indonesia: ${bIndonesia ? '✓' : '✗'}`);
    console.log(`      - Bahasa Inggris: ${bInggris ? '✓' : '✗'}`);
    console.log(`      - IPAS: ${ipas ? '✓' : '✗'}`);
    console.log(`      - PPKn: ${ppkn ? '✓' : '✗'}`);
    console.log(`      - Seni Budaya: ${seniBudaya ? '✓' : '✗'}`);

    // Helper: Ambil lesson berikutnya dari mapel
    const getNextLesson = (subjectId: string | undefined): LessonRow | null => {
        if (!subjectId) return null;
        const list = lessonsBySubject.get(subjectId);
        if (!list) return null;
        const pointer = lessonPointer.get(subjectId) ?? 0;
        if (pointer >= list.length) return null;
        const lesson = list[pointer];
        lessonPointer.set(subjectId, pointer + 1);
        return lesson;
    };

    // Ambil semua lessons sampai habis
    const allAssignedLessons: Array<{ lesson: LessonRow; subject: string }> = [];
    const maxIterations = 10000;
    let iteration = 0;

    // Siklus rotasi: Mat, B.Ind, B.Ing, IPAS, PPKn/Seni
    // Setiap pekan: 5 hari
    // Senin: Mat, Selasa: B.Ind, Rabu: B.Ing, Kamis: IPAS, Jumat: Rotasi

    let pekanCount = 0;

    while (iteration < maxIterations) {
        iteration++;
        const pekanIni = pekanCount;

        // Senin - Matematika
        const matLesson = getNextLesson(matematika?.id);
        if (matLesson) allAssignedLessons.push({ lesson: matLesson, subject: 'Matematika' });

        // Selasa - B. Indonesia
        const bIndLesson = getNextLesson(bIndonesia?.id);
        if (bIndLesson) allAssignedLessons.push({ lesson: bIndLesson, subject: 'B. Indonesia' });

        // Rabu - B. Inggris
        const bIngLesson = getNextLesson(bInggris?.id);
        if (bIngLesson) allAssignedLessons.push({ lesson: bIngLesson, subject: 'B. Inggris' });

        // Kamis - IPAS
        const ipasLesson = getNextLesson(ipas?.id);
        if (ipasLesson) allAssignedLessons.push({ lesson: ipasLesson, subject: 'IPAS' });

        // Jumat - Rotasi
        // Pola: Pekan ganjil → PPKn, Pekan genap → Seni Budaya
        if (pekanIni % 2 === 0) {
            const ppknLesson = getNextLesson(ppkn?.id);
            if (ppknLesson) allAssignedLessons.push({ lesson: ppknLesson, subject: 'PPKn' });
        } else {
            const seniLesson = getNextLesson(seniBudaya?.id);
            if (seniLesson) allAssignedLessons.push({ lesson: seniLesson, subject: 'Seni Budaya' });
        }

        pekanCount++;

        // Cek apakah semua mapel sudah habis
        let allDone = true;
        for (const subj of subjects) {
            const list = lessonsBySubject.get(subj.id) ?? [];
            const pointer = lessonPointer.get(subj.id) ?? 0;
            if (pointer < list.length) {
                allDone = false;
                break;
            }
        }

        if (allDone) {
            console.log(`   ✓ Semua lessons terjadwal dalam ${pekanCount} pekan.`);
            break;
        }
    }

    console.log(`\n   📊 Total ${allAssignedLessons.length} pelajaran dijadwalkan.`);

    // 5. Generate jadwal untuk setiap siswa
    console.log('\n🗓️  [5/5] Generate jadwal untuk setiap siswa...');

    const startDate = getNextMonday();
    console.log(`   📅 Mulai: ${formatDate(startDate)} (Senin depan)`);

    const scheduleInserts: ScheduleInsert[] = [];

    for (const student of students) {
        let currentDate = new Date(startDate);
        let weekCount = 0;

        for (const assignment of allAssignedLessons) {
            // Dapatkan 5 hari efektif berikutnya
            const workDays = getNext5WorkDays(currentDate);

            // Assign pelajaran ke hari ke-N (berdasarkan rotasi 5 hari)
            // Karena kita sudah sortir rotasi, cukup assign ke hari berurutan
            const dayIndex = weekCount % 5;
            const targetDate = workDays[dayIndex];

            scheduleInserts.push({
                student_id: student.id,
                lesson_id: assignment.lesson.id,
                scheduled_date: formatDate(targetDate),
                time_block: 'PAGI',
                status: 'PENDING',
            });

            // Increment hari
            weekCount++;

            // Jika sudah 5 hari, maju ke pekan berikutnya
            if (weekCount % 5 === 0) {
                currentDate = new Date(workDays[4]);
                currentDate.setDate(currentDate.getDate() + 3); // Skip weekend
            }
        }
    }

    console.log(`   ✓ Total ${scheduleInserts.length} jadwal akan di-insert.`);
    console.log(`      (${students.length} siswa × ${allAssignedLessons.length} pelajaran)`);

    // 6. Hapus jadwal lama untuk siswa ini (opsional, untuk re-seed)
    console.log('\n🧹 Membersihkan jadwal lama...');

    const studentIds = students.map((s) => s.id);

    const { error: deleteErr } = await supabase
        .from('lesson_schedules')
        .delete()
        .in('student_id', studentIds);

    if (deleteErr) {
        console.warn(`   ⚠️  Warning saat hapus: ${deleteErr.message}`);
    } else {
        console.log('   ✓ Jadwal lama dibersihkan.');
    }

    // 7. Insert jadwal baru secara batch
    console.log('\n💾 Menyimpan jadwal ke database...');

    const batchSize = 100;
    let insertedCount = 0;

    for (let i = 0; i < scheduleInserts.length; i += batchSize) {
        const batch = scheduleInserts.slice(i, i + batchSize);

        const { error: insertErr } = await supabase
            .from('lesson_schedules')
            .insert(batch);

        if (insertErr) {
            console.error(`   ❌ Gagal insert batch ${i / batchSize + 1}:`, insertErr.message);
        } else {
            insertedCount += batch.length;
            console.log(`   ✓ Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} jadwal tersimpan.`);
        }
    }

    console.log('\n================================================================');
    console.log('🎉 SEEDING JADWAL AKSELERASI BERHASIL!');
    console.log('================================================================');
    console.log(`📊 Ringkasan:`);
    console.log(`   - Siswa: ${students.length}`);
    console.log(`   - Pelajaran: ${allAssignedLessons.length}`);
    console.log(`   - Total Jadwal: ${insertedCount}`);
    console.log(`   - Durasi: ${Math.ceil(pekanCount / 4)} bulan`);
    console.log(`   - Mulai: ${formatDate(startDate)}`);
    console.log('');
    console.log('📅 Jadwal 5 pekan pertama:');
    console.log('   Senin : Matematika');
    console.log('   Selasa: Bahasa Indonesia');
    console.log('   Rabu  : Bahasa Inggris');
    console.log('   Kamis : IPAS');
    console.log('   Jumat : Rotasi (PPKn / Seni Budaya)');
    console.log('');
    console.log('🚀 Anak-anak siap mulai belajar akselerasi!');
    console.log('================================================================\n');
}

seedJadwalAkselerasi().catch((err) => {
    console.error('❌ Kesalahan fatal:', err);
    process.exit(1);
});