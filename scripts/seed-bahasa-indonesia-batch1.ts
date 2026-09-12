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
    | 'TRACE_LETTER'
    | 'MATCH_SYLLABLE'
    | 'READ_AND_MATCH'
    | 'FILL_THE_WORD'
    | 'READING_CARD'
    | 'WRITING_LINES'
    | 'MATCH_PAIRS'
    | 'DRAWING_FRAME'
    | 'PICT_COUNT'
    | 'EXPRESSION_CARD'
    | 'SELF_REFLECTION';

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
    bi_field: string;
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
    bi_field: string;
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
        menyimak: string;
        membaca: string;
        berbicara: string;
        menulis: string;
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
**Bidang Literasi: ${params.field}**

🎯 **Tujuan Pembelajaran**:
${params.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

📖 **Materi Pokok**:
${params.subMaterial}

📚 **4 Keterampilan Bahasa yang Dikembangkan**:
- **Menyimak**: ${params.cpHolistic.menyimak}
- **Membaca & Memirsa**: ${params.cpHolistic.membaca}
- **Berbicara**: ${params.cpHolistic.berbicara}
- **Menulis**: ${params.cpHolistic.menulis}

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

📅 **Jurnal Literasi di Rumah** (diparaf orang tua):
${params.journal.map((j) => `- [ ] ${j}`).join('\n')}

📝 **Refleksi Siswa**:
${params.reflection.map((r) => `- ${r}`).join('\n')}

📚 **Referensi**:
Buku Bahasa Indonesia Kelas I SD Kurikulum Merdeka (Draf — perlu divalidasi dengan buku resmi Kemendikbud).`;
}

const CHAPTERS_DATA: ChapterItem[] = [
    // ===========================================================================
    // 📚 BAB 1: AKU MENGENAL HURUF (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 1,
        title: 'Bab 1 Aku Mengenal Huruf',
        bi_field: 'Fonik & Pengenalan Huruf',
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Pertemuan 1: Bunyi Huruf Vokal (a-i-u-e-o)',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal dan melafalkan bunyi huruf vokal (a, i, u, e, o) dengan benar serta menebalkan hurufnya.',
                content_text: buildContentText({
                    title: 'Pertemuan 1: Bunyi Huruf Vokal (a-i-u-e-o)',
                    field: 'Fonik & Pengenalan Huruf',
                    objectives: [
                        'Mengenal 5 huruf vokal (a, i, u, e, o)',
                        'Melafalkan bunyi huruf vokal dengan benar',
                        'Menebalkan huruf vokal dengan rapi',
                    ],
                    subMaterial:
                        'Mengenal **5 huruf vokal**: a-i-u-e-o. Setiap huruf memiliki bunyi yang berbeda. Huruf vokal adalah pondasi awal membaca. Contoh: a pada kata "api", i pada kata "ikan", u pada kata "ular", e pada kata "enak", o pada kata "obat".',
                    cpHolistic: {
                        menyimak: 'Mendengarkan bunyi huruf vokal yang diucapkan guru.',
                        membaca: 'Mengenal bentuk huruf vokal a-i-u-e-o.',
                        berbicara: 'Melafalkan huruf vokal dengan nyaring.',
                        menulis: 'Menebalkan huruf vokal dengan rapi.',
                    },
                    triggerQuestion:
                        'Apa saja huruf vokal? Bagaimana bunyinya?',
                    activities: {
                        mindful:
                            'Guru mengenalkan 5 huruf vokal dengan lagu dan gerakan. Siswa menyebutkan huruf vokal berulang-ulang.',
                        joyful:
                            'Permainan "Tebak Bunyi Vokal" — guru menyebutkan contoh kata, siswa menebak huruf vokal awalnya.',
                        meaningful:
                            'Siswa menebalkan huruf vokal di LKPD dan mencoba menulis sendiri.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu huruf vokal besar',
                        'Cermin kecil (untuk melihat gerakan mulut)',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (mengenal bunyi huruf)',
                        'Komunikasi (melafalkan dengan jelas)',
                        'Kemandirian (menulis sendiri)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan huruf vokal setiap hari',
                        'Sebutkan contoh kata yang diawali huruf vokal',
                        'Beri apresiasi saat anak bisa melafalkan dengan benar',
                        'Biasakan membaca buku bergambar bersama anak',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan bunyi e dan o',
                            solution: 'gunakan cermin, tunjukkan gerakan mulut berbeda',
                        },
                        {
                            issue: 'Anak sulit menulis huruf vokal',
                            solution: 'bimbing tangan anak, mulai dari huruf "a" yang paling mudah',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'gunakan lagu dan gerakan untuk membuat menyenangkan',
                        },
                    ],
                    extensions: [
                        'Membuat kartu huruf vokal dari karton warna',
                        'Mencari benda di rumah yang diawali huruf vokal',
                        'Menyanyikan lagu "A-I-U-E-O" bersama keluarga',
                    ],
                    appreciationStage:
                        'Pajang tulisan huruf vokal anak di dinding kamar. Ajak anak menunjukkan ke keluarga.',
                    journal: [
                        'Hari 1: Sebutkan 5 huruf vokal',
                        'Hari 2: Sebutkan bunyi huruf "a"',
                        'Hari 3: Sebutkan bunyi huruf "i"',
                        'Hari 4: Sebutkan bunyi huruf "u"',
                        'Hari 5: Tulis huruf vokal',
                    ],
                    reflection: [
                        'Ada berapa huruf vokal?',
                        'Bunyi huruf apa yang paling mudah kamu ucapkan?',
                        'Huruf apa yang paling sulit ditulis?',
                    ],
                }),
                bi_field: 'Fonik & Pengenalan Huruf',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu huruf vokal',
                    'Cermin kecil',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa dengan hangat dan mengajak siswa berdoa. "Selamat pagi, anak hebat! Hari ini kita akan belajar huruf vokal!"',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu "A-I-U-E-O" untuk membangun suasana menyenangkan.',
                    apperception:
                        'Guru bertanya: "Siapa yang tahu huruf vokal? Ayo sebutkan!"',
                    trigger_question:
                        'Apa saja huruf vokal? Bagaimana bunyinya?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Huruf vokal ada 5: a, i, u, e, o. Setiap huruf punya bunyi yang berbeda.',
                    concrete_steps: [
                        'Guru mengenalkan 5 huruf vokal dengan kartu.',
                        'Siswa menyebutkan huruf vokal bersama-sama.',
                        'Guru menunjukkan gerakan mulut untuk setiap bunyi.',
                        'Siswa menirukan gerakan mulut di cermin.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent:
                        '"Huruf vokal adalah pondasi awal membaca! Yuk, kenali a-i-u-e-o dengan baik."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Bunyi Vokal',
                    game_rules: [
                        'Guru menyebutkan contoh kata: "api", "ikan", "ular", "enak", "obat".',
                        'Siswa menebak huruf vokal awalnya.',
                        'Yang paling cepat & benar diberi apresiasi.',
                        'Dilanjutkan menyanyikan lagu vokal.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan kata lain yang diawali huruf vokal.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menebalkan huruf vokal & menulis sendiri.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: BUNYI HURUF VOKAL',
                        instructions:
                            'Tebalkan huruf vokal berikut, lalu coba tulis sendiri di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'TRACE_LETTER',
                                question: 'Tebalkan huruf vokal berikut dengan pensil!',
                                data: {
                                    letters: [
                                        { letter: 'a', word: 'api', icon: '🔥' },
                                        { letter: 'i', word: 'ikan', icon: '🐟' },
                                        { letter: 'u', word: 'ular', icon: '🐍' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan huruf a, i, u dengan rapi.',
                                explanation: 'Mengenal & menulis huruf vokal.',
                            },
                            {
                                id: 2,
                                type: 'TRACE_LETTER',
                                question: 'Tebalkan huruf vokal berikut!',
                                data: {
                                    letters: [
                                        { letter: 'e', word: 'enak', icon: '🍽️' },
                                        { letter: 'o', word: 'obat', icon: '💊' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan huruf e, o dengan rapi.',
                                explanation: 'Melanjutkan pengenalan huruf vokal.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question: 'Bagaimana perasaanmu belajar huruf vokal?',
                                data: {
                                    question: 'Bagaimana perasaanmu belajar huruf vokal?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Semangat' },
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
                        'Ada berapa huruf vokal?',
                        'Huruf vokal apa yang paling mudah diucapkan?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menyebutkan 5 huruf vokal: a-i-u-e-o dengan jelas!',
                    },
                ],
            },
            {
                title: 'Pertemuan 2: Bunyi Huruf Konsonan (b-c-d-k)',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengenal dan melafalkan bunyi huruf konsonan (b, c, d, k) dengan benar serta menebalkan hurufnya.',
                content_text: buildContentText({
                    title: 'Pertemuan 2: Bunyi Huruf Konsonan (b-c-d-k)',
                    field: 'Fonik & Pengenalan Huruf',
                    objectives: [
                        'Mengenal 4 huruf konsonan (b, c, d, k)',
                        'Melafalkan bunyi huruf konsonan dengan benar',
                        'Menebalkan huruf konsonan dengan rapi',
                    ],
                    subMaterial:
                        'Mengenal **huruf konsonan b, c, d, k**. Huruf konsonan adalah huruf selain vokal. Contoh: b pada kata "bola", c pada kata "cangkir", d pada kata "dadu", k pada kata "kucing".',
                    cpHolistic: {
                        menyimak: 'Mendengarkan bunyi huruf konsonan yang diucapkan guru.',
                        membaca: 'Mengenal bentuk huruf konsonan b-c-d-k.',
                        berbicara: 'Melafalkan huruf konsonan dengan jelas.',
                        menulis: 'Menebalkan huruf konsonan dengan rapi.',
                    },
                    triggerQuestion:
                        'Apa saja huruf konsonan yang kamu tahu?',
                    activities: {
                        mindful:
                            'Guru mengenalkan huruf b-c-d-k dengan kartu. Siswa menyebutkan huruf konsonan.',
                        joyful:
                            'Permainan "Tebak Konsonan" — guru menyebutkan contoh kata, siswa menebak huruf konsonan awalnya.',
                        meaningful:
                            'Siswa menebalkan huruf konsonan di LKPD.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu huruf konsonan',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (mengenal bunyi)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan huruf konsonan setiap hari',
                        'Sebutkan contoh kata yang diawali huruf konsonan',
                        'Beri apresiasi saat anak bisa melafalkan',
                        'Bacakan buku cerita bergambar',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan b dan d',
                            solution: 'gunakan visual berbeda, "b" menghadap kanan, "d" menghadap kiri',
                        },
                        {
                            issue: 'Anak sulit melafalkan k',
                            solution: 'latih dengan "kucing", "kuku", "kaki" berulang',
                        },
                    ],
                    extensions: [
                        'Membuat kartu huruf konsonan warna-warni',
                        'Mencari benda di rumah yang diawali b-c-d-k',
                        'Bikin lagu sederhana untuk huruf konsonan',
                    ],
                    appreciationStage:
                        'Pajang tulisan huruf konsonan anak.',
                    journal: [
                        'Hari 1: Sebutkan huruf "b"',
                        'Hari 2: Sebutkan huruf "c"',
                        'Hari 3: Sebutkan huruf "d"',
                        'Hari 4: Sebutkan huruf "k"',
                        'Hari 5: Tulis huruf konsonan',
                    ],
                    reflection: [
                        'Huruf konsonan apa yang paling mudah?',
                        'Huruf konsonan apa yang paling sulit?',
                    ],
                }),
                bi_field: 'Fonik & Pengenalan Huruf',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu huruf konsonan',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat dan mengajak siswa berdoa.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu tentang huruf konsonan.',
                    apperception:
                        'Guru bertanya: "Siapa yang tahu huruf b? c? d? k?"',
                    trigger_question:
                        'Apa saja huruf konsonan yang kamu tahu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Huruf konsonan b-c-d-k memiliki bunyi masing-masing.',
                    concrete_steps: [
                        'Guru mengenalkan huruf b-c-d-k dengan kartu.',
                        'Siswa menyebutkan huruf konsonan bersama.',
                        'Guru menunjukkan contoh kata untuk setiap huruf.',
                        'Siswa menirukan pelafalan.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent:
                        '"Huruf konsonan adalah huruf selain vokal. Yuk, kenali b-c-d-k!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Konsonan',
                    game_rules: [
                        'Guru menyebutkan contoh kata.',
                        'Siswa menebak huruf konsonan awalnya.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan kata lain.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menebalkan huruf konsonan.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: BUNYI HURUF KONSONAN',
                        instructions:
                            'Tebalkan huruf konsonan berikut dan warnai ikonnya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'TRACE_LETTER',
                                question: 'Tebalkan huruf konsonan berikut dengan pensil!',
                                data: {
                                    letters: [
                                        { letter: 'b', word: 'bola', icon: '⚽' },
                                        { letter: 'c', word: 'cangkir', icon: '☕' },
                                        { letter: 'd', word: 'dadu', icon: '🎲' },
                                        { letter: 'k', word: 'kucing', icon: '🐱' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan huruf b, c, d, k.',
                                explanation: 'Mengenal huruf konsonan.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan huruf dengan kata yang sesuai!',
                                data: {
                                    pairs: [
                                        { left: '🔤 b', right: 'bola ⚽' },
                                        { left: '🔤 c', right: 'cangkir ☕' },
                                        { left: '🔤 d', right: 'dadu 🎲' },
                                        { left: '🔤 k', right: 'kucing 🐱' },
                                    ],
                                },
                                answer_key: 'b→bola, c→cangkir, d→dadu, k→kucing.',
                                explanation: 'Menghubungkan huruf dengan kata.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Huruf konsonan apa yang paling mudah?',
                        'Huruf konsonan apa yang paling sulit?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menebalkan huruf konsonan pada LKPD 1.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 3: Suku Kata Terbuka (ba-bi-bu)',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menyambung huruf konsonan dengan vokal menjadi suku kata terbuka (ba, bi, bu, be, bo).',
                content_text: buildContentText({
                    title: 'Pertemuan 3: Suku Kata Terbuka (ba-bi-bu)',
                    field: 'Fonik & Pengenalan Huruf',
                    objectives: [
                        'Menyambung konsonan b dengan vokal a-i-u-e-o',
                        'Membaca suku kata ba-bi-bu-be-bo',
                        'Menulis suku kata terbuka',
                    ],
                    subMaterial:
                        'Menyambung huruf konsonan **b** dengan vokal **a-i-u-e-o** menjadi **ba, bi, bu, be, bo**. Suku kata terbuka diakhiri huruf vokal. Ini pondasi membaca.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan suku kata "ba-bi-bu".',
                        membaca: 'Membaca suku kata ba-bi-bu-be-bo.',
                        berbicara: 'Melafalkan suku kata dengan jelas.',
                        menulis: 'Menulis suku kata terbuka.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menyambung huruf b dengan a?',
                    activities: {
                        mindful:
                            'Guru menjelaskan cara menyambung b dengan vokal. Siswa menirukan ba-bi-bu-be-bo.',
                        joyful:
                            'Permainan "Sambung Suku Kata" — guru menyebutkan konsonan, siswa menyambung dengan vokal.',
                        meaningful:
                            'Siswa menyambung suku kata di LKPD.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu suku kata',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (menyambung)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak membaca suku kata setiap hari',
                        'Buat permainan "sambung suku kata" di rumah',
                        'Beri apresiasi saat anak bisa membaca',
                        'Bacakan buku cerita dengan suku kata',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung menyambung',
                            solution: 'beri contoh visual, tunjukkan langsung',
                        },
                        {
                            issue: 'Anak lupa bunyi vokal',
                            solution: 'ulangi huruf vokal dulu',
                        },
                    ],
                    extensions: [
                        'Menyambung konsonan lain (p, m, n) dengan vokal',
                        'Bikin buku suku kata',
                        'Bikin lagu suku kata',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa membaca ba-bi-bu.',
                    journal: [
                        'Hari 1: Baca "ba"',
                        'Hari 2: Baca "bi"',
                        'Hari 3: Baca "bu"',
                        'Hari 4: Baca "be"',
                        'Hari 5: Baca "bo"',
                    ],
                    reflection: [
                        'Bagaimana cara menyambung b dengan a?',
                        'Suku kata apa yang paling mudah?',
                    ],
                }),
                bi_field: 'Fonik & Pengenalan Huruf',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu suku kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu suku kata.',
                    apperception:
                        'Guru bertanya: "Bagaimana cara menyambung huruf b dengan a?"',
                    trigger_question: 'Bagaimana cara menyambung b dengan vokal?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menyambung konsonan b dengan vokal a-i-u-e-o menghasilkan ba-bi-bu-be-bo.',
                    concrete_steps: [
                        'Guru menunjukkan huruf b + a = ba.',
                        'Siswa menirukan "ba".',
                        'Lanjut b + i = bi, b + u = bu, b + e = be, b + o = bo.',
                        'Siswa berlatih membaca berulang.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent:
                        '"Suku kata terbuka diakhiri vokal. Yuk, baca ba-bi-bu-be-bo!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sambung Suku Kata',
                    game_rules: [
                        'Guru menyebutkan konsonan "b".',
                        'Siswa menyambung dengan vokal secara acak.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyambung dengan bantuan guru.',
                        child_level_advanced: 'Menyambung tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menyambung suku kata.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.3: SUKU KATA TERBUKA (ba-bi-bu)',
                        instructions:
                            'Sambung suku kata berikut! Tulis hasilnya di kotak kosong.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata berikut!',
                                data: {
                                    syllables: [
                                        { part1: 'b', part2: 'a', result: 'ba', icon: '🏠' },
                                        { part1: 'b', part2: 'i', result: 'bi', icon: '🐝' },
                                        { part1: 'b', part2: 'u', result: 'bu', icon: '📚' },
                                    ],
                                },
                                answer_key: 'ba, bi, bu',
                                explanation: 'Menyambung konsonan b dengan vokal.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata berikut!',
                                data: {
                                    syllables: [
                                        { part1: 'b', part2: 'e', result: 'be', icon: '🦆' },
                                        { part1: 'b', part2: 'o', result: 'bo', icon: '⚽' },
                                    ],
                                },
                                answer_key: 'be, bo',
                                explanation: 'Melanjutkan suku kata terbuka.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'READ_AND_MATCH',
                                question: 'Baca suku kata berikut, lalu cocokkan dengan gambar!',
                                data: {
                                    words: [
                                        { word: 'ba', icon: '🏠' },
                                        { word: 'bi', icon: '🐝' },
                                        { word: 'bu', icon: '📚' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan suku kata dengan gambar.',
                                explanation: 'Membaca & mencocokkan.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara menyambung b dengan a?',
                        'Suku kata apa yang paling mudah?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca suku kata: ba-bi-bu-be-bo dengan jelas!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 1: Aku Mengenal Huruf',
                        quiz_questions: [
                            {
                                question_text: 'Ada berapa huruf vokal?',
                                option_a: '3',
                                option_b: '4',
                                option_c: '5',
                                option_d: '6',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Huruf vokal antara lain...',
                                option_a: 'a, i, u, e, o',
                                option_b: 'b, c, d, k',
                                option_c: 'p, m, n',
                                option_d: 'x, y, z',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Hasil dari b + a adalah...',
                                option_a: 'ba',
                                option_b: 'ab',
                                option_c: 'b',
                                option_d: 'a',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kata "bola" dimulai dengan huruf...',
                                option_a: 'a',
                                option_b: 'b',
                                option_c: 'c',
                                option_d: 'd',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 📚 BAB 2: AKU BISA MEMBACA SUKU KATA (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 2,
        title: 'Bab 2 Aku Bisa Membaca Suku Kata',
        bi_field: 'Membaca Suku Kata',
        target_semester: 1,
        week_target: 4,
        lessons: [
            {
                title: 'Pertemuan 4: Suku Kata 2 Huruf (ba, bi, bu, ca, ci, cu)',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu membaca suku kata 2 huruf dengan lancar.',
                content_text: buildContentText({
                    title: 'Pertemuan 4: Suku Kata 2 Huruf',
                    field: 'Membaca Suku Kata',
                    objectives: [
                        'Membaca suku kata 2 huruf dengan lancar',
                        'Menyambung konsonan lain dengan vokal',
                        'Mengenal lebih banyak suku kata',
                    ],
                    subMaterial:
                        'Membaca **suku kata 2 huruf**: ba-bi-bu, ca-ci-cu, da-di-du, ka-ki-ku. Setiap suku kata memiliki bunyi yang berbeda.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan suku kata dengan jelas.',
                        membaca: 'Membaca suku kata 2 huruf.',
                        berbicara: 'Melafalkan dengan lancar.',
                        menulis: 'Menulis suku kata 2 huruf.',
                    },
                    triggerQuestion: 'Suku kata apa saja yang bisa kamu baca?',
                    activities: {
                        mindful:
                            'Guru mengenalkan suku kata baru. Siswa membaca bersama-sama.',
                        joyful:
                            'Permainan "Kartu Suku Kata" — siswa membaca kartu yang ditunjukkan guru.',
                        meaningful:
                            'Siswa membaca & mencocokkan suku kata.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu suku kata',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (membaca)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (berlatih)',
                    ],
                    parentTips: [
                        'Ajak anak membaca suku kata setiap hari',
                        'Beri waktu 10 menit latihan',
                        'Beri apresiasi saat anak lancar',
                        'Bacakan buku cerita',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak lupa suku kata sebelumnya',
                            solution: 'ulangi suku kata lama sebelum ke yang baru',
                        },
                        {
                            issue: 'Anak salah baca ca & da',
                            solution: 'beri visual berbeda, tunjukkan perbedaan',
                        },
                    ],
                    extensions: [
                        'Bikin kartu suku kata warna-warni',
                        'Bikin buku suku kata',
                        'Bikin lagu suku kata',
                    ],
                    appreciationStage:
                        'Rayakan anak yang lancar baca suku kata.',
                    journal: [
                        'Hari 1: Baca ba-bi-bu',
                        'Hari 2: Baca ca-ci-cu',
                        'Hari 3: Baca da-di-du',
                        'Hari 4: Baca ka-ki-ku',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Suku kata apa yang paling mudah?',
                        'Suku kata apa yang paling sulit?',
                    ],
                }),
                bi_field: 'Membaca Suku Kata',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu suku kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu suku kata.',
                    apperception:
                        'Guru bertanya: "Suku kata apa saja yang sudah kalian bisa baca?"',
                    trigger_question: 'Suku kata apa saja yang bisa kamu baca?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca suku kata 2 huruf dengan lancar.',
                    concrete_steps: [
                        'Guru menunjukkan kartu suku kata ba-bi-bu.',
                        'Siswa membaca bersama.',
                        'Lanjut ca-ci-cu, da-di-du, ka-ki-ku.',
                        'Siswa berlatih membaca berulang.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent:
                        '"Latihan membaca setiap hari agar lancar. Yuk, baca suku kata!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Kartu Suku Kata',
                    game_rules: [
                        'Guru menunjukkan kartu suku kata.',
                        'Siswa membaca dengan cepat.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membaca dengan bantuan guru.',
                        child_level_advanced: 'Membaca tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & mencocokkan suku kata.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: SUKU KATA 2 HURUF',
                        instructions:
                            'Baca suku kata, lalu cocokkan dengan gambar!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READ_AND_MATCH',
                                question: 'Baca suku kata, lalu cocokkan dengan gambar!',
                                data: {
                                    words: [
                                        { word: 'ba', icon: '🏠' },
                                        { word: 'bi', icon: '🐝' },
                                        { word: 'bu', icon: '📚' },
                                        { word: 'ci', icon: '🐦' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan suku kata dengan gambar.',
                                explanation: 'Membaca & mencocokkan.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata berikut!',
                                data: {
                                    syllables: [
                                        { part1: 'c', part2: 'a', result: 'ca', icon: '🍲' },
                                        { part1: 'd', part2: 'i', result: 'di', icon: '👶' },
                                        { part1: 'k', part2: 'u', result: 'ku', icon: '🐢' },
                                    ],
                                },
                                answer_key: 'ca, di, ku',
                                explanation: 'Menyambung konsonan dengan vokal.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'READING_CARD',
                                question: 'Baca suku kata berikut dengan nyaring!',
                                data: {
                                    sentences: [
                                        { text: 'ba - bi - bu', icon: '🔤' },
                                        { text: 'ca - ci - cu', icon: '🔤' },
                                        { text: 'da - di - du', icon: '🔤' },
                                        { text: 'ka - ki - ku', icon: '🔤' },
                                    ],
                                },
                                answer_key: 'Siswa membaca dengan lancar.',
                                explanation: 'Latihan membaca.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Suku kata apa yang paling mudah?',
                        'Suku kata apa yang paling sulit?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca suku kata: ba-bi-bu, ca-ci-cu, da-di-du, ka-ki-ku!',
                    },
                ],
            },
            {
                title: 'Pertemuan 5: Suku Kata 3 Huruf (ban, bin, bun)',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu membaca suku kata 3 huruf (suku kata tertutup) dengan lancar.',
                content_text: buildContentText({
                    title: 'Pertemuan 5: Suku Kata 3 Huruf (ban, bin, bun)',
                    field: 'Membaca Suku Kata',
                    objectives: [
                        'Mengenal suku kata tertutup (3 huruf)',
                        'Membaca suku kata ban-bin-bun',
                        'Membedakan suku kata terbuka & tertutup',
                    ],
                    subMaterial:
                        'Mengenal **suku kata tertutup**: ban-bin-bun, can-cin-cun. Suku kata tertutup diakhiri huruf konsonan.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan suku kata tertutup.',
                        membaca: 'Membaca suku kata 3 huruf.',
                        berbicara: 'Melafalkan dengan jelas.',
                        menulis: 'Menulis suku kata tertutup.',
                    },
                    triggerQuestion:
                        'Apa bedanya suku kata "ba" dengan "ban"?',
                    activities: {
                        mindful:
                            'Guru menjelaskan suku kata tertutup. Siswa membaca ban-bin-bun.',
                        joyful:
                            'Permainan "Bedakan Suku Kata" — guru menyebutkan, siswa membedakan terbuka/tertutup.',
                        meaningful:
                            'Siswa membaca & mencocokkan suku kata tertutup.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu suku kata',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (membedakan)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (berlatih)',
                    ],
                    parentTips: [
                        'Ajak anak membaca suku kata tertutup',
                        'Beri contoh kata dengan suku kata tertutup',
                        'Beri apresiasi',
                        'Bacakan buku cerita',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan terbuka & tertutup',
                            solution: 'gunakan visual, tunjukkan perbedaan akhir huruf',
                        },
                        {
                            issue: 'Anak lupa bunyi n',
                            solution: 'ulangi bunyi n dengan contoh',
                        },
                    ],
                    extensions: [
                        'Bikin buku suku kata tertutup',
                        'Bikin lagu',
                        'Mencari kata dengan suku kata tertutup',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa baca suku kata tertutup.',
                    journal: [
                        'Hari 1: Baca ban',
                        'Hari 2: Baca bin',
                        'Hari 3: Baca bun',
                        'Hari 4: Baca can',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Apa bedanya ba dan ban?',
                        'Suku kata tertutup apa yang paling mudah?',
                    ],
                }),
                bi_field: 'Membaca Suku Kata',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu suku kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker:
                        'Guru mengajak siswa menyanyikan lagu suku kata.',
                    apperception:
                        'Guru bertanya: "Apa bedanya ba dan ban?"',
                    trigger_question:
                        'Apa bedanya suku kata "ba" dengan "ban"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Suku kata tertutup diakhiri konsonan.',
                    concrete_steps: [
                        'Guru menunjukkan ba + n = ban.',
                        'Siswa menirukan "ban".',
                        'Lanjut bin, bun, can, cin, cun.',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Suku kata tertutup diakhiri konsonan. Yuk, baca ban-bin-bun!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Bedakan Suku Kata',
                    game_rules: [
                        'Guru menyebutkan suku kata.',
                        'Siswa membedakan terbuka/tertutup.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca suku kata tertutup.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: SUKU KATA 3 HURUF',
                        instructions:
                            'Sambung suku kata terbuka dengan konsonan akhir!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata berikut!',
                                data: {
                                    syllables: [
                                        { part1: 'ba', part2: 'n', result: 'ban', icon: '🛞' },
                                        { part1: 'bi', part2: 'n', result: 'bin', icon: '🐝' },
                                        { part1: 'bu', part2: 'n', result: 'bun', icon: '🌸' },
                                    ],
                                },
                                answer_key: 'ban, bin, bun',
                                explanation: 'Menyambung suku kata tertutup.',
                            },
                            {
                                id: 2,
                                type: 'READ_AND_MATCH',
                                question: 'Baca & cocokkan!',
                                data: {
                                    words: [
                                        { word: 'ban', icon: '🛞' },
                                        { word: 'bin', icon: '🐝' },
                                        { word: 'bun', icon: '🌸' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan.',
                                explanation: 'Membaca suku kata tertutup.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'READING_CARD',
                                question: 'Baca suku kata berikut dengan nyaring!',
                                data: {
                                    sentences: [
                                        { text: 'ban - bin - bun', icon: '🔤' },
                                        { text: 'can - cin - cun', icon: '🔤' },
                                    ],
                                },
                                answer_key: 'Siswa membaca dengan lancar.',
                                explanation: 'Latihan membaca.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa bedanya ba dan ban?',
                        'Suku kata tertutup apa yang paling mudah?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca suku kata: ban-bin-bun!',
                    },
                ],
            },
            {
                title: 'Pertemuan 6: Kata 2 Suku Kata (bola, buku, kaki)',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu membaca kata 2 suku kata dengan lancar.',
                content_text: buildContentText({
                    title: 'Pertemuan 6: Kata 2 Suku Kata',
                    field: 'Membaca Kata',
                    objectives: [
                        'Membaca kata 2 suku kata',
                        'Menyambung 2 suku kata menjadi kata',
                        'Mengenal arti kata sederhana',
                    ],
                    subMaterial:
                        'Membaca **kata 2 suku kata**: bo-la (bola), bu-ku (buku), ka-ki (kaki), ca-ra (cara). Setiap suku kata dibaca lalu digabungkan.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan kata 2 suku kata.',
                        membaca: 'Membaca kata 2 suku kata.',
                        berbicara: 'Melafalkan kata dengan jelas.',
                        menulis: 'Menulis kata 2 suku kata.',
                    },
                    triggerQuestion:
                        'Kata apa yang bisa kamu baca dari "bo" + "la"?',
                    activities: {
                        mindful:
                            'Guru menjelaskan cara membaca kata 2 suku kata. Siswa membaca bo-la.',
                        joyful:
                            'Permainan "Sambung Kata" — guru menyebutkan suku kata, siswa menyambung menjadi kata.',
                        meaningful:
                            'Siswa membaca & mencocokkan kata dengan gambar.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kata',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (membaca)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (berlatih)',
                    ],
                    parentTips: [
                        'Ajak anak membaca kata setiap hari',
                        'Sebutkan benda di rumah dengan 2 suku kata',
                        'Beri apresiasi',
                        'Bacakan buku cerita',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung menyambung',
                            solution: 'tunjukkan suku kata satu per satu, baru gabungkan',
                        },
                        {
                            issue: 'Anak lupa arti kata',
                            solution: 'beri gambar pendamping',
                        },
                    ],
                    extensions: [
                        'Menyambung kata menjadi kalimat',
                        'Bikin buku kata',
                        'Bikin lagu kata',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa membaca kata.',
                    journal: [
                        'Hari 1: Baca bo-la',
                        'Hari 2: Baca bu-ku',
                        'Hari 3: Baca ka-ki',
                        'Hari 4: Baca ca-ra',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Kata apa yang paling mudah dibaca?',
                        'Kata apa yang paling sulit?',
                    ],
                }),
                bi_field: 'Membaca Kata',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu kata.',
                    apperception:
                        'Guru bertanya: "Kata apa yang bisa dibaca dari bo + la?"',
                    trigger_question:
                        'Kata apa yang bisa dibaca dari "bo" + "la"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca kata 2 suku kata dengan menyambung.',
                    concrete_steps: [
                        'Guru menunjukkan bo + la = bola.',
                        'Siswa membaca "bola".',
                        'Lanjut bu-ku, ka-ki, ca-ra.',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Kata dibaca dengan menyambung suku kata. Yuk, baca bola-buku-kaki!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sambung Kata',
                    game_rules: [
                        'Guru menyebutkan suku kata pertama.',
                        'Siswa menyambung dengan suku kata kedua.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca kata 2 suku kata.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.3: KATA 2 SUKU KATA',
                        instructions:
                            'Sambung suku kata, baca kata, lalu cocokkan!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata menjadi kata!',
                                data: {
                                    syllables: [
                                        { part1: 'bo', part2: 'la', result: 'bola', icon: '⚽' },
                                        { part1: 'bu', part2: 'ku', result: 'buku', icon: '📚' },
                                        { part1: 'ka', part2: 'ki', result: 'kaki', icon: '🦶' },
                                    ],
                                },
                                answer_key: 'bola, buku, kaki',
                                explanation: 'Menyambung suku kata menjadi kata.',
                            },
                            {
                                id: 2,
                                type: 'READ_AND_MATCH',
                                question: 'Baca kata, lalu cocokkan!',
                                data: {
                                    words: [
                                        { word: 'bola', icon: '⚽' },
                                        { word: 'buku', icon: '📚' },
                                        { word: 'kaki', icon: '🦶' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan.',
                                explanation: 'Membaca kata.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'WRITING_LINES',
                                question: 'Tulis kata berikut di baris kosong!',
                                data: {
                                    lines: 3,
                                    prompt: 'Tulis kata:',
                                    example: 'bola, buku, kaki',
                                },
                                answer_key: 'Siswa menulis kata.',
                                explanation: 'Latihan menulis.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kata apa yang paling mudah?',
                        'Kata apa yang paling sulit?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca kata: bola, buku, kaki!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 2: Aku Bisa Membaca Suku Kata',
                        quiz_questions: [
                            {
                                question_text: 'Hasil dari "bo" + "la" adalah...',
                                option_a: 'bola',
                                option_b: 'labo',
                                option_c: 'bela',
                                option_d: 'bola',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kata "buku" terdiri dari suku kata...',
                                option_a: 'bu-ku',
                                option_b: 'buk-u',
                                option_c: 'b-uku',
                                option_d: 'bu-k',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Suku kata "ban" adalah contoh suku kata...',
                                option_a: 'Terbuka',
                                option_b: 'Tertutup',
                                option_c: 'Vokal',
                                option_d: 'Konsonan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Kata "kaki" artinya...',
                                option_a: 'Anggota tubuh untuk berjalan',
                                option_b: 'Alat untuk menulis',
                                option_c: 'Benda untuk bermain',
                                option_d: 'Alat untuk makan',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedBahasaIndonesiaBatch1() {
    console.log('================================================================');
    console.log('📚 SEEDING BAHASA INDONESIA FASE A KELAS 1 - BATCH 1');
    console.log('   Bab 1-2 (Semester 1, 6 Pertemuan)');
    console.log('================================================================');
    console.log('⚠️  Ini adalah DRAF. Perlu divalidasi dengan buku resmi.');
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

    console.log('\n📚 [2/3] Menyiapkan Mapel Bahasa Indonesia...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('name', 'Bahasa Indonesia')
        .maybeSingle();

    let subjectId: string;

    if (existingSubject) {
        subjectId = existingSubject.id;
        console.log(`   ✓ Mapel Bahasa Indonesia sudah ada (ID: ${subjectId})`);
        console.log(`   ℹ️  Batch 1 akan MENAMBAHKAN Bab 1-2 tanpa menghapus yang lain.`);
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
        console.log(`   ✓ Mata Pelajaran Bahasa Indonesia baru terdaftar (ID: ${subjectId})`);
    }

    console.log('\n📚 [3/3] Menyimpan Bab 1-2 (6 Pertemuan)...');

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of CHAPTERS_DATA) {
        console.log(
            `\n📚 Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`
        );

        // Cek apakah modul sudah ada (untuk batch berikutnya)
        const { data: existingModule } = await supabase
            .from('modules')
            .select('id')
            .eq('subject_id', subjectId)
            .eq('order_index', chapter.chapter_number)
            .maybeSingle();

        let moduleId: string;

        if (existingModule) {
            moduleId = existingModule.id;
            console.log(`   ℹ️  Bab sudah ada, menggunakan ID: ${moduleId}`);

            // Hapus lessons lama di bab ini untuk re-seed
            const { data: existingLessons } = await supabase
                .from('lessons')
                .select('id')
                .eq('module_id', moduleId);

            const oldLessonIds = (existingLessons ?? []).map((l) => l.id);

            if (oldLessonIds.length > 0) {
                const { data: existingAssignments } = await supabase
                    .from('assignments')
                    .select('id')
                    .in('lesson_id', oldLessonIds);

                const oldAssignmentIds = (existingAssignments ?? []).map((a) => a.id);

                if (oldAssignmentIds.length > 0) {
                    await supabase.from('quiz_questions').delete().in('assignment_id', oldAssignmentIds);
                    await supabase.from('submissions').delete().in('assignment_id', oldAssignmentIds);
                    await supabase.from('assignments').delete().in('id', oldAssignmentIds);
                }

                await supabase.from('lesson_schedules').delete().in('lesson_id', oldLessonIds);
                await supabase
                    .from('learning_competency_evaluations')
                    .delete()
                    .in('lesson_id', oldLessonIds);
                await supabase.from('lesson_completions').delete().in('lesson_id', oldLessonIds);
                await supabase.from('lessons').delete().in('id', oldLessonIds);
            }
        } else {
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

            moduleId = modData.id;
        }

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
    console.log('🎉 SEEDING BATCH 1 BERHASIL!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar & ${totalQuizzesCreated} soal CBT.`);
    console.log('');
    console.log('📊 Cakupan Batch 1:');
    console.log('   📚 Bab 1: Aku Mengenal Huruf (3 Pertemuan)');
    console.log('   📚 Bab 2: Aku Bisa Membaca Suku Kata (3 Pertemuan)');
    console.log('');
    console.log('🚀 Selanjutnya:');
    console.log('   → Batch 2: Bab 3-4 (Kata & Kalimat)');
    console.log('================================================================\n');
}

seedBahasaIndonesiaBatch1().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Batch 1:', err);
    process.exit(1);
});