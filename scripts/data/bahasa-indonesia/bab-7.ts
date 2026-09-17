// data/bahasa-indonesia/bab-7.ts
// Bab 7: Aku Suka Buku! (Semester 2)

import type { SeedModuleItem } from '../types';

export const BAB_7: SeedModuleItem = {
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
            content_text: `
# 📕 Ayo Kenalan dengan Bagian Buku!

Halo sahabat cilik! Tahukah kamu, buku punya **tiga bagian istimewa**?
Ayo **Maryam** dan **Fatimah** ajak kalian berkenalan dengan bagian buku! 🎉

---
# 🌟 Tiga Bagian Utama Buku

* 📕 **Cover**: Sampul depan buku yang bergambar indah dan melindungi kertas di dalamnya.
* 📝 **Judul**: Nama buku yang ditulis dengan huruf besar dan jelas.
* 📖 **Isi**: Lembaran cerita dan gambar seru di dalam buku.

---
# 🎭 Komik: Detektif Buku

**Maryam**: "Fatimah, ini bagian apa yang bergambar kucing?" 📕
**Fatimah**: "Itu **Cover**! Sampul depan buku!" ✨
**Maryam**: "Kalau tulisan besar di atas ini?" 📝
**Fatimah**: "Itu **Judul**! Nama bukunya!"
**Khadijah**: "Kalian hebat! Sekarang buka halamannya, itu adalah **Isi** buku!" 📖

---
# 🔍 Misi Detektif Buku Hari Ini

Ambil 1 buku cerita favoritmu sekarang, lalu lakukan 3 misi ini:
1. Raba dan tunjuk bagian **Cover**-nya! 🎨
2. Baca dengan lantang **Judul**-nya! 📝
3. Buka dan intip **Isi** ceritanya! 📖`,
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
            content_text: `
# 📖 Cerita: Ari dan Kucing Lucu

Ayo baca petualangan **Ari dan sahabat kecilnya**!
Perhatikan setiap kalimat dan gambar yang menyertainya ya. 😺✨

---
# 🐾 Membaca Cerita Tiga Kalimat

1. 👦🐱 **Ari punya kucing.**
2. 😺✨ **Kucing itu lucu sekali.**
3. ❤️🏡 **Ari sangat sayang pada kucingnya.**

---
# 💡 Tiga Kunci Membaca Cerita

* **Lihat Gambar**: Gambar membantu kita membayangkan jalan cerita. 🎨
* **Kenali Tokoh**: Siapa yang ada di dalam cerita? (Ari dan Kucing). 👤
* **Pahami Peristiwa**: Apa yang sedang terjadi pada tokoh tersebut? 📖

---
# 🕵️ Kuis Detektif Cepat!

Jawab langsung dengan suara lantang:
* Siapa nama anak di dalam cerita? 👉 **Ari!** 👦
* Apa hewan peliharaan Ari? 👉 **Kucing Lucu!** 🐱
* Bagaimana perasaan Ari? 👉 **Sangat Sayang!** ❤️`,
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
            content_text: `
# 📜 Ayo Membaca Cerita Tiga Kalimat!

Hari ini **Maryam** dan **Fatimah** mengajak kita membaca cerita tentang **Budi**.
Setiap cerita tiga kalimat punya bagian pembuka, kegiatan, dan penutup! 🎉

---
# ⚽ Cerita: Budi Bermain Bola

1. ⚽ **Budi punya bola baru.** *(Mengenalkan tokoh & benda)*
2. 🏡 **Ia bermain di halaman rumah.** *(Apa yang ia lakukan)*
3. 😊 **Hati Budi senang sekali.** *(Perasaan tokoh)*

---
# 🧩 Rahasia Struktur 3 Kalimat

* **Kalimat 1 (Pembuka)**: Memperkenalkan siapa tokoh ceritanya. 👤
* **Kalimat 2 (Isi)**: Menceritakan aksi seru yang dilakukan. 🎬
* **Kalimat 3 (Penutup)**: Menceritakan perasaan di akhir cerita. 💖

---
# ✍️ Ayo Coba Cerita Kucing Lapar

Baca dengan lafal yang jelas:
* 🐱 **Si kucing merasa lapar.**
* 🍽️ **Ia berjalan mencari makan.**
* 🐟 **Ia menemukan sepotong ikan lezat.**`,
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