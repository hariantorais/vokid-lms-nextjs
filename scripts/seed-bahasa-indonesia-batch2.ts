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
    // 📚 BAB 3: AKU DAN KELUARGAKU (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 3,
        title: 'Bab 3 Aku dan Keluargaku',
        bi_field: 'Membaca Kata Sehari-hari',
        target_semester: 1,
        week_target: 7,
        lessons: [
            {
                title: 'Pertemuan 7: Membaca Nama Keluarga (ayah, ibu, kakak, adik)',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu membaca dan menulis nama anggota keluarga inti.',
                content_text: buildContentText({
                    title: 'Pertemuan 7: Membaca Nama Keluarga',
                    field: 'Membaca Kata Sehari-hari',
                    objectives: [
                        'Membaca kata ayah, ibu, kakak, adik',
                        'Menyebutkan anggota keluarga inti',
                        'Menulis nama anggota keluarga',
                    ],
                    subMaterial:
                        'Membaca **nama anggota keluarga**: ayah, ibu, kakak, adik. Setiap kata bisa dipecah menjadi suku kata: a-yah, i-bu, ka-kak, a-dik.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan kata anggota keluarga.',
                        membaca: 'Membaca kata ayah, ibu, kakak, adik.',
                        berbicara: 'Menyebutkan nama anggota keluarga.',
                        menulis: 'Menulis nama anggota keluarga.',
                    },
                    triggerQuestion:
                        'Siapa saja anggota keluargamu? Bagaimana cara menulis namanya?',
                    activities: {
                        mindful:
                            'Guru mengenalkan nama anggota keluarga. Siswa membaca bersama.',
                        joyful:
                            'Permainan "Kartu Keluarga" — guru menunjukkan gambar, siswa membaca & menyebutkan peran.',
                        meaningful:
                            'Siswa membaca, mencocokkan, & menulis nama anggota keluarga.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kata anggota keluarga',
                        'Foto keluarga (opsional)',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta keluarga)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan nama anggota keluarga',
                        'Baca buku cerita tentang keluarga',
                        'Beri apresiasi',
                        'Bikin pohon keluarga bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan kakak & adik',
                            solution: 'jelaskan kakak lebih tua, adik lebih muda',
                        },
                        {
                            issue: 'Anak sulit menulis "keluarga"',
                            solution: 'pecah jadi suku kata: ke-lu-ar-ga',
                        },
                    ],
                    extensions: [
                        'Bikin buku "Keluargaku"',
                        'Wawancarai anggota keluarga',
                        'Bikin pohon keluarga',
                    ],
                    appreciationStage: 'Pajang gambar keluarga anak di kamar.',
                    journal: [
                        'Hari 1: Baca "ayah"',
                        'Hari 2: Baca "ibu"',
                        'Hari 3: Baca "kakak"',
                        'Hari 4: Baca "adik"',
                        'Hari 5: Tulis nama keluarga',
                    ],
                    reflection: [
                        'Kata "ayah" terdiri dari berapa suku kata?',
                        'Bagaimana cara menulis "ibu"?',
                    ],
                }),
                bi_field: 'Membaca Kata Sehari-hari',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat dan mengajak siswa berdoa.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu "Kasih Ibu".',
                    apperception:
                        'Guru bertanya: "Siapa saja anggota keluargamu?"',
                    trigger_question:
                        'Siapa saja anggota keluargamu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca & menulis nama anggota keluarga inti.',
                    concrete_steps: [
                        'Guru menunjukkan kartu kata "ayah".',
                        'Siswa membaca "ayah" bersama.',
                        'Lanjut "ibu", "kakak", "adik".',
                        'Siswa berlatih membaca berulang.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent:
                        '"Yuk, baca nama anggota keluarga: ayah, ibu, kakak, adik!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Kartu Keluarga',
                    game_rules: [
                        'Guru menunjukkan gambar anggota keluarga.',
                        'Siswa membaca nama & menyebutkan perannya.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membaca dengan bantuan guru.',
                        child_level_advanced: 'Membaca tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & menulis nama keluarga.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: MEMBACA NAMA KELUARGA',
                        instructions:
                            'Baca kata, cocokkan dengan gambar, lalu tulis di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READ_AND_MATCH',
                                question: 'Baca kata, lalu cocokkan dengan gambar yang sesuai!',
                                data: {
                                    words: [
                                        { word: 'ayah', icon: '👨' },
                                        { word: 'ibu', icon: '👩' },
                                        { word: 'kakak', icon: '👦' },
                                        { word: 'adik', icon: '👶' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan kata dengan gambar.',
                                explanation: 'Membaca nama keluarga.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis nama anggota keluargamu!',
                                data: {
                                    lines: 4,
                                    prompt: 'Tulis nama anggota keluargamu:',
                                    example: 'ayah, ibu, kakak, adik',
                                },
                                answer_key: 'Siswa menulis nama anggota keluarga.',
                                explanation: 'Latihan menulis.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah keluargamu!',
                                data: {
                                    prompt: 'Keluargaku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Keluargaku:',
                                },
                                answer_key: 'Siswa menggambar keluarga.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kata "ayah" terdiri dari berapa suku kata?',
                        'Bagaimana cara menulis "ibu"?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca: ayah, ibu, kakak, adik dengan jelas!',
                    },
                ],
            },
            {
                title: 'Pertemuan 8: Kata Sehari-hari di Rumah (meja, kursi, pintu, jendela)',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu membaca dan menulis kata benda di rumah.',
                content_text: buildContentText({
                    title: 'Pertemuan 8: Kata Sehari-hari di Rumah',
                    field: 'Membaca Kata Sehari-hari',
                    objectives: [
                        'Membaca kata benda di rumah',
                        'Menyebutkan benda di rumah',
                        'Menulis kata benda di rumah',
                    ],
                    subMaterial:
                        'Membaca **kata benda di rumah**: meja, kursi, pintu, jendela, lampu, kasur. Setiap kata dipecah menjadi suku kata: me-ja, kur-si, pin-tu, jen-de-la.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan kata benda di rumah.',
                        membaca: 'Membaca kata meja, kursi, pintu.',
                        berbicara: 'Menyebutkan benda di rumah.',
                        menulis: 'Menulis kata benda di rumah.',
                    },
                    triggerQuestion:
                        'Benda apa saja yang ada di rumahmu? Bagaimana cara membacanya?',
                    activities: {
                        mindful:
                            'Guru mengenalkan kata benda di rumah dengan gambar. Siswa membaca bersama.',
                        joyful:
                            'Permainan "Tebak Benda" — guru menyebutkan ciri, siswa menebak benda & membaca namanya.',
                        meaningful:
                            'Siswa membaca, mencocokkan, & menulis kata benda.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kata benda',
                        'Gambar benda rumah',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kewargaan (cinta rumah)',
                        'Komunikasi (melafalkan)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak menyebutkan benda di rumah',
                        'Sebutkan nama benda dengan suku kata',
                        'Beri apresiasi',
                        'Bikin label nama benda di rumah',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan meja & kursi',
                            solution: 'tunjukkan benda langsung',
                        },
                        {
                            issue: 'Anak sulit menulis "jendela"',
                            solution: 'pecah jadi suku kata: jen-de-la',
                        },
                    ],
                    extensions: [
                        'Bikin label nama benda di rumah',
                        'Bikin buku "Benda di Rumahku"',
                        'Mencari benda dengan suku kata tertentu',
                    ],
                    appreciationStage: 'Pajang buku benda di rumah anak.',
                    journal: [
                        'Hari 1: Baca "meja"',
                        'Hari 2: Baca "kursi"',
                        'Hari 3: Baca "pintu"',
                        'Hari 4: Baca "jendela"',
                        'Hari 5: Tulis nama benda',
                    ],
                    reflection: [
                        'Benda apa saja di rumahmu?',
                        'Bagaimana cara membaca "jendela"?',
                    ],
                }),
                bi_field: 'Membaca Kata Sehari-hari',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Kartu kata',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu tentang rumah.',
                    apperception:
                        'Guru bertanya: "Benda apa saja di rumahmu?"',
                    trigger_question:
                        'Benda apa saja yang ada di rumahmu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca & menulis kata benda di rumah.',
                    concrete_steps: [
                        'Guru menunjukkan kartu kata "meja".',
                        'Siswa membaca "meja" bersama.',
                        'Lanjut kursi, pintu, jendela.',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Benda di rumah punya nama! Yuk, baca meja, kursi, pintu, jendela."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Benda',
                    game_rules: [
                        'Guru menyebutkan ciri benda.',
                        'Siswa menebak nama benda.',
                        'Yang paling cepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & menulis kata benda.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: KATA BENDA DI RUMAH',
                        instructions:
                            'Baca kata, cocokkan dengan gambar, lalu tulis di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READ_AND_MATCH',
                                question: 'Baca kata, lalu cocokkan dengan gambar!',
                                data: {
                                    words: [
                                        { word: 'meja', icon: '🪑' },
                                        { word: 'kursi', icon: '💺' },
                                        { word: 'pintu', icon: '🚪' },
                                        { word: 'jendela', icon: '🪟' },
                                    ],
                                },
                                answer_key: 'Siswa mencocokkan.',
                                explanation: 'Membaca kata benda.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis nama benda di rumahmu!',
                                data: {
                                    lines: 4,
                                    prompt: 'Tulis nama benda:',
                                    example: 'meja, kursi, pintu, jendela',
                                },
                                answer_key: 'Siswa menulis kata benda.',
                                explanation: 'Latihan menulis.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'MATCH_SYLLABLE',
                                question: 'Sambung suku kata jadi kata!',
                                data: {
                                    syllables: [
                                        { part1: 'me', part2: 'ja', result: 'meja', icon: '🪑' },
                                        { part1: 'kur', part2: 'si', result: 'kursi', icon: '💺' },
                                        { part1: 'jen', part2: 'dela', result: 'jendela', icon: '🪟' },
                                    ],
                                },
                                answer_key: 'meja, kursi, jendela',
                                explanation: 'Menyambung suku kata.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Benda apa saja di rumahmu?',
                        'Bagaimana cara membaca "jendela"?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menulis kata benda pada LKPD 3.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 9: Kalimat Sederhana (2-3 kata)',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu membaca dan menulis kalimat sederhana 2-3 kata.',
                content_text: buildContentText({
                    title: 'Pertemuan 9: Kalimat Sederhana',
                    field: 'Membaca Kalimat',
                    objectives: [
                        'Membaca kalimat sederhana 2-3 kata',
                        'Menulis kalimat sederhana',
                        'Memahami arti kalimat sederhana',
                    ],
                    subMaterial:
                        'Membaca **kalimat sederhana** 2-3 kata: "Ini bola.", "Aku suka buku.", "Ibu masak nasi." Kalimat selalu diakhiri tanda titik (.).',
                    cpHolistic: {
                        menyimak: 'Mendengarkan kalimat sederhana.',
                        membaca: 'Membaca kalimat 2-3 kata.',
                        berbicara: 'Mengucapkan kalimat dengan jelas.',
                        menulis: 'Menulis kalimat sederhana.',
                    },
                    triggerQuestion:
                        'Bagaimana cara membaca kalimat "Ini bola."?',
                    activities: {
                        mindful:
                            'Guru menjelaskan kalimat sederhana. Siswa membaca bersama.',
                        joyful:
                            'Permainan "Baca Kalimat" — siswa membaca kartu kalimat dengan nyaring.',
                        meaningful:
                            'Siswa membaca & menulis kalimat sederhana.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kalimat',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (membaca kalimat)',
                        'Penalaran Kritis (memahami arti)',
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
                            solution: 'jelaskan titik sebagai penanda akhir kalimat',
                        },
                        {
                            issue: 'Anak sulit menulis kalimat',
                            solution: 'mulai dari 2 kata, baru 3 kata',
                        },
                    ],
                    extensions: [
                        'Bikin buku kalimat',
                        'Bikin kalimat dari kata favorit',
                        'Bikin cerita 3 kalimat',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa baca & tulis kalimat.',
                    journal: [
                        'Hari 1: Baca "Ini bola."',
                        'Hari 2: Baca "Aku suka buku."',
                        'Hari 3: Baca "Ibu masak nasi."',
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
                        'Guru bertanya: "Apa itu kalimat?"',
                    trigger_question:
                        'Bagaimana cara membaca kalimat "Ini bola."?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca & menulis kalimat sederhana 2-3 kata.',
                    concrete_steps: [
                        'Guru menunjukkan kalimat "Ini bola."',
                        'Siswa membaca bersama.',
                        'Lanjut "Aku suka buku." & "Ibu masak nasi."',
                        'Siswa berlatih membaca.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Kalimat dimulai huruf besar, diakhiri tanda titik. Yuk, baca kalimat!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Baca Kalimat',
                    game_rules: [
                        'Guru menunjukkan kartu kalimat.',
                        'Siswa membaca dengan nyaring.',
                        'Yang paling jelas diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & menulis kalimat.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.3: KALIMAT SEDERHANA',
                        instructions:
                            'Baca kalimat dengan nyaring, lalu tulis di baris kosong!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question: 'Baca kalimat berikut dengan nyaring!',
                                data: {
                                    sentences: [
                                        { text: 'Ini bola.', icon: '⚽' },
                                        { text: 'Aku suka buku.', icon: '📚' },
                                        { text: 'Ibu masak nasi.', icon: '🍚' },
                                    ],
                                },
                                answer_key: 'Siswa membaca dengan lancar.',
                                explanation: 'Membaca kalimat sederhana.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis kalimat berikut di baris kosong!',
                                data: {
                                    lines: 3,
                                    prompt: 'Tulis kalimat:',
                                    example: 'Ini bola. Aku suka buku.',
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
                                    'Gambarlah sesuai kalimat "Ini bola."!',
                                data: {
                                    prompt: 'Ini bola',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Ini bola:',
                                },
                                answer_key: 'Siswa menggambar bola.',
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
                            'Rekam suaramu membaca kalimat: "Ini bola. Aku suka buku. Ibu masak nasi."',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 3: Aku dan Keluargaku',
                        quiz_questions: [
                            {
                                question_text: 'Kata "ayah" terdiri dari berapa suku kata?',
                                option_a: '1',
                                option_b: '2',
                                option_c: '3',
                                option_d: '4',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Kata "meja" artinya...',
                                option_a: 'Alat untuk duduk',
                                option_b: 'Alat untuk menulis',
                                option_c: 'Alat untuk tidur',
                                option_d: 'Alat untuk memasak',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kalimat "Ini bola." diakhiri dengan tanda...',
                                option_a: 'Titik (.)',
                                option_b: 'Tanya (?)',
                                option_c: 'Seru (!)',
                                option_d: 'Koma (,)',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Kata "ibu" jika dipecah menjadi suku kata...',
                                option_a: 'i-bu',
                                option_b: 'ib-u',
                                option_c: 'i-b-u',
                                option_d: 'ibu',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 📚 BAB 4: AKU SUKA BERCERITA (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 4,
        title: 'Bab 4 Aku Suka Bercerita',
        bi_field: 'Menyimak & Bercerita',
        target_semester: 1,
        week_target: 10,
        lessons: [
            {
                title: 'Pertemuan 10: Menyimak Cerita Pendek',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menyimak cerita pendek dan menjawab pertanyaan tentang isi cerita.',
                content_text: buildContentText({
                    title: 'Pertemuan 10: Menyimak Cerita Pendek',
                    field: 'Menyimak & Bercerita',
                    objectives: [
                        'Menyimak cerita pendek dengan saksama',
                        'Menjawab pertanyaan tentang isi cerita',
                        'Menceritakan ulang cerita dengan bahasa sendiri',
                    ],
                    subMaterial:
                        'Menyimak **cerita pendek** dengan saksama. Contoh: cerita "Kucing Kecil" — Si kucing kecil lapar. Ia mencari makan. Akhirnya ia menemukan ikan. Si kucing senang sekali.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan cerita pendek dengan saksama.',
                        membaca: 'Mengenal kosakata baru dari cerita.',
                        berbicara: 'Menceritakan ulang isi cerita.',
                        menulis: 'Menulis jawaban pertanyaan cerita.',
                    },
                    triggerQuestion:
                        'Siapa tokoh dalam cerita "Kucing Kecil"? Apa yang terjadi?',
                    activities: {
                        mindful:
                            'Guru membacakan cerita pendek. Siswa menyimak dengan saksama.',
                        joyful:
                            'Permainan "Tebak Cerita" — guru bertanya tentang isi cerita, siswa menjawab.',
                        meaningful:
                            'Siswa menjawab pertanyaan & menggambar tokoh cerita.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Cerita pendek tertulis',
                        'Gambar tokoh cerita',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (menyimak)',
                        'Penalaran Kritis (memahami cerita)',
                        'Kreativitas (menggambar)',
                    ],
                    parentTips: [
                        'Bacakan cerita pendek setiap malam',
                        'Tanyakan isi cerita ke anak',
                        'Beri apresiasi saat anak bisa menjawab',
                        'Bikin cerita bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak tidak fokus menyimak',
                            solution: 'bacakan dengan intonasi menarik',
                        },
                        {
                            issue: 'Anak lupa isi cerita',
                            solution: 'ulangi bacakan atau beri gambar pendamping',
                        },
                    ],
                    extensions: [
                        'Bikin cerita sendiri',
                        'Gambar tokoh cerita',
                        'Ceritakan ulang ke keluarga',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa menceritakan ulang.',
                    journal: [
                        'Hari 1: Simak cerita',
                        'Hari 2: Jawab pertanyaan',
                        'Hari 3: Ceritakan ulang',
                        'Hari 4: Gambar tokoh',
                        'Hari 5: Bikin cerita',
                    ],
                    reflection: [
                        'Siapa tokoh cerita?',
                        'Apa isi ceritanya?',
                    ],
                }),
                bi_field: 'Menyimak & Bercerita',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Cerita tertulis',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu kucing.',
                    apperception:
                        'Guru bertanya: "Siapa suka cerita?"',
                    trigger_question:
                        'Siapa tokoh cerita? Apa yang terjadi?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menyimak cerita pendek & menjawab pertanyaan.',
                    concrete_steps: [
                        'Guru membacakan cerita "Kucing Kecil".',
                        'Siswa menyimak dengan saksama.',
                        'Guru bertanya tentang isi cerita.',
                        'Siswa menjawab bersama.',
                        'Ulangi cerita 2x.',
                    ],
                    script_parent:
                        '"Simak cerita dengan saksama. Nanti kita jawab pertanyaannya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Cerita',
                    game_rules: [
                        'Guru bertanya tentang cerita.',
                        'Siswa menjawab.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab dengan bantuan guru.',
                        child_level_advanced: 'Menjawab sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menjawab & menggambar tokoh cerita.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: MENYIMAK CERITA',
                        instructions:
                            'Jawab pertanyaan tentang cerita "Kucing Kecil"!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question:
                                    'Baca cerita berikut dengan nyaring! "Si kucing kecil lapar. Ia mencari makan. Akhirnya ia menemukan ikan. Si kucing senang sekali."',
                                data: {
                                    sentences: [
                                        { text: 'Si kucing kecil lapar.', icon: '🐱' },
                                        { text: 'Ia mencari makan.', icon: '🍽️' },
                                        { text: 'Akhirnya ia menemukan ikan.', icon: '🐟' },
                                        { text: 'Si kucing senang sekali.', icon: '😊' },
                                    ],
                                },
                                answer_key: 'Siswa membaca cerita.',
                                explanation: 'Menyimak cerita pendek.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah tokoh cerita "Kucing Kecil"!',
                                data: {
                                    prompt: 'Kucing Kecil',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar Kucing Kecil:',
                                },
                                answer_key: 'Siswa menggambar kucing.',
                                explanation: 'Menggambar tokoh cerita.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah menyimak cerita?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah menyimak cerita?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Terhibur' },
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
                        'Siapa tokoh cerita?',
                        'Apa isi ceritanya?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menggambar Kucing Kecil pada LKPD 4.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 11: Menjawab Pertanyaan Cerita',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menjawab pertanyaan tentang isi cerita dengan kalimat sederhana.',
                content_text: buildContentText({
                    title: 'Pertemuan 11: Menjawab Pertanyaan Cerita',
                    field: 'Menyimak & Bercerita',
                    objectives: [
                        'Menjawab pertanyaan tentang tokoh cerita',
                        'Menjawab pertanyaan tentang tempat & waktu',
                        'Menyusun jawaban dengan kalimat sederhana',
                    ],
                    subMaterial:
                        'Belajar menjawab **pertanyaan cerita**: Siapa tokohnya? Di mana? Kapan? Mengapa? Jawaban disusun dengan kalimat sederhana.',
                    cpHolistic: {
                        menyimak: 'Menyimak cerita dengan detail.',
                        membaca: 'Membaca pertanyaan & cerita.',
                        berbicara: 'Menjawab dengan kalimat sederhana.',
                        menulis: 'Menulis jawaban kalimat sederhana.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menjawab pertanyaan tentang cerita?',
                    activities: {
                        mindful:
                            'Guru menjelaskan jenis-jenis pertanyaan cerita. Siswa menyimak cerita pendek.',
                        joyful:
                            'Permainan "Jawab Cepat" — guru bertanya, siswa menjawab dengan cepat.',
                        meaningful:
                            'Siswa menjawab pertanyaan cerita di LKPD.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Cerita pendek',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (memahami cerita)',
                        'Komunikasi (menjawab)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak menjawab pertanyaan cerita',
                        'Beri contoh jawaban yang benar',
                        'Beri apresiasi',
                        'Bikin pertanyaan bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung pertanyaan',
                            solution: 'beri contoh pertanyaan & jawaban',
                        },
                        {
                            issue: 'Anak tidak bisa menyusun kalimat',
                            solution: 'mulai dari jawaban 1-2 kata',
                        },
                    ],
                    extensions: [
                        'Bikin pertanyaan sendiri',
                        'Wawancarai keluarga tentang cerita',
                        'Bikin buku tanya-jawab',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa menjawab dengan kalimat.',
                    journal: [
                        'Hari 1: Jawab "siapa tokoh"',
                        'Hari 2: Jawab "di mana"',
                        'Hari 3: Jawab "kapan"',
                        'Hari 4: Jawab "mengapa"',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Pertanyaan apa yang paling mudah dijawab?',
                        'Bagaimana cara menjawab dengan kalimat?',
                    ],
                }),
                bi_field: 'Menyimak & Bercerita',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Cerita pendek',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi.',
                    apperception:
                        'Guru bertanya: "Siapa bisa menjawab pertanyaan tentang cerita?"',
                    trigger_question:
                        'Bagaimana cara menjawab pertanyaan tentang cerita?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menjawab pertanyaan cerita dengan kalimat sederhana.',
                    concrete_steps: [
                        'Guru membacakan cerita pendek.',
                        'Guru bertanya tentang tokoh, tempat, waktu.',
                        'Siswa menjawab bersama.',
                        'Berlatih menjawab dengan kalimat.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Pertanyaan cerita bisa dijawab dengan kalimat sederhana. Yuk, coba!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Jawab Cepat',
                    game_rules: [
                        'Guru bertanya tentang cerita.',
                        'Siswa menjawab dengan cepat.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab dengan bantuan.',
                        child_level_advanced: 'Menjawab dengan kalimat lengkap.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menjawab pertanyaan cerita.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: MENJAWAB PERTANYAAN CERITA',
                        instructions:
                            'Simak cerita, lalu jawab pertanyaan berikut dengan kalimat sederhana!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question:
                                    'Baca cerita: "Ari punya buku baru. Ia suka membaca buku. Ari membaca buku di kamar."',
                                data: {
                                    sentences: [
                                        { text: 'Ari punya buku baru.', icon: '📚' },
                                        { text: 'Ia suka membaca buku.', icon: '👦' },
                                        { text: 'Ari membaca buku di kamar.', icon: '🏠' },
                                    ],
                                },
                                answer_key: 'Siswa membaca cerita.',
                                explanation: 'Menyimak cerita.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question:
                                    'Jawab pertanyaan berikut: Siapa tokoh cerita? Di mana Ari membaca?',
                                data: {
                                    lines: 3,
                                    prompt: 'Jawaban:',
                                    example: 'Tokoh cerita: Ari. Ari membaca di kamar.',
                                },
                                answer_key: 'Tokoh: Ari. Tempat: kamar.',
                                explanation: 'Menjawab pertanyaan cerita.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah Ari sedang membaca buku!',
                                data: {
                                    prompt: 'Ari membaca buku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Ari membaca buku:',
                                },
                                answer_key: 'Siswa menggambar Ari membaca.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Pertanyaan apa yang paling mudah?',
                        'Bagaimana cara menjawab dengan kalimat?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menjawab pertanyaan cerita pada LKPD 4.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 12: Menceritakan Ulang Cerita',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu menceritakan ulang isi cerita dengan bahasa sendiri.',
                content_text: buildContentText({
                    title: 'Pertemuan 12: Menceritakan Ulang Cerita',
                    field: 'Menyimak & Bercerita',
                    objectives: [
                        'Menceritakan ulang cerita dengan bahasa sendiri',
                        'Menyusun kalimat dari cerita',
                        'Berani bercerita di depan kelas',
                    ],
                    subMaterial:
                        'Menceritakan ulang **cerita pendek** dengan bahasa sendiri. Contoh: cerita "Kucing Kecil" — "Si kucing lapar. Ia cari makan. Ia dapat ikan. Ia senang."',
                    cpHolistic: {
                        menyimak: 'Menyimak cerita dengan saksama.',
                        membaca: 'Membaca cerita.',
                        berbicara: 'Menceritakan ulang dengan bahasa sendiri.',
                        menulis: 'Menulis ulang cerita.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menceritakan ulang cerita?',
                    activities: {
                        mindful:
                            'Guru membacakan cerita. Siswa menyimak.',
                        joyful:
                            'Permainan "Cerita Berantai" — siswa bergantian menceritakan bagian cerita.',
                        meaningful:
                            'Siswa menceritakan ulang cerita di depan kelas.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Cerita pendek',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (bercerita)',
                        'Penalaran Kritis (memahami cerita)',
                        'Kreativitas (menyusun kalimat)',
                    ],
                    parentTips: [
                        'Ajak anak bercerita di rumah',
                        'Beri apresiasi saat anak berani',
                        'Bacakan cerita bergantian',
                        'Bikin cerita bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malu bercerita',
                            solution: 'mulai dari bercerita ke keluarga dulu',
                        },
                        {
                            issue: 'Anak bingung menyusun kalimat',
                            solution: 'beri panduan kalimat pendek',
                        },
                    ],
                    extensions: [
                        'Bikin video bercerita',
                        'Bikin buku cerita',
                        'Bercerita ke keluarga besar',
                    ],
                    appreciationStage:
                        'Rayakan anak yang berani bercerita di depan kelas.',
                    journal: [
                        'Hari 1: Bercerita ke keluarga',
                        'Hari 2: Bercerita ke teman',
                        'Hari 3: Bercerita di depan kelas',
                        'Hari 4: Bikin cerita',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Bagaimana perasaanmu bercerita?',
                        'Cerita apa yang paling mudah diceritakan?',
                    ],
                }),
                bi_field: 'Menyimak & Bercerita',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Cerita pendek',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bernyanyi.',
                    apperception:
                        'Guru bertanya: "Siapa berani bercerita?"',
                    trigger_question:
                        'Bagaimana cara menceritakan ulang cerita?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menceritakan ulang cerita dengan bahasa sendiri.',
                    concrete_steps: [
                        'Guru membacakan cerita pendek.',
                        'Siswa menyimak.',
                        'Guru meminta siswa menceritakan ulang.',
                        'Siswa berlatih bercerita.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Menceritakan ulang dengan bahasa sendiri. Yuk, coba!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Cerita Berantai',
                    game_rules: [
                        'Guru memulai cerita.',
                        'Siswa bergantian melanjutkan.',
                        'Yang paling menarik diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Bercerita dengan bantuan guru.',
                        child_level_advanced: 'Bercerita sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menceritakan ulang & menulis cerita.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.3: BERCERITA ULANG',
                        instructions:
                            'Baca cerita, lalu tulis ulang dengan bahasamu sendiri!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question:
                                    'Baca cerita: "Budi punya bola baru. Ia bermain bola di halaman. Budi senang sekali."',
                                data: {
                                    sentences: [
                                        { text: 'Budi punya bola baru.', icon: '⚽' },
                                        { text: 'Ia bermain bola di halaman.', icon: '🏡' },
                                        { text: 'Budi senang sekali.', icon: '😊' },
                                    ],
                                },
                                answer_key: 'Siswa membaca cerita.',
                                explanation: 'Menyimak cerita.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question:
                                    'Ceritakan ulang cerita Budi dengan bahasamu sendiri!',
                                data: {
                                    lines: 4,
                                    prompt: 'Ceritaku:',
                                    example: 'Budi punya bola. Ia bermain di halaman. Ia senang.',
                                },
                                answer_key: 'Siswa menulis cerita ulang.',
                                explanation: 'Menceritakan ulang.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah Budi sedang bermain bola!',
                                data: {
                                    prompt: 'Budi bermain bola',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Budi bermain bola:',
                                },
                                answer_key: 'Siswa menggambar Budi.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana perasaanmu bercerita?',
                        'Cerita apa yang paling mudah?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menceritakan ulang cerita Budi dengan bahasamu sendiri!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 4: Aku Suka Bercerita',
                        quiz_questions: [
                            {
                                question_text: 'Saat menyimak cerita, kita harus...',
                                option_a: 'Bermain',
                                option_b: 'Menyimak dengan saksama',
                                option_c: 'Bicara',
                                option_d: 'Tidur',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Menjawab pertanyaan cerita sebaiknya dengan...',
                                option_a: 'Kalimat sederhana',
                                option_b: 'Angka',
                                option_c: 'Gambar',
                                option_d: 'Suara keras',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Menceritakan ulang berarti...',
                                option_a: 'Membaca cerita',
                                option_b: 'Menyalin cerita',
                                option_c: 'Bercerita dengan bahasa sendiri',
                                option_d: 'Menulis cerita baru',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Tokoh cerita "Budi punya bola baru" adalah...',
                                option_a: 'Bola',
                                option_b: 'Budi',
                                option_c: 'Halaman',
                                option_d: 'Baru',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedBahasaIndonesiaBatch2() {
    console.log('================================================================');
    console.log('📚 SEEDING BAHASA INDONESIA FASE A KELAS 1 - BATCH 2');
    console.log('   Bab 3-4 (Semester 1, 6 Pertemuan)');
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

    console.log('\n📚 [3/3] Menyimpan Bab 3-4 (6 Pertemuan)...');

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
    console.log('🎉 SEEDING BATCH 2 BERHASIL!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar & ${totalQuizzesCreated} soal CBT.`);
    console.log('');
    console.log('📊 Cakupan Batch 2:');
    console.log('   📚 Bab 3: Aku dan Keluargaku (3 Pertemuan)');
    console.log('   📚 Bab 4: Aku Suka Bercerita (3 Pertemuan)');
    console.log('');
    console.log('🚀 Selanjutnya:');
    console.log('   → Batch 3: Bab 5-6 (Menulis & Membaca)');
    console.log('================================================================\n');
}

seedBahasaIndonesiaBatch2().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Batch 2:', err);
    process.exit(1);
});