import type { SeedModuleItem } from './matematika-batch-1';

export const MATEMATIKA_BATCH_2: SeedModuleItem[] = [
    // =========================================================================
    // BAB 3: OPERASI PENJUMLAHAN SAMPAI DENGAN 10
    // =========================================================================
    {
        title: 'Bab 3: Operasi Penjumlahan sampai dengan 10',
        order_index: 3,
        target_semester: 1,
        week_target: 7,
        lessons: [
            {
                title: 'Konsep Menggabungkan Dua Kumpulan Benda',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat memahami arti penjumlahan sebagai proses menggabungkan dua kelompok objek konkret dan mengenal simbol tambah (+) serta sama dengan (=).',
                allocated_minutes: 70,
                required_materials: ['Kelereng atau balok lego dua warna', 'Piring plastik', 'Kartu simbol (+) dan (=)'],
                content_text: `# ➕ Menggabungkan Benda: Asyiknya Penjumlahan!

Pernahkah kamu menggabungkan dua mainan kesukaanmu menjadi satu kelompok yang besar?  
Itulah yang disebut dengan **Penjumlahan**! 🧸✨

---

### 🍎 1. Aksi Menyatukan Dua Piring

Perhatikan cerita buah apel lezat ini:
* Di piring merah ada **3 buah apel** (🍎🍎🍎).
* Di piring biru ada **2 buah apel** (🍎🍎).
* Jika semua apel kita satukan ke dalam satu keranjang besar, jumlahnya menjadi **5 buah apel** (🍎🍎🍎🍎🍎).

Kita menuliskannya dalam kalimat matematika ajaib:
> ### 🗣️ **3 + 2 = 5**
> * Tanda **+** dibaca **"tambah"** *(artinya digabungkan)*.
> * Tanda **=** dibaca **"sama dengan"** *(artinya hasil akhirnya)*.

---

### 🎭 Komik: Koki Cilik Menyiapkan Kue Donat

\`\`\`text
  Boni : "Lihat piringku! Aku punya 4 donat cokelat." 🍩x4
  Kimi : "Dan aku punya 3 donat stroberi yang manis!" 🍓x3
  Boni : "Kalau kita gabung, 4 ditambah 3 jadi berapa ya?"
  Kimi : "Meow! Empat tambah tiga sama dengan tujuh kue donat!" 🎉
\`\`\`

---

### 💡 Ingat Selalu:
Penjumlahan membuat jumlah benda menjadi **semakin banyak**! 🚀`,
                intro_guide: {
                    greeting: 'Halo koki cilik! Hari ini kita akan mencampur bahan-bahan lezat di mangkuk ajaib kita.',
                    ice_breaker: 'Angkat 2 jarimu di tangan kiri dan 3 jarimu di tangan kanan. Tepuk kedua tangan bersamaan!',
                    apperception: 'Tanyakan kepada siswa: "Jika kamu punya 1 balon lalu Ibu membelikan 1 balon lagi, balonmu bertambah atau berkurang?"',
                    trigger_question: 'Bagaimana caramu menghitung semua mainan di kamarmu dengan cepat?',
                },
                mindful_guide: {
                    concept_focus: 'Penjumlahan sebagai aksi penggabungan nyata (combining sets).',
                    concrete_steps: [
                        'Letakkan 4 balok hijau di sisi kiri meja dan 2 balok kuning di sisi kanan.',
                        'Letakkan kartu simbol (+) di antara kedua kelompok balok.',
                        'Dorong kedua kelompok balok ke tengah sampai menyatu, lalu letakkan kartu (=) dan hitung totalnya (6).',
                    ],
                    script_parent: 'Bunda/Ayah: "Lihat, awalnya terpisah di kiri dan kanan. Sekarang kita satukan di tengah, jumlahnya makin banyak ya!"',
                },
                joyful_guide: {
                    game_title: 'Kereta Api Angka Gerbong Bergabung',
                    game_rules: [
                        'Dua anak menjadi kepala lokomotif membawa kartu angka (misal: 3 dan 4).',
                        'Masing-masing lokomotif mengajak teman-temannya berbaris di belakang sesuai angkanya.',
                        'Ketika peluit berbunyi "Tuuut!", kedua barisan bergabung menjadi satu kereta panjang dan menghitung total penumpangnya (7).',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menghitung total benda dari 1 mulai dari awal (counting-all).',
                        child_level_advanced: 'Mampu menyebutkan kalimat matematika secara lisan sebelum menghitung gabungannya.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menghitung gabungan gambar konkret dan menuliskan kalimat penjumlahan sederhana.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: Menggabungkan Benda dan Mengenal Simbol (+)',
                        instructions: 'Hitunglah jumlah gambar di kotak pertama dan kedua, lalu tuliskan kalimat penjumlahannya.',
                        section_a_basic: [
                            {
                                type: 'PICT_COUNT',
                                question: 'Ada 4 donat cokelat dan 3 donat stroberi. Berapa jumlah semua donat? Tuliskan: ... + ... = ...',
                                answer_key: '4 + 3 = 7',
                                data: { total: 7, symbol: '🍩' },
                            },
                            {
                                type: 'PICT_COUNT',
                                question: 'Hitung total gabungan bintang berikut: (⭐⭐⭐) + (⭐⭐⭐⭐) = ... bintang.',
                                answer_key: '7',
                                data: { total: 7, symbol: '⭐' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Di meja ada 5 gelas susu. Ibu meletakkan lagi beberapa gelas susu sehingga totalnya menjadi 8 gelas. Berapa gelas susu yang baru diletakkan Ibu?',
                                answer_key: '3 gelas susu',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah jumlah benda menjadi semakin banyak atau semakin sedikit setelah dijumlahkan?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Ambil 3 sendok dan 4 garpu di dapur rumahmu, jejerkan berdampingan, lalu tuliskan kalimat matematikanya di kertas: 3 + 4 = 7. Foto bersama hasil karyamu!',
                    },
                ],
            },
            {
                title: 'Strategi Menghitung Maju (Counting On)',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat menjumlahkan dua bilangan dengan teknik menghitung maju (counting on) mulai dari bilangan yang lebih besar.',
                allocated_minutes: 70,
                required_materials: ['Pita garis bilangan lantai 1-10', 'Dadu bermata angka'],
                content_text: `# 🐸 Lompat Katak: Trik Kilat Menghitung Maju!

Mau tahu cara berhitung super cepat tanpa harus menghitung dari angka 1 lagi?  
Gunakan trik **"Simpan di Kepala, Lanjutkan dengan Jari!"** 🧠🖐️

---

### 🚀 1. Contoh Soal: 5 + 3 = ...

1. **Simpan angka yang paling besar di kepalamu**:  
   👉 Pegang kepalamu dan katakan dengan mantap: **"Lima!"** 🧠
2. **Buka jari tanganmu sebanyak angka kedua**:  
   👉 Buka **3 jari** di tanganmu. 🖐️
3. **Hitung maju kelanjutannya**:  
   * Setelah lima adalah... **Enam!** *(lipat 1 jari)* ☝️
   * **Tujuh!** *(lipat jari ke-2)* ✌️
   * **Delapan!** *(lipat jari ke-3)* 🤟
4. Hasil akhirnya adalah **8**! Hebat sekali, bukan?

---

### 🎭 Komik: Latihan Melompat Bersama Kimi

\`\`\`text
  Boni : "Kimi, berapakah 6 + 3?" 👦❓
  Kimi : "Meow! Simpan 6 di kepala, lalu hitung maju 3 langkah!" 🐱🧠
  Boni : "Tujuh, delapan, sembilan! Jawabannya 9!" 🎉
  Kimi : "Hebat! Kamu sudah jadi master hitung maju!" 🌟
\`\`\``,
                intro_guide: {
                    greeting: 'Siap melompat maju seperti katak cerdik? Hari ini kita belajar trik berhitung cepat!',
                    ice_breaker: 'Katakan bersama: "Simpan angka besar di kepala, siapkan jari untuk melompat!"',
                    apperception: 'Ajak anak melangkah di ubin lantai: berdiri di ubin 4, lalu melangkah maju 3 langkah ke depan.',
                    trigger_question: 'Jika kamu sudah tahu ada 6 kelereng di dalam toples, haruskah kamu menghitungnya dari satu lagi saat memasukkan 2 kelereng baru?',
                },
                mindful_guide: {
                    concept_focus: 'Efisiensi kognitif dari counting-all menuju counting-on-from-larger.',
                    concrete_steps: [
                        'Pilih soal: 6 + 3.',
                        'Tepuk kepala sambil berucap lantang: "Enam!"',
                        'Tunjukkan 3 jari di tangan, lalu hitung maju: "Tujuh, delapan, sembilan!"',
                        'Tuliskan hasil akhirnya: 6 + 3 = 9.',
                    ],
                    script_parent: '"Ingat rahasianya sayang: angka yang besar disimpan di kepala, jangan dihitung dari satu lagi biar tidak lelah!"',
                },
                joyful_guide: {
                    game_title: 'Lompat Katak di Garis Bilangan',
                    game_rules: [
                        'Buat garis bilangan angka 1 sampai 10 dengan lakban kertas di lantai.',
                        'Anak berdiri di angka pertama (misal: angka 5).',
                        'Orang tua menunjukkan kartu (+4). Anak melompat maju 4 kali sambil berhitung: "6, 7, 8, 9!".',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Melompat perlahan dipandu garis bilangan lantai.',
                        child_level_advanced: 'Menghitung maju di kepala tanpa bantuan garis fisik lantai.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menyelesaikan penjumlahan menggunakan strategi hitung maju.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: Trik Kilat Menghitung Maju',
                        instructions: 'Simpan bilangan terbesar di kepala, lalu hitunglah maju dengan jarimu.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Hitung maju: 6 + 2 = ...',
                                answer_key: '8',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Hitung maju: 7 + 3 = ...',
                                answer_key: '10',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: '2 + 8 = ... (Petunjuk: Simpan angka 8 di kepala, hitung maju 2 langkah)',
                                answer_key: '10',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa lebih mudah menyimpan angka yang besar di kepala daripada angka yang kecil?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Rekam suaramu saat menghitung soal "7 + 3" dengan cara menghitung maju: sebutkan angka di kepala dan langkah majunya!',
                    },
                ],
            },
            {
                title: 'Penjumlahan dengan Bilangan Nol (0) & Cerita Matematika',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat memahami sifat identitas penjumlahan dengan bilangan nol (n + 0 = n) dan menyelesaikan soal cerita kontekstual penjumlahan sederhana.',
                allocated_minutes: 70,
                required_materials: ['Piring berisi kue dan piring kosong', 'Boneka tangan untuk bercerita'],
                content_text: `# 🪄 Keajaiban Angka Nol: Ditambah 0 Hasilnya Tetap!

Apa yang terjadi jika kamu punya piring berisi **5 kue lezat**, lalu Ibu memberikan **0 kue lagi** *(artinya tidak memberi apa-apa)*?  
Tentu saja kue di piringmu tidak berubah, tetap ada **5 kue**! 🍪✨

---

### 🌟 1. Aturan Emas Angka Nol (0)
> ### 🗣️ "Setiap angka yang ditambah 0, hasilnya adalah angka itu sendiri!"

| Kalimat Matematika | Cerita Nyata di Rumah | Hasilnya |
| :--- | :--- | :---: |
| **4 + 0 =** | 4 apel di piring + 0 tambahan | **4** |
| **7 + 0 =** | 7 kelereng + 0 kelereng | **7** |
| **0 + 9 =** | 0 kotak mainan + 9 kotak baru | **9** |

---

### 📖 2. Soal Cerita Sahabat Kita
Mari bantu Boni memecahkan teka-teki cerita ini:
> *"Siti memetik 4 bunga mawar merah di taman. Lalu Lani datang dan memberikan 3 bunga mawar kuning. Berapa jumlah seluruh bunga Siti sekarang?"*

* Kalimat matematikanya: **4 + 3 = 7 bunga mawar!** 🎉

---

### 🎭 Komik: Piring Kue Kimi yang Kosong

\`\`\`text
  Boni : "Kimi, ada berapa kue di piringmu?" 🍪
  Kimi : "Meow! Piringku kosong, jadi ada 0 kue!" 🐱
  Boni : "Kalau aku tambah 3 kue lagi, jadi berapa?" 🍪🍪🍪
  Kimi : "Nol ditambah tiga jadi tiga! Aku jadi punya 3 kue!" 🎉
\`\`\``,
                intro_guide: {
                    greeting: 'Selamat pagi sahabat pintar! Hari ini kita akan memecahkan teka-teki cerita misterius.',
                    ice_breaker: 'Buka satu tangan berisi 4 jari, buka tangan lainnya rapat tanpa jari (0). Satukan: tetap 4!',
                    apperception: 'Tanyakan kepada siswa: "Jika kamu punya 3 pensil di kotak dan tidak menambah pensil baru, berapa pensilmu sekarang?"',
                    trigger_question: 'Berapakah 100 ditambah 0? Mengapa tidak berubah?',
                },
                mindful_guide: {
                    concept_focus: 'Sifat identitas nol pada operasi penjumlahan.',
                    concrete_steps: [
                        'Siapkan piring A berisi 6 biskuit dan piring B yang kosong melompong (0).',
                        'Tanyakan: "Jika biskuit di piring A dan B digabung, ada berapa biskuit sekarang?"',
                        'Tuliskan rumusnya: 6 + 0 = 6.',
                    ],
                    script_parent: '"Karena piring kedua kosong (nol), kue kita tidak bertambah banyak dan tidak berkurang, tetap utuh 6!"',
                },
                joyful_guide: {
                    game_title: 'Panggung Dongeng Cerita Matematika',
                    game_rules: [
                        'Guru/Orang tua menceritakan kisah fabel (misal: Kelinci memetik 3 wortel, lalu menemukan 0 wortel di kebun kedua).',
                        'Anak memperagakan gerakan kelinci dan menjawab lantang hasil penjumlahannya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membuat visualisasi piring kue kosong untuk membuktikan sifat nol.',
                        child_level_advanced: 'Anak menciptakan soal cerita matematika sendiri secara lisan.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Mengerjakan soal penjumlahan nol dan menyelesaikan soal cerita tertulis.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.3: Soal Cerita Penjumlahan dan Sifat Nol',
                        instructions: 'Bacalah cerita di bawah ini dengan saksama lalu hitunglah jawabannya.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Berapakah hasil dari 8 + 0 = ... ?',
                                answer_key: '8',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Siti memetik 4 bunga mawar merah. Lani memetik 5 bunga mawar kuning. Berapa tangkai seluruh bunga yang mereka petik?',
                                answer_key: '9 tangkai bunga',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Ada 3 burung gereja di dahan pohon. Datang lagi 3 burung gereja lainnya bergabung. Berapa jumlah burung di dahan pohon sekarang?',
                                answer_key: '6 burung',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa menambahkan angka nol tidak mengubah jumlah benda sama sekali?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz Cepat: Operasi Penjumlahan sampai 10',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Hasil dari 5 + 4 adalah...',
                                option_a: '8',
                                option_b: '9',
                                option_c: '10',
                                option_d: '7',
                                correct_answer: 'B',
                                explanation: '5 ditambah 4 menghasilkan 9.',
                            },
                            {
                                question_text: 'Berapakah nilai dari 9 + 0 ?',
                                option_a: '0',
                                option_b: '10',
                                option_c: '9',
                                option_d: '8',
                                correct_answer: 'C',
                                explanation: 'Setiap bilangan yang ditambah 0 hasilnya adalah bilangan itu sendiri (9).',
                            },
                            {
                                question_text: 'Edo memiliki 6 kelereng. Kakak memberi Edo 3 kelereng lagi. Kelereng Edo sekarang berjumlah...',
                                option_a: '7',
                                option_b: '8',
                                option_c: '9',
                                option_d: '10',
                                correct_answer: 'C',
                                explanation: '6 + 3 = 9 kelereng.',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // BAB 4: OPERASI PENGURANGAN SAMPAI DENGAN 10
    // =========================================================================
    {
        title: 'Bab 4: Operasi Pengurangan sampai dengan 10',
        order_index: 4,
        target_semester: 1,
        week_target: 10,
        lessons: [
            {
                title: 'Konsep Pengurangan: Mengambil, Memisahkan, dan Sisa',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat memahami arti pengurangan sebagai tindakan mengambil/memisahkan sebagian objek dari kelompok utuh dan mengenal simbol kurang (-).',
                allocated_minutes: 70,
                required_materials: ['Biskuit atau kue kecil', 'Piring', 'Kartu simbol (-) dan (=)'],
                content_text: `# ➖ Mengambil Benda: Asyiknya Pengurangan!

Pernahkah kamu punya 5 permen, lalu kamu makan 2 permen bersama adik?  
Jumlah permenmu tentu jadi **semakin sedikit**! Itulah yang disebut **Pengurangan**. 🍬✨

---

### 🍪 1. Aksi Mengambil Sebagian Benda

Perhatikan cerita biskuit lezat ini:
* Di piring ada **5 buah biskuit** yang utuh (🍪🍪🍪🍪🍪).
* Adik yang lapar **memakan 2 buah biskuit** (🍪🍪 diambil/dimakan).
* Sekarang, biskuit yang **tersisa** di piring tinggal **3 buah** (🍪🍪🍪).

Kita menuliskan kalimat matematikanya seperti ini:
> ### 🗣️ **5 - 2 = 3**
> * Tanda **-** dibaca **"kurang"** *(artinya diambil atau dipisahkan)*.
> * Angka **3** adalah **sisa** benda yang belum diambil.

---

### 🎭 Komik: Kimi Si Kucing yang Lapar

\`\`\`text
  Kimi : "Meow! Aku punya 6 ikan segar di mangkuk!" 🐟x6
  Boni : "Nyam... aku ambil 2 ikan untuk kucingku ya!" 🐾
  Kimi : "Tentu Boni! Enam diambil dua, sisa ikanku sekarang tinggal 4!" 🐟x4
\`\`\`

---

### 💡 Ingat Selalu:
Pengurangan membuat sisa benda menjadi **semakin sedikit** daripada sebelumnya! 🚀`,
                intro_guide: {
                    greeting: 'Selamat pagi detektif! Hari ini kita menyelidiki misteri benda yang berkurang dan menghilang.',
                    ice_breaker: 'Tunjukkan 5 jarimu. Lipat/sembunyikan 2 jari ke dalam genggaman. Tinggal berapa jari yang terlihat? Tiga!',
                    apperception: 'Tanyakan: "Jika kamu punya 4 balon gas lalu 1 balon meletus, apakah balonmu makin banyak atau berkurang?"',
                    trigger_question: 'Berapa sisa uang sakumu jika kamu membeli sebutir telur rebus di kantin?',
                },
                mindful_guide: {
                    concept_focus: 'Pengurangan sebagai aksi memisahkan atau mengambil (take-away / reduction).',
                    concrete_steps: [
                        'Letakkan 6 balok mainan berjajar di atas meja.',
                        'Ambil 2 balok dan masukkan ke dalam kotak tertutup (disimpan).',
                        'Minta anak menghitung sisa balok yang masih ada di atas meja (4 balok).',
                        'Tunjukkan lambang matematikanya: 6 - 2 = 4.',
                    ],
                    script_parent: '"Awalnya ada 6 balok utuh. Karena diambil 2, sekarang sisanya berkurang menjadi 4 balok!"',
                },
                joyful_guide: {
                    game_title: 'Permainan Balon Meletus Dor!',
                    game_rules: [
                        'Anak menggambar 7 balon di papan tulis kecil.',
                        'Orang tua menyebutkan: "Dor! 3 balon meletus!"',
                        'Anak mencoret tanda silang (X) pada 3 balon, lalu menghitung balon yang masih utuh (4 balon).',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menggunakan manipulatif biskuit nyata yang boleh langsung dimakan.',
                        child_level_advanced: 'Mampu menghubungkan pengurangan dengan pasangan bilangan (Number Bonds).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Mencoret gambar benda yang diambil dan menghitung sisa objek.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: Mengambil Benda dan Mengenal Simbol (-)',
                        instructions: 'Coretlah gambar sesuai angka yang dikurangkan, lalu hitung sisanya.',
                        section_a_basic: [
                            {
                                type: 'PICT_COUNT',
                                question: 'Ada 6 jeruk di piring, diambil 2 jeruk. Berapa jeruk yang tersisa? (6 - 2 = ...)',
                                answer_key: '4',
                                data: { total: 6, crossed: 2, symbol: '🍊' },
                            },
                            {
                                type: 'PICT_COUNT',
                                question: 'Ada 8 ikan berenang di kolam, 3 ikan dipancing. Berapa ikan yang tersisa di kolam? (8 - 3 = ...)',
                                answer_key: '5',
                                data: { total: 8, crossed: 3, symbol: '🐟' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Tuliskan kalimat matematika dari cerita ini: "Paman punya 9 ekor ayam, 4 ekor ayam dijual ke pasar. Berapa ekor ayam paman yang tersisa?"',
                                answer_key: '9 - 4 = 5 ekor ayam',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah hasil pengurangan selalu lebih kecil daripada bilangan awalnya? Mengapa?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Susun 8 benda kecil di meja, pisahkan 3 benda ke samping, lalu tuliskan di kertas: 8 - 3 = 5. Foto bersama karyamu!',
                    },
                ],
            },
            {
                title: 'Strategi Menghitung Mundur (Counting Back)',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat menghitung pengurangan menggunakan strategi menghitung mundur (counting back) pada garis bilangan atau dengan bantuan jari tangan.',
                allocated_minutes: 70,
                required_materials: ['Pita garis bilangan lantai 1-10', 'Dadu'],
                content_text: `# 🔙 Berjalan Mundur: Trik Kilat Pengurangan!

Ingatkah kamu cara menghitung maju saat penjumlahan?  
Untuk pengurangan, kita tinggal berjalan **mundur ke belakang**! 🚶‍♂️🔙

---

### 🚀 1. Contoh Soal: 7 - 3 = ...

1. **Simpan angka awal di kepalamu**:  
   👉 Pegang kepalamu dan katakan: **"Tujuh!"** 🧠
2. **Buka jari tanganmu sebanyak pengurangnya**:  
   👉 Buka **3 jari** di tanganmu. 🖐️
3. **Hitung mundur ke belakang**:
   * Mundur sebelum tujuh adalah... **Enam!** *(lipat jari pertama)* ☝️
   * **Lima!** *(lipat jari kedua)* ✌️
   * **Empat!** *(lipat jari ketiga)* 🤟
4. Hasil akhirnya adalah **4**! Hebat sekali!

---

### 🎭 Komik: Hitung Mundur Roket Angkasa

\`\`\`text
  Boni : "Kimi, berapakah 9 - 3?" 👦❓
  Kimi : "Meow! Simpan 9 di kepala, lalu hitung mundur 3 langkah ke belakang!" 🐱🧠
  Boni : "Delapan, tujuh, enam! Jawabannya 6!" 🚀
  Kimi : "Hebat! Roket pengurangan kita meluncur sukses!" 🎉
\`\`\``,
                intro_guide: {
                    greeting: 'Halo astronot cilik! Siap melakukan hitung mundur peluncuran roket ke angkasa?',
                    ice_breaker: 'Hitung mundur bersama: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, Meluncuuur!',
                    apperception: 'Ajak anak melangkah mundur di ubin lantai: berdiri di ubin 8, lalu mundur 2 langkah.',
                    trigger_question: 'Jika kamu di tangga nomor 6 dan turun 2 anak tangga, sekarang kamu berada di tangga nomor berapa?',
                },
                mindful_guide: {
                    concept_focus: 'Pengurangan sebagai gerakan mundur pada garis bilangan terurut.',
                    concrete_steps: [
                        'Pilih soal: 8 - 3.',
                        'Sentuh angka 8 di garis bilangan lantai.',
                        'Langkahkan kaki mundur 3 langkah sambil berucap: "Tujuh, enam, lima!"',
                        'Perhatikan kaki berhenti tepat di angka 5.',
                    ],
                    script_parent: '"Kalau penjumlahan tadi kita maju ke depan, kalau pengurangan kita berjalan mundur ke belakang ya sayang!"',
                },
                joyful_guide: {
                    game_title: 'Roket Hitung Mundur',
                    game_rules: [
                        'Guru menyebutkan angka awal (misal: 9) dan pengurangan (-4).',
                        'Siswa jongkok dan melompat mundur 4 kali sambil berhitung mundur nyaring.',
                        'Siswa mendarat dan berteriak menyebutkan angka tempat ia mendarat: "Lima!"',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Melihat kartu deret angka saat berhitung mundur agar tidak tertukar.',
                        child_level_advanced: 'Mampu berhitung mundur di kepala secara cepat tanpa melihat kartu angka.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menyelesaikan pengurangan menggunakan garis bilangan dan teknik hitung mundur.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: Melangkah Mundur Pengurangan',
                        instructions: 'Gunakan garis bilangan untuk melangkah mundur dan temukan jawabannya.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Hitung mundur: 8 - 2 = ...',
                                answer_key: '6',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Hitung mundur: 9 - 3 = ...',
                                answer_key: '6',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: '10 - 4 = ... (Gunakan hitung mundur 4 langkah dari 10)',
                                answer_key: '6',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Angka berapa yang kamu sebutkan sebelum angka 7 saat berhitung mundur?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Rekam suaramu saat menyelesaikan soal "9 - 4" dengan cara menghitung mundur: sebutkan angka awal dan langkah mundurnya!',
                    },
                ],
            },
            {
                title: 'Hubungan Penjumlahan dan Pengurangan (Keluarga Fakta Bilangan)',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat memahami bahwa penjumlahan dan pengurangan saling berkebalikan (invers) serta membentuk keluarga fakta matematika (Fact Families).',
                allocated_minutes: 70,
                required_materials: ['Kartu angka dan segitiga Fact Family kertas'],
                content_text: `# 🏡 Rumah Keluarga Angka yang Kompak!

Tahukah kamu? Penjumlahan dan pengurangan adalah dua sahabat karib yang saling berputar balik!  
Jika kamu tahu penjumlahannya, kamu otomatis tahu pengurangannya! 🔄✨

---

### 🔺 1. Segitiga Saudara Kandung (3, 4, dan 7)

Lihat tiga angka bersaudara ini di dalam satu rumah segitiga:

\`\`\`text
                 [ 7 ]  <--- Puncak Rumah (Hasil)
                /     \\
           [ 3 ]       [ 4 ] <--- Sudut Bawah (Anggota Keluarga)
\`\`\`

Dari satu rumah segitiga ini, kita bisa membuat **4 kalimat matematika ajaib**:
1. **3 + 4 = 7** *(Penjumlahan pertama)*
2. **4 + 3 = 7** *(Penjumlahan dibalik)*
3. **7 - 4 = 3** *(Pengurangan pertama)*
4. **7 - 3 = 4** *(Pengurangan dibalik)*

Hebat sekali, kan? Cukup hafalkan 3 angka bersaudara, kamu bisa menguasai 4 soal sekaligus! 🚀`,
                intro_guide: {
                    greeting: 'Selamat pagi sahabat cerdas! Hari ini kita berkenalan dengan keluarga angka yang tidak pernah terpisahkan.',
                    ice_breaker: 'Kocok 3 kartu bertuliskan angka 2, 5, dan 7. Tebak siapa yang jadi kepalanya!',
                    apperception: 'Tunjukkan 5 jari: lipat 2 jari sisa 3. Buka 2 jari lagi, kembali utuh jadi 5!',
                    trigger_question: 'Jika 6 + 4 = 10, berapakah 10 - 4 tanpa perlu menghitung mundur?',
                },
                mindful_guide: {
                    concept_focus: 'Relasi inversi antara operasi penjumlahan dan pengurangan.',
                    concrete_steps: [
                        'Buat gambar segitiga besar: tulis angka 10 di puncak, angka 6 di sudut kiri, dan angka 4 di sudut kanan.',
                        'Tutup angka 10: 6 + 4 = 10.',
                        'Tutup angka 4: 10 - 6 = 4.',
                        'Tutup angka 6: 10 - 4 = 6.',
                    ],
                    script_parent: '"Hebat sekali kan sayang? Cukup hafalkan 3 angka di segitiga, kita bisa menjawab 4 soal sekaligus!"',
                },
                joyful_guide: {
                    game_title: 'Segitiga Ajaib Rumah Angka',
                    game_rules: [
                        'Orang tua menunjukkan atap segitiga bernilai 9 dan sudut bawah bernilai 5.',
                        'Anak dengan cepat menebak sudut yang ditutup telapak tangan: "Empat!"',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menggunakan manipulatif balok untuk membongkar dan memasang kembali susunan angka.',
                        child_level_advanced: 'Menuliskan 4 kalimat matematika lengkap dari 3 angka yang diberikan secara mandiri.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menemukan hubungan fakta penjumlahan dan pengurangan pada segitiga bilangan.',
                    worksheet_print_ready: {
                        title: 'LKPD 4.3: Rumah Keluarga Fakta Matematika',
                        instructions: 'Lengkapilah kalimat matematika berdasarkan angka pada segitiga keluarga bilangan.',
                        section_a_basic: [
                            {
                                type: 'NUMBER_BOND',
                                question: 'Jika 5 + 3 = 8, maka berapakah 8 - 3 = ... ?',
                                answer_key: '5',
                                data: { whole: 8, part1: 5, part2: 3 },
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Lengkapi: 10 - 7 = ... (Petunjuk: ingat sahabat 10, yaitu 7 + ... = 10)',
                                answer_key: '3',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Tuliskan 4 kalimat matematika dari angka 2, 6, dan 8!',
                                answer_key: '2+6=8, 6+2=8, 8-6=2, 8-2=6',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara penjumlahan membantumu menjawab soal pengurangan dengan cepat?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Evaluasi: Operasi Pengurangan sampai 10',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Hasil dari 9 - 5 adalah...',
                                option_a: '3',
                                option_b: '4',
                                option_c: '5',
                                option_d: '6',
                                correct_answer: 'B',
                                explanation: '9 dikurangi 5 menghasilkan sisa 4.',
                            },
                            {
                                question_text: 'Berapakah hasil dari 7 - 0 ?',
                                option_a: '0',
                                option_b: '7',
                                option_c: '6',
                                option_d: '1',
                                correct_answer: 'B',
                                explanation: 'Setiap bilangan yang dikurangi 0 hasilnya tetap bilangan itu sendiri (7).',
                            },
                            {
                                question_text: 'Jika 4 + 6 = 10, maka 10 - 4 adalah...',
                                option_a: '4',
                                option_b: '5',
                                option_c: '6',
                                option_d: '7',
                                correct_answer: 'C',
                                explanation: 'Karena 4 dan 6 adalah pasangan 10, maka 10 - 4 = 6.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];