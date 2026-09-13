// data/bahasa-indonesia-batch-4.ts
// Bab 7-8: Aku Suka Buku & Aku Bisa Bikin Cerita (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 7: AKU SUKA BUKU!
// =============================================================================
const BAB_7: SeedModuleItem = {
    title: 'Bab 7: Aku Suka Buku!',
    order_index: 7,
    target_semester: 2,
    week_target: 19,
    lessons: [
        {
            title: 'Pertemuan 19: Ayo Kenalan dengan Bagian Buku!',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal bagian-bagian buku (cover, judul, isi) dan fungsinya.',
            allocated_minutes: 45,
            required_materials: [
                'Buku cerita bergambar',
                'Kertas karton',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 📕 Ayo Kenalan dengan Bagian Buku!

Halo sahabat cilik! Tahukah kamu, buku punya **bagian-bagian** yang seru? 
Ayo **Maryam** dan **Fatimah** ajak kalian berkenalan dengan bagian buku! 🎉

---

### 🌟 1. Tiga Bagian Buku

| Bagian | Apa Itu? | Emoji |
| :---: | :--- | :---: |
| **Cover** | Sampul depan yang bergambar indah | 📕 |
| **Judul** | Nama buku, ditulis besar | 📝 |
| **Isi** | Cerita & gambar di dalam buku | 📖 |

---

### 🎭 Komik: Maryam & Fatimah Cari Bagian Buku

\`\`\`text
  Maryam  : "Fatimah, ini bagian apa?" 📕👧
  Fatimah : "Itu cover! Sampul buku yang bergambar!" 👧✨
  Maryam  : "Kalau yang ini?" 📝
  Fatimah : "Itu judul! Nama bukunya!" 
  Maryam  : "Yang ini?" 📖
  Fatimah : "Itu isi! Cerita dan gambarnya!" 🎉
  Khadijah: "Hebat! Kalian sudah kenal bagian buku!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
* **Cover** = sampul depan buku, biasanya bergambar indah 🎨
* **Judul** = nama buku, ditulis dengan huruf besar 📝
* **Isi** = cerita & gambar di dalam buku 📖

---

### 🔍 Ayo Cari di Bukumu:
* Buka buku cerita favoritmu! 📚
* Tunjuk bagian **cover**-nya! 🎨
* Baca **judul**-nya! 📝
* Lihat **isi**-nya! 📖

Ayo jadi **Detektif Buku** bersama Maryam & Fatimah! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan bagian-bagian buku!',
                ice_breaker:
                    'Ayo tunjukkan buku favoritmu! Tepuk tangan 3x sambil sebut: "Buku! Buku! Buku!"',
                apperception:
                    'Coba pegang buku di tanganmu. Bagian mana yang bergambar?',
                trigger_question:
                    'Apa saja bagian dari buku? Ayo kita cari tahu bersama!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Bagian buku: cover (sampul), judul (nama), isi (cerita).',
                concrete_steps: [
                    'Tunjukkan buku cerita bergambar.',
                    'Tunjuk cover-nya: "Ini cover, sampul yang bergambar indah."',
                    'Tunjuk judul: "Ini judul, nama bukunya."',
                    'Buka halaman: "Ini isi, cerita dan gambarnya."',
                    'Ulangi 3x dengan buku berbeda.',
                ],
                script_parent:
                    '"Nah sayang, buku punya cover, judul, dan isi. Yuk, kita kenali bagian-bagiannya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Bagian Buku',
                game_rules: [
                    'Guru menyebutkan ciri: "Sampul bergambar indah!"',
                    'Anak menebak: "Cover!"',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, 2 bagian dulu.',
                    child_level_advanced:
                        'Menyebutkan fungsi tiap bagian sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal bagian buku.',
                worksheet_print_ready: {
                    title: 'LKPD 7.1: Bagian-Bagian Buku',
                    instructions:
                        'Jodohkan bagian buku dengan cirinya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan bagian buku dengan cirinya!',
                            data: {
                                pairs: [
                                    { left: '📕 Cover', right: 'Sampul bergambar' },
                                    { left: '📝 Judul', right: 'Nama buku' },
                                    { left: '📖 Isi', right: 'Cerita & gambar' },
                                ],
                            },
                            answer_key: 'Cover→sampul, Judul→nama, Isi→cerita.',
                            explanation: 'Mengenal bagian buku.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question: 'Tulis judul buku favoritmu!',
                            data: {
                                lines: 2,
                                prompt: 'Judul buku favoritku:',
                                example: 'Judul: Si Kancil',
                            },
                            answer_key: 'Anak menulis judul buku.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah cover buku favoritmu!',
                            data: {
                                prompt: 'Cover buku favoritku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Cover buku:',
                            },
                            answer_key: 'Anak menggambar cover.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja bagian buku, sayang?',
                    'Bagian apa yang paling kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menggambar cover buku pada LKPD 7.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 20: Ayo Baca Cerita Bergambar',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca cerita bergambar 3 kalimat.',
            allocated_minutes: 45,
            required_materials: [
                'Buku cerita bergambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 📖 Ayo Baca Cerita Bergambar!

Halo sahabat cilik! Hari ini **Asiya** dan **Maheer** punya cerita 
**bergambar** yang seru tentang **Ari dan kucingnya**! Ayo kita baca! 🎉

---

### 🌟 1. Cerita "Ari dan Kucing Lucu"

\`\`\`text
👦🐱 Ari punya kucing.
😺 Kucing itu lucu.
❤️ Ari suka kucing.
\`\`\`

**Gambar pendamping:**
👦🐱 → 😺 → ❤️

---

### 🎭 Komik: Asiya & Maheer Bahas Cerita

\`\`\`text
  Asiya  : "Maheer, siapa tokoh ceritanya?" 👧
  Maheer : "Ari dan kucingnya!" 👦🐱
  Asiya  : "Bagaimana kucingnya?" 👧
  Maheer : "Lucu!" 😺
  Asiya  : "Apa Ari suka kucing?" 👧
  Maheer : "Iya, Ari suka kucing!" ❤️
  Khadijah: "Kalian menyimak dengan hebat!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
**Cerita bergambar** punya:
1. **Gambar** yang membantu kita paham 🎨
2. **Kalimat** yang dibaca satu per satu 📖
3. **Tokoh** yang ada di dalamnya 👤

---

### 🔍 Ayo Baca Bersama:
* "Ari punya kucing." 👉 Ari punya apa? **Kucing!** 🐱
* "Kucing itu lucu." 👉 Kucingnya bagaimana? **Lucu!** 😺
* "Ari suka kucing." 👉 Ari suka apa? **Kucing!** ❤️

Ayo jadi **Pembaca Cerita Hebat** bersama Asiya & Maheer! 📖✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan membaca cerita bergambar tentang Ari dan kucingnya!',
                ice_breaker:
                    'Ayo tirukan suara kucing: "Meooong!" — sekarang suara kucing lucu: "Meong-meong!"',
                apperception:
                    'Coba pikirkan: siapa tokoh dalam cerita "Ari dan Kucing Lucu"?',
                trigger_question:
                    'Bagaimana cara membaca cerita bergambar? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Membaca cerita bergambar 3 kalimat dengan memahami gambar & teks.',
                concrete_steps: [
                    'Tunjukkan cerita "Ari punya kucing."',
                    'Baca bersama 3x dengan intonasi ramah.',
                    'Tunjuk gambar kucing: "Ini kucing Ari."',
                    'Lanjut "Kucing itu lucu." & "Ari suka kucing."',
                    'Ulangi 3x agar anak ingat.',
                ],
                script_parent:
                    '"Nah sayang, gambar membantu kita paham cerita. Yuk, baca bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Cerita Ceria',
                game_rules: [
                    'Guru menunjukkan gambar.',
                    'Anak menebak isi cerita.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, 1 kalimat dulu.',
                    child_level_advanced:
                        'Membaca 3 kalimat sendiri & menceritakan ulang.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & memahami cerita.',
                worksheet_print_ready: {
                    title: 'LKPD 7.2: Ayo Baca Cerita Bergambar!',
                    instructions:
                        'Baca cerita bergambar, lalu jawab pertanyaannya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question:
                                'Baca cerita: "Ari punya kucing. Kucing itu lucu. Ari suka kucing."',
                            data: {
                                sentences: [
                                    { text: 'Ari punya kucing.', icon: '👦🐱' },
                                    { text: 'Kucing itu lucu.', icon: '😺' },
                                    { text: 'Ari suka kucing.', icon: '❤️' },
                                ],
                            },
                            answer_key: 'Anak membaca cerita.',
                            explanation: 'Membaca cerita bergambar.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question:
                                'Jawab: Apa nama tokoh cerita? Apa ia punya kucing?',
                            data: {
                                lines: 3,
                                prompt: 'Jawaban:',
                                example: 'Tokoh: Ari. Ari punya kucing.',
                            },
                            answer_key: 'Tokoh Ari, punya kucing.',
                            explanation: 'Memahami cerita.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah kucing milik Ari!',
                            data: {
                                prompt: 'Kucing Ari',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Kucing Ari:',
                            },
                            answer_key: 'Anak menggambar kucing.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Cerita apa yang paling kamu sukai, sayang?',
                    'Bagaimana cara memahami cerita?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca: "Ari punya kucing. Kucing itu lucu. Ari suka kucing."',
                },
            ],
        },
        {
            title: 'Pertemuan 21: Ayo Baca Cerita 3 Kalimat',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca cerita 3 kalimat dengan lancar dan menuliskan ulang.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 📜 Ayo Baca Cerita 3 Kalimat!

Halo sahabat cilik! Hari ini **Maryam** dan **Fatimah** punya cerita 
tentang **Budi yang bermain bola**! Ayo kita baca & tulis ulang! 🎉

---

### 🌟 1. Cerita "Budi Bermain Bola"

\`\`\`text
⚽ Budi punya bola.
🏡 Ia bermain di halaman.
😊 Budi senang sekali.
\`\`\`

**Gambar pendamping:**
⚽ → 🏡 → 😊

---

### 🎭 Komik: Maryam & Fatimah Baca Cerita

\`\`\`text
  Maryam  : "Fatimah, ayo baca cerita Budi!" 👧
  Fatimah : "Budi punya bola!" ⚽👧
  Maryam  : "Ia bermain di halaman!" 🏡
  Fatimah : "Budi senang sekali!" 😊
  Maheer  : "Aku juga bisa baca!" 👦
  Khadijah: "Bagus, kalian semua pandai!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Cerita 3 kalimat biasanya punya:
1. **Kalimat 1** = pembuka (memperkenalkan tokoh) 👤
2. **Kalimat 2** = isi (apa yang dilakukan) 🎬
3. **Kalimat 3** = penutup (perasaan tokoh) 💖

---

### 🔍 Ayo Coba Sendiri:
Baca cerita berikut:
\`\`\`text
🐱 Si kucing lapar.
🍽️ Ia mencari makan.
🐟 Ia menemukan ikan.
\`\`\`

Sekarang tulis ulang dengan bahasamu! 🎉

Ayo jadi **Pembaca & Penulis Cerita Hebat**! 📖✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita baca cerita 3 kalimat & tulis ulang!',
                ice_breaker:
                    'Ayo tepuk tangan 3x sambil sebut: "Bu-di pu-nya bo-la!"',
                apperception:
                    'Coba ingat cerita "Ari dan Kucing" kemarin. Berapa kalimat?',
                trigger_question:
                    'Bagaimana cara membaca & menulis cerita 3 kalimat?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Membaca cerita 3 kalimat & menulis ulang dengan bahasa sendiri.',
                concrete_steps: [
                    'Tunjukkan cerita "Budi punya bola."',
                    'Baca bersama 3x dengan intonasi ramah.',
                    'Tunjuk kalimat 1, 2, 3 satu per satu.',
                    'Minta anak membaca sendiri.',
                    'Minta anak menulis ulang dengan bahasa sendiri.',
                ],
                script_parent:
                    '"Nah sayang, cerita ini punya 3 kalimat. Yuk, baca & tulis ulang dengan bahasamu!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Susun Cerita Ceria',
                game_rules: [
                    'Guru membagikan kartu kalimat acak.',
                    'Anak menyusun jadi cerita 3 kalimat.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyusun dengan bantuan guru, 2 kalimat dulu.',
                    child_level_advanced:
                        'Menyusun & menulis ulang sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis cerita.',
                worksheet_print_ready: {
                    title: 'LKPD 7.3: Ayo Baca & Tulis Cerita!',
                    instructions:
                        'Baca cerita, lalu tulis ulang dengan bahasamu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question:
                                'Baca cerita: "Budi punya bola. Ia bermain di halaman. Budi senang sekali."',
                            data: {
                                sentences: [
                                    { text: 'Budi punya bola.', icon: '⚽' },
                                    { text: 'Ia bermain di halaman.', icon: '🏡' },
                                    { text: 'Budi senang sekali.', icon: '😊' },
                                ],
                            },
                            answer_key: 'Anak membaca cerita.',
                            explanation: 'Membaca cerita.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question:
                                'Tulis ulang cerita Budi dengan bahasamu sendiri!',
                            data: {
                                lines: 4,
                                prompt: 'Ceritaku:',
                                example: 'Budi punya bola. Ia main di halaman. Ia senang.',
                            },
                            answer_key: 'Anak menulis cerita.',
                            explanation: 'Latihan menulis cerita.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah Budi bermain bola di halaman!',
                            data: {
                                prompt: 'Budi bermain bola',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Budi bermain bola:',
                            },
                            answer_key: 'Anak menggambar.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Cerita apa yang paling kamu sukai, sayang?',
                    'Bagaimana cara menyusun cerita?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis cerita pada LKPD 7.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 7: Aku Suka Buku!',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Bagian buku yang bergambar adalah...',
                            option_a: 'Cover',
                            option_b: 'Isi',
                            option_c: 'Judul',
                            option_d: 'Halaman',
                            correct_answer: 'A',
                            explanation: 'Cover adalah sampul yang bergambar.',
                        },
                        {
                            question_text: 'Judul buku biasanya ditulis...',
                            option_a: 'Kecil',
                            option_b: 'Besar & jelas',
                            option_c: 'Tidak terlihat',
                            option_d: 'Tersembunyi',
                            correct_answer: 'B',
                            explanation: 'Judul ditulis besar & jelas.',
                        },
                        {
                            question_text: 'Untuk memahami cerita, kita bisa melihat...',
                            option_a: 'Gambar',
                            option_b: 'Angka',
                            option_c: 'Warna',
                            option_d: 'Harga',
                            correct_answer: 'A',
                            explanation: 'Gambar membantu memahami cerita.',
                        },
                        {
                            question_text: 'Cerita biasanya terdiri dari...',
                            option_a: '1 kalimat',
                            option_b: 'Beberapa kalimat',
                            option_c: 'Angka',
                            option_d: 'Gambar saja',
                            correct_answer: 'B',
                            explanation: 'Cerita terdiri dari beberapa kalimat.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 8: AKU BISA BIKIN CERITA!
// =============================================================================
const BAB_8: SeedModuleItem = {
    title: 'Bab 8: Aku Bisa Bikin Cerita!',
    order_index: 8,
    target_semester: 2,
    week_target: 22,
    lessons: [
        {
            title: 'Pertemuan 22: Ayo Bikin Kalimat Sederhana',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis kalimat sederhana dengan ejaan yang benar.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu kata',
                'LKPD',
            ],
            content_text: `# ✏️ Ayo Bikin Kalimat Sederhana!

Halo sahabat cilik! Sekarang saatnya **Maryam** dan **Maheer** 
ajak kalian **bikin kalimat** sendiri! Seru, kan? 🎉

---

### 🌟 1. Aturan Kalimat yang Benar

| Aturan | Contoh Benar | Contoh Salah |
| :--- | :--- | :--- |
| Diawali **huruf kapital** | **A**ku suka buku. | aku suka buku. |
| Diakhiri **tanda titik** | Aku suka buku**.** | Aku suka buku |
| Ada **spasi** antar kata | Aku suka buku. | Akusukabuku. |

---

### 🎭 Komik: Maryam & Maheer Bikin Kalimat

\`\`\`text
  Maryam : "Maheer, ayo bikin kalimat!" 👧
  Maheer: "Aku suka buku!" 📚👦
  Maryam : "Bagus! Tapi ingat, A harus kapital!" 🅰️
  Maheer: "Oh iya! Aku suka buku. Sudah benar?" ✅
  Asiya  : "Aku juga bikin: Ibu masak nasi!" 🍚👧
  Khadijah: "Hebat! Kalian penulis cilik!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Kalimat yang benar:
1. Diawali **huruf KAPITAL** 🅰️
2. Diakhiri **tanda TITIK** ⚫
3. Ada **spasi** antar kata 📏

---

### 🔍 Ayo Coba Sendiri:
Perbaiki kalimat berikut:
* "aku suka buku" 👉 **A**ku suka buku**.** ✅
* "ibu masak nasi" 👉 **I**bu masak nasi**.** ✅
* "adik main bola" 👉 **A**dik main bola**.** ✅

Ayo jadi **Penulis Kalimat Hebat**! ✏️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan bikin kalimat sederhana!',
                ice_breaker:
                    'Ayo tepuk tangan: "Huruf kapital!" tepuk 1x, "Tanda titik!" tepuk 1x!',
                apperception:
                    'Coba ingat kalimat "Aku suka buku." Apa huruf awalnya? Kapital!',
                trigger_question:
                    'Bagaimana cara menulis kalimat yang benar? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kalimat: diawali huruf kapital, diakhiri tanda titik, ada spasi.',
                concrete_steps: [
                    'Tunjukkan kalimat "Aku suka buku."',
                    'Tunjuk huruf "A" kapital di awal.',
                    'Tunjuk tanda "." di akhir.',
                    'Minta anak bikin kalimat sendiri.',
                    'Bantu perbaiki jika ada yang salah.',
                ],
                script_parent:
                    '"Nah sayang, kalimat yang benar diawali huruf besar dan diakhiri titik. Yuk, kita bikin kalimat!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Susun Kalimat Ceria',
                game_rules: [
                    'Guru membagikan kartu kata acak.',
                    'Anak menyusun jadi kalimat yang benar.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyusun dengan bantuan guru, 3 kata dulu.',
                    child_level_advanced:
                        'Menyusun 4-5 kata sendiri & menuliskan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis kalimat sederhana.',
                worksheet_print_ready: {
                    title: 'LKPD 8.1: Ayo Bikin Kalimat Sederhana!',
                    instructions:
                        'Tulis kalimat berikut dengan huruf kapital & tanda titik yang benar!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question: 'Tulis kalimat berikut dengan benar!',
                            data: {
                                lines: 4,
                                prompt: 'Tulis kalimat:',
                                example: 'aku suka buku → Aku suka buku.',
                            },
                            answer_key: 'Anak menulis kalimat dengan benar.',
                            explanation: 'Latihan menulis kalimat.',
                        },
                        {
                            id: 2,
                            type: 'FILL_THE_WORD',
                            question: 'Lengkapi kalimat berikut!',
                            data: {
                                word: 'buku',
                                displayWord: 'Aku suka b_k_',
                                icon: '📚',
                            },
                            answer_key: 'Aku suka buku.',
                            explanation: 'Melengkapi kalimat.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah sesuai kalimat "Aku suka buku."!',
                            data: {
                                prompt: 'Aku suka buku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku suka buku:',
                            },
                            answer_key: 'Anak menggambar buku.',
                            explanation: 'Memahami kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara menulis kalimat, sayang?',
                    'Kapan pakai huruf kapital?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis kalimat pada LKPD 8.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 23: Ayo Bikin Cerita 3 Kalimat!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis cerita 3 kalimat dengan alur sederhana.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎨 Ayo Bikin Cerita 3 Kalimat!

Halo sahabat cilik! Sekarang saatnya **Asiya** dan **Fatimah** 
ajak kalian **bikin cerita 3 kalimat** sendiri! Seru, kan? 🎉

---

### 🌟 1. Struktur Cerita 3 Kalimat

| Kalimat | Fungsi | Contoh |
| :---: | :--- | :--- |
| **Kalimat 1** | Pembuka | Aku punya kucing. |
| **Kalimat 2** | Isi | Kucingku lucu. |
| **Kalimat 3** | Penutup | Aku sayang kucingku. |

---

### 🎭 Komik: Asiya & Fatimah Bikin Cerita

\`\`\`text
  Asiya  : "Fatimah, ayo bikin cerita!" 👧
  Fatimah: "Aku punya kucing!" 🐱👧
  Asiya  : "Bagus! Kalimat kedua?" 
  Fatimah: "Kucingku lucu!" 😺
  Asiya  : "Kalimat ketiga?" 
  Fatimah: "Aku sayang kucingku!" ❤️
  Maheer : "Aku juga bikin: Aku punya bola. Bolanya bagus. Aku suka bola!" ⚽👦
  Khadijah: "Hebat! Kalian penulis cerita!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Cerita 3 kalimat:
1. **Kalimat 1** = pembuka (perkenalan) 👤
2. **Kalimat 2** = isi (penjelasan) 🎬
3. **Kalimat 3** = penutup (perasaan) 💖

---

### 🔍 Ayo Coba Sendiri:
Bikin cerita 3 kalimat tentang:
* **Kucingmu** 🐱
* **Bolamu** ⚽
* **Bukumu** 📚

Ayo jadi **Penulis Cerita Hebat**! 🎨✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan bikin cerita 3 kalimat!',
                ice_breaker:
                    'Ayo tepuk tangan 3x sambil sebut: "A-ku pu-nya ku-cing!"',
                apperception:
                    'Coba pikirkan mainan favoritmu. Bisa bikin cerita tentang itu?',
                trigger_question:
                    'Bagaimana cara bikin cerita 3 kalimat? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Cerita 3 kalimat: pembuka, isi, penutup.',
                concrete_steps: [
                    'Tunjukkan contoh cerita "Aku punya kucing. Kucingku lucu. Aku sayang kucingku."',
                    'Tunjuk kalimat 1, 2, 3 satu per satu.',
                    'Jelaskan fungsi: pembuka, isi, penutup.',
                    'Minta anak bikin cerita sendiri tentang mainan favoritnya.',
                    'Bantu jika anak kesulitan ide.',
                ],
                script_parent:
                    '"Nah sayang, cerita 3 kalimat: pembuka, isi, penutup. Yuk, kita bikin cerita tentang kucingmu!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Lanjut Cerita Ceria',
                game_rules: [
                    'Guru memulai: "Aku punya kucing..."',
                    'Anak melanjutkan: "...kucingku lucu..."',
                    'Giliran berikutnya: "...aku sayang kucingku!"',
                    'Yang paling seru dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Bercerita dengan bantuan guru, 2 kalimat dulu.',
                    child_level_advanced:
                        'Bercerita 3-5 kalimat sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis cerita 3 kalimat.',
                worksheet_print_ready: {
                    title: 'LKPD 8.2: Ayo Bikin Cerita 3 Kalimat!',
                    instructions:
                        'Tulis cerita 3 kalimat tentang dirimu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question:
                                'Tulis cerita 3 kalimat tentang dirimu!',
                            data: {
                                lines: 4,
                                prompt: 'Ceritaku:',
                                example: 'Aku punya kucing. Kucingku lucu. Aku sayang kucingku.',
                            },
                            answer_key: 'Anak menulis cerita 3 kalimat.',
                            explanation: 'Latihan menulis cerita.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah tokoh dalam ceritamu!',
                            data: {
                                prompt: 'Tokoh ceritaku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Tokoh ceritaku:',
                            },
                            answer_key: 'Anak menggambar.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Bagaimana perasaanmu setelah menulis cerita?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah menulis cerita?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Bangga' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Bisa' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Cerita apa yang kamu tulis, sayang?',
                    'Bagaimana cara menyusun cerita?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis cerita pada LKPD 8.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 24: Ayo Berbagi Cerita (Presentasi)',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membacakan & membagikan cerita yang telah ditulis dengan percaya diri.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita anak',
                'Pensil warna',
                'Medali kertas (opsional)',
                'LKPD',
            ],
            content_text: `# 🎤 Ayo Berbagi Cerita!

Halo sahabat cilik! Hari ini **semua sahabat** — Maryam, Asiya, Fatimah, 
Maheer, dan Khadijah — akan mengajak kalian **berbagi cerita**! 🎉

---

### 🌟 1. Cara Berbagi Cerita

| Langkah | Contoh |
| :---: | :--- |
| **1. Berdiri tegak** | Badan lurus, kaki rapat 🧍 |
| **2. Tarik napas** | Hmmm... hembuskan 😮‍💨 |
| **3. Baca lantang** | "Aku punya kucing!" 🗣️ |
| **4. Senyum manis** | 😊 |

---

### 🎭 Komik: Sahabat Berbagi Cerita

\`\`\`text
  Maryam  : "Ayo kita berbagi cerita!" 👧
  Asiya   : "Aku mulai ya! Aku punya kucing. Kucingku lucu. Aku sayang kucingku!" 🐱👧
  Fatimah : "Aku juga! Aku punya buku. Bukuku bagus. Aku suka buku!" 📚👧
  Maheer  : "Aku punya bola. Bolaku bagus. Aku suka bola!" ⚽👦
  Khadijah: "Hebat! Semua berani bercerita!" 👧💫
\`\`\`

---

### 💡 Yang Perlu Diingat:
Saat berbagi cerita:
1. **Berdiri tegak** 🧍
2. **Tarik napas** dulu 😮‍💨
3. **Baca lantang** & jelas 🗣️
4. **Senyum manis** 😊
5. **Dengarkan teman** dengan saksama 👂

---

### 🔍 Ayo Coba Sendiri:
* Baca ceritamu di depan cermin dulu! 🪞
* Lalu baca di depan Ibu/Bapak! 👨‍👩‍👧
* Terakhir, baca di depan kelas! 🎤

Ayo jadi **Pembicara Hebat**! 🌟✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berbagi cerita dengan berani!',
                ice_breaker:
                    'Ayo berdiri tegak! Tarik napas... hembuskan... senyum manis! Siap bercerita!',
                apperception:
                    'Coba ingat cerita yang kamu tulis kemarin. Siap baca di depan kelas?',
                trigger_question:
                    'Bagaimana cara berbagi cerita dengan berani? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Berbagi cerita: berdiri tegak, tarik napas, baca lantang, senyum manis.',
                concrete_steps: [
                    'Tunjukkan cara berdiri tegak & tarik napas.',
                    'Contohkan membaca cerita dengan lantang.',
                    'Minta anak berlatih di tempat dulu.',
                    'Lalu maju satu per satu membaca cerita.',
                    'Beri tepuk tangan untuk setiap anak.',
                ],
                script_parent:
                    '"Nah sayang, bercerita itu mudah. Berdiri tegak, tarik napas, baca lantang, senyum!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Panggung Cerita Ceria',
                game_rules: [
                    'Setiap anak tampil bercerita di depan kelas.',
                    'Teman mendengarkan dengan saksama.',
                    'Setiap tampilan diberi tepuk tangan & medali kertas 🏅.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Bercerita dengan bantuan guru (dibisiki).',
                    child_level_advanced:
                        'Bercerita tanpa bantuan & dengan ekspresi.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Berbagi cerita & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 8.3: Ayo Berbagi Cerita!',
                    instructions:
                        'Tulis cerita finalmu, lalu bacakan di depan kelas!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question:
                                'Tulis cerita finalmu (3-5 kalimat)!',
                            data: {
                                lines: 5,
                                prompt: 'Cerita Finalku:',
                                example: 'Aku punya kucing. Kucingku lucu...',
                            },
                            answer_key: 'Anak menulis cerita final.',
                            explanation: 'Menulis cerita.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah ilustrasi cerita finalmu!',
                            data: {
                                prompt: 'Ilustrasi ceritaku',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Ilustrasi ceritaku:',
                            },
                            answer_key: 'Anak menggambar ilustrasi.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Bagaimana perasaanmu setelah berbagi cerita?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah berbagi cerita?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Bangga' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Malu' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana perasaanmu bercerita, sayang?',
                    'Cerita apa yang paling kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil cerita final pada LKPD 8.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Akhir Bab 8: Aku Bisa Bikin Cerita!',
                    quiz_question_count: 5,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kalimat yang benar diawali dengan...',
                            option_a: 'Huruf kecil',
                            option_b: 'Huruf kapital',
                            option_c: 'Angka',
                            option_d: 'Simbol',
                            correct_answer: 'B',
                            explanation: 'Kalimat diawali huruf kapital.',
                        },
                        {
                            question_text: 'Kalimat yang benar diakhiri dengan...',
                            option_a: 'Titik (.)',
                            option_b: 'Koma (,)',
                            option_c: 'Tanya (?)',
                            option_d: 'Seru (!)',
                            correct_answer: 'A',
                            explanation: 'Kalimat berita diakhiri titik.',
                        },
                        {
                            question_text: 'Cerita sederhana terdiri dari...',
                            option_a: '1 kalimat',
                            option_b: 'Beberapa kalimat',
                            option_c: 'Angka',
                            option_d: 'Gambar',
                            correct_answer: 'B',
                            explanation: 'Cerita terdiri dari beberapa kalimat.',
                        },
                        {
                            question_text: 'Saat berbagi cerita, kita harus...',
                            option_a: 'Malu-malu',
                            option_b: 'Bicara lantang & jelas',
                            option_c: 'Berbisik',
                            option_d: 'Diam',
                            correct_answer: 'B',
                            explanation: 'Bicara lantang & jelas.',
                        },
                        {
                            question_text: 'Apa yang kamu pelajari di Bab 8?',
                            option_a: 'Menulis kalimat & cerita',
                            option_b: 'Berhitung',
                            option_c: 'Menyanyi',
                            option_d: 'Melukis',
                            correct_answer: 'A',
                            explanation: 'Menulis kalimat & cerita.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const BAHASA_INDONESIA_BATCH_4: SeedModuleItem[] = [BAB_7, BAB_8];