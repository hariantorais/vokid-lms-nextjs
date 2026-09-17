// data/bahasa-indonesia/bab-5.ts
// Bab 5: Ayo Jadi Penulis Cilik! (Semester 2)

import type { SeedModuleItem } from '../types';

export const BAB_5: SeedModuleItem = {
    title: 'Bab 5: Ayo Jadi Penulis Cilik!',
    order_index: 5,
    target_semester: 2,
    week_target: 13,
    lessons: [
        {
            title: 'Pertemuan 13: Menebalkan Huruf a-z dengan Rapi',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menebalkan huruf a-z dengan rapi dan mulai menulis sendiri.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu huruf a-z',
                'LKPD',
            ],
            content_text: `
# ✏️ Petualangan Penulis Cilik!

Halo calon penulis cilik! Hari ini **Maryam** dan **Fatimah** mengajak kalian melatih jemari agar tulisan huruf alfabetmu semakin rapi dan indah! 🎉

---
# 🌟 Rahasia Menulis Rapi

* 📐 **Posisi Tubuh**: Duduk tegak dengan santai, jangan membungkuk terlalu dekat.
* ✍️ **Pegang Pensil**: Jepit pensil di antara ibu jari dan jari telunjuk secara nyaman.
* ⬇️ **Arah Garis**: Biasakan menarik garis dari **atas ke bawah** dan melingkar searah.
* 🐢 **Perlahan tapi Pasti**: Menulis tenang agar garis tidak keluar jalur!

---
# 🔤 Melukis Huruf di Udara

Ayo angkat jari telunjukmu ke udara bersama Fatimah:
* Buat lengkungan bulat, lalu tarik garis tegak ke bawah: **a**! 🍎
* Tarik garis tegak panjang, lalu beri perut gendut di kanan: **b**! ⚽
* Buat lengkungan seperti bulan sabit tersenyum: **c**! ☕

---
# 🏆 Misi Penulis Cilik

Ambil pensil kesukaanmu dan selesaikan tantangan ini:
1. Tebalkan huruf dengan sabar mengikuti titik-titik panduan. 📝
2. Coba buat 1 huruf mandiri di sampingnya tanpa bantuan titik! ✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berlatih menulis huruf dengan rapi!',
                ice_breaker:
                    'Ayo tulis huruf "a" di udara dengan jarimu! Sekarang huruf "b"! Seru, kan?',
                apperception:
                    'Coba lihat pensil di tanganmu. Sudah siap menulis dengan rapi?',
                trigger_question:
                    'Bagaimana cara menulis huruf a dengan rapi? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menebalkan huruf a-z dengan rapi, mulai dari arah yang benar.',
                concrete_steps: [
                    'Tunjukkan cara menulis huruf "a": mulai dari atas, melingkar ke bawah.',
                    'Minta anak menirukan gerakan di udara dulu.',
                    'Berikan LKPD, minta anak menebalkan huruf "a".',
                    'Lanjut huruf b, c, d, e satu per satu.',
                    'Beri apresiasi setiap huruf yang selesai.',
                ],
                script_parent:
                    '"Nah sayang, menulis dimulai dari atas ke bawah ya. Yuk, kita tebalkan huruf a!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Huruf di Udara',
                game_rules: [
                    'Guru menulis huruf di udara dengan jari.',
                    'Anak menebak hurufnya dengan cepat.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                    'Gantian: anak menulis di udara, guru menebak.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus huruf a-e dulu dengan bantuan guru.',
                    child_level_advanced:
                        'Menulis huruf sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menebalkan huruf a-z.',
                worksheet_print_ready: {
                    title: 'LKPD 5.1: Ayo Tebalkan Huruf a-z!',
                    instructions:
                        'Tebalkan huruf berikut dengan pensil warna, lalu coba tulis sendiri di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf a-f berikut!',
                            data: {
                                letters: [
                                    { letter: 'a', word: 'apel', icon: '🍎' },
                                    { letter: 'b', word: 'bola', icon: '⚽' },
                                    { letter: 'c', word: 'cangkir', icon: '☕' },
                                    { letter: 'd', word: 'dadu', icon: '🎲' },
                                    { letter: 'e', word: 'es', icon: '🧊' },
                                    { letter: 'f', word: 'foto', icon: '📷' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf a-f.',
                            explanation: 'Latihan menulis huruf.',
                        },
                        {
                            id: 2,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf g-l berikut!',
                            data: {
                                letters: [
                                    { letter: 'g', word: 'gajah', icon: '🐘' },
                                    { letter: 'h', word: 'hijau', icon: '💚' },
                                    { letter: 'i', word: 'ikan', icon: '🐟' },
                                    { letter: 'j', word: 'jam', icon: '⏰' },
                                    { letter: 'k', word: 'kucing', icon: '🐱' },
                                    { letter: 'l', word: 'lilin', icon: '🕯️' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf g-l.',
                            explanation: 'Latihan menulis huruf.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf m-z berikut!',
                            data: {
                                letters: [
                                    { letter: 'm', word: 'meja', icon: '🪑' },
                                    { letter: 'n', word: 'nasi', icon: '🍚' },
                                    { letter: 'o', word: 'obat', icon: '💊' },
                                    { letter: 'p', word: 'pintu', icon: '🚪' },
                                    { letter: 'q', word: 'quran', icon: '📖' },
                                    { letter: 'r', word: 'roti', icon: '🍞' },
                                    { letter: 's', word: 'sapu', icon: '🧹' },
                                    { letter: 't', word: 'topi', icon: '🧢' },
                                    { letter: 'u', word: 'ular', icon: '🐍' },
                                    { letter: 'v', word: 'vas', icon: '🏺' },
                                    { letter: 'w', word: 'wortel', icon: '🥕' },
                                    { letter: 'x', word: 'xilofon', icon: '🎵' },
                                    { letter: 'y', word: 'yoyo', icon: '🪀' },
                                    { letter: 'z', word: 'zebra', icon: '🦓' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf m-z.',
                            explanation: 'Latihan menulis huruf.',
                        },
                    ],
                },
                reflection_questions: [
                    'Huruf apa yang paling mudah ditulis, sayang?',
                    'Huruf apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menebalkan huruf a-z pada LKPD 5.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 14: Ayo Menulis Suku Kata',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis suku kata dengan rapi.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu suku kata',
                'LKPD',
            ],
            content_text: `
# 🧩 Menggandeng Huruf Jadi Suku Kata

Setelah menguasai huruf tunggal, sekarang kita naik level: menggandeng dua huruf menjadi **suku kata** bersama **Asiya** dan **Maheer**! ✏️✨

---
# 🌟 Dua Langkah Menulis Suku Kata

1. Tulis huruf konsonan di sebelah kiri (misalnya: **b**).
2. Tulis huruf vokal tepat berdampingan di sebelah kanannya (misalnya: **a**).
3. Gabungkan keduanya secara serasi: **ba**! 👕

---
# 📝 Daftar Pasangan Suku Kata

* **b** + vokal 👉 **ba** — **bi** — **bu** 📚
* **c** + vokal 👉 **ca** — **ci** — **cu** 🧼
* **d** + vokal 👉 **da** — **di** — **du** 🎲
* **k** + vokal 👉 **ka** — **ki** — **ku** 🐱

---
# ✍️ Tantangan Jemari Pintar

Tuliskan 3 suku kata ini di buku tulismu dengan jarak rapi:
* **ba** (baju)
* **ci** (cincin)
* **ku** (kucing)  
Bagus sekali, kamu semakin mahir menulis suku kata! 🌟👏`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menulis suku kata dengan rapi!',
                ice_breaker:
                    'Ayo tulis suku kata "ba" di udara dengan jarimu! Sekarang "bi"! Seru, kan?',
                apperception:
                    'Coba ingat, "ba" terdiri dari huruf apa saja? Betul, b dan a!',
                trigger_question:
                    'Bagaimana cara menulis suku kata "ba"? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menulis suku kata: konsonan + vokal, disambung rapi.',
                concrete_steps: [
                    'Tunjukkan cara menulis suku kata "ba": tulis b dulu, lalu a.',
                    'Minta anak menirukan di udara dulu.',
                    'Berikan LKPD, minta anak menulis "ba" di baris kosong.',
                    'Lanjut "bi", "bu" satu per satu.',
                    'Beri apresiasi setiap suku kata yang selesai.',
                ],
                script_parent:
                    '"Nah sayang, tulis b dulu, lalu a. Sambung jadi ba. Yuk, kita coba!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tulis Suku Kata Ceria',
                game_rules: [
                    'Guru menyebutkan suku kata: "ba!"',
                    'Anak menulis di udara dengan cepat.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                    'Gantian: anak menyebut, guru menulis.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus ba-bi-bu dulu dengan bantuan guru.',
                    child_level_advanced:
                        'Menulis semua suku kata sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis suku kata.',
                worksheet_print_ready: {
                    title: 'LKPD 5.2: Ayo Menulis Suku Kata!',
                    instructions:
                        'Tebalkan suku kata berikut, lalu tulis sendiri di baris kosong!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut, lalu tulis hasilnya!',
                            data: {
                                syllables: [
                                    { part1: 'b', part2: 'a', result: 'ba', icon: '👕' },
                                    { part1: 'b', part2: 'i', result: 'bi', icon: '🌱' },
                                    { part1: 'b', part2: 'u', result: 'bu', icon: '📚' },
                                ],
                            },
                            answer_key: 'ba, bi, bu',
                            explanation: 'Menyambung suku kata.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question: 'Tulis suku kata berikut di baris kosong!',
                            data: {
                                lines: 5,
                                prompt: 'Tulis suku kata:',
                                example: 'ba - bi - bu - be - bo',
                            },
                            answer_key: 'Anak menulis suku kata.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata menjadi kata, lalu tulis!',
                            data: {
                                syllables: [
                                    { part1: 'bo', part2: 'la', result: 'bola', icon: '⚽' },
                                    { part1: 'bu', part2: 'ku', result: 'buku', icon: '📚' },
                                    { part1: 'ka', part2: 'ki', result: 'kaki', icon: '🦶' },
                                ],
                            },
                            answer_key: 'bola, buku, kaki',
                            explanation: 'Menyambung suku kata jadi kata.',
                        },
                    ],
                },
                reflection_questions: [
                    'Suku kata apa yang paling mudah ditulis, sayang?',
                    'Suku kata apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis suku kata pada LKPD 5.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 15: Ayo Menulis Nama Sendiri',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis nama lengkap sendiri dengan rapi.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu nama',
                'LKPD',
            ],
            content_text: `
# 🌟 Menulis Nama Sendiri dengan Bangga!

Namamu adalah identitas istimewa yang diberikan oleh orang tuamu.
Ayo belajar menulis nama panggilan dan nama lengkapmu dengan benar! 🎉

---
# 🅰️ Aturan Penulisan Nama

1. **Huruf Pertama Kapital**: Huruf depan nama harus huruf besar *(contoh: **M**aryam, **A**siya)*.
2. **Huruf Berikutnya Kecil**: Sisa huruf di belakangnya ditulis dengan huruf kecil yang rapi.
3. **Ada Jarak**: Jika namamu terdiri dari 2 kata, beri jarak spasi satu jari.

---
# 🎭 Komik: Nama Sahabat Cilik

* 👧 **M**aryam 👉 *M — a — r — y — a — m*
* 👧 **A**siya 👉 *A — s — i — y — a*
* 👦 **M**aheer 👉 *M — a — h — e — e — r*
* 👧 **F**atimah 👉 *F — a — t — i — m — a — h*

---
# 👑 Mahkota Kartu Namaku

Tuliskan namamu sebanyak 3 kali di buku:
1. Baris 1: Tulis perlahan dan rapi.
2. Baris 2: Pastikan huruf depannya kapital sempurna.
3. Baris 3: Hiasi sekelilingnya dengan bintang emas! ⭐`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menulis nama sendiri dengan rapi!',
                ice_breaker:
                    'Ayo sebut namamu lantang: "Namaku ...!" — sekarang tepuk tangan 3x!',
                apperception:
                    'Coba sebut huruf awal namamu. Huruf apa? Tulis dengan kapital ya!',
                trigger_question:
                    'Siapa bisa menulis namanya sendiri? Ayo kita coba bersama!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menulis nama sendiri: huruf awal kapital, sisanya kecil, rapi.',
                concrete_steps: [
                    'Tunjukkan cara menulis nama "Maryam": M kapital, lalu a-r-y-a-m kecil.',
                    'Minta anak menirukan di udara dulu.',
                    'Berikan LKPD, minta anak menulis namanya sendiri.',
                    'Bantu anak yang kesulitan dengan menuntun tangan.',
                    'Beri apresiasi setiap usaha anak.',
                ],
                script_parent:
                    '"Nah sayang, huruf awal namamu pakai kapital ya. Lalu sisanya kecil. Yuk, kita tulis!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Panggung Nama Ceria',
                game_rules: [
                    'Guru menyebutkan nama anak.',
                    'Anak menulis namanya di papan tulis.',
                    'Yang paling rapi dapat bintang emas ⭐.',
                    'Tepuk tangan untuk semua yang berani mencoba.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menulis nama dengan bantuan guru (dituntun).',
                    child_level_advanced:
                        'Menulis nama sendiri dengan rapi tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis nama sendiri.',
                worksheet_print_ready: {
                    title: 'LKPD 5.3: Ayo Menulis Nama Sendiri!',
                    instructions:
                        'Tulis nama lengkapmu di baris kosong dengan rapi!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question: 'Tulis nama lengkapmu di baris kosong!',
                            data: {
                                lines: 3,
                                prompt: 'Namaku:',
                                example: 'Contoh: Aisyah Putri',
                            },
                            answer_key: 'Anak menulis nama sendiri.',
                            explanation: 'Latihan menulis nama.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu dan tulis namamu di bawah gambar!',
                            data: {
                                prompt: 'Aku dan namaku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku dan namaku:',
                            },
                            answer_key: 'Anak menggambar diri & menulis nama.',
                            explanation: 'Melatih kreativitas & identitas.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Bagaimana perasaanmu setelah menulis namamu?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah menulis namamu?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Bangga' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Rapi' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa huruf awal namamu, sayang?',
                    'Bagaimana perasaanmu menulis namamu?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis nama pada LKPD 5.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 5: Ayo Jadi Penulis Cilik!',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Menulis dimulai dari arah...',
                            option_a: 'Kanan ke kiri',
                            option_b: 'Kiri ke kanan',
                            option_c: 'Atas ke bawah',
                            option_d: 'Bawah ke atas',
                            correct_answer: 'B',
                            explanation: 'Menulis dimulai dari kiri ke kanan.',
                        },
                        {
                            question_text: 'Huruf awal nama biasanya ditulis dengan...',
                            option_a: 'Huruf kecil',
                            option_b: 'Huruf kapital',
                            option_c: 'Angka',
                            option_d: 'Simbol',
                            correct_answer: 'B',
                            explanation: 'Huruf awal nama pakai kapital.',
                        },
                        {
                            question_text: 'Suku kata "ba" terdiri dari huruf...',
                            option_a: 'b dan a',
                            option_b: 'a dan b',
                            option_c: 'b saja',
                            option_d: 'a saja',
                            correct_answer: 'A',
                            explanation: 'ba = b + a.',
                        },
                        {
                            question_text: 'Saat menulis, sebaiknya kita...',
                            option_a: 'Tergesa-gesa',
                            option_b: 'Dengan rapi',
                            option_c: 'Sambil bermain',
                            option_d: 'Sambil tidur',
                            correct_answer: 'B',
                            explanation: 'Menulis dengan rapi.',
                        },
                    ],
                },
            ],
        },
    ],
};