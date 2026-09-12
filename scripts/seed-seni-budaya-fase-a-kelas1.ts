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
    | 'DRAWING_FRAME'
    | 'TRACE_PATTERN'
    | 'SHAPE_SORTING'
    | 'BODY_MOVEMENT_CARD'
    | 'EXPRESSION_CARD'
    | 'MIMESIS_ACTION'
    | 'MATH_PROBLEM'
    | 'ENGLISH_CARD';

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
    art_field: string;
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
    art_field: 'SENI RUPA' | 'SENI TARI' | 'SENI TEATER';
    target_semester: number;
    week_target: number;
    lessons: LessonItem[];
}

/**
 * Helper untuk menyusun content_text Seni Budaya yang kaya & terstruktur
 */
function buildContentText(params: {
    title: string;
    artField: 'SENI RUPA' | 'SENI TARI' | 'SENI TEATER';
    objectives: string[];
    subMaterial: string;
    cpHolistic: {
        experiencing: string;
        creating: string;
        impacting: string;
    };
    triggerQuestion: string;
    activities: {
        mindful: string;
        joyful: string;
        meaningful: string;
    };
    materials: string[];
    parentTips: string[];
    difficulties: Array<{ issue: string; solution: string }>;
    extensions: string[];
    appreciationStage: string;
    reflection: string[];
}): string {
    const artEmoji = params.artField === 'SENI RUPA' ? '🎨' : params.artField === 'SENI TARI' ? '💃' : '🎭';

    return `**${params.title}**
**Bidang Seni: ${artEmoji} ${params.artField}**

🎯 **Tujuan Pembelajaran**:
${params.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

📖 **Materi Pokok**:
${params.subMaterial}

🎨 **Elemen CP yang Dikembangkan**:
- **Mengalami (Experiencing)**: ${params.cpHolistic.experiencing}
- **Menciptakan (Creating)**: ${params.cpHolistic.creating}
- **Berdampak (Impacting)**: ${params.cpHolistic.impacting}

🔍 **Pertanyaan Pematik**:
"${params.triggerQuestion}"

👐 **Aktivitas Belajar (70 menit)**:
1. **Mindful Learning (20 menit)** — ${params.activities.mindful}
2. **Joyful Learning (20 menit)** — ${params.activities.joyful}
3. **Meaningful Learning (15 menit)** — ${params.activities.meaningful}

🛠️ **Alat & Bahan**:
${params.materials.map((m) => `- ${m}`).join('\n')}

💡 **Tips untuk Orang Tua**:
${params.parentTips.map((t) => `- ${t}`).join('\n')}

⚠️ **Kesulitan Umum & Solusinya**:
${params.difficulties.map((d) => `- **${d.issue}** → ${d.solution}`).join('\n')}

🌟 **Pengayaan**:
${params.extensions.map((e) => `- ${e}`).join('\n')}

🎭 **Panggung Apresiasi**:
${params.appreciationStage}

📝 **Refleksi Siswa**:
${params.reflection.map((r) => `- ${r}`).join('\n')}

📚 **Referensi**:
Tim Mitra Guru, dkk. 2022. Seni Budaya Untuk SD/MI Kelas 1. Erlangga. Jakarta`;
}

const CHAPTERS_DATA: ChapterItem[] = [
    // ===========================================================================
    // 🎨 SENI RUPA — BAB 1: GARIS & BENTUK (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 1,
        title: 'Bab 1 Seni Rupa: Garis dan Bentuk',
        art_field: 'SENI RUPA',
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Pertemuan 1: Mengenal Macam-Macam Garis',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menjelaskan macam-macam garis (lurus, lengkung, zig-zag) dan mengidentifikasi garis dari benda-benda di sekitar dengan penuh kesadaran pengamatan.',
                content_text: buildContentText({
                    title: 'Pertemuan 1: Mengenal Macam-Macam Garis',
                    artField: 'SENI RUPA',
                    objectives: [
                        'Menjelaskan macam-macam garis (lurus, lengkung, zig-zag)',
                        'Mengidentifikasi garis dari benda-benda di sekitar',
                        'Menggambar garis lurus, lengkung, dan zig-zag',
                    ],
                    subMaterial:
                        'Mengenal tiga jenis garis dasar: **garis lurus** (tegak, datar, miring), **garis lengkung** (melengkung halus), dan **garis zig-zag** (patah-patah tajam). Siswa mengamati benda sekitar untuk menemukan jenis garis tersebut.',
                    cpHolistic: {
                        experiencing: 'Mengamati dan mengidentifikasi garis pada benda-benda di sekitar ruang kelas dan rumah.',
                        creating: 'Menggambar berbagai macam garis dengan alat gambar sederhana (pensil, krayon).',
                        impacting: 'Menghasilkan karya seni garis yang dapat dipajang dan dinikmati bersama keluarga.',
                    },
                    triggerQuestion: 'Apa kalian suka menggambar? Garis apa saja yang bisa kalian temukan di sekitar?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pengertian dan jenis-jenis garis. Siswa mengamati poster atau gambar benda sehari-hari (pensil, cangkir, meja) untuk mengidentifikasi garis lurus, lengkung, dan zig-zag.',
                        joyful:
                            'Permainan interaktif: siswa menunjukkan jenis garis di sekitarnya (garis pada meja, papan tulis, atau ubin). Setelah itu siswa menggambar pola garis bebas dengan krayon.',
                        meaningful:
                            'Siswa membuat gambar sederhana dari benda sekitar (pohon, rumah) menggunakan kombinasi garis lurus, lengkung, dan zig-zag. Presentasi hasil karya di depan kelas.',
                    },
                    materials: [
                        'Buku tulis / buku gambar',
                        'Pensil dan penghapus',
                        'Krayon atau pensil warna',
                        'Poster atau flashcard gambar benda sehari-hari',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati garis pada benda di rumah (garis ubin, garis pintu, garis kabel).',
                        'Sediakan krayon warna cerah agar anak bersemangat menggambar.',
                        'Pajang karya anak di dinding kamar sebagai bentuk apresiasi.',
                        'Beri pujian spesifik: "Wah, garis lengkungmu halus sekali!" bukan hanya "Bagus".',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak kesulitan membedakan garis zig-zag dengan garis lengkung',
                            solution: 'gunakan gerakan tangan di udara: zig-zag = gerakan patah-patah, lengkung = gerakan halus melengkung',
                        },
                        {
                            issue: 'Anak malu menggambar karena takut salah',
                            solution: 'beri contoh bahwa tidak ada gambar yang "salah" dalam seni, semua karya adalah benar',
                        },
                        {
                            issue: 'Anak terlalu cepat menyelesaikan gambar',
                            solution: 'ajak anak menambahkan detail kecil (bunga, matahari, awan) untuk melatih kesabaran',
                        },
                    ],
                    extensions: [
                        'Bermain "Detektif Garis" — cari 5 benda dengan garis lurus, 5 dengan lengkung, 5 dengan zig-zag',
                        'Menggambar pola garis dengan jari di atas pasir atau tepung',
                        'Membuat kaligrafi sederhana menggunakan garis lengkung',
                    ],
                    appreciationStage:
                        'Pajang karya garis anak di "Dinding Galeri Kelas" atau di kulkas rumah. Ajak anak bercerita tentang gambar yang dibuatnya.',
                    reflection: [
                        'Garis apa yang paling mudah kamu gambar?',
                        'Benda apa di rumahmu yang memiliki garis zig-zag?',
                        'Bagaimana perasaanmu saat menggambar hari ini?',
                    ],
                }),
                art_field: 'SENI RUPA',
                required_materials: [
                    'Buku gambar',
                    'Pensil dan penghapus',
                    'Krayon atau pensil warna',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan ceria dan mengajak berdoa bersama. "Selamat pagi, teman-teman! Hari ini kita akan belajar tentang garis yang ada di sekitar kita!"',
                    ice_breaker:
                        'Gerakan Sederhana: Guru mengajak siswa membuat gerakan tangan menggambar garis di udara (lurus, lengkung, zig-zag). "Ayo gambar garis lurus di udara! Sekarang garis lengkung! Sekarang zig-zag!"',
                    apperception:
                        'Guru menunjukkan beberapa gambar benda sehari-hari (pensil, cangkir, meja) dan bertanya: "Apakah kalian melihat garis-garis ini dalam benda-benda di sekitar kalian?"',
                    trigger_question: 'Garis apa saja yang bisa kalian temukan di ruang kelas ini?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Mengenal tiga jenis garis dasar: garis lurus (tegak, datar, miring), garis lengkung (melengkung halus), dan garis zig-zag (patah-patah tajam) melalui pengamatan benda nyata di sekitar.',
                    concrete_steps: [
                        'Guru menunjukkan poster berbagai garis: lurus, lengkung, zig-zag.',
                        'Guru meminta siswa mengamati benda-benda di kelas (meja, papan tulis, cangkir).',
                        'Siswa menyebutkan garis apa yang mereka lihat pada benda tersebut.',
                        'Guru menegaskan: "Garis lurus seperti tepi meja, garis lengkung seperti cangkir, garis zig-zag seperti petir!"',
                        'Ulangi 3x dengan benda berbeda.',
                    ],
                    script_parent:
                        '"Setiap benda di sekitar kita punya garis! Yuk, kita jadi detektif garis hari ini. Coba tunjuk garis lurus di mejamu!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Detektif Garis',
                    game_rules: [
                        'Guru menyebutkan jenis garis (lurus/lengkung/zig-zag).',
                        'Siswa berlomba menyentuh benda di kelas yang memiliki garis tersebut.',
                        'Siswa yang paling cepat menyentuh benda diberi apresiasi.',
                        'Setelah selesai, siswa diminta menggambar pola garis bebas dengan krayon selama 10 menit.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyentuh benda dan menyebutkan jenis garisnya dengan bantuan guru.',
                        child_level_advanced:
                            'Menyebutkan 3 benda sekaligus dengan jenis garisnya masing-masing tanpa bantuan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menggambar macam-macam garis dan membuat karya sederhana dari benda sekitar menggunakan kombinasi garis lurus, lengkung, dan zig-zag.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: MENGGAMBAR MACAM-MACAM GARIS',
                        instructions:
                            'Amati contoh dan tebalkan garis putus-putus. Kemudian gambar bebas di kotak yang tersedia.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'TRACE_PATTERN',
                                question:
                                    'Tebalkan garis putus-putus berikut ini dengan pensil atau krayonmu. Ada garis lurus, lengkung, zig-zag, dan spiral!',
                                data: {
                                    patterns: [
                                        { name: 'Garis Lurus', type: 'straight' },
                                        { name: 'Garis Lengkung', type: 'curved' },
                                        { name: 'Garis Zig-Zag', type: 'zigzag' },
                                        { name: 'Garis Spiral', type: 'spiral' },
                                    ],
                                },
                                answer_key: 'Siswa menebalkan semua garis dengan rapi.',
                                explanation: 'Melatih motorik halus dan mengenal jenis-jenis garis.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah benda yang memiliki garis lurus (misalnya pensil, meja, atau pintu) di kotak berikut:',
                                data: {
                                    prompt: 'Benda dengan garis lurus',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar benda bergaris lurus:',
                                },
                                answer_key: 'Siswa menggambar benda bergaris lurus (pensil, meja, pintu, dll).',
                                explanation: 'Mengasah kreativitas dan penerapan konsep garis lurus.',
                            },
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah benda yang memiliki garis lengkung (misalnya bola, cangkir, atau bulan) di kotak berikut:',
                                data: {
                                    prompt: 'Benda dengan garis lengkung',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar benda bergaris lengkung:',
                                },
                                answer_key: 'Siswa menggambar benda bergaris lengkung (bola, cangkir, bulan, dll).',
                                explanation: 'Mengasah kreativitas dan penerapan konsep garis lengkung.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 4,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Buatlah gambar kreatif yang terdiri dari berbagai macam garis (lurus, lengkung, dan zig-zag)! Misalnya gambar pohon, rumah, atau pemandangan.',
                                data: {
                                    prompt: 'Karya kreatif kombinasi garis',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Karya kreatif dengan berbagai garis:',
                                },
                                answer_key:
                                    'Siswa menggambar karya bebas yang menggabungkan minimal 2 jenis garis.',
                                explanation:
                                    'Mengasah kreativitas tingkat tinggi dan penerapan konsep secara menyeluruh.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Garis apa yang paling mudah kamu gambar?',
                        'Garis apa yang paling sulit? Mengapa?',
                        'Bagaimana perasaanmu setelah menggambar berbagai garis?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya gambar macam-macam garis pada LKPD 1.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 1: Mengenal Macam-Macam Garis',
                        quiz_questions: [
                            {
                                question_text: 'Garis yang lurus tegak disebut garis...',
                                option_a: 'Lengkung',
                                option_b: 'Lurus',
                                option_c: 'Zig-zag',
                                option_d: 'Spiral',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Garis yang patah-patah tajam disebut garis...',
                                option_a: 'Lurus',
                                option_b: 'Zig-zag',
                                option_c: 'Lengkung',
                                option_d: 'Bulat',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Benda berikut yang memiliki garis lengkung adalah...',
                                option_a: 'Meja',
                                option_b: 'Penggaris',
                                option_c: 'Bola',
                                option_d: 'Pintu',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Garis tepi pada pintu rumah biasanya berbentuk...',
                                option_a: 'Lurus',
                                option_b: 'Zig-zag',
                                option_d: 'Spiral',
                                option_c: 'Lengkung',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Contoh benda dengan garis zig-zag adalah...',
                                option_a: 'Matahari',
                                option_b: 'Petir atau kilat',
                                option_c: 'Bola',
                                option_d: 'Cangkir',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Pertemuan 2: Mengenal Bentuk Dasar & Berkreasi Menempel',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menjelaskan cara menempelkan dan memotong aneka bentuk dasar (lingkaran, persegi, segitiga) serta membuat karya sederhana dengan cara menempelkan dan memotong.',
                content_text: buildContentText({
                    title: 'Pertemuan 2: Mengenal Bentuk Dasar & Berkreasi Menempel',
                    artField: 'SENI RUPA',
                    objectives: [
                        'Mengenal bentuk dasar: lingkaran, persegi, dan segitiga',
                        'Menjelaskan cara memotong dan menempel dengan rapi',
                        'Membuat karya sederhana dengan cara menempelkan dan memotong bentuk',
                    ],
                    subMaterial:
                        'Mengenal tiga bentuk dasar: **lingkaran** (bulat penuh), **persegi** (empat sisi sama panjang), dan **segitiga** (tiga sisi, tiga sudut). Siswa berkreasi membuat kolase dari potongan bentuk-bentuk dasar.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati bentuk-bentuk dasar pada benda di sekitar (jam dinding, ubin, atap rumah).',
                        creating:
                            'Memotong dan menempel bentuk dasar menjadi karya seni kolase yang kreatif.',
                        impacting:
                            'Menghasilkan karya kolase yang dapat dipajang dan menumbuhkan rasa bangga pada diri siswa.',
                    },
                    triggerQuestion:
                        'Apa saja bentuk yang kalian ketahui? Siapa yang pernah memotong kertas untuk membuat karya?',
                    activities: {
                        mindful:
                            'Guru memperkenalkan bentuk dasar (lingkaran, persegi, segitiga). Siswa mengenal bentuk dengan memotong kertas mengikuti pola yang sudah disiapkan guru.',
                        joyful:
                            'Permainan "Tempel Bentuk": siswa dalam kelompok kecil membuat komposisi gambar dengan menempelkan bentuk-bentuk tersebut di kertas besar. Setelah itu menghias dengan krayon.',
                        meaningful:
                            'Siswa menyusun karya seni kelompok dan menempelkannya di papan display kelas. Setiap kelompok mempresentasikan hasil karya dan menjelaskan bentuk-bentuk yang digunakan.',
                    },
                    materials: [
                        'Kertas warna / origami',
                        'Gunting tumpul untuk anak',
                        'Lem kertas',
                        'Kertas gambar besar (A3)',
                        'Krayon atau pensil warna',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Awasi anak saat menggunakan gunting, berikan gunting tumpul khusus anak.',
                        'Sediakan kertas warna beragam agar anak lebih kreatif.',
                        'Pajang hasil karya kolase anak di kamar atau ruang keluarga.',
                        'Ajak anak membuat kolase dari barang bekas (potongan majalah, koran) di rumah.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak kesulitan menggunting mengikuti pola',
                            solution: 'berikan pola tebal dengan garis hitam besar, dan bantu memegang gunting dengan benar',
                        },
                        {
                            issue: 'Anak terlalu banyak menggunakan lem',
                            solution: 'ajarkan teknik "titik-titik lem" di 4 sudut bentuk saja, tidak perlu seluruh permukaan',
                        },
                        {
                            issue: 'Anak bingung ingin membuat karya apa',
                            solution: 'beri contoh kolase sederhana (pohon dari segitiga + persegi, atau rumah dari persegi + segitiga)',
                        },
                    ],
                    extensions: [
                        'Membuat kolase dari bahan alam: daun kering, biji-bijian, atau ranting',
                        'Membuat wayang sederhana dari potongan bentuk dasar',
                        'Membuat hiasan dinding bentuk dari kertas origami',
                    ],
                    appreciationStage:
                        'Gelar "Pameran Karya Kelas" — semua karya kolase dipajang di dinding kelas dengan nama siswa. Orang tua diundang untuk melihat karya anak.',
                    reflection: [
                        'Bentuk apa yang paling mudah kamu potong?',
                        'Bentuk apa yang paling sulit?',
                        'Bagaimana perasaanmu saat karyamu dipajang di papan display?',
                    ],
                }),
                art_field: 'SENI RUPA',
                required_materials: [
                    'Kertas warna/origami',
                    'Gunting tumpul anak',
                    'Lem kertas',
                    'Kertas gambar besar',
                    'Krayon',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan salam dan mengajak berdoa bersama sebelum memulai pelajaran.',
                    ice_breaker:
                        'Guru menunjukkan beberapa bentuk dasar (lingkaran, persegi, segitiga) dan bertanya: "Bentuk apa ini? Siapa yang bisa menebak?"',
                    apperception:
                        'Guru memberikan pertanyaan sederhana: "Apa saja bentuk yang kalian ketahui?" dan "Apakah kalian pernah memotong kertas untuk membuat karya seni?"',
                    trigger_question:
                        'Bentuk apa yang paling kamu sukai? Mengapa?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Mengenal tiga bentuk dasar: lingkaran (bulat penuh), persegi (empat sisi sama), segitiga (tiga sisi) melalui pengamatan benda berwarna.',
                    concrete_steps: [
                        'Guru menunjukkan bentuk dasar dari kertas warna: lingkaran, persegi, segitiga.',
                        'Siswa diminta menyebutkan benda di sekitar yang memiliki bentuk tersebut.',
                        'Guru memperagakan cara memotong mengikuti pola dengan hati-hati.',
                        'Siswa memotong bentuk-bentuk yang telah ditandai di atas kertas.',
                        'Guru memberi pujian atas usaha setiap siswa.',
                    ],
                    script_parent:
                        '"Bentuk dasar adalah pondasi karya seni! Setiap gambar yang indah selalu dibangun dari bentuk-bentuk dasar ini."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Permainan Tempel Bentuk',
                    game_rules: [
                        'Guru membagi siswa menjadi kelompok kecil (3-4 orang).',
                        'Setiap kelompok diberikan potongan kertas berbagai bentuk.',
                        'Setiap kelompok membuat komposisi gambar dengan menempelkan bentuk-bentuk tersebut di kertas besar.',
                        'Setelah menempel, siswa menghias karya dengan krayon.',
                        'Guru memberikan pujian untuk kelompok yang paling kreatif dan kerja sama terbaik.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menempelkan bentuk sesuai contoh yang diberikan guru.',
                        child_level_advanced:
                            'Membuat komposisi bebas (rumah, pohon, hewan) dari bentuk dasar tanpa panduan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menyusun karya seni kelompok dan menempelkan di papan display. Presentasi hasil karya ke depan kelas.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: BERKREASI DENGAN BENTUK DASAR',
                        instructions:
                            'Amati bentuk dasar berikut, lalu klasifikasikan benda sesuai bentuknya.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'SHAPE_SORTING',
                                question:
                                    'Amati gambar benda berikut. Kelompokkan sesuai bentuk dasarnya: lingkaran, persegi, atau segitiga.',
                                data: {
                                    items: [
                                        { label: 'Jam Dinding', icon: '⏰', shape: 'circle' },
                                        { label: 'Buku', icon: '📕', shape: 'square' },
                                        { label: 'Atap Rumah', icon: '🏠', shape: 'triangle' },
                                        { label: 'Roda', icon: '🛞', shape: 'circle' },
                                        { label: 'Ubin Lantai', icon: '🟫', shape: 'square' },
                                        { label: 'Potongan Pizza', icon: '🍕', shape: 'triangle' },
                                    ],
                                    categories: [
                                        { name: 'Lingkaran', shape: 'circle' },
                                        { name: 'Persegi', shape: 'square' },
                                        { name: 'Segitiga', shape: 'triangle' },
                                    ],
                                },
                                answer_key:
                                    'Lingkaran: Jam Dinding, Roda. Persegi: Buku, Ubin Lantai. Segitiga: Atap Rumah, Potongan Pizza.',
                                explanation:
                                    'Melatih pengamatan bentuk pada benda nyata di sekitar.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah kolase dari potongan bentuk dasar (lingkaran, persegi, segitiga) untuk membuat gambar rumah sederhana!',
                                data: {
                                    prompt: 'Kolase bentuk rumah',
                                    guideLines: 'grid',
                                    rows: 1,
                                    label: 'Gambar rumah dari bentuk dasar:',
                                },
                                answer_key:
                                    'Siswa menggambar rumah dengan kombinasi persegi (badan rumah) + segitiga (atap) + lingkaran (jendela).',
                                explanation:
                                    'Menerapkan konsep bentuk dasar dalam karya kreatif.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Buatlah karya bebas menggunakan minimal 3 bentuk dasar yang berbeda (lingkaran, persegi, segitiga)!',
                                data: {
                                    prompt: 'Karya bebas dari 3 bentuk',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Karya bebas dari berbagai bentuk:',
                                },
                                answer_key:
                                    'Siswa menggambar apa saja (pemandangan, kendaraan, hewan) dari kombinasi 3 bentuk dasar.',
                                explanation:
                                    'Mengasah kreativitas tingkat tinggi dengan menggabungkan bentuk dasar.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bentuk apa yang paling mudah kamu potong?',
                        'Bentuk apa yang paling sulit?',
                        'Bagaimana perasaanmu saat karyamu dipajang di papan display?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya kolase bentuk dari LKPD 1.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Bab 1: Bentuk Dasar',
                        quiz_questions: [
                            {
                                question_text: 'Jam dinding memiliki bentuk...',
                                option_a: 'Segitiga',
                                option_b: 'Persegi',
                                option_c: 'Lingkaran',
                                option_d: 'Trapesium',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Atap rumah biasanya berbentuk...',
                                option_a: 'Lingkaran',
                                option_b: 'Segitiga',
                                option_c: 'Persegi',
                                option_d: 'Bulat',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Buku tulis pada umumnya memiliki bentuk...',
                                option_a: 'Segitiga',
                                option_b: 'Persegi',
                                option_c: 'Lingkaran',
                                option_d: 'Oval',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Bentuk dasar yang memiliki 3 sisi dan 3 sudut adalah...',
                                option_a: 'Persegi',
                                option_b: 'Lingkaran',
                                option_c: 'Segitiga',
                                option_d: 'Oval',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Saat menempel bentuk di kertas, kita menggunakan...',
                                option_a: 'Gunting',
                                option_b: 'Lem',
                                option_c: 'Pensil',
                                option_d: 'Penghapus',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🎨 SENI RUPA — BAB 2: PENGGUNAAN GARIS, BENTUK & WARNA (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 2,
        title: 'Bab 2 Seni Rupa: Penggunaan Garis, Bentuk, dan Warna',
        art_field: 'SENI RUPA',
        target_semester: 2,
        week_target: 3,
        lessons: [
            {
                title: 'Pertemuan 3: Penggunaan Garis dan Bentuk',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menjelaskan penggunaan garis dan bentuk serta mengidentifikasi garis dan bentuk dari benda-benda di sekitar dengan lebih mendalam.',
                content_text: buildContentText({
                    title: 'Pertemuan 3: Penggunaan Garis dan Bentuk',
                    artField: 'SENI RUPA',
                    objectives: [
                        'Menjelaskan penggunaan garis dan bentuk dalam karya seni',
                        'Mengidentifikasi garis dan bentuk dari benda-benda di sekitar',
                        'Menggambar benda kesukaan menggunakan garis dan bentuk dasar',
                    ],
                    subMaterial:
                        'Menerapkan **garis dan bentuk dasar** pada karya seni yang lebih kompleks. Siswa belajar bahwa setiap benda di sekitar dapat dipecah menjadi garis dan bentuk dasar untuk memudahkan menggambar.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati lingkungan sekitar dan mengidentifikasi garis serta bentuk pada benda-benda nyata.',
                        creating:
                            'Menggambar benda kesukaan dengan menggunakan kombinasi garis dan bentuk dasar.',
                        impacting:
                            'Karya siswa dipamerkan dalam "Galeri Kelas" sehingga menumbuhkan rasa bangga berkarya.',
                    },
                    triggerQuestion: 'Apa kalian suka menggambar bentuk? Benda apa yang ingin kalian gambar hari ini?',
                    activities: {
                        mindful:
                            'Guru menjelaskan secara rinci tentang jenis-jenis garis dan bentuk dasar. Siswa diminta memperhatikan benda-benda di kelas dan mengidentifikasi garis serta bentuk yang mereka lihat.',
                        joyful:
                            'Siswa dibagi menjadi beberapa kelompok kecil. Setiap kelompok menggambar benda di sekitar kelas menggunakan garis dan bentuk dasar (daun dengan garis lengkung, meja dengan persegi).',
                        meaningful:
                            'Siswa diminta menggambar benda kesukaan mereka di kertas gambar. Setelah selesai, setiap siswa mempresentasikan karyanya di depan kelas.',
                    },
                    materials: [
                        'Buku gambar',
                        'Pensil dan penghapus',
                        'Krayon atau pensil warna',
                        'Contoh gambar benda (flashcard)',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak mengamati benda di rumah dan pecah menjadi garis & bentuk.',
                        'Sediakan buku gambar khusus agar anak bebas berekspresi.',
                        'Berikan apresiasi pada setiap karya, tidak hanya yang rapi.',
                        'Pajang karya anak di rumah dan ceritakan ke anggota keluarga lain.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak kesulitan memecah benda menjadi bentuk dasar',
                            solution: 'ajarkan teknik "lihat bentuk dulu": benda kompleks = kombinasi bentuk sederhana',
                        },
                        {
                            issue: 'Anak mengeluh gambarnya jelek',
                            solution: 'tunjukkan bahwa semua seniman besar juga belajar dari kesalahan; yang penting adalah usaha',
                        },
                    ],
                    extensions: [
                        'Menggambar benda favorit dengan mata tertutup untuk melatih imajinasi',
                        'Membuat "buku sketsa" berisi 10 benda di rumah yang digambar',
                        'Membuat gambar bercerita dari 3 benda favorit',
                    ],
                    appreciationStage:
                        'Buat "Galeri Kelas" dengan tempelan karya anak. Ajak anak berkeliling dan memberi komentar positif pada karya teman.',
                    reflection: [
                        'Benda apa yang paling mudah kamu gambar?',
                        'Benda apa yang paling sulit?',
                        'Bagaimana perasaanmu saat mempresentasikan karyamu?',
                    ],
                }),
                art_field: 'SENI RUPA',
                required_materials: [
                    'Buku gambar',
                    'Pensil dan penghapus',
                    'Krayon atau pensil warna',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Guru menyapa siswa dengan senyuman dan bertanya tentang hari mereka.',
                    ice_breaker:
                        'Guru memperlihatkan gambar benda sehari-hari (bola, meja, daun) dan bertanya: "Bentuk apa yang kamu lihat pada benda ini?"',
                    apperception:
                        'Guru mengulang kembali materi garis dan bentuk dasar dari semester sebelumnya.',
                    trigger_question: 'Benda apa yang paling ingin kamu gambar hari ini?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Setiap benda di dunia dapat dipecah menjadi garis dan bentuk dasar. Ini adalah kunci menggambar dengan mudah!',
                    concrete_steps: [
                        'Guru menjelaskan bahwa semua benda = kombinasi garis + bentuk dasar.',
                        'Guru menunjukkan contoh: bola = 1 lingkaran; meja = 1 persegi; atap = 1 segitiga.',
                        'Siswa mengamati 3 benda di sekitar kelas dan menyebutkan bentuk dasarnya.',
                        'Siswa berlatih menggambar 3 benda sederhana dengan bentuk dasar.',
                    ],
                    script_parent:
                        '"Kalau kamu bisa menggambar lingkaran, persegi, dan segitiga, kamu bisa menggambar APA SAJA!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Benda dari Bentuknya',
                    game_rules: [
                        'Guru menggambar bentuk dasar di papan tulis (lingkaran, persegi, atau segitiga).',
                        'Siswa berlomba menyebutkan benda apa saja yang bisa dibuat dari bentuk tersebut.',
                        'Contoh: lingkaran = bola, jam, matahari; persegi = buku, TV, jendela; segitiga = atap, pizza, topi ulang tahun.',
                        'Siswa yang paling banyak menyebutkan benda diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan 2 benda dari bentuk dasar.',
                        child_level_advanced: 'Menggambar langsung benda tersebut di papan tulis.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menggambar benda kesukaan dan mengidentifikasi garis & bentuk yang digunakan.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: MENGGAMBAR BENDA KESUKAAN',
                        instructions:
                            'Gambar benda kesukaanmu menggunakan kombinasi garis dan bentuk dasar. Ceritakan bentuk apa saja yang kamu gunakan.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah benda kesukaanmu (misalnya bola, hewan, atau mainan) menggunakan bentuk dasar dan garis!',
                                data: {
                                    prompt: 'Benda kesukaanku',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar benda kesukaanku:',
                                },
                                answer_key:
                                    'Siswa menggambar benda apa saja dengan kombinasi bentuk dasar dan garis.',
                                explanation: 'Menerapkan konsep bentuk dasar dan garis pada karya personal.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah benda yang ada di ruang kelasmu (misalnya papan tulis, kursi, atau lampu)!',
                                data: {
                                    prompt: 'Benda di ruang kelas',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Benda di ruang kelasku:',
                                },
                                answer_key: 'Siswa menggambar salah satu benda di ruang kelas.',
                                explanation: 'Melatih pengamatan lingkungan sekitar.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Buatlah pemandangan sederhana (misalnya gunung, sawah, atau taman) menggunakan garis dan bentuk dasar!',
                                data: {
                                    prompt: 'Pemandangan dari bentuk dasar',
                                    guideLines: 'baseline',
                                    rows: 1,
                                    label: 'Pemandangan dari bentuk dasar:',
                                },
                                answer_key:
                                    'Siswa menggambar pemandangan bebas dengan kombinasi garis dan bentuk.',
                                explanation:
                                    'Mengasah kreativitas tingkat tinggi dengan menerapkan semua konsep garis dan bentuk.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bentuk dasar apa yang paling banyak kamu gunakan?',
                        'Bagian mana dari gambarmu yang paling kamu sukai?',
                        'Benda apa lagi yang ingin kamu gambar besok?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya gambar benda kesukaanmu pada LKPD 2.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Garis dan Bentuk dalam Seni',
                        quiz_questions: [
                            {
                                question_text: 'Benda yang berbentuk lingkaran adalah...',
                                option_a: 'Buku',
                                option_b: 'Bola',
                                option_c: 'Meja',
                                option_d: 'Pintu',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Atap rumah pada umumnya berbentuk...',
                                option_a: 'Lingkaran',
                                option_b: 'Segitiga',
                                option_c: 'Persegi',
                                option_d: 'Oval',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Gambar pohon biasanya menggunakan garis...',
                                option_a: 'Zig-zag untuk batang',
                                option_b: 'Lurus untuk batang, lengkung untuk daun',
                                option_c: 'Hanya spiral',
                                option_d: 'Hanya zig-zag',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Setiap benda di sekitar kita dapat dipecah menjadi...',
                                option_a: 'Garis dan bentuk dasar',
                                option_b: 'Hanya warna',
                                option_c: 'Hanya tulisan',
                                option_d: 'Hanya angka',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Menggambar dengan bentuk dasar membuat kita lebih...',
                                option_a: 'Bingung',
                                option_b: 'Mudah menggambar',
                                option_c: 'Cepat bosan',
                                option_d: 'Takut salah',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Pertemuan 4: Warna di Sekitar Kita',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menjelaskan cara warna di sekitar dan menerapkannya dalam karya seni rupa sederhana.',
                content_text: buildContentText({
                    title: 'Pertemuan 4: Warna di Sekitar Kita',
                    artField: 'SENI RUPA',
                    objectives: [
                        'Mengenal berbagai warna di sekitar (primer dan sekunder)',
                        'Memahami fungsi warna untuk mengekspresikan perasaan',
                        'Menggambar dan mewarnai karya seni dengan kreatif',
                    ],
                    subMaterial:
                        'Mengenal **warna primer** (merah, kuning, biru) dan **warna sekunder** (oranye, hijau, ungu). Siswa belajar bahwa warna dapat menyampaikan perasaan: merah = semangat, biru = tenang, kuning = ceria.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati warna-warna di lingkungan sekitar (bunga, langit, daun) dan mengidentifikasi jenis warnanya.',
                        creating:
                            'Menggambar dan mewarnai karya dengan pilihan warna yang bermakna.',
                        impacting:
                            'Karya berwarna siswa dipajang untuk menyampaikan pesan positif bagi lingkungan kelas.',
                    },
                    triggerQuestion:
                        'Warna apa favoritmu? Mengapa kamu menyukai warna itu?',
                    activities: {
                        mindful:
                            'Guru mengajak siswa melihat lingkungan sekitar (jendela kelas atau gambar) dan menunjukkan warna-warna yang ada. Siswa menyebutkan warna pada objek tertentu: daun hijau, langit biru, dll.',
                        joyful:
                            'Permainan Warna: siswa dalam kelompok kecil mewarnai gambar garis-garis dengan warna favorit. Guru juga mengajak menyanyikan lagu "Pelangi-Pelangi" sambil menunjuk warna pada gambar pelangi.',
                        meaningful:
                            'Siswa menggambar benda di lingkungan sekitar (bunga, pohon, rumah) dan mewarnai dengan warna-warna yang mereka kenali. Presentasi hasil gambar di depan kelas.',
                    },
                    materials: [
                        'Krayon atau pensil warna lengkap',
                        'Kertas gambar',
                        'Gambar-gambar berwarna (flashcard bunga, hewan, langit)',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Bicarakan makna warna dengan anak: "Warna apa yang membuatmu senang?"',
                        'Sediakan krayon 12 warna untuk memperkaya pengalaman anak.',
                        'Ajak anak melihat warna pelangi di langit setelah hujan.',
                        'Pajang karya berwarna anak untuk menumbuhkan rasa bangga.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan warna sekunder (oranye, ungu, hijau)',
                            solution: 'gunakan benda nyata: oranye = jeruk, ungu = terong, hijau = daun',
                        },
                        {
                            issue: 'Anak terlalu banyak menggunakan satu warna favorit',
                            solution: 'ajak anak bereksperimen dengan warna berbeda di setiap bagian gambar',
                        },
                    ],
                    extensions: [
                        'Membuat "warna pelangi" dengan campuran air + pewarna makanan',
                        'Membuat kolase dari potongan kertas warna pelangi',
                        'Menggambar suasana hati dengan warna (kuning = senang, biru = tenang)',
                    ],
                    appreciationStage:
                        'Buat "Galeri Warna" dengan semua karya anak. Setiap anak menunjuk warna favoritnya dan menjelaskan alasannya.',
                    reflection: [
                        'Warna apa yang paling kamu sukai?',
                        'Warna apa yang kamu gunakan untuk menggambar hari ini?',
                        'Bagaimana perasaanmu setelah melihat semua karya berwarna di kelas?',
                    ],
                }),
                art_field: 'SENI RUPA',
                required_materials: [
                    'Krayon atau pensil warna',
                    'Kertas gambar',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan semangat dan menyebutkan warna favoritnya.',
                    ice_breaker:
                        'Guru mengajak siswa saling menyebutkan warna favorit mereka masing-masing.',
                    apperception:
                        'Guru menunjukkan gambar berwarna dan bertanya: "Warna apa saja yang terlihat?"',
                    trigger_question: 'Warna apa yang kamu lihat di sekitar rumahmu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Warna primer (merah, kuning, biru) dan warna sekunder (oranye, hijau, ungu), serta fungsi warna untuk ekspresi.',
                    concrete_steps: [
                        'Guru menunjukkan warna primer dan sekunder dengan krayon.',
                        'Siswa mengamati warna di lingkungan kelas dan menyebutkannya.',
                        'Guru menjelaskan makna warna: merah = semangat, biru = tenang.',
                        'Siswa memilih warna sesuai perasaan mereka hari ini.',
                    ],
                    script_parent:
                        '"Warna bukan hanya indah, tapi juga menyampaikan perasaan! Merah berarti semangat, biru berarti tenang."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Berburu Warna Sekitar',
                    game_rules: [
                        'Guru menyebutkan warna (merah, kuning, biru, dll).',
                        'Siswa berlomba menyentuh benda di kelas yang memiliki warna tersebut.',
                        'Siswa yang paling cepat diberi apresiasi.',
                        'Setelah permainan, siswa mewarnai gambar yang disiapkan guru sesuai warna favorit.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyentuh benda dengan bantuan guru.',
                        child_level_advanced: 'Menyebutkan nama warna dalam bahasa Inggris juga (red, blue).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menggambar benda kesukaan dan mewarnai dengan kreatif.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: WARNA DI SEKITAR KITA',
                        instructions:
                            'Amati warna di sekitarmu dan warnai gambar berikut sesuai warna yang kamu lihat di lingkunganmu.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dan warnai bunga atau pohon menggunakan warna-warna favoritmu!',
                                data: {
                                    prompt: 'Bunga atau pohon berwarna',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Bunga/pohon warna-warni:',
                                },
                                answer_key: 'Siswa menggambar dan mewarnai bunga atau pohon.',
                                explanation: 'Melatih kreativitas dengan warna.',
                            },
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah langit dengan matahari dan awan. Warnai sesuai warna aslinya!',
                                data: {
                                    prompt: 'Langit dengan matahari & awan',
                                    guideLines: 'baseline',
                                    rows: 1,
                                    label: 'Langit, matahari & awan:',
                                },
                                answer_key:
                                    'Langit biru, matahari kuning/oranye, awan putih.',
                                explanation: 'Mengasah pengamatan warna alam.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Buatlah gambar pemandangan lengkap (gunung, sawah, pohon, matahari) dan warnai dengan indah!',
                                data: {
                                    prompt: 'Pemandangan berwarna',
                                    guideLines: 'baseline',
                                    rows: 1,
                                    label: 'Pemandangan lengkap:',
                                },
                                answer_key:
                                    'Siswa menggambar pemandangan dengan berbagai warna harmonis.',
                                explanation:
                                    'Menerapkan semua konsep warna pada karya kompleks.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Warna apa yang paling kamu sukai? Mengapa?',
                        'Warna apa yang membuatmu merasa senang?',
                        'Bagaimana perasaanmu setelah mewarnai hari ini?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya mewarnai pada LKPD 2.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Warna di Sekitar Kita',
                        quiz_questions: [
                            {
                                question_text: 'Warna daun pohon di taman adalah...',
                                option_a: 'Merah',
                                option_b: 'Hijau',
                                option_c: 'Biru',
                                option_d: 'Hitam',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Warna langit di siang hari yang cerah adalah...',
                                option_a: 'Merah',
                                option_b: 'Hijau',
                                option_c: 'Biru',
                                option_d: 'Kuning',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Warna matahari pada gambar biasanya...',
                                option_a: 'Hitam',
                                option_b: 'Kuning atau oranye',
                                option_c: 'Biru',
                                option_d: 'Abu-abu',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Warna yang membuat kita merasa ceria adalah...',
                                option_a: 'Hitam',
                                option_b: 'Abu-abu',
                                option_c: 'Kuning',
                                option_d: 'Cokelat',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Pelangi memiliki... warna',
                                option_a: '2',
                                option_b: '3',
                                option_c: '5',
                                option_d: '7',
                                correct_answer: 'D',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 💃 SENI TARI — BAB 3: GERAK ANGGOTA TUBUH (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 3,
        title: 'Bab 3 Seni Tari: Gerak Anggota Tubuh',
        art_field: 'SENI TARI',
        target_semester: 1,
        week_target: 5,
        lessons: [
            {
                title: 'Pertemuan 5: Mengenal Gerak Anggota Tubuh',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengidentifikasi jenis gerak anggota tubuh dan memperagakan koordinasi gerak tubuh dalam tarian sederhana.',
                content_text: buildContentText({
                    title: 'Pertemuan 5: Mengenal Gerak Anggota Tubuh',
                    artField: 'SENI TARI',
                    objectives: [
                        'Mengidentifikasi jenis gerak anggota tubuh (tangan, kaki, kepala, pinggang)',
                        'Memperagakan koordinasi gerak tubuh dalam tarian sederhana',
                        'Menumbuhkan rasa percaya diri saat menari',
                    ],
                    subMaterial:
                        'Mengenal **gerak dasar anggota tubuh** dalam seni tari: gerak tangan (melambai, mengangkat), gerak kaki (melangkah, mengangkat), gerak kepala (menoleh, mengangguk), dan gerak pinggang (menggoyang, memutar).',
                    cpHolistic: {
                        experiencing:
                            'Mengamati dan mengidentifikasi gerakan anggota tubuh dalam tarian sederhana.',
                        creating:
                            'Memperagakan rangkaian gerakan anggota tubuh yang harmonis dan indah.',
                        impacting:
                            'Menumbuhkan kepercayaan diri dan kebugaran jasmani melalui gerak tari.',
                    },
                    triggerQuestion: 'Apa kalian suka menari? Anggota tubuh apa saja yang kita gerakkan saat menari?',
                    activities: {
                        mindful:
                            'Guru menjelaskan fungsi masing-masing anggota tubuh dalam gerakan tari. Siswa memperagakan setiap gerakan (tangan, kaki, kepala, pinggang) sambil memperhatikan koordinasi tubuh.',
                        joyful:
                            'Permainan Tari: siswa dalam kelompok kecil (3-4 orang) menciptakan kombinasi gerakan dari gerakan yang telah diajarkan. Setiap kelompok tampil di depan kelas.',
                        meaningful:
                            'Siswa dalam kelompok besar (2 kelompok) mempraktikkan tarian sederhana dengan urutan gerakan yang sudah diajarkan. Setiap kelompok tampil dan mendapat masukan positif dari guru.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Musik pengiring tari anak (dari speaker/HP)',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak menari di rumah mengikuti lagu anak favoritnya.',
                        'Rekam video anak menari untuk melihat kemajuannya.',
                        'Berikan apresiasi spesifik: "Kaki kamu bergerak dengan luwes sekali!"',
                        'Sediakan ruang kosong di rumah untuk anak bergerak bebas.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malu menari di depan teman',
                            solution: 'mulai dari gerakan sederhana, pujilah setiap usaha, ciptakan suasana menyenangkan',
                        },
                        {
                            issue: 'Anak kesulitan mengoordinasikan tangan dan kaki',
                            solution: 'latih satu per satu dulu: tangan dulu, baru kaki, lalu gabungkan',
                        },
                    ],
                    extensions: [
                        'Menari bersama seluruh keluarga di ruang tamu',
                        'Membuat gerakan tari sederhana dari kegiatan sehari-hari (menyapu, mencuci)',
                        'Menonton video tari anak-anak dari berbagai daerah di Indonesia',
                    ],
                    appreciationStage:
                        'Buat "Pentas Tari Kelas" — setiap anak tampil menari di depan kelas, disaksikan teman-teman. Tepuk tangan meriah sebagai apresiasi.',
                    reflection: [
                        'Gerakan apa yang paling mudah kamu lakukan?',
                        'Gerakan apa yang paling sulit?',
                        'Bagaimana perasaanmu saat menari bersama teman?',
                    ],
                }),
                art_field: 'SENI TARI',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Musik pengiring',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan hangat dan mengajak berdoa bersama. "Selamat pagi, teman-teman! Hari ini kita akan belajar menari!"',
                    ice_breaker:
                        'Gerakan Sederhana: Guru mengajak siswa melakukan pemanasan dengan menggerakkan tangan ke atas-bawah, menggelengkan kepala kiri-kanan, mengangkat kaki bergantian.',
                    apperception:
                        'Guru bertanya: "Siapa yang pernah melihat atau melakukan tarian? Apa yang digerakkan saat menari?"',
                    trigger_question: 'Anggota tubuh mana yang paling sering kita gerakkan saat menari?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Mengenal 4 anggota tubuh utama dalam gerak tari: tangan, kaki, kepala, dan pinggang. Setiap anggota tubuh memiliki gerakan khas yang indah.',
                    concrete_steps: [
                        'Guru memperagakan gerak tangan (melambai, mengangkat).',
                        'Guru memperagakan gerak kaki (melangkah, mengangkat).',
                        'Guru memperagakan gerak kepala (menoleh, mengangguk).',
                        'Guru memperagakan gerak pinggang (menggoyang, memutar).',
                        'Siswa menirukan setiap gerakan satu per satu.',
                    ],
                    script_parent:
                        '"Menari itu mudah! Cukup gerakkan tangan, kaki, kepala, dan pinggang dengan gembira!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tepuk Anggota Tubuh + Tari Bersama',
                    game_rules: [
                        'Guru menyebutkan anggota tubuh (tangan/kaki/kepala/pinggang).',
                        'Siswa memperagakan gerakan sesuai anggota tubuh yang disebutkan.',
                        'Setelah pemanasan, guru memutar lagu "Kepala, Pundak, Lutut, Kaki".',
                        'Siswa menyanyi dan menari bersama mengikuti lagu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengikuti gerakan guru dengan tempo lambat.',
                        child_level_advanced: 'Menambahkan variasi gerakan sendiri pada lagu.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Mempraktikkan gerakan anggota tubuh dalam kelompok dan mengisi LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: GERAK ANGGOTA TUBUH DALAM TARI',
                        instructions:
                            'Amati gambar kartu gerak berikut. Peragakan setiap gerakan satu per satu, lalu centang (✓) setelah kamu berhasil!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'BODY_MOVEMENT_CARD',
                                question:
                                    'Peragakan gerakan anggota tubuh berikut satu per satu. Centang setelah kamu berhasil melakukannya!',
                                data: {
                                    movements: [
                                        {
                                            name: 'Gerak Tangan',
                                            icon: '👋',
                                            instruction: 'Angkat kedua tangan ke atas, lalu lambaikan ke kiri dan ke kanan.',
                                        },
                                        {
                                            name: 'Gerak Kaki',
                                            icon: '🦵',
                                            instruction: 'Angkat kaki kanan, lalu kaki kiri bergantian seperti berjalan di tempat.',
                                        },
                                        {
                                            name: 'Gerak Kepala',
                                            icon: '👤',
                                            instruction: 'Tolehkan kepala ke kiri, ke kanan, lalu anggukkan ke depan.',
                                        },
                                        {
                                            name: 'Gerak Pinggang',
                                            icon: '💃',
                                            instruction: 'Letakkan kedua tangan di pinggang, lalu goyangkan ke kiri dan ke kanan.',
                                        },
                                    ],
                                },
                                answer_key:
                                    'Siswa memperagakan semua gerakan dan memberi centang di setiap kotak.',
                                explanation:
                                    'Melatih koordinasi gerak tubuh dan kepercayaan diri.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang menari dengan gerakan favoritmu!',
                                data: {
                                    prompt: 'Aku sedang menari',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Gambar diriku sedang menari:',
                                },
                                answer_key:
                                    'Siswa menggambar diri sendiri dalam posisi menari.',
                                explanation: 'Mengasah imajinasi dan ekspresi diri.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Gerakan apa yang paling mudah kamu lakukan?',
                        'Gerakan apa yang paling sulit?',
                        'Bagaimana perasaanmu setelah menari?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menyebutkan 4 anggota tubuh yang digunakan saat menari (tangan, kaki, kepala, pinggang)!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Gerak Anggota Tubuh dalam Tari',
                        quiz_questions: [
                            {
                                question_text: 'Anggota tubuh yang digunakan untuk melambai saat menari adalah...',
                                option_a: 'Kaki',
                                option_b: 'Tangan',
                                option_c: 'Kepala',
                                option_d: 'Pinggang',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Gerakan menggelengkan kepala menggunakan anggota tubuh...',
                                option_a: 'Tangan',
                                option_b: 'Kaki',
                                option_c: 'Kepala',
                                option_d: 'Pinggang',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Gerakan melangkah menggunakan anggota tubuh...',
                                option_a: 'Kaki',
                                option_b: 'Tangan',
                                option_c: 'Kepala',
                                option_d: 'Mata',
                                correct_answer: 'A',
                            },
                            {
                                question_text: 'Saat menari kita harus bergerak dengan...',
                                option_a: 'Marah',
                                option_b: 'Sedih',
                                option_c: 'Gembira dan percaya diri',
                                option_d: 'Takut',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Menari dapat membuat tubuh menjadi...',
                                option_a: 'Sakit',
                                option_b: 'Sehat dan bugar',
                                option_c: 'Lelah',
                                option_d: 'Kaku',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Pertemuan 6: Ruang Gerak dalam Tari',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menerapkan unsur ruang gerak tari (sempit dan luas) dalam gerakan tari sederhana.',
                content_text: buildContentText({
                    title: 'Pertemuan 6: Ruang Gerak dalam Tari',
                    artField: 'SENI TARI',
                    objectives: [
                        'Mengenal konsep ruang gerak dalam tari (sempit dan luas)',
                        'Membedakan gerak di tempat dan gerak berpindah',
                        'Mempraktikkan gerakan tari yang memanfaatkan ruang sempit dan luas',
                    ],
                    subMaterial:
                        'Mengenal **ruang gerak** dalam tari: ruang **sempit** (gerakan di tempat seperti berdiri diam dengan gerakan tangan) dan ruang **luas** (gerakan berpindah seperti berjalan, melompat, atau berputar).',
                    cpHolistic: {
                        experiencing:
                            'Mengamati perbedaan gerak di tempat (ruang sempit) dan gerak berpindah (ruang luas).',
                        creating:
                            'Menciptakan rangkaian gerakan tari yang memanfaatkan ruang sempit dan luas.',
                        impacting:
                            'Menumbuhkan kesadaran spasial dan kepercayaan diri saat tampil di depan orang lain.',
                    },
                    triggerQuestion:
                        'Pernahkah kalian menari sambil berjalan berpindah tempat? Bagaimana rasanya?',
                    activities: {
                        mindful:
                            'Guru menjelaskan konsep ruang gerak sempit vs luas. Guru memberi contoh gerakan dengan ruang sempit (berdiri di tempat) dan ruang luas (bergerak ke berbagai arah). Siswa mengamati dan mencoba menirukan.',
                        joyful:
                            'Permainan Ruang Gerak: siswa dalam kelompok kecil membuat gerakan sederhana yang memanfaatkan ruang (maju, mundur, ke samping, ke atas-bawah). Kelompok dengan variasi gerakan terbaik mendapat pujian.',
                        meaningful:
                            'Guru memutar musik pengiring. Siswa membuat gerakan tari menggunakan ruang gerak yang luas dan sempit. Setiap kelompok memperagakan hasil gerakan di depan kelas.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Musik pengiring tari',
                        'Penanda lantai (lakban warna)',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak menari dengan ruang sempit (di kamar) dan ruang luas (di halaman).',
                        'Bicarakan perbedaan gerakan yang bisa dilakukan di kedua ruang.',
                        'Beri apresiasi saat anak mampu berpindah tempat dengan luwes.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan gerak di tempat dan berpindah',
                            solution: 'gunakan penanda lantai dengan lakban, gerak di tempat = tetap di lakban, gerak berpindah = keluar dari lakban',
                        },
                        {
                            issue: 'Anak takut menabrak teman saat berpindah',
                            solution: 'atur formasi kelas dengan jarak aman, mulai dari kelompok kecil',
                        },
                    ],
                    extensions: [
                        'Membuat "labirin tari" dari kursi dan meja, anak menari melewatinya',
                        'Menari mengikuti alur garis lantai yang berbeda-beda',
                        'Menonton video tari tradisional Indonesia yang memanfaatkan ruang luas',
                    ],
                    appreciationStage:
                        'Buat "Panggung Ruang Luas" di halaman sekolah atau ruang tamu rumah. Anak menampilkan tarian dengan gerakan ruang luas disaksikan keluarga.',
                    reflection: [
                        'Gerakan apa yang paling menyenangkan saat berpindah tempat?',
                        'Bagaimana rasanya menari di ruang sempit vs ruang luas?',
                        'Gerakan mana yang paling mudah? Mengapa?',
                    ],
                }),
                art_field: 'SENI TARI',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Musik pengiring',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan ramah, menanyakan kabar, dan mengajak berdoa bersama.',
                    ice_breaker:
                        'Guru mengajak siswa melakukan gerakan sederhana untuk melemaskan otot sebelum memulai pelajaran.',
                    apperception:
                        'Guru bertanya: "Siapa yang pernah menari? Apa saja yang kita gerakkan saat menari?"',
                    trigger_question:
                        'Apa bedanya gerakan di tempat dan gerakan berpindah?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Ruang gerak dalam tari dibagi menjadi dua: ruang sempit (gerak di tempat) dan ruang luas (gerak berpindah).',
                    concrete_steps: [
                        'Guru menjelaskan konsep ruang sempit (di tempat) dan ruang luas (berpindah).',
                        'Guru memperagakan gerakan ruang sempit: berdiri di tempat sambil melambaikan tangan.',
                        'Guru memperagakan gerakan ruang luas: berjalan, melompat, dan berputar.',
                        'Siswa menirukan kedua jenis gerakan dengan bimbingan guru.',
                    ],
                    script_parent:
                        '"Menari bisa di tempat, bisa juga sambil berpindah! Yuk, kita coba keduanya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Ruang Sempit vs Ruang Luas',
                    game_rules: [
                        'Guru membagi siswa menjadi kelompok kecil (3-4 orang).',
                        'Guru menandai area lantai dengan lakban: kotak kecil (sempit) dan area besar (luas).',
                        'Kelompok menciptakan gerakan yang memanfaatkan kedua ruang tersebut.',
                        'Kelompok dengan variasi gerakan terbanyak dan paling kreatif diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengikuti gerakan guru dengan jelas.',
                        child_level_advanced: 'Menciptakan variasi gerakan sendiri tanpa panduan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Mempraktikkan gerak tari dengan ruang sempit & luas dan mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: RUANG GERAK DALAM TARI',
                        instructions:
                            'Amati dua jenis ruang gerak tari: sempit (di tempat) dan luas (berpindah). Isi jawaban dengan perasaanmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'BODY_MOVEMENT_CARD',
                                question:
                                    'Peragakan gerakan berikut: gerakan di tempat (ruang sempit) dan gerakan berpindah (ruang luas). Centang setelah kamu berhasil!',
                                data: {
                                    movements: [
                                        {
                                            name: 'Ruang Sempit',
                                            icon: '🧘',
                                            instruction: 'Berdiri di tempat dan buat gerakan dengan tangan dan kepala saja.',
                                        },
                                        {
                                            name: 'Ruang Luas',
                                            icon: '🏃',
                                            instruction: 'Berjalan ke depan, ke samping, dan ke belakang sambil membuat gerakan tangan.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan kedua jenis gerakan.',
                                explanation: 'Mengenal perbedaan gerak di tempat dan berpindah.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang menari dengan gerakan ruang luas (berpindah tempat)!',
                                data: {
                                    prompt: 'Menari dengan ruang luas',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku menari berpindah tempat:',
                                },
                                answer_key: 'Siswa menggambar diri dalam posisi berpindah tempat.',
                                explanation: 'Mengasah imajinasi gerak ruang luas.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Gerakan mana yang lebih mudah, di tempat atau berpindah?',
                        'Apa yang kamu rasakan saat menari di ruang luas?',
                        'Apa yang kamu rasakan saat menari di ruang sempit?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menyebutkan contoh gerak di tempat dan gerak berpindah!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Ruang Gerak dalam Tari',
                        quiz_questions: [
                            {
                                question_text: 'Gerakan tari yang dilakukan di tempat termasuk ruang...',
                                option_a: 'Luas',
                                option_b: 'Sempit',
                                option_c: 'Besar',
                                option_d: 'Tinggi',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Berjalan dan melompat termasuk gerak dengan ruang...',
                                option_a: 'Sempit',
                                option_b: 'Luas',
                                option_c: 'Kecil',
                                option_d: 'Rendah',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh gerak di tempat adalah...',
                                option_a: 'Berputar sambil berjalan',
                                option_b: 'Berdiri dan menggerakkan tangan',
                                option_c: 'Melompat jauh',
                                option_d: 'Berjalan ke depan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh gerak berpindah adalah...',
                                option_a: 'Berdiri diam',
                                option_b: 'Duduk',
                                option_c: 'Berjalan sambil melambai',
                                option_d: 'Tidur',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Ruang gerak dalam tari harus...',
                                option_a: 'Sempit terus',
                                option_b: 'Luas terus',
                                option_c: 'Bervariasi antara sempit dan luas',
                                option_d: 'Tidak diperhatikan',
                                correct_answer: 'C',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 💃 SENI TARI — BAB 4: AYO, MENARI (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 4,
        title: 'Bab 4 Seni Tari: Ayo, Menari',
        art_field: 'SENI TARI',
        target_semester: 2,
        week_target: 7,
        lessons: [
            {
                title: 'Pertemuan 7: Waktu dalam Gerak Tari (Cepat & Lambat)',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu mengidentifikasi gerak cepat dan gerak lambat serta melakukan rangkaian gerak tari sesuai irama.',
                content_text: buildContentText({
                    title: 'Pertemuan 7: Waktu dalam Gerak Tari (Cepat & Lambat)',
                    artField: 'SENI TARI',
                    objectives: [
                        'Mengidentifikasi gerak cepat dan gerak lambat',
                        'Melakukan rangkaian gerak tari sesuai irama',
                        'Mengikuti tempo musik dengan tepat',
                    ],
                    subMaterial:
                        'Mengenal **tempo dalam gerak tari**: gerak **cepat** (lincah seperti melompat) dan gerak **lambat** (tenang seperti mengayun). Siswa belajar menyesuaikan gerakan dengan irama musik.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati perbedaan gerak cepat dan lambat dalam tari melalui video atau demonstrasi guru.',
                        creating:
                            'Menciptakan kombinasi gerakan cepat dan lambat yang harmonis.',
                        impacting:
                            'Menumbuhkan kesadaran irama dan kepekaan musikal melalui gerak tubuh.',
                    },
                    triggerQuestion:
                        'Kapan kamu bergerak cepat? Kapan kamu bergerak lambat?',
                    activities: {
                        mindful:
                            'Guru memperkenalkan konsep tempo cepat dan lambat. Siswa memperhatikan contoh gerak tari cepat (lompat, putar) dan lambat (ayun tangan, langkah lembut). Diskusi perbedaan.',
                        joyful:
                            'Permainan Tari: kelompok kecil menciptakan kombinasi gerakan cepat dan lambat selama 2 menit. Setiap kelompok tampil dan mendapat apresiasi. Dilanjutkan tari bersama mengikuti musik bervariasi.',
                        meaningful:
                            'Refleksi pengalaman: siswa menyebutkan mana yang lebih mudah/sulit, bagaimana perasaan saat mengikuti irama.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Speaker/HP untuk musik dengan tempo bervariasi',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Putar musik dengan tempo berbeda di rumah, ajak anak menari mengikuti.',
                        'Ajak anak membandingkan gerak cepat (lari) dan lambat (jalan santai).',
                        'Beri apresiasi saat anak bisa menyesuaikan gerakan dengan musik.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak kesulitan menyesuaikan gerak dengan tempo',
                            solution: 'mulai dari tempo lambat dulu, gunakan tepukan tangan sebagai panduan',
                        },
                        {
                            issue: 'Anak terlalu bersemangat sehingga bergerak terlalu cepat',
                            solution: 'ajak anak menghitung ketukan bersama: 1-2-3-4 dengan tempo pelan',
                        },
                    ],
                    extensions: [
                        'Membuat koreografi mini bersama keluarga dengan musik favorit',
                        'Menonton video tari tradisional dengan tempo berbeda (samar, sedang, cepat)',
                        'Bermain "dirigen" — satu anak memimpin tempo untuk anak lain',
                    ],
                    appreciationStage:
                        'Buat "Konser Tari Keluarga" di rumah: anak tampil menari untuk seluruh anggota keluarga dengan iringan musik favorit.',
                    reflection: [
                        'Gerak cepat atau lambat yang lebih kamu sukai? Mengapa?',
                        'Bagaimana perasaanmu saat mengikuti tempo musik?',
                        'Apa yang kamu rasakan saat bergerak cepat?',
                    ],
                }),
                art_field: 'SENI TARI',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Musik pengiring dengan tempo bervariasi',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan sapaan semangat dan menanyakan kabar mereka.',
                    ice_breaker:
                        'Guru memutar musik dengan dua tempo berbeda (cepat dan lambat) dan bertanya: "Mana yang lebih menyenangkan?"',
                    apperception:
                        'Guru bertanya: "Siapa yang bisa merasakan perbedaan gerakan cepat dan lambat?"',
                    trigger_question: 'Gerakan apa yang biasa kamu lakukan dengan cepat? Dengan lambat?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tempo dalam tari: gerak cepat (lincah) dan gerak lambat (tenang). Menyesuaikan gerak dengan irama adalah keterampilan penting dalam menari.',
                    concrete_steps: [
                        'Guru memperkenalkan konsep tempo cepat (lompat, putar) dan lambat (ayun, langkah lembut).',
                        'Guru memperagakan gerakan cepat dan lambat secara bergantian.',
                        'Siswa menirukan kedua jenis gerakan.',
                        'Guru memutar musik dan mengajak siswa menyesuaikan gerakan dengan tempo.',
                    ],
                    script_parent:
                        '"Cepat atau lambat, dua-duanya indah! Yang penting adalah menyesuaikan dengan musik!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tari Cepat-Lambat',
                    game_rules: [
                        'Guru membagi siswa menjadi kelompok kecil.',
                        'Setiap kelompok membuat kombinasi gerakan cepat dan lambat selama 2 menit.',
                        'Setiap kelompok tampil dengan musik yang berbeda tempo.',
                        'Kelompok dengan kombinasi paling harmonis diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengikuti gerakan guru dengan jelas.',
                        child_level_advanced: 'Menciptakan kombinasi gerakan sendiri.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Refleksi pengalaman gerak cepat dan lambat, mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: GERAK CEPAT DAN LAMBAT',
                        instructions:
                            'Amati perbedaan gerak cepat dan lambat. Isi jawaban dengan perasaanmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'BODY_MOVEMENT_CARD',
                                question:
                                    'Peragakan gerakan berikut dan rasakan perbedaannya!',
                                data: {
                                    movements: [
                                        {
                                            name: 'Gerak Cepat',
                                            icon: '🏃‍♂️',
                                            instruction: 'Melompat dan berputar dengan cepat mengikuti musik cepat.',
                                        },
                                        {
                                            name: 'Gerak Lambat',
                                            icon: '🍃',
                                            instruction: 'Mengayun tangan dan melangkah lembut mengikuti musik lambat.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan kedua jenis gerakan.',
                                explanation: 'Mengalami perbedaan tempo dalam tari.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang menari cepat atau lambat sesuai favoritmu!',
                                data: {
                                    prompt: 'Menari tempo favorit',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku menari tempo favorit:',
                                },
                                answer_key: 'Siswa menggambar diri dalam tempo yang disukai.',
                                explanation: 'Mengasah refleksi diri melalui seni visual.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Gerak cepat atau lambat yang lebih kamu sukai? Mengapa?',
                        'Bagaimana perasaanmu saat bergerak cepat?',
                        'Bagaimana perasaanmu saat bergerak lambat?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya gambar pada LKPD 4.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Waktu dalam Gerak Tari',
                        quiz_questions: [
                            {
                                question_text: 'Gerakan melompat termasuk gerak...',
                                option_a: 'Lambat',
                                option_b: 'Cepat',
                                option_c: 'Diam',
                                option_d: 'Tidur',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Gerakan mengayun tangan dengan lembut termasuk gerak...',
                                option_a: 'Cepat',
                                option_b: 'Lambat',
                                option_c: 'Keras',
                                option_d: 'Kaku',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Saat menari, gerakan harus sesuai dengan...',
                                option_a: 'Warna baju',
                                option_b: 'Irama musik',
                                option_c: 'Jumlah teman',
                                option_d: 'Hari',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Manfaat menari untuk tubuh kita adalah...',
                                option_a: 'Membuat lelah',
                                option_b: 'Membuat sehat dan bugar',
                                option_c: 'Membuat sakit',
                                option_d: 'Membuat ngantuk',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Gerak cepat dan lambat dapat...',
                                option_a: 'Dikombinasikan',
                                option_b: 'Dipisahkan',
                                option_c: 'Diabaikan',
                                option_d: 'Dihapus',
                                correct_answer: 'A',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Pertemuan 8: Tenaga dalam Gerak Tari',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu mengidentifikasi unsur tenaga dalam seni tari dan melakukan gerak tari dengan menggunakan variasi tenaga.',
                content_text: buildContentText({
                    title: 'Pertemuan 8: Tenaga dalam Gerak Tari',
                    artField: 'SENI TARI',
                    objectives: [
                        'Mengidentifikasi tiga jenis tenaga dalam tari: lemah, sedang, kuat',
                        'Melakukan gerakan tari dengan menggunakan variasi tenaga',
                        'Memahami bagaimana tenaga memengaruhi ekspresi tarian',
                    ],
                    subMaterial:
                        'Mengenal **tenaga** dalam gerak tari: tenaga **lemah** (gerakan halus, pelan), tenaga **sedang** (gerakan wajar), dan tenaga **kuat** (gerakan tegas, bertenaga). Tenaga memengaruhi ekspresi dan kesan tarian.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati perbedaan tenaga lemah, sedang, dan kuat dalam gerakan tari.',
                        creating:
                            'Menciptakan tarian sederhana yang memadukan tiga jenis tenaga.',
                        impacting:
                            'Menumbuhkan kemampuan mengekspresikan diri melalui variasi tenaga dalam tari.',
                    },
                    triggerQuestion:
                        'Kapan kamu bergerak dengan tenaga kuat? Kapan dengan tenaga lemah?',
                    activities: {
                        mindful:
                            'Guru memperkenalkan konsep tenaga lemah/sedang/kuat. Guru menunjukkan contoh gerakan dengan ketiga tenaga. Siswa mengamati dan membedakan tenaga yang digunakan.',
                        joyful:
                            'Permainan tebak jenis tenaga: siswa menebak tenaga yang digunakan temannya dalam gerakan tari. Setelah itu, kelompok mempraktikkan gerakan lemah → sedang → kuat berurutan.',
                        meaningful:
                            'Setiap kelompok menciptakan tarian sederhana yang memadukan ketiga unsur tenaga. Presentasi hasil tarian di depan kelas dan refleksi bagaimana tenaga memengaruhi ekspresi.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Musik pengiring (bisa musik lembut atau tegas)',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak membandingkan gerakan lembut (menyapu) dengan gerakan kuat (mendorong).',
                        'Ceritakan pengalaman sehari-hari dengan tenaga berbeda (mengangkat tas, memeluk).',
                        'Beri apresiasi saat anak mengekspresikan tenaga dengan tepat.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak kesulitan membedakan tenaga sedang dengan kuat',
                            solution: 'gunakan analogi: tenaga sedang = berjalan santai, tenaga kuat = berlari cepat',
                        },
                        {
                            issue: 'Anak malu menunjukkan gerakan dengan tenaga kuat',
                            solution: 'berikan contoh dari tokoh superhero atau gerakan binatang (harimau, gajah)',
                        },
                    ],
                    extensions: [
                        'Bermain peran sebagai hewan dengan tenaga berbeda (kupu-kupu lemah, harimau kuat)',
                        'Menonton video tari tradisional dan mengidentifikasi variasi tenaga',
                        'Membuat gerakan "cerita" dengan tenaga yang berbeda untuk setiap bagian',
                    ],
                    appreciationStage:
                        'Buat "Pentas Seni Kelas" — setiap kelompok tampil dengan tarian variasi tenaga. Rekam video untuk dibagikan ke orang tua.',
                    reflection: [
                        'Tenaga apa yang paling mudah kamu lakukan?',
                        'Tenaga apa yang paling sulit?',
                        'Bagaimana tenaga memengaruhi ekspresi tarianmu?',
                    ],
                }),
                art_field: 'SENI TARI',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Musik pengiring bervariasi',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa peserta didik dengan semangat dan mengajak berdoa sebelum memulai pelajaran.',
                    ice_breaker:
                        'Guru memberikan apersepsi dengan menanyakan pengalaman siswa ketika menari di rumah atau di sekolah.',
                    apperception:
                        'Guru bertanya: "Siapa yang pernah merasa gerakannya lebih bertenaga dibanding biasanya?"',
                    trigger_question:
                        'Apa bedanya gerakan kuat dan gerakan lemah?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tenaga dalam tari: lemah (halus), sedang (wajar), kuat (tegas). Tenaga memengaruhi kesan dan ekspresi tarian.',
                    concrete_steps: [
                        'Guru memperkenalkan konsep tenaga lemah, sedang, dan kuat.',
                        'Guru memperagakan gerakan dengan ketiga jenis tenaga.',
                        'Siswa mengamati dan membedakan tenaga yang digunakan.',
                        'Siswa mempraktikkan ketiga tenaga berurutan.',
                    ],
                    script_parent:
                        '"Tenaga kita bisa berubah-ubah! Ada saatnya lembut, ada saatnya kuat. Semuanya indah!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Tenaga',
                    game_rules: [
                        'Guru membagi siswa menjadi beberapa kelompok kecil.',
                        'Setiap kelompok mempraktikkan gerakan dengan tenaga lemah, sedang, dan kuat.',
                        'Permainan interaktif: satu siswa melakukan gerakan, siswa lain menebak jenis tenaganya.',
                        'Kelompok yang paling banyak menebak dengan benar diberi apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengikuti gerakan guru dengan pengarahan.',
                        child_level_advanced: 'Menciptakan kombinasi tiga tenaga secara bebas.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Menciptakan tarian sederhana dengan 3 tenaga dan mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: TENAGA DALAM GERAK TARI',
                        instructions:
                            'Peragakan gerakan dengan tenaga lemah, sedang, dan kuat. Isi jawaban dengan pengalamanmu!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'BODY_MOVEMENT_CARD',
                                question:
                                    'Peragakan 3 jenis tenaga dalam gerak tari berikut. Centang setelah kamu berhasil!',
                                data: {
                                    movements: [
                                        {
                                            name: 'Tenaga Lemah',
                                            icon: '🕊️',
                                            instruction: 'Gerakkan tangan dengan sangat lembut, seperti mengambang di udara.',
                                        },
                                        {
                                            name: 'Tenaga Sedang',
                                            icon: '💫',
                                            instruction: 'Gerakkan tangan seperti biasa saat melambai dengan santai.',
                                        },
                                        {
                                            name: 'Tenaga Kuat',
                                            icon: '💪',
                                            instruction: 'Gerakkan tangan dengan tegas dan bertenaga, seperti mendorong pintu.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan ketiga tenaga.',
                                explanation: 'Mengalami variasi tenaga dalam gerak tari.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang menari dengan tenaga kuat (seperti superhero)!',
                                data: {
                                    prompt: 'Menari dengan tenaga kuat',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku menari dengan tenaga kuat:',
                                },
                                answer_key: 'Siswa menggambar diri dalam gerakan bertenaga.',
                                explanation: 'Mengasah imajinasi gerak dengan tenaga kuat.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Tenaga apa yang paling mudah kamu lakukan?',
                        'Tenaga apa yang paling sulit?',
                        'Bagaimana perasaanmu saat menari dengan tenaga kuat?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya gambar pada LKPD 4.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Tenaga dalam Gerak Tari',
                        quiz_questions: [
                            {
                                question_text: 'Tenaga dalam tari dibagi menjadi berapa jenis?',
                                option_a: '1',
                                option_b: '2',
                                option_c: '3',
                                option_d: '4',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Contoh gerakan dengan tenaga lemah adalah...',
                                option_a: 'Memukul drum',
                                option_b: 'Mengayun tangan lembut',
                                option_c: 'Melompat tinggi',
                                option_d: 'Berlari cepat',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh gerakan dengan tenaga kuat adalah...',
                                option_a: 'Menari seperti kupu-kupu',
                                option_b: 'Mendorong dengan tegas',
                                option_c: 'Melangkah pelan',
                                option_d: 'Menutup mata',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Tenaga dalam tari memengaruhi...',
                                option_a: 'Warna baju',
                                option_b: 'Ekspresi dan kesan tarian',
                                option_c: 'Jumlah penonton',
                                option_d: 'Cuaca',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Saat menari, tenaga yang digunakan sebaiknya...',
                                option_a: 'Selalu kuat',
                                option_b: 'Selalu lemah',
                                option_c: 'Bervariasi',
                                option_d: 'Tidak ada',
                                correct_answer: 'C',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🎭 SENI TEATER — BAB 5: MENGENAL TEATER (SEMESTER 1)
    // ===========================================================================
    {
        chapter_number: 5,
        title: 'Bab 5 Seni Teater: Mengenal Teater',
        art_field: 'SENI TEATER',
        target_semester: 1,
        week_target: 9,
        lessons: [
            {
                title: 'Pertemuan 9: Mengenal Dunia Teater',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menjelaskan konsep drama melalui permainan dan mengidentifikasi berbagai macam ekspresi dari pengalaman pribadi.',
                content_text: buildContentText({
                    title: 'Pertemuan 9: Mengenal Dunia Teater',
                    artField: 'SENI TEATER',
                    objectives: [
                        'Menjelaskan konsep drama melalui permainan',
                        'Mengidentifikasi berbagai macam ekspresi (senang, sedih, marah, terkejut)',
                        'Mempraktikkan gerak dan ekspresi sesuai pengalaman pribadi',
                    ],
                    subMaterial:
                        'Mengenal **teater** sebagai seni mengekspresikan perasaan melalui peran, gerakan, dan ekspresi wajah. Siswa belajar bahwa teater dapat menyampaikan berbagai emosi tanpa harus berbicara.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati dan menirukan berbagai ekspresi wajah (senang, sedih, marah) dan gerakan sesuai emosi.',
                        creating:
                            'Memperagakan gerakan sederhana yang mengekspresikan emosi dari pengalaman pribadi.',
                        impacting:
                            'Menumbuhkan empati terhadap perasaan orang lain dan kepercayaan diri mengekspresikan diri.',
                    },
                    triggerQuestion:
                        'Apa kalian tahu apa itu teater? Pernahkah kalian menonton pertunjukan?',
                    activities: {
                        mindful:
                            'Guru memperkenalkan konsep dasar teater (tempat mengekspresikan perasaan melalui peran). Guru memberi contoh gerakan sederhana dan ekspresi wajah (bahagia, sedih, terkejut). Siswa menirukan.',
                        joyful:
                            'Permainan Drama Ekspresi: siswa dalam kelompok kecil diberi situasi sederhana (bermain di taman, berbelanja, bersekolah) dan mengekspresikan perasaan melalui gerakan dan ekspresi wajah.',
                        meaningful:
                            'Siswa memikirkan pengalaman sehari-hari dan menunjukkan gerakan/ekspresi yang sesuai. Berbagi cerita tentang pengalaman mereka dan memperagakan gerakan yang mencerminkan perasaan.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Cermin kecil (opsional)',
                        'Kartu ekspresi wajah (emoji besar)',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak bermain "tebak ekspresi" di rumah.',
                        'Ceritakan pengalaman pribadi dengan ekspresi wajah yang sesuai.',
                        'Beri apresiasi saat anak berani mengekspresikan perasaannya.',
                        'Sediakan cermin di rumah agar anak bisa berlatih ekspresi.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak malu mengekspresikan emosi',
                            solution: 'mulai dari ekspresi yang mudah (senang), beri contoh, dan apresiasi setiap usaha',
                        },
                        {
                            issue: 'Anak bingung membedakan emosi',
                            solution: 'gunakan emoji besar sebagai visual, ceritakan situasi yang sesuai (kapan kamu sedih?)',
                        },
                    ],
                    extensions: [
                        'Membuat "buku ekspresi" dengan gambar wajah dan nama emosinya',
                        'Bermain peran sebagai tokoh cerita favorit',
                        'Menonton video pertunjukan teater anak-anak',
                    ],
                    appreciationStage:
                        'Buat "Panggung Kecil" di ruang tamu. Setiap anak tampil dengan ekspresi & gerakan yang berbeda untuk keluarga.',
                    reflection: [
                        'Ekspresi apa yang paling mudah kamu lakukan?',
                        'Ekspresi apa yang paling sulit?',
                        'Bagaimana perasaanmu saat mengekspresikan diri di depan teman?',
                    ],
                }),
                art_field: 'SENI TEATER',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Kartu ekspresi wajah',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan ramah dan memperkenalkan konsep teater secara sederhana.',
                    ice_breaker:
                        'Permainan "Tebak Ekspresi": guru menunjukkan ekspresi wajah (senang, sedih, marah), dan siswa menebak ekspresi tersebut.',
                    apperception:
                        'Guru bertanya: "Siapa yang pernah menonton pertunjukan teater atau film? Apa yang kalian lihat dalam pertunjukan itu?"',
                    trigger_question:
                        'Bagaimana cara menyampaikan perasaan tanpa berbicara?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Teater adalah seni mengomunikasikan perasaan melalui gerak tubuh dan ekspresi wajah, bahkan tanpa kata-kata.',
                    concrete_steps: [
                        'Guru menjelaskan konsep teater sebagai media ekspresi.',
                        'Guru memperagakan gerakan sederhana dan ekspresi wajah (bahagia, sedih, terkejut).',
                        'Siswa menirukan setiap ekspresi dan gerakan.',
                        'Siswa berdiskusi kapan mereka merasakan perasaan tersebut dalam kehidupan sehari-hari.',
                    ],
                    script_parent:
                        '"Teater adalah cara kita bercerita tanpa harus bicara! Cukup gunakan wajah dan tubuh."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Permainan Drama Ekspresi',
                    game_rules: [
                        'Guru membagi siswa menjadi beberapa kelompok kecil.',
                        'Setiap kelompok diberi situasi sederhana (bermain di taman, berbelanja, atau bersekolah).',
                        'Setiap kelompok mengekspresikan perasaan situasi tersebut melalui gerakan dan ekspresi wajah tanpa bicara.',
                        'Guru mengamati dan memberi apresiasi untuk kreativitas dan kerja sama.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengikuti gerakan guru dengan pengarahan.',
                        child_level_advanced: 'Membuat skenario ekspresi sendiri dengan variasi gerakan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Berbagi cerita tentang pengalaman pribadi dan memperagakan gerakan yang mencerminkan perasaan.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.1: MENGENAL DUNIA TEATER',
                        instructions:
                            'Amati kartu ekspresi wajah berikut, lalu peragakan setiap ekspresi dengan sungguh-sungguh!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Tirukan ekspresi wajah berikut satu per satu. Centang setelah kamu berhasil memperagakannya!',
                                data: {
                                    expressions: [
                                        { name: 'Senang', emoji: '😊', label: 'SENANG' },
                                        { name: 'Sedih', emoji: '😢', label: 'SEDIH' },
                                        { name: 'Marah', emoji: '😠', label: 'MARAH' },
                                        { name: 'Terkejut', emoji: '😲', label: 'TERKEJUT' },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan semua ekspresi.',
                                explanation: 'Mengenal berbagai ekspresi wajah dalam teater.',
                            },
                            {
                                id: 2,
                                type: 'EXPRESSION_CARD',
                                question:
                                    'Amati emoji berikut dengan saksama. Ekspresi wajah apa yang ditunjukkan?',
                                data: {
                                    single: {
                                        emoji: '😢',
                                        label: 'Anak sedang menangis',
                                        options: ['Sedih', 'Senang'],
                                    },
                                },
                                answer_key: 'Sedih',
                                explanation: 'Emoji menangis menunjukkan ekspresi sedih.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 3,
                                type: 'MIMESIS_ACTION',
                                question:
                                    'Peragakan gerakan berikut sesuai dengan ekspresinya (tanpa bicara)!',
                                data: {
                                    actions: [
                                        {
                                            name: 'Berjalan dengan Gembira',
                                            icon: '😄',
                                            description: 'Berjalan sambil melompat kecil dan tersenyum lebar.',
                                        },
                                        {
                                            name: 'Berjalan dengan Sedih',
                                            icon: '😔',
                                            description: 'Berjalan pelan sambil menundukkan kepala.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan kedua gerakan.',
                                explanation: 'Menghubungkan gerak dan ekspresi emosi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Ekspresi apa yang paling mudah kamu lakukan?',
                        'Bagaimana perasaanmu saat memperagakan ekspresi sedih?',
                        'Kapan kamu merasa paling senang?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto dirimu sedang memperagakan salah satu ekspresi wajah, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Mengenal Dunia Teater',
                        quiz_questions: [
                            {
                                question_text: 'Teater adalah seni yang menggunakan...',
                                option_a: 'Hanya tulisan',
                                option_b: 'Gerak tubuh dan ekspresi',
                                option_c: 'Hanya angka',
                                option_d: 'Hanya warna',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Emoji 😊 menunjukkan ekspresi...',
                                option_a: 'Sedih',
                                option_b: 'Marah',
                                option_c: 'Senang',
                                option_d: 'Takut',
                                correct_answer: 'C',
                            },
                            {
                                question_text: 'Emoji 😢 menunjukkan ekspresi...',
                                option_a: 'Senang',
                                option_b: 'Sedih',
                                option_c: 'Marah',
                                option_d: 'Kaget',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Dalam teater, kita bisa bercerita tanpa...',
                                option_a: 'Gerakan',
                                option_b: 'Bicara',
                                option_c: 'Ekspresi',
                                option_d: 'Perasaan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Ekspresi wajah dapat menunjukkan...',
                                option_a: 'Hanya nama',
                                option_b: 'Perasaan seseorang',
                                option_c: 'Hanya angka',
                                option_d: 'Hanya huruf',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Pertemuan 10: Serunya Bermain Tablo',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu bermain tablo (teater tanpa dialog) dengan fokus pada gerakan dan ekspresi wajah.',
                content_text: buildContentText({
                    title: 'Pertemuan 10: Serunya Bermain Tablo',
                    artField: 'SENI TEATER',
                    objectives: [
                        'Mengenal konsep tablo sebagai bentuk teater tanpa dialog',
                        'Memainkan tablo singkat berdasarkan situasi yang diberikan',
                        'Mengidentifikasi gerak dan ekspresi pemain teater di atas pentas',
                    ],
                    subMaterial:
                        'Mengenal **tablo** — bentuk pertunjukan teater di mana para pemain membeku dalam posisi tertentu untuk menggambarkan sebuah adegan atau situasi, tanpa dialog dan tanpa gerakan.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati dan menirukan gerakan sederhana (berjalan dengan senang, sedih, atau marah).',
                        creating:
                            'Memainkan tablo singkat dalam kelompok dengan fokus pada gerakan dan ekspresi.',
                        impacting:
                            'Menumbuhkan kerja sama tim dan kepercayaan diri tampil di depan orang lain.',
                    },
                    triggerQuestion:
                        'Apa kalian pernah melihat pertunjukan tanpa kata-kata? Bagaimana mereka bercerita?',
                    activities: {
                        mindful:
                            'Guru menjelaskan tentang tablo dan peran ekspresi gerak + wajah. Siswa meniru gerakan sederhana seperti berjalan dengan senang, sedih, atau marah. Guru menekankan pentingnya perhatian penuh.',
                        joyful:
                            'Permainan Tablo Kelompok: siswa dalam kelompok kecil diminta membuat tablo singkat. Setiap kelompok diberi situasi (bermain di taman, menonton pertunjukan hewan) dan menampilkan cerita hanya dengan gerakan dan ekspresi tanpa bicara.',
                        meaningful:
                            'Refleksi gerak dan ekspresi: setelah pertunjukan, guru mengajak siswa berdiskusi tentang gerak dan ekspresi yang telah mereka tampilkan.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Properti sederhana (bola, topi, mainan)',
                        'Kartu situasi tablo',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak bermain "tablo keluarga" di rumah dengan situasi sehari-hari.',
                        'Beri apresiasi saat anak berani mengekspresikan diri.',
                        'Bicarakan bagaimana perasaan anak saat memainkan peran tertentu.',
                        'Rekam video tablo anak untuk melihat kemajuannya.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak sulit menahan diri untuk tidak bicara saat tablo',
                            solution: 'latih dengan waktu singkat dulu (10-15 detik), lalu tingkatkan durasinya',
                        },
                        {
                            issue: 'Anak bingung memilih posisi tubuh',
                            solution: 'berikan contoh tablo yang jelas, minta anak memilih 1 gerakan saja',
                        },
                    ],
                    extensions: [
                        'Membuat "tablo foto keluarga" dengan berbagai situasi',
                        'Menonton video pertunjukan tablo anak-anak',
                        'Membuat tablo bertema cerita rakyat Indonesia',
                    ],
                    appreciationStage:
                        'Buat "Panggung Tablo" di kelas. Setiap kelompok tampil dan dipotret dalam posisi tablo. Foto dipajang sebagai galeri kelas.',
                    reflection: [
                        'Bagaimana rasanya bermain tablo tanpa bicara?',
                        'Situasi mana yang paling menyenangkan untuk diperagakan?',
                        'Bagaimana kerja sama tim kalian saat bermain tablo?',
                    ],
                }),
                art_field: 'SENI TEATER',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Properti sederhana',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan salam dan ajakan bersenang-senang dalam belajar teater.',
                    ice_breaker:
                        'Guru memulai dengan permainan gerak kecil (meniru gerakan hewan atau benda).',
                    apperception:
                        'Guru bertanya: "Apa kalian pernah menonton orang bermain drama atau teater? Apa bedanya dengan bermain biasa?"',
                    trigger_question:
                        'Bagaimana cara bercerita tanpa bicara?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Tablo adalah seni pertunjukan di mana pemain membeku dalam posisi tertentu untuk menggambarkan situasi tertentu, tanpa bicara dan tanpa bergerak.',
                    concrete_steps: [
                        'Guru menjelaskan konsep tablo.',
                        'Guru menunjukkan contoh gambar dari pertunjukan tablo.',
                        'Siswa diminta meniru gerakan sederhana seperti berjalan dengan senang, sedih, atau marah.',
                        'Guru menekankan pentingnya perhatian penuh terhadap gerakan tubuh dan ekspresi wajah.',
                    ],
                    script_parent:
                        '"Dalam tablo, kita bercerita dengan membeku! Seperti foto hidup yang bisa bercerita."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tablo Kelompok',
                    game_rules: [
                        'Guru membagi siswa menjadi kelompok kecil (3-5 orang).',
                        'Setiap kelompok diberi situasi (bermain di taman, menonton hewan, atau memasak).',
                        'Kelompok membuat tablo singkat dengan posisi tubuh tertentu.',
                        'Setiap kelompok menampilkan tablo, dan kelompok lain menebak situasinya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menampilkan 1 posisi tablo dengan bantuan guru.',
                        child_level_advanced: 'Membuat komposisi tablo kelompok dengan cerita yang jelas.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Refleksi gerak dan ekspresi yang telah diperagakan, mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.2: SERUNYA BERMAIN TABLO',
                        instructions:
                            'Peragakan gerakan berikut tanpa bicara. Centang setelah kamu berhasil!',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MIMESIS_ACTION',
                                question:
                                    'Peragakan gerakan berikut tanpa bicara, hanya dengan gerakan tubuh dan ekspresi wajah!',
                                data: {
                                    actions: [
                                        {
                                            name: 'Sedang Bermain Bola',
                                            icon: '⚽',
                                            description: 'Gerakkan kaki seperti menendang bola dan tersenyum senang.',
                                        },
                                        {
                                            name: 'Sedang Menangis',
                                            icon: '😢',
                                            description: 'Usap mata dengan tangan dan tunjukkan ekspresi sedih.',
                                        },
                                        {
                                            name: 'Sedang Menyapu',
                                            icon: '🧹',
                                            description: 'Gerakkan tangan seperti memegang sapu dan menyapu lantai.',
                                        },
                                        {
                                            name: 'Sedang Makan Es Krim',
                                            icon: '🍦',
                                            description: 'Gerakkan tangan seperti memegang es krim dan menjilatnya.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan semua gerakan.',
                                explanation: 'Mengenal gerak dan ekspresi dalam tablo.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah sebuah adegan tablo (situasi tertentu dengan beberapa orang) yang ingin kamu tampilkan bersama kelompokmu!',
                                data: {
                                    prompt: 'Adegan tablo kelompok',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Adegan tablo kami:',
                                },
                                answer_key: 'Siswa menggambar adegan dengan beberapa tokoh.',
                                explanation: 'Mengasah imajinasi dan kolaborasi.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana rasanya bermain tablo tanpa bicara?',
                        'Situasi mana yang paling menyenangkan?',
                        'Bagaimana kerja sama tim kalian?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt:
                            'Rekam suaramu menceritakan pengalaman bermain tablo hari ini!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Bermain Tablo',
                        quiz_questions: [
                            {
                                question_text: 'Tablo adalah pertunjukan tanpa...',
                                option_a: 'Gerakan',
                                option_b: 'Dialog / bicara',
                                option_c: 'Ekspresi',
                                option_d: 'Pemain',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Dalam tablo, pemain berdiri...',
                                option_a: 'Berjalan',
                                option_b: 'Membeku / diam di posisi',
                                option_c: 'Berlari',
                                option_d: 'Melompat',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Ekspresi wajah dalam tablo sangat...',
                                option_a: 'Tidak penting',
                                option_b: 'Penting',
                                option_c: 'Biasa saja',
                                option_d: 'Dilarang',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Untuk menampilkan tablo yang baik, kita perlu...',
                                option_a: 'Bicara keras',
                                option_b: 'Kerja sama tim',
                                option_c: 'Berlari',
                                option_d: 'Tidur',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh situasi tablo yang baik adalah...',
                                option_a: 'Berbicara di telepon',
                                option_b: 'Sedang makan es krim',
                                option_c: 'Bernyanyi bersama',
                                option_d: 'Bercerita panjang',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // 🎭 SENI TEATER — BAB 6: BERKREASI DALAM PANTOMIM (SEMESTER 2)
    // ===========================================================================
    {
        chapter_number: 6,
        title: 'Bab 6 Seni Teater: Berkreasi dalam Pantomim',
        art_field: 'SENI TEATER',
        target_semester: 2,
        week_target: 11,
        lessons: [
            {
                title: 'Pertemuan 11: Serunya Bermain Pantomim',
                order_index: 1,
                learning_objectives:
                    'Peserta didik mampu menjelaskan pengertian pantomim dan menirukan gerakan wajah dalam pantomim.',
                content_text: buildContentText({
                    title: 'Pertemuan 11: Serunya Bermain Pantomim',
                    artField: 'SENI TEATER',
                    objectives: [
                        'Menjelaskan pengertian pantomim',
                        'Menirukan gerakan wajah dalam pantomim',
                        'Memperagakan pantomim sederhana berdasarkan skenario',
                    ],
                    subMaterial:
                        'Mengenal **pantomim** — seni pertunjukan di mana pemain menggunakan gerakan tubuh dan ekspresi wajah untuk bercerita TANPA bicara. Berbeda dengan tablo, pantomim memiliki gerakan yang aktif.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati video atau demonstrasi pantomim sederhana dan menirukan gerakan ekspresi wajah.',
                        creating:
                            'Memperagakan pantomim singkat berdasarkan skenario (makan es krim, bermain bola, berjalan di jalan licin).',
                        impacting:
                            'Menumbuhkan kepercayaan diri dan kemampuan mengomunikasikan cerita tanpa kata.',
                    },
                    triggerQuestion:
                        'Apa kalian tahu apa itu pantomim? Pernahkah kalian melihat seseorang menari tanpa bicara?',
                    activities: {
                        mindful:
                            'Guru menjelaskan pengertian pantomim secara sederhana. Guru menunjukkan video pendek atau contoh langsung gerakan pantomim (tertawa, menangis, berlari di tempat). Siswa menirukan gerakan ekspresi wajah.',
                        joyful:
                            'Permainan Pantomim: siswa dalam kelompok diberikan skenario singkat (makan es krim, bermain bola, berjalan di jalan licin). Setiap kelompok bergiliran menampilkan pantomim. Kelompok dengan ekspresi terbaik mendapat apresiasi.',
                        meaningful:
                            'Siswa berpasangan dan melakukan gerakan pantomim yang saling melengkapi (satu siswa berpura-pura membuka pintu, yang lain masuk). Berlatih mengekspresikan emosi senang, terkejut, sedih. Presentasi pasangan di depan kelas.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Video pendek tentang pantomim (opsional)',
                        'Kartu skenario pantomim',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak bermain pantomim di rumah dengan situasi sehari-hari.',
                        'Beri apresiasi saat anak berani memperagakan tanpa bicara.',
                        'Bicarakan makna gerakan yang ditampilkan anak.',
                        'Rekam video pantomim anak untuk melihat kemajuan.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak bingung membedakan pantomim dan tablo',
                            solution: 'jelaskan: tablo = membeku/diam, pantomim = bergerak aktif',
                        },
                        {
                            issue: 'Anak malu bergerak tanpa bicara',
                            solution: 'mulai dari skenario sederhana yang lucu, beri contoh dulu',
                        },
                        {
                            issue: 'Anak kesulitan berekspresi dengan wajah',
                            solution: 'ajak anak berlatih di depan cermin, tunjukkan emoji sebagai referensi',
                        },
                    ],
                    extensions: [
                        'Menonton video pantomim dari seniman terkenal (Marcel Marceau)',
                        'Membuat pantomim bertema "sehari di rumah"',
                        'Bermain "pantomim berantai": satu anak memperagakan, yang lain menebak',
                    ],
                    appreciationStage:
                        'Buat "Festival Pantomim Kelas" — semua anak tampil. Rekam video dan bagikan ke grup orang tua. Beri medali kertas untuk semua peserta.',
                    reflection: [
                        'Bagaimana rasanya bermain pantomim tanpa bicara?',
                        'Skenario mana yang paling menyenangkan?',
                        'Apa yang paling sulit saat bermain pantomim?',
                    ],
                }),
                art_field: 'SENI TEATER',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Kartu skenario pantomim',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa peserta didik dengan ramah dan mengajak mereka bermain gerakan sederhana, seperti menirukan hewan (kucing, burung, kelinci) untuk mencairkan suasana.',
                    ice_breaker:
                        'Guru mengajak siswa bermain "Tebak Ekspresi": guru menunjukkan berbagai ekspresi wajah, siswa menebak.',
                    apperception:
                        'Guru menanyakan: "Siapa yang pernah melihat seseorang yang menari tanpa bicara?"',
                    trigger_question:
                        'Bagaimana cara menyampaikan cerita tanpa bicara?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Pantomim adalah seni pertunjukan di mana pemain menggunakan gerakan tubuh dan ekspresi wajah untuk bercerita tanpa bicara.',
                    concrete_steps: [
                        'Guru menjelaskan pengertian pantomim secara sederhana.',
                        'Guru menunjukkan video pendek atau contoh langsung pantomim.',
                        'Siswa menirukan gerakan ekspresi wajah (tersenyum, marah, terkejut).',
                        'Guru membimbing siswa satu per satu melakukan gerakan yang diajarkan.',
                    ],
                    script_parent:
                        '"Pantomim adalah seni bercerita tanpa suara! Cukup dengan gerakan dan ekspresi wajah."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Bermain Pantomim',
                    game_rules: [
                        'Guru mengajak peserta didik bermain permainan pantomim sederhana dalam kelompok.',
                        'Setiap kelompok diberikan skenario singkat (makan es krim, bermain bola, berjalan di jalan licin).',
                        'Setiap kelompok bergiliran menampilkan pantomim di depan kelas.',
                        'Kelompok dengan ekspresi terbaik mendapat apresiasi dari guru.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menampilkan skenario sederhana dengan bantuan guru.',
                        child_level_advanced: 'Menampilkan skenario kompleks dengan variasi gerakan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Pantomim berpasangan, refleksi, mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.1: SERUNYA BERMAIN PANTOMIM',
                        instructions:
                            'Peragakan gerakan pantomim berikut tanpa bicara! Lalu centang setelah kamu berhasil.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MIMESIS_ACTION',
                                question:
                                    'Peragakan gerakan pantomim berikut tanpa bicara! Gunakan gerakan tubuh dan ekspresi wajah!',
                                data: {
                                    actions: [
                                        {
                                            name: 'Makan Es Krim',
                                            icon: '🍦',
                                            description: 'Gerakkan tangan seperti memegang es krim, jilat, dan nikmati.',
                                        },
                                        {
                                            name: 'Bermain Bola',
                                            icon: '⚽',
                                            description: 'Gerakkan kaki seperti menendang bola dan tersenyum senang.',
                                        },
                                        {
                                            name: 'Berjalan di Jalan Licin',
                                            icon: '🥿',
                                            description: 'Jalan hati-hati sambil merentangkan tangan untuk keseimbangan.',
                                        },
                                        {
                                            name: 'Menangis',
                                            icon: '😢',
                                            description: 'Usap mata dan tunjukkan ekspresi sedih.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan semua gerakan.',
                                explanation: 'Mengenal gerak pantomim sederhana.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu sedang bermain pantomim dengan gerakan favoritmu!',
                                data: {
                                    prompt: 'Aku bermain pantomim',
                                    guideLines: 'none',
                                    rows: 1,
                                    label: 'Aku bermain pantomim:',
                                },
                                answer_key: 'Siswa menggambar diri dalam gerakan pantomim.',
                                explanation: 'Mengasah imajinasi gerak.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana rasanya bermain pantomim tanpa bicara?',
                        'Gerakan mana yang paling menyenangkan?',
                        'Apa yang paling sulit saat bermain pantomim?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya gambar pantomim pada LKPD 6.1, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis: Mengenal Pantomim',
                        quiz_questions: [
                            {
                                question_text: 'Pantomim adalah seni pertunjukan tanpa...',
                                option_a: 'Gerakan',
                                option_b: 'Bicara',
                                option_c: 'Ekspresi',
                                option_d: 'Perasaan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Pantomim menggunakan... untuk bercerita',
                                option_a: 'Kata-kata',
                                option_b: 'Gerakan dan ekspresi',
                                option_c: 'Angka',
                                option_d: 'Tulisan',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh gerakan pantomim adalah...',
                                option_a: 'Berbicara di telepon',
                                option_b: 'Berpura-pura makan es krim',
                                option_c: 'Menyanyi',
                                option_d: 'Bercerita panjang',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Saat bermain pantomim, kita harus...',
                                option_a: 'Diam saja',
                                option_b: 'Bergerak dengan ekspresif',
                                option_c: 'Berteriak',
                                option_d: 'Tidur',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Manfaat bermain pantomim adalah...',
                                option_a: 'Membosankan',
                                option_b: 'Melatih keberanian & ekspresi',
                                option_c: 'Membuat takut',
                                option_d: 'Membuat lelah saja',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Pertemuan 12: Melakukan Pantomim Bersama Kelompok',
                order_index: 2,
                learning_objectives:
                    'Peserta didik mampu menirukan gerakan pekerjaan dalam pantomim dan melakukan pantomim bersama kelompok.',
                content_text: buildContentText({
                    title: 'Pertemuan 12: Melakukan Pantomim Bersama Kelompok',
                    artField: 'SENI TEATER',
                    objectives: [
                        'Menirukan gerakan pekerjaan sehari-hari dalam pantomim (menyapu, mencuci, memasak)',
                        'Melatih keseimbangan dan koordinasi dalam pantomim',
                        'Melakukan pantomim bersama kelompok dengan kreatif',
                    ],
                    subMaterial:
                        'Menirukan **gerakan pekerjaan sehari-hari** dalam bentuk pantomim: menyapu, mencuci piring, memasak, menimba air, dll. Siswa juga berlatih keseimbangan dan koordinasi tubuh.',
                    cpHolistic: {
                        experiencing:
                            'Mengamati dan menirukan gerakan pekerjaan sehari-hari tanpa bicara.',
                        creating:
                            'Menciptakan pantomim kelompok berdasarkan pekerjaan sehari-hari.',
                        impacting:
                            'Menumbuhkan rasa empati terhadap pekerjaan orang lain dan kerja sama tim.',
                    },
                    triggerQuestion:
                        'Pekerjaan apa yang biasa dilakukan di rumah? Bagaimana cara memperagakannya tanpa bicara?',
                    activities: {
                        mindful:
                            'Guru menunjukkan gerakan pekerjaan sehari-hari (menyapu, mencuci, memasak) tanpa bicara, hanya dengan gerakan tubuh. Siswa menirukan gerakan tersebut bersama-sama. Dilanjutkan latihan keseimbangan dan koordinasi.',
                        joyful:
                            'Berkreasi dalam Kelompok: siswa dibagi menjadi beberapa kelompok kecil. Setiap kelompok memilih satu pekerjaan untuk dipantomimkan. Kerja sama membuat urutan gerakan yang menarik tanpa bicara.',
                        meaningful:
                            'Presentasi Hasil Pantomim: setiap kelompok mempersembahkan pantomim yang telah mereka buat. Kelompok lain memperhatikan dan memberikan apresiasi. Guru memberikan pujian dan motivasi.',
                    },
                    materials: [
                        'Ruang kelas yang lapang',
                        'Properti sederhana (sapu mainan, piring plastik, dll)',
                        'Kartu pekerjaan',
                        'Lembar kerja peserta didik (LKPD)',
                    ],
                    parentTips: [
                        'Ajak anak memperagakan pekerjaan rumah sehari-hari dalam bentuk pantomim.',
                        'Ceritakan berbagai pekerjaan yang ada di rumah dan masyarakat.',
                        'Beri apresiasi saat anak bermain pantomim dengan percaya diri.',
                        'Rekam video pantomim anak untuk dokumentasi.',
                    ],
                    difficulties: [
                        {
                            issue: 'Anak kesulitan menahan tawa saat bermain pantomim',
                            solution: 'ciptakan suasana santai, tertawa itu bagian dari belajar!',
                        },
                        {
                            issue: 'Anak bingung memilih gerakan',
                            solution: 'berikan kartu pekerjaan sebagai panduan visual',
                        },
                    ],
                    extensions: [
                        'Membuat "pantomim keluarga" di rumah dengan setiap anggota memerankan profesi',
                        'Menonton video pantomim profesional anak-anak',
                        'Membuat cerita pantomim tentang kegiatan sehari-hari',
                    ],
                    appreciationStage:
                        'Buat "Pentas Pantomim Kelas Akhir Semester" — semua kelompok tampil, direkam, dan videonya dibagikan ke grup orang tua. Berikan apresiasi untuk semua.',
                    reflection: [
                        'Pekerjaan apa yang paling menyenangkan untuk dipantomimkan?',
                        'Bagaimana kerja sama tim kalian saat membuat pantomim?',
                        'Apa yang paling sulit saat memperagakan pekerjaan tanpa bicara?',
                    ],
                }),
                art_field: 'SENI TEATER',
                required_materials: [
                    'Ruang kelas yang lapang',
                    'Properti sederhana',
                    'Lembar Kerja Peserta Didik (LKPD)',
                ],
                intro_guide: {
                    duration_minutes: 10,
                    greeting:
                        'Guru menyapa siswa dengan ceria dan mengajak mereka berdiri untuk melakukan gerakan sederhana untuk melemaskan tubuh.',
                    ice_breaker:
                        'Guru mengajak siswa menirukan gerakan pekerjaan: "Seperti apa gerakan menyapu?" Siswa memperagakan bersama.',
                    apperception:
                        'Guru menjelaskan bahwa hari ini siswa akan belajar menirukan gerakan pekerjaan sehari-hari dalam bentuk pantomim.',
                    trigger_question:
                        'Pekerjaan apa yang biasa kamu lihat di rumah? Bagaimana cara memperagakannya?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus:
                        'Menirukan gerakan pekerjaan sehari-hari (menyapu, mencuci, memasak) dalam bentuk pantomim, dengan fokus pada keseimbangan dan koordinasi tubuh.',
                    concrete_steps: [
                        'Guru menunjukkan gerakan pekerjaan menyapu tanpa bicara.',
                        'Guru menunjukkan gerakan mencuci piring, memasak, dan menimba air.',
                        'Siswa menirukan semua gerakan bersama-sama.',
                        'Guru mengajak siswa melatih keseimbangan (berdiri satu kaki) dan koordinasi.',
                    ],
                    script_parent:
                        '"Pantomim pekerjaan itu seperti bermain peran! Cukup gerakkan tubuh seperti sedang melakukan pekerjaan."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Berkreasi dalam Kelompok',
                    game_rules: [
                        'Siswa dibagi menjadi beberapa kelompok kecil.',
                        'Setiap kelompok memilih satu pekerjaan yang akan dipantomimkan (mencuci piring, memasak, menyapu halaman).',
                        'Siswa dalam kelompok bekerja sama membuat urutan gerakan yang menarik tanpa bicara.',
                        'Permainan interaktif: satu siswa menirukan pekerjaan, siswa lain menebak. Kelompok dengan tebakan benar terbanyak mendapat apresiasi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menampilkan gerakan sederhana dengan bantuan guru.',
                        child_level_advanced: 'Membuat urutan gerakan dengan alur cerita yang jelas.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus:
                        'Presentasi pantomim kelompok, refleksi, dan mengerjakan LKPD.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.2: PANTOMIM PEKERJAAN KELOMPOK',
                        instructions:
                            'Peragakan gerakan pekerjaan berikut tanpa bicara! Lalu centang setelah kamu berhasil.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MIMESIS_ACTION',
                                question:
                                    'Peragakan gerakan pekerjaan berikut dalam bentuk pantomim! Gunakan gerakan tubuh yang jelas!',
                                data: {
                                    actions: [
                                        {
                                            name: 'Menyapu Lantai',
                                            icon: '🧹',
                                            description: 'Pegang sapu imajiner, gerakkan maju-mundur untuk menyapu.',
                                        },
                                        {
                                            name: 'Mencuci Piring',
                                            icon: '🧼',
                                            description: 'Gosok piring imajiner dengan tangan, bilas dengan air.',
                                        },
                                        {
                                            name: 'Memasak',
                                            icon: '🍳',
                                            description: 'Aduk masakan di wajan imajiner, cicipi, dan tunjukkan ekspresi.',
                                        },
                                        {
                                            name: 'Menimba Air',
                                            icon: '🪣',
                                            description: 'Tarik tali timba dari sumur dengan tenaga.',
                                        },
                                    ],
                                },
                                answer_key: 'Siswa memperagakan semua gerakan pekerjaan.',
                                explanation: 'Mengenal pantomim pekerjaan sehari-hari.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 2,
                                type: 'DRAWING_FRAME',
                                question:
                                    'Gambarlah dirimu dan kelompokmu sedang bermain pantomim bersama!',
                                data: {
                                    prompt: 'Pantomim kelompok',
                                    guideLines: 'none',
                                    rows: 2,
                                    label: 'Pantomim bersama kelompokku:',
                                },
                                answer_key: 'Siswa menggambar beberapa tokoh dalam adegan pantomim.',
                                explanation: 'Mengasah imajinasi dan kerja sama tim.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Pekerjaan apa yang paling menyenangkan untuk dipantomimkan?',
                        'Bagaimana kerja sama tim kalian saat membuat pantomim?',
                        'Apa yang paling sulit saat memperagakan pekerjaan tanpa bicara?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt:
                            'Foto hasil karya gambar pantomim kelompok pada LKPD 6.2, lalu kirim ke Ibu/Bapak Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Akhir: Pantomim Pekerjaan',
                        quiz_questions: [
                            {
                                question_text: 'Gerakan menyapu dalam pantomim menggunakan anggota tubuh...',
                                option_a: 'Kepala',
                                option_b: 'Tangan dan tubuh',
                                option_c: 'Mata',
                                option_d: 'Mulut',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Untuk menampilkan pantomim pekerjaan dengan baik, kita perlu...',
                                option_a: 'Berteriak',
                                option_b: 'Latihan dan kerja sama',
                                option_c: 'Berlari',
                                option_d: 'Tidur',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Contoh pekerjaan yang bisa dipantomimkan adalah...',
                                option_a: 'Berbicara di telepon',
                                option_b: 'Mencuci piring',
                                option_c: 'Menonton TV',
                                option_d: 'Tidur',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Saat berpantomim, kita harus menggunakan...',
                                option_a: 'Hanya kaki',
                                option_b: 'Seluruh anggota tubuh',
                                option_c: 'Hanya mulut',
                                option_d: 'Hanya mata',
                                correct_answer: 'B',
                            },
                            {
                                question_text: 'Manfaat bermain pantomim bersama kelompok adalah...',
                                option_a: 'Membosankan',
                                option_b: 'Melatih kerja sama dan kreativitas',
                                option_c: 'Membuat takut',
                                option_d: 'Membuat sedih',
                                correct_answer: 'B',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedSeniBudayaFaseAKelas1() {
    console.log('================================================================');
    console.log('🎨 SEEDING RESMI: SENI BUDAYA FASE A KELAS 1');
    console.log('   Fokus: Seni Rupa, Seni Tari & Seni Teater');
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

    console.log('\n🧹 [2/3] Membersihkan data Mapel Seni Budaya lama jika ada...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('name', 'Seni Budaya')
        .maybeSingle();

    let subjectId: string;

    if (existingSubject) {
        subjectId = existingSubject.id;
        console.log(`   ✓ Ditemukan Mapel Seni Budaya (ID: ${subjectId}). Menghapus modul lama...`);

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
        console.log('   ✓ Modul Seni Budaya lama berhasil dibersihkan.');
    } else {
        const { data: newSubject, error: subjErr } = await supabase
            .from('subjects')
            .insert({
                class_id: classId,
                name: 'Seni Budaya',
                code: 'SBD-1',
            })
            .select('id')
            .single();

        if (subjErr || !newSubject) {
            console.error('Gagal membuat mapel Seni Budaya:', subjErr?.message);
            process.exit(1);
        }
        subjectId = newSubject.id;
        console.log(`   ✓ Mata Pelajaran Seni Budaya baru terdaftar (ID: ${subjectId})`);
    }

    console.log('\n📚 [3/3] Menyimpan 6 Bab dan 12 Pertemuan Ajar (Seni Rupa, Tari, Teater)...');

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of CHAPTERS_DATA) {
        const fieldEmoji =
            chapter.art_field === 'SENI RUPA' ? '🎨' : chapter.art_field === 'SENI TARI' ? '💃' : '🎭';
        console.log(
            `\n${fieldEmoji} Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`
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
    console.log('🎉 SEEDING SENI BUDAYA BERHASIL 100%!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar dan ${totalQuizzesCreated} Kuis CBT tersimpan.`);
    console.log('');
    console.log('📊 Distribusi Bidang Seni:');
    console.log('   🎨 Seni Rupa   : 2 Bab × 2 Pertemuan = 4 Pertemuan');
    console.log('   💃 Seni Tari   : 2 Bab × 2 Pertemuan = 4 Pertemuan');
    console.log('   🎭 Seni Teater : 2 Bab × 2 Pertemuan = 4 Pertemuan');
    console.log('================================================================\n');
}

seedSeniBudayaFaseAKelas1().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Seni Budaya:', err);
    process.exit(1);
});