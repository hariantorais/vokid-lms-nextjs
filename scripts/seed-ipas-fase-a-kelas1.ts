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
    | 'PICT_COUNT'
    | 'MATCH_PAIRS'
    | 'PICT_CHART'
    | 'DRAWING_FRAME'
    | 'SHAPE_CARD'
    | 'EXPRESSION_CARD'
    | 'MATH_PROBLEM'
    | 'RULES_CARD';

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
    ipas_field: string;
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
    ipas_field: string;
    target_semester: number;
    week_target: number;
    lessons: LessonItem[];
}

function buildContentText(params: {
    title: string;
    field: string;
    objectives: string[];
    subMaterial: string;
    cpHolistic: {
        makhlukHidup: string;
        zat: string;
        energi: string;
        bumi: string;
        manusia: string;
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
**Bidang IPAS: ${params.field}**

🎯 **Tujuan Pembelajaran**:
${params.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

📖 **Materi Pokok**:
${params.subMaterial}

🌍 **Elemen CP yang Dikembangkan**:
- **Makhluk Hidup & Lingkungannya**: ${params.cpHolistic.makhlukHidup}
- **Zat & Perubahannya**: ${params.cpHolistic.zat}
- **Energi & Perubahannya**: ${params.cpHolistic.energi}
- **Bumi & Alam Semesta**: ${params.cpHolistic.bumi}
- **Manusia, Tempat & Lingkungan**: ${params.cpHolistic.manusia}

🔍 **Pertanyaan Pematik**:
"${params.triggerQuestion}"

👐 **Aktivitas Belajar (70 menit)**:
1. **Mindful Learning (20 menit)** — ${params.activities.mindful}
2. **Joyful Learning (20 menit)** — ${params.activities.joyful}
3. **Meaningful Learning (15 menit)** — ${params.activities.meaningful}

🛠️ **Alat & Bahan**:
${params.materials.map((m) => `- ${m}`).join('\n')}

🌟 **Nilai Karakter yang Ditanamkan**:
${params.karakter.map((k) => `- ✅ ${k}`).join('\n')}

💡 **Tips untuk Orang Tua**:
${params.parentTips.map((t) => `- ${t}`).join('\n')}

⚠️ **Kesulitan Umum & Solusinya**:
${params.difficulties.map((d) => `- **${d.issue}** → ${d.solution}`).join('\n')}

🌟 **Pengayaan**:
${params.extensions.map((e) => `- ${e}`).join('\n')}

🎭 **Panggung Apresiasi**:
${params.appreciationStage}

📅 **Jurnal Pengamatan di Rumah** (diparaf orang tua):
${params.journal.map((j) => `- [ ] ${j}`).join('\n')}

📝 **Refleksi Siswa**:
${params.reflection.map((r) => `- ${r}`).join('\n')}

📚 **Referensi**:
Buku IPAS Kelas I SD Kurikulum Merdeka (Draf — perlu divalidasi dengan buku resmi Kemendikbud).`;
}

const CHAPTERS_DATA: ChapterItem[] = [
    // ===========================================================================
    // 🌍 BAB 1: AKU DAN TUBUHKU (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 1,
        title: 'Bab 1 Aku dan Tubuhku',
        ipas_field: 'Manusia & Lingkungannya',
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Pertemuan 1: Bagian-Bagian Tubuhku',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal dan menyebutkan bagian-bagian tubuh manusia beserta fungsinya, serta bersyukur atas karunia Tuhan.',
                content_text: buildContentText({
                    title: 'Pertemuan 1: Bagian-Bagian Tubuhku',
                    field: 'Manusia & Lingkungannya',
                    objectives: [
                        'Menyebutkan bagian-bagian tubuh manusia (kepala, badan, tangan, kaki)',
                        'Menjelaskan fungsi sederhana setiap bagian tubuh',
                        'Bersyukur atas tubuh yang sehat sebagai karunia Tuhan',
                    ],
                    subMaterial:
                        'Mengenal **bagian-bagian tubuh manusia**: kepala (untuk berpikir), badan (untuk melindungi organ dalam), tangan (untuk memegang), dan kaki (untuk berjalan). Setiap bagian memiliki fungsi penting.',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal tubuh manusia sebagai makhluk hidup ciptaan Tuhan.',
                        zat: 'Belum diperkenalkan di pertemuan ini.',
                        energi: 'Belum diperkenalkan di pertemuan ini.',
                        bumi: 'Belum diperkenalkan di pertemuan ini.',
                        manusia: 'Mengenal bagian tubuh sendiri & fungsinya.',
                    },
                    triggerQuestion:
                        'Bagian tubuh apa saja yang kalian miliki? Apa fungsinya?',
                    activities: {
                        mindful:
                            'Guru mengenalkan bagian-bagian tubuh dengan lagu "Kepala, Pundak, Lutut, Kaki". Siswa menyentuh dan menyebutkan bagian tubuhnya.',
                        joyful:
                            'Permainan "Sentuh Bagian Tubuh!" — guru menyebutkan nama bagian tubuh, siswa menyentuhnya dengan cepat.',
                        meaningful:
                            'Siswa menggambar bagian tubuh sederhana dan melabeli dengan nama bagian tubuhnya.',
                    },
                    materials: [
                        'Buku IPAS Kelas I SD',
                        'Poster bagian tubuh manusia',
                        'Cermin kecil',
                        'Kertas gambar',
                        'Krayon',
                        'LKPD',
                    ],
                    karakter: [
                        'Keimanan & Ketakwaan (syukur atas tubuh)',
                        'Kemandirian (mengenal diri sendiri)',
                        'Kesehatan (menjaga tubuh)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan bagian tubuh setiap hari',
                        'Ceritakan fungsi setiap bagian tubuh dengan bahasa sederhana',
                        'Beri apresiasi saat anak bisa menyebutkan bagian tubuhnya',
                        'Biasakan anak menjaga kebersihan tubuh',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan bagian tubuh',
                            solution: 'gunakan lagu & gerakan, tunjukkan bagian tubuh langsung',
                        },
                        {
                            issue: 'Anak malu menyebutkan bagian tubuh',
                            solution: 'beri contoh dulu, apresiasi setiap usaha',
                        },
                    ],
                    extensions: [
                        'Membuat poster bagian tubuh dengan gambar sendiri',
                        'Menyebutkan bagian tubuh dalam bahasa Inggris juga',
                        'Bercermin dan menyebutkan bagian tubuh yang terlihat',
                    ],
                    appreciationStage:
                        'Pajang gambar bagian tubuh anak di kamar. Ajak anak bercerita tentang tubuhnya ke keluarga.',
                    journal: [
                        'Hari 1: Sebutkan 5 bagian tubuh',
                        'Hari 2: Sebutkan fungsi kepala',
                        'Hari 3: Sebutkan fungsi tangan',
                        'Hari 4: Sebutkan fungsi kaki',
                        'Hari 5: Sebutkan fungsi badan',
                    ],
                    reflection: [
                        'Apa saja bagian tubuhmu?',
                        'Apa fungsi tanganmu?',
                        'Bagaimana kamu bersyukur atas tubuhmu?',
                    ],
                }),
                ipas_field: 'Manusia & Lingkungannya',
                required_materials: [
                    'Buku IPAS Kelas I SD',
                    'Poster bagian tubuh',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan hangat dan mengajak siswa berdoa. "Selamat pagi anak hebat! Hari ini kita belajar tentang tubuh kita!"',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "Kepala, Pundak, Lutut, Kaki" untuk membangun suasana.',
                    apperception:
                        'Guru bertanya: "Siapa yang tahu bagian-bagian tubuh kita?"',
                    trigger_question:
                        'Bagian tubuh apa saja yang kalian miliki?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tubuh manusia terdiri dari kepala, badan, tangan, dan kaki dengan fungsi masing-masing.',
                    concrete_steps: [
                        'Guru mengenalkan bagian tubuh dengan lagu.',
                        'Siswa menyentuh bagian tubuh sambil menyebutkannya.',
                        'Guru menjelaskan fungsi sederhana setiap bagian.',
                        'Siswa bercermin untuk melihat bagian tubuh sendiri.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Tubuh kita adalah karunia Tuhan. Yuk, kenali setiap bagiannya dan jaga kesehatannya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sentuh Bagian Tubuh!',
                    game_rules: [
                        'Guru menyebutkan nama bagian tubuh.',
                        'Siswa menyentuh bagian tubuh tersebut dengan cepat.',
                        'Yang paling cepat & benar diberi apresiasi.',
                        'Dilanjutkan dengan bernyanyi lagu bagian tubuh.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyentuh bagian tubuh dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan fungsi bagian tubuh sambil menyentuhnya.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menggambar & melabeli bagian tubuh.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: BAGIAN-BAGIAN TUBUHKU',
                        instructions:
                            'Amati gambar bagian tubuh berikut! Tuliskan nama bagian tubuh yang sesuai.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan bagian tubuh dengan fungsinya!',
                                data: {
                                    pairs: [
                                        { left: '👀 Mata', right: 'Untuk melihat' },
                                        { left: '👂 Telinga', right: 'Untuk mendengar' },
                                        { left: '👃 Hidung', right: 'Untuk mencium bau' },
                                        { left: '👄 Mulut', right: 'Untuk berbicara' },
                                    ],
                                },
                                answer_key: 'Mata→melihat, Telinga→mendengar, Hidung→mencium, Mulut→berbicara.',
                                explanation: 'Mengenal fungsi indra tubuh manusia.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu lengkap dari kepala sampai kaki!',
                                data: {
                                    prompt: 'Tubuhku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar tubuhku:',
                                },
                                answer_key: 'Siswa menggambar tubuh lengkap.',
                                explanation: 'Melatih motorik halus & kesadaran diri.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu setelah mengenal tubuhmu?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah mengenal tubuhmu?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bersyukur' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih kesadaran syukur.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja bagian tubuhmu?',
                        'Apa fungsi tanganmu?',
                        'Bagaimana kamu bersyukur atas tubuhmu?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menggambar tubuh pada LKPD 1.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 2: Indra dan Fungsinya',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal 5 indra manusia dan menjelaskan fungsinya melalui pengamatan langsung.',
                content_text: buildContentText({
                    title: 'Pertemuan 2: Indra dan Fungsinya',
                    field: 'Manusia & Lingkungannya',
                    objectives: [
                        'Mengenal 5 indra manusia (mata, telinga, hidung, kulit, lidah)',
                        'Menjelaskan fungsi setiap indra',
                        'Menggunakan indra untuk mengamati lingkungan sekitar',
                    ],
                    subMaterial:
                        'Mengenal **5 indra manusia**: mata (melihat), telinga (mendengar), hidung (mencium), kulit (meraba), lidah (mengecap). Indra membantu kita mengenal dunia.',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal indra sebagai alat untuk mengenal lingkungan.',
                        zat: 'Meraba berbagai tekstur benda (halus, kasar).',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Menggunakan indra untuk mengamati.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kita mengenal benda di sekitar kita?',
                    activities: {
                        mindful:
                            'Guru mengenalkan 5 indra & fungsinya. Siswa mengamati benda di sekitar dengan indra masing-masing.',
                        joyful:
                            'Permainan "Tebak dengan Indra!" — siswa menutup mata, mencium bau buah, menebak benda dengan rabaan, dsb.',
                        meaningful:
                            'Siswa membuat tabel pengamatan "Aku Mengenal Benda dengan Indra".',
                    },
                    materials: [
                        'Buku IPAS Kelas I SD',
                        'Buah-buahan untuk pengamatan bau & rasa',
                        'Benda berbagai tekstur (kapas, batu, kain)',
                        'Kotak tertutup',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (mengamati dengan indra)',
                        'Keimanan & Ketakwaan (syukur atas indra)',
                        'Komunikasi (menjelaskan pengamatan)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati benda dengan indra di rumah',
                        'Sediakan benda dengan tekstur berbeda untuk dirabah',
                        'Ceritakan pentingnya menjaga indra',
                        'Beri apresiasi saat anak bisa menjelaskan fungsinya',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan indra',
                            solution: 'gunakan alat peraga langsung, tunjukkan setiap indra',
                        },
                        {
                            issue: 'Anak tidak berani mencium/menjilat benda',
                            solution: 'beri contoh dulu, mulai dari benda yang familiar',
                        },
                    ],
                    extensions: [
                        'Mengamati hewan & tumbuhan dengan indra',
                        'Membuat buku "Indra dan Fungsinya"',
                        'Bermain tebak-tebakan dengan keluarga',
                    ],
                    appreciationStage:
                        'Tempel tabel pengamatan indra di kamar. Ajak anak bercerita tentang pengalaman mengamati.',
                    journal: [
                        'Hari 1: Amati warna dengan mata',
                        'Hari 2: Dengarkan suara burung',
                        'Hari 3: Cium bau bunga',
                        'Hari 4: Raba tekstur kain',
                        'Hari 5: Rasa buah manis',
                    ],
                    reflection: [
                        'Apa saja 5 indra manusia?',
                        'Indra apa yang paling kamu sukai?',
                        'Bagaimana cara kamu menjaga indra?',
                    ],
                }),
                ipas_field: 'Manusia & Lingkungannya',
                required_materials: [
                    'Buku IPAS Kelas I SD',
                    'Buah-buahan',
                    'Benda berbagai tekstur',
                    'Kotak tertutup',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat dan mengajak siswa berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menutup mata dan mendengarkan suara di sekitar. "Apa yang kalian dengar?"',
                    apperception:
                        'Guru bertanya: "Bagaimana cara kita tahu bahwa apel itu manis?"',
                    trigger_question:
                        'Bagaimana cara kita mengenal benda di sekitar?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Lima indra membantu kita mengenal dunia: mata, telinga, hidung, kulit, lidah.',
                    concrete_steps: [
                        'Guru mengenalkan 5 indra.',
                        'Siswa menyebutkan fungsi setiap indra.',
                        'Siswa mengamati benda dengan indra masing-masing.',
                        'Diskusi hasil pengamatan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Indra adalah jendela kita untuk mengenal dunia. Yuk, gunakan dengan baik!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak dengan Indra!',
                    game_rules: [
                        'Guru menutup mata siswa dengan kain.',
                        'Siswa mencium bau buah — tebak nama buahnya.',
                        'Siswa meraba benda — tebak benda & teksturnya.',
                        'Siswa mendengar suara — tebak sumber suara.',
                        'Setiap jawaban benar diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan tekstur & fungsinya.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengamati benda dengan indra & mencatat hasilnya.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: INDRA DAN FUNGSINYA',
                        instructions:
                            'Amati gambar & jawab pertanyaan tentang indra!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan indra dengan fungsinya!',
                                data: {
                                    pairs: [
                                        { left: '👁️ Mata', right: 'Melihat' },
                                        { left: '👂 Telinga', right: 'Mendengar' },
                                        { left: '👃 Hidung', right: 'Mencium' },
                                        { left: '👅 Lidah', right: 'Mengecap' },
                                        { left: '✋ Kulit', right: 'Meraba' },
                                    ],
                                },
                                answer_key:
                                    'Mata→melihat, Telinga→mendengar, Hidung→mencium, Lidah→mengecap, Kulit→meraba.',
                                explanation: 'Mengenal 5 indra & fungsinya.',
                            },
                            {
                                id: 2,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah belajar tentang indra?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah belajar tentang indra?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bersyukur' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih syukur atas indra.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah 3 benda yang bisa kamu kenali dengan indra mata!',
                                data: {
                                    prompt: 'Benda yang kulihat',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Benda yang kulihat:',
                                },
                                answer_key: 'Siswa menggambar 3 benda.',
                                explanation: 'Melatih pengamatan visual.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja 5 indra manusia?',
                        'Indra apa yang paling kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil LKPD 1.2 tentang indra, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 3: Merawat Tubuhku',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu mempraktikkan cara merawat tubuh dan menjelaskan pentingnya menjaga kebersihan tubuh.',
                content_text: buildContentText({
                    title: 'Pertemuan 3: Merawat Tubuhku',
                    field: 'Manusia & Lingkungannya',
                    objectives: [
                        'Menyebutkan cara merawat tubuh',
                        'Mempraktikkan kebiasaan menjaga kebersihan tubuh',
                        'Menjelaskan manfaat menjaga kebersihan tubuh',
                    ],
                    subMaterial:
                        'Merawat tubuh dengan **mandi, sikat gigi, cuci tangan, dan memotong kuku**. Tubuh yang bersih membuat kita sehat & tidak mudah sakit.',
                    cpHolistic: {
                        makhlukHidup: 'Menjaga tubuh sebagai makhluk hidup ciptaan Tuhan.',
                        zat: 'Air & sabun untuk membersihkan tubuh.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Menjaga kebersihan tubuh sebagai kebiasaan.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kamu merawat tubuhmu? Mengapa penting?',
                    activities: {
                        mindful:
                            'Guru menjelaskan cara merawat tubuh. Siswa berbagi kebiasaan menjaga kebersihan di rumah.',
                        joyful:
                            'Permainan "Aku Bisa Merawat Tubuh!" — siswa memeragakan cara mandi, sikat gigi, cuci tangan dengan gerakan.',
                        meaningful:
                            'Siswa membuat jurnal pembiasaan merawat tubuh selama seminggu.',
                    },
                    materials: [
                        'Buku IPAS Kelas I SD',
                        'Sikat gigi & pasta gigi',
                        'Sabun',
                        'Handuk kecil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kesehatan (menjaga tubuh)',
                        'Kemandirian (merawat diri sendiri)',
                        'Keimanan & Ketakwaan (syukur dengan menjaga tubuh)',
                    ],
                    parentTips: [
                        'Biasakan anak mandi 2x sehari',
                        'Ajak anak sikat gigi sebelum tidur & setelah makan',
                        'Cuci tangan sebelum makan & setelah bermain',
                        'Beri apresiasi saat anak mandiri merawat tubuh',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malas mandi',
                            solution: 'jadikan kegiatan menyenangkan dengan mainan air',
                        },
                        {
                            issue: 'Anak lupa sikat gigi',
                            solution: 'buat jadwal visual, ingatkan dengan lagu',
                        },
                    ],
                    extensions: [
                        'Membuat jadwal harian merawat tubuh',
                        'Menyanyikan lagu "Aku Anak Sehat"',
                        'Lomba sikat gigi bersama keluarga',
                    ],
                    appreciationStage:
                        'Rayakan anak yang mandiri merawat tubuh. Beri stiker untuk setiap pencapaian.',
                    journal: [
                        'Hari 1: Mandi pagi & sore',
                        'Hari 2: Sikat gigi 2x',
                        'Hari 3: Cuci tangan sebelum makan',
                        'Hari 4: Potong kuku',
                        'Hari 5: Ganti baju bersih',
                    ],
                    reflection: [
                        'Bagaimana cara merawat tubuhmu?',
                        'Mengapa penting menjaga kebersihan tubuh?',
                        'Apa manfaat tubuh yang bersih?',
                    ],
                }),
                ipas_field: 'Manusia & Lingkungannya',
                required_materials: [
                    'Buku IPAS Kelas I SD',
                    'Alat peraga kebersihan',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat dan mengajak siswa berdoa.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Aku Anak Sehat".',
                    apperception:
                        'Guru bertanya: "Siapa yang tadi pagi sudah mandi?"',
                    trigger_question:
                        'Bagaimana cara merawat tubuh?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Merawat tubuh adalah bentuk syukur kepada Tuhan dan kunci hidup sehat.',
                    concrete_steps: [
                        'Guru menjelaskan cara merawat tubuh.',
                        'Siswa menyebutkan kebiasaan baik mereka.',
                        'Guru menunjukkan cara sikat gigi & cuci tangan yang benar.',
                        'Siswa mempraktikkan gerakan sikat gigi.',
                        'Ulangi 3x untuk memperkuat kebiasaan.',
                    ],
                    script_parent:
                        '"Tubuh bersih = tubuh sehat = hati senang! Yuk, rawat tubuh dengan baik."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Aku Bisa Merawat Tubuh!',
                    game_rules: [
                        'Guru menyebutkan aktivitas (mandi, sikat gigi, cuci tangan).',
                        'Siswa memeragakan gerakannya.',
                        'Siswa yang paling semangat diberi apresiasi.',
                        'Dilanjutkan dengan lagu kebersihan.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memeragakan dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan langkah merawat tubuh.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membuat jurnal merawat tubuh & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.3: MERAWAT TUBUHKU',
                        instructions:
                            'Centang ✓ kegiatan merawat tubuh yang sudah kamu lakukan minggu ini!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan merawat tubuh yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Mandi 2x sehari', icon: '🚿', description: 'Pagi & sore' },
                                        { name: 'Sikat gigi', icon: '🦷', description: 'Pagi & sebelum tidur' },
                                        { name: 'Cuci tangan', icon: '🧼', description: 'Sebelum makan & setelah bermain' },
                                        { name: 'Potong kuku', icon: '✂️', description: 'Setiap minggu' },
                                        { name: 'Ganti baju bersih', icon: '👕', description: 'Setiap hari' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan yang sudah dilakukan.',
                                explanation: 'Melatih kebiasaan sehat.',
                            },
                            {
                                id: 2,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu setelah tubuhmu bersih?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah tubuhmu bersih?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Segar' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Tidak Nyaman' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi kebiasaan sehat.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang mandi atau sikat gigi!',
                                data: {
                                    prompt: 'Aku merawat tubuhku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku merawat tubuhku:',
                                },
                                answer_key: 'Siswa menggambar kegiatan merawat tubuh.',
                                explanation: 'Melatih kebiasaan sehat.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara merawat tubuhmu?',
                        'Mengapa penting menjaga kebersihan tubuh?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil LKPD 1.3 dan kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 1: Aku dan Tubuhku',
                        quiz_questions: [
                            {
                                question_text: 'Bagian tubuh yang digunakan untuk melihat adalah...',
                                option_a: 'Mata',
                                option_b: 'Telinga',
                                option_c: 'Hidung',
                                option_d: 'Kulit',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kita mendengar suara dengan...',
                                option_a: 'Mata',
                                option_b: 'Telinga',
                                option_c: 'Hidung',
                                option_d: 'Lidah',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Berapa jumlah indra manusia?',
                                option_a: '3',
                                option_b: '4',
                                option_c: '5',
                                option_d: '6',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Cara merawat tubuh antara lain...',
                                option_a: 'Malas mandi',
                                option_b: 'Tidak sikat gigi',
                                option_c: 'Mandi 2x sehari',
                                option_d: 'Tidak cuci tangan',
                                correct_answer: 'C',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 2: AKU DAN KELUARGAKU (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 2,
        title: 'Bab 2 Aku dan Keluargaku',
        ipas_field: 'Manusia & Lingkungannya',
        target_semester: 1,
        week_target: 4,
        lessons: [
            {
                title: 'Pertemuan 4: Keluargaku',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menyebutkan anggota keluarga inti dan menjelaskan hubungan kekeluargaan.',
                content_text: buildContentText({
                    title: 'Pertemuan 4: Keluargaku',
                    field: 'Manusia & Lingkungannya',
                    objectives: [
                        'Menyebutkan anggota keluarga inti (ayah, ibu, kakak, adik)',
                        'Menjelaskan hubungan kekeluargaan',
                        'Menumbuhkan rasa cinta kepada keluarga',
                    ],
                    subMaterial:
                        'Keluarga inti terdiri dari **ayah, ibu, dan anak**. Setiap anggota keluarga memiliki peran penting. Keluarga adalah tempat pertama kita belajar.',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal manusia sebagai makhluk sosial.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Mengenal keluarga & perannya.',
                    },
                    triggerQuestion:
                        'Siapa saja anggota keluargamu? Apa peran mereka?',
                    activities: {
                        mindful:
                            'Guru menjelaskan anggota keluarga inti & perannya. Siswa berbagi cerita tentang keluarganya.',
                        joyful:
                            'Permainan "Tebak Anggota Keluarga" — guru menunjukkan gambar, siswa menebak.',
                        meaningful:
                            'Siswa menggambar keluarga & menyebutkan nama anggota keluarga.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Foto keluarga (opsional)', 'Kertas gambar', 'Krayon', 'LKPD'],
                    karakter: [
                        'Kewargaan (cinta keluarga)',
                        'Komunikasi (bercerita)',
                        'Keimanan & Ketakwaan (syukur atas keluarga)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan nama anggota keluarga',
                        'Ceritakan peran setiap anggota keluarga',
                        'Beri apresiasi saat anak bisa menyebutkan',
                        'Buat "Family Tree" bersama anak',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan keluarga inti & besar',
                            solution: 'fokus ke keluarga inti dulu (ayah, ibu, kakak, adik)',
                        },
                        {
                            issue: 'Anak malu cerita tentang keluarga',
                            solution: 'beri contoh dulu, mulai dari pertanyaan mudah',
                        },
                    ],
                    extensions: [
                        'Membuat pohon keluarga dari karton',
                        'Wawancarai anggota keluarga tentang kesukaan mereka',
                        'Bikin video perkenalan keluarga',
                    ],
                    appreciationStage:
                        'Tempel gambar keluarga anak di kamar. Ajak bercerita tentang keluarganya.',
                    journal: [
                        'Hari 1: Sebutkan nama ayah & ibu',
                        'Hari 2: Sebutkan peran ayah',
                        'Hari 3: Sebutkan peran ibu',
                        'Hari 4: Bantu pekerjaan rumah',
                        'Hari 5: Ucapkan terima kasih ke keluarga',
                    ],
                    reflection: [
                        'Siapa saja anggota keluargamu?',
                        'Apa peran ayahmu?',
                        'Bagaimana kamu menunjukkan cinta pada keluarga?',
                    ],
                }),
                ipas_field: 'Manusia & Lingkungannya',
                required_materials: [
                    'Buku IPAS Kelas I SD',
                    'Kertas gambar',
                    'Krayon',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat dan mengajak siswa berdoa.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Satu-Satu Aku Sayang Ibu".',
                    apperception: 'Guru bertanya: "Siapa yang tinggal bersama ayah dan ibu?"',
                    trigger_question: 'Siapa saja anggota keluargamu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Keluarga inti terdiri dari ayah, ibu, dan anak. Setiap anggota punya peran penting.',
                    concrete_steps: [
                        'Guru mengenalkan anggota keluarga inti.',
                        'Siswa menyebutkan nama anggota keluarga.',
                        'Guru menjelaskan peran setiap anggota.',
                        'Diskusi tentang peran dalam keluarga.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Keluarga adalah harta paling berharga. Sayangi ayah, ibu, dan saudaramu!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Anggota Keluarga',
                    game_rules: [
                        'Guru menunjukkan gambar anggota keluarga.',
                        'Siswa menebak nama peran (ayah/ibu/kakak/adik).',
                        'Setiap tebakan benar diberi apresiasi.',
                        'Dilanjutkan dengan lagu keluarga.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan peran setiap anggota.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menggambar keluarga & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: KELUARGAKU',
                        instructions:
                            'Jodohkan anggota keluarga dengan perannya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan anggota keluarga dengan perannya!',
                                data: {
                                    pairs: [
                                        { left: '👨 Ayah', right: 'Kepala keluarga' },
                                        { left: '👩 Ibu', right: 'Mengurus rumah' },
                                        { left: '👦 Kakak', right: 'Melindungi adik' },
                                        { left: '👶 Adik', right: 'Disayang keluarga' },
                                    ],
                                },
                                answer_key: 'Ayah→kepala keluarga, Ibu→mengurus rumah.',
                                explanation: 'Mengenal peran anggota keluarga.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah keluargamu!',
                                data: {
                                    prompt: 'Keluargaku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Keluargaku:',
                                },
                                answer_key: 'Siswa menggambar keluarga.',
                                explanation: 'Melatih rasa cinta keluarga.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu memiliki keluarga?',
                                data: {
                                    question: 'Bagaimana perasaanmu memiliki keluarga?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bersyukur' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih syukur.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Siapa saja anggota keluargamu?',
                        'Apa peran ayahmu?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil menggambar keluarga pada LKPD 2.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 5: Peran Anggota Keluarga',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menjelaskan peran dan tanggung jawab setiap anggota keluarga.',
                content_text: buildContentText({
                    title: 'Pertemuan 5: Peran Anggota Keluarga',
                    field: 'Manusia & Lingkungannya',
                    objectives: [
                        'Menjelaskan peran ayah, ibu, dan anak dalam keluarga',
                        'Menyebutkan tanggung jawab masing-masing anggota keluarga',
                        'Menunjukkan sikap menghargai peran keluarga',
                    ],
                    subMaterial:
                        'Setiap anggota keluarga memiliki **peran & tanggung jawab**: ayah mencari nafkah, ibu mengurus rumah tangga, anak belajar & membantu. Peran berbeda tetapi saling melengkapi.',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal manusia sebagai anggota keluarga.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Mengenal peran anggota keluarga.',
                    },
                    triggerQuestion:
                        'Apa peranmu dalam keluarga? Bagaimana kamu membantu orang tua?',
                    activities: {
                        mindful:
                            'Guru menjelaskan peran anggota keluarga. Siswa berbagi bagaimana mereka membantu orang tua.',
                        joyful:
                            'Permainan peran "Keluargaku di Rumah" — siswa memerankan peran ayah, ibu, atau anak.',
                        meaningful:
                            'Siswa menuliskan tanggung jawab mereka di rumah.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Kertas & pensil', 'LKPD'],
                    karakter: [
                        'Kewargaan (tanggung jawab)',
                        'Kolaborasi (bekerja sama)',
                        'Kemandirian (tanggung jawab diri)',
                    ],
                    parentTips: [
                        'Beri anak tanggung jawab kecil di rumah',
                        'Ajak anak berdiskusi peran setiap anggota',
                        'Beri apresiasi saat anak menjalankan tanggung jawab',
                        'Diskusikan pembagian tugas keluarga',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak tidak mau membantu',
                            solution: 'beri tugas ringan sesuai usia, jadikan menyenangkan',
                        },
                        {
                            issue: 'Anak bingung peran masing-masing',
                            solution: 'gunakan gambar & contoh nyata',
                        },
                    ],
                    extensions: [
                        'Membuat jadwal tugas keluarga',
                        'Membuat "Piagam Keluarga Hebat"',
                        'Bikin video keluarga berperan',
                    ],
                    appreciationStage:
                        'Rayakan setiap pencapaian tanggung jawab anak. Beri stiker.',
                    journal: [
                        'Hari 1: Bantu ayah',
                        'Hari 2: Bantu ibu',
                        'Hari 3: Rapikan kamar',
                        'Hari 4: Cuci piring',
                        'Hari 5: Sapu halaman',
                    ],
                    reflection: [
                        'Apa peranmu dalam keluarga?',
                        'Bagaimana kamu membantu orang tua?',
                    ],
                }),
                ipas_field: 'Manusia & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Kertas', 'Pensil', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi lagu keluarga.',
                    apperception: 'Guru bertanya: "Apa yang kamu lakukan untuk membantu orang tua?"',
                    trigger_question: 'Apa peranmu dalam keluarga?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Setiap anggota keluarga punya peran & tanggung jawab masing-masing.',
                    concrete_steps: [
                        'Guru menjelaskan peran ayah, ibu, anak.',
                        'Siswa menyebutkan peran di rumah.',
                        'Diskusi tentang tanggung jawab anak.',
                        'Siswa berbagi pengalaman.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Setiap anggota keluarga punya peran. Kalau semua menjalankan perannya, keluarga bahagia!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Keluargaku di Rumah',
                    game_rules: [
                        'Guru membagi siswa dalam kelompok.',
                        'Setiap kelompok memerankan keluarga (ayah, ibu, anak).',
                        'Siswa memeragakan aktivitas bersama.',
                        'Kelompok terbaik diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Bermain peran dengan bantuan guru.',
                        child_level_advanced: 'Membuat dialog sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menuliskan tanggung jawab di rumah & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: PERAN ANGGOTA KELUARGA',
                        instructions:
                            'Tuliskan peran anggota keluargamu & tanggung jawabmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan anggota keluarga dengan tugasnya!',
                                data: {
                                    pairs: [
                                        { left: '👨 Ayah', right: 'Mencari nafkah' },
                                        { left: '👩 Ibu', right: 'Mengurus rumah' },
                                        { left: '👦 Anak', right: 'Belajar & membantu' },
                                        { left: '👵 Nenek', right: 'Menasihati' },
                                    ],
                                },
                                answer_key: 'Ayah→mencari nafkah, Ibu→mengurus rumah, Anak→belajar.',
                                explanation: 'Mengenal tanggung jawab keluarga.',
                            },
                            {
                                id: 2,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu bisa membantu orang tua?',
                                data: {
                                    question: 'Bagaimana perasaanmu bisa membantu orang tua?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bangga' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Bisa' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih kebanggaan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah dirimu membantu orang tua!',
                                data: {
                                    prompt: 'Aku membantu orang tua',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku membantu orang tua:',
                                },
                                answer_key: 'Siswa menggambar aktivitas membantu.',
                                explanation: 'Melatih tanggung jawab.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa peranmu dalam keluarga?',
                        'Bagaimana kamu membantu orang tua?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Rekam suaramu menyebutkan peranmu dalam keluarga!',
                    },
                ],
            },
            {
                title: 'Pertemuan 6: Kasih Sayang dalam Keluargaku',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menunjukkan kasih sayang kepada anggota keluarga melalui sikap dan ucapan.',
                content_text: buildContentText({
                    title: 'Pertemuan 6: Kasih Sayang dalam Keluargaku',
                    field: 'Manusia & Lingkungannya',
                    objectives: [
                        'Menjelaskan pentingnya kasih sayang dalam keluarga',
                        'Menunjukkan sikap kasih sayang kepada anggota keluarga',
                        'Membiasakan mengucapkan kata-kata baik kepada keluarga',
                    ],
                    subMaterial:
                        'Kasih sayang membuat keluarga harmonis & bahagia. Kita bisa menunjukkan kasih sayang dengan **ucapan baik, pelukan, dan membantu**.',
                    cpHolistic: {
                        makhlukHidup: 'Menumbuhkan kasih sayang sebagai makhluk sosial.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Membiasakan kasih sayang dalam keluarga.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kamu menunjukkan kasih sayang kepada keluarga?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pentingnya kasih sayang. Siswa berbagi cara mereka menunjukkan kasih sayang.',
                        joyful:
                            'Permainan "Peluk Keluarga" — siswa memeragakan kasih sayang.',
                        meaningful:
                            'Membuat kartu ucapan kasih sayang untuk keluarga.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Kertas karton', 'Krayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (kasih sayang)',
                        'Komunikasi (ucapan baik)',
                        'Kewargaan (cinta keluarga)',
                    ],
                    parentTips: [
                        'Biasakan ucapan "terima kasih", "tolong", "maaf" di rumah',
                        'Peluk anak & beri afirmasi positif',
                        'Beri apresiasi saat anak menunjukkan kasih sayang',
                        'Buat tradisi kasih sayang keluarga (pelukan pagi)',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malu menunjukkan kasih sayang',
                            solution: 'mulai dari ucapan sederhana, beri contoh',
                        },
                        {
                            issue: 'Anak suka marah',
                            solution: 'ajarkan mengenal emosi & cara mengungkapkan dengan baik',
                        },
                    ],
                    extensions: [
                        'Membuat kartu ucapan kasih sayang',
                        'Bikin video "Aku Sayang Keluargaku"',
                        'Menulis surat kecil untuk orang tua',
                    ],
                    appreciationStage:
                        'Tempel kartu kasih sayang di kulkas. Bacakan bersama keluarga.',
                    journal: [
                        'Hari 1: Ucapkan "terima kasih" ke ayah',
                        'Hari 2: Peluk ibu',
                        'Hari 3: Ucapkan "maaf" jika salah',
                        'Hari 4: Bantu kakak/adik',
                        'Hari 5: Ucapkan "aku sayang kamu"',
                    ],
                    reflection: [
                        'Bagaimana cara kamu menunjukkan kasih sayang?',
                        'Mengapa kasih sayang penting?',
                    ],
                }),
                ipas_field: 'Manusia & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Kertas karton', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi lagu "Kasih Ibu".',
                    apperception: 'Guru bertanya: "Bagaimana cara kamu menunjukkan cinta ke orang tua?"',
                    trigger_question: 'Bagaimana cara kamu menunjukkan kasih sayang?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kasih sayang membuat keluarga bahagia & harmonis.',
                    concrete_steps: [
                        'Guru menjelaskan pentingnya kasih sayang.',
                        'Siswa menyebutkan cara menunjukkan kasih sayang.',
                        'Guru memberi contoh ucapan baik.',
                        'Siswa berlatih mengucapkan kata-kata baik.',
                        'Ulangi 3x untuk memperkuat kebiasaan.',
                    ],
                    script_parent:
                        '"Kasih sayang bisa ditunjukkan dengan kata-kata baik, pelukan, dan perbuatan."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Peluk Keluarga',
                    game_rules: [
                        'Guru menyebutkan situasi (pagi hari, pulang sekolah).',
                        'Siswa memeragakan kasih sayang sesuai situasi.',
                        'Yang paling ekspresif diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memeragakan dengan contoh guru.',
                        child_level_advanced: 'Memeragakan dengan ucapan sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membuat kartu kasih sayang & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.3: KASIH SAYANG DALAM KELUARGAKU',
                        instructions:
                            'Buat kartu ucapan kasih sayang untuk keluargamu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah kartu ucapan kasih sayang untuk keluargamu!',
                                data: {
                                    prompt: 'Kartu kasih sayang',
                                    guideLines: 'grid',
                                    rows: 1,
                                    label: 'Kartu kasih sayangku:',
                                },
                                answer_key: 'Siswa menggambar kartu ucapan.',
                                explanation: 'Melatih ekspresi kasih sayang.',
                            },
                            {
                                id: 2,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu saat menunjukkan kasih sayang?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat menunjukkan kasih sayang?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bahagia' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Malu' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih kesadaran emosi.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ ucapan baik yang sudah kamu ucapkan hari ini!',
                                data: {
                                    rules: [
                                        { name: 'Terima kasih', icon: '🙏', description: 'Saat dibantu' },
                                        { name: 'Tolong', icon: '🤝', description: 'Saat butuh bantuan' },
                                        { name: 'Maaf', icon: '😔', description: 'Saat salah' },
                                        { name: 'Aku sayang kamu', icon: '❤️', description: 'Ke keluarga' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang ucapan baik.',
                                explanation: 'Melatih komunikasi positif.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara kamu menunjukkan kasih sayang?',
                        'Mengapa kasih sayang penting?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil kartu kasih sayang pada LKPD 2.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 2: Aku dan Keluargaku',
                        quiz_questions: [
                            {
                                question_text: 'Kepala keluarga biasanya adalah...',
                                option_a: 'Anak',
                                option_b: 'Ayah',
                                option_c: 'Adik',
                                option_d: 'Tetangga',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Sikap kasih sayang kepada keluarga bisa ditunjukkan dengan...',
                                option_a: 'Memukul adik',
                                option_b: 'Berkata kasar',
                                option_c: 'Membantu orang tua',
                                option_d: 'Membantah',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Ucapan yang baik saat dibantu adalah...',
                                option_a: 'Tidak apa-apa',
                                option_b: 'Terima kasih',
                                option_c: 'Bodoh',
                                option_d: 'Cepatlah',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Keluarga inti terdiri dari...',
                                option_a: 'Ayah, ibu, dan anak',
                                option_b: 'Tetangga',
                                option_c: 'Guru',
                                option_d: 'Teman',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 3: HEWAN DI SEKITARKU (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 3,
        title: 'Bab 3 Hewan di Sekitarku',
        ipas_field: 'Makhluk Hidup & Lingkungannya',
        target_semester: 1,
        week_target: 7,
        lessons: [
            {
                title: 'Pertemuan 7: Ciri-Ciri Hewan',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal ciri-ciri hewan dan mengelompokkan hewan berdasarkan ciri-cirinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 7: Ciri-Ciri Hewan',
                    field: 'Makhluk Hidup & Lingkungannya',
                    objectives: [
                        'Menyebutkan ciri-ciri hewan (bernafas, bergerak, makan, berkembang biak)',
                        'Mengelompokkan hewan berdasarkan ciri-cirinya',
                        'Mengamati hewan di sekitar rumah',
                    ],
                    subMaterial:
                        'Hewan adalah **makhluk hidup** dengan ciri: bernafas, bergerak, makan, tumbuh, dan berkembang biak. Ada hewan yang hidup di darat, air, dan udara.',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal ciri-ciri hewan sebagai makhluk hidup.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Berinteraksi dengan hewan di sekitar.',
                    },
                    triggerQuestion:
                        'Apa saja hewan yang kalian lihat di sekitar rumah?',
                    activities: {
                        mindful:
                            'Guru menjelaskan ciri-ciri hewan. Siswa mengamati hewan di sekitar & menyebutkan cirinya.',
                        joyful:
                            'Permainan "Tebak Hewan" — guru menyebutkan ciri, siswa menebak nama hewan.',
                        meaningful:
                            'Siswa mengelompokkan gambar hewan berdasarkan habitat (darat, air, udara).',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar hewan', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (syukur atas hewan)',
                        'Penalaran Kritis (mengamati ciri)',
                        'Kewargaan (menyayangi hewan)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati hewan di sekitar rumah',
                        'Ceritakan ciri-ciri hewan yang ditemui',
                        'Beri apresiasi saat anak bisa menyebutkan ciri',
                        'Ajarkan menyayangi hewan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan hewan',
                            solution: 'gunakan gambar besar & warna, tunjukkan ciri spesifik',
                        },
                        {
                            issue: 'Anak takut hewan',
                            solution: 'mulai dari gambar, beri contoh aman',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Hewan di Sekitarku"',
                        'Mengamati hewan dengan kaca pembesar',
                        'Merawat hewan kecil (ikan, kucing)',
                    ],
                    appreciationStage:
                        'Pajang gambar hewan anak. Ajak bercerita tentang hewan favorit.',
                    journal: [
                        'Hari 1: Amati 1 hewan di rumah',
                        'Hari 2: Sebutkan cirinya',
                        'Hari 3: Amati hewan berbeda',
                        'Hari 4: Gambar hewan',
                        'Hari 5: Cerita tentang hewan',
                    ],
                    reflection: [
                        'Apa saja ciri hewan?',
                        'Hewan apa yang kamu sukai?',
                        'Bagaimana cara menyayangi hewan?',
                    ],
                }),
                ipas_field: 'Makhluk Hidup & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar hewan', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Kucingku".',
                    apperception: 'Guru bertanya: "Siapa yang punya hewan peliharaan?"',
                    trigger_question: 'Hewan apa saja yang ada di sekitarmu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Hewan adalah makhluk hidup dengan ciri-ciri khusus.',
                    concrete_steps: [
                        'Guru menjelaskan ciri-ciri hewan.',
                        'Siswa mengamati hewan di sekitar.',
                        'Siswa menyebutkan ciri-ciri hewan.',
                        'Diskusi kelompok hewan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Hewan itu makhluk hidup ciptaan Tuhan. Yuk, kenali ciri-cirinya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Hewan',
                    game_rules: [
                        'Guru menyebutkan ciri hewan.',
                        'Siswa menebak nama hewan.',
                        'Contoh: "Berkaki empat, bersuara meong" → kucing.',
                        'Siswa dengan tebakan terbanyak diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan ciri & habitat.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengelompokkan hewan & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: CIRI-CIRI HEWAN',
                        instructions: 'Amati gambar hewan berikut & jodohkan dengan cirinya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan hewan dengan ciri khususnya!',
                                data: {
                                    pairs: [
                                        { left: '🐟 Ikan', right: 'Hidup di air' },
                                        { left: '🐦 Burung', right: 'Bisa terbang' },
                                        { left: '🐈 Kucing', right: 'Bersuara meong' },
                                        { left: '🐄 Sapi', right: 'Menghasilkan susu' },
                                    ],
                                },
                                answer_key: 'Ikan→air, Burung→terbang, Kucing→meong, Sapi→susu.',
                                explanation: 'Mengenal ciri hewan.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah hewan favoritmu!',
                                data: {
                                    prompt: 'Hewan favoritku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Hewan favoritku:',
                                },
                                answer_key: 'Siswa menggambar hewan favorit.',
                                explanation: 'Melatih pengamatan & seni.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu saat melihat hewan?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat melihat hewan?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Gemas' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Takut' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih empati.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja ciri hewan?',
                        'Hewan apa yang kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 3.1 tentang hewan, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 8: Makanan Hewan',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengelompokkan hewan berdasarkan jenis makanannya (herbivora, karnivora, omnivora).',
                content_text: buildContentText({
                    title: 'Pertemuan 8: Makanan Hewan',
                    field: 'Makhluk Hidup & Lingkungannya',
                    objectives: [
                        'Mengenal jenis makanan hewan',
                        'Mengelompokkan hewan berdasarkan makanannya',
                        'Mengamati makanan hewan di sekitar',
                    ],
                    subMaterial:
                        'Hewan makan berbeda-beda: **herbivora** (makan tumbuhan), **karnivora** (makan daging), **omnivora** (makan keduanya).',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal makanan hewan.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Memberi makan hewan peliharaan.',
                    },
                    triggerQuestion:
                        'Apa makanan hewan yang kalian lihat?',
                    activities: {
                        mindful:
                            'Guru menjelaskan jenis makanan hewan. Siswa mengamati makanan hewan peliharaan.',
                        joyful:
                            'Permainan "Beri Makan Hewan" — siswa mengelompokkan gambar makanan sesuai hewan.',
                        meaningful:
                            'Siswa membuat tabel hewan & makanannya.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar makanan hewan', 'Kertas', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (mengelompokkan)',
                        'Kewargaan (menyayangi hewan)',
                        'Kesehatan (makanan sehat)',
                    ],
                    parentTips: [
                        'Ajak anak memberi makan hewan peliharaan',
                        'Ceritakan makanan hewan yang berbeda',
                        'Beri apresiasi saat anak bisa mengelompokkan',
                        'Ajarkan menyayangi hewan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan jenis makanan',
                            solution: 'gunakan gambar jelas & contoh nyata',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan hewan favorit anak',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Hewan & Makanannya"',
                        'Amati hewan makan di rumah',
                        'Beri makan hewan bersama keluarga',
                    ],
                    appreciationStage:
                        'Pajang tabel hewan & makanan di kamar anak.',
                    journal: [
                        'Hari 1: Amati makanan kucing',
                        'Hari 2: Amati makanan burung',
                        'Hari 3: Amati makanan ikan',
                        'Hari 4: Beri makan hewan',
                        'Hari 5: Cerita tentang hewan',
                    ],
                    reflection: [
                        'Apa makanan hewan peliharaanmu?',
                        'Apa bedanya herbivora, karnivora, omnivora?',
                    ],
                }),
                ipas_field: 'Makhluk Hidup & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar makanan hewan', 'Kertas', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi lagu tentang hewan.',
                    apperception: 'Guru bertanya: "Apa makanan hewan peliharaanmu?"',
                    trigger_question: 'Apa makanan hewan yang kalian lihat?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Hewan makan makanan yang berbeda-beda sesuai jenisnya.',
                    concrete_steps: [
                        'Guru menjelaskan jenis makanan hewan.',
                        'Siswa menyebutkan makanan hewan yang dikenal.',
                        'Guru mengelompokkan herbivora/karnivora/omnivora.',
                        'Siswa mengamati makanan hewan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Setiap hewan punya makanan favoritnya sendiri. Ada yang makan tumbuhan, ada yang makan daging."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Beri Makan Hewan',
                    game_rules: [
                        'Guru menunjukkan gambar hewan.',
                        'Siswa memilih gambar makanan yang sesuai.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memilih makanan dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan jenis hewan (herbivora, dll).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengelompokkan hewan & makanan.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: MAKANAN HEWAN',
                        instructions: 'Jodohkan hewan dengan makanannya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan hewan dengan makanannya!',
                                data: {
                                    pairs: [
                                        { left: '🐰 Kelinci', right: '🥕 Wortel' },
                                        { left: '🐈 Kucing', right: '🐟 Ikan' },
                                        { left: '🐦 Burung', right: '🌾 Biji-bijian' },
                                        { left: '🐄 Sapi', right: '🌿 Rumput' },
                                    ],
                                },
                                answer_key: 'Kelinci→wortel, Kucing→ikan, Burung→biji, Sapi→rumput.',
                                explanation: 'Mengenal makanan hewan.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah hewan peliharaanmu sedang makan!',
                                data: {
                                    prompt: 'Hewanku makan',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Hewanku sedang makan:',
                                },
                                answer_key: 'Siswa menggambar hewan makan.',
                                explanation: 'Melatih pengamatan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'RULES_CARD',
                                question: 'Centang ✓ makanan hewan yang pernah kamu berikan!',
                                data: {
                                    rules: [
                                        { name: 'Ikan', icon: '🐟', description: 'Untuk kucing' },
                                        { name: 'Wortel', icon: '🥕', description: 'Untuk kelinci' },
                                        { name: 'Rumput', icon: '🌿', description: 'Untuk sapi' },
                                        { name: 'Biji-bijian', icon: '🌾', description: 'Untuk burung' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang makanan.',
                                explanation: 'Melatih pengalaman nyata.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa makanan hewan peliharaanmu?',
                        'Apa bedanya herbivora & karnivora?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 3.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 9: Hewan Peliharaan',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menjelaskan cara merawat hewan peliharaan dengan baik.',
                content_text: buildContentText({
                    title: 'Pertemuan 9: Hewan Peliharaan',
                    field: 'Makhluk Hidup & Lingkungannya',
                    objectives: [
                        'Menyebutkan hewan peliharaan yang umum',
                        'Menjelaskan cara merawat hewan peliharaan',
                        'Menumbuhkan rasa kasih sayang kepada hewan',
                    ],
                    subMaterial:
                        'Hewan peliharaan seperti **kucing, ikan, burung, kelinci** perlu dirawat dengan baik: diberi makan, minum, kandang bersih, dan kasih sayang.',
                    cpHolistic: {
                        makhlukHidup: 'Merawat hewan peliharaan.',
                        zat: 'Air minum untuk hewan.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Belum diperkenalkan.',
                        manusia: 'Menumbuhkan kasih sayang pada hewan.',
                    },
                    triggerQuestion:
                        'Bagaimana cara merawat hewan peliharaanmu?',
                    activities: {
                        mindful:
                            'Guru menjelaskan cara merawat hewan. Siswa berbagi pengalaman merawat hewan.',
                        joyful:
                            'Permainan peran "Merawat Hewan" — siswa memeragakan cara merawat.',
                        meaningful:
                            'Membuat jadwal merawat hewan peliharaan.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar hewan peliharaan', 'Kertas', 'LKPD'],
                    karakter: [
                        'Kewargaan (menyayangi hewan)',
                        'Kemandirian (merawat sendiri)',
                        'Kesehatan (kebersihan kandang)',
                    ],
                    parentTips: [
                        'Ajak anak merawat hewan peliharaan bersama',
                        'Beri tanggung jawab memberi makan',
                        'Ceritakan pentingnya kasih sayang pada hewan',
                        'Beri apresiasi saat anak mandiri merawat',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak takut hewan',
                            solution: 'mulai dari hewan kecil & aman',
                        },
                        {
                            issue: 'Anak lupa beri makan',
                            solution: 'buat jadwal visual, ingatkan',
                        },
                    ],
                    extensions: [
                        'Bikin buku harian "Hewan Peliharaanku"',
                        'Foto hewan peliharaan',
                        'Ajak hewan bermain',
                    ],
                    appreciationStage:
                        'Rayakan anak yang merawat hewan dengan baik.',
                    journal: [
                        'Hari 1: Beri makan hewan',
                        'Hari 2: Beri minum',
                        'Hari 3: Bersihkan kandang',
                        'Hari 4: Ajak hewan bermain',
                        'Hari 5: Peluk & sayangi',
                    ],
                    reflection: [
                        'Bagaimana cara merawat hewan?',
                        'Mengapa penting menyayangi hewan?',
                    ],
                }),
                ipas_field: 'Makhluk Hidup & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar hewan', 'Kertas', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi lagu hewan.',
                    apperception: 'Guru bertanya: "Siapa punya hewan peliharaan?"',
                    trigger_question: 'Bagaimana cara merawat hewan peliharaan?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Hewan peliharaan perlu dirawat dengan baik & disayang.',
                    concrete_steps: [
                        'Guru menjelaskan cara merawat hewan.',
                        'Siswa menyebutkan hewan peliharaan.',
                        'Diskusi cara merawat.',
                        'Siswa berbagi pengalaman.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Hewan peliharaan butuh kasih sayang kita. Rawat dengan baik ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Merawat Hewan',
                    game_rules: [
                        'Guru menunjukkan gambar situasi merawat hewan.',
                        'Siswa menebak apakah benar/salah caranya.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan alasan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membuat jadwal merawat hewan.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.3: HEWAN PELIHARAAN',
                        instructions:
                            'Centang ✓ kegiatan merawat hewan yang sudah kamu lakukan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan merawat hewan yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Beri makan', icon: '🍽️', description: 'Setiap hari' },
                                        { name: 'Beri minum', icon: '💧', description: 'Air bersih' },
                                        { name: 'Bersihkan kandang', icon: '🧹', description: 'Kandang bersih' },
                                        { name: 'Ajak bermain', icon: '🎾', description: 'Bermain bersama' },
                                        { name: 'Peluk & sayangi', icon: '🤗', description: 'Kasih sayang' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan.',
                                explanation: 'Melatih tanggung jawab.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah hewan peliharaanmu (atau hewan favoritmu)!',
                                data: {
                                    prompt: 'Hewan peliharaan',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Hewan peliharaanku:',
                                },
                                answer_key: 'Siswa menggambar hewan.',
                                explanation: 'Melatih ekspresi seni.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu punya hewan peliharaan?',
                                data: {
                                    question: 'Bagaimana perasaanmu punya hewan peliharaan?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Sayang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Punya' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih empati.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara merawat hewan?',
                        'Mengapa penting menyayangi hewan?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Rekam suaramu menyebutkan cara merawat hewan peliharaan!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 3: Hewan di Sekitarku',
                        quiz_questions: [
                            {
                                question_text: 'Hewan yang hidup di air adalah...',
                                option_a: 'Kucing',
                                option_b: 'Ikan',
                                option_c: 'Burung',
                                option_d: 'Sapi',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Hewan pemakan tumbuhan disebut...',
                                option_a: 'Karnivora',
                                option_b: 'Herbivora',
                                option_c: 'Omnivora',
                                option_d: 'Insektivora',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Makanan kelinci adalah...',
                                option_a: 'Daging',
                                option_b: 'Wortel',
                                option_c: 'Ikan',
                                option_d: 'Tulang',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Cara merawat hewan peliharaan antara lain...',
                                option_a: 'Tidak diberi makan',
                                option_b: 'Diberi makan & minum',
                                option_c: 'Dibiarkan kotor',
                                option_d: 'Disiksa',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 4: TUMBUHAN DI SEKITARKU (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 4,
        title: 'Bab 4 Tumbuhan di Sekitarku',
        ipas_field: 'Makhluk Hidup & Lingkungannya',
        target_semester: 1,
        week_target: 10,
        lessons: [
            {
                title: 'Pertemuan 10: Bagian-Bagian Tumbuhan',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal bagian-bagian tumbuhan (akar, batang, daun, bunga, buah) dan fungsinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 10: Bagian-Bagian Tumbuhan',
                    field: 'Makhluk Hidup & Lingkungannya',
                    objectives: [
                        'Menyebutkan bagian-bagian tumbuhan',
                        'Menjelaskan fungsi setiap bagian tumbuhan',
                        'Mengamati tumbuhan di sekitar rumah',
                    ],
                    subMaterial:
                        'Tumbuhan memiliki bagian: **akar** (menyerap air), **batang** (menopang), **daun** (membuat makanan), **bunga** (alat berkembang biak), **buah** (hasil).',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal tumbuhan sebagai makhluk hidup.',
                        zat: 'Air & zat hara untuk tumbuhan.',
                        energi: 'Matahari membantu tumbuhan membuat makanan.',
                        bumi: 'Tumbuhan tumbuh di tanah.',
                        manusia: 'Mengenal tumbuhan sekitar.',
                    },
                    triggerQuestion:
                        'Apa saja bagian tumbuhan? Apa fungsinya?',
                    activities: {
                        mindful:
                            'Guru mengenalkan bagian tumbuhan dengan gambar. Siswa mengamati tumbuhan di sekitar.',
                        joyful:
                            'Permainan "Sentuh Bagian Tumbuhan" — siswa menyentuh bagian tumbuhan sambil menyebutkannya.',
                        meaningful:
                            'Menggambar tumbuhan & melabeli bagian-bagiannya.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Tanaman kecil (pot)', 'Kertas gambar', 'Krayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (syukur atas tumbuhan)',
                        'Penalaran Kritis (mengamati)',
                        'Kewargaan (menyayangi alam)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati tumbuhan di sekitar rumah',
                        'Ceritakan fungsi setiap bagian tumbuhan',
                        'Beri apresiasi saat anak bisa menyebutkan',
                        'Biasakan menyiram tanaman bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan bagian',
                            solution: 'gunakan tanaman nyata, tunjukkan langsung',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan makanan sehari-hari',
                        },
                    ],
                    extensions: [
                        'Menanam biji kacang hijau',
                        'Membuat herbarium daun',
                        'Bikin buku "Tumbuhan di Rumahku"',
                    ],
                    appreciationStage:
                        'Pajang gambar tumbuhan anak di kamar.',
                    journal: [
                        'Hari 1: Amati tumbuhan',
                        'Hari 2: Sebutkan bagian',
                        'Hari 3: Sebutkan fungsi',
                        'Hari 4: Gambar tumbuhan',
                        'Hari 5: Siram tanaman',
                    ],
                    reflection: [
                        'Apa saja bagian tumbuhan?',
                        'Apa fungsi daun?',
                    ],
                }),
                ipas_field: 'Makhluk Hidup & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Tanaman kecil', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Lihat Kebunku".',
                    apperception: 'Guru bertanya: "Apa saja yang ada di kebun?"',
                    trigger_question: 'Apa saja bagian tumbuhan?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tumbuhan punya akar, batang, daun, bunga, buah dengan fungsi berbeda.',
                    concrete_steps: [
                        'Guru mengenalkan bagian tumbuhan.',
                        'Siswa mengamati tanaman nyata.',
                        'Guru menjelaskan fungsi setiap bagian.',
                        'Siswa menyentuh & menyebutkan bagian.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Tumbuhan itu makhluk hidup juga! Bagian-bagiannya punya tugas berbeda."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sentuh Bagian Tumbuhan',
                    game_rules: [
                        'Guru menyebutkan bagian tumbuhan.',
                        'Siswa menyentuh bagian tersebut pada tanaman.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyentuh dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan fungsi sambil menyentuh.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menggambar tumbuhan & melabeli.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: BAGIAN-BAGIAN TUMBUHAN',
                        instructions: 'Jodohkan bagian tumbuhan dengan fungsinya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan bagian tumbuhan dengan fungsinya!',
                                data: {
                                    pairs: [
                                        { left: '🌱 Akar', right: 'Menyerap air' },
                                        { left: '🌿 Batang', right: 'Menopang tumbuhan' },
                                        { left: '🍃 Daun', right: 'Membuat makanan' },
                                        { left: '🌸 Bunga', right: 'Alat berkembang biak' },
                                    ],
                                },
                                answer_key: 'Akar→serap air, Batang→menopang, Daun→makanan, Bunga→kembang biak.',
                                explanation: 'Mengenal fungsi bagian tumbuhan.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah tumbuhan lengkap dengan bagian-bagiannya!',
                                data: {
                                    prompt: 'Tumbuhan lengkap',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar tumbuhan:',
                                },
                                answer_key: 'Siswa menggambar tumbuhan lengkap.',
                                explanation: 'Melatih pengamatan & seni.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu belajar tentang tumbuhan?',
                                data: {
                                    question: 'Bagaimana perasaanmu belajar tentang tumbuhan?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Tertarik' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja bagian tumbuhan?',
                        'Apa fungsi daun?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 4.1 tentang tumbuhan, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 11: Tumbuhan di Sekitar Rumahku',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengamati & menyebutkan tumbuhan yang ada di sekitar rumah beserta ciri-cirinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 11: Tumbuhan di Sekitar Rumahku',
                    field: 'Makhluk Hidup & Lingkungannya',
                    objectives: [
                        'Menyebutkan tumbuhan di sekitar rumah',
                        'Mengelompokkan tumbuhan (pohon, semak, rumput)',
                        'Mengamati ciri tumbuhan di sekitar',
                    ],
                    subMaterial:
                        'Tumbuhan di sekitar rumah: **pohon** (mangga, rambutan), **semak** (bunga), **rumput**, dan **tanaman hias**. Setiap tumbuhan punya ciri berbeda.',
                    cpHolistic: {
                        makhlukHidup: 'Mengenal tumbuhan sekitar.',
                        zat: 'Tumbuhan butuh air & tanah.',
                        energi: 'Matahari untuk tumbuh.',
                        bumi: 'Tumbuhan tumbuh di tanah.',
                        manusia: 'Mengenal tumbuhan di rumah.',
                    },
                    triggerQuestion:
                        'Tumbuhan apa saja yang ada di sekitar rumahmu?',
                    activities: {
                        mindful:
                            'Guru menjelaskan jenis tumbuhan. Siswa mengamati tumbuhan di sekitar rumah mereka.',
                        joyful:
                            'Permainan "Tebak Tumbuhan" — guru menunjukkan gambar, siswa menebak.',
                        meaningful:
                            'Siswa membuat tabel pengamatan tumbuhan di rumah.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar tumbuhan', 'Kertas', 'LKPD'],
                    karakter: [
                        'Kewargaan (cinta lingkungan)',
                        'Penalaran Kritis (mengamati)',
                        'Keimanan & Ketakwaan (syukur)',
                    ],
                    parentTips: [
                        'Ajak anak berkeliling rumah mengamati tumbuhan',
                        'Sebutkan nama tumbuhan di sekitar',
                        'Beri apresiasi saat anak bisa menyebutkan',
                        'Ceritakan manfaat tumbuhan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung nama tumbuhan',
                            solution: 'sebutkan sambil berjalan, beri label kecil',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan makanan favorit (buah)',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Tumbuhan di Rumahku"',
                        'Foto tumbuhan sekitar',
                        'Menanam biji buah',
                    ],
                    appreciationStage:
                        'Pajang buku tumbuhan anak. Ajak bercerita.',
                    journal: [
                        'Hari 1: Amati 1 tumbuhan',
                        'Hari 2: Sebutkan nama',
                        'Hari 3: Amati tumbuhan berbeda',
                        'Hari 4: Klasifikasi',
                        'Hari 5: Foto tumbuhan',
                    ],
                    reflection: [
                        'Tumbuhan apa saja di rumahmu?',
                        'Apa manfaat tumbuhan bagi kita?',
                    ],
                }),
                ipas_field: 'Makhluk Hidup & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar tumbuhan', 'Kertas', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi lagu tentang tumbuhan.',
                    apperception: 'Guru bertanya: "Tumbuhan apa di sekitar rumahmu?"',
                    trigger_question: 'Tumbuhan apa saja yang ada di sekitarmu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tumbuhan di sekitar rumah beraneka ragam: pohon, semak, rumput.',
                    concrete_steps: [
                        'Guru menjelaskan jenis tumbuhan.',
                        'Siswa menyebutkan tumbuhan yang dikenal.',
                        'Diskusi ciri tumbuhan.',
                        'Siswa mengamati gambar.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Setiap tumbuhan punya ciri khas. Yuk, kenali tumbuhan di sekitarmu!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Tumbuhan',
                    game_rules: [
                        'Guru menyebutkan ciri tumbuhan.',
                        'Siswa menebak nama tumbuhan.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan manfaat.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal tumbuhan sekitar.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: TUMBUHAN DI SEKITAR RUMAHKU',
                        instructions: 'Centang ✓ tumbuhan yang ada di sekitar rumahmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question: 'Centang ✓ tumbuhan yang ada di sekitar rumahmu!',
                                data: {
                                    rules: [
                                        { name: 'Pohon Mangga', icon: '🥭', description: 'Pohon buah' },
                                        { name: 'Pohon Pisang', icon: '🍌', description: 'Pohon buah' },
                                        { name: 'Bunga Mawar', icon: '🌹', description: 'Tanaman hias' },
                                        { name: 'Rumput', icon: '🌿', description: 'Tumbuhan kecil' },
                                        { name: 'Kaktus', icon: '🌵', description: 'Tanaman hias' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang tumbuhan yang ada.',
                                explanation: 'Mengenal lingkungan.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah tumbuhan yang ada di rumahmu!',
                                data: {
                                    prompt: 'Tumbuhan di rumahku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Tumbuhan di rumahku:',
                                },
                                answer_key: 'Siswa menggambar tumbuhan.',
                                explanation: 'Melatih pengamatan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu melihat tumbuhan hijau?',
                                data: {
                                    question: 'Bagaimana perasaanmu melihat tumbuhan hijau?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Segar' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih apresiasi alam.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Tumbuhan apa saja di rumahmu?',
                        'Apa manfaat tumbuhan?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 4.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 12: Merawat Tumbuhan',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menjelaskan & mempraktikkan cara merawat tumbuhan dengan baik.',
                content_text: buildContentText({
                    title: 'Pertemuan 12: Merawat Tumbuhan',
                    field: 'Makhluk Hidup & Lingkungannya',
                    objectives: [
                        'Menjelaskan cara merawat tumbuhan',
                        'Mempraktikkan menyiram & memberi pupuk',
                        'Menumbuhkan rasa cinta pada tumbuhan',
                    ],
                    subMaterial:
                        'Merawat tumbuhan dengan **menyiram, memberi pupuk, mencabut gulma, dan memberi sinar matahari**. Tumbuhan sehat = lingkungan sehat.',
                    cpHolistic: {
                        makhlukHidup: 'Merawat tumbuhan.',
                        zat: 'Air & pupuk untuk tumbuhan.',
                        energi: 'Matahari untuk fotosintesis.',
                        bumi: 'Tanah tempat tumbuh.',
                        manusia: 'Menumbuhkan cinta lingkungan.',
                    },
                    triggerQuestion:
                        'Bagaimana cara merawat tumbuhan?',
                    activities: {
                        mindful:
                            'Guru menjelaskan cara merawat tumbuhan. Siswa berbagi pengalaman merawat tanaman.',
                        joyful:
                            'Praktik menyiram tanaman bersama. Siswa memeragakan cara merawat.',
                        meaningful:
                            'Membuat jadwal merawat tanaman.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Tanaman pot', 'Air', 'LKPD'],
                    karakter: [
                        'Kewargaan (cinta lingkungan)',
                        'Kemandirian (merawat)',
                        'Kolaborasi (gotong royong)',
                    ],
                    parentTips: [
                        'Ajak anak menyiram tanaman setiap hari',
                        'Beri tanggung jawab merawat tanaman',
                        'Ceritakan pentingnya tumbuhan',
                        'Beri apresiasi saat anak merawat dengan baik',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak lupa menyiram',
                            solution: 'buat jadwal visual, ingatkan dengan lagu',
                        },
                        {
                            issue: 'Anak menyiram berlebihan',
                            solution: 'ajarkan takaran yang tepat',
                        },
                    ],
                    extensions: [
                        'Menanam biji kacang hijau',
                        'Bikin pot hias dari botol bekas',
                        'Foto pertumbuhan tanaman',
                    ],
                    appreciationStage:
                        'Rayakan tanaman yang tumbuh subur. Beri stiker.',
                    journal: [
                        'Hari 1: Siram tanaman',
                        'Hari 2: Beri sinar matahari',
                        'Hari 3: Cabut gulma',
                        'Hari 4: Beri pupuk',
                        'Hari 5: Amati pertumbuhan',
                    ],
                    reflection: [
                        'Bagaimana cara merawat tumbuhan?',
                        'Mengapa penting merawat tumbuhan?',
                    ],
                }),
                ipas_field: 'Makhluk Hidup & Lingkungannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Tanaman pot', 'Air', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi lagu "Lihat Kebunku".',
                    apperception: 'Guru bertanya: "Siapa yang punya tanaman di rumah?"',
                    trigger_question: 'Bagaimana cara merawat tumbuhan?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tumbuhan perlu dirawat dengan air, pupuk, dan sinar matahari.',
                    concrete_steps: [
                        'Guru menjelaskan cara merawat tumbuhan.',
                        'Siswa berbagi pengalaman.',
                        'Siswa praktik menyiram tanaman.',
                        'Diskusi manfaat merawat tumbuhan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Tumbuhan juga butuh kasih sayang. Rawat dengan baik agar tumbuh subur!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Aku Bisa Merawat Tumbuhan',
                    game_rules: [
                        'Guru menyebutkan aktivitas merawat.',
                        'Siswa memeragakan gerakannya.',
                        'Yang paling semangat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memeragakan dengan bantuan.',
                        child_level_advanced: 'Menjelaskan langkah lengkap.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membuat jadwal merawat tanaman.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.3: MERAWAT TUMBUHAN',
                        instructions:
                            'Centang ✓ kegiatan merawat tumbuhan yang sudah kamu lakukan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan merawat tumbuhan yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Menyiram', icon: '💧', description: 'Setiap pagi & sore' },
                                        { name: 'Beri pupuk', icon: '🌱', description: 'Setiap 2 minggu' },
                                        { name: 'Cabut gulma', icon: '🌿', description: 'Rumput liar di sekitar' },
                                        { name: 'Jemur matahari', icon: '☀️', description: 'Taruh di tempat terang' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan.',
                                explanation: 'Melatih tanggung jawab.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang menyiram tanaman!',
                                data: {
                                    prompt: 'Aku menyiram tanaman',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku menyiram tanaman:',
                                },
                                answer_key: 'Siswa menggambar aktivitas menyiram.',
                                explanation: 'Melatih cinta tumbuhan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah merawat tumbuhan?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah merawat tumbuhan?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bangga' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Bisa' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara merawat tumbuhan?',
                        'Mengapa penting merawat tumbuhan?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 4.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 4: Tumbuhan di Sekitarku',
                        quiz_questions: [
                            {
                                question_text: 'Bagian tumbuhan yang menyerap air adalah...',
                                option_a: 'Daun',
                                option_b: 'Batang',
                                option_c: 'Akar',
                                option_d: 'Bunga',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Bagian tumbuhan yang membuat makanan adalah...',
                                option_a: 'Akar',
                                option_b: 'Daun',
                                option_c: 'Batang',
                                option_d: 'Buah',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Cara merawat tumbuhan antara lain...',
                                option_a: 'Disiram setiap hari',
                                option_b: 'Dibiarkan kering',
                                option_c: 'Diletakkan di tempat gelap',
                                option_d: 'Dicabut',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Bagian tumbuhan yang menopang tumbuhan adalah...',
                                option_a: 'Akar',
                                option_b: 'Batang',
                                option_c: 'Daun',
                                option_d: 'Bunga',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 5: CUACA DAN MUSIM (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 5,
        title: 'Bab 5 Cuaca dan Musim',
        ipas_field: 'Bumi & Alam Semesta',
        target_semester: 2,
        week_target: 13,
        lessons: [
            {
                title: 'Pertemuan 13: Cuaca di Sekitarku',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal jenis-jenis cuaca (cerah, berawan, hujan) dan ciri-cirinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 13: Cuaca di Sekitarku',
                    field: 'Bumi & Alam Semesta',
                    objectives: [
                        'Menyebutkan jenis-jenis cuaca',
                        'Mengamati & menyebutkan ciri cuaca',
                        'Menyesuaikan aktivitas dengan cuaca',
                    ],
                    subMaterial:
                        'Cuaca di Indonesia: **cerah, berawan, hujan, berangin**. Cuaca berbeda setiap hari. Kita perlu menyesuaikan aktivitas dengan cuaca.',
                    cpHolistic: {
                        makhlukHidup: 'Cuaca mempengaruhi makhluk hidup.',
                        zat: 'Air hujan.',
                        energi: 'Matahari & angin.',
                        bumi: 'Cuaca bagian dari bumi.',
                        manusia: 'Menyesuaikan dengan cuaca.',
                    },
                    triggerQuestion:
                        'Bagaimana cuaca hari ini? Bagaimana cuaca kemarin?',
                    activities: {
                        mindful:
                            'Guru menjelaskan jenis cuaca. Siswa mengamati cuaca hari ini.',
                        joyful:
                            'Permainan "Tebak Cuaca" — guru menunjukkan gambar cuaca, siswa menebak.',
                        meaningful:
                            'Membuat jurnal cuaca seminggu.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar cuaca', 'Kertas', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (mengamati)',
                        'Kesehatan (menyesuaikan pakaian)',
                        'Kewargaan (menghargai alam)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati cuaca setiap hari',
                        'Sebutkan jenis cuaca saat melihat langit',
                        'Beri apresiasi saat anak bisa menyebutkan',
                        'Ajarkan menyesuaikan pakaian',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan cuaca',
                            solution: 'gunakan gambar besar & warna, tunjukkan langsung',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan aktivitas favorit (main hujan)',
                        },
                    ],
                    extensions: [
                        'Bikin jurnal cuaca mingguan',
                        'Membuat alat penanda cuaca sederhana',
                        'Foto langit setiap hari',
                    ],
                    appreciationStage:
                        'Pajang jurnal cuaca anak.',
                    journal: [
                        'Hari 1: Amati langit',
                        'Hari 2: Sebutkan cuaca',
                        'Hari 3: Catat cuaca',
                        'Hari 4: Amati cuaca berbeda',
                        'Hari 5: Cerita tentang cuaca',
                    ],
                    reflection: [
                        'Apa saja jenis cuaca?',
                        'Bagaimana cuaca hari ini?',
                    ],
                }),
                ipas_field: 'Bumi & Alam Semesta',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar cuaca', 'Kertas', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Hujan Rintik-Rintik".',
                    apperception: 'Guru bertanya: "Bagaimana cuaca hari ini?"',
                    trigger_question: 'Bagaimana cuaca hari ini?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Cuaca di Indonesia ada cerah, berawan, hujan, berangin.',
                    concrete_steps: [
                        'Guru menjelaskan jenis cuaca.',
                        'Siswa mengamati cuaca hari ini.',
                        'Guru menunjukkan gambar setiap cuaca.',
                        'Diskusi aktivitas sesuai cuaca.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Cuaca di Indonesia berbeda-beda. Cerah untuk bermain, hujan untuk bawa payung."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Cuaca',
                    game_rules: [
                        'Guru menunjukkan gambar cuaca.',
                        'Siswa menebak jenis cuaca.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan aktivitas sesuai cuaca.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencatat cuaca & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.1: CUACA DI SEKITARKU',
                        instructions:
                            'Jodohkan gambar cuaca dengan ciri-cirinya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan cuaca dengan cirinya!',
                                data: {
                                    pairs: [
                                        { left: '☀️ Cerah', right: 'Matahari terang' },
                                        { left: '☁️ Berawan', right: 'Langit gelap' },
                                        { left: '🌧️ Hujan', right: 'Air turun dari langit' },
                                        { left: '💨 Berangin', right: 'Daun bergoyang' },
                                    ],
                                },
                                answer_key: 'Cerah→matahari, Berawan→gelap, Hujan→air, Berangin→daun.',
                                explanation: 'Mengenal jenis cuaca.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah cuaca hari ini!',
                                data: {
                                    prompt: 'Cuaca hari ini',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Cuaca hari ini:',
                                },
                                answer_key: 'Siswa menggambar cuaca hari ini.',
                                explanation: 'Melatih pengamatan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu saat cuaca cerah?',
                                data: {
                                    question: 'Bagaimana perasaanmu saat cuaca cerah?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Ceria' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Kurang Nyaman' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja jenis cuaca?',
                        'Bagaimana cuaca hari ini?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 5.1 tentang cuaca, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 14: Musim di Indonesia',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal musim hujan & kemarau di Indonesia serta ciri-cirinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 14: Musim di Indonesia',
                    field: 'Bumi & Alam Semesta',
                    objectives: [
                        'Mengenal musim hujan & kemarau',
                        'Menyebutkan ciri-ciri musim',
                        'Menyesuaikan aktivitas dengan musim',
                    ],
                    subMaterial:
                        'Indonesia memiliki **musim hujan & musim kemarau**. Musim hujan: sering hujan. Musim kemarau: panas & kering.',
                    cpHolistic: {
                        makhlukHidup: 'Musim mempengaruhi makhluk hidup.',
                        zat: 'Air di musim hujan.',
                        energi: 'Matahari di musim kemarau.',
                        bumi: 'Musim bagian dari bumi.',
                        manusia: 'Menyesuaikan dengan musim.',
                    },
                    triggerQuestion:
                        'Apa bedanya musim hujan & musim kemarau?',
                    activities: {
                        mindful:
                            'Guru menjelaskan musim di Indonesia. Siswa menyebutkan ciri musim.',
                        joyful:
                            'Permainan "Tebak Musim" — guru menunjukkan gambar, siswa menebak musim.',
                        meaningful:
                            'Menggambar aktivitas di musim hujan & kemarau.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar musim', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (mengamati)',
                        'Kesehatan (pakaian sesuai musim)',
                        'Kewargaan (menghargai alam)',
                    ],
                    parentTips: [
                        'Ceritakan perbedaan musim di Indonesia',
                        'Ajak anak mengamati ciri musim',
                        'Beri apresiasi saat anak bisa membedakan',
                        'Ajarkan menyesuaikan pakaian',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan musim',
                            solution: 'gunakan gambar besar & cerita',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan aktivitas favorit',
                        },
                    ],
                    extensions: [
                        'Bikin kalender musim',
                        'Foto musim hujan & kemarau',
                        'Cerita pengalaman musim',
                    ],
                    appreciationStage: 'Pajang gambar musim anak.',
                    journal: [
                        'Hari 1: Sebutkan musim',
                        'Hari 2: Ciri musim hujan',
                        'Hari 3: Ciri musim kemarau',
                        'Hari 4: Aktivitas sesuai musim',
                        'Hari 5: Gambar musim',
                    ],
                    reflection: [
                        'Apa bedanya musim hujan & kemarau?',
                        'Musim apa yang kamu sukai?',
                    ],
                }),
                ipas_field: 'Bumi & Alam Semesta',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar musim', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu musim.',
                    apperception: 'Guru bertanya: "Musim apa sekarang?"',
                    trigger_question: 'Apa bedanya musim hujan & kemarau?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Indonesia punya musim hujan & kemarau dengan ciri berbeda.',
                    concrete_steps: [
                        'Guru menjelaskan musim di Indonesia.',
                        'Siswa menyebutkan ciri setiap musim.',
                        'Diskusi aktivitas sesuai musim.',
                        'Siswa mengamati gambar.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Musim hujan bawa payung, musim kemarau bawa topi. Sesuaikan dengan musim ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Musim',
                    game_rules: [
                        'Guru menunjukkan gambar musim.',
                        'Siswa menebak nama musim.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan aktivitas sesuai musim.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal musim & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.2: MUSIM DI INDONESIA',
                        instructions:
                            'Jodohkan musim dengan ciri-cirinya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan musim dengan cirinya!',
                                data: {
                                    pairs: [
                                        { left: '🌧️ Musim Hujan', right: 'Sering hujan' },
                                        { left: '☀️ Musim Kemarau', right: 'Panas & kering' },
                                        { left: '🌂 Musim Hujan', right: 'Bawa payung' },
                                        { left: '🧢 Musim Kemarau', right: 'Bawa topi' },
                                    ],
                                },
                                answer_key: 'Hujan→sering hujan, Kemarau→panas.',
                                explanation: 'Mengenal musim.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah aktivitasmu di musim hujan!',
                                data: {
                                    prompt: 'Musim hujan',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aktivitas di musim hujan:',
                                },
                                answer_key: 'Siswa menggambar aktivitas.',
                                explanation: 'Melatih imajinasi.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Musim apa yang paling kamu sukai?',
                                data: {
                                    question: 'Musim apa yang paling kamu sukai?',
                                    options: [
                                        { emoji: '🌧️', label: 'Musim Hujan' },
                                        { emoji: '☀️', label: 'Musim Kemarau' },
                                        { emoji: '😐', label: 'Dua-duanya Sama' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa bedanya musim hujan & kemarau?',
                        'Musim apa yang kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 5.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 15: Pakaian Sesuai Cuaca',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu memilih pakaian yang sesuai dengan cuaca.',
                content_text: buildContentText({
                    title: 'Pertemuan 15: Pakaian Sesuai Cuaca',
                    field: 'Bumi & Alam Semesta',
                    objectives: [
                        'Mengenal pakaian sesuai cuaca',
                        'Memilih pakaian yang tepat',
                        'Menyesuaikan diri dengan cuaca',
                    ],
                    subMaterial:
                        'Cuaca menentukan pakaian: **cerah** → baju tipis, **hujan** → jaket & payung, **dingin** → baju hangat.',
                    cpHolistic: {
                        makhlukHidup: 'Menyesuaikan pakaian.',
                        zat: 'Bahan kain.',
                        energi: 'Matahari & hujan.',
                        bumi: 'Cuaca mempengaruhi.',
                        manusia: 'Menyesuaikan pakaian.',
                    },
                    triggerQuestion:
                        'Pakaian apa yang kamu pakai saat hujan?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pakaian sesuai cuaca. Siswa menyebutkan pakaian yang tepat.',
                        joyful:
                            'Permainan "Pilih Pakaian" — guru menunjukkan cuaca, siswa memilih pakaian.',
                        meaningful:
                            'Menggambar dirimu dengan pakaian sesuai cuaca.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar pakaian', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (memilih)',
                        'Kesehatan (pakaian tepat)',
                        'Kemandirian (memilih sendiri)',
                    ],
                    parentTips: [
                        'Ajak anak memilih pakaian sendiri',
                        'Ceritakan pakaian sesuai cuaca',
                        'Beri apresiasi saat anak bisa memilih',
                        'Biasakan siapkan payung saat hujan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak salah pilih pakaian',
                            solution: 'beri contoh & diskusi, tunjukkan akibatnya',
                        },
                        {
                            issue: 'Anak tidak mau ganti pakaian',
                            solution: 'jelaskan pentingnya sesuai cuaca',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Pakaian Sesuai Cuaca"',
                        'Menata lemari pakaian bersama',
                        'Foto pakaian sesuai cuaca',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa memilih pakaian sendiri.',
                    journal: [
                        'Hari 1: Pilih pakaian sendiri',
                        'Hari 2: Pilih pakaian saat hujan',
                        'Hari 3: Pilih pakaian saat cerah',
                        'Hari 4: Siapkan payung',
                        'Hari 5: Rapikan pakaian',
                    ],
                    reflection: [
                        'Pakaian apa yang kamu pakai saat hujan?',
                        'Mengapa harus sesuai cuaca?',
                    ],
                }),
                ipas_field: 'Bumi & Alam Semesta',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar pakaian', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu tentang pakaian.',
                    apperception: 'Guru bertanya: "Pakaian apa yang cocok saat hujan?"',
                    trigger_question: 'Pakaian apa yang cocok saat hujan?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Pakaian harus sesuai cuaca agar nyaman & sehat.',
                    concrete_steps: [
                        'Guru menjelaskan pakaian sesuai cuaca.',
                        'Siswa menyebutkan pakaian yang tepat.',
                        'Diskusi pakaian setiap cuaca.',
                        'Siswa memilih pakaian.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Pakaian yang tepat bikin kita nyaman & sehat. Sesuaikan dengan cuaca!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Pilih Pakaian',
                    game_rules: [
                        'Guru menunjukkan cuaca.',
                        'Siswa memilih pakaian yang tepat.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memilih dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan alasan pilihan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Memilih pakaian & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.3: PAKAIAN SESUAI CUACA',
                        instructions:
                            'Jodohkan cuaca dengan pakaian yang tepat!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan cuaca dengan pakaian yang tepat!',
                                data: {
                                    pairs: [
                                        { left: '☀️ Cerah', right: '👕 Baju tipis' },
                                        { left: '🌧️ Hujan', right: '🧥 Jaket & payung' },
                                        { left: '❄️ Dingin', right: '🧣 Baju hangat' },
                                        { left: '💨 Berangin', right: '🧢 Topi' },
                                    ],
                                },
                                answer_key: 'Cerah→tipis, Hujan→jaket, Dingin→hangat.',
                                explanation: 'Mengenal pakaian sesuai cuaca.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu dengan pakaian yang cocok untuk cuaca hujan!',
                                data: {
                                    prompt: 'Pakaian musim hujan',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Pakaianku saat hujan:',
                                },
                                answer_key: 'Siswa menggambar pakaian hujan.',
                                explanation: 'Melatih pemahaman.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu memakai pakaian yang tepat?',
                                data: {
                                    question: 'Bagaimana perasaanmu memakai pakaian yang tepat?',
                                    options: [
                                        { emoji: '😊', label: 'Nyaman & Senang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Bisa' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Pakaian apa yang cocok saat hujan?',
                        'Mengapa harus sesuai cuaca?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Rekam suaramu menyebutkan pakaian yang cocok untuk cuaca hujan & cerah!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 5: Cuaca dan Musim',
                        quiz_questions: [
                            {
                                question_text: 'Cuaca saat matahari bersinar terang disebut...',
                                option_a: 'Hujan',
                                option_b: 'Cerah',
                                option_c: 'Berawan',
                                option_d: 'Berkabut',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Indonesia memiliki 2 musim yaitu...',
                                option_a: 'Panas & dingin',
                                option_b: 'Hujan & kemarau',
                                option_c: 'Salju & gugur',
                                option_d: 'Semi & panas',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Saat hujan, sebaiknya kita membawa...',
                                option_a: 'Kipas',
                                option_b: 'Payung',
                                option_c: 'Topi',
                                option_d: 'Kacamata',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Pakaian yang cocok saat cuaca cerah adalah...',
                                option_a: 'Baju hangat',
                                option_b: 'Jas hujan',
                                option_c: 'Baju tipis',
                                option_d: 'Selimut',
                                correct_answer: 'C',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 6: BENDA DI SEKITARKU (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 6,
        title: 'Bab 6 Benda di Sekitarku',
        ipas_field: 'Zat & Perubahannya',
        target_semester: 2,
        week_target: 16,
        lessons: [
            {
                title: 'Pertemuan 16: Wujud Benda (Padat, Cair, Gas)',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal 3 wujud benda (padat, cair, gas) dan ciri-cirinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 16: Wujud Benda (Padat, Cair, Gas)',
                    field: 'Zat & Perubahannya',
                    objectives: [
                        'Mengenal 3 wujud benda',
                        'Menyebutkan ciri setiap wujud',
                        'Mengelompokkan benda berdasarkan wujud',
                    ],
                    subMaterial:
                        'Benda memiliki 3 wujud: **padat** (batu, buku), **cair** (air, susu), **gas** (udara). Padat bentuknya tetap, cair mengikuti wadah, gas tidak terlihat.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Mengenal wujud benda.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Benda di bumi.',
                        manusia: 'Menggunakan benda sehari-hari.',
                    },
                    triggerQuestion:
                        'Benda apa saja yang kalian lihat? Ada berapa wujudnya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan 3 wujud benda. Siswa mengamati benda nyata.',
                        joyful:
                            'Permainan "Kelompokkan Benda" — siswa mengelompokkan benda berdasarkan wujud.',
                        meaningful:
                            'Siswa membuat tabel wujud benda.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Benda berbagai wujud (batu, air, balon)', 'Kertas', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (mengelompokkan)',
                        'Kewargaan (mengenal benda)',
                        'Kolaborasi (bekerja sama)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati benda di rumah',
                        'Sebutkan wujud setiap benda',
                        'Beri apresiasi saat anak bisa mengelompokkan',
                        'Ceritakan manfaat benda',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan wujud',
                            solution: 'gunakan benda nyata, tunjukkan ciri khusus',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan benda favorit anak',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Benda di Rumahku"',
                        'Eksperimen sederhana wujud benda',
                        'Amati perubahan wujud es',
                    ],
                    appreciationStage: 'Pajang tabel wujud benda anak.',
                    journal: [
                        'Hari 1: Amati benda padat',
                        'Hari 2: Amati benda cair',
                        'Hari 3: Amati benda gas',
                        'Hari 4: Kelompokkan benda',
                        'Hari 5: Cerita benda',
                    ],
                    reflection: [
                        'Ada berapa wujud benda?',
                        'Apa bedanya padat & cair?',
                    ],
                }),
                ipas_field: 'Zat & Perubahannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Benda berbagai wujud', 'Kertas', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu tentang benda.',
                    apperception: 'Guru bertanya: "Benda apa yang kalian pegang sekarang?"',
                    trigger_question: 'Ada berapa wujud benda?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Benda punya 3 wujud: padat, cair, gas.',
                    concrete_steps: [
                        'Guru menjelaskan 3 wujud benda.',
                        'Siswa mengamati benda nyata.',
                        'Guru menunjukkan ciri setiap wujud.',
                        'Diskusi benda sehari-hari.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Padat itu keras & tetap. Cair mengikuti wadah. Gas tidak terlihat tapi ada."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Kelompokkan Benda',
                    game_rules: [
                        'Guru menunjukkan benda.',
                        'Siswa menebak wujud benda.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan ciri wujud.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengelompokkan benda & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.1: WUJUD BENDA',
                        instructions: 'Jodohkan benda dengan wujudnya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan benda dengan wujudnya!',
                                data: {
                                    pairs: [
                                        { left: '🪨 Batu', right: 'Padat' },
                                        { left: '💧 Air', right: 'Cair' },
                                        { left: '💨 Udara', right: 'Gas' },
                                        { left: '📚 Buku', right: 'Padat' },
                                    ],
                                },
                                answer_key: 'Batu→padat, Air→cair, Udara→gas, Buku→padat.',
                                explanation: 'Mengenal wujud benda.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah 3 benda dengan wujud berbeda!',
                                data: {
                                    prompt: 'Benda 3 wujud',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Benda 3 wujud:',
                                },
                                answer_key: 'Siswa menggambar 3 benda.',
                                explanation: 'Melatih pemahaman.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu belajar tentang benda?',
                                data: {
                                    question: 'Bagaimana perasaanmu belajar tentang benda?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Penasaran' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Ada berapa wujud benda?',
                        'Apa bedanya padat & cair?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 6.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 17: Sifat Benda',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal sifat-sifat benda (keras, lunak, halus, kasar).',
                content_text: buildContentText({
                    title: 'Pertemuan 17: Sifat Benda',
                    field: 'Zat & Perubahannya',
                    objectives: [
                        'Menyebutkan sifat benda (keras, lunak, halus, kasar)',
                        'Mengelompokkan benda berdasarkan sifat',
                        'Mengamati sifat benda dengan indra peraba',
                    ],
                    subMaterial:
                        'Benda memiliki **sifat berbeda**: keras (batu), lunak (kapas), halus (kaca), kasar (kulit jeruk). Sifat dirasakan dengan indra peraba.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Mengenal sifat benda.',
                        energi: 'Belum diperkenalkan.',
                        bumi: 'Benda di bumi.',
                        manusia: 'Menggunakan benda sehari-hari.',
                    },
                    triggerQuestion:
                        'Bagaimana rasanya menyentuh batu? Bagaimana rasanya menyentuh kapas?',
                    activities: {
                        mindful:
                            'Guru menjelaskan sifat benda. Siswa meraba benda & menyebutkan sifatnya.',
                        joyful:
                            'Permainan "Tebak Sifat!" — siswa menutup mata, meraba benda, menebak sifatnya.',
                        meaningful:
                            'Siswa membuat tabel sifat benda.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Benda berbagai sifat (kapas, batu, kain)', 'Kotak tertutup', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (mengamati)',
                        'Kewargaan (mengenal benda)',
                        'Komunikasi (menjelaskan)',
                    ],
                    parentTips: [
                        'Ajak anak meraba benda di rumah',
                        'Sebutkan sifat benda',
                        'Beri apresiasi saat anak bisa menyebutkan',
                        'Ceritakan manfaat benda',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan sifat',
                            solution: 'gunakan benda nyata, bandingkan langsung',
                        },
                        {
                            issue: 'Anak tidak mau meraba',
                            solution: 'beri contoh dulu, mulai dari benda familiar',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Benda & Sifatnya"',
                        'Eksperimen sederhana',
                        'Amati benda sehari-hari',
                    ],
                    appreciationStage:
                        'Pajang buku sifat benda anak.',
                    journal: [
                        'Hari 1: Raba benda keras',
                        'Hari 2: Raba benda lunak',
                        'Hari 3: Raba benda halus',
                        'Hari 4: Raba benda kasar',
                        'Hari 5: Cerita benda',
                    ],
                    reflection: [
                        'Apa saja sifat benda?',
                        'Benda apa yang paling kamu sukai?',
                    ],
                }),
                ipas_field: 'Zat & Perubahannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Benda berbagai sifat', 'Kotak tertutup', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu tentang benda.',
                    apperception: 'Guru bertanya: "Benda apa yang keras? Lembut?"',
                    trigger_question: 'Bagaimana rasanya menyentuh batu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Benda punya sifat berbeda: keras, lunak, halus, kasar.',
                    concrete_steps: [
                        'Guru menjelaskan sifat benda.',
                        'Siswa meraba benda.',
                        'Guru menunjukkan ciri setiap sifat.',
                        'Diskusi sifat benda sehari-hari.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Setiap benda punya sifat berbeda. Yuk, kenali dengan indra peraba!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Sifat Benda!',
                    game_rules: [
                        'Guru menutup mata siswa.',
                        'Siswa meraba benda & menebak sifatnya.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan benda & sifatnya.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal sifat benda & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.2: SIFAT BENDA',
                        instructions:
                            'Jodohkan benda dengan sifatnya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan benda dengan sifatnya!',
                                data: {
                                    pairs: [
                                        { left: '🪨 Batu', right: 'Keras' },
                                        { left: '☁️ Kapas', right: 'Lunak' },
                                        { left: '🪟 Kaca', right: 'Halus' },
                                        { left: '🍊 Kulit jeruk', right: 'Kasar' },
                                    ],
                                },
                                answer_key: 'Batu→keras, Kapas→lunak, Kaca→halus.',
                                explanation: 'Mengenal sifat benda.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah 2 benda yang keras & 2 benda yang lunak!',
                                data: {
                                    prompt: 'Benda keras & lunak',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Benda keras & lunak:',
                                },
                                answer_key: 'Siswa menggambar.',
                                explanation: 'Melatih pengamatan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu belajar sifat benda?',
                                data: {
                                    question: 'Bagaimana perasaanmu belajar sifat benda?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Tertarik' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja sifat benda?',
                        'Benda apa yang paling kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 6.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 18: Perubahan Wujud Benda',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu mengamati perubahan wujud benda (membeku, mencair, menguap).',
                content_text: buildContentText({
                    title: 'Pertemuan 18: Perubahan Wujud Benda',
                    field: 'Zat & Perubahannya',
                    objectives: [
                        'Mengenal perubahan wujud benda',
                        'Mengamati contoh perubahan wujud',
                        'Memahami perubahan wujud di kehidupan sehari-hari',
                    ],
                    subMaterial:
                        'Benda dapat berubah wujud: **membeku** (air→es), **mencair** (es→air), **menguap** (air→uap). Perubahan karena suhu.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Mengenal perubahan wujud benda.',
                        energi: 'Suhu mempengaruhi perubahan.',
                        bumi: 'Perubahan wujud di alam.',
                        manusia: 'Menggunakan perubahan wujud.',
                    },
                    triggerQuestion:
                        'Apa yang terjadi pada es saat diletakkan di tempat panas?',
                    activities: {
                        mindful:
                            'Guru menjelaskan perubahan wujud. Siswa mengamati es mencair.',
                        joyful:
                            'Eksperimen sederhana: es mencair, air menguap.',
                        meaningful:
                            'Mencatat hasil eksperimen & refleksi.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Es batu', 'Air panas', 'Gelas', 'LKPD'],
                    karakter: [
                        'Penalaran Kritis (mengamati)',
                        'Kreativitas (eksperimen)',
                        'Kolaborasi (bekerja sama)',
                    ],
                    parentTips: [
                        'Ajak anak eksperimen sederhana di rumah',
                        'Ceritakan perubahan wujud sehari-hari',
                        'Beri apresiasi saat anak bisa menjelaskan',
                        'Amati es mencair bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan perubahan',
                            solution: 'gunakan eksperimen nyata, tunjukkan proses',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan es krim atau minuman dingin',
                        },
                    ],
                    extensions: [
                        'Eksperimen es mencair & air menguap',
                        'Bikin es krim sederhana',
                        'Amati hujan sebagai perubahan wujud',
                    ],
                    appreciationStage:
                        'Rayakan eksperimen anak. Pajang hasil di rumah.',
                    journal: [
                        'Hari 1: Amati es mencair',
                        'Hari 2: Amati air menguap',
                        'Hari 3: Amati air membeku',
                        'Hari 4: Catat perubahan',
                        'Hari 5: Cerita',
                    ],
                    reflection: [
                        'Apa itu mencair?',
                        'Apa itu menguap?',
                    ],
                }),
                ipas_field: 'Zat & Perubahannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Es batu', 'Air panas', 'Gelas', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu tentang es.',
                    apperception: 'Guru bertanya: "Apa yang terjadi pada es di bawah matahari?"',
                    trigger_question: 'Apa yang terjadi pada es di tempat panas?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Benda dapat berubah wujud karena suhu panas/dingin.',
                    concrete_steps: [
                        'Guru menjelaskan perubahan wujud.',
                        'Siswa mengamati es mencair.',
                        'Guru menjelaskan menguap & membeku.',
                        'Diskusi contoh sehari-hari.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Es mencair jadi air karena panas. Air menguap jadi uap karena panas juga. Ajaib ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Eksperimen Es Mencair',
                    game_rules: [
                        'Guru menyiapkan es batu.',
                        'Siswa mengamati es mencair.',
                        'Siswa mencatat waktu mencair.',
                        'Diskusi hasil pengamatan.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengamati dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan proses perubahan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencatat eksperimen & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.3: PERUBAHAN WUJUD BENDA',
                        instructions:
                            'Jodohkan perubahan wujud dengan contohnya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan perubahan wujud dengan contohnya!',
                                data: {
                                    pairs: [
                                        { left: '❄️ Membeku', right: 'Air → Es' },
                                        { left: '💧 Mencair', right: 'Es → Air' },
                                        { left: '☁️ Menguap', right: 'Air → Uap' },
                                        { left: '🌧️ Mengembun', right: 'Uap → Air' },
                                    ],
                                },
                                answer_key: 'Membeku→air jadi es, Mencair→es jadi air.',
                                explanation: 'Mengenal perubahan wujud.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah proses es mencair!',
                                data: {
                                    prompt: 'Es mencair',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Es mencair:',
                                },
                                answer_key: 'Siswa menggambar es mencair.',
                                explanation: 'Melatih pemahaman.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah eksperimen?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah eksperimen?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Kagum' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa itu mencair?',
                        'Apa itu menguap?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 6.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 6: Benda di Sekitarku',
                        quiz_questions: [
                            {
                                question_text: 'Benda yang berwujud padat adalah...',
                                option_a: 'Air',
                                option_b: 'Udara',
                                option_c: 'Batu',
                                option_d: 'Susu',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Air yang dimasukkan ke freezer akan...',
                                option_a: 'Mencair',
                                option_b: 'Membeku',
                                option_c: 'Menguap',
                                option_d: 'Hilang',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Benda yang bersifat lunak adalah...',
                                option_a: 'Batu',
                                option_b: 'Besi',
                                option_c: 'Kapas',
                                option_d: 'Kayu',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Es mencair karena...',
                                option_a: 'Suhu panas',
                                option_b: 'Suhu dingin',
                                option_c: 'Suhu beku',
                                option_d: 'Angin',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 7: SUMBER ENERGI DI RUMAH (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 7,
        title: 'Bab 7 Sumber Energi di Rumah',
        ipas_field: 'Energi & Perubahannya',
        target_semester: 2,
        week_target: 19,
        lessons: [
            {
                title: 'Pertemuan 19: Sumber Energi Matahari & Air',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal sumber energi matahari & air serta manfaatnya.',
                content_text: buildContentText({
                    title: 'Pertemuan 19: Sumber Energi Matahari & Air',
                    field: 'Energi & Perubahannya',
                    objectives: [
                        'Mengenal sumber energi matahari',
                        'Mengenal sumber energi air',
                        'Menyebutkan manfaat energi matahari & air',
                    ],
                    subMaterial:
                        'Matahari & air adalah **sumber energi** untuk kehidupan. Matahari memberi cahaya & panas. Air memberi kehidupan & bisa menjadi listrik.',
                    cpHolistic: {
                        makhlukHidup: 'Matahari & air untuk makhluk hidup.',
                        zat: 'Air sebagai zat penting.',
                        energi: 'Mengenal sumber energi matahari & air.',
                        bumi: 'Matahari & air bagian bumi.',
                        manusia: 'Memanfaatkan energi.',
                    },
                    triggerQuestion:
                        'Apa manfaat matahari untuk kita? Apa manfaat air?',
                    activities: {
                        mindful:
                            'Guru menjelaskan sumber energi matahari & air. Siswa menyebutkan manfaatnya.',
                        joyful:
                            'Permainan "Tebak Manfaat" — guru menyebutkan aktivitas, siswa menebak sumber energinya.',
                        meaningful:
                            'Menggambar aktivitas yang memanfaatkan matahari & air.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar sumber energi', 'Kertas', 'LKrayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (syukur)',
                        'Penalaran Kritis (mengamati)',
                        'Kewargaan (cinta alam)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati matahari & air',
                        'Ceritakan manfaatnya',
                        'Beri apresiasi saat anak bisa menyebutkan',
                        'Biasakan hemat energi',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan sumber energi',
                            solution: 'gunakan gambar besar & contoh nyata',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan aktivitas favorit',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Sumber Energi"',
                        'Eksperimen sederhana dengan matahari',
                        'Amati manfaat air di rumah',
                    ],
                    appreciationStage: 'Pajang gambar sumber energi anak.',
                    journal: [
                        'Hari 1: Amati matahari',
                        'Hari 2: Sebutkan manfaat matahari',
                        'Hari 3: Amati air',
                        'Hari 4: Sebutkan manfaat air',
                        'Hari 5: Cerita',
                    ],
                    reflection: [
                        'Apa manfaat matahari?',
                        'Apa manfaat air?',
                    ],
                }),
                ipas_field: 'Energi & Perubahannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar sumber energi', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Matahari".',
                    apperception: 'Guru bertanya: "Apa manfaat matahari?"',
                    trigger_question: 'Apa manfaat matahari untuk kita?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Matahari & air adalah sumber energi penting untuk kehidupan.',
                    concrete_steps: [
                        'Guru menjelaskan sumber energi matahari.',
                        'Guru menjelaskan sumber energi air.',
                        'Siswa menyebutkan manfaatnya.',
                        'Diskusi penggunaan sehari-hari.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Matahari memberi cahaya & panas. Air memberi kehidupan. Keduanya karunia Tuhan!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Manfaat',
                    game_rules: [
                        'Guru menyebutkan aktivitas.',
                        'Siswa menebak sumber energi.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menjelaskan manfaat.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal sumber energi & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.1: SUMBER ENERGI MATAHARI & AIR',
                        instructions: 'Jodohkan aktivitas dengan sumber energinya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan aktivitas dengan sumber energinya!',
                                data: {
                                    pairs: [
                                        { left: '👕 Menjemur baju', right: 'Matahari' },
                                        { left: '💡 Panel surya', right: 'Matahari' },
                                        { left: '🚿 Mandi', right: 'Air' },
                                        { left: '🌾 Menyiram sawah', right: 'Air' },
                                    ],
                                },
                                answer_key: 'Jemur baju→matahari, Mandi→air.',
                                explanation: 'Mengenal manfaat sumber energi.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu memanfaatkan energi matahari!',
                                data: {
                                    prompt: 'Aku manfaatkan matahari',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku manfaatkan matahari:',
                                },
                                answer_key: 'Siswa menggambar.',
                                explanation: 'Melatih pemahaman.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah belajar sumber energi?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah belajar sumber energi?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bersyukur' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Paham' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih syukur.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa manfaat matahari?',
                        'Apa manfaat air?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 7.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 20: Listrik di Rumah',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal listrik sebagai sumber energi di rumah dan manfaatnya.',
                content_text: buildContentText({
                    title: 'Pertemuan 20: Listrik di Rumah',
                    field: 'Energi & Perubahannya',
                    objectives: [
                        'Mengenal listrik sebagai sumber energi',
                        'Menyebutkan benda yang menggunakan listrik',
                        'Menjelaskan pentingnya hemat listrik',
                    ],
                    subMaterial:
                        'Listrik adalah **sumber energi** untuk menyalakan lampu, TV, kulkas. Kita harus **hemat listrik** agar tidak boros.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Mengenal listrik.',
                        bumi: 'Listrik bagian teknologi.',
                        manusia: 'Menggunakan listrik hemat.',
                    },
                    triggerQuestion:
                        'Benda apa di rumahmu yang menggunakan listrik?',
                    activities: {
                        mindful:
                            'Guru menjelaskan listrik & manfaatnya. Siswa menyebutkan benda listrik.',
                        joyful:
                            'Permainan "Mati atau Nyala" — guru menyebutkan benda, siswa menebak pakai listrik/tidak.',
                        meaningful:
                            'Membuat poster "Hemat Listrik!"',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar benda listrik', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Kemandirian (hemat)',
                        'Kewargaan (tanggung jawab)',
                        'Kesehatan (hemat untuk keluarga)',
                    ],
                    parentTips: [
                        'Ajarkan hemat listrik di rumah',
                        'Matikan lampu saat tidak dipakai',
                        'Ceritakan manfaat listrik',
                        'Beri apresiasi saat anak hemat',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak boros listrik',
                            solution: 'beri contoh & pengingat',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan gadget favorit',
                        },
                    ],
                    extensions: [
                        'Bikin poster hemat listrik',
                        'Amati alat listrik rumah',
                        'Bikin buku "Listrik di Rumahku"',
                    ],
                    appreciationStage:
                        'Pajang poster hemat listrik.',
                    journal: [
                        'Hari 1: Matikan lampu',
                        'Hari 2: Matikan TV jika tidak ditonton',
                        'Hari 3: Cabut charger',
                        'Hari 4: Hemat AC',
                        'Hari 5: Cerita',
                    ],
                    reflection: [
                        'Benda apa yang menggunakan listrik?',
                        'Mengapa harus hemat listrik?',
                    ],
                }),
                ipas_field: 'Energi & Perubahannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar benda listrik', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu tentang listrik.',
                    apperception: 'Guru bertanya: "Apa yang menyalakan lampu?"',
                    trigger_question: 'Benda apa yang menggunakan listrik?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Listrik menyalakan banyak benda, kita harus hemat.',
                    concrete_steps: [
                        'Guru menjelaskan listrik.',
                        'Siswa menyebutkan benda listrik.',
                        'Guru menjelaskan cara hemat listrik.',
                        'Diskusi penggunaan listrik.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Listrik itu penting, tapi kita harus hemat. Matikan yang tidak dipakai!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Mati atau Nyala',
                    game_rules: [
                        'Guru menyebutkan benda.',
                        'Siswa menebak apakah pakai listrik/tidak.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan.',
                        child_level_advanced: 'Menjelaskan manfaat.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal listrik & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.2: LISTRIK DI RUMAH',
                        instructions:
                            'Centang ✓ benda listrik yang ada di rumahmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ benda listrik yang ada di rumahmu!',
                                data: {
                                    rules: [
                                        { name: 'Lampu', icon: '💡', description: 'Penerangan' },
                                        { name: 'TV', icon: '📺', description: 'Hiburan' },
                                        { name: 'Kulkas', icon: '🧊', description: 'Menyimpan makanan' },
                                        { name: 'Kipas', icon: '🌀', description: 'Pendingin' },
                                        { name: 'AC', icon: '❄️', description: 'Pendingin ruangan' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang benda listrik.',
                                explanation: 'Mengenal benda listrik.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah poster "Hemat Listrik!"',
                                data: {
                                    prompt: 'Poster hemat listrik',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Poster hemat listrik:',
                                },
                                answer_key: 'Siswa menggambar poster.',
                                explanation: 'Melatih kesadaran hemat.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu hemat listrik?',
                                data: {
                                    question: 'Bagaimana perasaanmu hemat listrik?',
                                    options: [
                                        { emoji: '😊', label: 'Bangga & Senang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Bisa' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Benda apa yang menggunakan listrik?',
                        'Mengapa harus hemat listrik?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 7.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 21: Hemat Energi',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menunjukkan sikap hemat energi dalam kehidupan sehari-hari.',
                content_text: buildContentText({
                    title: 'Pertemuan 21: Hemat Energi',
                    field: 'Energi & Perubahannya',
                    objectives: [
                        'Menjelaskan pentingnya hemat energi',
                        'Mempraktikkan hemat energi di rumah',
                        'Membiasakan hidup hemat',
                    ],
                    subMaterial:
                        'Hemat energi: **matikan lampu, cabut charger, jangan boros air, gunakan listrik seperlunya**. Hemat energi = sayang bumi.',
                    cpHolistic: {
                        makhlukHidup: 'Hemat energi untuk makhluk hidup.',
                        zat: 'Hemat air.',
                        energi: 'Hemat semua energi.',
                        bumi: 'Sayang bumi.',
                        manusia: 'Membiasakan hemat.',
                    },
                    triggerQuestion:
                        'Bagaimana cara kamu menghemat energi di rumah?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pentingnya hemat energi. Siswa berbagi cara hemat.',
                        joyful:
                            'Permainan peran "Hemat Energi!" — siswa memeragakan kebiasaan hemat.',
                        meaningful:
                            'Membuat jurnal hemat energi.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Kemandirian (hemat)',
                        'Kewargaan (cinta bumi)',
                        'Penalaran Kritis (memilih)',
                    ],
                    parentTips: [
                        'Beri contoh hemat energi',
                        'Ajak anak mematikan lampu',
                        'Ceritakan manfaat hemat energi',
                        'Beri apresiasi saat anak hemat',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak lupa mematikan',
                            solution: 'buat pengingat visual',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'kaitkan dengan bumi & masa depan',
                        },
                    ],
                    extensions: [
                        'Bikin jadwal hemat energi',
                        'Bikin poster "Hemat Energi"',
                        'Bikin video keluarga hemat energi',
                    ],
                    appreciationStage:
                        'Rayakan anak yang hemat energi. Beri stiker.',
                    journal: [
                        'Hari 1: Matikan lampu',
                        'Hari 2: Cabut charger',
                        'Hari 3: Hemat air',
                        'Hari 4: Matikan TV',
                        'Hari 5: Cerita',
                    ],
                    reflection: [
                        'Apa itu hemat energi?',
                        'Mengapa penting?',
                    ],
                }),
                ipas_field: 'Energi & Perubahannya',
                required_materials: ['Buku IPAS Kelas I SD', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Hemat Energi".',
                    apperception: 'Guru bertanya: "Bagaimana cara hemat listrik?"',
                    trigger_question: 'Bagaimana cara hemat energi di rumah?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Hemat energi = sayang bumi. Kita bisa mulai dari kebiasaan kecil.',
                    concrete_steps: [
                        'Guru menjelaskan hemat energi.',
                        'Siswa menyebutkan cara hemat.',
                        'Guru memberi contoh kebiasaan.',
                        'Diskusi manfaat hemat.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Matikan lampu yang tidak dipakai, cabut charger, hemat air. Hemat energi = sayang bumi!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Hemat Energi!',
                    game_rules: [
                        'Guru menyebutkan situasi.',
                        'Siswa memeragakan hemat energi.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memeragakan dengan bantuan.',
                        child_level_advanced: 'Menjelaskan alasan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membiasakan hemat energi & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.3: HEMAT ENERGI',
                        instructions:
                            'Centang ✓ kegiatan hemat energi yang sudah kamu lakukan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ kegiatan hemat energi yang sudah kamu lakukan!',
                                data: {
                                    rules: [
                                        { name: 'Matikan lampu', icon: '💡', description: 'Saat keluar ruangan' },
                                        { name: 'Cabut charger', icon: '🔌', description: 'Saat tidak dipakai' },
                                        { name: 'Hemat air', icon: '💧', description: 'Matikan keran' },
                                        { name: 'Matikan TV', icon: '📺', description: 'Saat tidak ditonton' },
                                        { name: 'Buka jendela', icon: '🪟', description: 'Pakai cahaya matahari' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang kegiatan.',
                                explanation: 'Melatih kebiasaan hemat.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu mematikan lampu!',
                                data: {
                                    prompt: 'Aku hemat listrik',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku hemat listrik:',
                                },
                                answer_key: 'Siswa menggambar.',
                                explanation: 'Melatih kesadaran.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu hemat energi?',
                                data: {
                                    question: 'Bagaimana perasaanmu hemat energi?',
                                    options: [
                                        { emoji: '😊', label: 'Bangga & Senang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Bisa' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa itu hemat energi?',
                        'Mengapa penting?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Rekam suaramu menyebutkan 3 cara hemat energi!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 7: Sumber Energi di Rumah',
                        quiz_questions: [
                            {
                                question_text: 'Sumber energi utama di bumi adalah...',
                                option_a: 'Bulan',
                                option_b: 'Matahari',
                                option_c: 'Bintang',
                                option_d: 'Awan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh benda yang menggunakan listrik adalah...',
                                option_a: 'Batu',
                                option_b: 'Lampu',
                                option_c: 'Kayu',
                                option_d: 'Air',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Cara hemat listrik antara lain...',
                                option_a: 'Matikan lampu saat keluar',
                                option_b: 'Nyalakan semua lampu',
                                option_c: 'Biarkan TV menyala',
                                option_d: 'Tidak cabut charger',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Manfaat matahari untuk kehidupan adalah...',
                                option_a: 'Memberi cahaya & panas',
                                option_b: 'Membuat gelap',
                                option_c: 'Membuat dingin',
                                option_d: 'Membuat hujan',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Air berguna untuk...',
                                option_a: 'Minum & mandi',
                                option_b: 'Membakar',
                                option_c: 'Menyalakan lampu',
                                option_d: 'Menghangatkan',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🌍 BAB 8: LANGIT DAN BINTANG (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 8,
        title: 'Bab 8 Langit dan Bintang',
        ipas_field: 'Bumi & Alam Semesta',
        target_semester: 2,
        week_target: 22,
        lessons: [
            {
                title: 'Pertemuan 22: Matahari & Bulan',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal matahari & bulan sebagai benda langit beserta cirinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 22: Matahari & Bulan',
                    field: 'Bumi & Alam Semesta',
                    objectives: [
                        'Mengenal matahari sebagai benda langit',
                        'Mengenal bulan sebagai benda langit',
                        'Menyebutkan ciri matahari & bulan',
                    ],
                    subMaterial:
                        'Matahari & bulan adalah **benda langit**. Matahari bersinar terang di siang hari. Bulan bersinar lembut di malam hari.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Matahari sebagai sumber energi.',
                        bumi: 'Benda langit di sekitar bumi.',
                        manusia: 'Mengagumi ciptaan Tuhan.',
                    },
                    triggerQuestion:
                        'Apa yang terlihat di langit siang? Apa yang terlihat di langit malam?',
                    activities: {
                        mindful:
                            'Guru menjelaskan matahari & bulan. Siswa menyebutkan cirinya.',
                        joyful:
                            'Permainan "Siang atau Malam" — guru menyebutkan ciri, siswa menebak waktu.',
                        meaningful:
                            'Menggambar suasana langit siang & malam.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar matahari & bulan', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (mengagumi ciptaan Tuhan)',
                        'Penalaran Kritis (mengamati)',
                        'Kewargaan (menghargai alam)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati langit pagi & malam',
                        'Ceritakan matahari & bulan',
                        'Beri apresiasi saat anak bisa menjelaskan',
                        'Biasakan mengagumi ciptaan Tuhan',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan',
                            solution: 'gunakan gambar & waktu (siang/malam)',
                        },
                        {
                            issue: 'Anak takut gelap',
                            solution: 'ceritakan keindahan bulan & bintang',
                        },
                    ],
                    extensions: [
                        'Amati bulan purnama',
                        'Bikin buku "Langit Malam"',
                        'Cerita tentang matahari & bulan',
                    ],
                    appreciationStage:
                        'Pajang gambar anak. Ceritakan ciptaan Tuhan yang indah.',
                    journal: [
                        'Hari 1: Amati langit pagi',
                        'Hari 2: Amati langit malam',
                        'Hari 3: Gambar matahari',
                        'Hari 4: Gambar bulan',
                        'Hari 5: Cerita',
                    ],
                    reflection: [
                        'Apa bedanya matahari & bulan?',
                        'Kapan matahari muncul?',
                    ],
                }),
                ipas_field: 'Bumi & Alam Semesta',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar matahari & bulan', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Bintang Kecil".',
                    apperception: 'Guru bertanya: "Apa yang terlihat di langit malam?"',
                    trigger_question: 'Apa yang terlihat di langit siang & malam?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Matahari & bulan adalah benda langit ciptaan Tuhan.',
                    concrete_steps: [
                        'Guru menjelaskan matahari.',
                        'Guru menjelaskan bulan.',
                        'Siswa menyebutkan ciri masing-masing.',
                        'Diskusi waktu munculnya.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Matahari & bulan adalah ciptaan Tuhan yang indah. Yuk, amati & syukuri!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Siang atau Malam',
                    game_rules: [
                        'Guru menyebutkan ciri.',
                        'Siswa menebak waktu (siang/malam).',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan.',
                        child_level_advanced: 'Menjelaskan lebih detail.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal matahari & bulan.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.1: MATAHARI & BULAN',
                        instructions: 'Jodohkan ciri dengan benda langit!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan ciri dengan benda langit yang tepat!',
                                data: {
                                    pairs: [
                                        { left: '☀️ Muncul siang', right: 'Matahari' },
                                        { left: '🌙 Muncul malam', right: 'Bulan' },
                                        { left: '🔥 Panas & terang', right: 'Matahari' },
                                        { left: '✨ Bercahaya lembut', right: 'Bulan' },
                                    ],
                                },
                                answer_key: 'Siang→matahari, Malam→bulan.',
                                explanation: 'Mengenal matahari & bulan.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah langit siang & langit malam!',
                                data: {
                                    prompt: 'Langit siang & malam',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Langit siang & malam:',
                                },
                                answer_key: 'Siswa menggambar 2 suasana.',
                                explanation: 'Melatih pengamatan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu melihat bulan?',
                                data: {
                                    question: 'Bagaimana perasaanmu melihat bulan?',
                                    options: [
                                        { emoji: '😊', label: 'Kagum & Senang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Takut Gelap' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih apresiasi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa bedanya matahari & bulan?',
                        'Kapan matahari muncul?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 8.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 23: Bintang di Langit',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal bintang di langit malam sebagai ciptaan Tuhan.',
                content_text: buildContentText({
                    title: 'Pertemuan 23: Bintang di Langit',
                    field: 'Bumi & Alam Semesta',
                    objectives: [
                        'Mengenal bintang di langit malam',
                        'Menyebutkan ciri bintang',
                        'Mengagumi ciptaan Tuhan',
                    ],
                    subMaterial:
                        'Bintang adalah **benda langit** yang bersinar di malam hari. Ada banyak bintang di langit. Bintang mengajarkan kita untuk mengagumi ciptaan Tuhan.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Bintang bersinar.',
                        bumi: 'Bintang di langit.',
                        manusia: 'Mengagumi ciptaan Tuhan.',
                    },
                    triggerQuestion:
                        'Apa yang terlihat di langit malam? Bagaimana bentuknya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan bintang & cirinya. Siswa menyebutkan pengalaman melihat bintang.',
                        joyful:
                            'Permainan "Hitung Bintang" — siswa menghitung gambar bintang.',
                        meaningful:
                            'Menggambar langit malam dengan bintang.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar langit malam', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (mengagumi)',
                        'Penalaran Kritis (mengamati)',
                        'Kreativitas (menggambar)',
                    ],
                    parentTips: [
                        'Ajak anak melihat bintang di malam hari',
                        'Ceritakan keindahan bintang',
                        'Beri apresiasi saat anak mengagumi',
                        'Bacakan cerita tentang bintang',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak tidak bisa lihat bintang',
                            solution: 'gunakan gambar & cerita',
                        },
                        {
                            issue: 'Anak takut gelap',
                            solution: 'dampingi, ceritakan bintang yang indah',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Bintang di Langit"',
                        'Amati bintang dengan teleskop sederhana',
                        'Nyanyikan lagu "Bintang Kecil"',
                    ],
                    appreciationStage:
                        'Pajang gambar langit malam anak. Ceritakan keindahan ciptaan Tuhan.',
                    journal: [
                        'Hari 1: Amati langit malam',
                        'Hari 2: Hitung bintang',
                        'Hari 3: Ceritakan bentuk',
                        'Hari 4: Gambar bintang',
                        'Hari 5: Syukuri',
                    ],
                    reflection: [
                        'Apa itu bintang?',
                        'Kapan bintang terlihat?',
                    ],
                }),
                ipas_field: 'Bumi & Alam Semesta',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar langit malam', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Bintang Kecil".',
                    apperception: 'Guru bertanya: "Siapa yang pernah lihat bintang?"',
                    trigger_question: 'Apa yang terlihat di langit malam?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Bintang bersinar di langit malam, ciptaan Tuhan yang indah.',
                    concrete_steps: [
                        'Guru menjelaskan bintang.',
                        'Siswa menyebutkan pengalaman.',
                        'Guru menunjukkan gambar bintang.',
                        'Diskusi keindahan langit.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Bintang adalah lampu kecil di langit. Indah sekali ciptaan Tuhan!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Hitung Bintang',
                    game_rules: [
                        'Guru menunjukkan gambar bintang.',
                        'Siswa menghitung jumlahnya.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menghitung 1-5 bintang.',
                        child_level_advanced: 'Menghitung hingga 10.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal bintang & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.2: BINTANG DI LANGIT',
                        instructions:
                            'Hitung bintang & warnai gambar berikut!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Hitung jumlah bintang berikut!',
                                data: { total: 8, icon: '⭐' },
                                answer_key: '8 (delapan)',
                                explanation: 'Menghitung bintang.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah langit malam dengan banyak bintang!',
                                data: {
                                    prompt: 'Langit malam',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Langit malam:',
                                },
                                answer_key: 'Siswa menggambar langit.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu melihat bintang?',
                                data: {
                                    question: 'Bagaimana perasaanmu melihat bintang?',
                                    options: [
                                        { emoji: '😊', label: 'Kagum & Senang' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Pernah' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih apresiasi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa itu bintang?',
                        'Kapan bintang terlihat?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Foto hasil LKPD 8.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 24: Indahnya Alam Semesta',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu mengagumi keindahan alam semesta sebagai ciptaan Tuhan dan mensyukurinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 24: Indahnya Alam Semesta',
                    field: 'Bumi & Alam Semesta',
                    objectives: [
                        'Mengenal keindahan alam semesta',
                        'Menyebutkan benda-benda langit',
                        'Menumbuhkan rasa syukur atas ciptaan Tuhan',
                    ],
                    subMaterial:
                        'Alam semesta berisi **matahari, bulan, bintang, dan awan**. Semuanya ciptaan Tuhan yang indah. Kita harus bersyukur dan menjaganya.',
                    cpHolistic: {
                        makhlukHidup: 'Belum diperkenalkan.',
                        zat: 'Belum diperkenalkan.',
                        energi: 'Semua ciptaan Tuhan.',
                        bumi: 'Alam semesta indah.',
                        manusia: 'Syukur & menjaga.',
                    },
                    triggerQuestion:
                        'Apa saja yang ada di langit? Bagaimana rasanya melihatnya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan alam semesta. Siswa menyebutkan benda langit.',
                        joyful:
                            'Permainan "Tebak Benda Langit" — guru menyebutkan ciri, siswa menebak.',
                        meaningful:
                            'Menggambar pemandangan langit lengkap & bersyukur.',
                    },
                    materials: ['Buku IPAS Kelas I SD', 'Gambar alam semesta', 'Kertas', 'Krayon', 'LKPD'],
                    karakter: [
                        'Keimanan & Ketakwaan (syukur)',
                        'Kewargaan (cinta alam)',
                        'Kreativitas (menggambar)',
                    ],
                    parentTips: [
                        'Ajak anak mengagumi langit',
                        'Ceritakan keindahan ciptaan Tuhan',
                        'Beri apresiasi saat anak bersyukur',
                        'Ajarkan menjaga alam',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'gunakan gambar besar & cerita',
                        },
                        {
                            issue: 'Anak sulit menggambar',
                            solution: 'beri contoh & bimbing',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Indahnya Langit"',
                        'Nyanyikan lagu "Bintang Kecil"',
                        'Foto langit setiap hari',
                    ],
                    appreciationStage:
                        'Pajang gambar alam semesta anak. Rayakan syukur.',
                    journal: [
                        'Hari 1: Amati langit',
                        'Hari 2: Sebutkan benda langit',
                        'Hari 3: Gambar',
                        'Hari 4: Cerita',
                        'Hari 5: Syukuri',
                    ],
                    reflection: [
                        'Apa saja benda langit?',
                        'Bagaimana perasaanmu melihat keindahan langit?',
                    ],
                }),
                ipas_field: 'Bumi & Alam Semesta',
                required_materials: ['Buku IPAS Kelas I SD', 'Gambar alam semesta', 'Kertas', 'Krayon', 'LKPD'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Bintang Kecil".',
                    apperception: 'Guru bertanya: "Apa saja yang ada di langit?"',
                    trigger_question: 'Apa yang ada di langit?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Alam semesta indah, ciptaan Tuhan yang harus disyukuri.',
                    concrete_steps: [
                        'Guru menjelaskan alam semesta.',
                        'Siswa menyebutkan benda langit.',
                        'Guru menunjukkan gambar.',
                        'Diskusi keindahan.',
                        'Ulangi 3x untuk memperkuat pemahaman.',
                    ],
                    script_parent:
                        '"Langit, matahari, bulan, bintang - semuanya ciptaan Tuhan. Yuk, syukuri!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Benda Langit',
                    game_rules: [
                        'Guru menyebutkan ciri.',
                        'Siswa menebak benda langit.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan.',
                        child_level_advanced: 'Menjelaskan ciri lebih banyak.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menggambar langit lengkap & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.3: INDAHNYA ALAM SEMESTA',
                        instructions:
                            'Gambarlah pemandangan langit lengkap (matahari/bulan, bintang, awan)!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah pemandangan langit indah dengan matahari atau bulan, bintang, dan awan!',
                                data: {
                                    prompt: 'Langit indah',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Langit indahku:',
                                },
                                answer_key: 'Siswa menggambar langit lengkap.',
                                explanation: 'Melatih kreativitas & syukur.',
                            },
                            {
                                id: 2,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu melihat keindahan langit?',
                                data: {
                                    question: 'Bagaimana perasaanmu melihat keindahan langit?',
                                    options: [
                                        { emoji: '😊', label: 'Kagum & Bersyukur' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Tahu' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih syukur.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'RULES_CARD',
                                question:
                                    'Centang ✓ benda langit yang sudah kamu lihat!',
                                data: {
                                    rules: [
                                        { name: 'Matahari', icon: '☀️', description: 'Siang hari' },
                                        { name: 'Bulan', icon: '🌙', description: 'Malam hari' },
                                        { name: 'Bintang', icon: '⭐', description: 'Malam hari' },
                                        { name: 'Awan', icon: '☁️', description: 'Siang/malam' },
                                    ],
                                    showCheckbox: true,
                                },
                                answer_key: 'Siswa mencentang benda langit.',
                                explanation: 'Melatih pengamatan.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja benda langit?',
                        'Bagaimana perasaanmu melihat keindahan langit?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil gambar langit pada LKPD 8.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 8: Langit dan Bintang',
                        quiz_questions: [
                            {
                                question_text: 'Benda langit yang muncul siang hari adalah...',
                                option_a: 'Bulan',
                                option_b: 'Matahari',
                                option_c: 'Bintang',
                                option_d: 'Awan gelap',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Benda langit yang bersinar di malam hari adalah...',
                                option_a: 'Matahari',
                                option_b: 'Bintang',
                                option_c: 'Awan putih',
                                option_d: 'Pelangi',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Warna bintang pada umumnya...',
                                option_a: 'Hitam',
                                option_b: 'Merah',
                                option_c: 'Bercahaya terang',
                                option_d: 'Hijau',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Alam semesta adalah ciptaan...',
                                option_a: 'Manusia',
                                option_b: 'Tuhan Yang Maha Esa',
                                option_c: 'Hewan',
                                option_d: 'Tumbuhan',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedIPASFaseAKelas1() {
    console.log('================================================================');
    console.log('🌍 SEEDING RESMI: IPAS FASE A KELAS 1 (DRAF)');
    console.log('   8 Bab × 24 Pertemuan — Draf berbasis Kurikulum Merdeka');
    console.log('================================================================');
    console.log('⚠️  PERHATIAN: Ini adalah DRAF.');
    console.log('   Konten perlu DIVALIDASI dengan buku IPAS resmi Kemendikbud.');
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

    console.log('\n🧹 [2/3] Membersihkan data Mapel IPAS lama jika ada...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('name', 'IPAS')
        .maybeSingle();

    let subjectId: string;

    if (existingSubject) {
        subjectId = existingSubject.id;
        console.log(`   ✓ Ditemukan Mapel IPAS (ID: ${subjectId}). Membersihkan...`);

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
        console.log('   ✓ Modul IPAS lama dibersihkan.');
    } else {
        const { data: newSubject, error: subjErr } = await supabase
            .from('subjects')
            .insert({
                class_id: classId,
                name: 'IPAS',
                code: 'IPAS-1',
            })
            .select('id')
            .single();

        if (subjErr || !newSubject) {
            console.error('Gagal membuat mapel IPAS:', subjErr?.message);
            process.exit(1);
        }
        subjectId = newSubject.id;
        console.log(`   ✓ Mata Pelajaran IPAS baru terdaftar (ID: ${subjectId})`);
    }

    console.log('\n📚 [3/3] Menyimpan 8 Bab dan 24 Pertemuan Ajar...');

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of CHAPTERS_DATA) {
        console.log(
            `\n🌍 Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`
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
    console.log('🎉 SEEDING IPAS DRAF BERHASIL!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar & ${totalQuizzesCreated} soal CBT.`);
    console.log('');
    console.log('⚠️  CATATAN PENTING:');
    console.log('   1. Ini adalah DRAF, bukan konten resmi Kemendikbud.');
    console.log('   2. Validasi dengan buku IPAS Kelas 1 SD resmi.');
    console.log('   3. Sesuaikan jika ada perbedaan.');
    console.log('');
    console.log('📊 Distribusi Bab:');
    console.log('   🌍 Bab 1: Aku dan Tubuhku (3 Pertemuan)');
    console.log('   🌍 Bab 2: Aku dan Keluargaku (3 Pertemuan)');
    console.log('   🌍 Bab 3: Hewan di Sekitarku (3 Pertemuan)');
    console.log('   🌍 Bab 4: Tumbuhan di Sekitarku (3 Pertemuan)');
    console.log('   🌍 Bab 5: Cuaca dan Musim (3 Pertemuan)');
    console.log('   🌍 Bab 6: Benda di Sekitarku (3 Pertemuan)');
    console.log('   🌍 Bab 7: Sumber Energi di Rumah (3 Pertemuan)');
    console.log('   🌍 Bab 8: Langit dan Bintang (3 Pertemuan)');
    console.log('================================================================\n');
}

seedIPASFaseAKelas1().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding IPAS:', err);
    process.exit(1);
});