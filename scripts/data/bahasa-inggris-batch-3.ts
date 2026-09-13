import type { EnglishChapterItem } from './bahasa-inggris-batch-1';

export const BAHASA_INGGRIS_BATCH_3: EnglishChapterItem[] = [
    // =========================================================================
    // UNIT 8: I HAVE TWO PENCILS
    // =========================================================================
    {
        chapter_number: 8,
        title: 'Unit 8: I Have Two Pencils',
        target_semester: 2,
        week_target: 15,
        lessons: [
            {
                title: 'Meeting 15: Using "Have" for Personal Objects (I have a pencil / I have pencils)',
                order_index: 1,
                learning_objectives: 'Siswa mampu menyatakan kepemilikan perlengkapan belajar pribadi menggunakan kata kerja "have" (misal: "I have two pencils", "I have three books") dengan pelafalan jelas dan percaya diri.',
                content_text: `# ✏️ Kotak Harta Karunku: Aku Punya Perlengkapan Belajar!

Buka kotak pensilmu di atas meja! Ada banyak benda seru yang siap membantumu menulis dan menggambar hari ini. ✨

---

### 💖 1. Kata Ajaib: "I have..." (Aku Punya...)
Saat kamu ingin menunjukkan benda milikmu kepada teman, gunakan kalimat ini:
> ### 🗣️ "I have [jumlah] [nama benda]!"  
> *(Artinya: Aku punya...)*

| Jumlah Benda | Gambar | Kalimat Keren yang Kita Ucapkan |
| :---: | :---: | :--- |
| 1 Pensil | ✏️ | 👉 **"I have one pencil."** *(Aku punya satu pensil)* |
| 2 Pensil | ✏️✏️ | 👉 **"I have two pencils!"** *(Aku punya dua pensil)* |
| 3 Buku | 📚📚📚 | 👉 **"I have three books!"** *(Aku punya tiga buku)* |
| 1 Penggaris | 📏 | 👉 **"I have one ruler."** *(Aku punya satu penggaris)* |

---

### 🎭 Komik Seru di Meja Kelas

\`\`\`text
  Joshua : "Look at my desk, Made! I have two pencils!" ✏️✏️
  Made   : "Cool! I have three books and one ruler!" 📚📏
  Joshua : "We are ready to study together!" 👦🎒
\`\`\`

---

### 💡 Tips Rahasia Juara
* Kalau bendanya **cuma 1**, ucapkan biasa: *"I have one pencil."*
* Kalau bendanya **lebih dari 1**, jangan lupa tambahkan desis **-S** di ujungnya: *"I have two pencilSSSS!"* 🐍🚀`,
                required_materials: ['Alat tulis nyata milik anak (pensil, buku, penggaris)', 'Kotak penyimpanan mainan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Welcome back to Semester 2! Lift your pencil high: I HAVE A PENCIL!"',
                    ice_breaker: 'Angkat Benda Cepat: Ayah berkata "Show me your ruler!", anak mengangkat penggaris dan berseru "I have a ruler!"',
                    apperception: 'Tunjukkan dua pensil di tangan: "Bagaimana memberi tahu teman bahwa kamu punya 2 pensil?"',
                    trigger_question: 'What word do we use in English to say \'saya punya\'?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Struktur kalimat kepemilikan: I have + [Jumlah] + [Nama Benda Jamak].',
                    concrete_steps: [
                        'Pegang 1 pensil: "I have one pencil."',
                        'Pegang 2 pensil: "I have two pencils."',
                        'Pegang 5 buku: "I have five books."',
                        'Minta anak mempraktikkan memegang barang miliknya sendiri.',
                        'Ulangi 3x dengan benda berbeda.',
                    ],
                    script_parent: '"Pegang pensilmu dengan bangga dan ucapkan: I have two pencils!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Isi Kotak Rahasia (Mystery Box "I Have...")',
                    game_rules: [
                        'Ayah menyembunyikan sejumlah pensil di dalam kotak tertutup.',
                        'Anak mengintip lalu berseru ke Ayah: "I have five pencils in the box!".',
                        'Keluarkan pensil bersama-sama dan buktikan hitungannya.',
                        'Jika salah, anak harus menghitung ulang dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan benda di bawah 5.',
                        child_level_advanced: 'Menyebutkan jumlah benda hingga 10 beserta warnanya (e.g. I have 3 blue pencils).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melingkari gambar jumlah benda yang tepat pada LKPD Unit 8 (Listen and circle p. 75).',
                    worksheet_print_ready: {
                        title: 'LKPD 8.1: I HAVE STATIONERY',
                        instructions: 'Listen to the instruction and circle the right picture.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Listen: "I have three books". Circle the correct books:',
                                data: { total: 3, icon: '📚' },
                                answer_key: '3 books',
                                explanation: 'Sesuai instruksi dengar: three books (3 buku).',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Listen: "I have eight pencils". Count and verify:',
                                data: { total: 8, icon: '✏️' },
                                answer_key: '8 pencils',
                                explanation: 'Eight pencils berjumlah 8 pensil.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the item quantity with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '📚 📚 📚', right: 'I have three books' },
                                        { left: '✏️ ✏️', right: 'I have two pencils' },
                                        { left: '🎒', right: 'I have one bag' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai pasangan jumlah benda',
                                explanation: 'Mencocokkan kuantitas gambar dengan kalimat kepemilikan.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Meaning of "I have" in Indonesian is: [ ... ] (Saya punya / Saya lihat)',
                                answer_key: 'Saya punya',
                                explanation: 'I have bermakna saya memiliki / saya punya.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Make a sentence with 4 bags: "I [ ... ] [ ... ] [ ... ]"',
                                answer_key: 'I have four bags',
                                explanation: 'Pola kalimat lengkap: Subjek + have + jumlah + benda jamak.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa arti kata "have"?',
                        'Berapa pensil yang kamu miliki di mejamu?',
                        'Bagaimana cara mengatakan "saya punya" dalam bahasa Inggris?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Count your pencils on the table and record: "I have [number] pencils!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 15: Using "Have" for Objects',
                        quiz_questions: [
                            { question_text: 'Kata "have" pada kalimat "I have a book" artinya...', option_a: 'Membaca', option_b: 'Mempunyai / memiliki', option_c: 'Menulis', option_d: 'Membeli', correct_answer: 'B' },
                            { question_text: 'Kalimat bahasa Inggris untuk "Saya punya dua pensil" adalah...', option_a: 'I have two pencils', option_b: 'I has two pencils', option_c: 'You have two book', option_d: 'I am two pencils', correct_answer: 'A' },
                            { question_text: 'Subjek "I" (Saya) berpasangan dengan kata...', option_a: 'Has', option_b: 'Have', option_c: 'Are', option_d: 'Is', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat: "I have three [ ... ]."', option_a: 'rulers', option_b: 'ruler one', option_c: 'book a', option_d: 'bag one', correct_answer: 'A' },
                            { question_text: 'Jika kamu memiliki 1 tas sekolah, kamu mengatakan...', option_a: 'I have one bag', option_b: 'I have one bags', option_c: 'I has bag', option_d: 'You have bag', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 16: Asking "Do You Have...?" & Classroom Survey',
                order_index: 2,
                learning_objectives: 'Siswa mampu menanyakan kepemilikan benda kepada teman sebaya menggunakan pola kalimat "Do you have [benda]?" dan menjawabnya dengan "Yes, I do" atau "No, I don\'t" secara santun.',
                content_text: `# ❓ Apakah Kamu Punya Penggaris? (Do You Have...?)

Pernahkah kamu lupa membawa penghapus atau penggaris saat belajar di sekolah?  
Jangan khawatir! Kita bisa meminjam atau bertanya kepada teman secara sopan. 🤝✨

---

### 💬 1. Cara Bertanya yang Santun
Tatap mata temanmu dan tanyakan:
> ### 🗣️ "Do you have a ruler?"  
> *(Artinya: Apakah kamu punya penggaris?)*

---

### 👍 2. Cara Menjawabnya
Pilihlah salah satu jawaban sesuai kenyataan:

* Jika kamu **punya bendanya**:  
  👉 **"Yes, I do!"** *(Ya, aku punya! Ini dia!)* 😊
* Jika kamu **tidak punya bendanya**:  
  👉 **"No, I don't."** *(Maaf, aku tidak punya.)* 🙅‍♂️

---

### 🎭 Komik: Meminjam Penghapus di Kelas

\`\`\`text
  Cici : "Joshua, do you have an eraser?" 🧼
  Joshua : "Yes, I do! Here you are!" 😊👍
  Cici : "Thank you, Joshua! You are a kind friend!" 🌸
  Joshua : "You are welcome, Cici!" ✨
\`\`\`

---

### 🌟 Aturan Emas Sopan Santun:
Selalu katakan **"Thank you!"** *(Terima kasih)* setelah temanmu meminjamkan barang atau menjawab pertanyaanmu! 🚀`,
                required_materials: ['Daftar ceklis tabel survei Unit 8', 'Alat tulis lengkap', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we will ask our friends: DO YOU HAVE A PENCIL?"',
                    ice_breaker: 'Angguk & Geleng Bersuara: Angguk mantap: "Yes, I do!", geleng sopan: "No, I don\'t!"',
                    apperception: 'Pura-pura meminjam penghapus ke anak: "Do you have an eraser?"',
                    trigger_question: 'How do you ask your classmate if they have a ruler?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kalimat tanya: "Do you have...?" dan respon singkat "Yes, I do / No, I don\'t".',
                    concrete_steps: [
                        'Ajarkan bertanya ramah: "Do you have five pencils?".',
                        'Ajarkan respon bila ada: "Yes, I do!".',
                        'Ajarkan respon bila tidak punya: "No, I don\'t."',
                        'Praktikkan dengan berbagai alat tulis.',
                        'Ulangi 3x bergantian peran.',
                    ],
                    script_parent: '"Bertanya dengan sopan: Do you have a sharpener? Dan selalu ucapkan terima kasih!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Detektif Survei Pinjam Alat Tulis',
                    game_rules: [
                        'Anak membawa kertas survei ke meja keluarga.',
                        'Bertanya: "Do you have a pen?".',
                        'Jika dijawab Yes, anak memberi tanda centang (√). Jika No, anak memberi tanda silang (X).',
                        'Setelah selesai, anak melaporkan hasil: "Mom has a pen! Dad doesn\'t have a pen."',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menanyakan 2 barang dengan panduan Ayah.',
                        child_level_advanced: 'Menanyakan jumlah spesifik: "Do you have three blue pens?"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menjodohkan gambar alat tulis dengan kalimat kepemilikan pada LKPD (p. 76).',
                    worksheet_print_ready: {
                        title: 'LKPD 8.2: DO YOU HAVE STATIONERY?',
                        instructions: 'Make a line to match the picture to the right sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the stationery quantity with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '✏️ x10 Pencils', right: 'I have ten pencils' },
                                        { left: '🎒 x3 Bags', right: 'I have three bags' },
                                        { left: '🧼 x4 Erasers', right: 'I have four erasers' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai kuantitas',
                                explanation: 'Menjodohkan gambar perlengkapan sekolah dengan kalimat kepemilikannya.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Friend asks: "Do you have a ruler?". You have it on the table. What do you say?',
                                data: { icon: '📏', subtitle: 'Has ruler', options: ['Yes, I do', "No, I don't"] },
                                answer_key: 'Yes, I do',
                                explanation: 'Jawaban bila memiliki barang adalah Yes, I do.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: H - A - V - E',
                                answer_key: 'have',
                                explanation: 'Latihan menulis kata kerja have.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "[ ... ] you have five pencils?" (Do / Are)',
                                answer_key: 'Do',
                                explanation: 'Kalimat tanya kepemilikan diawali dengan Do you have.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Write a question asking if someone has an eraser: "[ ... ] you have an eraser?"',
                                answer_key: 'Do',
                                explanation: 'Menyusun pertanyaan Do you have an eraser?',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara meminjam pensil dari teman dengan sopan?',
                        'Apa yang kamu katakan jika tidak punya barang itu?',
                        'Kapan lagi kamu bisa menggunakan "Do you have...?"',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto tabel survei alat tulis yang telah kamu centang pada LKPD 8.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 16: Asking "Do you have...?"',
                        quiz_questions: [
                            { question_text: 'Pertanyaan untuk menanyakan apakah teman punya penghapus adalah...', option_a: 'Do you have an eraser?', option_b: 'What is eraser?', option_c: 'I have eraser', option_d: 'Eraser is blue', correct_answer: 'A' },
                            { question_text: 'Jika teman bertanya "Do you have a pencil?" dan kamu memilikinya, kamu menjawab...', option_a: 'Yes, I do', option_b: 'No, I am not', option_c: 'Goodbye', option_d: 'Good morning', correct_answer: 'A' },
                            { question_text: 'Jika kamu TIDAK memiliki benda yang ditanyakan, kamu menjawab...', option_a: "No, I don't", option_b: 'Yes, I have', option_c: 'I am fine', option_d: 'Thank you', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat tanya: "[ ... ] you have two books?"', option_a: 'Do', option_b: 'Am', option_c: 'Is', option_d: 'Are you', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "Do you have three rulers?" adalah...', option_a: 'Apakah kamu punya tiga penggaris?', option_b: 'Saya punya tiga penggaris', option_c: 'Berapa harga penggaris?', option_d: 'Di mana penggarismu?', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 9: AT CICI'S FARM
    // =========================================================================
    {
        chapter_number: 9,
        title: 'Unit 9: At Cici\'s Farm',
        target_semester: 2,
        week_target: 17,
        lessons: [
            {
                title: 'Meeting 17: Farm Animals & Pets (Rabbit, Duck, Cat, Bird, Fish, Chicken)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi dan menyebutkan 6 nama hewan ternak atau peliharaan dalam bahasa Inggris (Rabbit, Duck, Cat, Bird, Fish, Chicken) serta menirukan suara dan gerakannya secara ekspresif.',
                content_text: `# 🚜 Liburan Seru di Peternakan Cici!

Keluarga Cici mengajak kita berkunjung ke peternakan mereka yang luas dan asri. 🌾🏡  
Dengarlah suaranya! Ada banyak sekali hewan lucu yang sedang bermain:

---

### 🐾 1. Mengenal 6 Sahabat Hewan Ternak

| Gambar | Nama Hewan | Suara Khasnya | Gerakan Lucunya |
| :---: | :--- | :--- | :--- |
| 🐇 | **A Rabbit** | *Cik... cik...* | Melompat lincah di rumput |
| 🦆 | **A Duck** | *Kwek... kwek!* | Berenang santai di kolam |
| 🐱 | **A Cat** | *Meow... meow!* | Mengusapkan kepalanya |
| 🐦 | **A Bird** | *Cit... cit... cuit!* | Mengepakkan sayap terbang |
| 🐟 | **A Fish** | *Blup... blup!* | Meluncur lincah di air |
| 🐓 | **A Chicken** | *Kukuruyuuuk!* | Berlari mematuk jagung |

---

### 🗣️ 2. Menyebutkan Hewan yang Kamu Lihat
Tunjuk hewan yang sedang lewat di peternakan:
> ### 💬 "It is a duck!" *(Itu seekor bebek!)*  
> ### 💬 "It is a rabbit!" *(Itu seekor kelinci!)*

---

### 🎭 Komik: Cici Memberi Makan Hewan Ternak

\`\`\`text
  Cici   : "Look at the pond, Joshua! It is a duck!" 🦆💦
  Joshua : "And look at the grass! Two white rabbits are hopping!" 🐇🐇
  Cici   : "Quack, quack! Hop, hop! They are so cute!" 🌾🎉
\`\`\``,
                required_materials: ['Flashcard gambar hewan ternak', 'Mainan miniatur hewan', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Old MacDonald had a farm, E-I-E-I-O! Welcome to Cici\'s wonderful farm!"',
                    ice_breaker: 'Tebak Suara Hewan: Ayah menirukan suara "Kwek-kwek!", anak berseru "DUCK!". Suara "Meow!", anak berseru "CAT!"',
                    apperception: 'Tunjukkan gambar peternakan Cici: "Hewan apa saja yang bisa berenang di kolam dan terbang di pohon?"',
                    trigger_question: 'What pet do you love the most at home?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata hewan ternak: Rabbit (kelinci), Duck (bebek), Cat (kucing), Bird (burung), Fish (ikan), Chicken (ayam).',
                    concrete_steps: [
                        'Tunjukkan gambar kelinci: "Rabbit... hop, hop, rabbit."',
                        'Tunjukkan gambar bebek: "Duck... quack, quack, duck."',
                        'Tunjukkan gambar ayam: "Chicken... cluck, cluck, chicken."',
                        'Latih pengucapan tunggal dan jamak (e.g. two rabbits, three ducks).',
                        'Ulangi 3x dengan gerakan hewan.',
                    ],
                    script_parent: '"Sebutkan nama hewan & suara lucunya: A duck says quack, a cat says meow!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lempar Bola Salju Hewan (Snowball Animal Game)',
                    game_rules: [
                        'Remas kertas bekas menjadi bola salju kertas.',
                        'Ayah melempar bola salju ke anak sambil menyebutkan suara hewan: "Meow!".',
                        'Anak menangkap bola dan menyebutkan nama hewannya: "CAT! I have a cat!"',
                        'Jika salah, anak harus menirukan gerakan hewan tersebut.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan nama hewan saat mendengar suara tiruan.',
                        child_level_advanced: 'Menyebutkan nama hewan dan menirukan gerakannya (misal mengepakkan sayap untuk bird).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mendengar dan mencentang gambar hewan yang tepat pada LKPD Unit 9 (p. 80).',
                    worksheet_print_ready: {
                        title: 'LKPD 9.1: ANIMALS AT CICI\'S FARM',
                        instructions: 'Listen to your parent and put a tick (√) to the right animal picture.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "Two rabbits". Tick the right animal:',
                                data: { icon: '🐇', subtitle: 'Hopping animal', options: ['Two rabbits', 'One duck'] },
                                answer_key: 'Two rabbits',
                                explanation: 'Two rabbits adalah gambar dua kelinci.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "A yellow duck swimming". Tick the right animal:',
                                data: { icon: '🦆', subtitle: 'Swims in pond', options: ['Duck', 'Cat'] },
                                answer_key: 'Duck',
                                explanation: 'Bebek berenang adalah duck.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the animal sound with the English name:',
                                data: {
                                    pairs: [
                                        { left: '🐱 "Meow meow"', right: 'Cat' },
                                        { left: '🦆 "Quack quack"', right: 'Duck' },
                                        { left: '🐓 "Cluck cluck"', right: 'Chicken' },
                                    ],
                                },
                                answer_key: 'Kucing → Cat; Bebek → Duck; Ayam → Chicken',
                                explanation: 'Menjodohkan suara hewan dengan namanya.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'An animal that flies in the sky is a [ ... ] (bird / cat)',
                                answer_key: 'bird',
                                explanation: 'Hewan yang terbang di langit adalah burung (bird).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Cici has yellow swimming birds with flat beaks. They are [ ... ] (ducks / cats)',
                                answer_key: 'ducks',
                                explanation: 'Bebek di peternakan Cici adalah ducks.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Hewan ternak mana yang paling lucu menurutmu?',
                        'Bagaimana cara burung kecil bergerak?',
                        'Suara apa yang dikeluarkan oleh bebek?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil centang gambar hewan ternak pada LKPD 9.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 17: Farm Animals and Pets',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari hewan "Kelinci" adalah...', option_a: 'Rabbit', option_b: 'Duck', option_c: 'Chicken', option_d: 'Fish', correct_answer: 'A' },
                            { question_text: 'Hewan yang bersuara "kwek-kwek" dan pandai berenang adalah...', option_a: 'Duck', option_b: 'Cat', option_c: 'Bird', option_d: 'Rabbit', correct_answer: 'A' },
                            { question_text: 'Arti kata "Chicken" dalam bahasa Indonesia adalah...', option_a: 'Ayam', option_b: 'Bebek', option_c: 'Burung', option_d: 'Ikan', correct_answer: 'A' },
                            { question_text: 'Hewan peliharaan yang mengeong "meow" adalah...', option_a: 'Cat', option_b: 'Fish', option_c: 'Duck', option_d: 'Bird', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari kata "Burung" adalah...', option_a: 'Bird', option_b: 'Rabbit', option_c: 'Chicken', option_d: 'Cat', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 18: Counting Farm Animals & "What Pet Do You Have?"',
                order_index: 2,
                learning_objectives: 'Siswa mampu menanyakan hewan peliharaan kepada teman ("What pet do you have?") dan menjawabnya menggunakan pola "I have [jumlah] [hewan]" berdasarkan pengamatan gambar peternakan.',
                content_text: `# 🔢 Menghitung Hewan Peliharaan di Peternakan!

Apakah kamu punya hewan peliharaan tersayang di rumah?  
Ayo ajak temanmu bercerita tentang hewan kesayangannya! 🐶🐱✨

---

### ❓ 1. Bertanya Hewan Peliharaan Teman
Tanyakan dengan ramah:
> ### 🗣️ "What pet do you have?"  
> *(Artinya: Hewan peliharaan apa yang kamu punya?)*

---

### 🐾 2. Cara Menjawab dengan Jumlahnya
Sebutkan jumlah dan nama hewannya:
> ### 🗣️ "I have two cats!" *(Aku punya dua kucing)*  
> ### 🗣️ "I have five fish!" *(Aku punya lima ikan)*

| Hewan di Peternakan | Jumlahnya | Kalimat Bahasa Inggris |
| :---: | :---: | :--- |
| 🐓 | 8 Ayam | 👉 **"I have eight chickens!"** |
| 🐇 | 3 Kelinci | 👉 **"I have three rabbits!"** |
| 🦆 | 4 Bebek | 👉 **"I have four ducks!"** |
| 🐟 | 1 Ikan Mas | 👉 **"I have one fish."** *(Fish tidak pakai s ya!)* |

---

### 🎭 Komik: Sensus Hewan Cici dan Made

\`\`\`text
  Made : "Hi Cici! What pet do you have?" 👦❓
  Cici : "I have three cute rabbits! And what pet do you have, Made?" 🐇🌸
  Made : "I have five colorful fish in my aquarium!" 🐟✨
\`\`\``,
                required_materials: ['Poster gambar pemandangan peternakan Cici (p. 82)', 'Mainan miniatur hewan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at Cici\'s farm! So many baby animals running around! Let\'s count them!"',
                    ice_breaker: 'Tepuk Ayam Berkokok: Tepuk paha 3 kali, kepakkan siku: "Kukuruyuk! I have chickens!"',
                    apperception: 'Hitung ayam di gambar: 1, 2, 3... 8. "How do we say 8 ayam in English?"',
                    trigger_question: 'How do you ask your friend what animal they have at home?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola tanya-jawab kepemilikan hewan: "What pet do you have?" → "I have [number] [pets]".',
                    concrete_steps: [
                        'Latih kalimat tanya: "What pet do you have?".',
                        'Bimbing jawaban: "I have two cats" / "I have a rabbit".',
                        'Ajak anak menghitung hewan pada poster peternakan Cici halaman 82.',
                        'Ulangi 3x bergantian peran.',
                    ],
                    script_parent: '"Bertanya dengan penasaran: What pet do you have? Dan hitung hewan peliharaanmu bersama!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sensus Hewan Peliharaan Sahabat',
                    game_rules: [
                        'Anak membawa boneka hewan favoritnya.',
                        'Bertanya kepada anggota keluarga: "What pet do you have?".',
                        'Keluarga menjawab sambil menunjukkan miniatur hewan: "I have a cute rabbit!"',
                        'Catat jawaban di tabel survei dengan stiker.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab dengan 1 jenis hewan.',
                        child_level_advanced: 'Menghitung total hewan gabungan seluruh keluarga dalam bahasa Inggris.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghitung dan mencocokkan jumlah hewan peternakan pada LKPD Unit 9 (p. 84).',
                    worksheet_print_ready: {
                        title: 'LKPD 9.2: COUNTING CICI\'S PETS',
                        instructions: 'Count the animals and match them with the right sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Count the chickens: 🐓 🐓 🐓 🐓 🐓. Sentence: "I have [ ... ]"',
                                data: { total: 5, icon: '🐓' },
                                answer_key: 'five chickens',
                                explanation: 'Terdapat 5 ekor ayam: five chickens.',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Count the rabbits: 🐇 🐇 🐇. Sentence: "I have [ ... ]"',
                                data: { total: 3, icon: '🐇' },
                                answer_key: 'three rabbits',
                                explanation: 'Terdapat 3 kelinci: three rabbits.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the animal group with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '🦆 🦆', right: 'I have two ducks' },
                                        { left: '🐱 🐱 🐱 🐱', right: 'I have four cats' },
                                        { left: '🐟 🐟 🐟', right: 'I have three fish' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai kuantitas hewan',
                                explanation: 'Pencocokan jumlah hewan ternak dengan kalimat kepemilikan.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Question: "What pet do you have?". Answer: "I have [ ... ] cat." (a / two)',
                                answer_key: 'a',
                                explanation: 'Untuk 1 ekor kucing tunggal menggunakan kata sandang "a cat".',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'In Cici\'s farm there are 8 chickens. What does Cici say? "I have [ ... ] chickens."',
                                answer_key: 'eight',
                                explanation: 'Angka 8 dalam bahasa Inggris adalah eight.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Jika kamu bisa memelihara hewan dari peternakan Cici, hewan apa yang kamu pilih?',
                        'Bagaimana cara mengatakan "saya punya tiga kelinci" dalam bahasa Inggris?',
                        'Hewan apa yang paling banyak di peternakan Cici?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "I have [number] [pet]!" (example: I have two cats / I have a fish).' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 18: Counting Pets and Dialogue',
                        quiz_questions: [
                            { question_text: 'Pertanyaan untuk menanyakan hewan peliharaan teman adalah...', option_a: 'What pet do you have?', option_b: 'What is your name?', option_c: 'How are you?', option_d: 'Where is the cat?', correct_answer: 'A' },
                            { question_text: 'Kalimat "I have four cats" artinya adalah...', option_a: 'Saya punya empat kucing', option_b: 'Kamu punya empat kelinci', option_c: 'Ada empat bebek', option_d: 'Kucing ini berwarna empat', correct_answer: 'A' },
                            { question_text: 'Bentuk jamak dari "one fish" jika berjumlah 5 adalah...', option_a: 'Five fish', option_b: 'Five fishes-es', option_c: 'One fishes', option_d: 'Fish five', correct_answer: 'A' },
                            { question_text: 'Jika ada 2 ekor bebek, kita menyebutnya...', option_a: 'Two ducks', option_b: 'One duck', option_c: 'Two duck', option_d: 'Duck two', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "What pet do [ ... ] have?"', option_a: 'you', option_b: 'is', option_c: 'am', option_d: 'my', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 10: SHE IS CICI AND HE IS MADE
    // =========================================================================
    {
        chapter_number: 10,
        title: 'Unit 10: She is Cici and He is Made',
        target_semester: 2,
        week_target: 19,
        lessons: [
            {
                title: 'Meeting 19: Pronouns & Gender (He is a boy & She is a girl)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi gender serta menggunakan kata ganti orang ketiga tunggal "He" untuk laki-laki (boy/man) dan "She" untuk perempuan (girl/woman) secara tepat.',
                content_text: `# 👦👧 Mengenal He dan She: Teman Laki-Laki & Perempuan!

Di sekolah, kita punya banyak sahabat: ada anak laki-laki yang gagah dan anak perempuan yang manis!  
Yuk, pelajari kata ganti rahasianya: ✨

---

### 👦 1. Gunakan "HE" untuk Laki-Laki
Jika kamu menceritakan anak laki-laki atau ayah:
> ### 🗣️ "He is a boy!" *(Dia anak laki-laki)*  
> ### 🗣️ "He is Made." *(Dia adalah Made)*

* 👨 Ayah kita ➔ **"He is my father."**
* 👦 Joshua ➔ **"He is Joshua."**

---

### 👧 2. Gunakan "SHE" untuk Perempuan
Jika kamu menceritakan anak perempuan atau ibu:
> ### 🗣️ "She is a girl!" *(Dia anak perempuan)*  
> ### 🗣️ "She is Cici." *(Dia adalah Cici)*

* 👩 Ibu tercinta ➔ **"She is my mother."**
* 👧 Aisyah ➔ **"She is Aisyah."**

---

### 🎭 Komik: Memperkenalkan Sahabat Terbaik

\`\`\`text
  Made : "Look at Joshua! He is my best friend. He is a boy!" 👦⚽
  Cici : "And look at Aisyah! She is my best friend. She is a girl!" 👧🌸
  Semua: "We all play happily together!" 🎉
\`\`\`

---

### 💡 Trik Kilat Mengingat:
* 👦 Laki-laki ➔ **HE** *(pendek tanpa huruf S)*.
* 👧 Perempuan ➔ **SHE** *(diawali huruf S)*. 🚀`,
                required_materials: ['Boneka anak laki-laki & perempuan', 'Foto teman sekelas/keluarga'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at our friends! Made is a boy, Cici is a girl! Welcome to Unit 10!"',
                    ice_breaker: 'Tepuk He & She: Ayah sebut nama anak laki-laki tepuk tangan berseru "HE!", sebut perempuan tepuk berseru "SHE!"',
                    apperception: 'Tunjukkan foto Made dan Cici: "Made anak laki-laki, Cici anak perempuan. Bagaimana menyebutnya dalam bahasa Inggris?"',
                    trigger_question: 'Do we say "He" or "She" for your mother?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Aturan kata ganti gender: He = Dia (laki-laki / boy), She = Dia (perempuan / girl).',
                    concrete_steps: [
                        'Tunjuk gambar Made: "He is Made. He is a boy."',
                        'Tunjuk gambar Cici: "She is Cici. She is a girl."',
                        'Tunjuk Ayah: "He is father." Tunjuk Ibu: "She is mother."',
                        'Tegaskan bahwa "He" selalu untuk laki-laki, dan "She" selalu untuk perempuan.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"He untuk anak laki-laki, She untuk anak perempuan. Ingat: He is a boy, She is a girl!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Kilat Topeng He & She',
                    game_rules: [
                        'Siapkan dua kartu bergambar wajah anak laki-laki bertuliskan HE dan anak perempuan bertuliskan SHE.',
                        'Ayah menyebut nama: "Aisyah!". Anak harus mengangkat kartu SHE.',
                        'Ayah menyebut nama: "Joshua!". Anak harus mengangkat kartu HE.',
                        'Jika salah, anak harus melompat sambil menyebutkan He/She dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengangkat kartu He atau She sesuai nama tokoh buku.',
                        child_level_advanced: 'Membuat kalimat lengkap spontan (e.g. He is Joshua, he is a boy).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melingkari pilihan "He is a boy" atau "She is a girl" pada LKPD Unit 10 (p. 92).',
                    worksheet_print_ready: {
                        title: 'LKPD 10.1: HE IS A BOY, SHE IS A GIRL',
                        instructions: 'Look at the picture and choose the correct pronoun sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at Joshua waving. Choose the correct sentence:',
                                data: { icon: '👦', subtitle: 'Boy student', options: ['He is a boy', 'She is a girl'] },
                                answer_key: 'He is a boy',
                                explanation: 'Joshua adalah anak laki-laki (He is a boy).',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at Cici with hair ribbon. Choose the correct sentence:',
                                data: { icon: '👧', subtitle: 'Girl student', options: ['She is a girl', 'He is a boy'] },
                                answer_key: 'She is a girl',
                                explanation: 'Cici adalah anak perempuan (She is a girl).',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the character with the right pronoun:',
                                data: {
                                    pairs: [
                                        { left: '👦 Made (Boy)', right: 'He' },
                                        { left: '👧 Aisyah (Girl)', right: 'She' },
                                    ],
                                },
                                answer_key: 'Made → He; Aisyah → She',
                                explanation: 'Pemasangan gender dengan kata ganti He/She.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: H - E   and   S - H - E',
                                answer_key: 'He and She',
                                explanation: 'Latihan menulis kata He dan She.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Fill in the blank: "Mr. Togar is a sport teacher. [ ... ] is a man." (He / She)',
                                answer_key: 'He',
                                explanation: 'Pak Togar laki-laki menggunakan kata ganti He.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kata ganti mana yang kamu pakai untuk kakak laki-lakimu?',
                        'Kata ganti mana yang kamu pakai untuk kakak perempuanmu?',
                        'Bagaimana cara melafalkan "She" yang benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan melingkari kalimat He/She pada LKPD 10.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 19: He is a Boy, She is a Girl',
                        quiz_questions: [
                            { question_text: 'Kata ganti "He" digunakan untuk...', option_a: 'Laki-laki (Boy / Man)', option_b: 'Perempuan (Girl / Woman)', option_c: 'Hewan kucing', option_d: 'Benda mati', correct_answer: 'A' },
                            { question_text: 'Kata ganti "She" digunakan untuk...', option_a: 'Laki-laki', option_b: 'Perempuan (Girl / Woman)', option_c: 'Pohon', option_d: 'Sepeda', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat untuk Made: "[ ... ] is Made. He is a boy."', option_a: 'He', option_b: 'She', option_c: 'It', option_d: 'You are', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat untuk Ibu: "[ ... ] is my mother."', option_a: 'He', option_b: 'She', option_c: 'Boy', option_d: 'His', correct_answer: 'B' },
                            { question_text: 'Arti dari kata "Boy" dan "Girl" berturut-turut adalah...', option_a: 'Anak laki-laki dan anak perempuan', option_b: 'Anak perempuan dan anak laki-laki', option_c: 'Ibu dan Ayah', option_d: 'Kakak dan Adik', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 20: Describing Friends in Action (He is playing ball / She is reading)',
                order_index: 2,
                learning_objectives: 'Siswa mampu mendeskripsikan aktivitas harian teman sebaya menggunakan pola kalimat "He is [aktivitas]" dan "She is [aktivitas]" berdasarkan gambar situasi.',
                content_text: `# 🏃‍♀️ Teman-Teman Sedang Bermain: He is... dan She is...!

Lihat ke halaman sekolah saat jam istirahat!  
Semua anak sedang asyik bermain dan belajar: ⚽📖🎠

---

### 🎨 1. Apa yang Sedang Mereka Lakukan?

| Tokoh Sahabat | Gambar Aksi | Kalimat Bahasa Inggris |
| :---: | :---: | :--- |
| 👦 Made | ⚽ | 👉 **"He is playing ball!"** *(Dia sedang main bola)* |
| 👧 Aisyah | 📖 | 👉 **"She is reading a book!"** *(Dia sedang membaca)* |
| 👧 Cici | 🎠 | 👉 **"She is on the swing!"** *(Dia sedang main ayunan)* |
| 👦 Joshua | 🏃‍♂️ | 👉 **"He is running!"** *(Dia sedang berlari gembira)* |

---

### 🎭 Komik: Laporan Siaran Langsung Lapangan

\`\`\`text
  Kamu   : "Look at the playground! What is Made doing?" 👦❓
  Teman  : "He is playing ball! Go, Made!" ⚽🏃‍♂️
  Kamu   : "And look at Aisyah under the tree!" 🌳
  Teman  : "She is reading a colorful storybook!" 📖👧✨
\`\`\`

---

### 🔍 Kuis Cepat Mata Elang:
* Anak laki-laki main bola ➔ Ucapkan: **He is playing ball!**
* Anak perempuan baca buku ➔ Ucapkan: **She is reading a book!** 🚀`,
                required_materials: ['Gambar aktivitas di taman sekolah (buku hal. 95)', 'Foto aktivitas keluarga'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at the schoolyard! The boys are playing ball, the girls are on the swing!"',
                    ice_breaker: 'Gerak Aksi Cepat: Ayah sebut "He is kicking ball!", anak menirukan gerakan menendang bola.',
                    apperception: 'Buka gambar halaman 95: "Lihat anak laki-laki yang sedang main ayunan, apakah kita pakai He atau She?"',
                    trigger_question: 'When a girl is reading a book, what do you say?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Penerapan He dan She dalam kalimat deskripsi gambar kontekstual.',
                    concrete_steps: [
                        'Amati gambar halaman 95: Made bermain bola → "Made is a boy. He is playing ball."',
                        'Amati Aisyah di ayunan → "Aisyah is a girl. She is playing swing."',
                        'Amati Bu Nina membaca buku → "Bu Nina is a woman. She is reading."',
                        'Tegaskan fokus pada subjek He vs She.',
                        'Ulangi 3x dengan gambar berbeda.',
                    ],
                    script_parent: '"Selalu periksa orangnya dulu: Kalau laki-laki, pakai HE. Kalau perempuan, pakai SHE!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Panggung Boneka He & She',
                    game_rules: [
                        'Pegang dua boneka: satu anak laki-laki dan satu perempuan.',
                        'Gerakkan boneka melakukan aksi (misal boneka perempuan makan es krim).',
                        'Anak berseru cepat: "She is eating ice cream!"',
                        'Jika salah, anak harus memerankan ulang aksi tersebut.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan kata kunci "He" atau "She".',
                        child_level_advanced: 'Menyebutkan kalimat utuh deskripsi aksi.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melengkapi kalimat rumpang dengan kata "he" atau "she" pada LKPD Unit 10 (p. 95).',
                    worksheet_print_ready: {
                        title: 'LKPD 10.2: DESCRIBING ACTIVITIES (HE / SHE)',
                        instructions: 'Complete the sentences with "he" or "she".',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Made is a boy. What pronoun completes the sentence? "[ ... ] is playing ball."',
                                data: { icon: '⚽', subtitle: 'Boy kicking ball', options: ['he', 'she'] },
                                answer_key: 'he',
                                explanation: 'Made adalah anak laki-laki, menggunakan kata ganti he.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Aisyah is a girl. What pronoun completes the sentence? "[ ... ] is playing on the swing."',
                                data: { icon: '👧', subtitle: 'Girl on swing', options: ['she', 'he'] },
                                answer_key: 'she',
                                explanation: 'Aisyah anak perempuan, menggunakan kata ganti she.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Mrs. Nina is a woman. [ ... ] is reading a book. (he / she)',
                                answer_key: 'she',
                                explanation: 'Bu Nina perempuan, menggunakan kata ganti she.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Azzam is a boy. [ ... ] is doing exercise. (he / she)',
                                answer_key: 'he',
                                explanation: 'Azzam anak laki-laki, menggunakan kata ganti he.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Dinda is eating ice cream. Choose the pronoun: "[ ... ] likes ice cream." (He / She)',
                                answer_key: 'She',
                                explanation: 'Dinda perempuan menggunakan She.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kita menggunakan "she" untuk Bu Nina?',
                        'Bisakah kamu mendeskripsikan apa yang sedang dilakukan ayahmu dengan "He is..."?',
                        'Bagaimana cara melafalkan "playing" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto latihan melengkapi kalimat he/she pada LKPD 10.2 milikmu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 20: Describing Friends in Action',
                        quiz_questions: [
                            { question_text: 'Lengkapi kalimat: "Bagas is a boy. [ ... ] is riding a bicycle."', option_a: 'He', option_b: 'She', option_c: 'I', option_d: 'You', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Cici is a girl. [ ... ] is eating an apple."', option_a: 'She', option_b: 'He', option_c: 'His', option_d: 'Him', correct_answer: 'A' },
                            { question_text: 'Kata ganti untuk seorang kakek (grandfather) adalah...', option_a: 'He', option_b: 'She', option_c: 'Girl', option_d: 'It', correct_answer: 'A' },
                            { question_text: 'Kata ganti untuk seorang nenek (grandmother) adalah...', option_a: 'She', option_b: 'He', option_c: 'Boy', option_d: 'Him', correct_answer: 'A' },
                            { question_text: 'Manakah kalimat yang benar tata bahasanya?', option_a: 'Made is a boy, he is happy', option_b: 'Made is a boy, she is happy', option_c: 'Cici is a girl, he is smiling', option_d: 'Aisyah is a boy, he is running', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },
];