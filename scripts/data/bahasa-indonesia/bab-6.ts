// data/bahasa-indonesia/bab-6.ts
// Bab 6: Ayo Baca Kalimat! (Semester 2)

import type { SeedModuleItem } from '../types';

export const BAB_6: SeedModuleItem = {
    title: 'Bab 6: Ayo Baca Kalimat!',
    order_index: 6,
    target_semester: 2,
    week_target: 16,
    lessons: [
        {
            title: 'Pertemuan 16: Ayo Baca Kalimat 3 Kata',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca kalimat 3 kata dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 📖 Membaca Kalimat 3 Kata

Halo pembaca hebat! 
Hari ini **Maryam** dan **Maheer** mengajak kalian merangkai tiga kata menjadi sebuah kalimat utuh! 🎉

---
# 🌟 Contoh Kalimat 3 Kata

* 👨📚 **Ayah membaca buku.**  
  *(a-yah  ba-ca  bu-ku)*
* 👩🍚 **Ibu memasak nasi.**  
  *(i-bu  ma-sak  na-si)*
* 👶⚽ **Adik bermain bola.**  
  *(a-dik  ma-in  bo-la)*
* 👦🎒 **Kakak membawa tas.**  
  *(ka-kak  ba-wa  tas)*

---
# 💡 Trik Membaca Kalimat

1. Baca kata pertama dalam hati.
2. Sambung ke kata kedua dan ketiga secara berurutan.
3. Bunyikan dengan intonasi tenang menurun di akhir tanda titik (.)! ⬇️

---
# 🎤 Ayo Baca dengan Lantang!

Baca kalimat ini dengan suara jelas dan senyuman:
**"Aku suka membaca buku."** 📚💖  
Luar biasa! Tiga kata berhasil kamu baca dengan sempurna!`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan membaca kalimat 3 kata dengan lancar!',
                ice_breaker:
                    'Ayo tepuk tangan: "A-yah" (2x), "ba-ca" (2x), "bu-ku" (2x)!',
                apperception:
                    'Coba sebut satu kalimat tentang ayahmu. Kata apa yang kamu pakai?',
                trigger_question:
                    'Bagaimana cara membaca kalimat "Ayah baca buku."? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Membaca kalimat 3 kata: baca kata satu per satu, sambung jadi kalimat.',
                concrete_steps: [
                    'Tunjukkan kalimat "Ayah baca buku."',
                    'Baca bersama 3x dengan intonasi ramah.',
                    'Tunjuk kata "Ayah" — baca. Lalu "baca" — baca. Lalu "buku" — baca.',
                    'Sambung: "Ayah baca buku."',
                    'Lanjut "Ibu masak nasi." & "Adik main bola."',
                ],
                script_parent:
                    '"Nah sayang, baca kata satu per satu dulu. Ayah... baca... buku... Sekarang sambung jadi Ayah baca buku!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Baca Kalimat Kilat',
                game_rules: [
                    'Guru menunjukkan kartu kalimat.',
                    'Anak membaca dengan cepat & lantang.',
                    'Yang paling jelas & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Membaca dengan bantuan guru, 1 kalimat dulu.',
                    child_level_advanced:
                        'Membaca sendiri & menuliskan kalimat.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kalimat 3 kata.',
                worksheet_print_ready: {
                    title: 'LKPD 6.1: Ayo Baca Kalimat 3 Kata!',
                    instructions:
                        'Baca kalimat, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question: 'Baca kalimat 3 kata berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'Ayah baca buku.', icon: '👨📚' },
                                    { text: 'Ibu masak nasi.', icon: '👩🍚' },
                                    { text: 'Adik main bola.', icon: '👶⚽' },
                                ],
                            },
                            answer_key: 'Anak membaca kalimat.',
                            explanation: 'Membaca kalimat 3 kata.',
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
                    'Bagaimana cara menulis kalimat?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca kalimat dengan ceria: "Ayah baca buku. Ibu masak nasi. Adik main bola."',
                },
            ],
        },
        {
            title: 'Pertemuan 17: Ayo Baca Kalimat 4 Kata',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca kalimat 4 kata dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kalimat',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 📜 Menjelajah Kalimat 4 Kata!

Hebat sekali, sekarang kita naik satu tingkat lagi bersama **Fatimah** dan **Asiya**: membaca kalimat yang lebih kaya dengan **4 kata**! 🎉

---
# 🌟 Contoh Kalimat 4 Kata

* 👨📚 **Ayah membaca buku cerita.**
* 👩🍳 **Ibu memasak sup hangat.**
* 👶⚽ **Adik menendang bola baru.**
* 👦✉️ **Kakak menulis cerita pendek.**

---
# 💡 Kunci Membaca Kalimat Panjang

Jangan terburu-buru!  
Gunakan jarimu untuk menunjuk setiap kata secara santai.  
Begitu selesai membaca 4 kata, bayangkan peristiwanya di dalam pikiranmu! 🎨

---
# 🎯 Kuis Detektif Cerita

Apa yang dilakukan tokoh dalam kalimat ini?
*"Ibu memasak sup hangat."*  
👉 Siapa pelakunya? **Ibu!**  
👉 Apa yang dilakukan? **Memasak sup hangat!** 🍲✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita naik level: baca kalimat 4 kata!',
                ice_breaker:
                    'Ayo tepuk tangan 4x sambil sebut: "A-yah mem-ba-ca bu-ku!"',
                apperception:
                    'Coba ingat kalimat 3 kata kemarin. Sekarang kita tambah 1 kata lagi!',
                trigger_question:
                    'Bagaimana cara membaca kalimat 4 kata? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Membaca kalimat 4 kata: baca kata satu per satu, sambung.',
                concrete_steps: [
                    'Tunjukkan kalimat "Ayah membaca buku baru."',
                    'Tunjuk kata "Ayah" — baca. Lanjut "membaca", "buku", "baru".',
                    'Sambung: "Ayah membaca buku baru."',
                    'Ulangi 3x dengan tempo makin cepat.',
                    'Lanjut "Ibu memasak nasi goreng." & "Adik bermain bola di halaman."',
                ],
                script_parent:
                    '"Nah sayang, baca kata satu per satu dulu. Sekarang sambung jadi kalimat lengkap!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Puzzle Kalimat Ceria',
                game_rules: [
                    'Guru membagikan kartu kata acak.',
                    'Anak menyusun jadi kalimat 4 kata.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyusun dengan bantuan guru, 3 kata dulu.',
                    child_level_advanced:
                        'Menyusun 4-5 kata sendiri & membacanya.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & menulis kalimat 4 kata.',
                worksheet_print_ready: {
                    title: 'LKPD 6.2: Ayo Baca Kalimat 4 Kata!',
                    instructions:
                        'Baca kalimat 4 kata, lalu tulis di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question: 'Baca kalimat 4 kata berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'Ayah membaca buku baru.', icon: '📚' },
                                    { text: 'Ibu memasak nasi goreng.', icon: '🍳' },
                                    { text: 'Adik bermain bola di halaman.', icon: '⚽' },
                                ],
                            },
                            answer_key: 'Anak membaca kalimat 4 kata.',
                            explanation: 'Membaca kalimat 4 kata.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question: 'Tulis kalimat berikut di baris kosong!',
                            data: {
                                lines: 3,
                                prompt: 'Tulis kalimat:',
                                example: 'Ayah membaca buku baru.',
                            },
                            answer_key: 'Anak menulis kalimat.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'MATCH_PAIRS',
                            question:
                                'Jodohkan kalimat dengan gambar yang sesuai!',
                            data: {
                                pairs: [
                                    { left: 'Ayah membaca buku baru', right: '📚' },
                                    { left: 'Ibu memasak nasi goreng', right: '🍳' },
                                    { left: 'Adik bermain bola', right: '⚽' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan kalimat & gambar.',
                            explanation: 'Memahami arti kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kalimat apa yang paling mudah dibaca, sayang?',
                    'Bagaimana cara membaca kalimat 4 kata?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca: "Ayah membaca buku baru. Ibu memasak nasi goreng."',
                },
            ],
        },
        {
            title: 'Pertemuan 18: Tanda Titik & Tanda Tanya',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membedakan dan menggunakan tanda titik (.) dan tanda tanya (?) dengan tepat.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu tanda baca',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# ❓ Dua Tanda Baca Ajaib!

Tahukah kamu? Nada suara kita saat membaca ditentukan oleh tanda yang ada di ujung kalimat!
Ayo kenalan dengan **Tanda Titik** dan **Tanda Tanya** bersama **Khadijah**! 🎉

---
# 🌟 Titik vs Tanya

* ⚫ **Tanda Titik (.)**:
  * Dipakai untuk **memberikan kabar** *(kalimat berita)*.
  * Nada suara di akhir kalimat dibaca **turun santai** ⬇️.
  * *Contoh:* "Aku gemar membaca buku cerita."
* ❓ **Tanda Tanya (?)**:
  * Dipakai saat **bertanya sesuatu** *(kalimat tanya)*.
  * Nada suara di akhir kalimat dibaca **sedikit naik** ⬆️.
  * *Contoh:* "Siapa nama teman barumu?"

---
# 🎭 Komik: Latihan Intonasi

**Maryam**: "Fatimah, coba baca ini: *'Ini buah apel.'*" 🍎  
**Fatimah**: "Suaraku turun di akhir, karena ada tanda titik!" ⚫  
**Maryam**: "Sekarang kalau ini: *'Bolehkah aku minta apel?'*"  
**Fatimah**: "Suaraku naik sedikit di akhir, karena ada tanda tanya!" ❓✨

---
# 🏆 Detektif Nada Suara

Ayo latih suaramu dengan tepat:
1. "Budi suka bermain bola." ⚽ *(Turunkan suaramu)*
2. "Di mana bola Budi?" ❓ *(Naikkan suaramu sedikit)*  
Kamu sekarang resmi menjadi master tanda baca! 🌟👏`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita kenal dua tanda ajaib: titik dan tanya!',
                ice_breaker:
                    'Ayo tirukan: bilang "Aku suka buku" dengan suara turun. Bilang "Siapa namamu?" dengan suara naik!',
                apperception:
                    'Coba pikirkan: kalau kamu bertanya, tanda apa yang dipakai?',
                trigger_question:
                    'Apa bedanya tanda titik (.) & tanda tanya (?)? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Tanda titik (.) untuk kalimat berita, tanda tanya (?) untuk kalimat tanya.',
                concrete_steps: [
                    'Tunjukkan kalimat berita: "Aku suka buku."',
                    'Tunjukkan kalimat tanya: "Siapa namamu?"',
                    'Baca keduanya dengan intonasi berbeda.',
                    'Minta anak menirukan intonasi.',
                    'Ulangi 3x dengan kalimat berbeda.',
                ],
                script_parent:
                    '"Nah sayang, tanda titik untuk kabar, tanda tanya untuk bertanya. Yuk, kita baca bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Tanda Ceria',
                game_rules: [
                    'Guru membacakan kalimat dengan intonasi.',
                    'Anak menebak tandanya (titik atau tanya).',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus 2 kalimat dulu dengan bantuan guru.',
                    child_level_advanced:
                        'Membedakan tanda & membuat kalimat sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membedakan tanda & menulis kalimat.',
                worksheet_print_ready: {
                    title: 'LKPD 6.3: Tanda Titik & Tanda Tanya',
                    instructions:
                        'Baca kalimat, lalu tentukan tanda yang tepat!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question: 'Baca kalimat berikut dengan intonasi yang tepat!',
                            data: {
                                sentences: [
                                    { text: 'Aku suka buku.', icon: '📚' },
                                    { text: 'Siapa namamu?', icon: '❓' },
                                    { text: 'Ini bola Budi.', icon: '⚽' },
                                    { text: 'Apa itu?', icon: '❓' },
                                ],
                            },
                            answer_key: 'Anak membaca dengan intonasi tepat.',
                            explanation: 'Membedakan kalimat berita & tanya.',
                        },
                        {
                            id: 2,
                            type: 'MATCH_PAIRS',
                            question:
                                'Jodohkan kalimat dengan tanda yang tepat!',
                            data: {
                                pairs: [
                                    { left: 'Aku suka buku', right: 'Titik (.)' },
                                    { left: 'Siapa namamu', right: 'Tanya (?)' },
                                ],
                            },
                            answer_key: 'Berita→titik, Tanya→tanda tanya.',
                            explanation: 'Mencocokkan kalimat & tanda.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'WRITING_LINES',
                            question:
                                'Buat 2 kalimat berita dan 2 kalimat tanya!',
                            data: {
                                lines: 4,
                                prompt: 'Kalimatku:',
                                example: 'Aku suka bola. Apa itu?',
                            },
                            answer_key: 'Anak menulis kalimat.',
                            explanation: 'Latihan membuat kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa bedanya titik & tanya, sayang?',
                    'Kapan pakai tanda titik?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan intonasi tepat: "Aku suka buku. Siapa namamu?"',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 6: Ayo Baca Kalimat!',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kalimat berita diakhiri dengan tanda...',
                            option_a: 'Titik (.)',
                            option_b: 'Tanya (?)',
                            option_c: 'Seru (!)',
                            option_d: 'Koma (,)',
                            correct_answer: 'A',
                            explanation: 'Kalimat berita diakhiri titik.',
                        },
                        {
                            question_text: 'Kalimat "Siapa namamu?" diakhiri dengan...',
                            option_a: 'Titik (.)',
                            option_b: 'Tanya (?)',
                            option_c: 'Seru (!)',
                            option_d: 'Koma (,)',
                            correct_answer: 'B',
                            explanation: 'Kalimat tanya diakhiri tanda tanya.',
                        },
                        {
                            question_text: 'Kalimat "Ayah baca buku." adalah kalimat...',
                            option_a: 'Tanya',
                            option_b: 'Berita',
                            option_c: 'Seru',
                            option_d: 'Larangan',
                            correct_answer: 'B',
                            explanation: 'Kalimat berita.',
                        },
                        {
                            question_text: 'Kalimat tanya dibaca dengan intonasi...',
                            option_a: 'Datar',
                            option_b: 'Naik di akhir',
                            option_c: 'Turun di akhir',
                            option_d: 'Berteriak',
                            correct_answer: 'B',
                            explanation: 'Intonasi naik di akhir.',
                        },
                    ],
                },
            ],
        },
    ],
};