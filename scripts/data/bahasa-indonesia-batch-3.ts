// data/bahasa-indonesia-batch-3.ts
// Bab 5-6: Ayo Jadi Penulis Cilik & Ayo Baca Kalimat (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 5: AYO JADI PENULIS CILIK!
// =============================================================================
const BAB_5: SeedModuleItem = {
    title: 'Bab 5: Ayo Jadi Penulis Cilik!',
    order_index: 5,
    target_semester: 2,
    week_target: 13,
    lessons: [
        {
            title: 'Pertemuan 13: Menebalkan Huruf a-z dengan Rapi',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menebalkan huruf a-z dengan rapi dan mulai menulis sendiri.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu huruf a-z',
                'LKPD',
            ],
            content_text: `# ✏️ Ayo Jadi Penulis Cilik!

Halo sahabat cilik! Hari ini **Maryam** dan **Fatimah** akan mengajak kalian 
**berlatih menulis huruf** dengan rapi! Ayo kita jadi penulis cilik! 🎉

---

### 🌟 1. Ayo Menebalkan Huruf a-z

| Huruf | Contoh Kata | Emoji |
| :---: | :--- | :---: |
| **a** | apel | 🍎 |
| **b** | bola | ⚽ |
| **c** | cangkir | ☕ |
| **d** | dadu | 🎲 |
| **e** | es | 🧊 |
| **f** | foto | 📷 |
| **g** | gajah | 🐘 |
| **h** | hijau | 💚 |
| **i** | ikan | 🐟 |
| **j** | jam | ⏰ |
| **k** | kucing | 🐱 |
| **l** | lilin | 🕯️ |
| **m** | meja | 🪑 |
| **n** | nasi | 🍚 |
| **o** | obat | 💊 |
| **p** | pintu | 🚪 |
| **q** | quran | 📖 |
| **r** | roti | 🍞 |
| **s** | sapu | 🧹 |
| **t** | topi | 🧢 |
| **u** | ular | 🐍 |
| **v** | vas | 🏺 |
| **w** | wortel | 🥕 |
| **x** | xilofon | 🎵 |
| **y** | yoyo | 🪀 |
| **z** | zebra | 🦓 |

---

### 🎭 Komik: Maryam & Fatimah Menulis

\`\`\`text
  Maryam  : "Fatimah, ayo kita menulis huruf a!" 👧
  Fatimah : "Mulai dari mana, Maryam?" ✏️👧
  Maryam  : "Dari atas, lalu melingkar ke bawah!" 🌀
  Fatimah : "Oh! Aku sudah bisa menulis a!" 🎉
  Maheer  : "Aku juga bisa menulis b!" ⚽👦
  Khadijah: "Hebat! Kalian penulis cilik!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Saat menulis huruf:
1. Mulai dari **arah yang benar** (biasanya dari atas ke bawah) ⬇️
2. Duduk **tegak** & pegang pensil dengan **benar** ✏️
3. Menulis **perlahan** agar rapi 🐢

---

### 🔍 Ayo Coba Sendiri:
* Coba tulis huruf **a** di udara dengan jarimu! ✍️
* Sekarang tulis huruf **b** di udara! ✍️
* Lanjut **c**, **d**, **e**... 🎉

Ayo jadi **Penulis Cilik Hebat** bersama Maryam & Fatimah! ✏️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berlatih menulis huruf dengan rapi!',
                ice_breaker:
                    'Ayo tulis huruf "a" di udara dengan jarimu! Sekarang huruf "b"! Seru, kan?',
                apperception:
                    'Coba lihat pensil di tanganmu. Sudah siap menulis dengan rapi?',
                trigger_question:
                    'Bagaimana cara menulis huruf a dengan rapi? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menebalkan huruf a-z dengan rapi, mulai dari arah yang benar.',
                concrete_steps: [
                    'Tunjukkan cara menulis huruf "a": mulai dari atas, melingkar ke bawah.',
                    'Minta anak menirukan gerakan di udara dulu.',
                    'Berikan LKPD, minta anak menebalkan huruf "a".',
                    'Lanjut huruf b, c, d, e satu per satu.',
                    'Beri apresiasi setiap huruf yang selesai.',
                ],
                script_parent:
                    '"Nah sayang, menulis dimulai dari atas ke bawah ya. Yuk, kita tebalkan huruf a!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Huruf di Udara',
                game_rules: [
                    'Guru menulis huruf di udara dengan jari.',
                    'Anak menebak hurufnya dengan cepat.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                    'Gantian: anak menulis di udara, guru menebak.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus huruf a-e dulu dengan bantuan guru.',
                    child_level_advanced:
                        'Menulis huruf sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menebalkan huruf a-z.',
                worksheet_print_ready: {
                    title: 'LKPD 5.1: Ayo Tebalkan Huruf a-z!',
                    instructions:
                        'Tebalkan huruf berikut dengan pensil warna, lalu coba tulis sendiri di baris kosong!',
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
                            answer_key: 'Anak menebalkan huruf a-f.',
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
                            answer_key: 'Anak menebalkan huruf g-l.',
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
                            answer_key: 'Anak menebalkan huruf m-z.',
                            explanation: 'Latihan menulis huruf.',
                        },
                    ],
                },
                reflection_questions: [
                    'Huruf apa yang paling mudah ditulis, sayang?',
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
            title: 'Pertemuan 14: Ayo Menulis Suku Kata',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis suku kata dengan rapi.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu suku kata',
                'LKPD',
            ],
            content_text: `# 🧩 Ayo Menulis Suku Kata!

Halo sahabat cilik! Sekarang kita sudah pandai menulis huruf. 
Ayo **Asiya** dan **Maheer** ajak kalian **menulis suku kata** dengan rapi! 🎉

---

### 🌟 1. Ayo Menulis Suku Kata

| Suku Kata | Contoh Kata | Emoji |
| :---: | :--- | :---: |
| **ba** | baju | 👕 |
| **bi** | biji | 🌱 |
| **bu** | buku | 📚 |
| **ca** | cara | 🎯 |
| **ci** | cici | 🐭 |
| **cu** | cuci | 🧼 |
| **da** | dadu | 🎲 |
| **di** | diri | 👤 |
| **du** | duduk | 🪑 |
| **ka** | kaki | 🦶 |
| **ki** | kisi | 🐈 |
| **ku** | kucing | 🐱 |

---

### 🎭 Komik: Asiya & Maheer Menulis Suku Kata

\`\`\`text
  Asiya  : "Maheer, ayo tulis suku kata ba!" 👧
  Maheer : "b... a... jadi ba!" ✏️👦
  Asiya  : "Bagus! Sekarang tulis bi!" 
  Maheer : "b... i... jadi bi! Seperti biji!" 🌱
  Fatimah: "Aku juga bisa tulis bu! Seperti buku!" 📚👧
  Khadijah: "Hebat! Kalian penulis suku kata!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Saat menulis suku kata:
1. Tulis **huruf pertama** dulu (konsonan) ✏️
2. Lalu **huruf kedua** (vokal) ✏️
3. **Sambung** keduanya rapi 🎯

---

### 🔍 Ayo Coba Sendiri:
* Tulis **ba** di udara! ✍️
* Tulis **bi** di udara! ✍️
* Tulis **bu** di udara! ✍️

Ayo jadi **Penulis Suku Kata Hebat**! ✏️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menulis suku kata dengan rapi!',
                ice_breaker:
                    'Ayo tulis suku kata "ba" di udara dengan jarimu! Sekarang "bi"! Seru, kan?',
                apperception:
                    'Coba ingat, "ba" terdiri dari huruf apa saja? Betul, b dan a!',
                trigger_question:
                    'Bagaimana cara menulis suku kata "ba"? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menulis suku kata: konsonan + vokal, disambung rapi.',
                concrete_steps: [
                    'Tunjukkan cara menulis suku kata "ba": tulis b dulu, lalu a.',
                    'Minta anak menirukan di udara dulu.',
                    'Berikan LKPD, minta anak menulis "ba" di baris kosong.',
                    'Lanjut "bi", "bu" satu per satu.',
                    'Beri apresiasi setiap suku kata yang selesai.',
                ],
                script_parent:
                    '"Nah sayang, tulis b dulu, lalu a. Sambung jadi ba. Yuk, kita coba!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tulis Suku Kata Ceria',
                game_rules: [
                    'Guru menyebutkan suku kata: "ba!"',
                    'Anak menulis di udara dengan cepat.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                    'Gantian: anak menyebut, guru menulis.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus ba-bi-bu dulu dengan bantuan guru.',
                    child_level_advanced:
                        'Menulis semua suku kata sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis suku kata.',
                worksheet_print_ready: {
                    title: 'LKPD 5.2: Ayo Menulis Suku Kata!',
                    instructions:
                        'Tebalkan suku kata berikut, lalu tulis sendiri di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut, lalu tulis hasilnya!',
                            data: {
                                syllables: [
                                    { part1: 'b', part2: 'a', result: 'ba', icon: '👕' },
                                    { part1: 'b', part2: 'i', result: 'bi', icon: '🌱' },
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
                            answer_key: 'Anak menulis suku kata.',
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
                    'Suku kata apa yang paling mudah ditulis, sayang?',
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
            title: 'Pertemuan 15: Ayo Menulis Nama Sendiri',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis nama lengkap sendiri dengan rapi.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu nama',
                'LKPD',
            ],
            content_text: `# 🌟 Ayo Menulis Nama Sendiri!

Halo sahabat cilik! Tahukah kamu, **namamu itu indah**? 
Hari ini **Maryam**, **Asiya**, **Fatimah**, **Maheer**, dan **Khadijah** 
akan mengajak kalian **menulis nama sendiri** dengan rapi! 🎉

---

### 🌟 1. Contoh Nama Sahabat Kita

| Nama | Suku Kata | Emoji |
| :---: | :--- | :---: |
| **Maryam** | ma - ryam | 👧 |
| **Asiya** | a - si - ya | 👧 |
| **Fatimah** | fa - ti - mah | 👧 |
| **Maheer** | ma - heer | 👦 |
| **Khadijah** | kha - di - jah | 👧 |

---

### 🎭 Komik: Sahabat Menulis Nama

\`\`\`text
  Maryam  : "Ayo kita tulis nama sendiri!" 👧
  Asiya   : "Namaku Asiya! A-s-i-y-a!" ✏️👧
  Fatimah : "Namaku Fatimah! F-a-t-i-m-a-h!" 👧
  Maheer  : "Namaku Maheer! M-a-h-e-e-r!" 👦
  Khadijah: "Namaku Khadijah! K-h-a-d-i-j-a-h!" 👧
  Maryam  : "Wah, nama kita semua indah!" 💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Saat menulis nama:
1. **Huruf pertama** pakai **huruf kapital** (A, B, C) 🅰️
2. **Huruf berikutnya** pakai **huruf kecil** (a, b, c) 🔡
3. Tulis dengan **rapi** & **perlahan** 🐢

---

### 🔍 Ayo Coba Sendiri:
* Apa **huruf awal** namamu? 👉 Tulis dengan kapital! 🅰️
* Lanjutkan dengan huruf kecil! 🔡
* Tulis namamu **3x** di buku! ✏️

Ayo jadi **Penulis Nama Hebat**! 🌟✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menulis nama sendiri dengan rapi!',
                ice_breaker:
                    'Ayo sebut namamu lantang: "Namaku ...!" — sekarang tepuk tangan 3x!',
                apperception:
                    'Coba sebut huruf awal namamu. Huruf apa? Tulis dengan kapital ya!',
                trigger_question:
                    'Siapa bisa menulis namanya sendiri? Ayo kita coba bersama!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menulis nama sendiri: huruf awal kapital, sisanya kecil, rapi.',
                concrete_steps: [
                    'Tunjukkan cara menulis nama "Maryam": M kapital, lalu a-r-y-a-m kecil.',
                    'Minta anak menirukan di udara dulu.',
                    'Berikan LKPD, minta anak menulis namanya sendiri.',
                    'Bantu anak yang kesulitan dengan menuntun tangan.',
                    'Beri apresiasi setiap usaha anak.',
                ],
                script_parent:
                    '"Nah sayang, huruf awal namamu pakai kapital ya. Lalu sisanya kecil. Yuk, kita tulis!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Panggung Nama Ceria',
                game_rules: [
                    'Guru menyebutkan nama anak.',
                    'Anak menulis namanya di papan tulis.',
                    'Yang paling rapi dapat bintang emas ⭐.',
                    'Tepuk tangan untuk semua yang berani mencoba.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menulis nama dengan bantuan guru (dituntun).',
                    child_level_advanced:
                        'Menulis nama sendiri dengan rapi tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis nama sendiri.',
                worksheet_print_ready: {
                    title: 'LKPD 5.3: Ayo Menulis Nama Sendiri!',
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
                            answer_key: 'Anak menulis nama sendiri.',
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
                            answer_key: 'Anak menggambar diri & menulis nama.',
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
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa huruf awal namamu, sayang?',
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
                    prompt: 'Kuis Bab 5: Ayo Jadi Penulis Cilik!',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Menulis dimulai dari arah...',
                            option_a: 'Kanan ke kiri',
                            option_b: 'Kiri ke kanan',
                            option_c: 'Atas ke bawah',
                            option_d: 'Bawah ke atas',
                            correct_answer: 'B',
                            explanation: 'Menulis dimulai dari kiri ke kanan.',
                        },
                        {
                            question_text: 'Huruf awal nama biasanya ditulis dengan...',
                            option_a: 'Huruf kecil',
                            option_b: 'Huruf kapital',
                            option_c: 'Angka',
                            option_d: 'Simbol',
                            correct_answer: 'B',
                            explanation: 'Huruf awal nama pakai kapital.',
                        },
                        {
                            question_text: 'Suku kata "ba" terdiri dari huruf...',
                            option_a: 'b dan a',
                            option_b: 'a dan b',
                            option_c: 'b saja',
                            option_d: 'a saja',
                            correct_answer: 'A',
                            explanation: 'ba = b + a.',
                        },
                        {
                            question_text: 'Saat menulis, sebaiknya kita...',
                            option_a: 'Tergesa-gesa',
                            option_b: 'Dengan rapi',
                            option_c: 'Sambil bermain',
                            option_d: 'Sambil tidur',
                            correct_answer: 'B',
                            explanation: 'Menulis dengan rapi.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 6: AYO BACA KALIMAT!
// =============================================================================
const BAB_6: SeedModuleItem = {
    title: 'Bab 6: Ayo Baca Kalimat!',
    order_index: 6,
    target_semester: 2,
    week_target: 16,
    lessons: [
        {
            title: 'Pertemuan 16: Ayo Baca Kalimat 3 Kata',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca kalimat 3 kata dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 📖 Ayo Baca Kalimat 3 Kata!

Halo sahabat cilik! Sekarang kita sudah pandai membaca kata. 
Ayo **Maryam** dan **Maheer** ajak kalian **membaca kalimat 3 kata**! 🎉

---

### 🌟 1. Contoh Kalimat 3 Kata

| Kalimat | Suku Kata | Emoji |
| :--- | :--- | :---: |
| **Ayah baca buku.** | a-yah ba-ca bu-ku | 👨📚 |
| **Ibu masak nasi.** | i-bu ma-sak na-si | 👩🍚 |
| **Adik main bola.** | a-dik ma-in bo-la | 👶⚽ |
| **Kakak bawa tas.** | ka-kak ba-wa tas | 👦🎒 |
| **Aku suka buku.** | a-ku su-ka bu-ku | 📚💖 |

---

### 🎭 Komik: Maryam & Maheer Baca Kalimat

\`\`\`text
  Maryam : "Maheer, ayo baca kalimat ini!" 👧
  Maheer: "A-yah ba-ca bu-ku... Ayah baca buku!" 📚👦
  Maryam : "Hebat! Sekarang coba yang ini!" 
  Maheer: "I-bu ma-sak na-si... Ibu masak nasi!" 🍚
  Asiya  : "Aku juga bisa! Adik main bola!" ⚽👧
  Khadijah: "Wah, kalian pandai membaca kalimat!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Saat membaca kalimat:
1. **Baca kata** satu per satu 📖
2. **Sambung** jadi kalimat lengkap 🎯
3. **Akhiri** dengan intonasi turun (.) ⬇️
4. Jangan lupa **huruf kapital** di awal 🅰️

---

### 🔍 Ayo Coba Sendiri:
Baca kalimat ini dengan lantang:
* "Ayah baca buku." 👨📚
* "Ibu masak nasi." 👩🍚
* "Adik main bola." 👶⚽

Ayo jadi **Pembaca Kalimat Hebat**! 📖✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan membaca kalimat 3 kata dengan lancar!',
                ice_breaker:
                    'Ayo tepuk tangan: "A-yah" (2x), "ba-ca" (2x), "bu-ku" (2x)!',
                apperception:
                    'Coba sebut satu kalimat tentang ayahmu. Kata apa yang kamu pakai?',
                trigger_question:
                    'Bagaimana cara membaca kalimat "Ayah baca buku."? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Membaca kalimat 3 kata: baca kata satu per satu, sambung jadi kalimat.',
                concrete_steps: [
                    'Tunjukkan kalimat "Ayah baca buku."',
                    'Baca bersama 3x dengan intonasi ramah.',
                    'Tunjuk kata "Ayah" — baca. Lalu "baca" — baca. Lalu "buku" — baca.',
                    'Sambung: "Ayah baca buku."',
                    'Lanjut "Ibu masak nasi." & "Adik main bola."',
                ],
                script_parent:
                    '"Nah sayang, baca kata satu per satu dulu. Ayah... baca... buku... Sekarang sambung jadi Ayah baca buku!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Baca Kalimat Kilat',
                game_rules: [
                    'Guru menunjukkan kartu kalimat.',
                    'Anak membaca dengan cepat & lantang.',
                    'Yang paling jelas & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Membaca dengan bantuan guru, 1 kalimat dulu.',
                    child_level_advanced:
                        'Membaca sendiri & menuliskan kalimat.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kalimat 3 kata.',
                worksheet_print_ready: {
                    title: 'LKPD 6.1: Ayo Baca Kalimat 3 Kata!',
                    instructions:
                        'Baca kalimat, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question: 'Baca kalimat 3 kata berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'Ayah baca buku.', icon: '👨📚' },
                                    { text: 'Ibu masak nasi.', icon: '👩🍚' },
                                    { text: 'Adik main bola.', icon: '👶⚽' },
                                ],
                            },
                            answer_key: 'Anak membaca kalimat.',
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
                            answer_key: 'Anak menulis kalimat.',
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
                            answer_key: 'Anak menggambar ibu masak.',
                            explanation: 'Memahami arti kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kalimat apa yang paling mudah dibaca, sayang?',
                    'Bagaimana cara menulis kalimat?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca kalimat dengan ceria: "Ayah baca buku. Ibu masak nasi. Adik main bola."',
                },
            ],
        },
        {
            title: 'Pertemuan 17: Ayo Baca Kalimat 4 Kata',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca kalimat 4 kata dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 📜 Ayo Baca Kalimat 4 Kata!

Halo sahabat cilik! Sekarang kita naik level: baca kalimat **4 kata**! 
Ayo **Fatimah** dan **Asiya** ajak kalian membaca! 🎉

---

### 🌟 1. Contoh Kalimat 4 Kata

| Kalimat | Emoji |
| :--- | :---: |
| **Ayah membaca buku baru.** | 👨📚✨ |
| **Ibu memasak nasi goreng.** | 👩🍳🍚 |
| **Adik bermain bola di halaman.** | 👶⚽🏡 |
| **Kakak menulis surat untuk ibu.** | 👦✉️👩 |
| **Aku suka membaca buku cerita.** | 📚💖 |

---

### 🎭 Komik: Fatimah & Asiya Baca Kalimat 4 Kata

\`\`\`text
  Fatimah : "Asiya, ayo baca kalimat ini!" 👧
  Asiya   : "A-yah mem-ba-ca bu-ku ba-ru... Ayah membaca buku baru!" 📚👧
  Fatimah : "Hebat! Sekarang coba yang ini!" 
  Asiya   : "I-bu me-ma-sak na-si go-reng... Ibu memasak nasi goreng!" 🍳
  Maheer  : "Aku juga bisa! Adik bermain bola di halaman!" ⚽👦  Khadijah: "Wah, kalian sudah pandai baca kalimat 4 kata!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Kalimat 4 kata lebih panjang, tapi caranya **sama**:
1. Baca **kata satu per satu** 📖
2. **Sambung** jadi kalimat lengkap 🎯
3. **Akhiri** dengan tanda titik (.) ⚫

---

### 🔍 Ayo Coba Sendiri:
Baca kalimat ini dengan lantang:
* "Ayah membaca buku baru." 📚
* "Ibu memasak nasi goreng." 🍳
* "Adik bermain bola di halaman." ⚽

Ayo jadi **Pembaca Kalimat Hebat**! 📜✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita naik level: baca kalimat 4 kata!',
                ice_breaker:
                    'Ayo tepuk tangan 4x sambil sebut: "A-yah mem-ba-ca bu-ku!"',
                apperception:
                    'Coba ingat kalimat 3 kata kemarin. Sekarang kita tambah 1 kata lagi!',
                trigger_question:
                    'Bagaimana cara membaca kalimat 4 kata? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Membaca kalimat 4 kata: baca kata satu per satu, sambung.',
                concrete_steps: [
                    'Tunjukkan kalimat "Ayah membaca buku baru."',
                    'Tunjuk kata "Ayah" — baca. Lanjut "membaca", "buku", "baru".',
                    'Sambung: "Ayah membaca buku baru."',
                    'Ulangi 3x dengan tempo makin cepat.',
                    'Lanjut "Ibu memasak nasi goreng." & "Adik bermain bola di halaman."',
                ],
                script_parent:
                    '"Nah sayang, baca kata satu per satu dulu. Sekarang sambung jadi kalimat lengkap!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Puzzle Kalimat Ceria',
                game_rules: [
                    'Guru membagikan kartu kata acak.',
                    'Anak menyusun jadi kalimat 4 kata.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyusun dengan bantuan guru, 3 kata dulu.',
                    child_level_advanced:
                        'Menyusun 4-5 kata sendiri & membacanya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kalimat 4 kata.',
                worksheet_print_ready: {
                    title: 'LKPD 6.2: Ayo Baca Kalimat 4 Kata!',
                    instructions:
                        'Baca kalimat 4 kata, lalu tulis di baris kosong!',
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
                            answer_key: 'Anak membaca kalimat 4 kata.',
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
                            answer_key: 'Anak menulis kalimat.',
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
                            answer_key: 'Anak mencocokkan kalimat & gambar.',
                            explanation: 'Memahami arti kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kalimat apa yang paling mudah dibaca, sayang?',
                    'Bagaimana cara membaca kalimat 4 kata?',
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
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membedakan dan menggunakan tanda titik (.) dan tanda tanya (?) dengan tepat.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu tanda baca',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ❓ Ayo Kenalan dengan Tanda Titik & Tanda Tanya!

Halo sahabat cilik! Tahukah kamu, kalimat punya **tanda akhir** yang berbeda? 
Ayo **Maryam** dan **Khadijah** ajak kalian mengenal tanda titik & tanda tanya! 🎉

---

### 🌟 1. Dua Tanda Ajaib

| Tanda | Nama | Kegunaan | Contoh | Emoji |
| :---: | :--- | :--- | :--- | :---: |
| **.** | Titik | Untuk kalimat berita | Aku suka buku. | 📖 |
| **?** | Tanya | Untuk kalimat tanya | Siapa namamu? | ❓ |

---

### 🎭 Komik: Maryam & Khadijah Belajar Tanda

\`\`\`text
  Maryam  : "Khadijah, apa bedanya titik dan tanya?" 👧
  Khadijah: "Titik untuk kabar, tanya untuk bertanya!" 👧✨
  Maryam  : "Contohnya?" 
  Khadijah: "Aku suka buku (titik). Siapa namamu (tanya)?" 📖❓
  Asiya   : "Oh! Jadi kalau aku tanya, pakai tanda tanya?" 👧
  Khadijah: "Betul sekali, Asiya!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
* **Tanda titik (.)** 👉 untuk **memberi kabar** 📖
* **Tanda tanya (?)** 👉 untuk **bertanya** ❓
* Saat membaca kalimat tanya, intonasi **naik** di akhir ⬆️
* Saat membaca kalimat berita, intonasi **turun** di akhir ⬇️

---

### 🔍 Ayo Coba Sendiri:
Baca kalimat berikut dengan intonasi tepat:
* "Aku suka buku." 👉 intonasi **turun** ⬇️
* "Siapa namamu?" 👉 intonasi **naik** ⬆️
* "Ini bola Budi." 👉 intonasi **turun** ⬇️
* "Apa itu?" 👉 intonasi **naik** ⬆️

Ayo jadi **Detektif Tanda Baca**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita kenal dua tanda ajaib: titik dan tanya!',
                ice_breaker:
                    'Ayo tirukan: bilang "Aku suka buku" dengan suara turun. Bilang "Siapa namamu?" dengan suara naik!',
                apperception:
                    'Coba pikirkan: kalau kamu bertanya, tanda apa yang dipakai?',
                trigger_question:
                    'Apa bedanya tanda titik (.) & tanda tanya (?)? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tanda titik (.) untuk kalimat berita, tanda tanya (?) untuk kalimat tanya.',
                concrete_steps: [
                    'Tunjukkan kalimat berita: "Aku suka buku."',
                    'Tunjukkan kalimat tanya: "Siapa namamu?"',
                    'Baca keduanya dengan intonasi berbeda.',
                    'Minta anak menirukan intonasi.',
                    'Ulangi 3x dengan kalimat berbeda.',
                ],
                script_parent:
                    '"Nah sayang, tanda titik untuk kabar, tanda tanya untuk bertanya. Yuk, kita baca bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Tanda Ceria',
                game_rules: [
                    'Guru membacakan kalimat dengan intonasi.',
                    'Anak menebak tandanya (titik atau tanya).',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus 2 kalimat dulu dengan bantuan guru.',
                    child_level_advanced:
                        'Membedakan tanda & membuat kalimat sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membedakan tanda & menulis kalimat.',
                worksheet_print_ready: {
                    title: 'LKPD 6.3: Tanda Titik & Tanda Tanya',
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
                            answer_key: 'Anak membaca dengan intonasi tepat.',
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
                            answer_key: 'Anak menulis kalimat.',
                            explanation: 'Latihan membuat kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa bedanya titik & tanya, sayang?',
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
                    prompt: 'Kuis Bab 6: Ayo Baca Kalimat!',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kalimat berita diakhiri dengan tanda...',
                            option_a: 'Titik (.)',
                            option_b: 'Tanya (?)',
                            option_c: 'Seru (!)',
                            option_d: 'Koma (,)',
                            correct_answer: 'A',
                            explanation: 'Kalimat berita diakhiri titik.',
                        },
                        {
                            question_text: 'Kalimat "Siapa namamu?" diakhiri dengan...',
                            option_a: 'Titik (.)',
                            option_b: 'Tanya (?)',
                            option_c: 'Seru (!)',
                            option_d: 'Koma (,)',
                            correct_answer: 'B',
                            explanation: 'Kalimat tanya diakhiri tanda tanya.',
                        },
                        {
                            question_text: 'Kalimat "Ayah baca buku." adalah kalimat...',
                            option_a: 'Tanya',
                            option_b: 'Berita',
                            option_c: 'Seru',
                            option_d: 'Larangan',
                            correct_answer: 'B',
                            explanation: 'Kalimat berita.',
                        },
                        {
                            question_text: 'Kalimat tanya dibaca dengan intonasi...',
                            option_a: 'Datar',
                            option_b: 'Naik di akhir',
                            option_c: 'Turun di akhir',
                            option_d: 'Berteriak',
                            correct_answer: 'B',
                            explanation: 'Intonasi naik di akhir.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const BAHASA_INDONESIA_BATCH_3: SeedModuleItem[] = [BAB_5, BAB_6];