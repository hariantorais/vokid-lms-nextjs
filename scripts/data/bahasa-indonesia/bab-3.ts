// data/bahasa-indonesia/bab-3.ts
// Bab 3: Keluargaku Tersayang (Semester 1)

import type { SeedModuleItem } from '../types';

export const BAB_3: SeedModuleItem = {
    title: 'Bab 3: Keluargaku Tersayang',
    order_index: 3,
    target_semester: 1,
    week_target: 7,
    lessons: [
        {
            title: 'Pertemuan 7: Ayo Baca Nama Keluarga (ayah, ibu, kakak, adik)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca dan menulis nama anggota keluarga inti dengan gembira.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kata anggota keluarga',
                'Foto keluarga (opsional)',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 👨‍👩‍👧 Keluargaku Tersayang!

Halo sahabat cilik! Hari ini **Maryam** dan **Khadijah** mengajak kalian mengenal nama anggota keluarga yang paling kita sayangi di rumah! 🏡💖

---
# 🌟 Anggota Keluarga Inti Kita

* 👨 **Ayah** : Kepala keluarga yang melindungi kita 👉 *a — yah*
* 👩 **Ibu** : Ibu tercinta yang merawat kita dengan kasih sayang 👉 *i — bu*
* 👦 **Kakak** : Saudara yang lebih tua dari kita 👉 *ka — kak*
* 👶 **Adik** : Saudara yang lebih muda dari kita 👉 *a — dik*

---
# 🎭 Komik: Keluarga Bahagia

**Maryam**: "Khadijah, siapa saja anggota keluarga kita di rumah?" 👧
**Khadijah**: "Ada ayah, ibu, kakak, dan adik kecil!" ✨
**Maheer**: "Aku sangat sayang pada ayah dan ibuku!" 🤗
**Asiya**: "Keluarga adalah anugerah terindah untuk kita semua!" 💫

---
# 🔍 Detektif Kasih Sayang

Tunjukkan cintamu kepada keluargamu hari ini:
1. Panggil dan peluk **Ayah**! 👨
2. Cium tangan dan ucapkan terima kasih pada **Ibu**! 👩
3. Ajak **Kakak** atau **Adik** bermain bersama dengan rukun! 🎮`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan mengenal nama anggota keluarga kita tercinta!',
                ice_breaker:
                    'Ayo tepuk tangan sambil sebut: "Ayah! Ibu! Kakak! Adik!" — tepuk 4x!',
                apperception:
                    'Coba sebut nama ayahmu. Kata "ayah" terdiri dari suku kata apa saja?',
                trigger_question:
                    'Siapa saja anggota keluargamu? Ayo kita sebutkan bersama!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Nama anggota keluarga: ayah, ibu, kakak, adik.',
                concrete_steps: [
                    'Tunjukkan kartu kata "ayah". Baca bersama 3x.',
                    'Lanjut "ibu", "kakak", "adik".',
                    'Pecah tiap kata jadi suku kata: a-yah, i-bu, ka-kak, a-dik.',
                    'Minta anak menyebutkan nama keluarganya sendiri.',
                    'Beri apresiasi setiap sebutan benar.',
                ],
                script_parent:
                    '"Nah sayang, ayah terdiri dari a-yah. Yuk, kita baca bersama nama keluarga kita!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Kartu Keluarga Ceria',
                game_rules: [
                    'Guru menunjukkan gambar anggota keluarga.',
                    'Anak membaca nama & menyebutkan perannya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Membaca dengan bantuan guru, 2 kata dulu (ayah, ibu).',
                    child_level_advanced:
                        'Membaca & menulis nama keluarga sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis nama keluarga.',
                worksheet_print_ready: {
                    title: 'LKPD 3.1: Ayo Baca Nama Keluarga!',
                    instructions:
                        'Baca kata, cocokkan dengan gambar, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READ_AND_MATCH',
                            question: 'Baca kata, lalu cocokkan dengan gambar!',
                            data: {
                                words: [
                                    { word: 'ayah', icon: '👨' },
                                    { word: 'ibu', icon: '👩' },
                                    { word: 'kakak', icon: '👦' },
                                    { word: 'adik', icon: '👶' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan kata dengan gambar.',
                            explanation: 'Membaca nama keluarga.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question: 'Tulis nama anggota keluargamu!',
                            data: {
                                lines: 4,
                                prompt: 'Tulis nama anggota keluargamu:',
                                example: 'ayah, ibu, kakak, adik',
                            },
                            answer_key: 'Anak menulis nama anggota keluarga.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah keluargamu!',
                            data: {
                                prompt: 'Keluargaku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Keluargaku:',
                            },
                            answer_key: 'Anak menggambar keluarga.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kata "ayah" terdiri dari berapa suku kata, sayang?',
                    'Bagaimana cara menulis "ibu"?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan ceria: ayah, ibu, kakak, adik!',
                },
            ],
        },
        {
            title: 'Pertemuan 8: Benda di Rumahku (meja, kursi, pintu, jendela)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca dan menulis kata benda di rumah.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kata benda',
                'Gambar benda rumah',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🏠 Benda-Benda di Rumahku

Halo sahabat cilik! Setiap benda di rumah kita memiliki nama dan kegunaan tersendiri.
Ayo **Fatimah** dan **Maheer** ajak kalian membaca nama benda di rumah! 🎉

---
# 🌟 Mengenal 4 Benda Rumah

* 🪑 **Meja** : Digunakan untuk menulis dan meletakkan makanan 👉 *me — ja*
* 💺 **Kursi** : Tempat kita duduk dengan nyaman 👉 *kur — si*
* 🚪 **Pintu** : Tempat kita masuk dan keluar ruangan 👉 *pin — tu*
* 🪟 **Jendela** : Tempat udara segar dan cahaya matahari masuk 👉 *jen — de — la*

---
# 💡 Mengapa Kita Belajar Nama Benda?

Jika kita mengetahui nama dan suku katanya, kita bisa menulis dan meminta tolong dengan sopan:
* *"Tolong ambilkan buku di atas **meja**."* 🪑
* *"Silakan duduk di atas **kursi**."* 💺

---
# 🕵️ Detektif Cilik Beraksi!

Tunjuk benda-benda ini di sekitarmu sambil membaca namanya:
**meja — kursi — pintu — jendela!**  
Hebat, ruangan belajarmu kini penuh dengan kata-kata pintar! ✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkeliling rumah untuk mengenal nama benda!',
                ice_breaker:
                    'Ayo tunjuk meja di sekitarmu! Tepuk tangan 2x sambil sebut "meja"!',
                apperception:
                    'Coba lihat kursi di dekatmu. Kata "kursi" terdiri dari suku kata apa saja?',
                trigger_question:
                    'Benda apa saja yang ada di rumahmu? Ayo kita sebutkan!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kata benda di rumah: meja, kursi, pintu, jendela.',
                concrete_steps: [
                    'Tunjukkan kartu "meja". Baca bersama 3x.',
                    'Lanjut "kursi", "pintu", "jendela".',
                    'Pecah tiap kata jadi suku kata: me-ja, kur-si, pin-tu, jen-de-la.',
                    'Minta anak menunjuk benda nyata di sekitarnya.',
                    'Beri apresiasi setiap sebutan benar.',
                ],
                script_parent:
                    '"Nah sayang, kursi terdiri dari kur-si. Yuk, kita baca nama benda di rumah!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Benda Rumah',
                game_rules: [
                    'Guru menyebutkan ciri benda: "Untuk duduk, ada 4 kaki."',
                    'Anak menebak nama benda & membacanya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, 2 benda dulu.',
                    child_level_advanced:
                        'Menyebutkan benda lain & membacanya sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kata benda.',
                worksheet_print_ready: {
                    title: 'LKPD 3.2: Benda di Rumahku',
                    instructions:
                        'Baca kata, cocokkan dengan gambar, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READ_AND_MATCH',
                            question: 'Baca kata, lalu cocokkan dengan gambar!',
                            data: {
                                words: [
                                    { word: 'meja', icon: '🪑' },
                                    { word: 'kursi', icon: '💺' },
                                    { word: 'pintu', icon: '🚪' },
                                    { word: 'jendela', icon: '🪟' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan.',
                            explanation: 'Membaca kata benda.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question: 'Tulis nama benda di rumahmu!',
                            data: {
                                lines: 4,
                                prompt: 'Tulis nama benda:',
                                example: 'meja, kursi, pintu, jendela',
                            },
                            answer_key: 'Anak menulis kata benda.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata jadi kata!',
                            data: {
                                syllables: [
                                    { part1: 'me', part2: 'ja', result: 'meja', icon: '🪑' },
                                    { part1: 'kur', part2: 'si', result: 'kursi', icon: '💺' },
                                    { part1: 'jen', part2: 'dela', result: 'jendela', icon: '🪟' },
                                ],
                            },
                            answer_key: 'meja, kursi, jendela',
                            explanation: 'Menyambung suku kata.',
                        },
                    ],
                },
                reflection_questions: [
                    'Benda apa saja di rumahmu, sayang?',
                    'Bagaimana cara membaca "jendela"?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis kata benda pada LKPD 3.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 9: Kalimat Sederhana tentang Keluargaku',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca dan menulis kalimat sederhana tentang keluarga.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 💬 Merangkai Kalimat Keluargaku

Sekarang kita gabungkan kata-kata yang sudah dipelajari menjadi **kalimat sederhana** tentang keluarga tercinta bersama **Maryam** dan **Asiya**! 🎉

---
# 🌟 Membaca Kalimat Keluarga

* 👨📚 **Ayah membaca buku.**  
  *(a — yah  ba — ca  bu — ku)*
* 👩🍚 **Ibu memasak nasi.**  
  *(i — bu  ma — sak  na — si)*
* 💖 **Aku sayang ibu.**  
  *(a — ku  sa — yang  i — bu)*
* 👶⚽ **Adik bermain bola.**  
  *(a — dik  ma — in  bo — la)*

---
# 📐 Tiga Ciri Kalimat Sederhana

1. 🅰️ **Huruf Kapital**: Diawali dengan huruf besar di awal kata pertama.
2. 🎯 **Bermakna Jelas**: Terdiri dari kata-kata yang mudah dipahami.
3. ⚫ **Tanda Titik**: Diakhiri tanda titik (.) sebagai penanda kalimat sudah selesai.

---
# 🎤 Ayo Lengkapi Kalimat!

Sebutkan kata yang hilang:
* Ayah membaca ... 👉 **Buku!** 📚
* Ibu memasak ... 👉 **Nasi!** 🍚
* Adik bermain ... 👉 **Bola!** ⚽`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita bikin kalimat indah tentang keluarga!',
                ice_breaker:
                    'Ayo tepuk tangan sambil sebut: "A-ku sa-yang i-bu!" — tepuk 5x!',
                apperception:
                    'Coba sebut satu kalimat tentang ibumu. Kata apa yang kamu pakai?',
                trigger_question:
                    'Bagaimana cara bikin kalimat yang benar? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kalimat sederhana: diawali huruf kapital, diakhiri titik, terdiri beberapa kata.',
                concrete_steps: [
                    'Tunjukkan kalimat "Ayah baca buku."',
                    'Baca bersama 3x dengan intonasi ramah.',
                    'Tunjukkan huruf kapital "A" di awal & titik "." di akhir.',
                    'Lanjut "Ibu masak nasi.", "Aku sayang ibu."',
                    'Minta anak bikin kalimat sendiri tentang keluarga.',
                ],
                script_parent:
                    '"Nah sayang, kalimat selalu diawali huruf besar dan diakhiri titik. Yuk, kita bikin kalimat!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Puzzle Kalimat Keluarga',
                game_rules: [
                    'Guru membagikan kartu kata acak ("Ayah", "baca", "buku").',
                    'Anak menyusun jadi kalimat yang benar.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
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
                task_focus: 'Membaca & menulis kalimat sederhana.',
                worksheet_print_ready: {
                    title: 'LKPD 3.3: Kalimat tentang Keluargaku',
                    instructions:
                        'Baca kalimat dengan nyaring, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question: 'Baca kalimat berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'Ayah baca buku.', icon: '👨📚' },
                                    { text: 'Ibu masak nasi.', icon: '👩🍚' },
                                    { text: 'Aku sayang ibu.', icon: '💖' },
                                ],
                            },
                            answer_key: 'Anak membaca dengan lancar.',
                            explanation: 'Membaca kalimat sederhana.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question: 'Tulis kalimat berikut di baris kosong!',
                            data: {
                                lines: 3,
                                prompt: 'Tulis kalimat:',
                                example: 'Ayah baca buku. Ibu masak nasi.',
                            },
                            answer_key: 'Anak menulis kalimat.',
                            explanation: 'Latihan menulis kalimat.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah sesuai kalimat "Ibu masak nasi."!',
                            data: {
                                prompt: 'Ibu masak nasi',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Ibu masak nasi:',
                            },
                            answer_key: 'Anak menggambar ibu masak.',
                            explanation: 'Memahami arti kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kalimat apa yang paling mudah dibaca, sayang?',
                    'Bagaimana cara menulis kalimat yang benar?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan ceria: "Ayah baca buku. Ibu masak nasi. Aku sayang ibu."',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 3: Keluargaku Tersayang',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kata "ayah" terdiri dari berapa suku kata?',
                            option_a: '1',
                            option_b: '2',
                            option_c: '3',
                            option_d: '4',
                            correct_answer: 'B',
                            explanation: 'a-yah = 2 suku kata.',
                        },
                        {
                            question_text: 'Kata "meja" artinya...',
                            option_a: 'Alat untuk duduk',
                            option_b: 'Alat untuk menulis & makan',
                            option_c: 'Alat untuk tidur',
                            option_d: 'Alat untuk memasak',
                            correct_answer: 'B',
                            explanation: 'Meja untuk menulis & makan.',
                        },
                        {
                            question_text: 'Kalimat "Ini bola." diakhiri dengan tanda...',
                            option_a: 'Titik (.)',
                            option_b: 'Tanya (?)',
                            option_c: 'Seru (!)',
                            option_d: 'Koma (,)',
                            correct_answer: 'A',
                            explanation: 'Kalimat berita diakhiri titik.',
                        },
                        {
                            question_text: 'Kata "ibu" jika dipecah menjadi suku kata...',
                            option_a: 'i-bu',
                            option_b: 'ib-u',
                            option_c: 'i-b-u',
                            option_d: 'ibu',
                            correct_answer: 'A',
                            explanation: 'ibu = i + bu.',
                        },
                    ],
                },
            ],
        },
    ],
};