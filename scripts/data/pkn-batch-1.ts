// data/pkn-batch-1.ts
// Bab 1-2: Aku dan Teman-Temanku & Aku Patuh pada Aturan (Semester 1)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 1: AKU DAN TEMAN-TEMANKU
// =============================================================================
const BAB_1: SeedModuleItem = {
    title: 'Bab 1: Aku dan Teman-Temanku',
    order_index: 1,
    target_semester: 1,
    week_target: 1,
    lessons: [
        {
            title: 'Pertemuan 1: Ayo Kenalan dengan Diriku!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyebutkan identitas diri (nama, usia, jenis kelamin, hobi) dengan percaya diri.',
            allocated_minutes: 45,
            required_materials: [
                'Cermin kecil',
                'Kertas karton',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌟 Ayo Kenalan dengan Diriku!

Halo sahabat cilik! Hari ini **Maryam** dan **Maheer** akan mengajak kalian 
berkenalan dengan **diri sendiri**! Siapa namamu? Berapa usiamu? 🎉

---

### 🌟 1. Identitasku

| Identitas | Contoh | Emoji |
| :---: | :--- | :---: |
| **Nama** | Maryam | 👧 |
| **Usia** | 6 tahun | 🎂 |
| **Jenis Kelamin** | Perempuan | 👧 |
| **Hobi** | Menggambar | ⭐ |

---

### 🎭 Komik: Maryam & Maheer Berkenalan

\`\`\`text
  Maryam : "Halo! Namaku Maryam. Aku 6 tahun. Aku suka menggambar!" 👧
  Maheer : "Halo Maryam! Namaku Maheer. Aku 6 tahun. Aku suka bola!" 👦
  Asiya  : "Aku Asiya! Aku suka menyanyi!" 👧
  Fatimah: "Aku Fatimah! Aku suka membaca!" 👧
  Khadijah: "Kita semua berbeda, tapi tetap sahabat!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Setiap orang punya **identitas unik**:
1. **Nama** 👤
2. **Usia** 🎂
3. **Jenis kelamin** 👦👧
4. **Hobi** ⭐

Semua adalah karunia Tuhan! 🌟

---

### 🔍 Ayo Coba Sendiri:
* Sebutkan **namamu**! 👤
* Sebutkan **usiamu**! 🎂
* Sebutkan **hobimu**! ⭐

Ayo jadi **Anak Percaya Diri**! 🌟✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan diri sendiri!',
                ice_breaker:
                    'Ayo nyanyikan "Aku Anak Sehat" bersama-sama!',
                apperception:
                    'Coba sebutkan namamu! Siapa yang berani?',
                trigger_question:
                    'Bagaimana cara berkenalan dengan teman baru?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Setiap anak punya identitas: nama, usia, jenis kelamin, hobi.',
                concrete_steps: [
                    'Contohkan: "Nama saya Bu Guru, usia 30 tahun, saya perempuan."',
                    'Setiap anak memperkenalkan diri: nama, usia, jenis kelamin.',
                    'Tunjukkan gambar anak bercermin.',
                    'Diskusi tentang menjaga kebersihan diri.',
                    'Beri apresiasi setiap anak yang berani.',
                ],
                script_parent:
                    '"Kita bersyukur kepada Tuhan karena sudah diberi tubuh sehat. Yuk, kenali dirimu!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Temukan Temanmu',
                game_rules: [
                    'Guru memberi instruksi: "Cari teman seumur denganmu!"',
                    'Anak mencari & berkumpul dengan teman sesuai kriteria.',
                    'Yang paling cepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menemukan 1 teman dengan kriteria sederhana.',
                    child_level_advanced: 'Menemukan 3 teman dengan kriteria berbeda.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengisi kartu identitas & menggambar wajah.',
                worksheet_print_ready: {
                    title: 'LKPD 1.1: Ayo Kenalan dengan Diriku!',
                    instructions:
                        'Isi kartu identitas dirimu & gambarkan wajahmu di kotak!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'IDENTITY_CARD',
                            question:
                                'Isi kartu identitas dirimu dengan lengkap!',
                            data: {
                                fields: [
                                    { label: 'Nama Lengkap', icon: '👤', placeholder: 'Tulis namamu' },
                                    { label: 'Usia', icon: '🎂', placeholder: 'Berapa usiamu?' },
                                    { label: 'Jenis Kelamin', icon: '👦👧', placeholder: 'Laki-laki / Perempuan' },
                                    { label: 'Hobi', icon: '⭐', placeholder: 'Apa yang kamu sukai?' },
                                ],
                                avatar: '🧒',
                            },
                            answer_key: 'Anak mengisi semua kolom identitas.',
                            explanation: 'Melatih kesadaran diri.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah wajahmu sendiri!',
                            data: {
                                prompt: 'Wajahku',
                                guideLines: 'dots',
                                rows: 1,
                                label: 'Wajahku:',
                            },
                            answer_key: 'Anak menggambar wajah dengan mata, hidung, mulut.',
                            explanation: 'Melatih motorik halus.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question: 'Bagaimana perasaanmu memperkenalkan diri?',
                            data: {
                                question: 'Bagaimana perasaanmu memperkenalkan diri?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Percaya Diri' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Malu' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi emosi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Siapa nama lengkapmu, sayang?',
                    'Berapa usiamu sekarang?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil kartu identitas pada LKPD 1.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 2: Ayo Kenalan dengan Teman-Temanku!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal teman-temannya dan menghargai perbedaan yang ada.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu ciri teman',
                'Kertas poster',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 👋 Ayo Kenalan dengan Teman-Temanku!

Halo sahabat cilik! Setiap teman kita **unik & istimewa**! 
Ayo **Asiya** dan **Fatimah** ajak kalian berkenalan dengan teman-teman! 🎉

---

### 🌟 1. Teman-Temanku Berbeda-Beda

| Perbedaan | Contoh | Emoji |
| :---: | :--- | :---: |
| **Jenis kelamin** | Laki-laki & perempuan | 👦👧 |
| **Hobi** | Bola, menggambar, menyanyi | ⚽🎨🎤 |
| **Sifat** | Ceria, pendiam, ramah | 😊 |
| **Kesukaan** | Warna, makanan | 🌈 |

---

### 🎭 Komik: Asiya & Fatimah Cerita Teman

\`\`\`text
  Asiya  : "Fatimah, siapa teman sebangkumu?" 👧
  Fatimah: "Maheer! Dia suka bola!" ⚽👧
  Asiya  : "Aku teman dengan Maryam! Dia suka menggambar!" 🎨
  Maheer : "Kita semua berbeda, tapi tetap sahabat!" 👦
  Khadijah: "Perbedaan itu indah!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Teman kita berbeda-beda:
1. **Jenis kelamin** 👦👧
2. **Hobi** ⚽🎨
3. **Sifat** 😊
4. **Kesukaan** 🌈

**Perbedaan bukan alasan untuk mengejek!**

---

### 🔍 Ayo Cari Tahu:
* Siapa nama 3 temanmu? 👤
* Apa hobi mereka? ⭐
* Apa kesukaan mereka? 🎨

Ayo jadi **Sahabat Semua**! 👋✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan teman-teman!',
                ice_breaker:
                    'Ayo tirukan suara teman sekelasmu: "Hai, teman!"',
                apperception:
                    'Siapa nama teman di sebelahmu?',
                trigger_question:
                    'Apa perbedaan yang kalian lihat pada teman-temanmu?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Setiap teman unik. Perbedaan bukan alasan mengejek.',
                concrete_steps: [
                    'Jelaskan perbedaan laki-laki & perempuan.',
                    'Anak mengamati teman dengan santun.',
                    'Tekankan pentingnya tidak mengejek.',
                    'Anak saling bertanya tentang kesukaan.',
                    'Beri apresiasi setiap interaksi.',
                ],
                script_parent:
                    '"Setiap teman itu istimewa. Ada yang laki-laki, ada perempuan. Semua sahabat kita!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Siapa Temanku?',
                game_rules: [
                    'Guru memberi kartu ciri-ciri teman.',
                    'Anak menebak nama teman yang sesuai.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak ciri mudah (rambut panjang).',
                    child_level_advanced: 'Menebak ciri detail (hobi, suara).',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal teman & membuat aturan bermain.',
                worksheet_print_ready: {
                    title: 'LKPD 1.2: Ayo Kenalan dengan Teman-Temanku!',
                    instructions:
                        'Centang ✓ aturan bermain yang sudah kamu patuhi!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ aturan bermain yang sudah kamu patuhi!',
                            data: {
                                rules: [
                                    { name: 'Berbagi giliran', icon: '🔄', description: 'Menunggu giliran dengan sabar' },
                                    { name: 'Berbagi mainan', icon: '🤝', description: 'Meminjamkan mainan' },
                                    { name: 'Tidak berebut', icon: '✋', description: 'Menunggu tanpa merebut' },
                                    { name: 'Bermain adil', icon: '⚖️', description: 'Ikuti aturan permainan' },
                                    { name: 'Tidak memukul', icon: '🚫', description: 'Bicara baik-baik' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang aturan yang dipatuhi.',
                            explanation: 'Melatih kepatuhan aturan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu dan temanmu sedang bermain bersama!',
                            data: {
                                prompt: 'Aku dan temanku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku dan temanku:',
                            },
                            answer_key: 'Anak menggambar dirinya dengan teman.',
                            explanation: 'Melatih interaksi sosial.',
                        },
                    ],
                },
                reflection_questions: [
                    'Siapa nama 3 temanmu, sayang?',
                    'Apa perbedaan mereka?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 1.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 3: Ayo Patuhi Aturan Bermain!',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menjelaskan pentingnya aturan bermain bersama teman dan mematuhinya.',
            allocated_minutes: 45,
            required_materials: [
                'Bola plastik kecil',
                'Kertas poster',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎮 Ayo Patuhi Aturan Bermain!

Halo sahabat cilik! Aturan bikin permainan jadi **seru & adil**! 
Ayo **Maheer** dan **Khadijah** ajak kalian belajar aturan bermain! 🎉

---

### 🌟 1. Aturan Bermain Bersama

| Aturan | Contoh | Emoji |
| :---: | :--- | :---: |
| **Menunggu giliran** | Sabar menunggu | ⏳ |
| **Berbagi mainan** | Pinjamkan mainan | 🧸 |
| **Ikuti aturan** | Main sesuai kesepakatan | 📜 |
| **Jujur** | Tidak curang | 🤗 |
| **Sportif** | Terima kalah | 🏅 |

---

### 🎭 Komik: Maheer & Khadijah Bermain

\`\`\`text
  Maheer  : "Khadijah, ayo main bola!" ⚽👦
  Khadijah: "Boleh! Tapi ada aturannya ya!" 📜👧
  Maheer  : "Apa aturannya?" 
  Khadijah: "Bergiliran, tidak berebut, dan jujur!" 
  Asiya   : "Aku juga mau ikut! Aku akan sabar menunggu!" ⏳👧
  Khadijah: "Hebat! Kalau ada aturan, permainan seru!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Aturan membuat permainan:
1. **Adil** ⚖️
2. **Aman** 🛡️
3. **Menyenangkan** 🎉

**Tanpa aturan, permainan kacau!**

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah menunggu giliran? ⏳
* Sudah berbagi mainan? 🧸
* Sudah jujur bermain? 🤗

Ayo jadi **Anak Sportif**! 🏅✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar aturan bermain!',
                ice_breaker:
                    'Ayo tepuk tangan: "Giliran!" 1x, "Jujur!" 1x, "Adil!" 1x!',
                apperception:
                    'Siapa yang suka bermain dengan teman?',
                trigger_question:
                    'Apa yang terjadi jika kita bermain tanpa aturan?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Aturan membuat permainan adil, aman, dan menyenangkan.',
                concrete_steps: [
                    'Jelaskan aturan bermain.',
                    'Anak berbagi pengalaman bermain.',
                    'Diskusi akibat tanpa aturan.',
                    'Anak membuat komitmen patuh aturan.',
                    'Beri apresiasi setiap cerita.',
                ],
                script_parent:
                    '"Aturan seperti pagar taman: bikin aman & nyaman!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Lempar Bola Bergiliran',
                game_rules: [
                    'Anak membuat aturan bersama (lempar pelan, giliran).',
                    'Anak bermain sesuai aturan.',
                    'Diskusi: bagaimana rasanya bermain dengan aturan?',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Ikuti aturan dengan panduan guru.',
                    child_level_advanced: 'Buat aturan sendiri & evaluasi.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat poster aturan bermain.',
                worksheet_print_ready: {
                    title: 'LKPD 1.3: Ayo Patuhi Aturan Bermain!',
                    instructions:
                        'Centang ✓ aturan bermain yang sudah kamu patuhi!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ aturan bermain yang sudah kamu patuhi!',
                            data: {
                                rules: [
                                    { name: 'Menunggu giliran', icon: '⏳', description: 'Sabar menunggu' },
                                    { name: 'Berbagi mainan', icon: '🧸', description: 'Pinjamkan mainan' },
                                    { name: 'Ikuti aturan', icon: '📜', description: 'Main sesuai kesepakatan' },
                                    { name: 'Jujur bermain', icon: '🤗', description: 'Tidak curang' },
                                    { name: 'Terima kalah', icon: '🏅', description: 'Yang penting bermain' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang aturan yang dipatuhi.',
                            explanation: 'Melatih kepatuhan aturan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah poster aturan bermain!',
                            data: {
                                prompt: 'Poster aturan bermain',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Poster aturanku:',
                            },
                            answer_key: 'Anak menggambar poster aturan.',
                            explanation: 'Melatih kreativitas & pemahaman aturan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Mengapa aturan penting saat bermain, sayang?',
                    'Apa yang terjadi jika tidak ada aturan?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan 3 aturan bermain yang harus dipatuhi!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 1: Aku dan Teman-Temanku',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Saat bermain dengan teman, kita harus...',
                            option_a: 'Berebut mainan',
                            option_b: 'Menunggu giliran',
                            option_c: 'Memukul teman',
                            option_d: 'Marah jika kalah',
                            correct_answer: 'B',
                            explanation: 'Menunggu giliran dengan sabar.',
                        },
                        {
                            question_text: 'Mengapa kita perlu mematuhi aturan bermain?',
                            option_a: 'Agar teman marah',
                            option_b: 'Agar permainan adil & menyenangkan',
                            option_c: 'Agar menang terus',
                            option_d: 'Agar bisa curang',
                            correct_answer: 'B',
                            explanation: 'Aturan bikin permainan adil & seru.',
                        },
                        {
                            question_text: 'Jika kita kalah dalam permainan, sikap yang baik adalah...',
                            option_a: 'Marah dan menangis',
                            option_b: 'Menerima dengan sportif',
                            option_c: 'Menyalahkan teman',
                            option_d: 'Tidak mau bermain lagi',
                            correct_answer: 'B',
                            explanation: 'Terima kalah dengan sportif.',
                        },
                        {
                            question_text: 'Salah satu bentuk menghargai perbedaan teman adalah...',
                            option_a: 'Mengejek perbedaan',
                            option_b: 'Bermain dengan semua teman',
                            option_c: 'Memilih teman tertentu saja',
                            option_d: 'Menjauhi teman berbeda',
                            correct_answer: 'B',
                            explanation: 'Bermain dengan semua teman.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 2: AKU PATUH PADA ATURAN
// =============================================================================
const BAB_2: SeedModuleItem = {
    title: 'Bab 2: Aku Patuh pada Aturan',
    order_index: 2,
    target_semester: 1,
    week_target: 4,
    lessons: [
        {
            title: 'Pertemuan 4: Aturan dalam Keluargaku',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyebutkan aturan di rumah dan memahami pentingnya untuk hidup rukun.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🏡 Aturan dalam Keluargaku

Halo sahabat cilik! Aturan di rumah bikin keluarga **rukun & bahagia**! 
Ayo **Maryam** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Aturan di Rumah

| Aturan | Emoji |
| :--- | :---: |
| Tidur tepat waktu | 🌙 |
| Bangun pagi sendiri | 🌅 |
| Merapikan mainan | 🧸 |
| Membantu orang tua | 🤝 |
| Cuci tangan sebelum makan | 🧼 |
| Berpamitan ke orang tua | 👋 |

---

### 🎭 Komik: Maryam & Fatimah Cerita Aturan

\`\`\`text
  Maryam : "Fatimah, apa aturan di rumahmu?" 🏡👧
  Fatimah: "Tidur jam 8 malam!" 🌙👧
  Maryam : "Aku juga! Dan merapikan mainan!" 🧸
  Asiya  : "Aku bantu ibu cuci piring!" 🧼👧
  Maheer : "Aku berpamitan ke ayah sebelum sekolah!" 👋👦
  Khadijah: "Aturan rumah bikin keluarga bahagia!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Aturan di rumah membuat keluarga:
1. **Rukun** 🤝
2. **Nyaman** 🏡
3. **Bahagia** 💖

---

### 🔍 Ayo Cek Aturan Rumahmu:
* Sudah tidur tepat waktu? 🌙
* Sudah membantu orang tua? 🤝
* Sudah cuci tangan sebelum makan? 🧼

Ayo jadi **Anak Patuh**! 🏡✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar aturan di rumah!',
                ice_breaker:
                    'Ayo nyanyikan "Bangun Pagi" bersama-sama!',
                apperception:
                    'Apa aturan yang ada di rumahmu?',
                trigger_question:
                    'Mengapa aturan di rumah itu penting?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Aturan keluarga membuat hidup rukun, nyaman, teratur.',
                concrete_steps: [
                    'Jelaskan pentingnya aturan rumah.',
                    'Anak berbagi aturan di rumah masing-masing.',
                    'Tunjukkan poster aturan rumah.',
                    'Diskusi manfaat patuh aturan.',
                    'Beri apresiasi setiap cerita.',
                ],
                script_parent:
                    '"Aturan di rumah bikin keluarga rukun & bahagia!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Siapa yang Patuh?',
                game_rules: [
                    'Guru membacakan situasi.',
                    'Anak menentukan patuh/tidak patuh.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menjawab dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan alasan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal aturan rumah.',
                worksheet_print_ready: {
                    title: 'LKPD 2.1: Aturan dalam Keluargaku',
                    instructions:
                        'Centang ✓ aturan rumah yang sudah kamu patuhi!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ aturan rumah yang sudah kamu patuhi!',
                            data: {
                                rules: [
                                    { name: 'Tidur tepat waktu', icon: '🌙', description: 'Tidur sebelum jam 9' },
                                    { name: 'Bangun pagi sendiri', icon: '🌅', description: 'Bangun tanpa dibangunkan' },
                                    { name: 'Merapikan mainan', icon: '🧸', description: 'Rapikan setelah bermain' },
                                    { name: 'Bantu orang tua', icon: '🤝', description: 'Bantu pekerjaan rumah' },
                                    { name: 'Cuci tangan sebelum makan', icon: '🧼', description: 'Pakai sabun' },
                                    { name: 'Berpamitan', icon: '👋', description: 'Pamit sebelum pergi' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang aturan yang dipatuhi.',
                            explanation: 'Melatih kepatuhan aturan rumah.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah salah satu aturan rumah yang kamu sukai!',
                            data: {
                                prompt: 'Aturan rumah favoritku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aturan rumah favoritku:',
                            },
                            answer_key: 'Anak menggambar aturan rumah.',
                            explanation: 'Melatih pemahaman aturan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa aturan rumah yang paling penting, sayang?',
                    'Mengapa kamu harus mematuhinya?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 2.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 5: Ayo Patuhi Aturan di Rumah!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menunjukkan perilaku mematuhi aturan di rumah dan membuat jadwal harian.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas untuk jadwal',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 📅 Ayo Patuhi Aturan di Rumah!

Halo sahabat cilik! Disiplin bikin kita **tumbuh hebat**! 
Ayo **Asiya** dan **Maheer** ajak kalian belajar disiplin! 🎉

---

### 🌟 1. Jadwal Harianku

| Waktu | Kegiatan | Emoji |
| :--- | :--- | :---: |
| **Pagi** | Bangun, mandi, sarapan | 🌅 |
| **Siang** | Belajar, makan siang | ☀️ |
| **Sore** | Bermain, mandi | 🌤️ |
| **Malam** | Belajar, tidur | 🌙 |

---

### 🎭 Komik: Asiya & Maheer Disiplin

\`\`\`text
  Asiya  : "Maheer, aku bangun jam 5 tadi!" 🌅👧
  Maheer : "Hebat! Aku juga! Lalu mandi & sarapan!" 👦
  Asiya  : "Aku belajar jam 7!" 📚
  Maheer : "Aku tidur jam 8 malam!" 🌙
  Fatimah: "Kita semua disiplin!" 👧
  Khadijah: "Disiplin bikin sukses!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Disiplin artinya **melakukan sesuatu tepat waktu**.
Dengan disiplin, kita jadi:
1. **Teratur** 📅
2. **Sehat** 💪
3. **Sukses** 🌟

---

### 🔍 Ayo Cek Disiplinmu:
* Bangun pagi tepat waktu? 🌅
* Belajar sesuai jadwal? 📚
* Tidur tepat waktu? 🌙

Ayo jadi **Anak Disiplin**! 📅✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar disiplin di rumah!',
                ice_breaker:
                    'Ayo tepuk tangan: "Bangun!" 1x, "Belajar!" 1x, "Tidur!" 1x!',
                apperception:
                    'Siapa yang tadi pagi bangun sendiri?',
                trigger_question:
                    'Bagaimana cara kamu menunjukkan kepatuhan pada aturan di rumah?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Disiplin = melakukan sesuatu tepat waktu.',
                concrete_steps: [
                    'Jelaskan pentingnya disiplin.',
                    'Anak berbagi kebiasaan harian.',
                    'Diskusi manfaat disiplin.',
                    'Anak membuat jadwal harian.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Anak yang disiplin akan tumbuh jadi pribadi hebat!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Bermain Peran Jadwal Harian',
                game_rules: [
                    'Guru memberi skenario kegiatan.',
                    'Anak memerankan kegiatan sesuai jadwal.',
                    'Yang paling semangat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memerankan dengan bantuan guru.',
                    child_level_advanced: 'Memerankan & menjelaskan alasannya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat jadwal harian.',
                worksheet_print_ready: {
                    title: 'LKPD 2.2: Ayo Patuhi Aturan di Rumah!',
                    instructions:
                        'Centang ✓ jadwal harian yang sudah kamu lakukan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ jadwal harian yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Bangun pagi jam 5', icon: '🌅', description: 'Sebelum matahari terbit' },
                                    { name: 'Mandi pagi', icon: '🚿', description: 'Mandi dengan bersih' },
                                    { name: 'Sarapan sehat', icon: '🍳', description: 'Sarapan sebelum sekolah' },
                                    { name: 'Belajar/PR', icon: '📚', description: 'Belajar pada waktunya' },
                                    { name: 'Tidur jam 8 malam', icon: '🌙', description: 'Tidur tepat waktu' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang jadwal yang dilakukan.',
                            explanation: 'Melatih disiplin harian.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu melakukan salah satu kegiatan harian!',
                            data: {
                                prompt: 'Kegiatan harianku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Kegiatan harianku:',
                            },
                            answer_key: 'Anak menggambar kegiatan harian.',
                            explanation: 'Melatih pemahaman rutinitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana perasaanmu setelah mematuhi jadwal, sayang?',
                    'Apa manfaat disiplin bagi keluargamu?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil jadwal harian pada LKPD 2.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 6: Aku Peduli dengan Tempat Tinggalku',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menunjukkan sikap peduli terhadap lingkungan tempat tinggal dengan mematuhi aturan kebersihan.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar lingkungan bersih & kotor',
                'Kertas poster',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌳 Aku Peduli dengan Tempat Tinggalku!

Halo sahabat cilik! Lingkungan bersih = **hidup nyaman**! 
Ayo **Fatimah** dan **Khadijah** ajak kalian belajar menjaga lingkungan! 🎉

---

### 🌟 1. Cara Menjaga Lingkungan

| Kegiatan | Emoji |
| :--- | :---: |
| Buang sampah pada tempatnya | 🗑️ |
| Menyapu halaman | 🧹 |
| Menyiram tanaman | 🌱 |
| Merapikan sepatu | 👟 |
| Membantu ibu di dapur | 🍳 |

---

### 🎭 Komik: Fatimah & Khadijah Jaga Lingkungan

\`\`\`text
  Fatimah : "Khadijah, aku buang sampah tadi!" 🗑️👧
  Khadijah: "Hebat! Aku juga menyapu halaman!" 🧹👧
  Fatimah : "Aku siram tanaman di depan rumah!" 🌱
  Khadijah: "Bagus! Lingkungan bersih bikin nyaman!" 💖
  Maheer  : "Aku rapikan sepatuku di rak!" 👟👦
  Khadijah: "Kalian semua peduli lingkungan!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Lingkungan bersih bikin:
1. **Sehat** 💪
2. **Nyaman** 🏡
3. **Indah** 🌸

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah buang sampah pada tempatnya? 🗑️
* Sudah menyapu halaman? 🧹
* Sudah menyiram tanaman? 🌱

Ayo jadi **Anak Peduli Lingkungan**! 🌳✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar peduli lingkungan!',
                ice_breaker:
                    'Ayo nyanyikan "Lihat Kebunku" bersama-sama!',
                apperception:
                    'Apa yang kamu lakukan untuk menjaga kebersihan rumah?',
                trigger_question:
                    'Mengapa kita harus menjaga kebersihan lingkungan?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Lingkungan bersih adalah tanggung jawab bersama.',
                concrete_steps: [
                    'Jelaskan aturan kebersihan lingkungan.',
                    'Anak mengamati gambar bersih vs kotor.',
                    'Diskusi cara menjaga kebersihan.',
                    'Anak menyebutkan kegiatan yang bisa dilakukan.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Lingkungan bersih dimulai dari rumah kita!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Bersih atau Kotor?',
                game_rules: [
                    'Guru menunjukkan gambar.',
                    'Anak menebak bersih/kotor.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan dampaknya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membuat poster kebersihan.',
                worksheet_print_ready: {
                    title: 'LKPD 2.3: Aku Peduli dengan Tempat Tinggalku',
                    instructions:
                        'Centang ✓ kegiatan menjaga kebersihan yang sudah kamu lakukan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ kegiatan menjaga kebersihan yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Buang sampah pada tempatnya', icon: '🗑️', description: 'Tidak buang sembarangan' },
                                    { name: 'Menyapu halaman', icon: '🧹', description: 'Menyapu halaman rumah' },
                                    { name: 'Menyiram tanaman', icon: '🌱', description: 'Setiap hari' },
                                    { name: 'Merapikan sepatu', icon: '👟', description: 'Letakkan di rak' },
                                    { name: 'Bantu ibu di dapur', icon: '🍳', description: 'Setelah makan' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang kegiatan yang dilakukan.',
                            explanation: 'Melatih kepedulian lingkungan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah poster "Ayo Jaga Kebersihan!"',
                            data: {
                                prompt: 'Poster kebersihan',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Poster kebersihanku:',
                            },
                            answer_key: 'Anak menggambar poster.',
                            explanation: 'Melatih kreativitas & kepedulian.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa yang kamu lakukan untuk menjaga kebersihan, sayang?',
                    'Mengapa kebersihan itu penting?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil poster kebersihan pada LKPD 2.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 2: Aku Patuh pada Aturan',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Mematuhi aturan di rumah membuat keluarga menjadi...',
                            option_a: 'Berantakan',
                            option_b: 'Rukun dan nyaman',
                            option_c: 'Sedih',
                            option_d: 'Marah',
                            correct_answer: 'B',
                            explanation: 'Aturan membuat keluarga rukun.',
                        },
                        {
                            question_text: 'Contoh aturan di rumah adalah...',
                            option_a: 'Tidur tepat waktu',
                            option_b: 'Bermain sepanjang malam',
                            option_c: 'Buang sampah sembarangan',
                            option_d: 'Tidak membantu orang tua',
                            correct_answer: 'A',
                            explanation: 'Tidur tepat waktu = aturan rumah.',
                        },
                        {
                            question_text: 'Jika kita mematuhi aturan, orang tua akan...',
                            option_a: 'Marah',
                            option_b: 'Bangga dan senang',
                            option_c: 'Sedih',
                            option_d: 'Kecewa',
                            correct_answer: 'B',
                            explanation: 'Orang tua bangga.',
                        },
                        {
                            question_text: 'Salah satu cara menjaga lingkungan adalah...',
                            option_a: 'Buang sampah pada tempatnya',
                            option_b: 'Menebang pohon sembarangan',
                            option_c: 'Membuang sampah ke sungai',
                            option_d: 'Merusak tanaman',
                            correct_answer: 'A',
                            explanation: 'Buang sampah pada tempatnya.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const PKN_BATCH_1: SeedModuleItem[] = [BAB_1, BAB_2];