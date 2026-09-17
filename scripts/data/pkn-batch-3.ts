// data/pkn-batch-3.ts
// Bab 4: Aku dan Lingkunganku (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './types';

// =============================================================================
// BAB 4: AKU DAN LINGKUNGANKU
// =============================================================================
const BAB_4: SeedModuleItem = {
    title: 'Bab 4: Aku dan Lingkunganku',
    order_index: 4,
    target_semester: 2,
    week_target: 10,
    lessons: [
        {
            title: 'Pertemuan 10: Aku Mengenal Lingkungan Tempat Tinggalku',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal karakteristik lingkungan tempat tinggal dan menyebutkan bagian-bagiannya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar lingkungan tempat tinggal',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🏡 Ayo Kenalan dengan Lingkungan Rumahku!

Halo sahabat cilik! Lingkungan rumah kita **indah & beragam**! 
Ayo **Maryam** dan **Maheer** ajak kalian berkenalan! 🎉

---

### 🌟 1. Bagian Lingkungan Rumah

| Bagian | Emoji | Contoh |
| :---: | :---: | :--- |
| **Rumah** | 🏠 | Tempat tinggal keluarga |
| **Jalan** | 🛣️ | Jalan di depan rumah |
| **Taman** | 🌳 | Halaman atau taman |
| **Tetangga** | 🏘️ | Rumah tetangga |
| **Tempat Ibadah** | 🕌 | Masjid, gereja |

---

### 🎭 Komik: Maryam & Maheer Keliling Rumah

\`\`\`text
  Maryam : "Maheer, lihat rumahku!" 🏠👧
  Maheer : "Bagus! Ada taman di depannya!" 🌳👦
  Maryam : "Ada jalan kecil juga!" 🛣️
  Asiya  : "Aku suka menyapa tetangga!" 🏘️👧
  Fatimah: "Aku suka ke masjid dekat rumah!" 🕌👧
  Khadijah: "Lingkungan kita indah ya!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Lingkungan rumah punya:
1. **Rumah** 🏠
2. **Jalan** 🛣️
3. **Taman** 🌳
4. **Tetangga** 🏘️
5. **Tempat ibadah** 🕌

Semua adalah karunia Tuhan! 💖

---

### 🔍 Ayo Cek Lingkunganmu:
* Ada **rumah**? 🏠
* Ada **jalan**? 🛣️
* Ada **tetangga**? 🏘️

Ayo jadi **Detektif Lingkungan**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan lingkungan rumah!',
                ice_breaker:
                    'Ayo sebutkan apa yang kamu lihat di depan rumahmu!',
                apperception:
                    'Siapa yang tinggal di rumah? Siapa tetanggamu?',
                trigger_question:
                    'Apa saja yang ada di lingkungan tempat tinggalmu?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Lingkungan tempat tinggal memiliki banyak bagian: rumah, jalan, taman, tetangga, tempat ibadah.',
                concrete_steps: [
                    'Jelaskan definisi lingkungan.',
                    'Anak menyebutkan bagian-bagian lingkungan.',
                    'Tunjukkan gambar setiap bagian.',
                    'Anak berbagi cerita tentang lingkungannya.',
                    'Beri apresiasi setiap cerita.',
                ],
                script_parent:
                    '"Lingkungan rumah kita adalah karunia Tuhan. Yuk, jaga bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Cari Benda di Lingkungan',
                game_rules: [
                    'Guru menunjukkan gambar benda.',
                    'Anak menebak di mana benda itu berada.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan fungsi setiap bagian.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal lingkungan tempat tinggal.',
                worksheet_print_ready: {
                    title: 'LKPD 4.1: Aku Mengenal Lingkungan Tempat Tinggalku',
                    instructions:
                        'Centang ✓ bagian lingkungan yang ada di sekitarmu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ bagian lingkungan tempat tinggal yang kamu kenal!',
                            data: {
                                rules: [
                                    { name: 'Rumah', icon: '🏠', description: 'Tempat tinggal keluarga' },
                                    { name: 'Jalan', icon: '🛣️', description: 'Jalan di depan rumah' },
                                    { name: 'Taman', icon: '🌳', description: 'Taman atau halaman' },
                                    { name: 'Warung', icon: '🏪', description: 'Toko dekat rumah' },
                                    { name: 'Sungai', icon: '🌊', description: 'Sungai atau saluran air' },
                                    { name: 'Masjid/Gereja', icon: '🕌', description: 'Tempat ibadah' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang bagian yang sesuai.',
                            explanation: 'Mengenal lingkungan tempat tinggal.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah salah satu bagian lingkungan rumahmu!',
                            data: {
                                prompt: 'Lingkungan rumahku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Lingkungan rumahku:',
                            },
                            answer_key: 'Anak menggambar bagian lingkungan.',
                            explanation: 'Melatih pengamatan & seni.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja yang ada di lingkunganmu, sayang?',
                    'Bagaimana perasaanmu tinggal di sana?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil gambar lingkungan pada LKPD 4.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 11: Aku Suka Bergotong Royong!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menerapkan sikap gotong royong di rumah dan lingkungan tempat tinggal.',
            allocated_minutes: 45,
            required_materials: [
                'Bola kecil & piring plastik',
                'Alat kebersihan',
                'Kertas poster',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🤝 Ayo Bergotong Royong!

Halo sahabat cilik! Gotong royong artinya **bekerja sama**! 
Ayo **Asiya** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Contoh Gotong Royong

| Kegiatan | Emoji |
| :--- | :---: |
| Bantu ibu di dapur | 🍳 |
| Menyapu halaman | 🧹 |
| Merapikan mainan | 🧸 |
| Menyiram tanaman | 🌱 |
| Membantu tetangga | 🤝 |

---

### 🎭 Komik: Asiya & Fatimah Gotong Royong

\`\`\`text
  Asiya  : "Fatimah, ayo bantu ibu cuci piring!" 🍳👧
  Fatimah: "Ayo! Gotong royong itu seru!" 🤝👧
  Asiya  : "Aku juga bantu menyapu halaman!" 🧹
  Maheer : "Aku bantu ayah mencuci mobil!" 🚗👦
  Khadijah: "Gotong royong = keluarga bahagia!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Gotong royong = **bekerja sama**!
Manfaatnya:
1. **Pekerjaan cepat selesai** ⚡
2. **Lebih menyenangkan** 😊
3. **Mempererat persaudaraan** 💖

---

### 🔍 Ayo Cek Kebiasaanmu:
* Bantu ibu di dapur? 🍳
* Bantu ayah di halaman? 🧹
* Bantu tetangga? 🤝

Ayo jadi **Anak Gotong Royong**! 🤝✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar gotong royong!',
                ice_breaker:
                    'Ayo nyanyikan lagu "Gotong Royong" bersama-sama!',
                apperception:
                    'Siapa yang pernah membantu orang tua di rumah?',
                trigger_question:
                    'Apa itu gotong royong?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Gotong royong = bekerja sama untuk mencapai tujuan bersama.',
                concrete_steps: [
                    'Jelaskan pengertian gotong royong.',
                    'Anak berbagi pengalaman membantu.',
                    'Tunjukkan contoh gotong royong.',
                    'Diskusi manfaat gotong royong.',
                    'Beri apresiasi setiap cerita.',
                ],
                script_parent:
                    '"Gotong royong budaya bangsa kita! Bekerja bersama lebih menyenangkan!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Pindahkan Bola',
                game_rules: [
                    'Anak bekerja kelompok memindahkan bola.',
                    'Bola dipindahkan dengan piring plastik.',
                    'Kelompok tercepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memindahkan 1 bola dengan bantuan.',
                    child_level_advanced: 'Memindahkan 3 bola berturut-turut.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Praktik gotong royong.',
                worksheet_print_ready: {
                    title: 'LKPD 4.2: Aku Suka Bergotong Royong!',
                    instructions:
                        'Centang ✓ kegiatan gotong royong yang sudah kamu lakukan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ kegiatan gotong royong yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Bantu ibu di dapur', icon: '🍳', description: 'Cuci piring / masak' },
                                    { name: 'Menyapu halaman', icon: '🧹', description: 'Bersama ayah' },
                                    { name: 'Merapikan mainan', icon: '🧸', description: 'Setelah bermain' },
                                    { name: 'Menyiram tanaman', icon: '🌱', description: 'Bersama keluarga' },
                                    { name: 'Membantu tetangga', icon: '🤝', description: 'Yang kesulitan' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang kegiatan gotong royong.',
                            explanation: 'Melatih sikap gotong royong.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu bergotong royong dengan keluarga!',
                            data: {
                                prompt: 'Gotong royong keluargaku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Gotong royong keluargaku:',
                            },
                            answer_key: 'Anak menggambar gotong royong.',
                            explanation: 'Melatih pemahaman gotong royong.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa itu gotong royong, sayang?',
                    'Kapan kamu bergotong royong?',
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
            title: 'Pertemuan 12: Aku Mengenal Lingkungan Sekolah',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal bagian-bagian lingkungan sekolah dan fungsinya.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🏫 Ayo Kenalan dengan Lingkungan Sekolah!

Halo sahabat cilik! Sekolah adalah **rumah kedua** kita! 
Ayo **Maheer** dan **Khadijah** ajak kalian berkenalan! 🎉

---

### 🌟 1. Bagian-Bagian Sekolah

| Bagian | Fungsi | Emoji |
| :---: | :--- | :---: |
| **Ruang Kelas** | Belajar | 🏫 |
| **Perpustakaan** | Baca buku | 📚 |
| **Kantin** | Beli makanan | 🍽️ |
| **Halaman** | Bermain | 🌳 |
| **Ruang Guru** | Guru bekerja | 👨‍🏫 |
| **Toilet** | Buang air | 🚻 |

---

### 🎭 Komik: Maheer & Khadijah Keliling Sekolah

\`\`\`text
  Maheer  : "Khadijah, ini ruang apa?" 🏫👦
  Khadijah: "Ini ruang kelas! Tempat belajar!" 👧
  Maheer  : "Kalau yang itu?" 📚
  Khadijah: "Perpustakaan! Tempat baca buku!" 
  Asiya   : "Aku suka ke kantin!" 🍽️👧
  Khadijah: "Sekolah kita lengkap ya!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Sekolah punya:
1. **Ruang kelas** 🏫
2. **Perpustakaan** 📚
3. **Kantin** 🍽️
4. **Halaman** 🌳
5. **Ruang guru** 👨‍🏫
6. **Toilet** 🚻

Semua untuk belajar & bermain!

---

### 🔍 Ayo Cek Sekolahmu:
* Ada **ruang kelas**? 🏫
* Ada **perpustakaan**? 📚
* Ada **kantin**? 🍽️

Ayo jadi **Detektif Sekolah**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan lingkungan sekolah!',
                ice_breaker:
                    'Ayo nyanyikan "Di Sini Senang, Di Sana Senang" bersama-sama!',
                apperception:
                    'Apa saja yang ada di sekolah kita?',
                trigger_question:
                    'Apa bagian sekolah yang paling kamu sukai?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Sekolah punya banyak bagian dengan fungsi masing-masing.',
                concrete_steps: [
                    'Ajak anak berkeliling sekolah.',
                    'Tunjukkan bagian-bagian sekolah.',
                    'Jelaskan fungsi setiap bagian.',
                    'Anak mencatat apa yang dilihat.',
                    'Beri apresiasi setiap pengamatan.',
                ],
                script_parent:
                    '"Sekolah adalah rumah kedua. Yuk, kenali setiap bagiannya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Fasilitas Sekolah',
                game_rules: [
                    'Guru memberi petunjuk.',
                    'Anak menebak nama bagian sekolah.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan fungsi bagian sekolah.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal bagian sekolah.',
                worksheet_print_ready: {
                    title: 'LKPD 4.3: Aku Mengenal Lingkungan Sekolah',
                    instructions:
                        'Centang ✓ bagian sekolah yang kamu kenal & sukai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ bagian sekolah yang kamu kenal & sukai!',
                            data: {
                                rules: [
                                    { name: 'Ruang Kelas', icon: '🏫', description: 'Tempat belajar' },
                                    { name: 'Perpustakaan', icon: '📚', description: 'Tempat baca buku' },
                                    { name: 'Kantin', icon: '🍽️', description: 'Tempat beli makanan' },
                                    { name: 'Halaman', icon: '🌳', description: 'Tempat bermain' },
                                    { name: 'Ruang Guru', icon: '👨‍🏫', description: 'Tempat guru bekerja' },
                                    { name: 'Toilet', icon: '🚻', description: 'Tempat buang air' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang bagian sekolah.',
                            explanation: 'Mengenal lingkungan sekolah.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah bagian sekolah yang paling kamu sukai!',
                            data: {
                                prompt: 'Bagian sekolah favoritku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Bagian favoritku:',
                            },
                            answer_key: 'Anak menggambar bagian sekolah.',
                            explanation: 'Melatih pengamatan lingkungan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja bagian sekolahmu, sayang?',
                    'Bagian mana yang paling kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil gambar bagian sekolah pada LKPD 4.3, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 13: Aku Peduli pada Lingkungan Sekolah',
            order_index: 4,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menunjukkan sikap peduli terhadap lingkungan sekolah dengan menjaga kebersihan.',
            allocated_minutes: 45,
            required_materials: [
                'Alat kebersihan (sapu, lap)',
                'Kertas poster',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🧹 Ayo Peduli Lingkungan Sekolah!

Halo sahabat cilik! Sekolah bersih = **belajar nyaman**! 
Ayo **Maryam** dan **Khadijah** ajak kalian belajar peduli! 🎉

---

### 🌟 1. Cara Menjaga Kebersihan Sekolah

| Kegiatan | Emoji |
| :--- | :---: |
| Buang sampah pada tempatnya | 🗑️ |
| Merapikan meja & kursi | 🪑 |
| Menyapu kelas | 🧹 |
| Menyiram tanaman | 🌱 |
| Menjaga toilet bersih | 🚽 |

---

### 🎭 Komik: Maryam & Khadijah Bersih-bersih

\`\`\`text
  Maryam  : "Khadijah, kelas kita kotor!" 🧹👧
  Khadijah: "Ayo bersihkan bersama!" 🤝👧
  Maryam  : "Aku sapu, kamu rapikan meja!" 🪑
  Maheer  : "Aku buang sampah ke tempatnya!" 🗑️👦
  Fatimah : "Aku siram tanaman di halaman!" 🌱👧
  Khadijah: "Sekolah bersih = belajar nyaman!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Menjaga kebersihan sekolah:
1. Buang sampah pada tempatnya 🗑️
2. Rapikan meja & kursi 🪑
3. Menyapu kelas 🧹
4. Menyiram tanaman 🌱

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah buang sampah pada tempatnya? 🗑️
* Sudah rapikan meja? 🪑
* Sudah siram tanaman? 🌱

Ayo jadi **Anak Peduli Sekolah**! 🏫✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar peduli kebersihan sekolah!',
                ice_breaker:
                    'Ayo nyanyikan "Lingkungan Bersih Sehat" bersama-sama!',
                apperception:
                    'Siapa yang suka sekolah bersih?',
                trigger_question:
                    'Bagaimana cara menjaga kebersihan sekolah?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Peduli lingkungan sekolah adalah tanggung jawab semua warga sekolah.',
                concrete_steps: [
                    'Diskusi ciri kelas bersih.',
                    'Anak mengamati kelas.',
                    'Jelaskan pentingnya kebersihan.',
                    'Anak membuat komitmen menjaga kebersihan.',
                    'Beri apresiasi.',
                ],
                script_parent:
                    '"Sekolah bersih tanggung jawab kita semua!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Siapa Paling Cepat?',
                game_rules: [
                    'Anak dibagi kelompok.',
                    'Setiap kelompok membersihkan area.',
                    'Kelompok tercepat & terbersih dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Membersihkan area kecil dengan bantuan.',
                    child_level_advanced: 'Membersihkan area lebih besar.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Praktik gotong royong & komitmen.',
                worksheet_print_ready: {
                    title: 'LKPD 4.4: Aku Peduli pada Lingkungan Sekolah',
                    instructions:
                        'Centang ✓ kegiatan menjaga kebersihan sekolah!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ kegiatan menjaga kebersihan sekolah yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Buang sampah pada tempatnya', icon: '🗑️', description: 'Tidak buang sembarangan' },
                                    { name: 'Merapikan meja & kursi', icon: '🪑', description: 'Setelah belajar' },
                                    { name: 'Menyapu kelas', icon: '🧹', description: 'Sesuai piket' },
                                    { name: 'Menyiram tanaman', icon: '🌱', description: 'Di halaman sekolah' },
                                    { name: 'Menjaga toilet', icon: '🚽', description: 'Siram setelah pakai' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang kegiatan kebersihan sekolah.',
                            explanation: 'Melatih kepedulian lingkungan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah poster "Ayo Jaga Kebersihan Sekolah!"',
                            data: {
                                prompt: 'Poster kebersihan sekolah',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Poster kebersihan sekolah:',
                            },
                            answer_key: 'Anak menggambar poster.',
                            explanation: 'Melatih kreativitas & tanggung jawab.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa yang kamu lakukan untuk menjaga kebersihan sekolah, sayang?',
                    'Mengapa kebersihan sekolah penting?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil poster kebersihan pada LKPD 4.4, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 4: Aku dan Lingkunganku',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Gotong royong artinya...',
                            option_a: 'Bekerja sama',
                            option_b: 'Bermain sendiri',
                            option_c: 'Tidur siang',
                            option_d: 'Bermalas-malasan',
                            correct_answer: 'A',
                            explanation: 'Gotong royong = bekerja sama.',
                        },
                        {
                            question_text: 'Bagian sekolah tempat kita membaca buku adalah...',
                            option_a: 'Kantin',
                            option_b: 'Perpustakaan',
                            option_c: 'Toilet',
                            option_d: 'Halaman',
                            correct_answer: 'B',
                            explanation: 'Perpustakaan untuk baca buku.',
                        },
                        {
                            question_text: 'Sikap peduli pada lingkungan sekolah bisa ditunjukkan dengan...',
                            option_a: 'Buang sampah pada tempatnya',
                            option_b: 'Buang sampah sembarangan',
                            option_c: 'Merusak tanaman',
                            option_d: 'Mencoret dinding',
                            correct_answer: 'A',
                            explanation: 'Buang sampah pada tempatnya.',
                        },
                        {
                            question_text: 'Kegiatan gotong royong di rumah bisa berupa...',
                            option_a: 'Membantu ibu mencuci piring',
                            option_b: 'Bermain game',
                            option_c: 'Menonton TV',
                            option_d: 'Tidur seharian',
                            correct_answer: 'A',
                            explanation: 'Membantu ibu = gotong royong.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const PKN_BATCH_3: SeedModuleItem[] = [BAB_4];