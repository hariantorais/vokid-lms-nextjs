import type { EnglishChapterItem } from './bahasa-inggris-batch-1';

export const BAHASA_INGGRIS_BATCH_4: EnglishChapterItem[] = [
    // =========================================================================
    // UNIT 11: AISYAH'S FAMILY
    // =========================================================================
    {
        chapter_number: 11,
        title: "Unit 11: Aisyah's Family",
        target_semester: 2,
        week_target: 21,
        lessons: [
            {
                title: 'Meeting 21: Family Members (Father, Mother, Brother, Sister)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi dan menyebutkan anggota keluarga inti (father, mother, brother, sister) dalam bahasa Inggris dengan pelafalan yang tepat dan rasa bangga.',
                content_text: `# 👨‍👩‍👧‍👦 Keluarga Tercinta Aisyah!

Hari ini Aisyah mengajak kita melihat album foto keluarganya yang penuh kasih sayang. 💖✨  
Yuk, berkenalan dengan keluarga inti Aisyah:

---

### 🏡 1. Anggota Keluarga Inti

| Foto | Sebutan Bahasa Inggris | Arti Bahasa Indonesia | Panggilan Akrab |
| :---: | :--- | :--- | :--- |
| 👨 | **Father** | Ayah | *Dad / Daddy* |
| 👩 | **Mother** | Ibu | *Mom / Mommy* |
| 👦 | **Brother** | Saudara Laki-Laki | *Bro* |
| 👧 | **Sister** | Saudara Perempuan | *Sis* |

---

### 🗣️ 2. Cara Memperkenalkan Keluargamu
Tunjukkan fotomu dan katakan dengan bangga:
> ### 💬 "This is my father." *(Ini ayahku)*  
> ### 💬 "This is my mother." *(Ini ibuku)*  
> ### 💬 "I love my family!" *(Aku sayang keluargaku!)*

---

### 🎭 Komik: Aisyah Menunjukkan Foto Keluarga

\`\`\`text
  Cici   : "Aisyah, who is this tall man in the photo?" 👨❓
  Aisyah : "This is my father! His name is Mr. Hamid." 😊✨
  Cici   : "And who is this sweet boy?" 👦
  Aisyah : "This is my brother, Fahri! I love my brother!" 💖
\`\`\``,
                required_materials: ['Foto keluarga siswa di rumah', 'Boneka keluarga', 'Kertas gambar & krayon'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"I love my family! Today we meet Aisyah\'s lovely family!"',
                    ice_breaker: 'Lagu Satu-Satu Aku Sayang Ibu (Versi English): "One and one, I love my mother... Two and two, I love my father too!"',
                    apperception: 'Tunjukkan foto keluarga: "Siapa saja orang tercinta yang tinggal serumah denganmu?"',
                    trigger_question: 'What is the English word for ayah and ibu?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata anggota keluarga: Father (ayah), Mother (ibu), Brother (saudara laki-laki), Sister (saudara perempuan).',
                    concrete_steps: [
                        'Tunjuk foto ayah: "This is my father. Say: father."',
                        'Tunjuk foto ibu: "This is my mother. Say: mother."',
                        'Tunjuk saudara laki-laki: "brother."',
                        'Tunjuk saudara perempuan: "sister."',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Tunjuk foto keluarga dan ucapkan dengan cinta: My father, my mother, my brother, my sister!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Foto Keluarga Tersayang',
                    game_rules: [
                        'Letakkan foto keluarga di tengah meja.',
                        'Ayah menutup satu wajah dengan telapak tangan.',
                        'Anak harus menebak dengan cepat: "This is my mother!" atau "This is my brother!"',
                        'Jika salah, anak harus menyanyikan "Finger Family" satu bait.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan sebutan father/mother.',
                        child_level_advanced: 'Membuat kalimat pengenalan nama: "This is my father, his name is..."',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghubungkan foto keluarga Aisyah dengan kata yang tepat pada LKPD Unit 11 (p. 98).',
                    worksheet_print_ready: {
                        title: "LKPD 11.1: AISYAH'S CORE FAMILY",
                        instructions: "Look at Aisyah's family photo and match the words.",
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the Indonesian family role with the English word:',
                                data: {
                                    pairs: [
                                        { left: '👨 Ayah', right: 'Father' },
                                        { left: '👩 Ibu', right: 'Mother' },
                                        { left: '👦 Saudara Laki-laki', right: 'Brother' },
                                        { left: '👧 Saudara Perempuan', right: 'Sister' },
                                    ],
                                },
                                answer_key: 'Ayah → Father; Ibu → Mother; Saudara Laki-laki → Brother; Saudara Perempuan → Sister',
                                explanation: 'Pemasangan kosa kata anggota keluarga inti.',
                            },
                            {
                                id: 2,
                                type: 'MATH_PROBLEM',
                                question: "Mr. Hamid is Aisyah's [ ... ] (father / sister)",
                                answer_key: 'father',
                                explanation: 'Pak Hamid adalah ayah (father) Aisyah.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: "Mrs. Shofi is Aisyah's [ ... ] (mother / brother)",
                                answer_key: 'mother',
                                explanation: 'Bu Shofi adalah ibu (mother) Aisyah.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: "Fahri is a boy. He is Aisyah's [ ... ] (brother / mother)",
                                answer_key: 'brother',
                                explanation: 'Fahri anak laki-laki adalah saudara laki-laki (brother).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "I love my [ ... ] and mother very much." (father / cat)',
                                answer_key: 'father',
                                explanation: 'Ayah dan ibu adalah father and mother.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Berapa saudara laki-laki atau perempuan yang kamu miliki?',
                        'Apa makanan favorit ibumu?',
                        'Bagaimana cara melafalkan "Father" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto kamu memegang foto keluarga sambil menunjukkan lembar LKPD 11.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 21: Core Family Members',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari kata "Ayah" adalah...', option_a: 'Mother', option_b: 'Father', option_c: 'Brother', option_d: 'Sister', correct_answer: 'B' },
                            { question_text: 'Bahasa Inggris dari kata "Ibu" adalah...', option_a: 'Mother', option_b: 'Father', option_c: 'Grandpa', option_d: 'Brother', correct_answer: 'A' },
                            { question_text: 'Arti kata "Brother" dalam bahasa Indonesia adalah...', option_a: 'Saudara laki-laki', option_b: 'Saudara perempuan', option_c: 'Bibi', option_d: 'Paman', correct_answer: 'A' },
                            { question_text: 'Arti kata "Sister" dalam bahasa Indonesia adalah...', option_a: 'Saudara perempuan', option_b: 'Saudara laki-laki', option_c: 'Kakek', option_d: 'Nenek', correct_answer: 'A' },
                            { question_text: 'Panggilan akrab untuk "Mother" adalah...', option_a: 'Mom / Mommy', option_b: 'Dad', option_c: 'Bro', option_d: 'Sir', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 22: Grandparents & Family Tree (Grandfather & Grandmother)',
                order_index: 2,
                learning_objectives: 'Siswa mampu mengidentifikasi kakek dan nenek (grandfather, grandmother), menggunakan panggilan akrab (grandpa, grandma), serta mendeskripsikan kepemilikan benda anggota keluarga menggunakan kata kerja "has".',
                content_text: `# 👵👴 Kakek, Nenek, dan Pohon Keluarga Ajaib!

Siapa yang suka berkunjung ke rumah Kakek dan Nenek saat liburan?  
Kakek dan Nenek selalu menyambut kita dengan senyuman hangat dan pelukan erat! 🏡🍪

---

### 🌟 1. Mengenal Kakek dan Nenek

| Gambar | Nama Resmi | Panggilan Sayang | Arti Bahasa Indonesia |
| :---: | :--- | :--- | :--- |
| 👴 | **Grandfather** | **Grandpa** | Kakek |
| 👵 | **Grandmother** | **Grandma** | Nenek |

---

### 🍉 2. Apa yang Dimiliki Keluargamu? (Using "Has")
Bila menceritakan anggota keluarga yang memiliki sesuatu, gunakan kata **"has"**:
> ### 🗣️ "My father has two watermelons."  
> *(Artinya: Ayahku punya dua semangka)*  
> ### 🗣️ "My grandmother has five apples."  
> *(Artinya: Nenekku punya lima apel)*

---

### 🎭 Komik: Pohon Keluarga Aisyah

\`\`\`text
  Aisyah : "Look at the top of my family tree! This is my grandfather!" 👴🌳
  Cici   : "And next to him is your grandmother! She has glasses!" 👵👓
  Aisyah : "Yes! Grandpa and Grandma love telling funny stories!" 💖✨
\`\`\``,
                required_materials: ['Pohon keluarga kertas (Family tree)', 'Foto kakek-nenek', 'Boneka kakek-nenek'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we honor our wise grandparents: Grandfather and Grandmother!"',
                    ice_breaker: 'Tiru Gaya Kakek: Berjalan pelan membungkuk memegang tongkat imajiner: "Grandfather is walking!"',
                    apperception: 'Tanyakan: "Siapa orang tua dari ayah dan ibumu? Kita memanggil mereka kakek dan nenek."',
                    trigger_question: 'How do you call your grandma and grandpa in English?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata Grandfather (kakek) dan Grandmother (nenek) serta frasa kepemilikan keluarga dengan "has".',
                    concrete_steps: [
                        'Tunjukkan gambar kakek berambut putih: "Grandfather / Grandpa."',
                        'Tunjukkan gambar nenek berkacamata: "Grandmother / Grandma."',
                        'Latih kalimat gabungan: "My father has nine apples", "My mother has two watermelons."',
                        'Bimbing anak membuat pohon keluarga sederhana.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Grandpa dan Grandma adalah kakek-nenek kita. Perlakukan mereka dengan hormat dan cinta yang mendalam!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Pohon Keluarga Ajaib (Family Tree Show & Tell)',
                    game_rules: [
                        'Gambar pohon besar di kertas karton dengan cabang-cabang keluarga.',
                        'Anak menempelkan kartu foto: Kakek di puncak atas, Ayah-Ibu di tengah, anak di bawah.',
                        'Anak mempresentasikan: "This is my grandfather, and this is my grandmother!"',
                        'Jika salah menempel, anak harus bercerita satu kalimat tentang kakek-nenek.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menempelkan kartu kakek dan nenek pada pohon.',
                        child_level_advanced: 'Menceritakan hobi kakek/nenek dalam kalimat bahasa Inggris sederhana.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mendengar dan mencentang anggota keluarga pada LKPD Unit 11 (p. 100).',
                    worksheet_print_ready: {
                        title: 'LKPD 11.2: GRANDPARENTS AND FAMILY TREE',
                        instructions: 'Listen and check (√) if the statement matches the picture.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Picture of an elderly woman with spectacles: "This is grandmother." (Yes / No)',
                                data: { icon: '👵', subtitle: 'Elderly woman', options: ['Yes', 'No'] },
                                answer_key: 'Yes',
                                explanation: 'Gambar wanita tua berkacamata adalah nenek (grandmother).',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Picture of an elderly man with grey hair: "This is sister." (Yes / No)',
                                data: { icon: '👴', subtitle: 'Elderly man', options: ['Yes', 'No'] },
                                answer_key: 'No',
                                explanation: 'Pernyataan salah, pria tua adalah grandfather bukan sister.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the formal name with the friendly nickname:',
                                data: {
                                    pairs: [
                                        { left: '👴 Grandfather', right: 'Grandpa' },
                                        { left: '👵 Grandmother', right: 'Grandma' },
                                    ],
                                },
                                answer_key: 'Grandfather → Grandpa; Grandmother → Grandma',
                                explanation: 'Panggilan akrab kakek dan nenek.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Short friendly word for Grandfather is [ ... ] (Grandpa / Dad)',
                                answer_key: 'Grandpa',
                                explanation: 'Grandpa adalah panggilan akrab untuk kakek.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "My mother has two [ ... ]." 🍉 🍉 (watermelons / apples)',
                                answer_key: 'watermelons',
                                explanation: 'Gambar dua semangka: two watermelons.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu suka mengunjungi kakek-nenekmu?',
                        'Buah apa yang biasa dibeli ibumu untuk keluarga?',
                        'Bagaimana cara melafalkan "Grandfather" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "I love my grandfather and my grandmother!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 22: Grandparents and Family Tree',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari kata "Kakek" adalah...', option_a: 'Grandfather', option_b: 'Grandmother', option_c: 'Father', option_d: 'Brother', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari kata "Nenek" adalah...', option_a: 'Grandmother', option_b: 'Grandfather', option_c: 'Mother', option_d: 'Sister', correct_answer: 'A' },
                            { question_text: 'Panggilan akrab untuk "Grandfather" adalah...', option_a: 'Grandpa', option_b: 'Mommy', option_c: 'Daddy', option_d: 'Sister', correct_answer: 'A' },
                            { question_text: 'Panggilan akrab untuk "Grandmother" adalah...', option_a: 'Grandma', option_b: 'Uncle', option_c: 'Aunt', option_d: 'Brother', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "My father [ ... ] two watermelons."', option_a: 'has', option_b: 'have', option_c: 'are', option_d: 'am', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 12: SHE HAS SOME FRUITS
    // =========================================================================
    {
        chapter_number: 12,
        title: 'Unit 12: She Has Some Fruits',
        target_semester: 2,
        week_target: 23,
        lessons: [
            {
                title: 'Meeting 23: Fruits Vocabulary (Apples, Mangoes, Oranges, Bananas, Strawberries, Watermelons)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi dan menyebutkan 6 nama buah populer (apples, mangoes, oranges, bananas, strawberries, watermelons) dalam bentuk kata benda jamak secara benar.',
                content_text: `# 🍉 Toko Buah Segar Penuh Warna!

Nyam... lezat dan manis sekali! Di meja makan ada sekeranjang buah-buahan segar penuh vitamin. 🍇🍓  
Yuk, sebutkan nama buah-buahan favoritmu dalam bahasa Inggris:

---

### 🍎 1. Galeri 6 Buah Lezat

| Gambar | Nama Jamak (Banyak) | Warna Khasnya | Rasanya |
| :---: | :--- | :--- | :--- |
| 🍎 | **Apples** | Merah / Hijau | Renyah manis |
| 🥭 | **Mangoes** | Kuning / Oranye | Manis harum |
| 🍊 | **Oranges** | Oranye segar | Asam manis banyak air |
| 🍌 | **Bananas** | Kuning cerah | Manis lembut |
| 🍓 | **Strawberries** | Merah berbintik | Asam manis segar |
| 🍉 | **Watermelons** | Hijau di luar, merah di dalam | Segar dan berair dingin |

---

### 🧺 2. Keranjang Belanja Buah
Saat melihat buah di toko, katakan:
> ### 💬 "These are sweet apples!" *(Ini apel-apel manis!)*  
> ### 💬 "These are yellow bananas!" *(Ini pisang-pisang kuning!)*

---

### 🎭 Komik: Belanja Buah di Pasar

\`\`\`text
  Joshua : "Look at the big watermelons, Cici!" 🍉✨
  Cici   : "And I see red strawberries! They look delicious!" 🍓😋
  Joshua : "Let's buy bananas and mangoes for our snack!" 🍌🥭
\`\`\``,
                required_materials: ['Buah nyata di dapur atau kartu bergambar buah', 'Keranjang buah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Yummy in my tummy! Today we explore delicious juicy fruits!"',
                    ice_breaker: 'Kupas Pisang Berirama: Gerakan mengupas pisang "Peel banana, peel peel banana... EAT BANANA!"',
                    apperception: 'Tunjukkan buah pisang dan apel: "Buah apa ini yang paling sering kita makan untuk sarapan?"',
                    trigger_question: 'What is your favorite sweet fruit on the dining table?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata buah bentuk jamak: Apples, Mangoes, Oranges, Bananas, Strawberries, Watermelons.',
                    concrete_steps: [
                        'Tunjukkan buah pisang: "Bananas... yellow bananas."',
                        'Tunjukkan mangga: "Mangoes... sweet mangoes."',
                        'Tunjukkan semangka: "Watermelons... big watermelons."',
                        'Tunjukkan stroberi: "Strawberries... red strawberries."',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Lihat buah-buah berwarna cerah: Red apples, yellow bananas, dan green watermelons!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Pasar Buah Segar (Fresh Fruit Market)',
                    game_rules: [
                        'Tata buah-buahan di atas piring sebagai stan toko buah.',
                        'Ayah menjadi pembeli: "Can I have two bananas, please?".',
                        'Anak menyerahkan buah sambil menyebutkan: "Here are two bananas!"',
                        'Jika salah menyebut buah, anak harus menirukan suara hewan lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mengambil buah sesuai nama yang diucapkan.',
                        child_level_advanced: 'Menghitung total buah pesanan dan menyebutkan warnanya.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghubungkan gambar buah dengan kata yang tepat pada LKPD Unit 12 (p. 106).',
                    worksheet_print_ready: {
                        title: 'LKPD 12.1: DELICIOUS FRUITS',
                        instructions: 'Draw a line to match the fruit picture with the correct sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the fruit with its English name:',
                                data: {
                                    pairs: [
                                        { left: '🍌 Yellow fruit', right: 'Banana' },
                                        { left: '🍉 Big green fruit', right: 'Watermelon' },
                                        { left: '🍓 Red seeded fruit', right: 'Strawberry' },
                                    ],
                                },
                                answer_key: 'Pisang → Banana; Semangka → Watermelon; Stroberi → Strawberry',
                                explanation: 'Pemasangan gambar buah dengan namanya.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the basket of red apples. What fruit is this?',
                                data: { icon: '🍎', subtitle: 'Juicy red fruit', options: ['Apples', 'Mangoes'] },
                                answer_key: 'Apples',
                                explanation: 'Buah apel adalah apples.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Fruit that is big and green outside, red inside is [ ... ] (watermelon / orange)',
                                answer_key: 'watermelon',
                                explanation: 'Semangka adalah watermelon.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: A - P - P - L - E',
                                answer_key: 'apple',
                                explanation: 'Menebalkan kata apple.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Small red fruit with tiny seeds on its skin is [ ... ] (strawberry / mango)',
                                answer_key: 'strawberry',
                                explanation: 'Stroberi adalah strawberry.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Buah apa yang paling banyak kamu makan di rumah?',
                        'Apa warna pisang yang sudah matang?',
                        'Bagaimana cara melafalkan "Strawberries" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil menjodohkan garis gambar buah pada LKPD 12.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 23: Fruits Vocabulary',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari buah "Pisang" adalah...', option_a: 'Banana', option_b: 'Apple', option_c: 'Mango', option_d: 'Orange', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari buah "Semangka" adalah...', option_a: 'Watermelon', option_b: 'Strawberry', option_c: 'Orange', option_d: 'Banana', correct_answer: 'A' },
                            { question_text: 'Buah yang berwarna oranye dan banyak mengandung vitamin C adalah...', option_a: 'Orange', option_b: 'Apple', option_c: 'Banana', option_d: 'Watermelon', correct_answer: 'A' },
                            { question_text: 'Arti kata "Mangoes" dalam bahasa Indonesia adalah...', option_a: 'Mangga', option_b: 'Apel', option_c: 'Pisang', option_d: 'Jeruk', correct_answer: 'A' },
                            { question_text: 'Buah kecil berwarna merah berbintik manis adalah...', option_a: 'Strawberry', option_b: 'Watermelon', option_c: 'Banana', option_d: 'Mango', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 24: He Has / She Has Some Fruits',
                order_index: 2,
                learning_objectives: 'Siswa mampu menyusun kalimat kepemilikan orang ketiga tunggal menggunakan pola "He has [buah]" dan "She has [buah]" dengan keselarasan tata bahasa yang tepat.',
                content_text: `# 🧺 Keranjang Buah: He Has dan She Has!

Made dan Cici baru saja memetik buah dari kebun.  
Berapa banyak buah yang ada di keranjang mereka masing-masing? 🍎🍌✨

---

### 👦 1. Keranjang Milik Anak Laki-Laki (He Has...)
Jika bercerita tentang Made atau teman laki-laki:
> ### 🗣️ "He has five mangoes."  
> *(Artinya: Dia laki-laki punya lima mangga)*

---

### 👧 2. Keranjang Milik Anak Perempuan (She Has...)
Jika bercerita tentang Cici atau teman perempuan:
> ### 🗣️ "She has eight bananas."  
> *(Artinya: Dia perempuan punya delapan pisang)*

| Tokoh Sahabat | Isi Keranjangnya | Kalimat Bahasa Inggris |
| :---: | :---: | :--- |
| 👦 Made | 5 Mangga | 👉 **"He has five mangoes."** |
| 👧 Cici | 8 Pisang | 👉 **"She has eight bananas."** |
| 👧 Aisyah | 10 Stroberi | 👉 **"She has ten strawberries."** |
| 👦 Joshua | 6 Jeruk | 👉 **"He has six oranges."** |

---

### 🎭 Komik: Pesta Buah Bersama

\`\`\`text
  Joshua : "Look at Made's basket! He has five sweet mangoes!" 🥭👦
  Made   : "And look at Cici! She has eight yellow bananas!" 🍌👧
  Semua  : "Let's share and make a fresh fruit salad!" 🥗🎉
\`\`\``,
                required_materials: ['Keranjang buah mainan', 'Kartu tokoh anak laki-laki & perempuan', 'Buah nyata'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look at Made and Cici with their fruit baskets! Who has the sweet apples?"',
                    ice_breaker: 'Tepuk Have & Has: Ayah sebut "I" anak teriak "HAVE!", Ayah sebut "He / She" anak teriak "HAS!"',
                    apperception: 'Bandingkan: "Kalau saya punya buku kita bilang I have. Kalau dia anak laki-laki punya buku, kita bilang apa?"',
                    trigger_question: 'Do we say "He have apples" or "He has apples"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perbedaan penggunaan Have vs Has: I have, You have, tetapi He HAS dan She HAS.',
                    concrete_steps: [
                        'Beri Made gambar 7 apel → "He has seven apples."',
                        'Beri Cici gambar 10 stroberi → "She has ten strawberries."',
                        'Beri Aisyah 6 jeruk → "She has six oranges."',
                        'Tekankan bunyi akhiran /z/ pada kata HAS.',
                        'Ulangi 3x dengan tokoh berbeda.',
                    ],
                    script_parent: '"He has, She has. Saat bicara tentang orang lain, gunakan HAS!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Keranjang Buah Rahasia (Who Has the Fruit?)',
                    game_rules: [
                        'Sembunyikan kartu buah di belakang punggung anggota keluarga.',
                        'Anak menebak keranjang: "He has mangoes!" atau "She has bananas!".',
                        'Buka kartu bersama dan buktikan kebenarannya.',
                        'Jika salah, anak harus menyebutkan kalimat "He has... She has..." dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan "He has..." atau "She has..." dengan kartu bantu.',
                        child_level_advanced: 'Menghitung jumlah spesifik buah dalam keranjang (e.g. She has eight strawberries).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melengkapi kalimat "He has..." / "She has..." pada LKPD Unit 12 (p. 108).',
                    worksheet_print_ready: {
                        title: 'LKPD 12.2: HE HAS AND SHE HAS FRUITS',
                        instructions: 'Complete the sentences based on the picture and read them aloud.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Made has a basket of 5 mangoes. What is the correct sentence?',
                                data: { icon: '🥭', subtitle: 'Made (Boy)', options: ['He has five mangoes', 'She has five mangoes'] },
                                answer_key: 'He has five mangoes',
                                explanation: 'Made anak laki-laki menggunakan He has five mangoes.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Cici has a basket of 8 bananas. What is the correct sentence?',
                                data: { icon: '🍌', subtitle: 'Cici (Girl)', options: ['She has eight bananas', 'He has eight bananas'] },
                                answer_key: 'She has eight bananas',
                                explanation: 'Cici anak perempuan menggunakan She has eight bananas.',
                            },
                            {
                                id: 3,
                                type: 'PICT_COUNT',
                                question: 'Count the strawberries: She has [ ... ] (ten strawberries / two apples)',
                                data: { total: 10, icon: '🍓' },
                                answer_key: 'ten strawberries',
                                explanation: 'Sepuluh stroberi: ten strawberries.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Grammar check: "He [ ... ] seven apples." (has / have)',
                                answer_key: 'has',
                                explanation: 'Subjek orang ketiga tunggal He menggunakan kata has.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your own family: "My father has [ ... ]" (Example: four oranges / three watermelons)',
                                answer_key: 'four oranges',
                                explanation: 'Membuat kalimat kepemilikan buah ayah di rumah.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa perbedaan antara "I have" dan "She has"?',
                        'Buah apa yang ayahmu miliki di dapur?',
                        'Bagaimana cara melafalkan "has" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "He has five mangoes, and she has eight bananas!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 24: Using Has for Third Person',
                        quiz_questions: [
                            { question_text: 'Kata kerja kepemilikan yang tepat untuk subjek "He" adalah...', option_a: 'Have', option_b: 'Has', option_c: 'Are', option_d: 'Am', correct_answer: 'B' },
                            { question_text: 'Kata kerja kepemilikan yang tepat untuk subjek "She" adalah...', option_a: 'Has', option_b: 'Have', option_c: 'Do', option_d: 'You', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Joshua [ ... ] six oranges."', option_a: 'has', option_b: 'have', option_c: 'are', option_d: 'am', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "She has ten strawberries" adalah...', option_a: 'Dia (perempuan) memiliki sepuluh stroberi', option_b: 'Saya memiliki sepuluh stroberi', option_c: 'Kamu memiliki sepuluh stroberi', option_d: 'Dia menyukai sepuluh apel', correct_answer: 'A' },
                            { question_text: 'Manakah kalimat bahasa Inggris yang paling tepat?', option_a: 'He has seven apples', option_b: 'He have seven apples', option_c: 'She have one apple', option_d: 'I has two apples', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 13: I LIKE FRUITS
    // =========================================================================
    {
        chapter_number: 13,
        title: 'Unit 13: I Like Fruits',
        target_semester: 2,
        week_target: 25,
        lessons: [
            {
                title: 'Meeting 25: Expressing Fruit Preferences (I like... & Do you like...?)',
                order_index: 1,
                learning_objectives: 'Siswa mampu menyatakan buah favorit pribadi menggunakan ungkapan "I like [buah]" serta menanyakan preferensi buah kepada orang lain lewat pertanyaan "Do you like [buah]?".',
                content_text: `# 😋 Aku Suka Buah Manis: I Like Fruits!

Angkat kedua jempolmu ke atas kalau kamu suka makan buah semangka yang manis dan segar! 👍👍🍉  
Yuk, belajar menyatakan buah kesukaanmu:

---

### 👍 1. Menyatakan Buah Kesukaanmu
Gunakan kata **"I like..."** *(Aku suka...)*:
> ### 🗣️ "I like apples!" *(Aku suka apel!)*  
> ### 🗣️ "I like watermelons!" *(Aku suka semangka!)*

---

### ❓ 2. Menanyakan Buah Kesukaan Teman
Tanyakan dengan senyum ramah:
> ### 🗣️ "Do you like bananas?"  
> *(Artinya: Apakah kamu suka pisang?)*

Bagaimana cara menjawabnya?
* Jika **suka**: 👉 **"Yes, I like bananas!"** 😊👍
* Jika **tidak suka**: 👉 **"No, I don't like bananas."** 🙅‍♂️

---

### 🎭 Komik: Obrolan Seru Saat Jam Makan Siang

\`\`\`text
  Aisyah : "Joshua, do you like strawberries?" 🍓❓
  Joshua : "Yes, I like strawberries! They are sweet and sour!" 😋👍
  Aisyah : "Do you like watermelon too?" 🍉
  Joshua : "Yes, I do! Watermelon is my favorite fruit!" 🎉
\`\`\``,
                required_materials: ['Kartu emoji jempol suka (Thumbs up like)', 'Buah nyata', 'Kertas survei'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Mmm... sweet fruits! Give me two big thumbs up if you like sweet watermelon!"',
                    ice_breaker: 'Chant Kesukaan Buah: "I like apples, crunch crunch crunch! I like bananas, munch munch munch!"',
                    apperception: 'Tanyakan: "Buah apa yang paling kamu sukai di dunia? Bagaimana mengatakannya dalam bahasa Inggris?"',
                    trigger_question: 'What do you say when you love eating mangoes?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola kalimat kesukaan pribadi: I like + [Nama Buah]. Pertanyaan: Do you like + [Nama Buah]?',
                    concrete_steps: [
                        'Ucapkan sambil tersenyum menunjukkan jempol: "I like apples."',
                        'Ajarkan bertanya ke orang lain: "Do you like orange, Cici?".',
                        'Ajarkan respon: "Yes, I like orange!" atau "No, I don\'t like orange."',
                        'Praktikkan dengan berbagai nama buah.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Tunjukkan senyum besar dan ucapkan: I like strawberries because they are sweet!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sensus Buah Favorit Keluarga (Do You Like...?)',
                    game_rules: [
                        'Anak membawa kartu gambar buah keliling rumah.',
                        'Bertanya kepada Ayah: "Do you like watermelon, Dad?".',
                        'Ayah menjawab: "Yes, I do!". Anak memberi tanda centang di kolom tabel buah semangka.',
                        'Setelah selesai, anak melaporkan: "Dad likes watermelon. Mom likes mangoes."',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Bertanya menggunakan 1 nama buah dengan bantuan kartu.',
                        child_level_advanced: 'Mewawancarai dan menceritakan alasan kesukaan (e.g. It is sweet and cold).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencatat survei buah kesukaan pada tabel LKPD Unit 13 (p. 122).',
                    worksheet_print_ready: {
                        title: 'LKPD 13.1: I LIKE FRUITS SURVEY',
                        instructions: 'Ask your family members about their favorite fruits and put a tick (√).',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'You love sweet red apples. What do you say with a thumbs up?',
                                data: { icon: '🍎', subtitle: 'Thumbs up preference', options: ['I like apples', 'I like shoes'] },
                                answer_key: 'I like apples',
                                explanation: 'Menyatakan kesukaan buah apel: I like apples.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Question: "Do you like bananas?". If you love bananas, what is your answer?',
                                data: { icon: '🍌', subtitle: 'Favorite fruit', options: ['Yes, I like bananas', 'No, goodbye'] },
                                answer_key: 'Yes, I like bananas',
                                explanation: 'Jawaban bila menyukai buah adalah Yes, I like bananas.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the question with the response:',
                                data: {
                                    pairs: [
                                        { left: '❓ "Do you like orange?"', right: 'Yes, I like orange' },
                                        { left: '❓ "Do you like mango?"', right: "No, I don't like mango" },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai respon tanya jawab',
                                explanation: 'Pola tanya jawab kesukaan buah.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: L - I - K - E',
                                answer_key: 'like',
                                explanation: 'Latihan menulis kata like.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Draw your favorite fruit in the box and complete: "I like [ ... ]"',
                                answer_key: 'Nama buah favorit siswa',
                                explanation: 'Mengekspresikan kesukaan buah secara personal.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Buah apa yang paling kamu sukai?',
                        'Apakah ibumu menyukai buah yang sama denganmu?',
                        'Bagaimana cara melafalkan "Like" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice: "Hello! My name is [Name], and I like [your favorite fruit]!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 25: Expressing Preferences (I like...)',
                        quiz_questions: [
                            { question_text: 'Arti dari kata "like" pada kalimat "I like apples" adalah...', option_a: 'Melihat', option_b: 'Suka / gemar', option_c: 'Membeli', option_d: 'Memotong', correct_answer: 'B' },
                            { question_text: 'Kalimat bahasa Inggris untuk "Saya suka semangka" adalah...', option_a: 'I like watermelon', option_b: 'I has watermelon', option_c: 'You are watermelon', option_d: 'I like book', correct_answer: 'A' },
                            { question_text: 'Pertanyaan untuk menanyakan apakah teman menyukai jeruk adalah...', option_a: 'Do you like orange?', option_b: 'What is orange?', option_c: 'Where is orange?', option_d: 'How are you orange?', correct_answer: 'A' },
                            { question_text: 'Jika teman bertanya "Do you like bananas?" dan kamu menyukainya, kamu menjawab...', option_a: 'Yes, I like bananas', option_b: 'Goodbye banana', option_c: 'I am fine', option_d: 'No thank you', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "I [ ... ] sweet strawberries."', option_a: 'like', option_b: 'am', option_c: 'is', option_d: 'you', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 26: Stating Others\' Preferences (He likes / She likes fruits)',
                order_index: 2,
                learning_objectives: 'Siswa mampu melaporkan kesukaan orang lain menggunakan kata kerja orang ketiga tunggal "He likes [buah]" dan "She likes [buah]" dengan tepat.',
                content_text: `# 🍓 Dia Suka Buah: He Likes dan She Likes!

Sekarang kita menjadi reporter buah yang bertugas menceritakan buah kesukaan teman-teman! 🎤✨  
Perhatikan desis huruf **-S** di ujung kata **likes**:

---

### 👦 1. Kesukaan Teman Laki-Laki (He Likes...)
> ### 🗣️ "Made is a boy. He likes mangoes!"  
> *(Artinya: Made anak laki-laki. Dia suka mangga!)*

---

### 👧 2. Kesukaan Teman Perempuan (She Likes...)
> ### 🗣️ "Cici is a girl. She likes oranges!"  
> *(Artinya: Cici anak perempuan. Dia suka jeruk!)*

| Tokoh Sahabat | Buah Kesukaannya | Kalimat Laporan Reporter |
| :---: | :---: | :--- |
| 👦 Made | 🥭 Mangga | 👉 **"He likes mangoes."** |
| 👧 Cici | 🍊 Jeruk | 👉 **"She likes oranges."** |
| 👧 Aisyah | 🍎 Apel | 👉 **"She likes apples."** |
| 👦 Joshua | 🍉 Semangka | 👉 **"He likes watermelons."** |

---

### 💡 Rumus Rahasia Desis S:
* Kalau bicara tentang dirimu ➔ **I like** *(tanpa S)*.
* Kalau menceritakan dia ➔ **He likeSSSS / She likeSSSS** *(ada bunyi desis S)*! 🐍🚀`,
                required_materials: ['Gambar tokoh Made, Cici, Aisyah memegang buah favorit', 'Kartu buah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we report our friends\' favorite fruits to the world!"',
                    ice_breaker: 'Tepuk Desis Suka: "I like!" (tepuk paha), "He likes!" (desis Sssss di akhir kata).',
                    apperception: 'Ingat kembali: Cici suka jeruk, Made suka semangka. Bagaimana menceritakannya?',
                    trigger_question: 'Do we say "She like" or "She likes"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perubahan tata bahasa preferensi: I like, You like, tetapi He LIKES dan She LIKES.',
                    concrete_steps: [
                        'Tunjukkan gambar Aisyah memakan apel → "She likes apple."',
                        'Tunjukkan gambar Made memakan mangga → "He likes mango."',
                        'Tunjukkan gambar Cici membawa jeruk → "She likes orange."',
                        'Tegaskan bunyi desis -s pada kata LIKES.',
                        'Ulangi 3x dengan tokoh berbeda.',
                    ],
                    script_parent: '"Tambahkan \'s\' saat bicara tentang dia: He likes mango, She likes apple!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Teka-Teki Tebak Buah Kesukaan Sahabat',
                    game_rules: [
                        'Ayah menunjukkan kartu tokoh di buku.',
                        'Anak mengamati buah yang dipegang tokoh lalu berseru cepat:',
                        '"Aisyah is a girl, she likes apple!" atau "Made is a boy, he likes watermelon!"',
                        'Jika salah menyebutkan like/likes, anak harus mengulang sambil melompat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan "She likes..." dengan panduan gambar.',
                        child_level_advanced: 'Menceritakan buah kesukaan seluruh anggota keluarga dalam 3 kalimat berurutan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Melingkari buah kesukaan tokoh pada LKPD Unit 13 (Listen and circle p. 122-123).',
                    worksheet_print_ready: {
                        title: 'LKPD 13.2: HE LIKES AND SHE LIKES FRUITS',
                        instructions: 'Listen to the audio sentences and circle the right fruit for each person.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Audio Script: "Aisyah likes apple". Circle the right fruit for Aisyah:',
                                data: { icon: '🍎', subtitle: "Aisyah's favorite fruit", options: ['Apple', 'Banana'] },
                                answer_key: 'Apple',
                                explanation: 'Aisyah menyukai buah apel (apple).',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Audio Script: "Joshua likes watermelon". Circle the fruit for Joshua:',
                                data: { icon: '🍉', subtitle: "Joshua's favorite fruit", options: ['Watermelon', 'Orange'] },
                                answer_key: 'Watermelon',
                                explanation: 'Joshua menyukai buah semangka (watermelon).',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the person with the fruit preference sentence:',
                                data: {
                                    pairs: [
                                        { left: '👦 Made', right: 'He likes mango' },
                                        { left: '👧 Cici', right: 'She likes orange' },
                                    ],
                                },
                                answer_key: 'Made → He likes mango; Cici → She likes orange',
                                explanation: 'Menjodohkan tokoh dengan buah kesukaannya.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Grammar check: "He [ ... ] bananas." (likes / like)',
                                answer_key: 'likes',
                                explanation: 'Subjek He menggunakan kata kerja berakhiran -s (likes).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Report what your mother likes: "My mother is a woman. She [ ... ] sweet oranges." (likes / like)',
                                answer_key: 'likes',
                                explanation: 'Ibu (She) menggunakan kata kerja likes.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kata "like" berubah menjadi "likes" untuk he dan she?',
                        'Buah apa yang disukai sahabatmu?',
                        'Bagaimana cara melafalkan "likes" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil lingkaran buah kesukaan tokoh pada LKPD 13.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 26: He Likes and She Likes Fruits',
                        quiz_questions: [
                            { question_text: 'Bentuk kata "like" yang tepat untuk subjek "He" adalah...', option_a: 'Likes', option_b: 'Like', option_c: 'Is like', option_d: 'Are like', correct_answer: 'A' },
                            { question_text: 'Bentuk kata "like" yang tepat untuk subjek "She" adalah...', option_a: 'Likes', option_b: 'Like', option_c: 'Am like', option_d: 'Liking', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Cici [ ... ] sweet strawberries."', option_a: 'likes', option_b: 'like', option_c: 'have', option_d: 'is', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "He likes bananas" adalah...', option_a: 'Dia (laki-laki) menyukai pisang', option_b: 'Dia menyukai apel', option_c: 'Saya suka pisang', option_d: 'Kamu suka pisang', correct_answer: 'A' },
                            { question_text: 'Manakah kalimat bahasa Inggris yang benar tata bahasanya?', option_a: 'She likes orange', option_b: 'She like orange', option_c: 'He are like orange', option_d: 'I likes orange', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 14: COMPREHENSIVE REVIEW & GRADUATION
    // =========================================================================
    {
        chapter_number: 14,
        title: 'Unit 14: Comprehensive Review & Graduation',
        target_semester: 2,
        week_target: 27,
        lessons: [
            {
                title: 'Meeting 27: Semester 1 Review (Greetings, Names, Numbers 1-10, Shapes, Colors)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mendemonstrasikan kelancaran mengingat dan melafalkan seluruh kosa kata Semester 1 (sapaan, angka 1-10, warna dasar, dan bentuk 2 dimensi) secara komprehensif.',
                content_text: `# 🏆 Festival Juara Semester 1: Mengulang Bintang Kejora!

Hore! Kamu sudah berhasil menyelesaikan petualangan Semester 1 dengan luar biasa hebat! 🎉  
Ayo buktikan kehebatanmu dengan menaklukkan 4 Pos Bintang Emas:

---

### 🚩 1. Empat Pos Bintang Penjelajah

* 🌅 **Pos 1 (Sapaan Waktu)**:
  * Pagi hari terbit ➔ **"Good morning!"**
  * Siang hari terik ➔ **"Good afternoon!"**
  * Berpamitan pulang ➔ **"Goodbye!"**

* 🔢 **Pos 2 (Angka Ajaib 1-10)**:
  * *One (1), Two (2), Three (3), Four (4), Five (5)*
  * *Six (6), Seven (7), Eight (8), Nine (9), Ten (10)!*

* 🎨 **Pos 3 (Warna Cantik)**:
  * 🔴 Red, 🔵 Blue, 🟡 Yellow, 🟢 Green, ⚫ Black, ⚪ White!

* 📐 **Pos 4 (Bentuk Geometri)**:
  * ⭕ Circle *(Lingkaran)*, 🔲 Square *(Persegi)*, 🔺 Triangle *(Segitiga)*!

---

### 🌟 2. Tantangan Pahlawan Bintang
Tersenyumlah, tepuk tangan 3 kali, dan katakan:  
👉 **"I can speak English! I am a superstar!"** 🚀`,
                required_materials: ['Kartu angka, kartu warna, kartu bentuk geometri', 'Buku catatan capaian'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Welcome Champions to the Grand English Review! Show me how smart you are!"',
                    ice_breaker: 'Kuis Kilat 5 Detik: Ayah sebut kata Indonesia, anak sebut bahasa Inggris secepat kilat.',
                    apperception: 'Review kilat sapaan, warna favorit, dan bentuk lingkaran.',
                    trigger_question: 'Are you ready to win the Semester 1 Champion badge?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Sintesis konsep semester 1: Salam, Identitas Diri, Angka 1-10, Warna, dan Bentuk.',
                    concrete_steps: [
                        'Pos 1: Sapa ramah "Good morning, how are you?".',
                        'Pos 2: Hitung 1 sampai 10 dalam bahasa Inggris.',
                        'Pos 3: Sebutkan 3 warna (Red, Blue, Yellow).',
                        'Pos 4: Gambar bentuk di udara (Circle, Square, Triangle).',
                        'Beri stiker untuk setiap pos yang berhasil dilewati.',
                    ],
                    script_parent: '"Kamu sudah belajar begitu banyak kata bahasa Inggris! Banggalah pada dirimu sendiri!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Olimpiade Bahasa Inggris Cilik (English Star Quest)',
                    game_rules: [
                        'Selesaikan 4 pos tantangan bahasa Inggris di ruang tamu.',
                        'Tiap pos yang dijawab dengan benar dan percaya diri mendapatkan 1 stiker bintang emas.',
                        'Kumpulkan 4 stiker untuk mendapatkan hadiah kecil (permen, mainan, dll).',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyelesaikan 4 pos dengan bimbingan santai.',
                        child_level_advanced: 'Menyelesaikan 4 pos dalam waktu di bawah 60 detik.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengerjakan lembar latihan rangkuman semester 1.',
                    worksheet_print_ready: {
                        title: 'LKPD 14.1: GRAND REVIEW SEMESTER 1',
                        instructions: 'Match and choose the correct answer for each review question.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Morning greeting when meeting teacher at 07:00 AM:',
                                data: { icon: '🌅', subtitle: 'Sunrise time', options: ['Good morning', 'Goodbye'] },
                                answer_key: 'Good morning',
                                explanation: 'Sapaan pagi: Good morning.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Match the review item with its English category:',
                                data: {
                                    pairs: [
                                        { left: '🔢 Number 5', right: 'Five' },
                                        { left: '🎨 Grass color', right: 'Green' },
                                        { left: '⏰ Wall clock', right: 'Circle' },
                                    ],
                                },
                                answer_key: '5 → Five; Rumput → Green; Jam → Circle',
                                explanation: 'Rangkuman kosa kata angka, warna, dan bentuk.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Color of ripe apple is: [ ... ] (Red / Blue)',
                                answer_key: 'Red',
                                explanation: 'Apel berwarna merah (Red).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'A shape with 3 sharp corners is a [ ... ] (Triangle / Circle)',
                                answer_key: 'Triangle',
                                explanation: 'Bangun 3 sudut adalah segitiga (Triangle).',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Introduce yourself: "Hello, my name is [ ... ]."',
                                answer_key: 'Nama Siswa',
                                explanation: 'Perkenalan diri lengkap.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Materi semester 1 mana yang paling kamu sukai?',
                        'Bisakah kamu menghitung dari 1 sampai 10 mundur?',
                        'Bagaimana perasaanmu setelah menyelesaikan semester 1?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar LKPD 14.1 yang sudah selesai kamu kerjakan!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 27: Semester 1 Comprehensive Review',
                        quiz_questions: [
                            { question_text: 'Sapaan yang diucapkan saat bertemu teman di pagi hari adalah...', option_a: 'Good morning', option_b: 'Good night', option_c: 'Goodbye', option_d: 'Good afternoon', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari angka 7 adalah...', option_a: 'Six', option_b: 'Seven', option_c: 'Eight', option_d: 'Nine', correct_answer: 'B' },
                            { question_text: 'Bangun datar yang memiliki 3 sudut tajam adalah...', option_a: 'Triangle', option_b: 'Circle', option_c: 'Square', option_d: 'Star', correct_answer: 'A' },
                            { question_text: 'Warna langit di siang hari yang cerah adalah...', option_a: 'Blue', option_b: 'Black', option_c: 'Yellow', option_d: 'Red', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "My name is Joshua" adalah...', option_a: 'Nama saya adalah Joshua', option_b: 'Kamu adalah Joshua', option_c: 'Saya punya Joshua', option_d: 'Sampai jumpa Joshua', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 28: Semester 2 Review & Phase A Graduation (Have/Has, Pets, Family, Fruits)',
                order_index: 2,
                learning_objectives: 'Siswa mampu menunjukkan penguasaan menyeluruh atas materi Bahasa Inggris Kelas 1 (kepemilikan have/has, hewan peliharaan, anggota keluarga, buah-buahan, dan preferensi) serta membawakan pidato kelulusan Fase A sederhana.',
                content_text: `# 🎓 Panggung Kelulusan: Aku Juara Bahasa Inggris Fase A!

Selamat sahabat cilik! Hari ini adalah hari wisuda kelulusan Bahasa Inggris Kelas 1 SD! 🎖️💐  
Kamu sudah belajar banyak sekali sepanjang tahun ini.

---

### 🎤 1. Teks Pidato Kelulusan Sang Juara
Ayo berdiri tegak di depan Ayah, Ibu, dan Guru, lalu bacakan pidato kemenanganmu:

> ### 🌟 "Hello, everyone!"  
> ### 🌟 "My name is [Namamu]!"  
> ### 🌟 "I am a boy / girl!"  
> ### 🌟 "I have a happy family and cute pets!"  
> ### 🌟 "I like sweet fruits!"  
> ### 🌟 "I love learning English! Thank you and goodbye Grade 1!" 🎓🎉

---

### 🏆 2. Medali Bintang Emas untukmu!
* Kamu sudah bisa menyapa teman dengan sopan.
* Kamu sudah bisa menghitung dan menyebutkan benda-benda di sekitarmu.
* Kamu sudah berani berbicara bahasa Inggris dengan percaya diri!

Sampai jumpa di petualangan seru **Bahasa Inggris Kelas 2 SD (Fase A Lanjutan)**! Tetap semangat belajar ya! 🚀✨`,
                required_materials: ['Sertifikat kelulusan / medali bintang buatan sendiri', 'Topi toga kertas', 'Kamera untuk dokumentasi'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Congratulations Superstar! Today is our English Graduation Day! Stand proud!"',
                    ice_breaker: 'Yel-yel Juara: "I CAN SPEAK ENGLISH! YES, YES, YES!"',
                    apperception: 'Review singkat materi semester 2: Have/Has, Farm Animals, Family, dan Fruits.',
                    trigger_question: 'How many new English words have you mastered this whole year?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Sintesis semester 2: Kata kerja Have/Has, Nama Hewan Ternak, Anggota Keluarga, dan Frasa Suka Buah (Like/Likes).',
                    concrete_steps: [
                        'Latih kalimat kepemilikan: "I have a cat" / "She has apples".',
                        'Latih pengenalan keluarga: "This is my mother / father".',
                        'Latih ungkapan kesukaan: "I like sweet bananas".',
                        'Beri selamat atas ketuntasan belajar 1 tahun penuh.',
                        'Rayakan dengan tepuk tangan & sorakan keluarga.',
                    ],
                    script_parent: '"Kamu resmi menjadi lulusan Bahasa Inggris Kelas 1! Terus berbahasa Inggris setiap hari!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Panggung Pidato Bahasa Inggris Cilik (Graduation Speech)',
                    game_rules: [
                        'Anak berdiri di depan seluruh anggota keluarga seperti di atas panggung.',
                        'Anak membawakan pidato singkat:',
                        '"Hello! My name is [Name]. I am a boy/girl. I have [item]. I like fruits. Thank you and goodbye!"',
                        'Seluruh keluarga bertepuk tangan meriah dan mengalungkan medali juara.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membacakan 2 kalimat perkenalan dan kesukaan.',
                        child_level_advanced: 'Membawakan pidato 4-5 kalimat lancar tanpa teks contekan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengerjakan evaluasi formatif akhir tahun pada LKPD Unit 14.',
                    worksheet_print_ready: {
                        title: 'LKPD 14.2: PHASE A ENGLISH GRADUATION EVALUATION',
                        instructions: 'Read and complete the final graduation quiz with pride.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the animal and fruit with the sentence:',
                                data: {
                                    pairs: [
                                        { left: '🐱 Cat', right: 'I have a cat' },
                                        { left: '🍎 Apple', right: 'She likes apple' },
                                        { left: '👨 Father', right: 'This is my father' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai pasangan tema semester 2',
                                explanation: 'Pemasangan kosa kata akhir tahun.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Yellow swimming animal with flat beak in Cici\'s farm:',
                                data: { icon: '🦆', subtitle: 'Pond animal', options: ['Duck', 'Rabbit'] },
                                answer_key: 'Duck',
                                explanation: 'Bebek adalah duck.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Word for ayah in English: [ ... ] (father / brother)',
                                answer_key: 'father',
                                explanation: 'Ayah adalah father.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Complete: "She [ ... ] apples." (likes / like)',
                                answer_key: 'likes',
                                explanation: 'Subjek She menggunakan likes.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Final Graduation Sentence: "I love learning [ ... ]!" (English / Sleep)',
                                answer_key: 'English',
                                explanation: 'Saya suka belajar bahasa Inggris.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu bangga bisa berbahasa Inggris tahun ini?',
                        'Hal menarik apa yang ingin kamu pelajari tahun depan di Kelas 2?',
                        'Apa kalimat bahasa Inggris favoritmu sepanjang tahun ini?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your final graduation speech: "Hello, my name is [Name]. I love learning English! Goodbye Grade 1!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 28: Phase A Final English Graduation',
                        quiz_questions: [
                            { question_text: 'Lengkapi kalimat kepemilikan untuk diri sendiri: "I [ ... ] two pencils."', option_a: 'have', option_b: 'has', option_c: 'is', option_d: 'are', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat kesukaan untuk dia perempuan: "She [ ... ] sweet mangoes."', option_a: 'likes', option_b: 'like', option_c: 'have', option_d: 'are', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari kata "Kakek" dan "Nenek" adalah...', option_a: 'Grandfather and Grandmother', option_b: 'Father and Mother', option_c: 'Brother and Sister', option_d: 'Boy and Girl', correct_answer: 'A' },
                            { question_text: 'Hewan peliharaan yang pandai melompat dan menyukai wortel adalah...', option_a: 'Rabbit', option_b: 'Duck', option_c: 'Fish', option_d: 'Bird', correct_answer: 'A' },
                            { question_text: 'Buah yang berwarna merah dan memiliki biji-biji kecil di kulitnya adalah...', option_a: 'Strawberry', option_b: 'Watermelon', option_c: 'Banana', option_d: 'Orange', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },
];