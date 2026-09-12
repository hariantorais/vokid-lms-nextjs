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
    // 📚 BAB 7: AKU SUKA BUKU (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 7,
        title: 'Bab 7 Aku Suka Buku',
        bi_field: 'Membaca Cerita Bergambar',
        target_semester: 2,
        week_target: 19,
        lessons: [
            {
                title: 'Pertemuan 19: Bagian-Bagian Buku (Cover, Isi, Judul)',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengenal bagian-bagian buku (cover, judul, isi) dan fungsinya.',
                content_text: buildContentText({
                    title: 'Pertemuan 19: Bagian-Bagian Buku',
                    field: 'Membaca Cerita Bergambar',
                    objectives: [
                        'Mengenal bagian buku (cover, judul, isi)',
                        'Menyebutkan fungsi setiap bagian buku',
                        'Membaca judul buku',
                    ],
                    subMaterial:
                        'Mengenal **bagian-bagian buku**: cover (sampul depan), judul (nama buku), isi (cerita/gambar). Cover biasanya bergambar indah. Judul ditulis besar. Isi berisi cerita & gambar.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan penjelasan bagian buku.',
                        membaca: 'Membaca judul buku.',
                        berbicara: 'Menyebutkan bagian buku.',
                        menulis: 'Menulis judul buku.',
                    },
                    triggerQuestion:
                        'Apa saja bagian dari buku? Bagaimana cara membacanya?',
                    activities: {
                        mindful:
                            'Guru menunjukkan buku & menjelaskan bagian-bagiannya. Siswa mengamati.',
                        joyful:
                            'Permainan "Tebak Bagian Buku" — guru menyebutkan ciri, siswa menebak bagian.',
                        meaningful:
                            'Siswa menyebutkan bagian buku & menulis judul.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku cerita bergambar',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Penalaran Kritis (mengenal buku)',
                        'Kewargaan (cinta buku)',
                        'Komunikasi (menyebutkan)',
                    ],
                    parentTips: [
                        'Ajak anak mengenal bagian buku',
                        'Tunjukkan cover, judul, isi',
                        'Beri apresiasi',
                        'Bacakan buku setiap malam',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan cover & isi',
                            solution: 'tunjukkan perbedaan langsung',
                        },
                        {
                            issue: 'Anak tidak tertarik',
                            solution: 'gunakan buku bergambar warna-warni',
                        },
                    ],
                    extensions: [
                        'Bikin buku sendiri',
                        'Bikin cover buku',
                        'Bikin judul cerita',
                    ],
                    appreciationStage:
                        'Pajang buku buatan anak di kamar.',
                    journal: [
                        'Hari 1: Sebutkan bagian buku',
                        'Hari 2: Tunjuk cover',
                        'Hari 3: Tunjuk judul',
                        'Hari 4: Tunjuk isi',
                        'Hari 5: Baca judul buku',
                    ],
                    reflection: [
                        'Apa saja bagian buku?',
                        'Bagian apa yang paling kamu sukai?',
                    ],
                }),
                bi_field: 'Membaca Cerita Bergambar',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku cerita',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu buku.',
                    apperception:
                        'Guru bertanya: "Apa saja bagian buku?"',
                    trigger_question:
                        'Apa saja bagian dari buku?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Bagian buku: cover, judul, isi.',
                    concrete_steps: [
                        'Guru menunjukkan buku cerita.',
                        'Siswa mengamati cover.',
                        'Guru menunjukkan judul & isi.',
                        'Siswa menyebutkan bagian buku.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Buku punya cover, judul, dan isi. Yuk, kenali bagian buku!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Bagian Buku',
                    game_rules: [
                        'Guru menyebutkan ciri.',
                        'Siswa menebak bagian buku.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengenal bagian buku.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.1: BAGIAN-BAGIAN BUKU',
                        instructions:
                            'Jodohkan bagian buku dengan cirinya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Jodohkan bagian buku dengan cirinya!',
                                data: {
                                    pairs: [
                                        { left: '📕 Cover', right: 'Sampul bergambar' },
                                        { left: '📝 Judul', right: 'Nama buku' },
                                        { left: '📖 Isi', right: 'Cerita & gambar' },
                                    ],
                                },
                                answer_key: 'Cover→sampul, Judul→nama, Isi→cerita.',
                                explanation: 'Mengenal bagian buku.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question: 'Tulis judul buku favoritmu!',
                                data: {
                                    lines: 2,
                                    prompt: 'Judul buku favoritku:',
                                    example: 'Judul: Si Kancil',
                                },
                                answer_key: 'Siswa menulis judul buku.',
                                explanation: 'Latihan menulis.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah cover buku favoritmu!',
                                data: {
                                    prompt: 'Cover buku favoritku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Cover buku:',
                                },
                                answer_key: 'Siswa menggambar cover.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa saja bagian buku?',
                        'Bagian apa yang paling kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menggambar cover buku pada LKPD 7.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 20: Membaca Cerita Bergambar (3 Kalimat)',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu membaca cerita bergambar 3 kalimat.',
                content_text: buildContentText({
                    title: 'Pertemuan 20: Membaca Cerita Bergambar',
                    field: 'Membaca Cerita Bergambar',
                    objectives: [
                        'Membaca cerita bergambar 3 kalimat',
                        'Memahami isi cerita dari gambar',
                        'Menceritakan ulang cerita',
                    ],
                    subMaterial:
                        'Membaca **cerita bergambar** 3 kalimat: "Ari punya kucing. Kucing itu lucu. Ari suka kucing." Gambar membantu kita memahami cerita.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan cerita bergambar.',
                        membaca: 'Membaca cerita 3 kalimat.',
                        berbicara: 'Menceritakan ulang.',
                        menulis: 'Menulis cerita 3 kalimat.',
                    },
                    triggerQuestion:
                        'Bagaimana cara membaca cerita bergambar?',
                    activities: {
                        mindful:
                            'Guru membacakan cerita bergambar. Siswa menyimak & melihat gambar.',
                        joyful:
                            'Permainan "Tebak Cerita" — guru menunjukkan gambar, siswa menebak isi cerita.',
                        meaningful:
                            'Siswa membaca cerita & menuliskan ulang.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku cerita bergambar',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (membaca)',
                        'Penalaran Kritis (memahami)',
                        'Kreativitas (menceritakan)',
                    ],
                    parentTips: [
                        'Bacakan buku cerita bergambar',
                        'Tanyakan isi cerita',
                        'Beri apresiasi',
                        'Bikin cerita bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung memahami cerita',
                            solution: 'tunjukkan gambar, jelaskan satu per satu',
                        },
                        {
                            issue: 'Anak tidak fokus',
                            solution: 'gunakan cerita pendek & menarik',
                        },
                    ],
                    extensions: [
                        'Bikin cerita bergambar sendiri',
                        'Bikin buku cerita',
                        'Bercerita ke keluarga',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa baca cerita.',
                    journal: [
                        'Hari 1: Baca cerita 3 kalimat',
                        'Hari 2: Pahami isi',
                        'Hari 3: Ceritakan ulang',
                        'Hari 4: Tulis cerita',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Cerita apa yang paling kamu sukai?',
                        'Bagaimana cara memahami cerita?',
                    ],
                }),
                bi_field: 'Membaca Cerita Bergambar',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku cerita bergambar',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu kucing.',
                    apperception:
                        'Guru bertanya: "Siapa suka baca cerita?"',
                    trigger_question:
                        'Bagaimana cara membaca cerita bergambar?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca cerita bergambar dengan memahami gambar & teks.',
                    concrete_steps: [
                        'Guru menunjukkan cerita bergambar.',
                        'Siswa mengamati gambar.',
                        'Guru membaca cerita.',
                        'Siswa menirukan.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Gambar membantu kita memahami cerita. Yuk, baca cerita!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Cerita',
                    game_rules: [
                        'Guru menunjukkan gambar.',
                        'Siswa menebak isi cerita.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & memahami cerita.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.2: MEMBACA CERITA BERGAMBAR',
                        instructions:
                            'Baca cerita bergambar, lalu jawab pertanyaannya!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question:
                                    'Baca cerita: "Ari punya kucing. Kucing itu lucu. Ari suka kucing."',
                                data: {
                                    sentences: [
                                        { text: 'Ari punya kucing.', icon: '👦🐱' },
                                        { text: 'Kucing itu lucu.', icon: '😺' },
                                        { text: 'Ari suka kucing.', icon: '❤️' },
                                    ],
                                },
                                answer_key: 'Siswa membaca cerita.',
                                explanation: 'Membaca cerita bergambar.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question:
                                    'Jawab: Apa nama tokoh cerita? Apa ia punya kucing?',
                                data: {
                                    lines: 3,
                                    prompt: 'Jawaban:',
                                    example: 'Tokoh: Ari. Ari punya kucing.',
                                },
                                answer_key: 'Tokoh Ari, punya kucing.',
                                explanation: 'Memahami cerita.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah kucing milik Ari!',
                                data: {
                                    prompt: 'Kucing Ari',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Kucing Ari:',
                                },
                                answer_key: 'Siswa menggambar kucing.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Cerita apa yang paling kamu sukai?',
                        'Bagaimana cara memahami cerita?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu membaca: "Ari punya kucing. Kucing itu lucu. Ari suka kucing."',
                    },
                ],
            },
            {
                title: 'Pertemuan 21: Membaca Cerita 3 Kalimat',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu membaca cerita 3 kalimat dengan lancar dan menuliskan ulang.',
                content_text: buildContentText({
                    title: 'Pertemuan 21: Membaca Cerita 3 Kalimat',
                    field: 'Membaca Cerita Bergambar',
                    objectives: [
                        'Membaca cerita 3 kalimat dengan lancar',
                        'Menuliskan ulang cerita',
                        'Memahami alur cerita sederhana',
                    ],
                    subMaterial:
                        'Membaca **cerita 3 kalimat**: "Budi punya bola. Ia bermain di halaman. Budi senang sekali." Setiap kalimat saling berhubungan membentuk cerita.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan cerita 3 kalimat.',
                        membaca: 'Membaca cerita 3 kalimat.',
                        berbicara: 'Menceritakan ulang.',
                        menulis: 'Menulis ulang cerita.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menulis cerita 3 kalimat?',
                    activities: {
                        mindful:
                            'Guru membacakan cerita 3 kalimat. Siswa menyimak.',
                        joyful:
                            'Permainan "Susun Cerita" — siswa menyusun gambar jadi cerita.',
                        meaningful:
                            'Siswa membaca & menulis ulang cerita.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Kartu kalimat',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (membaca)',
                        'Penalaran Kritis (memahami alur)',
                        'Kreativitas (menyusun)',
                    ],
                    parentTips: [
                        'Bacakan cerita 3 kalimat',
                        'Ajak anak menyusun cerita',
                        'Beri apresiasi',
                        'Bikin cerita bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung urutan cerita',
                            solution: 'beri kartu kalimat, susun bersama',
                        },
                        {
                            issue: 'Anak sulit menulis cerita',
                            solution: 'mulai dari 1 kalimat, baru 3 kalimat',
                        },
                    ],
                    extensions: [
                        'Bikin cerita 5 kalimat',
                        'Bikin buku cerita',
                        'Bacakan cerita ke keluarga',
                    ],
                    appreciationStage:
                        'Rayakan anak yang bisa bikin cerita.',
                    journal: [
                        'Hari 1: Baca cerita 3 kalimat',
                        'Hari 2: Susun cerita',
                        'Hari 3: Tulis cerita',
                        'Hari 4: Ceritakan ulang',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Cerita apa yang paling kamu sukai?',
                        'Bagaimana cara menyusun cerita?',
                    ],
                }),
                bi_field: 'Membaca Cerita Bergambar',
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
                        'Guru bertanya: "Siapa bisa bikin cerita?"',
                    trigger_question:
                        'Bagaimana cara menulis cerita 3 kalimat?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Membaca & menulis cerita 3 kalimat.',
                    concrete_steps: [
                        'Guru membacakan cerita 3 kalimat.',
                        'Siswa menyimak.',
                        'Siswa membaca bersama.',
                        'Siswa menulis ulang cerita.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Cerita terdiri dari beberapa kalimat. Yuk, baca & tulis cerita!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Susun Cerita',
                    game_rules: [
                        'Guru membagikan kartu kalimat.',
                        'Siswa menyusun jadi cerita.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Membaca & menulis cerita.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.3: MEMBACA & MENULIS CERITA',
                        instructions:
                            'Baca cerita, lalu tulis ulang dengan bahasamu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'READING_CARD',
                                question:
                                    'Baca cerita: "Budi punya bola. Ia bermain di halaman. Budi senang sekali."',
                                data: {
                                    sentences: [
                                        { text: 'Budi punya bola.', icon: '⚽' },
                                        { text: 'Ia bermain di halaman.', icon: '🏡' },
                                        { text: 'Budi senang sekali.', icon: '😊' },
                                    ],
                                },
                                answer_key: 'Siswa membaca cerita.',
                                explanation: 'Membaca cerita.',
                            },
                            {
                                id: 2,
                                type: 'WRITING_LINES',
                                question:
                                    'Tulis ulang cerita Budi dengan bahasamu sendiri!',
                                data: {
                                    lines: 4,
                                    prompt: 'Ceritaku:',
                                    example: 'Budi punya bola. Ia main di halaman. Ia senang.',
                                },
                                answer_key: 'Siswa menulis cerita.',
                                explanation: 'Latihan menulis cerita.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah Budi bermain bola di halaman!',
                                data: {
                                    prompt: 'Budi bermain bola',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Budi bermain bola:',
                                },
                                answer_key: 'Siswa menggambar.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Cerita apa yang paling kamu sukai?',
                        'Bagaimana cara menyusun cerita?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menulis cerita pada LKPD 7.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 7: Aku Suka Buku',
                        quiz_questions: [
                            {
                                question_text: 'Bagian buku yang bergambar adalah...',
                                option_a: 'Cover',
                                option_b: 'Isi',
                                option_c: 'Judul',
                                option_d: 'Halaman',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Judul buku biasanya ditulis...',
                                option_a: 'Kecil',
                                option_b: 'Besar & jelas',
                                option_c: 'Tidak terlihat',
                                option_d: 'Tersembunyi',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Untuk memahami cerita, kita bisa melihat...',
                                option_a: 'Gambar',
                                option_b: 'Angka',
                                option_c: 'Warna',
                                option_d: 'Harga',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Cerita biasanya terdiri dari...',
                                option_a: '1 kalimat',
                                option_b: 'Beberapa kalimat',
                                option_c: 'Angka',
                                option_d: 'Gambar saja',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 📚 BAB 8: AKU BISA MENULIS CERITA (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 8,
        title: 'Bab 8 Aku Bisa Menulis Cerita',
        bi_field: 'Menulis Cerita Sederhana',
        target_semester: 2,
        week_target: 22,
        lessons: [
            {
                title: 'Pertemuan 22: Menulis Kalimat Sederhana',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menulis kalimat sederhana dengan ejaan yang benar.',
                content_text: buildContentText({
                    title: 'Pertemuan 22: Menulis Kalimat Sederhana',
                    field: 'Menulis Cerita Sederhana',
                    objectives: [
                        'Menulis kalimat sederhana dengan ejaan benar',
                        'Menggunakan huruf kapital di awal kalimat',
                        'Menggunakan tanda titik di akhir kalimat',
                    ],
                    subMaterial:
                        'Menulis **kalimat sederhana**: diawali huruf kapital, diakhiri tanda titik. Contoh: "Aku suka buku." "Ibu memasak nasi." Setiap kalimat harus jelas dan mudah dibaca.',
                    cpHolistic: {
                        menyimak: 'Mendengarkan instruksi menulis.',
                        membaca: 'Membaca kalimat yang ditulis.',
                        berbicara: 'Menyebutkan kalimat.',
                        menulis: 'Menulis kalimat sederhana.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menulis kalimat yang benar?',
                    activities: {
                        mindful:
                            'Guru menjelaskan aturan menulis kalimat. Siswa mengamati contoh.',
                        joyful:
                            'Permainan "Susun Kalimat" — siswa menyusun kata jadi kalimat.',
                        meaningful:
                            'Siswa menulis kalimat sendiri.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku tulis berpetak',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kemandirian (menulis)',
                        'Penalaran Kritis (menyusun)',
                        'Komunikasi (menyampaikan)',
                    ],
                    parentTips: [
                        'Ajak anak menulis kalimat setiap hari',
                        'Ingatkan huruf kapital & tanda titik',
                        'Beri apresiasi',
                        'Bikin kalimat bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak lupa huruf kapital',
                            solution: 'ingatkan dengan warna berbeda',
                        },
                        {
                            issue: 'Anak lupa tanda titik',
                            solution: 'beri pengingat di akhir baris',
                        },
                    ],
                    extensions: [
                        'Bikin buku kalimat',
                        'Bikin cerita 3 kalimat',
                        'Bikin puisi pendek',
                    ],
                    appreciationStage:
                        'Pajang tulisan kalimat anak.',
                    journal: [
                        'Hari 1: Tulis 1 kalimat',
                        'Hari 2: Tulis 2 kalimat',
                        'Hari 3: Tulis 3 kalimat',
                        'Hari 4: Tulis cerita pendek',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Bagaimana cara menulis kalimat?',
                        'Kapan pakai huruf kapital?',
                    ],
                }),
                bi_field: 'Menulis Cerita Sederhana',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku tulis berpetak',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu.',
                    apperception:
                        'Guru bertanya: "Bagaimana cara menulis kalimat?"',
                    trigger_question:
                        'Bagaimana cara menulis kalimat yang benar?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menulis kalimat dengan huruf kapital & tanda titik.',
                    concrete_steps: [
                        'Guru menunjukkan contoh kalimat.',
                        'Siswa mengamati huruf kapital di awal.',
                        'Siswa mengamati tanda titik di akhir.',
                        'Siswa menulis kalimat sendiri.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Kalimat benar dimulai huruf kapital, diakhiri titik. Yuk, tulis!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Susun Kalimat',
                    game_rules: [
                        'Guru membagikan kata acak.',
                        'Siswa menyusun jadi kalimat.',
                        'Yang paling tepat diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menulis kalimat sederhana.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.1: MENULIS KALIMAT SEDERHANA',
                        instructions:
                            'Tulis kalimat berikut dengan huruf kapital & tanda titik yang benar!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'WRITING_LINES',
                                question: 'Tulis kalimat berikut dengan benar!',
                                data: {
                                    lines: 4,
                                    prompt: 'Tulis kalimat:',
                                    example: 'aku suka buku → Aku suka buku.',
                                },
                                answer_key: 'Siswa menulis kalimat dengan benar.',
                                explanation: 'Latihan menulis kalimat.',
                            },
                            {
                                id: 2,
                                type: 'FILL_THE_WORD',
                                question: 'Lengkapi kalimat berikut!',
                                data: {
                                    word: 'buku',
                                    displayWord: 'Aku suka b_k_',
                                    icon: '📚',
                                },
                                answer_key: 'Aku suka buku.',
                                explanation: 'Melengkapi kalimat.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah sesuai kalimat "Aku suka buku."!',
                                data: {
                                    prompt: 'Aku suka buku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku suka buku:',
                                },
                                answer_key: 'Siswa menggambar buku.',
                                explanation: 'Memahami kalimat.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara menulis kalimat?',
                        'Kapan pakai huruf kapital?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menulis kalimat pada LKPD 8.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 23: Menulis Cerita 3 Kalimat',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menulis cerita 3 kalimat dengan alur sederhana.',
                content_text: buildContentText({
                    title: 'Pertemuan 23: Menulis Cerita 3 Kalimat',
                    field: 'Menulis Cerita Sederhana',
                    objectives: [
                        'Menulis cerita 3 kalimat',
                        'Menyusun alur cerita sederhana',
                        'Menggunakan ejaan yang benar',
                    ],
                    subMaterial:
                        'Menulis **cerita 3 kalimat**: kalimat 1 (pembuka), kalimat 2 (isi), kalimat 3 (penutup). Contoh: "Aku punya kucing. Kucingku lucu. Aku sayang kucingku."',
                    cpHolistic: {
                        menyimak: 'Mendengarkan contoh cerita.',
                        membaca: 'Membaca cerita yang ditulis.',
                        berbicara: 'Menceritakan cerita.',
                        menulis: 'Menulis cerita 3 kalimat.',
                    },
                    triggerQuestion:
                        'Bagaimana cara menulis cerita 3 kalimat?',
                    activities: {
                        mindful:
                            'Guru menjelaskan struktur cerita. Siswa mengamati contoh.',
                        joyful:
                            'Permainan "Lanjut Cerita" — siswa melanjutkan cerita.',
                        meaningful:
                            'Siswa menulis cerita 3 kalimat.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Buku tulis berpetak',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Kreativitas (menulis cerita)',
                        'Komunikasi (bercerita)',
                        'Kemandirian (menulis)',
                    ],
                    parentTips: [
                        'Ajak anak menulis cerita',
                        'Beri contoh cerita pendek',
                        'Beri apresiasi',
                        'Bikin cerita bersama',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung alur cerita',
                            solution: 'beri panduan: pembuka-isi-penutup',
                        },
                        {
                            issue: 'Anak bingung ide cerita',
                            solution: 'beri tema sederhana (kucing, bola, keluarga)',
                        },
                    ],
                    extensions: [
                        'Bikin cerita 5 kalimat',
                        'Bikin buku cerita sendiri',
                        'Bikin video bercerita',
                    ],
                    appreciationStage:
                        'Pajang cerita anak. Rayakan kreativitasnya.',
                    journal: [
                        'Hari 1: Tulis 1 kalimat',
                        'Hari 2: Tulis 2 kalimat',
                        'Hari 3: Tulis cerita 3 kalimat',
                        'Hari 4: Bikin cerita sendiri',
                        'Hari 5: Latihan gabungan',
                    ],
                    reflection: [
                        'Cerita apa yang kamu tulis?',
                        'Bagaimana cara menyusun cerita?',
                    ],
                }),
                bi_field: 'Menulis Cerita Sederhana',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Buku tulis berpetak',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa menyanyikan lagu.',
                    apperception:
                        'Guru bertanya: "Siapa bisa bikin cerita?"',
                    trigger_question:
                        'Bagaimana cara menulis cerita 3 kalimat?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menulis cerita 3 kalimat dengan alur sederhana.',
                    concrete_steps: [
                        'Guru menunjukkan contoh cerita.',
                        'Siswa mengamati alur.',
                        'Siswa menulis cerita sendiri.',
                        'Guru berkeliling membantu.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Cerita 3 kalimat: pembuka, isi, penutup. Yuk, tulis cerita!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lanjut Cerita',
                    game_rules: [
                        'Guru memulai cerita.',
                        'Siswa melanjutkan.',
                        'Yang paling menarik diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Dengan bantuan guru.',
                        child_level_advanced: 'Tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menulis cerita 3 kalimat.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.2: MENULIS CERITA 3 KALIMAT',
                        instructions:
                            'Tulis cerita 3 kalimat tentang dirimu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'WRITING_LINES',
                                question:
                                    'Tulis cerita 3 kalimat tentang dirimu!',
                                data: {
                                    lines: 4,
                                    prompt: 'Ceritaku:',
                                    example: 'Aku punya kucing. Kucingku lucu. Aku sayang kucingku.',
                                },
                                answer_key: 'Siswa menulis cerita 3 kalimat.',
                                explanation: 'Latihan menulis cerita.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah tokoh dalam ceritamu!',
                                data: {
                                    prompt: 'Tokoh ceritaku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Tokoh ceritaku:',
                                },
                                answer_key: 'Siswa menggambar.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah menulis cerita?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah menulis cerita?',
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
                        'Cerita apa yang kamu tulis?',
                        'Bagaimana cara menyusun cerita?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil menulis cerita pada LKPD 8.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                ],
            },
            {
                title: 'Pertemuan 24: Berbagi Cerita (Presentasi)',
                order_index: 3,
                learning_objectives:
                    'Peserta didik mampu membacakan & membagikan cerita yang telah ditulis dengan percaya diri.',
                content_text: buildContentText({
                    title: 'Pertemuan 24: Berbagi Cerita (Presentasi)',
                    field: 'Menulis Cerita Sederhana',
                    objectives: [
                        'Membacakan cerita dengan lantang',
                        'Berbagi cerita ke teman & keluarga',
                        'Percaya diri tampil di depan kelas',
                    ],
                    subMaterial:
                        'Berbagi **cerita** yang telah ditulis. Bacakan dengan lantang & jelas. Dengarkan cerita teman dengan saksama. Beri apresiasi.',
                    cpHolistic: {
                        menyimak: 'Menyimak cerita teman.',
                        membaca: 'Membaca cerita sendiri.',
                        berbicara: 'Membacakan cerita dengan lantang.',
                        menulis: 'Menulis cerita final.',
                    },
                    triggerQuestion:
                        'Bagaimana cara berbagi cerita dengan teman?',
                    activities: {
                        mindful:
                            'Guru menjelaskan cara membaca cerita dengan lantang. Siswa berlatih.',
                        joyful:
                            'Permainan "Panggung Cerita" — siswa tampil bercerita.',
                        meaningful:
                            'Siswa membacakan cerita & memberi apresiasi.',
                    },
                    materials: [
                        'Buku Bahasa Indonesia Kelas I SD',
                        'Cerita siswa sendiri',
                        'Pensil',
                        'LKPD',
                    ],
                    karakter: [
                        'Komunikasi (bercerita)',
                        'Kreativitas (berbagi)',
                        'Kemandirian (percaya diri)',
                    ],
                    parentTips: [
                        'Ajak anak bercerita di rumah',
                        'Rekam video bercerita',
                        'Beri apresiasi',
                        'Bikin panggung kecil di rumah',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malu tampil',
                            solution: 'mulai dari bercerita ke keluarga dulu',
                        },
                        {
                            issue: 'Anak tidak percaya diri',
                            solution: 'beri pujian spesifik, apresiasi setiap usaha',
                        },
                    ],
                    extensions: [
                        'Bikin video cerita',
                        'Bikin buku cerita',
                        'Bercerita ke keluarga besar',
                    ],
                    appreciationStage:
                        'Panggung Apresiasi Akhir: Rayakan semua anak dengan tepuk tangan & medali kertas.',
                    journal: [
                        'Hari 1: Baca cerita ke keluarga',
                        'Hari 2: Baca cerita ke teman',
                        'Hari 3: Baca cerita di depan kelas',
                        'Hari 4: Rekam video cerita',
                        'Hari 5: Rayakan!',
                    ],
                    reflection: [
                        'Bagaimana perasaanmu bercerita?',
                        'Cerita apa yang paling kamu sukai?',
                    ],
                }),
                bi_field: 'Menulis Cerita Sederhana',
                required_materials: [
                    'Buku Bahasa Indonesia Kelas I SD',
                    'Cerita siswa',
                    'Pensil',
                    'LKPD',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa dengan hangat.',
                    ice_breaker: 'Guru mengajak siswa bertepuk tangan semangat.',
                    apperception:
                        'Guru bertanya: "Siapa berani bercerita?"',
                    trigger_question:
                        'Bagaimana cara berbagi cerita dengan teman?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Berbagi cerita dengan lantang & percaya diri.',
                    concrete_steps: [
                        'Guru menjelaskan cara bercerita.',
                        'Siswa berlatih membaca cerita.',
                        'Siswa tampil bercerita.',
                        'Teman memberi apresiasi.',
                        'Ulangi 3x.',
                    ],
                    script_parent:
                        '"Bercerita dengan lantang & jelas. Yuk, tampil!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Panggung Cerita',
                    game_rules: [
                        'Setiap siswa tampil bercerita.',
                        'Teman mendengarkan dengan saksama.',
                        'Setiap tampilan diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Bercerita dengan bantuan guru.',
                        child_level_advanced: 'Bercerita tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Berbagi cerita & refleksi.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.3: BERBAGI CERITA',
                        instructions:
                            'Tulis cerita finalmu, lalu bacakan di depan kelas!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'WRITING_LINES',
                                question:
                                    'Tulis cerita finalmu (3-5 kalimat)!',
                                data: {
                                    lines: 5,
                                    prompt: 'Cerita Finalku:',
                                    example: 'Aku punya kucing. Kucingku lucu...',
                                },
                                answer_key: 'Siswa menulis cerita final.',
                                explanation: 'Menulis cerita.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah ilustrasi cerita finalmu!',
                                data: {
                                    prompt: 'Ilustrasi ceritaku',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Ilustrasi ceritaku:',
                                },
                                answer_key: 'Siswa menggambar ilustrasi.',
                                explanation: 'Melatih kreativitas.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Bagaimana perasaanmu setelah berbagi cerita?',
                                data: {
                                    question: 'Bagaimana perasaanmu setelah berbagi cerita?',
                                    options: [
                                        { emoji: '😊', label: 'Senang & Bangga' },
                                        { emoji: '😐', label: 'Biasa Saja' },
                                        { emoji: '😢', label: 'Malu' },
                                    ],
                                },
                                answer_key: 'Refleksi personal siswa.',
                                explanation: 'Melatih refleksi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana perasaanmu bercerita?',
                        'Cerita apa yang paling kamu sukai?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil cerita final pada LKPD 8.3, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Akhir Bab 8: Aku Bisa Menulis Cerita',
                        quiz_questions: [
                            {
                                question_text: 'Kalimat yang benar diawali dengan...',
                                option_a: 'Huruf kecil',
                                option_b: 'Huruf kapital',
                                option_c: 'Angka',
                                option_d: 'Simbol',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Kalimat yang benar diakhiri dengan...',
                                option_a: 'Titik (.)',
                                option_b: 'Koma (,)',
                                option_c: 'Tanya (?)',
                                option_d: 'Seru (!)',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Cerita sederhana terdiri dari...',
                                option_a: '1 kalimat',
                                option_b: 'Beberapa kalimat',
                                option_c: 'Angka',
                                option_d: 'Gambar',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Saat berbagi cerita, kita harus...',
                                option_a: 'Malu-malu',
                                option_b: 'Bicara lantang & jelas',
                                option_c: 'Berbisik',
                                option_d: 'Diam',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Apa yang kamu pelajari di Bab 8?',
                                option_a: 'Menulis kalimat & cerita',
                                option_b: 'Berhitung',
                                option_c: 'Menyanyi',
                                option_d: 'Melukis',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedBahasaIndonesiaBatch4() {
    console.log('================================================================');
    console.log('📚 SEEDING BAHASA INDONESIA FASE A KELAS 1 - BATCH 4 (FINAL)');
    console.log('   Bab 7-8 (Semester 2, 6 Pertemuan)');
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

    console.log('\n📚 [3/3] Menyimpan Bab 7-8 (6 Pertemuan)...');

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
    console.log('🎉 SEEDING BATCH 4 (FINAL) BERHASIL!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar & ${totalQuizzesCreated} soal CBT.`);
    console.log('');
    console.log('📊 Cakupan Batch 4:');
    console.log('   📚 Bab 7: Aku Suka Buku (3 Pertemuan)');
    console.log('   📚 Bab 8: Aku Bisa Menulis Cerita (3 Pertemuan)');
    console.log('');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('🎊 SELAMAT! SEEDER BAHASA INDONESIA LENGKAP!');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('Total keseluruhan (Batch 1-4):');
    console.log('   📚 8 Bab');
    console.log('   📖 24 Pertemuan');
    console.log('   ✅ Siap digunakan untuk Kelas 1 SD Fase A');
    console.log('   ⚠️  Perlu validasi dengan buku resmi Kemendikbud');
    console.log('════════════════════════════════════════════════════════════════\n');
}

seedBahasaIndonesiaBatch4().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Batch 4:', err);
    process.exit(1);
});