// data/sbd-batch-2.ts
// Bab 3-4: Seni Tari & Seni Teater (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './types';

// =============================================================================
// BAB 3: SENI TARI — GERAK ANGGOTA TUBUH
// =============================================================================
const BAB_3: SeedModuleItem = {
    title: 'Bab 3: Seni Tari — Gerak Anggota Tubuh',
    order_index: 3,
    target_semester: 1,
    week_target: 5,
    lessons: [
        {
            title: 'Pertemuan 5: Ayo Menari dengan Anggota Tubuh!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal gerak anggota tubuh (tangan, kaki, kepala, pinggang) dan menari dengan gembira.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Musik pengiring tari anak',
                'LKPD',
            ],
            content_text: `# 💃 Ayo Menari dengan Anggota Tubuh!

Halo sahabat cilik! Menari itu **menyenangkan** & bikin sehat! 
Ayo **Maryam** dan **Khadijah** ajak kalian menari! 🎉

---

### 🌟 1. Empat Anggota Tubuh Penari

| Anggota | Gerakan | Emoji |
| :---: | :--- | :---: |
| **Tangan** | Melambai, mengangkat | 👋 |
| **Kaki** | Melangkah, mengangkat | 🦶 |
| **Kepala** | Menoleh, mengangguk | 👤 |
| **Pinggang** | Menggoyang, memutar | 💃 |

---

### 🎭 Komik: Maryam & Khadijah Menari

\`\`\`text
  Maryam  : "Khadijah, ayo menari!" 💃👧
  Khadijah: "Gerakkan tangan dulu! Lambaikan!" 👋👧
  Maryam  : "Sekarang kakinya! Melangkah!" 🦶
  Khadijah: "Kepala menoleh ke kiri-kanan!" 👤
  Asiya   : "Pinggang digoyang, seru!" 💃👧
  Maheer  : "Menari bikin hati senang!" 🎉👦
\`\`\`

---

### 💡 Yang Perlu Diingat:
Anggota tubuh yang digerakkan saat menari:
1. **Tangan** 👋
2. **Kaki** 🦶
3. **Kepala** 👤
4. **Pinggang** 💃

---

### 🔍 Ayo Coba Sendiri:
* **Lambaikan tangan**! 👋
* **Angkat kaki** bergantian! 🦶
* **Tolehkan kepala** ke kiri-kanan! 👤
* **Goyangkan pinggang**! 💃

Ayo jadi **Penari Cilik**! 💃✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita menari bersama!',
                ice_breaker:
                    'Ayo tepuk tangan & goyangkan badan sebelum menari!',
                apperception:
                    'Siapa yang pernah menari? Apa yang digerakkan?',
                trigger_question:
                    'Anggota tubuh apa saja yang kita gerakkan saat menari?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menari menggunakan 4 anggota tubuh: tangan, kaki, kepala, pinggang.',
                concrete_steps: [
                    'Contohkan gerak tangan (melambai).',
                    'Contohkan gerak kaki (melangkah).',
                    'Contohkan gerak kepala (menoleh).',
                    'Contohkan gerak pinggang (menggoyang).',
                    'Anak menirukan setiap gerakan.',
                ],
                script_parent:
                    '"Menari itu mudah! Cukup gerakkan tubuh dengan gembira!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tepuk Anggota Tubuh & Tari Bersama',
                game_rules: [
                    'Guru menyebutkan anggota tubuh.',
                    'Anak memperagakan gerakan.',
                    'Akhiri dengan menari lagu "Kepala, Pundak, Lutut, Kaki".',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Ikuti gerakan guru tempo lambat.',
                    child_level_advanced: 'Tambah variasi gerakan sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan gerakan anggota tubuh.',
                worksheet_print_ready: {
                    title: 'LKPD 3.1: Ayo Menari dengan Anggota Tubuh!',
                    instructions:
                        'Peragakan gerakan berikut & centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'BODY_MOVEMENT_CARD',
                            question:
                                'Peragakan gerakan anggota tubuh berikut! Centang setelah berhasil!',
                            data: {
                                movements: [
                                    {
                                        name: 'Gerak Tangan',
                                        icon: '👋',
                                        instruction: 'Angkat kedua tangan, lambaikan kiri-kanan.',
                                    },
                                    {
                                        name: 'Gerak Kaki',
                                        icon: '🦵',
                                        instruction: 'Angkat kaki kanan-kiri bergantian.',
                                    },
                                    {
                                        name: 'Gerak Kepala',
                                        icon: '👤',
                                        instruction: 'Tolehkan kepala kiri-kanan.',
                                    },
                                    {
                                        name: 'Gerak Pinggang',
                                        icon: '💃',
                                        instruction: 'Tangan di pinggang, goyangkan kiri-kanan.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan semua gerakan.',
                            explanation: 'Melatih koordinasi gerak.',
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
                                label: 'Gambar diriku menari:',
                            },
                            answer_key: 'Anak menggambar diri menari.',
                            explanation: 'Mengasah imajinasi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Gerakan apa yang paling mudah, sayang?',
                    'Bagaimana perasaanmu saat menari?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan 4 anggota tubuh yang digerakkan saat menari!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 3: Gerak Anggota Tubuh',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Anggota tubuh untuk melambai saat menari adalah...',
                            option_a: 'Kaki',
                            option_b: 'Tangan',
                            option_c: 'Kepala',
                            option_d: 'Pinggang',
                            correct_answer: 'B',
                            explanation: 'Tangan untuk melambai.',
                        },
                        {
                            question_text: 'Gerakan menggelengkan kepala menggunakan...',
                            option_a: 'Tangan',
                            option_b: 'Kaki',
                            option_c: 'Kepala',
                            option_d: 'Pinggang',
                            correct_answer: 'C',
                            explanation: 'Kepala untuk menggeleng.',
                        },
                        {
                            question_text: 'Gerakan melangkah menggunakan...',
                            option_a: 'Kaki',
                            option_b: 'Tangan',
                            option_c: 'Kepala',
                            option_d: 'Mata',
                            correct_answer: 'A',
                            explanation: 'Kaki untuk melangkah.',
                        },
                        {
                            question_text: 'Manfaat menari untuk tubuh adalah...',
                            option_a: 'Membuat sakit',
                            option_b: 'Membuat sehat & bugar',
                            option_c: 'Membuat lelah',
                            option_d: 'Membuat kaku',
                            correct_answer: 'B',
                            explanation: 'Menari bikin sehat.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Pertemuan 6: Ayo Menari dengan Ruang Gerak!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal ruang gerak (sempit & luas) dan menari dengan variasi ruang.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Musik pengiring tari',
                'LKPD',
            ],
            content_text: `# 🎈 Ayo Menari dengan Ruang Gerak!

Halo sahabat cilik! Menari bisa **di tempat** atau **berpindah**! 
Ayo **Asiya** dan **Maheer** ajak kalian belajar! 🎉

---

### 🌟 1. Dua Ruang Gerak Tari

| Ruang | Gerakan | Contoh | Emoji |
| :---: | :--- | :--- | :---: |
| **Sempit** | Di tempat | Berdiri, lambaikan tangan | 🧘 |
| **Luas** | Berpindah | Jalan, lompat, berputar | 🏃 |

---

### 🎭 Komik: Asiya & Maheer Menari Berpindah

\`\`\`text
  Asiya  : "Maheer, ayo menari di tempat dulu!" 🧘👧
  Maheer : "Oke! Lambaikan tangan di tempat!" 👋👦
  Asiya  : "Sekarang menari sambil berjalan!" 🏃
  Maheer : "Berputar-putar juga seru!" 💫
  Fatimah: "Aku melompat-lompat!" 🦘👧
  Khadijah: "Ruang luas bikin bebas!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Ruang gerak tari:
1. **Sempit** = gerak di tempat 🧘
2. **Luas** = gerak berpindah 🏃

---

### 🔍 Ayo Coba Sendiri:
* Menari **di tempat** dulu! 🧘
* Lalu **berpindah** ke samping! 🏃
* Sekarang **berputar**! 💫

Ayo jadi **Penari Ruang**! 🎈✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita menari dengan ruang gerak!',
                ice_breaker:
                    'Ayo berjalan di tempat dulu, lalu berjalan keliling!',
                apperception:
                    'Bedanya menari di tempat & berpindah apa?',
                trigger_question:
                    'Pernahkah kalian menari sambil berpindah tempat?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Ruang gerak tari: sempit (di tempat) & luas (berpindah).',
                concrete_steps: [
                    'Jelaskan ruang sempit (di tempat).',
                    'Jelaskan ruang luas (berpindah).',
                    'Contohkan gerakan sempit.',
                    'Contohkan gerakan luas.',
                    'Anak menirukan keduanya.',
                ],
                script_parent:
                    '"Menari bisa di tempat, bisa juga berpindah!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Ruang Sempit vs Ruang Luas',
                game_rules: [
                    'Tandai area lantai dengan lakban.',
                    'Anak menari di tempat (sempit) & berpindah (luas).',
                    'Yang paling kreatif dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Ikuti gerakan guru.',
                    child_level_advanced: 'Ciptakan variasi sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan ruang gerak tari.',
                worksheet_print_ready: {
                    title: 'LKPD 3.2: Ayo Menari dengan Ruang Gerak!',
                    instructions:
                        'Peragakan kedua ruang gerak, lalu centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'BODY_MOVEMENT_CARD',
                            question:
                                'Peragakan kedua jenis ruang gerak tari!',
                            data: {
                                movements: [
                                    {
                                        name: 'Ruang Sempit',
                                        icon: '🧘',
                                        instruction: 'Berdiri di tempat, gerakkan tangan & kepala saja.',
                                    },
                                    {
                                        name: 'Ruang Luas',
                                        icon: '🏃',
                                        instruction: 'Berjalan ke depan, ke samping, ke belakang sambil gerakkan tangan.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan kedua ruang gerak.',
                            explanation: 'Mengenal ruang gerak tari.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu menari dengan ruang luas (berpindah)!',
                            data: {
                                prompt: 'Menari ruang luas',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku menari ruang luas:',
                            },
                            answer_key: 'Anak menggambar diri berpindah.',
                            explanation: 'Mengasah imajinasi gerak.',
                        },
                    ],
                },
                reflection_questions: [
                    'Ruang gerak mana yang lebih mudah, sayang?',
                    'Ruang gerak mana yang lebih seru?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan contoh gerak ruang sempit & luas!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 3: Ruang Gerak Tari',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Gerakan di tempat termasuk ruang...',
                            option_a: 'Luas',
                            option_b: 'Sempit',
                            option_c: 'Besar',
                            option_d: 'Tinggi',
                            correct_answer: 'B',
                            explanation: 'Di tempat = ruang sempit.',
                        },
                        {
                            question_text: 'Berjalan & melompat termasuk ruang...',
                            option_a: 'Sempit',
                            option_b: 'Luas',
                            option_c: 'Kecil',
                            option_d: 'Rendah',
                            correct_answer: 'B',
                            explanation: 'Berpindah = ruang luas.',
                        },
                        {
                            question_text: 'Contoh gerak di tempat adalah...',
                            option_a: 'Berputar sambil berjalan',
                            option_b: 'Berdiri & gerakkan tangan',
                            option_c: 'Melompat jauh',
                            option_d: 'Berjalan ke depan',
                            correct_answer: 'B',
                            explanation: 'Berdiri & gerak tangan = di tempat.',
                        },
                        {
                            question_text: 'Ruang gerak dalam tari sebaiknya...',
                            option_a: 'Sempit terus',
                            option_b: 'Luas terus',
                            option_c: 'Bervariasi',
                            option_d: 'Tidak diperhatikan',
                            correct_answer: 'C',
                            explanation: 'Bervariasi sempit & luas.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 4: SENI TEATER — MENGENAL TEATER
// =============================================================================
const BAB_4: SeedModuleItem = {
    title: 'Bab 4: Seni Teater — Mengenal Teater',
    order_index: 4,
    target_semester: 1,
    week_target: 7,
    lessons: [
        {
            title: 'Pertemuan 7: Ayo Kenalan dengan Dunia Teater!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal konsep drama & berbagai ekspresi wajah.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Kartu ekspresi wajah',
                'Cermin kecil (opsional)',
                'LKPD',
            ],
            content_text: `# 🎭 Ayo Kenalan dengan Dunia Teater!

Halo sahabat cilik! Teater adalah seni **bercerita tanpa bicara**! 
Ayo **Maryam** dan **Fatimah** ajak kalian berkenalan! 🎉

---

### 🌟 1. Empat Ekspresi Wajah

| Ekspresi | Emoji | Kapan? |
| :---: | :---: | :--- |
| **Senang** | 😊 | Saat dapat hadiah |
| **Sedih** | 😢 | Saat kehilangan mainan |
| **Marah** | 😠 | Saat diganggu |
| **Terkejut** | 😲 | Saat lihat sesuatu |

---

### 🎭 Komik: Maryam & Fatimah Latihan Ekspresi

\`\`\`text
  Maryam : "Fatimah, coba ekspresi senang!" 😊👧
  Fatimah: "Hihihi! Aku senang!" 😊👧
  Maryam : "Sekarang sedih!" 😢
  Fatimah: "Huhuhu... sedih..." 😢
  Maheer : "Aku bisa marah! Grrr!" 😠👦
  Asiya  : "Aku terkejut! Wow!" 😲👧
  Khadijah: "Ekspresi bikin cerita hidup!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Teater bercerita dengan:
1. **Ekspresi wajah** 😊😢😠😲
2. **Gerakan tubuh** 🤸
3. **Perasaan** 💖

---

### 🔍 Ayo Coba Sendiri:
* Ekspresi **senang**! 😊
* Ekspresi **sedih**! 😢
* Ekspresi **marah**! 😠
* Ekspresi **terkejut**! 😲

Ayo jadi **Aktor Cilik**! 🎭✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan teater!',
                ice_breaker:
                    'Ayo latihan ekspresi wajah: senang, sedih, marah, terkejut!',
                apperception:
                    'Pernahkah kalian lihat pertunjukan teater?',
                trigger_question:
                    'Bagaimana cara bercerita tanpa bicara?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Teater = seni bercerita dengan ekspresi wajah & gerakan.',
                concrete_steps: [
                    'Jelaskan konsep teater.',
                    'Contohkan ekspresi senang.',
                    'Contohkan ekspresi sedih.',
                    'Contohkan ekspresi marah & terkejut.',
                    'Anak menirukan ekspresi.',
                ],
                script_parent:
                    '"Teater bercerita tanpa kata! Cukup wajah & tubuh!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Ekspresi',
                game_rules: [
                    'Guru menunjukkan ekspresi wajah.',
                    'Anak menebak ekspresi.',
                    'Yang paling cepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan.',
                    child_level_advanced: 'Memperagakan ekspresi lebih detail.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan berbagai ekspresi.',
                worksheet_print_ready: {
                    title: 'LKPD 4.1: Ayo Kenalan dengan Dunia Teater!',
                    instructions:
                        'Peragakan ekspresi berikut & centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Peragakan ekspresi wajah berikut!',
                            data: {
                                expressions: [
                                    { name: 'Senang', emoji: '😊', label: 'SENANG' },
                                    { name: 'Sedih', emoji: '😢', label: 'SEDIH' },
                                    { name: 'Marah', emoji: '😠', label: 'MARAH' },
                                    { name: 'Terkejut', emoji: '😲', label: 'TERKEJUT' },
                                ],
                            },
                            answer_key: 'Anak memperagakan semua ekspresi.',
                            explanation: 'Mengenal ekspresi dalam teater.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah wajahmu dengan ekspresi favoritmu!',
                            data: {
                                prompt: 'Wajah ekspresi favoritku',
                                guideLines: 'dots',
                                rows: 1,
                                label: 'Wajahku dengan ekspresi:',
                            },
                            answer_key: 'Anak menggambar wajah ekspresi.',
                            explanation: 'Mengasah refleksi emosi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Ekspresi apa yang paling mudah, sayang?',
                    'Kapan kamu merasa paling senang?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto dirimu memperagakan ekspresi wajah, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 4: Dunia Teater',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Teater adalah seni yang menggunakan...',
                            option_a: 'Hanya tulisan',
                            option_b: 'Gerak tubuh & ekspresi',
                            option_c: 'Hanya angka',
                            option_d: 'Hanya warna',
                            correct_answer: 'B',
                            explanation: 'Teater = gerak & ekspresi.',
                        },
                        {
                            question_text: 'Emoji 😊 menunjukkan ekspresi...',
                            option_a: 'Sedih',
                            option_b: 'Marah',
                            option_c: 'Senang',
                            option_d: 'Takut',
                            correct_answer: 'C',
                            explanation: '😊 = senang.',
                        },
                        {
                            question_text: 'Emoji 😢 menunjukkan ekspresi...',
                            option_a: 'Senang',
                            option_b: 'Sedih',
                            option_c: 'Marah',
                            option_d: 'Kaget',
                            correct_answer: 'B',
                            explanation: '😢 = sedih.',
                        },
                        {
                            question_text: 'Dalam teater, kita bisa bercerita tanpa...',
                            option_a: 'Gerakan',
                            option_b: 'Bicara',
                            option_c: 'Ekspresi',
                            option_d: 'Perasaan',
                            correct_answer: 'B',
                            explanation: 'Tanpa bicara.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Pertemuan 8: Ayo Bermain Tablo Seru!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat bermain tablo (teater tanpa dialog) dengan gerakan & ekspresi.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Properti sederhana (bola, topi)',
                'Kartu situasi',
                'LKPD',
            ],
            content_text: `# 🎬 Ayo Bermain Tablo Seru!

Halo sahabat cilik! **Tablo** adalah teater **membeku seperti foto**! 
Ayo **Asiya** dan **Khadijah** ajak kalian bermain! 🎉

---

### 🌟 1. Apa Itu Tablo?

**Tablo** = pertunjukan **tanpa bicara** & **tanpa bergerak**!
Pemain **membeku** dalam posisi tertentu seperti **foto hidup**.

**Contoh Tablo:**
* Bermain bola (membeku saat menendang) ⚽
* Sedang makan (membeku saat menyuap) 🍽️
* Sedang menyapu (membeku saat menyapu) 🧹

---

### 🎭 Komik: Asiya & Khadijah Bermain Tablo

\`\`\`text
  Asiya  : "Khadijah, ayo main tablo!" 🎬👧
  Khadijah: "Kita membeku seperti foto ya!" 📸👧
  Asiya  : "Aku jadi anak yang main bola!" ⚽
  Khadijah: "Aku jadi ibu yang menyapu!" 🧹
  Maheer : "Kita membeku... jangan bergerak!" 🤫👦
  Fatimah: "Seperti foto hidup! Seru!" 📸👧
  Khadijah: "Tablo bikin kita kreatif!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tablo:
1. **Tanpa bicara** 🤫
2. **Tanpa bergerak** 🧊
3. **Membeku** seperti foto 📸

---

### 🔍 Ayo Coba Sendiri:
* Posisi **main bola** & membeku! ⚽🧊
* Posisi **menyapu** & membeku! 🧹🧊
* Posisi **makan** & membeku! 🍽️🧊

Ayo jadi **Pemain Tablo**! 🎬✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita bermain tablo!',
                ice_breaker:
                    'Ayo berlatih membeku seperti patung selama 5 detik!',
                apperception:
                    'Pernahkah kalian lihat foto hidup?',
                trigger_question:
                    'Bagaimana caranya bercerita tanpa bicara & tanpa bergerak?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tablo = pertunjukan membeku tanpa bicara & tanpa gerak.',
                concrete_steps: [
                    'Jelaskan konsep tablo.',
                    'Contohkan posisi main bola.',
                    'Contohkan posisi menyapu.',
                    'Anak mencoba membeku.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Tablo seperti foto hidup! Membeku dengan ekspresi!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tablo Kelompok',
                game_rules: [
                    'Anak dibagi kelompok kecil.',
                    'Setiap kelompok diberi situasi.',
                    'Kelompok membuat tablo (posisi membeku).',
                    'Kelompok lain menebak situasinya.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Posisi tablo dengan bantuan guru.',
                    child_level_advanced: 'Komposisi tablo kelompok lengkap.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan tablo.',
                worksheet_print_ready: {
                    title: 'LKPD 4.2: Ayo Bermain Tablo Seru!',
                    instructions:
                        'Peragakan gerakan tablo berikut & centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MIMESIS_ACTION',
                            question:
                                'Peragakan gerakan tablo berikut tanpa bicara!',
                            data: {
                                actions: [
                                    {
                                        name: 'Bermain Bola',
                                        icon: '⚽',
                                        description: 'Bekukan posisi seperti sedang menendang bola.',
                                    },
                                    {
                                        name: 'Sedang Menangis',
                                        icon: '😢',
                                        description: 'Bekukan posisi seperti sedang menangis.',
                                    },
                                    {
                                        name: 'Menyapu Lantai',
                                        icon: '🧹',
                                        description: 'Bekukan posisi seperti sedang menyapu.',
                                    },
                                    {
                                        name: 'Makan Es Krim',
                                        icon: '🍦',
                                        description: 'Bekukan posisi seperti sedang menjilat es krim.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan semua tablo.',
                            explanation: 'Mengenal gerak & ekspresi tablo.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah adegan tablo kelompokmu!',
                            data: {
                                prompt: 'Adegan tablo kelompok',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Adegan tablo kami:',
                            },
                            answer_key: 'Anak menggambar adegan tablo.',
                            explanation: 'Mengasah imajinasi & kolaborasi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana rasanya membeku seperti patung, sayang?',
                    'Situasi tablo mana yang paling seru?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menceritakan pengalaman bermain tablo!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 4: Bermain Tablo',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Tablo adalah pertunjukan tanpa...',
                            option_a: 'Gerakan',
                            option_b: 'Dialog / bicara',
                            option_c: 'Ekspresi',
                            option_d: 'Pemain',
                            correct_answer: 'B',
                            explanation: 'Tablo tanpa bicara.',
                        },
                        {
                            question_text: 'Dalam tablo, pemain berdiri...',
                            option_a: 'Berjalan',
                            option_b: 'Membeku di posisi',
                            option_c: 'Berlari',
                            option_d: 'Melompat',
                            correct_answer: 'B',
                            explanation: 'Tablo membeku.',
                        },
                        {
                            question_text: 'Ekspresi wajah dalam tablo sangat...',
                            option_a: 'Tidak penting',
                            option_b: 'Penting',
                            option_c: 'Biasa saja',
                            option_d: 'Dilarang',
                            correct_answer: 'B',
                            explanation: 'Ekspresi penting.',
                        },
                        {
                            question_text: 'Untuk menampilkan tablo yang baik perlu...',
                            option_a: 'Bicara keras',
                            option_b: 'Kerja sama tim',
                            option_c: 'Berlari',
                            option_d: 'Tidur',
                            correct_answer: 'B',
                            explanation: 'Kerja sama tim.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const SBD_BATCH_2: SeedModuleItem[] = [BAB_3, BAB_4];