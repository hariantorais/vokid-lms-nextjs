// data/bahasa-indonesia-batch-1.ts
// Bab 1-2: Huruf & Suku Kata (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

export interface SeedQuizQuestion {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
}

export interface SeedAssignment {
    type: 'PHOTO_HOMEWORK' | 'VOICE_TASK' | 'QUIZ_CBT';
    prompt: string;
    quiz_question_count?: number;
    passing_score?: number;
    quiz_questions?: SeedQuizQuestion[];
}

export interface SeedLkpdItem {
    id: string | number;
    type: string;
    question: string;
    answer_key?: string;
    explanation?: string;
    data?: Record<string, unknown>;
}

export interface SeedLessonItem {
    title: string;
    order_index: number;
    content_type: 'TEXT' | 'VIDEO' | 'AUDIO' | 'PDF';
    content_text: string;
    learning_objectives: string;
    allocated_minutes: number;
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
            section_a_basic: SeedLkpdItem[];
            section_b_enrichment: SeedLkpdItem[];
        };
        reflection_questions: string[];
    };
    assignments: SeedAssignment[];
}

export interface SeedModuleItem {
    title: string;
    order_index: number;
    target_semester: number;
    week_target: number;
    lessons: SeedLessonItem[];
}

// =============================================================================
// BAB 1: AYO KENALAN DENGAN HURUF AJAIB
// =============================================================================
const BAB_1: SeedModuleItem = {
    title: 'Bab 1: Ayo Kenalan dengan Huruf Ajaib',
    order_index: 1,
    target_semester: 1,
    week_target: 1,
    lessons: [
        {
            title: 'Pertemuan 1: Lima Huruf Vokal Ajaib (a-i-u-e-o)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal dan melafalkan 5 huruf vokal (a, i, u, e, o) dengan gembira serta menebalkan hurufnya.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu huruf vokal warna-warni',
                'Cermin kecil',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎵 Ayo Kenalan dengan 5 Huruf Ajaib!

Halo sahabat cilik! Hari ini **Maryam** dan **Asiya** akan mengajak kalian 
berkenalan dengan **5 huruf ajaib** yang bisa membuat mulut kita bernyanyi! 🎤✨

---

### 🌟 1. Lima Huruf Vokal Sahabat Kita

| Huruf | Bunyi Seru | Contoh Kata | Emoji |
| :---: | :--- | :--- | :---: |
| **a** | "Aaaa..." seperti kaget | **a**pi | 🔥 |
| **i** | "Iii..." seperti manis | **i**kan | 🐟 |
| **u** | "Uuu..." seperti hantu | **u**lar | 🐍 |
| **e** | "Eee..." seperti kambing | **e**nak | 🍽️ |
| **o** | "Ooo..." seperti kaget | **o**bat | 💊 |

---

### 🎭 Komik: Maryam & Asiya Belajar Vokal

\`\`\`text
  Maryam  : "Asiya, coba buka mulutmu lebar-lebar: Aaaa!" 👧
  Asiya   : "Iiii... seperti suara tikus kecil!" 👧
  Maheer  : "Uuuu... seperti suara hantu di malam hari!" 👦
  Fatimah : "Hahaha! Ternyata huruf vokal itu seru!" 👧
  Khadijah: "Betul! Vokal itu huruf yang bisa dibunyikan sendiri." 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Huruf vokal adalah **huruf yang bisa dibunyikan sendiri** tanpa bantuan 
huruf lain! Kalau mulutmu terbuka lebar, itu tanda vokal! 🎯

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **a**pi di dapur? 👉 Awal kata "api"! 🔥
* Ada **i**kan di kulkas? 👉 Awal kata "ikan"! 🐟
* Ada **u**lar di kebun? Semoga tidak! 😄 Awal kata "ular"! 🐍

Ayo jadi **Detektif Vokal** bersama Maryam & Asiya! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan 5 huruf ajaib yang bisa membuat mulut kita bernyanyi!',
                ice_breaker:
                    'Ayo buka mulut lebar-lebar: "Aaaa!" Sekarang senyum manis: "Iiii!" Seru, kan?',
                apperception:
                    'Coba sentuh lehermu saat bilang "Aaaa..." — terasa bergetar, kan? Itu tanda huruf vokal!',
                trigger_question:
                    'Ada berapa huruf vokal? Ayo kita hitung bersama Maryam dan Asiya!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Huruf vokal ada 5: a, i, u, e, o. Semuanya bisa dibunyikan sendiri.',
                concrete_steps: [
                    'Tunjukkan kartu huruf "a" warna merah. Ucapkan "aaa" sambil buka mulut lebar.',
                    'Tunjukkan kartu huruf "i" warna kuning. Ucapkan "iii" sambil senyum manis.',
                    'Tunjukkan kartu huruf "u" warna hijau. Ucapkan "uuu" sambil monyong.',
                    'Tunjukkan kartu huruf "e" warna biru. Ucapkan "eee" seperti kambing.',
                    'Tunjukkan kartu huruf "o" warna ungu. Ucapkan "ooo" sambil mulut bulat.',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Ayo sayang, buka mulut lebar-lebar seperti Maryam: Aaaa! Sekarang senyum manis seperti Asiya: Iiii!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Bunyi Vokal',
                game_rules: [
                    'Ibu/Bapak Guru menyebutkan contoh kata: "api", "ikan", "ular", "enak", "obat".',
                    'Anak menebak huruf vokal awalnya sambil tepuk tangan.',
                    'Yang paling cepat & benar dapat bintang emas ⭐.',
                    'Akhiri dengan menyanyikan lagu "A-I-U-E-O" bersama.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, cukup 3 huruf dulu (a, i, u).',
                    child_level_advanced:
                        'Menyebutkan kata lain yang diawali huruf vokal sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menebalkan huruf vokal dengan rapi.',
                worksheet_print_ready: {
                    title: 'LKPD 1.1: Lima Huruf Vokal Ajaib',
                    instructions:
                        'Tebalkan huruf vokal berikut, lalu warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf vokal berikut dengan pensil warna!',
                            data: {
                                letters: [
                                    { letter: 'a', word: 'api', icon: '🔥' },
                                    { letter: 'i', word: 'ikan', icon: '🐟' },
                                    { letter: 'u', word: 'ular', icon: '🐍' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf a, i, u dengan rapi.',
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
                            answer_key: 'Anak menebalkan huruf e, o dengan rapi.',
                            explanation: 'Melanjutkan pengenalan huruf vokal.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question: 'Bagaimana perasaanmu belajar huruf ajaib?',
                            data: {
                                question: 'Bagaimana perasaanmu belajar huruf ajaib?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Semangat' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Paham' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Ada berapa huruf vokal, sayang?',
                    'Huruf vokal apa yang paling mudah kamu ucapkan?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan 5 huruf vokal dengan suara ceria: a-i-u-e-o!',
                },
            ],
        },
        {
            title: 'Pertemuan 2: Huruf Konsonan Sahabat Vokal (b-c-d-k)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal dan melafalkan huruf konsonan b, c, d, k dengan benar serta menebalkan hurufnya.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu huruf konsonan warna-warni',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎈 Ayo Kenalan dengan Huruf Konsonan!

Kemarin kita sudah kenal **5 huruf vokal**. Hari ini **Maheer** dan **Fatimah** 
akan mengenalkan **4 huruf konsonan** yang jadi sahabat vokal! 🎉

---

### 🌟 1. Empat Huruf Konsonan Baru

| Huruf | Contoh Kata | Emoji | Bunyi Seru |
| :---: | :--- | :---: | :--- |
| **b** | **b**ola | ⚽ | "Beh..." seperti bola memantul |
| **c** | **c**angkir | ☕ | "Ceh..." seperti air dituang |
| **d** | **d**adu | 🎲 | "Deh..." seperti ketukan pintu |
| **k** | **k**ucing | 🐱 | "Keh..." seperti kucing batuk |

---

### 🎭 Komik: Maheer & Fatimah Cari Benda

\`\`\`text
  Maheer  : "Fatimah, aku lihat bola di halaman!" ⚽👦
  Fatimah : "Bola diawali huruf... b!" 👧✨
  Maheer  : "Betul! Sekarang aku lihat cangkir di dapur!" ☕
  Fatimah : "Cangkir diawali huruf... c!" 🎉
  Khadijah: "Wah, kalian sudah pandai konsonan!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Huruf konsonan adalah huruf yang **butuh bantuan vokal** supaya bisa 
dibunyikan! Coba bilang "b" saja — susah, kan? Tapi kalau "ba" — mudah! 🎯

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **b**ola? ⚽
* Ada **c**angkir? ☕
* Ada **d**adu? 🎲
* Ada **k**ucing? 🐱`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Kemarin kita kenal huruf vokal. Hari ini kita kenal huruf konsonan yang jadi sahabatnya!',
                ice_breaker:
                    'Ayo tirukan suara bola memantul: "Beh-beh-beh!" Sekarang suara kucing: "Keh-keh-meong!"',
                apperception:
                    'Coba pegang bolamu di rumah. Bola diawali huruf apa? Betul, "b"!',
                trigger_question:
                    'Apa bedanya huruf vokal dan huruf konsonan? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Huruf konsonan b, c, d, k butuh bantuan vokal untuk dibunyikan.',
                concrete_steps: [
                    'Tunjukkan kartu huruf "b". Ucapkan "beh" seperti bola memantul.',
                    'Tunjukkan kartu huruf "c". Ucapkan "ceh" seperti air dituang.',
                    'Tunjukkan kartu huruf "d". Ucapkan "deh" seperti ketukan pintu.',
                    'Tunjukkan kartu huruf "k". Ucapkan "keh" seperti kucing batuk.',
                    'Ulangi 3x dengan gerakan tubuh yang lucu.',
                ],
                script_parent:
                    '"Nah sayang, huruf b, c, d, k ini butuh teman vokal ya biar bisa dibunyikan!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Konsonan Ceria',
                game_rules: [
                    'Guru menyebutkan contoh kata: "bola", "cangkir", "dadu", "kucing".',
                    'Anak menebak huruf konsonan awalnya sambil melompat.',
                    'Yang paling cepat & benar dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, fokus 2 huruf dulu (b dan c).',
                    child_level_advanced:
                        'Menyebutkan kata lain yang diawali b-c-d-k sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menebalkan huruf konsonan dengan rapi.',
                worksheet_print_ready: {
                    title: 'LKPD 1.2: Huruf Konsonan Sahabat Vokal',
                    instructions:
                        'Tebalkan huruf konsonan berikut dan warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf konsonan berikut dengan pensil warna!',
                            data: {
                                letters: [
                                    { letter: 'b', word: 'bola', icon: '⚽' },
                                    { letter: 'c', word: 'cangkir', icon: '☕' },
                                    { letter: 'd', word: 'dadu', icon: '🎲' },
                                    { letter: 'k', word: 'kucing', icon: '🐱' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf b, c, d, k.',
                            explanation: 'Mengenal huruf konsonan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan huruf dengan gambar yang sesuai!',
                            data: {
                                pairs: [
                                    { left: '🔤 b', right: 'bola ⚽' },
                                    { left: '🔤 c', right: 'cangkir ☕' },
                                    { left: '🔤 d', right: 'dadu 🎲' },
                                    { left: '🔤 k', right: 'kucing 🐱' },
                                ],
                            },
                            answer_key: 'b→bola, c→cangkir, d→dadu, k→kucing.',
                            explanation: 'Menghubungkan huruf dengan gambar.',
                        },
                    ],
                },
                reflection_questions: [
                    'Huruf konsonan apa yang paling mudah, sayang?',
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
            title: 'Pertemuan 3: Ayo Rangkai Huruf Jadi Suku Kata (ba-bi-bu)',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyambung huruf konsonan b dengan vokal menjadi suku kata ba, bi, bu, be, bo.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu suku kata warna-warni',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🧩 Ayo Rangkai Huruf Jadi Suku Kata!

Tahukah kamu? Huruf **b** dan huruf **a** kalau digandeng jadi apa? 
Jadi **ba**! Seru, kan? Ayo kita rangkai bersama **Maryam** dan **Maheer**! 🎉

---

### 🌟 1. Rangkai Konsonan "b" dengan Vokal

| Rangkaian | Hasil | Contoh Kata | Emoji |
| :---: | :---: | :--- | :---: |
| b + a | **ba** | **ba**ju | 👕 |
| b + i | **bi** | **bi**ji | 🌱 |
| b + u | **bu** | **bu**ku | 📚 |
| b + e | **be** | **be**bek | 🦆 |
| b + o | **bo** | **bo**la | ⚽ |

---

### 🎭 Komik: Maryam & Maheer Rangkai Suku Kata

\`\`\`text
  Maryam : "Maheer, coba gandeng huruf b dengan a!" 👧
  Maheer : "b... a... jadi ba!" 👦✨
  Maryam : "Hebat! Sekarang coba b dengan i!" 👧
  Maheer : "b... i... jadi bi! Seperti biji!" 🌱
  Asiya  : "Aku juga bisa! b dengan u jadi bu, seperti buku!" 📚👧
\`\`\`

---

### 💡 Yang Perlu Diingat:
Kalau konsonan digandeng vokal, jadilah **suku kata**! 
Suku kata adalah potongan kata yang bisa dibunyikan. 🎯

---

### 🔍 Ayo Coba Sendiri:
* b + o = ... 👉 **bo** (bola!) ⚽
* b + e = ... 👉 **be** (bebek!) 🦆

Ayo jadi **Perangkai Suku Kata** bersama Maryam & Maheer! 🧩✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan merangkai huruf jadi suku kata yang seru!',
                ice_breaker:
                    'Ayo tepuk tangan: "b" tepuk 1x, "a" tepuk 1x, digabung jadi "ba" tepuk 2x!',
                apperception:
                    'Coba gandeng jari telunjukmu dengan jari tengahmu. Kalau huruf digandeng, jadi apa ya?',
                trigger_question:
                    'Kalau huruf b digandeng huruf a, jadi apa? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Konsonan + vokal = suku kata (ba, bi, bu, be, bo).',
                concrete_steps: [
                    'Tunjukkan kartu "b" dan "a" terpisah.',
                    'Gabungkan kedua kartu: "b" + "a" = "ba".',
                    'Ucapkan "ba" bersama-sama 3x.',
                    'Lanjut "b" + "i" = "bi", "b" + "u" = "bu".',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Nah sayang, kalau huruf b digandeng a, jadilah ba. Yuk, kita coba bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sambung Suku Kata Ceria',
                game_rules: [
                    'Guru menyebutkan konsonan "b".',
                    'Anak menyambung dengan vokal acak sambil melompat.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyambung dengan bantuan guru, cukup ba-bi-bu dulu.',
                    child_level_advanced:
                        'Menyambung be-bo sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menyambung suku kata dengan rapi.',
                worksheet_print_ready: {
                    title: 'LKPD 1.3: Ayo Rangkai Suku Kata!',
                    instructions:
                        'Sambung suku kata berikut! Tulis hasilnya di kotak kosong.',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut!',
                            data: {
                                syllables: [
                                    { part1: 'b', part2: 'a', result: 'ba', icon: '👕' },
                                    { part1: 'b', part2: 'i', result: 'bi', icon: '🌱' },
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
                                    { word: 'ba', icon: '👕' },
                                    { word: 'bi', icon: '🌱' },
                                    { word: 'bu', icon: '📚' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan suku kata dengan gambar.',
                            explanation: 'Membaca & mencocokkan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara menyambung b dengan a, sayang?',
                    'Suku kata apa yang paling mudah?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca suku kata dengan ceria: ba-bi-bu-be-bo!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 1: Ayo Kenalan dengan Huruf Ajaib',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Ada berapa huruf vokal?',
                            option_a: '3',
                            option_b: '4',
                            option_c: '5',
                            option_d: '6',
                            correct_answer: 'C',
                            explanation: 'Huruf vokal ada 5: a, i, u, e, o.',
                        },
                        {
                            question_text: 'Huruf vokal antara lain...',
                            option_a: 'a, i, u, e, o',
                            option_b: 'b, c, d, k',
                            option_c: 'p, m, n',
                            option_d: 'x, y, z',
                            correct_answer: 'A',
                            explanation: 'Vokal: a, i, u, e, o.',
                        },
                        {
                            question_text: 'Hasil dari b + a adalah...',
                            option_a: 'ba',
                            option_b: 'ab',
                            option_c: 'b',
                            option_d: 'a',
                            correct_answer: 'A',
                            explanation: 'b digandeng a jadi ba.',
                        },
                        {
                            question_text: 'Kata "bola" dimulai dengan huruf...',
                            option_a: 'a',
                            option_b: 'b',
                            option_c: 'c',
                            option_d: 'd',
                            correct_answer: 'B',
                            explanation: 'Bola diawali huruf b.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 2: AYO RANGKAI HURUF JADI SUKU KATA
// =============================================================================
const BAB_2: SeedModuleItem = {
    title: 'Bab 2: Ayo Rangkai Huruf Jadi Suku Kata',
    order_index: 2,
    target_semester: 1,
    week_target: 4,
    lessons: [
        {
            title: 'Pertemuan 4: Suku Kata 2 Huruf (ba, bi, bu, ca, ci, cu)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca suku kata 2 huruf dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu suku kata warna-warni',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎈 Ayo Baca Suku Kata 2 Huruf!

Sekarang kita sudah pandai merangkai **ba-bi-bu**. Ayo tambah lagi 
dengan **ca-ci-cu**, **da-di-du**, dan **ka-ki-ku**! 
**Asiya** dan **Fatimah** siap menemani! 🎉

---

### 🌟 1. Empat Kelompok Suku Kata Seru

| Kelompok | Suku Kata | Contoh Kata | Emoji |
| :---: | :--- | :--- | :---: |
| **b** | ba - bi - bu | **ba**ju, **bi**ji, **bu**ku | 👕🌱📚 |
| **c** | ca - ci - cu | **ca**ra, **ci**ci, **cu**ci | 🎯🐭🧼 |
| **d** | da - di - du | **da**du, **di**ri, **du**duk | 🎲👤🪑 |
| **k** | ka - ki - ku | **ka**ki, **ki**si, **ku**cing | 🦶🐈🐱 |

---

### 🎭 Komik: Asiya & Fatimah Baca Suku Kata

\`\`\`text
  Asiya   : "Fatimah, coba baca ca-ci-cu!" 👧
  Fatimah : "ca... ci... cu! Seperti cara, cici, cuci!" 👧✨
  Asiya   : "Hebat! Sekarang da-di-du!" 
  Fatimah : "da... di... du! Dadu, diri, duduk!" 🎲
  Maheer  : "Aku juga bisa ka-ki-ku!" 👦
  Khadijah: "Wah, kalian semua pandai membaca!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Setiap konsonan bisa digandeng dengan **semua vokal** a-i-u-e-o! 
Jadi kamu bisa bikin banyak suku kata seru! 🎯

---

### 🔍 Ayo Coba Sendiri:
* k + a = ... 👉 **ka** (kaki!) 🦶
* k + i = ... 👉 **ki** (kisi!) 🐈
* k + u = ... 👉 **ku** (kucing!) 🐱`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita baca suku kata baru yang lebih seru!',
                ice_breaker:
                    'Ayo tepuk tangan berirama: ba-bi-bu (tepuk 3x), ca-ci-cu (tepuk 3x)!',
                apperception:
                    'Coba sebut nama temanmu. Ada suku kata apa di dalamnya?',
                trigger_question:
                    'Suku kata apa saja yang bisa kita baca hari ini?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Suku kata 2 huruf: ba-bi-bu, ca-ci-cu, da-di-du, ka-ki-ku.',
                concrete_steps: [
                    'Tunjukkan kartu "ca". Baca "ca" bersama 3x.',
                    'Lanjut "ci", "cu" dengan tempo makin cepat.',
                    'Ulangi untuk da-di-du dan ka-ki-ku.',
                    'Acak kartu, minta anak membaca cepat.',
                    'Beri apresiasi setiap jawaban benar.',
                ],
                script_parent:
                    '"Ayo sayang, baca bersama Ibu: ca-ci-cu! Sekarang da-di-du!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Kartu Suku Kata Kilat',
                game_rules: [
                    'Guru menunjukkan kartu suku kata cepat.',
                    'Anak membaca dengan cepat sambil berdiri.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Membaca dengan bantuan guru, fokus kelompok b dan c.',
                    child_level_advanced:
                        'Membaca semua kelompok tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & mencocokkan suku kata.',
                worksheet_print_ready: {
                    title: 'LKPD 2.1: Suku Kata 2 Huruf',
                    instructions:
                        'Baca suku kata, lalu cocokkan dengan gambar!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READ_AND_MATCH',
                            question: 'Baca suku kata, lalu cocokkan dengan gambar!',
                            data: {
                                words: [
                                    { word: 'ba', icon: '👕' },
                                    { word: 'bi', icon: '🌱' },
                                    { word: 'bu', icon: '📚' },
                                    { word: 'ci', icon: '🐭' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan suku kata dengan gambar.',
                            explanation: 'Membaca & mencocokkan.',
                        },
                        {
                            id: 2,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut!',
                            data: {
                                syllables: [
                                    { part1: 'c', part2: 'a', result: 'ca', icon: '🎯' },
                                    { part1: 'd', part2: 'i', result: 'di', icon: '👤' },
                                    { part1: 'k', part2: 'u', result: 'ku', icon: '🐱' },
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
                            answer_key: 'Anak membaca dengan lancar.',
                            explanation: 'Latihan membaca.',
                        },
                    ],
                },
                reflection_questions: [
                    'Suku kata apa yang paling mudah, sayang?',
                    'Suku kata apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan ceria: ba-bi-bu, ca-ci-cu, da-di-du, ka-ki-ku!',
                },
            ],
        },
        {
            title: 'Pertemuan 5: Suku Kata 3 Huruf (ban, bin, bun)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca suku kata 3 huruf (suku kata tertutup) dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu suku kata tertutup',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🔔 Suku Kata 3 Huruf: Ada "n" di Belakang!

Tahukah kamu? Kalau "ba" ditambah "n" di belakang, jadi **ban**! 
Seru, kan? Ayo belajar bersama **Maheer** dan **Khadijah**! 🎉

---

### 🌟 1. Suku Kata Terbuka vs Tertutup

| Terbuka (2 huruf) | Tertutup (3 huruf) | Contoh | Emoji |
| :---: | :---: | :--- | :---: |
| ba | **ban** | **ban** sepeda | 🛞 |
| bi | **bin** | **bin** (lebah) | 🐝 |
| bu | **bun** | **bun**ga | 🌸 |
| ca | **can** | **can** (cangkir) | ☕ |
| ci | **cin** | **cin**cin | 💍 |
| cu | **cun** | **cun** (cuaca) | 🌤️ |

---

### 🎭 Komik: Maheer & Khadijah Bikin Suku Kata Baru

\`\`\`text
  Maheer  : "Khadijah, ba ditambah apa biar jadi ban?" 👦
  Khadijah: "Tambah huruf n di belakang, Maheer!" 👧✨
  Maheer  : "Oh! ba + n = ban! Seperti ban sepedaku!" 🛞
  Khadijah: "Betul! Sekarang coba bi + n!" 👧
  Maheer  : "bi + n = bin! Seperti binatang kecil!" 🐝
  Fatimah : "Aku juga bisa! bu + n = bun, seperti bunga!" 🌸
\`\`\`

---

### 💡 Yang Perlu Diingat:
**Suku kata terbuka** diakhiri vokal (ba, bi, bu). 
**Suku kata tertutup** diakhiri konsonan (ban, bin, bun). 🎯

---

### 🔍 Ayo Coba Sendiri:
* ca + n = ... 👉 **can** (cangkir) ☕
* ci + n = ... 👉 **cin** (cincin) 💍`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita bikin suku kata baru dengan tambahan "n" di belakang!',
                ice_breaker:
                    'Ayo bilang "ba" — sekarang tambah "n" jadi "ban"! Terasa beda, kan?',
                apperception:
                    'Coba lihat ban sepedamu di rumah. Diawali suku kata apa?',
                trigger_question:
                    'Apa bedanya "ba" dan "ban"? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Suku kata tertutup diakhiri konsonan (ban, bin, bun).',
                concrete_steps: [
                    'Tunjukkan kartu "ba". Baca "ba" bersama.',
                    'Tambahkan kartu "n" di belakang: jadi "ban".',
                    'Baca "ban" bersama 3x.',
                    'Lanjut "bin", "bun", "can", "cin", "cun".',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Nah sayang, kalau ba ditambah n di belakang, jadilah ban. Yuk, coba!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Bedakan Suku Kata Ceria',
                game_rules: [
                    'Guru menyebutkan suku kata: "ba" atau "ban".',
                    'Anak tepuk 1x untuk terbuka, tepuk 2x untuk tertutup.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus ban-bin-bun dulu, dengan bantuan guru.',
                    child_level_advanced:
                        'Membedakan terbuka & tertutup sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca suku kata tertutup.',
                worksheet_print_ready: {
                    title: 'LKPD 2.2: Suku Kata 3 Huruf',
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
                            answer_key: 'Anak mencocokkan.',
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
                            answer_key: 'Anak membaca dengan lancar.',
                            explanation: 'Latihan membaca.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa bedanya "ba" dan "ban", sayang?',
                    'Suku kata tertutup apa yang paling mudah?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca suku kata 3 huruf: ban-bin-bun!',
                },
            ],
        },
        {
            title: 'Pertemuan 6: Ayo Baca Kata 2 Suku Kata (bola, buku, kaki)',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca kata 2 suku kata dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kata',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎉 Ayo Baca Kata 2 Suku Kata!

Sekarang saatnya kita gabungkan 2 suku kata jadi **kata yang bermakna**! 
Ayo belajar bersama **Maryam**, **Asiya**, dan **Fatimah**! 🎉

---

### 🌟 1. Gabungkan 2 Suku Kata Jadi Kata

| Suku Kata 1 | Suku Kata 2 | Jadi Kata | Emoji |
| :---: | :---: | :---: | :---: |
| bo | la | **bola** | ⚽ |
| bu | ku | **buku** | 📚 |
| ka | ki | **kaki** | 🦶 |
| ca | ra | **cara** | 🎯 |
| da | du | **dadu** | 🎲 |

---

### 🎭 Komik: Maryam & Sahabat Baca Kata

\`\`\`text
  Maryam  : "Asiya, bo digandeng la jadi apa?" 👧
  Asiya   : "bo... la... jadi bola!" ⚽👧
  Maryam  : "Hebat! Sekarang bu digandeng ku!" 
  Asiya   : "bu... ku... jadi buku!" 📚
  Fatimah : "Aku juga bisa! ka digandeng ki jadi kaki!" 🦶👧
  Khadijah: "Wah, kalian sudah pandai membaca kata!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
**Kata** dibentuk dari **2 suku kata atau lebih**. 
Kalau digabung, artinya jadi jelas! 🎯

---

### 🔍 Ayo Coba Sendiri:
* da + du = ... 👉 **dadu** 🎲
* ca + ra = ... 👉 **cara** 🎯

Ayo jadi **Pembaca Kata Hebat**! 📖✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita gabungkan suku kata jadi kata yang bermakna!',
                ice_breaker:
                    'Ayo tepuk tangan: "bo" tepuk 1x, "la" tepuk 1x, "bola" tepuk 2x!',
                apperception:
                    'Coba pegang bola di rumah. Kata "bola" terdiri dari suku kata apa saja?',
                trigger_question:
                    'Kata apa yang bisa dibaca dari "bo" + "la"?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kata 2 suku kata dibentuk dari penggabungan 2 suku kata.',
                concrete_steps: [
                    'Tunjukkan kartu "bo" dan "la".',
                    'Gabungkan: "bo" + "la" = "bola".',
                    'Baca "bola" bersama 3x.',
                    'Lanjut "bu" + "ku" = "buku", "ka" + "ki" = "kaki".',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Nah sayang, bo digandeng la jadilah bola. Yuk, kita baca bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sambung Kata Ceria',
                game_rules: [
                    'Guru menyebutkan suku kata pertama ("bo").',
                    'Anak menyambung dengan suku kata kedua ("la") sambil melompat.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyambung dengan bantuan guru, 2 kata dulu.',
                    child_level_advanced:
                        'Menyambung sendiri & menyebutkan arti kata.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca kata 2 suku kata.',
                worksheet_print_ready: {
                    title: 'LKPD 2.3: Ayo Baca Kata 2 Suku Kata!',
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
                            answer_key: 'Anak mencocokkan.',
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
                            answer_key: 'Anak menulis kata.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kata apa yang paling mudah dibaca, sayang?',
                    'Kata apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca kata dengan ceria: bola, buku, kaki!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 2: Ayo Rangkai Huruf Jadi Suku Kata',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Hasil dari "bo" + "la" adalah...',
                            option_a: 'bola',
                            option_b: 'labo',
                            option_c: 'bela',
                            option_d: 'loba',
                            correct_answer: 'A',
                            explanation: 'bo + la = bola.',
                        },
                        {
                            question_text: 'Kata "buku" terdiri dari suku kata...',
                            option_a: 'bu-ku',
                            option_b: 'buk-u',
                            option_c: 'b-uku',
                            option_d: 'bu-k',
                            correct_answer: 'A',
                            explanation: 'buku = bu + ku.',
                        },
                        {
                            question_text: 'Suku kata "ban" adalah contoh suku kata...',
                            option_a: 'Terbuka',
                            option_b: 'Tertutup',
                            option_c: 'Vokal',
                            option_d: 'Konsonan',
                            correct_answer: 'B',
                            explanation: 'ban diakhiri konsonan n, jadi tertutup.',
                        },
                        {
                            question_text: 'Kata "kaki" artinya...',
                            option_a: 'Anggota tubuh untuk berjalan',
                            option_b: 'Alat untuk menulis',
                            option_c: 'Benda untuk bermain',
                            option_d: 'Alat untuk makan',
                            correct_answer: 'A',
                            explanation: 'Kaki adalah anggota tubuh untuk berjalan.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const BAHASA_INDONESIA_BATCH_1: SeedModuleItem[] = [BAB_1, BAB_2];