// data/sbd-batch-1.ts
// Bab 1-2: Seni Rupa (Garis & Bentuk, Warna) (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 1: SENI RUPA — GARIS DAN BENTUK
// =============================================================================
const BAB_1: SeedModuleItem = {
    title: 'Bab 1: Seni Rupa — Garis dan Bentuk',
    order_index: 1,
    target_semester: 1,
    week_target: 1,
    lessons: [
        {
            title: 'Pertemuan 1: Ayo Kenalan dengan Garis Ajaib!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal macam-macam garis (lurus, lengkung, zig-zag) dan menggambarnya dengan gembira.',
            allocated_minutes: 45,
            required_materials: [
                'Buku gambar',
                'Pensil dan penghapus',
                'Krayon atau pensil warna',
                'LKPD',
            ],
            content_text: `# 🎨 Ayo Kenalan dengan Garis Ajaib!

Halo sahabat cilik! Hari ini **Maryam** dan **Maheer** akan mengajak kalian 
berkenalan dengan **garis ajaib**! 🎉

---

### 🌟 1. Tiga Garis Sahabat Kita

| Garis | Contoh | Emoji |
| :---: | :--- | :---: |
| **Lurus** | Tepi meja, penggaris | 📏 |
| **Lengkung** | Bola, cangkir | ⚽ |
| **Zig-zag** | Petir, gunung | ⚡ |

---

### 🎭 Komik: Maryam & Maheer Detektif Garis

\`\`\`text
  Maryam : "Maheer, lihat! Meja ini punya garis lurus!" 📏👧
  Maheer : "Iya! Cangkirku bergaris lengkung!" ☕👦
  Maryam : "Petir di gambar punya garis zig-zag!" ⚡
  Asiya  : "Aku juga bisa cari garis!" 👧
  Khadijah: "Kita jadi Detektif Garis!" 🕵️‍♀️✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tiga garis dasar:
1. **Lurus** = seperti tepi meja 📏
2. **Lengkung** = seperti bola ⚽
3. **Zig-zag** = seperti petir ⚡

---

### 🔍 Ayo Cari di Rumahmu:
* Ada **garis lurus**? 👉 Tepi pintu 🚪
* Ada **garis lengkung**? 👉 Cangkir ☕
* Ada **garis zig-zag**? 👉 Gambar gunung 🏔️

Ayo jadi **Detektif Garis**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita jadi Detektif Garis!',
                ice_breaker:
                    'Ayo gambar garis di udara dengan jarimu: lurus, lengkung, zig-zag!',
                apperception:
                    'Coba lihat meja di sekitarmu. Garis apa yang kamu lihat?',
                trigger_question:
                    'Apa saja garis yang bisa kalian temukan di sekitar?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tiga jenis garis: lurus, lengkung, zig-zag.',
                concrete_steps: [
                    'Tunjukkan poster tiga jenis garis.',
                    'Anak mengamati benda sekitar (meja, cangkir, gambar petir).',
                    'Sebutkan jenis garis pada setiap benda.',
                    'Contohkan menggambar garis lurus, lengkung, zig-zag.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Setiap benda punya garis! Yuk, jadi detektif garis!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Detektif Garis',
                game_rules: [
                    'Guru menyebutkan jenis garis (lurus/lengkung/zig-zag).',
                    'Anak berlomba menyentuh benda yang memiliki garis tersebut.',
                    'Yang paling cepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyentuh benda dengan bantuan guru, 1 jenis garis dulu.',
                    child_level_advanced:
                        'Menyebutkan 3 benda dengan jenis garis berbeda.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar macam-macam garis.',
                worksheet_print_ready: {
                    title: 'LKPD 1.1: Ayo Kenalan dengan Garis Ajaib!',
                    instructions:
                        'Tebalkan garis putus-putus, lalu gambar benda dengan garis tertentu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'TRACE_PATTERN',
                            question:
                                'Tebalkan garis putus-putus berikut!',
                            data: {
                                patterns: [
                                    { name: 'Garis Lurus', type: 'straight' },
                                    { name: 'Garis Lengkung', type: 'curved' },
                                    { name: 'Garis Zig-Zag', type: 'zigzag' },
                                ],
                            },
                            answer_key: 'Anak menebalkan semua garis dengan rapi.',
                            explanation: 'Melatih motorik halus.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah benda dengan garis lurus (misal: pensil, meja)!',
                            data: {
                                prompt: 'Benda bergaris lurus',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Benda bergaris lurus:',
                            },
                            answer_key: 'Anak menggambar benda bergaris lurus.',
                            explanation: 'Menerapkan konsep garis lurus.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah pemandangan (pohon, gunung, matahari) dengan kombinasi 3 garis!',
                            data: {
                                prompt: 'Pemandangan dengan 3 garis',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Pemandangan dengan 3 garis:',
                            },
                            answer_key: 'Anak menggambar pemandangan kombinasi 3 garis.',
                            explanation: 'Mengasah kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Garis apa yang paling mudah, sayang?',
                    'Benda apa di rumahmu yang memiliki garis zig-zag?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menggambar garis pada LKPD 1.1, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 1: Garis Ajaib',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Garis yang lurus tegak disebut garis...',
                            option_a: 'Lengkung',
                            option_b: 'Lurus',
                            option_c: 'Zig-zag',
                            option_d: 'Spiral',
                            correct_answer: 'B',
                            explanation: 'Garis lurus tegak = garis lurus.',
                        },
                        {
                            question_text: 'Garis yang patah-patah tajam disebut garis...',
                            option_a: 'Lurus',
                            option_b: 'Zig-zag',
                            option_c: 'Lengkung',
                            option_d: 'Bulat',
                            correct_answer: 'B',
                            explanation: 'Garis patah-patah = zig-zag.',
                        },
                        {
                            question_text: 'Benda berikut yang memiliki garis lengkung adalah...',
                            option_a: 'Meja',
                            option_b: 'Penggaris',
                            option_c: 'Bola',
                            option_d: 'Pintu',
                            correct_answer: 'C',
                            explanation: 'Bola berbentuk lengkung.',
                        },
                        {
                            question_text: 'Contoh benda dengan garis zig-zag adalah...',
                            option_a: 'Matahari',
                            option_b: 'Petir atau kilat',
                            option_c: 'Bola',
                            option_d: 'Cangkir',
                            correct_answer: 'B',
                            explanation: 'Petir bergaris zig-zag.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Pertemuan 2: Ayo Berkreasi dengan Bentuk Dasar!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal bentuk dasar (lingkaran, persegi, segitiga) dan berkreasi menempel.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas warna/origami',
                'Gunting tumpul anak',
                'Lem kertas',
                'Kertas gambar besar',
                'Krayon',
                'LKPD',
            ],
            content_text: `# 🔷 Ayo Berkreasi dengan Bentuk Dasar!

Halo sahabat cilik! Ternyata banyak benda di sekitar kita terbentuk dari 
**3 bentuk dasar ajaib**! Ayo **Asiya** dan **Fatimah** ajak kalian berkreasi! 🎉

---

### 🌟 1. Tiga Bentuk Dasar

| Bentuk | Ciri | Contoh | Emoji |
| :---: | :--- | :--- | :---: |
| **Lingkaran** | Bulat penuh | Jam, bola | ⚪ |
| **Persegi** | 4 sisi sama | Buku, ubin | ⬛ |
| **Segitiga** | 3 sisi, 3 sudut | Atap, pizza | 🔺 |

---

### 🎭 Komik: Asiya & Fatimah Bikin Kolase

\`\`\`text
  Asiya  : "Fatimah, ayo bikin rumah dari bentuk dasar!" 🏠👧
  Fatimah: "Persegi untuk badan rumah!" ⬛👧
  Asiya  : "Segitiga untuk atapnya!" 🔺
  Fatimah: "Lingkaran untuk jendelanya!" ⚪
  Maheer : "Aku bikin pohon dari segitiga juga!" 🌳👦
  Khadijah: "Karya kita indah sekali!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Banyak benda terbuat dari 3 bentuk dasar:
1. **Lingkaran** ⚪
2. **Persegi** ⬛
3. **Segitiga** 🔺

---

### 🔍 Ayo Cari di Rumahmu:
* Ada benda **lingkaran**? 👉 Jam dinding ⏰
* Ada benda **persegi**? 👉 Buku 📕
* Ada benda **segitiga**? 👉 Atap rumah 🏠

Ayo jadi **Seniman Bentuk**! 🎨✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkreasi dengan bentuk dasar!',
                ice_breaker:
                    'Ayo gambar bentuk di udara dengan jarimu: lingkaran, persegi, segitiga!',
                apperception:
                    'Jam dinding bentuknya apa? Buku bentuknya apa?',
                trigger_question:
                    'Bentuk apa yang paling kamu sukai?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tiga bentuk dasar: lingkaran, persegi, segitiga.',
                concrete_steps: [
                    'Tunjukkan bentuk dasar dari kertas warna.',
                    'Anak menyebutkan benda sekitar yang memiliki bentuk tersebut.',
                    'Contohkan memotong mengikuti pola.',
                    'Anak memotong bentuk dasar.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Bentuk dasar pondasi karya seni! Yuk, potong & tempel!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Permainan Tempel Bentuk',
                game_rules: [
                    'Anak dibagi kelompok kecil.',
                    'Setiap kelompok membuat komposisi dari bentuk dasar.',
                    'Kelompok paling kreatif dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menempel sesuai contoh guru.',
                    child_level_advanced: 'Membuat komposisi bebas (rumah, pohon).',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal bentuk dasar & berkreasi kolase.',
                worksheet_print_ready: {
                    title: 'LKPD 1.2: Ayo Berkreasi dengan Bentuk Dasar!',
                    instructions:
                        'Klasifikasikan benda sesuai bentuk dasarnya, lalu gambar kolase!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'SHAPE_SORTING',
                            question:
                                'Kelompokkan benda sesuai bentuk dasarnya!',
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
                                'Lingkaran: Jam, Roda. Persegi: Buku, Ubin. Segitiga: Atap, Pizza.',
                            explanation: 'Mengenal bentuk dasar pada benda.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah rumah dari kombinasi persegi + segitiga + lingkaran!',
                            data: {
                                prompt: 'Kolase bentuk rumah',
                                guideLines: 'grid',
                                rows: 1,
                                label: 'Rumah dari bentuk dasar:',
                            },
                            answer_key:
                                'Anak menggambar rumah: persegi (badan), segitiga (atap), lingkaran (jendela).',
                            explanation: 'Menerapkan bentuk dasar.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bentuk apa yang paling mudah dipotong, sayang?',
                    'Karya apa yang ingin kamu buat besok?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil kolase bentuk pada LKPD 1.2, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 1: Bentuk Dasar',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Jam dinding memiliki bentuk...',
                            option_a: 'Segitiga',
                            option_b: 'Persegi',
                            option_c: 'Lingkaran',
                            option_d: 'Trapesium',
                            correct_answer: 'C',
                            explanation: 'Jam dinding berbentuk lingkaran.',
                        },
                        {
                            question_text: 'Atap rumah biasanya berbentuk...',
                            option_a: 'Lingkaran',
                            option_b: 'Segitiga',
                            option_c: 'Persegi',
                            option_d: 'Bulat',
                            correct_answer: 'B',
                            explanation: 'Atap rumah berbentuk segitiga.',
                        },
                        {
                            question_text: 'Buku tulis berbentuk...',
                            option_a: 'Segitiga',
                            option_b: 'Persegi',
                            option_c: 'Lingkaran',
                            option_d: 'Oval',
                            correct_answer: 'B',
                            explanation: 'Buku berbentuk persegi.',
                        },
                        {
                            question_text: 'Bentuk dasar dengan 3 sisi adalah...',
                            option_a: 'Persegi',
                            option_b: 'Lingkaran',
                            option_c: 'Segitiga',
                            option_d: 'Oval',
                            correct_answer: 'C',
                            explanation: 'Segitiga punya 3 sisi.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 2: SENI RUPA — WARNA DI SEKITAR KITA
// =============================================================================
const BAB_2: SeedModuleItem = {
    title: 'Bab 2: Seni Rupa — Warna di Sekitar Kita',
    order_index: 2,
    target_semester: 2,
    week_target: 3,
    lessons: [
        {
            title: 'Pertemuan 3: Ayo Kenalan dengan Warna!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal warna primer & sekunder serta menggunakannya dalam karya.',
            allocated_minutes: 45,
            required_materials: [
                'Krayon atau pensil warna',
                'Kertas gambar',
                'Gambar berwarna',
                'LKPD',
            ],
            content_text: `# 🌈 Ayo Kenalan dengan Warna!

Halo sahabat cilik! Dunia kita penuh **warna indah**! 
Ayo **Maryam** dan **Khadijah** ajak kalian berkenalan dengan warna! 🎉

---

### 🌟 1. Warna Primer & Sekunder

| Warna | Jenis | Contoh | Emoji |
| :---: | :---: | :--- | :---: |
| **Merah** | Primer | Apel, darah | 🔴 |
| **Kuning** | Primer | Matahari, pisang | 🟡 |
| **Biru** | Primer | Langit, laut | 🔵 |
| **Oranye** | Sekunder | Jeruk, wortel | 🟠 |
| **Hijau** | Sekunder | Daun, rumput | 🟢 |
| **Ungu** | Sekunder | Terong, anggur | 🟣 |

---

### 🎭 Komik: Maryam & Khadijah Cari Warna

\`\`\`text
  Maryam  : "Khadijah, apa warna favoritmu?" 🌈👧
  Khadijah: "Aku suka warna biru! Seperti langit!" 🔵👧
  Maryam  : "Aku suka merah! Seperti apel!" 🔴
  Asiya   : "Aku suka kuning! Seperti matahari!" 🟡👧
  Maheer  : "Aku suka hijau! Seperti daun!" 🟢👦
  Khadijah: "Dunia kita penuh warna!" 🌈✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Warna primer (dasar):
1. **Merah** 🔴
2. **Kuning** 🟡
3. **Biru** 🔵

Warna sekunder (campuran):
4. **Oranye** 🟠
5. **Hijau** 🟢
6. **Ungu** 🟣

---

### 🔍 Ayo Cek Warna di Rumahmu:
* Ada benda **merah**? 👉 Apel 🍎
* Ada benda **biru**? 👉 Baju 👕
* Ada benda **hijau**? 👉 Daun 🌿

Ayo jadi **Detektif Warna**! 🌈✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan warna!',
                ice_breaker:
                    'Ayo nyanyikan "Pelangi-Pelangi" bersama-sama!',
                apperception:
                    'Warna apa favoritmu? Mengapa kamu suka warna itu?',
                trigger_question:
                    'Warna apa yang kamu lihat di sekitar rumahmu?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Warna primer: merah, kuning, biru. Warna sekunder: oranye, hijau, ungu.',
                concrete_steps: [
                    'Tunjukkan warna primer dengan krayon.',
                    'Tunjukkan warna sekunder dengan krayon.',
                    'Anak mengamati warna di sekitar kelas.',
                    'Sebutkan warna pada benda tertentu.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Warna bukan hanya indah, tapi juga menyampaikan perasaan!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Berburu Warna',
                game_rules: [
                    'Guru menyebutkan warna.',
                    'Anak berlomba menyentuh benda warna tersebut.',
                    'Yang paling cepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menyentuh benda dengan bantuan.',
                    child_level_advanced: 'Sebutkan warna benda lain di sekitarnya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal warna & mewarnai.',
                worksheet_print_ready: {
                    title: 'LKPD 2.1: Ayo Kenalan dengan Warna!',
                    instructions:
                        'Warnai gambar berikut dengan warna yang sesuai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'DRAWING_FRAME',
                            question:
                                'Warnai gambar matahari (kuning), langit (biru), dan rumput (hijau)!',
                            data: {
                                prompt: 'Matahari, langit, rumput',
                                guideLines: 'baseline',
                                rows: 1,
                                label: 'Warnai dengan warna tepat:',
                            },
                            answer_key:
                                'Matahari kuning, langit biru, rumput hijau.',
                            explanation: 'Mengenal warna alam.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah pemandangan lengkap dan warnai dengan warna favoritmu!',
                            data: {
                                prompt: 'Pemandangan berwarna',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Pemandangan warna-warni:',
                            },
                            answer_key: 'Anak menggambar pemandangan dengan warna kreatif.',
                            explanation: 'Mengasah kreativitas warna.',
                        },
                    ],
                },
                reflection_questions: [
                    'Warna apa yang paling kamu sukai, sayang?',
                    'Warna apa yang membuatmu senang?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil mewarnai pada LKPD 2.1, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 2: Warna di Sekitar Kita',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Warna daun pohon di taman adalah...',
                            option_a: 'Merah',
                            option_b: 'Hijau',
                            option_c: 'Biru',
                            option_d: 'Hitam',
                            correct_answer: 'B',
                            explanation: 'Daun berwarna hijau.',
                        },
                        {
                            question_text: 'Warna langit siang hari cerah adalah...',
                            option_a: 'Merah',
                            option_b: 'Hijau',
                            option_c: 'Biru',
                            option_d: 'Kuning',
                            correct_answer: 'C',
                            explanation: 'Langit cerah berwarna biru.',
                        },
                        {
                            question_text: 'Warna matahari biasanya...',
                            option_a: 'Hitam',
                            option_b: 'Kuning atau oranye',
                            option_c: 'Biru',
                            option_d: 'Abu-abu',
                            correct_answer: 'B',
                            explanation: 'Matahari kuning/oranye.',
                        },
                        {
                            question_text: 'Pelangi memiliki... warna',
                            option_a: '2',
                            option_b: '3',
                            option_c: '5',
                            option_d: '7',
                            correct_answer: 'D',
                            explanation: 'Pelangi 7 warna.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Pertemuan 4: Ayo Berkreasi dengan Garis & Warna!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menggambar benda kesukaan menggunakan kombinasi garis & warna.',
            allocated_minutes: 45,
            required_materials: [
                'Buku gambar',
                'Krayon atau pensil warna',
                'Pensil dan penghapus',
                'LKPD',
            ],
            content_text: `# 🎨 Ayo Berkreasi dengan Garis & Warna!

Halo sahabat cilik! Sekarang saatnya **berkreasi** dengan garis dan warna! 
Ayo **Asiya** dan **Maheer** ajak kalian! 🎉

---

### 🌟 1. Rangkaian Karya Kreatif

**Langkah-langkah:**
1. Pilih **benda** yang mau digambar 🎯
2. Gambar **bentuk dasar** dulu (persegi/lingkaran) ⬛
3. Tambahkan **garis** (lurus/lengkung/zig-zag) 📏
4. Warnai dengan **warna favorit** 🌈

**Contoh:**
* **Pohon** = persegi (batang) + lingkaran (daun) + warna hijau 🌳
* **Rumah** = persegi + segitiga + warna favorit 🏠
* **Bunga** = lingkaran + garis lurus + warna merah 🌸

---

### 🎭 Komik: Asiya & Maheer Berkreasi

\`\`\`text
  Asiya  : "Maheer, ayo gambar pohon!" 🌳👧
  Maheer : "Persegi untuk batang, lingkaran untuk daun!" ⬛⚪👦
  Asiya  : "Aku tambah garis lengkung di daun!" 📏
  Maheer : "Warnai hijau & cokelat!" 🌈
  Fatimah: "Aku gambar bunga!" 🌸👧
  Khadijah: "Karya kita indah!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Setiap karya seni dibangun dari:
1. **Bentuk dasar** ⬛⚪🔺
2. **Garis** 📏
3. **Warna** 🌈

---

### 🔍 Ayo Coba Sendiri:
* Mau gambar apa? 👉 **Benda favoritmu!** ⭐
* Bentuk dasar apa? 👉 **Persegi/lingkaran** ⬛
* Warna apa? 👉 **Warna favoritmu** 🌈

Ayo jadi **Seniman Cilik**! 🎨✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkreasi dengan garis & warna!',
                ice_breaker:
                    'Ayo sebutkan benda favoritmu yang mau kamu gambar!',
                apperception:
                    'Benda favoritmu bentuknya apa? Warnanya apa?',
                trigger_question:
                    'Benda apa yang paling ingin kamu gambar hari ini?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Karya seni dibangun dari bentuk dasar + garis + warna.',
                concrete_steps: [
                    'Jelaskan langkah: pilih benda → bentuk dasar → garis → warna.',
                    'Tunjukkan contoh pohon (persegi + lingkaran + hijau).',
                    'Anak memilih benda kesukaannya.',
                    'Bantu anak mulai menggambar.',
                    'Beri apresiasi setiap karya.',
                ],
                script_parent:
                    '"Semua karya seni dimulai dari bentuk dasar! Yuk, coba!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Benda dari Bentuk',
                game_rules: [
                    'Guru menggambar bentuk dasar di papan.',
                    'Anak menebak benda apa yang bisa dibuat.',
                    'Yang paling banyak sebutkan dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Sebutkan 2 benda.',
                    child_level_advanced: 'Gambar langsung benda tersebut.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar benda kesukaan.',
                worksheet_print_ready: {
                    title: 'LKPD 2.2: Ayo Berkreasi dengan Garis & Warna!',
                    instructions:
                        'Gambar benda kesukaanmu, lalu warnai dengan kreatif!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah benda kesukaanmu (bola, hewan, atau mainan)!',
                            data: {
                                prompt: 'Benda kesukaanku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Gambar benda kesukaanku:',
                            },
                            answer_key: 'Anak menggambar benda kesukaan.',
                            explanation: 'Menerapkan konsep garis & bentuk.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah pemandangan sederhana (gunung, sawah) dengan garis & warna!',
                            data: {
                                prompt: 'Pemandangan dari garis & warna',
                                guideLines: 'baseline',
                                rows: 2,
                                label: 'Pemandangan kreatif:',
                            },
                            answer_key: 'Anak menggambar pemandangan kreatif.',
                            explanation: 'Mengasah kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Benda apa yang kamu gambar, sayang?',
                    'Warna apa yang kamu pakai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil karya pada LKPD 2.2, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 2: Berkreasi dengan Garis & Warna',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Benda yang berbentuk lingkaran adalah...',
                            option_a: 'Buku',
                            option_b: 'Bola',
                            option_c: 'Meja',
                            option_d: 'Pintu',
                            correct_answer: 'B',
                            explanation: 'Bola berbentuk lingkaran.',
                        },
                        {
                            question_text: 'Gambar pohon biasanya menggunakan garis...',
                            option_a: 'Zig-zag untuk batang',
                            option_b: 'Lurus untuk batang, lengkung untuk daun',
                            option_c: 'Hanya spiral',
                            option_d: 'Hanya zig-zag',
                            correct_answer: 'B',
                            explanation: 'Batang lurus, daun lengkung.',
                        },
                        {
                            question_text: 'Setiap benda dapat dipecah menjadi...',
                            option_a: 'Garis dan bentuk dasar',
                            option_b: 'Hanya warna',
                            option_c: 'Hanya tulisan',
                            option_d: 'Hanya angka',
                            correct_answer: 'A',
                            explanation: 'Benda = garis + bentuk.',
                        },
                        {
                            question_text: 'Menggambar dengan bentuk dasar membuat kita lebih...',
                            option_a: 'Bingung',
                            option_b: 'Mudah menggambar',
                            option_c: 'Cepat bosan',
                            option_d: 'Takut salah',
                            correct_answer: 'B',
                            explanation: 'Bentuk dasar memudahkan.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const SBD_BATCH_1: SeedModuleItem[] = [BAB_1, BAB_2];