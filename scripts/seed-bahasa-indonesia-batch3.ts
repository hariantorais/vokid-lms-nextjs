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
    // 📚 BAB 5: AKU BISA MENULIS (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 5,
        title: 'Bab 5 Aku Bisa Menulis',
        bi_field: 'Menulis Huruf & Kata',
        target_semester: 2,
        week_target: 13,
        lessons: [
            {
                title: 'Pertemuan 13: Menebalkan Huruf a-z',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menebalkan huruf a-z dengan rapi dan mulai menulis sendiri.',
                content_text: buildContentText({
                    title: 'Pertemuan 13: Menebalkan Huruf a-z',
                    field: 'Menulis Huruf & Kata',
                    objectives: [
                        'Menebalkan huruf a-z dengan rapi',
                        'Menulis huruf a-z sendiri',
                        'Mengenal bentuk huruf besar & kecil',
                    ],
                    subMaterial:
                        'Berlatih menulis **huruf a-z** dengan menebalkan titik-titik. Setiap huruf memiliki bentuk berbeda. Mulai dari huruf kecil, lalu huruf besar.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan instruksi menulis.',
                        membaca: 'Mengenal bentuk huruf a-z.',
                        berbicara: 'Menyebutkan huruf saat menulis.',
                        menulis: 'Menebalkan huruf a-z dengan rapi.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menulis huruf a? Bagaimana huruf b?',
                    activities: {
                        mindful:
                            'Guru menunjukkan cara menulis huruf. Siswa mengamati gerakan tangan.',
                        joyful:
                            'Permainan "Tebak Huruf" — guru menulis huruf di udara, siswa menebak.',
                        meaningful:
                            'Siswa menebalkan huruf a-z di LKPD.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku tulis berpetak',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kemandirian (menulis sendiri)',
                        'Penalaran Kritis (mengenal bentuk huruf)',
                        'Kreativitas (memperindah tulisan)',
                    ],
                    parentTips: [
                        'Ajak anak menulis huruf setiap hari',
                        'Beri contoh menulis yang rapi',
                        'Beri apresiasi saat anak menulis',
                        'Sediakan buku tulis berpetak',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak menulis huruf terbalik',
                            solution: 'gunakan panduan visual, tunjukkan bentuk yang benar',
                        },
                        {
                            issue: 'Anak cepat lelah menulis',
                            solution: 'beri waktu istirahat, mulai dari 5 menit per hari',
                        },
                    ],
                    extensions: [
                        'Bikin buku latihan menulis',
                        'Menulis di pasir dengan jari',
                        'Menulis huruf dengan cat air',
                    ],
                    appreciationStage:
                        'Pajang tulisan huruf anak di kamar.',
                    journal: [
                        'Hari 1: Tulis huruf a-f',
                        'Hari 2: Tulis huruf g-l',
                        'Hari 3: Tulis huruf m-r',
                        'Hari 4: Tulis huruf s-z',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Huruf apa yang paling mudah ditulis?',
                        'Huruf apa yang paling sulit?',
                    ],
                }),
                bi_field: 'Menulis Huruf & Kata',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku tulis berpetak',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat dan mengajak siswa berdoa.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "ABC".',
                    apperception:
                        'Guru bertanya: "Siapa bisa menulis huruf a?"',
                    trigger_question:
                        'Bagaimana cara menulis huruf a-z?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menulis huruf a-z dengan menebalkan titik.',
                    concrete_steps: [
                        'Guru menunjukkan cara menulis huruf a.',
                        'Siswa mengamati gerakan tangan.',
                        'Siswa menebalkan huruf a di LKPD.',
                        'Lanjut huruf b, c, d...',
                        'Ulangi 3x untuk setiap huruf.',
                    ],
                    script_parent:
                        '"Menulis dimulai dari kiri ke kanan. Yuk, tebalkan huruf a!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Huruf',
                    game_rules: [
                        'Guru menulis huruf di udara.',
                        'Siswa menebak hurufnya.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menebak dengan bantuan guru.',
                        child_level_advanced: 'Menebak & menulis sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menebalkan huruf a-z.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.1: MENEBALKAN HURUF A-Z',
                        instructions:
                            'Tebalkan huruf berikut dengan pensil, lalu coba tulis sendiri di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'TRACE_LETTER',
                                question: 'Tebalkan huruf a-f berikut!',
                                data: {
                                    letters: [
                                        { letter: 'a', word: 'apel', icon: '🍎' },
                                        { letter: 'b', word: 'bola', icon: '⚽' },
                                        { letter: 'c', word: 'cangkir', icon: '☕' },
                                        { letter: 'd', word: 'dadu', icon: '🎲' },
                                        { letter: 'e', word: 'es', icon: '🧊' },
                                        { letter: 'f', word: 'foto', icon: '📷' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan huruf a-f.',
                                explanation: 'Latihan menulis huruf.',
                            },
                            {
                                id: 2,
                                type: 'TRACE_LETTER',
                                question: 'Tebalkan huruf g-l berikut!',
                                data: {
                                    letters: [
                                        { letter: 'g', word: 'gajah', icon: '🐘' },
                                        { letter: 'h', word: 'hijau', icon: '💚' },
                                        { letter: 'i', word: 'ikan', icon: '🐟' },
                                        { letter: 'j', word: 'jam', icon: '⏰' },
                                        { letter: 'k', word: 'kucing', icon: '🐱' },
                                        { letter: 'l', word: 'lilin', icon: '🕯️' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan huruf g-l.',
                                explanation: 'Latihan menulis huruf.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'TRACE_LETTER',
                                question: 'Tebalkan huruf m-z berikut!',
                                data: {
                                    letters: [
                                        { letter: 'm', word: 'meja', icon: '🪑' },
                                        { letter: 'n', word: 'nasi', icon: '🍚' },
                                        { letter: 'o', word: 'obat', icon: '💊' },
                                        { letter: 'p', word: 'pintu', icon: '🚪' },
                                        { letter: 'q', word: 'quran', icon: '📖' },
                                        { letter: 'r', word: 'roti', icon: '🍞' },
                                        { letter: 's', word: 'sapu', icon: '🧹' },
                                        { letter: 't', word: 'topi', icon: '🧢' },
                                        { letter: 'u', word: 'ular', icon: '🐍' },
                                        { letter: 'v', word: 'vas', icon: '🏺' },
                                        { letter: 'w', word: 'wortel', icon: '🥕' },
                                        { letter: 'x', word: 'xilofon', icon: '🎵' },
                                        { letter: 'y', word: 'yoyo', icon: '🪀' },
                                        { letter: 'z', word: 'zebra', icon: '🦓' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan huruf m-z.',
                                explanation: 'Latihan menulis huruf.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Huruf apa yang paling mudah ditulis?',
                        'Huruf apa yang paling sulit?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menebalkan huruf a-z pada LKPD 5.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 14: Menulis Suku Kata',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menulis suku kata dengan rapi.',
                content_text: buildContentText({
                    title: 'Pertemuan 14: Menulis Suku Kata',
                    field: 'Menulis Huruf & Kata',
                    objectives: [
                        'Menulis suku kata 2 huruf (ba, bi, bu)',
                        'Menulis suku kata 3 huruf (ban, bin, bun)',
                        'Menulis suku kata dengan rapi',
                    ],
                    subMaterial:
                        'Menulis **suku kata** dengan rapi. Mulai dari 2 huruf (ba-bi-bu), lalu 3 huruf (ban-bin-bun), hingga 4 huruf (buku, bola, kaki).',
                    cpHolistic: {
                        menyimak: 'Mendengarkan suku kata.',
                        membaca: 'Membaca suku kata.',
                        berbicara: 'Menyebutkan suku kata.',
                        menulis: 'Menulis suku kata dengan rapi.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menulis suku kata "ba"?',
                    activities: {
                        mindful:
                            'Guru menunjukkan cara menulis suku kata. Siswa mengamati.',
                        joyful:
                            'Permainan "Tulis Suku Kata" — guru menyebutkan, siswa menulis di udara.',
                        meaningful:
                            'Siswa menulis suku kata di LKPD.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku tulis berpetak',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kemandirian (menulis)',
                        'Penalaran Kritis (menyambung)',
                        'Kreativitas (memperindah tulisan)',
                    ],
                    parentTips: [
                        'Ajak anak menulis suku kata setiap hari',
                        'Beri contoh menulis rapi',
                        'Beri apresiasi',
                        'Sediakan buku tulis berpetak',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung menyambung',
                            solution: 'tulis huruf satu per satu, baru gabung',
                        },
                        {
                            issue: 'Anak menulis terlalu besar',
                            solution: 'beri panduan ukuran, latih di buku berpetak',
                        },
                    ],
                    extensions: [
                        'Menulis suku kata di pasir',
                        'Bikin buku suku kata',
                        'Menulis suku kata dengan warna',
                    ],
                    appreciationStage:
                        'Pajang tulisan suku kata anak.',
                    journal: [
                        'Hari 1: Tulis ba-bi-bu',
                        'Hari 2: Tulis ca-ci-cu',
                        'Hari 3: Tulis da-di-du',
                        'Hari 4: Tulis ka-ki-ku',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Suku kata apa yang paling mudah ditulis?',
                        'Suku kata apa yang paling sulit?',
                    ],
                }),
                bi_field: 'Menulis Huruf & Kata',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku tulis berpetak',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu suku kata.',
                    apperception:
                        'Guru bertanya: "Siapa bisa menulis ba?"',
                    trigger_question:
                        'Bagaimana cara menulis suku kata "ba"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menulis suku kata dengan rapi.',
                    concrete_steps: [
                        'Guru menunjukkan cara menulis "ba".',
                        'Siswa mengamati.',
                        'Siswa menulis "ba" di buku berpetak.',
                        'Lanjut bi, bu, be, bo.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Suku kata ditulis dengan menyambung huruf. Yuk, tulis ba!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tulis Suku Kata',
                    game_rules: [
                        'Guru menyebutkan suku kata.',
                        'Siswa menulis di udara.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menulis dengan bantuan guru.',
                        child_level_advanced: 'Menulis sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menulis suku kata.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.2: MENULIS SUKU KATA',
                        instructions:
                            'Tebalkan suku kata berikut, lalu tulis sendiri di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata berikut, lalu tulis hasilnya!',
                                data: {
                                    syllables: [
                                        { part1: 'b', part2: 'a', result: 'ba', icon: '🏠' },
                                        { part1: 'b', part2: 'i', result: 'bi', icon: '🐝' },
                                        { part1: 'b', part2: 'u', result: 'bu', icon: '📚' },
                                    ],
                                },
                                answer_key: 'ba, bi, bu',
                                explanation: 'Menyambung suku kata.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis suku kata berikut di baris kosong!',
                                data: {
                                    lines: 5,
                                    prompt: 'Tulis suku kata:',
                                    example: 'ba - bi - bu - be - bo',
                                },
                                answer_key: 'Siswa menulis suku kata.',
                                explanation: 'Latihan menulis.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata menjadi kata, lalu tulis!',
                                data: {
                                    syllables: [
                                        { part1: 'bo', part2: 'la', result: 'bola', icon: '⚽' },
                                        { part1: 'bu', part2: 'ku', result: 'buku', icon: '📚' },
                                        { part1: 'ka', part2: 'ki', result: 'kaki', icon: '🦶' },
                                    ],
                                },
                                answer_key: 'bola, buku, kaki',
                                explanation: 'Menyambung suku kata jadi kata.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Suku kata apa yang paling mudah ditulis?',
                        'Suku kata apa yang paling sulit?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menulis suku kata pada LKPD 5.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 15: Menulis Nama Sendiri',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menulis nama lengkap sendiri dengan rapi.',
                content_text: buildContentText({
                    title: 'Pertemuan 15: Menulis Nama Sendiri',
                    field: 'Menulis Huruf & Kata',
                    objectives: [
                        'Menulis nama sendiri dengan rapi',
                        'Mengenal huruf awal nama sendiri',
                        'Bersyukur memiliki nama yang indah',
                    ],
                    subMaterial:
                        'Menulis **nama sendiri** dengan rapi. Nama adalah identitas yang indah. Contoh: "Aisyah", "Budi", "Citra". Mulai dari huruf awal, lalu lanjutkan sampai selesai.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan nama sendiri.',
                        membaca: 'Membaca nama sendiri.',
                        berbicara: 'Menyebutkan nama sendiri.',
                        menulis: 'Menulis nama sendiri dengan rapi.',
                    },
                    triggerQuestion:
                        'Siapa bisa menulis namanya sendiri?',
                    activities: {
                        mindful:
                            'Guru menunjukkan cara menulis nama. Siswa mengamati.',
                        joyful:
                            'Permainan "Tulis Nama" — siswa menulis nama di papan tulis bergantian.',
                        meaningful:
                            'Siswa menulis nama sendiri di LKPD.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku tulis berpetak',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kemandirian (menulis nama)',
                        'Keimanan & Ketakwaan (syukur nama)',
                        'Kreativitas (memperindah)',
                    ],
                    parentTips: [
                        'Ajak anak menulis nama setiap hari',
                        'Ceritakan arti nama anak',
                        'Beri apresiasi',
                        'Bikin name tag bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung huruf besar-kecil',
                            solution: 'jelaskan huruf awal kapital, sisanya kecil',
                        },
                        {
                            issue: 'Anak menulis nama terlalu miring',
                            solution: 'beri panduan garis lurus di buku berpetak',
                        },
                    ],
                    extensions: [
                        'Bikin name tag cantik',
                        'Menulis nama di buku',
                        'Bikin tanda tangan sederhana',
                    ],
                    appreciationStage:
                        'Pajang tulisan nama anak. Ajak bercerita arti nama.',
                    journal: [
                        'Hari 1: Tulis huruf awal nama',
                        'Hari 2: Tulis nama pendek',
                        'Hari 3: Tulis nama lengkap',
                        'Hari 4: Tulis nama di buku',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Apa huruf awal namamu?',
                        'Bagaimana perasaanmu menulis namamu?',
                    ],
                }),
                bi_field: 'Menulis Huruf & Kata',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku tulis berpetak',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu nama.',
                    apperception:
                        'Guru bertanya: "Siapa bisa menulis namanya?"',
                    trigger_question:
                        'Siapa bisa menulis namanya sendiri?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menulis nama sendiri dengan rapi.',
                    concrete_steps: [
                        'Guru menunjukkan cara menulis nama.',
                        'Siswa mengamati.',
                        'Siswa menulis nama di buku berpetak.',
                        'Guru berkeliling memeriksa.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Nama adalah identitas yang indah. Yuk, tulis namamu dengan rapi!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tulis Nama',
                    game_rules: [
                        'Guru menyebutkan nama siswa.',
                        'Siswa menulis di papan tulis.',
                        'Yang paling rapi diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menulis dengan bantuan guru.',
                        child_level_advanced: 'Menulis sendiri dengan rapi.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menulis nama sendiri.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.3: MENULIS NAMA SENDIRI',
                        instructions:
                            'Tulis nama lengkapmu di baris kosong dengan rapi!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'WRITING_LINES',
                                question: 'Tulis nama lengkapmu di baris kosong!',
                                data: {
                                    lines: 3,
                                    prompt: 'Namaku:',
                                    example: 'Contoh: Aisyah Putri',
                                },
                                answer_key: 'Siswa menulis nama sendiri.',
                                explanation: 'Latihan menulis nama.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu dan tulis namamu di bawah gambar!',
                                data: {
                                    prompt: 'Aku dan namaku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku dan namaku:',
                                },
                                answer_key: 'Siswa menggambar diri & menulis nama.',
                                explanation: 'Melatih kreativitas & identitas.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah menulis namamu?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah menulis namamu?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bangga' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Belum Rapi' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa huruf awal namamu?',
                        'Bagaimana perasaanmu menulis namamu?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menulis nama pada LKPD 5.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 5: Aku Bisa Menulis',
                        quiz_questions: [
                            {
                                question_text: 'Menulis dimulai dari arah...',
                                option_a: 'Kanan ke kiri',
                                option_b: 'Kiri ke kanan',
                                option_c: 'Atas ke bawah',
                                option_d: 'Bawah ke atas',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Huruf awal nama biasanya ditulis dengan...',
                                option_a: 'Huruf kecil',
                                option_b: 'Huruf kapital',
                                option_c: 'Angka',
                                option_d: 'Simbol',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Suku kata "ba" terdiri dari huruf...',
                                option_a: 'b dan a',
                                option_b: 'a dan b',
                                option_c: 'b saja',
                                option_d: 'a saja',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Saat menulis, sebaiknya kita...',
                                option_a: 'Tergesa-gesa',
                                option_b: 'Dengan rapi',
                                option_c: 'Sambil bermain',
                                option_d: 'Sambil tidur',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 📚 BAB 6: AKU MEMBACA KALIMAT (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 6,
        title: 'Bab 6 Aku Membaca Kalimat',
        bi_field: 'Membaca Kalimat',
        target_semester: 2,
        week_target: 16,
        lessons: [
            {
                title: 'Pertemuan 16: Kalimat 3 Kata',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu membaca kalimat 3 kata dengan lancar.',
                content_text: buildContentText({
                    title: 'Pertemuan 16: Kalimat 3 Kata',
                    field: 'Membaca Kalimat',
                    objectives: [
                        'Membaca kalimat 3 kata dengan lancar',
                        'Memahami arti kalimat sederhana',
                        'Menulis kalimat 3 kata',
                    ],
                    subMaterial:
                        'Membaca **kalimat 3 kata**: "Ayah baca buku.", "Ibu masak nasi.", "Adik main bola." Setiap kalimat diawali huruf kapital dan diakhiri tanda titik.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan kalimat 3 kata.',
                        membaca: 'Membaca kalimat 3 kata.',
                        berbicara: 'Mengucapkan kalimat dengan jelas.',
                        menulis: 'Menulis kalimat 3 kata.',
                    },
                    triggerQuestion:
                        'Bagaimana cara membaca kalimat "Ayah baca buku."?',
                    activities: {
                        mindful:
                            'Guru membaca kalimat 3 kata. Siswa menirukan.',
                        joyful:
                            'Permainan "Baca Cepat" — siswa membaca kalimat dengan cepat.',
                        meaningful:
                            'Siswa membaca & menulis kalimat 3 kata.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kalimat',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (membaca)',
                        'Penalaran Kritis (memahami)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak membaca kalimat setiap hari',
                        'Beri contoh kalimat pendek',
                        'Beri apresiasi',
                        'Bacakan buku cerita',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung tanda titik',
                            solution: 'jelaskan titik akhir kalimat',
                        },
                        {
                            issue: 'Anak terlewat kata',
                            solution: 'tunjuk kata satu per satu',
                        },
                    ],
                    extensions: [
                        'Bikin kalimat sendiri',
                        'Bikin buku kalimat',
                        'Bikin cerita pendek',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa baca & tulis kalimat.',
                    journal: [
                        'Hari 1: Baca "Ayah baca buku."',
                        'Hari 2: Baca "Ibu masak nasi."',
                        'Hari 3: Baca "Adik main bola."',
                        'Hari 4: Tulis kalimat',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Kalimat apa yang paling mudah dibaca?',
                        'Bagaimana cara menulis kalimat?',
                    ],
                }),
                bi_field: 'Membaca Kalimat',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu kalimat',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu.',
                    apperception:
                        'Guru bertanya: "Siapa bisa baca kalimat 3 kata?"',
                    trigger_question:
                        'Bagaimana cara membaca kalimat "Ayah baca buku."?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca kalimat 3 kata dengan lancar.',
                    concrete_steps: [
                        'Guru menunjukkan kalimat "Ayah baca buku."',
                        'Siswa membaca bersama.',
                        'Lanjut "Ibu masak nasi." & "Adik main bola."',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Kalimat 3 kata dibaca lancar. Yuk, baca kalimat!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Baca Cepat',
                    game_rules: [
                        'Guru menunjukkan kartu kalimat.',
                        'Siswa membaca dengan cepat.',
                        'Yang paling jelas diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & menulis kalimat 3 kata.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.1: KALIMAT 3 KATA',
                        instructions:
                            'Baca kalimat, lalu tulis di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question: 'Baca kalimat 3 kata berikut dengan nyaring!',
                                data: {
                                    sentences: [
                                        { text: 'Ayah baca buku.', icon: '👨' },
                                        { text: 'Ibu masak nasi.', icon: '👩' },
                                        { text: 'Adik main bola.', icon: '👶' },
                                    ],
                                },
                                answer_key: 'Siswa membaca kalimat.',
                                explanation: 'Membaca kalimat 3 kata.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis kalimat berikut di baris kosong!',
                                data: {
                                    lines: 3,
                                    prompt: 'Tulis kalimat:',
                                    example: 'Ayah baca buku. Ibu masak nasi.',
                                },
                                answer_key: 'Siswa menulis kalimat.',
                                explanation: 'Latihan menulis kalimat.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah sesuai kalimat "Ibu masak nasi."!',
                                data: {
                                    prompt: 'Ibu masak nasi',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Ibu masak nasi:',
                                },
                                answer_key: 'Siswa menggambar ibu masak.',
                                explanation: 'Memahami arti kalimat.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kalimat apa yang paling mudah dibaca?',
                        'Bagaimana cara menulis kalimat?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca kalimat: "Ayah baca buku. Ibu masak nasi. Adik main bola."',
                    },
                ],
            },
            {
                title: 'Pertemuan 17: Kalimat 4 Kata',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu membaca kalimat 4 kata dengan lancar.',
                content_text: buildContentText({
                    title: 'Pertemuan 17: Kalimat 4 Kata',
                    field: 'Membaca Kalimat',
                    objectives: [
                        'Membaca kalimat 4 kata dengan lancar',
                        'Memahami arti kalimat 4 kata',
                        'Menulis kalimat 4 kata',
                    ],
                    subMaterial:
                        'Membaca **kalimat 4 kata**: "Ayah membaca buku baru.", "Ibu memasak nasi goreng.", "Adik bermain bola di halaman." Setiap kalimat diawali kapital dan diakhiri titik.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan kalimat 4 kata.',
                        membaca: 'Membaca kalimat 4 kata.',
                        berbicara: 'Mengucapkan kalimat dengan lancar.',
                        menulis: 'Menulis kalimat 4 kata.',
                    },
                    triggerQuestion:
                        'Bagaimana cara membaca kalimat 4 kata?',
                    activities: {
                        mindful:
                            'Guru membaca kalimat 4 kata. Siswa menirukan.',
                        joyful:
                            'Permainan "Puzzle Kalimat" — siswa menyusun kata menjadi kalimat.',
                        meaningful:
                            'Siswa membaca & menulis kalimat 4 kata.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kata',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (membaca)',
                        'Penalaran Kritis (menyusun)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak membaca kalimat 4 kata',
                        'Beri contoh kalimat',
                        'Beri apresiasi',
                        'Bacakan buku cerita',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung urutan kata',
                            solution: 'susun kartu kata satu per satu',
                        },
                        {
                            issue: 'Anak terlewat kata',
                            solution: 'tunjuk kata per kata',
                        },
                    ],
                    extensions: [
                        'Bikin kalimat sendiri',
                        'Bikin puzzle kalimat',
                        'Bikin cerita 4 kalimat',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa baca kalimat 4 kata.',
                    journal: [
                        'Hari 1: Baca "Ayah membaca buku baru."',
                        'Hari 2: Baca "Ibu memasak nasi goreng."',
                        'Hari 3: Baca "Adik bermain bola di halaman."',
                        'Hari 4: Tulis kalimat',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Kalimat apa yang paling mudah?',
                        'Bagaimana cara menyusun kata jadi kalimat?',
                    ],
                }),
                bi_field: 'Membaca Kalimat',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu.',
                    apperception:
                        'Guru bertanya: "Siapa bisa baca kalimat 4 kata?"',
                    trigger_question:
                        'Bagaimana cara membaca kalimat 4 kata?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca kalimat 4 kata dengan lancar.',
                    concrete_steps: [
                        'Guru menunjukkan kalimat 4 kata.',
                        'Siswa membaca bersama.',
                        'Lanjut kalimat lain.',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Kalimat 4 kata dibaca lancar. Yuk, baca!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Puzzle Kalimat',
                    game_rules: [
                        'Guru membagikan kartu kata.',
                        'Siswa menyusun menjadi kalimat.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyusun dengan bantuan guru.',
                        child_level_advanced: 'Menyusun sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & menyusun kalimat 4 kata.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.2: KALIMAT 4 KATA',
                        instructions:
                            'Baca kalimat 4 kata, lalu susun kata menjadi kalimat!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question: 'Baca kalimat 4 kata berikut dengan nyaring!',
                                data: {
                                    sentences: [
                                        { text: 'Ayah membaca buku baru.', icon: '📚' },
                                        { text: 'Ibu memasak nasi goreng.', icon: '🍳' },
                                        { text: 'Adik bermain bola di halaman.', icon: '⚽' },
                                    ],
                                },
                                answer_key: 'Siswa membaca kalimat 4 kata.',
                                explanation: 'Membaca kalimat 4 kata.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis kalimat berikut di baris kosong!',
                                data: {
                                    lines: 3,
                                    prompt: 'Tulis kalimat:',
                                    example: 'Ayah membaca buku baru.',
                                },
                                answer_key: 'Siswa menulis kalimat.',
                                explanation: 'Latihan menulis.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question:
                                    'Jodohkan kalimat dengan gambar yang sesuai!',
                                data: {
                                    pairs: [
                                        { left: 'Ayah membaca buku baru', right: '📚' },
                                        { left: 'Ibu memasak nasi goreng', right: '🍳' },
                                        { left: 'Adik bermain bola', right: '⚽' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan kalimat & gambar.',
                                explanation: 'Memahami arti kalimat.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kalimat apa yang paling mudah?',
                        'Bagaimana cara menyusun kata jadi kalimat?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca: "Ayah membaca buku baru. Ibu memasak nasi goreng."',
                    },
                ],
            },
            {
                title: 'Pertemuan 18: Tanda Titik & Tanda Tanya',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu membedakan dan menggunakan tanda titik (.) dan tanda tanya (?) dengan tepat.',
                content_text: buildContentText({
                    title: 'Pertemuan 18: Tanda Titik & Tanda Tanya',
                    field: 'Membaca Kalimat',
                    objectives: [
                        'Mengenal tanda titik (.) dan tanda tanya (?)',
                        'Membedakan kalimat berita & kalimat tanya',
                        'Menulis kalimat dengan tanda yang tepat',
                    ],
                    subMaterial:
                        'Mengenal **tanda titik (.)** untuk kalimat berita: "Aku suka buku." Dan **tanda tanya (?)** untuk kalimat tanya: "Siapa namamu?" Setiap kalimat diakhiri tanda yang sesuai.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan intonasi kalimat tanya & berita.',
                        membaca: 'Membaca kalimat dengan tanda yang tepat.',
                        berbicara: 'Membedakan intonasi kalimat.',
                        menulis: 'Menulis kalimat dengan tanda yang tepat.',
                    },
                    triggerQuestion:
                        'Apa bedanya tanda titik (.) & tanda tanya (?)?',
                    activities: {
                        mindful:
                            'Guru menjelaskan tanda titik & tanda tanya. Siswa mendengarkan contoh.',
                        joyful:
                            'Permainan "Tebak Tanda" — guru membacakan kalimat, siswa menebak tandanya.',
                        meaningful:
                            'Siswa membaca & menulis kalimat dengan tanda tepat.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu tanda baca',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (membedakan)',
                        'Komunikasi (intonasi)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak membedakan kalimat tanya & berita',
                        'Beri contoh intonasi yang berbeda',
                        'Beri apresiasi',
                        'Bacakan buku dengan intonasi',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan tanda',
                            solution: 'gunakan intonasi berbeda saat membaca',
                        },
                        {
                            issue: 'Anak salah menempatkan tanda',
                            solution: 'beri contoh berulang',
                        },
                    ],
                    extensions: [
                        'Bikin kalimat tanya',
                        'Bikin kalimat berita',
                        'Bikin cerita dengan tanda tepat',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa membedakan tanda.',
                    journal: [
                        'Hari 1: Baca kalimat berita',
                        'Hari 2: Baca kalimat tanya',
                        'Hari 3: Bedakan tanda',
                        'Hari 4: Tulis kalimat',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Apa bedanya titik & tanya?',
                        'Kapan pakai tanda titik?',
                    ],
                }),
                bi_field: 'Membaca Kalimat',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu tanda baca',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi.',
                    apperception:
                        'Guru bertanya: "Apa bedanya titik & tanya?"',
                    trigger_question:
                        'Apa bedanya tanda titik (.) & tanda tanya (?)?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tanda titik (.) untuk kalimat berita, tanda tanya (?) untuk kalimat tanya.',
                    concrete_steps: [
                        'Guru menunjukkan kalimat berita: "Aku suka buku."',
                        'Guru menunjukkan kalimat tanya: "Siapa namamu?"',
                        'Siswa membedakan intonasi.',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Tanda titik untuk berita, tanda tanya untuk bertanya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Tanda',
                    game_rules: [
                        'Guru membacakan kalimat.',
                        'Siswa menebak tandanya.',
                        'Yang paling cepat & tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membedakan tanda & menulis kalimat.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.3: TANDA TITIK & TANDA TANYA',
                        instructions:
                            'Baca kalimat, lalu tentukan tanda yang tepat!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question: 'Baca kalimat berikut dengan intonasi yang tepat!',
                                data: {
                                    sentences: [
                                        { text: 'Aku suka buku.', icon: '📚' },
                                        { text: 'Siapa namamu?', icon: '❓' },
                                        { text: 'Ini bola Budi.', icon: '⚽' },
                                        { text: 'Apa itu?', icon: '❓' },
                                    ],
                                },
                                answer_key: 'Siswa membaca dengan intonasi tepat.',
                                explanation: 'Membedakan kalimat berita & tanya.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question:
                                    'Jodohkan kalimat dengan tanda yang tepat!',
                                data: {
                                    pairs: [
                                        { left: 'Aku suka buku', right: 'Titik (.)' },
                                        { left: 'Siapa namamu', right: 'Tanya (?)' },
                                    ],
                                },
                                answer_key: 'Berita→titik, Tanya→tanda tanya.',
                                explanation: 'Mencocokkan kalimat & tanda.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'WRITING_LINES',
                                question:
                                    'Buat 2 kalimat berita dan 2 kalimat tanya!',
                                data: {
                                    lines: 4,
                                    prompt: 'Kalimatku:',
                                    example: 'Aku suka bola. Apa itu?',
                                },
                                answer_key: 'Siswa menulis kalimat.',
                                explanation: 'Latihan membuat kalimat.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa bedanya titik & tanya?',
                        'Kapan pakai tanda titik?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca dengan intonasi tepat: "Aku suka buku. Siapa namamu?"',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 6: Aku Membaca Kalimat',
                        quiz_questions: [
                            {
                                question_text: 'Kalimat berita diakhiri dengan tanda...',
                                option_a: 'Titik (.)',
                                option_b: 'Tanya (?)',
                                option_c: 'Seru (!)',
                                option_d: 'Koma (,)',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kalimat "Siapa namamu?" diakhiri dengan...',
                                option_a: 'Titik (.)',
                                option_b: 'Tanya (?)',
                                option_c: 'Seru (!)',
                                option_d: 'Koma (,)',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Kalimat "Ayah baca buku." adalah kalimat...',
                                option_a: 'Tanya',
                                option_b: 'Berita',
                                option_c: 'Seru',
                                option_d: 'Larangan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Kalimat tanya dibaca dengan intonasi...',
                                option_a: 'Datar',
                                option_b: 'Naik di akhir',
                                option_c: 'Turun di akhir',
                                option_d: 'Berteriak',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedBahasaIndonesiaBatch3() {
    console.log('================================================================');
    console.log('📚 SEEDING BAHASA INDONESIA FASE A KELAS 1 - BATCH 3');
    console.log('   Bab 5-6 (Semester 2, 6 Pertemuan)');
    console.log('================================================================');
    console.log('⚠️  Ini adalah DRAF. Perlu divalidasi dengan buku resmi.');
    console.log('================================================================');

    console.log('\n🏫 [1/3] Menemukan Kelas 1 SD...');

    const { data: existingClass } = await supabase
        .from('classes')
        .select('id')
        .eq('grade_level', 1)
        .maybeSingle();

    if (!existingClass) {
        console.error('❌ Kelas 1 SD belum dibuat! Jalankan Batch 1 dulu.');
        process.exit(1);
    }

    const classId = existingClass.id;
    console.log(`   ✓ Kelas 1 SD ditemukan (ID: ${classId})`);

    console.log('\n📚 [2/3] Menemukan Mapel Bahasa Indonesia...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('name', 'Bahasa Indonesia')
        .maybeSingle();

    if (!existingSubject) {
        console.error('❌ Mapel Bahasa Indonesia belum ada! Jalankan Batch 1 dulu.');
        process.exit(1);
    }

    const subjectId = existingSubject.id;
    console.log(`   ✓ Mapel Bahasa Indonesia ditemukan (ID: ${subjectId})`);

    console.log('\n📚 [3/3] Menyimpan Bab 5-6 (6 Pertemuan)...');

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of CHAPTERS_DATA) {
        console.log(
            `\n📚 Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`
        );

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
    console.log('🎉 SEEDING BATCH 3 BERHASIL!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar & ${totalQuizzesCreated} soal CBT.`);
    console.log('');
    console.log('📊 Cakupan Batch 3:');
    console.log('   📚 Bab 5: Aku Bisa Menulis (3 Pertemuan)');
    console.log('   📚 Bab 6: Aku Membaca Kalimat (3 Pertemuan)');
    console.log('');
    console.log('🚀 Selanjutnya:');
    console.log('   → Batch 4: Bab 7-8 (Cerita & Menulis Cerita)');
    console.log('================================================================\n');
}

seedBahasaIndonesiaBatch3().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Batch 3:', err);
    process.exit(1);
});