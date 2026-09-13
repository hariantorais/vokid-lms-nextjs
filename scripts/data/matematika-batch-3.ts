import type { SeedModuleItem } from './matematika-batch-1';

export const MATEMATIKA_BATCH_3: SeedModuleItem[] = [
    // =========================================================================
    // BAB 5: BENTUK-BENTUK GEOMETRI DAN BANGUN DATAR
    // =========================================================================
    {
        title: 'Bab 5: Mengenal Bentuk Geometri dan Bangun Datar',
        order_index: 5,
        target_semester: 2,
        week_target: 14,
        lessons: [
            {
                title: 'Mengenal Segitiga, Segiempat, dan Lingkaran',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat mengidentifikasi ciri dasar bangun datar sederhana (segiempat, segitiga, dan lingkaran) berdasarkan jumlah sisi dan sudutnya.',
                allocated_minutes: 70,
                required_materials: ['Kertas origami aneka warna', 'Gunting anak', 'Koin logam', 'Buku tulis', 'Penggaris segitiga'],
                content_text: `# 🔺🔵⬛ Petualangan Bentuk di Sekitar Kita!

Buka matamu lebar-lebar! Ternyata benda-benda di sekitar kita punya bentuk yang berbeda-beda. Yuk, kita kenali 3 bentuk dasar yang paling sering kita jumpai! 🌟

---

### 📐 1. Tiga Bentuk Sahabat Kita

| Bentuk | Ciri Khas | Contoh Benda | Emoji |
| :---: | :--- | :--- | :---: |
| **Segiempat** | Punya **4 sisi lurus** dan **4 pojok (sudut)** | Buku tulis, pintu rumah, jendela | 📕🚪🪟 |
| **Segitiga** | Punya **3 sisi lurus** dan **3 pojok (sudut)** | Atap rumah, potongan pizza, penggaris segitiga | 🏠🍕📐 |
| **Lingkaran** | Punya **1 garis lengkung penuh** dan **TIDAK ada pojok** | Uang koin, jam dinding bulat, roda sepeda | 🪙⏰🛞 |

---

### 🔍 2. Ciri Rahasia Segitiga, Segiempat & Lingkaran

**Segiempat** ibarat kotak yang rapi. Kalau kamu hitung tepinya, ada **empat** sisi lurus!

**Segitiga** seperti tenda kemah atau atap rumah. Sisi lurusnya cuma **tiga**, tapi ujungnya tajam!

**Lingkaran** seperti bola atau piring. Tidak punya sudut sama sekali, jadi dia suka **menggelinding** ke mana-mana! ⚽

---

### 🎭 Komik: Roda Bulat vs Roda Kotak

\`\`\`text
  Boni : "Kimi, mengapa roda sepeda berbentuk lingkaran dan bukan segiempat?" 🚲
  Kimi : "Meow! Kalau roda kotak, sepeda akan terlonjak-lonjak seperti kodok!" 🐸
  Boni : "Oh, jadi lingkaran memang paling cocok untuk menggelinding ya!" 🎉
  Kimi : "Betul! Lingkaran tidak punya sudut yang mengganjal!" 🛞✨
\`\`\`

---

### 🏠 Ayo Cari di Rumahmu!
* Pintu kamarmu bentuknya apa? 👉 **Segiempat** 🚪
* Atap rumahmu bentuknya apa? 👉 **Segitiga** 🏠
* Jam dinding di ruang tamu bentuknya apa? 👉 **Lingkaran** ⏰

Hebat! Kamu sudah menjadi Detektif Bentuk! 🕵️‍♂️✨`,
                intro_guide: {
                    greeting: 'Buka matamu lebar-lebar! Hari ini kita menjadi detektif pemburu bentuk ruang rahasia.',
                    ice_breaker: 'Tiru Gerakan: Buat lingkaran besar di udara dengan jarimu, lalu buat segitiga runcing!',
                    apperception: 'Tanyakan kepada siswa: "Apa bentuk permukaan piring sarapanmu dan buku tulismu?"',
                    trigger_question: 'Mengapa roda sepeda berbentuk lingkaran dan bukan segiempat?',
                },
                mindful_guide: {
                    concept_focus: 'Perbedaan mendasar antara garis lurus bersegi dan garis lengkung bundar.',
                    concrete_steps: [
                        'Ajak anak meraba tepi buku tulis dan menghitung 4 tepian lurusnya serta 4 sudut tajamnya.',
                        'Ajak anak meraba uang koin secara memutar dan merasakan bahwa koin tidak memiliki sudut tajam sama sekali.',
                        'Lipat kertas origami membentuk segitiga, lalu raba 3 ujung lancipnya.',
                    ],
                    script_parent: 'Bunda/Ayah: "Coba raba ujung meja ini sayang, terasa lancip kan? Itu namanya sudut. Kalau piring ini tidak ada sudutnya!"',
                },
                joyful_guide: {
                    game_title: 'Lampu Merah Berburu Bentuk',
                    game_rules: [
                        'Guru menyebutkan ciri: "Cari benda yang punya 4 sisi lurus di ruangan ini!"',
                        'Siswa berlari kecil mencari benda yang cocok (misal: kotak pensil) dan mengangkatnya tinggi-tinggi.',
                        'Siswa yang paling cepat dan tepat menyebutkan nama bentuknya mendapat 1 bintang emas.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mencocokkan balok kayu ke dalam papan cetakan lubang geometri.',
                        child_level_advanced: 'Mampu menjelaskan dengan bahasa sendiri mengapa sepotong roti sandwich dipotong miring menjadi segitiga.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Mengidentifikasi nama bangun datar dan mengelompokkan bentuk yang serupa.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.1: Mengenal Ciri Bangun Datar',
                        instructions: 'Amati gambar bangun datar di bawah ini dan pilihlah jawaban yang tepat.',
                        section_a_basic: [
                            {
                                type: 'SHAPE_CARD',
                                question: 'Bangun datar manakah yang memiliki tepat 3 sisi lurus dan 3 sudut lancip?',
                                answer_key: 'Segitiga',
                                data: { shape: 'SEGITIGA' },
                            },
                            {
                                type: 'SHAPE_CARD',
                                question: 'Benda berbentuk lingkaran tidak memiliki pojok lancip. Manakah bangun lingkaran berikut?',
                                answer_key: 'Lingkaran',
                                data: { shape: 'LINGKARAN' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'DRAWING_FRAME',
                                question: 'Gambarlah sebuah mobil menggunakan 1 kotak segiempat (badan mobil) dan 2 lingkaran (roda)!',
                                answer_key: 'Kreativitas gambar siswa memuat segiempat dan lingkaran.',
                                data: { prompt: 'Kotak Gambar Mobil Geometri' },
                            },
                        ],
                    },
                    reflection_questions: [
                        'Benda apa di rumahmu yang memiliki permukaan berbentuk lingkaran?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Temukan 1 benda segiempat dan 1 benda lingkaran di kamarmu, jejerkan berdampingan, lalu foto bersama keduanya!',
                    },
                ],
            },
            {
                title: 'Mengelompokkan Benda Berdasarkan Bentuk, Warna, dan Ukuran',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat memilah dan mengelompokkan beragam objek konkret berdasarkan atribut visual (bentuk, warna, atau ukuran besar-kecil).',
                allocated_minutes: 70,
                required_materials: ['Potongan kertas warna-warni (lingkaran merah, segitiga biru, kotak kuning, ukuran besar & kecil)', '3 wadah plastik'],
                content_text: `# 🧺 Memilah dan Mengelompokkan Benda!

Pernahkah kamar atau meja belajarmu terlihat sangat berantakan?  
Ternyata, ada trik ajaib untuk merapikannya, yaitu **mengelompokkan**! ✨

---

### 🎨 1. Tiga Cara Mengelompokkan Benda

**Cara 1: Berdasarkan Bentuk** 🔺🔵
* Semua benda **lingkaran** dikumpulkan jadi satu tumpukan.
* Semua benda **segitiga** dikumpulkan di tumpukan lain.

**Cara 2: Berdasarkan Warna** 🔴🔵
* Semua benda **merah** disatukan.
* Semua benda **biru** disatukan.

**Cara 3: Berdasarkan Ukuran** 🐘🐜
* Kelompok **benda besar** (seperti bola basket).
* Kelompok **benda kecil** (seperti kelereng).

---

### 🎁 Contoh Nyata: Merapikan Mainan
Bayangkan kamu punya campuran mainan:
* 3 boneka besar 🧸🧸🧸
* 2 boneka kecil 🧸🧸
* 4 mobil mainan besar 🚗🚗🚗🚗

**Kalau dikelompokkan berdasarkan jenis:**
* Boneka: 5 buah
* Mobil: 4 buah

**Kalau dikelompokkan berdasarkan ukuran:**
* Besar: 7 buah
* Kecil: 2 buah

Keduanya benar! Tergantung aturan yang kita pilih! 🎯

---

### 🎭 Komik: Menata Rak Buku Boni

\`\`\`text
  Boni : "Kimi, rak bukuku berantakan sekali!" 📚😵
  Kimi : "Meow! Ayo kita kelompokkan. Buku besar di rak atas, buku kecil di rak bawah!" 🐱
  Boni : "Ide bagus! Sekarang raknya rapi dan mudah dicari!" 🎉
  Kimi : "Mengelompokkan itu ajaib ya!" ✨
\`\`\``,
                intro_guide: {
                    greeting: 'Halo pengatur ruangan yang rapi! Hari ini kita membantu Ibu merapikan mainan yang tercampur aduk.',
                    ice_breaker: 'Tepuk Warna: Tepuk 1x jika Ibu bilang Merah, tepuk 2x jika Ibu bilang Biru!',
                    apperception: 'Tunjukkan kotak mainan yang bercampur antara balok kotak dan bola bundar.',
                    trigger_question: 'Bagaimana cara memisahkan bola dan balok agar tersimpan rapi di rak lemari?',
                },
                mindful_guide: {
                    concept_focus: 'Klasifikasi data satu atribut (sorting by attribute).',
                    concrete_steps: [
                        'Sebar potongan kertas geometri acak di atas meja.',
                        'Tentukan satu aturan: "Sekarang kita hanya mengumpulkan yang berbentuk SEGITIGA saja!"',
                        'Minta anak mengambil semua segitiga tanpa mempedulikan warnanya.',
                    ],
                    script_parent: '"Fokus pada bentuknya dulu ya sayang. Mau warnanya merah atau biru, asalkan ada 3 sudutnya, masukkan ke wadah ini!"',
                },
                joyful_guide: {
                    game_title: 'Toko Swalayan Mini: Pilah Belanjaan',
                    game_rules: [
                        'Anak berperan sebagai kasir toko yang harus memasukkan barang belanjaan ke kantong yang tepat sesuai perintah pembeli (misal: kantong khusus benda bundar).',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memilah 2 atribut kontras (hanya besar vs kecil).',
                        child_level_advanced: 'Mampu memilah dengan dua aturan sekaligus (misal: segitiga yang berwarna merah saja).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Memasangkan dan mengelompokkan objek sesuai kategori bentuk.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.2: Mengelompokkan Bentuk',
                        instructions: 'Tarik garis dari gambar benda ke kelompok bentuk yang sesuai.',
                        section_a_basic: [
                            {
                                type: 'SHAPE_SORTING',
                                question: 'Kelompokkan benda-benda berikut sesuai bentuk aslinya (Lingkaran, Segitiga, Segiempat):',
                                answer_key: 'Bola -> Lingkaran, Pintu -> Segiempat, Pizza -> Segitiga',
                                data: {
                                    items: [
                                        { label: 'Bola Kasti', icon: '⚾', shape: 'circle' },
                                        { label: 'Papan Tulis', icon: '📋', shape: 'square' },
                                        { label: 'Atap Rumah', icon: '⛺', shape: 'triangle' },
                                    ],
                                },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Ada 4 lingkaran merah, 3 lingkaran biru, dan 2 segiempat merah. Berapa jumlah semua benda yang berbentuk LINGKARAN?',
                                answer_key: '7 lingkaran (4 + 3 = 7)',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah mengelompokkan barang membuat kamarmu jadi lebih rapi?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Pilah sendok makan dan garpu di dapurmu ke dalam dua tumpukan rapi, lalu foto hasilnya!',
                    },
                ],
            },
            {
                title: 'Menyusun Pola Gambar Berulang (Patterning)',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat mengenali, melanjutkan, dan menciptakan pola urutan gambar atau warna yang berulang secara teratur (pola AB, ABC, AAB).',
                allocated_minutes: 70,
                required_materials: ['Manik-manik warna-warni atau kancing baju merah-kuning', 'Tali ronce'],
                content_text: `# 🔴🟡 Pola Ajaib yang Berulang!

Tahukah kamu bahwa dunia ini penuh dengan pola?  
Coba lihat belang-belang harimau 🐯 atau loreng zebra 🦓. Ada polanya, kan? ✨

---

### 🎨 1. Apa itu Pola?

**Pola** adalah susunan benda yang **berulang secara teratur** dan **berirama**.

**Contoh Pola Warna (Merah - Kuning - Merah - Kuning):**
🔴 🟡 🔴 🟡 🔴 ... ?

Karena iramanya Merah-Kuning, maka setelah Merah yang ke-3 adalah... **Kuning!** 🟡

**Contoh Pola Bentuk (Lingkaran - Segitiga - Lingkaran - Segitiga):**
⚪ 🔺 ⚪ 🔺 ⚪ ... ?

Setelah Lingkaran pasti **Segitiga!** 🔺

---

### 🔍 2. Manfaat Pola
Kalau kamu tahu iramanya, kamu bisa **menebak benda apa yang muncul berikutnya** seperti pesulap! 🎩✨

---

### 🎭 Komik: Gelang Pola Warna Boni

\`\`\`text
  Boni : "Kimi, aku mau buat gelang dari manik-manik!" 📿
  Kimi : "Susun dengan pola ya: Merah, Biru, Merah, Biru..." 🐱
  Boni : "Berarti setelah Biru, warnanya Merah lagi!" 🎉
  Kimi : "Hebat! Kamu sudah paham pola berulang!" ✨
\`\`\``,
                intro_guide: {
                    greeting: 'Selamat pagi sahabat berirama! Mari bermain tebak urutan ajaib hari ini.',
                    ice_breaker: 'Tepuk Irama: Tepuk tangan, petik jari, tepuk tangan, petik jari! Apa berikutnya? Tepuk tangan!',
                    apperception: 'Tunjukkan motif belang-belang harimau (kuning-hitam-kuning-hitam) atau zebra (hitam-putih).',
                    trigger_question: 'Setelah siang hari adalah malam hari. Setelah malam hari apa lagi? Mengapa selalu berulang?',
                },
                mindful_guide: {
                    concept_focus: 'Penalaran aljabar dasar melalui deteksi pola berulang (repeating patterns).',
                    concrete_steps: [
                        'Susun di meja: sendok, garpu, sendok, garpu.',
                        'Tutup benda kelima dengan tangan dan tanyakan: "Tebak, benda apa di balik tangan Ibu?"',
                        'Buka tangan dan buktikan kebenarannya.',
                    ],
                    script_parent: '"Ucapkan bunyinya berirama ya sayang: sendok-garpu-sendok-garpu... nah setelah sendok pasti garpu!"',
                },
                joyful_guide: {
                    game_title: 'Gelang Manik Pola Ajaib',
                    game_rules: [
                        'Anak meronce manik-manik ke benang wol dengan pola 2 warna berulang: merah-biru-merah-biru.',
                        'Anak yang berhasil menyusun 10 manik tanpa salah pola dinobatkan sebagai Desainer Cilik.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Pola sederhana 2 unsur (AB - AB).',
                        child_level_advanced: 'Pola 3 unsur berulang (ABC - ABC atau AAB - AAB).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Melengkapi butir pola gambar yang masih rumpang.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.3: Melanjutkan Pola Gambar Berulang',
                        instructions: 'Amati urutan pola dan gambarkan bentuk selanjutnya pada kotak kosong.',
                        section_a_basic: [
                            {
                                type: 'TRACE_PATTERN',
                                question: 'Lanjutkan pola bentuk berikut: ⬛ ⚪ ⬛ ⚪ ⬛ ... ?',
                                answer_key: '⚪ (Lingkaran)',
                            },
                            {
                                type: 'TRACE_PATTERN',
                                question: 'Lanjutkan pola buah berikut: 🍎 🍌 🍎 🍌 🍎 ... ?',
                                answer_key: '🍌 (Pisang)',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'TRACE_PATTERN',
                                question: 'Tentukan dua bentuk berikutnya dari pola: 🔺 🔺 ⬛ 🔺 🔺 ⬛ 🔺 ... ... ?',
                                answer_key: '🔺 lalu ⬛',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Dapatkah kamu membuat pola tepuk tangan dan injak bumi sendiri?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Evaluasi: Bentuk Geometri dan Pola',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Bangun datar yang memiliki 4 sisi lurus dan 4 sudut pojok adalah...',
                                option_a: 'Segitiga',
                                option_b: 'Segiempat',
                                option_c: 'Lingkaran',
                                option_d: 'Garis',
                                correct_answer: 'B',
                                explanation: 'Segiempat memiliki 4 sisi lurus dan 4 sudut pojok.',
                            },
                            {
                                question_text: 'Benda di rumah yang permukaannya berbentuk lingkaran adalah...',
                                option_a: 'Pintu lemari',
                                option_b: 'Buku gambar',
                                option_c: 'Jam dinding bulat',
                                option_d: 'Papan tulis',
                                correct_answer: 'C',
                                explanation: 'Jam dinding bundar berbentuk lingkaran.',
                            },
                            {
                                question_text: 'Lanjutan dari pola: Merah, Hijau, Merah, Hijau, Merah, ... adalah warna...',
                                option_a: 'Kuning',
                                option_b: 'Biru',
                                option_c: 'Hijau',
                                option_d: 'Merah',
                                correct_answer: 'C',
                                explanation: 'Pola berulang bergantian antara merah dan hijau, setelah merah adalah hijau.',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // BAB 6: MENGENAL BILANGAN 11 SAMPAI 20 & NILAI TEMPAT
    // =========================================================================
    {
        title: 'Bab 6: Mengenal Angka 11 sampai 20 dan Nilai Tempat Puluhan-Satuan',
        order_index: 6,
        target_semester: 2,
        week_target: 18,
        lessons: [
            {
                title: 'Mengenal Angka Belasan (11 sampai 20)',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membilang secara urut 11 sampai 20 dan memahami bahwa angka belasan selalu tersusun dari satu ikatan sepuluh ditambah satuan.',
                allocated_minutes: 70,
                required_materials: ['20 sedotan plastik', 'Karet gelang', 'Kartu angka 11-20'],
                content_text: `# 🎉 Selamat Datang di Dunia Angka Belasan!

Setelah angka 10, ada barisan angka seru yang namanya **angka belasan**! Yuk, kita kenali satu per satu! 🌟

---

### 🔢 1. Barisan Angka 11 sampai 20

| Angka | Nama | Rahasia | Emoji |
| :---: | :--- | :--- | :---: |
| **11** | Sebelas | 10 dan 1 | 🎈 |
| **12** | Dua belas | 10 dan 2 | 🎈🎈 |
| **13** | Tiga belas | 10 dan 3 | 🎈🎈🎈 |
| **14** | Empat belas | 10 dan 4 | 🎈🎈🎈🎈 |
| **15** | Lima belas | 10 dan 5 | 🎈🎈🎈🎈🎈 |
| **16** | Enam belas | 10 dan 6 | 🎈🎈🎈🎈🎈🎈 |
| **17** | Tujuh belas | 10 dan 7 | 🎈🎈🎈🎈🎈🎈🎈 |
| **18** | Delapan belas | 10 dan 8 | 🎈🎈🎈🎈🎈🎈🎈🎈 |
| **19** | Sembilan belas | 10 dan 9 | 🎈🎈🎈🎈🎈🎈🎈🎈🎈 |
| **20** | Dua puluh | 2 ikatan sepuluh | 🎈🎈 |

---

### 💡 2. Rahasia Kata "Belas"

Perhatikan kata kuncinya: **Belas**!  
Artinya: **Ada satu kelompok 10 yang ditemani angka satuan.**

Contohnya:
* **13** = 1 ikatan 10 + 3 lepas
* **17** = 1 ikatan 10 + 7 lepas

Jadi angka **1 di depan** itu bukan berarti "satu biji", tapi **"satu ikatan sepuluh"**! 🎯

---

### 🎭 Komik: Dua Anak Belasan Bertemu

\`\`\`text
  Boni : "Hai! Aku punya 1 ikat 10 sedotan dan 3 sedotan lepas. Jadi aku punya 13!" 🌾
  Kimi : "Meow! Aku punya 1 ikat 10 dan 7 lepas. Jadi aku punya 17!" 🐱
  Boni : "Wah, kamu lebih banyak 4 sedotan dariku!" 🎉
\`\`\``,
                intro_guide: {
                    greeting: 'Buka kedua tangan dan kedua kakimu! Jari tangan kita ada 10, sekarang kita butuh angka yang lebih besar dari 10.',
                    ice_breaker: 'Tepuk 10 Jari: Tepuk kedua tangan (10), lalu injak bumi 3 kali (13)!',
                    apperception: 'Tunjukkan seikat sedotan berisi 10 buah, lalu tambahkan 2 sedotan lepas di sampingnya.',
                    trigger_question: 'Berapa tanggal hari ulang tahunmu? Apakah di atas tanggal 10?',
                },
                mindful_guide: {
                    concept_focus: 'Struktur dasar bilangan belasan sebagai 10 + n.',
                    concrete_steps: [
                        'Hitung 10 sedotan, ikat erat dengan karet gelang. Katakan: "Ini adalah satu ikat sepuluh!"',
                        'Letakkan 4 sedotan lepas di samping ikatan: 10 ditambah 4 menjadi 14.',
                        'Bongkar dan pasang angka belasan lainnya dengan cara serupa.',
                    ],
                    script_parent: '"Angka 1 di depan pada angka 14 itu bukan satu biji ya sayang, tapi melambangkan satu ikat sepuluh sedotan!"',
                },
                joyful_guide: {
                    game_title: 'Pabrik Pengikat Sedotan',
                    game_rules: [
                        'Anak diberi segenggam sedotan acak antara 11-19 batang.',
                        'Anak harus segera membuat 1 ikatan isi 10 dengan karet gelang secepat mungkin, lalu menyebutkan sisanya: "Satu ikat sepuluh dan lima lepas, jadi 15!"',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membilang dibantu dua lembar bingkai sepuluh (ten-frame berpasangan).',
                        child_level_advanced: 'Mampu menuliskan lambang angka dan nama bilangan (misal: 17 = tujuh belas) dengan tepat.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menghitung kumpulan benda berjumlah 11-20 dan menuliskan lambang bilangannya.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.1: Menjelajah Bilangan Belasan',
                        instructions: 'Hitunglah jumlah gambar di setiap kotak dan tuliskan angkanya.',
                        section_a_basic: [
                            {
                                type: 'PICT_COUNT',
                                question: 'Hitung jumlah permen manis berikut (satu toples isi 10 permen + 3 permen lepas):',
                                answer_key: '13',
                                data: { total: 13, symbol: '🍬' },
                            },
                            {
                                type: 'TEN_FRAME',
                                question: 'Dua bingkai sepuluh: satu penuh (10) dan satu lagi terisi 6 bulatan. Berapa totalnya?',
                                answer_key: '16',
                                data: { frames: [{ filled: 10 }, { filled: 6 }] },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Tuliskan nama bilangan dari lambang angka 18!',
                                answer_key: 'delapan belas',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa angka 11 sampai 19 selalu diawali dengan angka 1 di depannya?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Hitunglah urut maju dari sebelas sampai dua puluh: 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 dengan suara lantang dan jelas!',
                    },
                ],
            },
            {
                title: 'Konsep Nilai Tempat: Puluhan dan Satuan',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat menentukan nilai tempat suatu angka pada bilangan 11 sampai 20 (membedakan tempat puluhan dan tempat satuan).',
                allocated_minutes: 70,
                required_materials: ['Kantong nilai tempat (Kantong Puluhan dan Kantong Satuan)', 'Stik es krim'],
                content_text: `# 🏠 Rumah Puluhan dan Rumah Satuan!

Setiap angka dua digit punya **rumah** masing-masing. Yuk, kita kenali rumah mereka! 🏡✨

---

### 🔑 1. Dua Rumah Ajaib

| Rumah | Posisi | Nilai |
| :---: | :---: | :--- |
| **Puluhan** | Sebelah **kiri** | Bernilai kelipatan 10 |
| **Satuan** | Sebelah **kanan** | Bernilai 1-9 |

---

### 🔍 2. Contoh Analisis: Angka 15

Coba perhatikan angka **15**:

\`\`\`text
        1     5
        │     │
        │     └── Satuan (nilai = 5)
        └── Puluhan (nilai = 10)
\`\`\`

* Angka **1** menempati tempat **Puluhan** (nilainya = 10).
* Angka **5** menempati tempat **Satuan** (nilainya = 5).
* **15 = 1 puluhan + 5 satuan**

---

### 🎁 3. Contoh Lain: Angka 20

* Angka **2** di tempat **Puluhan** (nilainya = 20).
* Angka **0** di tempat **Satuan** (nilainya = 0).
* **20 = 2 puluhan + 0 satuan**

---

### 🎭 Komik: Tebak Rumah Angka

\`\`\`text
  Boni : "Kimi, aku punya 1 puluhan dan 7 satuan. Angka berapakah aku?" 🏠
  Kimi : "Meow! 1 ikat sepuluh ditambah 7 lepas, kamu adalah 17!" 🐱✨
  Boni : "Tepat sekali! Sekarang giliranmu!" 🎉
\`\`\``,
                intro_guide: {
                    greeting: 'Selamat datang di perumahan angka! Setiap angka punya kamar sendiri yang tidak boleh tertukar.',
                    ice_breaker: 'Teriak "PULUHAN!" sambil merentangkan tangan lebar, teriak "SATUAN!" sambil mengepalkan satu jari.',
                    apperception: 'Tulis angka 12 di papan. Tanyakan: "Apakah angka 1 dan angka 2 nilainya sama?"',
                    trigger_question: 'Mana yang lebih banyak: 1 kantong isi 10 permen atau 1 buah permen lepas?',
                },
                mindful_guide: {
                    concept_focus: 'Nilai tempat posisi desimal basis sepuluh (Place value: Tens and Ones).',
                    concrete_steps: [
                        'Buat 2 kantong kertas bertuliskan "PULUHAN" dan "SATUAN".',
                        'Kumpulkan 10 stik es krim, ikat dengan karet, lalu masukkan ke kantong PULUHAN.',
                        'Masukkan 3 stik lepas ke kantong SATUAN.',
                        'Tunjukkan bahwa 1 ikatan puluhan + 3 satuan lepas dibaca 13.',
                    ],
                    script_parent: '"Di kamar puluhan hanya boleh masuk kalau sudah genap diikat jadi 10 ya sayang!"',
                },
                joyful_guide: {
                    game_title: 'Tebak Rumah Angka Rahasia',
                    game_rules: [
                        'Orang tua menyebutkan: "1 puluhan dan 7 satuan!"',
                        'Anak menuliskan angkanya di papan tulis mini secepat kilat: "17!"',
                        'Ganti giliran: anak menyebutkan tantangan untuk orang tua.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menggunakan balok Dienes (batang puluhan dan kubus satuan kecil).',
                        child_level_advanced: 'Mampu membedakan nilai angka (angka 1 pada 18 bernilai 10, bukan bernilai 1).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menguraikan bilangan menjadi bentuk panjang puluhan dan satuan.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.2: Mengurai Puluhan dan Satuan',
                        instructions: 'Lengkapilah titik-titik nilai tempat di bawah ini.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Angka 14 = ... puluhan + ... satuan',
                                answer_key: '1 puluhan + 4 satuan',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: '1 puluhan + 8 satuan = bilangan ...',
                                answer_key: '18',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Pada bilangan 19, angka berapakah yang menempati nilai tempat satuan?',
                                answer_key: '9',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kita harus mengikat 10 stik menjadi satu untuk dimasukkan ke kamar puluhan?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Tuliskan di buku tulismu penguraian bilangan 12, 15, dan 17 ke dalam puluhan dan satuan, lalu foto hasilnya!',
                    },
                ],
            },
            {
                title: 'Penjumlahan dan Pengurangan Sederhana sampai 20',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat menyelesaikan penjumlahan dan pengurangan bilangan belasan tanpa menyimpan atau meminjam (misal: 12 + 3 = 15, 17 - 4 = 13).',
                allocated_minutes: 70,
                required_materials: ['Kancing baju 20 butir', 'Garis bilangan lantai 1-20'],
                content_text: `# ⚡ Berhitung Cepat pada Angka Belasan!

Mau tahu trik hitung cepat angka belasan?  
Cukup selesaikan **satuannya dulu**, lalu gabungkan dengan **puluhannya**! 🚀

---

### 🎯 1. Trik Penjumlahan: 13 + 4 = ...

1. **Pisahkan** dulu: 13 = **10** dan **3**.
2. **Jumlahkan satuannya**: 3 + 4 = **7**.
3. **Gabungkan kembali dengan puluhannya**: 10 + 7 = **17**!

> ### 🗣️ Jadi: **13 + 4 = 17**

---

### 🎯 2. Trik Pengurangan: 18 - 5 = ...

1. **Pisahkan** dulu: 18 = **10** dan **8**.
2. **Kurangkan satuannya**: 8 - 5 = **3**.
3. **Gabungkan kembali dengan puluhannya**: 10 + 3 = **13**!

> ### 🗣️ Jadi: **18 - 5 = 13**

---

### 💡 3. Aturan Emas
> ### 🌟 "Puluhannya disimpan tenang, satuannya kita selesaikan!"

Cukup utak-atik yang lepas saja, jangan bongkar ikatan sepuluhnya biar cepat! ⚡

---

### 🎭 Komik: Hitung Cepat Bersama Boni

\`\`\`text
  Boni : "Kimi, coba hitung 14 + 3!" 👦❓
  Kimi : "Meow! 4 + 3 = 7, tinggal gabung jadi 17!" 🐱
  Boni : "Hebat! Itu jauh lebih cepat dari menghitung dari satu!" 🎉
  Kimi : "Trik puluhan-satuan memang ajaib!" ✨
\`\`\``,
                intro_guide: {
                    greeting: 'Siap menaklukkan angka-angka besar? Hari ini kita menjadi master hitung cepat sampai 20!',
                    ice_breaker: 'Katakan bersama: "Puluhannya disimpan tenang, satuannya kita selesaikan!"',
                    apperception: 'Tanyakan kepada siswa: "Jika kamu punya 12 permen dan diberi 3 permen lagi, permenmu makin banyak atau berkurang?"',
                    trigger_question: 'Berapakah 15 dikurangi 2 tanpa menghitung dari satu lagi?',
                },
                mindful_guide: {
                    concept_focus: 'Mental math penjumlahan dan pengurangan berbasis nilai tempat.',
                    concrete_steps: [
                        'Gunakan 1 ikatan sedotan isi 10 dan 5 sedotan lepas (15).',
                        'Ambil 3 sedotan lepas dari kelompok satuan (5 - 3 = 2).',
                        'Lihat hasilnya: tersisa 1 ikat sepuluh dan 2 lepas, yaitu 12.',
                    ],
                    script_parent: '"Cukup utak-atik yang lepas saja ya sayang, ikatan sepuluhnya jangan dibongkar biar cepat!"',
                },
                joyful_guide: {
                    game_title: 'Tantangan Kartu Duel Belasan',
                    game_rules: [
                        'Guru menunjukkan kartu soal: 14 + 3.',
                        'Siswa berlomba menuliskan jawabannya di papan tulis mini dan mengangkatnya paling pertama.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menghitung maju dengan garis bilangan lantai 1 sampai 20.',
                        child_level_advanced: 'Mampu menjawab penjumlahan 10 + n secara mental instan.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menyelesaikan operasi hitung penjumlahan dan pengurangan bilangan 11-20.',
                    worksheet_print_ready: {
                        title: 'LKPD 6.3: Berhitung Cepat Bilangan Belasan',
                        instructions: 'Hitunglah penjumlahan dan pengurangan di bawah ini.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: '12 + 5 = ...',
                                answer_key: '17',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: '16 - 4 = ...',
                                answer_key: '12',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Di dalam bus ada 11 orang penumpang. Di halte berikutnya naik lagi 6 orang. Berapa jumlah semua penumpang di dalam bus sekarang?',
                                answer_key: '17 orang (11 + 6 = 17)',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa menghitung satuannya terlebih dahulu membuat berhitung jadi terasa mudah?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Evaluasi: Bilangan Belasan dan Nilai Tempat',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Bilangan 17 tersusun dari...',
                                option_a: '1 puluhan dan 7 satuan',
                                option_b: '7 puluhan dan 1 satuan',
                                option_c: '1 puluhan dan 1 satuan',
                                option_d: '10 puluhan dan 7 satuan',
                                correct_answer: 'A',
                                explanation: '17 terdiri dari 1 puluhan (10) dan 7 satuan.',
                            },
                            {
                                question_text: 'Hasil dari 14 + 4 adalah...',
                                option_a: '17',
                                option_b: '18',
                                option_c: '19',
                                option_d: '20',
                                correct_answer: 'B',
                                explanation: '4 + 4 = 8, digabung dengan puluhan 10 menjadi 18.',
                            },
                            {
                                question_text: 'Hasil dari 19 - 6 adalah...',
                                option_a: '12',
                                option_b: '14',
                                option_c: '13',
                                option_d: '15',
                                correct_answer: 'C',
                                explanation: '9 - 6 = 3, digabung dengan puluhan 10 menjadi 13.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];