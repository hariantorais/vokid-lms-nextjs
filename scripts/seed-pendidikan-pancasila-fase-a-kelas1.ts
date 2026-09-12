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

export type LkpdItemType =
    | 'IDENTITY_CARD'
    | 'RULES_CARD'
    | 'SYMBOL_CARD'
    | 'SELF_REFLECTION'
    | 'MATCH_PAIRS'
    | 'DRAWING_FRAME'
    | 'MATH_PROBLEM'
    | 'EXPRESSION_CARD';

export interface LkpdItem {
    id: string | number;
    type: LkpdItemType;
    question: string;
    answer_key?: string;
    explanation?: string;
    data?: Record<string, unknown>;
}

interface LessonItem {
    title: string;
    order_index: number;
    learning_objectives: string;
    content_text: string;
    ppkn_element: string;
    required_materials: string[];
    intro_guide: {
        duration_minutes: number;
        greeting: string;
        ice_breaker: string;
        apperception: string;
        trigger_question: string;
    };
    mindful_guide: {
        duration_minutes: number;
        concept_focus: string;
        concrete_steps: string[];
        script_parent: string;
    };
    joyful_guide: {
        duration_minutes: number;
        game_title: string;
        game_rules: string[];
        multi_grade_adaptation: {
            child_level_basic: string;
            child_level_advanced: string;
        };
    };
    meaningful_guide: {
        duration_minutes: number;
        task_focus: string;
        worksheet_print_ready: {
            title: string;
            instructions: string;
            section_a_basic: LkpdItem[];
            section_b_enrichment: LkpdItem[];
        };
        reflection_questions: string[];
    };
    assignments: Array<{
        type: 'PHOTO_HOMEWORK' | 'VOICE_TASK' | 'QUIZ_CBT';
        prompt: string;
        quiz_questions?: Array<{
            question_text: string;
            option_a: string;
            option_b: string;
            option_c: string;
            option_d: string;
            correct_answer: 'A' | 'B' | 'C' | 'D';
        }>;
    }>;
}

interface ChapterItem {
    chapter_number: number;
    title: string;
    target_semester: number;
    week_target: number;
    lessons: LessonItem[];
}

function buildContentText(params: {
    title: string;
    objectives: string[];
    subMaterial: string;
    cpHolistic: {
        pancasila: string;
        uud: string;
        bhinneka: string;
        nkri: string;
    };
    triggerQuestion: string;
    activities: {
        mindful: string;
        joyful: string;
        meaningful: string;
    };
    materials: string[];
    karakter: string[];
    parentTips: string[];
    difficulties: Array<{ issue: string; solution: string }>;
    extensions: string[];
    appreciationStage: string;
    journal: string[];
    reflection: string[];
}): string {
    return `**${params.title}**

🎯 **Tujuan Pembelajaran**:
${params.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

📖 **Materi Pokok**:
${params.subMaterial}

🇮🇩 **Elemen CP yang Dikembangkan**:
- **Pancasila**: ${params.cpHolistic.pancasila}
- **UUD NRI 1945**: ${params.cpHolistic.uud}
- **Bhinneka Tunggal Ika**: ${params.cpHolistic.bhinneka}
- **NKRI**: ${params.cpHolistic.nkri}

🔍 **Pertanyaan Pematik**:
"${params.triggerQuestion}"

👐 **Aktivitas Belajar (70 menit)**:
1. **Mindful Learning (20 menit)** — ${params.activities.mindful}
2. **Joyful Learning (20 menit)** — ${params.activities.joyful}
3. **Meaningful Learning (15 menit)** — ${params.activities.meaningful}

🛠️ **Alat & Bahan**:
${params.materials.map((m) => `- ${m}`).join('\n')}

🌟 **Nilai Karakter yang Ditanamkan** (8 Profil Lulusan):
${params.karakter.map((k) => `- ✅ ${k}`).join('\n')}

💡 **Tips untuk Orang Tua**:
${params.parentTips.map((t) => `- ${t}`).join('\n')}

⚠️ **Kesulitan Umum & Solusinya**:
${params.difficulties.map((d) => `- **${d.issue}** → ${d.solution}`).join('\n')}

🌟 **Pengayaan**:
${params.extensions.map((e) => `- ${e}`).join('\n')}

🎭 **Panggung Apresiasi**:
${params.appreciationStage}

📅 **Jurnal Pembiasaan di Rumah** (diparaf orang tua):
${params.journal.map((j) => `- [ ] ${j}`).join('\n')}

📝 **Refleksi Siswa**:
${params.reflection.map((r) => `- ${r}`).join('\n')}

📚 **Referensi**:
Canny Ilmiati, dkk. 2023. Buku Siswa Pendidikan Pancasila untuk kelas I. Jakarta: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.`;
}

const CHAPTERS_DATA: ChapterItem[] = [
    // ===========================================================================
    // 🇮🇩 BAB 1: AKU DAN TEMAN-TEMANKU (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 1,
        title: 'Bab 1 Aku dan Teman-Temanku',
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Pertemuan 1: Aku Mengenal Diriku',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menyebutkan identitas diri (nama, usia, jenis kelamin, hobi) dan bersyukur atas karunia Tuhan Yang Maha Esa dengan menjaga kebersihan diri.',
                content_text: buildContentText({
                    title: 'Pertemuan 1: Aku Mengenal Diriku',
                    objectives: [
                        'Menyebutkan identitas diri sendiri (nama, usia, jenis kelamin)',
                        'Mengenal bagian-bagian anggota tubuh',
                        'Menunjukkan sikap bersyukur atas karunia Tuhan dengan menjaga kebersihan diri',
                    ],
                    subMaterial:
                        'Mengenal **identitas diri**: nama, usia, jenis kelamin, dan hobi. Peserta didik juga diajak mengenal bagian-bagian **anggota tubuh** yang merupakan karunia Tuhan Yang Maha Esa, serta belajar **menjaga kebersihan diri** sebagai bentuk syukur.',
                    cpHolistic: {
                        pancasila: 'Mengenal diri sebagai ciptaan Tuhan YME dan bersyukur atas karunia-Nya.',
                        uud: 'Mengenal hak dasar anak untuk memiliki nama dan identitas diri.',
                        bhinneka: 'Menghargai keunikan diri sendiri sebagai bagian dari keberagaman.',
                        nkri: 'Mengenal diri sebagai warga negara Indonesia yang bangga terhadap identitasnya.',
                    },
                    triggerQuestion:
                        'Bagaimana cara berkenalan dengan teman baru? Bagaimana aturan permainan yang harus dilakukan?',
                    activities: {
                        mindful:
                            'Guru memberikan contoh menyebutkan identitas diri. Setiap siswa memperkenalkan diri dengan menyebutkan nama, usia, dan jenis kelamin. Siswa mengamati gambar anak bercermin untuk menyadari pentingnya menjaga kebersihan diri.',
                        joyful:
                            'Permainan "Temukan Temanmu" — siswa mencari teman dengan kesamaan atau perbedaan tertentu. Dilanjutkan bernyanyi lagu "Aku dan Temanku" yang menekankan perbedaan jenis kelamin dan pentingnya saling menghormati.',
                        meaningful:
                            'Diskusi kelompok tentang aturan bermain bersama (berbagi giliran, adil, tidak memukul). Setiap kelompok mempresentasikan hasil diskusinya.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Cermin kecil (untuk aktivitas bercermin)',
                        'Kertas karton / kertas origami',
                        'Krayon dan pensil warna',
                        'LKPD (Lembar Kerja Peserta Didik)',
                    ],
                    karakter: [
                        'Keimanan & Ketakwaan (bersyukur atas karunia Tuhan)',
                        'Kemandirian (mengenal diri sendiri)',
                        'Komunikasi (berani memperkenalkan diri)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan identitasnya di depan cermin setiap pagi',
                        'Beri apresiasi saat anak berani menyebutkan nama, usia, dan jenis kelaminnya',
                        'Ceritakan kisah kelahiran anak sebagai bentuk syukur kepada Tuhan',
                        'Biasakan anak menjaga kebersihan diri: mandi, sikat gigi, cuci tangan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malu menyebutkan identitas diri',
                            solution: 'mulai dari permainan sederhana, beri contoh dulu, apresiasi setiap usaha',
                        },
                        {
                            issue: 'Anak bingung membedakan jenis kelamin',
                            solution: 'gunakan gambar/boneka laki-laki & perempuan, jelaskan ciri sederhananya',
                        },
                        {
                            issue: 'Anak lupa usianya',
                            solution: 'latih dengan lagu ulang tahun, tempel angka usia di kamar',
                        },
                    ],
                    extensions: [
                        'Membuat "Topi Identitas" dari karton dengan nama anak',
                        'Menggambar wajah sendiri di cermin dan melabeli bagian tubuh',
                        'Membuat buku kecil "Aku dan Diriku" berisi identitas & foto',
                    ],
                    appreciationStage:
                        'Tempel "Topi Identitas" atau "Buku Aku dan Diriku" di dinding kamar. Ajak anak bercerita tentang identitasnya ke anggota keluarga.',
                    journal: [
                        'Hari 1: Sikat gigi pagi & malam',
                        'Hari 2: Mandi sendiri',
                        'Hari 3: Cuci tangan sebelum makan',
                        'Hari 4: Merapikan rambut sendiri',
                        'Hari 5: Bersyukur dengan berdoa sebelum tidur',
                    ],
                    reflection: [
                        'Siapa nama lengkapmu?',
                        'Berapa usiamu sekarang?',
                        'Kamu laki-laki atau perempuan?',
                        'Apa yang kamu lakukan untuk menjaga kebersihan dirimu?',
                    ],
                }),
                ppkn_element: 'Bhinneka Tunggal Ika',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Cermin kecil',
                    'Kertas karton',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan hangat dan mengajak berdoa bersama. "Selamat pagi, anak-anak hebat! Hari ini kita akan belajar mengenal diri sendiri!"',
                    ice_breaker:
                        'Guru mengajak siswa bernyanyi lagu "Aku Anak Sehat" untuk membangun suasana belajar menyenangkan.',
                    apperception:
                        'Guru mengajukan pertanyaan: "Siapa yang bisa menyebutkan namanya dan usianya?"',
                    trigger_question:
                        'Bagaimana cara berkenalan dengan teman baru yang belum kita kenal?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Mengenal identitas diri (nama, usia, jenis kelamin) dan bersyukur atas karunia Tuhan berupa tubuh yang sehat.',
                    concrete_steps: [
                        'Guru memberikan contoh menyebutkan identitas: "Nama saya Bu Guru, usia saya 30 tahun, saya perempuan."',
                        'Setiap siswa diminta memperkenalkan diri: nama, usia, dan jenis kelamin.',
                        'Guru menunjukkan gambar anak bercermin — diskusikan pentingnya menjaga kebersihan.',
                        'Siswa menyebutkan bagian-bagian tubuh dan fungsinya.',
                        'Ulangi 3x dengan tempo berbeda untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Kita harus bersyukur kepada Tuhan karena sudah diberi tubuh yang sehat. Caranya dengan menjaga kebersihan dan mengenal diri sendiri."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Temukan Temanmu',
                    game_rules: [
                        'Guru mengajak siswa bermain mencari teman dengan kesamaan atau perbedaan.',
                        'Contoh instruksi: "Temukan teman yang seumur denganmu!" atau "Cari teman yang jenis kelaminnya berbeda darimu!"',
                        'Siswa bekerja sama dalam kelompok kecil untuk menemukan teman.',
                        'Siswa yang paling cepat diberi apresiasi berupa stiker atau pujian.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menemukan 1 teman dengan kriteria sederhana.',
                        child_level_advanced: 'Menemukan 3 teman dengan kriteria berbeda sekaligus.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Mengisi kartu identitas diri dan menyusun aturan bermain bersama teman.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: AKU MENGENAL DIRIKU',
                        instructions:
                            'Isi kartu identitas dirimu dengan lengkap, lalu gambarkan wajahmu di kotak yang tersedia.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'IDENTITY_CARD',
                                question:
                                    'Isi kartu identitas dirimu dengan lengkap! Tulis nama, usia, jenis kelamin, dan hobimu.',
                                data: {
                                    fields: [
                                        { label: 'Nama Lengkap', icon: '👤', placeholder: 'Tulis namamu' },
                                        { label: 'Usia', icon: '🎂', placeholder: 'Berapa usiamu?' },
                                        { label: 'Jenis Kelamin', icon: '👦👧', placeholder: 'Laki-laki / Perempuan' },
                                        { label: 'Hobi / Kesukaan', icon: '⭐', placeholder: 'Apa yang kamu sukai?' },
                                    ],
                                    avatar: '🧒',
                                },
                                answer_key:
                                    'Siswa mengisi semua kolom dengan benar sesuai identitasnya.',
                                explanation:
                                    'Melatih kesadaran diri dan kemampuan berkomunikasi tentang identitas.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah wajahmu sendiri di kotak berikut! Jangan lupa menambahkan mata, hidung, dan mulut.',
                                data: {
                                    prompt: 'Wajahku',
                                    guideLines: 'dots',
                                    rows: 1,
                                    label: 'Wajahku:',
                                },
                                answer_key:
                                    'Siswa menggambar wajah dengan mata, hidung, dan mulut.',
                                explanation:
                                    'Melatih motorik halus dan kesadaran diri.',
                            },
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu saat memperkenalkan diri hari ini?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat memperkenalkan diri hari ini?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Percaya Diri' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Malu / Belum Berani' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation:
                                    'Melatih kesadaran emosi dan refleksi diri.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 4,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarkan kegiatan yang kamu lakukan untuk menjaga kebersihan dirimu (misalnya: mandi, sikat gigi, atau cuci tangan)!',
                                data: {
                                    prompt: 'Aku menjaga kebersihanku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Cara aku menjaga kebersihan:',
                                },
                                answer_key:
                                    'Siswa menggambar salah satu kegiatan menjaga kebersihan.',
                                explanation:
                                    'Menanamkan nilai kemandirian dan tanggung jawab.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Siapa nama lengkapmu?',
                        'Berapa usiamu sekarang?',
                        'Apa yang kamu lakukan untuk menjaga kebersihan dirimu?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil mengisi kartu identitas pada LKPD 1.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 2: Aku Mengenal Teman-Temanku',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal teman-temannya berdasarkan jenis kelamin dan menghargai perbedaan yang ada di antara teman.',
                content_text: buildContentText({
                    title: 'Pertemuan 2: Aku Mengenal Teman-Temanku',
                    objectives: [
                        'Mengenal teman-teman di kelas berdasarkan nama dan jenis kelamin',
                        'Menghargai perbedaan yang ada di antara teman',
                        'Bekerja sama dengan teman dalam kegiatan kelompok',
                    ],
                    subMaterial:
                        'Mengenal **perbedaan teman** berdasarkan jenis kelamin (laki-laki dan perempuan). Belajar bahwa setiap teman itu unik dan istimewa — perbedaan bukan alasan untuk mengejek, justru kekayaan yang indah.',
                    cpHolistic: {
                        pancasila: 'Mengenal teman sebagai sesama ciptaan Tuhan YME.',
                        uud: 'Mengenal hak setiap anak untuk diperlakukan adil tanpa membeda-bedakan.',
                        bhinneka: 'Menghargai keberagaman jenis kelamin, hobi, dan sifat teman.',
                        nkri: 'Mengenal teman sebagai sesama warga Indonesia yang beragam.',
                    },
                    triggerQuestion:
                        'Siapa yang sudah punya banyak teman di kelas ini? Apa perbedaan yang kalian lihat pada teman-temanmu?',
                    activities: {
                        mindful:
                            'Guru menjelaskan perbedaan antara laki-laki dan perempuan secara sederhana (rambut, pakaian, suara). Siswa mengamati teman-temannya dengan cara yang santun dan menghargai.',
                        joyful:
                            'Permainan "Siapa Temanku?" — setiap kelompok diberikan kartu ciri-ciri fisik teman, siswa menebak nama temannya. Dilanjutkan bernyanyi lagu "Kita Semua Teman, Walau Beda-Beda".',
                        meaningful:
                            'Buat aturan bermain bersama dan tuliskan di kertas poster. Setiap kelompok mempresentasikan hasilnya.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Kartu ciri-ciri teman',
                        'Kertas poster besar',
                        'Spidol warna',
                        'LKPD',
                    ],
                    karakter: [
                        'Kolaborasi (bekerja sama dalam kelompok)',
                        'Komunikasi (memperkenalkan teman)',
                        'Kewargaan (menghargai perbedaan)',
                    ],
                    parentTips: [
                        'Ajak anak mengingat nama-nama teman sekelasnya',
                        'Ceritakan keberagaman teman sebagai kekayaan yang indah',
                        'Beri contoh menghargai perbedaan di rumah',
                        'Dampingi anak saat bercerita tentang teman-temannya',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak mengejek perbedaan teman',
                            solution: 'beri pemahaman bahwa semua ciptaan Tuhan itu istimewa, beri contoh positif',
                        },
                        {
                            issue: 'Anak malu berinteraksi dengan teman',
                            solution: 'mulai dari aktivitas berpasangan, beri apresiasi setiap interaksi',
                        },
                        {
                            issue: 'Anak tidak mau berkelompok dengan lawan jenis',
                            solution: 'jelaskan bahwa bekerja sama bisa dengan siapa saja',
                        },
                    ],
                    extensions: [
                        'Membuat "Buku Sahabatku" berisi nama & foto teman-teman',
                        'Menggambar kelas impian dengan semua teman',
                        'Wawancarai 3 teman tentang hobi mereka',
                    ],
                    appreciationStage:
                        'Tempel "Aturan Bermain Bersama" di dinding kelas. Rayakan keberhasilan berinteraksi dengan teman-teman.',
                    journal: [
                        'Hari 1: Menyapa 3 teman di sekolah',
                        'Hari 2: Bermain bersama 1 teman baru',
                        'Hari 3: Membantu 1 teman yang kesulitan',
                        'Hari 4: Berbagi mainan dengan teman',
                        'Hari 5: Memuji 1 teman setiap hari',
                    ],
                    reflection: [
                        'Siapa nama 3 teman yang paling kamu kenal di kelas?',
                        'Apa perbedaan yang kamu lihat pada temanmu?',
                        'Bagaimana perasaanmu saat bermain dengan teman?',
                    ],
                }),
                ppkn_element: 'Bhinneka Tunggal Ika',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Kartu ciri-ciri',
                    'Kertas poster',
                    'Spidol',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan hangat: "Selamat pagi anak-anak hebat! Siapa yang punya banyak teman di kelas ini?"',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Anggota Tubuhku" untuk membangun suasana menyenangkan.',
                    apperception:
                        'Guru mengajukan pertanyaan: "Siapa yang bisa menyebutkan nama teman di sebelahmu?"',
                    trigger_question:
                        'Apa perbedaan yang kalian lihat pada teman-temanmu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Mengenal teman berdasarkan jenis kelamin dan menghargai keberagaman yang ada.',
                    concrete_steps: [
                        'Guru menjelaskan perbedaan laki-laki & perempuan secara sederhana.',
                        'Siswa mengamati teman-temannya dengan cara santun.',
                        'Guru menekankan pentingnya tidak mengejek perbedaan.',
                        'Siswa saling bertanya tentang kesukaan teman.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Setiap teman itu istimewa! Ada yang laki-laki, ada yang perempuan. Semua adalah sahabat kita."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Siapa Temanku?',
                    game_rules: [
                        'Guru membagi siswa menjadi beberapa kelompok.',
                        'Setiap kelompok diberikan kartu ciri-ciri fisik teman.',
                        'Siswa menebak nama teman yang sesuai ciri-ciri di kartu.',
                        'Kelompok dengan tebakan terbanyak diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan ciri sangat mudah (rambut panjang, baju merah).',
                        child_level_advanced: 'Menebak dengan ciri lebih detail (hobi, suara).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Membuat aturan bermain bersama & mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: AKU MENGENAL TEMAN-TEMANKU',
                        instructions:
                            'Perhatikan gambar dan isi kartu tentang teman-temanmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Ini adalah aturan bermain bersama teman. Centang ✓ aturan yang sudah kamu patuhi!',
                                data: {
                                    rules: [
                                        { name: 'Berbagi giliran', icon: '🔄', description: 'Menunggu giliran dengan sabar' },
                                        { name: 'Berbagi mainan', icon: '🤝', description: 'Meminjamkan mainan dengan senang hati' },
                                        { name: 'Tidak berebut', icon: '✋', description: 'Menunggu tanpa merebut' },
                                        { name: 'Bermain dengan adil', icon: '⚖️', description: 'Mengikuti aturan permainan' },
                                        { name: 'Tidak memukul teman', icon: '🚫', description: 'Menyelesaikan masalah dengan bicara' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang aturan yang sudah dipatuhi.',
                                explanation:
                                    'Melatih sikap patuh terhadap aturan bermain bersama.',
                            },
                            {
                                id: 2,
                                type: 'SELF_REFLECTION',
                                question:
                                    'Bagaimana perasaanmu saat bermain bersama teman-teman?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat bermain bersama teman?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Gembira' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Sedih / Ada Masalah' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi emosi sosial.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah kamu dan temanmu sedang bermain bersama dengan gembira!',
                                data: {
                                    prompt: 'Aku dan temanku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku dan temanku:',
                                },
                                answer_key: 'Siswa menggambar dirinya dengan teman.',
                                explanation: 'Melatih interaksi sosial melalui seni.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Siapa nama teman yang paling kamu kenal di kelas?',
                        'Apa perbedaan yang kamu lihat pada temanmu?',
                        'Bagaimana perasaanmu saat bermain dengan teman?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil LKPD 1.2 dan kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 3: Aku Mengenal Aturan Main Bersama Teman',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menjelaskan pentingnya aturan ketika bermain bersama teman dan mematuhi aturan tersebut dengan penuh tanggung jawab.',
                content_text: buildContentText({
                    title: 'Pertemuan 3: Aku Mengenal Aturan Main Bersama Teman',
                    objectives: [
                        'Menjelaskan pentingnya aturan saat bermain bersama teman',
                        'Menyebutkan contoh aturan bermain yang adil',
                        'Mematuhi aturan bermain dengan penuh tanggung jawab',
                    ],
                    subMaterial:
                        'Memahami **aturan bermain** bersama teman: berbagi giliran, tidak berebut, mengikuti aturan permainan, dan menghormati teman. Aturan membuat permainan menjadi seru dan menyenangkan untuk semua.',
                    cpHolistic: {
                        pancasila: 'Menerapkan nilai-nilai Pancasila (sila ke-2) dengan bersikap adil kepada teman.',
                        uud: 'Mengenal pentingnya mematuhi aturan bersama.',
                        bhinneka: 'Menghargai perbedaan dan bermain dengan adil untuk semua.',
                        nkri: 'Mengenal aturan sebagai dasar hidup bersama di masyarakat.',
                    },
                    triggerQuestion:
                        'Apa yang terjadi jika kita bermain tanpa aturan? Mengapa aturan penting?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pentingnya aturan bermain. Siswa berbagi pengalaman bermain yang menyenangkan dengan aturan dan tanpa aturan.',
                        joyful:
                            'Permainan "Lempar Bola Bergiliran" — siswa membuat aturan bersama (lempar pelan, giliran main). Refleksi tentang pentingnya aturan.',
                        meaningful:
                            'Diskusi kelompok tentang aturan yang mereka anggap penting. Menyusun poster aturan bermain bersama.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Bola plastik kecil',
                        'Kertas poster',
                        'Spidol warna',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (mematuhi aturan)',
                        'Kolaborasi (bekerja sama dengan teman)',
                        'Penalaran Kritis (memahami pentingnya aturan)',
                    ],
                    parentTips: [
                        'Beri contoh aturan di rumah dan mengapa aturan itu penting',
                        'Ajak anak membuat aturan bermain di rumah bersama keluarga',
                        'Beri apresiasi saat anak mematuhi aturan tanpa diingatkan',
                        'Beri konsekuensi yang adil jika aturan dilanggar',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak tidak mau mengikuti aturan',
                            solution: 'beri penjelasan mengapa aturan penting, kaitkan dengan keadilan',
                        },
                        {
                            issue: 'Anak marah saat kalah',
                            solution: 'ajarkan sportivitas: yang penting bermain, bukan hanya menang',
                        },
                        {
                            issue: 'Anak curang dalam permainan',
                            solution: 'jelaskan bahwa curang membuat teman sedih, ajarkan kejujuran',
                        },
                    ],
                    extensions: [
                        'Membuat papan aturan bermain bersama di rumah',
                        'Merancang permainan baru bersama keluarga dengan aturan yang jelas',
                        'Menonton video anak-anak bermain dengan sportif',
                    ],
                    appreciationStage:
                        'Tempel poster aturan bermain di dinding kelas. Beri apresiasi kepada siswa yang mematuhi aturan dengan baik.',
                    journal: [
                        'Hari 1: Mengikuti aturan saat makan bersama keluarga',
                        'Hari 2: Mematuhi aturan tidur tepat waktu',
                        'Hari 3: Bermain sesuai aturan dengan saudara',
                        'Hari 4: Menerima kalah dengan sportif',
                        'Hari 5: Mengajak teman mematuhi aturan',
                    ],
                    reflection: [
                        'Mengapa aturan penting saat bermain?',
                        'Apa yang terjadi jika kita tidak mematuhi aturan?',
                        'Bagaimana perasaanmu setelah bermain dengan aturan?',
                    ],
                }),
                ppkn_element: 'UUD NRI 1945',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Bola plastik kecil',
                    'Kertas poster',
                    'Spidol',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan hangat: "Hari ini kita akan belajar tentang aturan bermain bersama teman!"',
                    ice_breaker:
                        'Guru mengajak siswa bernyanyi lagu tentang persahabatan dan aturan.',
                    apperception:
                        'Guru bertanya: "Siapa yang suka bermain dengan teman? Apa aturan yang kalian buat saat bermain?"',
                    trigger_question:
                        'Mengapa aturan penting saat bermain?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Aturan membuat permainan menjadi adil, aman, dan menyenangkan untuk semua.',
                    concrete_steps: [
                        'Guru menjelaskan aturan bermain dan mengapa penting.',
                        'Siswa berbagi pengalaman bermain dengan/tanpa aturan.',
                        'Diskusi: apa yang terjadi jika tidak ada aturan?',
                        'Siswa menyusun aturan bermain bersama.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Aturan itu seperti pagar taman: membuat semua bermain dengan aman dan nyaman."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lempar Bola Bergiliran',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok kecil.',
                        'Setiap kelompok membuat aturan main bersama (lempar pelan, giliran main, tidak berebut).',
                        'Siswa bermain sesuai aturan yang disepakati.',
                        'Setelah selesai, diskusikan: bagaimana rasanya bermain dengan aturan?',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengikuti aturan dengan panduan guru.',
                        child_level_advanced: 'Membuat aturan sendiri dan mengevaluasi kepatuhan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Membuat poster aturan bermain bersama & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.3: ATURAN MAIN BERSAMA TEMAN',
                        instructions:
                            'Tuliskan aturan bermain yang kamu ketahui dan beri centang untuk aturan yang sudah kamu patuhi!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Perhatikan aturan bermain berikut. Centang ✓ aturan yang sudah kamu patuhi hari ini!',
                                data: {
                                    rules: [
                                        { name: 'Menunggu giliran', icon: '⏳', description: 'Sabar menunggu tanpa berebut' },
                                        { name: 'Berbagi mainan', icon: '🧸', description: 'Meminjamkan mainan dengan senang hati' },
                                        { name: 'Mengikuti aturan permainan', icon: '📜', description: 'Bermain sesuai kesepakatan' },
                                        { name: 'Bermain dengan jujur', icon: '🤗', description: 'Tidak curang saat bermain' },
                                        { name: 'Menerima kalah dengan sabar', icon: '🏅', description: 'Yang penting bermain, bukan hanya menang' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang aturan yang sudah dipatuhi.',
                                explanation: 'Melatih kepatuhan terhadap aturan.',
                            },
                            {
                                id: 2,
                                type: 'SELF_REFLECTION',
                                question:
                                    'Bagaimana perasaanmu setelah mematuhi aturan bermain bersama teman?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah bermain dengan aturan?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Puas' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Sedih / Tidak Puas' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih kesadaran emosi dan sportivitas.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah poster sederhana berisi aturan bermain bersama teman!',
                                data: {
                                    prompt: 'Poster aturan bermain',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Poster aturanku:',
                                },
                                answer_key: 'Siswa menggambar poster aturan sederhana.',
                                explanation: 'Melatih kreativitas dan pemahaman aturan.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa aturan penting saat bermain?',
                        'Apa yang terjadi jika tidak ada aturan?',
                        'Aturan apa yang paling penting menurutmu?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menyebutkan 3 aturan bermain yang harus dipatuhi!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 1: Aku dan Teman-Temanku',
                        quiz_questions: [
                            {
                                question_text: 'Saat bermain dengan teman, kita harus...',
                                option_a: 'Berebut mainan',
                                option_b: 'Menunggu giliran',
                                option_c: 'Memukul teman',
                                option_d: 'Marah jika kalah',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Mengapa kita perlu mematuhi aturan bermain?',
                                option_a: 'Agar teman marah',
                                option_b: 'Agar permainan adil dan menyenangkan',
                                option_c: 'Agar menang terus',
                                option_d: 'Agar bisa curang',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Jika kita kalah dalam permainan, sikap yang baik adalah...',
                                option_a: 'Marah dan menangis',
                                option_b: 'Menerima dengan sportif',
                                option_c: 'Menyalahkan teman',
                                option_d: 'Tidak mau bermain lagi',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Salah satu bentuk menghargai perbedaan teman adalah...',
                                option_a: 'Mengejek perbedaan',
                                option_b: 'Bermain dengan semua teman',
                                option_c: 'Memilih teman tertentu saja',
                                option_d: 'Menjauhi teman yang berbeda',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🇮🇩 BAB 2: AKU PATUH PADA ATURAN (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 2,
        title: 'Bab 2 Aku Patuh pada Aturan',
        target_semester: 1,
        week_target: 4,
        lessons: [
            {
                title: 'Pertemuan 4: Aturan dalam Keluargaku',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal dan menyebutkan aturan-aturan yang berlaku di rumah/keluarga serta memahami pentingnya aturan untuk hidup rukun.',
                content_text: buildContentText({
                    title: 'Pertemuan 4: Aturan dalam Keluargaku',
                    objectives: [
                        'Menyebutkan aturan-aturan yang ada di rumah',
                        'Memahami pentingnya aturan untuk hidup rukun dalam keluarga',
                        'Menunjukkan sikap menghormati aturan keluarga',
                    ],
                    subMaterial:
                        'Mengenal **aturan di rumah** seperti tidur tepat waktu, membantu orang tua, merapikan mainan, dan mencuci tangan sebelum makan. Aturan ini membuat keluarga hidup rukun dan nyaman.',
                    cpHolistic: {
                        pancasila: 'Menerapkan nilai-nilai Pancasila (sila ke-1 & ke-2) dengan hormat kepada orang tua.',
                        uud: 'Mengenal aturan sebagai bentuk kesepakatan bersama dalam keluarga.',
                        bhinneka: 'Menghargai peran setiap anggota keluarga.',
                        nkri: 'Mengenal aturan keluarga sebagai dasar aturan masyarakat yang lebih luas.',
                    },
                    triggerQuestion:
                        'Apa aturan yang ada di rumahmu? Mengapa kamu harus mematuhinya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pentingnya aturan di rumah. Siswa berbagi cerita tentang aturan di rumah masing-masing.',
                        joyful:
                            'Permainan "Siapa yang Patuh?" — siswa menentukan apakah suatu situasi mencerminkan kepatuhan atau tidak. Dilanjutkan bernyanyi lagu "Bangun Pagi, Patuh pada Ayah dan Ibu".',
                        meaningful:
                            'Membuat poster aturan di rumah dan mempresentasikannya.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Kertas gambar',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Keimanan & Ketakwaan (berbakti kepada orang tua)',
                        'Kemandirian (mematuhi aturan tanpa diingatkan)',
                        'Kewargaan (menghormati aturan keluarga)',
                    ],
                    parentTips: [
                        'Beri contoh aturan keluarga dan mengapa aturan itu ada',
                        'Buat jadwal harian keluarga yang jelas dan menyenangkan',
                        'Beri apresiasi saat anak mematuhi aturan',
                        'Diskusikan bersama anak konsekuensi jika aturan dilanggar',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak lupa mematuhi aturan',
                            solution: 'buat pengingat visual (poster aturan) di tempat strategis',
                        },
                        {
                            issue: 'Anak melanggar aturan karena bosan',
                            solution: 'buat aturan yang menyenangkan, libatkan anak dalam membuat aturan',
                        },
                    ],
                    extensions: [
                        'Membuat jadwal harian keluarga',
                        'Membuat buku aturan rumah dengan gambar',
                        'Berlomba bersama saudara mematuhi aturan keluarga',
                    ],
                    appreciationStage:
                        'Tempel poster aturan rumah di kamar atau dapur. Rayakan keberhasilan mingguan mematuhi aturan keluarga.',
                    journal: [
                        'Hari 1: Bangun pagi tepat waktu',
                        'Hari 2: Merapikan tempat tidur sendiri',
                        'Hari 3: Membantu orang tua',
                        'Hari 4: Mencuci tangan sebelum makan',
                        'Hari 5: Berpamitan saat berangkat sekolah',
                    ],
                    reflection: [
                        'Apa aturan yang paling sering kamu lakukan di rumah?',
                        'Mengapa aturan itu penting untuk keluargamu?',
                        'Bagaimana perasaanmu saat mematuhi aturan?',
                    ],
                }),
                ppkn_element: 'UUD NRI 1945',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah dan bertanya: "Siapa yang punya aturan di rumah?"',
                    ice_breaker:
                        'Guru mengajak siswa bernyanyi lagu "Bangun Pagi" atau lagu tentang aturan rumah.',
                    apperception:
                        'Guru bertanya: "Apa aturan yang ada di rumah kalian?"',
                    trigger_question:
                        'Mengapa aturan di rumah itu penting?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Aturan keluarga membuat hidup rukun, nyaman, dan teratur.',
                    concrete_steps: [
                        'Guru menjelaskan pentingnya aturan di rumah.',
                        'Siswa berbagi aturan yang ada di rumah masing-masing.',
                        'Guru menunjukkan poster aturan rumah.',
                        'Diskusi tentang manfaat mematuhi aturan keluarga.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Aturan di rumah membuat kita hidup rukun dan bahagia bersama keluarga."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Siapa yang Patuh?',
                    game_rules: [
                        'Guru membagi siswa ke dalam kelompok kecil.',
                        'Setiap kelompok diberi cerita singkat tentang keluarga dengan aturan.',
                        'Siswa menentukan apakah situasi tersebut mencerminkan kepatuhan atau tidak.',
                        'Kelompok dengan jawaban benar terbanyak mendapat apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab dengan bantuan guru.',
                        child_level_advanced: 'Memberikan alasan atas jawabannya.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Membuat poster aturan rumah & merefleksikan kepatuhan.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: ATURAN DALAM KELUARGAKU',
                        instructions:
                            'Perhatikan aturan rumah berikut. Centang ✓ aturan yang sudah kamu patuhi!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Ini aturan di rumah. Centang ✓ aturan yang sudah kamu patuhi minggu ini!',
                                data: {
                                    rules: [
                                        { name: 'Tidur tepat waktu', icon: '🌙', description: 'Tidur sebelum jam 9 malam' },
                                        { name: 'Bangun pagi sendiri', icon: '🌅', description: 'Bangun tanpa dibangunkan' },
                                        { name: 'Merapikan mainan', icon: '🧸', description: 'Merapikan setelah bermain' },
                                        { name: 'Membantu orang tua', icon: '🤝', description: 'Membantu pekerjaan rumah' },
                                        { name: 'Cuci tangan sebelum makan', icon: '🧼', description: 'Cuci tangan dengan sabun' },
                                        { name: 'Berpamitan ke orang tua', icon: '👋', description: 'Berpamitan saat berangkat sekolah' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang aturan yang sudah dipatuhi.',
                                explanation: 'Melatih kepatuhan terhadap aturan rumah.',
                            },
                            {
                                id: 2,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu setelah mematuhi aturan di rumah?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah mematuhi aturan rumah?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bangga' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Sedih / Berat' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih kesadaran emosi.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah salah satu aturan di rumah yang paling kamu sukai!',
                                data: {
                                    prompt: 'Aturan rumah favoritku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aturan rumah favoritku:',
                                },
                                answer_key: 'Siswa menggambar aturan rumah.',
                                explanation: 'Melatih pemahaman aturan melalui seni.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa aturan di rumah yang paling penting menurutmu?',
                        'Mengapa kamu harus mematuhinya?',
                        'Bagaimana perasaanmu saat mematuhi aturan?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil mengisi kartu aturan rumah pada LKPD 2.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 5: Aku Mematuhi Aturan di Rumah',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menunjukkan perilaku mematuhi aturan di rumah serta menjelaskan manfaat kepatuhan bagi keharmonisan keluarga.',
                content_text: buildContentText({
                    title: 'Pertemuan 5: Aku Mematuhi Aturan di Rumah',
                    objectives: [
                        'Menunjukkan perilaku mematuhi aturan di rumah',
                        'Menjelaskan manfaat mematuhi aturan bagi keluarga',
                        'Membuat jadwal harian sebagai bentuk kepatuhan',
                    ],
                    subMaterial:
                        'Menerapkan **kepatuhan pada aturan rumah** seperti jadwal harian, membantu orang tua, dan disiplin. Kepatuhan membuat keluarga bahagia dan anak tumbuh disiplin.',
                    cpHolistic: {
                        pancasila: 'Menerapkan nilai-nilai sila ke-2 dengan menghormati aturan keluarga.',
                        uud: 'Menjalankan hak dan kewajiban sebagai anggota keluarga.',
                        bhinneka: 'Menghargai peran setiap anggota keluarga dalam menjalankan aturan.',
                        nkri: 'Menumbuhkan sikap disiplin sebagai bekal menjadi warga negara yang baik.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kamu menunjukkan kepatuhan pada aturan di rumah?',
                    activities: {
                        mindful:
                            'Guru menjelaskan manfaat kepatuhan. Siswa berbagi pengalaman patuh atau pernah melanggar aturan dan akibatnya.',
                        joyful:
                            'Bermain peran tentang aturan di rumah (merapikan mainan, mencuci tangan sebelum makan, tidur tepat waktu).',
                        meaningful:
                            'Membuat jadwal harian rumah dan mempresentasikannya.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Kertas untuk jadwal harian',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Kemandirian (disiplin mematuhi aturan)',
                        'Kewargaan (tanggung jawab)',
                        'Kesehatan (menjaga pola hidup teratur)',
                    ],
                    parentTips: [
                        'Beri contoh perilaku patuh setiap hari',
                        'Buat jadwal harian bersama anak dan tempel di kamar',
                        'Beri apresiasi saat anak mematuhi jadwal',
                        'Diskusikan bersama jika ada aturan yang sulit dipatuhi',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak sulit disiplin',
                            solution: 'buat jadwal yang realistis, mulai dari kebiasaan kecil',
                        },
                        {
                            issue: 'Anak bosan dengan aturan',
                            solution: 'variasikan kegiatan dan beri reward sederhana',
                        },
                    ],
                    extensions: [
                        'Membuat buku "Jadwal Harianku" dengan gambar',
                        'Berlomba disiplin dengan saudara',
                        'Bikin video pendek tentang rutinitas patuh aturan',
                    ],
                    appreciationStage:
                        'Tempel jadwal harian di kamar. Rayakan setiap minggu keberhasilan mematuhi jadwal.',
                    journal: [
                        'Hari 1: Menjalankan jadwal bangun pagi',
                        'Hari 2: Merapikan tempat tidur',
                        'Hari 3: Mencuci tangan sebelum makan',
                        'Hari 4: Belajar pada waktunya',
                        'Hari 5: Tidur tepat waktu',
                    ],
                    reflection: [
                        'Bagaimana perasaanmu saat sudah mematuhi semua aturan?',
                        'Apa manfaat mematuhi aturan bagi keluargamu?',
                        'Aturan mana yang paling sulit dipatuhi?',
                    ],
                }),
                ppkn_element: 'UUD NRI 1945',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Kertas',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan hangat dan mengajak berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Bangun Tidur" atau lagu tentang rutinitas.',
                    apperception:
                        'Guru bertanya: "Siapa yang tadi pagi sudah mematuhi aturan di rumah?"',
                    trigger_question:
                        'Apa manfaat mematuhi aturan di rumah?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Kepatuhan membawa keberkahan dan keharmonisan dalam keluarga.',
                    concrete_steps: [
                        'Guru menjelaskan pentingnya disiplin.',
                        'Siswa berbagi pengalaman patuh atau melanggar aturan.',
                        'Diskusi akibat dari melanggar aturan.',
                        'Siswa membuat jadwal harian.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Anak yang patuh pada aturan rumah akan tumbuh menjadi pribadi yang disiplin dan bertanggung jawab."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Bermain Peran Aturan Rumah',
                    game_rules: [
                        'Guru membagi siswa dalam beberapa kelompok.',
                        'Setiap kelompok diberikan skenario aturan rumah.',
                        'Siswa bermain peran menampilkan kepatuhan.',
                        'Kelompok terbaik diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Bermain peran dengan bantuan guru.',
                        child_level_advanced: 'Membuat skenario sendiri tentang kepatuhan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Membuat jadwal harian rumah & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: AKU MEMATUHI ATURAN DI RUMAH',
                        instructions:
                            'Buat jadwal harianmu dan centang aturan yang sudah kamu patuhi!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Ini jadwal harian. Centang ✓ kegiatan yang sudah kamu lakukan hari ini!',
                                data: {
                                    rules: [
                                        { name: 'Bangun pagi jam 5', icon: '🌅', description: 'Bangun sebelum matahari terbit' },
                                        { name: 'Merapikan tempat tidur', icon: '🛏️', description: 'Merapikan tempat tidur setelah bangun' },
                                        { name: 'Mandi pagi', icon: '🚿', description: 'Mandi pagi dengan bersih' },
                                        { name: 'Sarapan sehat', icon: '🍳', description: 'Sarapan sebelum sekolah' },
                                        { name: 'Belajar/PR', icon: '📚', description: 'Belajar pada waktunya' },
                                        { name: 'Tidur jam 8 malam', icon: '🌙', description: 'Tidur tepat waktu' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang jadwal yang sudah dilakukan.',
                                explanation: 'Melatih disiplin harian.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang melakukan salah satu kegiatan di jadwal harian!',
                                data: {
                                    prompt: 'Kegiatan harianku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Kegiatan harianku:',
                                },
                                answer_key: 'Siswa menggambar kegiatan harian.',
                                explanation: 'Melatih pemahaman rutinitas.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu setelah mematuhi jadwal harian?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah menjalankan jadwal harian?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Teratur' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Sedih / Berat' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi emosi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana perasaanmu saat sudah mematuhi semua aturan?',
                        'Apa manfaat mematuhi aturan bagi keluargamu?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil mengisi jadwal harian pada LKPD 2.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 6: Aku Peduli dengan Tempat Tinggalku',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menunjukkan sikap peduli terhadap lingkungan tempat tinggal dengan mematuhi aturan kebersihan dan ketertiban.',
                content_text: buildContentText({
                    title: 'Pertemuan 6: Aku Peduli dengan Tempat Tinggalku',
                    objectives: [
                        'Mengenal aturan kebersihan di lingkungan tempat tinggal',
                        'Menunjukkan sikap peduli terhadap lingkungan sekitar rumah',
                        'Mempraktikkan perilaku menjaga kebersihan tempat tinggal',
                    ],
                    subMaterial:
                        'Memahami **aturan di lingkungan tempat tinggal** seperti membuang sampah pada tempatnya, menjaga ketertiban, dan gotong royong. Sikap peduli membuat lingkungan bersih dan nyaman.',
                    cpHolistic: {
                        pancasila: 'Menerapkan nilai-nilai sila ke-3 (Persatuan Indonesia) dengan gotong royong.',
                        uud: 'Mengenal kewajiban menjaga lingkungan sebagai warga.',
                        bhinneka: 'Bekerja sama dengan tetangga yang beragam.',
                        nkri: 'Menumbuhkan cinta tanah air dari lingkungan sekitar.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kamu menjaga kebersihan di lingkungan tempat tinggalmu?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pentingnya menjaga lingkungan. Siswa berdiskusi tentang cara menjaga kebersihan rumah dan tetangga.',
                        joyful:
                            'Permainan "Lingkungan Bersih vs Kotor" — siswa mengelompokkan gambar lingkungan bersih dan kotor, lalu berdiskusi.',
                        meaningful:
                            'Membuat poster ajakan menjaga kebersihan & mensimulasikan gotong royong.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Gambar lingkungan bersih & kotor',
                        'Kertas poster',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta lingkungan)',
                        'Kolaborasi (gotong royong)',
                        'Kesehatan (lingkungan bersih)',
                    ],
                    parentTips: [
                        'Beri contoh membuang sampah pada tempatnya',
                        'Ajak anak bergotong royong di rumah',
                        'Beri apresiasi saat anak peduli lingkungan',
                        'Ceritakan pentingnya lingkungan bersih untuk kesehatan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malas membersihkan',
                            solution: 'jadikan kegiatan menyenangkan, beri reward sederhana',
                        },
                        {
                            issue: 'Anak buang sampah sembarangan',
                            solution: 'beri pemahaman dampaknya, beri contoh langsung',
                        },
                    ],
                    extensions: [
                        'Membersihkan halaman rumah bersama keluarga',
                        'Menanam tanaman kecil di pot',
                        'Membuat tempat sampah hias dari kardus bekas',
                    ],
                    appreciationStage:
                        'Tempel poster "Ayo Jaga Kebersihan" di rumah. Rayakan keberhasilan menjaga lingkungan bersama keluarga.',
                    journal: [
                        'Hari 1: Membuang sampah pada tempatnya',
                        'Hari 2: Menyiram tanaman',
                        'Hari 3: Merapikan halaman',
                        'Hari 4: Membantu ibu menyapu',
                        'Hari 5: Mengingatkan keluarga jaga kebersihan',
                    ],
                    reflection: [
                        'Apa yang kamu lakukan untuk menjaga kebersihan rumahmu?',
                        'Mengapa lingkungan bersih itu penting?',
                        'Bagaimana perasaanmu saat lingkungan bersih?',
                    ],
                }),
                ppkn_element: 'Negara Kesatuan Republik Indonesia',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Gambar lingkungan',
                    'Kertas poster',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan ramah: "Siapa yang rumahnya bersih dan rapi?"',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Lihat Kebunku" atau "Kebersihan Sebagian dari Iman".',
                    apperception:
                        'Guru bertanya: "Apa yang kalian lakukan untuk menjaga kebersihan rumah?"',
                    trigger_question:
                        'Mengapa kita harus menjaga kebersihan lingkungan tempat tinggal?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menjaga kebersihan lingkungan adalah bentuk kepedulian dan tanggung jawab bersama.',
                    concrete_steps: [
                        'Guru menjelaskan aturan kebersihan lingkungan.',
                        'Siswa mengamati gambar lingkungan bersih vs kotor.',
                        'Diskusi cara menjaga kebersihan.',
                        'Siswa menyebutkan kegiatan yang bisa dilakukan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Lingkungan bersih dimulai dari rumah kita sendiri. Yuk, jaga kebersihan bersama!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lingkungan Bersih vs Kotor',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok.',
                        'Setiap kelompok menerima gambar lingkungan bersih & kotor.',
                        'Siswa mengelompokkan gambar dan mendiskusikan perbedaannya.',
                        'Kelompok terbaik diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengelompokkan dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan dampak lingkungan kotor bagi kesehatan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Membuat poster kebersihan & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.3: AKU PEDULI DENGAN TEMPAT TINGGALKU',
                        instructions:
                            'Centang ✓ kegiatan menjaga kebersihan yang sudah kamu lakukan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan menjaga kebersihan tempat tinggal yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Buang sampah pada tempatnya', icon: '🗑️', description: 'Tidak buang sampah sembarangan' },
                                        { name: 'Menyapu halaman', icon: '🧹', description: 'Menyapu halaman rumah' },
                                        { name: 'Menyiram tanaman', icon: '🌱', description: 'Menyiram tanaman setiap hari' },
                                        { name: 'Merapikan sepatu', icon: '👟', description: 'Meletakkan sepatu di rak' },
                                        { name: 'Membantu ibu di dapur', icon: '🍳', description: 'Bantu ibu setelah makan' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan yang sudah dilakukan.',
                                explanation: 'Melatih kepedulian lingkungan.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah poster sederhana "Ayo Jaga Kebersihan Lingkungan!"',
                                data: {
                                    prompt: 'Poster kebersihan',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Poster kebersihanku:',
                                },
                                answer_key: 'Siswa menggambar poster kebersihan.',
                                explanation: 'Melatih kreativitas dan kepedulian.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question:
                                    'Bagaimana perasaanmu saat melihat lingkungan rumah bersih?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat lingkungan bersih?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Nyaman' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Tidak Nyaman' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih kepedulian lingkungan.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa yang kamu lakukan untuk menjaga kebersihan rumah?',
                        'Mengapa kebersihan itu penting?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil poster kebersihan pada LKPD 2.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 2: Aku Patuh pada Aturan',
                        quiz_questions: [
                            {
                                question_text: 'Mematuhi aturan di rumah membuat keluarga menjadi...',
                                option_a: 'Berantakan',
                                option_b: 'Rukun dan nyaman',
                                option_c: 'Sedih',
                                option_d: 'Marah',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh aturan di rumah adalah...',
                                option_a: 'Tidur tepat waktu',
                                option_b: 'Bermain sepanjang malam',
                                option_c: 'Buang sampah sembarangan',
                                option_d: 'Tidak membantu orang tua',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Jika kita mematuhi aturan, orang tua akan...',
                                option_a: 'Marah',
                                option_b: 'Bangga dan senang',
                                option_c: 'Sedih',
                                option_d: 'Kecewa',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Salah satu cara menjaga lingkungan adalah...',
                                option_a: 'Buang sampah pada tempatnya',
                                option_b: 'Menebang pohon sembarangan',
                                option_c: 'Membuang sampah ke sungai',
                                option_d: 'Merusak tanaman',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🇮🇩 BAB 3: AKU MENGENAL INDONESIA (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 3,
        title: 'Bab 3 Aku Mengenal Indonesia',
        target_semester: 2,
        week_target: 7,
        lessons: [
            {
                title: 'Pertemuan 7: Aku Mengenal Bendera Indonesia',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal bendera negara Indonesia (Merah Putih), menyebutkan makna warnanya, dan menunjukkan sikap hormat terhadap bendera.',
                content_text: buildContentText({
                    title: 'Pertemuan 7: Aku Mengenal Bendera Indonesia',
                    objectives: [
                        'Mengenal bendera negara Indonesia (Merah Putih)',
                        'Menyebutkan makna warna merah dan putih pada bendera',
                        'Menunjukkan sikap hormat terhadap bendera negara',
                    ],
                    subMaterial:
                        'Mengenal **bendera Indonesia (Merah Putih)**. Warna **merah** melambangkan keberanian, warna **putih** melambangkan kesucian. Bendera dikibarkan pada upacara bendera setiap hari Senin dan hari besar nasional.',
                    cpHolistic: {
                        pancasila: 'Mengenal bendera sebagai simbol negara Indonesia.',
                        uud: 'Mengenal hak dan kewajiban terhadap bendera negara.',
                        bhinneka: 'Bendera Merah Putih menyatukan seluruh rakyat Indonesia.',
                        nkri: 'Menumbuhkan cinta tanah air dengan hormat pada bendera.',
                    },
                    triggerQuestion:
                        'Apa warna bendera Indonesia? Apa makna warnanya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan sejarah & makna bendera Indonesia. Siswa menyebutkan warna merah & putih serta artinya.',
                        joyful:
                            'Permainan "Bendera" — siswa mencari benda merah & putih di kelas. Dilanjutkan menyanyikan lagu "Bendera Merah Putih" karya Ibu Sud.',
                        meaningful:
                            'Menggambar dan mewarnai bendera Indonesia dengan rapi.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Bendera Merah Putih mini',
                        'Kertas gambar',
                        'Krayon merah & putih',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta tanah air)',
                        'Keimanan & Ketakwaan (syukur atas negara)',
                        'Kreativitas (menggambar bendera)',
                    ],
                    parentTips: [
                        'Tunjukkan bendera di rumah atau saat upacara',
                        'Ceritakan makna warna merah putih dengan bahasa sederhana',
                        'Ajak anak menyanyikan lagu "Bendera Merah Putih"',
                        'Beri apresiasi saat anak menggambar bendera dengan rapi',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak salah mewarnai (merah di bawah)',
                            solution: 'beri contoh gambar yang benar, tunjukkan bendera asli',
                        },
                        {
                            issue: 'Anak kurang hormat pada bendera',
                            solution: 'ceritakan perjuangan pahlawan, ajarkan sikap hormat',
                        },
                    ],
                    extensions: [
                        'Membuat bendera dari kertas origami',
                        'Menonton video upacara bendera bersama keluarga',
                        'Menyanyikan "Indonesia Raya" di rumah setiap Senin',
                    ],
                    appreciationStage:
                        'Pajang gambar bendera anak di dinding rumah. Ajak anak bercerita tentang makna warna bendera.',
                    journal: [
                        'Hari 1: Menyanyikan lagu "Bendera Merah Putih"',
                        'Hari 2: Menggambar bendera di rumah',
                        'Hari 3: Berdiri tegak saat upacara',
                        'Hari 4: Menyanyikan Indonesia Raya dengan khidmat',
                        'Hari 5: Menceritakan makna bendera ke keluarga',
                    ],
                    reflection: [
                        'Apa warna bendera Indonesia?',
                        'Apa arti warna merah dan putih?',
                        'Bagaimana sikap kita saat upacara bendera?',
                    ],
                }),
                ppkn_element: 'Pancasila',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Bendera Merah Putih mini',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan semangat: "Siapa yang tahu warna bendera Indonesia?"',
                    ice_breaker:
                        'Guru memulai dengan tanya jawab sederhana tentang bendera Indonesia.',
                    apperception:
                        'Guru menjelaskan secara singkat tentang arti warna merah dan putih.',
                    trigger_question:
                        'Siapa yang tahu warna bendera Indonesia?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Bendera Merah Putih adalah simbol negara Indonesia. Merah = keberanian, Putih = kesucian.',
                    concrete_steps: [
                        'Guru menjelaskan bendera Indonesia & maknanya.',
                        'Siswa menyebutkan warna merah & putih.',
                        'Guru menunjukkan bendera mini kepada siswa.',
                        'Siswa belajar sikap hormat saat bendera dikibarkan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Bendera Merah Putih adalah lambang negara kita. Merah artinya berani, putih artinya suci."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Permainan Bendera Merah Putih',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok kecil.',
                        'Setiap kelompok mencari benda merah & putih di kelas.',
                        'Kelompok tercepat mendapat apresiasi.',
                        'Dilanjutkan menyanyikan lagu "Bendera Merah Putih".',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mencari benda dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan 5 benda merah & putih.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menggambar bendera Indonesia & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: AKU MENGENAL BENDERA INDONESIA',
                        instructions:
                            'Gambar dan warnai bendera Indonesia dengan rapi!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah bendera Indonesia di kotak berikut! Warnai dengan warna yang benar (merah di atas, putih di bawah).',
                                data: {
                                    prompt: 'Bendera Merah Putih',
                                    guideLines: 'baseline',
                                    rows: 1,
                                    label: 'Bendera Indonesia:',
                                },
                                answer_key:
                                    'Siswa menggambar bendera dengan warna merah di atas dan putih di bawah.',
                                explanation: 'Mengenal simbol negara dengan benar.',
                            },
                            {
                                id: 2,
                                type: 'SELF_REFLECTION',
                                question:
                                    'Bagaimana perasaanmu sebagai anak Indonesia?',
                                data: {
                                    question: 'Bagaimana perasaanmu sebagai anak Indonesia?',
                                    options: [
                                        { emoji: '😊', label: 'Bangga & Cinta Indonesia' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Tahu' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Menumbuhkan rasa cinta tanah air.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang mengikuti upacara bendera dengan sikap hormat!',
                                data: {
                                    prompt: 'Upacara bendera',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku ikut upacara:',
                                },
                                answer_key: 'Siswa menggambar diri saat upacara.',
                                explanation: 'Menanamkan sikap hormat pada bendera.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa warna bendera Indonesia?',
                        'Apa arti warna merah dan putih?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menggambar bendera pada LKPD 3.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 8: Aku Mengenal Lagu Kebangsaan Indonesia',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menyanyikan lagu kebangsaan Indonesia Raya dengan sikap hormat dan memahami maknanya sebagai simbol persatuan bangsa.',
                content_text: buildContentText({
                    title: 'Pertemuan 8: Aku Mengenal Lagu Kebangsaan Indonesia',
                    objectives: [
                        'Mengenal lagu kebangsaan Indonesia Raya',
                        'Menyanyikan lagu Indonesia Raya dengan sikap hormat',
                        'Memahami makna lagu Indonesia Raya sebagai simbol persatuan',
                    ],
                    subMaterial:
                        'Mengenal **lagu kebangsaan Indonesia Raya** ciptaan W.R. Supratman. Lagu ini dinyanyikan saat upacara bendera dengan sikap sempurna, berdiri tegak, dan penuh khidmat.',
                    cpHolistic: {
                        pancasila: 'Mengenal lagu kebangsaan sebagai simbol negara.',
                        uud: 'Mengenal kewajiban menghormati lagu kebangsaan.',
                        bhinneka: 'Lagu Indonesia Raya menyatukan seluruh rakyat Indonesia.',
                        nkri: 'Menumbuhkan cinta tanah air melalui lagu kebangsaan.',
                    },
                    triggerQuestion:
                        'Siapa yang tahu lagu kebangsaan Indonesia? Kapan kita menyanyikannya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan sejarah & makna lagu Indonesia Raya. Siswa menyanyikan lagu dengan sikap hormat.',
                        joyful:
                            'Permainan "Sambung Lirik" — siswa melingkar, guru menyanyikan satu baris, siswa melanjutkan. Dilanjutkan bernyanyi bersama.',
                        meaningful:
                            'Menyanyikan lagu Indonesia Raya bersama dengan sikap hormat & refleksi.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Teks lagu Indonesia Raya',
                        'Speaker (untuk memutar lagu)',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta tanah air)',
                        'Keimanan & Ketakwaan (syukur)',
                        'Komunikasi (menyanyikan dengan percaya diri)',
                    ],
                    parentTips: [
                        'Ajak anak menyanyikan Indonesia Raya setiap Senin pagi',
                        'Ceritakan sejarah singkat lagu Indonesia Raya',
                        'Ajarkan sikap hormat saat menyanyikan',
                        'Beri apresiasi saat anak hafal lagu kebangsaan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak tidak hafal lirik',
                            solution: 'nyanyikan berulang dengan lagu, mulai dari 2 baris dulu',
                        },
                        {
                            issue: 'Anak tidak serius menyanyikan',
                            solution: 'jelaskan makna & pentingnya lagu kebangsaan',
                        },
                    ],
                    extensions: [
                        'Menonton video upacara bendera',
                        'Menyanyikan Indonesia Raya di rumah setiap Senin',
                        'Belajar lagu wajib nasional lainnya',
                    ],
                    appreciationStage:
                        'Rekam anak menyanyikan Indonesia Raya di rumah. Bagikan ke keluarga besar sebagai kebanggaan.',
                    journal: [
                        'Hari 1: Menyanyikan Indonesia Raya sebelum sekolah',
                        'Hari 2: Menghafal 1 bait lagu',
                        'Hari 3: Menyanyikan dengan sikap hormat',
                        'Hari 4: Menyanyikan di depan keluarga',
                        'Hari 5: Menceritakan makna lagu',
                    ],
                    reflection: [
                        'Apa judul lagu kebangsaan Indonesia?',
                        'Bagaimana sikap kita saat menyanyikannya?',
                        'Apa makna lagu Indonesia Raya bagi kita?',
                    ],
                }),
                ppkn_element: 'Pancasila',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Teks lagu Indonesia Raya',
                    'Speaker',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah: "Siapa yang sudah hafal lagu Indonesia Raya?"',
                    ice_breaker:
                        'Guru mengajak siswa berdiri dan menyanyikan lagu Indonesia Raya.',
                    apperception:
                        'Guru bertanya: "Kapan kita menyanyikan lagu Indonesia Raya?"',
                    trigger_question:
                        'Siapa yang tahu lagu kebangsaan Indonesia?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Lagu Indonesia Raya adalah lagu kebangsaan yang harus dihormati dan dinyanyikan dengan sikap sempurna.',
                    concrete_steps: [
                        'Guru menjelaskan sejarah lagu Indonesia Raya.',
                        'Siswa menyanyikan lagu dengan sikap hormat.',
                        'Guru menunjukkan sikap berdiri tegak & hormat.',
                        'Siswa berlatih menyanyikan 3x.',
                        'Ulangi 3x untuk memperkuat hafalan.',
                    ],
                    script_parent:
                        '"Lagu Indonesia Raya adalah lagu kebangsaan kita. Nyanyikan dengan hormat dan bangga!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sambung Lirik Indonesia Raya',
                    game_rules: [
                        'Guru membagi siswa menjadi lingkaran besar.',
                        'Guru menyanyikan satu baris lirik.',
                        'Siswa yang ditunjuk melanjutkan baris berikutnya.',
                        'Berlanjut hingga lagu selesai dinyanyikan.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyambung dengan bantuan guru.',
                        child_level_advanced: 'Menyambung tanpa bantuan & menyanyikan solo.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menyanyikan Indonesia Raya & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: AKU MENGENAL LAGU KEBANGSAAN',
                        instructions:
                            'Isi refleksi tentang lagu kebangsaan Indonesia Raya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Ini sikap saat menyanyikan Indonesia Raya. Centang ✓ sikap yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Berdiri tegak', icon: '🧍', description: 'Berdiri tegak dengan sikap sempurna' },
                                        { name: 'Hormat', icon: '🫡', description: 'Menghormat dengan tangan kanan' },
                                        { name: 'Tidak bicara', icon: '🤫', description: 'Tidak bicara saat menyanyi' },
                                        { name: 'Menyanyikan dengan khidmat', icon: '🎵', description: 'Menyanyikan dengan sungguh-sungguh' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang sikap yang sudah dilakukan.',
                                explanation: 'Melatih sikap hormat pada lagu kebangsaan.',
                            },
                            {
                                id: 2,
                                type: 'SELF_REFLECTION',
                                question:
                                    'Bagaimana perasaanmu saat menyanyikan lagu Indonesia Raya?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat menyanyikan Indonesia Raya?',
                                    options: [
                                        { emoji: '😊', label: 'Bangga & Khidmat' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Hafal' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih cinta tanah air.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu menyanyikan lagu Indonesia Raya dengan sikap hormat!',
                                data: {
                                    prompt: 'Menyanyikan Indonesia Raya',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku menyanyikan Indonesia Raya:',
                                },
                                answer_key: 'Siswa menggambar diri menyanyikan Indonesia Raya.',
                                explanation: 'Melatih cinta tanah air melalui seni.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa judul lagu kebangsaan Indonesia?',
                        'Bagaimana sikap kita saat menyanyikannya?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menyanyikan lagu Indonesia Raya bait pertama dengan sikap hormat!',
                    },
                ],
            },
            {
                title: 'Pertemuan 9: Aku Mengenal Simbol Lambang Garuda Pancasila',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu mengenal simbol-simbol Pancasila dalam lambang Garuda Pancasila dan menyebutkan sila yang diwakilinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 9: Aku Mengenal Simbol Lambang Garuda Pancasila',
                    objectives: [
                        'Mengenal lambang negara Garuda Pancasila',
                        'Menyebutkan 5 simbol Pancasila dan sila yang diwakilinya',
                        'Menghafal bunyi 5 sila Pancasila',
                    ],
                    subMaterial:
                        'Mengenal **lambang Garuda Pancasila** dengan 5 simbol: bintang (sila 1), rantai (sila 2), pohon beringin (sila 3), kepala banteng (sila 4), padi & kapas (sila 5).',
                    cpHolistic: {
                        pancasila: 'Mengenal simbol-simbol Pancasila sebagai dasar negara.',
                        uud: 'Mengenal Pancasila sebagai dasar hukum negara.',
                        bhinneka: 'Pancasila menyatukan keberagaman Indonesia.',
                        nkri: 'Menumbuhkan cinta NKRI melalui Pancasila.',
                    },
                    triggerQuestion:
                        'Apa itu Pancasila? Ada berapa sila dalam Pancasila?',
                    activities: {
                        mindful:
                            'Guru menjelaskan lambang Garuda Pancasila & 5 simbol sila. Siswa menghafal bunyi 5 sila.',
                        joyful:
                            'Permainan "Sebut Sila!" — guru menyebutkan tindakan sehari-hari, siswa menebak sila yang sesuai. Dilanjutkan membuat poster Pancasila.',
                        meaningful:
                            'Membuat poster Garuda Pancasila dengan 5 simbol & mempresentasikannya.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Gambar Garuda Pancasila',
                        'Kertas gambar besar',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta Pancasila)',
                        'Keimanan & Ketakwaan (sila ke-1)',
                        'Kreativitas (membuat poster)',
                    ],
                    parentTips: [
                        'Tunjukkan lambang Garuda di rumah',
                        'Ceritakan makna tiap simbol dengan bahasa sederhana',
                        'Ajak anak menghafal 5 sila Pancasila',
                        'Beri apresiasi saat anak bisa menyebutkan sila',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak sulit menghafal 5 sila',
                            solution: 'gunakan lagu & gerakan, mulai dari sila 1 dulu',
                        },
                        {
                            issue: 'Anak bingung simbol dengan sila',
                            solution: 'beri gambar jelas dan asosiasi sederhana',
                        },
                    ],
                    extensions: [
                        'Membuat kartu simbol Pancasila dari karton',
                        'Menyanyikan lagu "Garuda Pancasila"',
                        'Menghafal 5 sila Pancasila di rumah',
                    ],
                    appreciationStage:
                        'Tempel poster Pancasila di kamar anak. Rayakan keberhasilan menghafal 5 sila.',
                    journal: [
                        'Hari 1: Menghafal sila ke-1',
                        'Hari 2: Menghafal sila ke-2',
                        'Hari 3: Menghafal sila ke-3',
                        'Hari 4: Menghafal sila ke-4',
                        'Hari 5: Menghafal sila ke-5',
                    ],
                    reflection: [
                        'Ada berapa sila dalam Pancasila?',
                        'Apa simbol sila ke-1?',
                        'Sila mana yang paling kamu sukai?',
                    ],
                }),
                ppkn_element: 'Pancasila',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Gambar Garuda Pancasila',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah dan mengajak siswa bernyanyi "Garuda Pancasila".',
                    ice_breaker:
                        'Guru bertanya: "Siapa yang tahu apa itu Pancasila?"',
                    apperception:
                        'Guru menunjukkan lambang Garuda Pancasila dan meminta siswa menyebutkan 5 sila.',
                    trigger_question:
                        'Ada berapa sila dalam Pancasila?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Pancasila memiliki 5 sila dengan simbol masing-masing dalam lambang Garuda.',
                    concrete_steps: [
                        'Guru menjelaskan lambang Garuda Pancasila.',
                        'Siswa mengenal 5 simbol sila & maknanya.',
                        'Siswa menghafal bunyi 5 sila.',
                        'Guru menunjukkan gambar setiap simbol.',
                        'Ulangi 3x untuk memperkuat hafalan.',
                    ],
                    script_parent:
                        '"Pancasila adalah dasar negara kita. Ada 5 sila dengan simbol masing-masing di lambang Garuda."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sebut Sila!',
                    game_rules: [
                        'Guru menyebutkan tindakan sehari-hari.',
                        'Siswa menebak sila Pancasila yang sesuai.',
                        'Contoh: "Budi berbagi makanan" → Sila ke-5 (keadilan sosial).',
                        'Siswa dengan jawaban benar terbanyak diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak sila dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan bunyi sila lengkap.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Mengenal simbol Pancasila & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.3: AKU MENGENAL SIMBOL PANCASILA',
                        instructions:
                            'Amati simbol-simbol Pancasila berikut! Tuliskan bunyi sila yang sesuai dengan simbol tersebut.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'SYMBOL_CARD',
                                question:
                                    'Isi nama sila yang sesuai dengan simbol Pancasila berikut!',
                                data: {
                                    symbols: [
                                        { sila: 1, name: 'Ketuhanan Yang Maha Esa', icon: '⭐', meaning: 'Bintang — simbol cahaya Tuhan' },
                                        { sila: 2, name: 'Kemanusiaan yang Adil dan Beradab', icon: '🔗', meaning: 'Rantai — simbol persatuan manusia' },
                                        { sila: 3, name: 'Persatuan Indonesia', icon: '🌳', meaning: 'Pohon Beringin — tempat berteduh bersama' },
                                        { sila: 4, name: 'Kerakyatan yang Dipimpin oleh Hikmat', icon: '🐂', meaning: 'Kepala Banteng — simbol musyawarah' },
                                        { sila: 5, name: 'Keadilan Sosial bagi Seluruh Rakyat', icon: '🌾', meaning: 'Padi & Kapas — simbol kesejahteraan' },
                                    ],
                                },
                                answer_key: 'Siswa menuliskan bunyi sila sesuai simbol.',
                                explanation: 'Mengenal simbol & bunyi sila Pancasila.',
                            },
                            {
                                id: 2,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu setelah mengenal Pancasila?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah mengenal Pancasila?',
                                    options: [
                                        { emoji: '😊', label: 'Bangga & Senang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Masih Bingung' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih cinta Pancasila.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah salah satu simbol Pancasila yang paling kamu sukai!',
                                data: {
                                    prompt: 'Simbol Pancasila favoritku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Simbol Pancasila favoritku:',
                                },
                                answer_key: 'Siswa menggambar simbol Pancasila.',
                                explanation: 'Melatih kreativitas & pemahaman simbol.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Ada berapa sila dalam Pancasila?',
                        'Apa simbol sila ke-1?',
                        'Sila mana yang paling kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil mengisi simbol Pancasila pada LKPD 3.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 3: Aku Mengenal Indonesia',
                        quiz_questions: [
                            {
                                question_text: 'Warna bendera Indonesia adalah...',
                                option_a: 'Merah dan Putih',
                                option_b: 'Merah dan Biru',
                                option_c: 'Putih dan Hijau',
                                option_d: 'Biru dan Kuning',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Lagu kebangsaan Indonesia adalah...',
                                option_a: 'Garuda Pancasila',
                                option_b: 'Indonesia Raya',
                                option_c: 'Bendera Merah Putih',
                                option_d: 'Hari Merdeka',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Simbol sila ke-1 Pancasila adalah...',
                                option_a: 'Rantai',
                                option_b: 'Bintang',
                                option_c: 'Pohon Beringin',
                                option_d: 'Padi dan Kapas',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Jumlah sila dalam Pancasila adalah...',
                                option_a: '3',
                                option_b: '4',
                                option_c: '5',
                                option_d: '6',
                                correct_answer: 'C',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🇮🇩 BAB 4: AKU DAN LINGKUNGANKU (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 4,
        title: 'Bab 4 Aku dan Lingkunganku',
        target_semester: 2,
        week_target: 10,
        lessons: [
            {
                title: 'Pertemuan 10: Aku Mengenal Lingkungan Tempat Tinggalku',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal karakteristik lingkungan tempat tinggal dan menyebutkan bagian-bagiannya sebagai bagian dari NKRI.',
                content_text: buildContentText({
                    title: 'Pertemuan 10: Aku Mengenal Lingkungan Tempat Tinggalku',
                    objectives: [
                        'Mengenal karakteristik lingkungan tempat tinggal',
                        'Menyebutkan bagian-bagian lingkungan tempat tinggal',
                        'Menumbuhkan rasa syukur atas lingkungan tempat tinggal',
                    ],
                    subMaterial:
                        'Mengenal **lingkungan tempat tinggal**: rumah, halaman, jalan, tetangga, taman, dan fasilitas umum. Semua bagian ini merupakan karunia Tuhan yang harus dijaga.',
                    cpHolistic: {
                        pancasila: 'Bersyukur atas karunia Tuhan berupa lingkungan yang indah.',
                        uud: 'Mengenal hak dan kewajiban terhadap lingkungan.',
                        bhinneka: 'Mengenal keragaman tetangga & lingkungan sekitar.',
                        nkri: 'Mengenal lingkungan sebagai bagian dari NKRI.',
                    },
                    triggerQuestion:
                        'Apa saja yang ada di lingkungan tempat tinggalmu?',
                    activities: {
                        mindful:
                            'Guru menjelaskan definisi lingkungan & mengenalkan bagian-bagiannya. Siswa berbagi cerita tentang lingkungan tempat tinggalnya.',
                        joyful:
                            'Permainan "Cari Benda di Lingkungan Rumah" — siswa mengelompokkan gambar benda sesuai lokasinya.',
                        meaningful:
                            'Menggambar denah sederhana lingkungan tempat tinggal.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Gambar lingkungan tempat tinggal',
                        'Kertas gambar',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Keimanan & Ketakwaan (syukur)',
                        'Kewargaan (cinta lingkungan)',
                        'Komunikasi (bercerita)',
                    ],
                    parentTips: [
                        'Ajak anak berkeliling lingkungan rumah',
                        'Sebutkan nama jalan, tetangga, dan tempat umum',
                        'Ceritakan pentingnya menjaga lingkungan',
                        'Beri apresiasi saat anak mengenal lingkungan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak belum hafal nama jalan/tetangga',
                            solution: 'latih sambil jalan-jalan santai di sekitar rumah',
                        },
                        {
                            issue: 'Anak bingung membedakan rumah sendiri dengan rumah tetangga',
                            solution: 'beri ciri khas rumah sendiri (warna, nomor)',
                        },
                    ],
                    extensions: [
                        'Membuat denah lingkungan tempat tinggal',
                        'Berkunjung ke rumah tetangga dengan sopan',
                        'Menggambar peta sederhana rumah ke sekolah',
                    ],
                    appreciationStage:
                        'Tempel gambar denah di kamar. Ajak anak bercerita tentang lingkungannya ke keluarga.',
                    journal: [
                        'Hari 1: Menyapa tetangga',
                        'Hari 2: Menyebutkan nama jalan rumah',
                        'Hari 3: Menjaga kebersihan halaman',
                        'Hari 4: Membantu tetangga yang kesulitan',
                        'Hari 5: Mengucapkan terima kasih kepada tetangga',
                    ],
                    reflection: [
                        'Apa nama jalan tempat tinggalmu?',
                        'Siapa nama tetangga yang paling kamu kenal?',
                        'Bagaimana cara menjaga lingkunganmu?',
                    ],
                }),
                ppkn_element: 'Negara Kesatuan Republik Indonesia',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Gambar lingkungan',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah dan mengajak siswa berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Lingkungan Bersih".',
                    apperception:
                        'Guru bertanya: "Siapa yang tahu apa itu lingkungan rumah?"',
                    trigger_question:
                        'Apa saja yang ada di lingkungan tempat tinggalmu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Lingkungan tempat tinggal adalah karunia Tuhan yang harus dijaga.',
                    concrete_steps: [
                        'Guru menjelaskan definisi lingkungan tempat tinggal.',
                        'Siswa menyebutkan bagian-bagian lingkungan.',
                        'Guru menunjukkan gambar lingkungan.',
                        'Siswa bercerita tentang lingkungan masing-masing.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Lingkungan tempat tinggal kita adalah karunia Tuhan. Yuk, kita jaga bersama!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Cari Benda di Lingkungan Rumah',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok kecil.',
                        'Setiap kelompok diberi gambar benda-benda lingkungan (pohon, pagar, jalan).',
                        'Siswa mengelompokkan benda sesuai lokasinya.',
                        'Kelompok tercepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengelompokkan dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan fungsi setiap bagian lingkungan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Mengenal lingkungan tempat tinggal & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: AKU MENGENAL LINGKUNGAN TEMPAT TINGGALKU',
                        instructions:
                            'Amati gambar lingkungan berikut! Centang ✓ bagian yang ada di lingkunganmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ bagian lingkungan tempat tinggal yang kamu kenal!',
                                data: {
                                    rules: [
                                        { name: 'Rumah', icon: '🏠', description: 'Tempat tinggal keluarga' },
                                        { name: 'Jalan', icon: '🛣️', description: 'Jalan di depan rumah' },
                                        { name: 'Taman', icon: '🌳', description: 'Taman atau halaman rumah' },
                                        { name: 'Warung', icon: '🏪', description: 'Toko atau warung dekat rumah' },
                                        { name: 'Sungai', icon: '🌊', description: 'Sungai atau saluran air' },
                                        { name: 'Masjid/Gereja', icon: '🕌', description: 'Tempat ibadah' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang bagian yang sesuai.',
                                explanation: 'Mengenal lingkungan tempat tinggal.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah salah satu bagian lingkungan tempat tinggalmu (misalnya: rumah, taman, atau jalan)!',
                                data: {
                                    prompt: 'Lingkungan tempat tinggalku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Lingkungan tempat tinggalku:',
                                },
                                answer_key: 'Siswa menggambar bagian lingkungan.',
                                explanation: 'Melatih pengamatan & seni.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu tinggal di lingkunganmu?',
                                data: {
                                    question: 'Bagaimana perasaanmu tinggal di lingkunganmu?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Nyaman' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Kurang Nyaman' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih syukur.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja yang ada di lingkunganmu?',
                        'Bagaimana perasaanmu tinggal di sana?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil gambar lingkungan tempat tinggal pada LKPD 4.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 11: Aku Suka Bergotong Royong',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menerapkan sikap gotong royong di rumah dan lingkungan tempat tinggal serta memahami manfaatnya.',
                content_text: buildContentText({
                    title: 'Pertemuan 11: Aku Suka Bergotong Royong',
                    objectives: [
                        'Mengenal pengertian gotong royong',
                        'Menerapkan sikap gotong royong di rumah dan lingkungan',
                        'Memahami manfaat gotong royong untuk kebersamaan',
                    ],
                    subMaterial:
                        'Mengenal **gotong royong** — bekerja sama untuk mencapai tujuan bersama. Contoh: kerja bakti membersihkan lingkungan, membantu tetangga yang kesulitan, dan bergotong royong di rumah.',
                    cpHolistic: {
                        pancasila: 'Menerapkan nilai-nilai sila ke-3 (Persatuan Indonesia).',
                        uud: 'Menjalankan kewajiban bergotong royong sebagai warga.',
                        bhinneka: 'Gotong royong mempererat persatuan dalam keberagaman.',
                        nkri: 'Gotong royong adalah budaya bangsa Indonesia.',
                    },
                    triggerQuestion:
                        'Apa itu gotong royong? Pernahkah kalian bergotong royong?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pengertian & manfaat gotong royong. Siswa berbagi pengalaman gotong royong.',
                        joyful:
                            'Permainan "Pindahkan Bola" — siswa bekerja sama memindahkan bola tanpa menggunakan tangan langsung (dengan piring plastik).',
                        meaningful:
                            'Praktik gotong royong membersihkan kelas & membuat poster gotong royong.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Bola kecil & piring plastik',
                        'Alat kebersihan',
                        'Kertas poster',
                        'LKPD',
                    ],
                    karakter: [
                        'Kolaborasi (bekerja sama)',
                        'Kewargaan (peduli sesama)',
                        'Kemandirian (inisiatif membantu)',
                    ],
                    parentTips: [
                        'Ajak anak bergotong royong di rumah',
                        'Ceritakan manfaat gotong royong',
                        'Beri apresiasi saat anak membantu',
                        'Beri contoh bergotong royong dengan tetangga',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malas membantu',
                            solution: 'beri tugas ringan sesuai usia, jadikan kegiatan menyenangkan',
                        },
                        {
                            issue: 'Anak egois',
                            solution: 'ceritakan manfaat kebersamaan, beri contoh nyata',
                        },
                    ],
                    extensions: [
                        'Kerja bakti keluarga membersihkan rumah',
                        'Membantu tetangga yang kesulitan',
                        'Membuat video gotong royong keluarga',
                    ],
                    appreciationStage:
                        'Rayakan gotong royong keluarga. Foto kegiatan & pajang di rumah.',
                    journal: [
                        'Hari 1: Membantu ibu di dapur',
                        'Hari 2: Menyapu halaman',
                        'Hari 3: Merapikan mainan bersama saudara',
                        'Hari 4: Membantu ayah mencuci mobil',
                        'Hari 5: Membantu tetangga',
                    ],
                    reflection: [
                        'Apa itu gotong royong?',
                        'Kapan kamu pernah bergotong royong?',
                        'Bagaimana perasaanmu saat bergotong royong?',
                    ],
                }),
                ppkn_element: 'Negara Kesatuan Republik Indonesia',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Bola kecil',
                    'Piring plastik',
                    'Alat kebersihan',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah dan mengajak siswa berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Gotong Royong".',
                    apperception:
                        'Guru bertanya: "Siapa yang pernah membantu orang tua di rumah?"',
                    trigger_question:
                        'Apa itu gotong royong?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Gotong royong adalah bekerja sama untuk mencapai tujuan bersama.',
                    concrete_steps: [
                        'Guru menjelaskan pengertian gotong royong.',
                        'Siswa berbagi pengalaman gotong royong.',
                        'Guru menunjukkan contoh gotong royong.',
                        'Diskusi manfaat gotong royong.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Gotong royong adalah budaya bangsa kita! Bekerja bersama lebih menyenangkan."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Pindahkan Bola',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok kecil.',
                        'Setiap kelompok memindahkan bola tanpa menyentuh langsung.',
                        'Bola dipindahkan dengan piring plastik berpasangan.',
                        'Kelompok tercepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memindahkan bola dengan bantuan guru.',
                        child_level_advanced: 'Memindahkan 3 bola berturut-turut.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Praktik gotong royong & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: AKU SUKA BERGOTONG ROYONG',
                        instructions:
                            'Centang ✓ kegiatan gotong royong yang sudah kamu lakukan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan gotong royong yang sudah kamu lakukan di rumah!',
                                data: {
                                    rules: [
                                        { name: 'Membantu ibu di dapur', icon: '🍳', description: 'Membantu memasak atau mencuci piring' },
                                        { name: 'Menyapu halaman', icon: '🧹', description: 'Menyapu halaman bersama ayah' },
                                        { name: 'Merapikan mainan', icon: '🧸', description: 'Merapikan mainan setelah bermain' },
                                        { name: 'Menyiram tanaman', icon: '🌱', description: 'Menyiram tanaman bersama keluarga' },
                                        { name: 'Membantu tetangga', icon: '🤝', description: 'Membantu tetangga yang kesulitan' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan gotong royong.',
                                explanation: 'Melatih sikap gotong royong.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang bergotong royong dengan keluarga!',
                                data: {
                                    prompt: 'Gotong royong keluargaku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gotong royong keluargaku:',
                                },
                                answer_key: 'Siswa menggambar kegiatan gotong royong.',
                                explanation: 'Melatih pemahaman gotong royong.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu setelah bergotong royong?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah bergotong royong?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bangga' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Lelah & Sedih' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi emosi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa itu gotong royong?',
                        'Kapan kamu bergotong royong?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil gambar gotong royong pada LKPD 4.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 12: Aku Mengenal Lingkungan Sekolah',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu mengenal bagian-bagian lingkungan sekolah dan fungsinya masing-masing.',
                content_text: buildContentText({
                    title: 'Pertemuan 12: Aku Mengenal Lingkungan Sekolah',
                    objectives: [
                        'Mengenal bagian-bagian lingkungan sekolah',
                        'Menyebutkan fungsi setiap bagian sekolah',
                        'Mengenal lingkungan sekolah sebagai bagian dari NKRI',
                    ],
                    subMaterial:
                        'Mengenal **lingkungan sekolah**: ruang kelas, perpustakaan, kantin, halaman, ruang guru, dan toilet. Setiap bagian memiliki fungsi penting untuk belajar.',
                    cpHolistic: {
                        pancasila: 'Bersyukur atas fasilitas sekolah sebagai karunia Tuhan.',
                        uud: 'Mengenal hak mendapatkan fasilitas belajar yang layak.',
                        bhinneka: 'Mengenal keberagaman teman di sekolah.',
                        nkri: 'Sekolah adalah bagian dari NKRI.',
                    },
                    triggerQuestion:
                        'Apa saja bagian yang ada di sekolahmu?',
                    activities: {
                        mindful:
                            'Guru mengajak siswa berkeliling sekolah untuk mengenal bagian-bagiannya. Siswa mencatat apa yang mereka lihat.',
                        joyful:
                            'Permainan "Tebak Fasilitas" — guru memberikan petunjuk, siswa menebak nama fasilitas sekolah.',
                        meaningful:
                            'Menggambar lingkungan sekolah & refleksi.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Kertas gambar',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta sekolah)',
                        'Kemandirian (mengenal lingkungan)',
                        'Kolaborasi (bekerja sama di sekolah)',
                    ],
                    parentTips: [
                        'Ajak anak berkeliling sekolah setiap hari',
                        'Sebutkan nama setiap bagian sekolah',
                        'Ceritakan fungsi setiap bagian',
                        'Beri apresiasi saat anak mengenal sekolahnya',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung nama-nama ruangan',
                            solution: 'sebutkan nama sambil berjalan, beri label kecil',
                        },
                        {
                            issue: 'Anak kurang menghargai fasilitas',
                            solution: 'ceritakan bahwa fasilitas adalah karunia Tuhan',
                        },
                    ],
                    extensions: [
                        'Membuat denah sekolah sederhana',
                        'Berkunjung ke perpustakaan & melihat koleksi buku',
                        'Mewawancarai guru tentang sekolah',
                    ],
                    appreciationStage:
                        'Pajang gambar sekolah di kelas. Ajak anak bercerita tentang sekolahnya.',
                    journal: [
                        'Hari 1: Menyapa guru',
                        'Hari 2: Menjaga kebersihan kelas',
                        'Hari 3: Membaca di perpustakaan',
                        'Hari 4: Berbagi bekal di kantin',
                        'Hari 5: Merapikan meja kelas',
                    ],
                    reflection: [
                        'Apa saja bagian yang ada di sekolahmu?',
                        'Bagian mana yang paling kamu sukai?',
                        'Mengapa bagian itu penting?',
                    ],
                }),
                ppkn_element: 'Negara Kesatuan Republik Indonesia',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah dan mengajak siswa berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Di Sini Senang, Di Sana Senang".',
                    apperception:
                        'Guru bertanya: "Apa saja yang ada di sekolah kita?"',
                    trigger_question:
                        'Apa bagian sekolah yang paling kamu sukai?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Sekolah memiliki banyak bagian dengan fungsi masing-masing untuk belajar.',
                    concrete_steps: [
                        'Guru mengajak siswa berkeliling sekolah.',
                        'Siswa mengenal bagian-bagian sekolah.',
                        'Guru menjelaskan fungsi setiap bagian.',
                        'Siswa mencatat apa yang dilihat.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Sekolah adalah rumah kedua kita. Yuk, kenali setiap bagiannya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Fasilitas Sekolah',
                    game_rules: [
                        'Guru menyebutkan petunjuk tentang suatu bagian sekolah.',
                        'Siswa menebak nama bagian tersebut.',
                        'Contoh: "Tempat kita membaca buku" → Perpustakaan.',
                        'Siswa dengan tebakan terbanyak diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan fungsi bagian sekolah.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Mengenal bagian sekolah & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.3: AKU MENGENAL LINGKUNGAN SEKOLAH',
                        instructions:
                            'Centang ✓ bagian sekolah yang kamu kenal dan suka!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ bagian sekolah yang kamu kenal dan sukai!',
                                data: {
                                    rules: [
                                        { name: 'Ruang Kelas', icon: '🏫', description: 'Tempat belajar bersama' },
                                        { name: 'Perpustakaan', icon: '📚', description: 'Tempat membaca buku' },
                                        { name: 'Kantin', icon: '🍽️', description: 'Tempat membeli makanan' },
                                        { name: 'Halaman', icon: '🌳', description: 'Tempat bermain' },
                                        { name: 'Ruang Guru', icon: '👨‍🏫', description: 'Tempat guru bekerja' },
                                        { name: 'Toilet', icon: '🚻', description: 'Tempat buang air' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang bagian sekolah.',
                                explanation: 'Mengenal lingkungan sekolah.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah bagian sekolah yang paling kamu sukai!',
                                data: {
                                    prompt: 'Bagian sekolah favoritku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Bagian sekolah favoritku:',
                                },
                                answer_key: 'Siswa menggambar bagian sekolah.',
                                explanation: 'Melatih pengamatan lingkungan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu belajar di sekolah?',
                                data: {
                                    question: 'Bagaimana perasaanmu belajar di sekolah?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Semangat' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Kurang Senang' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja bagian sekolahmu?',
                        'Bagian mana yang paling kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil gambar bagian sekolah pada LKPD 4.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 13: Aku Peduli pada Lingkungan Sekolah',
                order_index: 4,
                learning_objectives:
                    'Peserta didik mampu menunjukkan sikap peduli terhadap lingkungan sekolah melalui tindakan nyata menjaga kebersihan dan ketertiban.',
                content_text: buildContentText({
                    title: 'Pertemuan 13: Aku Peduli pada Lingkungan Sekolah',
                    objectives: [
                        'Menunjukkan sikap peduli terhadap lingkungan sekolah',
                        'Mempraktikkan kegiatan menjaga kebersihan sekolah',
                        'Menumbuhkan rasa tanggung jawab sebagai warga sekolah',
                    ],
                    subMaterial:
                        'Menerapkan **sikap peduli lingkungan sekolah** dengan menjaga kebersihan, ketertiban, dan keindahan sekolah. Peduli sekolah = peduli NKRI.',
                    cpHolistic: {
                        pancasila: 'Menerapkan sila ke-3 (Persatuan Indonesia) melalui gotong royong sekolah.',
                        uud: 'Menjalankan kewajiban menjaga lingkungan sekolah.',
                        bhinneka: 'Bekerja sama dengan semua teman tanpa membeda-bedakan.',
                        nkri: 'Menumbuhkan cinta NKRI dari lingkungan sekolah.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kita menjaga kebersihan sekolah?',
                    activities: {
                        mindful:
                            'Guru mengajak siswa berdiskusi tentang ciri-ciri kelas bersih. Siswa mengamati kelas & menyebutkan hal yang perlu diperbaiki.',
                        joyful:
                            'Permainan "Siapa yang Paling Cepat?" — siswa berlomba membersihkan kelas dengan alat kebersihan.',
                        meaningful:
                            'Praktik gotong royong membersihkan sekolah & membuat poster peduli lingkungan.',
                    },
                    materials: [
                        'Buku Siswa Pendidikan Pancasila Kelas I',
                        'Alat kebersihan (sapu, lap, tempat sampah)',
                        'Kertas poster',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (peduli lingkungan)',
                        'Kolaborasi (gotong royong)',
                        'Kemandirian (tanggung jawab)',
                    ],
                    parentTips: [
                        'Beri contoh menjaga kebersihan di rumah',
                        'Ajak anak membersihkan rumah bersama',
                        'Ceritakan pentingnya kebersihan untuk kesehatan',
                        'Beri apresiasi saat anak peduli lingkungan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malas membersihkan',
                            solution: 'jadikan kegiatan menyenangkan, beri reward sederhana',
                        },
                        {
                            issue: 'Anak buang sampah sembarangan',
                            solution: 'beri pemahaman dampaknya, beri contoh langsung',
                        },
                    ],
                    extensions: [
                        'Membuat jadwal piket kelas',
                        'Membuat tempat sampah hias',
                        'Menanam tanaman di sekolah',
                    ],
                    appreciationStage:
                        'Buat papan apresiasi "Warga Sekolah Peduli Lingkungan". Rayakan keberhasilan bersama.',
                    journal: [
                        'Hari 1: Membuang sampah pada tempatnya',
                        'Hari 2: Merapikan meja kelas',
                        'Hari 3: Menyapu kelas sesuai jadwal piket',
                        'Hari 4: Menyiram tanaman sekolah',
                        'Hari 5: Mengingatkan teman jaga kebersihan',
                    ],
                    reflection: [
                        'Apa yang kamu lakukan untuk menjaga kebersihan sekolah?',
                        'Mengapa kebersihan sekolah penting?',
                        'Bagaimana perasaanmu saat sekolah bersih?',
                    ],
                }),
                ppkn_element: 'Negara Kesatuan Republik Indonesia',
                required_materials: [
                    'Buku Siswa Pendidikan Pancasila Kelas I',
                    'Alat kebersihan',
                    'Kertas poster',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan ramah dan mengajak siswa berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Lingkungan Bersih Sehat".',
                    apperception:
                        'Guru bertanya: "Siapa yang suka bermain di sekolah yang bersih?"',
                    trigger_question:
                        'Bagaimana cara kita menjaga kebersihan sekolah?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Peduli lingkungan sekolah adalah tanggung jawab semua warga sekolah.',
                    concrete_steps: [
                        'Guru mengajak siswa berdiskusi tentang ciri kelas bersih.',
                        'Siswa mengamati kelas dan menyebutkan yang perlu diperbaiki.',
                        'Guru menjelaskan pentingnya kebersihan sekolah.',
                        'Siswa membuat komitmen menjaga kebersihan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Sekolah bersih adalah tanggung jawab kita bersama. Yuk, jaga bersama-sama!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Siapa yang Paling Cepat?',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok.',
                        'Setiap kelompok diberikan alat kebersihan.',
                        'Kelompok berlomba membersihkan area tertentu.',
                        'Kelompok tercepat & terbersih diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membersihkan area kecil dengan bantuan.',
                        child_level_advanced: 'Membersihkan area lebih besar dan mengorganisir kelompok.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Praktik gotong royong & membuat komitmen.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.4: AKU PEDULI PADA LINGKUNGAN SEKOLAH',
                        instructions:
                            'Centang ✓ kegiatan menjaga kebersihan sekolah yang sudah kamu lakukan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan menjaga kebersihan sekolah yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Buang sampah pada tempatnya', icon: '🗑️', description: 'Tidak buang sampah sembarangan di sekolah' },
                                        { name: 'Merapikan meja & kursi', icon: '🪑', description: 'Merapikan meja setelah belajar' },
                                        { name: 'Menyapu kelas', icon: '🧹', description: 'Menyapu kelas sesuai piket' },
                                        { name: 'Menyiram tanaman sekolah', icon: '🌱', description: 'Menyiram tanaman di halaman sekolah' },
                                        { name: 'Menjaga kebersihan toilet', icon: '🚽', description: 'Menyiram setelah menggunakan toilet' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan kebersihan sekolah.',
                                explanation: 'Melatih kepedulian lingkungan sekolah.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah poster "Ayo Jaga Kebersihan Sekolah!"',
                                data: {
                                    prompt: 'Poster kebersihan sekolah',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Poster kebersihan sekolah:',
                                },
                                answer_key: 'Siswa menggambar poster.',
                                explanation: 'Melatih kreativitas & tanggung jawab.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'SELF_REFLECTION',
                                question: 'Bagaimana perasaanmu saat sekolah bersih dan rapi?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat sekolah bersih?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Nyaman' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Kurang Nyaman' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi kepedulian.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa yang kamu lakukan untuk menjaga kebersihan sekolah?',
                        'Mengapa kebersihan sekolah penting?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil poster kebersihan sekolah pada LKPD 4.4, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 4: Aku dan Lingkunganku',
                        quiz_questions: [
                            {
                                question_text: 'Gotong royong artinya...',
                                option_a: 'Bekerja sama',
                                option_b: 'Bermain sendiri',
                                option_c: 'Tidur siang',
                                option_d: 'Bermalas-malasan',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Bagian sekolah tempat kita membaca buku adalah...',
                                option_a: 'Kantin',
                                option_b: 'Perpustakaan',
                                option_c: 'Toilet',
                                option_d: 'Halaman',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Sikap peduli pada lingkungan sekolah bisa ditunjukkan dengan...',
                                option_a: 'Buang sampah pada tempatnya',
                                option_b: 'Buang sampah sembarangan',
                                option_c: 'Merusak tanaman',
                                option_d: 'Mencoret dinding',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kegiatan gotong royong di rumah bisa berupa...',
                                option_a: 'Membantu ibu mencuci piring',
                                option_b: 'Bermain game',
                                option_c: 'Menonton TV',
                                option_d: 'Tidur seharian',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedPendidikanPancasilaFaseAKelas1() {
    console.log('================================================================');
    console.log('🇮🇩 SEEDING RESMI: PENDIDIKAN PANCASILA FASE A KELAS 1');
    console.log('   4 Bab × 13 Pertemuan — Identitas, Aturan, Indonesia, Lingkungan');
    console.log('================================================================');

    console.log('\n🏫 [1/3] Menemukan atau Mendaftarkan Kelas 1 SD...');

    let classId: string;
    const { data: existingClass } = await supabase
        .from('classes')
        .select('id')
        .eq('grade_level', 1)
        .maybeSingle();

    if (existingClass) {
        classId = existingClass.id;
        console.log(`   ✓ Kelas 1 SD ditemukan (ID: ${classId})`);
    } else {
        const { data: newClass, error: classErr } = await supabase
            .from('classes')
            .insert({
                name: 'Kelas 1 SD (Fase A)',
                grade_level: 1,
                academic_year: '2026/2027',
            })
            .select('id')
            .single();

        if (classErr || !newClass) {
            console.error('Gagal membuat kelas:', classErr?.message);
            process.exit(1);
        }
        classId = newClass.id;
        console.log(`   ✓ Kelas 1 SD baru dibuat (ID: ${classId})`);
    }

    console.log('\n🧹 [2/3] Membersihkan data Mapel Pendidikan Pancasila lama jika ada...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('name', 'Pendidikan Pancasila')
        .maybeSingle();

    let subjectId: string;

    if (existingSubject) {
        subjectId = existingSubject.id;
        console.log(`   ✓ Ditemukan Mapel Pendidikan Pancasila (ID: ${subjectId}). Membersihkan...`);

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
                await supabase
                    .from('learning_competency_evaluations')
                    .delete()
                    .in('lesson_id', lessonIds);
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
        console.log('   ✓ Modul Pendidikan Pancasila lama dibersihkan.');
    } else {
        const { data: newSubject, error: subjErr } = await supabase
            .from('subjects')
            .insert({
                class_id: classId,
                name: 'Pendidikan Pancasila',
                code: 'PPKn-1',
            })
            .select('id')
            .single();

        if (subjErr || !newSubject) {
            console.error('Gagal membuat mapel Pendidikan Pancasila:', subjErr?.message);
            process.exit(1);
        }
        subjectId = newSubject.id;
        console.log(`   ✓ Mata Pelajaran Pendidikan Pancasila baru terdaftar (ID: ${subjectId})`);
    }

    console.log('\n📚 [3/3] Menyimpan 4 Bab dan 13 Pertemuan Ajar...');

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of CHAPTERS_DATA) {
        console.log(
            `\n🇮🇩 Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`
        );

        const { data: modData, error: modErr } = await supabase
            .from('modules')
            .insert({
                subject_id: subjectId,
                title: chapter.title,
                order_index: chapter.chapter_number,
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
                    content_type: 'TEXT',
                    content_text: lesson.content_text,
                    learning_objectives: lesson.learning_objectives,
                    allocated_minutes: 70,
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
                    for (let qIdx = 0; qIdx < asg.quiz_questions.length; qIdx++) {
                        const q = asg.quiz_questions[qIdx];
                        await supabase.from('quiz_questions').insert({
                            assignment_id: asgData.id,
                            question_text: q.question_text,
                            option_a: q.option_a,
                            option_b: q.option_b,
                            option_c: q.option_c,
                            option_d: q.option_d,
                            correct_answer: q.correct_answer,
                            order_index: qIdx + 1,
                        });
                    }
                }
            }
        }
    }

    console.log('\n================================================================');
    console.log('🎉 SEEDING PENDIDIKAN PANCASILA BERHASIL 100%!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar dan ${totalQuizzesCreated} soal CBT tersimpan.`);
    console.log('');
    console.log('📊 Distribusi Bab:');
    console.log('   🇮🇩 Bab 1: Aku dan Teman-Temanku (3 Pertemuan)');
    console.log('   🇮🇩 Bab 2: Aku Patuh pada Aturan (3 Pertemuan)');
    console.log('   🇮🇩 Bab 3: Aku Mengenal Indonesia (3 Pertemuan)');
    console.log('   🇮🇩 Bab 4: Aku dan Lingkunganku (4 Pertemuan)');
    console.log('================================================================\n');
}

seedPendidikanPancasilaFaseAKelas1().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Pendidikan Pancasila:', err);
    process.exit(1);
});