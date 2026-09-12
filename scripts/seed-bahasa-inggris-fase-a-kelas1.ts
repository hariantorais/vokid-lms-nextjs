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
    console.error('Kredensial NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
});

export type LkpdItemType =
    | 'PICT_COUNT'
    | 'NUMBER_BOND'
    | 'SHAPE_CARD'
    | 'TEN_FRAME'
    | 'LENGTH_COMPARE'
    | 'PICT_CHART'
    | 'MATH_PROBLEM'
    | 'ENGLISH_CARD'
    | 'COLOR_PALETTE'
    | 'MATCH_PAIRS';

export interface LkpdItem {
    id: string | number;
    type: LkpdItemType;
    question: string;
    data?: Record<string, unknown>;
    answer_key: string;
    explanation: string;
}

interface LessonItem {
    title: string;
    order_index: number;
    learning_objectives: string;
    content_text: string;
    linguistic_focus: string;
    pronunciation_guide: string;
    cultural_context: string;
    common_difficulties: string[];
    assessment_indicators: string[];
    parent_tips: string[];
    extension_activities: string[];
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

/**
 * Helper untuk membuat content_text yang kaya & terstruktur
 */
function buildContentText(params: {
    title: string;
    linguisticFocus: string;
    vocabulary: string[];
    patterns: string[];
    languageFunction: string;
    pronunciation: Array<{ word: string; ipa: string; tip: string }>;
    realContext: string[];
    indicators: string[];
    parentTips: string[];
    difficulties: Array<{ issue: string; solution: string }>;
    extensions: string[];
}): string {
    return `**${params.title}**

📌 **Fokus Linguistik**:
- **Kosa Kata Inti**: ${params.vocabulary.join(', ')}
- **Pola Kalimat**: ${params.patterns.map((p) => `"${p}"`).join(' | ')}
- **Fungsi Bahasa**: ${params.languageFunction}

🗣️ **Target Pelafalan**:
${params.pronunciation.map((p) => `- **${p.word}** ${p.ipa} — ${p.tip}`).join('\n')}

🏠 **Konteks Sehari-hari**:
${params.realContext.map((c) => `- ${c}`).join('\n')}

🎯 **Indikator Capaian**:
${params.indicators.map((ind, i) => `${i + 1}. ${ind}`).join('\n')}

💡 **Tips Pedagogis untuk Orang Tua**:
${params.parentTips.map((t) => `- ${t}`).join('\n')}

⚠️ **Kesulitan Umum Anak & Solusinya**:
${params.difficulties.map((d) => `- **${d.issue}** → ${d.solution}`).join('\n')}

🌟 **Aktivitas Pengayaan (Opsional)**:
${params.extensions.map((e) => `- ${e}`).join('\n')}`;
}

const CHAPTERS_DATA: ChapterItem[] = [
    // ===========================================================================
    // SEMESTER 1 — UNIT 1: HOW ARE YOU?
    // ===========================================================================
    {
        chapter_number: 1,
        title: 'Unit 1: How Are You?',
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Meeting 1: Morning & Afternoon Greetings (Good Morning & Good Afternoon)',
                order_index: 1,
                learning_objectives: 'Students are able to greet teachers, parents, and friends politely using "Good morning" and "Good afternoon" with appropriate body gestures, correct pronunciation, and contextual awareness of time of day.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Sapaan Berdasarkan Waktu (Time-Based Greetings)',
                    linguisticFocus: 'Time-based greetings',
                    vocabulary: ['Good morning', 'Good afternoon', 'Hello', 'Hi'],
                    patterns: ['Good morning, [nama]!', 'Good afternoon, [nama]!'],
                    languageFunction: 'Menyapa & merespons sapaan dengan sopan (greeting & responding)',
                    pronunciation: [
                        { word: 'Good', ipa: '/ɡʊd/', tip: 'bunyi "u" pendek seperti pada kata "book", bukan "gud" panjang' },
                        { word: 'Morning', ipa: '/ˈmɔːr.nɪŋ/', tip: 'tekan suku kata pertama MOR-ning, bukan mor-NING' },
                        { word: 'Afternoon', ipa: '/ˌæf.tərˈnuːn/', tip: 'tekan suku kata terakhir af-ter-NOON' },
                    ],
                    realContext: [
                        'Anak menyapa orang tua saat bangun tidur: "Good morning, Mom!"',
                        'Anak menyapa guru saat tiba di sekolah pagi: "Good morning, Miss!"',
                        'Anak menyapa tetangga saat pulang sekolah siang: "Good afternoon, Auntie!"',
                        'Anak merespons sapaan teman: "Good morning too, Rani!"',
                    ],
                    indicators: [
                        'Menyapa dengan "Good morning" pada waktu 06.00–12.00',
                        'Menyapa dengan "Good afternoon" pada waktu 12.00–18.00',
                        'Melafalkan dengan intonasi ramah + senyum + kontak mata',
                        'Membedakan kapan harus menggunakan masing-masing sapaan',
                    ],
                    parentTips: [
                        'Berikan contoh sapaan setiap pagi secara konsisten',
                        'Gunakan pujian spesifik untuk memotivasi anak',
                        'Ajak anak menghitung jam sebelum memilih sapaan',
                        'Praktikkan dalam situasi nyata dengan tetangga atau kerabat',
                        'Gunakan cermin agar anak melihat senyumnya saat menyapa',
                    ],
                    difficulties: [
                        { issue: 'Anak tertukar antara Good morning dan Good afternoon', solution: 'gunakan visual matahari terbit vs. tinggi' },
                        { issue: 'Mengucapkan "gud" bukan "good"', solution: 'latih dengan cermin & panjang pendek bunyi' },
                        { issue: 'Lupa tersenyum saat menyapa', solution: 'tempelkan gambar emoji tersenyum di dekat pintu' },
                        { issue: 'Malu menyapa orang baru', solution: 'dampingi dulu, beri contoh, baru minta anak mengulang' },
                    ],
                    extensions: [
                        'Buat "Sapaan Chart" di dinding kamar dengan gambar matahari terbit & tinggi',
                        'Rekam suara anak menyapa & putar ulang agar ia mendengar sendiri',
                        'Ajak anak menyapa semua anggota keluarga pagi ini satu per satu',
                    ],
                }),
                linguistic_focus: 'Time-based greetings: Good morning & Good afternoon',
                pronunciation_guide: 'Good /ɡʊd/ (u pendek), Morning /ˈmɔːr.nɪŋ/ (tekan MOR), Afternoon /ˌæf.tərˈnuːn/ (tekan NOON)',
                cultural_context: 'Di budaya Barat, sapaan pagi dianggap penting sebagai tanda hormat dan kesopanan, terutama kepada orang yang lebih tua.',
                common_difficulties: [
                    'Anak tertukar antara Good morning dan Good afternoon',
                    'Pelafalan "good" menjadi "gud" (bunyi u terlalu panjang)',
                    'Lupa tersenyum saat menyapa',
                    'Malu menyapa orang yang belum dikenal',
                ],
                assessment_indicators: [
                    'Menyapa dengan "Good morning" pada waktu 06.00–12.00',
                    'Menyapa dengan "Good afternoon" pada waktu 12.00–18.00',
                    'Melafalkan dengan intonasi ramah + senyum + kontak mata',
                    'Membedakan kapan harus menggunakan masing-masing sapaan',
                ],
                parent_tips: [
                    'Berikan contoh sapaan setiap pagi secara konsisten',
                    'Gunakan pujian spesifik untuk memotivasi anak',
                    'Ajak anak menghitung jam sebelum memilih sapaan',
                    'Praktikkan dalam situasi nyata dengan tetangga atau kerabat',
                ],
                extension_activities: [
                    'Buat "Sapaan Chart" bergambar matahari terbit & tinggi di kamar',
                    'Rekam suara anak menyapa & putar ulang agar ia mendengar',
                    'Ajak anak menyapa semua anggota keluarga satu per satu',
                ],
                required_materials: ['Flashcard gambar matahari terbit & siang', 'Boneka tangan / puppet', 'Cermin kecil'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Beri senyum hangat dan lambaikan tangan: "Good morning, my brave champion! How are you today?"',
                    ice_breaker: 'Tepuk Salam Senyum Sapa: Berdiri tegak, tersenyum lebar, lalu membungkuk hormat sambil berseru "Good morning!"',
                    apperception: 'Tunjukkan gambar jendela pagi berembun: "Saat bangun tidur dan matahari baru terbit, apa sapaan yang kita ucapkan ke Ayah dan Ibu?"',
                    trigger_question: 'What do you say when the sun is shining bright at twelve o\'clock noon?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Asosiasi visual posisi matahari dengan sapaan Good Morning (pagi) dan Good Afternoon (siang), disertai pelafalan yang tepat dan gestur tubuh yang sopan.',
                    concrete_steps: [
                        'Tunjukkan gambar setengah lingkaran matahari terbit di balik bukit → ucapkan "Good morning" dengan ceria.',
                        'Tunjukkan gambar matahari penuh bersinar di atas rumah → ucapkan "Good afternoon" dengan nada lebih tenang.',
                        'Bimbing anak melafalkan dengan intonasi ramah: "Good MOR-ning" (tekan suku kata pertama).',
                        'Ajak anak berlatih tersenyum sambil menyapa cermin: "Good morning, me!"',
                        'Ulangi 3x bergantian antara pagi dan siang sambil menunjuk jam dinding.',
                    ],
                    script_parent: '"Good morning diucapkan saat matahari baru terbit (pagi hari, sebelum jam 12 siang). Good afternoon diucapkan saat matahari sudah tinggi di langit (siang/sore, setelah jam 12 siang). Ucapkan dengan senyum lebar dan suara ramah ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Matahari Terbit & Lempar Bola Sapaan',
                    game_rules: [
                        'Ayah memegang gambar matahari dan bola spons kecil.',
                        'Jika Ayah mengangkat matahari separuh (terbit): anak menangkap bola dan berteriak "Good morning!".',
                        'Jika Ayah mengangkat matahari penuh (tinggi): anak menangkap bola dan berteriak "Good afternoon!".',
                        'Jika anak salah menyebutkan, ia harus melompat 3x sambil tertawa dan mencoba lagi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menirukan ucapan sapaan dengan panduan kartu visual.',
                        child_level_advanced: 'Merespons langsung sapaan dalam kalimat lengkap: "Good morning, Dad. I am ready!"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencocokkan gambar suasana matahari dengan pilihan sapaan yang tepat, melatih pelafalan, dan menerapkan sapaan dalam konteks rumah.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: GREETINGS (MORNING & AFTERNOON)',
                        instructions: 'Look at the picture and tick (√) the correct greeting.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the sunrise picture at 07:00 AM. What is the correct greeting?',
                                data: { icon: '🌅', subtitle: 'Time: 07:00 AM', options: ['Good morning', 'Good night'] },
                                answer_key: 'Good morning',
                                explanation: 'Pagi hari saat matahari terbit (pukul 07.00) menyapa dengan Good morning.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the bright sun at 01:00 PM. What is the correct greeting?',
                                data: { icon: '☀️', subtitle: 'Time: 01:00 PM', options: ['Good afternoon', 'Goodbye'] },
                                answer_key: 'Good afternoon',
                                explanation: 'Siang hari saat matahari terik (pukul 13.00) menggunakan Good afternoon.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the time picture with the correct greeting phrase:',
                                data: {
                                    pairs: [
                                        { left: '🌅 Pagi (07:00 AM)', right: 'Good morning' },
                                        { left: '☀️ Siang (01:00 PM)', right: 'Good afternoon' },
                                    ],
                                },
                                answer_key: 'Pagi → Good morning; Siang → Good afternoon',
                                explanation: 'Pemasangan waktu terbit dan terik matahari dengan sapaannya.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace the word: G - O - O - D   M - O - R - N - I - N - G',
                                answer_key: 'Good morning',
                                explanation: 'Menebalkan kata Good morning untuk melatih motorik halus & pengenalan huruf.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'ENGLISH_CARD',
                                question: 'Aisyah meets her teacher in the school yard at 07:30 AM. What does she say?',
                                data: { icon: '🏫', subtitle: 'Meeting teacher at school', options: ["Good morning, Ma'am", "Goodbye, Ma'am"] },
                                answer_key: "Good morning, Ma'am",
                                explanation: 'Sapaan hormat pagi hari kepada guru perempuan di sekolah menggunakan "Good morning, Ma\'am".',
                            },
                            {
                                id: 6,
                                type: 'MATH_PROBLEM',
                                question: 'Draw yourself greeting your mother in the morning. Write the correct sentence below the picture!',
                                answer_key: 'Good morning, Mom!',
                                explanation: 'Aktivitas kreatif menggabungkan menggambar & menulis kalimat sapaan.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana perasaanmu saat menyapa Ayah/Ibu pagi tadi?',
                        'Sapaan apa yang kamu gunakan saat jam istirahat siang?',
                        'Kapan lagi kamu bisa memakai "Good afternoon"?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice saying "Good morning, Dad!" and "Good afternoon, Mom!" with a cheerful voice and a big smile!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 1: Morning and Afternoon Greetings',
                        quiz_questions: [
                            { question_text: 'Sapaan yang diucapkan saat bertemu guru pada pukul 07.00 pagi adalah...', option_a: 'Good night', option_b: 'Good morning', option_c: 'Goodbye', option_d: 'Good evening', correct_answer: 'B' },
                            { question_text: 'Arti dari "Good afternoon" dalam bahasa Indonesia adalah...', option_a: 'Selamat pagi', option_b: 'Selamat siang / sore', option_c: 'Selamat tidur', option_d: 'Sampai jumpa', correct_answer: 'B' },
                            { question_text: 'Bahasa tubuh yang baik saat menyapa orang lain adalah...', option_a: 'Cemberut dan membelakangi', option_b: 'Tersenyum ramah dan menatap sopan', option_c: 'Berteriak marah', option_d: 'Menutup muka', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat: "Good [ ... ], Mom" saat sarapan pagi hari.', option_a: 'night', option_b: 'morning', option_c: 'bye', option_d: 'sleep', correct_answer: 'B' },
                            { question_text: 'Saat jam 1 siang pulang sekolah, kita menyapa teman dengan...', option_a: 'Good afternoon', option_b: 'Good morning', option_c: 'Good sleep', option_d: 'Hello morning', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 2: Asking Condition & Saying Farewell (How Are You? & Goodbye)',
                order_index: 2,
                learning_objectives: 'Students are able to ask and respond to "How are you?" (I am fine / I am ok) and say "Goodbye" with waving gesture, appropriate facial expressions, and understanding of social care.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Menanyakan Kabar & Berpamitan',
                    linguisticFocus: 'Asking & responding condition, farewell expressions',
                    vocabulary: ['How are you?', 'I am fine', 'I am ok', 'I am great', 'Goodbye', 'See you later'],
                    patterns: ['How are you?', 'I am fine / I am ok / I am great', 'Goodbye, see you!'],
                    languageFunction: 'Menunjukkan kepedulian sosial & berpamitan dengan sopan',
                    pronunciation: [
                        { word: 'How', ipa: '/haʊ/', tip: 'bunyi "au" seperti pada kata "house"' },
                        { word: 'Are', ipa: '/ɑːr/', tip: 'bunyi "ar" panjang, bukan "er"' },
                        { word: 'Fine', ipa: '/faɪn/', tip: 'bunyi "ai" seperti pada kata "find", vokal panjang' },
                        { word: 'Goodbye', ipa: '/ˌɡʊdˈbaɪ/', tip: 'tekan suku kata BYE di akhir' },
                    ],
                    realContext: [
                        'Anak menanyakan kabar teman di sekolah: "Hi Rani, how are you?"',
                        'Anak merespons guru yang bertanya kabar: "I am fine, thank you, Miss!"',
                        'Anak berpamitan kepada orang tua saat berangkat sekolah: "Goodbye, Mom!"',
                        'Anak melambaikan tangan kepada teman saat pulang: "Goodbye, see you tomorrow!"',
                    ],
                    indicators: [
                        'Menanyakan kabar dengan "How are you?" & intonasi naik',
                        'Menjawab dengan "I am fine / I am ok" dengan jujur',
                        'Melambaikan tangan + tersenyum saat mengucapkan "Goodbye"',
                        'Membedakan konteks sapaan vs. berpamitan',
                    ],
                    parentTips: [
                        'Awali hari dengan bertanya kabar anak dalam bahasa Inggris',
                        'Ajarkan bahwa jawaban boleh jujur, tidak harus selalu "I am fine"',
                        'Biasakan berpamitan dengan lambaian saat berangkat kerja',
                        'Gunakan boneka tangan untuk role-play situasi berpisah',
                        'Pujilah anak saat ia mau bertanya kabar orang lain tanpa disuruh',
                    ],
                    difficulties: [
                        { issue: 'Tertukar antara "How are you?" (bertanya) dan "I am fine" (menjawab)', solution: 'gunakan gesture (telapak terbuka untuk tanya, jempol untuk jawab)' },
                        { issue: 'Lupa melambaikan tangan', solution: 'latihan di depan cermin bersama' },
                        { issue: 'Malu menjawab karena takut salah', solution: 'mulai dari 2 kata sederhana "I am"' },
                        { issue: 'Mengucapkan "Goodbye" dengan muka cemberut', solution: 'beri contoh lambaian ceria' },
                    ],
                    extensions: [
                        'Video call singkat dengan nenek/kakek untuk praktik "How are you?"',
                        'Buat "Goodbye Card" untuk ayah yang berangkat kerja',
                        'Ajak anak berpamitan bahasa Inggris ke semua anggota keluarga sebelum tidur',
                    ],
                }),
                linguistic_focus: 'Asking & responding condition, farewell expressions',
                pronunciation_guide: 'How /haʊ/, Are /ɑːr/, Fine /faɪn/, Goodbye /ˌɡʊdˈbaɪ/ (tekan BYE)',
                cultural_context: 'Menanyakan kabar adalah bentuk kepedulian universal. Di budaya Inggris, jawaban "I am fine" sering diucapkan meskipun kondisi sebenarnya kurang baik — namun untuk anak SD, kejujuran perasaan tetap dianjurkan.',
                common_difficulties: [
                    'Tertukar antara pertanyaan dan jawaban kabar',
                    'Lupa melambaikan tangan saat mengucapkan Goodbye',
                    'Malu menjawab karena takut salah pelafalan',
                    'Mengucapkan Goodbye dengan ekspresi sedih',
                ],
                assessment_indicators: [
                    'Menanyakan kabar dengan "How are you?" & intonasi naik',
                    'Menjawab dengan "I am fine / I am ok" dengan jujur',
                    'Melambaikan tangan + tersenyum saat mengucapkan "Goodbye"',
                    'Membedakan konteks sapaan vs. berpamitan',
                ],
                parent_tips: [
                    'Awali hari dengan bertanya kabar anak dalam bahasa Inggris',
                    'Biasakan berpamitan dengan lambaian saat berangkat kerja',
                    'Gunakan boneka tangan untuk role-play',
                    'Pujilah anak saat ia mau bertanya kabar tanpa disuruh',
                ],
                extension_activities: [
                    'Video call singkat dengan nenek/kakek untuk praktik "How are you?"',
                    'Buat "Goodbye Card" untuk ayah yang berangkat kerja',
                    'Ajak anak berpamitan bahasa Inggris sebelum tidur',
                ],
                required_materials: ['Kartu senyum (Happy Face & OK Face)', 'Cermin kecil', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hello my friend! Put your thumbs up and say: I AM READY!"',
                    ice_breaker: 'Simon Says Melambai: "Simon says wave your hand and say Goodbye!"',
                    apperception: 'Tanyakan sambil tersenyum: "Kalau teman bertanya kabar, bagaimana caramu menjawab dalam bahasa Inggris?"',
                    trigger_question: 'When your friend is going home, what do you wave and say?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola tanya-jawab kondisi fisik/perasaan (How are you? → I am fine / I am ok), dikombinasikan dengan gestur lambaian tangan untuk berpamitan.',
                    concrete_steps: [
                        'Ajarkan intonasi tanya yang ramah: "How are YOU?" (naik di akhir).',
                        'Ajarkan respon jempol ke atas: "I am FINE" atau "I am OK" (turun di akhir).',
                        'Ajarkan lambaian tangan perpisahan: "Goodbye, see you!" sambil tersenyum.',
                        'Praktikkan bergantian: Ayah tanya, anak jawab; lalu anak tanya, Ayah jawab.',
                        'Latihan di depan cermin agar anak melihat senyumnya saat menyapa & melambai.',
                    ],
                    script_parent: '"Saat bertanya kabar, suara kita naik di akhir seperti bertanya. Saat menjawab, suara kita turun di akhir seperti memberi kabar. Jangan lupa senyum dan jempol ke atas ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lingkaran Bisik Kabar Bahagia',
                    game_rules: [
                        'Ayah dan anak saling melempar boneka.',
                        'Pelempar bertanya: "Hi, how are you?".',
                        'Penerima menangkap, tersenyum menunjukkan jempol: "I am fine! Goodbye!" lalu melambaikan tangan.',
                        'Jika anak lupa melambai, Ayah mengingatkan dengan lambaian sendiri tanpa kata.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab "I am ok" dibantu kartu ekspresi senyum.',
                        child_level_advanced: 'Menjawab lengkap: "I am great, thank you. And you?"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghubungkan gestur lambaian tangan dengan ungkapan Goodbye dan I am fine, serta menerapkan dalam dialog singkat.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: HOW ARE YOU AND GOODBYE',
                        instructions: 'Look and tick (√) the matching greeting expression.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Friend asks: "How are you?". Look at the happy face, what is your answer?',
                                data: { icon: '😊', subtitle: 'Condition: Healthy & Happy', options: ['I am fine', 'Goodbye'] },
                                answer_key: 'I am fine',
                                explanation: 'Respon terhadap pertanyaan How are you saat kondisi sehat adalah I am fine.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'The school bell rings and you are going home. What do you say while waving?',
                                data: { icon: '👋', subtitle: 'Action: Waving hand', options: ['Goodbye', 'Good morning'] },
                                answer_key: 'Goodbye',
                                explanation: 'Melambaikan tangan saat pulang berarti mengucapkan Goodbye.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the question and response:',
                                data: {
                                    pairs: [
                                        { left: '❓ "How are you?"', right: 'I am fine' },
                                        { left: '👋 "Goodbye!"', right: 'See you later' },
                                    ],
                                },
                                answer_key: 'How are you → I am fine; Goodbye → See you later',
                                explanation: 'Pasangan tanya-jawab kabar dan perpisahan.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: G - O - O - D - B - Y - E',
                                answer_key: 'Goodbye',
                                explanation: 'Menebalkan kata selamat tinggal untuk latihan motorik halus.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'ENGLISH_CARD',
                                question: 'Dad goes to the office in a car. What do you wave and say?',
                                data: { icon: '🚗', subtitle: 'Dad going to work', options: ['Goodbye, Dad!', 'Good night, Dad!'] },
                                answer_key: 'Goodbye, Dad!',
                                explanation: 'Ungkapan perpisahan santun saat orang tua berangkat kerja menggunakan "Goodbye, Dad!".',
                            },
                            {
                                id: 6,
                                type: 'MATH_PROBLEM',
                                question: 'Complete the dialog below:\nA: "How are you, Rani?"\nB: "I am [ ... ], thank you!"',
                                answer_key: 'fine',
                                explanation: 'Melengkapi dialog tanya jawab kabar dengan kata "fine".',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu merasa senang saat menyapa Goodbye dengan lambaian besar?',
                        'Bagaimana cara mengatakan bahwa kamu dalam kondisi baik?',
                        'Kapan lagi kamu bisa bertanya kabar pada teman?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan tebalkan kata Goodbye pada lembar LKPD 1.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 2: Asking Condition and Farewell',
                        quiz_questions: [
                            { question_text: 'Pertanyaan "How are you?" artinya adalah...', option_a: 'Siapa namamu?', option_b: 'Bagaimana kabarmu?', option_c: 'Berapa umurmu?', option_d: 'Di mana rumahmu?', correct_answer: 'B' },
                            { question_text: 'Jawaban yang tepat saat kabarmu sehat dan baik adalah...', option_a: 'I am fine', option_b: 'Good night', option_c: 'I am red', option_d: 'Goodbye', correct_answer: 'A' },
                            { question_text: 'Kata "Goodbye" diucapkan saat...', option_a: 'Bangun tidur', option_b: 'Berpisah / hendak pulang', option_c: 'Sedang makan', option_d: 'Membaca buku', correct_answer: 'B' },
                            { question_text: 'Gerakan tubuh yang tepat saat mengucapkan "Goodbye" adalah...', option_a: 'Melipat tangan di dada', option_b: 'Melambaikan tangan sambil tersenyum', option_c: 'Menutup mata', option_d: 'Menghentakkan kaki', correct_answer: 'B' },
                            { question_text: 'Jika temanmu menyapa "Hi, how are you?", kamu menjawab...', option_a: 'I am ok, thank you', option_b: 'No, I am not', option_c: 'Goodbye teacher', option_d: 'Good afternoon', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 2: I AM KIMI
    // ===========================================================================
    {
        chapter_number: 2,
        title: 'Unit 2: I Am Kimi',
        target_semester: 1,
        week_target: 3,
        lessons: [
            {
                title: 'Meeting 3: Introducing Self (I am...)',
                order_index: 1,
                learning_objectives: 'Students are able to introduce themselves confidently using the pattern "Hello, I am [Name]" or "Hi, I am [Name]" with correct pronunciation and body posture.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Memperkenalkan Diri (Self-Introduction)',
                    linguisticFocus: 'Self-introduction using "I am"',
                    vocabulary: ['Hello', 'Hi', 'I am', 'Nice to meet you'],
                    patterns: ['Hello, I am [Nama]', 'Hi, I am [Nama]', 'Nice to meet you'],
                    languageFunction: 'Membangun keberanian berbicara & memperkenalkan identitas diri',
                    pronunciation: [
                        { word: 'Hello', ipa: '/həˈloʊ/', tip: 'tekan suku kata kedua he-LO' },
                        { word: 'I am', ipa: '/aɪ æm/', tip: 'bunyi "ai" seperti kata "eye", sambungkan dengan lembut ke "am"' },
                        { word: 'Nice', ipa: '/naɪs/', tip: 'bunyi "ai" panjang seperti kata "rice"' },
                    ],
                    realContext: [
                        'Anak memperkenalkan diri ke teman baru di taman: "Hi, I am Cici!"',
                        'Anak memperkenalkan diri ke guru baru: "Hello, I am Joshua, Ma\'am."',
                        'Anak menjawab saat ditanya nama: "My name is Cici, I am 6 years old."',
                        'Anak menyapa sahabat dengan pola: "Hello, I am Kimi the cat!"',
                    ],
                    indicators: [
                        'Memperkenalkan nama dengan pola "Hello/Hi, I am [Nama]"',
                        'Melafalkan "I am" dengan bunyi /aɪ æm/ yang jelas',
                        'Berdiri tegak, tersenyum, & kontak mata saat memperkenalkan diri',
                        'Mengucapkan "Nice to meet you" setelah perkenalan',
                    ],
                    parentTips: [
                        'Latih perkenalan diri setiap pagi sebelum berangkat sekolah',
                        'Gunakan cermin agar anak melihat postur & senyumnya',
                        'Rekam perkenalan anak & putar ulang untuk evaluasi ringan',
                        'Berikan apresiasi meskipun pelafalan belum sempurna',
                        'Ajak anak memperkenalkan diri ke kerabat yang baru dikenal',
                    ],
                    difficulties: [
                        { issue: 'Malu & menunduk saat memperkenalkan diri', solution: 'latih di depan cermin & keluarga dulu sebelum ke orang baru' },
                        { issue: 'Pelafalan "I am" menjadi "Iyam"', solution: 'pisahkan bunyi "ai" dan "am" dengan jeda kecil' },
                        { issue: 'Lupa menyebut "Nice to meet you"', solution: 'jadikan satu paket: "Hello, I am ... Nice to meet you!"' },
                        { issue: 'Tertukar antara "I am" dan "My name is"', solution: 'beri contoh: keduanya sama-sama benar, pilih salah satu' },
                    ],
                    extensions: [
                        'Buat "Name Card" hias untuk meja belajar dengan tulisan "I am [Nama]"',
                        'Ajak anak memperkenalkan diri ke tetangga baru dalam bahasa Inggris',
                        'Rekam video perkenalan singkat untuk dikirim ke nenek/kakek',
                    ],
                }),
                linguistic_focus: 'Self-introduction using "I am"',
                pronunciation_guide: 'Hello /həˈloʊ/, I am /aɪ æm/, Nice /naɪs/',
                cultural_context: 'Di budaya Barat, perkenalan diri biasanya disertai kontak mata & jabat tangan. Untuk anak SD, cukup dengan senyum & sapaan verbal yang ramah.',
                common_difficulties: [
                    'Malu & menunduk saat memperkenalkan diri',
                    'Pelafalan "I am" menjadi "Iyam"',
                    'Lupa menyebut "Nice to meet you"',
                    'Tertukar antara "I am" dan "My name is"',
                ],
                assessment_indicators: [
                    'Memperkenalkan nama dengan pola "Hello/Hi, I am [Nama]"',
                    'Melafalkan "I am" dengan bunyi /aɪ æm/ yang jelas',
                    'Berdiri tegak, tersenyum, & kontak mata',
                    'Mengucapkan "Nice to meet you" setelah perkenalan',
                ],
                parent_tips: [
                    'Latih perkenalan diri setiap pagi sebelum berangkat sekolah',
                    'Gunakan cermin agar anak melihat postur & senyumnya',
                    'Rekam perkenalan anak & putar ulang untuk evaluasi',
                    'Berikan apresiasi meskipun pelafalan belum sempurna',
                ],
                extension_activities: [
                    'Buat "Name Card" hias dengan tulisan "I am [Nama]"',
                    'Ajak anak memperkenalkan diri ke tetangga baru',
                    'Rekam video perkenalan untuk dikirim ke nenek/kakek',
                ],
                required_materials: ['Foto diri siswa', 'Bingkai kartu nama kertas', 'Boneka kucing Kimi'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hi champion! Stand tall like a superhero and tell me your great name!"',
                    ice_breaker: 'Tepuk Tepuk Nama: Tepuk paha dua kali, tepuk tangan: "Hello! I am [Sebutkan nama]!"',
                    apperception: 'Tunjukkan boneka kucing Kimi: "Boneka ini bersuara: \'Meow, I am Kimi\'. Kalau kamu siapa?"',
                    trigger_question: 'How do you introduce your name to a new friend in the playground?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Penggunaan frasa "I am" untuk menyatakan identitas nama diri, dengan postur tubuh tegak & senyum ramah.',
                    concrete_steps: [
                        'Letakkan tangan kanan di dada: "I am...".',
                        'Sebutkan nama panggilan dengan jelas: "I am Cici" / "I am Joshua".',
                        'Latih pengucapan tegak, kontak mata, & senyum ramah.',
                        'Tambahkan "Nice to meet you!" di akhir perkenalan.',
                        'Ulangi 3x bergantian: berpasangan dengan Ayah/Ibu.',
                    ],
                    script_parent: '"Letakkan tangan di dada dan ucapkan dengan bangga: Hi, I am [Nama Anak]! Jangan lupa tersenyum dan menatap lawan bicara."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Estafet Mikrofon Perkenalan',
                    game_rules: [
                        'Gunakan spidol sebagai mikrofon penyanyi.',
                        'Putar lagu ceria; saat musik mati, pemegang mikrofon maju selangkah dan berseru: "Hello, I am [Nama]!"',
                        'Jika salah, anak harus menyanyikan "Hello, I am..." dengan nada lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan "I am [Nama]" dengan bantuan Ayah.',
                        child_level_advanced: 'Menyebutkan "Hello friends, I am [Nama]. Nice to meet you!"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menempelkan foto diri di papan bingkai LKPD dan mencocokkan nama tokoh buku.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: INTRODUCING MYSELF (I AM...)',
                        instructions: 'Look at the character card and match the sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the character holding the name card. Who is he?',
                                data: { icon: '👦', subtitle: 'Name tag: Joshua', options: ['I am Joshua', 'I am Cici'] },
                                answer_key: 'I am Joshua',
                                explanation: 'Gambar menunjukkan tokoh anak laki-laki Joshua.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the friendly cat character. What does the cat say?',
                                data: { icon: '🐱', subtitle: 'Cat says: Meow', options: ['I am Kimi', 'I am Made'] },
                                answer_key: 'I am Kimi',
                                explanation: 'Kimi adalah tokoh kucing yang bersuara meow.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the character with the right self-introduction:',
                                data: {
                                    pairs: [
                                        { left: '👦 Joshua', right: 'I am Joshua' },
                                        { left: '👧 Cici', right: 'I am Cici' },
                                        { left: '🐱 Kimi', right: 'I am Kimi' },
                                    ],
                                },
                                answer_key: 'Pasangan cocok sesuai nama karakter',
                                explanation: 'Pencocokan nama tokoh dengan kalimat I am.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: I -  A - M',
                                answer_key: 'I am',
                                explanation: 'Menebalkan kata I am untuk latihan motorik halus.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your own name: "Hello, I am [ ... ]"',
                                answer_key: 'Nama Panggilan Siswa',
                                explanation: 'Menyebutkan nama diri sendiri dengan pola I am.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu merasa percaya diri saat menyebutkan namamu?',
                        'Siapa tokoh kucing di Unit 2 ini?',
                        'Kapan lagi kamu bisa memperkenalkan diri?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice introducing yourself: "Hello, I am [Your Name]! Nice to meet you!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 3: Introducing Self (I am...)',
                        quiz_questions: [
                            { question_text: 'Arti dari kalimat "I am Joshua" adalah...', option_a: 'Kamu adalah Joshua', option_b: 'Saya adalah Joshua', option_c: 'Dia adalah Joshua', option_d: 'Selamat pagi Joshua', correct_answer: 'B' },
                            { question_text: 'Untuk memperkenalkan diri, kita mengucapkan...', option_a: 'I am [Nama]', option_b: 'Goodbye [Nama]', option_c: 'Thank you [Nama]', option_d: 'Good night [Nama]', correct_answer: 'A' },
                            { question_text: 'Kimi si kucing dalam buku My Next Words bersuara...', option_a: 'Guk guk', option_b: 'Meow meow', option_c: 'Kwek kwek', option_d: 'Moo moo', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat: "Hello, [ ... ] am Cici."', option_a: 'you', option_b: 'I', option_c: 'he', option_d: 'is', correct_answer: 'B' },
                            { question_text: 'Sikap terbaik saat memperkenalkan nama ke teman baru adalah...', option_a: 'Menangis tersipu', option_b: 'Tersenyum ramah dan percaya diri', option_c: 'Lari bersembunyi', option_d: 'Marah-marah', correct_answer: 'B' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 4: Asking Friend\'s Name & Calling Others (You are...)',
                order_index: 2,
                learning_objectives: 'Students are able to ask a friend\'s name ("What is your name?") and point to friends politely using "You are [Name]" with correct intonation.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Bertanya Nama Teman & Menyebut Nama Orang Lain',
                    linguisticFocus: 'Asking name & calling others using "You are"',
                    vocabulary: ['What is your name?', 'You are', 'My friend'],
                    patterns: ['What is your name?', 'You are [Nama]', 'I am [Nama], and you are [Nama]'],
                    languageFunction: 'Interaksi dua arah & menyebut identitas orang lain dengan sopan',
                    pronunciation: [
                        { word: 'What', ipa: '/wɒt/', tip: 'bunyi "o" pendek seperti kata "hot"' },
                        { word: 'Your', ipa: '/jɔːr/', tip: 'bunyi "yor", bukan "yur"' },
                        { word: 'Name', ipa: '/neɪm/', tip: 'bunyi "ei" seperti kata "game"' },
                        { word: 'You', ipa: '/juː/', tip: 'bunyi "yu" panjang, bukan "yu" pendek' },
                    ],
                    realContext: [
                        'Anak bertanya nama teman baru: "Hi, what is your name?"',
                        'Anak menjawab saat ditanya: "I am Made. And you are...?"',
                        'Anak menunjuk teman: "You are Aisyah, right?"',
                        'Anak memperkenalkan teman ke orang tua: "Mom, this is Rani. She is my friend."',
                    ],
                    indicators: [
                        'Bertanya dengan "What is your name?" dengan intonasi naik',
                        'Menunjuk teman dengan sopan & mengatakan "You are [Nama]"',
                        'Menjawab pertanyaan nama dengan "I am [Nama]"',
                        'Menanyakan nama kembali: "And you are...?"',
                    ],
                    parentTips: [
                        'Ajak anak role-play bertanya nama boneka mainannya',
                        'Latih intonasi naik di akhir pertanyaan dengan gerakan tangan',
                        'Ajarkan menunjuk dengan telapak terbuka, bukan telunjuk tajam',
                        'Praktikkan dengan anggota keluarga yang berbeda setiap hari',
                        'Berikan apresiasi ketika anak berani bertanya ke teman baru',
                    ],
                    difficulties: [
                        { issue: 'Intonasi "What is your name?" datar, tidak seperti bertanya', solution: 'latih dengan gerakan tangan naik di akhir' },
                        { issue: 'Menunjuk dengan telunjuk tajam', solution: 'ajarkan telapak terbuka menghadap atas' },
                        { issue: 'Pelafalan "your" menjadi "yur"', solution: 'ulangi "yor-yor-yor" seperti suara kucing besar' },
                        { issue: 'Malu bertanya ke teman baru', solution: 'mulai dari boneka atau anggota keluarga' },
                    ],
                    extensions: [
                        'Bermain "Wawancara Bintang" — anak jadi reporter bertanya nama 3 orang',
                        'Buat buku mini "My Friends" berisi nama & gambar teman-teman',
                        'Latihan perkenalan berpasangan dengan Ayah/Ibu di depan kamera',
                    ],
                }),
                linguistic_focus: 'Asking name & calling others',
                pronunciation_guide: 'What /wɒt/, Your /jɔːr/, Name /neɪm/, You /juː/',
                cultural_context: 'Dalam budaya Barat, bertanya nama orang baru langsung dianggap wajar. Namun tetap disertai senyum & bahasa tubuh sopan.',
                common_difficulties: [
                    'Intonasi tanya datar',
                    'Menunjuk dengan telunjuk tajam',
                    'Pelafalan "your" menjadi "yur"',
                    'Malu bertanya ke teman baru',
                ],
                assessment_indicators: [
                    'Bertanya dengan intonasi naik',
                    'Menunjuk dengan sopan & berkata "You are [Nama]"',
                    'Menjawab pertanyaan nama',
                    'Menanyakan nama kembali dengan "And you...?"',
                ],
                parent_tips: [
                    'Ajak anak role-play bertanya nama boneka mainannya',
                    'Latih intonasi naik dengan gerakan tangan',
                    'Ajarkan menunjuk dengan telapak terbuka',
                    'Praktikkan dengan anggota keluarga berbeda',
                ],
                extension_activities: [
                    'Bermain "Wawancara Bintang" jadi reporter',
                    'Buat buku mini "My Friends"',
                    'Latihan perkenalan berpasangan dengan orang tua',
                ],
                required_materials: ['Bola lempar lembut', 'Kartu nama karakter', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we will find out our secret friend\'s name!"',
                    ice_breaker: 'Tunjuk Ramah: Tunjuk dada sendiri "I am...", tunjuk kawan di depan "You are...!"',
                    apperception: 'Tanyakan: "Kalau kamu bertemu teman baru di taman bermain, kalimat apa yang kamu tanyakan untuk tahu namanya?"',
                    trigger_question: 'What is the English question to ask someone\'s name?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perbedaan sudut pandang antara diri sendiri ("I am") dan lawan bicara ("You are"), serta cara bertanya nama dengan intonasi ramah.',
                    concrete_steps: [
                        'Berdiri berhadapan dengan anak.',
                        'Ayah melempar bola sambil bertanya: "What is your name?" dengan intonasi naik.',
                        'Anak menangkap: "I am [Nama anak]."',
                        'Anak menunjuk Ayah dengan tangan terbuka: "You are Dad / You are Pak [Nama Ayah]."',
                        'Bergantian peran: anak bertanya, Ayah menjawab.',
                    ],
                    script_parent: '"Tunjuk dengan telapak terbuka ya, jangan pakai telunjuk tajam. Ucapkan: You are my good friend!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lempar Bola Tanya Nama (Play Time Ball)',
                    game_rules: [
                        'Bentuk lingkaran kecil bersama anggota keluarga di ruang tengah.',
                        'Pemain melempar bola ke kawan sambil bertanya: "What is your name?".',
                        'Penerima harus menangkap bola dan menjawab tangkas: "I am [Nama]! And you are [Sebut nama pelempar]!"',
                        'Jika bola jatuh, pemain harus menyanyikan "What is your name?" dengan gaya lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab nama sendiri saat bola ditangkap.',
                        child_level_advanced: 'Menyebutkan nama teman dan menanyakan kembali secara berantai tanpa jeda.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menarik garis menghubungkan kalimat "You are..." ke gambar tokoh yang tepat.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: YOU ARE MY FRIEND',
                        instructions: 'Match each picture with the correct "You are..." sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the character with the correct "You are..." title:',
                                data: {
                                    pairs: [
                                        { left: '👨‍🏫 Guru Olahraga', right: 'You are Mr. Togar' },
                                        { left: '👩‍🏫 Guru Kelas', right: 'You are Miss Rahma' },
                                        { left: '👦 Siswa Putra', right: 'You are Made' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai pasangan tokoh guru dan siswa',
                                explanation: 'Menyebut orang lain dengan You are.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'You want to ask your friend\'s name. What question do you ask?',
                                data: { icon: '💬', subtitle: 'Asking name politely', options: ['What is your name?', 'How are you?'] },
                                answer_key: 'What is your name?',
                                explanation: 'Kalimat tanya menanyakan nama adalah What is your name?',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Trace the word: Y - O - U',
                                answer_key: 'You',
                                explanation: 'Latihan menulis kata You.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Complete dialog:\nA: "What is your name?"\nB: "[ ... ] am Made." (I / You)',
                                answer_key: 'I',
                                explanation: 'Menjawab nama sendiri diawali kata I am.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your friend\'s name: "You are [ ... ]"',
                                answer_key: 'Nama Teman',
                                explanation: 'Menyebut identitas kawan menggunakan You are.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa perbedaan antara "I am" dan "You are"?',
                        'Bagaimana cara bertanya nama teman?',
                        'Kapan kamu akan memakai "You are..."?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil garis pencocokan tokoh pada LKPD 2.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 4: Asking Name and Calling Others',
                        quiz_questions: [
                            { question_text: 'Kalimat tanya bahasa Inggris untuk menanyakan nama teman adalah...', option_a: 'What is your name?', option_b: 'How are you?', option_c: 'Good morning?', option_d: 'Where is your book?', correct_answer: 'A' },
                            { question_text: 'Arti dari kata "You are" adalah...', option_a: 'Saya adalah', option_b: 'Kamu adalah', option_c: 'Mereka adalah', option_d: 'Buku ini', correct_answer: 'B' },
                            { question_text: 'Jika temanmu menunjukmu dan berkata "You are Made", maka kamu menjawab...', option_a: 'Yes, I am Made', option_b: 'Goodbye Made', option_c: 'Good night', option_d: 'I am fine', correct_answer: 'A' },
                            { question_text: 'Lengkapi percakapan:\n"What is your name?"\n"I [ ... ] Aisyah."', option_a: 'am', option_b: 'is', option_c: 'are', option_d: 'you', correct_answer: 'A' },
                            { question_text: 'Kata yang tepat untuk menyapa guru laki-laki adalah...', option_a: 'Mr. (Mister)', option_b: 'Miss', option_c: 'Girl', option_d: 'She', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 3: MY NAME IS JOSHUA
    // ===========================================================================
    {
        chapter_number: 3,
        title: 'Unit 3: My Name is Joshua',
        target_semester: 1,
        week_target: 5,
        lessons: [
            {
                title: 'Meeting 5: Possessive Words (My Name is... & Your Name is...)',
                order_index: 1,
                learning_objectives: 'Students are able to correctly use possessive determiners "My" (milik saya) and "Your" (milikmu) when stating names.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kata Kepemilikan "My" dan "Your"',
                    linguisticFocus: 'Possessive determiners: My & Your',
                    vocabulary: ['My', 'Your', 'My name is', 'Your name is'],
                    patterns: ['My name is [Nama]', 'Your name is [Nama]'],
                    languageFunction: 'Membedakan kepemilikan nama (diri sendiri vs. orang lain)',
                    pronunciation: [
                        { word: 'My', ipa: '/maɪ/', tip: 'bunyi "mai" seperti kata "my" dalam bahasa Inggris' },
                        { word: 'Your', ipa: '/jɔːr/', tip: 'bunyi "yor" panjang' },
                        { word: 'Name', ipa: '/neɪm/', tip: 'bunyi "neim" dengan vokal panjang' },
                    ],
                    realContext: [
                        'Anak menunjuk dirinya: "My name is Cici."',
                        'Anak menunjuk teman: "Your name is Made."',
                        'Anak memperkenalkan diri di kelas baru: "Hello, my name is Aisyah."',
                        'Anak menulis nama di buku: "My name is Joshua" di halaman pertama.',
                    ],
                    indicators: [
                        'Menggunakan "My name is..." untuk diri sendiri',
                        'Menggunakan "Your name is..." untuk orang lain',
                        'Membedakan kapan memakai My vs. Your',
                        'Melafalkan keduanya dengan jelas & benar',
                    ],
                    parentTips: [
                        'Tempelkan label "My name is..." di pintu kamar anak',
                        'Latih menunjuk diri sendiri (My) & orang lain (Your) secara bergantian',
                        'Ajak anak memperkenalkan setiap anggota keluarga dengan "Your name is..."',
                        'Berikan contoh nyata saat memperkenalkan teman ke anak',
                        'Buat permainan menunjuk benda: "My book, your book"',
                    ],
                    difficulties: [
                        { issue: 'Tertukar antara "My" dan "Your"', solution: 'gunakan gerakan: My → tunjuk dada, Your → tunjuk orang lain' },
                        { issue: 'Menyebut "Me name is" bukan "My name is"', solution: 'latih dengan ritme tepukan: MY (tepuk) NAME (tepuk) IS (tepuk)' },
                        { issue: 'Lupa melafalkan "Your" dengan jelas', solution: 'ulangi "yor-yor-yor" seperti suara kucing besar' },
                        { issue: 'Malu menunjuk orang lain saat bilang "Your"', solution: 'praktik dulu dengan boneka atau foto' },
                    ],
                    extensions: [
                        'Buat papan nama meja belajar dengan tulisan "My name is [Nama]"',
                        'Foto semua anggota keluarga & beri label "Your name is..."',
                        'Bikin video perkenalan keluarga dalam bahasa Inggris',
                    ],
                }),
                linguistic_focus: 'Possessive determiners My & Your',
                pronunciation_guide: 'My /maɪ/, Your /jɔːr/, Name /neɪm/',
                cultural_context: 'Dalam bahasa Inggris, kata "My" dan "Your" sangat penting untuk membedakan kepemilikan. Berbeda dengan bahasa Indonesia yang sering menghilangkan kata ganti, bahasa Inggris wajib menyertakan.',
                common_difficulties: [
                    'Tertukar antara My & Your',
                    'Menyebut "Me name" bukan "My name"',
                    'Lupa melafalkan "Your" dengan jelas',
                    'Malu menunjuk orang lain',
                ],
                assessment_indicators: [
                    'Menggunakan "My name is..." untuk diri sendiri',
                    'Menggunakan "Your name is..." untuk orang lain',
                    'Membedakan kapan memakai My vs. Your',
                    'Melafalkan keduanya dengan jelas',
                ],
                parent_tips: [
                    'Tempelkan label "My name is..." di pintu kamar',
                    'Latih menunjuk diri & orang lain bergantian',
                    'Ajak memperkenalkan setiap anggota keluarga',
                    'Berikan contoh nyata saat memperkenalkan teman',
                ],
                extension_activities: [
                    'Buat papan nama meja "My name is [Nama]"',
                    'Foto keluarga & beri label "Your name is..."',
                    'Bikin video perkenalan keluarga',
                ],
                required_materials: ['Papan dada kartu nama "My name is..."', 'Foto keluarga', 'Stiker label'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we learn the magic words: MY and YOUR!"',
                    ice_breaker: 'Tepuk Dada & Ulur Tangan: Tempel tangan di dada berseru "MY!", ulurkan tangan ke depan berseru "YOUR!"',
                    apperception: 'Tunjukkan label nama di buku: "Di buku tulismu tertulis namamu sendiri. Bagaimana menyebutnya dalam bahasa Inggris?"',
                    trigger_question: 'What is the difference between saying "I am Joshua" and "My name is Joshua"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pemahaman fungsi kata sandang posesif "My" (milikku) dan "Your" (milikmu), disertai gestur tubuh yang membedakan keduanya.',
                    concrete_steps: [
                        'Ucapkan sambil menunjuk dada: "My name is [Nama Ayah]."',
                        'Tunjuk anak dengan ramah: "Your name is [Nama Anak]."',
                        'Minta anak menirukan bergantian: "My name is [Nama Anak], and your name is [Nama Ayah]."',
                        'Gunakan gerakan tangan: My → tunjuk dada 2x, Your → ulurkan telapak ke depan.',
                        'Ulangi 3x dengan tempo berbeda (pelan, sedang, cepat).',
                    ],
                    script_parent: '"My itu milik saya, Your itu milik kamu. Ucapkan: My name is [Nama Anak], dan Your name is [Nama Ayah]!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Balap Langkah Dadu Kata (Word Race Game)',
                    game_rules: [
                        'Buka papan permainan petak di meja belajar (seperti pada buku paket hal. 32-33).',
                        'Gunakan penghapus pensil sebagai pion jalan.',
                        'Lempar dadu; jika mendarat di petak "My name is...", pemain wajib menyebutkan namanya.',
                        'Jika mendarat di petak "Your name is...", pemain wajib menyebutkan nama lawannya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan nama diri dan teman dengan bantuan kartu teks.',
                        child_level_advanced: 'Memainkan balap kata tanpa jeda dan menambahkan sapaan ramah.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menulis nama pada kotak papan nama LKPD (Unit 3 p. 30).',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: MY NAME AND YOUR NAME',
                        instructions: 'Write your name inside the name box and complete the sentences.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the schoolboy holding a wooden board. What is written?',
                                data: { icon: '🪧', subtitle: 'Board: My name is Joshua', options: ['My name is Joshua', 'Your name is Joshua'] },
                                answer_key: 'My name is Joshua',
                                explanation: 'Papan nama anak tersebut bertuliskan My name is Joshua.',
                            },
                            {
                                id: 2,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your name: "My name is [ ... ]"',
                                answer_key: 'Nama Siswa',
                                explanation: 'Menuliskan nama diri sendiri dengan frasa My name is.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'To call your friend\'s name, say: "[ ... ] name is Made." (My / Your)',
                                answer_key: 'Your',
                                explanation: 'Menyebut nama orang lain menggunakan kata Your.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: M - Y   N - A - M - E',
                                answer_key: 'My name',
                                explanation: 'Menebalkan frasa My name.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Fill in the blanks: "[ ... ] name is Cici. [ ... ] name is Joshua." (Pointing to self first, then friend)',
                                answer_key: 'My, Your',
                                explanation: 'My untuk diri sendiri, Your untuk teman lawan bicara.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kapan kita memakai kata "My"?',
                        'Kapan kita memakai kata "Your"?',
                        'Bagaimana cara membedakan keduanya?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto papan nama bertuliskan "My name is..." pada LKPD 3.1 bukumu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 5: Using My and Your',
                        quiz_questions: [
                            { question_text: 'Arti dari kata "My" adalah...', option_a: 'Milik saya / -ku', option_b: 'Milikmu', option_c: 'Milik mereka', option_d: 'Milik sekolah', correct_answer: 'A' },
                            { question_text: 'Arti dari kata "Your" adalah...', option_a: 'Milik saya', option_b: 'Milik kamu / -mu', option_c: 'Milik guru', option_d: 'Milik kucing', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat saat menunjuk diri sendiri: "[ ... ] name is Made."', option_a: 'Your', option_b: 'My', option_c: 'You', option_d: 'He', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat saat menunjuk temanmu: "[ ... ] name is Aisyah."', option_a: 'My', option_b: 'Your', option_c: 'I', option_d: 'Am', correct_answer: 'B' },
                            { question_text: 'Pilihan kalimat yang benar dan sopan adalah...', option_a: 'My name is Joshua', option_b: 'I name is Joshua', option_c: 'Your name am Joshua', option_d: 'Me is Joshua', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 6: Surveying Classmates\' Names & Dialogue Practice',
                order_index: 2,
                learning_objectives: 'Students are able to conduct a mini-survey asking 3-4 family members or friends their names and recording them in a table.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Survei Nama & Praktik Dialog',
                    linguisticFocus: 'Conducting survey & recording data',
                    vocabulary: ['What is your name?', 'My name is', 'Nice to meet you', 'Thank you'],
                    patterns: ['What is your name?', 'My name is [Nama]', 'Nice to meet you', 'Thank you'],
                    languageFunction: 'Penerapan komunikatif wawancara sederhana & etika memperkenalkan diri',
                    pronunciation: [
                        { word: 'Nice', ipa: '/naɪs/', tip: 'bunyi "nais" dengan vokal panjang' },
                        { word: 'Meet', ipa: '/miːt/', tip: 'bunyi "mit" panjang seperti kata "meet"' },
                        { word: 'Thank', ipa: '/θæŋk/', tip: 'bunyi "th" dengan lidah menyentuh gigi atas' },
                    ],
                    realContext: [
                        'Anak mewawancarai 3 anggota keluarga: nama mereka dicatat di tabel',
                        'Anak mempresentasikan hasil survei di depan kelas',
                        'Anak mengucapkan "Nice to meet you" setelah berkenalan',
                        'Anak berpamitan "Thank you, goodbye!" setelah wawancara selesai',
                    ],
                    indicators: [
                        'Melakukan wawancara minimal 3 orang dengan kalimat tanya yang benar',
                        'Mencatat nama-nama responden di tabel survei',
                        'Mengucapkan "Nice to meet you" & "Thank you" dengan tepat',
                        'Mempresentasikan hasil survei dengan kalimat sederhana',
                    ],
                    parentTips: [
                        'Ajak anak mewawancarai anggota keluarga di rumah',
                        'Siapkan tabel survei yang menarik dengan stiker',
                        'Dampingi anak saat ia malu bertanya',
                        'Rayakan keberhasilan survei dengan pujian spesifik',
                        'Video-kan presentasi hasil survei anak',
                    ],
                    difficulties: [
                        { issue: 'Lupa urutan: tanya nama → catat → ucapkan terima kasih', solution: 'tempel urutan di dekat meja: ASK, WRITE, THANK' },
                        { issue: 'Takut bertanya ke orang baru', solution: 'mulai dari anggota keluarga inti' },
                        { issue: 'Salah tulis nama responden', solution: 'minta responden mengeja nama perlahan' },
                        { issue: 'Malu mempresentasikan hasil', solution: 'latih dulu di depan cermin' },
                    ],
                    extensions: [
                        'Video call dengan nenek/kakek untuk wawancara jarak jauh',
                        'Buat "My Family Book" berisi nama & foto setiap anggota',
                        'Ajak anak mewawancarai tetangga dengan didampingi orang tua',
                    ],
                }),
                linguistic_focus: 'Surveying names & polite expressions',
                pronunciation_guide: 'Nice /naɪs/, Meet /miːt/, Thank /θæŋk/',
                cultural_context: 'Di budaya Barat, mengucapkan "Nice to meet you" & "Thank you" setelah perkenalan adalah tanda sopan santun yang penting.',
                common_difficulties: [
                    'Lupa urutan wawancara',
                    'Takut bertanya ke orang baru',
                    'Salah tulis nama responden',
                    'Malu mempresentasikan hasil',
                ],
                assessment_indicators: [
                    'Melakukan wawancara minimal 3 orang',
                    'Mencatat nama-nama responden di tabel',
                    'Mengucapkan "Nice to meet you" & "Thank you"',
                    'Mempresentasikan hasil survei',
                ],
                parent_tips: [
                    'Ajak anak mewawancarai anggota keluarga di rumah',
                    'Siapkan tabel survei menarik dengan stiker',
                    'Dampingi anak saat ia malu bertanya',
                    'Rayakan keberhasilan dengan pujian spesifik',
                ],
                extension_activities: [
                    'Video call dengan nenek/kakek untuk wawancara',
                    'Buat "My Family Book"',
                    'Wawancarai tetangga dengan didampingi orang tua',
                ],
                required_materials: ['Tabel survei mini', 'Pensil dan buku tulis', 'Stiker reward'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hello reporters! Grab your clipboard, today we go on a name survey!"',
                    ice_breaker: 'Jabat Tangan Ramah: Saling berjabat tangan sambil tersenyum dan mengayun tangan lembut.',
                    apperception: 'Ingatkan kembali dialog: "My name is... Your name is...".',
                    trigger_question: 'How do you ask someone politely before writing their name down?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Etika wawancara perkenalan sederhana: tatap mata, sapa ramah, tanyakan nama, ucapkan terima kasih.',
                    concrete_steps: [
                        'Langkah 1: Sapa "Hello, Good morning!".',
                        'Langkah 2: Tanyakan "What is your name?".',
                        'Langkah 3: Dengarkan jawaban "My name is...".',
                        'Langkah 4: Balas dengan senyum "Thank you, nice to meet you!"',
                        'Langkah 5: Catat nama di tabel survei.',
                    ],
                    script_parent: '"Selalu ucapkan terima kasih setelah seseorang menyebutkan namanya ya. Itu tanda kamu sopan."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Wartawan Cilik Survei Nama Keluarga',
                    game_rules: [
                        'Anak membawa kertas survei keliling rumah.',
                        'Wawancarai Ibu, Ayah, dan Kakak/Adik.',
                        'Tuliskan nama mereka di kolom tabel survei bahasa Inggris.',
                        'Tempel stiker bintang di setiap nama yang berhasil dicatat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mewawancarai 2 orang di rumah dengan panduan lisan Ayah.',
                        child_level_advanced: 'Mewawancarai 4 orang dan membacakan hasilnya dalam kalimat monolog bahasa Inggris.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengisi tabel survei nama pada LKPD Unit 3 halaman 31.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: LET\'S DO A SURVEY (NAMES)',
                        instructions: 'Ask your friends or family members, and complete the table.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the dialog speech bubble to the right character:',
                                data: {
                                    pairs: [
                                        { left: '🗣️ Made says', right: '"My name is Made"' },
                                        { left: '👉 Made points to Joshua', right: '"Your name is Joshua"' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai subjek pembicara',
                                explanation: 'Latihan membedakan kepemilikan nama dalam dialog.',
                            },
                            {
                                id: 2,
                                type: 'MATH_PROBLEM',
                                question: 'Person 1 Name: "Your name is [ ... ]"',
                                answer_key: 'Nama Teman/Keluarga 1',
                                explanation: 'Mencatat nama orang pertama hasil survei.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Person 2 Name: "Your name is [ ... ]"',
                                answer_key: 'Nama Teman/Keluarga 2',
                                explanation: 'Mencatat nama orang kedua hasil survei.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'After someone tells you their name, you say: "[ ... ]" (Thank you / Goodbye morning)',
                                answer_key: 'Thank you',
                                explanation: 'Mengucapkan terima kasih setelah wawancara.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Report your survey: "I have 2 friends. Their names are [ ... ] and [ ... ]."',
                                answer_key: 'Nama 2 orang teman',
                                explanation: 'Melaporkan hasil survei sederhana secara lisan/tertulis.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah menyenangkan bertanya nama orang lain?',
                        'Mengapa penting mengingat nama teman?',
                        'Apa yang kamu rasakan saat berhasil mewawancarai 3 orang?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice reporting your survey: "My name is [Name]. My friend\'s name is [Friend\'s Name]!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 6: Surveying Names & Polite Expressions',
                        quiz_questions: [
                            { question_text: 'Setelah teman menyebutkan namanya, ungkapan sopan yang kita katakan adalah...', option_a: 'Thank you', option_b: 'No', option_c: 'Goodbye fine', option_d: 'Go away', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Nice to meet [ ... ]."', option_a: 'you', option_b: 'my', option_c: 'I', option_d: 'am', correct_answer: 'A' },
                            { question_text: 'Arti dari "Nice to meet you" adalah...', option_a: 'Senang bertemu denganmu', option_b: 'Selamat tinggal', option_c: 'Siapa namamu', option_d: 'Sampai besok', correct_answer: 'A' },
                            { question_text: 'Jika Made berkata "My name is Made", maka kamu memanggilnya dengan...', option_a: 'Your name is Made', option_b: 'My name is Made', option_c: 'I am Cici', option_d: 'You are Joshua', correct_answer: 'A' },
                            { question_text: 'Saat berkenalan, kita harus bersikap...', option_a: 'Sombong', option_b: 'Ramah dan tersenyum', option_c: 'Takut dan menangis', option_d: 'Marah', correct_answer: 'B' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 4: MY NUMBER IS TEN
    // ===========================================================================
    {
        chapter_number: 4,
        title: 'Unit 4: My Number is Ten',
        target_semester: 1,
        week_target: 7,
        lessons: [
            {
                title: 'Meeting 7: Counting Numbers 1 to 5 (One, Two, Three, Four, Five)',
                order_index: 1,
                learning_objectives: 'Students are able to count objects 1 to 5 in English with correct pronunciation and state "My number is [1-5]".',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Membilang Angka 1 sampai 5',
                    linguisticFocus: 'Counting 1-5 in English',
                    vocabulary: ['One', 'Two', 'Three', 'Four', 'Five'],
                    patterns: ['My number is [1-5]', 'How many [objects]?'],
                    languageFunction: 'Membilang jumlah benda nyata & menyatakan angka favorit',
                    pronunciation: [
                        { word: 'One', ipa: '/wʌn/', tip: 'bunyi "wan", bukan "won"' },
                        { word: 'Two', ipa: '/tuː/', tip: 'bunyi "tu" panjang, lidah tidak menyentuh gigi' },
                        { word: 'Three', ipa: '/θriː/', tip: 'bunyi "th" dengan lidah di antara gigi' },
                        { word: 'Four', ipa: '/fɔːr/', tip: 'bunyi "for" panjang' },
                        { word: 'Five', ipa: '/faɪv/', tip: 'bunyi "faiv" dengan v di akhir' },
                    ],
                    realContext: [
                        'Anak menghitung 3 apel di meja: "One, two, three apples!"',
                        'Anak menyebut jumlah jarinya: "I have five fingers."',
                        'Anak menghitung kelereng yang dimiliki: "My number is four!"',
                        'Anak menghitung langkah saat naik tangga: "One, two, three, four, five!"',
                    ],
                    indicators: [
                        'Membilang 1-5 secara berurutan',
                        'Melafalkan "Three" dengan bunyi /θriː/ yang tepat',
                        'Menghubungkan jumlah benda dengan angka yang tepat',
                        'Menyatakan "My number is [1-5]" dengan percaya diri',
                    ],
                    parentTips: [
                        'Hitung benda-benda di sekitar rumah setiap hari',
                        'Gunakan jari tangan sebagai alat hitung pertama',
                        'Beri contoh pelafalan "Three" dengan lidah di antara gigi',
                        'Ajak anak menghitung langkah saat naik tangga',
                        'Rayakan setiap keberhasilan hitungan dengan tepuk tangan',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Three" menjadi "Tree"', solution: 'latih dengan cermin, lidah harus di antara gigi' },
                        { issue: 'Tertukar antara "Two" dan "To"', solution: 'tekankan "Two" dengan jari tangan 2' },
                        { issue: 'Lompat angka saat menghitung', solution: 'gunakan benda fisik yang bisa disentuh satu per satu' },
                        { issue: 'Pelafalan "One" menjadi "Won"', solution: 'ulangi "wan-wan" dengan mulut bulat' },
                    ],
                    extensions: [
                        'Buat kartu angka 1-5 hias untuk kamar anak',
                        'Hitung benda di dapur: 1 sendok, 2 garpu, 3 piring, dst.',
                        'Nyanyikan lagu "One, Two, Buckle My Shoe" bersama',
                    ],
                }),
                linguistic_focus: 'Counting numbers 1-5',
                pronunciation_guide: 'One /wʌn/, Two /tuː/, Three /θriː/, Four /fɔːr/, Five /faɪv/',
                cultural_context: 'Anak-anak di negara berbahasa Inggris belajar menghitung dengan lagu & permainan tangan. Latihan berulang sangat penting untuk menguasai pelafalan.',
                common_difficulties: [
                    'Pelafalan "Three" menjadi "Tree"',
                    'Tertukar antara "Two" dan "To"',
                    'Lompat angka saat menghitung',
                    'Pelafalan "One" menjadi "Won"',
                ],
                assessment_indicators: [
                    'Membilang 1-5 secara berurutan',
                    'Melafalkan "Three" dengan bunyi /θriː/',
                    'Menghubungkan jumlah benda dengan angka',
                    'Menyatakan "My number is [1-5]"',
                ],
                parent_tips: [
                    'Hitung benda di rumah setiap hari',
                    'Gunakan jari tangan sebagai alat hitung',
                    'Beri contoh pelafalan "Three"',
                    'Ajak menghitung langkah naik tangga',
                ],
                extension_activities: [
                    'Buat kartu angka 1-5 hias',
                    'Hitung benda di dapur',
                    'Nyanyikan "One, Two, Buckle My Shoe"',
                ],
                required_materials: ['5 buah sendok / balok mainan', 'Kartu angka 1-5', 'Cermin kecil'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Show me your hand! Let\'s count our five little fingers together!"',
                    ice_breaker: 'Chant Jari Berirama: "One, two, buckle my shoe! Three, four, knock at the door! Five, high five!"',
                    apperception: 'Hitung jari tangan kanan: 1, 2, 3, 4, 5. "How do we say these in English?"',
                    trigger_question: 'Can you show me three pencils and say the number in English?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pelafalan fonetik akurat angka 1 sampai 5 (One /wʌn/, Two /tuː/, Three /θriː/, Four /fɔːr/, Five /faɪv/) dengan bantuan benda konkret.',
                    concrete_steps: [
                        'Angkat 1 pensil → ucapkan jelas: "One".',
                        'Tambah 1 pensil → "Two".',
                        'Lanjutkan hingga "Three", "Four", dan "Five".',
                        'Tekankan bunyi /th/ pada kata Three agar tidak tertukar dengan Tree.',
                        'Ajak anak menghitung mundur 5-4-3-2-1 untuk tantangan.',
                    ],
                    script_parent: '"Julurkan lidah sedikit saat mengucapkan Three ya! One, two, THREE!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lompat Angka Karpet (Number Card Hop 1-5)',
                    game_rules: [
                        'Letakkan kartu angka 1 sampai 5 di lantai berjarak satu langkah.',
                        'Ayah menyebutkan angka secara acak dalam bahasa Inggris: "THREE!".',
                        'Anak harus melompat tepat ke atas kartu angka 3 sambil berteriak: "My number is THREE!"',
                        'Jika salah lompat, anak harus melompat mundur ke posisi awal.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Melompat berurutan 1, 2, 3, 4, 5.',
                        child_level_advanced: 'Melompat acak dan menyebutkan jumlah jari yang sesuai.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghitung ikon kartun dan mewarnai angka pada LKPD Unit 4 (p. 36).',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: COUNTING NUMBERS 1 TO 5',
                        instructions: 'Count the objects and circle the correct number word.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Count the red apples: How many apples? (two / three / five)',
                                data: { total: 3, icon: '🍎' },
                                answer_key: 'three',
                                explanation: 'Terdapat 3 buah apel (three).',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Count the learning pencils: How many pencils? (two / four)',
                                data: { total: 2, icon: '✏️' },
                                answer_key: 'two',
                                explanation: 'Terdapat 2 pensil (two).',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the number digit with the English word:',
                                data: {
                                    pairs: [
                                        { left: 'Digit: 1', right: 'One' },
                                        { left: 'Digit: 4', right: 'Four' },
                                        { left: 'Digit: 5', right: 'Five' },
                                    ],
                                },
                                answer_key: '1 → One; 4 → Four; 5 → Five',
                                explanation: 'Pemasangan lambang angka dan kata bahasa Inggris.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Number symbol for "Four" is [ ... ] (4 / 2)',
                                answer_key: '4',
                                explanation: 'Lambang angka dari Four adalah 4.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Order the words from smallest: three, one, two → [ ..., ..., ... ]',
                                answer_key: 'one, two, three',
                                explanation: 'Urutan naik bahasa Inggris: one (1), two (2), three (3).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Angka berapa yang paling kamu sukai?',
                        'Berapa jumlah jari di satu tangan?',
                        'Bagaimana cara melafalkan "Three" yang benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice counting 1 to 5 clearly: "One, Two, Three, Four, Five!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 7: Numbers 1 to 5',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari angka 3 adalah...', option_a: 'Two', option_b: 'Three', option_c: 'Four', option_d: 'Five', correct_answer: 'B' },
                            { question_text: 'Kata "Four" melambangkan angka...', option_a: '1', option_b: '3', option_c: '4', option_d: '5', correct_answer: 'C' },
                            { question_text: 'Jumlah pensil pada gambar: ✏️ ✏️ adalah...', option_a: 'One', option_b: 'Two', option_c: 'Three', option_d: 'Four', correct_answer: 'B' },
                            { question_text: 'Bahasa Inggris dari angka 5 adalah...', option_a: 'Five', option_b: 'Four', option_c: 'One', option_d: 'Ten', correct_answer: 'A' },
                            { question_text: 'Urutan angka yang benar adalah...', option_a: 'One, Two, Three', option_b: 'Three, One, Two', option_c: 'Two, Three, One', option_d: 'One, Four, Two', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 8: Counting Numbers 6 to 10 (Six, Seven, Eight, Nine, Ten)',
                order_index: 2,
                learning_objectives: 'Students are able to count objects 6 to 10 in English, identify numbers from audio prompts, and state "My number is ten".',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Membilang Angka 6 sampai 10',
                    linguisticFocus: 'Counting 6-10 in English',
                    vocabulary: ['Six', 'Seven', 'Eight', 'Nine', 'Ten'],
                    patterns: ['My number is [6-10]', 'It is [number]'],
                    languageFunction: 'Membilang jumlah benda lebih dari 5 & menyebut angka belasan awal',
                    pronunciation: [
                        { word: 'Six', ipa: '/sɪks/', tip: 'bunyi "siks" dengan konsonan x jelas' },
                        { word: 'Seven', ipa: '/ˈsɛv.ən/', tip: 'tekan suku kata pertama SE-ven' },
                        { word: 'Eight', ipa: '/eɪt/', tip: 'bunyi "eit" panjang, huruf "gh" tidak diucapkan' },
                        { word: 'Nine', ipa: '/naɪn/', tip: 'bunyi "nain" panjang' },
                        { word: 'Ten', ipa: '/tɛn/', tip: 'bunyi "ten" pendek seperti kata "pen"' },
                    ],
                    realContext: [
                        'Anak menghitung 8 bintang di langit: "One, two, ... eight stars!"',
                        'Anak menyebut jumlah buku: "I have ten books."',
                        'Anak mendengar suara guru & memilih angka: "It is seven!"',
                        'Anak menghitung hari dalam seminggu: "Seven days in a week."',
                    ],
                    indicators: [
                        'Membilang 6-10 secara berurutan',
                        'Melafalkan "Eight" dengan bunyi /eɪt/ tanpa "gh"',
                        'Menghubungkan angka dengan jumlah benda',
                        'Menyatakan "My number is ten" dengan percaya diri',
                    ],
                    parentTips: [
                        'Ajak anak menghitung benda lebih dari 5 setiap hari',
                        'Beri contoh "Eight" dengan penekanan tidak ada "gh"',
                        'Gunakan lagu "Ten Little Indians" untuk hafalan',
                        'Sediakan kartu angka 6-10 untuk permainan cepat',
                        'Rayakan setiap keberhasilan hitungan dengan high-five',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Eight" menjadi "Eighty" atau "Eks"', solution: 'ulangi "eit-eit-eit" tanpa konsonan tambahan' },
                        { issue: 'Tertukar antara "Six" dan "Seven"', solution: 'gunakan visual: 6 tangan pendek, 7 tangan lebih panjang' },
                        { issue: 'Lompat angka saat menghitung lebih dari 5', solution: 'gunakan 2 tangan atau 2 baris benda' },
                        { issue: 'Pelafalan "Nine" menjadi "Nin"', solution: 'tekankan vokal panjang "nai-nai-nain"' },
                    ],
                    extensions: [
                        'Buat poster angka 1-10 dengan gambar benda di dinding kamar',
                        'Nyanyikan lagu "Ten Little Indians" bersama',
                        'Hitung 10 mainan di kamar anak sambil disusun berbaris',
                    ],
                }),
                linguistic_focus: 'Counting numbers 6-10',
                pronunciation_guide: 'Six /sɪks/, Seven /ˈsɛv.ən/, Eight /eɪt/, Nine /naɪn/, Ten /tɛn/',
                cultural_context: 'Di banyak budaya, angka 10 dianggap istimewa karena melambangkan jumlah jari tangan manusia. Lagu anak-anak sering menggunakan angka 10 sebagai klimaks.',
                common_difficulties: [
                    'Pelafalan "Eight" menjadi "Eks"',
                    'Tertukar antara "Six" dan "Seven"',
                    'Lompat angka saat menghitung lebih dari 5',
                    'Pelafalan "Nine" menjadi "Nin"',
                ],
                assessment_indicators: [
                    'Membilang 6-10 secara berurutan',
                    'Melafalkan "Eight" tanpa "gh"',
                    'Menghubungkan angka dengan jumlah benda',
                    'Menyatakan "My number is ten"',
                ],
                parent_tips: [
                    'Ajak menghitung benda lebih dari 5',
                    'Beri contoh "Eight" tanpa "gh"',
                    'Gunakan lagu "Ten Little Indians"',
                    'Sediakan kartu angka 6-10',
                ],
                extension_activities: [
                    'Buat poster angka 1-10 di kamar',
                    'Nyanyikan "Ten Little Indians"',
                    'Hitung 10 mainan di kamar',
                ],
                required_materials: ['10 keping koin / permen', 'Kartu angka 6-10', 'Cermin kecil'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Open both hands! Ten fingers up in the air! Ready to count to ten?"',
                    ice_breaker: 'Lagu Ten Little Indians: "One little, two little, three little Indians... up to TEN!"',
                    apperception: 'Review kilat 1-5, lalu buka jari tangan kedua untuk menghitung 6 sampai 10.',
                    trigger_question: 'What is the biggest number on our ten fingers?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Penguasaan sebutan angka 6-10 dan asosiasi jumlahnya dengan benda konkret.',
                    concrete_steps: [
                        'Bariskan 5 benda di kiri, tambahkan 1 di kanan → "Six (6)".',
                        'Lanjutkan menambah satu per satu: "Seven (7)", "Eight (8)", "Nine (9)", "Ten (10)".',
                        'Gunakan kartu angka acak dan minta anak melafalkannya dengan lantang.',
                        'Tekankan bahwa "Eight" tidak ada bunyi "gh".',
                        'Ulangi menghitung mundur 10-9-8-7-6.',
                    ],
                    script_parent: '"Sepuluh adalah satu set penuh jari tangan! Kalau lihat angka 10, ucapkan: My number is TEN!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Kartu Cepat "My Number Is..."',
                    game_rules: [
                        'Kocok kartu angka 1 sampai 10.',
                        'Ayah membagikan 1 kartu tertutup ke anak.',
                        'Hitungan ketiga: anak membuka kartu di dahi dan berseru: "My number is EIGHT!" (sesuai kartu yang didapat).',
                        'Jika salah menyebutkan angka, anak harus menari lucu selama 5 detik.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan angka 6-10 dengan bimbingan visual kartu.',
                        child_level_advanced: 'Menebak angka sebelum dan sesudah angka yang dibuka.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mendengar dan mencentang angka pada LKPD Unit 4 (Listen and check p. 40).',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: COUNTING NUMBERS 6 TO 10',
                        instructions: 'Listen to your parent and put a tick (√) to the correct number.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "It is seven". Tick the correct digit:',
                                data: { icon: '🔢', subtitle: 'Audio Prompt: Seven', options: ['Number 7', 'Number 6'] },
                                answer_key: 'Number 7',
                                explanation: 'Seven adalah angka 7.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "It is ten". Tick the correct digit:',
                                data: { icon: '🔟', subtitle: 'Audio Prompt: Ten', options: ['Number 10', 'Number 8'] },
                                answer_key: 'Number 10',
                                explanation: 'Ten adalah angka 10.',
                            },
                            {
                                id: 3,
                                type: 'PICT_COUNT',
                                question: 'Count the shining stars: It is [ ... ] (eight / nine)',
                                data: { total: 8, icon: '⭐' },
                                answer_key: 'eight',
                                explanation: 'Terdapat 8 bintang (eight).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Number symbol for "Six" is [ ... ] (6 / 9)',
                                answer_key: '6',
                                explanation: 'Lambang angka Six adalah 6.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete the sequence: six, seven, [ ... ], nine, ten.',
                                answer_key: 'eight',
                                explanation: 'Urutan bilangan cacah: 6, 7, 8, 9, 10.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara melafalkan angka 10 dalam bahasa Inggris?',
                        'Angka berapa yang muncul setelah delapan?',
                        'Berapa jumlah jari kedua tanganmu?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil centang angka pada lembar LKPD 4.2 milikmu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 8: Numbers 6 to 10',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari angka 10 adalah...', option_a: 'Ten', option_b: 'Six', option_c: 'Nine', option_d: 'Two', correct_answer: 'A' },
                            { question_text: 'Kata "Seven" artinya adalah angka...', option_a: '6', option_b: '7', option_c: '8', option_d: '9', correct_answer: 'B' },
                            { question_text: 'Bilangan sesudah "Eight" (8) adalah...', option_a: 'Seven', option_b: 'Nine (9)', option_c: 'Ten', option_d: 'Six', correct_answer: 'B' },
                            { question_text: 'Jumlah jeruk pada gambar: 🍊 🍊 🍊 🍊 🍊 🍊 adalah...', option_a: 'Five', option_b: 'Six (6)', option_c: 'Seven', option_d: 'Eight', correct_answer: 'B' },
                            { question_text: 'Arti kalimat "My number is ten" adalah...', option_a: 'Nomorku adalah sepuluh', option_b: 'Namaku adalah sepuluh', option_c: 'Bukuku ada sepuluh', option_d: 'Sepeda ini ada sepuluh', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 5: I HAVE FOUR BOOKS
    // ===========================================================================
    {
        chapter_number: 5,
        title: 'Unit 5: I Have Four Books',
        target_semester: 1,
        week_target: 9,
        lessons: [
            {
                title: 'Meeting 9: Classroom Objects (Book, Pencil, Bag, Ruler, Eraser)',
                order_index: 1,
                learning_objectives: 'Students are able to identify and name 5 basic school supplies (book, pencil, bag, ruler, eraser) with clear pronunciation.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Benda-Benda di Kelas',
                    linguisticFocus: 'Classroom objects vocabulary',
                    vocabulary: ['Book', 'Pencil', 'Bag', 'Ruler', 'Eraser', 'Sharpener'],
                    patterns: ['This is a [object]', 'It is a [object]'],
                    languageFunction: 'Menyebutkan benda perlengkapan sekolah dalam bahasa Inggris',
                    pronunciation: [
                        { word: 'Book', ipa: '/bʊk/', tip: 'bunyi "buk" pendek, bukan "buk" panjang' },
                        { word: 'Pencil', ipa: '/ˈpɛn.səl/', tip: 'tekan suku kata pertama PEN-cil' },
                        { word: 'Bag', ipa: '/bæɡ/', tip: 'bunyi "a" pendek seperti kata "cat"' },
                        { word: 'Ruler', ipa: '/ˈruː.lər/', tip: 'tekan suku kata pertama RU-ler' },
                        { word: 'Eraser', ipa: '/ɪˈreɪ.sər/', tip: 'tekan suku kata kedua e-RA-ser' },
                    ],
                    realContext: [
                        'Anak menunjukkan pensilnya: "This is my pencil!"',
                        'Anak memberitahu guru: "I forgot my eraser today."',
                        'Anak menyusun isi tas: "Book, pencil, bag."',
                        'Anak meminjam penggaris: "Can I borrow your ruler?"',
                    ],
                    indicators: [
                        'Menyebutkan 5 benda perlengkapan sekolah dengan jelas',
                        'Melafalkan "Book" dengan bunyi /bʊk/ pendek',
                        'Menunjuk benda nyata & menyebutkan namanya',
                        'Menyebutkan fungsi sederhana benda (pencil for writing)',
                    ],
                    parentTips: [
                        'Beri label bahasa Inggris pada alat tulis anak',
                        'Ajak anak menyusun tas bersama sambil menyebutkan nama benda',
                        'Sediakan alat tulis nyata agar anak bisa meraba & menyebut',
                        'Buat permainan menyentuh benda yang disebutkan',
                        'Pujilah setiap keberhasilan pelafalan dengan apresiasi',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Pencil" menjadi "Pensil" (Indonesia)', solution: 'ulangi "PEN-sel" dengan bunyi akhir "səl"' },
                        { issue: 'Tertukar antara "Ruler" dan "Eraser"', solution: 'gunakan benda nyata & sentuh bergantian' },
                        { issue: 'Menyebut "Book" dengan vokal panjang', solution: 'latih dengan cermin, mulut bulat pendek' },
                        { issue: 'Lupa nama benda saat ditanya', solution: 'tempel label di meja belajar' },
                    ],
                    extensions: [
                        'Buat "My School Bag" book — gambar & label semua isi tas',
                        'Ajak anak berbelanja alat tulis sambil menyebut nama Inggrisnya',
                        'Adu cepat: sebut benda, anak berlari menyentuhnya',
                    ],
                }),
                linguistic_focus: 'Classroom objects vocabulary',
                pronunciation_guide: 'Book /bʊk/, Pencil /ˈpɛn.səl/, Bag /bæɡ/, Ruler /ˈruː.lər/, Eraser /ɪˈreɪ.sər/',
                cultural_context: 'Di sekolah internasional, anak-anak dikenalkan nama alat tulis dalam bahasa Inggris sejak dini untuk membangun kosakata dasar.',
                common_difficulties: [
                    'Pelafalan "Pencil" menjadi "Pensil"',
                    'Tertukar antara "Ruler" dan "Eraser"',
                    'Menyebut "Book" dengan vokal panjang',
                    'Lupa nama benda saat ditanya',
                ],
                assessment_indicators: [
                    'Menyebutkan 5 benda dengan jelas',
                    'Melafalkan "Book" dengan bunyi /bʊk/',
                    'Menunjuk benda nyata & menyebutkan nama',
                    'Menyebutkan fungsi sederhana benda',
                ],
                parent_tips: [
                    'Beri label bahasa Inggris pada alat tulis anak',
                    'Ajak menyusun tas bersama sambil menyebut nama benda',
                    'Sediakan alat tulis nyata',
                    'Buat permainan menyentuh benda',
                ],
                extension_activities: [
                    'Buat "My School Bag" book',
                    'Berbelanja alat tulis sambil menyebut nama Inggris',
                    'Adu cepat sebut benda',
                ],
                required_materials: ['Tas sekolah (bag)', 'Buku (book)', 'Pensil (pencil)', 'Penggaris (ruler)', 'Penghapus (eraser)'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning student! Unpack your school bag, let\'s see what treasures you have!"',
                    ice_breaker: 'Tebak Raba dalam Tas: Masukkan tangan ke tas tertutup, raba benda, lalu tebak: "It is a pencil!"',
                    apperception: 'Tunjukkan pensil dan buku: "Benda yang kita pakai menulis dan membaca setiap hari, apa namanya dalam bahasa Inggris?"',
                    trigger_question: 'What do you use to erase a pencil mark on paper?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata benda kelas: Bag, Book, Pencil, Ruler, Eraser, Sharpener, dengan pelafalan yang jelas.',
                    concrete_steps: [
                        'Angkat tas sekolah: "This is a bag. Say: bag."',
                        'Angkat buku: "This is a book."',
                        'Angkat pensil dan penghapus bergantian: "pencil... eraser... ruler."',
                        'Minta anak menyentuh bendanya masing-masing sambil menyebutkan namanya.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Tunjuk tasmu dan ucapkan jelas: bag! Tunjuk bukumu dan ucapkan: book!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sentuh Benda Meja Cepat (Speed Touch Challenge)',
                    game_rules: [
                        'Tata 5 benda (tas, buku, pensil, penggaris, penghapus) berjejer di meja.',
                        'Ayah berseru cepat: "TOUCH THE RULER!".',
                        'Anak harus menyentuh penggaris secepat kilat sambil berseru: "Ruler!".',
                        'Jika salah sentuh, anak harus menyentuh semua benda sambil menyebutkan namanya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyentuh benda dengan tempo santai.',
                        child_level_advanced: 'Menyentuh benda dan menyebutkan fungsinya dalam bahasa Inggris sederhana.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menjodohkan garis gambar benda sekolah dengan kata yang tepat pada LKPD Unit 5.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.1: THINGS IN MY CLASSROOM',
                        instructions: 'Draw a line to match the picture with the correct word.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the school item picture with the correct word:',
                                data: {
                                    pairs: [
                                        { left: '🎒 Backpack', right: 'Bag' },
                                        { left: '📖 Reading item', right: 'Book' },
                                        { left: '✏️ Writing tool', right: 'Pencil' },
                                        { left: '📏 Measure stick', right: 'Ruler' },
                                    ],
                                },
                                answer_key: 'Tas → Bag; Buku → Book; Pensil → Pencil; Penggaris → Ruler',
                                explanation: 'Menjodohkan gambar perlengkapan sekolah dengan kosa katanya.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'What do you use to clean rubber pencil marks on paper?',
                                data: { icon: '🧼', subtitle: 'Stationery item', options: ['Eraser', 'Sharpener'] },
                                answer_key: 'Eraser',
                                explanation: 'Penghapus adalah eraser.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'What object do you use to sharpen your pencil? (sharpener / book)',
                                answer_key: 'sharpener',
                                explanation: 'Rautan pensil adalah sharpener.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: B - O - O - K',
                                answer_key: 'book',
                                explanation: 'Menebalkan kata book.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Say two things you always put in your school bag: "[ ... ] and [ ... ]"',
                                answer_key: 'book and pencil',
                                explanation: 'Menyebutkan isi tas sekolah dalam bahasa Inggris.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Benda apa yang paling kamu sukai di tas sekolahmu?',
                        'Bagaimana cara menyebut penggaris dalam bahasa Inggris?',
                        'Apa fungsi dari eraser?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Hold your pencil and book, then say: "This is my pencil, and this is my book!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 9: Classroom Objects',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari kata "buku" adalah...', option_a: 'Book', option_b: 'Bag', option_c: 'Ruler', option_d: 'Pencil', correct_answer: 'A' },
                            { question_text: 'Benda yang digunakan untuk menghapus tulisan pensil adalah...', option_a: 'Eraser', option_b: 'Ruler', option_c: 'Chair', option_d: 'Table', correct_answer: 'A' },
                            { question_text: 'Arti kata "Bag" dalam bahasa Indonesia adalah...', option_a: 'Tas', option_b: 'Meja', option_c: 'Kursi', option_d: 'Penggaris', correct_answer: 'A' },
                            { question_text: 'Benda yang digunakan untuk membuat garis lurus adalah...', option_a: 'Ruler', option_b: 'Book', option_c: 'Pencil case', option_d: 'Sharpener', correct_answer: 'A' },
                            { question_text: 'Kotak tempat menyimpan alat tulis disebut...', option_a: 'Pencil case', option_b: 'Bag', option_c: 'Table', option_d: 'Book', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 10: Plural & Singular Objects (I have four books)',
                order_index: 2,
                learning_objectives: 'Students are able to express quantity of school supplies using plural -s (e.g., two pencils, four books) and state "I have [quantity] [objects]".',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Benda Tunggal & Jamak',
                    linguisticFocus: 'Singular & plural nouns with -s',
                    vocabulary: ['Book → Books', 'Pencil → Pencils', 'Bag → Bags', 'Ruler → Rulers'],
                    patterns: ['I have [number] [plural noun]', 'I have one [singular noun]'],
                    languageFunction: 'Menyatakan kepemilikan benda dengan jumlah tertentu',
                    pronunciation: [
                        { word: 'Books', ipa: '/bʊks/', tip: 'bunyi "s" jelas di akhir kata' },
                        { word: 'Pencils', ipa: '/ˈpɛn.səlz/', tip: 'bunyi "z" di akhir karena konsonan bersuara' },
                        { word: 'Bags', ipa: '/bæɡz/', tip: 'bunyi "z" di akhir' },
                        { word: 'Rulers', ipa: '/ˈruː.lərz/', tip: 'bunyi "z" di akhir' },
                    ],
                    realContext: [
                        'Anak menghitung buku: "I have four books!"',
                        'Anak memberitahu guru: "I have two pencils."',
                        'Anak membandingkan: "One book vs. four books."',
                        'Anak menunjukkan isi kotak pensil: "I have three erasers."',
                    ],
                    indicators: [
                        'Menambahkan -s pada kata benda lebih dari satu',
                        'Membedakan bunyi /s/ dan /z/ di akhir kata',
                        'Menyatakan "I have [jumlah] [benda jamak]"',
                        'Menggunakan "one" untuk benda tunggal',
                    ],
                    parentTips: [
                        'Ajak anak menghitung isi kotak pensil bersama',
                        'Beri penekanan pada bunyi "-s" di akhir kata jamak',
                        'Bandingkan 1 benda vs. banyak benda dalam permainan',
                        'Tempel poster "1 vs Many" di kamar anak',
                        'Rayakan setiap keberhasilan dengan high-five',
                    ],
                    difficulties: [
                        { issue: 'Lupa menambahkan -s pada kata jamak', solution: 'beri isyarat bunyi desis "sss" sambil tersenyum' },
                        { issue: 'Pelafalan -s menjadi /z/ pada semua kata', solution: 'latih membedakan buku (s) vs. pensil (z)' },
                        { issue: 'Menyebut "four book" bukan "four books"', solution: 'hitung dengan jari & tegaskan jamaknya' },
                        { issue: 'Bingung kapan pakai "a" atau "one"', solution: 'a untuk satu umum, one untuk hitungan' },
                    ],
                    extensions: [
                        'Buat "Plural Box" — kumpulkan benda & hitung jamaknya',
                        'Ajak anak menghitung: 1 kucing, 2 kucing → "one cat, two cats"',
                        'Nyanyikan lagu "One, Two, Three Books on the Table"',
                    ],
                }),
                linguistic_focus: 'Plural nouns with -s',
                pronunciation_guide: 'Books /bʊks/, Pencils /ˈpɛn.səlz/, Bags /bæɡz/, Rulers /ˈruː.lərz/',
                cultural_context: 'Dalam bahasa Inggris, penambahan -s pada kata benda jamak adalah aturan dasar yang harus dikuasai sejak dini. Pelafalan -s bisa bervariasi (/s/ atau /z/).',
                common_difficulties: [
                    'Lupa menambahkan -s pada kata jamak',
                    'Pelafalan -s menjadi /z/ pada semua kata',
                    'Menyebut "four book" bukan "four books"',
                    'Bingung kapan pakai "a" atau "one"',
                ],
                assessment_indicators: [
                    'Menambahkan -s pada kata benda lebih dari satu',
                    'Membedakan bunyi /s/ dan /z/ di akhir kata',
                    'Menyatakan "I have [jumlah] [benda jamak]"',
                    'Menggunakan "one" untuk benda tunggal',
                ],
                parent_tips: [
                    'Ajak anak menghitung isi kotak pensil',
                    'Beri penekanan bunyi "-s" di akhir kata',
                    'Bandingkan 1 benda vs. banyak benda',
                    'Tempel poster "1 vs Many"',
                ],
                extension_activities: [
                    'Buat "Plural Box"',
                    'Hitung kucing: one cat, two cats',
                    'Nyanyikan lagu "One, Two, Three Books"',
                ],
                required_materials: ['Beberapa pensil dan buku siswa di meja', 'Kotak pensil berisi alat tulis', 'Kartu angka 1-10'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hello! Look at my hands: one pencil, but now I have THREE pencils!"',
                    ice_breaker: 'Tepuk Desis Akhiran -S: Ucapkan "Book!" tepuk 1 kali; ucapkan "Books!" desis panjang "Sssss!"',
                    apperception: 'Bandingkan 1 pensil di tangan kiri dan 4 pensil di tangan kanan: apa beda ucapannya?',
                    trigger_question: 'If you have four books, do you say "four book" or "four books"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perubahan bentuk tunggal ke jamak dengan penambahan akhiran bunyi -s (pencil → pencils, book → books).',
                    concrete_steps: [
                        'Tunjukkan 1 buku: "One book (tanpa s)".',
                        'Tunjukkan 4 buku: "Four books (ada desis s di akhir)".',
                        'Rangkai dalam kalimat utuh: "I have four books."',
                        'Latih dengan pensil: "I have two pencils."',
                        'Tekankan perbedaan bunyi /s/ pada "books" dan /z/ pada "pencils".',
                    ],
                    script_parent: '"Lebih dari satu benda butuh bunyi \'s\' di akhir! Two pencils, four books!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Misteri Hitung Perlengkapan Meja (Count & Say)',
                    game_rules: [
                        'Keluarkan isi kotak pensil ke meja.',
                        'Ayah memberi tantangan: "How many erasers do you have?".',
                        'Anak menghitung cepat lalu mengangkat bendanya: "I have two erasers!"',
                        'Jika lupa menambahkan -s, anak harus mengulang dengan desis "sss".',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menghitung 1 sampai 3 benda dengan akhiran -s.',
                        child_level_advanced: 'Menghitung hingga 10 benda dan membuat kalimat perbandingan (e.g. 5 pencils and 2 rulers).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghitung gambar dan memilih frasa jamak yang benar pada LKPD Unit 5 (p. 50-51).',
                    worksheet_print_ready: {
                        title: 'LKPD 5.2: I HAVE FOUR BOOKS (PLURAL NOUNS)',
                        instructions: 'Count the objects and choose the correct sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Count the books: Sentence: "I have [ ... ]" (four books / four book)',
                                data: { total: 4, icon: '📚' },
                                answer_key: 'four books',
                                explanation: 'Benda jamak (lebih dari satu) menggunakan akhiran -s (four books).',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Count the pencils: Sentence: "I have [ ... ]" (two pencils / two pencil)',
                                data: { total: 2, icon: '✏️' },
                                answer_key: 'two pencils',
                                explanation: 'Dua pensil jamak: two pencils.',
                            },
                            {
                                id: 3,
                                type: 'PICT_COUNT',
                                question: 'Count the chairs: There are [ ... ] (five chairs / five chair)',
                                data: { total: 5, icon: '🪑' },
                                answer_key: 'five chairs',
                                explanation: 'Lima kursi: five chairs.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'If there is only 1 bag, we say: "One [ ... ]" (bag / bags)',
                                answer_key: 'bag',
                                explanation: 'Benda tunggal berjumlah 1 tidak memakai akhiran -s.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Joshua has 5 pens in his hand. What does Joshua say? "I have [ ... ]"',
                                answer_key: 'five pens',
                                explanation: 'Joshua memiliki 5 pena: five pens.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kita menambahkan bunyi "s" saat punya dua pensil?',
                        'Berapa buku yang kamu miliki di tasmu sekarang?',
                        'Bagaimana cara melafalkan "books" yang benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan menghitung benda jamak pada LKPD 5.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 10: Plural & Singular Classroom Objects',
                        quiz_questions: [
                            { question_text: 'Bentuk jamak dari kata "book" jika jumlahnya 4 buah adalah...', option_a: 'Four book', option_b: 'Four books', option_c: 'One book', option_d: 'Book four', correct_answer: 'B' },
                            { question_text: 'Jika kita hanya punya 1 buah tas, kalimat yang benar adalah...', option_a: 'I have one bag', option_b: 'I have one bags', option_c: 'I have four bag', option_d: 'Bag one', correct_answer: 'A' },
                            { question_text: 'Gambar 3 penggaris dalam bahasa Inggris ditulis...', option_a: 'Three rulers', option_b: 'Three ruler', option_c: 'One ruler', option_d: 'Two rulers', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "I have two pencils" adalah...', option_a: 'Saya memiliki dua pensil', option_b: 'Saya memiliki dua buku', option_c: 'Kamu memiliki dua pensil', option_d: 'Ini adalah dua pensil', correct_answer: 'A' },
                            { question_text: 'Tambahan huruf pada akhir kata benda bahasa Inggris yang berjumlah banyak adalah huruf...', option_a: '-s', option_b: '-m', option_c: '-a', option_d: '-o', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 6: MY GARDEN IS COLORFUL
    // ===========================================================================
    {
        chapter_number: 6,
        title: 'Unit 6: My Garden is Colorful',
        target_semester: 1,
        week_target: 11,
        lessons: [
            {
                title: 'Meeting 11: Basic Primary & Secondary Colors',
                order_index: 1,
                learning_objectives: 'Students are able to identify and name 6 common colors (Red, Blue, Yellow, Green, Black, White) in their surrounding environment.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Warna-Warna Dasar',
                    linguisticFocus: 'Basic colors vocabulary',
                    vocabulary: ['Red', 'Blue', 'Yellow', 'Green', 'Black', 'White'],
                    patterns: ['It is [color]', 'The [object] is [color]'],
                    languageFunction: 'Menyebutkan warna benda-benda di sekitar rumah & taman',
                    pronunciation: [
                        { word: 'Red', ipa: '/rɛd/', tip: 'bunyi "red" pendek, bukan "riid"' },
                        { word: 'Blue', ipa: '/bluː/', tip: 'bunyi "blu" panjang' },
                        { word: 'Yellow', ipa: '/ˈjɛl.oʊ/', tip: 'tekan suku kata pertama YEL-low' },
                        { word: 'Green', ipa: '/ɡriːn/', tip: 'bunyi "grin" panjang' },
                        { word: 'White', ipa: '/waɪt/', tip: 'bunyi "wait" dengan "h" tidak diucapkan' },
                    ],
                    realContext: [
                        'Anak menunjuk apel: "The apple is red!"',
                        'Anak melihat langit: "The sky is blue."',
                        'Anak mengenali daun: "The leaf is green."',
                        'Anak menyebut warna baju: "My shirt is yellow."',
                    ],
                    indicators: [
                        'Menyebutkan 6 warna dasar dengan benar',
                        'Melafalkan "Yellow" dengan tekanan suku kata pertama',
                        'Mengidentifikasi warna benda di sekitar',
                        'Menyatakan warna benda dengan kalimat sederhana',
                    ],
                    parentTips: [
                        'Sebutkan warna benda di rumah setiap hari',
                        'Beri label warna pada benda-benda di kamar anak',
                        'Ajak anak bermain "Color Hunting" di rumah',
                        'Pujilah setiap keberhasilan identifikasi warna',
                        'Gunakan krayon nyata saat belajar warna',
                    ],
                    difficulties: [
                        { issue: 'Tertukar antara "Blue" dan "Green"', solution: 'gunakan benda nyata berwarna berbeda' },
                        { issue: 'Pelafalan "Yellow" menjadi "Yelo"', solution: 'tekankan dua suku kata "YEL-low"' },
                        { issue: 'Menyebut "Red" sebagai "Riid"', solution: 'latih vokal pendek dengan cermin' },
                        { issue: 'Lupa nama warna saat ditanya', solution: 'beri petunjuk benda berwarna sama' },
                    ],
                    extensions: [
                        'Bermain "Color Hunter" di taman rumah',
                        'Buat buku mewarnai dengan label warna bahasa Inggris',
                        'Nyanyikan lagu "Rainbow Colors Song" bersama',
                    ],
                }),
                linguistic_focus: 'Basic colors vocabulary',
                pronunciation_guide: 'Red /rɛd/, Blue /bluː/, Yellow /ˈjɛl.oʊ/, Green /ɡriːn/, White /waɪt/',
                cultural_context: 'Warna memiliki makna budaya yang berbeda. Di Indonesia, merah = berani, putih = suci. Di budaya Barat, biru = tenang, hijau = alam.',
                common_difficulties: [
                    'Tertukar antara Blue & Green',
                    'Pelafalan "Yellow" menjadi "Yelo"',
                    'Menyebut "Red" sebagai "Riid"',
                    'Lupa nama warna saat ditanya',
                ],
                assessment_indicators: [
                    'Menyebutkan 6 warna dasar',
                    'Melafalkan "Yellow" dengan tekanan YEL-low',
                    'Mengidentifikasi warna benda di sekitar',
                    'Menyatakan warna benda dengan kalimat sederhana',
                ],
                parent_tips: [
                    'Sebutkan warna benda di rumah setiap hari',
                    'Beri label warna pada benda di kamar',
                    'Ajak bermain "Color Hunting"',
                    'Pujilah setiap keberhasilan identifikasi',
                ],
                extension_activities: [
                    'Bermain "Color Hunter" di taman',
                    'Buat buku mewarnai dengan label',
                    'Nyanyikan "Rainbow Colors Song"',
                ],
                required_materials: ['Kertas origami aneka warna', 'Krayon warna dasar', 'Benda-benda berwarna di rumah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look around! The world is full of rainbow colors! What color do you see?"',
                    ice_breaker: 'Tepuk Warna: Sebut "Red" tepuk dada, "Blue" tepuk tangan, "Yellow" angkat tangan tinggi.',
                    apperception: 'Tunjukkan apel merah dan daun hijau: "Warna apa ini dalam bahasa Inggris?"',
                    trigger_question: 'What is the color of the sky and the sun?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Asosiasi visual warna: Red (merah), Blue (biru), Yellow (kuning), Green (hijau), Black (hitam), White (putih).',
                    concrete_steps: [
                        'Tunjukkan kertas merah: "Red like an apple."',
                        'Tunjukkan kertas biru: "Blue like the ocean."',
                        'Tunjukkan kertas kuning: "Yellow like the bright sun."',
                        'Tunjukkan kertas hijau: "Green like garden grass."',
                        'Ulangi 3x dengan tempo berbeda untuk memperkuat memori.',
                    ],
                    script_parent: '"Tunjuk baju dan sebutkan warnanya! Red, blue, yellow, green!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Berburu Warna Rumah (Color Hunter Quest)',
                    game_rules: [
                        'Ayah menyebutkan misi: "Find something BLUE in this room in 10 seconds!".',
                        'Anak berlari mencari benda berwarna biru, menyentuhnya, dan berteriak: "It is BLUE!"',
                        'Jika salah warna, anak harus menyebutkan 3 warna berbeda sebagai hukuman lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menemukan 1 benda sesuai warna yang ditunjukkan kartu origami.',
                        child_level_advanced: 'Menyebutkan kombinasi benda dan warna (e.g. A blue pillow, a green leaf).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mewarnai balon sesuai label teks warna pada LKPD Unit 6 (p. 55).',
                    worksheet_print_ready: {
                        title: 'LKPD 6.1: COLORFUL BALLOONS',
                        instructions: 'Observe the balloons and match each color name.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'COLOR_PALETTE',
                                question: 'Read aloud the basic balloon colors and color them:',
                                data: { colors: ['red', 'yellow', 'green', 'blue', 'black', 'white'] },
                                answer_key: 'Bagan warna terlampir',
                                explanation: 'Pengenalan visual 6 warna dasar.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Match the natural object with its typical color:',
                                data: {
                                    pairs: [
                                        { left: '🍎 Red apple', right: 'Red' },
                                        { left: '☀️ Morning sun', right: 'Yellow' },
                                        { left: '🌿 Garden leaf', right: 'Green' },
                                    ],
                                },
                                answer_key: 'Apel → Red; Matahari → Yellow; Daun → Green',
                                explanation: 'Pemasangan benda alam dengan warnanya.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Color of clear sea water is [ ... ] (blue / white)',
                                answer_key: 'blue',
                                explanation: 'Air laut jernih tampak berwarna biru (blue).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: G - R - E - E - N',
                                answer_key: 'green',
                                explanation: 'Menebalkan kata green.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'What color are school shoes usually? (black / green)',
                                answer_key: 'black',
                                explanation: 'Sepatu sekolah umumnya berwarna hitam (black).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa warna favoritmu?',
                        'Apa warna tas sekolahmu?',
                        'Benda apa di rumahmu yang berwarna merah?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil mewarnai balon warna-warni pada lembar LKPD 6.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 11: Basic Colors',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari warna "Merah" adalah...', option_a: 'Blue', option_b: 'Red', option_c: 'Yellow', option_d: 'Green', correct_answer: 'B' },
                            { question_text: 'Warna daun pohon di taman pada umumnya adalah...', option_a: 'Green', option_b: 'Black', option_c: 'Red', option_d: 'Pink', correct_answer: 'A' },
                            { question_text: 'Kata "Yellow" dalam bahasa Indonesia artinya...', option_a: 'Kuning', option_b: 'Biru', option_c: 'Putih', option_d: 'Cokelat', correct_answer: 'A' },
                            { question_text: 'Warna langit cerah di siang hari adalah...', option_a: 'Blue', option_b: 'Black', option_c: 'Green', option_d: 'Purple', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari warna "Hitam" dan "Putih" adalah...', option_a: 'Black and White', option_b: 'Red and Blue', option_c: 'Green and Yellow', option_d: 'Pink and Brown', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 12: Advanced Colors & Color by Number Code',
                order_index: 2,
                learning_objectives: 'Students are able to recognize extended colors (purple, pink, orange, brown) and follow "listen and color" instructions.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Warna Lanjutan & Mewarnai Sesuai Kode',
                    linguisticFocus: 'Extended colors & listening to color commands',
                    vocabulary: ['Purple', 'Pink', 'Orange', 'Brown'],
                    patterns: ['Color number [X] [color]', 'It is [color]'],
                    languageFunction: 'Mendengar instruksi warna & mewarnai sesuai perintah',
                    pronunciation: [
                        { word: 'Purple', ipa: '/ˈpɜːr.pəl/', tip: 'tekan suku kata pertama PUR-ple' },
                        { word: 'Pink', ipa: '/pɪŋk/', tip: 'bunyi "ping" dengan "k" jelas di akhir' },
                        { word: 'Orange', ipa: '/ˈɔːr.ɪndʒ/', tip: 'tekan suku kata pertama O-range' },
                        { word: 'Brown', ipa: '/braʊn/', tip: 'bunyi "braun" dengan vokal au' },
                    ],
                    realContext: [
                        'Anak mendengar guru: "Color number 1 pink!" lalu mewarnai',
                        'Anak menyebut warna jeruk: "It is orange!"',
                        'Anak melihat cokelat: "The chocolate is brown."',
                        'Anak menunjuk bunga: "The flower is purple."',
                    ],
                    indicators: [
                        'Menyebutkan 4 warna lanjutan dengan benar',
                        'Mendengar instruksi & mewarnai sesuai kode angka',
                        'Melafalkan "Orange" dengan tekanan suku kata pertama',
                        'Menyatakan warna benda dengan kalimat sederhana',
                    ],
                    parentTips: [
                        'Sediakan krayon 12 warna untuk latihan',
                        'Beri instruksi mewarnai dengan kode angka',
                        'Sebutkan warna benda rumah setiap hari',
                        'Pujilah ketelitian anak saat mewarnai',
                        'Buat tantangan mewarnai sederhana dengan 3 warna',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Orange" menjadi "Orang"', solution: 'tekankan bunyi "o-rinj" dengan "j" di akhir' },
                        { issue: 'Tertukar antara "Purple" dan "Pink"', solution: 'gunakan benda nyata: purple = anggur, pink = bunga' },
                        { issue: 'Salah mewarnai sesuai instruksi', solution: 'ulangi instruksi dengan gerakan tangan & tunjuk kode' },
                        { issue: 'Lupa "Brown"', solution: 'asosiasikan dengan warna cokelat makanan' },
                    ],
                    extensions: [
                        'Buat gambar dengan kode angka-warna untuk diwarnai',
                        'Ajak anak mewarnai pelangi 7 warna',
                        'Nyanyikan "Colors of the Rainbow" song',
                    ],
                }),
                linguistic_focus: 'Extended colors & following color instructions',
                pronunciation_guide: 'Purple /ˈpɜːr.pəl/, Pink /pɪŋk/, Orange /ˈɔːr.ɪndʒ/, Brown /braʊn/',
                cultural_context: 'Warna jeruk dalam bahasa Inggris disebut "orange" — sama dengan nama buahnya. Ini adalah contoh kata pinjaman dari bahasa Prancis kuno.',
                common_difficulties: [
                    'Pelafalan "Orange" menjadi "Orang"',
                    'Tertukar antara "Purple" dan "Pink"',
                    'Salah mewarnai sesuai instruksi',
                    'Lupa "Brown"',
                ],
                assessment_indicators: [
                    'Menyebutkan 4 warna lanjutan',
                    'Mendengar instruksi & mewarnai sesuai kode',
                    'Melafalkan "Orange" dengan benar',
                    'Menyatakan warna benda dengan kalimat sederhana',
                ],
                parent_tips: [
                    'Sediakan krayon 12 warna',
                    'Beri instruksi mewarnai dengan kode angka',
                    'Sebutkan warna benda rumah setiap hari',
                    'Pujilah ketelitian anak',
                ],
                extension_activities: [
                    'Buat gambar dengan kode angka-warna',
                    'Mewarnai pelangi 7 warna',
                    'Nyanyikan "Colors of the Rainbow"',
                ],
                required_materials: ['Krayon / pensil warna lengkap (12 warna)', 'Lembar mewarnai kode angka', 'Benda berwarna-warni di rumah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Grab your crayons! Today our coloring laboratory is officially open!"',
                    ice_breaker: 'Angkat Krayon Cepat: Ayah sebut "ORANGE!", anak mengangkat krayon jingga ke udara.',
                    apperception: 'Tunjukkan buah jeruk (orange) dan bunga mawar pink: "Bagaimana sebutan warna ini?"',
                    trigger_question: 'What color is chocolate and an orange fruit?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata warna lanjutan: Orange (oranye/jingga), Pink (merah muda), Purple (ungu), Brown (cokelat).',
                    concrete_steps: [
                        'Perkenalkan warna Orange sama dengan nama buahnya (orange).',
                        'Perkenalkan Pink dan Purple.',
                        'Perkenalkan Brown seperti warna batang pohon atau cokelat makanan.',
                        'Praktik instruksi: "Color number 1 pink, color number 2 blue."',
                        'Ulangi 3x dengan variasi instruksi.',
                    ],
                    script_parent: '"Dengarkan instruksi warnanya dengan teliti: Number one is pink, number two is blue!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Bisik Berantai Kertas Warna (Color Paper Whisper Chain)',
                    game_rules: [
                        'Ayah membisikkan satu kata warna ke telinga anak: "PURPLE!".',
                        'Anak berlari ke meja krayon, mengambil krayon ungu, dan menunjukkannya: "It is purple!"',
                        'Jika salah mengambil warna, anak harus mengulang bisikan dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memilih krayon warna dengan contoh visual.',
                        child_level_advanced: 'Mendengar dua instruksi warna sekaligus (e.g. Take pink and brown).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mewarnai gambar kode angka pada LKPD Unit 6 (Aisyah\'s Raincoat p. 57).',
                    worksheet_print_ready: {
                        title: 'LKPD 6.2: LISTEN AND COLOR BY NUMBER CODE',
                        instructions: 'Listen to the audio instructions and color the picture correctly.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Audio Command: "Number 1 is pink". What color do you use?',
                                data: { icon: '🧥', subtitle: 'Code 1 = Pink', options: ['Pink', 'Green'] },
                                answer_key: 'Pink',
                                explanation: 'Sesuai instruksi dengar: number 1 is pink.',
                            },
                            {
                                id: 2,
                                type: 'COLOR_PALETTE',
                                question: 'Secondary colors palette: Say and color each item:',
                                data: { colors: ['orange', 'purple', 'pink', 'brown'] },
                                answer_key: 'Bagan warna terlampir',
                                explanation: 'Palet warna lanjutan.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'The fruit orange has the color [ ... ] (orange / purple)',
                                answer_key: 'orange',
                                explanation: 'Buah jeruk berwarna oranye/orange.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Color of sweet chocolate is [ ... ] (brown / white)',
                                answer_key: 'brown',
                                explanation: 'Cokelat makanan berwarna brown.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Look at Aisyah\'s uniform: "The veil is brown and skirt is [ ... ]" (green / black)',
                                answer_key: 'green',
                                explanation: 'Rok seragam Aisyah pada buku siswa berwarna hijau (green).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Warna apa yang paling mudah kamu ingat?',
                        'Bisakah kamu menyebutkan dua benda berwarna cokelat?',
                        'Bagaimana cara melafalkan "Orange" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto karya jas hujan Aisyah yang sudah diwarnai sesuai kode angka pada LKPD 6.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 12: Extended Colors & Coloring Code',
                        quiz_questions: [
                            { question_text: 'Warna buah jeruk dalam bahasa Inggris disebut...', option_a: 'Purple', option_b: 'Orange', option_c: 'Brown', option_d: 'Pink', correct_answer: 'B' },
                            { question_text: 'Warna "Purple" dalam bahasa Indonesia adalah...', option_a: 'Ungu', option_b: 'Merah muda', option_c: 'Cokelat', option_d: 'Abu-abu', correct_answer: 'A' },
                            { question_text: 'Warna "Pink" adalah sebutan untuk warna...', option_a: 'Merah muda', option_b: 'Kuning terang', option_c: 'Biru laut', option_d: 'Hitam legam', correct_answer: 'A' },
                            { question_text: 'Warna tanah subur dan batang pohon adalah...', option_a: 'Brown', option_b: 'Pink', option_c: 'White', option_d: 'Orange', correct_answer: 'A' },
                            { question_text: 'Jika guru memberi instruksi "Color it yellow", maka kita mengambil krayon warna...', option_a: 'Kuning', option_b: 'Hijau', option_c: 'Biru', option_d: 'Merah', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 7: IT IS A BIG CIRCLE
    // ===========================================================================
    {
        chapter_number: 7,
        title: 'Unit 7: It is a Big Circle',
        target_semester: 1,
        week_target: 13,
        lessons: [
            {
                title: 'Meeting 13: Shapes & Drawing in the Air (Circle, Square, Triangle)',
                order_index: 1,
                learning_objectives: 'Students are able to identify and name 3 basic shapes (Circle, Square, Triangle) and draw them in the air with their fingers.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Bentuk Geometri Dasar',
                    linguisticFocus: 'Basic 2D shapes vocabulary',
                    vocabulary: ['Circle', 'Square', 'Triangle'],
                    patterns: ['It is a [shape]', 'I see a [shape]'],
                    languageFunction: 'Mengenali & menyebutkan bentuk geometri benda sekitar',
                    pronunciation: [
                        { word: 'Circle', ipa: '/ˈsɜːr.kəl/', tip: 'tekan suku kata pertama SIR-kel' },
                        { word: 'Square', ipa: '/skwɛər/', tip: 'bunyi "skwer" dengan "r" lembut di akhir' },
                        { word: 'Triangle', ipa: '/ˈtraɪ.æŋ.ɡəl/', tip: 'tekan suku kata pertama TRI-angle' },
                    ],
                    realContext: [
                        'Anak menunjuk jam dinding: "It is a circle!"',
                        'Anak mengenali pintu: "The door is a square."',
                        'Anak melihat penggaris segitiga: "It is a triangle."',
                        'Anak menggambar di udara dengan jari: "I draw a circle!"',
                    ],
                    indicators: [
                        'Menyebutkan 3 bentuk dasar dengan benar',
                        'Melafalkan "Circle" dengan bunyi /ˈsɜːr.kəl/',
                        'Menggambar bentuk di udara dengan jari',
                        'Mengenali bentuk benda di sekitar rumah',
                    ],
                    parentTips: [
                        'Tunjukkan benda berbentuk geometri di rumah',
                        'Ajak anak menggambar bentuk di udara dengan jari',
                        'Beri tebakan: "Benda apa yang berbentuk lingkaran?"',
                        'Sediakan kertas & krayon untuk menggambar bentuk',
                        'Pujilah setiap keberhasilan identifikasi bentuk',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Circle" menjadi "Sirkel"', solution: 'tekankan "SIR-kel" dengan "r" lembut' },
                        { issue: 'Tertukar antara "Square" dan "Triangle"', solution: 'tunjukkan gambar & hitung sudut' },
                        { issue: 'Menyebut "Triangle" menjadi "Triangel"', solution: 'ulangi "TRI-ang-gel" dengan jelas' },
                        { issue: 'Bingung menggambar di udara', solution: 'bimbing tangan anak terlebih dahulu' },
                    ],
                    extensions: [
                        'Bermain "Shape Hunt" di rumah — cari 5 benda per bentuk',
                        'Buat kolase dari potongan kertas bentuk geometri',
                        'Gambar rumah dari bentuk dasar (persegi + segitiga + lingkaran)',
                    ],
                }),
                linguistic_focus: 'Basic 2D shapes vocabulary',
                pronunciation_guide: 'Circle /ˈsɜːr.kəl/, Square /skwɛər/, Triangle /ˈtraɪ.æŋ.ɡəl/',
                cultural_context: 'Bentuk geometri adalah konsep universal yang dipelajari anak-anak di seluruh dunia. Di budaya Barat, pengenalan bentuk dimulai sejak usia 3-4 tahun.',
                common_difficulties: [
                    'Pelafalan "Circle" menjadi "Sirkel"',
                    'Tertukar antara "Square" dan "Triangle"',
                    'Menyebut "Triangle" menjadi "Triangel"',
                    'Bingung menggambar di udara',
                ],
                assessment_indicators: [
                    'Menyebutkan 3 bentuk dasar',
                    'Melafalkan "Circle" dengan benar',
                    'Menggambar bentuk di udara',
                    'Mengenali bentuk benda di sekitar',
                ],
                parent_tips: [
                    'Tunjukkan benda berbentuk geometri',
                    'Ajak menggambar bentuk di udara',
                    'Beri tebakan bentuk benda',
                    'Sediakan kertas & krayon',
                ],
                extension_activities: [
                    'Bermain "Shape Hunt" di rumah',
                    'Buat kolase bentuk geometri',
                    'Gambar rumah dari bentuk dasar',
                ],
                required_materials: ['Kardus kotak (square)', 'Jam dinding bulat (circle)', 'Penggaris segitiga (triangle)'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Raise your magic pointer finger! Today we draw magic flying shapes!"',
                    ice_breaker: 'Menggambar di Awan: "Up your finger and draw a big CIRCLE in the sky!"',
                    apperception: 'Tunjukkan piring makan dan buku: "Benda ini bentuknya apa dalam bahasa Inggris?"',
                    trigger_question: 'What shape is a pizza slice and a wheel?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Identifikasi bentuk 2D: Circle (lingkaran), Square (persegi/segiempat), Triangle (segitiga).',
                    concrete_steps: [
                        'Raba jam dinding: "It is a circle. Round and round, circle."',
                        'Raba buku segiempat: "It is a square. Four straight sides."',
                        'Raba penggaris segitiga: "It is a triangle. Three sharp corners."',
                        'Gambar bersama di udara dengan jari telunjuk.',
                        'Ulangi 3x dengan mata tertutup untuk melatih memori.',
                    ],
                    script_parent: '"Gambar bentuk di udara: Circle bulat, square punya 4 sisi, triangle punya 3 sudut!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Simon Says Bentuk Tubuh',
                    game_rules: [
                        'Ayah memberi aba-aba: "Simon says make a CIRCLE with your arms!".',
                        'Anak membuat lingkaran dengan kedua lengannya.',
                        'Jika Ayah berkata: "Simon says make a TRIANGLE with your fingers!", anak menyatukan jempol dan telunjuk membentuk segitiga.',
                        'Jika salah, anak harus menyebutkan nama bentuk sambil melompat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membuat bentuk lingkaran dan segitiga dengan bantuan kedua tangan.',
                        child_level_advanced: 'Menebak bentuk benda tersembunyi di ruangan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencentang tabel bentuk benda pada LKPD Unit 7 (Look and tick p. 66).',
                    worksheet_print_ready: {
                        title: 'LKPD 7.1: SHAPES ALL AROUND US',
                        instructions: 'Look at the object and put a tick (√) in the correct shape column.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'SHAPE_CARD',
                                question: 'Observe the three basic geometric shapes:',
                                data: {
                                    shapes: [
                                        { name: 'Circle', type: 'circle' },
                                        { name: 'Square', type: 'square' },
                                        { name: 'Triangle', type: 'triangle' },
                                    ],
                                },
                                answer_key: 'Bagan bangun datar terlampir',
                                explanation: 'Bentuk lingkaran, segiempat, dan segitiga.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Match the household item with its shape:',
                                data: {
                                    pairs: [
                                        { left: '⏰ Wall clock', right: 'Circle' },
                                        { left: '📐 Triangle ruler', right: 'Triangle' },
                                        { left: '📦 Cardboard box', right: 'Square' },
                                    ],
                                },
                                answer_key: 'Jam → Circle; Penggaris segitiga → Triangle; Kotak → Square',
                                explanation: 'Pemasangan benda nyata dengan bentuk geometrinya.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'A slice of pizza has the shape of a [ ... ] (Triangle / Circle)',
                                answer_key: 'Triangle',
                                explanation: 'Potongan pizza berbentuk segitiga (Triangle).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: C - I - R - C - L - E',
                                answer_key: 'circle',
                                explanation: 'Menebalkan kata circle.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Look at a house roof picture: "The red roof is [ ... ]" (triangle / circle)',
                                answer_key: 'triangle',
                                explanation: 'Atap rumah pada umumnya berbentuk segitiga (triangle).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bentuk apa yang tidak memiliki sudut tajam sama sekali?',
                        'Bisakah kamu menemukan benda berbentuk persegi di kamarmu?',
                        'Bagaimana cara menggambar segitiga di udara?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil centang tabel bentuk benda pada LKPD 7.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 13: Shapes (Circle, Square, Triangle)',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari bangun datar "Lingkaran" adalah...', option_a: 'Square', option_b: 'Triangle', option_c: 'Circle', option_d: 'Star', correct_answer: 'C' },
                            { question_text: 'Bangun datar yang memiliki 3 sisi dan 3 sudut tajam adalah...', option_a: 'Circle', option_b: 'Triangle', option_c: 'Square', option_d: 'Line', correct_answer: 'B' },
                            { question_text: 'Benda yang permukaannya berbentuk "Square" (persegi) adalah...', option_a: 'Buku tulis kotak', option_b: 'Roda sepeda', option_c: 'Koin logam', option_d: 'Piring bulat', correct_answer: 'A' },
                            { question_text: 'Bentuk dari gambar matahari bulat di langit adalah...', option_a: 'Triangle', option_b: 'Circle', option_c: 'Square', option_d: 'Box', correct_answer: 'B' },
                            { question_text: 'Arti kata "Triangle" dalam bahasa Indonesia adalah...', option_a: 'Segiempat', option_b: 'Segitiga', option_c: 'Lingkaran', option_d: 'Garis lengkung', correct_answer: 'B' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 14: Distinguishing Sizes (Big vs Small) & Shape House Project',
                order_index: 2,
                learning_objectives: 'Students are able to distinguish sizes ("Big" vs "Small") and assemble shapes to make a shape house ("It is a big circle").',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Ukuran Besar & Kecil (Big & Small)',
                    linguisticFocus: 'Size adjectives: Big vs Small',
                    vocabulary: ['Big', 'Small', 'Big circle', 'Small triangle'],
                    patterns: ['It is a [size] [shape]', 'The [object] is [size]'],
                    languageFunction: 'Membedakan ukuran benda & menggabungkan kata sifat ukuran dengan bentuk',
                    pronunciation: [
                        { word: 'Big', ipa: '/bɪɡ/', tip: 'bunyi "big" pendek dengan konsonan g jelas' },
                        { word: 'Small', ipa: '/smɔːl/', tip: 'bunyi "smol" dengan vokal panjang' },
                        { word: 'Big circle', ipa: '/bɪɡ ˈsɜːr.kəl/', tip: 'tekan "BIG" lebih kuat dari "circle"' },
                        { word: 'Small triangle', ipa: '/smɔːl ˈtraɪ.æŋ.ɡəl/', tip: 'tekan "SMALL" di awal' },
                    ],
                    realContext: [
                        'Anak menunjuk bola besar: "It is a big circle!"',
                        'Anak menunjuk koin kecil: "It is a small circle."',
                        'Anak menyusun rumah dari bentuk: "Big square, small triangle."',
                        'Anak membandingkan dua buku: "My book is big, yours is small."',
                    ],
                    indicators: [
                        'Menyebutkan "big" dan "small" dengan benar',
                        'Menggabungkan kata sifat ukuran dengan nama bentuk',
                        'Menyusun bentuk geometri menjadi rumah',
                        'Membandingkan ukuran 2 benda dengan tepat',
                    ],
                    parentTips: [
                        'Bandingkan benda besar & kecil di rumah setiap hari',
                        'Ajak anak menyusun rumah dari bentuk geometri',
                        'Beri contoh urutan: "Big circle, small triangle"',
                        'Sediakan potongan kertas bentuk untuk kolase',
                        'Pujilah ketelitian anak saat menyusun',
                    ],
                    difficulties: [
                        { issue: 'Tertukar urutan: "Circle big" bukan "Big circle"', solution: 'beri ritme tepukan: BIG (tepuk) CIRCLE (tepuk)' },
                        { issue: 'Pelafalan "Small" menjadi "Smal"', solution: 'tekankan vokal panjang "smol"' },
                        { issue: 'Bingung kapan pakai big/small', solution: 'bandingkan 2 benda berdampingan' },
                        { issue: 'Sulit menyusun bentuk rumah', solution: 'beri contoh visual & bantu tangan anak' },
                    ],
                    extensions: [
                        'Kolase "Shape House" — susun rumah dari bentuk kertas',
                        'Bandingkan ukuran sepatu keluarga: big, bigger, biggest',
                        'Nyanyikan lagu "Big and Small" bersama',
                    ],
                }),
                linguistic_focus: 'Size adjectives & compound noun phrases',
                pronunciation_guide: 'Big /bɪɡ/, Small /smɔːl/, Big circle /bɪɡ ˈsɜːr.kəl/',
                cultural_context: 'Dalam bahasa Inggris, kata sifat (adjective) selalu mendahului kata benda (noun): "big circle" bukan "circle big". Ini berbeda dengan bahasa Indonesia.',
                common_difficulties: [
                    'Tertukar urutan: "Circle big" bukan "Big circle"',
                    'Pelafalan "Small" menjadi "Smal"',
                    'Bingung kapan pakai big/small',
                    'Sulit menyusun bentuk rumah',
                ],
                assessment_indicators: [
                    'Menyebutkan "big" dan "small"',
                    'Menggabungkan kata sifat ukuran dengan bentuk',
                    'Menyusun bentuk geometri menjadi rumah',
                    'Membandingkan ukuran 2 benda',
                ],
                parent_tips: [
                    'Bandingkan benda besar & kecil setiap hari',
                    'Ajak menyusun rumah dari bentuk geometri',
                    'Beri contoh urutan "Big circle"',
                    'Sediakan potongan kertas bentuk',
                ],
                extension_activities: [
                    'Kolase "Shape House"',
                    'Bandingkan ukuran sepatu keluarga',
                    'Nyanyikan lagu "Big and Small"',
                ],
                required_materials: ['Potongan kertas bentuk geometri (besar & kecil)', 'Lem kertas', 'Krayon'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Stretch your arms wide: BIG! Bring your hands close: SMALL!"',
                    ice_breaker: 'Suara Raksasa & Semut: Bicara dengan suara berat besar "BIG!", lalu suara kecil bisik "Small!"',
                    apperception: 'Bandingkan bola basket besar dan bola kelereng kecil: "What is the difference?"',
                    trigger_question: 'How do you say "lingkaran besar" in English?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola frasa kata sifat ukuran di depan kata benda: Big [Shape] vs Small [Shape].',
                    concrete_steps: [
                        'Tunjukkan lingkaran karton besar: "It is a BIG circle."',
                        'Tunjukkan lingkaran karton kecil: "It is a SMALL circle."',
                        'Ulangi pada segitiga: "Big triangle vs small triangle."',
                        'Bimbing anak merakit potongan bentuk membentuk rumah.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Ingat, ukuran selalu di depan! Ucapkan: It is a big square, it is a small circle!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lompat Lingkaran Raksasa (Big & Small Hop)',
                    game_rules: [
                        'Gambar 1 lingkaran kapur besar dan 1 lingkaran kecil di lantai.',
                        'Ayah berseru: "HOP INTO THE BIG CIRCLE!".',
                        'Anak melompat ke dalam lingkaran besar sambil merentangkan tangan berseru: "It is a BIG circle!"',
                        'Jika salah lompat, anak harus melompat ke lingkaran kecil sambil berbisik "small circle".',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Melompat ke lingkaran yang diperintahkan.',
                        child_level_advanced: 'Membuat bentuk raksasa dan kerdil dengan instruksi ganda (Big square & small triangle).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Proyek menempel dan mencocokkan bentuk rumah pada LKPD Unit 7 (Cut and stick p. 64-65).',
                    worksheet_print_ready: {
                        title: 'LKPD 7.2: BIG AND SMALL SHAPE HOUSE',
                        instructions: 'Observe the sizes and shapes, then choose the correct description.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the giant beach ball. What is the size and shape?',
                                data: { icon: '🏐', subtitle: 'Giant ball', options: ['It is a big circle', 'It is a small circle'] },
                                answer_key: 'It is a big circle',
                                explanation: 'Bola pantai berukuran besar berbentuk lingkaran: big circle.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the small coin. What is the size and shape?',
                                data: { icon: '🪙', subtitle: 'Tiny coin', options: ['It is a small circle', 'It is a big square'] },
                                answer_key: 'It is a small circle',
                                explanation: 'Koin kecil berbentuk lingkaran: small circle.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Opposite of BIG is [ ... ] (small / tall)',
                                answer_key: 'small',
                                explanation: 'Lawan kata dari Big (besar) adalah Small (kecil).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'A house with a large square wall: "It is a [ ... ] square" (big / small)',
                                answer_key: 'big',
                                explanation: 'Tembok rumah yang besar: big square.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Combine the words: (Size: Big) + (Shape: Triangle) = "It is a [ ... ]"',
                                answer_key: 'big triangle',
                                explanation: 'Urutan frasa kata sifat ukuran mendahului nama bentuk.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah gajah itu besar atau kecil?',
                        'Bentuk besar apa yang bisa kamu lihat di ruang tamu?',
                        'Bagaimana cara menyebut lingkaran kecil dalam bahasa Inggris?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto karya tempel bentuk rumah (Shape House) pada LKPD 7.2 milikmu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 14: Sizes and Shape House',
                        quiz_questions: [
                            { question_text: 'Arti dari kata "Big" adalah...', option_a: 'Kecil', option_b: 'Besar', option_c: 'Panjang', option_d: 'Bulat', correct_answer: 'B' },
                            { question_text: 'Arti dari kata "Small" adalah...', option_a: 'Besar', option_b: 'Kecil', option_c: 'Tinggi', option_d: 'Luas', correct_answer: 'B' },
                            { question_text: 'Bahasa Inggris dari "Lingkaran besar" adalah...', option_a: 'Big circle', option_b: 'Small circle', option_c: 'Circle big', option_d: 'Square big', correct_answer: 'A' },
                            { question_text: 'Jika atap rumah berbentuk segitiga kecil, kita menyebutnya...', option_a: 'Small triangle', option_b: 'Big square', option_c: 'Small circle', option_d: 'Triangle big', correct_answer: 'A' },
                            { question_text: 'Manakah benda yang ukurannya "Small" dibandingkan bola basket?', option_a: 'Mobil', option_b: 'Rumah', option_c: 'Kelereng kecil', option_d: 'Gajah', correct_answer: 'C' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // SEMESTER 2 — UNIT 8-13 + REVIEW
    // (Struktur content_text detail yang sama — pola buildContentText())
    // ===========================================================================
    {
        chapter_number: 8,
        title: 'Unit 8: I Have Two Pencils',
        target_semester: 2,
        week_target: 15,
        lessons: [
            {
                title: 'Meeting 15: Using "Have" for Personal Objects (I have a pencil / I have pencils)',
                order_index: 1,
                learning_objectives: 'Students are able to express possession of stationary items using the verb "have" (e.g., "I have two pencils", "I have three books").',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kata Kerja Kepemilikan "Have"',
                    linguisticFocus: 'Possession with "have"',
                    vocabulary: ['Have', 'I have', 'Two pencils', 'Three books'],
                    patterns: ['I have [object]', 'I have [number] [plural objects]'],
                    languageFunction: 'Menyatakan kepemilikan benda pribadi',
                    pronunciation: [
                        { word: 'Have', ipa: '/hæv/', tip: 'bunyi "hav" dengan v jelas' },
                        { word: 'I have', ipa: '/aɪ hæv/', tip: 'sambungkan bunyi "ai-hav"' },
                        { word: 'Pencils', ipa: '/ˈpɛn.səlz/', tip: 'bunyi "z" di akhir' },
                    ],
                    realContext: [
                        'Anak menunjukkan alat tulisnya: "I have a pencil."',
                        'Anak menghitung: "I have two pencils and three books."',
                        'Anak memberitahu guru: "I have a new bag!"',
                        'Anak mengoleksi stiker: "I have five stickers."',
                    ],
                    indicators: [
                        'Menyatakan kepemilikan dengan "I have"',
                        'Menggabungkan "have" dengan jumlah benda',
                        'Melafalkan "Have" dengan bunyi /hæv/',
                        'Menggunakan bentuk jamak setelah angka',
                    ],
                    parentTips: [
                        'Tanyakan kepada anak: "What do you have in your bag?"',
                        'Ajak anak menghitung barang miliknya',
                        'Beri contoh kalimat "I have" sehari-hari',
                        'Rayakan setiap keberhasilan menyebutkan jumlah',
                    ],
                    difficulties: [
                        { issue: 'Menyebut "I has" bukan "I have"', solution: 'latih dengan subjek "I" selalu pakai "have"' },
                        { issue: 'Lupa menambahkan -s pada benda jamak', solution: 'ulangi kalimat dengan gerakan tangan menghitung' },
                        { issue: 'Pelafalan "Have" menjadi "Haf"', solution: 'tekankan bunyi "v" dengan gigi atas di bibir bawah' },
                        { issue: 'Bingung antara have dan has', solution: 'I/You/We/They = have, He/She/It = has (nanti)' },
                    ],
                    extensions: [
                        'Buat "My Treasure Box" — hitung barang milik anak',
                        'Bandingkan: "I have 5, you have 3"',
                        'Nyanyikan "What Do You Have?" song',
                    ],
                }),
                linguistic_focus: 'Possession with "have"',
                pronunciation_guide: 'Have /hæv/, I have /aɪ hæv/',
                cultural_context: 'Kata kerja "have" adalah salah satu kata kerja paling umum dalam bahasa Inggris. Untuk subjek "I", selalu pakai "have" (bukan "has").',
                common_difficulties: [
                    'Menyebut "I has" bukan "I have"',
                    'Lupa menambahkan -s pada benda jamak',
                    'Pelafalan "Have" menjadi "Haf"',
                    'Bingung antara have dan has',
                ],
                assessment_indicators: [
                    'Menyatakan kepemilikan dengan "I have"',
                    'Menggabungkan "have" dengan jumlah benda',
                    'Melafalkan "Have" dengan /hæv/',
                    'Menggunakan bentuk jamak setelah angka',
                ],
                parent_tips: [
                    'Tanyakan: "What do you have in your bag?"',
                    'Ajak anak menghitung barang miliknya',
                    'Beri contoh kalimat "I have" sehari-hari',
                    'Rayakan keberhasilan menyebutkan jumlah',
                ],
                extension_activities: [
                    'Buat "My Treasure Box"',
                    'Bandingkan "I have 5, you have 3"',
                    'Nyanyikan "What Do You Have?"',
                ],
                required_materials: ['Alat tulis nyata milik anak (pensil, buku, penggaris)', 'Kotak penyimpanan mainan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Welcome back to Semester 2! Lift your pencil high: I HAVE A PENCIL!"',
                    ice_breaker: 'Angkat Benda Cepat: Ayah berkata "Show me your ruler!", anak mengangkat penggaris dan berseru "I have a ruler!"',
                    apperception: 'Tunjukkan dua pensil di tangan: "Bagaimana memberi tahu teman bahwa kamu punya 2 pensil?"',
                    trigger_question: 'What word do we use in English to say \'saya punya\'?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Struktur kalimat kepemilikan: I have + [Jumlah] + [Nama Benda Jamak].',
                    concrete_steps: [
                        'Pegang 1 pensil: "I have one pencil."',
                        'Pegang 2 pensil: "I have two pencils."',
                        'Pegang 5 buku: "I have five books."',
                        'Minta anak mempraktikkan memegang barang miliknya sendiri.',
                        'Ulangi 3x dengan benda berbeda.',
                    ],
                    script_parent: '"Pegang pensilmu dengan bangga dan ucapkan: I have two pencils!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Isi Kotak Rahasia (Mystery Box "I Have...")',
                    game_rules: [
                        'Ayah menyembunyikan sejumlah pensil di dalam kotak tertutup.',
                        'Anak mengintip lalu berseru ke Ayah: "I have five pencils in the box!".',
                        'Keluarkan pensil bersama-sama dan buktikan hitungannya.',
                        'Jika salah, anak harus menghitung ulang dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan benda di bawah 5.',
                        child_level_advanced: 'Menyebutkan jumlah benda hingga 10 beserta warnanya (e.g. I have 3 blue pencils).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melingkari gambar jumlah benda yang tepat pada LKPD Unit 8 (Listen and circle p. 75).',
                    worksheet_print_ready: {
                        title: 'LKPD 8.1: I HAVE STATIONERY',
                        instructions: 'Listen to the instruction and circle the right picture.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Listen: "I have three books". Circle the correct books:',
                                data: { total: 3, icon: '📚' },
                                answer_key: '3 books',
                                explanation: 'Sesuai instruksi dengar: three books (3 buku).',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Listen: "I have eight pencils". Count and verify:',
                                data: { total: 8, icon: '✏️' },
                                answer_key: '8 pencils',
                                explanation: 'Eight pencils berjumlah 8 pensil.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the item quantity with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '📚 📚 📚', right: 'I have three books' },
                                        { left: '✏️ ✏️', right: 'I have two pencils' },
                                        { left: '🎒', right: 'I have one bag' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai pasangan jumlah benda',
                                explanation: 'Mencocokkan kuantitas gambar dengan kalimat kepemilikan.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Meaning of "I have" in Indonesian is: [ ... ] (Saya punya / Saya lihat)',
                                answer_key: 'Saya punya',
                                explanation: 'I have bermakna saya memiliki / saya punya.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Make a sentence with 4 bags: "I [ ... ] [ ... ] [ ... ]"',
                                answer_key: 'I have four bags',
                                explanation: 'Pola kalimat lengkap: Subjek + have + jumlah + benda jamak.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa arti kata "have"?',
                        'Berapa pensil yang kamu miliki di mejamu?',
                        'Bagaimana cara mengatakan "saya punya" dalam bahasa Inggris?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Count your pencils on the table and record: "I have [number] pencils!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 15: Using "Have" for Objects',
                        quiz_questions: [
                            { question_text: 'Kata "have" pada kalimat "I have a book" artinya...', option_a: 'Membaca', option_b: 'Mempunyai / memiliki', option_c: 'Menulis', option_d: 'Membeli', correct_answer: 'B' },
                            { question_text: 'Kalimat bahasa Inggris untuk "Saya punya dua pensil" adalah...', option_a: 'I have two pencils', option_b: 'I has two pencils', option_c: 'You have two book', option_d: 'I am two pencils', correct_answer: 'A' },
                            { question_text: 'Subjek "I" (Saya) berpasangan dengan kata...', option_a: 'Has', option_b: 'Have', option_c: 'Are', option_d: 'Is', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat: "I have three [ ... ]."', option_a: 'rulers', option_b: 'ruler one', option_c: 'book a', option_d: 'bag one', correct_answer: 'A' },
                            { question_text: 'Jika kamu memiliki 1 tas sekolah, kamu mengatakan...', option_a: 'I have one bag', option_b: 'I have one bags', option_c: 'I has bag', option_d: 'You have bag', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 16: Asking "Do You Have...?" & Classroom Survey',
                order_index: 2,
                learning_objectives: 'Students are able to ask friends "Do you have [object]?" and respond with "Yes, I do" or "No, I don\'t".',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Bertanya Kepemilikan "Do You Have...?"',
                    linguisticFocus: 'Asking possession: Do you have...?',
                    vocabulary: ['Do you have', 'Yes I do', "No I don't"],
                    patterns: ['Do you have [object]?', 'Yes, I do', "No, I don't"],
                    languageFunction: 'Bertanya & menjawab kepemilikan benda dengan sopan',
                    pronunciation: [
                        { word: 'Do', ipa: '/duː/', tip: 'bunyi "du" panjang' },
                        { word: 'You', ipa: '/juː/', tip: 'bunyi "yu" panjang' },
                        { word: 'Don\'t', ipa: '/doʊnt/', tip: 'bunyi "dont" dengan t jelas' },
                    ],
                    realContext: [
                        'Anak bertanya ke teman: "Do you have a pen?"',
                        'Anak menjawab: "Yes, I do! Here it is."',
                        'Anak menjawab tidak punya: "No, I don\'t. Sorry!"',
                        'Anak melakukan survei alat tulis di kelas',
                    ],
                    indicators: [
                        'Bertanya dengan pola "Do you have...?"',
                        'Menjawab "Yes, I do" atau "No, I don\'t" dengan tepat',
                        'Melakukan survei sederhana',
                        'Melafalkan "Don\'t" dengan benar',
                    ],
                    parentTips: [
                        'Ajak anak bertanya: "Do you have a pen, Mom?"',
                        'Beri contoh respon "Yes I do" dan "No I don\'t"',
                        'Lakukan survei alat tulis di rumah',
                        'Rayakan setiap keberhasilan bertanya',
                    ],
                    difficulties: [
                        { issue: 'Menjawab "Yes I have" bukan "Yes I do"', solution: 'beri contoh: pertanyaan "Do" → jawaban "do"' },
                        { issue: 'Lupa kata "don\'t"', solution: 'latih "don-don-dont" berulang' },
                        { issue: 'Pelafalan "Do you" menjadi "Duyu"', solution: 'pisahkan: "du - yu"' },
                        { issue: 'Takut bertanya ke teman', solution: 'mulai dari keluarga' },
                    ],
                    extensions: [
                        'Survei alat tulis seluruh keluarga',
                        'Buat tabel checklist dengan ✓ dan ✗',
                        'Video call dengan kakek/nenek untuk survei',
                    ],
                }),
                linguistic_focus: 'Asking possession with Do you have...?',
                pronunciation_guide: 'Do /duː/, You /juː/, Don\'t /doʊnt/',
                cultural_context: 'Pertanyaan "Do you have...?" adalah bentuk tanya kepemilikan paling umum dalam bahasa Inggris. Respon singkat "Yes I do" / "No I don\'t" sangat penting untuk percakapan lancar.',
                common_difficulties: [
                    'Menjawab "Yes I have" bukan "Yes I do"',
                    'Lupa kata "don\'t"',
                    'Pelafalan "Do you" menjadi "Duyu"',
                    'Takut bertanya ke teman',
                ],
                assessment_indicators: [
                    'Bertanya dengan "Do you have...?"',
                    'Menjawab "Yes I do" / "No I don\'t"',
                    'Melakukan survei sederhana',
                    'Melafalkan "Don\'t" dengan benar',
                ],
                parent_tips: [
                    'Ajak anak bertanya "Do you have...?"',
                    'Beri contoh respon "Yes/No"',
                    'Lakukan survei alat tulis rumah',
                    'Rayakan keberhasilan bertanya',
                ],
                extension_activities: [
                    'Survei alat tulis seluruh keluarga',
                    'Buat tabel checklist ✓ dan ✗',
                    'Video call untuk survei',
                ],
                required_materials: ['Daftar ceklis tabel survei Unit 8', 'Alat tulis lengkap', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we will ask our friends: DO YOU HAVE A PENCIL?"',
                    ice_breaker: 'Angguk & Geleng Bersuara: Angguk mantap: "Yes, I do!", geleng sopan: "No, I don\'t!"',
                    apperception: 'Pura-pura meminjam penghapus ke anak: "Do you have an eraser?"',
                    trigger_question: 'How do you ask your classmate if they have a ruler?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kalimat tanya: "Do you have...?" dan respon singkat "Yes, I do / No, I don\'t".',
                    concrete_steps: [
                        'Ajarkan bertanya ramah: "Do you have five pencils?".',
                        'Ajarkan respon bila ada: "Yes, I do!".',
                        'Ajarkan respon bila tidak punya: "No, I don\'t."',
                        'Praktikkan dengan berbagai alat tulis.',
                        'Ulangi 3x bergantian peran.',
                    ],
                    script_parent: '"Bertanya dengan sopan: Do you have a sharpener? Dan selalu ucapkan terima kasih!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Detektif Survei Pinjam Alat Tulis',
                    game_rules: [
                        'Anak membawa kertas survei ke meja keluarga.',
                        'Bertanya: "Do you have a pen?".',
                        'Jika dijawab Yes, anak memberi tanda centang (√). Jika No, anak memberi tanda silang (X).',
                        'Setelah selesai, anak melaporkan hasil: "Mom has a pen! Dad doesn\'t have a pen."',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menanyakan 2 barang dengan panduan Ayah.',
                        child_level_advanced: 'Menanyakan jumlah spesifik: "Do you have three blue pens?"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menjodohkan gambar alat tulis dengan kalimat kepemilikan pada LKPD (p. 76).',
                    worksheet_print_ready: {
                        title: 'LKPD 8.2: DO YOU HAVE STATIONERY?',
                        instructions: 'Make a line to match the picture to the right sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the stationery quantity with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '✏️ x10 Pencils', right: 'I have ten pencils' },
                                        { left: '🎒 x3 Bags', right: 'I have three bags' },
                                        { left: '🧼 x4 Erasers', right: 'I have four erasers' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai kuantitas',
                                explanation: 'Menjodohkan gambar perlengkapan sekolah dengan kalimat kepemilikannya.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Friend asks: "Do you have a ruler?". You have it on the table. What do you say?',
                                data: { icon: '📏', subtitle: 'Has ruler', options: ['Yes, I do', "No, I don't"] },
                                answer_key: 'Yes, I do',
                                explanation: 'Jawaban bila memiliki barang adalah Yes, I do.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: H - A - V - E',
                                answer_key: 'have',
                                explanation: 'Latihan menulis kata kerja have.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "[ ... ] you have five pencils?" (Do / Are)',
                                answer_key: 'Do',
                                explanation: 'Kalimat tanya kepemilikan diawali dengan Do you have.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Write a question asking if someone has an eraser: "[ ... ] you have an eraser?"',
                                answer_key: 'Do',
                                explanation: 'Menyusun pertanyaan Do you have an eraser?',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara meminjam pensil dari teman dengan sopan?',
                        'Apa yang kamu katakan jika tidak punya barang itu?',
                        'Kapan lagi kamu bisa menggunakan "Do you have...?"',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto tabel survei alat tulis yang telah kamu centang pada LKPD 8.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 16: Asking "Do you have...?"',
                        quiz_questions: [
                            { question_text: 'Pertanyaan untuk menanyakan apakah teman punya penghapus adalah...', option_a: 'Do you have an eraser?', option_b: 'What is eraser?', option_c: 'I have eraser', option_d: 'Eraser is blue', correct_answer: 'A' },
                            { question_text: 'Jika teman bertanya "Do you have a pencil?" dan kamu memilikinya, kamu menjawab...', option_a: 'Yes, I do', option_b: 'No, I am not', option_c: 'Goodbye', option_d: 'Good morning', correct_answer: 'A' },
                            { question_text: 'Jika kamu TIDAK memiliki benda yang ditanyakan, kamu menjawab...', option_a: "No, I don't", option_b: 'Yes, I have', option_c: 'I am fine', option_d: 'Thank you', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat tanya: "[ ... ] you have two books?"', option_a: 'Do', option_b: 'Am', option_c: 'Is', option_d: 'Are you', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "Do you have three rulers?" adalah...', option_a: 'Apakah kamu punya tiga penggaris?', option_b: 'Saya punya tiga penggaris', option_c: 'Berapa harga penggaris?', option_d: 'Di mana penggarismu?', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 9: AT CICI'S FARM
    // ===========================================================================
    {
        chapter_number: 9,
        title: 'Unit 9: At Cici\'s Farm',
        target_semester: 2,
        week_target: 17,
        lessons: [
            {
                title: 'Meeting 17: Farm Animals & Pets (Rabbit, Duck, Cat, Bird, Fish, Chicken)',
                order_index: 1,
                learning_objectives: 'Students are able to identify and name 6 farm animals/pets in English and imitate their sounds and movements.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Hewan Ternak & Peliharaan',
                    linguisticFocus: 'Farm animals & pets vocabulary',
                    vocabulary: ['Rabbit', 'Duck', 'Cat', 'Bird', 'Fish', 'Chicken'],
                    patterns: ['It is a [animal]', 'I have a [animal]'],
                    languageFunction: 'Mengenali & menyebutkan nama hewan ternak dengan suara & gerakannya',
                    pronunciation: [
                        { word: 'Rabbit', ipa: '/ˈræb.ɪt/', tip: 'tekan suku kata pertama RAB-bit' },
                        { word: 'Duck', ipa: '/dʌk/', tip: 'bunyi "dak" pendek' },
                        { word: 'Chicken', ipa: '/ˈtʃɪk.ɪn/', tip: 'tekan suku kata pertama CHI-cken' },
                        { word: 'Bird', ipa: '/bɜːrd/', tip: 'bunyi "berd" dengan r lembut' },
                        { word: 'Fish', ipa: '/fɪʃ/', tip: 'bunyi "fish" dengan sh jelas' },
                    ],
                    realContext: [
                        'Anak melihat bebek di kolam: "It is a duck!"',
                        'Anak menirukan suara kucing: "Meow, meow, cat!"',
                        'Anak menyebut hewan piaraan: "I have a fish."',
                        'Anak bermain di peternakan Cici: "So many chickens!"',
                    ],
                    indicators: [
                        'Menyebutkan 6 nama hewan ternak dengan benar',
                        'Menirukan suara hewan & gerakannya',
                        'Menggunakan pola "It is a [animal]"',
                        'Mengidentifikasi hewan dari suaranya',
                    ],
                    parentTips: [
                        'Tunjukkan gambar hewan ternak setiap hari',
                        'Ajak anak menirukan suara hewan',
                        'Kunjungi peternakan atau kebun binatang jika ada kesempatan',
                        'Sediakan mainan hewan untuk latihan',
                        'Pujilah setiap keberhasilan menyebutkan nama hewan',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Rabbit" menjadi "Rabit"', solution: 'ulangi "RAB-bit" dengan konsonan b ganda' },
                        { issue: 'Menyebut "Chicken" menjadi "Ciken"', solution: 'tekankan "CHI-cken" dengan bunyi ch' },
                        { issue: 'Tertukar antara "Bird" dan "Duck"', solution: 'gunakan gambar & gerakan terbang vs. berenang' },
                        { issue: 'Pelafalan "Fish" menjadi "Pis"', solution: 'tekankan bunyi "f" & "sh"' },
                    ],
                    extensions: [
                        'Buat "Animal Sound Book" — gambar & suara hewan',
                        'Kunjungi peternakan lokal sambil belajar nama hewan',
                        'Nyanyikan "Old MacDonald Had a Farm"',
                    ],
                }),
                linguistic_focus: 'Farm animals & pets vocabulary',
                pronunciation_guide: 'Rabbit /ˈræb.ɪt/, Duck /dʌk/, Chicken /ˈtʃɪk.ɪn/, Bird /bɜːrd/, Fish /fɪʃ/',
                cultural_context: 'Di banyak negara, anak-anak belajar nama hewan ternak melalui lagu "Old MacDonald". Ini adalah lagu tradisional yang mengajarkan suara hewan dalam bahasa Inggris.',
                common_difficulties: [
                    'Pelafalan "Rabbit" menjadi "Rabit"',
                    'Menyebut "Chicken" menjadi "Ciken"',
                    'Tertukar antara "Bird" dan "Duck"',
                    'Pelafalan "Fish" menjadi "Pis"',
                ],
                assessment_indicators: [
                    'Menyebutkan 6 nama hewan ternak',
                    'Menirukan suara hewan & gerakannya',
                    'Menggunakan pola "It is a [animal]"',
                    'Mengidentifikasi hewan dari suaranya',
                ],
                parent_tips: [
                    'Tunjukkan gambar hewan ternak',
                    'Ajak menirukan suara hewan',
                    'Kunjungi peternakan/kebun binatang',
                    'Sediakan mainan hewan',
                ],
                extension_activities: [
                    'Buat "Animal Sound Book"',
                    'Kunjungi peternakan lokal',
                    'Nyanyikan "Old MacDonald"',
                ],
                required_materials: ['Flashcard gambar hewan ternak', 'Mainan miniatur hewan', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Old MacDonald had a farm, E-I-E-I-O! Welcome to Cici\'s wonderful farm!"',
                    ice_breaker: 'Tebak Suara Hewan: Ayah menirukan suara "Kwek-kwek!", anak berseru "DUCK!". Suara "Meow!", anak berseru "CAT!"',
                    apperception: 'Tunjukkan gambar peternakan Cici: "Hewan apa saja yang bisa berenang di kolam dan terbang di pohon?"',
                    trigger_question: 'What pet do you love the most at home?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata hewan ternak: Rabbit (kelinci), Duck (bebek), Cat (kucing), Bird (burung), Fish (ikan), Chicken (ayam).',
                    concrete_steps: [
                        'Tunjukkan gambar kelinci: "Rabbit... hop, hop, rabbit."',
                        'Tunjukkan gambar bebek: "Duck... quack, quack, duck."',
                        'Tunjukkan gambar ayam: "Chicken... cluck, cluck, chicken."',
                        'Latih pengucapan tunggal dan jamak (e.g. two rabbits, three ducks).',
                        'Ulangi 3x dengan gerakan hewan.',
                    ],
                    script_parent: '"Sebutkan nama hewan & suara lucunya: A duck says quack, a cat says meow!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lempar Bola Salju Hewan (Snowball Animal Game)',
                    game_rules: [
                        'Remas kertas bekas menjadi bola salju kertas.',
                        'Ayah melempar bola salju ke anak sambil menyebutkan suara hewan: "Meow!".',
                        'Anak menangkap bola dan menyebutkan nama hewannya: "CAT! I have a cat!"',
                        'Jika salah, anak harus menirukan gerakan hewan tersebut.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan nama hewan saat mendengar suara tiruan.',
                        child_level_advanced: 'Menyebutkan nama hewan dan menirukan gerakannya (misal mengepakkan sayap untuk bird).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mendengar dan mencentang gambar hewan yang tepat pada LKPD Unit 9 (p. 80).',
                    worksheet_print_ready: {
                        title: 'LKPD 9.1: ANIMALS AT CICI\'S FARM',
                        instructions: 'Listen to your parent and put a tick (√) to the right animal picture.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "Two rabbits". Tick the right animal:',
                                data: { icon: '🐇', subtitle: 'Hopping animal', options: ['Two rabbits', 'One duck'] },
                                answer_key: 'Two rabbits',
                                explanation: 'Two rabbits adalah gambar dua kelinci.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "A yellow duck swimming". Tick the right animal:',
                                data: { icon: '🦆', subtitle: 'Swims in pond', options: ['Duck', 'Cat'] },
                                answer_key: 'Duck',
                                explanation: 'Bebek berenang adalah duck.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the animal sound with the English name:',
                                data: {
                                    pairs: [
                                        { left: '🐱 "Meow meow"', right: 'Cat' },
                                        { left: '🦆 "Quack quack"', right: 'Duck' },
                                        { left: '🐓 "Cluck cluck"', right: 'Chicken' },
                                    ],
                                },
                                answer_key: 'Kucing → Cat; Bebek → Duck; Ayam → Chicken',
                                explanation: 'Menjodohkan suara hewan dengan namanya.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'An animal that flies in the sky is a [ ... ] (bird / cat)',
                                answer_key: 'bird',
                                explanation: 'Hewan yang terbang di langit adalah burung (bird).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Cici has yellow swimming birds with flat beaks. They are [ ... ] (ducks / cats)',
                                answer_key: 'ducks',
                                explanation: 'Bebek di peternakan Cici adalah ducks.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Hewan ternak mana yang paling lucu menurutmu?',
                        'Bagaimana cara burung kecil bergerak?',
                        'Suara apa yang dikeluarkan oleh bebek?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil centang gambar hewan ternak pada LKPD 9.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 17: Farm Animals and Pets',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari hewan "Kelinci" adalah...', option_a: 'Rabbit', option_b: 'Duck', option_c: 'Chicken', option_d: 'Fish', correct_answer: 'A' },
                            { question_text: 'Hewan yang bersuara "kwek-kwek" dan pandai berenang adalah...', option_a: 'Duck', option_b: 'Cat', option_c: 'Bird', option_d: 'Rabbit', correct_answer: 'A' },
                            { question_text: 'Arti kata "Chicken" dalam bahasa Indonesia adalah...', option_a: 'Ayam', option_b: 'Bebek', option_c: 'Burung', option_d: 'Ikan', correct_answer: 'A' },
                            { question_text: 'Hewan peliharaan yang mengeong "meow" adalah...', option_a: 'Cat', option_b: 'Fish', option_c: 'Duck', option_d: 'Bird', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari kata "Burung" adalah...', option_a: 'Bird', option_b: 'Rabbit', option_c: 'Chicken', option_d: 'Cat', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 18: Counting Farm Animals & "What Pet Do You Have?"',
                order_index: 2,
                learning_objectives: 'Students are able to ask friends "What pet do you have?" and answer "I have [quantity] [animals]" based on a farm picture.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Menghitung Hewan Ternak & Bertanya Kepemilikan',
                    linguisticFocus: 'Counting animals & asking about pets',
                    vocabulary: ['What pet do you have?', 'I have', 'Eight chickens', 'Three rabbits'],
                    patterns: ['What pet do you have?', 'I have [number] [animals]'],
                    languageFunction: 'Bertanya & menjawab hewan peliharaan dengan jumlah spesifik',
                    pronunciation: [
                        { word: 'Pet', ipa: '/pɛt/', tip: 'bunyi "pet" pendek' },
                        { word: 'Have', ipa: '/hæv/', tip: 'bunyi "hav" dengan v jelas' },
                        { word: 'Chickens', ipa: '/ˈtʃɪk.ɪnz/', tip: 'bunyi "z" di akhir kata jamak' },
                        { word: 'Rabbits', ipa: '/ˈræb.ɪts/', tip: 'bunyi "ts" di akhir' },
                    ],
                    realContext: [
                        'Anak bertanya ke teman: "What pet do you have?"',
                        'Anak menjawab: "I have two cats and one fish."',
                        'Anak menghitung hewan di poster peternakan: "Eight chickens!"',
                        'Anak bercerita: "I have a cute rabbit at home."',
                    ],
                    indicators: [
                        'Bertanya dengan "What pet do you have?"',
                        'Menjawab dengan "I have [jumlah] [hewan]"',
                        'Menghitung hewan pada poster dengan benar',
                        'Melafalkan bentuk jamak hewan dengan tepat',
                    ],
                    parentTips: [
                        'Tanyakan kepada anak: "What pet do you have?"',
                        'Ajak menghitung hewan mainan milik anak',
                        'Beri contoh kalimat lengkap dengan jumlah',
                        'Buat tabel survei hewan peliharaan keluarga',
                        'Rayakan setiap keberhasilan berhitung',
                    ],
                    difficulties: [
                        { issue: 'Lupa menambahkan -s pada hewan jamak', solution: 'beri isyarat bunyi desis' },
                        { issue: 'Pelafalan "Chickens" menjadi "Chicks"', solution: 'tekankan dua suku kata "CHI-kenz"' },
                        { issue: 'Lupa kata "have"', solution: 'beri ritme tepukan: I (tepuk) HAVE (tepuk)' },
                        { issue: 'Bingung antara "pet" dan "animal"', solution: 'pet untuk peliharaan, animal untuk semua hewan' },
                    ],
                    extensions: [
                        'Buat "My Pet Book" — gambar & nama hewan peliharaan',
                        'Kunjungi peternakan atau toko hewan',
                        'Nyanyikan "Old MacDonald" dengan hewan berbeda',
                    ],
                }),
                linguistic_focus: 'Counting animals & asking about pets',
                pronunciation_guide: 'Pet /pɛt/, Have /hæv/, Chickens /ˈtʃɪk.ɪnz/, Rabbits /ˈræb.ɪts/',
                cultural_context: 'Di budaya Barat, "pet" adalah hewan peliharaan yang tinggal di rumah. Pertanyaan "What pet do you have?" adalah pembuka percakapan yang umum di kalangan anak-anak.',
                common_difficulties: [
                    'Lupa menambahkan -s pada hewan jamak',
                    'Pelafalan "Chickens" menjadi "Chicks"',
                    'Lupa kata "have"',
                    'Bingung antara "pet" dan "animal"',
                ],
                assessment_indicators: [
                    'Bertanya dengan "What pet do you have?"',
                    'Menjawab dengan "I have [jumlah] [hewan]"',
                    'Menghitung hewan pada poster',
                    'Melafalkan bentuk jamak hewan',
                ],
                parent_tips: [
                    'Tanyakan "What pet do you have?"',
                    'Ajak menghitung hewan mainan',
                    'Beri contoh kalimat lengkap',
                    'Buat tabel survei hewan peliharaan',
                ],
                extension_activities: [
                    'Buat "My Pet Book"',
                    'Kunjungi peternakan/toko hewan',
                    'Nyanyikan "Old MacDonald"',
                ],
                required_materials: ['Poster gambar pemandangan peternakan Cici (p. 82)', 'Mainan miniatur hewan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at Cici\'s farm! So many baby animals running around! Let\'s count them!"',
                    ice_breaker: 'Tepuk Ayam Berkokok: Tepuk paha 3 kali, kepakkan siku: "Kukuruyuk! I have chickens!"',
                    apperception: 'Hitung ayam di gambar: 1, 2, 3... 8. "How do we say 8 ayam in English?"',
                    trigger_question: 'How do you ask your friend what animal they have at home?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola tanya-jawab kepemilikan hewan: "What pet do you have?" → "I have [number] [pets]".',
                    concrete_steps: [
                        'Latih kalimat tanya: "What pet do you have?".',
                        'Bimbing jawaban: "I have two cats" / "I have a rabbit".',
                        'Ajak anak menghitung hewan pada poster peternakan Cici halaman 82.',
                        'Ulangi 3x bergantian peran.',
                    ],
                    script_parent: '"Bertanya dengan penasaran: What pet do you have? Dan hitung hewan peliharaanmu bersama!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sensus Hewan Peliharaan Sahabat',
                    game_rules: [
                        'Anak membawa boneka hewan favoritnya.',
                        'Bertanya kepada anggota keluarga: "What pet do you have?".',
                        'Keluarga menjawab sambil menunjukkan miniatur hewan: "I have a cute rabbit!"',
                        'Catat jawaban di tabel survei dengan stiker.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab dengan 1 jenis hewan.',
                        child_level_advanced: 'Menghitung total hewan gabungan seluruh keluarga dalam bahasa Inggris.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghitung dan mencocokkan jumlah hewan peternakan pada LKPD Unit 9 (p. 84).',
                    worksheet_print_ready: {
                        title: 'LKPD 9.2: COUNTING CICI\'S PETS',
                        instructions: 'Count the animals and match them with the right sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Count the chickens: 🐓 🐓 🐓 🐓 🐓. Sentence: "I have [ ... ]"',
                                data: { total: 5, icon: '🐓' },
                                answer_key: 'five chickens',
                                explanation: 'Terdapat 5 ekor ayam: five chickens.',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Count the rabbits: 🐇 🐇 🐇. Sentence: "I have [ ... ]"',
                                data: { total: 3, icon: '🐇' },
                                answer_key: 'three rabbits',
                                explanation: 'Terdapat 3 kelinci: three rabbits.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the animal group with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '🦆 🦆', right: 'I have two ducks' },
                                        { left: '🐱 🐱 🐱 🐱', right: 'I have four cats' },
                                        { left: '🐟 🐟 🐟', right: 'I have three fish' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai kuantitas hewan',
                                explanation: 'Pencocokan jumlah hewan ternak dengan kalimat kepemilikan.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Question: "What pet do you have?". Answer: "I have [ ... ] cat." (a / two)',
                                answer_key: 'a',
                                explanation: 'Untuk 1 ekor kucing tunggal menggunakan kata sandang "a cat".',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'In Cici\'s farm there are 8 chickens. What does Cici say? "I have [ ... ] chickens."',
                                answer_key: 'eight',
                                explanation: 'Angka 8 dalam bahasa Inggris adalah eight.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Jika kamu bisa memelihara hewan dari peternakan Cici, hewan apa yang kamu pilih?',
                        'Bagaimana cara mengatakan "saya punya tiga kelinci" dalam bahasa Inggris?',
                        'Hewan apa yang paling banyak di peternakan Cici?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "I have [number] [pet]!" (example: I have two cats / I have a fish).' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 18: Counting Pets and Dialogue',
                        quiz_questions: [
                            { question_text: 'Pertanyaan untuk menanyakan hewan peliharaan teman adalah...', option_a: 'What pet do you have?', option_b: 'What is your name?', option_c: 'How are you?', option_d: 'Where is the cat?', correct_answer: 'A' },
                            { question_text: 'Kalimat "I have four cats" artinya adalah...', option_a: 'Saya punya empat kucing', option_b: 'Kamu punya empat kelinci', option_c: 'Ada empat bebek', option_d: 'Kucing ini berwarna empat', correct_answer: 'A' },
                            { question_text: 'Bentuk jamak dari "one fish" jika berjumlah 5 adalah...', option_a: 'Five fish', option_b: 'Five fishes-es', option_c: 'One fishes', option_d: 'Fish five', correct_answer: 'A' },
                            { question_text: 'Jika ada 2 ekor bebek, kita menyebutnya...', option_a: 'Two ducks', option_b: 'One duck', option_c: 'Two duck', option_d: 'Duck two', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "What pet do [ ... ] have?"', option_a: 'you', option_b: 'is', option_c: 'am', option_d: 'my', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 10: SHE IS CICI AND HE IS MADE
    // ===========================================================================
    {
        chapter_number: 10,
        title: 'Unit 10: She is Cici and He is Made',
        target_semester: 2,
        week_target: 19,
        lessons: [
            {
                title: 'Meeting 19: Pronouns & Gender (He is a boy & She is a girl)',
                order_index: 1,
                learning_objectives: 'Students are able to identify gender and correctly use pronoun "He" for boys/men and "She" for girls/women.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kata Ganti Gender He & She',
                    linguisticFocus: 'Gender pronouns: He & She',
                    vocabulary: ['He', 'She', 'Boy', 'Girl', 'Man', 'Woman'],
                    patterns: ['He is a boy', 'She is a girl', 'He is [name]', 'She is [name]'],
                    languageFunction: 'Membedakan & menggunakan kata ganti sesuai gender',
                    pronunciation: [
                        { word: 'He', ipa: '/hiː/', tip: 'bunyi "hi" panjang dengan h jelas' },
                        { word: 'She', ipa: '/ʃiː/', tip: 'bunyi "shi" panjang dengan sh' },
                        { word: 'Boy', ipa: '/bɔɪ/', tip: 'bunyi "boi" dengan oi' },
                        { word: 'Girl', ipa: '/ɡɜːrl/', tip: 'bunyi "gerl" dengan r lembut' },
                    ],
                    realContext: [
                        'Anak menunjuk teman laki-laki: "He is Made, he is a boy."',
                        'Anak menunjuk teman perempuan: "She is Cici, she is a girl."',
                        'Anak menyebut ayah: "He is my father."',
                        'Anak menyebut ibu: "She is my mother."',
                    ],
                    indicators: [
                        'Menggunakan "He" untuk laki-laki',
                        'Menggunakan "She" untuk perempuan',
                        'Melafalkan "He" dan "She" dengan benar',
                        'Membedakan gender dalam kalimat sederhana',
                    ],
                    parentTips: [
                        'Tunjukkan foto keluarga & sebutkan He/She sesuai gender',
                        'Ajak anak mengamati orang di sekitar',
                        'Beri contoh kalimat He/She setiap hari',
                        'Mainkan tebak gender dengan boneka',
                        'Pujilah setiap keberhasilan penggunaan pronoun',
                    ],
                    difficulties: [
                        { issue: 'Tertukar antara He & She', solution: 'gunakan warna: He = biru, She = merah muda' },
                        { issue: 'Pelafalan "She" menjadi "Se"', solution: 'tekankan bunyi "sh" dengan jari di bibir' },
                        { issue: 'Menyebut "He is a girl"', solution: 'beri contoh & koreksi lembut' },
                        { issue: 'Lupa perbedaan boy/girl', solution: 'asosiasikan dengan ciri visual: rambut, pakaian' },
                    ],
                    extensions: [
                        'Buat "Family Chart" dengan foto & label He/She',
                        'Ajak anak menyebut He/She setiap melihat orang di jalan',
                        'Nyanyikan "Boy and Girl" song',
                    ],
                }),
                linguistic_focus: 'Gender pronouns He & She',
                pronunciation_guide: 'He /hiː/, She /ʃiː/, Boy /bɔɪ/, Girl /ɡɜːrl/',
                cultural_context: 'Dalam bahasa Inggris, kata ganti He/She wajib digunakan sesuai gender. Berbeda dengan bahasa Indonesia yang memakai "dia" untuk keduanya.',
                common_difficulties: [
                    'Tertukar antara He & She',
                    'Pelafalan "She" menjadi "Se"',
                    'Menyebut "He is a girl"',
                    'Lupa perbedaan boy/girl',
                ],
                assessment_indicators: [
                    'Menggunakan "He" untuk laki-laki',
                    'Menggunakan "She" untuk perempuan',
                    'Melafalkan "He" dan "She" dengan benar',
                    'Membedakan gender dalam kalimat',
                ],
                parent_tips: [
                    'Tunjukkan foto keluarga & sebut He/She',
                    'Ajak mengamati orang di sekitar',
                    'Beri contoh kalimat He/She',
                    'Mainkan tebak gender dengan boneka',
                ],
                extension_activities: [
                    'Buat "Family Chart" dengan label He/She',
                    'Sebut He/She setiap lihat orang',
                    'Nyanyikan "Boy and Girl"',
                ],
                required_materials: ['Boneka anak laki-laki & perempuan', 'Foto teman sekelas/keluarga'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at our friends! Made is a boy, Cici is a girl! Welcome to Unit 10!"',
                    ice_breaker: 'Tepuk He & She: Ayah sebut nama anak laki-laki tepuk tangan berseru "HE!", sebut perempuan tepuk berseru "SHE!"',
                    apperception: 'Tunjukkan foto Made dan Cici: "Made anak laki-laki, Cici anak perempuan. Bagaimana menyebutnya dalam bahasa Inggris?"',
                    trigger_question: 'Do we say "He" or "She" for your mother?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Aturan kata ganti gender: He = Dia (laki-laki / boy), She = Dia (perempuan / girl).',
                    concrete_steps: [
                        'Tunjuk gambar Made: "He is Made. He is a boy."',
                        'Tunjuk gambar Cici: "She is Cici. She is a girl."',
                        'Tunjuk Ayah: "He is father." Tunjuk Ibu: "She is mother."',
                        'Tegaskan bahwa "He" selalu untuk laki-laki, dan "She" selalu untuk perempuan.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"He untuk anak laki-laki, She untuk anak perempuan. Ingat: He is a boy, She is a girl!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Kilat Topeng He & She',
                    game_rules: [
                        'Siapkan dua kartu bergambar wajah anak laki-laki bertuliskan HE dan anak perempuan bertuliskan SHE.',
                        'Ayah menyebut nama: "Aisyah!". Anak harus mengangkat kartu SHE.',
                        'Ayah menyebut nama: "Joshua!". Anak harus mengangkat kartu HE.',
                        'Jika salah, anak harus melompat sambil menyebutkan He/She dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengangkat kartu He atau She sesuai nama tokoh buku.',
                        child_level_advanced: 'Membuat kalimat lengkap spontan (e.g. He is Joshua, he is a boy).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melingkari pilihan "He is a boy" atau "She is a girl" pada LKPD Unit 10 (p. 92).',
                    worksheet_print_ready: {
                        title: 'LKPD 10.1: HE IS A BOY, SHE IS A GIRL',
                        instructions: 'Look at the picture and choose the correct pronoun sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at Joshua waving. Choose the correct sentence:',
                                data: { icon: '👦', subtitle: 'Boy student', options: ['He is a boy', 'She is a girl'] },
                                answer_key: 'He is a boy',
                                explanation: 'Joshua adalah anak laki-laki (He is a boy).',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at Cici with hair ribbon. Choose the correct sentence:',
                                data: { icon: '👧', subtitle: 'Girl student', options: ['She is a girl', 'He is a boy'] },
                                answer_key: 'She is a girl',
                                explanation: 'Cici adalah anak perempuan (She is a girl).',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the character with the right pronoun:',
                                data: {
                                    pairs: [
                                        { left: '👦 Made (Boy)', right: 'He' },
                                        { left: '👧 Aisyah (Girl)', right: 'She' },
                                    ],
                                },
                                answer_key: 'Made → He; Aisyah → She',
                                explanation: 'Pemasangan gender dengan kata ganti He/She.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: H - E   and   S - H - E',
                                answer_key: 'He and She',
                                explanation: 'Latihan menulis kata He dan She.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Fill in the blank: "Mr. Togar is a sport teacher. [ ... ] is a man." (He / She)',
                                answer_key: 'He',
                                explanation: 'Pak Togar laki-laki menggunakan kata ganti He.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kata ganti mana yang kamu pakai untuk kakak laki-lakimu?',
                        'Kata ganti mana yang kamu pakai untuk kakak perempuanmu?',
                        'Bagaimana cara melafalkan "She" yang benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan melingkari kalimat He/She pada LKPD 10.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 19: He is a Boy, She is a Girl',
                        quiz_questions: [
                            { question_text: 'Kata ganti "He" digunakan untuk...', option_a: 'Laki-laki (Boy / Man)', option_b: 'Perempuan (Girl / Woman)', option_c: 'Hewan kucing', option_d: 'Benda mati', correct_answer: 'A' },
                            { question_text: 'Kata ganti "She" digunakan untuk...', option_a: 'Laki-laki', option_b: 'Perempuan (Girl / Woman)', option_c: 'Pohon', option_d: 'Sepeda', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat untuk Made: "[ ... ] is Made. He is a boy."', option_a: 'He', option_b: 'She', option_c: 'It', option_d: 'You are', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat untuk Ibu: "[ ... ] is my mother."', option_a: 'He', option_b: 'She', option_c: 'Boy', option_d: 'His', correct_answer: 'B' },
                            { question_text: 'Arti dari kata "Boy" dan "Girl" berturut-turut adalah...', option_a: 'Anak laki-laki dan anak perempuan', option_b: 'Anak perempuan dan anak laki-laki', option_c: 'Ibu dan Ayah', option_d: 'Kakak dan Adik', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 20: Describing Friends in Action (He is playing ball / She is reading)',
                order_index: 2,
                learning_objectives: 'Students are able to describe classmates and pictures using "He is..." and "She is..." combined with daily activities.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Mendeskripsikan Teman dalam Aktivitas',
                    linguisticFocus: 'Describing people using He/She + activity',
                    vocabulary: ['Playing', 'Reading', 'Eating', 'Running', 'Singing'],
                    patterns: ['He is [verb+ing]', 'She is [verb+ing]'],
                    languageFunction: 'Mendeskripsikan orang lain & aktivitas mereka',
                    pronunciation: [
                        { word: 'Playing', ipa: '/ˈpleɪ.ɪŋ/', tip: 'tekan suku kata pertama PLAY-ing' },
                        { word: 'Reading', ipa: '/ˈriː.dɪŋ/', tip: 'tekan suku kata pertama READ-ing' },
                        { word: 'Running', ipa: '/ˈrʌn.ɪŋ/', tip: 'tekan suku kata pertama RUN-ning' },
                    ],
                    realContext: [
                        'Anak mendeskripsikan Made: "He is playing ball."',
                        'Anak mendeskripsikan Aisyah: "She is reading a book."',
                        'Anak melihat ibu: "She is cooking in the kitchen."',
                        'Anak melihat ayah: "He is working on the computer."',
                    ],
                    indicators: [
                        'Mendeskripsikan orang lain dengan He/She + aktivitas',
                        'Menggunakan bentuk verb+ing setelah He/She is',
                        'Melafalkan "Playing" & "Reading" dengan benar',
                        'Mengamati & mendeskripsikan gambar dengan tepat',
                    ],
                    parentTips: [
                        'Ajak anak mengamati orang di rumah & deskripsikan',
                        'Beri contoh kalimat He/She + verb+ing',
                        'Sediakan gambar aktivitas untuk latihan',
                        'Mainkan tebak aktivitas dari gambar',
                        'Rayakan setiap keberhasilan mendeskripsikan',
                    ],
                    difficulties: [
                        { issue: 'Lupa menambahkan -ing', solution: 'beri isyarat suara "ing-ing-ing"' },
                        { issue: 'Tertukar He/She saat mendeskripsikan', solution: 'ingatkan gender terlebih dahulu' },
                        { issue: 'Pelafalan "Playing" menjadi "Playeng"', solution: 'tekankan "PLAY-ing" dengan vokal jelas' },
                        { issue: 'Bingung urutan kata', solution: 'tempel pola: He/She + is + verb+ing' },
                    ],
                    extensions: [
                        'Buat buku "My Family Activities" — gambar & deskripsi',
                        'Ajak anak berperan sebagai reporter yang mendeskripsikan orang',
                        'Mainkan charades dengan kalimat He/She is...',
                    ],
                }),
                linguistic_focus: 'Describing activities with He/She + verb+ing',
                pronunciation_guide: 'Playing /ˈpleɪ.ɪŋ/, Reading /ˈriː.dɪŋ/, Running /ˈrʌn.ɪŋ/',
                cultural_context: 'Dalam bahasa Inggris, kegiatan yang sedang berlangsung memakai bentuk present continuous: He/She is + verb+ing. Ini berbeda dengan bahasa Indonesia yang tidak mengubah bentuk kata kerja.',
                common_difficulties: [
                    'Lupa menambahkan -ing',
                    'Tertukar He/She saat mendeskripsikan',
                    'Pelafalan "Playing" menjadi "Playeng"',
                    'Bingung urutan kata',
                ],
                assessment_indicators: [
                    'Mendeskripsikan orang lain dengan He/She + aktivitas',
                    'Menggunakan verb+ing setelah He/She is',
                    'Melafalkan "Playing" & "Reading"',
                    'Mengamati & mendeskripsikan gambar',
                ],
                parent_tips: [
                    'Ajak anak mengamati & deskripsikan orang',
                    'Beri contoh He/She + verb+ing',
                    'Sediakan gambar aktivitas',
                    'Mainkan tebak aktivitas',
                ],
                extension_activities: [
                    'Buat "My Family Activities" book',
                    'Berperan sebagai reporter',
                    'Mainkan charades',
                ],
                required_materials: ['Gambar aktivitas di taman sekolah (buku hal. 95)', 'Foto aktivitas keluarga'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at the schoolyard! The boys are playing ball, the girls are on the swing!"',
                    ice_breaker: 'Gerak Aksi Cepat: Ayah sebut "He is kicking ball!", anak menirukan gerakan menendang bola.',
                    apperception: 'Buka gambar halaman 95: "Lihat anak laki-laki yang sedang main ayunan, apakah kita pakai He atau She?"',
                    trigger_question: 'When a girl is reading a book, what do you say?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Penerapan He dan She dalam kalimat deskripsi gambar kontekstual.',
                    concrete_steps: [
                        'Amati gambar halaman 95: Made bermain bola → "Made is a boy. He is playing ball."',
                        'Amati Aisyah di ayunan → "Aisyah is a girl. She is playing swing."',
                        'Amati Bu Nina membaca buku → "Bu Nina is a woman. She is reading."',
                        'Tegaskan fokus pada subjek He vs She.',
                        'Ulangi 3x dengan gambar berbeda.',
                    ],
                    script_parent: '"Selalu periksa orangnya dulu: Kalau laki-laki, pakai HE. Kalau perempuan, pakai SHE!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Panggung Boneka He & She',
                    game_rules: [
                        'Pegang dua boneka: satu anak laki-laki dan satu perempuan.',
                        'Gerakkan boneka melakukan aksi (misal boneka perempuan makan es krim).',
                        'Anak berseru cepat: "She is eating ice cream!"',
                        'Jika salah, anak harus memerankan ulang aksi tersebut.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan kata kunci "He" atau "She".',
                        child_level_advanced: 'Menyebutkan kalimat utuh deskripsi aksi.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melengkapi kalimat rumpang dengan kata "he" atau "she" pada LKPD Unit 10 (p. 95).',
                    worksheet_print_ready: {
                        title: 'LKPD 10.2: DESCRIBING ACTIVITIES (HE / SHE)',
                        instructions: 'Complete the sentences with "he" or "she".',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Made is a boy. What pronoun completes the sentence? "[ ... ] is playing ball."',
                                data: { icon: '⚽', subtitle: 'Boy kicking ball', options: ['he', 'she'] },
                                answer_key: 'he',
                                explanation: 'Made adalah anak laki-laki, menggunakan kata ganti he.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Aisyah is a girl. What pronoun completes the sentence? "[ ... ] is playing on the swing."',
                                data: { icon: '👧', subtitle: 'Girl on swing', options: ['she', 'he'] },
                                answer_key: 'she',
                                explanation: 'Aisyah anak perempuan, menggunakan kata ganti she.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Mrs. Nina is a woman. [ ... ] is reading a book. (he / she)',
                                answer_key: 'she',
                                explanation: 'Bu Nina perempuan, menggunakan kata ganti she.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Azzam is a boy. [ ... ] is doing exercise. (he / she)',
                                answer_key: 'he',
                                explanation: 'Azzam anak laki-laki, menggunakan kata ganti he.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Dinda is eating ice cream. Choose the pronoun: "[ ... ] likes ice cream." (He / She)',
                                answer_key: 'She',
                                explanation: 'Dinda perempuan menggunakan She.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kita menggunakan "she" untuk Bu Nina?',
                        'Bisakah kamu mendeskripsikan apa yang sedang dilakukan ayahmu dengan "He is..."?',
                        'Bagaimana cara melafalkan "playing" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto latihan melengkapi kalimat he/she pada LKPD 10.2 milikmu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 20: Describing Friends in Action',
                        quiz_questions: [
                            { question_text: 'Lengkapi kalimat: "Bagas is a boy. [ ... ] is riding a bicycle."', option_a: 'He', option_b: 'She', option_c: 'I', option_d: 'You', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Cici is a girl. [ ... ] is eating an apple."', option_a: 'She', option_b: 'He', option_c: 'His', option_d: 'Him', correct_answer: 'A' },
                            { question_text: 'Kata ganti untuk seorang kakek (grandfather) adalah...', option_a: 'He', option_b: 'She', option_c: 'Girl', option_d: 'It', correct_answer: 'A' },
                            { question_text: 'Kata ganti untuk seorang nenek (grandmother) adalah...', option_a: 'She', option_b: 'He', option_c: 'Boy', option_d: 'Him', correct_answer: 'A' },
                            { question_text: 'Manakah kalimat yang benar tata bahasanya?', option_a: 'Made is a boy, he is happy', option_b: 'Made is a boy, she is happy', option_c: 'Cici is a girl, he is smiling', option_d: 'Aisyah is a boy, he is running', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 11: AISYAH'S FAMILY
    // ===========================================================================
    {
        chapter_number: 11,
        title: 'Unit 11: Aisyah\'s Family',
        target_semester: 2,
        week_target: 21,
        lessons: [
            {
                title: 'Meeting 21: Family Members (Father, Mother, Brother, Sister)',
                order_index: 1,
                learning_objectives: 'Students are able to identify and name core family members (father, mother, brother, sister) in English with correct pronunciation.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Anggota Keluarga Inti',
                    linguisticFocus: 'Core family members vocabulary',
                    vocabulary: ['Father', 'Mother', 'Brother', 'Sister'],
                    patterns: ['This is my [family member]', 'I love my [family member]'],
                    languageFunction: 'Menyebutkan & memperkenalkan anggota keluarga inti',
                    pronunciation: [
                        { word: 'Father', ipa: '/ˈfɑː.ðər/', tip: 'tekan suku kata pertama FA-ther, "th" lembut' },
                        { word: 'Mother', ipa: '/ˈmʌð.ər/', tip: 'tekan suku kata pertama MO-ther, "th" lembut' },
                        { word: 'Brother', ipa: '/ˈbrʌð.ər/', tip: 'tekan suku kata pertama BRO-ther' },
                        { word: 'Sister', ipa: '/ˈsɪs.tər/', tip: 'tekan suku kata pertama SIS-ter' },
                    ],
                    realContext: [
                        'Anak menunjukkan foto ayah: "This is my father."',
                        'Anak menyebut ibunya: "My mother is cooking."',
                        'Anak bercerita: "I have one brother and two sisters."',
                        'Anak menggambar keluarga: "Father, mother, brother, sister."',
                    ],
                    indicators: [
                        'Menyebutkan 4 anggota keluarga inti',
                        'Melafalkan "Father" & "Mother" dengan bunyi "th"',
                        'Memperkenalkan keluarga dengan "This is my..."',
                        'Menunjukkan foto keluarga & menyebutkan nama',
                    ],
                    parentTips: [
                        'Tunjukkan foto keluarga & sebutkan nama Inggrisnya',
                        'Ajak anak menggambar keluarganya',
                        'Beri contoh kalimat "This is my..."',
                        'Buat "Family Chart" bersama',
                        'Rayakan setiap keberhasilan menyebutkan anggota keluarga',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Father" menjadi "Fader"', solution: 'tekankan bunyi "th" dengan lidah di antara gigi' },
                        { issue: 'Pelafalan "Mother" menjadi "Mader"', solution: 'sama, "th" bukan "d"' },
                        { issue: 'Tertukar antara "Brother" & "Sister"', solution: 'asosiasikan brother = laki-laki, sister = perempuan' },
                        { issue: 'Menyebut "Father" menjadi "Pather"', solution: 'tekankan bunyi "f" dengan gigi di bibir' },
                    ],
                    extensions: [
                        'Buat "My Family Album" dengan foto & label bahasa Inggris',
                        'Video call dengan anggota keluarga & sebut nama Inggrisnya',
                        'Nyanyikan "Finger Family" song',
                    ],
                }),
                linguistic_focus: 'Core family members',
                pronunciation_guide: 'Father /ˈfɑː.ðər/, Mother /ˈmʌð.ər/, Brother /ˈbrʌð.ər/, Sister /ˈsɪs.tər/',
                cultural_context: 'Di budaya Barat, anak-anak dikenalkan anggota keluarga inti sejak dini. Kata "Father" & "Mother" memiliki bentuk informal "Dad" & "Mom" yang lebih umum dipakai di rumah.',
                common_difficulties: [
                    'Pelafalan "Father" menjadi "Fader"',
                    'Pelafalan "Mother" menjadi "Mader"',
                    'Tertukar antara "Brother" & "Sister"',
                    'Menyebut "Father" menjadi "Pather"',
                ],
                assessment_indicators: [
                    'Menyebutkan 4 anggota keluarga inti',
                    'Melafalkan "Father" & "Mother"',
                    'Memperkenalkan keluarga dengan "This is my..."',
                    'Menunjukkan foto & menyebutkan nama',
                ],
                parent_tips: [
                    'Tunjukkan foto keluarga & sebut nama Inggris',
                    'Ajak menggambar keluarga',
                    'Beri contoh kalimat "This is my..."',
                    'Buat "Family Chart"',
                ],
                extension_activities: [
                    'Buat "My Family Album"',
                    'Video call dengan anggota keluarga',
                    'Nyanyikan "Finger Family"',
                ],
                required_materials: ['Foto keluarga siswa di rumah', 'Boneka keluarga', 'Kertas gambar & krayon'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"I love my family! Today we meet Aisyah\'s lovely family!"',
                    ice_breaker: 'Lagu Satu-Satu Aku Sayang Ibu (Versi English): "One and one, I love my mother... Two and two, I love my father too!"',
                    apperception: 'Tunjukkan foto keluarga: "Siapa saja orang tercinta yang tinggal serumah denganmu?"',
                    trigger_question: 'What is the English word for ayah and ibu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata anggota keluarga: Father (ayah), Mother (ibu), Brother (saudara laki-laki), Sister (saudara perempuan).',
                    concrete_steps: [
                        'Tunjuk foto ayah: "This is my father. Say: father."',
                        'Tunjuk foto ibu: "This is my mother. Say: mother."',
                        'Tunjuk saudara laki-laki: "brother."',
                        'Tunjuk saudara perempuan: "sister."',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Tunjuk foto keluarga dan ucapkan dengan cinta: My father, my mother, my brother, my sister!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Foto Keluarga Tersayang',
                    game_rules: [
                        'Letakkan foto keluarga di tengah meja.',
                        'Ayah menutup satu wajah dengan telapak tangan.',
                        'Anak harus menebak dengan cepat: "This is my mother!" atau "This is my brother!"',
                        'Jika salah, anak harus menyanyikan "Finger Family" satu bait.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan sebutan father/mother.',
                        child_level_advanced: 'Membuat kalimat pengenalan nama: "This is my father, his name is..."',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghubungkan foto keluarga Aisyah dengan kata yang tepat pada LKPD Unit 11 (p. 98).',
                    worksheet_print_ready: {
                        title: 'LKPD 11.1: AISYAH\'S CORE FAMILY',
                        instructions: 'Look at Aisyah\'s family photo and match the words.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the Indonesian family role with the English word:',
                                data: {
                                    pairs: [
                                        { left: '👨 Ayah', right: 'Father' },
                                        { left: '👩 Ibu', right: 'Mother' },
                                        { left: '👦 Saudara Laki-laki', right: 'Brother' },
                                        { left: '👧 Saudara Perempuan', right: 'Sister' },
                                    ],
                                },
                                answer_key: 'Ayah → Father; Ibu → Mother; Saudara Laki-laki → Brother; Saudara Perempuan → Sister',
                                explanation: 'Pemasangan kosa kata anggota keluarga inti.',
                            },
                            {
                                id: 2,
                                type: 'MATH_PROBLEM',
                                question: 'Mr. Hamid is Aisyah\'s [ ... ] (father / sister)',
                                answer_key: 'father',
                                explanation: 'Pak Hamid adalah ayah (father) Aisyah.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Mrs. Shofi is Aisyah\'s [ ... ] (mother / brother)',
                                answer_key: 'mother',
                                explanation: 'Bu Shofi adalah ibu (mother) Aisyah.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Fahri is a boy. He is Aisyah\'s [ ... ] (brother / mother)',
                                answer_key: 'brother',
                                explanation: 'Fahri anak laki-laki adalah saudara laki-laki (brother).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "I love my [ ... ] and mother very much." (father / cat)',
                                answer_key: 'father',
                                explanation: 'Ayah dan ibu adalah father and mother.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Berapa saudara laki-laki atau perempuan yang kamu miliki?',
                        'Apa makanan favorit ibumu?',
                        'Bagaimana cara melafalkan "Father" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto kamu memegang foto keluarga sambil menunjukkan lembar LKPD 11.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 21: Core Family Members',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari kata "Ayah" adalah...', option_a: 'Mother', option_b: 'Father', option_c: 'Brother', option_d: 'Sister', correct_answer: 'B' },
                            { question_text: 'Bahasa Inggris dari kata "Ibu" adalah...', option_a: 'Mother', option_b: 'Father', option_c: 'Grandpa', option_d: 'Brother', correct_answer: 'A' },
                            { question_text: 'Arti kata "Brother" dalam bahasa Indonesia adalah...', option_a: 'Saudara laki-laki', option_b: 'Saudara perempuan', option_c: 'Bibi', option_d: 'Paman', correct_answer: 'A' },
                            { question_text: 'Arti kata "Sister" dalam bahasa Indonesia adalah...', option_a: 'Saudara perempuan', option_b: 'Saudara laki-laki', option_c: 'Kakek', option_d: 'Nenek', correct_answer: 'A' },
                            { question_text: 'Panggilan akrab untuk "Mother" adalah...', option_a: 'Mom / Mommy', option_b: 'Dad', option_c: 'Bro', option_d: 'Sir', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 22: Grandparents & Family Tree (Grandfather & Grandmother)',
                order_index: 2,
                learning_objectives: 'Students are able to identify grandparents (grandfather, grandmother) and describe what items their family members have.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kakek, Nenek & Pohon Keluarga',
                    linguisticFocus: 'Grandparents & family possession',
                    vocabulary: ['Grandfather', 'Grandmother', 'Grandpa', 'Grandma', 'Has'],
                    patterns: ['This is my [grandparent]', 'My [family member] has [object]'],
                    languageFunction: 'Mengenal kakek-nenek & menyebutkan kepemilikan benda keluarga',
                    pronunciation: [
                        { word: 'Grandfather', ipa: '/ˈɡræn.fɑː.ðər/', tip: 'tekan suku kata pertama GRAND-father' },
                        { word: 'Grandmother', ipa: '/ˈɡræn.mʌð.ər/', tip: 'tekan suku kata pertama GRAND-mother' },
                        { word: 'Grandpa', ipa: '/ˈɡræn.pɑː/', tip: 'bunyi "grand-pa" dengan p jelas' },
                        { word: 'Grandma', ipa: '/ˈɡræn.mɑː/', tip: 'bunyi "grand-ma" dengan m jelas' },
                    ],
                    realContext: [
                        'Anak menunjukkan foto kakek: "This is my grandfather."',
                        'Anak menyebut nenek dengan akrab: "Grandma is cooking."',
                        'Anak bercerita: "My father has two watermelons."',
                        'Anak membuat pohon keluarga: "Grandfather at the top."',
                    ],
                    indicators: [
                        'Menyebutkan "Grandfather" & "Grandmother"',
                        'Menggunakan panggilan akrab "Grandpa" & "Grandma"',
                        'Menyebutkan kepemilikan dengan "has"',
                        'Membuat pohon keluarga sederhana',
                    ],
                    parentTips: [
                        'Tunjukkan foto kakek-nenek & sebutkan nama Inggris',
                        'Ajak anak membuat pohon keluarga',
                        'Beri contoh kalimat "My [family] has [object]"',
                        'Video call dengan kakek-nenek untuk praktik',
                        'Ceritakan kenangan tentang kakek-nenek',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Grandfather" menjadi "Grendpader"', solution: 'tekankan "GRAND-fa-ther" dengan "th"' },
                        { issue: 'Tertukar "Grandpa" dan "Grandma"', solution: 'gunakan visual: pa = laki-laki, ma = perempuan' },
                        { issue: 'Lupa kata "has" untuk he/she', solution: 'beri contoh: My father HAS, bukan HAVE' },
                        { issue: 'Bingung bedakan grandparent & parent', solution: 'grand = kakek/nenek, parent = ayah/ibu' },
                    ],
                    extensions: [
                        'Buat "Family Tree" besar dengan foto seluruh keluarga',
                        'Video call kakek-nenek untuk latihan "How are you?"',
                        'Nyanyikan "Grandparents Song"',
                    ],
                }),
                linguistic_focus: 'Grandparents & family possession with "has"',
                pronunciation_guide: 'Grandfather /ˈɡræn.fɑː.ðər/, Grandmother /ˈɡræn.mʌð.ər/, Grandpa /ˈɡræn.pɑː/, Grandma /ˈɡræn.mɑː/',
                cultural_context: 'Di budaya Barat, kakek-nenek sering dipanggil dengan sebutan akrab seperti "Grandpa" & "Grandma". Banyak keluarga juga membuat "Family Tree" (pohon keluarga) sebagai dekorasi rumah.',
                common_difficulties: [
                    'Pelafalan "Grandfather" menjadi "Grendpader"',
                    'Tertukar "Grandpa" dan "Grandma"',
                    'Lupa kata "has" untuk he/she',
                    'Bingung bedakan grandparent & parent',
                ],
                assessment_indicators: [
                    'Menyebutkan "Grandfather" & "Grandmother"',
                    'Menggunakan panggilan akrab "Grandpa" & "Grandma"',
                    'Menyebutkan kepemilikan dengan "has"',
                    'Membuat pohon keluarga sederhana',
                ],
                parent_tips: [
                    'Tunjukkan foto kakek-nenek & sebutkan nama',
                    'Ajak membuat pohon keluarga',
                    'Beri contoh kalimat "has"',
                    'Video call dengan kakek-nenek',
                ],
                extension_activities: [
                    'Buat "Family Tree" besar',
                    'Video call kakek-nenek',
                    'Nyanyikan "Grandparents Song"',
                ],
                required_materials: ['Pohon keluarga kertas (Family tree)', 'Foto kakek-nenek', 'Boneka kakek-nenek'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we honor our wise grandparents: Grandfather and Grandmother!"',
                    ice_breaker: 'Tiru Gaya Kakek: Berjalan pelan membungkuk memegang tongkat imajiner: "Grandfather is walking!"',
                    apperception: 'Tanyakan: "Siapa orang tua dari ayah dan ibumu? Kita memanggil mereka kakek dan nenek."',
                    trigger_question: 'How do you call your grandma and grandpa in English?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata Grandfather (kakek) dan Grandmother (nenek) serta frasa kepemilikan keluarga dengan "has".',
                    concrete_steps: [
                        'Tunjukkan gambar kakek berambut putih: "Grandfather / Grandpa."',
                        'Tunjukkan gambar nenek berkacamata: "Grandmother / Grandma."',
                        'Latih kalimat gabungan: "My father has nine apples", "My mother has two watermelons."',
                        'Bimbing anak membuat pohon keluarga sederhana.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Grandpa dan Grandma adalah kakek-nenek kita. Perlakukan mereka dengan hormat dan cinta yang mendalam!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Pohon Keluarga Ajaib (Family Tree Show & Tell)',
                    game_rules: [
                        'Gambar pohon besar di kertas karton dengan cabang-cabang keluarga.',
                        'Anak menempelkan kartu foto: Kakek di puncak atas, Ayah-Ibu di tengah, anak di bawah.',
                        'Anak mempresentasikan: "This is my grandfather, and this is my grandmother!"',
                        'Jika salah menempel, anak harus bercerita satu kalimat tentang kakek-nenek.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menempelkan kartu kakek dan nenek pada pohon.',
                        child_level_advanced: 'Menceritakan hobi kakek/nenek dalam kalimat bahasa Inggris sederhana.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mendengar dan mencentang anggota keluarga pada LKPD Unit 11 (p. 100).',
                    worksheet_print_ready: {
                        title: 'LKPD 11.2: GRANDPARENTS AND FAMILY TREE',
                        instructions: 'Listen and check (√) if the statement matches the picture.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Picture of an elderly woman with spectacles: "This is grandmother." (Yes / No)',
                                data: { icon: '👵', subtitle: 'Elderly woman', options: ['Yes', 'No'] },
                                answer_key: 'Yes',
                                explanation: 'Gambar wanita tua berkacamata adalah nenek (grandmother).',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Picture of an elderly man with grey hair: "This is sister." (Yes / No)',
                                data: { icon: '👴', subtitle: 'Elderly man', options: ['Yes', 'No'] },
                                answer_key: 'No',
                                explanation: 'Pernyataan salah, pria tua adalah grandfather bukan sister.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the formal name with the friendly nickname:',
                                data: {
                                    pairs: [
                                        { left: '👴 Grandfather', right: 'Grandpa' },
                                        { left: '👵 Grandmother', right: 'Grandma' },
                                    ],
                                },
                                answer_key: 'Grandfather → Grandpa; Grandmother → Grandma',
                                explanation: 'Panggilan akrab kakek dan nenek.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Short friendly word for Grandfather is [ ... ] (Grandpa / Dad)',
                                answer_key: 'Grandpa',
                                explanation: 'Grandpa adalah panggilan akrab untuk kakek.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "My mother has two [ ... ]." 🍉 🍉 (watermelons / apples)',
                                answer_key: 'watermelons',
                                explanation: 'Gambar dua semangka: two watermelons.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu suka mengunjungi kakek-nenekmu?',
                        'Buah apa yang biasa dibeli ibumu untuk keluarga?',
                        'Bagaimana cara melafalkan "Grandfather" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "I love my grandfather and my grandmother!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 22: Grandparents and Family Tree',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari kata "Kakek" adalah...', option_a: 'Grandfather', option_b: 'Grandmother', option_c: 'Father', option_d: 'Brother', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari kata "Nenek" adalah...', option_a: 'Grandmother', option_b: 'Grandfather', option_c: 'Mother', option_d: 'Sister', correct_answer: 'A' },
                            { question_text: 'Panggilan akrab untuk "Grandfather" adalah...', option_a: 'Grandpa', option_b: 'Mommy', option_c: 'Daddy', option_d: 'Sister', correct_answer: 'A' },
                            { question_text: 'Panggilan akrab untuk "Grandmother" adalah...', option_a: 'Grandma', option_b: 'Uncle', option_c: 'Aunt', option_d: 'Brother', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "My father [ ... ] two watermelons."', option_a: 'has', option_b: 'have', option_c: 'are', option_d: 'am', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 12: SHE HAS SOME FRUITS
    // ===========================================================================
    {
        chapter_number: 12,
        title: 'Unit 12: She Has Some Fruits',
        target_semester: 2,
        week_target: 23,
        lessons: [
            {
                title: 'Meeting 23: Fruits Vocabulary (Apples, Mangoes, Oranges, Bananas, Strawberries, Watermelons)',
                order_index: 1,
                learning_objectives: 'Students are able to identify and name 6 common fruits (apples, mangoes, oranges, bananas, strawberries, watermelons) in plural form.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kosa Kata Buah-Buahan',
                    linguisticFocus: 'Fruits vocabulary & plural forms',
                    vocabulary: ['Apples', 'Mangoes', 'Oranges', 'Bananas', 'Strawberries', 'Watermelons'],
                    patterns: ['I like [fruits]', 'These are [fruits]'],
                    languageFunction: 'Menyebutkan nama buah-buahan & bentuk jamaknya',
                    pronunciation: [
                        { word: 'Apples', ipa: '/ˈæp.əlz/', tip: 'tekan suku kata pertama AP-pelz' },
                        { word: 'Mangoes', ipa: '/ˈmæŋ.ɡoʊz/', tip: 'tekan suku kata pertama MAN-goes' },
                        { word: 'Oranges', ipa: '/ˈɔːr.ɪn.dʒɪz/', tip: 'tekan suku kata pertama OR-an-ges' },
                        { word: 'Bananas', ipa: '/bəˈnæn.əz/', tip: 'tekan suku kata kedua ba-NA-nas' },
                        { word: 'Strawberries', ipa: '/ˈstrɔː.bər.iz/', tip: 'tekan suku kata pertama STRAW-berries' },
                        { word: 'Watermelons', ipa: '/ˈwɔː.tər.mɛl.ənz/', tip: 'tekan suku kata pertama WA-ter-melons' },
                    ],
                    realContext: [
                        'Anak melihat buah di dapur: "I see apples and bananas!"',
                        'Anak menyebutkan buah favorit: "I like mangoes."',
                        'Anak menghitung buah di keranjang: "Three oranges!"',
                        'Anak menyebutkan buah di pasar: "Watermelons and strawberries!"',
                    ],
                    indicators: [
                        'Menyebutkan 6 nama buah dengan benar',
                        'Melafalkan "Strawberries" dengan tekanan suku kata pertama',
                        'Menyebutkan buah dalam bentuk jamak',
                        'Menunjukkan buah nyata & menyebutkan namanya',
                    ],
                    parentTips: [
                        'Tunjukkan buah nyata di dapur & sebutkan nama Inggrisnya',
                        'Ajak anak menghitung buah di keranjang',
                        'Beri contoh pelafalan dengan video online',
                        'Buat "Fruit Chart" berisi gambar & nama',
                        'Rayakan setiap keberhasilan menyebutkan buah',
                    ],
                    difficulties: [
                        { issue: 'Pelafalan "Strawberries" menjadi "Stroberis"', solution: 'tekankan "STRAW-ber-iz" dengan jelas' },
                        { issue: 'Lupa bentuk jamak -s', solution: 'beri isyarat desis di akhir kata' },
                        { issue: 'Tertukar "Oranges" & "Apples"', solution: 'gunakan warna buah sebagai kunci' },
                        { issue: 'Pelafalan "Mangoes" menjadi "Mangos"', solution: 'tekankan "MAN-goes" dengan vokal panjang' },
                    ],
                    extensions: [
                        'Buat "Fruit Salad" bersama sambil menyebut nama buah',
                        'Kunjungi pasar buah & praktik menyebut nama',
                        'Nyanyikan "Fruit Song" atau "Apples and Bananas"',
                    ],
                }),
                linguistic_focus: 'Fruits vocabulary & plural forms',
                pronunciation_guide: 'Apples /ˈæp.əlz/, Mangoes /ˈmæŋ.ɡoʊz/, Oranges /ˈɔːr.ɪn.dʒɪz/, Bananas /bəˈnæn.əz/, Strawberries /ˈstrɔː.bər.iz/, Watermelons /ˈwɔː.tər.mɛl.ənz/',
                cultural_context: 'Buah-buahan adalah topik favorit anak-anak karena warna cerah & rasa manis. Di budaya Barat, buah sering dijadikan camilan sehat & bahan pelajaran warna.',
                common_difficulties: [
                    'Pelafalan "Strawberries" menjadi "Stroberis"',
                    'Lupa bentuk jamak -s',
                    'Tertukar "Oranges" & "Apples"',
                    'Pelafalan "Mangoes" menjadi "Mangos"',
                ],
                assessment_indicators: [
                    'Menyebutkan 6 nama buah',
                    'Melafalkan "Strawberries" dengan benar',
                    'Menyebutkan buah dalam bentuk jamak',
                    'Menunjukkan buah nyata & menyebutkan nama',
                ],
                parent_tips: [
                    'Tunjukkan buah nyata & sebut nama Inggrisnya',
                    'Ajak menghitung buah di keranjang',
                    'Beri contoh pelafalan video',
                    'Buat "Fruit Chart"',
                ],
                extension_activities: [
                    'Buat "Fruit Salad" bersama',
                    'Kunjungi pasar buah',
                    'Nyanyikan "Fruit Song"',
                ],
                required_materials: ['Buah nyata di dapur atau kartu bergambar buah', 'Keranjang buah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Yummy in my tummy! Today we explore delicious juicy fruits!"',
                    ice_breaker: 'Kupas Pisang Berirama: Gerakan mengupas pisang "Peel banana, peel peel banana... EAT BANANA!"',
                    apperception: 'Tunjukkan buah pisang dan apel: "Buah apa ini yang paling sering kita makan untuk sarapan?"',
                    trigger_question: 'What is your favorite sweet fruit on the dining table?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata buah bentuk jamak: Apples, Mangoes, Oranges, Bananas, Strawberries, Watermelons.',
                    concrete_steps: [
                        'Tunjukkan buah pisang: "Bananas... yellow bananas."',
                        'Tunjukkan mangga: "Mangoes... sweet mangoes."',
                        'Tunjukkan semangka: "Watermelons... big watermelons."',
                        'Tunjukkan stroberi: "Strawberries... red strawberries."',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Lihat buah-buah berwarna cerah: Red apples, yellow bananas, dan green watermelons!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Pasar Buah Segar (Fresh Fruit Market)',
                    game_rules: [
                        'Tata buah-buahan di atas piring sebagai stan toko buah.',
                        'Ayah menjadi pembeli: "Can I have two bananas, please?".',
                        'Anak menyerahkan buah sambil menyebutkan: "Here are two bananas!"',
                        'Jika salah menyebut buah, anak harus menirukan suara hewan lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengambil buah sesuai nama yang diucapkan.',
                        child_level_advanced: 'Menghitung total buah pesanan dan menyebutkan warnanya.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghubungkan gambar buah dengan kata yang tepat pada LKPD Unit 12 (p. 106).',
                    worksheet_print_ready: {
                        title: 'LKPD 12.1: DELICIOUS FRUITS',
                        instructions: 'Draw a line to match the fruit picture with the correct sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the fruit with its English name:',
                                data: {
                                    pairs: [
                                        { left: '🍌 Yellow fruit', right: 'Banana' },
                                        { left: '🍉 Big green fruit', right: 'Watermelon' },
                                        { left: '🍓 Red seeded fruit', right: 'Strawberry' },
                                    ],
                                },
                                answer_key: 'Pisang → Banana; Semangka → Watermelon; Stroberi → Strawberry',
                                explanation: 'Pemasangan gambar buah dengan namanya.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the basket of red apples. What fruit is this?',
                                data: { icon: '🍎', subtitle: 'Juicy red fruit', options: ['Apples', 'Mangoes'] },
                                answer_key: 'Apples',
                                explanation: 'Buah apel adalah apples.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Fruit that is big and green outside, red inside is [ ... ] (watermelon / orange)',
                                answer_key: 'watermelon',
                                explanation: 'Semangka adalah watermelon.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: A - P - P - L - E',
                                answer_key: 'apple',
                                explanation: 'Menebalkan kata apple.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Small red fruit with tiny seeds on its skin is [ ... ] (strawberry / mango)',
                                answer_key: 'strawberry',
                                explanation: 'Stroberi adalah strawberry.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Buah apa yang paling banyak kamu makan di rumah?',
                        'Apa warna pisang yang sudah matang?',
                        'Bagaimana cara melafalkan "Strawberries" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil menjodohkan garis gambar buah pada LKPD 12.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 23: Fruits Vocabulary',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari buah "Pisang" adalah...', option_a: 'Banana', option_b: 'Apple', option_c: 'Mango', option_d: 'Orange', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari buah "Semangka" adalah...', option_a: 'Watermelon', option_b: 'Strawberry', option_c: 'Orange', option_d: 'Banana', correct_answer: 'A' },
                            { question_text: 'Buah yang berwarna oranye dan banyak mengandung vitamin C adalah...', option_a: 'Orange', option_b: 'Apple', option_c: 'Banana', option_d: 'Watermelon', correct_answer: 'A' },
                            { question_text: 'Arti kata "Mangoes" dalam bahasa Indonesia adalah...', option_a: 'Mangga', option_b: 'Apel', option_c: 'Pisang', option_d: 'Jeruk', correct_answer: 'A' },
                            { question_text: 'Buah kecil berwarna merah berbintik manis adalah...', option_a: 'Strawberry', option_b: 'Watermelon', option_c: 'Banana', option_d: 'Mango', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 24: He Has / She Has Some Fruits',
                order_index: 2,
                learning_objectives: 'Students are able to construct sentences using "He has [fruits]" and "She has [fruits]" with correct third-person singular verb agreement.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kata Kerja "Has" untuk Orang Ketiga',
                    linguisticFocus: 'Third-person singular: He has / She has',
                    vocabulary: ['Has', 'He has', 'She has', 'Fruits'],
                    patterns: ['He has [fruits]', 'She has [fruits]'],
                    languageFunction: 'Menyatakan kepemilikan orang lain dengan kata kerja "has"',
                    pronunciation: [
                        { word: 'Has', ipa: '/hæz/', tip: 'bunyi "haz" dengan z jelas di akhir' },
                        { word: 'He has', ipa: '/hiː hæz/', tip: 'sambungkan "hi-haz"' },
                        { word: 'She has', ipa: '/ʃiː hæz/', tip: 'sambungkan "shi-haz"' },
                    ],
                    realContext: [
                        'Anak bercerita: "Made has five mangoes."',
                        'Anak menyebut kepemilikan: "Cici has eight bananas."',
                        'Anak mengamati gambar: "She has ten strawberries."',
                        'Anak membandingkan: "I have 3, but he has 5."',
                    ],
                    indicators: [
                        'Menggunakan "has" untuk He/She',
                        'Membedakan "have" (I/You) vs. "has" (He/She)',
                        'Melafalkan "has" dengan bunyi /hæz/',
                        'Menyusun kalimat lengkap dengan "has"',
                    ],
                    parentTips: [
                        'Beri contoh kalimat He has / She has',
                        'Bandingkan dengan I have untuk memperjelas',
                        'Ajak anak mengamati gambar & buat kalimat',
                        'Gunakan benda nyata sebagai alat peraga',
                        'Rayakan setiap keberhasilan menyusun kalimat',
                    ],
                    difficulties: [
                        { issue: 'Menyebut "He have" bukan "He has"', solution: 'beri ritme tepukan: HE (tepuk) HAS (tepuk)' },
                        { issue: 'Pelafalan "Has" menjadi "Haf"', solution: 'tekankan bunyi "z" di akhir' },
                        { issue: 'Bingung kapan pakai have/has', solution: 'beri rumus: I/You = have, He/She = has' },
                        { issue: 'Lupa menambahkan -s pada buah', solution: 'beri isyarat desis di akhir kata' },
                    ],
                    extensions: [
                        'Buat kalimat "He has / She has" tentang anggota keluarga',
                        'Bandingkan "I have 5 vs. He has 3" dengan buah nyata',
                        'Nyanyikan "Has and Have" song',
                    ],
                }),
                linguistic_focus: 'Third-person singular with "has"',
                pronunciation_guide: 'Has /hæz/, He has /hiː hæz/, She has /ʃiː hæz/',
                cultural_context: 'Kata kerja "have" berubah menjadi "has" untuk subjek orang ketiga tunggal (He/She/It). Ini adalah salah satu aturan tata bahasa Inggris paling penting yang harus dikuasai sejak dini.',
                common_difficulties: [
                    'Menyebut "He have" bukan "He has"',
                    'Pelafalan "Has" menjadi "Haf"',
                    'Bingung kapan pakai have/has',
                    'Lupa menambahkan -s pada buah',
                ],
                assessment_indicators: [
                    'Menggunakan "has" untuk He/She',
                    'Membedakan "have" vs. "has"',
                    'Melafalkan "has" dengan /hæz/',
                    'Menyusun kalimat lengkap dengan "has"',
                ],
                parent_tips: [
                    'Beri contoh He has / She has',
                    'Bandingkan dengan I have',
                    'Ajak mengamati gambar & buat kalimat',
                    'Gunakan benda nyata sebagai alat peraga',
                ],
                extension_activities: [
                    'Buat kalimat He has/She has tentang keluarga',
                    'Bandingkan I have vs. He has',
                    'Nyanyikan "Has and Have"',
                ],
                required_materials: ['Keranjang buah mainan', 'Kartu tokoh anak laki-laki & perempuan', 'Buah nyata'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at Made and Cici with their fruit baskets! Who has the sweet apples?"',
                    ice_breaker: 'Tepuk Have & Has: Ayah sebut "I" anak teriak "HAVE!", Ayah sebut "He / She" anak teriak "HAS!"',
                    apperception: 'Bandingkan: "Kalau saya punya buku kita bilang I have. Kalau dia anak laki-laki punya buku, kita bilang apa?"',
                    trigger_question: 'Do we say "He have apples" or "He has apples"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perbedaan penggunaan Have vs Has: I have, You have, tetapi He HAS dan She HAS.',
                    concrete_steps: [
                        'Beri Made gambar 7 apel → "He has seven apples."',
                        'Beri Cici gambar 10 stroberi → "She has ten strawberries."',
                        'Beri Aisyah 6 jeruk → "She has six oranges."',
                        'Tekankan bunyi akhiran /z/ pada kata HAS.',
                        'Ulangi 3x dengan tokoh berbeda.',
                    ],
                    script_parent: '"He has, She has. Saat bicara tentang orang lain, gunakan HAS!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Keranjang Buah Rahasia (Who Has the Fruit?)',
                    game_rules: [
                        'Sembunyikan kartu buah di belakang punggung anggota keluarga.',
                        'Anak menebak keranjang: "He has mangoes!" atau "She has bananas!".',
                        'Buka kartu bersama dan buktikan kebenarannya.',
                        'Jika salah, anak harus menyebutkan kalimat "He has... She has..." dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan "He has..." atau "She has..." dengan kartu bantu.',
                        child_level_advanced: 'Menghitung jumlah spesifik buah dalam keranjang (e.g. She has eight strawberries).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melengkapi kalimat "He has..." / "She has..." pada LKPD Unit 12 (p. 108).',
                    worksheet_print_ready: {
                        title: 'LKPD 12.2: HE HAS AND SHE HAS FRUITS',
                        instructions: 'Complete the sentences based on the picture and read them aloud.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Made has a basket of 5 mangoes. What is the correct sentence?',
                                data: { icon: '🥭', subtitle: 'Made (Boy)', options: ['He has five mangoes', 'She has five mangoes'] },
                                answer_key: 'He has five mangoes',
                                explanation: 'Made anak laki-laki menggunakan He has five mangoes.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Cici has a basket of 8 bananas. What is the correct sentence?',
                                data: { icon: '🍌', subtitle: 'Cici (Girl)', options: ['She has eight bananas', 'He has eight bananas'] },
                                answer_key: 'She has eight bananas',
                                explanation: 'Cici anak perempuan menggunakan She has eight bananas.',
                            },
                            {
                                id: 3,
                                type: 'PICT_COUNT',
                                question: 'Count the strawberries: She has [ ... ] (ten strawberries / two apples)',
                                data: { total: 10, icon: '🍓' },
                                answer_key: 'ten strawberries',
                                explanation: 'Sepuluh stroberi: ten strawberries.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Grammar check: "He [ ... ] seven apples." (has / have)',
                                answer_key: 'has',
                                explanation: 'Subjek orang ketiga tunggal He menggunakan kata has.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your own family: "My father has [ ... ]" (Example: four oranges / three watermelons)',
                                answer_key: 'four oranges',
                                explanation: 'Membuat kalimat kepemilikan buah ayah di rumah.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa perbedaan antara "I have" dan "She has"?',
                        'Buah apa yang ayahmu miliki di dapur?',
                        'Bagaimana cara melafalkan "has" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "He has five mangoes, and she has eight bananas!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 24: Using Has for Third Person',
                        quiz_questions: [
                            { question_text: 'Kata kerja kepemilikan yang tepat untuk subjek "He" adalah...', option_a: 'Have', option_b: 'Has', option_c: 'Are', option_d: 'Am', correct_answer: 'B' },
                            { question_text: 'Kata kerja kepemilikan yang tepat untuk subjek "She" adalah...', option_a: 'Has', option_b: 'Have', option_c: 'Do', option_d: 'You', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Joshua [ ... ] six oranges."', option_a: 'has', option_b: 'have', option_c: 'are', option_d: 'am', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "She has ten strawberries" adalah...', option_a: 'Dia (perempuan) memiliki sepuluh stroberi', option_b: 'Saya memiliki sepuluh stroberi', option_c: 'Kamu memiliki sepuluh stroberi', option_d: 'Dia menyukai sepuluh apel', correct_answer: 'A' },
                            { question_text: 'Manakah kalimat bahasa Inggris yang paling tepat?', option_a: 'He has seven apples', option_b: 'He have seven apples', option_c: 'She have one apple', option_d: 'I has two apples', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 13: I LIKE FRUITS
    // ===========================================================================
    {
        chapter_number: 13,
        title: 'Unit 13: I Like Fruits',
        target_semester: 2,
        week_target: 25,
        lessons: [
            {
                title: 'Meeting 25: Expressing Fruit Preferences (I like... & Do you like...?)',
                order_index: 1,
                learning_objectives: 'Students are able to express their favorite fruits using "I like [fruit]" and ask others "Do you like [fruit]?".',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Menyatakan Kesukaan Buah',
                    linguisticFocus: 'Expressing likes: I like... & Do you like...?',
                    vocabulary: ['Like', 'I like', 'Do you like'],
                    patterns: ['I like [fruit]', 'Do you like [fruit]?', 'Yes, I like / No, I don\'t like'],
                    languageFunction: 'Menyatakan kesukaan pribadi & menanyakan kesukaan orang lain',
                    pronunciation: [
                        { word: 'Like', ipa: '/laɪk/', tip: 'bunyi "laik" dengan vokal panjang & k jelas' },
                        { word: 'I like', ipa: '/aɪ laɪk/', tip: 'sambungkan "ai-laik"' },
                        { word: 'Do you like', ipa: '/duː juː laɪk/', tip: 'pisahkan tiga kata dengan jelas' },
                    ],
                    realContext: [
                        'Anak menyatakan kesukaan: "I like strawberries!"',
                        'Anak bertanya ke teman: "Do you like mangoes?"',
                        'Anak menjawab: "Yes, I like oranges."',
                        'Anak menyatakan tidak suka: "No, I don\'t like bananas."',
                    ],
                    indicators: [
                        'Menyatakan kesukaan dengan "I like [fruit]"',
                        'Bertanya dengan "Do you like [fruit]?"',
                        'Menjawab "Yes, I like" atau "No, I don\'t like"',
                        'Melafalkan "Like" dengan /laɪk/',
                    ],
                    parentTips: [
                        'Tanyakan kesukaan anak setiap hari',
                        'Beri contoh kalimat I like / Do you like',
                        'Ajak anak membuat survei buah favorit keluarga',
                        'Beli buah favorit anak untuk merayakan',
                        'Beri apresiasi setiap keberhasilan menyatakan kesukaan',
                    ],
                    difficulties: [
                        { issue: 'Menyebut "I likes" bukan "I like"', solution: 'tegaskan I selalu pakai like (tanpa s)' },
                        { issue: 'Bingung respon Yes/No', solution: 'beri gerakan: Yes = jempol, No = silang tangan' },
                        { issue: 'Pelafalan "Like" menjadi "Lek"', solution: 'tekankan vokal panjang "laik"' },
                        { issue: 'Lupa menambahkan -s pada buah', solution: 'beri isyarat desis' },
                    ],
                    extensions: [
                        'Buat "Fruit Preference Chart" keluarga',
                        'Kunjungi pasar buah & tanyakan kesukaan pedagang',
                        'Nyanyikan "I Like Fruits" song',
                    ],
                }),
                linguistic_focus: 'Expressing likes & preferences',
                pronunciation_guide: 'Like /laɪk/, I like /aɪ laɪk/, Do you like /duː juː laɪk/',
                cultural_context: 'Menyatakan kesukaan pribadi adalah bagian penting dari percakapan sehari-hari di budaya Barat. Anak-anak diajarkan untuk berani menyatakan preferensi mereka dengan sopan.',
                common_difficulties: [
                    'Menyebut "I likes" bukan "I like"',
                    'Bingung respon Yes/No',
                    'Pelafalan "Like" menjadi "Lek"',
                    'Lupa menambahkan -s pada buah',
                ],
                assessment_indicators: [
                    'Menyatakan kesukaan dengan "I like [fruit]"',
                    'Bertanya dengan "Do you like [fruit]?"',
                    'Menjawab "Yes, I like" / "No, I don\'t like"',
                    'Melafalkan "Like" dengan /laɪk/',
                ],
                parent_tips: [
                    'Tanyakan kesukaan anak setiap hari',
                    'Beri contoh kalimat I like',
                    'Ajak buat survei buah favorit',
                    'Beli buah favorit untuk merayakan',
                ],
                extension_activities: [
                    'Buat "Fruit Preference Chart"',
                    'Kunjungi pasar buah',
                    'Nyanyikan "I Like Fruits"',
                ],
                required_materials: ['Kartu emoji jempol suka (Thumbs up like)', 'Buah nyata', 'Kertas survei'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Mmm... sweet fruits! Give me two big thumbs up if you like sweet watermelon!"',
                    ice_breaker: 'Chant Kesukaan Buah: "I like apples, crunch crunch crunch! I like bananas, munch munch munch!"',
                    apperception: 'Tanyakan: "Buah apa yang paling kamu sukai di dunia? Bagaimana mengatakannya dalam bahasa Inggris?"',
                    trigger_question: 'What do you say when you love eating mangoes?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola kalimat kesukaan pribadi: I like + [Nama Buah]. Pertanyaan: Do you like + [Nama Buah]?',
                    concrete_steps: [
                        'Ucapkan sambil tersenyum menunjukkan jempol: "I like apples."',
                        'Ajarkan bertanya ke orang lain: "Do you like orange, Cici?".',
                        'Ajarkan respon: "Yes, I like orange!" atau "No, I don\'t like orange."',
                        'Praktikkan dengan berbagai nama buah.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Tunjukkan senyum besar dan ucapkan: I like strawberries because they are sweet!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sensus Buah Favorit Keluarga (Do You Like...?)',
                    game_rules: [
                        'Anak membawa kartu gambar buah keliling rumah.',
                        'Bertanya kepada Ayah: "Do you like watermelon, Dad?".',
                        'Ayah menjawab: "Yes, I do!". Anak memberi tanda centang di kolom tabel buah semangka.',
                        'Setelah selesai, anak melaporkan: "Dad likes watermelon. Mom likes mangoes."',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Bertanya menggunakan 1 nama buah dengan bantuan kartu.',
                        child_level_advanced: 'Mewawancarai dan menceritakan alasan kesukaan (e.g. It is sweet and cold).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencatat survei buah kesukaan pada tabel LKPD Unit 13 (p. 122).',
                    worksheet_print_ready: {
                        title: 'LKPD 13.1: I LIKE FRUITS SURVEY',
                        instructions: 'Ask your family members about their favorite fruits and put a tick (√).',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'You love sweet red apples. What do you say with a thumbs up?',
                                data: { icon: '🍎', subtitle: 'Thumbs up preference', options: ['I like apples', 'I like shoes'] },
                                answer_key: 'I like apples',
                                explanation: 'Menyatakan kesukaan buah apel: I like apples.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Question: "Do you like bananas?". If you love bananas, what is your answer?',
                                data: { icon: '🍌', subtitle: 'Favorite fruit', options: ['Yes, I like bananas', 'No, goodbye'] },
                                answer_key: 'Yes, I like bananas',
                                explanation: 'Jawaban bila menyukai buah adalah Yes, I like bananas.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the question with the response:',
                                data: {
                                    pairs: [
                                        { left: '❓ "Do you like orange?"', right: 'Yes, I like orange' },
                                        { left: '❓ "Do you like mango?"', right: "No, I don't like mango" },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai respon tanya jawab',
                                explanation: 'Pola tanya jawab kesukaan buah.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: L - I - K - E',
                                answer_key: 'like',
                                explanation: 'Latihan menulis kata like.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Draw your favorite fruit in the box and complete: "I like [ ... ]"',
                                answer_key: 'Nama buah favorit siswa',
                                explanation: 'Mengekspresikan kesukaan buah secara personal.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Buah apa yang paling kamu sukai?',
                        'Apakah ibumu menyukai buah yang sama denganmu?',
                        'Bagaimana cara melafalkan "Like" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "Hello! My name is [Name], and I like [your favorite fruit]!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 25: Expressing Preferences (I like...)',
                        quiz_questions: [
                            { question_text: 'Arti dari kata "like" pada kalimat "I like apples" adalah...', option_a: 'Melihat', option_b: 'Suka / gemar', option_c: 'Membeli', option_d: 'Memotong', correct_answer: 'B' },
                            { question_text: 'Kalimat bahasa Inggris untuk "Saya suka semangka" adalah...', option_a: 'I like watermelon', option_b: 'I has watermelon', option_c: 'You are watermelon', option_d: 'I like book', correct_answer: 'A' },
                            { question_text: 'Pertanyaan untuk menanyakan apakah teman menyukai jeruk adalah...', option_a: 'Do you like orange?', option_b: 'What is orange?', option_c: 'Where is orange?', option_d: 'How are you orange?', correct_answer: 'A' },
                            { question_text: 'Jika teman bertanya "Do you like bananas?" dan kamu menyukainya, kamu menjawab...', option_a: 'Yes, I like bananas', option_b: 'Goodbye banana', option_c: 'I am fine', option_d: 'No thank you', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "I [ ... ] sweet strawberries."', option_a: 'like', option_b: 'am', option_c: 'is', option_d: 'you', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 26: Stating Others\' Preferences (He likes / She likes fruits)',
                order_index: 2,
                learning_objectives: 'Students are able to report other people\'s preferences using "He likes [fruit]" and "She likes [fruit]".',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Kata Kerja "Likes" untuk Orang Ketiga',
                    linguisticFocus: 'Third-person singular: He likes / She likes',
                    vocabulary: ['Likes', 'He likes', 'She likes'],
                    patterns: ['He likes [fruit]', 'She likes [fruit]'],
                    languageFunction: 'Melaporkan kesukaan orang lain dengan kata kerja "likes"',
                    pronunciation: [
                        { word: 'Likes', ipa: '/laɪks/', tip: 'bunyi "laiks" dengan s jelas di akhir' },
                        { word: 'He likes', ipa: '/hiː laɪks/', tip: 'sambungkan "hi-laiks"' },
                        { word: 'She likes', ipa: '/ʃiː laɪks/', tip: 'sambungkan "shi-laiks"' },
                    ],
                    realContext: [
                        'Anak bercerita: "Aisyah likes apples."',
                        'Anak melaporkan: "Made likes mangoes."',
                        'Anak menyebut kesukaan guru: "Miss Rahma likes strawberries."',
                        'Anak bercerita tentang keluarga: "My brother likes bananas."',
                    ],
                    indicators: [
                        'Menggunakan "likes" untuk He/She',
                        'Membedakan "like" (I) vs. "likes" (He/She)',
                        'Melafalkan "Likes" dengan bunyi /laɪks/',
                        'Melaporkan kesukaan orang lain',
                    ],
                    parentTips: [
                        'Ajak anak melaporkan kesukaan anggota keluarga',
                        'Beri contoh He likes / She likes',
                        'Bandingkan dengan I like untuk memperjelas',
                        'Buat "Family Preference Chart"',
                        'Rayakan setiap keberhasilan melaporkan',
                    ],
                    difficulties: [
                        { issue: 'Menyebut "He like" bukan "He likes"', solution: 'beri ritme tepukan: HE (tepuk) LIKES (tepuk)' },
                        { issue: 'Pelafalan "Likes" menjadi "Laik"', solution: 'tekankan bunyi "s" di akhir' },
                        { issue: 'Bingung kapan pakai like/likes', solution: 'beri rumus: I/You = like, He/She = likes' },
                        { issue: 'Lupa menambahkan -s pada buah', solution: 'beri isyarat desis' },
                    ],
                    extensions: [
                        'Buat "Preference Chart" keluarga dengan stiker',
                        'Ajak anak mewawancarai teman & melaporkan kesukaan',
                        'Nyanyikan "He Likes, She Likes" song',
                    ],
                }),
                linguistic_focus: 'Third-person singular with "likes"',
                pronunciation_guide: 'Likes /laɪks/, He likes /hiː laɪks/, She likes /ʃiː laɪks/',
                cultural_context: 'Sama seperti "has", kata kerja "like" juga berubah menjadi "likes" untuk subjek He/She/It. Aturan penambahan -s ini berlaku untuk hampir semua kata kerja bahasa Inggris pada subjek orang ketiga tunggal.',
                common_difficulties: [
                    'Menyebut "He like" bukan "He likes"',
                    'Pelafalan "Likes" menjadi "Laik"',
                    'Bingung kapan pakai like/likes',
                    'Lupa menambahkan -s pada buah',
                ],
                assessment_indicators: [
                    'Menggunakan "likes" untuk He/She',
                    'Membedakan "like" vs. "likes"',
                    'Melafalkan "Likes" dengan /laɪks/',
                    'Melaporkan kesukaan orang lain',
                ],
                parent_tips: [
                    'Ajak melaporkan kesukaan keluarga',
                    'Beri contoh He likes / She likes',
                    'Bandingkan dengan I like',
                    'Buat "Family Preference Chart"',
                ],
                extension_activities: [
                    'Buat "Preference Chart" keluarga',
                    'Wawancarai teman & laporkan',
                    'Nyanyikan "He Likes, She Likes"',
                ],
                required_materials: ['Gambar tokoh Made, Cici, Aisyah memegang buah favorit', 'Kartu buah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we report our friends\' favorite fruits to the world!"',
                    ice_breaker: 'Tepuk Desis Suka: "I like!" (tepuk paha), "He likes!" (desis Sssss di akhir kata).',
                    apperception: 'Ingat kembali: Cici suka jeruk, Made suka semangka. Bagaimana menceritakannya?',
                    trigger_question: 'Do we say "She like" or "She likes"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perubahan tata bahasa preferensi: I like, You like, tetapi He LIKES dan She LIKES.',
                    concrete_steps: [
                        'Tunjukkan gambar Aisyah memakan apel → "She likes apple."',
                        'Tunjukkan gambar Made memakan mangga → "He likes mango."',
                        'Tunjukkan gambar Cici membawa jeruk → "She likes orange."',
                        'Tegaskan bunyi desis -s pada kata LIKES.',
                        'Ulangi 3x dengan tokoh berbeda.',
                    ],
                    script_parent: '"Tambahkan \'s\' saat bicara tentang dia: He likes mango, She likes apple!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Teka-Teki Tebak Buah Kesukaan Sahabat',
                    game_rules: [
                        'Ayah menunjukkan kartu tokoh di buku.',
                        'Anak mengamati buah yang dipegang tokoh lalu berseru cepat:',
                        '"Aisyah is a girl, she likes apple!" atau "Made is a boy, he likes watermelon!"',
                        'Jika salah menyebutkan like/likes, anak harus mengulang sambil melompat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan "She likes..." dengan panduan gambar.',
                        child_level_advanced: 'Menceritakan buah kesukaan seluruh anggota keluarga dalam 3 kalimat berurutan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melingkari buah kesukaan tokoh pada LKPD Unit 13 (Listen and circle p. 122-123).',
                    worksheet_print_ready: {
                        title: 'LKPD 13.2: HE LIKES AND SHE LIKES FRUITS',
                        instructions: 'Listen to the audio sentences and circle the right fruit for each person.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Audio Script: "Aisyah likes apple". Circle the right fruit for Aisyah:',
                                data: { icon: '🍎', subtitle: 'Aisyah\'s favorite fruit', options: ['Apple', 'Banana'] },
                                answer_key: 'Apple',
                                explanation: 'Aisyah menyukai buah apel (apple).',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Audio Script: "Joshua likes watermelon". Circle the fruit for Joshua:',
                                data: { icon: '🍉', subtitle: 'Joshua\'s favorite fruit', options: ['Watermelon', 'Orange'] },
                                answer_key: 'Watermelon',
                                explanation: 'Joshua menyukai buah semangka (watermelon).',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the person with the fruit preference sentence:',
                                data: {
                                    pairs: [
                                        { left: '👦 Made', right: 'He likes mango' },
                                        { left: '👧 Cici', right: 'She likes orange' },
                                    ],
                                },
                                answer_key: 'Made → He likes mango; Cici → She likes orange',
                                explanation: 'Menjodohkan tokoh dengan buah kesukaannya.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Grammar check: "He [ ... ] bananas." (likes / like)',
                                answer_key: 'likes',
                                explanation: 'Subjek He menggunakan kata kerja berakhiran -s (likes).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Report what your mother likes: "My mother is a woman. She [ ... ] sweet oranges." (likes / like)',
                                answer_key: 'likes',
                                explanation: 'Ibu (She) menggunakan kata kerja likes.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kata "like" berubah menjadi "likes" untuk he dan she?',
                        'Buah apa yang disukai sahabatmu?',
                        'Bagaimana cara melafalkan "likes" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil lingkaran buah kesukaan tokoh pada LKPD 13.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 26: He Likes and She Likes Fruits',
                        quiz_questions: [
                            { question_text: 'Bentuk kata "like" yang tepat untuk subjek "He" adalah...', option_a: 'Likes', option_b: 'Like', option_c: 'Is like', option_d: 'Are like', correct_answer: 'A' },
                            { question_text: 'Bentuk kata "like" yang tepat untuk subjek "She" adalah...', option_a: 'Likes', option_b: 'Like', option_c: 'Am like', option_d: 'Liking', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Cici [ ... ] sweet strawberries."', option_a: 'likes', option_b: 'like', option_c: 'have', option_d: 'is', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "He likes bananas" adalah...', option_a: 'Dia (laki-laki) menyukai pisang', option_b: 'Dia menyukai apel', option_c: 'Saya suka pisang', option_d: 'Kamu suka pisang', correct_answer: 'A' },
                            { question_text: 'Manakah kalimat bahasa Inggris yang benar tata bahasanya?', option_a: 'She likes orange', option_b: 'She like orange', option_c: 'He are like orange', option_d: 'I likes orange', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // ===========================================================================
    // UNIT 14: COMPREHENSIVE REVIEW & GRADUATION
    // ===========================================================================
    {
        chapter_number: 14,
        title: 'Comprehensive Review & Graduation',
        target_semester: 2,
        week_target: 27,
        lessons: [
            {
                title: 'Meeting 27: Semester 1 Review (Greetings, Names, Numbers 1-10, Shapes, Colors)',
                order_index: 1,
                learning_objectives: 'Students demonstrate fluency in recalling vocabulary from Semester 1: greetings, numbers 1-10, colors, and 2D shapes.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Review Semester 1 & Penguatan Materi',
                    linguisticFocus: 'Review of Semester 1 vocabulary & expressions',
                    vocabulary: ['Greetings', 'Numbers 1-10', 'Colors', 'Shapes', 'Self-introduction'],
                    patterns: ['Good morning', 'I am [name]', 'It is [number/color/shape]'],
                    languageFunction: 'Mengulang & mempraktikkan seluruh kosa kata semester 1',
                    pronunciation: [
                        { word: 'Review', ipa: '/rɪˈvjuː/', tip: 'tekan suku kata kedua ri-VYU' },
                        { word: 'Greeting', ipa: '/ˈɡriː.tɪŋ/', tip: 'tekan suku kata pertama GREE-ting' },
                        { word: 'Vocabulary', ipa: '/vəˈkæb.jə.lər.i/', tip: 'tekan suku kata kedua vo-CAB-u-lary' },
                    ],
                    realContext: [
                        'Anak menyapa keluarga pagi: "Good morning, everyone!"',
                        'Anak memperkenalkan diri: "Hi, I am [name]!"',
                        'Anak menyebut bentuk benda: "The clock is a circle."',
                        'Anak menyebut warna: "My shirt is red."',
                    ],
                    indicators: [
                        'Menyebutkan sapaan pagi & siang',
                        'Memperkenalkan diri dengan "I am [name]"',
                        'Menyebutkan angka 1-10',
                        'Mengidentifikasi warna & bentuk dasar',
                    ],
                    parentTips: [
                        'Ulangi semua materi semester 1 dengan lagu',
                        'Beri kuis ringan setiap hari',
                        'Rayakan setiap keberhasilan ingatan anak',
                        'Buat "Champion Chart" berisi cap untuk setiap materi yang dikuasai',
                        'Persiapkan hadiah kecil untuk perayaan semester 1',
                    ],
                    difficulties: [
                        { issue: 'Lupa materi lama setelah belajar materi baru', solution: 'buat review mingguan dengan lagu' },
                        { issue: 'Tertukar antara beberapa warna', solution: 'fokus pada 2 warna berbeda per hari' },
                        { issue: 'Malu menunjukkan kemampuan', solution: 'beri panggung kecil di rumah untuk perform' },
                        { issue: 'Kesulitan mengingat urutan angka', solution: 'latih dengan lagu & gerakan tangan' },
                    ],
                    extensions: [
                        'Buat "Semester 1 Champion Book" berisi capaian anak',
                        'Rayakan dengan pesta kecil di rumah',
                        'Ajak anak mengajar adik/keluarga materi yang sudah dikuasai',
                    ],
                }),
                linguistic_focus: 'Comprehensive review of Semester 1',
                pronunciation_guide: 'Review /rɪˈvjuː/, Greeting /ˈɡriː.tɪŋ/, Vocabulary /vəˈkæb.jə.lər.i/',
                cultural_context: 'Review atau pengulangan adalah teknik pembelajaran yang sangat efektif. Anak-anak di seluruh dunia belajar melalui pengulangan yang konsisten & menyenangkan.',
                common_difficulties: [
                    'Lupa materi lama setelah belajar materi baru',
                    'Tertukar antara beberapa warna',
                    'Malu menunjukkan kemampuan',
                    'Kesulitan mengingat urutan angka',
                ],
                assessment_indicators: [
                    'Menyebutkan sapaan pagi & siang',
                    'Memperkenalkan diri dengan "I am [name]"',
                    'Menyebutkan angka 1-10',
                    'Mengidentifikasi warna & bentuk dasar',
                ],
                parent_tips: [
                    'Ulangi semua materi semester 1 dengan lagu',
                    'Beri kuis ringan setiap hari',
                    'Rayakan setiap keberhasilan ingatan',
                    'Buat "Champion Chart"',
                ],
                extension_activities: [
                    'Buat "Semester 1 Champion Book"',
                    'Rayakan dengan pesta kecil',
                    'Ajak anak mengajar adik/keluarga',
                ],
                required_materials: ['Kartu angka, kartu warna, kartu bentuk geometri', 'Buku catatan capaian'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Welcome Champions to the Grand English Review! Show me how smart you are!"',
                    ice_breaker: 'Kuis Kilat 5 Detik: Ayah sebut kata Indonesia, anak sebut bahasa Inggris secepat kilat.',
                    apperception: 'Review kilat sapaan, warna favorit, dan bentuk lingkaran.',
                    trigger_question: 'Are you ready to win the Semester 1 Champion badge?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Sintesis konsep semester 1: Salam, Identitas Diri, Angka 1-10, Warna, dan Bentuk.',
                    concrete_steps: [
                        'Pos 1: Sapa ramah "Good morning, how are you?".',
                        'Pos 2: Hitung 1 sampai 10 dalam bahasa Inggris.',
                        'Pos 3: Sebutkan 3 warna (Red, Blue, Yellow).',
                        'Pos 4: Gambar bentuk di udara (Circle, Square, Triangle).',
                        'Beri stiker untuk setiap pos yang berhasil dilewati.',
                    ],
                    script_parent: '"Kamu sudah belajar begitu banyak kata bahasa Inggris! Banggalah pada dirimu sendiri!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Olimpiade Bahasa Inggris Cilik (English Star Quest)',
                    game_rules: [
                        'Selesaikan 4 pos tantangan bahasa Inggris di ruang tamu.',
                        'Tiap pos yang dijawab dengan benar dan percaya diri mendapatkan 1 stiker bintang emas.',
                        'Kumpulkan 4 stiker untuk mendapatkan hadiah kecil (permen, mainan, dll).',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyelesaikan 4 pos dengan bimbingan santai.',
                        child_level_advanced: 'Menyelesaikan 4 pos dalam waktu di bawah 60 detik.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengerjakan lembar latihan rangkuman semester 1.',
                    worksheet_print_ready: {
                        title: 'LKPD 14.1: GRAND REVIEW SEMESTER 1',
                        instructions: 'Match and choose the correct answer for each review question.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Morning greeting when meeting teacher at 07:00 AM:',
                                data: { icon: '🌅', subtitle: 'Sunrise time', options: ['Good morning', 'Goodbye'] },
                                answer_key: 'Good morning',
                                explanation: 'Sapaan pagi: Good morning.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Match the review item with its English category:',
                                data: {
                                    pairs: [
                                        { left: '🔢 Number 5', right: 'Five' },
                                        { left: '🎨 Grass color', right: 'Green' },
                                        { left: '⏰ Wall clock', right: 'Circle' },
                                    ],
                                },
                                answer_key: '5 → Five; Rumput → Green; Jam → Circle',
                                explanation: 'Rangkuman kosa kata angka, warna, dan bentuk.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Color of ripe apple is: [ ... ] (Red / Blue)',
                                answer_key: 'Red',
                                explanation: 'Apel berwarna merah (Red).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'A shape with 3 sharp corners is a [ ... ] (Triangle / Circle)',
                                answer_key: 'Triangle',
                                explanation: 'Bangun 3 sudut adalah segitiga (Triangle).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Introduce yourself: "Hello, my name is [ ... ]."',
                                answer_key: 'Nama Siswa',
                                explanation: 'Perkenalan diri lengkap.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Materi semester 1 mana yang paling kamu sukai?',
                        'Bisakah kamu menghitung dari 1 sampai 10 mundur?',
                        'Bagaimana perasaanmu setelah menyelesaikan semester 1?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar LKPD 14.1 yang sudah selesai kamu kerjakan!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 27: Semester 1 Comprehensive Review',
                        quiz_questions: [
                            { question_text: 'Sapaan yang diucapkan saat bertemu teman di pagi hari adalah...', option_a: 'Good morning', option_b: 'Good night', option_c: 'Goodbye', option_d: 'Good afternoon', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari angka 7 adalah...', option_a: 'Six', option_b: 'Seven', option_c: 'Eight', option_d: 'Nine', correct_answer: 'B' },
                            { question_text: 'Bangun datar yang memiliki 3 sudut tajam adalah...', option_a: 'Triangle', option_b: 'Circle', option_c: 'Square', option_d: 'Star', correct_answer: 'A' },
                            { question_text: 'Warna langit di siang hari yang cerah adalah...', option_a: 'Blue', option_b: 'Black', option_c: 'Yellow', option_d: 'Red', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "My name is Joshua" adalah...', option_a: 'Nama saya adalah Joshua', option_b: 'Kamu adalah Joshua', option_c: 'Saya punya Joshua', option_d: 'Sampai jumpa Joshua', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 28: Semester 2 Review & Phase A Graduation (Have/Has, Pets, Family, Fruits)',
                order_index: 2,
                learning_objectives: 'Students demonstrate comprehensive mastery of Grade 1 English (possessions, pets, family members, fruits, and preferences) and receive Phase A completion recognition.',
                content_text: buildContentText({
                    title: 'Fokus Pembelajaran: Review Semester 2 & Upacara Kelulusan Fase A',
                    linguisticFocus: 'Review of Semester 2 & graduation speech',
                    vocabulary: ['Have/Has', 'Pets', 'Family', 'Fruits', 'Preferences'],
                    patterns: ['I have / He has', 'I like / She likes', 'This is my [family]'],
                    languageFunction: 'Mendemonstrasikan penguasaan seluruh materi Fase A',
                    pronunciation: [
                        { word: 'Graduation', ipa: '/ˌɡrædʒ.uˈeɪ.ʃən/', tip: 'tekan suku kata ketiga gra-ju-EI-shen' },
                        { word: 'Congratulations', ipa: '/kənˌɡrætʃ.uˈleɪ.ʃənz/', tip: 'tekan suku kata keempat' },
                        { word: 'Achievement', ipa: '/əˈtʃiːv.mənt/', tip: 'tekan suku kata kedua a-CHIEVE-ment' },
                    ],
                    realContext: [
                        'Anak menyampaikan pidato perkenalan diri lengkap',
                        'Anak bercerita tentang hewan peliharaan',
                        'Anak menyebutkan anggota keluarga & buah favorit',
                        'Anak menerima sertifikat/pengakuan kelulusan Fase A',
                    ],
                    indicators: [
                        'Menyusun kalimat lengkap dengan have/has',
                        'Menyebutkan hewan peliharaan & keluarga',
                        'Menyatakan kesukaan buah dengan likes',
                        'Menyampaikan pidato perkenalan singkat 4-5 kalimat',
                    ],
                    parentTips: [
                        'Rayakan kelulusan Fase A dengan pesta kecil',
                        'Buat sertifikat kelulusan sendiri di rumah',
                        'Rekam video pidato kelulusan anak',
                        'Ajak anak mempresentasikan kemampuan ke keluarga besar',
                        'Persiapkan untuk Fase B dengan semangat positif',
                    ],
                    difficulties: [
                        { issue: 'Gugup saat tampil', solution: 'latih pidato di depan cermin berulang kali' },
                        { issue: 'Lupa alur pidato', solution: 'tulis outline di kertas kecil sebagai contekan' },
                        { issue: 'Tertukar have/has', solution: 'ingatkan rumus: I/You = have, He/She = has' },
                        { issue: 'Lupa bentuk jamak', solution: 'beri isyarat desis dengan jari' },
                    ],
                    extensions: [
                        'Buat video perkenalan lengkap untuk dikirim ke keluarga besar',
                        'Buat "My English Journey" book berisi capaian sepanjang tahun',
                        'Ajak anak mengajar adik kecil 3 kata bahasa Inggris',
                    ],
                }),
                linguistic_focus: 'Comprehensive review of Semester 2 & graduation',
                pronunciation_guide: 'Graduation /ˌɡrædʒ.uˈeɪ.ʃən/, Congratulations /kənˌɡrætʃ.uˈleɪ.ʃənz/, Achievement /əˈtʃiːv.mənt/',
                cultural_context: 'Di budaya Barat, kelulusan Fase A (setara dengan Grade 1) sering dirayakan dengan "graduation ceremony" kecil. Anak-anak memakai topi & toga sederhana dari kertas.',
                common_difficulties: [
                    'Gugup saat tampil',
                    'Lupa alur pidato',
                    'Tertukar have/has',
                    'Lupa bentuk jamak',
                ],
                assessment_indicators: [
                    'Menyusun kalimat lengkap dengan have/has',
                    'Menyebutkan hewan peliharaan & keluarga',
                    'Menyatakan kesukaan buah',
                    'Menyampaikan pidato perkenalan',
                ],
                parent_tips: [
                    'Rayakan kelulusan Fase A',
                    'Buat sertifikat kelulusan sendiri',
                    'Rekam video pidato anak',
                    'Ajak mempresentasikan kemampuan ke keluarga besar',
                ],
                extension_activities: [
                    'Buat video perkenalan lengkap',
                    'Buat "My English Journey" book',
                    'Ajak anak mengajar adik kecil',
                ],
                required_materials: ['Sertifikat kelulusan / medali bintang buatan sendiri', 'Topi toga kertas', 'Kamera untuk dokumentasi'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Congratulations Superstar! Today is our English Graduation Day! Stand proud!"',
                    ice_breaker: 'Yel-yel Juara: "I CAN SPEAK ENGLISH! YES, YES, YES!"',
                    apperception: 'Review singkat materi semester 2: Have/Has, Farm Animals, Family, dan Fruits.',
                    trigger_question: 'How many new English words have you mastered this whole year?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Sintesis semester 2: Kata kerja Have/Has, Nama Hewan Ternak, Anggota Keluarga, dan Frasa Suka Buah (Like/Likes).',
                    concrete_steps: [
                        'Latih kalimat kepemilikan: "I have a cat" / "She has apples".',
                        'Latih pengenalan keluarga: "This is my mother / father".',
                        'Latih ungkapan kesukaan: "I like sweet bananas".',
                        'Beri selamat atas ketuntasan belajar 1 tahun penuh.',
                        'Rayakan dengan tepuk tangan & sorakan keluarga.',
                    ],
                    script_parent: '"Kamu resmi menjadi lulusan Bahasa Inggris Kelas 1! Terus berbahasa Inggris setiap hari!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Panggung Pidato Bahasa Inggris Cilik (Graduation Speech)',
                    game_rules: [
                        'Anak berdiri di depan seluruh anggota keluarga seperti di atas panggung.',
                        'Anak membawakan pidato singkat:',
                        '"Hello! My name is [Name]. I am a boy/girl. I have [item]. I like fruits. Thank you and goodbye!"',
                        'Seluruh keluarga bertepuk tangan meriah dan mengalungkan medali juara.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membacakan 2 kalimat perkenalan dan kesukaan.',
                        child_level_advanced: 'Membawakan pidato 4-5 kalimat lancar tanpa teks contekan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengerjakan evaluasi formatif akhir tahun pada LKPD Unit 14.',
                    worksheet_print_ready: {
                        title: 'LKPD 14.2: PHASE A ENGLISH GRADUATION EVALUATION',
                        instructions: 'Read and complete the final graduation quiz with pride.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the animal and fruit with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '🐱 Cat', right: 'I have a cat' },
                                        { left: '🍎 Apple', right: 'She likes apple' },
                                        { left: '👨 Father', right: 'This is my father' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai pasangan tema semester 2',
                                explanation: 'Pemasangan kosa kata akhir tahun.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Yellow swimming animal with flat beak in Cici\'s farm:',
                                data: { icon: '🦆', subtitle: 'Pond animal', options: ['Duck', 'Rabbit'] },
                                answer_key: 'Duck',
                                explanation: 'Bebek adalah duck.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Word for ayah in English: [ ... ] (father / brother)',
                                answer_key: 'father',
                                explanation: 'Ayah adalah father.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "She [ ... ] apples." (likes / like)',
                                answer_key: 'likes',
                                explanation: 'Subjek She menggunakan likes.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Final Graduation Sentence: "I love learning [ ... ]!" (English / Sleep)',
                                answer_key: 'English',
                                explanation: 'Saya suka belajar bahasa Inggris.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu bangga bisa berbahasa Inggris tahun ini?',
                        'Hal menarik apa yang ingin kamu pelajari tahun depan di Kelas 2?',
                        'Apa kalimat bahasa Inggris favoritmu sepanjang tahun ini?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your final graduation speech: "Hello, my name is [Name]. I love learning English! Goodbye Grade 1!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 28: Phase A Final English Graduation',
                        quiz_questions: [
                            { question_text: 'Lengkapi kalimat kepemilikan untuk diri sendiri: "I [ ... ] two pencils."', option_a: 'have', option_b: 'has', option_c: 'is', option_d: 'are', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat kesukaan untuk dia perempuan: "She [ ... ] sweet mangoes."', option_a: 'likes', option_b: 'like', option_c: 'have', option_d: 'are', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari kata "Kakek" dan "Nenek" adalah...', option_a: 'Grandfather and Grandmother', option_b: 'Father and Mother', option_c: 'Brother and Sister', option_d: 'Boy and Girl', correct_answer: 'A' },
                            { question_text: 'Hewan peliharaan yang pandai melompat dan menyukai wortel adalah...', option_a: 'Rabbit', option_b: 'Duck', option_c: 'Fish', option_d: 'Bird', correct_answer: 'A' },
                            { question_text: 'Buah yang berwarna merah dan memiliki biji-biji kecil di kulitnya adalah...', option_a: 'Strawberry', option_b: 'Watermelon', option_c: 'Banana', option_d: 'Orange', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },
];

async function seedBahasaInggrisLengkap28Pertemuan() {
    console.log('================================================================');
    console.log('🇬🇧 SEEDING RESMI: BAHASA INGGRIS FASE A KELAS 1 (DETAIL & KOMPREHENSIF)');
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

    console.log('\n🧹 [2/3] Membersihkan data Mapel Bahasa Inggris lama jika ada...');

    const { data: existingSubject } = await supabase
        .from('subjects')
        .select('id')
        .eq('class_id', classId)
        .eq('name', 'Bahasa Inggris')
        .maybeSingle();

    let subjectId: string;

    if (existingSubject) {
        subjectId = existingSubject.id;
        console.log(`   ✓ Ditemukan Mapel Bahasa Inggris (ID: ${subjectId}). Menghapus modul lama...`);

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
        console.log('   ✓ Modul Bahasa Inggris lama berhasil dibersihkan.');
    } else {
        const { data: newSubject, error: subjErr } = await supabase
            .from('subjects')
            .insert({
                class_id: classId,
                name: 'Bahasa Inggris',
                code: 'ENG-1',
            })
            .select('id')
            .single();

        if (subjErr || !newSubject) {
            console.error('Gagal membuat mapel Bahasa Inggris:', subjErr?.message);
            process.exit(1);
        }
        subjectId = newSubject.id;
        console.log(`   ✓ Mata Pelajaran Bahasa Inggris baru terdaftar (ID: ${subjectId})`);
    }

    console.log('\n📚 [3/3] Menyimpan 14 Bab/Unit dan 28 Pertemuan Ajar (Detail & Komprehensif)...');

    let totalLessonsCreated = 0;
    let totalQuizzesCreated = 0;

    for (const chapter of CHAPTERS_DATA) {
        console.log(`\n📦 Menyimpan ${chapter.title} (Semester: ${chapter.target_semester}, Pekan: ${chapter.week_target})...`);

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
            console.error(`Gagal menyimpan unit ${chapter.title}:`, modErr?.message);
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
    console.log('🎉 SEEDING BAHASA INGGRIS BERHASIL 100%!');
    console.log(`Total ${totalLessonsCreated} Pertemuan Ajar dan ${totalQuizzesCreated} Kuis CBT tersimpan dengan konten DETAIL.`);
    console.log('================================================================\n');
}

seedBahasaInggrisLengkap28Pertemuan().catch((err) => {
    console.error('Terjadi kesalahan fatal saat seeding Bahasa Inggris:', err);
    process.exit(1);
});