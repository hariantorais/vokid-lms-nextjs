import type { SeedModuleItem } from './matematika-batch-1';

export const MATEMATIKA_BATCH_4: SeedModuleItem[] = [
    // =========================================================================
    // BAB 7: PENGUKURAN PANJANG DAN BERAT TIDAK BAKU
    // =========================================================================
    {
        title: 'Bab 7: Pengukuran Panjang dan Berat dengan Satuan Tidak Baku',
        order_index: 7,
        target_semester: 2,
        week_target: 21,
        lessons: [
            {
                title: 'Membandingkan Panjang Benda Secara Langsung',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membandingkan panjang dua benda nyata menggunakan istilah "lebih panjang", "lebih pendek", atau "sama panjang" dari garis pangkal yang sejajar.',
                allocated_minutes: 70,
                required_materials: ['Pensil baru dan pensil pendek', 'Sedotan minuman', 'Tali rafia', 'Buku tulis'],
                content_text: `# 📏 Siapa yang Lebih Panjang?

Pernahkah kamu bandingkan siapa yang lebih tinggi di kelas?  
Untuk tahu mana yang lebih panjang, kita harus tahu **aturan rahasianya**! 🌟

---

### 🎯 1. Aturan Emas Membandingkan Panjang

> ### 🗣️ "Kedua ujung bawah benda harus diletakkan sejajar menempel pada garis pangkal yang sama!"

**Jika aturan ini tidak dipatuhi, hasilnya bisa keliru!** ⚠️

---

### 🔍 2. Cara Membandingkan yang Benar

1. **Tarik garis lurus** di meja (bisa pakai lakban kertas).
2. **Letakkan ujung bawah** kedua benda menempel pada garis tersebut.
3. **Amati ujung atasnya**:
   * Jika ujung atasnya **melewati** benda lain → benda itu **lebih panjang**! 📏
   * Jika ujung atasnya **tidak sampai** → benda itu **lebih pendek**! 📐
   * Jika kedua ujungnya **persis sama rata** → **sama panjang**! ✨

---

### 🎭 Komik: Adu Panjang Pensil

\`\`\`text
  Boni : "Kimi, pensilku lebih panjang dari pensilmu!" ✏️
  Kimi : "Meow! Coba taruh di garis meja yang sama dulu!" 🐱
  Boni : "Oh iya, aku tadi taruh pensilku lebih maju. Setelah sejajar, ternyata pensilmu yang lebih panjang!" 😅
  Kimi : "Itulah gunanya garis pangkal sejajar!" ✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Jangan sampai salah satu benda "curang" karena ditaruh lebih maju. Garis pangkal harus benar-benar sejajar! 🎯`,
                intro_guide: {
                    greeting: 'Halo ilmuwan cilik! Hari ini kita akan membandingkan benda-benda panjang di sekitar kita.',
                    ice_breaker: 'Tunjukkan dua pensilmu. Coba tebak mana yang paling panjang tanpa mengukurnya dulu!',
                    apperception: 'Bandingkan tinggi badan siswa dengan teman sebangku saat berdiri tegak di lantai yang rata.',
                    trigger_question: 'Bolehkah kita mengukur panjang pensil jika salah satu pensil ditaruh lebih maju di meja?',
                },
                mindful_guide: {
                    concept_focus: 'Pentingnya baseline (garis pangkal sejajar) dalam perbandingan panjang.',
                    concrete_steps: [
                        'Tarik garis lurus di atas meja menggunakan selotip kertas sebagai garis pangkal.',
                        'Letakkan ujung bawah spidol dan krayon menempel pas pada garis tersebut.',
                        'Amati ujung atasnya bersama anak: spidol lebih tinggi, artinya spidol lebih panjang dari krayon.',
                    ],
                    script_parent: 'Bunda/Ayah: "Ingat ya sayang, ujung bawahnya harus nempel garis yang sama, tidak boleh ada yang curang ditaruh lebih maju!"',
                },
                joyful_guide: {
                    game_title: 'Tebak Ular Tali Terpanjang',
                    game_rules: [
                        'Siswa dalam kelompok kecil memotong tali rafia dengan panjang bebas.',
                        'Semua tali ditempelkan di papan tulis mulai dari garis bawah yang sama.',
                        'Kelompok yang talinya paling panjang bersorak gembira.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membandingkan 2 benda dengan perbedaan panjang yang mencolok.',
                        child_level_advanced: 'Mampu mengurutkan 3 sampai 4 benda dari yang terpendek ke terpanjang.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Membandingkan panjang benda pada representasi visual bergambar.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.1: Membandingkan Panjang Benda',
                        instructions: 'Amati gambar benda di bawah garis pangkal dan lingkari jawaban yang benar.',
                        section_a_basic: [
                            {
                                type: 'LENGTH_COMPARE',
                                question: 'Bandingkan panjang pensil hijau dan kuas lukis pada gambar berikut:',
                                answer_key: 'Kuas lukis lebih panjang dari pensil hijau',
                                data: {
                                    itemA: { name: 'Kuas Lukis', units: 8 },
                                    itemB: { name: 'Pensil Hijau', units: 5 },
                                    unitName: 'satuan',
                                },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Tali A panjangnya 6 jengkal. Tali B panjangnya 9 jengkal. Tali manakah yang lebih pendek?',
                                answer_key: 'Tali A (karena 6 jengkal lebih pendek dari 9 jengkal)',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kita tidak boleh meletakkan benda sembarangan saat membandingkan panjangnya?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Ambil 1 sendok makan dan 1 sendok teh di dapur, tempelkan ujung bawahnya di meja, lalu foto perbandingan panjang keduanya!',
                    },
                ],
            },
            {
                title: 'Mengukur Panjang dengan Klip Kertas dan Jengkal Tangan',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat mengukur panjang benda nyata menggunakan satuan tidak baku (klip kertas, jengkal tangan, atau korek api) tanpa celah dan tanpa tumpang tindih.',
                allocated_minutes: 70,
                required_materials: ['Satu kotak klip kertas warna-warni', 'Buku tulis', 'Tempat pensil'],
                content_text: `# 📎 Mengukur Tanpa Penggaris Besi!

Tidak punya penggaris? Tidak masalah!  
Kita bisa menggunakan benda-benda kecil sebagai **alat ukur**! 📐✨

---

### 🎯 1. Dua Alat Ukur Tidak Baku

| Alat Ukur | Cara Pakai | Contoh Benda |
| :---: | :--- | :--- |
| **Klip Kertas** 📎 | Rangkai lurus menyusuri tepi benda | Buku tulis, tempat pensil |
| **Jengkal Tangan** 🖐️ | Rentangkan jari dari jempol sampai kelingking | Meja, kasur, pintu |

---

### 🔍 2. Aturan Mengukur yang Benar

1. Mulai dari **ujung paling tepi**.
2. Jangan ada **celah kosong** antar klip. ❌
3. Jangan **menumpuk** klip di atas klip lainnya. ❌
4. Hitung berapa banyak klip yang terpasang: **itulah panjang bendamu**! ✅

---

### 🎭 Komik: Mengukur Meja Belajar

\`\`\`text
  Boni : "Kimi, panjang meja belajarku 8 jengkal tanganku!" 🖐️
  Kimi : "Meow! Meja yang sama aku ukur, panjangnya 6 jengkal tanganku!" 🐱
  Boni : "Kok beda? Padahal mejanya sama!" 🤔
  Kimi : "Karena tanganku lebih besar dari tanganmu! Itulah mengapa jengkal disebut satuan tidak baku." ✨
\`\`\`

---

### 💡 Fakta Seru:
Hasil ukur jengkal tangan bisa berbeda karena ukuran tangan setiap orang berbeda!  
Itulah mengapa di sekolah kita memakai **penggaris** agar hasilnya selalu sama. 📏`,
                intro_guide: {
                    greeting: 'Selamat pagi arsitek cilik! Hari ini kita akan mengukur meja belajar dengan tangan ajaib kita.',
                    ice_breaker: 'Buka lebar jengkal tanganmu: "Satu jengkal, dua jengkal, hap!"',
                    apperception: 'Tunjukkan penggaris dan jejeran klip kertas pada buku.',
                    trigger_question: 'Berapa jengkal tanganmu panjang meja belajarmu di rumah?',
                },
                mindful_guide: {
                    concept_focus: 'Iterasi satuan pengukuran tidak baku (unit iteration without gaps or overlaps).',
                    concrete_steps: [
                        'Jejeerkan klip kertas di samping buku gambar dari ujung ke ujung.',
                        'Tunjukkan kesalahan jika ada klip yang miring atau tumpang tindih.',
                        'Hitung bersama: "Satu, dua, tiga, empat, lima, enam klip!"',
                    ],
                    script_parent: '"Pastikan klipnya menempel rapat lurus ya sayang, jangan ada yang numpuk biar ukurannya tepat!"',
                },
                joyful_guide: {
                    game_title: 'Tantangan Jengkal Meja Kelas',
                    game_rules: [
                        'Anak mengukur panjang buku gambar dan tempat pensil menggunakan jengkal tangan.',
                        'Anak membandingkan hasilnya dengan jengkal orang tua/guru dan menyadari kenapa angkanya berbeda.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengukur dengan benda kaku (klip kertas/stik es krim).',
                        child_level_advanced: 'Menyimpulkan mengapa hasil ukur jengkal anak dan orang dewasa berbeda (ukuran tangan berbeda).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Membaca panjang benda berdasarkan representasi satuan klip kertas.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.2: Mengukur dengan Satuan Klip Kertas',
                        instructions: 'Hitung banyaknya klip kertas untuk tiap benda pada gambar di bawah.',
                        section_a_basic: [
                            {
                                type: 'LENGTH_COMPARE',
                                question: 'Berapa panjang krayon dan pensil pada gambar di bawah ini?',
                                answer_key: 'Krayon = 4 klip, Pensil = 7 klip',
                                data: {
                                    itemA: { name: 'Pensil Kayu', units: 7 },
                                    itemB: { name: 'Krayon Warna', units: 4 },
                                    unitName: 'klip',
                                },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Berapa klip selisih panjang antara pensil (7 klip) dan krayon (4 klip)?',
                                answer_key: '3 klip kertas (7 - 4 = 3)',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa saat mengukur dengan jengkal tangan, hasil hitunganmu dan hitungan ayah bisa berbeda?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Ukur panjang buku tulismu memakai jengkal tanganmu, lalu laporkan lewat rekaman suara: "Panjang buku tulisku adalah ... jengkal!"',
                    },
                ],
            },
            {
                title: 'Membandingkan Berat Benda: Berat, Ringan, dan Timbangan Sederhana',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membandingkan berat dua benda nyata secara langsung dengan kedua tangan (menimbang rasa) dan menggunakan gantungan baju sebagai timbangan sederhana.',
                allocated_minutes: 70,
                required_materials: ['Gantungan baju (hanger)', '2 kantong kresek kecil', 'Batu kerikil', 'Kapas/tisu', 'Apel dan jeruk'],
                content_text: `# ⚖️ Mana yang Lebih Berat?

Pernahkah kamu menggendong tas sekolah yang penuh buku?  
Ternyata benda-benda di sekitar kita punya **berat yang berbeda-beda**! Yuk, kita pelajari! 🎒✨

---

### 🔍 1. Dua Kata Kunci Berat

| Istilah | Artinya | Contoh |
| :---: | :--- | :--- |
| **Lebih Berat** | Terasa menekan tangan ke bawah | Batu, tas penuh buku |
| **Lebih Ringan** | Mudah diangkat tinggi | Kapas, balon |

---

### 🎯 2. Cara Menimbang dengan Gantungan Baju (Hanger)

**Alat & bahan:**
* 1 gantungan baju (hanger) 🧷
* 2 kantong kresek kecil 🛍️🛍️

**Langkah-langkah:**
1. Gantungkan dua kantong di ujung kiri dan kanan hanger.
2. Masukkan benda A di kantong kiri dan benda B di kantong kanan.
3. Amati posisinya:

\`\`\`text
  ┌─── Sisi kiri turun KE BAWAH = LEBIH BERAT ⬇️
  └─── Sisi kanan naik KE ATAS = LEBIH RINGAN ⬆️
  ┌─── Posisi LURUS SEIMBANG = SAMA BERAT ⚖️
\`\`\`

---

### 🎭 Komik: Timbangan Ajaib Kimi

\`\`\`text
  Boni : "Kimi, mana yang lebih berat: apel atau jeruk?" 🍎🍊
  Kimi : "Meow! Ayo kita timbang pakai hanger ajaib!" 🐱
  Boni : "Lihat! Sisi apel turun ke bawah. Berarti apel lebih berat!" ⬇️
  Kimi : "Betul! Hanger bisa jadi timbangan sederhana!" ✨
\`\`\`

---

### 💡 Fakta Seru:
Benda yang **berukuran besar** belum tentu lebih berat!  
Contohnya: balon besar terasa ringan, batu kecil terasa berat! 🎈🪨`,
                intro_guide: {
                    greeting: 'Selamat pagi atlet angkat besi cilik! Hari ini tangan kita menjadi neraca penimbang ajaib.',
                    ice_breaker: 'Pegang buku tebal di tangan kanan dan selembar tisu di tangan kiri. Rasakan bedanya!',
                    apperception: 'Tanyakan: "Jika kamu menggendong tas sekolah penuh buku dibandingkan tas kosong, mana yang lebih berat?"',
                    trigger_question: 'Apakah benda yang berukuran besar selalu lebih berat daripada benda kecil? Bagaimana dengan balon dan batu kecil?',
                },
                mindful_guide: {
                    concept_focus: 'Konsep massa/berat dan mekanisme keseimbangan neraca lengan sederhana.',
                    concrete_steps: [
                        'Pegang gantungan baju di bagian kait atas.',
                        'Masukkan 1 buah apel di kantong kiri dan 1 buah jeruk nipis di kantong kanan.',
                        'Amati bersama anak sisi mana yang miring turun ke bawah.',
                    ],
                    script_parent: '"Lihat hanger-nya miring ke kiri sayang. Yang turun ke bawah itu tandanya lebih berat!"',
                },
                joyful_guide: {
                    game_title: 'Tantangan Neraca Hanger Gantung',
                    game_rules: [
                        'Siswa memasukkan 1 mobil mainan di sisi kiri hanger.',
                        'Siswa memasukkan kelereng satu per satu di sisi kanan sampai hanger lurus seimbang.',
                        'Catat: "1 mobil mainan beratnya sama dengan 5 kelereng!"',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membandingkan 2 benda ekstrem (batu vs kapas) dengan telapak tangan.',
                        child_level_advanced: 'Mampu menyeimbangkan timbangan gantungan baju dengan kelereng satuan.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menentukan benda yang lebih berat atau lebih ringan berdasarkan posisi timbangan.',
                    worksheet_print_ready: {
                        title: 'LKPD 7.3: Mengenal Berat dan Ringan',
                        instructions: 'Amati posisi timbangan dan tentukan mana benda yang lebih berat.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Pada timbangan jungkat-jungkit, sisi yang turun ke bawah adalah benda yang ... (lebih berat / lebih ringan)',
                                answer_key: 'lebih berat',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Semangka ... daripada sebutir stroberi. (lebih berat / lebih ringan)',
                                answer_key: 'lebih berat',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: '1 buah mangga seimbang dengan 4 buah jeruk. Benda manakah yang lebih berat: 1 mangga atau 1 jeruk?',
                                answer_key: '1 mangga lebih berat (karena butuh 4 jeruk untuk menyamainya)',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa bantal yang besar terasa lebih ringan daripada batu bata yang kecil?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Evaluasi: Pengukuran Panjang dan Berat',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Saat membandingkan panjang dua pensil di atas meja, kedua pensil harus diletakkan...',
                                option_a: 'Bebas di mana saja',
                                option_b: 'Mulai dari garis pangkal yang sama rata',
                                option_c: 'Satu di meja dan satu di lantai',
                                option_d: 'Tumpang tindih bersilangan',
                                correct_answer: 'B',
                                explanation: 'Perbandingan panjang harus dimulai dari titik pangkal yang sama rata.',
                            },
                            {
                                question_text: 'Pada timbangan gantungan baju, sisi yang terangkat naik ke atas adalah benda yang...',
                                option_a: 'Lebih berat',
                                option_b: 'Lebih ringan',
                                option_c: 'Sama berat',
                                option_d: 'Lebih panjang',
                                correct_answer: 'B',
                                explanation: 'Sisi yang naik ke atas menunjukkan massa benda tersebut lebih ringan.',
                            },
                            {
                                question_text: 'Panjang sebuah meja belajar adalah 8 jengkal tangan. Jengkal tangan merupakan contoh satuan...',
                                option_a: 'Baku internasional',
                                option_b: 'Tidak baku',
                                option_c: 'Penggaris besi',
                                option_d: 'Timbangan',
                                correct_answer: 'B',
                                explanation: 'Jengkal tangan adalah satuan pengukuran tidak baku.',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // BAB 8: DIAGRAM PIKTOGRAM & PENGELOMPOKAN DATA SEDERHANA
    // =========================================================================
    {
        title: 'Bab 8: Diagram Piktogram dan Pengelompokan Data Sederhana',
        order_index: 8,
        target_semester: 2,
        week_target: 24,
        lessons: [
            {
                title: 'Mengumpulkan dan Menyajikan Data Benda Konkret',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat mengumpulkan data sederhana dari lingkungan sekitar (misal: warna kesukaan / buah favorit) dan mencatatnya menggunakan turus atau benda nyata.',
                allocated_minutes: 70,
                required_materials: ['Gambar buah-buahan kecil (apel, pisang, jeruk)', 'Papan saku atau kertas karton'],
                content_text: `# 📊 Mengenal Data: Mencari Tahu Kesukaan Teman!

Tahukah kamu apa itu **data**?  
**Data** adalah catatan keterangan tentang sesuatu! Yuk, kita pelajari! 📝✨

---

### 🍎 1. Contoh Data Sederhana

Bayangkan kita ingin tahu buah apa yang paling disukai teman-teman:

| Nama Anak | Buah Favorit |
| :---: | :---: |
| Siti | 🍎 Apel |
| Budi | 🍌 Pisang |
| Edo | 🍎 Apel |
| Lani | 🍊 Jeruk |
| Dayu | 🍎 Apel |

---

### 🎯 2. Mari Kita Kelompokkan!

Jika kita hitung, hasilnya:

| Buah | Jumlah Anak yang Suka |
| :---: | :---: |
| 🍎 Apel | **3 anak** |
| 🍌 Pisang | **1 anak** |
| 🍊 Jeruk | **1 anak** |

**Kesimpulan:** Buah **Apel** paling banyak disukai! 🎉

---

### 🎭 Komik: Pemilihan Buah Kelas

\`\`\`text
  Boni : "Kimi, buah apa yang paling disukai teman-teman sekelas?" 🍎🍌🍊
  Kimi : "Meow! Ayo kita catat data kesukaan mereka di papan!" 🐱
  Boni : "Wah, apel dapat 3 suara, pisang 1, jeruk 1!" 📊
  Kimi : "Berarti apel juaranya!" 🎉
\`\`\`

---

### 💡 Manfaat Data:
Dengan mencatat data, kita jadi tahu **apa yang paling populer** dan **apa yang paling sedikit**! 🎯`,
                intro_guide: {
                    greeting: 'Selamat pagi peneliti cilik! Hari ini kita mengadakan pemilihan buah paling populer di kelas.',
                    ice_breaker: 'Tunjuk tangan siapa yang suka makan pisang? Tunjuk tangan siapa yang suka jeruk!',
                    apperception: 'Tanyakan kepada siswa makanan apa yang paling disukai anggota keluarga di rumah.',
                    trigger_question: 'Bagaimana cara Ibu di rumah tahu berapa piring nasi yang harus disiapkan untuk makan malam?',
                },
                mindful_guide: {
                    concept_focus: 'Pengumpulan data kategori tunggal dan penghitungan frekuensi sederhana.',
                    concrete_steps: [
                        'Sediakan kartu bergambar apel, pisang, dan jeruk.',
                        'Minta tiap anggota keluarga mengambil 1 kartu buah kesukaannya.',
                        'Tempelkan kartu-kartu tersebut di papan sesuai kolom buah masing-masing.',
                    ],
                    script_parent: '"Lihat kolom apel kartunya berjejer paling tinggi ya sayang, itu tandanya apel yang paling banyak disukai!"',
                },
                joyful_guide: {
                    game_title: 'Kotak Suara Pemilihan Bintang',
                    game_rules: [
                        'Siswa memasukkan stik es krim ke dalam 3 kotak suara bertuliskan: Merah, Kuning, dan Biru.',
                        'Keluarkan stik dari tiap kotak dan hitung bersama hasilnya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menghitung data konkret langsung dari benda yang dijejerkan.',
                        child_level_advanced: 'Mampu membuat coretan garis turus (tally marks: llll) untuk menghitung data.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menghitung jumlah data pada masing-masing kategori.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.1: Mengumpulkan Data Kesukaan',
                        instructions: 'Hitunglah banyaknya benda pada setiap kategori gambar di bawah ini.',
                        section_a_basic: [
                            {
                                type: 'PICT_COUNT',
                                question: 'Berapa banyak anak yang memilih buah apel pada gambar data di bawah?',
                                answer_key: '5 anak',
                                data: { total: 5, symbol: '🍎' },
                            },
                            {
                                type: 'PICT_COUNT',
                                question: 'Berapa banyak anak yang memilih buah pisang?',
                                answer_key: '3 anak',
                                data: { total: 3, symbol: '🍌' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Buah manakah yang paling banyak disukai anak: Apel (5 anak) atau Pisang (3 anak)?',
                                answer_key: 'Buah Apel',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa mengelompokkan data membuat kita lebih mudah membaca hasilnya?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Tanyakan kepada 4 orang di rumahmu apa minuman kesukaannya (Air putih/Teh/Susu), catat di kertas, lalu foto catatanmu!',
                    },
                ],
            },
            {
                title: 'Membaca dan Membuat Diagram Piktogram Sederhana',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membaca dan menafsirkan diagram gambar (piktogram) satu-satu untuk menemukan kategori terbanyak, tersedikit, dan total data.',
                allocated_minutes: 70,
                required_materials: ['Stiker bintang/emotikon tersenyum', 'Kertas karton berpetak diagram'],
                content_text: `# 📊 Mengenal Diagram Gambar (Piktogram)!

Tahukah kamu? Ada cara seru untuk menyajikan data, yaitu dengan **gambar lucu**!  
Namanya **Piktogram**! 🎨✨

---

### 🎯 1. Apa itu Piktogram?

**Piktogram** adalah diagram yang menggunakan **gambar atau simbol** untuk menunjukkan jumlah data.

**Contoh Diagram Koleksi Mainan Edo:**

| Mainan | Diagram Bintang | Jumlah |
| :---: | :---: | :---: |
| 🚗 Mobil-mobilan | ⭐⭐⭐⭐ | 4 buah |
| ⚽ Bola | ⭐⭐ | 2 buah |
| 🤖 Robot | ⭐⭐⭐⭐⭐ | 5 buah |

**Keterangan Simbol:**
Setiap 1 simbol ⭐ mewakili **1 buah mainan**.

---

### 🔍 2. Cara Membaca Piktogram

Dari diagram di atas, kita bisa tahu:

1. Mainan yang **paling banyak** = 🤖 Robot (5 buah) — barisnya paling panjang!
2. Mainan yang **paling sedikit** = ⚽ Bola (2 buah) — barisnya paling pendek!
3. Jumlah seluruh mainan Edo = 4 + 2 + 5 = **11 buah**! 🎉

---

### 🎭 Komik: Diagram Piktogram Ajaib

\`\`\`text
  Boni : "Kimi, aku punya banyak mainan tapi bingung menghitungnya!" 🧸🚗🤖
  Kimi : "Meow! Ayo kita buat diagram piktogram. Setiap mainan dapat 1 gambar bintang!" 🐱⭐
  Boni : "Wah, sekarang aku langsung tahu robotku yang paling banyak!" 🎉
  Kimi : "Diagram gambar memang ajaib!" ✨
\`\`\`

---

### 💡 Kunci Membaca Piktogram:
* Baris **paling tinggi/panjang** = jumlah **terbanyak** ⬆️
* Baris **paling pendek** = jumlah **tersedikit** ⬇️
* Hitung semua simbol untuk tahu **total**! 🎯`,
                intro_guide: {
                    greeting: 'Selamat pagi pembaca diagram andal! Gambar-gambar ini menyimpan rahasia angka yang siap kita ungkap.',
                    ice_breaker: 'Tepuk Bintang: 1 bintang tepuk 1x, 3 bintang tepuk 3x!',
                    apperception: 'Tunjukkan grafik tempel bintang presensi kehadiran siswa di dinding kelas.',
                    trigger_question: 'Bagaimana cara mengetahui mainan terbanyak hanya dengan melihat gambar tanpa berhitung lama?',
                },
                mindful_guide: {
                    concept_focus: 'Representasi grafis data konkret satu-ke-satu (Pictograph one-to-one correspondence).',
                    concrete_steps: [
                        'Buat garis kolom di kertas karton: Kolom Pensil, Penghapus, Penggaris.',
                        'Minta anak menempelkan 1 stiker bintang untuk setiap 1 alat tulis yang ada di tasnya.',
                        'Bandingkan tinggi jejeran bintang antar kolom.',
                    ],
                    script_parent: '"Lihat kolom bintang yang paling tinggi ya sayang, itu artinya jumlah barangnya paling banyak!"',
                },
                joyful_guide: {
                    game_title: 'Menara Balok Piktogram 3D',
                    game_rules: [
                        'Siswa menyusun balok lego ke atas sesuai data hewan peliharaan teman (Kucing = 4 balok, Kelinci = 2 balok, Ikan = 6 balok).',
                        'Siswa mengamati menara balok mana yang menjulang paling tinggi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membaca piktogram dengan maksimal 5 gambar per baris.',
                        child_level_advanced: 'Mampu menghitung selisih antara baris terbanyak dan tersedikit dari diagram.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Membaca informasi dari sajian diagram piktogram visual.',
                    worksheet_print_ready: {
                        title: 'LKPD 8.2: Membaca Diagram Gambar Piktogram',
                        instructions: 'Amati diagram piktogram di bawah ini dan jawablah pertanyaannya.',
                        section_a_basic: [
                            {
                                type: 'PICT_CHART',
                                question: 'Berdasarkan piktogram di bawah, berapakah jumlah kue donat cokelat yang terjual?',
                                answer_key: '6 buah donat cokelat',
                                data: {
                                    categories: [
                                        { name: 'Donat Cokelat', count: 6, icon: '🍩' },
                                        { name: 'Donat Keju', count: 4, icon: '🍩' },
                                        { name: 'Donat Stroberi', count: 2, icon: '🍩' },
                                    ],
                                    unitLabel: '1 🍩 = 1 donat',
                                },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Berapakah selisih antara donat cokelat (6 buah) dan donat stroberi (2 buah)?',
                                answer_key: '4 buah donat (6 - 2 = 4)',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah melihat diagram gambar terasa lebih mudah daripada membaca tulisan angka biasa?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Evaluasi Akhir: Diagram Piktogram Data',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Diagram yang menampilkan data menggunakan lambang gambar atau simbol disebut diagram...',
                                option_a: 'Garis',
                                option_b: 'Piktogram (diagram gambar)',
                                option_c: 'Lingkaran',
                                option_d: 'Angka acak',
                                correct_answer: 'B',
                                explanation: 'Piktogram adalah sebutan untuk diagram gambar.',
                            },
                            {
                                question_text: 'Pada piktogram bunga: Mawar ada 5 simbol bunga, Melati ada 3 simbol bunga. Bunga manakah yang paling sedikit?',
                                option_a: 'Mawar',
                                option_b: 'Melati',
                                option_c: 'Semua sama',
                                option_d: 'Tidak ada',
                                correct_answer: 'B',
                                explanation: 'Bunga melati paling sedikit karena hanya memiliki 3 simbol (lebih sedikit dari 5).',
                            },
                            {
                                question_text: 'Jika 1 gambar bintang ⭐ bernilai 1 pensil, maka 7 bintang melambangkan ada berapa pensil?',
                                option_a: '5 pensil',
                                option_b: '6 pensil',
                                option_c: '7 pensil',
                                option_d: '8 pensil',
                                correct_answer: 'C',
                                explanation: 'Karena 1 bintang = 1 pensil, maka 7 bintang = 7 pensil.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];