// data/bahasa-indonesia/bab-4.ts
// Bab 4: Ayo Dengarkan Cerita Seru (Semester 1)

import type { SeedModuleItem } from '../types';

export const BAB_4: SeedModuleItem = {
    title: 'Bab 4: Ayo Dengarkan Cerita Seru',
    order_index: 4,
    target_semester: 1,
    week_target: 10,
    lessons: [
        {
            title: 'Pertemuan 10: Menyimak Cerita "Kucing Kecil yang Lapar"',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyimak cerita pendek dan menjawab pertanyaan tentang isi cerita.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita tertulis "Kucing Kecil yang Lapar"',
                'Gambar tokoh cerita',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🐱 Cerita: Kucing Kecil yang Lapar

Dengarkan dan simak kisah petualangan seekor kucing kecil yang lucu bersama **Maryam** dan **Fatimah**! 🐾✨

---
# 📖 Isi Kisah Kucing Kecil

1. 🐱 **Si kucing kecil merasa lapar.**
2. 🍽️ **Ia berjalan mencari makanan ke sana kemari.**
3. 🐟 **Akhirnya, ia menemukan sepotong ikan segar.**
4. 😊 **Si kucing melompat dan merasa senang sekali!**

---
# 👂 Tiga Kunci Menyimak Hebat

* **Duduk Tenang**: Pandangan fokus ke arah cerita. 🤫
* **Buka Telinga**: Dengarkan setiap kata yang dibacakan. 👂
* **Ingat Tokoh**: Catat di pikiran siapa tokohnya dan apa yang ia alami. 🧠

---
# ❓ Uji Ingatan Detektif

Jawab pertanyaan ini dengan cepat:
* Siapa tokoh utama dalam cerita? 👉 **Si kucing kecil!** 🐱
* Apa yang ia cari? 👉 **Makanan!** 🍽️
* Apa yang berhasil ia temukan? 👉 **Ikan segar!** 🐟`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menyimak cerita seru tentang kucing kecil!',
                ice_breaker:
                    'Ayo tirukan suara kucing: "Meooong!" — sekarang suara kucing lapar: "Meooong... meooong..."',
                apperception:
                    'Coba pikirkan: kalau kucing lapar, ia akan cari apa?',
                trigger_question:
                    'Siapa tokoh dalam cerita "Kucing Kecil yang Lapar"? Ayo kita cari tahu!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menyimak cerita pendek dengan saksama & menjawab pertanyaan.',
                concrete_steps: [
                    'Bacakan cerita "Kucing Kecil yang Lapar" dengan intonasi ramah.',
                    'Ulangi 2x agar anak ingat.',
                    'Tanya: "Siapa tokohnya?" — biarkan anak jawab.',
                    'Tanya: "Apa yang ia cari?" — bantu jika perlu.',
                    'Beri apresiasi setiap jawaban benar.',
                ],
                script_parent:
                    '"Simak baik-baik ya sayang. Nanti Ibu tanya siapa tokohnya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Cerita Ceria',
                game_rules: [
                    'Guru bertanya tentang isi cerita.',
                    'Anak menjawab sambil melompat kecil.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menjawab dengan bantuan guru, 2 pertanyaan dulu.',
                    child_level_advanced:
                        'Menceritakan ulang dengan bahasa sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membaca cerita & menggambar tokoh.',
                worksheet_print_ready: {
                    title: 'LKPD 4.1: Cerita Kucing Kecil yang Lapar',
                    instructions:
                        'Baca cerita berikut, lalu gambar tokohnya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question:
                                'Baca cerita berikut dengan nyaring! "Si kucing kecil lapar. Ia mencari makan. Akhirnya ia menemukan ikan. Si kucing senang sekali."',
                            data: {
                                sentences: [
                                    { text: 'Si kucing kecil lapar.', icon: '🐱' },
                                    { text: 'Ia mencari makan.', icon: '🍽️' },
                                    { text: 'Akhirnya ia menemukan ikan.', icon: '🐟' },
                                    { text: 'Si kucing senang sekali.', icon: '😊' },
                                ],
                            },
                            answer_key: 'Anak membaca cerita.',
                            explanation: 'Menyimak cerita pendek.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah tokoh cerita "Kucing Kecil"!',
                            data: {
                                prompt: 'Kucing Kecil',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Gambar Kucing Kecil:',
                            },
                            answer_key: 'Anak menggambar kucing.',
                            explanation: 'Menggambar tokoh cerita.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Bagaimana perasaanmu setelah menyimak cerita?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah menyimak cerita?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Terhibur' },
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
                    'Siapa tokoh cerita, sayang?',
                    'Apa isi ceritanya?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menggambar Kucing Kecil pada LKPD 4.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 11: Menjawab Pertanyaan Cerita',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menjawab pertanyaan tentang isi cerita dengan kalimat sederhana.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita pendek',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# ❓ Cara Menjawab Pertanyaan Cerita

Setelah menyimak cerita, sekarang **Asiya** dan **Maheer** akan membimbingmu menjawab pertanyaan dengan tepat dan percaya diri! 🎯

---
# 📖 Cerita: Ari Membaca Buku

Baca cerita pendek ini:
* 👦 **Ari punya buku cerita baru.**
* 📚 **Ia sangat suka membaca buku.**
* 🏠 **Ari membaca buku di dalam kamar.**

---
# 🌟 Pertanyaan 5 Sahabat Kata Tanya

* **Siapa** tokohnya? 👉 **Ari** 👦
* **Apa** yang ia miliki? 👉 **Buku cerita baru** 📚
* **Di mana** ia membaca? 👉 **Di kamar** 🏠
* **Kapan** ia membaca? 👉 **Di waktu senggang** ⏰

---
# 🗣️ Tips Menjawab Lengkap

Biasakan menjawab dengan kalimat utuh:
* *"Siapa yang membaca buku?"*  
  👉 *"Yang membaca buku adalah **Ari**."* ✅`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menjawab pertanyaan tentang cerita!',
                ice_breaker:
                    'Ayo tepuk tangan: "Siapa?" tepuk 1x, "Apa?" tepuk 2x, "Di mana?" tepuk 3x!',
                apperception:
                    'Coba ingat cerita "Kucing Kecil" kemarin. Siapa tokohnya?',
                trigger_question:
                    'Bagaimana cara menjawab pertanyaan tentang cerita?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menjawab pertanyaan cerita: siapa, apa, di mana, kapan, mengapa.',
                concrete_steps: [
                    'Bacakan cerita "Ari punya buku baru" dengan intonasi ramah.',
                    'Tanya: "Siapa tokohnya?" — biarkan anak jawab.',
                    'Tanya: "Apa yang Ari punya?" — bantu jika perlu.',
                    'Tanya: "Di mana Ari membaca?" — biarkan anak jawab.',
                    'Ulangi cerita 2x agar anak ingat.',
                ],
                script_parent:
                    '"Nah sayang, pertanyaan cerita biasanya tentang siapa, apa, dan di mana. Yuk, kita jawab bersama!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Jawab Cepat Ceria',
                game_rules: [
                    'Guru bertanya tentang cerita.',
                    'Anak menjawab dengan cepat sambil berdiri.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Menjawab dengan bantuan guru, 1-2 kata jawaban.',
                    child_level_advanced:
                        'Menjawab dengan kalimat lengkap.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menjawab pertanyaan cerita.',
                worksheet_print_ready: {
                    title: 'LKPD 4.2: Menjawab Pertanyaan Cerita',
                    instructions:
                        'Simak cerita, lalu jawab pertanyaan berikut!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question:
                                'Baca cerita: "Ari punya buku baru. Ia suka membaca buku. Ari membaca buku di kamar."',
                            data: {
                                sentences: [
                                    { text: 'Ari punya buku baru.', icon: '📚' },
                                    { text: 'Ia suka membaca buku.', icon: '👦' },
                                    { text: 'Ari membaca buku di kamar.', icon: '🏠' },
                                ],
                            },
                            answer_key: 'Anak membaca cerita.',
                            explanation: 'Menyimak cerita.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question:
                                'Jawab: Siapa tokoh cerita? Di mana Ari membaca?',
                            data: {
                                lines: 3,
                                prompt: 'Jawaban:',
                                example: 'Tokoh cerita: Ari. Ari membaca di kamar.',
                            },
                            answer_key: 'Tokoh: Ari. Tempat: kamar.',
                            explanation: 'Menjawab pertanyaan cerita.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah Ari sedang membaca buku!',
                            data: {
                                prompt: 'Ari membaca buku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Ari membaca buku:',
                            },
                            answer_key: 'Anak menggambar Ari membaca.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Pertanyaan apa yang paling mudah, sayang?',
                    'Bagaimana cara menjawab dengan kalimat?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menjawab pertanyaan cerita pada LKPD 4.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 12: Ayo Ceritakan Ulang Cerita',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menceritakan ulang isi cerita dengan bahasa sendiri.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita pendek',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🎤 Ayo Ceritakan Ulang Cerita!

Bercerita ulang adalah seni menyampaikan kembali cerita yang pernah kamu dengar menggunakan **bahasamu sendiri yang asyik**! 🎉

---
# ⚽ Menyimak Kisah Budi

Perhatikan cerita ini baik-baik:
* ⚽ **Budi memiliki bola sepak baru.**
* 🏡 **Ia bermain di halaman rumah bersama teman.**
* 😊 **Budi merasa gembira dan tersenyum riang.**

---
# 🗣️ Cara Menceritakan Kembali

Tidak perlu menghafal kata per kata secara sama persis. Cukup sampaikan 3 hal ini:
1. Siapa yang ada di dalam cerita? *(Budi)*
2. Apa yang ia miliki dan lakukan? *(Punya bola dan main di halaman)*
3. Bagaimana akhirnya? *(Ia senang sekali)*

---
# 🏆 Giliranmu Tampil!

Coba ceritakan kembali kisah Budi kepada orang tuamu sekarang:  
Berdirilah dengan tegak, tersenyum, dan ceritakan dengan riang! 🌟👏`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan menceritakan ulang cerita dengan bahasa sendiri!',
                ice_breaker:
                    'Ayo tirukan gerakan bercerita: tangan terbuka lebar, suara lantang, senyum manis!',
                apperception:
                    'Coba ingat cerita "Kucing Kecil" kemarin. Bisa ceritakan ulang?',
                trigger_question:
                    'Bagaimana cara menceritakan ulang cerita? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Menceritakan ulang cerita dengan bahasa sendiri.',
                concrete_steps: [
                    'Bacakan cerita "Budi Bermain Bola" dengan intonasi ramah.',
                    'Ulangi 2x agar anak ingat.',
                    'Minta anak menceritakan ulang dengan bahasa sendiri.',
                    'Bantu jika anak lupa: "Siapa tokohnya? Ia main di mana?"',
                    'Beri apresiasi setiap usaha anak.',
                ],
                script_parent:
                    '"Nah sayang, ceritakan ulang dengan bahasamu sendiri. Tidak perlu sama persis!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Cerita Berantai Ceria',
                game_rules: [
                    'Guru memulai cerita: "Budi punya bola baru..."',
                    'Anak melanjutkan: "...ia bermain di halaman..."',
                    'Giliran berikutnya melanjutkan lagi.',
                    'Yang paling seru & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Bercerita dengan bantuan guru, 1 kalimat dulu.',
                    child_level_advanced:
                        'Bercerita 3 kalimat sendiri tanpa bantuan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menceritakan ulang & menulis cerita.',
                worksheet_print_ready: {
                    title: 'LKPD 4.3: Ayo Ceritakan Ulang!',
                    instructions:
                        'Baca cerita, lalu tulis ulang dengan bahasamu sendiri!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'READING_CARD',
                            question:
                                'Baca cerita: "Budi punya bola baru. Ia bermain bola di halaman. Budi senang sekali."',
                            data: {
                                sentences: [
                                    { text: 'Budi punya bola baru.', icon: '⚽' },
                                    { text: 'Ia bermain bola di halaman.', icon: '🏡' },
                                    { text: 'Budi senang sekali.', icon: '😊' },
                                ],
                            },
                            answer_key: 'Anak membaca cerita.',
                            explanation: 'Menyimak cerita.',
                        },
                        {
                            id: 2,
                            type: 'WRITING_LINES',
                            question:
                                'Ceritakan ulang cerita Budi dengan bahasamu sendiri!',
                            data: {
                                lines: 4,
                                prompt: 'Ceritaku:',
                                example: 'Budi punya bola. Ia bermain di halaman. Ia senang.',
                            },
                            answer_key: 'Anak menulis cerita ulang.',
                            explanation: 'Menceritakan ulang.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah Budi sedang bermain bola!',
                            data: {
                                prompt: 'Budi bermain bola',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Budi bermain bola:',
                            },
                            answer_key: 'Anak menggambar Budi.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana perasaanmu bercerita, sayang?',
                    'Cerita apa yang paling mudah diceritakan?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menceritakan ulang cerita Budi dengan bahasamu sendiri!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 4: Ayo Dengarkan Cerita Seru',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Saat menyimak cerita, kita harus...',
                            option_a: 'Bermain',
                            option_b: 'Menyimak dengan saksama',
                            option_c: 'Bicara',
                            option_d: 'Tidur',
                            correct_answer: 'B',
                            explanation: 'Menyimak dengan saksama.',
                        },
                        {
                            question_text: 'Menjawab pertanyaan cerita sebaiknya dengan...',
                            option_a: 'Kalimat sederhana',
                            option_b: 'Angka',
                            option_c: 'Gambar',
                            option_d: 'Suara keras',
                            correct_answer: 'A',
                            explanation: 'Kalimat sederhana.',
                        },
                        {
                            question_text: 'Menceritakan ulang berarti...',
                            option_a: 'Membaca cerita',
                            option_b: 'Menyalin cerita',
                            option_c: 'Bercerita dengan bahasa sendiri',
                            option_d: 'Menulis cerita baru',
                            correct_answer: 'C',
                            explanation: 'Bercerita dengan bahasa sendiri.',
                        },
                        {
                            question_text: 'Tokoh cerita "Budi punya bola baru" adalah...',
                            option_a: 'Bola',
                            option_b: 'Budi',
                            option_c: 'Halaman',
                            option_d: 'Baru',
                            correct_answer: 'B',
                            explanation: 'Tokohnya Budi.',
                        },
                    ],
                },
            ],
        },
    ],
};