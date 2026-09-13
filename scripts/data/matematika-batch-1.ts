export interface SeedQuizQuestion {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
}

export interface SeedAssignment {
    type: 'PHOTO_HOMEWORK' | 'VOICE_TASK' | 'QUIZ_CBT';
    prompt: string;
    quiz_question_count?: number;
    passing_score?: number;
    quiz_questions?: SeedQuizQuestion[];
}

export interface SeedLessonItem {
    title: string;
    order_index: number;
    content_type: 'TEXT' | 'VIDEO' | 'AUDIO' | 'PDF';
    content_text: string;
    learning_objectives: string;
    allocated_minutes: number;
    required_materials: string[];
    intro_guide: {
        greeting: string;
        ice_breaker: string;
        apperception: string;
        trigger_question: string;
    };
    mindful_guide: {
        concept_focus: string;
        concrete_steps: string[];
        script_parent: string;
    };
    joyful_guide: {
        game_title: string;
        game_rules: string[];
        multi_grade_adaptation: {
            child_level_basic: string;
            child_level_advanced: string;
        };
    };
    meaningful_guide: {
        task_focus: string;
        worksheet_print_ready: {
            title: string;
            instructions: string;
            section_a_basic: Array<{
                type: string;
                question: string;
                answer_key: string;
                data?: Record<string, unknown>;
            }>;
            section_b_enrichment: Array<{
                type: string;
                question: string;
                answer_key: string;
                data?: Record<string, unknown>;
            }>;
        };
        reflection_questions: string[];
    };
    assignments: SeedAssignment[];
}

export interface SeedModuleItem {
    title: string;
    order_index: number;
    target_semester: number;
    week_target: number;
    lessons: SeedLessonItem[];
}

export const MATEMATIKA_BATCH_1: SeedModuleItem[] = [
    // =========================================================================
    // BAB 1: MEMBILANG & MENGENAL BILANGAN 1 SAMPAI 10
    // =========================================================================
    {
        title: 'Bab 1: Ayo Membilang dan Mengenal Angka 1 sampai 10',
        order_index: 1,
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Membilang Banyak Benda Konkret 1 sampai 5',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membilang secara urut benda nyata berjumlah 1 sampai 5, menunjuk korespondensi satu-satu, dan menghubungkan jumlahnya dengan lambang bilangan.',
                allocated_minutes: 70,
                required_materials: ['5 tutup botol/kelereng', 'Kartu angka 1-5', 'Piring plastik kecil'],
                content_text: `# 🍎 Petualangan Angka 1 sampai 5 di Kebun Buah!

Halo sahabat cilik! Di kebun buah yang indah, ada banyak sekali buah segar yang siap kita hitung bersama! 🌳✨

---

### 🔢 1. Bentuk Angka Unik Sahabat Kita

| Angka | Gambar Buah | Bentuk Lucunya | Cara Menghitung |
| :---: | :---: | :--- | :--- |
| **1** | 🍎 | Seperti pensil tegak lurus | Satu buah apel |
| **2** | 🍎🍎 | Seperti leher angsa meliuk di danau 🦢 | Satu, dua! |
| **3** | 🍎🍎🍎 | Seperti sayap burung terbang di awan 🕊️ | Satu, dua, tiga! |
| **4** | 🍎🍎🍎🍎 | Seperti kursi terbalik yang kokoh 🪑 | Satu, dua, tiga, empat! |
| **5** | 🍎🍎🍎🍎🍎 | Seperti badut gendut memakai topi badut 🤡 | Satu, dua, tiga, empat, lima! |

---

### 🖐️ 2. Aturan Rahasia Membilang Jitu:
Saat menghitung benda nyata:
1. **Sentuh satu benda dengan jarimu.**
2. **Keluarkan suara satu angka.**
3. Jangan ada benda yang terlewat atau dihitung dua kali ya! 🎯

---

### 🎭 Komik: Boni dan Kimi Memetik Buah

\`\`\`text
  Boni : "Kimi, lihat di keranjangku! Ada 3 buah apel merah!" 🍎🍎🍎
  Kimi : "Meow! Aku juga punya 2 buah jeruk manis!" 🍊🍊
  Boni : "Ayo kita hitung semua buah di meja: satu, dua, tiga, empat, lima!" 🖐️🎉
\`\`\`

---

### 🔍 Tebak Cepat di Kamarmu:
* Berapa banyak hidung di wajahmu? 👉 **1 hidung!** 👃
* Berapa banyak matamu yang berkedip? 👉 **2 mata!** 👀
* Berapa banyak jari di satu tanganmu? 👉 **5 jari lengkap!** 🖐️`,
                intro_guide: {
                    greeting: 'Selamat pagi anak hebat! Mari siapkan jari tangan kita untuk berhitung gembira hari ini.',
                    ice_breaker: 'Tepuk Jari: Satu jari kanan, satu jari kiri, digabung jadi dua jadilah jembatan panjang!',
                    apperception: 'Ajak anak menyentuh 2 mata, 1 hidung, dan 2 telinga mereka untuk menyadari angka di tubuhnya.',
                    trigger_question: 'Berapa banyak kancing yang ada di bajumu hari ini? Mari kita hitung bersama!',
                },
                mindful_guide: {
                    concept_focus: 'Korespondensi satu-satu (menunjuk satu benda untuk tepat satu sebutan bilangan).',
                    concrete_steps: [
                        'Letakkan 3 kelereng di atas meja secara berjajar dari kiri ke kanan.',
                        'Bimbing anak menyentuh kelereng pertama sambil mengucap "satu", kedua "dua", dan ketiga "tiga".',
                        'Ambil kartu lambang bilangan angka 3 dan letakkan tepat di samping kelompok kelereng tersebut.',
                    ],
                    script_parent: 'Bunda/Ayah: "Coba letakkan 4 sendok di meja makan, lalu sentuh dan hitung satu per satu ya sayang!"',
                },
                joyful_guide: {
                    game_title: 'Permainan Petik Bintang Meja',
                    game_rules: [
                        'Guru/Orang tua menyebutkan sebuah angka secara acak antara 1 sampai 5.',
                        'Anak dengan sigap mengambil tutup botol sebanyak angka yang disebutkan dan menaruhnya di piring.',
                        'Anak mengangkat tangan dan berseru riang: "Bintang Tiga Siap!" jika jumlahnya sudah pas.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membilang dipandu dengan memegang tangan anak menyentuh benda 1 sampai 3.',
                        child_level_advanced: 'Anak langsung mengenali kelompok benda 1-4 sekilas tanpa menghitung satu per satu (subitizing).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menghitung gambar benda konkret dan menuliskan lambang angka yang tepat.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: Membilang Ceria 1 sampai 5',
                        instructions: 'Hitunglah jumlah gambar di setiap kotak lalu tuliskan lambang bilangannya di kotak kecil yang tersedia.',
                        section_a_basic: [
                            {
                                type: 'PICT_COUNT',
                                question: 'Berapa banyak buah apel segar di dalam keranjang?',
                                answer_key: '3',
                                data: { total: 3, symbol: '🍎' },
                            },
                            {
                                type: 'PICT_COUNT',
                                question: 'Berapa banyak pensil warna yang tersusun di meja?',
                                answer_key: '5',
                                data: { total: 5, symbol: '✏️' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATCH_PAIRS',
                                question: 'Tarik garis penghubung dari kelompok gambar ke lambang bilangan yang cocok!',
                                answer_key: 'A-2, B-4',
                                data: {
                                    pairs: [
                                        { left: '2 Bola Sepak (⚽⚽)', right: 'Angka 2' },
                                        { left: '4 Bintang Emas (⭐⭐⭐⭐)', right: 'Angka 4' },
                                    ],
                                },
                            },
                        ],
                    },
                    reflection_questions: [
                        'Benda apa saja di kamarmu yang jumlahnya tepat ada 2 buah?',
                        'Bagian mana yang paling terasa mudah saat kamu membilang tadi?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Kumpulkan 5 benda kecil kesukaanmu di rumah (mainan/krayon), jejerkan rapi, lalu foto dan kirimkan ke Bu Guru!',
                    },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Ceria: Mengenal Bilangan 1-5',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Berapa jumlah roda pada sebuah sepeda biasa?',
                                option_a: '1',
                                option_b: '2',
                                option_c: '3',
                                option_d: '4',
                                correct_answer: 'B',
                                explanation: 'Sepeda memiliki dua roda: satu roda di depan dan satu di belakang.',
                            },
                            {
                                question_text: 'Lambang bilangan untuk jumlah jari pada satu tangan penuh adalah...',
                                option_a: '3',
                                option_b: '4',
                                option_c: '5',
                                option_d: '2',
                                correct_answer: 'C',
                                explanation: 'Satu tangan kita memiliki 5 jari lengkap.',
                            },
                            {
                                question_text: 'Ada 4 anak sedang bermain ayunan. Lambang bilangan empat ditulis...',
                                option_a: '4',
                                option_b: '2',
                                option_c: '5',
                                option_d: '3',
                                correct_answer: 'A',
                                explanation: 'Angka 4 melambangkan jumlah empat buah objek.',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Membilang Banyak Benda 6 sampai 10 & Konsep Nol (0)',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membilang secara urut benda 6 sampai 10 menggunakan kedua tangan dan memahami bahwa angka nol (0) berarti tidak ada benda sama sekali.',
                allocated_minutes: 70,
                required_materials: ['10 stik es krim/sedotan', 'Toples kosong', 'Kartu angka 6-10 dan 0'],
                content_text: `# 🖐️🖐️ Menghitung 6 sampai 10 dan Mengenal Angka Nol (0)!

Satu tangan kita ada 5 jari. Kalau benda kita bertambah banyak, kita buka tangan kedua kita! 👐✨

---

### 🌟 1. Menghitung dengan Dua Tangan Terbuka

| Angka | Jari Tangan Kiri | Jari Tangan Kanan | Cara Membayangkannya |
| :---: | :---: | :---: | :--- |
| **6** | 🖐️ (5 jari) | ☝️ (1 jari) | Lima ditambah satu jadi enam! |
| **7** | 🖐️ (5 jari) | ✌️ (2 jari) | Lima ditambah dua jadi tujuh! |
| **8** | 🖐️ (5 jari) | 🤟 (3 jari) | Lima ditambah tiga jadi delapan! |
| **9** | 🖐️ (5 jari) | 🖖 (4 jari) | Lima ditambah empat jadi sembilan! |
| **10** | 🖐️ (5 jari) | 🖐️ (5 jari) | Dua tangan terbuka penuh: SEPULUH! |

---

### 🫙 2. Kotak Sulap Angka Nol (0)
Bayangkan kamu punya toples berisi **3 biskuit lezat** 🍪🍪🍪.  
Lalu biskuit itu kamu makan satu per satu sampai habis bersih!  

Sekarang, ada berapa biskuit di dalam toples?  
> ### 👉 Ada **0 (Nol)** biskuit!  
> **Nol** artinya kosong melompong, tidak ada benda sama sekali. Bentuknya bulat seperti telur bulat: **0**.

---

### 🎭 Komik: Toples Kue Kimi yang Kosong

\`\`\`text
  Kimi : "Nyam... nyam! Ikannya enak sekali!" 🐟😸
  Boni : "Kimi, lihat piringmu! Tidak ada ikan yang tersisa lagi!" 🍽️
  Kimi : "Meow! Berarti jumlah ikanku sekarang ada 0 (nol)!" 😹🎉
\`\`\``,
                intro_guide: {
                    greeting: 'Buka kedua tanganmu lebar-lebar! Hari ini kita akan menjelajahi angka 6 sampai 10.',
                    ice_breaker: 'Tunjukkan 5 jarimu, lalu buka 2 jari di tangan satunya. Sekarang ada berapa jari?',
                    apperception: 'Tunjukkan sebuah kotak pensil yang kosong melompong kepada siswa.',
                    trigger_question: 'Jika burung di pohon terbang semuanya, berapa burung yang tersisa di dahan?',
                },
                mindful_guide: {
                    concept_focus: 'Struktur lima-an (5 + n) untuk angka 6-10 dan ketiadaan objek pada konsep nol.',
                    concrete_steps: [
                        'Beri anak 7 stik es krim. Minta ia membuat ikatan 5 stik terlebih dahulu.',
                        'Letakkan 2 stik sisanya di samping ikatan lima: 5 dan 2 menjadi 7.',
                        'Kosongkan meja sepenuhnya, lalu tunjukkan kartu angka 0 untuk mewakili ketiadaan benda.',
                    ],
                    script_parent: '"Lihat piring ini kuenya sudah habis tak bersisa. Berarti jumlah kuenya ada nol (0)!"',
                },
                joyful_guide: {
                    game_title: 'Tebak Kantong Rahasia',
                    game_rules: [
                        'Guru/Orang tua memasukkan kelereng antara 6-10 butir ke dalam kantong kain (atau sengaja dikosongkan).',
                        'Anak meraba atau mengeluarkan isinya satu per satu sambil berhitung nyaring.',
                        'Jika kantong kosong, anak berteriak: "Zonk! Isinya Nol!" sambil tertawa gembira.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menggunakan bingkai sepuluh (ten-frame) untuk meletakkan stik secara visual.',
                        child_level_advanced: 'Mampu menuliskan angka 0 sampai 10 secara teratur dari kiri ke kanan.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menghitung objek berjumlah 6-10 dan mengenali kondisi kosong bernilai 0.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: Menjelajah Angka 6 sampai 10 dan Angka Nol',
                        instructions: 'Hitung benda pada gambar dan lingkari angka yang benar.',
                        section_a_basic: [
                            {
                                type: 'PICT_COUNT',
                                question: 'Hitung jumlah ikan yang berenang di akuarium berikut:',
                                answer_key: '8',
                                data: { total: 8, symbol: '🐟' },
                            },
                            {
                                type: 'PICT_COUNT',
                                question: 'Berapa jumlah kupu-kupu di dalam sangkar yang terbuka kosong?',
                                answer_key: '0',
                                data: { total: 0, symbol: '🦋' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATCH_PAIRS',
                                question: 'Hubungkan gambar dengan lambang angka yang tepat!',
                                answer_key: 'A-6, B-10',
                                data: {
                                    pairs: [
                                        { left: '6 Balon Udara (🎈🎈🎈🎈🎈🎈)', right: 'Angka 6' },
                                        { left: '10 Jari Tangan Lengkap (🖐️🖐️)', right: 'Angka 10' },
                                    ],
                                },
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kapan kamu melihat sesuatu yang jumlahnya nol di sekitarmu?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Hitunglah secara berurutan mundur dari sepuluh ke nol: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0! Rekam suaramu.',
                    },
                ],
            },
            {
                title: 'Membandingkan dan Mengurutkan Bilangan 1 sampai 10',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat membandingkan dua kelompok benda menggunakan kata "lebih banyak", "lebih sedikit", atau "sama banyak", serta mengurutkan bilangan dari yang terkecil atau terbesar.',
                allocated_minutes: 70,
                required_materials: ['Kartu angka 1-10', 'Batu kerikil/kancing baju dalam dua mangkuk'],
                content_text: `# ⚖️ Timbangan Angka: Mana yang Lebih Banyak?

Saat kamu punya dua piring berisi buah, bagaimana cara tahu piring mana yang isinya paling banyak? 🍇🍓  
Ayo pasangkan benda-benda itu satu per satu!

---

### 🔍 1. Tiga Kata Kunci Perbandingan:
1. **Lebih Banyak** 👉 Kelompok yang punya sisa benda lebih banyak dan tidak kehabisan teman.
2. **Lebih Sedikit** 👉 Kelompok yang habis duluan.
3. **Sama Banyak** 👉 Semua benda punya pasangan pas, tidak ada yang bersisa!

| Kelompok A | Kelompok B | Hasil Perbandingan |
| :---: | :---: | :--- |
| 🍬🍬🍬🍬🍬 (5 Permen) | 🍬🍬 (2 Permen) | 👉 **5 lebih banyak dari 2** |
| 🎈🎈🎈 (3 Balon) | 🎈🎈🎈🎈🎈🎈 (6 Balon) | 👉 **3 lebih sedikit dari 6** |
| 🍎🍎🍎🍎 (4 Apel) | 🍊🍊🍊🍊 (4 Jeruk) | 👉 **Sama banyak (4 = 4)** |

---

### 🚂 2. Kereta Api Angka: Urutkan dari Kecil ke Besar!
Semakin ke kanan arah jalannya, angkanya semakin **besar** dan bertambah banyak:

\`\`\`text
  [ 1 ] ➔ [ 2 ] ➔ [ 3 ] ➔ [ 4 ] ➔ [ 5 ] ➔ [ 6 ] ➔ [ 7 ] ➔ [ 8 ] ➔ [ 9 ] ➔ [ 10 ]
  (Paling Kecil)                                                  (Paling Besar)
\`\`\`

---

### 🎭 Komik: Siapa Juara Koleksi Kelereng?

\`\`\`text
  Boni : "Aku punya 7 butir kelereng biru!" 🔵 x7
  Made : "Aku punya 4 butir kelereng merah!" 🔴 x4
  Boni : "7 lebih banyak daripada 4! Kelerengku lebih banyak!" 👦🏆
  Made : "Betul Boni! Tapi kalau digabung, kelereng kita jadi makin banyak!" 🤝✨
\`\`\``,
                intro_guide: {
                    greeting: 'Halo pemenang cerdas! Siapa yang punya krayon lebih banyak di kelas? Mari kita buktikan!',
                    ice_breaker: 'Permainan Patung Angka: Buat kelompok beranggotakan 3 orang, lalu buat kelompok beranggotakan 5 orang!',
                    apperception: 'Bandingkan jumlah jari satu tangan (5) dengan jumlah mata kita (2). Manakah yang lebih banyak?',
                    trigger_question: 'Mana yang kamu pilih: mendapat 3 permen atau mendapat 7 permen? Mengapa?',
                },
                mindful_guide: {
                    concept_focus: 'Perbandingan kuantitas melalui pemasangan berpasangan (one-to-one correspondence matching).',
                    concrete_steps: [
                        'Letakkan 4 balok merah di baris atas dan 6 balok biru di baris bawah.',
                        'Hubungkan balok merah dan biru satu per satu secara vertikal.',
                        'Tunjukkan bahwa ada 2 balok biru yang tidak punya teman, artinya 6 lebih banyak dari 4.',
                    ],
                    script_parent: '"Coba pasangkan sendok dan garpu ini. Apakah jumlah sendoknya lebih banyak atau sama banyak?"',
                },
                joyful_guide: {
                    game_title: 'Kartu Perang Angka Raksasa',
                    game_rules: [
                        'Dua anak masing-masing memegang tumpukan kartu angka 1-10 secara tertutup.',
                        'Secara serentak, kedua anak membuka satu kartu teratas ke meja.',
                        'Anak yang kartunya bernilai lebih besar berteriak "Lebih Besar!" dan mengambil kedua kartu tersebut.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membandingkan angka dengan bantuan deretan manik-manik nyata.',
                        child_level_advanced: 'Mampu menyusun 4 angka acak dari urutan terkecil ke terbesar secara mandiri.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Membandingkan jumlah dua kumpulan gambar dan mengurutkan angka.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.3: Membandingkan dan Mengurutkan Angka 1-10',
                        instructions: 'Tuliskan "lebih banyak" atau "lebih sedikit" dan urutkan bilangan di bawahnya.',
                        section_a_basic: [
                            {
                                type: 'MATH_PROBLEM',
                                question: '7 kue donat ... daripada 4 kue donat. (Isi: lebih banyak / lebih sedikit)',
                                answer_key: 'lebih banyak',
                            },
                            {
                                type: 'MATH_PROBLEM',
                                question: '3 apel ... daripada 8 jeruk. (Isi: lebih banyak / lebih sedikit)',
                                answer_key: 'lebih sedikit',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Urutkan angka berikut dari yang paling kecil: 8, 3, 5, 1',
                                answer_key: '1, 3, 5, 8',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana caramu tahu bahwa angka 8 lebih besar daripada angka 5?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Tuliskan urutan angka 1 sampai 10 di buku tulismu dari yang terkecil ke terbesar, hias dengan krayon indah, lalu foto hasilnya!',
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // BAB 2: IKATAN BILANGAN (NUMBER BONDS) & PASANGAN ANGKA
    // =========================================================================
    {
        title: 'Bab 2: Ikatan Bilangan (Number Bonds) dan Pasangan Angka',
        order_index: 2,
        target_semester: 1,
        week_target: 4,
        lessons: [
            {
                title: 'Konsep Whole dan Parts (Keseluruhan dan Bagian)',
                order_index: 1,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat memahami konsep bahwa suatu bilangan utuh (whole) dapat dipecah menjadi dua bagian (parts) atau lebih menggunakan model ikatan bilangan.',
                allocated_minutes: 70,
                required_materials: ['5 balok lego/kancing', 'Piring kertas yang digambar 3 lingkaran bercabang'],
                content_text: `# 🌳 Pohon Rahasia Ikatan Bilangan (Number Bonds)!

Bayangkan sebuah pohon ajaib yang punya cabang-cabang buah lezat.  
Satu buah besar yang utuh bisa kita bagi ke dalam dua piring kecil! 🍎🍽️

---

### 🧩 1. Apa itu "Utuh" (Whole) dan "Bagian" (Parts)?
* **Utuh (Whole)** 👉 Jumlah seluruh benda mula-mula.
* **Bagian (Parts)** 👉 Benda yang dipisah ke dalam kantong-kantong kecil.

\`\`\`text
                 [ 5 ]  <--- UTUH (Whole: 5 Jeruk)
                /     \\
         BAGIAN       BAGIAN
         (Part 1)     (Part 2)
          [ 3 ]        [ 2 ]
\`\`\`

Lihat! Jeruknya tidak hilang dan tidak bertambah.  
Hanya berpindah kamar saja: **3 dan 2 tetap menjadi 5!**

---

### 🎨 2. Variasi Membagi 4 Kue Donat 🍩
Berapa cara kamu membagi 4 kue donat ke 2 piring?
* Piring kiri isi **3**, piring kanan isi **1** *(3 dan 1 jadi 4)*
* Piring kiri isi **2**, piring kanan isi **2** *(2 dan 2 jadi 4 — Pasangan Kembar!)*
* Piring kiri isi **4**, piring kanan isi **0** *(4 dan 0 tetap 4)*

---

### 🎭 Komik: Boni Membagi Jeruk untuk Kimi

\`\`\`text
  Boni : "Kimi, aku punya 5 jeruk utuh di keranjang!" 🍊x5
  Kimi : "Boleh aku minta bagian untukku?" 😸
  Boni : "Tentu! 2 jeruk untuk Kimi, dan 3 jeruk untuk Boni!" 
  Kimi : "Meow! 2 dan 3 kalau digabung kembali utuh jadi 5 jeruk!" 🎉
\`\`\``,
                intro_guide: {
                    greeting: 'Selamat pagi penjelajah cilik! Hari ini kita akan membagi harta karun menjadi dua kantong rahasia.',
                    ice_breaker: 'Kepalkan 4 jarimu di tangan kiri dan 1 jari di tangan kanan. Gabungkan keduanya: jadi berapa?',
                    apperception: 'Tunjukkan sebuah biskuit utuh, lalu patahkan menjadi 2 bagian di depan anak.',
                    trigger_question: 'Jika kamu punya 5 mainan mobil-mobilan dan memberikan 1 ke adikmu, berapa yang tersisa di tanganmu?',
                },
                mindful_guide: {
                    concept_focus: 'Hubungan bagian dan keseluruhan (Part-Part-Whole Schema).',
                    concrete_steps: [
                        'Taruh 5 kelereng di lingkaran atas (lingkaran Whole).',
                        'Geser 3 kelereng meluncur lewat garis cabang ke lingkaran kiri (Part 1).',
                        'Geser 2 kelereng sisanya meluncur ke lingkaran kanan (Part 2).',
                    ],
                    script_parent: '"Coba perhatikan sayang, jumlah kelerengnya tidak bertambah dan tidak berkurang, hanya berpindah kamar saja!"',
                },
                joyful_guide: {
                    game_title: 'Tembak Sasaran Dua Keranjang',
                    game_rules: [
                        'Sediakan 5 bola kertas kecil dan dua keranjang plastik di lantai.',
                        'Anak melempar seluruh 5 bola: hitung berapa yang masuk keranjang kiri dan keranjang kanan.',
                        'Buat diagram ikatan bilangannya di papan tulis mini!',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menggunakan bilangan kecil sampai 3 atau 4 terlebih dahulu.',
                        child_level_advanced: 'Mampu menemukan 3 cara berbeda untuk membagi angka 5 (4&1, 3&2, 5&0).',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Melengkapi bagian diagram ikatan bilangan berdasarkan representasi visual nyata.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: Menemukan Bagian dan Keseluruhan',
                        instructions: 'Lengkapilah diagram lingkaran ikatan bilangan di bawah ini dengan angka yang benar.',
                        section_a_basic: [
                            {
                                type: 'NUMBER_BOND',
                                question: 'Lengkapi bagian lingkaran yang kosong berikut:',
                                answer_key: '2',
                                data: { whole: 5, part1: 3, part2: '?' },
                            },
                            {
                                type: 'NUMBER_BOND',
                                question: 'Berapakah jumlah keseluruhan (Whole) dari bagian 1 dan 3?',
                                answer_key: '4',
                                data: { whole: '?', part1: 1, part2: 3 },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'NUMBER_BOND',
                                question: 'Tuliskan dua bagian berbeda yang membentuk angka 6:',
                                answer_key: 'Misalnya 4 dan 2 (atau 5 dan 1)',
                                data: { whole: 6, part1: '?', part2: '?' },
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa yang terjadi jika kedua bagian pada diagram ikatan bilangan digabungkan kembali?',
                    ],
                },
                assignments: [
                    {
                        type: 'PHOTO_HOMEWORK',
                        prompt: 'Gambarkan diagram 1 lingkaran besar dan 2 lingkaran cabang di kertas, taruh benda nyata (misal: 4 kerupuk terbagi 3 dan 1), lalu foto hasilnya!',
                    },
                ],
            },
            {
                title: 'Pasangan Bilangan Pembuat 10 (Friends of 10)',
                order_index: 2,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat mengidentifikasi seluruh kombinasi pasangan bilangan yang jika digabungkan menghasilkan bilangan 10 secara otomatis dan cepat.',
                allocated_minutes: 70,
                required_materials: ['10 kancing dua warna', 'Kotak Sepuluh (Ten-Frame) plastik/kertas', 'Kartu angka 1-10'],
                content_text: `# 🤝 Sahabat Sejati Pembuat Angka 10!

Tahukah kamu rahasia berhitung secepat kilat?  
Kuncinya adalah menghafal **"Sahabat 10"**! Dua angka yang selalu kompak membentuk angka sepuluh yang sempurna! 🔟✨

---

### 💖 1. Hafalkan Sahabat 10 yang Kompak Ini:

| Sahabat Kiri | Sahabat Kanan | Hasil Penggabungan | Mengapa Mudah Diingat? |
| :---: | :---: | :---: | :--- |
| **1** | **9** | **10** | Satu dan sembilan sahabat karib! |
| **2** | **8** | **10** | Dua dan delapan selalu berpasangan! |
| **3** | **7** | **10** | Tiga dan tujuh teman bermain! |
| **4** | **6** | **10** | Empat dan enam selalu kompak! |
| **5** | **5** | **10** | **Pasangan Kembar Lima-Lima!** 🖐️🖐️ |

---

### 🔲 2. Kotak Sepuluh (Ten-Frame) Ajaib
Lihat kotak 10 yang terisi 7 kelereng biru berikut:
* Kotak yang sudah terisi ada **7**.
* Kotak yang masih kosong melompong ada **3**.
* Berarti: **7 butuh 3 agar genap jadi 10!**

---

### 🎭 Komik: Tebak Cepat Sahabat Sepuluh

\`\`\`text
  Boni : "Kimi, aku sebutkan angka 4! Siapa temannya biar jadi 10?" 👦
  Kimi : "Meow! Temannya adalah 6!" 😸
  Boni : "Hebat! Kalau aku sebut angka 8?"
  Kimi : "Temannya adalah 2! Empat dan enam, dua dan delapan!" 🎉
\`\`\`

---

### 💡 Rahasia Jari Tanganmu:
Angkat 10 jarimu. Lipat 3 jarimu ke bawah.  
Hitung jari yang masih berdiri: **pasti ada 7 jari!**  
Karena 3 dan 7 adalah sahabat 10! 🚀`,
                intro_guide: {
                    greeting: 'Halo jagoan matematika! Siapa yang ingin punya kekuatan super menghitung cepat dalam hitungan detik?',
                    ice_breaker: 'Angkat 10 jari tanganmu. Lipat 3 jarimu. Berapa jari yang masih berdiri tegak? Tujuh!',
                    apperception: 'Ingatkan anak bahwa manusia punya 10 jari tangan: 5 di kiri dan 5 di kanan.',
                    trigger_question: 'Jika di dalam bis ada 8 orang penumpang, butuh berapa orang lagi agar kursinya penuh 10?',
                },
                mindful_guide: {
                    concept_focus: 'Komplementer basis 10 menggunakan media visual Ten-Frame.',
                    concrete_steps: [
                        'Sediakan Ten-Frame (bingkai 2 baris × 5 kotak).',
                        'Isi 6 kotak pertama dengan kancing merah.',
                        'Minta anak mengisi kotak yang masih kosong dengan kancing biru (ada 4 kotak kosong). Maka 6 + 4 = 10.',
                    ],
                    script_parent: '"Lihat sepuluh kotak ini sayang. Yang merah ada 6, berarti butuh berapa kancing biru lagi biar penuh?"',
                },
                joyful_guide: {
                    game_title: 'Permainan Tepuk Tangan Sahabat 10',
                    game_rules: [
                        'Guru/Orang tua menyerukan angka: "Tiga!" sambil bertepuk tangan.',
                        'Anak harus segera membalas menyerukan pasangannya: "Tujuh!" sambil membalas tepuk tangan.',
                        'Lakukan bergantian semakin lama semakin cepat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Anak masih boleh melihat bantuan jari tangannya yang dilipat.',
                        child_level_advanced: 'Anak menjawab secara instan dan spontan tanpa jeda berpikir.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Melengkapi pasangan pembuat angka 10 pada lembar kerja bergambar.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: Rahasia Pasangan Angka 10',
                        instructions: 'Lengkapilah pasangan angka di bawah ini agar menghasilkan angka 10.',
                        section_a_basic: [
                            {
                                type: 'NUMBER_BOND',
                                question: 'Lengkapi sahabat angka 10 berikut:',
                                answer_key: '2',
                                data: { whole: 10, part1: 8, part2: '?' },
                            },
                            {
                                type: 'TEN_FRAME',
                                question: 'Berapa bulatan lagi yang harus digambar agar bingkai sepuluh ini penuh?',
                                answer_key: '3',
                                data: { frames: [{ filled: 7 }] },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'MATH_PROBLEM',
                                question: 'Boni punya 4 pensil. Berapa pensil lagi yang harus dibeli Boni agar genap menjadi 10 pensil?',
                                answer_key: '6 pensil',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Pasangan angka 10 mana yang paling mudah kamu ingat di kepala?',
                    ],
                },
                assignments: [
                    {
                        type: 'VOICE_TASK',
                        prompt: 'Sebutkan dengan suara lantang dan penuh semangat: "Sahabat 10 adalah 1 dan 9, 2 dan 8, 3 dan 7, 4 dan 6, 5 dan 5!"',
                    },
                ],
            },
            {
                title: 'Mendekomposisi Bilangan 6 sampai 9',
                order_index: 3,
                content_type: 'TEXT',
                learning_objectives: 'Siswa dapat menguraikan bilangan antara 6 sampai 9 menjadi berbagai variasi pasangan angka menggunakan benda konkret.',
                allocated_minutes: 70,
                required_materials: ['8 penjepit jemuran baju', 'Gantungan baju (hanger kawat)', 'Kertas label'],
                content_text: `# 🌈 Satu Angka, Banyak Pasangan Rahasianya!

Tahukah kamu, sebuah angka bisa dipecah menjadi banyak pasangan yang berbeda-beda?  
Mari kita selidiki rahasia pemecahan **Angka 7**: 🔍✨

---

### 🧩 1. Empat Cara Membentuk Angka 7

\`\`\`text
       [ 7 ]                [ 7 ]                [ 7 ]                [ 7 ]
      /     \\              /     \\              /     \\              /     \\
    [ 6 ]   [ 1 ]        [ 5 ]   [ 2 ]        [ 4 ]   [ 3 ]        [ 7 ]   [ 0 ]
\`\`\`

* **6 dan 1** digabung menjadi 7
* **5 dan 2** digabung menjadi 7
* **4 dan 3** digabung menjadi 7
* **7 dan 0** tetap bernilai 7

Semua jalurnya menghasilkan angka 7 yang sama! Keren sekali, kan?

---

### 🧺 2. Eksperimen Gantungan Jemuran Ajaib
Ambil gantungan baju dan 8 penjepit jemuran:
* Geser 4 jepit ke kiri dan 4 jepit ke kanan ➔ **4 dan 4 jadi 8 (Pasangan Kembar!)**
* Geser 5 jepit ke kiri dan 3 jepit ke kanan ➔ **5 dan 3 jadi 8**
* Geser 6 jepit ke kiri dan 2 jepit ke kanan ➔ **6 dan 2 jadi 8**

Jumlah seluruh jepit jemuran tidak berkurang, tetap berjumlah **8 buah**!`,
                intro_guide: {
                    greeting: 'Selamat pagi ilmuwan cilik! Hari ini kita akan memecah angka menjadi banyak kombinasi warna-warni.',
                    ice_breaker: 'Pegang gantungan baju, jepitkan 3 jepit jemuran di kiri dan 3 di kanan. Berapa totalnya? Enam!',
                    apperception: 'Tanyakan kepada anak bagaimana cara membagi 6 permen secara adil kepada 2 orang anak.',
                    trigger_question: 'Apakah angka 8 bisa dibuat dari angka 4 dan 4? Bagaimana kalau 5 dan 3?',
                },
                mindful_guide: {
                    concept_focus: 'Dekomposisi fleksibel bilangan 6-9.',
                    concrete_steps: [
                        'Jepitkan 8 jepit jemuran di sebuah gantungan pakaian.',
                        'Geser beberapa jepit ke kiri dan sisanya ke kanan.',
                        'Ajak anak mencatat kombinasi yang muncul: 7&1, 6&2, 5&3, 4&4.',
                    ],
                    script_parent: '"Lihat gantungan jemuran ini sayang. Jika kita geser satu ke kanan, yang di kiri berkurang satu tapi totalnya tetap sama!"',
                },
                joyful_guide: {
                    game_title: 'Goyang Dadu Angka Kembar',
                    game_rules: [
                        'Kocok dua buah dadu secara bersamaan.',
                        'Hitung mata dadu yang muncul. Apakah jumlahnya bisa menghasilkan angka 8?',
                        'Tuliskan kombinasi penjumlahan yang kamu temukan di buku.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Fokus pada dekomposisi angka 6 dengan balok warna.',
                        child_level_advanced: 'Mampu menuliskan seluruh kombinasi dekomposisi angka 9 tanpa ada yang terlewat.',
                    },
                },
                meaningful_guide: {
                    task_focus: 'Menguraikan bilangan 6 sampai 9 menjadi dua bagian yang benar.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.3: Mengurai Bilangan 6 sampai 9',
                        instructions: 'Lengkapilah diagram ikatan bilangan di bawah ini.',
                        section_a_basic: [
                            {
                                type: 'NUMBER_BOND',
                                question: 'Lengkapi pecahan angka 8 berikut:',
                                answer_key: '5',
                                data: { whole: 8, part1: 3, part2: '?' },
                            },
                            {
                                type: 'NUMBER_BOND',
                                question: 'Lengkapi pecahan angka 7 berikut:',
                                answer_key: '2',
                                data: { whole: 7, part1: 5, part2: '?' },
                            },
                        ],
                        section_b_enrichment: [
                            {
                                type: 'NUMBER_BOND',
                                question: 'Tuliskan dua angka kembar yang jika digabungkan menjadi 8:',
                                answer_key: '4 dan 4',
                                data: { whole: 8, part1: '?', part2: '?' },
                            },
                        ],
                    },
                    reflection_questions: [
                        'Menurutmu, apakah angka 8 lebih mudah dipecah jadi 4 dan 4 atau 7 dan 1?',
                    ],
                },
                assignments: [
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Kuis Evaluasi: Ikatan Bilangan 1-10',
                        quiz_question_count: 3,
                        passing_score: 70,
                        quiz_questions: [
                            {
                                question_text: 'Pasangan bilangan pembuat 10 untuk angka 6 adalah...',
                                option_a: '2',
                                option_b: '3',
                                option_c: '4',
                                option_d: '5',
                                correct_answer: 'C',
                                explanation: '6 + 4 = 10. Pasangan dari 6 adalah 4.',
                            },
                            {
                                question_text: 'Jika sebuah bilangan utuh adalah 7, dan satu bagiannya adalah 5, maka bagian lainnya adalah...',
                                option_a: '1',
                                option_b: '2',
                                option_c: '3',
                                option_d: '4',
                                correct_answer: 'B',
                                explanation: '7 dikurangi 5 adalah 2. Jadi bagian lainnya adalah 2.',
                            },
                            {
                                question_text: 'Dua bilangan kembar yang jika digabungkan menghasilkan 10 adalah...',
                                option_a: '3 dan 3',
                                option_b: '4 dan 4',
                                option_c: '5 dan 5',
                                option_d: '6 dan 6',
                                correct_answer: 'C',
                                explanation: '5 + 5 = 10.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];