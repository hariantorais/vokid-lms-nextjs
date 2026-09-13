// data/ipas-batch-3.ts
// Bab 5-6: Cuaca dan Musim & Benda di Sekitarku (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 5: CUACA DAN MUSIM
// =============================================================================
const BAB_5: SeedModuleItem = {
    title: 'Bab 5: Cuaca dan Musim',
    order_index: 5,
    target_semester: 2,
    week_target: 13,
    lessons: [
        {
            title: 'Pertemuan 13: Cuaca di Sekitarku',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal jenis-jenis cuaca (cerah, berawan, hujan, berangin) dan cirinya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar cuaca',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ☀️ Ayo Kenalan dengan Cuaca!

Halo sahabat cilik! Cuaca di sekitar kita **berbeda setiap hari**! 
Ayo **Maryam** dan **Maheer** ajak kalian berkenalan dengan cuaca! 🎉

---

### 🌟 1. Jenis-Jenis Cuaca

| Cuaca | Ciri | Emoji |
| :---: | :--- | :---: |
| **Cerah** | Matahari terang, langit biru | ☀️ |
| **Berawan** | Langit gelap, ada awan | ☁️ |
| **Hujan** | Air turun dari langit | 🌧️ |
| **Berangin** | Daun bergoyang, angin kencang | 💨 |

---

### 🎭 Komik: Maryam & Maheer Amati Langit

\`\`\`text
  Maryam : "Maheer, lihat langit! Bagaimana cuacanya?" 👧
  Maheer : "Matahari terang! Cuaca cerah!" ☀️👦
  Asiya  : "Tadi langit gelap, mau hujan!" 🌧️👧
  Fatimah: "Sekarang angin kencang! Daun bergoyang!" 💨👧
  Khadijah: "Cuaca berubah-ubah ya! Kita harus siap!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Cuaca berbeda-beda:
1. **Cerah** = matahari terang ☀️
2. **Berawan** = langit gelap ☁️
3. **Hujan** = air turun 🌧️
4. **Berangin** = angin bertiup 💨

---

### 🔍 Ayo Amati Cuaca Hari Ini:
* Langit terang atau gelap? ☀️ / ☁️
* Ada hujan? 🌧️
* Ada angin? 💨

Ayo jadi **Detektif Cuaca** bersama Maryam & Maheer! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar tentang cuaca!',
                ice_breaker:
                    'Ayo nyanyikan "Hujan Rintik-Rintik" bersama-sama!',
                apperception:
                    'Bagaimana cuaca hari ini? Cerah atau berawan?',
                trigger_question:
                    'Bagaimana cuaca hari ini? Bagaimana cuaca kemarin?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Cuaca ada 4 jenis: cerah, berawan, hujan, berangin.',
                concrete_steps: [
                    'Tunjukkan gambar cerah: "Ini cerah, matahari terang."',
                    'Tunjukkan gambar berawan: "Ini berawan, langit gelap."',
                    'Tunjukkan gambar hujan: "Ini hujan, air turun."',
                    'Tunjukkan gambar berangin: "Ini berangin, daun bergoyang."',
                    'Ajak anak mengamati cuaca hari ini.',
                ],
                script_parent:
                    '"Cuaca di Indonesia berbeda-beda. Yuk, amati setiap hari!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Cuaca',
                game_rules: [
                    'Guru menunjukkan gambar cuaca.',
                    'Anak menebak jenis cuaca.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan aktivitas sesuai cuaca.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal jenis cuaca.',
                worksheet_print_ready: {
                    title: 'LKPD 5.1: Cuaca di Sekitarku',
                    instructions:
                        'Jodohkan cuaca dengan cirinya, lalu warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan cuaca dengan cirinya!',
                            data: {
                                pairs: [
                                    { left: '☀️ Cerah', right: 'Matahari terang' },
                                    { left: '☁️ Berawan', right: 'Langit gelap' },
                                    { left: '🌧️ Hujan', right: 'Air turun dari langit' },
                                    { left: '💨 Berangin', right: 'Daun bergoyang' },
                                ],
                            },
                            answer_key: 'Cerah→matahari, Berawan→gelap, Hujan→air, Berangin→daun.',
                            explanation: 'Mengenal jenis cuaca.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah cuaca hari ini!',
                            data: {
                                prompt: 'Cuaca hari ini',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Cuaca hari ini:',
                            },
                            answer_key: 'Anak menggambar cuaca hari ini.',
                            explanation: 'Melatih pengamatan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja jenis cuaca, sayang?',
                    'Bagaimana cuaca hari ini?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 5.1 tentang cuaca, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 14: Musim di Indonesia',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal musim hujan & kemarau di Indonesia serta cirinya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar musim',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌧️☀️ Musim di Indonesia

Halo sahabat cilik! Indonesia punya **2 musim** yang berbeda! 
Ayo **Asiya** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Dua Musim di Indonesia

| Musim | Ciri | Kapan | Emoji |
| :---: | :--- | :--- | :---: |
| **Musim Hujan** | Sering hujan | Okt - Mar | 🌧️ |
| **Musim Kemarau** | Panas & kering | Apr - Sep | ☀️ |

---

### 🎭 Komik: Asiya & Fatimah Belajar Musim

\`\`\`text
  Asiya  : "Fatimah, sekarang musim apa?" 👧
  Fatimah: "Musim hujan! Sering hujan!" 🌧️👧
  Asiya  : "Kalau musim kemarau?" 
  Fatimah: "Panas & kering! Bawa topi!" ☀️
  Maheer : "Aku bawa payung saat hujan!" 🌂👦
  Khadijah: "Kita harus siap dengan musim!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Indonesia punya **2 musim**:
1. **Musim Hujan** 🌧️ → sering hujan, bawa payung
2. **Musim Kemarau** ☀️ → panas, bawa topi

---

### 🔍 Ayo Cek Musim:
* Sekarang musim apa? 🌧️ / ☀️
* Bawa payung atau topi? 🌂 / 🧢

Ayo jadi **Detektif Musim**! 🌦️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar musim di Indonesia!',
                ice_breaker:
                    'Ayo nyanyikan lagu musim bersama-sama!',
                apperception:
                    'Musim apa sekarang? Sering hujan atau panas?',
                trigger_question:
                    'Apa bedanya musim hujan & musim kemarau?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Indonesia punya musim hujan & musim kemarau.',
                concrete_steps: [
                    'Jelaskan musim hujan: sering hujan.',
                    'Jelaskan musim kemarau: panas & kering.',
                    'Tunjukkan gambar setiap musim.',
                    'Diskusi aktivitas sesuai musim.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Musim hujan bawa payung, musim kemarau bawa topi!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Musim',
                game_rules: [
                    'Guru menunjukkan gambar musim.',
                    'Anak menebak nama musim.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan aktivitas.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal musim di Indonesia.',
                worksheet_print_ready: {
                    title: 'LKPD 5.2: Musim di Indonesia',
                    instructions:
                        'Jodohkan musim dengan cirinya, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan musim dengan cirinya!',
                            data: {
                                pairs: [
                                    { left: '🌧️ Musim Hujan', right: 'Sering hujan' },
                                    { left: '☀️ Musim Kemarau', right: 'Panas & kering' },
                                    { left: '🌂 Musim Hujan', right: 'Bawa payung' },
                                    { left: '🧢 Musim Kemarau', right: 'Bawa topi' },
                                ],
                            },
                            answer_key: 'Hujan→sering hujan, Kemarau→panas.',
                            explanation: 'Mengenal musim.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah aktivitasmu di musim hujan!',
                            data: {
                                prompt: 'Musim hujan',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aktivitas di musim hujan:',
                            },
                            answer_key: 'Anak menggambar aktivitas.',
                            explanation: 'Melatih imajinasi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa bedanya musim hujan & kemarau, sayang?',
                    'Musim apa yang kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 5.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 15: Pakaian Sesuai Cuaca',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat memilih pakaian yang sesuai dengan cuaca.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar pakaian',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 👕 Pakaian Sesuai Cuaca

Halo sahabat cilik! Cuaca menentukan **pakaian** yang kita pakai! 
Ayo **Maheer** dan **Khadijah** ajak kalian belajar! 🎉

---

### 🌟 1. Pakaian Sesuai Cuaca

| Cuaca | Pakaian | Emoji |
| :---: | :--- | :---: |
| **Cerah** | Baju tipis, topi | 👕🧢 |
| **Hujan** | Jaket, payung | 🧥🌂 |
| **Dingin** | Baju hangat, syal | 🧥🧣 |
| **Berangin** | Jaket tipis | 🧥 |

---

### 🎭 Komik: Maheer & Khadijah Pilih Pakaian

\`\`\`text
  Maheer  : "Khadijah, cuaca hujan! Aku pakai apa?" 🌧️👦
  Khadijah: "Pakai jaket & bawa payung!" 🧥🌂👧
  Maheer  : "Kalau cuaca cerah?" ☀️
  Khadijah: "Pakai baju tipis & topi!" 👕🧢
  Asiya   : "Aku pakai syal saat dingin!" 🧣👧
  Khadijah: "Pakaian yang tepat bikin nyaman!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Pakaian harus sesuai cuaca:
1. **Cerah** → baju tipis 👕
2. **Hujan** → jaket & payung 🧥
3. **Dingin** → baju hangat 🧥

---

### 🔍 Ayo Pilih Pakaianmu:
* Hari ini cuaca apa? 🌧️ / ☀️
* Pakaian apa yang cocok? 👕 / 🧥

Ayo jadi **Perancang Pakaian Cilik**! 👗✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar pakaian sesuai cuaca!',
                ice_breaker:
                    'Ayo tirukan gerakan pakai payung & topi!',
                apperception:
                    'Pakaian apa yang kamu pakai saat hujan?',
                trigger_question:
                    'Pakaian apa yang cocok saat hujan?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Pakaian harus sesuai cuaca agar nyaman & sehat.',
                concrete_steps: [
                    'Jelaskan pakaian cerah: baju tipis.',
                    'Jelaskan pakaian hujan: jaket & payung.',
                    'Jelaskan pakaian dingin: baju hangat.',
                    'Ajak anak memilih pakaian.',
                    'Beri apresiasi setiap pilihan.',
                ],
                script_parent:
                    '"Pakaian yang tepat bikin nyaman. Sesuaikan dengan cuaca!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Pilih Pakaian',
                game_rules: [
                    'Guru menunjukkan cuaca.',
                    'Anak memilih pakaian yang tepat.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memilih dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan alasan pilihan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memilih pakaian & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 5.3: Pakaian Sesuai Cuaca',
                    instructions:
                        'Jodohkan cuaca dengan pakaian yang tepat, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan cuaca dengan pakaian yang tepat!',
                            data: {
                                pairs: [
                                    { left: '☀️ Cerah', right: '👕 Baju tipis' },
                                    { left: '🌧️ Hujan', right: '🧥 Jaket & payung' },
                                    { left: '❄️ Dingin', right: '🧣 Baju hangat' },
                                    { left: '💨 Berangin', right: '🧢 Topi' },
                                ],
                            },
                            answer_key: 'Cerah→tipis, Hujan→jaket, Dingin→hangat.',
                            explanation: 'Mengenal pakaian sesuai cuaca.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu dengan pakaian yang cocok untuk cuaca hujan!',
                            data: {
                                prompt: 'Pakaian musim hujan',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Pakaianku saat hujan:',
                            },
                            answer_key: 'Anak menggambar pakaian hujan.',
                            explanation: 'Melatih pemahaman.',
                        },
                    ],
                },
                reflection_questions: [
                    'Pakaian apa yang cocok saat hujan, sayang?',
                    'Mengapa harus sesuai cuaca?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan pakaian yang cocok untuk cuaca hujan & cerah!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 5: Cuaca dan Musim',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Cuaca saat matahari bersinar terang disebut...',
                            option_a: 'Hujan',
                            option_b: 'Cerah',
                            option_c: 'Berawan',
                            option_d: 'Berkabut',
                            correct_answer: 'B',
                            explanation: 'Cerah = matahari terang.',
                        },
                        {
                            question_text: 'Indonesia memiliki 2 musim yaitu...',
                            option_a: 'Panas & dingin',
                            option_b: 'Hujan & kemarau',
                            option_c: 'Salju & gugur',
                            option_d: 'Semi & panas',
                            correct_answer: 'B',
                            explanation: 'Hujan & kemarau.',
                        },
                        {
                            question_text: 'Saat hujan, sebaiknya kita membawa...',
                            option_a: 'Kipas',
                            option_b: 'Payung',
                            option_c: 'Topi',
                            option_d: 'Kacamata',
                            correct_answer: 'B',
                            explanation: 'Payung untuk hujan.',
                        },
                        {
                            question_text: 'Pakaian yang cocok saat cuaca cerah adalah...',
                            option_a: 'Baju hangat',
                            option_b: 'Jas hujan',
                            option_c: 'Baju tipis',
                            option_d: 'Selimut',
                            correct_answer: 'C',
                            explanation: 'Baju tipis saat cerah.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 6: BENDA DI SEKITARKU
// =============================================================================
const BAB_6: SeedModuleItem = {
    title: 'Bab 6: Benda di Sekitarku',
    order_index: 6,
    target_semester: 2,
    week_target: 16,
    lessons: [
        {
            title: 'Pertemuan 16: Wujud Benda (Padat, Cair, Gas)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal 3 wujud benda (padat, cair, gas) dan cirinya.',
            allocated_minutes: 45,
            required_materials: [
                'Benda berbagai wujud (batu, air, balon)',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🪨 Ayo Kenalan dengan Wujud Benda!

Halo sahabat cilik! Benda di sekitar kita punya **3 wujud berbeda**! 
Ayo **Maryam** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Tiga Wujud Benda

| Wujud | Ciri | Contoh | Emoji |
| :---: | :--- | :--- | :---: |
| **Padat** | Bentuk tetap, keras | Batu, buku | 🪨 |
| **Cair** | Mengikuti wadah | Air, susu | 💧 |
| **Gas** | Tidak terlihat | Udara | 💨 |

---

### 🎭 Komik: Maryam & Fatimah Amati Benda

\`\`\`text
  Maryam : "Fatimah, ini benda apa?" 🪨👧
  Fatimah: "Itu batu! Wujudnya padat!" 
  Maryam : "Kalau air di gelas?" 💧
  Fatimah: "Cair! Mengikuti wadah!" 
  Maheer : "Kalau udara di balon?" 🎈👦
  Fatimah: "Gas! Tidak terlihat!" 
  Khadijah: "Kalian hebat mengamati!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
3 wujud benda:
1. **Padat** = bentuk tetap 🪨
2. **Cair** = mengikuti wadah 💧
3. **Gas** = tidak terlihat 💨

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **batu**? 👉 Padat 🪨
* Ada **air**? 👉 Cair 💧
* Ada **balon**? 👉 Gas 🎈

Ayo jadi **Detektif Wujud Benda**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar wujud benda!',
                ice_breaker:
                    'Ayo tirukan gerakan benda padat (kaku) & cair (mengalir)!',
                apperception:
                    'Benda apa yang kamu pegang sekarang? Keras atau lembut?',
                trigger_question:
                    'Benda apa saja yang kalian lihat? Ada berapa wujudnya?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Benda punya 3 wujud: padat, cair, gas.',
                concrete_steps: [
                    'Tunjukkan batu: "Ini padat, bentuknya tetap."',
                    'Tunjukkan air: "Ini cair, mengikuti wadah."',
                    'Tunjukkan balon: "Ini gas, tidak terlihat."',
                    'Ajak anak mengamati benda.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Padat keras & tetap, cair mengikuti wadah, gas tidak terlihat."',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Kelompokkan Benda',
                game_rules: [
                    'Guru menunjukkan benda.',
                    'Anak menebak wujud benda.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan ciri wujud.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengelompokkan benda.',
                worksheet_print_ready: {
                    title: 'LKPD 6.1: Wujud Benda',
                    instructions:
                        'Jodohkan benda dengan wujudnya, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan benda dengan wujudnya!',
                            data: {
                                pairs: [
                                    { left: '🪨 Batu', right: 'Padat' },
                                    { left: '💧 Air', right: 'Cair' },
                                    { left: '💨 Udara', right: 'Gas' },
                                    { left: '📚 Buku', right: 'Padat' },
                                ],
                            },
                            answer_key: 'Batu→padat, Air→cair, Udara→gas, Buku→padat.',
                            explanation: 'Mengenal wujud benda.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah 3 benda dengan wujud berbeda!',
                            data: {
                                prompt: 'Benda 3 wujud',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Benda 3 wujud:',
                            },
                            answer_key: 'Anak menggambar 3 benda.',
                            explanation: 'Melatih pemahaman.',
                        },
                    ],
                },
                reflection_questions: [
                    'Ada berapa wujud benda, sayang?',
                    'Apa bedanya padat & cair?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 6.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 17: Sifat Benda (Keras, Lunak, Halus, Kasar)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal sifat-sifat benda (keras, lunak, halus, kasar).',
            allocated_minutes: 45,
            required_materials: [
                'Benda berbagai sifat (kapas, batu, kain)',
                'Kotak tertutup',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ✋ Ayo Kenalan dengan Sifat Benda!

Halo sahabat cilik! Benda di sekitar kita punya **sifat berbeda**! 
Ayo **Asiya** dan **Maheer** ajak kalian belajar! 🎉

---

### 🌟 1. Sifat-Sifat Benda

| Sifat | Contoh | Emoji |
| :---: | :--- | :---: |
| **Keras** | Batu, besi | 🪨 |
| **Lunak** | Kapas, bantal | ☁️ |
| **Halus** | Kaca, kertas | 🪟 |
| **Kasar** | Kulit jeruk, amplas | 🍊 |

---

### 🎭 Komik: Asiya & Maheer Tebak Sifat

\`\`\`text
  Asiya  : "Maheer, tutup matamu! Raba benda ini!" 👧
  Maheer : "Wah, keras! Seperti batu!" 🪨👦
  Asiya  : "Betul! Coba yang ini!" 
  Maheer : "Lunak! Seperti kapas!" ☁️
  Fatimah: "Aku raba kaca, halus sekali!" 🪟👧
  Khadijah: "Indra peraba kita hebat!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Sifat benda berbeda-beda:
1. **Keras** = tidak bisa ditekan 🪨
2. **Lunak** = bisa ditekan ☁️
3. **Halus** = permukaan rata 🪟
4. **Kasar** = permukaan tidak rata 🍊

---

### 🔍 Ayo Raba Benda:
* Raba batu! 👉 **Keras** 🪨
* Raba kapas! 👉 **Lunak** ☁️
* Raba kaca! 👉 **Halus** 🪟

Ayo jadi **Detektif Sifat Benda**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar sifat benda!',
                ice_breaker:
                    'Ayo raba meja & baju. Apa bedanya?',
                apperception:
                    'Bagaimana rasanya menyentuh batu? Bagaimana kapas?',
                trigger_question:
                    'Bagaimana rasanya menyentuh batu? Bagaimana rasanya menyentuh kapas?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Benda punya sifat: keras, lunak, halus, kasar.',
                concrete_steps: [
                    'Tunjukkan batu: "Ini keras."',
                    'Tunjukkan kapas: "Ini lunak."',
                    'Tunjukkan kaca: "Ini halus."',
                    'Tunjukkan kulit jeruk: "Ini kasar."',
                    'Ajak anak meraba & menyebutkan sifat.',
                ],
                script_parent:
                    '"Setiap benda punya sifat berbeda. Yuk, kenali dengan indra peraba!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Sifat Benda!',
                game_rules: [
                    'Guru menutup mata anak.',
                    'Anak meraba benda & menebak sifatnya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menyebutkan benda & sifatnya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal sifat benda.',
                worksheet_print_ready: {
                    title: 'LKPD 6.2: Sifat Benda',
                    instructions:
                        'Jodohkan benda dengan sifatnya, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan benda dengan sifatnya!',
                            data: {
                                pairs: [
                                    { left: '🪨 Batu', right: 'Keras' },
                                    { left: '☁️ Kapas', right: 'Lunak' },
                                    { left: '🪟 Kaca', right: 'Halus' },
                                    { left: '🍊 Kulit jeruk', right: 'Kasar' },
                                ],
                            },
                            answer_key: 'Batu→keras, Kapas→lunak, Kaca→halus.',
                            explanation: 'Mengenal sifat benda.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah 2 benda yang keras & 2 benda yang lunak!',
                            data: {
                                prompt: 'Benda keras & lunak',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Benda keras & lunak:',
                            },
                            answer_key: 'Anak menggambar.',
                            explanation: 'Melatih pengamatan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja sifat benda, sayang?',
                    'Benda apa yang paling kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 6.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 18: Perubahan Wujud Benda',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengamati perubahan wujud benda (membeku, mencair, menguap).',
            allocated_minutes: 45,
            required_materials: [
                'Es batu',
                'Air panas',
                'Gelas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ❄️ Ayo Amati Perubahan Wujud Benda!

Halo sahabat cilik! Benda bisa **berubah wujud**! 
Ayo **Fatimah** dan **Khadijah** ajak kalian eksperimen! 🎉

---

### 🌟 1. Perubahan Wujud Benda

| Perubahan | Proses | Contoh | Emoji |
| :--- | :--- | :--- | :---: |
| **Membeku** | Air → Es | Air di freezer | ❄️ |
| **Mencair** | Es → Air | Es di bawah matahari | 💧 |
| **Menguap** | Air → Uap | Air mendidih | ☁️ |

---

### 🎭 Komik: Fatimah & Khadijah Eksperimen

\`\`\`text
  Fatimah : "Khadijah, lihat esnya mencair!" ❄️👧
  Khadijah: "Iya! Karena kena panas!" 💧👧
  Fatimah : "Kalau air dipanaskan?" 
  Khadijah: "Menguap! Jadi uap air!" ☁️
  Maheer  : "Air di freezer jadi es!" 👦
  Khadijah: "Itu membeku! Ajaib ya!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Perubahan wujud:
1. **Membeku** = air → es ❄️
2. **Mencair** = es → air 💧
3. **Menguap** = air → uap ☁️

---

### 🔍 Ayo Amati di Rumah:
* Es di kulkas? 👉 **Membeku** ❄️
* Es di bawah matahari? 👉 **Mencair** 💧
* Air mendidih? 👉 **Menguap** ☁️

Ayo jadi **Ilmuwan Cilik**! 🔬✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita eksperimen perubahan wujud!',
                ice_breaker:
                    'Ayo tirukan suara air mendidih: "Syuut... syuut..."',
                apperception:
                    'Apa yang terjadi pada es di bawah matahari?',
                trigger_question:
                    'Apa yang terjadi pada es saat diletakkan di tempat panas?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Benda dapat berubah wujud karena suhu panas/dingin.',
                concrete_steps: [
                    'Tunjukkan es: "Ini es, wujud padat."',
                    'Biarkan es mencair: "Es jadi air, mencair."',
                    'Panaskan air: "Air jadi uap, menguap."',
                    'Diskusi contoh sehari-hari.',
                    'Beri apresiasi setiap pengamatan.',
                ],
                script_parent:
                    '"Es mencair karena panas. Air menguap karena panas juga. Ajaib!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Eksperimen Es Mencair',
                game_rules: [
                    'Guru menyiapkan es batu.',
                    'Anak mengamati es mencair.',
                    'Anak mencatat waktu mencair.',
                    'Diskusi hasil pengamatan.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Mengamati dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan proses.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mencatat eksperimen & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 6.3: Perubahan Wujud Benda',
                    instructions:
                        'Jodohkan perubahan wujud dengan contohnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan perubahan wujud dengan contohnya!',
                            data: {
                                pairs: [
                                    { left: '❄️ Membeku', right: 'Air → Es' },
                                    { left: '💧 Mencair', right: 'Es → Air' },
                                    { left: '☁️ Menguap', right: 'Air → Uap' },
                                ],
                            },
                            answer_key: 'Membeku→air jadi es, Mencair→es jadi air.',
                            explanation: 'Mengenal perubahan wujud.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah proses es mencair!',
                            data: {
                                prompt: 'Es mencair',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Es mencair:',
                            },
                            answer_key: 'Anak menggambar es mencair.',
                            explanation: 'Melatih pemahaman.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa itu mencair, sayang?',
                    'Apa itu menguap?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 6.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 6: Benda di Sekitarku',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Benda yang berwujud padat adalah...',
                            option_a: 'Air',
                            option_b: 'Udara',
                            option_c: 'Batu',
                            option_d: 'Susu',
                            correct_answer: 'C',
                            explanation: 'Batu berwujud padat.',
                        },
                        {
                            question_text: 'Air yang dimasukkan ke freezer akan...',
                            option_a: 'Mencair',
                            option_b: 'Membeku',
                            option_c: 'Menguap',
                            option_d: 'Hilang',
                            correct_answer: 'B',
                            explanation: 'Air membeku jadi es.',
                        },
                        {
                            question_text: 'Benda yang bersifat lunak adalah...',
                            option_a: 'Batu',
                            option_b: 'Besi',
                            option_c: 'Kapas',
                            option_d: 'Kayu',
                            correct_answer: 'C',
                            explanation: 'Kapas lunak.',
                        },
                        {
                            question_text: 'Es mencair karena...',
                            option_a: 'Suhu panas',
                            option_b: 'Suhu dingin',
                            option_c: 'Suhu beku',
                            option_d: 'Angin',
                            correct_answer: 'A',
                            explanation: 'Panas membuat es mencair.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const IPAS_BATCH_3: SeedModuleItem[] = [BAB_5, BAB_6];