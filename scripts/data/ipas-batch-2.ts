// data/ipas-batch-2.ts
// Bab 3-4: Hewan & Tumbuhan di Sekitarku (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './types';

// =============================================================================
// BAB 3: HEWAN DI SEKITARKU
// =============================================================================
const BAB_3: SeedModuleItem = {
    title: 'Bab 3: Hewan di Sekitarku',
    order_index: 3,
    target_semester: 1,
    week_target: 7,
    lessons: [
        {
            title: 'Pertemuan 7: Ayo Kenalan dengan Hewan!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyebutkan ciri-ciri hewan dan mengelompokkan hewan di sekitar rumah.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar hewan',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🐱 Ayo Kenalan dengan Hewan di Sekitarku!

Halo sahabat cilik! Di sekitar kita ada banyak **hewan lucu**! 
Ayo **Maryam** dan **Maheer** ajak kalian berkenalan! 🎉

---

### 🌟 1. Hewan di Sekitar Kita

| Hewan | Ciri Khusus | Emoji |
| :---: | :--- | :---: |
| **Kucing** | Bersuara "meong", berbulu | 🐱 |
| **Burung** | Bisa terbang, punya sayap | 🐦 |
| **Ikan** | Hidup di air, punya sirip | 🐟 |
| **Sapi** | Menghasilkan susu | 🐄 |

---

### 🎭 Komik: Maryam & Maheer Amati Hewan

\`\`\`text
  Maryam : "Maheer, hewan apa yang kamu lihat di rumah?" 👧
  Maheer : "Aku lihat kucing! Bersuara meong!" 🐱👦
  Maryam : "Aku lihat burung di pohon!" 🐦
  Asiya  : "Aku lihat ikan di akuarium!" 🐟👧
  Khadijah: "Hewan-hewan itu ciptaan Tuhan yang indah!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Hewan adalah **makhluk hidup** ciptaan Tuhan! 
Mereka bernafas, bergerak, dan makan. 🎯

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **kucing**? 👉 Suaranya "meong"! 🐱
* Ada **burung**? 👉 Bisa terbang! 🐦
* Ada **ikan**? 👉 Berenang di air! 🐟

Ayo jadi **Detektif Hewan** bersama Maryam & Maheer! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan hewan di sekitar kita!',
                ice_breaker:
                    'Ayo tirukan suara hewan: "Meong!" "Moo!" "Kukuruyuk!"',
                apperception:
                    'Hewan apa yang kamu lihat di rumah atau jalan tadi?',
                trigger_question:
                    'Apa saja hewan yang kalian lihat di sekitar rumah?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Hewan adalah makhluk hidup dengan ciri khusus berbeda.',
                concrete_steps: [
                    'Tunjukkan gambar kucing: "Ini kucing, bersuara meong."',
                    'Tunjukkan gambar burung: "Ini burung, bisa terbang."',
                    'Tunjukkan gambar ikan: "Ini ikan, hidup di air."',
                    'Ajak anak menyebutkan hewan yang dikenal.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Hewan itu makhluk hidup ciptaan Tuhan. Yuk, kenali ciri-cirinya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Hewan Ceria',
                game_rules: [
                    'Guru menyebutkan ciri hewan: "Berkaki empat, bersuara meong."',
                    'Anak menebak: "Kucing!"',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menyebutkan ciri & habitat.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal ciri hewan.',
                worksheet_print_ready: {
                    title: 'LKPD 3.1: Ayo Kenalan dengan Hewan!',
                    instructions:
                        'Jodohkan hewan dengan ciri khususnya, lalu warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan hewan dengan ciri khususnya!',
                            data: {
                                pairs: [
                                    { left: '🐟 Ikan', right: 'Hidup di air' },
                                    { left: '🐦 Burung', right: 'Bisa terbang' },
                                    { left: '🐈 Kucing', right: 'Bersuara meong' },
                                    { left: '🐄 Sapi', right: 'Menghasilkan susu' },
                                ],
                            },
                            answer_key: 'Ikan→air, Burung→terbang, Kucing→meong, Sapi→susu.',
                            explanation: 'Mengenal ciri hewan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah hewan favoritmu!',
                            data: {
                                prompt: 'Hewan favoritku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Hewan favoritku:',
                            },
                            answer_key: 'Anak menggambar hewan favorit.',
                            explanation: 'Melatih pengamatan & seni.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja ciri hewan, sayang?',
                    'Hewan apa yang kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 3.1 tentang hewan, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 8: Makanan Hewan',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengelompokkan hewan berdasarkan jenis makanannya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar makanan hewan',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🍽️ Makanan Hewan di Sekitarku

Halo sahabat cilik! Tahukah kamu, hewan punya **makanan favorit berbeda**? 
Ayo **Asiya** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Tiga Kelompok Makanan Hewan

| Kelompok | Makanan | Contoh Hewan | Emoji |
| :---: | :--- | :--- | :---: |
| **Herbivora** | Tumbuhan | Sapi, kambing, kelinci | 🐄 |
| **Karnivora** | Daging | Singa, kucing, harimau | 🦁 |
| **Omnivora** | Keduanya | Ayam, beruang | 🐔 |

---

### 🎭 Komik: Asiya & Fatimah Beri Makan

\`\`\`text
  Asiya  : "Fatimah, apa makanan kucing?" 👧
  Fatimah: "Ikan! Kucing itu karnivora!" 🐟👧
  Asiya  : "Kalau sapi?" 
  Fatimah: "Rumput! Sapi itu herbivora!" 🌿
  Maheer : "Kalau ayam?" 👦
  Fatimah: "Biji-bijian & serangga, ayam omnivora!" 🐔
  Khadijah: "Kalian hebat mengelompokkan!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Hewan makan makanan berbeda:
* **Herbivora** = makan tumbuhan 🌿
* **Karnivora** = makan daging 🍖
* **Omnivora** = makan keduanya 🍽️

---

### 🔍 Ayo Coba Sendiri:
* Sapi makan apa? 👉 **Rumput** 🌿
* Kucing makan apa? 👉 **Ikan** 🐟
* Ayam makan apa? 👉 **Biji-bijian** 🌾

Ayo jadi **Detektif Makanan Hewan**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar makanan hewan!',
                ice_breaker:
                    'Ayo tirukan suara hewan yang lapar: "Meooong... moo..."',
                apperception:
                    'Apa makanan kucing di rumahmu? Apa makanan sapi?',
                trigger_question:
                    'Apa makanan hewan yang kalian lihat?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Hewan makan makanan berbeda: herbivora, karnivora, omnivora.',
                concrete_steps: [
                    'Tunjukkan gambar sapi: "Sapi makan rumput, herbivora."',
                    'Tunjukkan gambar kucing: "Kucing makan ikan, karnivora."',
                    'Tunjukkan gambar ayam: "Ayam makan biji & serangga, omnivora."',
                    'Ajak anak menyebutkan makanan hewan lain.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Setiap hewan punya makanan favoritnya. Yuk, kenali!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Beri Makan Hewan',
                game_rules: [
                    'Guru menunjukkan gambar hewan.',
                    'Anak memilih gambar makanan yang sesuai.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memilih dengan bantuan guru.',
                    child_level_advanced: 'Menyebutkan kelompok hewan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengelompokkan hewan & makanan.',
                worksheet_print_ready: {
                    title: 'LKPD 3.2: Makanan Hewan',
                    instructions:
                        'Jodohkan hewan dengan makanannya, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan hewan dengan makanannya!',
                            data: {
                                pairs: [
                                    { left: '🐰 Kelinci', right: '🥕 Wortel' },
                                    { left: '🐈 Kucing', right: '🐟 Ikan' },
                                    { left: '🐦 Burung', right: '🌾 Biji-bijian' },
                                    { left: '🐄 Sapi', right: '🌿 Rumput' },
                                ],
                            },
                            answer_key: 'Kelinci→wortel, Kucing→ikan, Burung→biji, Sapi→rumput.',
                            explanation: 'Mengenal makanan hewan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah hewan peliharaanmu sedang makan!',
                            data: {
                                prompt: 'Hewanku makan',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Hewanku sedang makan:',
                            },
                            answer_key: 'Anak menggambar hewan makan.',
                            explanation: 'Melatih pengamatan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa makanan hewan peliharaanmu, sayang?',
                    'Apa bedanya herbivora & karnivora?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 3.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 9: Ayo Rawat Hewan Peliharaan!',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menjelaskan cara merawat hewan peliharaan dengan baik.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar hewan peliharaan',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🐾 Ayo Rawat Hewan Peliharaan!

Halo sahabat cilik! Hewan peliharaan butuh **kasih sayang** kita! 
Ayo **Maheer** dan **Khadijah** ajak kalian belajar merawat! 🎉

---

### 🌟 1. Cara Merawat Hewan

| Kegiatan | Kapan | Emoji |
| :--- | :--- | :---: |
| **Beri makan** | Setiap hari | 🍽️ |
| **Beri minum** | Setiap hari | 💧 |
| **Bersihkan kandang** | Setiap hari | 🧹 |
| **Ajak bermain** | Setiap hari | 🎾 |
| **Peluk & sayangi** | Setiap hari | 🤗 |

---

### 🎭 Komik: Maheer & Khadijah Rawat Hewan

\`\`\`text
  Maheer  : "Khadijah, aku beri makan kucingku tadi!" 🍽️👦
  Khadijah: "Hebat! Aku juga bersihkan kandang burungku!" 🧹👧
  Maheer  : "Aku ajak kucingku bermain!" 🎾
  Khadijah: "Bagus! Hewan juga butuh kasih sayang!" 💖
  Asiya   : "Aku peluk kelinciku setiap hari!" 🤗👧
  Khadijah: "Kalian semua penyayang hewan!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Hewan peliharaan butuh:
1. **Makan & minum** 🍽️💧
2. **Kandang bersih** 🧹
3. **Kasih sayang** 🤗

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah beri makan hewanmu? 🍽️
* Sudah bersihkan kandangnya? 🧹
* Sudah ajak dia bermain? 🎾

Ayo jadi **Anak Penyayang Hewan**! 💖✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar merawat hewan peliharaan!',
                ice_breaker:
                    'Ayo tirukan suara hewan peliharaanmu!',
                apperception:
                    'Siapa yang punya hewan peliharaan? Apa namanya?',
                trigger_question:
                    'Bagaimana cara merawat hewan peliharaanmu?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Hewan peliharaan perlu dirawat & disayang setiap hari.',
                concrete_steps: [
                    'Jelaskan cara beri makan.',
                    'Jelaskan cara bersihkan kandang.',
                    'Jelaskan cara bermain & sayang.',
                    'Ajak anak berbagi pengalaman.',
                    'Beri apresiasi setiap cerita.',
                ],
                script_parent:
                    '"Hewan peliharaan butuh kasih sayang kita. Rawat dengan baik!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Merawat Hewan',
                game_rules: [
                    'Guru menunjukkan situasi (beri makan, bersihkan kandang).',
                    'Anak memeragakan cara merawat.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memeragakan dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan alasan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat jadwal merawat hewan.',
                worksheet_print_ready: {
                    title: 'LKPD 3.3: Ayo Rawat Hewan Peliharaan!',
                    instructions:
                        'Centang ✓ kegiatan merawat hewan yang sudah kamu lakukan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ kegiatan merawat hewan yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Beri makan', icon: '🍽️', description: 'Setiap hari' },
                                    { name: 'Beri minum', icon: '💧', description: 'Air bersih' },
                                    { name: 'Bersihkan kandang', icon: '🧹', description: 'Setiap hari' },
                                    { name: 'Ajak bermain', icon: '🎾', description: 'Bermain bersama' },
                                    { name: 'Peluk & sayangi', icon: '🤗', description: 'Kasih sayang' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang kegiatan.',
                            explanation: 'Melatih tanggung jawab.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah hewan peliharaanmu (atau hewan favoritmu)!',
                            data: {
                                prompt: 'Hewan peliharaan',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Hewan peliharaanku:',
                            },
                            answer_key: 'Anak menggambar hewan.',
                            explanation: 'Melatih ekspresi seni.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara merawat hewan, sayang?',
                    'Mengapa penting menyayangi hewan?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan cara merawat hewan peliharaan!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 3: Hewan di Sekitarku',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Hewan yang hidup di air adalah...',
                            option_a: 'Kucing',
                            option_b: 'Ikan',
                            option_c: 'Burung',
                            option_d: 'Sapi',
                            correct_answer: 'B',
                            explanation: 'Ikan hidup di air.',
                        },
                        {
                            question_text: 'Hewan pemakan tumbuhan disebut...',
                            option_a: 'Karnivora',
                            option_b: 'Herbivora',
                            option_c: 'Omnivora',
                            option_d: 'Insektivora',
                            correct_answer: 'B',
                            explanation: 'Herbivora = pemakan tumbuhan.',
                        },
                        {
                            question_text: 'Makanan kelinci adalah...',
                            option_a: 'Daging',
                            option_b: 'Wortel',
                            option_c: 'Ikan',
                            option_d: 'Tulang',
                            correct_answer: 'B',
                            explanation: 'Kelinci makan wortel.',
                        },
                        {
                            question_text: 'Cara merawat hewan peliharaan antara lain...',
                            option_a: 'Tidak diberi makan',
                            option_b: 'Diberi makan & minum',
                            option_c: 'Dibiarkan kotor',
                            option_d: 'Disiksa',
                            correct_answer: 'B',
                            explanation: 'Beri makan & minum setiap hari.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 4: TUMBUHAN DI SEKITARKU
// =============================================================================
const BAB_4: SeedModuleItem = {
    title: 'Bab 4: Tumbuhan di Sekitarku',
    order_index: 4,
    target_semester: 1,
    week_target: 10,
    lessons: [
        {
            title: 'Pertemuan 10: Bagian-Bagian Tumbuhan',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal bagian-bagian tumbuhan (akar, batang, daun, bunga, buah) dan fungsinya.',
            allocated_minutes: 45,
            required_materials: [
                'Tanaman kecil (pot)',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌱 Ayo Kenalan dengan Tumbuhan!

Halo sahabat cilik! Tumbuhan di sekitar kita punya **bagian-bagian ajaib**! 
Ayo **Maryam** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Bagian-Bagian Tumbuhan

| Bagian | Fungsi | Emoji |
| :---: | :--- | :---: |
| **Akar** | Menyerap air | 🌱 |
| **Batang** | Menopang tumbuhan | 🌿 |
| **Daun** | Membuat makanan | 🍃 |
| **Bunga** | Alat berkembang biak | 🌸 |
| **Buah** | Hasil tumbuhan | 🍎 |

---

### 🎭 Komik: Maryam & Fatimah Amati Tanaman

\`\`\`text
  Maryam : "Fatimah, ini bagian apa?" 🌱👧
  Fatimah: "Itu akar! Untuk menyerap air!" 💧👧
  Maryam : "Kalau yang ini?" 🌿
  Fatimah: "Itu batang! Untuk menopang!" 
  Maheer : "Aku lihat daun juga!" 🍃👦
  Fatimah: "Daun untuk membuat makanan!" 
  Khadijah: "Kalian hebat mengamati!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tumbuhan punya **5 bagian penting**:
1. Akar 🌱
2. Batang 🌿
3. Daun 🍃
4. Bunga 🌸
5. Buah 🍎

---

### 🔍 Ayo Cari di Tanaman:
* Tunjuk **akar** tanaman! 👉 Menyerap air 🌱
* Tunjuk **batang**! 👉 Menopang 🌿
* Tunjuk **daun**! 👉 Membuat makanan 🍃

Ayo jadi **Detektif Tumbuhan**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan tumbuhan di sekitar!',
                ice_breaker:
                    'Ayo nyanyikan "Lihat Kebunku" bersama-sama!',
                apperception:
                    'Apa saja yang ada di kebun? Apa yang tumbuh di tanah?',
                trigger_question:
                    'Apa saja bagian tumbuhan? Apa fungsinya?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tumbuhan punya akar, batang, daun, bunga, buah dengan fungsi berbeda.',
                concrete_steps: [
                    'Tunjukkan tanaman pot.',
                    'Tunjuk akar: "Ini akar, menyerap air."',
                    'Tunjuk batang: "Ini batang, menopang."',
                    'Tunjuk daun: "Ini daun, membuat makanan."',
                    'Ajak anak mengamati & menyebutkan bagian.',
                ],
                script_parent:
                    '"Tumbuhan juga makhluk hidup! Bagiannya punya tugas berbeda."',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sentuh Bagian Tumbuhan',
                game_rules: [
                    'Guru menyebutkan bagian tumbuhan.',
                    'Anak menyentuh bagian tersebut pada tanaman.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menyentuh dengan bantuan guru.',
                    child_level_advanced: 'Menyebutkan fungsi sambil menyentuh.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar tumbuhan & melabeli.',
                worksheet_print_ready: {
                    title: 'LKPD 4.1: Bagian-Bagian Tumbuhan',
                    instructions:
                        'Jodohkan bagian tumbuhan dengan fungsinya, lalu warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan bagian tumbuhan dengan fungsinya!',
                            data: {
                                pairs: [
                                    { left: '🌱 Akar', right: 'Menyerap air' },
                                    { left: '🌿 Batang', right: 'Menopang tumbuhan' },
                                    { left: '🍃 Daun', right: 'Membuat makanan' },
                                    { left: '🌸 Bunga', right: 'Alat berkembang biak' },
                                ],
                            },
                            answer_key: 'Akar→serap air, Batang→menopang, Daun→makanan, Bunga→kembang biak.',
                            explanation: 'Mengenal fungsi bagian tumbuhan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah tumbuhan lengkap dengan bagian-bagiannya!',
                            data: {
                                prompt: 'Tumbuhan lengkap',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Gambar tumbuhan:',
                            },
                            answer_key: 'Anak menggambar tumbuhan lengkap.',
                            explanation: 'Melatih pengamatan & seni.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja bagian tumbuhan, sayang?',
                    'Apa fungsi daun?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 4.1 tentang tumbuhan, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 11: Tumbuhan di Sekitar Rumahku',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengamati & menyebutkan tumbuhan di sekitar rumah.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar tumbuhan',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌳 Tumbuhan di Sekitar Rumahku

Halo sahabat cilik! Di sekitar rumah ada banyak **tumbuhan berbeda**! 
Ayo **Asiya** dan **Maheer** ajak kalian amati! 🎉

---

### 🌟 1. Tumbuhan di Sekitar Rumah

| Tumbuhan | Ciri | Emoji |
| :---: | :--- | :---: |
| **Pohon Mangga** | Besar, buah manis | 🥭 |
| **Pohon Pisang** | Daun lebar, buah pisang | 🍌 |
| **Bunga Mawar** | Berduri, harum | 🌹 |
| **Rumput** | Kecil, hijau | 🌿 |

---

### 🎭 Komik: Asiya & Maheer Keliling Rumah

\`\`\`text
  Asiya  : "Maheer, lihat! Pohon apa itu?" 🥭👧
  Maheer : "Itu pohon mangga! Buahnya manis!" 🥭👦
  Asiya  : "Kalau yang ini?" 🌹
  Maheer : "Itu bunga mawar! Harum & berduri!" 
  Fatimah: "Aku lihat rumput hijau di halaman!" 🌿👧
  Khadijah: "Tumbuhan di rumah kita beragam!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tumbuhan di sekitar rumah:
1. **Pohon** (mangga, pisang) 🥭🍌
2. **Bunga** (mawar, melati) 🌹
3. **Rumput** 🌿

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **pohon** apa? 🥭
* Ada **bunga** apa? 🌹
* Ada **rumput**? 🌿

Ayo jadi **Detektif Tumbuhan**! 🌳✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita amati tumbuhan di rumah!',
                ice_breaker:
                    'Ayo tirukan gerakan pohon tertiup angin: "Swoosh... swoosh..."',
                apperception:
                    'Tumbuhan apa di sekitar rumahmu?',
                trigger_question:
                    'Tumbuhan apa saja yang ada di sekitar rumahmu?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tumbuhan di sekitar rumah beragam: pohon, bunga, rumput.',
                concrete_steps: [
                    'Tunjukkan pohon mangga: "Ini pohon mangga, buahnya manis."',
                    'Tunjukkan bunga mawar: "Ini bunga mawar, harum."',
                    'Tunjukkan rumput: "Ini rumput, kecil & hijau."',
                    'Ajak anak menyebutkan tumbuhan di rumahnya.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Setiap tumbuhan punya ciri khas. Yuk, kenali!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Tumbuhan',
                game_rules: [
                    'Guru menyebutkan ciri tumbuhan.',
                    'Anak menebak nama tumbuhan.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan manfaat.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal tumbuhan sekitar.',
                worksheet_print_ready: {
                    title: 'LKPD 4.2: Tumbuhan di Sekitar Rumahku',
                    instructions:
                        'Centang ✓ tumbuhan yang ada di sekitar rumahmu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question: 'Centang ✓ tumbuhan yang ada di sekitar rumahmu!',
                            data: {
                                rules: [
                                    { name: 'Pohon Mangga', icon: '🥭', description: 'Pohon buah' },
                                    { name: 'Pohon Pisang', icon: '🍌', description: 'Pohon buah' },
                                    { name: 'Bunga Mawar', icon: '🌹', description: 'Tanaman hias' },
                                    { name: 'Rumput', icon: '🌿', description: 'Tumbuhan kecil' },
                                    { name: 'Kaktus', icon: '🌵', description: 'Tanaman hias' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang tumbuhan yang ada.',
                            explanation: 'Mengenal lingkungan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah tumbuhan yang ada di rumahmu!',
                            data: {
                                prompt: 'Tumbuhan di rumahku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Tumbuhan di rumahku:',
                            },
                            answer_key: 'Anak menggambar tumbuhan.',
                            explanation: 'Melatih pengamatan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Tumbuhan apa saja di rumahmu, sayang?',
                    'Apa manfaat tumbuhan bagi kita?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 4.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 12: Ayo Rawat Tumbuhan!',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menjelaskan & mempraktikkan cara merawat tumbuhan.',
            allocated_minutes: 45,
            required_materials: [
                'Tanaman pot',
                'Air',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌱 Ayo Rawat Tumbuhan!

Halo sahabat cilik! Tumbuhan butuh **perawatan** agar tumbuh subur! 
Ayo **Fatimah** dan **Khadijah** ajak kalian belajar merawat! 🎉

---

### 🌟 1. Cara Merawat Tumbuhan

| Kegiatan | Kapan | Emoji |
| :--- | :--- | :---: |
| **Menyiram** | Pagi & sore | 💧 |
| **Beri pupuk** | Setiap 2 minggu | 🌱 |
| **Cabut gulma** | Setiap minggu | 🌿 |
| **Jemur matahari** | Setiap hari | ☀️ |

---

### 🎭 Komik: Fatimah & Khadijah Rawat Tanaman

\`\`\`text
  Fatimah : "Khadijah, aku siram tanaman tadi!" 💧👧
  Khadijah: "Hebat! Aku juga beri pupuk!" 🌱👧
  Fatimah : "Aku cabut rumput liar di pot!" 🌿
  Khadijah: "Bagus! Tanaman butuh sinar matahari juga!" ☀️
  Maheer  : "Aku jemur tanaman di teras!" 👦
  Khadijah: "Kalian semua tukang kebun cilik!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tumbuhan butuh:
1. **Air** 💧
2. **Pupuk** 🌱
3. **Sinar matahari** ☀️

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah siram tanaman? 💧
* Sudah beri pupuk? 🌱
* Sudah jemur di matahari? ☀️

Ayo jadi **Tukang Kebun Cilik**! 🌱✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar merawat tumbuhan!',
                ice_breaker:
                    'Ayo tirukan gerakan menyiram: "Syiip... syiip..."',
                apperception:
                    'Siapa yang punya tanaman di rumah? Bagaimana merawatnya?',
                trigger_question:
                    'Bagaimana cara merawat tumbuhan?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tumbuhan perlu air, pupuk, sinar matahari untuk tumbuh subur.',
                concrete_steps: [
                    'Jelaskan cara menyiram.',
                    'Jelaskan cara memberi pupuk.',
                    'Jelaskan cara menjemur.',
                    'Ajak anak praktik menyiram.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Tumbuhan butuh kasih sayang. Rawat dengan baik agar tumbuh subur!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Aku Bisa Merawat Tumbuhan',
                game_rules: [
                    'Guru menyebutkan aktivitas merawat.',
                    'Anak memeragakan gerakannya.',
                    'Yang paling semangat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memeragakan dengan bantuan.',
                    child_level_advanced: 'Menjelaskan langkah lengkap.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat jadwal merawat tanaman.',
                worksheet_print_ready: {
                    title: 'LKPD 4.3: Ayo Rawat Tumbuhan!',
                    instructions:
                        'Centang ✓ kegiatan merawat tumbuhan yang sudah kamu lakukan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ kegiatan merawat tumbuhan yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Menyiram', icon: '💧', description: 'Setiap pagi & sore' },
                                    { name: 'Beri pupuk', icon: '🌱', description: 'Setiap 2 minggu' },
                                    { name: 'Cabut gulma', icon: '🌿', description: 'Rumput liar' },
                                    { name: 'Jemur matahari', icon: '☀️', description: 'Taruh di tempat terang' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang kegiatan.',
                            explanation: 'Melatih tanggung jawab.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu sedang menyiram tanaman!',
                            data: {
                                prompt: 'Aku menyiram tanaman',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku menyiram tanaman:',
                            },
                            answer_key: 'Anak menggambar aktivitas menyiram.',
                            explanation: 'Melatih cinta tumbuhan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara merawat tumbuhan, sayang?',
                    'Mengapa penting merawat tumbuhan?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 4.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 4: Tumbuhan di Sekitarku',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Bagian tumbuhan yang menyerap air adalah...',
                            option_a: 'Daun',
                            option_b: 'Batang',
                            option_c: 'Akar',
                            option_d: 'Bunga',
                            correct_answer: 'C',
                            explanation: 'Akar menyerap air.',
                        },
                        {
                            question_text: 'Bagian tumbuhan yang membuat makanan adalah...',
                            option_a: 'Akar',
                            option_b: 'Daun',
                            option_c: 'Batang',
                            option_d: 'Buah',
                            correct_answer: 'B',
                            explanation: 'Daun membuat makanan.',
                        },
                        {
                            question_text: 'Cara merawat tumbuhan antara lain...',
                            option_a: 'Disiram setiap hari',
                            option_b: 'Dibiarkan kering',
                            option_c: 'Diletakkan di tempat gelap',
                            option_d: 'Dicabut',
                            correct_answer: 'A',
                            explanation: 'Siram setiap hari.',
                        },
                        {
                            question_text: 'Bagian tumbuhan yang menopang tumbuhan adalah...',
                            option_a: 'Akar',
                            option_b: 'Batang',
                            option_c: 'Daun',
                            option_d: 'Bunga',
                            correct_answer: 'B',
                            explanation: 'Batang menopang tumbuhan.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const IPAS_BATCH_2: SeedModuleItem[] = [BAB_3, BAB_4];