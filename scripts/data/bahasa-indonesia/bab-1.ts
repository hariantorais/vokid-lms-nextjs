// data/bahasa-indonesia/bab-1.ts
// Bab 1: Ayo Kenalan dengan Huruf Ajaib (Semester 1)

import type { SeedModuleItem } from '../types';

export const BAB_1: SeedModuleItem = {
    title: 'Bab 1: Ayo Kenalan dengan Huruf Ajaib',
    order_index: 1,
    target_semester: 1,
    week_target: 1,
    lessons: [
        {
            title: 'Pertemuan 1: Lima Huruf Vokal Ajaib (a-i-u-e-o)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal dan melafalkan 5 huruf vokal (a, i, u, e, o) dengan gembira serta menebalkan hurufnya.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu huruf vokal warna-warni',
                'Cermin kecil',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🎵 Ayo Kenalan dengan 5 Huruf Ajaib!

Halo sahabat cilik! Hari ini **Maryam** dan **Asiya** akan mengajak kalian berkenalan dengan **5 huruf vokal ajaib** yang membuat mulut kita bisa bernyanyi! 🎤✨

---
# 🌟 5 Sahabat Huruf Vokal

* 🅰️ **a** : *"Aaaa..."* seperti mulut terbuka lebar saat kaget! 👉 **a**pi 🔥
* 🔤 **i** : *"Iiii..."* sambil tersenyum manis! 👉 **i**kan 🐟
* 🔤 **u** : *"Uuu..."* dengan bibir mengerucut bulat! 👉 **u**lar 🐍
* 🔤 **e** : *"Eee..."* seperti suara kambing ceria! 👉 **e**nak 🍽️
* 🅾️ **o** : *"Ooo..."* dengan mulut bulat sempurna! 👉 **o**bat 💊

---
# 🎭 Komik: Maryam & Asiya Bernyanyi

**Maryam**: "Asiya, coba buka mulutmu lebar-lebar: *Aaaa!*" 👧
**Asiya**: "*Iiii...* sekarang senyum manis seperti gigi kelinci!" 👧
**Maheer**: "*Uuuu...* bibirku maju ke depan!" 👦
**Khadijah**: "Hebat semua! Huruf vokal adalah huruf istimewa yang bisa berbunyi sendiri!" ✨

---
# 🔍 Detektif Vokal di Rumah

Cari benda di sekitarmu yang berawalan huruf vokal:
1. Api di dapur 👉 Huruf **a** 🔥
2. Ikan di meja makan 👉 Huruf **i** 🐟
3. Obat di kotak P3K 👉 Huruf **o** 💊`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berkenalan dengan 5 huruf ajaib yang bisa membuat mulut kita bernyanyi!',
                ice_breaker:
                    'Ayo buka mulut lebar-lebar: "Aaaa!" Sekarang senyum manis: "Iiii!" Seru, kan?',
                apperception:
                    'Coba sentuh lehermu saat bilang "Aaaa..." — terasa bergetar, kan? Itu tanda huruf vokal!',
                trigger_question:
                    'Ada berapa huruf vokal? Ayo kita hitung bersama Maryam dan Asiya!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Huruf vokal ada 5: a, i, u, e, o. Semuanya bisa dibunyikan sendiri.',
                concrete_steps: [
                    'Tunjukkan kartu huruf "a" warna merah. Ucapkan "aaa" sambil buka mulut lebar.',
                    'Tunjukkan kartu huruf "i" warna kuning. Ucapkan "iii" sambil senyum manis.',
                    'Tunjukkan kartu huruf "u" warna hijau. Ucapkan "uuu" sambil monyong.',
                    'Tunjukkan kartu huruf "e" warna biru. Ucapkan "eee" seperti kambing.',
                    'Tunjukkan kartu huruf "o" warna ungu. Ucapkan "ooo" sambil mulut bulat.',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Ayo sayang, buka mulut lebar-lebar seperti Maryam: Aaaa! Sekarang senyum manis seperti Asiya: Iiii!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Bunyi Vokal',
                game_rules: [
                    'Ibu/Bapak Guru menyebutkan contoh kata: "api", "ikan", "ular", "enak", "obat".',
                    'Anak menebak huruf vokal awalnya sambil tepuk tangan.',
                    'Yang paling cepat & benar dapat bintang emas ⭐.',
                    'Akhiri dengan menyanyikan lagu "A-I-U-E-O" bersama.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, cukup 3 huruf dulu (a, i, u).',
                    child_level_advanced:
                        'Menyebutkan kata lain yang diawali huruf vokal sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menebalkan huruf vokal dengan rapi.',
                worksheet_print_ready: {
                    title: 'LKPD 1.1: Lima Huruf Vokal Ajaib',
                    instructions:
                        'Tebalkan huruf vokal berikut, lalu warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf vokal berikut dengan pensil warna!',
                            data: {
                                letters: [
                                    { letter: 'a', word: 'api', icon: '🔥' },
                                    { letter: 'i', word: 'ikan', icon: '🐟' },
                                    { letter: 'u', word: 'ular', icon: '🐍' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf a, i, u dengan rapi.',
                            explanation: 'Mengenal & menulis huruf vokal.',
                        },
                        {
                            id: 2,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf vokal berikut!',
                            data: {
                                letters: [
                                    { letter: 'e', word: 'enak', icon: '🍽️' },
                                    { letter: 'o', word: 'obat', icon: '💊' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf e, o dengan rapi.',
                            explanation: 'Melanjutkan pengenalan huruf vokal.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question: 'Bagaimana perasaanmu belajar huruf ajaib?',
                            data: {
                                question: 'Bagaimana perasaanmu belajar huruf ajaib?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Semangat' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Paham' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Ada berapa huruf vokal, sayang?',
                    'Huruf vokal apa yang paling mudah kamu ucapkan?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan 5 huruf vokal dengan suara ceria: a-i-u-e-o!',
                },
            ],
        },
        {
            title: 'Pertemuan 2: Huruf Konsonan Sahabat Vokal (b-c-d-k)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal dan melafalkan huruf konsonan b, c, d, k dengan benar serta menebalkan hurufnya.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu huruf konsonan warna-warni',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🎈 Ayo Kenalan dengan Huruf Konsonan!

Kemarin kita sudah berteman dengan huruf vokal. 
Sekarang **Maheer** dan **Fatimah** mengenalkan **4 huruf konsonan** sahabat vokal! 🎉

---
# 🌟 4 Huruf Konsonan Baru

* ⚽ **b** : *"Beh..."* seperti suara bola yang memantul! 👉 **b**ola
* ☕ **c** : *"Ceh..."* seperti gemercik air dituang! 👉 **c**angkir
* 🎲 **d** : *"Deh..."* seperti ketukan pintu rumah! 👉 **d**adu
* 🐱 **k** : *"Keh..."* seperti suara batuk kecil kucing! 👉 **k**ucing

---
# 💡 Rahasia Huruf Konsonan

Huruf konsonan **butuh teman huruf vokal** agar suaranya terdengar nyaring!
* Bilang *"b"* saja rasanya berat.
* Tapi kalau digabung vokal *"a"*, suaranya menjadi lancar: **ba**! 🎯

---
# 🕵️ Tebak Huruf Bersama Maheer

Perhatikan benda berikut, huruf apakah awalnya?
* ⚽ Bola 👉 Diawali huruf **b**!
* ☕ Cangkir 👉 Diawali huruf **c**!
* 🎲 Dadu 👉 Diawali huruf **d**!
* 🐱 Kucing 👉 Diawali huruf **k**!`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Kemarin kita kenal huruf vokal. Hari ini kita kenal huruf konsonan yang jadi sahabatnya!',
                ice_breaker:
                    'Ayo tirukan suara bola memantul: "Beh-beh-beh!" Sekarang suara kucing: "Keh-keh-meong!"',
                apperception:
                    'Coba pegang bolamu di rumah. Bola diawali huruf apa? Betul, "b"!',
                trigger_question:
                    'Apa bedanya huruf vokal dan huruf konsonan? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Huruf konsonan b, c, d, k butuh bantuan vokal untuk dibunyikan.',
                concrete_steps: [
                    'Tunjukkan kartu huruf "b". Ucapkan "beh" seperti bola memantul.',
                    'Tunjukkan kartu huruf "c". Ucapkan "ceh" seperti air dituang.',
                    'Tunjukkan kartu huruf "d". Ucapkan "deh" seperti ketukan pintu.',
                    'Tunjukkan kartu huruf "k". Ucapkan "keh" seperti kucing batuk.',
                    'Ulangi 3x dengan gerakan tubuh yang lucu.',
                ],
                script_parent:
                    '"Nah sayang, huruf b, c, d, k ini butuh teman vokal ya biar bisa dibunyikan!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Konsonan Ceria',
                game_rules: [
                    'Guru menyebutkan contoh kata: "bola", "cangkir", "dadu", "kucing".',
                    'Anak menebak huruf konsonan awalnya sambil melompat.',
                    'Yang paling cepat & benar dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menebak dengan bantuan guru, fokus 2 huruf dulu (b dan c).',
                    child_level_advanced:
                        'Menyebutkan kata lain yang diawali b-c-d-k sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menebalkan huruf konsonan dengan rapi.',
                worksheet_print_ready: {
                    title: 'LKPD 1.2: Huruf Konsonan Sahabat Vokal',
                    instructions:
                        'Tebalkan huruf konsonan berikut dan warnai gambarnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'TRACE_LETTER',
                            question: 'Tebalkan huruf konsonan berikut dengan pensil warna!',
                            data: {
                                letters: [
                                    { letter: 'b', word: 'bola', icon: '⚽' },
                                    { letter: 'c', word: 'cangkir', icon: '☕' },
                                    { letter: 'd', word: 'dadu', icon: '🎲' },
                                    { letter: 'k', word: 'kucing', icon: '🐱' },
                                ],
                            },
                            answer_key: 'Anak menebalkan huruf b, c, d, k.',
                            explanation: 'Mengenal huruf konsonan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan huruf dengan gambar yang sesuai!',
                            data: {
                                pairs: [
                                    { left: '🔤 b', right: 'bola ⚽' },
                                    { left: '🔤 c', right: 'cangkir ☕' },
                                    { left: '🔤 d', right: 'dadu 🎲' },
                                    { left: '🔤 k', right: 'kucing 🐱' },
                                ],
                            },
                            answer_key: 'b→bola, c→cangkir, d→dadu, k→kucing.',
                            explanation: 'Menghubungkan huruf dengan gambar.',
                        },
                    ],
                },
                reflection_questions: [
                    'Huruf konsonan apa yang paling mudah, sayang?',
                    'Huruf konsonan apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menebalkan huruf konsonan pada LKPD 1.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 3: Ayo Rangkai Huruf Jadi Suku Kata (ba-bi-bu)',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyambung huruf konsonan b dengan vokal menjadi suku kata ba, bi, bu, be, bo.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu suku kata warna-warni',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🧩 Merangkai Huruf Jadi Suku Kata

Tahukah kamu? Huruf **b** dan huruf **a** jika bergandengan tangan akan bersuara **ba**!
Ayo kita rangkai suku kata bersama **Maryam** dan **Maheer**! 🎉

---
# 🌟 Keluarga Suku Kata "b"

* **b + a** = **ba** 👉 **ba**ju 👕
* **b + i** = **bi** 👉 **bi**ji 🌱
* **b + u** = **bu** 👉 **bu**ku 📚
* **b + e** = **be** 👉 **be**bek 🦆
* **b + o** = **bo** 👉 **bo**la ⚽

---
# 🎭 Komik: Sulap Huruf

**Maryam**: "Maheer, kalau huruf konsonan dan vokal digabung, jadinya apa?" 👧
**Maheer**: "Jadinya **Suku Kata**! Bagian kata yang enak dibaca!" 👦✨
**Asiya**: "Betul! b digandeng u jadi bu, seperti **bu**ku kesukaanku!" 📚

---
# 🎤 Ayo Baca Cepat!

Tirukan dengan suara lantang dan penuh semangat:
**ba — bi — bu — be — bo!**  
Hebat, kamu sudah bisa merangkai suku kata pertamamu! 🌟`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan merangkai huruf jadi suku kata yang seru!',
                ice_breaker:
                    'Ayo tepuk tangan: "b" tepuk 1x, "a" tepuk 1x, digabung jadi "ba" tepuk 2x!',
                apperception:
                    'Coba gandeng jari telunjukmu dengan jari tengahmu. Kalau huruf digandeng, jadi apa ya?',
                trigger_question:
                    'Kalau huruf b digandeng huruf a, jadi apa? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Konsonan + vokal = suku kata (ba, bi, bu, be, bo).',
                concrete_steps: [
                    'Tunjukkan kartu "b" dan "a" terpisah.',
                    'Gabungkan kedua kartu: "b" + "a" = "ba".',
                    'Ucapkan "ba" bersama-sama 3x.',
                    'Lanjut "b" + "i" = "bi", "b" + "u" = "bu".',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Nah sayang, kalau huruf b digandeng a, jadilah ba. Yuk, kita coba bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sambung Suku Kata Ceria',
                game_rules: [
                    'Guru menyebutkan konsonan "b".',
                    'Anak menyambung dengan vokal acak sambil melompat.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyambung dengan bantuan guru, cukup ba-bi-bu dulu.',
                    child_level_advanced:
                        'Menyambung be-bo sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menyambung suku kata dengan rapi.',
                worksheet_print_ready: {
                    title: 'LKPD 1.3: Ayo Rangkai Suku Kata!',
                    instructions:
                        'Sambung suku kata berikut! Tulis hasilnya di kotak kosong.',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut!',
                            data: {
                                syllables: [
                                    { part1: 'b', part2: 'a', result: 'ba', icon: '👕' },
                                    { part1: 'b', part2: 'i', result: 'bi', icon: '🌱' },
                                    { part1: 'b', part2: 'u', result: 'bu', icon: '📚' },
                                ],
                            },
                            answer_key: 'ba, bi, bu',
                            explanation: 'Menyambung konsonan b dengan vokal.',
                        },
                        {
                            id: 2,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut!',
                            data: {
                                syllables: [
                                    { part1: 'b', part2: 'e', result: 'be', icon: '🦆' },
                                    { part1: 'b', part2: 'o', result: 'bo', icon: '⚽' },
                                ],
                            },
                            answer_key: 'be, bo',
                            explanation: 'Melanjutkan suku kata terbuka.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'READ_AND_MATCH',
                            question: 'Baca suku kata berikut, lalu cocokkan dengan gambar!',
                            data: {
                                words: [
                                    { word: 'ba', icon: '👕' },
                                    { word: 'bi', icon: '🌱' },
                                    { word: 'bu', icon: '📚' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan suku kata dengan gambar.',
                            explanation: 'Membaca & mencocokkan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara menyambung b dengan a, sayang?',
                    'Suku kata apa yang paling mudah?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca suku kata dengan ceria: ba-bi-bu-be-bo!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 1: Ayo Kenalan dengan Huruf Ajaib',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Ada berapa huruf vokal?',
                            option_a: '3',
                            option_b: '4',
                            option_c: '5',
                            option_d: '6',
                            correct_answer: 'C',
                            explanation: 'Huruf vokal ada 5: a, i, u, e, o.',
                        },
                        {
                            question_text: 'Huruf vokal antara lain...',
                            option_a: 'a, i, u, e, o',
                            option_b: 'b, c, d, k',
                            option_c: 'p, m, n',
                            option_d: 'x, y, z',
                            correct_answer: 'A',
                            explanation: 'Vokal: a, i, u, e, o.',
                        },
                        {
                            question_text: 'Hasil dari b + a adalah...',
                            option_a: 'ba',
                            option_b: 'ab',
                            option_c: 'b',
                            option_d: 'a',
                            correct_answer: 'A',
                            explanation: 'b digandeng a jadi ba.',
                        },
                        {
                            question_text: 'Kata "bola" dimulai dengan huruf...',
                            option_a: 'a',
                            option_b: 'b',
                            option_c: 'c',
                            option_d: 'd',
                            correct_answer: 'B',
                            explanation: 'Bola diawali huruf b.',
                        },
                    ],
                },
            ],
        },
    ],
};