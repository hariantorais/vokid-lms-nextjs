export interface LkpdItem {
    id: string | number;
    type: string;
    question: string;
    data?: Record<string, unknown>;
    answer_key: string;
    explanation: string;
}

export interface EnglishLessonItem {
    title: string;
    order_index: number;
    learning_objectives: string;
    content_text: string;
    required_materials: string[];
    intro_guide: {
        duration_minutes: number;
        greeting: string;
        ice_breaker: string;
        apperception: string;
        trigger_question: string;
    };
    mindful_guide: {
        duration_minutes: number;
        concept_focus: string;
        concrete_steps: string[];
        script_parent: string;
    };
    joyful_guide: {
        duration_minutes: number;
        game_title: string;
        game_rules: string[];
        multi_grade_adaptation: {
            child_level_basic: string;
            child_level_advanced: string;
        };
    };
    meaningful_guide: {
        duration_minutes: number;
        task_focus: string;
        worksheet_print_ready: {
            title: string;
            instructions: string;
            section_a_basic: LkpdItem[];
            section_b_enrichment: LkpdItem[];
        };
        reflection_questions: string[];
    };
    assignments: Array<{
        type: 'PHOTO_HOMEWORK' | 'VOICE_TASK' | 'QUIZ_CBT';
        prompt: string;
        quiz_questions?: Array<{
            question_text: string;
            option_a: string;
            option_b: string;
            option_c: string;
            option_d: string;
            correct_answer: 'A' | 'B' | 'C' | 'D';
        }>;
    }>;
}

export interface EnglishChapterItem {
    chapter_number: number;
    title: string;
    target_semester: number;
    week_target: number;
    lessons: EnglishLessonItem[];
}

export const BAHASA_INGGRIS_BATCH_1: EnglishChapterItem[] = [
    // =========================================================================
    // UNIT 1: HOW ARE YOU?
    // =========================================================================
    {
        chapter_number: 1,
        title: 'Unit 1: How Are You?',
        target_semester: 1,
        week_target: 1,
        lessons: [
            {
                title: 'Meeting 1: Morning & Afternoon Greetings (Good Morning & Good Afternoon)',
                order_index: 1,
                learning_objectives: 'Siswa mampu menyapa guru, orang tua, dan teman secara santun menggunakan ungkapan "Good morning" dan "Good afternoon" disertai bahasa tubuh yang sopan, pelafalan tepat, serta pemahaman konteks waktu (pagi dan siang).',
                content_text: `# 🌅 Petualangan Pagi & Siang: Menyapa Sahabat!

Halo sahabat cilik! Yuk, kita belajar menyapa orang-orang tersayang di sekitar kita dengan riang dan sopan! ✨

---

### ⏰ 1. Pagi Hari yang Cerah (Jam 06.00 – 12.00)
Matahari baru saja terbit di balik bukit... 🌄  
Ayam jantan berkokok riang: *Kukuruyuuuk!* 🐓  

Saat kamu bangun tidur dan bertemu orang lain, tersenyumlah dan katakan:
> ### 🗣️ "Good morning!"  
> *(Artinya: Selamat pagi!)*

| 👦 Siapa yang Kita Temui? | 💬 Kata Ajaib yang Diucapkan |
| :--- | :--- |
| 👩 Bertemu Ibu saat sarapan | 👉 **"Good morning, Mom!"** 🥪 |
| 👨 Bertemu Ayah sebelum kerja | 👉 **"Good morning, Dad!"** ☕ |
| 👩‍🏫 Bertemu Bu Guru di sekolah | 👉 **"Good morning, Teacher!"** 🎒 |
| 👧 Bertemu teman di kelas | 👉 **"Good morning, Made!"** 👋 |

---

### ☀️ 2. Siang Hari yang Terik (Jam 12.00 – 18.00)
Matahari sudah tinggi di atas langit... ☀️  
Bel sekolah berbunyi: *Teng... teng... teng!* 🔔 Waktunya istirahat atau pulang ke rumah!

Saat hari sudah siang, sapaan kita berganti menjadi:
> ### 🗣️ "Good afternoon!"  
> *(Artinya: Selamat siang / sore!)*

| 👧 Suasana Hari | 💬 Apa yang Kita Katakan? |
| :--- | :--- |
| 🍛 Makan siang bersama Kakak | 👉 **"Good afternoon, Sister!"** |
| 🏡 Bertemu tetangga di jalan | 👉 **"Good afternoon, Auntie!"** |
| ⚽ Bermain bola bersama teman | 👉 **"Good afternoon, Joshua!"** |

---

### 🎭 Panggung Komik Cici & Joshua
Mari baca percakapan seru mereka di sekolah:

\`\`\`text
  [ 🌅 Jam 07.00 Pagi di Gerbang Sekolah ]
  Cici   : "Hello, Joshua! Good morning!" 😊👋
  Joshua : "Good morning, Cici! Let's enter the class!" 👦🎒

  [ ☀️ Jam 01.00 Siang di Lapangan ]
  Joshua : "Hi Made! Good afternoon!" ⚽
  Made   : "Good afternoon, Joshua! Let's play football!" 🏃💨
\`\`\`

---

### 🔍 Kotak Rahasia Detektif Cilik
Sentuh dadamu dan ingat kunci rahasianya:
* 🌅 **Matahari Terbit** ➔ Ucapkan **Good morning**!
* ☀️ **Matahari Tinggi** ➔ Ucapkan **Good afternoon**!

Sekarang giliranmu, coba sapalah orang di dekatmu dengan senyum manismu! 🌟`,
                required_materials: ['Flashcard gambar matahari terbit & siang', 'Boneka tangan / puppet', 'Cermin kecil'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: 'Beri senyum hangat dan lambaikan tangan: "Good morning, my brave champion! How are you today?"',
                    ice_breaker: 'Tepuk Salam Senyum Sapa: Berdiri tegak, tersenyum lebar, lalu membungkuk hormat sambil berseru "Good morning!"',
                    apperception: 'Tunjukkan gambar jendela pagi berembun: "Saat bangun tidur dan matahari baru terbit, apa sapaan yang kita ucapkan ke Ayah dan Ibu?"',
                    trigger_question: 'What do you say when the sun is shining bright at twelve o\'clock noon?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Asosiasi visual posisi matahari dengan sapaan Good Morning (pagi) dan Good Afternoon (siang), disertai pelafalan yang tepat dan gestur tubuh yang sopan.',
                    concrete_steps: [
                        'Tunjukkan gambar setengah lingkaran matahari terbit di balik bukit → ucapkan "Good morning" dengan ceria.',
                        'Tunjukkan gambar matahari penuh bersinar di atas rumah → ucapkan "Good afternoon" dengan nada lebih tenang.',
                        'Bimbing anak melafalkan dengan intonasi ramah: "Good MOR-ning" (tekan suku kata pertama).',
                        'Ajak anak berlatih tersenyum sambil menyapa cermin: "Good morning, me!"',
                        'Ulangi 3x bergantian antara pagi dan siang sambil menunjuk jam dinding.',
                    ],
                    script_parent: '"Good morning diucapkan saat matahari baru terbit (pagi hari, sebelum jam 12 siang). Good afternoon diucapkan saat matahari sudah tinggi di langit (siang/sore, setelah jam 12 siang). Ucapkan dengan senyum lebar dan suara ramah ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Matahari Terbit & Lempar Bola Sapaan',
                    game_rules: [
                        'Ayah memegang gambar matahari dan bola spons kecil.',
                        'Jika Ayah mengangkat matahari separuh (terbit): anak menangkap bola dan berteriak "Good morning!".',
                        'Jika Ayah mengangkat matahari penuh (tinggi): anak menangkap bola dan berteriak "Good afternoon!".',
                        'Jika anak salah menyebutkan, ia harus melompat 3x sambil tertawa dan mencoba lagi.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menirukan ucapan sapaan dengan panduan kartu visual.',
                        child_level_advanced: 'Merespons langsung sapaan dalam kalimat lengkap: "Good morning, Dad. I am ready!"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencocokkan gambar suasana matahari dengan pilihan sapaan yang tepat, melatih pelafalan, dan menerapkan sapaan dalam konteks rumah.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.1: GREETINGS (MORNING & AFTERNOON)',
                        instructions: 'Look at the picture and tick (√) the correct greeting.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the sunrise picture at 07:00 AM. What is the correct greeting?',
                                data: { icon: '🌅', subtitle: 'Time: 07:00 AM', options: ['Good morning', 'Good night'] },
                                answer_key: 'Good morning',
                                explanation: 'Pagi hari saat matahari terbit (pukul 07.00) menyapa dengan Good morning.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the bright sun at 01:00 PM. What is the correct greeting?',
                                data: { icon: '☀️', subtitle: 'Time: 01:00 PM', options: ['Good afternoon', 'Goodbye'] },
                                answer_key: 'Good afternoon',
                                explanation: 'Siang hari saat matahari terik (pukul 13.00) menggunakan Good afternoon.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the time picture with the correct greeting phrase:',
                                data: {
                                    pairs: [
                                        { left: '🌅 Pagi (07:00 AM)', right: 'Good morning' },
                                        { left: '☀️ Siang (01:00 PM)', right: 'Good afternoon' },
                                    ],
                                },
                                answer_key: 'Pagi → Good morning; Siang → Good afternoon',
                                explanation: 'Pemasangan waktu terbit dan terik matahari dengan sapaannya.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace the word: G - O - O - D   M - O - R - N - I - N - G',
                                answer_key: 'Good morning',
                                explanation: 'Menebalkan kata Good morning untuk melatih motorik halus & pengenalan huruf.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'ENGLISH_CARD',
                                question: 'Aisyah meets her teacher in the school yard at 07:30 AM. What does she say?',
                                data: { icon: '🏫', subtitle: 'Meeting teacher at school', options: ["Good morning, Ma'am", "Goodbye, Ma'am"] },
                                answer_key: "Good morning, Ma'am",
                                explanation: 'Sapaan hormat pagi hari kepada guru perempuan di sekolah menggunakan "Good morning, Ma\'am".',
                            },
                            {
                                id: 6,
                                type: 'MATH_PROBLEM',
                                question: 'Draw yourself greeting your mother in the morning. Write the correct sentence below the picture!',
                                answer_key: 'Good morning, Mom!',
                                explanation: 'Aktivitas kreatif menggabungkan menggambar & menulis kalimat sapaan.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana perasaanmu saat menyapa Ayah/Ibu pagi tadi?',
                        'Sapaan apa yang kamu gunakan saat jam istirahat siang?',
                        'Kapan lagi kamu bisa memakai "Good afternoon"?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice saying "Good morning, Dad!" and "Good afternoon, Mom!" with a cheerful voice and a big smile!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 1: Morning and Afternoon Greetings',
                        quiz_questions: [
                            { question_text: 'Sapaan yang diucapkan saat bertemu guru pada pukul 07.00 pagi adalah...', option_a: 'Good night', option_b: 'Good morning', option_c: 'Goodbye', option_d: 'Good evening', correct_answer: 'B' },
                            { question_text: 'Arti dari "Good afternoon" dalam bahasa Indonesia adalah...', option_a: 'Selamat pagi', option_b: 'Selamat siang / sore', option_c: 'Selamat tidur', option_d: 'Sampai jumpa', correct_answer: 'B' },
                            { question_text: 'Bahasa tubuh yang baik saat menyapa orang lain adalah...', option_a: 'Cemberut dan membelakangi', option_b: 'Tersenyum ramah dan menatap sopan', option_c: 'Berteriak marah', option_d: 'Menutup muka', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat: "Good [ ... ], Mom" saat sarapan pagi hari.', option_a: 'night', option_b: 'morning', option_c: 'bye', option_d: 'sleep', correct_answer: 'B' },
                            { question_text: 'Saat jam 1 siang pulang sekolah, kita menyapa teman dengan...', option_a: 'Good afternoon', option_b: 'Good morning', option_c: 'Good sleep', option_d: 'Hello morning', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 2: Asking Condition & Saying Farewell (How Are You? & Goodbye)',
                order_index: 2,
                learning_objectives: 'Siswa mampu menanyakan dan merespons kondisi kesehatan atau perasaan menggunakan ungkapan "How are you?" (I am fine / I am ok), serta mengucapkan salam perpisahan "Goodbye" dengan lambaian tangan sopan.',
                content_text: `# 👋 Menanyakan Kabar & Berpamitan Ceria

Teman-teman yang baik hati selalu peduli pada sahabatnya!  
Yuk, belajar menanyakan kabar dan melambaikan tangan saat berpisah! 🌈

---

### 💖 1. Menanyakan Kabar Sahabat
Saat bertemu teman di taman atau kelas, tanyakan kabarnya:
> ### 🗣️ "How are you?"  
> *(Artinya: Bagaimana kabarmu?)*

Bagaimana cara menjawabnya? Pilih sesuai perasaanmu:

| Perasaanmu Hari Ini | Gambar | Jawaban Kerenmu |
| :--- | :---: | :--- |
| Sehat & Gembira | 😊 | **"I am fine, thank you!"** *(Aku sehat, terima kasih!)* |
| Baik-baik Saja | 👍 | **"I am ok!"** *(Aku baik-baik saja!)* |
| Bersemangat Sekali | 🌟 | **"I am great!"** *(Aku luar biasa gembira!)* |

---

### 🎒 2. Waktunya Berpamitan (Saying Goodbye)
Ketika bel sekolah berbunyi atau kamu selesai bermain di taman:
1. Angkat tangan kananmu tinggi-tinggi. 🙋‍♂️
2. Lambaikan tanganmu ke kiri dan ke kanan. 👋
3. Tersenyumlah dan katakan:
> ### 🗣️ "Goodbye! See you later!"  
> *(Artinya: Selamat tinggal! Sampai jumpa lagi!)*

---

### 🎭 Komik Lucu: Cici Pamit Pulang

\`\`\`text
  Made : "Hi Cici, how are you?" 😊
  Cici : "I am fine, thank you! How are you, Made?" 👧✨
  Made : "I am great! Look, the school bus is here!" 🚌
  Cici : "Goodbye, Made! See you tomorrow!" 👋
  Made : "Goodbye Cici, be careful!" 👋🚗
\`\`\`

---

### 💡 Rahasia Bahasa Tubuh Juara
* Saat bertanya **"How are you?"** ➔ Condongkan badan sedikit ke depan dan tatap mata temanmu.
* Saat menjawab **"I am fine!"** ➔ Berikan senyum paling manismu.
* Saat berpamitan **"Goodbye!"** ➔ Lambaikan tangan dengan ceria! 🚀`,
                required_materials: ['Kartu senyum (Happy Face & OK Face)', 'Cermin kecil', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hello my friend! Put your thumbs up and say: I AM READY!"',
                    ice_breaker: 'Simon Says Melambai: "Simon says wave your hand and say Goodbye!"',
                    apperception: 'Tanyakan sambil tersenyum: "Kalau teman bertanya kabar, bagaimana caramu menjawab dalam bahasa Inggris?"',
                    trigger_question: 'When your friend is going home, what do you wave and say?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola tanya-jawab kondisi fisik/perasaan (How are you? → I am fine / I am ok), dikombinasikan dengan gestur lambaian tangan untuk berpamitan.',
                    concrete_steps: [
                        'Ajarkan intonasi tanya yang ramah: "How are YOU?" (naik di akhir).',
                        'Ajarkan respon jempol ke atas: "I am FINE" atau "I am OK" (turun di akhir).',
                        'Ajarkan lambaian tangan perpisahan: "Goodbye, see you!" sambil tersenyum.',
                        'Praktikkan bergantian: Ayah tanya, anak jawab; lalu anak tanya, Ayah jawab.',
                        'Latihan di depan cermin agar anak melihat senyumnya saat menyapa & melambai.',
                    ],
                    script_parent: '"Saat bertanya kabar, suara kita naik di akhir seperti bertanya. Saat menjawab, suara kita turun di akhir seperti memberi kabar. Jangan lupa senyum dan jempol ke atas ya!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lingkaran Bisik Kabar Bahagia',
                    game_rules: [
                        'Ayah dan anak saling melempar boneka.',
                        'Pelempar bertanya: "Hi, how are you?".',
                        'Penerima menangkap, tersenyum menunjukkan jempol: "I am fine! Goodbye!" lalu melambaikan tangan.',
                        'Jika anak lupa melambai, Ayah mengingatkan dengan lambaian sendiri tanpa kata.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab "I am ok" dibantu kartu ekspresi senyum.',
                        child_level_advanced: 'Menjawab lengkap: "I am great, thank you. And you?"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghubungkan gestur lambaian tangan dengan ungkapan Goodbye dan I am fine, serta menerapkan dalam dialog singkat.',
                    worksheet_print_ready: {
                        title: 'LKPD 1.2: HOW ARE YOU AND GOODBYE',
                        instructions: 'Look and tick (√) the matching greeting expression.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Friend asks: "How are you?". Look at the happy face, what is your answer?',
                                data: { icon: '😊', subtitle: 'Condition: Healthy & Happy', options: ['I am fine', 'Goodbye'] },
                                answer_key: 'I am fine',
                                explanation: 'Respon terhadap pertanyaan How are you saat kondisi sehat adalah I am fine.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'The school bell rings and you are going home. What do you say while waving?',
                                data: { icon: '👋', subtitle: 'Action: Waving hand', options: ['Goodbye', 'Good morning'] },
                                answer_key: 'Goodbye',
                                explanation: 'Melambaikan tangan saat pulang berarti mengucapkan Goodbye.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the question and response:',
                                data: {
                                    pairs: [
                                        { left: '❓ "How are you?"', right: 'I am fine' },
                                        { left: '👋 "Goodbye!"', right: 'See you later' },
                                    ],
                                },
                                answer_key: 'How are you → I am fine; Goodbye → See you later',
                                explanation: 'Pasangan tanya-jawab kabar dan perpisahan.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: G - O - O - D - B - Y - E',
                                answer_key: 'Goodbye',
                                explanation: 'Menebalkan kata selamat tinggal untuk latihan motorik halus.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'ENGLISH_CARD',
                                question: 'Dad goes to the office in a car. What do you wave and say?',
                                data: { icon: '🚗', subtitle: 'Dad going to work', options: ['Goodbye, Dad!', 'Good night, Dad!'] },
                                answer_key: 'Goodbye, Dad!',
                                explanation: 'Ungkapan perpisahan santun saat orang tua berangkat kerja menggunakan "Goodbye, Dad!".',
                            },
                            {
                                id: 6,
                                type: 'MATH_PROBLEM',
                                question: 'Complete the dialog below:\nA: "How are you, Rani?"\nB: "I am [ ... ], thank you!"',
                                answer_key: 'fine',
                                explanation: 'Melengkapi dialog tanya jawab kabar dengan kata "fine".',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu merasa senang saat menyapa Goodbye dengan lambaian besar?',
                        'Bagaimana cara mengatakan bahwa kamu dalam kondisi baik?',
                        'Kapan lagi kamu bisa bertanya kabar pada teman?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan tebalkan kata Goodbye pada lembar LKPD 1.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 2: Asking Condition and Farewell',
                        quiz_questions: [
                            { question_text: 'Pertanyaan "How are you?" artinya adalah...', option_a: 'Siapa namamu?', option_b: 'Bagaimana kabarmu?', option_c: 'Berapa umurmu?', option_d: 'Di mana rumahmu?', correct_answer: 'B' },
                            { question_text: 'Jawaban yang tepat saat kabarmu sehat dan baik adalah...', option_a: 'I am fine', option_b: 'Good night', option_c: 'I am red', option_d: 'Goodbye', correct_answer: 'A' },
                            { question_text: 'Kata "Goodbye" diucapkan saat...', option_a: 'Bangun tidur', option_b: 'Berpisah / hendak pulang', option_c: 'Sedang makan', option_d: 'Membaca buku', correct_answer: 'B' },
                            { question_text: 'Gerakan tubuh yang tepat saat mengucapkan "Goodbye" adalah...', option_a: 'Melipat tangan di dada', option_b: 'Melambaikan tangan sambil tersenyum', option_c: 'Menutup mata', option_d: 'Menghentakkan kaki', correct_answer: 'B' },
                            { question_text: 'Jika temanmu menyapa "Hi, how are you?", kamu menjawab...', option_a: 'I am ok, thank you', option_b: 'No, I am not', option_c: 'Goodbye teacher', option_d: 'Good afternoon', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 2: I AM KIMI
    // =========================================================================
    {
        chapter_number: 2,
        title: 'Unit 2: I Am Kimi',
        target_semester: 1,
        week_target: 3,
        lessons: [
            {
                title: 'Meeting 3: Introducing Self (I am...)',
                order_index: 1,
                learning_objectives: 'Siswa mampu memperkenalkan identitas diri secara percaya diri menggunakan pola "Hello, I am [Nama]" atau "Hi, I am [Nama]" dengan pelafalan jelas dan postur tubuh tegak ramah.',
                content_text: `# 🦸‍♂️ Halo Dunia! Kenalkan, Namaku...

Hari ini kita berkenalan dengan sahabat berbulu oranye yang imut:  
🐱 **Kimi si Kucing Lucu!**  

Kimi melompat ke meja dan berkata:  
> ### 🗣️ "Meow! Hello, I am Kimi!"  
> *(Artinya: Meow! Halo, aku Kimi!)*

---

### 🏷️ 1. Cara Menyebutkan Namamu
Cukup letakkan tangan kanan di dadamu, berdiri tegak, dan sebutkan:
> ### 🗣️ "Hello, I am [Namamu]!"  
> *(Contoh: "Hello, I am Budi!")*

| Tokoh Buku Kita | Gambar | Apa yang Diucapkan? |
| :--- | :---: | :--- |
| Anak Laki-Laki Pemberani | 👦 | 👉 **"Hello, I am Joshua!"** |
| Anak Perempuan Ceria | 👧 | 👉 **"Hi, I am Cici!"** |
| Anak Laki-Laki Ramah | 👦 | 👉 **"Hello, I am Made!"** |
| Kucing Kesayangan Kita | 🐱 | 👉 **"Meow, I am Kimi!"** |

---

### 🤝 2. Senang Berkenalan denganmu!
Setelah menyebutkan nama, jangan lupa katakan kata ajaib ini:
> ### 🗣️ "Nice to meet you!"  
> *(Artinya: Senang berkenalan denganmu!)*

---

### 🎭 Komik Mini: Perkenalan Pertama di Kelas

\`\`\`text
  [ Di Depan Papan Tulis Kelas 1 ]
  Joshua : "Hello! I am Joshua. Nice to meet you!" 👦✨
  Cici   : "Hi Joshua! I am Cici. Nice to meet you too!" 👧🌸
  Kimi   : "Meow! I am Kimi the cat!" 🐱🐾
  Semua  : "Hahaha, welcome Kimi!" 🎉
\`\`\`

---

### 🌟 Tantangan Pahlawan Cilik
Ayo berdiri di depan cermin, pasang senyum paling ceria, dan katakan:  
👉 **"Hi, I am [Namamu]. Nice to meet you!"** 🚀`,
                required_materials: ['Foto diri siswa', 'Bingkai kartu nama kertas', 'Boneka kucing Kimi'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hi champion! Stand tall like a superhero and tell me your great name!"',
                    ice_breaker: 'Tepuk Tepuk Nama: Tepuk paha dua kali, tepuk tangan: "Hello! I am [Sebutkan nama]!"',
                    apperception: 'Tunjukkan boneka kucing Kimi: "Boneka ini bersuara: \'Meow, I am Kimi\'. Kalau kamu siapa?"',
                    trigger_question: 'How do you introduce your name to a new friend in the playground?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Penggunaan frasa "I am" untuk menyatakan identitas nama diri, dengan postur tubuh tegak & senyum ramah.',
                    concrete_steps: [
                        'Letakkan tangan kanan di dada: "I am...".',
                        'Sebutkan nama panggilan dengan jelas: "I am Cici" / "I am Joshua".',
                        'Latih pengucapan tegak, kontak mata, & senyum ramah.',
                        'Tambahkan "Nice to meet you!" di akhir perkenalan.',
                        'Ulangi 3x bergantian: berpasangan dengan Ayah/Ibu.',
                    ],
                    script_parent: '"Letakkan tangan di dada dan ucapkan dengan bangga: Hi, I am [Nama Anak]! Jangan lupa tersenyum dan menatap lawan bicara."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Estafet Mikrofon Perkenalan',
                    game_rules: [
                        'Gunakan spidol sebagai mikrofon penyanyi.',
                        'Putar lagu ceria; saat musik mati, pemegang mikrofon maju selangkah dan berseru: "Hello, I am [Nama]!"',
                        'Jika salah, anak harus menyanyikan "Hello, I am..." dengan nada lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan "I am [Nama]" dengan bantuan Ayah.',
                        child_level_advanced: 'Menyebutkan "Hello friends, I am [Nama]. Nice to meet you!"',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menempelkan foto diri di papan bingkai LKPD dan mencocokkan nama tokoh buku.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.1: INTRODUCING MYSELF (I AM...)',
                        instructions: 'Look at the character card and match the sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the character holding the name card. Who is he?',
                                data: { icon: '👦', subtitle: 'Name tag: Joshua', options: ['I am Joshua', 'I am Cici'] },
                                answer_key: 'I am Joshua',
                                explanation: 'Gambar menunjukkan tokoh anak laki-laki Joshua.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the friendly cat character. What does the cat say?',
                                data: { icon: '🐱', subtitle: 'Cat says: Meow', options: ['I am Kimi', 'I am Made'] },
                                answer_key: 'I am Kimi',
                                explanation: 'Kimi adalah tokoh kucing yang bersuara meow.',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the character with the right self-introduction:',
                                data: {
                                    pairs: [
                                        { left: '👦 Joshua', right: 'I am Joshua' },
                                        { left: '👧 Cici', right: 'I am Cici' },
                                        { left: '🐱 Kimi', right: 'I am Kimi' },
                                    ],
                                },
                                answer_key: 'Pasangan cocok sesuai nama karakter',
                                explanation: 'Pencocokan nama tokoh dengan kalimat I am.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: I -  A - M',
                                answer_key: 'I am',
                                explanation: 'Menebalkan kata I am untuk latihan motorik halus.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your own name: "Hello, I am [ ... ]"',
                                answer_key: 'Nama Panggilan Siswa',
                                explanation: 'Menyebutkan nama diri sendiri dengan pola I am.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah kamu merasa percaya diri saat menyebutkan namamu?',
                        'Siapa tokoh kucing di Unit 2 ini?',
                        'Kapan lagi kamu bisa memperkenalkan diri?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice introducing yourself: "Hello, I am [Your Name]! Nice to meet you!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 3: Introducing Self (I am...)',
                        quiz_questions: [
                            { question_text: 'Arti dari kalimat "I am Joshua" adalah...', option_a: 'Kamu adalah Joshua', option_b: 'Saya adalah Joshua', option_c: 'Dia adalah Joshua', option_d: 'Selamat pagi Joshua', correct_answer: 'B' },
                            { question_text: 'Untuk memperkenalkan diri, kita mengucapkan...', option_a: 'I am [Nama]', option_b: 'Goodbye [Nama]', option_c: 'Thank you [Nama]', option_d: 'Good night [Nama]', correct_answer: 'A' },
                            { question_text: 'Kimi si kucing dalam buku My Next Words bersuara...', option_a: 'Guk guk', option_b: 'Meow meow', option_c: 'Kwek kwek', option_d: 'Moo moo', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat: "Hello, [ ... ] am Cici."', option_a: 'you', option_b: 'I', option_c: 'he', option_d: 'is', correct_answer: 'B' },
                            { question_text: 'Sikap terbaik saat memperkenalkan nama ke teman baru adalah...', option_a: 'Menangis tersipu', option_b: 'Tersenyum ramah dan percaya diri', option_c: 'Lari bersembunyi', option_d: 'Marah-marah', correct_answer: 'B' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 4: Asking Friend\'s Name & Calling Others (You are...)',
                order_index: 2,
                learning_objectives: 'Siswa mampu menanyakan nama teman sebaya menggunakan kalimat tanya "What is your name?" serta menyapa kawan secara santun menggunakan pola "You are [Nama]" dengan intonasi tepat.',
                content_text: `# 🔍 Siapa Namamu? (What is Your Name?)

Saat bermain di taman, kamu melihat teman baru sedang bermain ayunan.  
Bagaimana cara berkenalan dengannya? Yuk, gunakan kata ajaib ini! 🎈

---

### ❓ 1. Bertanya Nama Teman
Dekati temanmu, tersenyumlah, lalu tanyakan:
> ### 🗣️ "What is your name?"  
> *(Artinya: Siapa namamu?)*

Temanmu akan menjawab:
> ### 🗣️ "I am Made." *(Namaku Made)*

---

### 👉 2. Memanggil Temanmu dengan Sopan
Buka telapak tanganmu dengan ramah ke arahnya dan katakan:
> ### 🗣️ "You are Made!"  
> *(Artinya: Kamu adalah Made!)*

| Gambar Aksi | Siapa yang Ditunjuk? | Kalimat yang Kita Katakan |
| :---: | :--- | :--- |
| 👉 👦 | Menunjuk teman laki-laki | **"You are Made!"** |
| 👉 👧 | Menunjuk teman perempuan | **"You are Aisyah!"** |
| 👉 👨‍🏫 | Menunjuk Pak Guru Olahraga | **"You are Mr. Togar!"** |
| 👉 👩‍🏫 | Menunjuk Ibu Guru Kelas | **"You are Miss Rahma!"** |

---

### 🎭 Komik Mini: Bertemu Teman Baru di Ayunan

\`\`\`text
  Aisyah : "Hello! What is your name?" 👧✨
  Cici   : "Hi! I am Cici. What is your name?" 🌸
  Aisyah : "I am Aisyah! So, you are Cici!" 🤝
  Cici   : "Yes! And you are Aisyah! Let's play swing together!" 🎠
\`\`\`

---

### 💡 Tips Sopan Santun
* Gunakan telapak tangan terbuka saat menunjuk teman.
* Hindari menunjuk dengan satu jari telunjuk tajam ya!`,
                required_materials: ['Bola lempar lembut', 'Kartu nama karakter', 'Boneka tangan'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we will find out our secret friend\'s name!"',
                    ice_breaker: 'Tunjuk Ramah: Tunjuk dada sendiri "I am...", tunjuk kawan di depan "You are...!"',
                    apperception: 'Tanyakan: "Kalau kamu bertemu teman baru di taman bermain, kalimat apa yang kamu tanyakan untuk tahu namanya?"',
                    trigger_question: 'What is the English question to ask someone\'s name?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perbedaan sudut pandang antara diri sendiri ("I am") dan lawan bicara ("You are"), serta cara bertanya nama dengan intonasi ramah.',
                    concrete_steps: [
                        'Berdiri berhadapan dengan anak.',
                        'Ayah melempar bola sambil bertanya: "What is your name?" dengan intonasi naik.',
                        'Anak menangkap: "I am [Nama anak]."',
                        'Anak menunjuk Ayah dengan tangan terbuka: "You are Dad / You are Pak [Nama Ayah]."',
                        'Bergantian peran: anak bertanya, Ayah menjawab.',
                    ],
                    script_parent: '"Tunjuk dengan telapak terbuka ya, jangan pakai telunjuk tajam. Ucapkan: You are my good friend!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lempar Bola Tanya Nama (Play Time Ball)',
                    game_rules: [
                        'Bentuk lingkaran kecil bersama anggota keluarga di ruang tengah.',
                        'Pemain melempar bola ke kawan sambil bertanya: "What is your name?".',
                        'Penerima harus menangkap bola dan menjawab tangkas: "I am [Nama]! And you are [Sebut nama pelempar]!"',
                        'Jika bola jatuh, pemain harus menyanyikan "What is your name?" dengan gaya lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menjawab nama sendiri saat bola ditangkap.',
                        child_level_advanced: 'Menyebutkan nama teman dan menanyakan kembali secara berantai tanpa jeda.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menarik garis menghubungkan kalimat "You are..." ke gambar tokoh yang tepat.',
                    worksheet_print_ready: {
                        title: 'LKPD 2.2: YOU ARE MY FRIEND',
                        instructions: 'Match each picture with the correct "You are..." sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the character with the correct "You are..." title:',
                                data: {
                                    pairs: [
                                        { left: '👨‍🏫 Guru Olahraga', right: 'You are Mr. Togar' },
                                        { left: '👩‍🏫 Guru Kelas', right: 'You are Miss Rahma' },
                                        { left: '👦 Siswa Putra', right: 'You are Made' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai pasangan tokoh guru dan siswa',
                                explanation: 'Menyebut orang lain dengan You are.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'You want to ask your friend\'s name. What question do you ask?',
                                data: { icon: '💬', subtitle: 'Asking name politely', options: ['What is your name?', 'How are you?'] },
                                answer_key: 'What is your name?',
                                explanation: 'Kalimat tanya menanyakan nama adalah What is your name?',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Trace the word: Y - O - U',
                                answer_key: 'You',
                                explanation: 'Latihan menulis kata You.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Complete dialog:\nA: "What is your name?"\nB: "[ ... ] am Made." (I / You)',
                                answer_key: 'I',
                                explanation: 'Menjawab nama sendiri diawali kata I am.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your friend\'s name: "You are [ ... ]"',
                                answer_key: 'Nama Teman',
                                explanation: 'Menyebut identitas kawan menggunakan You are.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa perbedaan antara "I am" dan "You are"?',
                        'Bagaimana cara bertanya nama teman?',
                        'Kapan kamu akan memakai "You are..."?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil garis pencocokan tokoh pada LKPD 2.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 4: Asking Name and Calling Others',
                        quiz_questions: [
                            { question_text: 'Kalimat tanya bahasa Inggris untuk menanyakan nama teman adalah...', option_a: 'What is your name?', option_b: 'How are you?', option_c: 'Good morning?', option_d: 'Where is your book?', correct_answer: 'A' },
                            { question_text: 'Arti dari kata "You are" adalah...', option_a: 'Saya adalah', option_b: 'Kamu adalah', option_c: 'Mereka adalah', option_d: 'Buku ini', correct_answer: 'B' },
                            { question_text: 'Jika temanmu menunjukmu dan berkata "You are Made", maka kamu menjawab...', option_a: 'Yes, I am Made', option_b: 'Goodbye Made', option_c: 'Good night', option_d: 'I am fine', correct_answer: 'A' },
                            { question_text: 'Lengkapi percakapan:\n"What is your name?"\n"I [ ... ] Aisyah."', option_a: 'am', option_b: 'is', option_c: 'are', option_d: 'you', correct_answer: 'A' },
                            { question_text: 'Kata yang tepat untuk menyapa guru laki-laki adalah...', option_a: 'Mr. (Mister)', option_b: 'Miss', option_c: 'Girl', option_d: 'She', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 3: MY NAME IS JOSHUA
    // =========================================================================
    {
        chapter_number: 3,
        title: 'Unit 3: My Name is Joshua',
        target_semester: 1,
        week_target: 5,
        lessons: [
            {
                title: 'Meeting 5: Possessive Words (My Name is... & Your Name is...)',
                order_index: 1,
                learning_objectives: 'Siswa mampu menggunakan kata sandang kepemilikan "My" (milik saya) dan "Your" (milikmu) secara tepat saat menyatakan nama diri dan nama lawan bicara.',
                content_text: `# 🏷️ Papan Nama Ajaib: My dan Your!

Hari ini kita akan membuat kartu nama keren untuk ditaruh di atas mejamu!  
Mari pelajari dua kata ajaib kepemilikan ini: ✨

---

### 💖 1. Kata Ajaib "MY" (Punya Saya)
Letakkan tangan kanan di dadamu dan katakan:
> ### 🗣️ "My name is [Namamu]!"  
> *(Artinya: Namaku adalah...)*

* 👦 Joshua memegang papannya: 👉 **"My name is Joshua!"**
* 👧 Cici memegang papannya: 👉 **"My name is Cici!"**

---

### 👉 2. Kata Ajaib "YOUR" (Punya Kamu)
Ulurkan tanganmu dengan ramah ke teman di depanmu dan katakan:
> ### 🗣️ "Your name is [Nama Teman]!"  
> *(Artinya: Namamu adalah...)*

* 👦 Joshua menunjuk Made: 👉 **"Your name is Made!"**
* 👧 Cici menunjuk Aisyah: 👉 **"Your name is Aisyah!"**

---

### 🎭 Papan Percakapan di Meja Belajar

\`\`\`text
  Joshua : "Hello! My name is Joshua." 👦🪧
  Made   : "Hi Joshua! My name is Made." 👦✨
  Joshua : "Nice to meet you, Made! Your name is cool!" 👍
  Made   : "Thank you, Joshua! Your name is cool too!" 🎉
\`\`\`

---

### 💡 Ingat Trik Gerakan Tangannya:
* 🤲 **Tangan di dada sendiri** ➔ Ucapkan **"MY"** *(punyaku)*.
* 🫱 **Telapak tangan mengarah ke teman** ➔ Ucapkan **"YOUR"** *(punyamu)*.`,
                required_materials: ['Papan dada kartu nama "My name is..."', 'Foto keluarga', 'Stiker label'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning! Today we learn the magic words: MY and YOUR!"',
                    ice_breaker: 'Tepuk Dada & Ulur Tangan: Tempel tangan di dada berseru "MY!", ulurkan tangan ke depan berseru "YOUR!"',
                    apperception: 'Tunjukkan label nama di buku: "Di buku tulismu tertulis namamu sendiri. Bagaimana menyebutnya dalam bahasa Inggris?"',
                    trigger_question: 'What is the difference between saying "I am Joshua" and "My name is Joshua"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pemahaman fungsi kata sandang posesif "My" (milikku) dan "Your" (milikmu), disertai gestur tubuh yang membedakan keduanya.',
                    concrete_steps: [
                        'Ucapkan sambil menunjuk dada: "My name is [Nama Ayah]."',
                        'Tunjuk anak dengan ramah: "Your name is [Nama Anak]."',
                        'Minta anak menirukan bergantian: "My name is [Nama Anak], and your name is [Nama Ayah]."',
                        'Gunakan gerakan tangan: My → tunjuk dada 2x, Your → ulurkan telapak ke depan.',
                        'Ulangi 3x dengan tempo berbeda (pelan, sedang, cepat).',
                    ],
                    script_parent: '"My itu milik saya, Your itu milik kamu. Ucapkan: My name is [Nama Anak], dan Your name is [Nama Ayah]!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Balap Langkah Dadu Kata (Word Race Game)',
                    game_rules: [
                        'Buka papan permainan petak di meja belajar (seperti pada buku paket hal. 32-33).',
                        'Gunakan penghapus pensil sebagai pion jalan.',
                        'Lempar dadu; jika mendarat di petak "My name is...", pemain wajib menyebutkan namanya.',
                        'Jika mendarat di petak "Your name is...", pemain wajib menyebutkan nama lawannya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan nama diri dan teman dengan bantuan kartu teks.',
                        child_level_advanced: 'Memainkan balap kata tanpa jeda dan menambahkan sapaan ramah.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menulis nama pada kotak papan nama LKPD (Unit 3 p. 30).',
                    worksheet_print_ready: {
                        title: 'LKPD 3.1: MY NAME AND YOUR NAME',
                        instructions: 'Write your name inside the name box and complete the sentences.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the schoolboy holding a wooden board. What is written?',
                                data: { icon: '🪧', subtitle: 'Board: My name is Joshua', options: ['My name is Joshua', 'Your name is Joshua'] },
                                answer_key: 'My name is Joshua',
                                explanation: 'Papan nama anak tersebut bertuliskan My name is Joshua.',
                            },
                            {
                                id: 2,
                                type: 'MATH_PROBLEM',
                                question: 'Complete with your name: "My name is [ ... ]"',
                                answer_key: 'Nama Siswa',
                                explanation: 'Menuliskan nama diri sendiri dengan frasa My name is.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'To call your friend\'s name, say: "[ ... ] name is Made." (My / Your)',
                                answer_key: 'Your',
                                explanation: 'Menyebut nama orang lain menggunakan kata Your.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: M - Y   N - A - M - E',
                                answer_key: 'My name',
                                explanation: 'Menebalkan frasa My name.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Fill in the blanks: "[ ... ] name is Cici. [ ... ] name is Joshua." (Pointing to self first, then friend)',
                                answer_key: 'My, Your',
                                explanation: 'My untuk diri sendiri, Your untuk teman lawan bicara.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Kapan kita memakai kata "My"?',
                        'Kapan kita memakai kata "Your"?',
                        'Bagaimana cara membedakan keduanya?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto papan nama bertuliskan "My name is..." pada LKPD 3.1 bukumu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 5: Using My and Your',
                        quiz_questions: [
                            { question_text: 'Arti dari kata "My" adalah...', option_a: 'Milik saya / -ku', option_b: 'Milikmu', option_c: 'Milik mereka', option_d: 'Milik sekolah', correct_answer: 'A' },
                            { question_text: 'Arti dari kata "Your" adalah...', option_a: 'Milik saya', option_b: 'Milik kamu / -mu', option_c: 'Milik guru', option_d: 'Milik kucing', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat saat menunjuk diri sendiri: "[ ... ] name is Made."', option_a: 'Your', option_b: 'My', option_c: 'You', option_d: 'He', correct_answer: 'B' },
                            { question_text: 'Lengkapi kalimat saat menunjuk temanmu: "[ ... ] name is Aisyah."', option_a: 'My', option_b: 'Your', option_c: 'I', option_d: 'Am', correct_answer: 'B' },
                            { question_text: 'Pilihan kalimat yang benar dan sopan adalah...', option_a: 'My name is Joshua', option_b: 'I name is Joshua', option_c: 'Your name am Joshua', option_d: 'Me is Joshua', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 6: Surveying Classmates\' Names & Dialogue Practice',
                order_index: 2,
                learning_objectives: 'Siswa mampu melakukan survei sederhana menanyakan nama kepada 3-4 anggota keluarga atau teman sebaya dan mencatatnya ke dalam tabel wawancara secara teratur.',
                content_text: `# 📋 Wartawan Cilik: Berburu Nama Sahabat!

Hari ini kamu menjadi wartawan cilik pemberani!  
Tugasmu adalah mewawancarai teman-teman dan mencatat nama mereka di buku catatanmu. 🎤✨

---

### 🎙️ 1. Tiga Langkah Menjadi Pewawancara Hebat
1. **Sapalah dengan senyum ramah**:  
   👉 *"Hello! Good morning!"* ☀️
2. **Tanyakan namanya**:  
   👉 *"What is your name?"* ❓
3. **Ucapkan terima kasih setelah dijawab**:  
   👉 *"Thank you, nice to meet you!"* 🤝

---

### 📊 2. Catatan Hasil Survei Wartawan

| No | Wajah Teman | Pertanyaan Kita | Jawaban Teman |
| :-: | :---: | :--- | :--- |
| 1 | 👦 | *"What is your name?"* | 👉 **"My name is Made."** |
| 2 | 👧 | *"What is your name?"* | 👉 **"My name is Cici."** |
| 3 | 👧 | *"What is your name?"* | 👉 **"My name is Aisyah."** |

---

### 🎭 Komik Wawancara di Kelas

\`\`\`text
  Kamu : "Hi! Good morning! What is your name?" 🎤😊
  Teman: "Good morning! My name is Joshua." 👦✨
  Kamu : "Thank you Joshua, nice to meet you!" 🤝
  Teman: "Nice to meet you too!" 🎉
\`\`\`

---

### 🌟 Misi Wartawan Hari Ini
Dekati 3 orang di rumahmu (Ayah, Ibu, atau Saudaramu), tanyakan nama mereka dalam bahasa Inggris, lalu berikan mereka senyuman terbaikmu! 🚀`,
                required_materials: ['Tabel survei mini', 'Pensil dan buku tulis', 'Stiker reward'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hello reporters! Grab your clipboard, today we go on a name survey!"',
                    ice_breaker: 'Jabat Tangan Ramah: Saling berjabat tangan sambil tersenyum dan mengayun tangan lembut.',
                    apperception: 'Ingatkan kembali dialog: "My name is... Your name is...".',
                    trigger_question: 'How do you ask someone politely before writing their name down?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Etika wawancara perkenalan sederhana: tatap mata, sapa ramah, tanyakan nama, ucapkan terima kasih.',
                    concrete_steps: [
                        'Langkah 1: Sapa "Hello, Good morning!".',
                        'Langkah 2: Tanyakan "What is your name?".',
                        'Langkah 3: Dengarkan jawaban "My name is...".',
                        'Langkah 4: Balas dengan senyum "Thank you, nice to meet you!"',
                        'Langkah 5: Catat nama di tabel survei.',
                    ],
                    script_parent: '"Selalu ucapkan terima kasih setelah seseorang menyebutkan namanya ya. Itu tanda kamu sopan."',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Wartawan Cilik Survei Nama Keluarga',
                    game_rules: [
                        'Anak membawa kertas survei keliling rumah.',
                        'Wawancarai Ibu, Ayah, dan Kakak/Adik.',
                        'Tuliskan nama mereka di kolom tabel survei bahasa Inggris.',
                        'Tempel stiker bintang di setiap nama yang berhasil dicatat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Mewawancarai 2 orang di rumah dengan panduan lisan Ayah.',
                        child_level_advanced: 'Mewawancarai 4 orang dan membacakan hasilnya dalam kalimat monolog bahasa Inggris.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mengisi tabel survei nama pada LKPD Unit 3 halaman 31.',
                    worksheet_print_ready: {
                        title: 'LKPD 3.2: LET\'S DO A SURVEY (NAMES)',
                        instructions: 'Ask your friends or family members, and complete the table.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the dialog speech bubble to the right character:',
                                data: {
                                    pairs: [
                                        { left: '🗣️ Made says', right: '"My name is Made"' },
                                        { left: '👉 Made points to Joshua', right: '"Your name is Joshua"' },
                                    ],
                                },
                                answer_key: 'Tersambung sesuai subjek pembicara',
                                explanation: 'Latihan membedakan kepemilikan nama dalam dialog.',
                            },
                            {
                                id: 2,
                                type: 'MATH_PROBLEM',
                                question: 'Person 1 Name: "Your name is [ ... ]"',
                                answer_key: 'Nama Teman/Keluarga 1',
                                explanation: 'Mencatat nama orang pertama hasil survei.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Person 2 Name: "Your name is [ ... ]"',
                                answer_key: 'Nama Teman/Keluarga 2',
                                explanation: 'Mencatat nama orang kedua hasil survei.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'After someone tells you their name, you say: "[ ... ]" (Thank you / Goodbye morning)',
                                answer_key: 'Thank you',
                                explanation: 'Mengucapkan terima kasih setelah wawancara.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Report your survey: "I have 2 friends. Their names are [ ... ] and [ ... ]."',
                                answer_key: 'Nama 2 orang teman',
                                explanation: 'Melaporkan hasil survei sederhana secara lisan/tertulis.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah menyenangkan bertanya nama orang lain?',
                        'Mengapa penting mengingat nama teman?',
                        'Apa yang kamu rasakan saat berhasil mewawancarai 3 orang?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice reporting your survey: "My name is [Name]. My friend\'s name is [Friend\'s Name]!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 6: Surveying Names & Polite Expressions',
                        quiz_questions: [
                            { question_text: 'Setelah teman menyebutkan namanya, ungkapan sopan yang kita katakan adalah...', option_a: 'Thank you', option_b: 'No', option_c: 'Goodbye fine', option_d: 'Go away', correct_answer: 'A' },
                            { question_text: 'Lengkapi kalimat: "Nice to meet [ ... ]."', option_a: 'you', option_b: 'my', option_c: 'I', option_d: 'am', correct_answer: 'A' },
                            { question_text: 'Arti dari "Nice to meet you" adalah...', option_a: 'Senang bertemu denganmu', option_b: 'Selamat tinggal', option_c: 'Siapa namamu', option_d: 'Sampai besok', correct_answer: 'A' },
                            { question_text: 'Jika Made berkata "My name is Made", maka kamu memanggilnya dengan...', option_a: 'Your name is Made', option_b: 'My name is Made', option_c: 'I am Cici', option_d: 'You are Joshua', correct_answer: 'A' },
                            { question_text: 'Saat berkenalan, kita harus bersikap...', option_a: 'Sombong', option_b: 'Ramah dan tersenyum', option_c: 'Takut dan menangis', option_d: 'Marah', correct_answer: 'B' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 4: MY NUMBER IS TEN
    // =========================================================================
    {
        chapter_number: 4,
        title: 'Unit 4: My Number is Ten',
        target_semester: 1,
        week_target: 7,
        lessons: [
            {
                title: 'Meeting 7: Counting Numbers 1 to 5 (One, Two, Three, Four, Five)',
                order_index: 1,
                learning_objectives: 'Siswa mampu membilang banyak benda berjumlah 1 sampai 5 dalam bahasa Inggris dengan pelafalan fonetik akurat, serta menyatakan angka pilihannya lewat kalimat "My number is [1-5]".',
                content_text: `# 🖐️ Lima Jari Ajaib: Berhitung 1 sampai 5!

Buka tangan kananmu lebar-lebar! Ada 5 jari imut yang siap diajak berhitung dalam bahasa Inggris! 🌈✨

---

### 🔢 1. Mengenal Angka 1 sampai 5

| Angka | Kata Bahasa Inggris | Gambar Benda | Cara Baca Seru |
| :---: | :--- | :---: | :--- |
| **1** | **One** | 🍎 | *(Wan)* |
| **2** | **Two** | 🍎🍎 | *(Tu)* |
| **3** | **Three** | 🍎🍎🍎 | *(Th-rii - julurkan lidah sedikit)* |
| **4** | **Four** | 🍎🍎🍎🍎 | *(For)* |
| **5** | **Five** | 🍎🍎🍎🍎🍎 | *(Faif)* |

---

### 🌟 2. Menyebutkan Angka Favoritmu
Pilih salah satu angka kesukaanmu dan serukan dengan bangga:
> ### 🗣️ "My number is THREE!"  
> *(Artinya: Angkaku adalah tiga!)*

* 👦 Joshua mengangkat 4 jari: 👉 **"My number is FOUR!"**
* 👧 Cici mengangkat 5 jari: 👉 **"My number is FIVE!"**

---

### 🎶 3. Nyanyian Jari Gembira
Ayo bernyanyi sambil menggerakkan jarimu:
> *"One, two, buckle my shoe!* 👟  
> *Three, four, knock at the door!* 🚪  
> *Five, give me a high five!"* 🖐️💥`,
                required_materials: ['5 buah sendok / balok mainan', 'Kartu angka 1-5', 'Cermin kecil'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Show me your hand! Let\'s count our five little fingers together!"',
                    ice_breaker: 'Chant Jari Berirama: "One, two, buckle my shoe! Three, four, knock at the door! Five, high five!"',
                    apperception: 'Hitung jari tangan kanan: 1, 2, 3, 4, 5. "How do we say these in English?"',
                    trigger_question: 'Can you show me three pencils and say the number in English?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pelafalan fonetik akurat angka 1 sampai 5 (One /wʌn/, Two /tuː/, Three /θriː/, Four /fɔːr/, Five /faɪv/) dengan bantuan benda konkret.',
                    concrete_steps: [
                        'Angkat 1 pensil → ucapkan jelas: "One".',
                        'Tambah 1 pensil → "Two".',
                        'Lanjutkan hingga "Three", "Four", dan "Five".',
                        'Tekankan bunyi /th/ pada kata Three agar tidak tertukar dengan Tree.',
                        'Ajak anak menghitung mundur 5-4-3-2-1 untuk tantangan.',
                    ],
                    script_parent: '"Julurkan lidah sedikit saat mengucapkan Three ya! One, two, THREE!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lompat Angka Karpet (Number Card Hop 1-5)',
                    game_rules: [
                        'Letakkan kartu angka 1 sampai 5 di lantai berjarak satu langkah.',
                        'Ayah menyebutkan angka secara acak dalam bahasa Inggris: "THREE!".',
                        'Anak harus melompat tepat ke atas kartu angka 3 sambil berteriak: "My number is THREE!"',
                        'Jika salah lompat, anak harus melompat mundur ke posisi awal.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Melompat berurutan 1, 2, 3, 4, 5.',
                        child_level_advanced: 'Melompat acak dan menyebutkan jumlah jari yang sesuai.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghitung ikon kartun dan mewarnai angka pada LKPD Unit 4 (p. 36).',
                    worksheet_print_ready: {
                        title: 'LKPD 4.1: COUNTING NUMBERS 1 TO 5',
                        instructions: 'Count the objects and circle the correct number word.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Count the red apples: How many apples? (two / three / five)',
                                data: { total: 3, icon: '🍎' },
                                answer_key: 'three',
                                explanation: 'Terdapat 3 buah apel (three).',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Count the learning pencils: How many pencils? (two / four)',
                                data: { total: 2, icon: '✏️' },
                                answer_key: 'two',
                                explanation: 'Terdapat 2 pensil (two).',
                            },
                            {
                                id: 3,
                                type: 'MATCH_PAIRS',
                                question: 'Match the number digit with the English word:',
                                data: {
                                    pairs: [
                                        { left: 'Digit: 1', right: 'One' },
                                        { left: 'Digit: 4', right: 'Four' },
                                        { left: 'Digit: 5', right: 'Five' },
                                    ],
                                },
                                answer_key: '1 → One; 4 → Four; 5 → Five',
                                explanation: 'Pemasangan lambang angka dan kata bahasa Inggris.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Number symbol for "Four" is [ ... ] (4 / 2)',
                                answer_key: '4',
                                explanation: 'Lambang angka dari Four adalah 4.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Order the words from smallest: three, one, two → [ ..., ..., ... ]',
                                answer_key: 'one, two, three',
                                explanation: 'Urutan naik bahasa Inggris: one (1), two (2), three (3).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Angka berapa yang paling kamu sukai?',
                        'Berapa jumlah jari di satu tangan?',
                        'Bagaimana cara melafalkan "Three" yang benar?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Record your voice counting 1 to 5 clearly: "One, Two, Three, Four, Five!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 7: Numbers 1 to 5',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari angka 3 adalah...', option_a: 'Two', option_b: 'Three', option_c: 'Four', option_d: 'Five', correct_answer: 'B' },
                            { question_text: 'Kata "Four" melambangkan angka...', option_a: '1', option_b: '3', option_c: '4', option_d: '5', correct_answer: 'C' },
                            { question_text: 'Jumlah pensil pada gambar: ✏️ ✏️ adalah...', option_a: 'One', option_b: 'Two', option_c: 'Three', option_d: 'Four', correct_answer: 'B' },
                            { question_text: 'Bahasa Inggris dari angka 5 adalah...', option_a: 'Five', option_b: 'Four', option_c: 'One', option_d: 'Ten', correct_answer: 'A' },
                            { question_text: 'Urutan angka yang benar adalah...', option_a: 'One, Two, Three', option_b: 'Three, One, Two', option_c: 'Two, Three, One', option_d: 'One, Four, Two', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 8: Counting Numbers 6 to 10 (Six, Seven, Eight, Nine, Ten)',
                order_index: 2,
                learning_objectives: 'Siswa mampu membilang banyak benda berjumlah 6 sampai 10 dalam bahasa Inggris, mengidentifikasi angka dari petunjuk audio, serta menyatakan kalimat "My number is ten".',
                content_text: `# 🔟 Sepuluh Bintang Kejora: Berhitung 6 sampai 10!

Buka kedua tanganmu lebar-lebar! 🖐️🖐️  
Sekarang kita punya 10 jari lengkap untuk menjelajahi angka-angka besar! 🌟

---

### 🔢 1. Mengenal Angka 6 sampai 10

| Angka | Kata Bahasa Inggris | Gambar Bintang | Cara Baca Seru |
| :---: | :--- | :---: | :--- |
| **6** | **Six** | ⭐⭐⭐⭐⭐⭐ | *(Siks)* |
| **7** | **Seven** | ⭐⭐⭐⭐⭐⭐⭐ | *(Se-ven)* |
| **8** | **Eight** | ⭐⭐⭐⭐⭐⭐⭐⭐ | *(Eit - jangan baca gh-nya ya)* |
| **9** | **Nine** | ⭐⭐⭐⭐⭐⭐⭐⭐⭐ | *(Nain)* |
| **10** | **Ten** | ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ | *(Ten)* |

---

### 🏆 2. Angka Tertinggi: Number Ten!
Ketika kedua tanganmu terbuka penuh, serukan dengan gembira:
> ### 🗣️ "My number is TEN!"  
> *(Artinya: Angkaku adalah sepuluh!)*

---

### 🚀 3. Tantangan Hitung Mundur Peluncuran Roket
Bisa tidak kamu berhitung mundur dari 10 sampai 1 seperti roket angkasa?  
Ayo coba bersama:
> **"Ten, Nine, Eight, Seven, Six, Five, Four, Three, Two, One... BLAST OFF!"** 🚀💥`,
                required_materials: ['10 keping koin / permen', 'Kartu angka 6-10', 'Cermin kecil'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Open both hands! Ten fingers up in the air! Ready to count to ten?"',
                    ice_breaker: 'Lagu Ten Little Indians: "One little, two little, three little Indians... up to TEN!"',
                    apperception: 'Review kilat 1-5, lalu buka jari tangan kedua untuk menghitung 6 sampai 10.',
                    trigger_question: 'What is the biggest number on our ten fingers?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Penguasaan sebutan angka 6-10 dan asosiasi jumlahnya dengan benda konkret.',
                    concrete_steps: [
                        'Bariskan 5 benda di kiri, tambahkan 1 di kanan → "Six (6)".',
                        'Lanjutkan menambah satu per satu: "Seven (7)", "Eight (8)", "Nine (9)", "Ten (10)".',
                        'Gunakan kartu angka acak dan minta anak melafalkannya dengan lantang.',
                        'Tekankan bahwa "Eight" tidak ada bunyi "gh".',
                        'Ulangi menghitung mundur 10-9-8-7-6.',
                    ],
                    script_parent: '"Sepuluh adalah satu set penuh jari tangan! Kalau lihat angka 10, ucapkan: My number is TEN!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Tebak Kartu Cepat "My Number Is..."',
                    game_rules: [
                        'Kocok kartu angka 1 sampai 10.',
                        'Ayah membagikan 1 kartu tertutup ke anak.',
                        'Hitungan ketiga: anak membuka kartu di dahi dan berseru: "My number is EIGHT!" (sesuai kartu yang didapat).',
                        'Jika salah menyebutkan angka, anak harus menari lucu selama 5 detik.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyebutkan angka 6-10 dengan bimbingan visual kartu.',
                        child_level_advanced: 'Menebak angka sebelum dan sesudah angka yang dibuka.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mendengar dan mencentang angka pada LKPD Unit 4 (Listen and check p. 40).',
                    worksheet_print_ready: {
                        title: 'LKPD 4.2: COUNTING NUMBERS 6 TO 10',
                        instructions: 'Listen to your parent and put a tick (√) to the correct number.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "It is seven". Tick the correct digit:',
                                data: { icon: '🔢', subtitle: 'Audio Prompt: Seven', options: ['Number 7', 'Number 6'] },
                                answer_key: 'Number 7',
                                explanation: 'Seven adalah angka 7.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Teacher says: "It is ten". Tick the correct digit:',
                                data: { icon: '🔟', subtitle: 'Audio Prompt: Ten', options: ['Number 10', 'Number 8'] },
                                answer_key: 'Number 10',
                                explanation: 'Ten adalah angka 10.',
                            },
                            {
                                id: 3,
                                type: 'PICT_COUNT',
                                question: 'Count the shining stars: It is [ ... ] (eight / nine)',
                                data: { total: 8, icon: '⭐' },
                                answer_key: 'eight',
                                explanation: 'Terdapat 8 bintang (eight).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Number symbol for "Six" is [ ... ] (6 / 9)',
                                answer_key: '6',
                                explanation: 'Lambang angka Six adalah 6.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Complete the sequence: six, seven, [ ... ], nine, ten.',
                                answer_key: 'eight',
                                explanation: 'Urutan bilangan cacah: 6, 7, 8, 9, 10.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bagaimana cara melafalkan angka 10 dalam bahasa Inggris?',
                        'Angka berapa yang muncul setelah delapan?',
                        'Berapa jumlah jari kedua tanganmu?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil centang angka pada lembar LKPD 4.2 milikmu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 8: Numbers 6 to 10',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari angka 10 adalah...', option_a: 'Ten', option_b: 'Six', option_c: 'Nine', option_d: 'Two', correct_answer: 'A' },
                            { question_text: 'Kata "Seven" artinya adalah angka...', option_a: '6', option_b: '7', option_c: '8', option_d: '9', correct_answer: 'B' },
                            { question_text: 'Bilangan sesudah "Eight" (8) adalah...', option_a: 'Seven', option_b: 'Nine (9)', option_c: 'Ten', option_d: 'Six', correct_answer: 'B' },
                            { question_text: 'Jumlah jeruk pada gambar: 🍊 🍊 🍊 🍊 🍊 🍊 adalah...', option_a: 'Five', option_b: 'Six (6)', option_c: 'Seven', option_d: 'Eight', correct_answer: 'B' },
                            { question_text: 'Arti kalimat "My number is ten" adalah...', option_a: 'Nomorku adalah sepuluh', option_b: 'Namaku adalah sepuluh', option_c: 'Bukuku ada sepuluh', option_d: 'Sepeda ini ada sepuluh', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },
];