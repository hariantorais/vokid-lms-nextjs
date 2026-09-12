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

interface ScheduleRow {
    scheduled_date: string;
    time_block: string;
    status: string;
    lesson_title: string;
    module_title: string;
    subject_name: string;
}

interface StudentSchedule {
    studentName: string;
    schedules: ScheduleRow[];
}

/**
 * Helper: Format tanggal Indonesia
 */
function formatTanggalIndonesia(dateStr: string): string {
    const date = new Date(dateStr);
    const hariArr = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanArr = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    return `${hariArr[date.getDay()]}, ${date.getDate()} ${bulanArr[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Helper: Icon mapel
 */
function getMapelEmoji(subjectName: string): string {
    const name = subjectName.toLowerCase();
    if (name.includes('matematika')) return '🧮';
    if (name.includes('indonesia')) return '📚';
    if (name.includes('inggris')) return '🇬🇧';
    if (name.includes('ipas')) return '🌍';
    if (name.includes('pancasila') || name.includes('ppkn')) return '🇮🇩';
    if (name.includes('seni')) return '🎨';
    return '📖';
}

/**
 * Generate HTML jadwal (bisa di-print ke PDF dari browser)
 */
function generateHTML(schedules: StudentSchedule[]): string {
    const totalWeeks = Math.ceil(
        Math.max(...schedules.map((s) => s.schedules.length)) / 5
    );

    let html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Jadwal Akselerasi Kelas 1 - 6 Bulan</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      line-height: 1.5;
      padding: 20px;
    }
    .container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 22px;
      font-weight: 900;
      text-align: center;
      margin-bottom: 4px;
      color: #0f172a;
    }
    h2 {
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      color: #64748b;
      margin-bottom: 20px;
    }
    .info-box {
      background: #f1f5f9;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 600;
    }
    .student-section {
      page-break-before: always;
      margin-top: 20px;
    }
    .student-section:first-of-type {
      page-break-before: auto;
    }
    .student-header {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      padding: 14px 18px;
      border-radius: 10px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .student-name {
      font-size: 18px;
      font-weight: 900;
    }
    .student-class {
      font-size: 12px;
      opacity: 0.9;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-bottom: 16px;
    }
    th {
      background: #0f172a;
      color: white;
      padding: 8px 6px;
      text-align: left;
      font-weight: 800;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    td {
      padding: 7px 6px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    tr:nth-child(even) {
      background: #f8fafc;
    }
    .week-row {
      background: #e0e7ff !important;
      font-weight: 900;
      font-size: 11px;
      text-align: center;
      color: #3730a3;
      padding: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .day-col {
      font-weight: 700;
      color: #475569;
      width: 70px;
    }
    .date-col {
      color: #64748b;
      font-size: 9px;
      width: 90px;
    }
    .subject-col {
      font-weight: 800;
      color: #0f172a;
    }
    .lesson-col {
      color: #475569;
    }
    .checkbox-col {
      width: 30px;
      text-align: center;
    }
    .checkbox {
      width: 14px;
      height: 14px;
      border: 1.5px solid #94a3b8;
      border-radius: 3px;
      display: inline-block;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .badge-pagi { background: #fef3c7; color: #92400e; }
    .footer {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 2px solid #e2e8f0;
      font-size: 10px;
      color: #64748b;
      text-align: center;
    }
    .legend {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 12px;
      font-size: 10px;
      font-weight: 700;
      flex-wrap: wrap;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
        padding: 0;
      }
      .student-section {
        page-break-before: always;
      }
      .student-section:first-of-type {
        page-break-before: auto;
      }
      tr {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 JADWAL AKSELERASI KELAS 1</h1>
    <h2>Program 6 Bulan — Rotasi Mapel (Anti Bosan)</h2>

    <div class="info-box">
      <span>📅 Total: ${totalWeeks} Pekan (~6 Bulan)</span>
      <span>🎯 Target: Tuntaskan 6 Mapel Kelas 1</span>
      <span>⏰ Waktu: PAGI (07:30 - 08:40)</span>
    </div>

    <div class="legend">
      <span class="legend-item">🧮 Matematika</span>
      <span class="legend-item">📚 Bahasa Indonesia</span>
      <span class="legend-item">🇬🇧 Bahasa Inggris</span>
      <span class="legend-item">🌍 IPAS</span>
      <span class="legend-item">🇮🇩 PPKn</span>
      <span class="legend-item">🎨 Seni Budaya</span>
    </div>
`;

    for (const student of schedules) {
        html += `
    <div class="student-section">
      <div class="student-header">
        <div>
          <div class="student-name">👦 ${student.studentName}</div>
          <div class="student-class">Kelas 1 SD (Fase A) • Program Akselerasi</div>
        </div>
        <div class="student-class">${student.schedules.length} Pelajaran</div>
      </div>

      <table>
        <thead>
          <tr>
            <th class="day-col">Hari</th>
            <th class="date-col">Tanggal</th>
            <th class="subject-col">Mapel</th>
            <th class="lesson-col">Materi</th>
            <th class="checkbox-col">✓</th>
          </tr>
        </thead>
        <tbody>
`;

        // Group by week
        let currentWeek = 0;
        let weekStartIndex = 0;

        for (let i = 0; i < student.schedules.length; i++) {
            const sched = student.schedules[i];
            const weekNum = Math.floor(i / 5) + 1;

            if (weekNum !== currentWeek) {
                currentWeek = weekNum;
                weekStartIndex = i;
                html += `
          <tr class="week-row">
            <td colspan="5">📅 PEKAN ${weekNum}</td>
          </tr>
        `;
            }

            const emoji = getMapelEmoji(sched.subject_name);
            const hari = formatTanggalIndonesia(sched.scheduled_date).split(',')[0];
            const tanggal = new Date(sched.scheduled_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
            });

            html += `
          <tr>
            <td class="day-col">${hari}</td>
            <td class="date-col">${tanggal}</td>
            <td class="subject-col">${emoji} ${sched.subject_name}</td>
            <td class="lesson-col">${sched.lesson_title}</td>
            <td class="checkbox-col"><span class="checkbox"></span></td>
          </tr>
      `;
        }

        html += `
        </tbody>
      </table>
    </div>
`;
    }

    html += `
    <div class="footer">
      <p><strong>💡 Tips Akselerasi:</strong> Fokus kualitas > kuantitas. Istirahat cukup. Rayakan progress kecil setiap hari.</p>
      <p style="margin-top: 8px;">Dicetak dari Vokid LMS • ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
  </div>
</body>
</html>
`;

    return html;
}

async function generateJadwalPDF() {
    console.log('================================================================');
    console.log('📄 GENERATE JADWAL AKSELERASI (HTML — Siap Print PDF)');
    console.log('================================================================');

    // 1. Cari Kelas 1
    console.log('\n🏫 [1/3] Mencari Kelas 1 SD...');

    const { data: classData, error: classErr } = await supabase
        .from('classes')
        .select('id, name')
        .eq('grade_level', 1)
        .maybeSingle();

    if (classErr || !classData) {
        console.error('❌ Kelas 1 SD tidak ditemukan.');
        process.exit(1);
    }

    console.log(`   ✓ Kelas 1 SD: ${classData.name}`);

    // 2. Ambil semua siswa
    console.log('\n👥 [2/3] Mengambil siswa...');

    const { data: students, error: studentErr } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'SISWA')
        .order('full_name', { ascending: true });

    if (studentErr || !students || students.length === 0) {
        console.error('❌ Tidak ada siswa.');
        process.exit(1);
    }

    console.log(`   ✓ Ditemukan ${students.length} siswa.`);

    // 3. Ambil jadwal setiap siswa
    console.log('\n📅 [3/3] Mengambil jadwal dari database...');

    const allSchedules: StudentSchedule[] = [];

    for (const student of students) {
        const { data: schedules, error: schedErr } = await supabase
            .from('lesson_schedules')
            .select(`
        scheduled_date,
        time_block,
        status,
        lessons:lesson_id (
          title,
          modules:module_id (
            title,
            subjects:subject_id (
              name
            )
          )
        )
      `)
            .eq('student_id', student.id)
            .order('scheduled_date', { ascending: true });

        if (schedErr) {
            console.warn(`   ⚠️  Gagal ambil jadwal ${student.full_name}: ${schedErr.message}`);
            continue;
        }

        const mapped: ScheduleRow[] = (schedules ?? []).map((s: any) => ({
            scheduled_date: s.scheduled_date,
            time_block: s.time_block,
            status: s.status,
            lesson_title: s.lessons?.title ?? 'Pelajaran',
            module_title: s.lessons?.modules?.title ?? 'Modul',
            subject_name: s.lessons?.modules?.subjects?.name ?? 'Mapel',
        }));

        console.log(`   ✓ ${student.full_name}: ${mapped.length} jadwal`);

        allSchedules.push({
            studentName: student.full_name,
            schedules: mapped,
        });
    }

    // 4. Generate HTML
    console.log('\n🎨 Generate file HTML...');

    const htmlContent = generateHTML(allSchedules);
    const outputDir = path.resolve(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'jadwal-akselerasi-kelas-1.html');
    fs.writeFileSync(outputPath, htmlContent, 'utf8');

    console.log(`   ✓ File HTML tersimpan: ${outputPath}`);

    console.log('\n================================================================');
    console.log('🎉 GENERATE JADWAL BERHASIL!');
    console.log('================================================================');
    console.log(`📄 File: output/jadwal-akselerasi-kelas-1.html`);
    console.log('');
    console.log('📌 Cara Cetak ke PDF:');
    console.log('   1. Buka file HTML di browser (Chrome/Edge)');
    console.log('   2. Tekan Ctrl+P (atau Cmd+P di Mac)');
    console.log('   3. Pilih "Save as PDF"');
    console.log('   4. Klik "Save"');
    console.log('');
    console.log('📌 Atau print langsung ke kertas:');
    console.log('   1. Buka file HTML di browser');
    console.log('   2. Tekan Ctrl+P');
    console.log('   3. Pilih printer');
    console.log('   4. Klik "Print"');
    console.log('================================================================\n');
}

generateJadwalPDF().catch((err) => {
    console.error('❌ Kesalahan fatal:', err);
    process.exit(1);
});