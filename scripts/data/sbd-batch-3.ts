// data/sbd-batch-3.ts
// Bab 5-6: Seni Tari (Waktu & Tenaga) & Seni Teater (Pantomim) (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 5: SENI TARI — AYO MENARI DENGAN WAKTU & TENAGA
// =============================================================================
const BAB_5: SeedModuleItem = {
    title: 'Bab 5: Seni Tari — Ayo Menari dengan Waktu & Tenaga',
    order_index: 5,
    target_semester: 2,
    week_target: 9,
    lessons: [
        {
            title: 'Pertemuan 9: Ayo Menari Cepat & Lambat!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal gerak cepat & lambat dalam tari serta menari sesuai irama.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Musik tempo cepat & lambat',
                'LKPD',
            ],
            content_text: `# 🎵 Ayo Menari Cepat & Lambat!

Halo sahabat cilik! Menari bisa **cepat** atau **lambat**! 
Ayo **Maryam** dan **Maheer** ajak kalian belajar! 🎉

---

### 🌟 1. Dua Tempo Menari

| Tempo | Gerakan | Contoh | Emoji |
| :---: | :--- | :--- | :---: |
| **Cepat** | Lincah | Lompat, putar | 🏃 |
| **Lambat** | Tenang | Ayun tangan, langkah lembut | 🍃 |

---

### 🎭 Komik: Maryam & Maheer Menari Tempo

\`\`\`text
  Maryam : "Maheer, ayo menari cepat!" 🏃👧
  Maheer : "Lompat-lompat, putar-putar!" 💫👦
  Maryam : "Sekarang lambat! Lembut!" 🍃
  Maheer : "Mengayun pelan... tenang..." 🌊
  Asiya  : "Aku suka keduanya!" 💃👧
  Khadijah: "Tempo bikin tari hidup!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tempo dalam tari:
1. **Cepat** = lincah 🏃
2. **Lambat** = tenang 🍃

Keduanya bisa **dikombinasikan**! 🎵

---

### 🔍 Ayo Coba Sendiri:
* Menari **cepat** seperti lompat! 🏃
* Menari **lambat** seperti mengayun! 🍃
* Gabungkan keduanya! 🎵

Ayo jadi **Penari Berirama**! 🎵✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita menari cepat & lambat!',
                ice_breaker:
                    'Ayo tepuk tangan cepat, lalu tepuk tangan lambat!',
                apperception:
                    'Kapan kamu bergerak cepat? Kapan lambat?',
                trigger_question:
                    'Kapan kamu bergerak cepat? Kapan kamu bergerak lambat?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tempo tari: cepat (lincah) & lambat (tenang).',
                concrete_steps: [
                    'Jelaskan tempo cepat dengan contoh lompat.',
                    'Jelaskan tempo lambat dengan contoh mengayun.',
                    'Contohkan gerak cepat.',
                    'Contohkan gerak lambat.',
                    'Anak menirukan keduanya.',
                ],
                script_parent:
                    '"Cepat atau lambat, dua-duanya indah!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tari Cepat-Lambat',
                game_rules: [
                    'Guru memutar musik tempo cepat & lambat.',
                    'Anak menari sesuai tempo.',
                    'Yang paling harmonis dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Ikuti gerakan guru tempo jelas.',
                    child_level_advanced: 'Ciptakan variasi sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan tempo tari.',
                worksheet_print_ready: {
                    title: 'LKPD 5.1: Ayo Menari Cepat & Lambat!',
                    instructions:
                        'Peragakan kedua tempo, lalu centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'BODY_MOVEMENT_CARD',
                            question:
                                'Peragakan gerakan tempo berikut!',
                            data: {
                                movements: [
                                    {
                                        name: 'Gerak Cepat',
                                        icon: '🏃‍♂️',
                                        instruction: 'Melompat & berputar mengikuti musik cepat.',
                                    },
                                    {
                                        name: 'Gerak Lambat',
                                        icon: '🍃',
                                        instruction: 'Mengayun tangan & melangkah lembut mengikuti musik lambat.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan kedua tempo.',
                            explanation: 'Mengenal tempo tari.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu menari cepat atau lambat (favoritmu)!',
                            data: {
                                prompt: 'Menari tempo favorit',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku menari tempo favorit:',
                            },
                            answer_key: 'Anak menggambar diri menari.',
                            explanation: 'Mengasah refleksi diri.',
                        },
                    ],
                },
                reflection_questions: [
                    'Tempo mana yang lebih mudah, sayang?',
                    'Tempo mana yang lebih seru?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan contoh gerak cepat & lambat!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 5: Tempo Tari',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Gerakan melompat termasuk gerak...',
                            option_a: 'Lambat',
                            option_b: 'Cepat',
                            option_c: 'Diam',
                            option_d: 'Tidur',
                            correct_answer: 'B',
                            explanation: 'Lompat = cepat.',
                        },
                        {
                            question_text: 'Gerakan mengayun lembut termasuk...',
                            option_a: 'Cepat',
                            option_b: 'Lambat',
                            option_c: 'Keras',
                            option_d: 'Kaku',
                            correct_answer: 'B',
                            explanation: 'Ayun lembut = lambat.',
                        },
                        {
                            question_text: 'Saat menari, gerakan harus sesuai...',
                            option_a: 'Warna baju',
                            option_b: 'Irama musik',
                            option_c: 'Jumlah teman',
                            option_d: 'Hari',
                            correct_answer: 'B',
                            explanation: 'Sesuai irama musik.',
                        },
                        {
                            question_text: 'Gerak cepat & lambat dapat...',
                            option_a: 'Dikombinasikan',
                            option_b: 'Dipisahkan',
                            option_c: 'Diabaikan',
                            option_d: 'Dihapus',
                            correct_answer: 'A',
                            explanation: 'Bisa dikombinasikan.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Pertemuan 10: Ayo Menari dengan Tenaga!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal 3 jenis tenaga dalam tari (lemah, sedang, kuat) dan mempraktikkannya.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Musik pengiring bervariasi',
                'LKPD',
            ],
            content_text: `# 💪 Ayo Menari dengan Tenaga!

Halo sahabat cilik! Saat menari, kita pakai **tenaga berbeda**! 
Ayo **Asiya** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Tiga Jenis Tenaga

| Tenaga | Gerakan | Contoh | Emoji |
| :---: | :--- | :--- | :---: |
| **Lemah** | Halus | Mengambang | 🕊️ |
| **Sedang** | Wajar | Melambai | 💫 |
| **Kuat** | Tegas | Mendorong | 💪 |

---

### 🎭 Komik: Asiya & Fatimah Menari Tenaga

\`\`\`text
  Asiya  : "Fatimah, coba tenaga lemah!" 🕊️👧
  Fatimah: "Lembut... seperti kapas!" ☁️👧
  Asiya  : "Sekarang sedang! Wajar saja!" 💫
  Fatimah: "Seperti melambai biasa!" 👋
  Maheer : "Aku pakai tenaga kuat! Hah!" 💪👦
  Khadijah: "Tenaga bikin tari beda!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Tiga tenaga dalam tari:
1. **Lemah** = halus 🕊️
2. **Sedang** = wajar 💫
3. **Kuat** = tegas 💪

---

### 🔍 Ayo Coba Sendiri:
* Menari dengan tenaga **lemah**! 🕊️
* Menari dengan tenaga **sedang**! 💫
* Menari dengan tenaga **kuat**! 💪

Ayo jadi **Penari Bertenaga**! 💪✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita menari dengan tenaga!',
                ice_breaker:
                    'Ayo angkat tangan dengan tenaga kuat: "Hah!"',
                apperception:
                    'Kapan kamu pakai tenaga kuat? Kapan lemah?',
                trigger_question:
                    'Kapan kamu bergerak dengan tenaga kuat? Kapan dengan tenaga lemah?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tiga tenaga tari: lemah (halus), sedang (wajar), kuat (tegas).',
                concrete_steps: [
                    'Contohkan tenaga lemah.',
                    'Contohkan tenaga sedang.',
                    'Contohkan tenaga kuat.',
                    'Anak menirukan ketiganya.',
                    'Beri apresiasi.',
                ],
                script_parent:
                    '"Tenaga kita bisa berubah! Ada lembut, ada tegas!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Tenaga',
                game_rules: [
                    'Anak memperagakan gerakan.',
                    'Teman menebak jenis tenaganya.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Ikuti gerakan guru.',
                    child_level_advanced: 'Ciptakan kombinasi 3 tenaga.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan 3 tenaga.',
                worksheet_print_ready: {
                    title: 'LKPD 5.2: Ayo Menari dengan Tenaga!',
                    instructions:
                        'Peragakan 3 jenis tenaga, lalu centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'BODY_MOVEMENT_CARD',
                            question:
                                'Peragakan 3 jenis tenaga berikut!',
                            data: {
                                movements: [
                                    {
                                        name: 'Tenaga Lemah',
                                        icon: '🕊️',
                                        instruction: 'Gerakkan tangan sangat lembut, seperti mengambang.',
                                    },
                                    {
                                        name: 'Tenaga Sedang',
                                        icon: '💫',
                                        instruction: 'Gerakkan tangan seperti melambai biasa.',
                                    },
                                    {
                                        name: 'Tenaga Kuat',
                                        icon: '💪',
                                        instruction: 'Gerakkan tangan tegas, seperti mendorong pintu.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan ketiga tenaga.',
                            explanation: 'Mengenal variasi tenaga.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu menari dengan tenaga kuat (seperti superhero)!',
                            data: {
                                prompt: 'Menari tenaga kuat',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku menari tenaga kuat:',
                            },
                            answer_key: 'Anak menggambar diri bertenaga.',
                            explanation: 'Mengasah imajinasi gerak.',
                        },
                    ],
                },
                reflection_questions: [
                    'Tenaga apa yang paling mudah, sayang?',
                    'Tenaga apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil karya pada LKPD 5.2, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 5: Tenaga Tari',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Tenaga dalam tari dibagi menjadi berapa jenis?',
                            option_a: '1',
                            option_b: '2',
                            option_c: '3',
                            option_d: '4',
                            correct_answer: 'C',
                            explanation: 'Tenaga: lemah, sedang, kuat.',
                        },
                        {
                            question_text: 'Contoh gerakan tenaga lemah adalah...',
                            option_a: 'Memukul drum',
                            option_b: 'Mengayun lembut',
                            option_c: 'Melompat tinggi',
                            option_d: 'Berlari cepat',
                            correct_answer: 'B',
                            explanation: 'Ayun lembut = lemah.',
                        },
                        {
                            question_text: 'Contoh gerakan tenaga kuat adalah...',
                            option_a: 'Menari seperti kupu-kupu',
                            option_b: 'Mendorong dengan tegas',
                            option_c: 'Melangkah pelan',
                            option_d: 'Menutup mata',
                            correct_answer: 'B',
                            explanation: 'Mendorong = kuat.',
                        },
                        {
                            question_text: 'Tenaga dalam tari memengaruhi...',
                            option_a: 'Warna baju',
                            option_b: 'Ekspresi & kesan tarian',
                            option_c: 'Jumlah penonton',
                            option_d: 'Cuaca',
                            correct_answer: 'B',
                            explanation: 'Memengaruhi ekspresi tari.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 6: SENI TEATER — BERKREASI DALAM PANTOMIM
// =============================================================================
const BAB_6: SeedModuleItem = {
    title: 'Bab 6: Seni Teater — Berkreasi dalam Pantomim',
    order_index: 6,
    target_semester: 2,
    week_target: 11,
    lessons: [
        {
            title: 'Pertemuan 11: Ayo Bermain Pantomim!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal pantomim & memperagakan gerakan tanpa bicara.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Kartu skenario',
                'LKPD',
            ],
            content_text: `# 🎭 Ayo Bermain Pantomim!

Halo sahabat cilik! **Pantomim** adalah seni bercerita **tanpa bicara**! 
Ayo **Maryam** dan **Fatimah** ajak kalian bermain! 🎉

---

### 🌟 1. Apa Itu Pantomim?

**Pantomim** = seni pertunjukan **tanpa bicara**, tapi **bergerak**!
Pemain bercerita dengan **gerakan tubuh** & **ekspresi wajah**.

**Bedanya dengan Tablo:**
* **Tablo** = membeku (diam) 🧊
* **Pantomim** = bergerak aktif 🏃

**Contoh Pantomim:**
* Makan es krim 🍦
* Bermain bola ⚽
* Berjalan di jalan licin 🥿

---

### 🎭 Komik: Maryam & Fatimah Pantomim

\`\`\`text
  Maryam : "Fatimah, ayo pantomim!" 🎭👧
  Fatimah: "Aku pura-pura makan es krim!" 🍦👧
  Maryam : "Jilat... nyam nyam... enak!" 😋
  Fatimah: "Sekarang kamu!" 
  Maryam : "Aku pura-pura menendang bola!" ⚽
  Maheer : "Aku pura-pura jalan licin!" 🥿👦
  Khadijah: "Pantomim seru sekali!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Pantomim:
1. **Tanpa bicara** 🤫
2. **Bergerak aktif** 🏃
3. **Pakai ekspresi wajah** 😊

---

### 🔍 Ayo Coba Sendiri:
* Pantomim **makan es krim**! 🍦
* Pantomim **main bola**! ⚽
* Pantomim **jalan licin**! 🥿

Ayo jadi **Pemain Pantomim**! 🎭✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita bermain pantomim!',
                ice_breaker:
                    'Ayo tirukan gerakan hewan tanpa suara!',
                apperception:
                    'Pernahkah kalian lihat orang bercerita tanpa bicara?',
                trigger_question:
                    'Bagaimana cara menyampaikan cerita tanpa bicara?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Pantomim = bercerita tanpa bicara, dengan gerakan & ekspresi.',
                concrete_steps: [
                    'Jelaskan konsep pantomim.',
                    'Contohkan makan es krim.',
                    'Contohkan main bola.',
                    'Anak menirukan gerakan.',
                    'Beri apresiasi.',
                ],
                script_parent:
                    '"Pantomim bercerita tanpa suara! Cukup gerak & ekspresi!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Pantomim Berpasangan',
                game_rules: [
                    'Anak dibagi berpasangan.',
                    'Satu anak memperagakan, satu menebak.',
                    'Yang paling cepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Peragakan 1 skenario sederhana.',
                    child_level_advanced: 'Peragakan skenario kompleks.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan pantomim.',
                worksheet_print_ready: {
                    title: 'LKPD 6.1: Ayo Bermain Pantomim!',
                    instructions:
                        'Peragakan pantomim berikut tanpa bicara! Centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MIMESIS_ACTION',
                            question:
                                'Peragakan pantomim berikut tanpa bicara!',
                            data: {
                                actions: [
                                    {
                                        name: 'Makan Es Krim',
                                        icon: '🍦',
                                        description: 'Gerakkan tangan seperti memegang es krim & jilat.',
                                    },
                                    {
                                        name: 'Bermain Bola',
                                        icon: '⚽',
                                        description: 'Gerakkan kaki seperti menendang bola.',
                                    },
                                    {
                                        name: 'Berjalan di Jalan Licin',
                                        icon: '🥿',
                                        description: 'Jalan hati-hati sambil merentangkan tangan.',
                                    },
                                    {
                                        name: 'Menangis',
                                        icon: '😢',
                                        description: 'Usap mata & tunjukkan ekspresi sedih.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan semua pantomim.',
                            explanation: 'Mengenal gerak pantomim.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu sedang bermain pantomim!',
                            data: {
                                prompt: 'Aku bermain pantomim',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku bermain pantomim:',
                            },
                            answer_key: 'Anak menggambar diri pantomim.',
                            explanation: 'Mengasah imajinasi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana rasanya pantomim tanpa bicara, sayang?',
                    'Gerakan mana yang paling seru?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil karya pada LKPD 6.1, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 6: Bermain Pantomim',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Pantomim adalah seni pertunjukan tanpa...',
                            option_a: 'Gerakan',
                            option_b: 'Bicara',
                            option_c: 'Ekspresi',
                            option_d: 'Perasaan',
                            correct_answer: 'B',
                            explanation: 'Pantomim tanpa bicara.',
                        },
                        {
                            question_text: 'Pantomim menggunakan... untuk bercerita',
                            option_a: 'Kata-kata',
                            option_b: 'Gerakan & ekspresi',
                            option_c: 'Angka',
                            option_d: 'Tulisan',
                            correct_answer: 'B',
                            explanation: 'Gerak & ekspresi.',
                        },
                        {
                            question_text: 'Contoh gerakan pantomim adalah...',
                            option_a: 'Berbicara di telepon',
                            option_b: 'Pura-pura makan es krim',
                            option_c: 'Menyanyi',
                            option_d: 'Bercerita panjang',
                            correct_answer: 'B',
                            explanation: 'Makan es krim = pantomim.',
                        },
                        {
                            question_text: 'Manfaat bermain pantomim adalah...',
                            option_a: 'Membosankan',
                            option_b: 'Melatih keberanian & ekspresi',
                            option_c: 'Membuat takut',
                            option_d: 'Membuat lelah saja',
                            correct_answer: 'B',
                            explanation: 'Melatih keberanian.',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Pertemuan 12: Ayo Pantomim Bersama Kelompok!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat memperagakan pantomim pekerjaan sehari-hari bersama kelompok.',
            allocated_minutes: 45,
            required_materials: [
                'Ruang kelas yang lapang',
                'Kartu pekerjaan',
                'Properti sederhana',
                'LKPD',
            ],
            content_text: `# 🤝 Ayo Pantomim Bersama Kelompok!

Halo sahabat cilik! Sekarang kita pantomim **bersama kelompok**! 
Ayo **Asiya** dan **Maheer** ajak kalian! 🎉

---

### 🌟 1. Pantomim Pekerjaan Sehari-hari

| Pekerjaan | Gerakan | Emoji |
| :---: | :--- | :---: |
| **Menyapu** | Pegang sapu, gesek lantai | 🧹 |
| **Mencuci piring** | Gosok, bilas | 🧼 |
| **Memasak** | Aduk, cicipi | 🍳 |
| **Menimba air** | Tarik tali | 🪣 |

---

### 🎭 Komik: Asiya & Maheer Pantomim Kelompok

\`\`\`text
  Asiya  : "Maheer, ayo pantomim menyapu!" 🧹👧
  Maheer : "Pegang sapu imajiner... gesek-gesek!" 👦
  Asiya  : "Sekarang gantian mencuci piring!" 🧼
  Maheer : "Gosok... bilas... bersih!" 💧
  Fatimah: "Aku pantomim memasak!" 🍳👧
  Khadijah: "Kelompok kita kompak!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Pantomim pekerjaan butuh:
1. **Kerja sama kelompok** 🤝
2. **Gerakan jelas** 🎯
3. **Ekspresi sesuai** 😊

---

### 🔍 Ayo Coba Berkelompok:
* Kelompok pantomim **menyapu**! 🧹
* Kelompok pantomim **memasak**! 🍳
* Kelompok pantomim **mencuci piring**! 🧼

Ayo jadi **Pantomim Kelompok Hebat**! 🤝✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita pantomim kelompok!',
                ice_breaker:
                    'Ayo tirukan gerakan menyapu tanpa bicara!',
                apperception:
                    'Pekerjaan apa yang biasa dilakukan di rumah?',
                trigger_question:
                    'Pekerjaan apa yang bisa dipantomimkan bersama kelompok?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Pantomim pekerjaan sehari-hari: menyapu, mencuci, memasak.',
                concrete_steps: [
                    'Contohkan gerakan menyapu.',
                    'Contohkan gerakan mencuci piring.',
                    'Contohkan gerakan memasak.',
                    'Anak menirukan.',
                    'Diskusi kerja sama kelompok.',
                ],
                script_parent:
                    '"Pantomim pekerjaan butuh kerja sama! Yuk, kompak!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Pantomim Kelompok Kerja',
                game_rules: [
                    'Anak dibagi kelompok kecil.',
                    'Setiap kelompok memilih pekerjaan.',
                    'Kelompok memperagakan tanpa bicara.',
                    'Kelompok lain menebak.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Peragakan 1 gerakan sederhana.',
                    child_level_advanced: 'Urutan gerakan bercerita.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Memperagakan pantomim kelompok.',
                worksheet_print_ready: {
                    title: 'LKPD 6.2: Ayo Pantomim Bersama Kelompok!',
                    instructions:
                        'Peragakan pantomim pekerjaan berikut & centang setelah berhasil!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MIMESIS_ACTION',
                            question:
                                'Peragakan pantomim pekerjaan berikut tanpa bicara!',
                            data: {
                                actions: [
                                    {
                                        name: 'Menyapu Lantai',
                                        icon: '🧹',
                                        description: 'Pegang sapu imajiner, gesek maju-mundur.',
                                    },
                                    {
                                        name: 'Mencuci Piring',
                                        icon: '🧼',
                                        description: 'Gosok piring imajiner, bilas air.',
                                    },
                                    {
                                        name: 'Memasak',
                                        icon: '🍳',
                                        description: 'Aduk wajan imajiner, cicipi.',
                                    },
                                    {
                                        name: 'Menimba Air',
                                        icon: '🪣',
                                        description: 'Tarik tali timba dengan tenaga.',
                                    },
                                ],
                            },
                            answer_key: 'Anak memperagakan semua gerakan.',
                            explanation: 'Mengenal pantomim pekerjaan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu & kelompokmu pantomim bersama!',
                            data: {
                                prompt: 'Pantomim kelompok',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Pantomim bersama kelompokku:',
                            },
                            answer_key: 'Anak menggambar kelompok pantomim.',
                            explanation: 'Mengasah kolaborasi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Pekerjaan apa yang paling seru, sayang?',
                    'Bagaimana kerja sama kelompokmu?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil karya pada LKPD 6.2, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Akhir Seni Budaya: Pantomim Kelompok',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Pantomim menyapu menggunakan anggota tubuh...',
                            option_a: 'Kepala',
                            option_b: 'Tangan & tubuh',
                            option_c: 'Mata',
                            option_d: 'Mulut',
                            correct_answer: 'B',
                            explanation: 'Tangan & tubuh untuk menyapu.',
                        },
                        {
                            question_text: 'Untuk pantomim kelompok yang baik perlu...',
                            option_a: 'Berteriak',
                            option_b: 'Kerja sama',
                            option_c: 'Berlari',
                            option_d: 'Tidur',
                            correct_answer: 'B',
                            explanation: 'Kerja sama tim.',
                        },
                        {
                            question_text: 'Contoh pekerjaan yang dipantomimkan adalah...',
                            option_a: 'Berbicara di telepon',
                            option_b: 'Mencuci piring',
                            option_c: 'Menonton TV',
                            option_d: 'Tidur',
                            correct_answer: 'B',
                            explanation: 'Mencuci piring = pantomim.',
                        },
                        {
                            question_text: 'Manfaat pantomim kelompok adalah...',
                            option_a: 'Membosankan',
                            option_b: 'Melatih kerja sama & kreativitas',
                            option_c: 'Membuat takut',
                            option_d: 'Membuat sedih',
                            correct_answer: 'B',
                            explanation: 'Melatih kerja sama.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const SBD_BATCH_3: SeedModuleItem[] = [BAB_5, BAB_6];