// data/bahasa-indonesia-batch-2.ts
// Bab 3-4: Keluargaku & Ayo Dengarkan Cerita (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 3: KELUARGAKU TERSAYANG
// =============================================================================
const BAB_3: SeedModuleItem = {
    title: 'Bab 3: Keluargaku Tersayang',
    order_index: 3,
    target_semester: 1,
    week_target: 7,
    lessons: [
        {
            title: 'Pertemuan 7: Ayo Baca Nama Keluarga (ayah, ibu, kakak, adik)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca dan menulis nama anggota keluarga inti dengan gembira.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kata anggota keluarga',
                'Foto keluarga (opsional)',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 👨‍👩‍👧 Keluargaku Tersayang!

Halo sahabat cilik! Hari ini **Maryam** dan **Khadijah** akan mengajak kalian 
mengenal **nama anggota keluarga** di rumah! 🏡💖

---

### 🌟 1. Anggota Keluarga Kita

| Nama | Peran | Emoji | Suku Kata |
| :---: | :--- | :---: | :--- |
| **ayah** | Kepala keluarga | 👨 | a - yah |
| **ibu** | Ibu tercinta | 👩 | i - bu |
| **kakak** | Saudara lebih tua | 👦 | ka - kak |
| **adik** | Saudara lebih muda | 👶 | a - dik |

---

### 🎭 Komik: Maryam & Khadijah Bercerita

\`\`\`text
  Maryam  : "Khadijah, siapa saja anggota keluarga kita?" 👧
  Khadijah: "Ada ayah, ibu, kakak, dan adik!" 👧✨
  Maryam  : "Aku sayang ayah dan ibu!" 💖
  Khadijah: "Aku juga sayang kalian semua!" 🤗
  Maheer  : "Aku punya kakak dan adik juga!" 👦
  Asiya   : "Keluarga itu indah sekali!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Setiap anggota keluarga punya **nama** dan **peran**. 
Kita sayang mereka semua! 💕

---

### 🔍 Ayo Cari di Rumahmu:
* Siapa **ayah**mu? 👉 Panggil beliau, peluk! 🤗
* Siapa **ibu**mu? 👉 Cium tangannya! 💖
* Ada **kakak**? 👉 Ajak bermain bersama! 🎮
* Ada **adik**? 👉 Ajak bercanda! 😄

Ayo jadi **Anak Sayang Keluarga** bersama Maryam & Khadijah! 🏡✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan mengenal nama anggota keluarga kita tercinta!',
                ice_breaker:
                    'Ayo tepuk tangan sambil sebut: "Ayah! Ibu! Kakak! Adik!" — tepuk 4x!',
                apperception:
                    'Coba sebut nama ayahmu. Kata "ayah" terdiri dari suku kata apa saja?',
                trigger_question:
                    'Siapa saja anggota keluargamu? Ayo kita sebutkan bersama!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Nama anggota keluarga: ayah, ibu, kakak, adik.',
                concrete_steps: [
                    'Tunjukkan kartu kata "ayah". Baca bersama 3x.',
                    'Lanjut "ibu", "kakak", "adik".',
                    'Pecah tiap kata jadi suku kata: a-yah, i-bu, ka-kak, a-dik.',
                    'Minta anak menyebutkan nama keluarganya sendiri.',
                    'Beri apresiasi setiap sebutan benar.',
                ],
                script_parent:
                    '"Nah sayang, ayah terdiri dari a-yah. Yuk, kita baca bersama nama keluarga kita!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Kartu Keluarga Ceria',
                game_rules: [
                    'Guru menunjukkan gambar anggota keluarga.',
                    'Anak membaca nama & menyebutkan perannya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Membaca dengan bantuan guru, 2 kata dulu (ayah, ibu).',
                    child_level_advanced:
                        'Membaca & menulis nama keluarga sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis nama keluarga.',
                worksheet_print_ready: {
                    title: 'LKPD 3.1: Ayo Baca Nama Keluarga!',
                    instructions:
                        'Baca kata, cocokkan dengan gambar, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READ_AND_MATCH',
                            question: 'Baca kata, lalu cocokkan dengan gambar!',
                            data: {
                                words: [
                                    { word: 'ayah', icon: '👨' },
                                    { word: 'ibu', icon: '👩' },
                                    { word: 'kakak', icon: '👦' },
                                    { word: 'adik', icon: '👶' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan kata dengan gambar.',
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
                            answer_key: 'Anak menulis nama anggota keluarga.',
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
                            answer_key: 'Anak menggambar keluarga.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kata "ayah" terdiri dari berapa suku kata, sayang?',
                    'Bagaimana cara menulis "ibu"?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan ceria: ayah, ibu, kakak, adik!',
                },
            ],
        },
        {
            title: 'Pertemuan 8: Benda di Rumahku (meja, kursi, pintu, jendela)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca dan menulis kata benda di rumah.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kata benda',
                'Gambar benda rumah',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🏠 Benda di Rumahku

Halo sahabat cilik! Tahukah kamu, benda-benda di rumahmu punya **nama**? 
Ayo **Fatimah** dan **Maheer** ajak kalian membaca nama benda di rumah! 🎉

---

### 🌟 1. Benda-Benda di Rumah

| Benda | Suku Kata | Emoji | Fungsi |
| :---: | :--- | :---: | :--- |
| **meja** | me - ja | 🪑 | Untuk menulis & makan |
| **kursi** | kur - si | 💺 | Untuk duduk |
| **pintu** | pin - tu | 🚪 | Untuk masuk & keluar |
| **jendela** | jen - de - la | 🪟 | Untuk melihat keluar |

---

### 🎭 Komik: Fatimah & Maheer Berkeliling Rumah

\`\`\`text
  Fatimah : "Maheer, lihat! Ini apa namanya?" 🪑👧
  Maheer  : "Itu meja! Untuk menulis!" ✏️👦
  Fatimah : "Betul! Kalau yang ini?" 💺
  Maheer  : "Itu kursi! Untuk duduk!" 🪑
  Asiya   : "Aku lihat pintu dan jendela juga!" 🚪🪟👧
  Khadijah: "Wah, kalian sudah pandai membaca!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Setiap benda di rumah punya **nama** dan **fungsi**. 
Kalau tahu namanya, kita bisa menulis & membacanya! 🎯

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **meja**? 👉 Berapa banyak? 🪑
* Ada **kursi**? 👉 Warnanya apa? 💺
* Ada **pintu**? 👉 Berapa buah? 🚪
* Ada **jendela**? 👉 Buka atau tutup? 🪟

Ayo jadi **Detektif Benda Rumah** bersama Fatimah & Maheer! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkeliling rumah untuk mengenal nama benda!',
                ice_breaker:
                    'Ayo tunjuk meja di sekitarmu! Tepuk tangan 2x sambil sebut "meja"!',
                apperception:
                    'Coba lihat kursi di dekatmu. Kata "kursi" terdiri dari suku kata apa saja?',
                trigger_question:
                    'Benda apa saja yang ada di rumahmu? Ayo kita sebutkan!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kata benda di rumah: meja, kursi, pintu, jendela.',
                concrete_steps: [
                    'Tunjukkan kartu "meja". Baca bersama 3x.',
                    'Lanjut "kursi", "pintu", "jendela".',
                    'Pecah tiap kata jadi suku kata: me-ja, kur-si, pin-tu, jen-de-la.',
                    'Minta anak menunjuk benda nyata di sekitarnya.',
                    'Beri apresiasi setiap sebutan benar.',
                ],
                script_parent:
                    '"Nah sayang, kursi terdiri dari kur-si. Yuk, kita baca nama benda di rumah!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Benda Rumah',
                game_rules: [
                    'Guru menyebutkan ciri benda: "Untuk duduk, ada 4 kaki."',
                    'Anak menebak nama benda & membacanya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, 2 benda dulu.',
                    child_level_advanced:
                        'Menyebutkan benda lain & membacanya sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kata benda.',
                worksheet_print_ready: {
                    title: 'LKPD 3.2: Benda di Rumahku',
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
                            answer_key: 'Anak mencocokkan.',
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
                            answer_key: 'Anak menulis kata benda.',
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
                    'Benda apa saja di rumahmu, sayang?',
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
            title: 'Pertemuan 9: Kalimat Sederhana tentang Keluargaku',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca dan menulis kalimat sederhana tentang keluarga.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 💬 Ayo Bikin Kalimat tentang Keluargaku!

Sekarang kita sudah pandai membaca kata. Ayo gabungkan kata-kata 
jadi **kalimat sederhana** tentang keluarga! **Maryam** dan **Asiya** siap menemani! 🎉

---

### 🌟 1. Contoh Kalimat Sederhana

| Kalimat | Suku Kata | Emoji |
| :--- | :--- | :---: |
| **Ayah baca buku.** | a-yah ba-ca bu-ku | 👨📚 |
| **Ibu masak nasi.** | i-bu ma-sak na-si | 👩🍚 |
| **Aku sayang ibu.** | a-ku sa-yang i-bu | 💖 |
| **Adik main bola.** | a-dik ma-in bo-la | 👶⚽ |

---

### 🎭 Komik: Maryam & Asiya Bikin Kalimat

\`\`\`text
  Maryam : "Asiya, ayo bikin kalimat tentang keluarga!" 👧
  Asiya  : "Aku sayang ibu!" 💖👧
  Maryam : "Bagus! Aku juga: Ayah baca buku!" 📚
  Maheer : "Aku: Adik main bola!" ⚽👦
  Khadijah: "Wah, kalian sudah pandai bikin kalimat!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
**Kalimat** selalu:
1. Diawali **huruf kapital** (A, B, C, ...) 🅰️
2. Diakhiri **tanda titik** (.) ⚫
3. Terdiri dari beberapa **kata** yang bermakna 🎯

---

### 🔍 Ayo Coba Sendiri:
* "Ayah baca ..." 👉 **buku** 📚
* "Ibu masak ..." 👉 **nasi** 🍚
* "Aku sayang ..." 👉 **ibu** 💖`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita bikin kalimat indah tentang keluarga!',
                ice_breaker:
                    'Ayo tepuk tangan sambil sebut: "A-ku sa-yang i-bu!" — tepuk 5x!',
                apperception:
                    'Coba sebut satu kalimat tentang ibumu. Kata apa yang kamu pakai?',
                trigger_question:
                    'Bagaimana cara bikin kalimat yang benar? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kalimat sederhana: diawali huruf kapital, diakhiri titik, terdiri beberapa kata.',
                concrete_steps: [
                    'Tunjukkan kalimat "Ayah baca buku."',
                    'Baca bersama 3x dengan intonasi ramah.',
                    'Tunjukkan huruf kapital "A" di awal & titik "." di akhir.',
                    'Lanjut "Ibu masak nasi.", "Aku sayang ibu."',
                    'Minta anak bikin kalimat sendiri tentang keluarga.',
                ],
                script_parent:
                    '"Nah sayang, kalimat selalu diawali huruf besar dan diakhiri titik. Yuk, kita bikin kalimat!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Puzzle Kalimat Keluarga',
                game_rules: [
                    'Guru membagikan kartu kata acak ("Ayah", "baca", "buku").',
                    'Anak menyusun jadi kalimat yang benar.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyusun dengan bantuan guru, 3 kata dulu.',
                    child_level_advanced:
                        'Menyusun 4-5 kata sendiri & menuliskan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kalimat sederhana.',
                worksheet_print_ready: {
                    title: 'LKPD 3.3: Kalimat tentang Keluargaku',
                    instructions:
                        'Baca kalimat dengan nyaring, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question: 'Baca kalimat berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'Ayah baca buku.', icon: '👨📚' },
                                    { text: 'Ibu masak nasi.', icon: '👩🍚' },
                                    { text: 'Aku sayang ibu.', icon: '💖' },
                                ],
                            },
                            answer_key: 'Anak membaca dengan lancar.',
                            explanation: 'Membaca kalimat sederhana.',
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
                    'Bagaimana cara menulis kalimat yang benar?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan ceria: "Ayah baca buku. Ibu masak nasi. Aku sayang ibu."',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 3: Keluargaku Tersayang',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kata "ayah" terdiri dari berapa suku kata?',
                            option_a: '1',
                            option_b: '2',
                            option_c: '3',
                            option_d: '4',
                            correct_answer: 'B',
                            explanation: 'a-yah = 2 suku kata.',
                        },
                        {
                            question_text: 'Kata "meja" artinya...',
                            option_a: 'Alat untuk duduk',
                            option_b: 'Alat untuk menulis & makan',
                            option_c: 'Alat untuk tidur',
                            option_d: 'Alat untuk memasak',
                            correct_answer: 'B',
                            explanation: 'Meja untuk menulis & makan.',
                        },
                        {
                            question_text: 'Kalimat "Ini bola." diakhiri dengan tanda...',
                            option_a: 'Titik (.)',
                            option_b: 'Tanya (?)',
                            option_c: 'Seru (!)',
                            option_d: 'Koma (,)',
                            correct_answer: 'A',
                            explanation: 'Kalimat berita diakhiri titik.',
                        },
                        {
                            question_text: 'Kata "ibu" jika dipecah menjadi suku kata...',
                            option_a: 'i-bu',
                            option_b: 'ib-u',
                            option_c: 'i-b-u',
                            option_d: 'ibu',
                            correct_answer: 'A',
                            explanation: 'ibu = i + bu.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 4: AYO DENGARKAN CERITA SERU
// =============================================================================
const BAB_4: SeedModuleItem = {
    title: 'Bab 4: Ayo Dengarkan Cerita Seru',
    order_index: 4,
    target_semester: 1,
    week_target: 10,
    lessons: [
        {
            title: 'Pertemuan 10: Menyimak Cerita "Kucing Kecil yang Lapar"',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyimak cerita pendek dan menjawab pertanyaan tentang isi cerita.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita tertulis "Kucing Kecil yang Lapar"',
                'Gambar tokoh cerita',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🐱 Cerita: Kucing Kecil yang Lapar

Halo sahabat cilik! Hari ini **Maryam** dan **Fatimah** punya cerita seru 
tentang **kucing kecil yang lapar**. Ayo kita simak bersama! 🎉

---

### 📖 1. Cerita "Kucing Kecil yang Lapar"

\`\`\`text
🐱 Si kucing kecil lapar.
🍽️ Ia mencari makan ke sana kemari.
🐟 Akhirnya ia menemukan ikan segar.
😊 Si kucing senang sekali!
\`\`\`

**Gambar pendamping:**
🐱 → 🍽️ → 🐟 → 😊

---

### 🎭 Komik: Maryam & Fatimah Membahas Cerita

\`\`\`text
  Maryam  : "Fatimah, siapa tokoh dalam cerita tadi?" 👧
  Fatimah : "Si kucing kecil!" 🐱👧
  Maryam  : "Apa yang ia cari?" 👧
  Fatimah : "Ia mencari makan!" 🍽️
  Maheer  : "Apa yang ia temukan?" 👦
  Fatimah : "Ikan segar!" 🐟✨
  Khadijah: "Kalian menyimak dengan hebat!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Saat menyimak cerita, kita harus:
1. **Duduk tenang** 🤫
2. **Mendengar dengan saksama** 👂
3. **Mengingat tokoh & isi cerita** 🧠

---

### 🔍 Ayo Jawab Bersama:
* Siapa tokoh cerita? 👉 **Si kucing kecil** 🐱
* Apa yang ia cari? 👉 **Makanan** 🍽️
* Apa yang ia temukan? 👉 **Ikan segar** 🐟
* Bagaimana perasaannya? 👉 **Senang sekali** 😊

Ayo jadi **Penyimak Cerita Hebat** bersama Maryam & Fatimah! 🎧✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menyimak cerita seru tentang kucing kecil!',
                ice_breaker:
                    'Ayo tirukan suara kucing: "Meooong!" — sekarang suara kucing lapar: "Meooong... meooong..."',
                apperception:
                    'Coba pikirkan: kalau kucing lapar, ia akan cari apa?',
                trigger_question:
                    'Siapa tokoh dalam cerita "Kucing Kecil yang Lapar"? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menyimak cerita pendek dengan saksama & menjawab pertanyaan.',
                concrete_steps: [
                    'Bacakan cerita "Kucing Kecil yang Lapar" dengan intonasi ramah.',
                    'Ulangi 2x agar anak ingat.',
                    'Tanya: "Siapa tokohnya?" — biarkan anak jawab.',
                    'Tanya: "Apa yang ia cari?" — bantu jika perlu.',
                    'Beri apresiasi setiap jawaban benar.',
                ],
                script_parent:
                    '"Simak baik-baik ya sayang. Nanti Ibu tanya siapa tokohnya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Cerita Ceria',
                game_rules: [
                    'Guru bertanya tentang isi cerita.',
                    'Anak menjawab sambil melompat kecil.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menjawab dengan bantuan guru, 2 pertanyaan dulu.',
                    child_level_advanced:
                        'Menceritakan ulang dengan bahasa sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca cerita & menggambar tokoh.',
                worksheet_print_ready: {
                    title: 'LKPD 4.1: Cerita Kucing Kecil yang Lapar',
                    instructions:
                        'Baca cerita berikut, lalu gambar tokohnya!',
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
                            answer_key: 'Anak membaca cerita.',
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
                            answer_key: 'Anak menggambar kucing.',
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
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Siapa tokoh cerita, sayang?',
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
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menjawab pertanyaan tentang isi cerita dengan kalimat sederhana.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita pendek',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ❓ Ayo Jawab Pertanyaan Cerita!

Halo sahabat cilik! Setelah menyimak cerita, sekarang **Asiya** dan **Maheer** 
akan mengajak kalian **menjawab pertanyaan** tentang cerita! 🎉

---

### 🌟 1. Pertanyaan tentang Cerita

Bacalah cerita berikut:

\`\`\`text
👦 Ari punya buku baru.
📚 Ia suka membaca buku.
🏠 Ari membaca buku di kamar.
\`\`\`

**Pertanyaan & Jawaban:**

| Pertanyaan | Jawaban |
| :--- | :--- |
| Siapa tokoh cerita? | **Ari** 👦 |
| Apa yang Ari punya? | **Buku baru** 📚 |
| Di mana Ari membaca? | **Di kamar** 🏠 |
| Apa yang Ari suka? | **Membaca buku** 📖 |

---

### 🎭 Komik: Asiya & Maheer Jawab Pertanyaan

\`\`\`text
  Asiya  : "Maheer, siapa tokoh cerita tadi?" 👧
  Maheer : "Ari!" 👦
  Asiya  : "Apa yang ia punya?" 👧
  Maheer : "Buku baru!" 📚
  Asiya  : "Di mana ia membaca?" 👧
  Maheer : "Di kamar!" 🏠
  Khadijah: "Hebat, kalian bisa menjawab semua!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Pertanyaan cerita biasanya tentang:
1. **Siapa** tokohnya? 👤
2. **Apa** yang dilakukan? 🎬
3. **Di mana** kejadiannya? 📍
4. **Kapan** kejadiannya? ⏰
5. **Mengapa** ia melakukan? 🤔

---

### 🔍 Ayo Coba Sendiri:
Bacalah cerita baru ini:
\`\`\`text
🐱 Si kucing kecil lapar.
🍽️ Ia mencari makan.
🐟 Ia menemukan ikan.
\`\`\`

Sekarang jawab:
* Siapa tokohnya? 👉 **Si kucing** 🐱
* Apa yang ia cari? 👉 **Makanan** 🍽️
* Apa yang ia temukan? 👉 **Ikan** 🐟`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menjawab pertanyaan tentang cerita!',
                ice_breaker:
                    'Ayo tepuk tangan: "Siapa?" tepuk 1x, "Apa?" tepuk 2x, "Di mana?" tepuk 3x!',
                apperception:
                    'Coba ingat cerita "Kucing Kecil" kemarin. Siapa tokohnya?',
                trigger_question:
                    'Bagaimana cara menjawab pertanyaan tentang cerita?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menjawab pertanyaan cerita: siapa, apa, di mana, kapan, mengapa.',
                concrete_steps: [
                    'Bacakan cerita "Ari punya buku baru" dengan intonasi ramah.',
                    'Tanya: "Siapa tokohnya?" — biarkan anak jawab.',
                    'Tanya: "Apa yang Ari punya?" — bantu jika perlu.',
                    'Tanya: "Di mana Ari membaca?" — biarkan anak jawab.',
                    'Ulangi cerita 2x agar anak ingat.',
                ],
                script_parent:
                    '"Nah sayang, pertanyaan cerita biasanya tentang siapa, apa, dan di mana. Yuk, kita jawab bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Jawab Cepat Ceria',
                game_rules: [
                    'Guru bertanya tentang cerita.',
                    'Anak menjawab dengan cepat sambil berdiri.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menjawab dengan bantuan guru, 1-2 kata jawaban.',
                    child_level_advanced:
                        'Menjawab dengan kalimat lengkap.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menjawab pertanyaan cerita.',
                worksheet_print_ready: {
                    title: 'LKPD 4.2: Menjawab Pertanyaan Cerita',
                    instructions:
                        'Simak cerita, lalu jawab pertanyaan berikut!',
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
                            answer_key: 'Anak membaca cerita.',
                            explanation: 'Menyimak cerita.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question:
                                'Jawab: Siapa tokoh cerita? Di mana Ari membaca?',
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
                            answer_key: 'Anak menggambar Ari membaca.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Pertanyaan apa yang paling mudah, sayang?',
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
            title: 'Pertemuan 12: Ayo Ceritakan Ulang Cerita',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menceritakan ulang isi cerita dengan bahasa sendiri.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita pendek',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎤 Ayo Ceritakan Ulang Cerita!

Halo sahabat cilik! Sekarang saatnya **Maryam**, **Asiya**, **Fatimah**, 
**Maheer**, dan **Khadijah** mengajak kalian **menceritakan ulang** cerita 
dengan bahasa sendiri! 🎉

---

### 🌟 1. Cerita "Budi Bermain Bola"

Bacalah cerita berikut:

\`\`\`text
⚽ Budi punya bola baru.
🏡 Ia bermain bola di halaman.
😊 Budi senang sekali.
\`\`\`

**Sekarang ceritakan ulang dengan bahasamu sendiri!**

Contoh:
> "Budi punya bola. Ia main di halaman. Ia senang."

---

### 🎭 Komik: Sahabat Ceritakan Ulang

\`\`\`text
  Maryam  : "Ayo ceritakan ulang cerita Budi!" 👧
  Asiya   : "Budi punya bola baru!" ⚽👧
  Fatimah : "Ia bermain di halaman!" 🏡👧
  Maheer  : "Budi senang sekali!" 😊👦
  Khadijah: "Bagus! Kalian bisa menceritakan ulang!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Menceritakan ulang artinya:
1. **Membaca cerita** dengan saksama 📖
2. **Mengingat** tokoh, tempat, & kejadian 🧠
3. **Menceritakan** dengan bahasa sendiri 🎤

---

### 🔍 Ayo Coba Sendiri:
Bacalah cerita baru ini:
\`\`\`text
🐱 Si kucing kecil lapar.
🍽️ Ia mencari makan.
🐟 Ia menemukan ikan.
\`\`\`

Sekarang ceritakan ulang dengan bahasamu! 🎉`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menceritakan ulang cerita dengan bahasa sendiri!',
                ice_breaker:
                    'Ayo tirukan gerakan bercerita: tangan terbuka lebar, suara lantang, senyum manis!',
                apperception:
                    'Coba ingat cerita "Kucing Kecil" kemarin. Bisa ceritakan ulang?',
                trigger_question:
                    'Bagaimana cara menceritakan ulang cerita? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menceritakan ulang cerita dengan bahasa sendiri.',
                concrete_steps: [
                    'Bacakan cerita "Budi Bermain Bola" dengan intonasi ramah.',
                    'Ulangi 2x agar anak ingat.',
                    'Minta anak menceritakan ulang dengan bahasa sendiri.',
                    'Bantu jika anak lupa: "Siapa tokohnya? Ia main di mana?"',
                    'Beri apresiasi setiap usaha anak.',
                ],
                script_parent:
                    '"Nah sayang, ceritakan ulang dengan bahasamu sendiri. Tidak perlu sama persis!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Cerita Berantai Ceria',
                game_rules: [
                    'Guru memulai cerita: "Budi punya bola baru..."',
                    'Anak melanjutkan: "...ia bermain di halaman..."',
                    'Giliran berikutnya melanjutkan lagi.',
                    'Yang paling seru & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Bercerita dengan bantuan guru, 1 kalimat dulu.',
                    child_level_advanced:
                        'Bercerita 3 kalimat sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menceritakan ulang & menulis cerita.',
                worksheet_print_ready: {
                    title: 'LKPD 4.3: Ayo Ceritakan Ulang!',
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
                            answer_key: 'Anak membaca cerita.',
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
                            answer_key: 'Anak menulis cerita ulang.',
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
                            answer_key: 'Anak menggambar Budi.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana perasaanmu bercerita, sayang?',
                    'Cerita apa yang paling mudah diceritakan?',
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
                    prompt: 'Kuis Bab 4: Ayo Dengarkan Cerita Seru',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Saat menyimak cerita, kita harus...',
                            option_a: 'Bermain',
                            option_b: 'Menyimak dengan saksama',
                            option_c: 'Bicara',
                            option_d: 'Tidur',
                            correct_answer: 'B',
                            explanation: 'Menyimak dengan saksama.',
                        },
                        {
                            question_text: 'Menjawab pertanyaan cerita sebaiknya dengan...',
                            option_a: 'Kalimat sederhana',
                            option_b: 'Angka',
                            option_c: 'Gambar',
                            option_d: 'Suara keras',
                            correct_answer: 'A',
                            explanation: 'Kalimat sederhana.',
                        },
                        {
                            question_text: 'Menceritakan ulang berarti...',
                            option_a: 'Membaca cerita',
                            option_b: 'Menyalin cerita',
                            option_c: 'Bercerita dengan bahasa sendiri',
                            option_d: 'Menulis cerita baru',
                            correct_answer: 'C',
                            explanation: 'Bercerita dengan bahasa sendiri.',
                        },
                        {
                            question_text: 'Tokoh cerita "Budi punya bola baru" adalah...',
                            option_a: 'Bola',
                            option_b: 'Budi',
                            option_c: 'Halaman',
                            option_d: 'Baru',
                            correct_answer: 'B',
                            explanation: 'Tokohnya Budi.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const BAHASA_INDONESIA_BATCH_2: SeedModuleItem[] = [BAB_3, BAB_4];