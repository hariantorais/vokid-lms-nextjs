import type { EnglishChapterItem } from './bahasa-inggris-batch-1';

export const BAHASA_INGGRIS_BATCH_2: EnglishChapterItem[] = [
    // =========================================================================
    // UNIT 5: I HAVE FOUR BOOKS
    // =========================================================================
    {
        chapter_number: 5,
        title: 'Unit 5: I Have Four Books',
        target_semester: 1,
        week_target: 9,
        lessons: [
            {
                title: 'Meeting 9: Classroom Objects (Book, Pencil, Bag, Ruler, Eraser)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi dan menyebutkan 5 perlengkapan belajar dasar di kelas (book, pencil, bag, ruler, eraser) dengan pelafalan yang tepat dan percaya diri.',
                content_text: `# 🎒 Buka Tas Ajaib: Perlengkapan Sekolahku!

Hari ini Kimi si Kucing Lucu 🐱 mengajak kita membuka tas sekolah.  
Wah, ada benda apa saja di dalam tasmu? Yuk, kita sebutkan satu per satu dalam bahasa Inggris! ✨

---

### 🏷️ 1. Kartu Benda Sekolah

| Gambar | Nama Benda | Cara Baca Seru | Arti Bahasa Indonesia |
| :---: | :--- | :--- | :--- |
| 📖 | **A Book** | *(E-Buk)* | Sebuah buku cerita/tulis |
| ✏️ | **A Pencil** | *(E-Pen-sil)* | Sebuah pensil runcing |
| 🎒 | **A Bag** | *(E-Baeg)* | Sebuah tas ransel sekolah |
| 📏 | **A Ruler** | *(E-Ru-ler)* | Sebuah penggaris lurus |
| 🧼 | **An Eraser** | *(En-I-rei-ser)* | Sebuah penghapus karet |

---

### 🔎 2. Tebak Benda Bersama Kimi 🐱

* 🐱 **Kimi bertanya**: *"Aku benda tipis dan panjang, dipakai untuk membuat garis lurus rapi. Benda apakah aku?"*  
  👉 **It is a ruler!** 📏

* 🐱 **Kimi bertanya**: *"Aku bisa menghapus coretan pensil yang keliru di buku tulismu. Benda apakah aku?"*  
  👉 **It is an eraser!** 🧼

* 🐱 **Kimi bertanya**: *"Aku punya banyak halaman cerita seru untuk dibaca bersama Ibu. Benda apakah aku?"*  
  👉 **It is a book!** 📖

---

### 💬 3. Latihan Berbicara (Show and Tell!)
Pegang benda nyata di mejamu dan katakan dengan lantang:

* Angkat pensilmu ✏️ ➔ **"This is my pencil!"**
* Buka bukumu 📖 ➔ **"This is my book!"**
* Rangkul tasmu 🎒 ➔ **"This is my bag!"**`,
                required_materials: ['Tas sekolah (bag)', 'Buku (book)', 'Pensil (pencil)', 'Penggaris (ruler)', 'Penghapus (eraser)'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Good morning student! Unpack your school bag, let\'s see what treasures you have!"',
                    ice_breaker: 'Tebak Raba dalam Tas: Masukkan tangan ke tas tertutup, raba benda, lalu tebak: "It is a pencil!"',
                    apperception: 'Tunjukkan pensil dan buku: "Benda yang kita pakai menulis dan membaca setiap hari, apa namanya dalam bahasa Inggris?"',
                    trigger_question: 'What do you use to erase a pencil mark on paper?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata benda kelas: Bag, Book, Pencil, Ruler, Eraser, Sharpener, dengan pelafalan yang jelas.',
                    concrete_steps: [
                        'Angkat tas sekolah: "This is a bag. Say: bag."',
                        'Angkat buku: "This is a book."',
                        'Angkat pensil dan penghapus bergantian: "pencil... eraser... ruler."',
                        'Minta anak menyentuh bendanya masing-masing sambil menyebutkan namanya.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Tunjuk tasmu dan ucapkan jelas: bag! Tunjuk bukumu dan ucapkan: book!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Sentuh Benda Meja Cepat (Speed Touch Challenge)',
                    game_rules: [
                        'Tata 5 benda (tas, buku, pensil, penggaris, penghapus) berjejer di meja.',
                        'Ayah berseru cepat: "TOUCH THE RULER!".',
                        'Anak harus menyentuh penggaris secepat kilat sambil berseru: "Ruler!".',
                        'Jika salah sentuh, anak harus menyentuh semua benda sambil menyebutkan namanya.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menyentuh benda dengan tempo santai.',
                        child_level_advanced: 'Menyentuh benda dan menyebutkan fungsinya dalam bahasa Inggris sederhana.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menjodohkan garis gambar benda sekolah dengan kata yang tepat pada LKPD Unit 5.',
                    worksheet_print_ready: {
                        title: 'LKPD 5.1: THINGS IN MY CLASSROOM',
                        instructions: 'Draw a line to match the picture with the correct word.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'MATCH_PAIRS',
                                question: 'Match the school item picture with the correct word:',
                                data: {
                                    pairs: [
                                        { left: '🎒 Backpack', right: 'Bag' },
                                        { left: '📖 Reading item', right: 'Book' },
                                        { left: '✏️ Writing tool', right: 'Pencil' },
                                        { left: '📏 Measure stick', right: 'Ruler' },
                                    ],
                                },
                                answer_key: 'Tas → Bag; Buku → Book; Pensil → Pencil; Penggaris → Ruler',
                                explanation: 'Menjodohkan gambar perlengkapan sekolah dengan kosa katanya.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'What do you use to clean rubber pencil marks on paper?',
                                data: { icon: '🧼', subtitle: 'Stationery item', options: ['Eraser', 'Sharpener'] },
                                answer_key: 'Eraser',
                                explanation: 'Penghapus adalah eraser.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'What object do you use to sharpen your pencil? (sharpener / book)',
                                answer_key: 'sharpener',
                                explanation: 'Rautan pensil adalah sharpener.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: B - O - O - K',
                                answer_key: 'book',
                                explanation: 'Menebalkan kata book.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Say two things you always put in your school bag: "[ ... ] and [ ... ]"',
                                answer_key: 'book and pencil',
                                explanation: 'Menyebutkan isi tas sekolah dalam bahasa Inggris.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Benda apa yang paling kamu sukai di tas sekolahmu?',
                        'Bagaimana cara menyebut penggaris dalam bahasa Inggris?',
                        'Apa fungsi dari eraser?',
                    ],
                },
                assignments: [
                    { type: 'VOICE_TASK', prompt: 'Hold your pencil and book, then say: "This is my pencil, and this is my book!"' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 9: Classroom Objects',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari kata "buku" adalah...', option_a: 'Book', option_b: 'Bag', option_c: 'Ruler', option_d: 'Pencil', correct_answer: 'A' },
                            { question_text: 'Benda yang digunakan untuk menghapus tulisan pensil adalah...', option_a: 'Eraser', option_b: 'Ruler', option_c: 'Chair', option_d: 'Table', correct_answer: 'A' },
                            { question_text: 'Arti kata "Bag" dalam bahasa Indonesia adalah...', option_a: 'Tas', option_b: 'Meja', option_c: 'Kursi', option_d: 'Penggaris', correct_answer: 'A' },
                            { question_text: 'Benda yang digunakan untuk membuat garis lurus adalah...', option_a: 'Ruler', option_b: 'Book', option_c: 'Pencil case', option_d: 'Sharpener', correct_answer: 'A' },
                            { question_text: 'Kotak tempat menyimpan alat tulis disebut...', option_a: 'Pencil case', option_b: 'Bag', option_c: 'Table', option_d: 'Book', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 10: Plural & Singular Objects (I have four books)',
                order_index: 2,
                learning_objectives: 'Siswa mampu membedakan bentuk benda tunggal dan jamak menggunakan akhiran bunyi "-s" (misal: two pencils, four books) serta menyatakan kepemilikan benda lewat kalimat "I have [jumlah] [benda jamak]".',
                content_text: `# 📚 Rahasia Bunyi Desis: Benda Satu vs Benda Banyak!

Tahukah kamu rahasia sulap dalam bahasa Inggris?  
Kalau bendanya bertambah banyak, di ujung namanya ada bunyi desis **-S** seperti ular! 🐍✨

---

### 🔍 1. Lihat Perbedaannya!

| Jumlah Benda | Gambar | Bahasa Inggris | Ada Bunyi S? |
| :---: | :---: | :--- | :---: |
| **Cuma 1 (Tunggal)** | 📖 | 👉 **One book** | ❌ Tidak ada |
| **Banyak (Lebih dari 1)** | 📖📖📖📖 | 👉 **Four books** *(Buks)* | ✅ Ada bunyi S! |
| **Cuma 1 (Tunggal)** | ✏️ | 👉 **One pencil** | ❌ Tidak ada |
| **Banyak (Lebih dari 1)** | ✏️✏️ | 👉 **Two pencils** *(Pen-sils)* | ✅ Ada bunyi S! |

---

### 🗣️ 2. Menyatakan Benda yang Kamu Miliki
Katakan kata ajaib **"I have..."** *(Aku punya...)*:
> ### 💬 "I have four books!"  
> *(Artinya: Aku punya empat buku!)*

* 👦 Joshua membuka tasnya: 👉 **"I have two pencils!"** ✏️✏️
* 👧 Cici memegang mejanya: 👉 **"I have three rulers!"** 📏📏📏

---

### 🎭 Komik Ceria: Berhitung di Meja Kelas

\`\`\`text
  Cici   : "Joshua, look at my desk! I have four books!" 📚✨
  Joshua : "Wow! And look at my pencil case! I have five pencils!" ✏️🎉
  Kimi   : "Meow! And I have one fish!" 🐟😸
\`\`\`

---

### 💡 Ingat Rumus Kerennya:
* Kalau cuma **1** ➔ Jangan pakai "S" *(One bag)*.
* Kalau **lebih dari 1** ➔ Selalu pasang "S" di belakangnya *(Three bags)*! 🚀`,
                required_materials: ['Beberapa pensil dan buku siswa di meja', 'Kotak pensil berisi alat tulis', 'Kartu angka 1-10'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Hello! Look at my hands: one pencil, but now I have THREE pencils!"',
                    ice_breaker: 'Tepuk Desis Akhiran -S: Ucapkan "Book!" tepuk 1 kali; ucapkan "Books!" desis panjang "Sssss!"',
                    apperception: 'Bandingkan 1 pensil di tangan kiri dan 4 pensil di tangan kanan: apa beda ucapannya?',
                    trigger_question: 'If you have four books, do you say "four book" or "four books"?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Perubahan bentuk tunggal ke jamak dengan penambahan akhiran bunyi -s (pencil → pencils, book → books).',
                    concrete_steps: [
                        'Tunjukkan 1 buku: "One book (tanpa s)".',
                        'Tunjukkan 4 buku: "Four books (ada desis s di akhir)".',
                        'Rangkai dalam kalimat utuh: "I have four books."',
                        'Latih dengan pensil: "I have two pencils."',
                        'Tekankan perbedaan bunyi /s/ pada "books" dan /z/ pada "pencils".',
                    ],
                    script_parent: '"Lebih dari satu benda butuh bunyi \'s\' di akhir! Two pencils, four books!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Misteri Hitung Perlengkapan Meja (Count & Say)',
                    game_rules: [
                        'Keluarkan isi kotak pensil ke meja.',
                        'Ayah memberi tantangan: "How many erasers do you have?".',
                        'Anak menghitung cepat lalu mengangkat bendanya: "I have two erasers!"',
                        'Jika lupa menambahkan -s, anak harus mengulang dengan desis "sss".',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menghitung 1 sampai 3 benda dengan akhiran -s.',
                        child_level_advanced: 'Menghitung hingga 10 benda dan membuat kalimat perbandingan (e.g. 5 pencils and 2 rulers).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Menghitung gambar dan memilih frasa jamak yang benar pada LKPD Unit 5 (p. 50-51).',
                    worksheet_print_ready: {
                        title: 'LKPD 5.2: I HAVE FOUR BOOKS (PLURAL NOUNS)',
                        instructions: 'Count the objects and choose the correct sentence.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'PICT_COUNT',
                                question: 'Count the books: Sentence: "I have [ ... ]" (four books / four book)',
                                data: { total: 4, icon: '📚' },
                                answer_key: 'four books',
                                explanation: 'Benda jamak (lebih dari satu) menggunakan akhiran -s (four books).',
                            },
                            {
                                id: 2,
                                type: 'PICT_COUNT',
                                question: 'Count the pencils: Sentence: "I have [ ... ]" (two pencils / two pencil)',
                                data: { total: 2, icon: '✏️' },
                                answer_key: 'two pencils',
                                explanation: 'Dua pensil jamak: two pencils.',
                            },
                            {
                                id: 3,
                                type: 'PICT_COUNT',
                                question: 'Count the chairs: There are [ ... ] (five chairs / five chair)',
                                data: { total: 5, icon: '🪑' },
                                answer_key: 'five chairs',
                                explanation: 'Lima kursi: five chairs.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'If there is only 1 bag, we say: "One [ ... ]" (bag / bags)',
                                answer_key: 'bag',
                                explanation: 'Benda tunggal berjumlah 1 tidak memakai akhiran -s.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Joshua has 5 pens in his hand. What does Joshua say? "I have [ ... ]"',
                                answer_key: 'five pens',
                                explanation: 'Joshua memiliki 5 pena: five pens.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Mengapa kita menambahkan bunyi "s" saat punya dua pensil?',
                        'Berapa buku yang kamu miliki di tasmu sekarang?',
                        'Bagaimana cara melafalkan "books" yang benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan menghitung benda jamak pada LKPD 5.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 10: Plural & Singular Classroom Objects',
                        quiz_questions: [
                            { question_text: 'Bentuk jamak dari kata "book" jika jumlahnya 4 buah adalah...', option_a: 'Four book', option_b: 'Four books', option_c: 'One book', option_d: 'Book four', correct_answer: 'B' },
                            { question_text: 'Jika kita hanya punya 1 buah tas, kalimat yang benar adalah...', option_a: 'I have one bag', option_b: 'I have one bags', option_c: 'I have four bag', option_d: 'Bag one', correct_answer: 'A' },
                            { question_text: 'Gambar 3 penggaris dalam bahasa Inggris ditulis...', option_a: 'Three rulers', option_b: 'Three ruler', option_c: 'One ruler', option_d: 'Two rulers', correct_answer: 'A' },
                            { question_text: 'Arti dari kalimat "I have two pencils" adalah...', option_a: 'Saya memiliki dua pensil', option_b: 'Saya memiliki dua buku', option_c: 'Kamu memiliki dua pensil', option_d: 'Ini adalah dua pensil', correct_answer: 'A' },
                            { question_text: 'Tambahan huruf pada akhir kata benda bahasa Inggris yang berjumlah banyak adalah huruf...', option_a: '-s', option_b: '-m', option_c: '-a', option_d: '-o', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 6: MY GARDEN IS COLORFUL
    // =========================================================================
    {
        chapter_number: 6,
        title: 'Unit 6: My Garden is Colorful',
        target_semester: 1,
        week_target: 11,
        lessons: [
            {
                title: 'Meeting 11: Basic Primary & Secondary Colors',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi dan menyebutkan 6 nama warna dasar (Red, Blue, Yellow, Green, Black, White) pada objek nyata di lingkungan sekitar dengan pelafalan tepat.',
                content_text: `# 🌈 Taman Bunga Pelangi: Mengenal Warna-Warni Indah!

Lihatlah ke luar jendela rumahmu! Dunia ini penuh dengan warna-warna yang sangat cantik! 🌸🍃  
Ayo berkenalan dengan 6 warna sahabat kita:

---

### 🎨 1. Galeri 6 Warna Dasar

| Warna Cantik | Nama Inggris | Contoh di Alam Sekitar |
| :---: | :--- | :--- |
| 🔴 | **Red** | Buah apel manis 🍎 & tomat matang |
| 🔵 | **Blue** | Langit cerah siang hari 🌤️ & air laut luas |
| 🟡 | **Yellow** | Matahari pagi ☀️ & kulit pisang matang 🍌 |
| 🟢 | **Green** | Daun pohon 🍃 & rumput taman segar |
| ⚫ | **Black** | Roda mobil 🚗 & sepatu sekolah |
| ⚪ | **White** | Awan lembut di langit ☁️ & kertas gambarmu |

---

### 🗣️ 2. Cara Menyebutkan Warna Benda
Gunakan kalimat sederhana ini:
> ### 💬 "The apple is red!"  
> *(Artinya: Apel itu berwarna merah!)*

* Daun taman 🍃 ➔ **"The leaf is green!"**
* Langit cerah 🌤️ ➔ **"The sky is blue!"**

---

### 🕵️‍♂️ 3. Permainan Detektif Warna
Coba tengok sekeliling kamarmu sekarang:
1. Benda apa yang berwarna **RED**?
2. Benda apa yang berwarna **BLUE**?
3. Benda apa yang berwarna **YELLOW**?`,
                required_materials: ['Kertas origami aneka warna', 'Krayon warna dasar', 'Benda-benda berwarna di rumah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Look around! The world is full of rainbow colors! What color do you see?"',
                    ice_breaker: 'Tepuk Warna: Sebut "Red" tepuk dada, "Blue" tepuk tangan, "Yellow" angkat tangan tinggi.',
                    apperception: 'Tunjukkan apel merah dan daun hijau: "Warna apa ini dalam bahasa Inggris?"',
                    trigger_question: 'What is the color of the sky and the sun?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Asosiasi visual warna: Red (merah), Blue (biru), Yellow (kuning), Green (hijau), Black (hitam), White (putih).',
                    concrete_steps: [
                        'Tunjukkan kertas merah: "Red like an apple."',
                        'Tunjukkan kertas biru: "Blue like the ocean."',
                        'Tunjukkan kertas kuning: "Yellow like the bright sun."',
                        'Tunjukkan kertas hijau: "Green like garden grass."',
                        'Ulangi 3x dengan tempo berbeda untuk memperkuat memori.',
                    ],
                    script_parent: '"Tunjuk baju dan sebutkan warnanya! Red, blue, yellow, green!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Berburu Warna Rumah (Color Hunter Quest)',
                    game_rules: [
                        'Ayah menyebutkan misi: "Find something BLUE in this room in 10 seconds!".',
                        'Anak berlari mencari benda berwarna biru, menyentuhnya, dan berteriak: "It is BLUE!"',
                        'Jika salah warna, anak harus menyebutkan 3 warna berbeda sebagai hukuman lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Menemukan 1 benda sesuai warna yang ditunjukkan kartu origami.',
                        child_level_advanced: 'Menyebutkan kombinasi benda dan warna (e.g. A blue pillow, a green leaf).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mewarnai balon sesuai label teks warna pada LKPD Unit 6 (p. 55).',
                    worksheet_print_ready: {
                        title: 'LKPD 6.1: COLORFUL BALLOONS',
                        instructions: 'Observe the balloons and match each color name.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'COLOR_PALETTE',
                                question: 'Read aloud the basic balloon colors and color them:',
                                data: { colors: ['red', 'yellow', 'green', 'blue', 'black', 'white'] },
                                answer_key: 'Bagan warna terlampir',
                                explanation: 'Pengenalan visual 6 warna dasar.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Match the natural object with its typical color:',
                                data: {
                                    pairs: [
                                        { left: '🍎 Red apple', right: 'Red' },
                                        { left: '☀️ Morning sun', right: 'Yellow' },
                                        { left: '🌿 Garden leaf', right: 'Green' },
                                    ],
                                },
                                answer_key: 'Apel → Red; Matahari → Yellow; Daun → Green',
                                explanation: 'Pemasangan benda alam dengan warnanya.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Color of clear sea water is [ ... ] (blue / white)',
                                answer_key: 'blue',
                                explanation: 'Air laut jernih tampak berwarna biru (blue).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: G - R - E - E - N',
                                answer_key: 'green',
                                explanation: 'Menebalkan kata green.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'What color are school shoes usually? (black / green)',
                                answer_key: 'black',
                                explanation: 'Sepatu sekolah umumnya berwarna hitam (black).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apa warna favoritmu?',
                        'Apa warna tas sekolahmu?',
                        'Benda apa di rumahmu yang berwarna merah?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil mewarnai balon warna-warni pada lembar LKPD 6.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 11: Basic Colors',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari warna "Merah" adalah...', option_a: 'Blue', option_b: 'Red', option_c: 'Yellow', option_d: 'Green', correct_answer: 'B' },
                            { question_text: 'Warna daun pohon di taman pada umumnya adalah...', option_a: 'Green', option_b: 'Black', option_c: 'Red', option_d: 'Pink', correct_answer: 'A' },
                            { question_text: 'Kata "Yellow" dalam bahasa Indonesia artinya...', option_a: 'Kuning', option_b: 'Biru', option_c: 'Putih', option_d: 'Cokelat', correct_answer: 'A' },
                            { question_text: 'Warna langit cerah di siang hari adalah...', option_a: 'Blue', option_b: 'Black', option_c: 'Green', option_d: 'Purple', correct_answer: 'A' },
                            { question_text: 'Bahasa Inggris dari warna "Hitam" dan "Putih" adalah...', option_a: 'Black and White', option_b: 'Red and Blue', option_c: 'Green and Yellow', option_d: 'Pink and Brown', correct_answer: 'A' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 12: Advanced Colors & Color by Number Code',
                order_index: 2,
                learning_objectives: 'Siswa mampu mengenali 4 warna lanjutan (purple, pink, orange, brown) dan mengikuti instruksi mewarnai berdasarkan kode angka secara teliti.',
                content_text: `# 🖍️ Laboratorium Krayon: Warna Lanjutan & Kode Angka!

Ayo buka kotak krayonmu! Masih banyak warna seru lainnya yang siap menghias gambar kita: 🎨✨

---

### 🔮 1. Empat Warna Ajaib Baru

| Krayon | Nama Warna | Cara Membayangkannya |
| :---: | :--- | :--- |
| 🟣 | **Purple** *(Ungu)* | Seperti buah anggur manis di kebun 🍇 |
| 🌸 | **Pink** *(Merah Muda)* | Seperti bunga mawar merah muda yang harum 🌺 |
| 🟠 | **Orange** *(Oranye / Jingga)* | Persis seperti warna dan nama buah jeruk 🍊 |
| 🟤 | **Brown** *(Cokelat)* | Seperti batang pohon kokoh & cokelat lezat 🍫 |

---

### 🎯 2. Mewarnai dengan Kode Angka Rahasia!
Dengarkan perintah rahasia berikut:

* Jika ada angka **1** ➔ Warnai dengan **Pink**! 🌸
* Jika ada angka **2** ➔ Warnai dengan **Orange**! 🍊
* Jika ada angka **3** ➔ Warnai dengan **Purple**! 🍇
* Jika ada angka **4** ➔ Warnai dengan **Brown**! 🍫

---

### 🧥 3. Komik: Jas Hujan Warna-Warni Aisyah

\`\`\`text
  Aisyah : "Look at my new raincoat! Number 1 is pink!" 🧥🌸
  Cici   : "Wow, so pretty! And the umbrella is purple!" ☂️🍇
  Joshua : "My raincoat is orange like a fresh orange fruit!" 🍊👦
\`\`\`

Siapkan krayonmu dan mari mewarnai dengan teliti! 🚀`,
                required_materials: ['Krayon / pensil warna lengkap (12 warna)', 'Lembar mewarnai kode angka', 'Benda berwarna-warni di rumah'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Grab your crayons! Today our coloring laboratory is officially open!"',
                    ice_breaker: 'Angkat Krayon Cepat: Ayah sebut "ORANGE!", anak mengangkat krayon jingga ke udara.',
                    apperception: 'Tunjukkan buah jeruk (orange) dan bunga mawar pink: "Bagaimana sebutan warna ini?"',
                    trigger_question: 'What color is chocolate and an orange fruit?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Kosakata warna lanjutan: Orange (oranye/jingga), Pink (merah muda), Purple (ungu), Brown (cokelat).',
                    concrete_steps: [
                        'Perkenalkan warna Orange sama dengan nama buahnya (orange).',
                        'Perkenalkan Pink dan Purple.',
                        'Perkenalkan Brown seperti warna batang pohon atau cokelat makanan.',
                        'Praktik instruksi: "Color number 1 pink, color number 2 blue."',
                        'Ulangi 3x dengan variasi instruksi.',
                    ],
                    script_parent: '"Dengarkan instruksi warnanya dengan teliti: Number one is pink, number two is blue!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Bisik Berantai Kertas Warna (Color Paper Whisper Chain)',
                    game_rules: [
                        'Ayah membisikkan satu kata warna ke telinga anak: "PURPLE!".',
                        'Anak berlari ke meja krayon, mengambil krayon ungu, dan menunjukkannya: "It is purple!"',
                        'Jika salah mengambil warna, anak harus mengulang bisikan dengan suara lucu.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Memilih krayon warna dengan contoh visual.',
                        child_level_advanced: 'Mendengar dua instruksi warna sekaligus (e.g. Take pink and brown).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mewarnai gambar kode angka pada LKPD Unit 6 (Aisyah\'s Raincoat p. 57).',
                    worksheet_print_ready: {
                        title: 'LKPD 6.2: LISTEN AND COLOR BY NUMBER CODE',
                        instructions: 'Listen to the audio instructions and color the picture correctly.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Audio Command: "Number 1 is pink". What color do you use?',
                                data: { icon: '🧥', subtitle: 'Code 1 = Pink', options: ['Pink', 'Green'] },
                                answer_key: 'Pink',
                                explanation: 'Sesuai instruksi dengar: number 1 is pink.',
                            },
                            {
                                id: 2,
                                type: 'COLOR_PALETTE',
                                question: 'Secondary colors palette: Say and color each item:',
                                data: { colors: ['orange', 'purple', 'pink', 'brown'] },
                                answer_key: 'Bagan warna terlampir',
                                explanation: 'Palet warna lanjutan.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'The fruit orange has the color [ ... ] (orange / purple)',
                                answer_key: 'orange',
                                explanation: 'Buah jeruk berwarna oranye/orange.',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Color of sweet chocolate is [ ... ] (brown / white)',
                                answer_key: 'brown',
                                explanation: 'Cokelat makanan berwarna brown.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Look at Aisyah\'s uniform: "The veil is brown and skirt is [ ... ]" (green / black)',
                                answer_key: 'green',
                                explanation: 'Rok seragam Aisyah pada buku siswa berwarna hijau (green).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Warna apa yang paling mudah kamu ingat?',
                        'Bisakah kamu menyebutkan dua benda berwarna cokelat?',
                        'Bagaimana cara melafalkan "Orange" dengan benar?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto karya jas hujan Aisyah yang sudah diwarnai sesuai kode angka pada LKPD 6.2!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 12: Extended Colors & Coloring Code',
                        quiz_questions: [
                            { question_text: 'Warna buah jeruk dalam bahasa Inggris disebut...', option_a: 'Purple', option_b: 'Orange', option_c: 'Brown', option_d: 'Pink', correct_answer: 'B' },
                            { question_text: 'Warna "Purple" dalam bahasa Indonesia adalah...', option_a: 'Ungu', option_b: 'Merah muda', option_c: 'Cokelat', option_d: 'Abu-abu', correct_answer: 'A' },
                            { question_text: 'Warna "Pink" adalah sebutan untuk warna...', option_a: 'Merah muda', option_b: 'Kuning terang', option_c: 'Biru laut', option_d: 'Hitam legam', correct_answer: 'A' },
                            { question_text: 'Warna tanah subur dan batang pohon adalah...', option_a: 'Brown', option_b: 'Pink', option_c: 'White', option_d: 'Orange', correct_answer: 'A' },
                            { question_text: 'Jika guru memberi instruksi "Color it yellow", maka kita mengambil krayon warna...', option_a: 'Kuning', option_b: 'Hijau', option_c: 'Biru', option_d: 'Merah', correct_answer: 'A' },
                        ],
                    },
                ],
            },
        ],
    },

    // =========================================================================
    // UNIT 7: IT IS A BIG CIRCLE
    // =========================================================================
    {
        chapter_number: 7,
        title: 'Unit 7: It is a Big Circle',
        target_semester: 1,
        week_target: 13,
        lessons: [
            {
                title: 'Meeting 13: Shapes & Drawing in the Air (Circle, Square, Triangle)',
                order_index: 1,
                learning_objectives: 'Siswa mampu mengidentifikasi dan menyebutkan 3 bentuk geometri 2 dimensi dasar (Circle, Square, Triangle) serta mempraktikkan menggambar bentuk tersebut di udara dengan jari telunjuk.',
                content_text: `# ⭕ Menggambar Bentuk Ajaib di Udara!

Angkat jari telunjukmu tinggi-tinggi ke angkasa! ☝️✨  
Hari ini jari kita menjadi kuas ajaib untuk menggambar 3 bentuk geometri:

---

### 📐 1. Tiga Bentuk Sahabat Cilik

| Bentuk | Nama Inggris | Rahasia Ciri-cirinya | Benda di Rumah |
| :---: | :--- | :--- | :--- |
| ⭕ | **Circle** | Bulat melengkung tanpa sudut | Jam dinding ⏰ & piring bulat |
| 🔲 | **Square** | Punya **4 sisi lurus** & 4 sudut lancip | Buku gambar 📖 & jendela kamar |
| 🔺 | **Triangle** | Punya **3 sisi lurus** & 3 sudut lancip | Potongan pizza 🍕 & atap rumah |

---

### 🪄 2. Gerakan Terbang: Melukis di Udara!
Ayo ikuti petunjuk Kimi:

1. Putar jarimu memutar bulat:  
   👉 **"It is a circle!"** *(Lingkaran!)*
2. Gerakkan jarimu: lurus ke kanan, turun ke bawah, ke kiri, naik ke atas:  
   👉 **"It is a square!"** *(Persegi!)*
3. Gerakkan jarimu: miring ke atas, miring ke bawah, lalu garis datar:  
   👉 **"It is a triangle!"** *(Segitiga!)*

---

### 🎭 Komik: Menebak Bentuk Potongan Pizza

\`\`\`text
  Joshua : "Look at my pizza slice! What shape is it?" 🍕
  Cici   : "It has three corners! It is a triangle!" 🔺✨
  Joshua : "Correct! And what shape is the plate?" 🍽️
  Cici   : "It is round! It is a circle!" ⭕🎉
\`\`\``,
                required_materials: ['Kardus kotak (square)', 'Jam dinding bulat (circle)', 'Penggaris segitiga (triangle)'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Raise your magic pointer finger! Today we draw magic flying shapes!"',
                    ice_breaker: 'Menggambar di Awan: "Up your finger and draw a big CIRCLE in the sky!"',
                    apperception: 'Tunjukkan piring makan dan buku: "Benda ini bentuknya apa dalam bahasa Inggris?"',
                    trigger_question: 'What shape is a pizza slice and a wheel?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Identifikasi bentuk 2D: Circle (lingkaran), Square (persegi/segiempat), Triangle (segitiga).',
                    concrete_steps: [
                        'Raba jam dinding: "It is a circle. Round and round, circle."',
                        'Raba buku segiempat: "It is a square. Four straight sides."',
                        'Raba penggaris segitiga: "It is a triangle. Three sharp corners."',
                        'Gambar bersama di udara dengan jari telunjuk.',
                        'Ulangi 3x dengan mata tertutup untuk melatih memori.',
                    ],
                    script_parent: '"Gambar bentuk di udara: Circle bulat, square punya 4 sisi, triangle punya 3 sudut!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Simon Says Bentuk Tubuh',
                    game_rules: [
                        'Ayah memberi aba-aba: "Simon says make a CIRCLE with your arms!".',
                        'Anak membuat lingkaran dengan kedua lengannya.',
                        'Jika Ayah berkata: "Simon says make a TRIANGLE with your fingers!", anak menyatukan jempol dan telunjuk membentuk segitiga.',
                        'Jika salah, anak harus menyebutkan nama bentuk sambil melompat.',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Membuat bentuk lingkaran dan segitiga dengan bantuan kedua tangan.',
                        child_level_advanced: 'Menebak bentuk benda tersembunyi di ruangan.',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Mencentang tabel bentuk benda pada LKPD Unit 7 (Look and tick p. 66).',
                    worksheet_print_ready: {
                        title: 'LKPD 7.1: SHAPES ALL AROUND US',
                        instructions: 'Look at the object and put a tick (√) in the correct shape column.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'SHAPE_CARD',
                                question: 'Observe the three basic geometric shapes:',
                                data: {
                                    shapes: [
                                        { name: 'Circle', type: 'circle' },
                                        { name: 'Square', type: 'square' },
                                        { name: 'Triangle', type: 'triangle' },
                                    ],
                                },
                                answer_key: 'Bagan bangun datar terlampir',
                                explanation: 'Bentuk lingkaran, segiempat, dan segitiga.',
                            },
                            {
                                id: 2,
                                type: 'MATCH_PAIRS',
                                question: 'Match the household item with its shape:',
                                data: {
                                    pairs: [
                                        { left: '⏰ Wall clock', right: 'Circle' },
                                        { left: '📐 Triangle ruler', right: 'Triangle' },
                                        { left: '📦 Cardboard box', right: 'Square' },
                                    ],
                                },
                                answer_key: 'Jam → Circle; Penggaris segitiga → Triangle; Kotak → Square',
                                explanation: 'Pemasangan benda nyata dengan bentuk geometrinya.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'A slice of pizza has the shape of a [ ... ] (Triangle / Circle)',
                                answer_key: 'Triangle',
                                explanation: 'Potongan pizza berbentuk segitiga (Triangle).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'Trace: C - I - R - C - L - E',
                                answer_key: 'circle',
                                explanation: 'Menebalkan kata circle.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Look at a house roof picture: "The red roof is [ ... ]" (triangle / circle)',
                                answer_key: 'triangle',
                                explanation: 'Atap rumah pada umumnya berbentuk segitiga (triangle).',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Bentuk apa yang tidak memiliki sudut tajam sama sekali?',
                        'Bisakah kamu menemukan benda berbentuk persegi di kamarmu?',
                        'Bagaimana cara menggambar segitiga di udara?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil centang tabel bentuk benda pada LKPD 7.1!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 13: Shapes (Circle, Square, Triangle)',
                        quiz_questions: [
                            { question_text: 'Bahasa Inggris dari bangun datar "Lingkaran" adalah...', option_a: 'Square', option_b: 'Triangle', option_c: 'Circle', option_d: 'Star', correct_answer: 'C' },
                            { question_text: 'Bangun datar yang memiliki 3 sisi dan 3 sudut tajam adalah...', option_a: 'Circle', option_b: 'Triangle', option_c: 'Square', option_d: 'Line', correct_answer: 'B' },
                            { question_text: 'Benda yang permukaannya berbentuk "Square" (persegi) adalah...', option_a: 'Buku tulis kotak', option_b: 'Roda sepeda', option_c: 'Koin logam', option_d: 'Piring bulat', correct_answer: 'A' },
                            { question_text: 'Bentuk dari gambar matahari bulat di langit adalah...', option_a: 'Triangle', option_b: 'Circle', option_c: 'Square', option_d: 'Box', correct_answer: 'B' },
                            { question_text: 'Arti kata "Triangle" dalam bahasa Indonesia adalah...', option_a: 'Segiempat', option_b: 'Segitiga', option_c: 'Lingkaran', option_d: 'Garis lengkung', correct_answer: 'B' },
                        ],
                    },
                ],
            },
            {
                title: 'Meeting 14: Distinguishing Sizes (Big vs Small) & Shape House Project',
                order_index: 2,
                learning_objectives: 'Siswa mampu membedakan ukuran benda menggunakan kata sifat "Big" (besar) dan "Small" (kecil), serta merangkai bentuk-bentuk geometri menjadi proyek rumah bentuk ("It is a big circle").',
                content_text: `# 🏠 Rumah Bentuk: Besar (Big) dan Kecil (Small)!

Rentangkan kedua tanganmu lebar-lebar: **BIG!** 🐘  
Lalu satukan kedua telapak tanganmu merapat: **SMALL!** 🐜  

Mari merakit rumah impian dari bentuk-bentuk geometri besar dan kecil:

---

### 📏 1. Membedakan Ukuran Benda

| Ukuran | Gambar | Contoh Kalimat Keren |
| :---: | :---: | :--- |
| **BIG** *(Besar)* | ⚽ | 👉 **"It is a big circle!"** *(Ini lingkaran besar!)* |
| **SMALL** *(Kecil)* | 🪙 | 👉 **"It is a small circle!"** *(Ini lingkaran kecil!)* |
| **BIG** *(Besar)* | 🔲 | 👉 **"It is a big square!"** *(Ini persegi besar!)* |
| **SMALL** *(Kecil)* | ◽ | 👉 **"It is a small square!"** *(Ini persegi kecil!)* |

---

### 🛠️ 2. Proyek Arsitek Cilik: Shape House!
Ayo rakit rumah idamanmu:
* Ambil satu **Big Triangle** 🔺 untuk atap rumah yang megah.
* Ambil satu **Big Square** 🔲 untuk dinding rumah yang kokoh.
* Pasang satu **Small Square** ◽ untuk jendela kamar.
* Pasang satu **Small Circle** ⭕ untuk hiasan pintu!

---

### 🎭 Komik: Pameran Rumah Bentuk

\`\`\`text
  Made : "Look at my shape house! The roof is a big triangle!" 🔺✨
  Cici : "And the window is a small square! It is so cute!" ◽🏡
  Made : "Yes! Big and small shapes make a wonderful house!" 🎉
\`\`\`

Ingat aturannya: **Sebutkan ukurannya dulu baru bentuknya!**  
👉 *Big circle, small triangle!* 🚀`,
                required_materials: ['Potongan kertas bentuk geometri (besar & kecil)', 'Lem kertas', 'Krayon'],
                intro_guide: {
                    duration_minutes: 10,
                    greeting: '"Stretch your arms wide: BIG! Bring your hands close: SMALL!"',
                    ice_breaker: 'Suara Raksasa & Semut: Bicara dengan suara berat besar "BIG!", lalu suara kecil bisik "Small!"',
                    apperception: 'Bandingkan bola basket besar dan bola kelereng kecil: "What is the difference?"',
                    trigger_question: 'How do you say "lingkaran besar" in English?',
                },
                mindful_guide: {
                    duration_minutes: 20,
                    concept_focus: 'Pola frasa kata sifat ukuran di depan kata benda: Big [Shape] vs Small [Shape].',
                    concrete_steps: [
                        'Tunjukkan lingkaran karton besar: "It is a BIG circle."',
                        'Tunjukkan lingkaran karton kecil: "It is a SMALL circle."',
                        'Ulangi pada segitiga: "Big triangle vs small triangle."',
                        'Bimbing anak merakit potongan bentuk membentuk rumah.',
                        'Ulangi 3x dengan tempo berbeda.',
                    ],
                    script_parent: '"Ingat, ukuran selalu di depan! Ucapkan: It is a big square, it is a small circle!"',
                },
                joyful_guide: {
                    duration_minutes: 20,
                    game_title: 'Lompat Lingkaran Raksasa (Big & Small Hop)',
                    game_rules: [
                        'Gambar 1 lingkaran kapur besar dan 1 lingkaran kecil di lantai.',
                        'Ayah berseru: "HOP INTO THE BIG CIRCLE!".',
                        'Anak melompat ke dalam lingkaran besar sambil merentangkan tangan berseru: "It is a BIG circle!"',
                        'Jika salah lompat, anak harus melompat ke lingkaran kecil sambil berbisik "small circle".',
                    ],
                    multi_grade_adaptation: {
                        child_level_basic: 'Melompat ke lingkaran yang diperintahkan.',
                        child_level_advanced: 'Membuat bentuk raksasa dan kerdil dengan instruksi ganda (Big square & small triangle).',
                    },
                },
                meaningful_guide: {
                    duration_minutes: 15,
                    task_focus: 'Proyek menempel dan mencocokkan bentuk rumah pada LKPD Unit 7 (Cut and stick p. 64-65).',
                    worksheet_print_ready: {
                        title: 'LKPD 7.2: BIG AND SMALL SHAPE HOUSE',
                        instructions: 'Observe the sizes and shapes, then choose the correct description.',
                        section_a_basic: [
                            {
                                id: 1,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the giant beach ball. What is the size and shape?',
                                data: { icon: '🏐', subtitle: 'Giant ball', options: ['It is a big circle', 'It is a small circle'] },
                                answer_key: 'It is a big circle',
                                explanation: 'Bola pantai berukuran besar berbentuk lingkaran: big circle.',
                            },
                            {
                                id: 2,
                                type: 'ENGLISH_CARD',
                                question: 'Look at the small coin. What is the size and shape?',
                                data: { icon: '🪙', subtitle: 'Tiny coin', options: ['It is a small circle', 'It is a big square'] },
                                answer_key: 'It is a small circle',
                                explanation: 'Koin kecil berbentuk lingkaran: small circle.',
                            },
                            {
                                id: 3,
                                type: 'MATH_PROBLEM',
                                question: 'Opposite of BIG is [ ... ] (small / tall)',
                                answer_key: 'small',
                                explanation: 'Lawan kata dari Big (besar) adalah Small (kecil).',
                            },
                            {
                                id: 4,
                                type: 'MATH_PROBLEM',
                                question: 'A house with a large square wall: "It is a [ ... ] square" (big / small)',
                                answer_key: 'big',
                                explanation: 'Tembok rumah yang besar: big square.',
                            },
                        ],
                        section_b_enrichment: [
                            {
                                id: 5,
                                type: 'MATH_PROBLEM',
                                question: 'Combine the words: (Size: Big) + (Shape: Triangle) = "It is a [ ... ]"',
                                answer_key: 'big triangle',
                                explanation: 'Urutan frasa kata sifat ukuran mendahului nama bentuk.',
                            },
                        ],
                    },
                    reflection_questions: [
                        'Apakah gajah itu besar atau kecil?',
                        'Bentuk besar apa yang bisa kamu lihat di ruang tamu?',
                        'Bagaimana cara menyebut lingkaran kecil dalam bahasa Inggris?',
                    ],
                },
                assignments: [
                    { type: 'PHOTO_HOMEWORK', prompt: 'Foto karya tempel bentuk rumah (Shape House) pada LKPD 7.2 milikmu!' },
                    {
                        type: 'QUIZ_CBT',
                        prompt: 'Quiz 14: Sizes and Shape House',
                        quiz_questions: [
                            { question_text: 'Arti dari kata "Big" adalah...', option_a: 'Kecil', option_b: 'Besar', option_c: 'Panjang', option_d: 'Bulat', correct_answer: 'B' },
                            { question_text: 'Arti dari kata "Small" adalah...', option_a: 'Besar', option_b: 'Kecil', option_c: 'Tinggi', option_d: 'Luas', correct_answer: 'B' },
                            { question_text: 'Bahasa Inggris dari "Lingkaran besar" adalah...', option_a: 'Big circle', option_b: 'Small circle', option_c: 'Circle big', option_d: 'Square big', correct_answer: 'A' },
                            { question_text: 'Jika atap rumah berbentuk segitiga kecil, kita menyebutnya...', option_a: 'Small triangle', option_b: 'Big square', option_c: 'Small circle', option_d: 'Triangle big', correct_answer: 'A' },
                            { question_text: 'Manakah benda yang ukurannya "Small" dibandingkan bola basket?', option_a: 'Mobil', option_b: 'Rumah', option_c: 'Kelereng kecil', option_d: 'Gajah', correct_answer: 'C' },
                        ],
                    },
                ],
            },
        ],
    },
];