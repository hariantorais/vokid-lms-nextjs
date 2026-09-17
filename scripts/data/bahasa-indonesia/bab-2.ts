// data/bahasa-indonesia/bab-2.ts
// Bab 2: Ayo Rangkai Huruf Jadi Suku Kata (Semester 1)

import type { SeedModuleItem } from '../types';

export const BAB_2: SeedModuleItem = {
    title: 'Bab 2: Ayo Rangkai Huruf Jadi Suku Kata',
    order_index: 2,
    target_semester: 1,
    week_target: 4,
    lessons: [
        {
            title: 'Pertemuan 4: Suku Kata 2 Huruf (ba, bi, bu, ca, ci, cu)',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca suku kata 2 huruf dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu suku kata warna-warni',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🎈 Naik Level: Suku Kata 2 Huruf!

Kita sudah mahir membaca **ba-bi-bu**.
Sekarang **Asiya** dan **Fatimah** mengajak kita menjelajahi suku kata **c**, **d**, dan **k**! 🎉

---
# 🌟 4 Kelompok Suku Kata Seru

* 👕 **Kelompok b**: ba — bi — bu 👉 **ba**ju, **bi**ji, **bu**ku
* 🧼 **Kelompok c**: ca — ci — cu 👉 **ca**ra, **ci**ci, **cu**ci
* 🎲 **Kelompok d**: da — di — du 👉 **da**du, **di**ri, **du**duk
* 🐱 **Kelompok k**: ka — ki — ku 👉 **ka**ki, **ki**si, **ku**cing

---
# 💡 Pola Membaca Cepat

Setiap konsonan bisa dipasangkan dengan semua huruf vokal (*a-i-u-e-o*).
Cukup bunyikan huruf depan, lalu sambungkan ke vokal di belakangnya secara mulus! 🎯

---
# 🎤 Tantangan Membaca Mandiri

Ayo baca deretan ini dengan lancar:
1. **ca — ci — cu** 🎯
2. **da — di — du** 🎲
3. **ka — ki — ku** 🐱`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita baca suku kata baru yang lebih seru!',
                ice_breaker:
                    'Ayo tepuk tangan berirama: ba-bi-bu (tepuk 3x), ca-ci-cu (tepuk 3x)!',
                apperception:
                    'Coba sebut nama temanmu. Ada suku kata apa di dalamnya?',
                trigger_question:
                    'Suku kata apa saja yang bisa kita baca hari ini?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Suku kata 2 huruf: ba-bi-bu, ca-ci-cu, da-di-du, ka-ki-ku.',
                concrete_steps: [
                    'Tunjukkan kartu "ca". Baca "ca" bersama 3x.',
                    'Lanjut "ci", "cu" dengan tempo makin cepat.',
                    'Ulangi untuk da-di-du dan ka-ki-ku.',
                    'Acak kartu, minta anak membaca cepat.',
                    'Beri apresiasi setiap jawaban benar.',
                ],
                script_parent:
                    '"Ayo sayang, baca bersama Ibu: ca-ci-cu! Sekarang da-di-du!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Kartu Suku Kata Kilat',
                game_rules: [
                    'Guru menunjukkan kartu suku kata cepat.',
                    'Anak membaca dengan cepat sambil berdiri.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Membaca dengan bantuan guru, fokus kelompok b dan c.',
                    child_level_advanced:
                        'Membaca semua kelompok tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca & mencocokkan suku kata.',
                worksheet_print_ready: {
                    title: 'LKPD 2.1: Suku Kata 2 Huruf',
                    instructions:
                        'Baca suku kata, lalu cocokkan dengan gambar!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READ_AND_MATCH',
                            question: 'Baca suku kata, lalu cocokkan dengan gambar!',
                            data: {
                                words: [
                                    { word: 'ba', icon: '👕' },
                                    { word: 'bi', icon: '🌱' },
                                    { word: 'bu', icon: '📚' },
                                    { word: 'ci', icon: '🐭' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan suku kata dengan gambar.',
                            explanation: 'Membaca & mencocokkan.',
                        },
                        {
                            id: 2,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut!',
                            data: {
                                syllables: [
                                    { part1: 'c', part2: 'a', result: 'ca', icon: '🎯' },
                                    { part1: 'd', part2: 'i', result: 'di', icon: '👤' },
                                    { part1: 'k', part2: 'u', result: 'ku', icon: '🐱' },
                                ],
                            },
                            answer_key: 'ca, di, ku',
                            explanation: 'Menyambung konsonan dengan vokal.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'READING_CARD',
                            question: 'Baca suku kata berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'ba - bi - bu', icon: '🔤' },
                                    { text: 'ca - ci - cu', icon: '🔤' },
                                    { text: 'da - di - du', icon: '🔤' },
                                    { text: 'ka - ki - ku', icon: '🔤' },
                                ],
                            },
                            answer_key: 'Anak membaca dengan lancar.',
                            explanation: 'Latihan membaca.',
                        },
                    ],
                },
                reflection_questions: [
                    'Suku kata apa yang paling mudah, sayang?',
                    'Suku kata apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca dengan ceria: ba-bi-bu, ca-ci-cu, da-di-du, ka-ki-ku!',
                },
            ],
        },
        {
            title: 'Pertemuan 5: Suku Kata 3 Huruf (ban, bin, bun)',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca suku kata 3 huruf (suku kata tertutup) dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu suku kata tertutup',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🔔 Suku Kata 3 Huruf (Tertutup)

Tahukah kamu? Jika suku kata terbuka diberi huruf **"n"** di belakangnya, bunyinya akan tertutup rapat!
Ayo pelajari bersama **Maheer** dan **Khadijah**! 🎉

---
# 🌟 Terbuka vs Tertutup

* **ba** ➡️ ditambah **n** ➡️ menjadi **ban** 🛞 *(ban sepeda)*
* **bi** ➡️ ditambah **n** ➡️ menjadi **bin** 🐝 *(binatang)*
* **bu** ➡️ ditambah **n** ➡️ menjadi **bun** 🌸 *(bunga)*
* **ca** ➡️ ditambah **n** ➡️ menjadi **can** ☕ *(cangkir)*
* **ci** ➡️ ditambah **n** ➡️ menjadi **cin** 💍 *(cincin)*

---
# 💡 Perbedaan Bunyi

* **Suku Kata Terbuka**: Diakhiri huruf vokal, mulut terbuka santai *(ba, bi, bu)*.
* **Suku Kata Tertutup**: Diakhiri huruf konsonan, aliran udara tertahan oleh lidah *(ban, bin, bun)*. 🎯

---
# 🔍 Coba Tebak Cepat!

Apa bunyi suku kata berikut?
* **ca + n** = **can** ☕
* **ci + n** = **cin** 💍
* **cu + n** = **cun** 🌤️`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita bikin suku kata baru dengan tambahan "n" di belakang!',
                ice_breaker:
                    'Ayo bilang "ba" — sekarang tambah "n" jadi "ban"! Terasa beda, kan?',
                apperception:
                    'Coba lihat ban sepedamu di rumah. Diawali suku kata apa?',
                trigger_question:
                    'Apa bedanya "ba" dan "ban"? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Suku kata tertutup diakhiri konsonan (ban, bin, bun).',
                concrete_steps: [
                    'Tunjukkan kartu "ba". Baca "ba" bersama.',
                    'Tambahkan kartu "n" di belakang: jadi "ban".',
                    'Baca "ban" bersama 3x.',
                    'Lanjut "bin", "bun", "can", "cin", "cun".',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Nah sayang, kalau ba ditambah n di belakang, jadilah ban. Yuk, coba!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Bedakan Suku Kata Ceria',
                game_rules: [
                    'Guru menyebutkan suku kata: "ba" atau "ban".',
                    'Anak tepuk 1x untuk terbuka, tepuk 2x untuk tertutup.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Fokus ban-bin-bun dulu, dengan bantuan guru.',
                    child_level_advanced:
                        'Membedakan terbuka & tertutup sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca suku kata tertutup.',
                worksheet_print_ready: {
                    title: 'LKPD 2.2: Suku Kata 3 Huruf',
                    instructions:
                        'Sambung suku kata terbuka dengan konsonan akhir!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata berikut!',
                            data: {
                                syllables: [
                                    { part1: 'ba', part2: 'n', result: 'ban', icon: '🛞' },
                                    { part1: 'bi', part2: 'n', result: 'bin', icon: '🐝' },
                                    { part1: 'bu', part2: 'n', result: 'bun', icon: '🌸' },
                                ],
                            },
                            answer_key: 'ban, bin, bun',
                            explanation: 'Menyambung suku kata tertutup.',
                        },
                        {
                            id: 2,
                            type: 'READ_AND_MATCH',
                            question: 'Baca & cocokkan!',
                            data: {
                                words: [
                                    { word: 'ban', icon: '🛞' },
                                    { word: 'bin', icon: '🐝' },
                                    { word: 'bun', icon: '🌸' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan.',
                            explanation: 'Membaca suku kata tertutup.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'READING_CARD',
                            question: 'Baca suku kata berikut dengan nyaring!',
                            data: {
                                sentences: [
                                    { text: 'ban - bin - bun', icon: '🔤' },
                                    { text: 'can - cin - cun', icon: '🔤' },
                                ],
                            },
                            answer_key: 'Anak membaca dengan lancar.',
                            explanation: 'Latihan membaca.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa bedanya "ba" dan "ban", sayang?',
                    'Suku kata tertutup apa yang paling mudah?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca suku kata 3 huruf: ban-bin-bun!',
                },
            ],
        },
        {
            title: 'Pertemuan 6: Ayo Baca Kata 2 Suku Kata (bola, buku, kaki)',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membaca kata 2 suku kata dengan lancar.',
            allocated_minutes: 45,
            required_materials: [
                'Kartu kata',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🎉 Menggabungkan Suku Kata Jadi Kata!

Sekarang saatnya kita menggandeng dua suku kata menjadi **kata yang bermakna** bersama **Maryam**, **Asiya**, dan **Fatimah**! 🎉

---
# 🌟 Dua Suku Kata Menjadi Kata

* **bo** + **la** = **bola** ⚽ *(benda bulat untuk bermain)*
* **bu** + **ku** = **buku** 📚 *(lembaran cerita seru)*
* **ka** + **ki** = **kaki** 🦶 *(anggota tubuh untuk berjalan)*
* **ca** + **ra** = **cara** 🎯 *(langkah mengerjakan sesuatu)*
* **da** + **du** = **dadu** 🎲 *(kotak bernomor untuk permainan)*

---
# 💡 Mengapa Suku Kata Digabung?

Huruf membentuk suku kata, dan suku kata membentuk **kata**!
Dengan kata, kita bisa menyebutkan nama benda, anggota tubuh, dan benda di sekitar kita dengan jelas! 💡

---
# 🏆 Kamu Sudah Bisa Membaca Kata!

Baca kata-kata ini dengan suara lantang:
**bola — buku — kaki — dadu!**  
Hebat, kemampuan membacamu bertambah pesat hari ini! 🌟👏`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita gabungkan suku kata jadi kata yang bermakna!',
                ice_breaker:
                    'Ayo tepuk tangan: "bo" tepuk 1x, "la" tepuk 1x, "bola" tepuk 2x!',
                apperception:
                    'Coba pegang bola di rumah. Kata "bola" terdiri dari suku kata apa saja?',
                trigger_question:
                    'Kata apa yang bisa dibaca dari "bo" + "la"?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kata 2 suku kata dibentuk dari penggabungan 2 suku kata.',
                concrete_steps: [
                    'Tunjukkan kartu "bo" dan "la".',
                    'Gabungkan: "bo" + "la" = "bola".',
                    'Baca "bola" bersama 3x.',
                    'Lanjut "bu" + "ku" = "buku", "ka" + "ki" = "kaki".',
                    'Ulangi 3x dengan tempo makin cepat.',
                ],
                script_parent:
                    '"Nah sayang, bo digandeng la jadilah bola. Yuk, kita baca bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sambung Kata Ceria',
                game_rules: [
                    'Guru menyebutkan suku kata pertama ("bo").',
                    'Anak menyambung dengan suku kata kedua ("la") sambil melompat.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menyambung dengan bantuan guru, 2 kata dulu.',
                    child_level_advanced:
                        'Menyambung sendiri & menyebutkan arti kata.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca kata 2 suku kata.',
                worksheet_print_ready: {
                    title: 'LKPD 2.3: Ayo Baca Kata 2 Suku Kata!',
                    instructions:
                        'Sambung suku kata, baca kata, lalu cocokkan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_SYLLABLE',
                            question: 'Sambung suku kata menjadi kata!',
                            data: {
                                syllables: [
                                    { part1: 'bo', part2: 'la', result: 'bola', icon: '⚽' },
                                    { part1: 'bu', part2: 'ku', result: 'buku', icon: '📚' },
                                    { part1: 'ka', part2: 'ki', result: 'kaki', icon: '🦶' },
                                ],
                            },
                            answer_key: 'bola, buku, kaki',
                            explanation: 'Menyambung suku kata menjadi kata.',
                        },
                        {
                            id: 2,
                            type: 'READ_AND_MATCH',
                            question: 'Baca kata, lalu cocokkan!',
                            data: {
                                words: [
                                    { word: 'bola', icon: '⚽' },
                                    { word: 'buku', icon: '📚' },
                                    { word: 'kaki', icon: '🦶' },
                                ],
                            },
                            answer_key: 'Anak mencocokkan.',
                            explanation: 'Membaca kata.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'WRITING_LINES',
                            question: 'Tulis kata berikut di baris kosong!',
                            data: {
                                lines: 3,
                                prompt: 'Tulis kata:',
                                example: 'bola, buku, kaki',
                            },
                            answer_key: 'Anak menulis kata.',
                            explanation: 'Latihan menulis.',
                        },
                    ],
                },
                reflection_questions: [
                    'Kata apa yang paling mudah dibaca, sayang?',
                    'Kata apa yang paling sulit?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu membaca kata dengan ceria: bola, buku, kaki!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 2: Ayo Rangkai Huruf Jadi Suku Kata',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Hasil dari "bo" + "la" adalah...',
                            option_a: 'bola',
                            option_b: 'labo',
                            option_c: 'bela',
                            option_d: 'loba',
                            correct_answer: 'A',
                            explanation: 'bo + la = bola.',
                        },
                        {
                            question_text: 'Kata "buku" terdiri dari suku kata...',
                            option_a: 'bu-ku',
                            option_b: 'buk-u',
                            option_c: 'b-uku',
                            option_d: 'bu-k',
                            correct_answer: 'A',
                            explanation: 'buku = bu + ku.',
                        },
                        {
                            question_text: 'Suku kata "ban" adalah contoh suku kata...',
                            option_a: 'Terbuka',
                            option_b: 'Tertutup',
                            option_c: 'Vokal',
                            option_d: 'Konsonan',
                            correct_answer: 'B',
                            explanation: 'ban diakhiri konsonan n, jadi tertutup.',
                        },
                        {
                            question_text: 'Kata "kaki" artinya...',
                            option_a: 'Anggota tubuh untuk berjalan',
                            option_b: 'Alat untuk menulis',
                            option_c: 'Benda untuk bermain',
                            option_d: 'Alat untuk makan',
                            correct_answer: 'A',
                            explanation: 'Kaki adalah anggota tubuh untuk berjalan.',
                        },
                    ],
                },
            ],
        },
    ],
};