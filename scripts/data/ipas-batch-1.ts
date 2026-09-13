// data/ipas-batch-1.ts
// Bab 1-2: Aku dan Tubuhku & Keluargaku Tersayang (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 1: AKU DAN TUBUHKU
// =============================================================================
const BAB_1: SeedModuleItem = {
    title: 'Bab 1: Aku dan Tubuhku',
    order_index: 1,
    target_semester: 1,
    week_target: 1,
    lessons: [
        {
            title: 'Pertemuan 1: Bagian-Bagian Tubuh Ajaibku',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyebutkan bagian-bagian tubuh (kepala, badan, tangan, kaki) dan fungsinya dengan gembira.',
            allocated_minutes: 45,
            required_materials: [
                'Poster bagian tubuh manusia',
                'Cermin kecil',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌟 Ayo Kenalan dengan Tubuh Ajaibku!

Halo sahabat cilik! Hari ini **Maryam** dan **Maheer** akan mengajak kalian 
berkenalan dengan **tubuh ajaib** yang Tuhan berikan kepada kita! 🎉

---

### 🌟 1. Bagian-Bagian Tubuhku

| Bagian | Fungsi | Emoji |
| :---: | :--- | :---: |
| **Kepala** | Untuk berpikir & melihat | 🧠 |
| **Badan** | Melindungi organ dalam | 🫀 |
| **Tangan** | Untuk memegang & menulis | ✋ |
| **Kaki** | Untuk berjalan & berlari | 🦶 |

---

### 🎭 Komik: Maryam & Maheer Bercermin

\`\`\`text
  Maryam : "Maheer, ayo bercermin! Bagian tubuh apa yang kamu lihat?" 👧
  Maheer : "Aku lihat kepalaku! Untuk berpikir!" 🧠👦
  Maryam : "Aku lihat tanganku! Untuk memegang!" ✋
  Asiya  : "Aku lihat kakiku! Untuk berjalan!" 🦶👧
  Khadijah: "Tubuh kita ajaib, ya! Karunia Tuhan!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tubuh kita adalah **karunia Tuhan** yang harus dijaga! 
Setiap bagian punya tugas penting. 🎯

---

### 🔍 Ayo Cari di Tubuhmu:
* Tunjuk **kepalamu**! 👉 Untuk berpikir 🧠
* Tunjuk **tanganmu**! 👉 Untuk memegang ✋
* Tunjuk **kakimu**! 👉 Untuk berjalan 🦶

Ayo jadi **Detektif Tubuh** bersama Maryam & Maheer! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan tubuh ajaib kita!',
                ice_breaker:
                    'Ayo nyanyikan "Kepala, Pundak, Lutut, Kaki" bersama-sama!',
                apperception:
                    'Coba sentuh kepalamu. Apa yang bisa kamu lakukan dengan kepala?',
                trigger_question:
                    'Bagian tubuh apa saja yang kalian miliki? Ayo kita sebutkan!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tubuh manusia terdiri dari kepala, badan, tangan, kaki dengan fungsi berbeda.',
                concrete_steps: [
                    'Tunjukkan poster bagian tubuh.',
                    'Tunjuk kepala: "Ini kepala, untuk berpikir!"',
                    'Tunjuk tangan: "Ini tangan, untuk memegang!"',
                    'Tunjuk kaki: "Ini kaki, untuk berjalan!"',
                    'Ajak anak bercermin & menyebutkan bagian tubuhnya.',
                ],
                script_parent:
                    '"Tubuh kita karunia Tuhan. Yuk, kenali setiap bagiannya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sentuh Bagian Tubuh!',
                game_rules: [
                    'Guru menyebutkan nama bagian tubuh.',
                    'Anak menyentuh bagian tersebut dengan cepat.',
                    'Yang paling cepat & benar dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyentuh dengan bantuan guru, 3 bagian dulu.',
                    child_level_advanced:
                        'Menyebutkan fungsi sambil menyentuh.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar tubuh & melabeli bagiannya.',
                worksheet_print_ready: {
                    title: 'LKPD 1.1: Bagian-Bagian Tubuh Ajaibku',
                    instructions:
                        'Jodohkan bagian tubuh dengan fungsinya, lalu warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan bagian tubuh dengan fungsinya!',
                            data: {
                                pairs: [
                                    { left: '🧠 Kepala', right: 'Untuk berpikir' },
                                    { left: '✋ Tangan', right: 'Untuk memegang' },
                                    { left: '🦶 Kaki', right: 'Untuk berjalan' },
                                ],
                            },
                            answer_key: 'Kepala→berpikir, Tangan→memegang, Kaki→berjalan.',
                            explanation: 'Mengenal fungsi bagian tubuh.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah dirimu lengkap dari kepala sampai kaki!',
                            data: {
                                prompt: 'Tubuhku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Gambar tubuhku:',
                            },
                            answer_key: 'Anak menggambar tubuh lengkap.',
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
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih syukur.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja bagian tubuhmu, sayang?',
                    'Apa fungsi tanganmu?',
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
            title: 'Pertemuan 2: Lima Indra Ajaibku',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal 5 indra manusia (mata, telinga, hidung, kulit, lidah) dan fungsinya.',
            allocated_minutes: 45,
            required_materials: [
                'Buah-buahan untuk pengamatan',
                'Benda berbagai tekstur (kapas, batu, kain)',
                'Kotak tertutup',
                'LKPD',
            ],
            content_text: `# 👀 Ayo Kenalan dengan 5 Indra Ajaib!

Halo sahabat cilik! Tahukah kamu, kita punya **5 indra ajaib** untuk 
mengenal dunia? Ayo **Asiya** dan **Fatimah** ajak kalian kenalan! 🎉

---

### 🌟 1. Lima Indra Sahabat Kita

| Indra | Fungsi | Emoji |
| :---: | :--- | :---: |
| **Mata** | Untuk melihat | 👁️ |
| **Telinga** | Untuk mendengar | 👂 |
| **Hidung** | Untuk mencium bau | 👃 |
| **Lidah** | Untuk mengecap rasa | 👅 |
| **Kulit** | Untuk meraba | ✋ |

---

### 🎭 Komik: Asiya & Fatimah Tebak Indra

\`\`\`text
  Asiya  : "Fatimah, dengan apa kita melihat pelangi?" 👧
  Fatimah: "Dengan mata! Indra penglihatan!" 👁️👧
  Asiya  : "Kalau mendengar burung berkicau?" 
  Fatimah: "Dengan telinga!" 👂
  Maheer : "Kalau mencium bau bunga?" 👦
  Fatimah: "Dengan hidung!" 👃
  Khadijah: "Kalian hebat! 5 indra kita ajaib!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
5 indra membantu kita **mengenal dunia**! 
Semua adalah karunia Tuhan yang harus dijaga. 🎯

---

### 🔍 Ayo Coba Indramu:
* Tutup matamu. Apa yang kamu dengar? 👂
* Cium bunga di sekitarmu. Wangi, kan? 👃
* Raba meja. Halus atau kasar? ✋

Ayo jadi **Detektif Indra** bersama Asiya & Fatimah! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan 5 indra ajaib!',
                ice_breaker:
                    'Ayo tutup matamu, apa yang kamu dengar? Sekarang buka, apa yang kamu lihat?',
                apperception:
                    'Coba pegang apel di meja. Bagaimana kamu tahu itu apel?',
                trigger_question:
                    'Bagaimana cara kita mengenal benda di sekitar?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    '5 indra: mata, telinga, hidung, lidah, kulit — semuanya untuk mengenal dunia.',
                concrete_steps: [
                    'Tunjukkan mata: "Ini mata, untuk melihat."',
                    'Tunjukkan telinga: "Ini telinga, untuk mendengar."',
                    'Tunjukkan hidung: "Ini hidung, untuk mencium."',
                    'Tunjukkan lidah: "Ini lidah, untuk mengecap."',
                    'Tunjukkan kulit: "Ini kulit, untuk meraba."',
                ],
                script_parent:
                    '"Indra kita jendela dunia. Yuk, gunakan dengan baik!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak dengan Indra!',
                game_rules: [
                    'Guru menutup mata anak dengan kain.',
                    'Anak mencium bau buah → tebak nama buahnya.',
                    'Anak meraba benda → tebak teksturnya.',
                    'Setiap jawaban benar dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan tekstur & fungsinya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal 5 indra & fungsinya.',
                worksheet_print_ready: {
                    title: 'LKPD 1.2: Lima Indra Ajaibku',
                    instructions:
                        'Jodohkan indra dengan fungsinya, lalu warnai gambarnya!',
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
                            explanation: 'Mengenal 5 indra.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah 3 benda yang bisa kamu lihat dengan mata!',
                            data: {
                                prompt: 'Benda yang kulihat',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Benda yang kulihat:',
                            },
                            answer_key: 'Anak menggambar 3 benda.',
                            explanation: 'Melatih pengamatan visual.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja 5 indra manusia, sayang?',
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
            title: 'Pertemuan 3: Ayo Rawat Tubuhku!',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mempraktikkan cara merawat tubuh dan menjelaskan pentingnya menjaga kebersihan.',
            allocated_minutes: 45,
            required_materials: [
                'Alat peraga kebersihan (sikat gigi, sabun, handuk)',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🚿 Ayo Rawat Tubuhku!

Halo sahabat cilik! Tubuh kita karunia Tuhan, jadi harus **dirawat dengan baik**! 
Ayo **Maheer** dan **Khadijah** ajak kalian belajar merawat tubuh! 🎉

---

### 🌟 1. Cara Merawat Tubuh

| Kegiatan | Kapan | Emoji |
| :--- | :--- | :---: |
| **Mandi** | Pagi & sore | 🚿 |
| **Sikat gigi** | Pagi & sebelum tidur | 🦷 |
| **Cuci tangan** | Sebelum makan & setelah bermain | 🧼 |
| **Potong kuku** | Setiap minggu | ✂️ |
| **Ganti baju** | Setiap hari | 👕 |

---

### 🎭 Komik: Maheer & Khadijah Berbagi Kebiasaan

\`\`\`text
  Maheer  : "Khadijah, aku sudah mandi pagi tadi!" 🚿👦
  Khadijah: "Hebat! Aku juga sikat gigi sebelum tidur!" 🦷👧
  Maheer  : "Aku cuci tangan sebelum makan!" 🧼
  Khadijah: "Bagus! Tubuh bersih = tubuh sehat!" 💪
  Asiya   : "Aku juga potong kuku setiap minggu!" ✂️👧
  Khadijah: "Kalian semua anak sehat!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tubuh bersih = tubuh sehat = hati senang! 
Mandi, sikat gigi, cuci tangan — semuanya penting! 🎯

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah **mandi** hari ini? 🚿
* Sudah **sikat gigi**? 🦷
* Sudah **cuci tangan** sebelum makan? 🧼

Ayo jadi **Anak Sehat** bersama Maheer & Khadijah! 💪✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar merawat tubuh agar sehat & bersih!',
                ice_breaker:
                    'Ayo nyanyikan "Aku Anak Sehat" bersama-sama!',
                apperception:
                    'Siapa yang tadi pagi sudah mandi? Siapa yang sudah sikat gigi?',
                trigger_question:
                    'Bagaimana cara merawat tubuhmu? Mengapa penting?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Merawat tubuh dengan mandi, sikat gigi, cuci tangan, potong kuku.',
                concrete_steps: [
                    'Tunjukkan sikat gigi: "Ini untuk sikat gigi, pagi & sebelum tidur."',
                    'Tunjukkan sabun: "Ini untuk mandi & cuci tangan."',
                    'Tunjukkan handuk: "Ini untuk mengeringkan tubuh."',
                    'Ajak anak memeragakan gerakan sikat gigi.',
                    'Beri apresiasi setiap usaha anak.',
                ],
                script_parent:
                    '"Tubuh bersih = tubuh sehat! Yuk, rawat tubuh dengan baik."',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Aku Bisa Merawat Tubuh!',
                game_rules: [
                    'Guru menyebutkan aktivitas (mandi, sikat gigi, cuci tangan).',
                    'Anak memeragakan gerakannya.',
                    'Yang paling semangat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memeragakan dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan langkah lengkap.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat jurnal merawat tubuh.',
                worksheet_print_ready: {
                    title: 'LKPD 1.3: Ayo Rawat Tubuhku!',
                    instructions:
                        'Centang ✓ kegiatan merawat tubuh yang sudah kamu lakukan!',
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
                            answer_key: 'Anak mencentang kegiatan yang sudah dilakukan.',
                            explanation: 'Melatih kebiasaan sehat.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'EXPRESSION_CARD',
                            question: 'Bagaimana perasaanmu setelah tubuhmu bersih?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah tubuhmu bersih?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Segar' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Mandi' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara merawat tubuhmu, sayang?',
                    'Mengapa penting menjaga kebersihan?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 1.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 1: Aku dan Tubuhku',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Bagian tubuh untuk berpikir adalah...',
                            option_a: 'Kepala',
                            option_b: 'Tangan',
                            option_c: 'Kaki',
                            option_d: 'Perut',
                            correct_answer: 'A',
                            explanation: 'Kepala untuk berpikir.',
                        },
                        {
                            question_text: 'Berapa jumlah indra manusia?',
                            option_a: '3',
                            option_b: '4',
                            option_c: '5',
                            option_d: '6',
                            correct_answer: 'C',
                            explanation: '5 indra: mata, telinga, hidung, lidah, kulit.',
                        },
                        {
                            question_text: 'Kita mendengar suara dengan...',
                            option_a: 'Mata',
                            option_b: 'Telinga',
                            option_c: 'Hidung',
                            option_d: 'Lidah',
                            correct_answer: 'B',
                            explanation: 'Mendengar dengan telinga.',
                        },
                        {
                            question_text: 'Cara merawat tubuh antara lain...',
                            option_a: 'Malas mandi',
                            option_b: 'Tidak sikat gigi',
                            option_c: 'Mandi 2x sehari',
                            option_d: 'Tidak cuci tangan',
                            correct_answer: 'C',
                            explanation: 'Mandi 2x sehari = tubuh bersih.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 2: KELUARGAKU TERSAYANG
// =============================================================================
const BAB_2: SeedModuleItem = {
    title: 'Bab 2: Keluargaku Tersayang',
    order_index: 2,
    target_semester: 1,
    week_target: 4,
    lessons: [
        {
            title: 'Pertemuan 4: Ayo Kenalan dengan Keluargaku!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyebutkan anggota keluarga inti (ayah, ibu, kakak, adik) dan perannya.',
            allocated_minutes: 45,
            required_materials: [
                'Foto keluarga (opsional)',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 👨‍👩‍👧 Ayo Kenalan dengan Keluargaku!

Halo sahabat cilik! Keluarga adalah **harta paling berharga**! 
Ayo **Maryam** dan **Asiya** ajak kalian kenalan dengan anggota keluarga! 🎉

---

### 🌟 1. Anggota Keluarga Inti

| Anggota | Peran | Emoji |
| :---: | :--- | :---: |
| **Ayah** | Kepala keluarga | 👨 |
| **Ibu** | Mengurus rumah | 👩 |
| **Kakak** | Melindungi adik | 👦 |
| **Adik** | Disayang keluarga | 👶 |

---

### 🎭 Komik: Maryam & Asiya Cerita Keluarga

\`\`\`text
  Maryam : "Asiya, siapa saja anggota keluargamu?" 👧
  Asiya  : "Ada ayah, ibu, kakak, dan adik!" 👧✨
  Maryam : "Aku sayang ayah & ibu!" 💖
  Asiya  : "Aku juga sayang semuanya!" 
  Maheer : "Aku punya kakak yang baik!" 👦
  Khadijah: "Keluarga itu indah sekali!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Keluarga inti terdiri dari **ayah, ibu, dan anak**. 
Kita sayang mereka semua! 💕

---

### 🔍 Ayo Cari di Rumahmu:
* Siapa **ayah**mu? 👉 Peluk beliau! 🤗
* Siapa **ibu**mu? 👉 Cium tangannya! 💖
* Ada **kakak**? 👉 Ajak bermain! 🎮
* Ada **adik**? 👉 Ajak bercanda! 😄

Ayo jadi **Anak Sayang Keluarga** bersama Maryam & Asiya! 🏡✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan keluarga tercinta!',
                ice_breaker:
                    'Ayo nyanyikan "Satu-Satu Aku Sayang Ibu" bersama-sama!',
                apperception:
                    'Siapa yang tinggal bersama ayah dan ibu? Siapa yang punya kakak?',
                trigger_question:
                    'Siapa saja anggota keluargamu? Ayo sebutkan!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Keluarga inti: ayah, ibu, kakak, adik. Setiap anggota punya peran.',
                concrete_steps: [
                    'Tunjukkan gambar ayah: "Ini ayah, kepala keluarga."',
                    'Tunjukkan gambar ibu: "Ini ibu, mengurus rumah."',
                    'Tunjukkan gambar kakak: "Ini kakak, melindungi adik."',
                    'Tunjukkan gambar adik: "Ini adik, disayang keluarga."',
                    'Ajak anak menyebutkan nama anggota keluarganya.',
                ],
                script_parent:
                    '"Keluarga adalah harta paling berharga. Sayangi ayah, ibu, dan saudaramu!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Anggota Keluarga',
                game_rules: [
                    'Guru menunjukkan gambar anggota keluarga.',
                    'Anak menebak nama peran (ayah/ibu/kakak/adik).',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan peran setiap anggota.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar keluarga & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 2.1: Ayo Kenalan dengan Keluargaku!',
                    instructions:
                        'Jodohkan anggota keluarga dengan perannya, lalu gambar keluargamu!',
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
                            answer_key: 'Anak menggambar keluarga.',
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
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih syukur.',
                        },
                    ],
                },
                reflection_questions: [
                    'Siapa saja anggota keluargamu, sayang?',
                    'Apa peran ayahmu?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menggambar keluarga pada LKPD 2.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 5: Peran Anggota Keluargaku',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menjelaskan peran & tanggung jawab setiap anggota keluarga.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 💖 Peran Anggota Keluargaku

Halo sahabat cilik! Setiap anggota keluarga punya **peran penting**! 
Ayo **Fatimah** dan **Maheer** ajak kalian belajar peran keluarga! 🎉

---

### 🌟 1. Peran & Tanggung Jawab

| Anggota | Peran | Tugas |
| :---: | :--- | :--- |
| **Ayah** | Kepala keluarga | Mencari nafkah |
| **Ibu** | Ibu tercinta | Mengurus rumah |
| **Kakak** | Pelindung | Menjaga adik |
| **Anak** | Pelajar | Belajar & membantu |

---

### 🎭 Komik: Fatimah & Maheer Bahas Peran

\`\`\`text
  Fatimah: "Maheer, apa peran ayah di rumah?" 👧
  Maheer : "Ayah mencari nafkah untuk keluarga!" 💼👦
  Fatimah: "Kalau ibu?" 👧
  Maheer : "Ibu mengurus rumah & masak!" 🍳
  Asiya  : "Aku membantu ibu cuci piring!" 🧼👧
  Khadijah: "Bagus! Anak juga punya peran!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Setiap anggota keluarga punya **peran berbeda**, 
tapi semua **saling melengkapi**! 🎯

---

### 🔍 Ayo Cek Peranmu:
* Apa peranmu di rumah? 👉 **Belajar & membantu** 📚
* Bagaimana kamu membantu ibu? 👉 **Cuci piring, rapikan kamar** 🧼
* Bagaimana kamu membantu ayah? 👉 **Ambilkan barang** 🤝

Ayo jadi **Anak Bertanggung Jawab**! 💪✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar peran setiap anggota keluarga!',
                ice_breaker:
                    'Ayo tepuk tangan: "Ayah!" 1x, "Ibu!" 1x, "Anak!" 1x!',
                apperception:
                    'Apa yang ayahmu lakukan setiap hari? Apa yang ibumu lakukan?',
                trigger_question:
                    'Apa peranmu dalam keluarga? Bagaimana kamu membantu?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Setiap anggota keluarga punya peran & tanggung jawab masing-masing.',
                concrete_steps: [
                    'Jelaskan peran ayah: mencari nafkah.',
                    'Jelaskan peran ibu: mengurus rumah.',
                    'Jelaskan peran anak: belajar & membantu.',
                    'Diskusi peran di rumah masing-masing.',
                    'Beri apresiasi setiap cerita anak.',
                ],
                script_parent:
                    '"Kalau semua jalankan peran, keluarga bahagia!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Keluargaku di Rumah',
                game_rules: [
                    'Bagi anak dalam kelompok.',
                    'Setiap kelompok memerankan keluarga.',
                    'Satu anak jadi ayah, satu ibu, satu anak.',
                    'Kelompok terbaik dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Bermain peran dengan bantuan guru.',
                    child_level_advanced: 'Membuat dialog sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menuliskan tanggung jawab di rumah.',
                worksheet_print_ready: {
                    title: 'LKPD 2.2: Peran Anggota Keluargaku',
                    instructions:
                        'Jodohkan anggota keluarga dengan tugasnya, lalu tulis peranmu!',
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
                                ],
                            },
                            answer_key: 'Ayah→nafkah, Ibu→rumah, Anak→belajar.',
                            explanation: 'Mengenal tanggung jawab keluarga.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah dirimu membantu orang tua!',
                            data: {
                                prompt: 'Aku membantu orang tua',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku membantu orang tua:',
                            },
                            answer_key: 'Anak menggambar aktivitas membantu.',
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
                    prompt:
                        'Rekam suaramu menyebutkan peranmu dalam keluarga!',
                },
            ],
        },
        {
            title: 'Pertemuan 6: Kasih Sayang dalam Keluargaku',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menunjukkan kasih sayang kepada anggota keluarga melalui sikap & ucapan.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas karton',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ❤️ Kasih Sayang dalam Keluargaku

Halo sahabat cilik! Kasih sayang membuat keluarga **bahagia & harmonis**! 
Ayo **Maryam** dan **Khadijah** ajak kalian belajar menunjukkan kasih sayang! 🎉

---

### 🌟 1. Cara Menunjukkan Kasih Sayang

| Cara | Contoh | Emoji |
| :--- | :--- | :---: |
| **Ucapan baik** | "Terima kasih", "Aku sayang kamu" | 💬 |
| **Pelukan** | Peluk ayah & ibu | 🤗 |
| **Membantu** | Bantu ibu cuci piring | 🧼 |
| **Mendengarkan** | Dengarkan nasihat orang tua | 👂 |

---

### 🎭 Komik: Maryam & Khadijah Berbagi Kasih

\`\`\`text
  Maryam  : "Khadijah, bagaimana cara menunjukkan sayang ke ibu?" 👧
  Khadijah: "Peluk ibu & ucapkan 'aku sayang ibu'!" 🤗💖
  Maryam  : "Aku juga bantu ibu cuci piring!" 🧼
  Asiya   : "Aku ucapkan terima kasih ke ayah!" 💬👧
  Maheer  : "Aku dengar nasihat orang tua!" 👂👦
  Khadijah: "Kalian anak penuh kasih sayang!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Kasih sayang bisa ditunjukkan dengan:
1. **Kata-kata baik** 💬
2. **Pelukan hangat** 🤗
3. **Perbuatan membantu** 🧼

---

### 🔍 Ayo Coba Sendiri:
* Peluk ayahmu hari ini! 🤗
* Ucapkan "aku sayang kamu" ke ibumu! 💖
* Bantu kakak atau adikmu! 🤝

Ayo jadi **Anak Penuh Kasih Sayang**! ❤️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar menunjukkan kasih sayang ke keluarga!',
                ice_breaker:
                    'Ayo nyanyikan "Kasih Ibu" bersama-sama!',
                apperception:
                    'Bagaimana cara kamu menunjukkan cinta ke orang tua?',
                trigger_question:
                    'Bagaimana cara menunjukkan kasih sayang ke keluarga?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kasih sayang ditunjukkan dengan ucapan baik, pelukan, dan perbuatan.',
                concrete_steps: [
                    'Contohkan ucapan "terima kasih".',
                    'Contohkan ucapan "aku sayang kamu".',
                    'Contohkan pelukan hangat.',
                    'Ajak anak memeragakan.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Kasih sayang itu gratis! Yuk, tunjukkan ke keluarga setiap hari!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Peluk Keluarga',
                game_rules: [
                    'Guru menyebutkan situasi (pagi hari, pulang sekolah).',
                    'Anak memeragakan kasih sayang sesuai situasi.',
                    'Yang paling ekspresif dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memeragakan dengan contoh guru.',
                    child_level_advanced: 'Memeragakan dengan ucapan sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat kartu kasih sayang.',
                worksheet_print_ready: {
                    title: 'LKPD 2.3: Kasih Sayang dalam Keluargaku',
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
                            answer_key: 'Anak menggambar kartu ucapan.',
                            explanation: 'Melatih ekspresi kasih sayang.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
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
                            answer_key: 'Anak mencentang ucapan baik.',
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
                    prompt: 'Kuis Bab 2: Keluargaku Tersayang',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kepala keluarga biasanya adalah...',
                            option_a: 'Anak',
                            option_b: 'Ayah',
                            option_c: 'Adik',
                            option_d: 'Tetangga',
                            correct_answer: 'B',
                            explanation: 'Ayah adalah kepala keluarga.',
                        },
                        {
                            question_text: 'Sikap kasih sayang bisa ditunjukkan dengan...',
                            option_a: 'Memukul adik',
                            option_b: 'Berkata kasar',
                            option_c: 'Membantu orang tua',
                            option_d: 'Membantah',
                            correct_answer: 'C',
                            explanation: 'Membantu orang tua = kasih sayang.',
                        },
                        {
                            question_text: 'Ucapan baik saat dibantu adalah...',
                            option_a: 'Tidak apa-apa',
                            option_b: 'Terima kasih',
                            option_c: 'Bodoh',
                            option_d: 'Cepatlah',
                            correct_answer: 'B',
                            explanation: 'Ucapkan terima kasih saat dibantu.',
                        },
                        {
                            question_text: 'Keluarga inti terdiri dari...',
                            option_a: 'Ayah, ibu, dan anak',
                            option_b: 'Tetangga',
                            option_c: 'Guru',
                            option_d: 'Teman',
                            correct_answer: 'A',
                            explanation: 'Keluarga inti = ayah, ibu, anak.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const IPAS_BATCH_1: SeedModuleItem[] = [BAB_1, BAB_2];