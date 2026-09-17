// data/bahasa-indonesia/bab-8.ts
// Bab 8: Aku Bisa Bikin Cerita! (Semester 2)

import type { SeedModuleItem } from '../types';

export const BAB_8: SeedModuleItem = {
    title: 'Bab 8: Aku Bisa Bikin Cerita!',
    order_index: 8,
    target_semester: 2,
    week_target: 22,
    lessons: [
        {
            title: 'Pertemuan 22: Ayo Bikin Kalimat Sederhana',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis kalimat sederhana dengan ejaan yang benar.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'Kartu kata',
                'LKPD',
            ],
            content_text: `
# ✏️ Ayo Bikin Kalimat Sederhana!

Halo calon penulis hebat! 
Hari ini **Maryam** dan **Maheer** akan membongkar rahasia cara menulis kalimat yang rapi dan benar! 🎉

---
# 📐 Tiga Aturan Emas Sebuah Kalimat

1. 🅰️ **Huruf Kapital di Awal**: Huruf pertama wajib menggunakan huruf besar.
2. 📏 **Spasi Antar Kata**: Berikan jarak 1 jari agar kata tidak bertabrakan.
3. ⚫ **Tanda Titik di Akhir**: Beri tanda titik (.) sebagai tanda kalimat sudah selesai.

---
# 🔍 Bandingkan: Mana yang Tepat?

* ❌ *aku suka membaca buku* (Huruf awal kecil & tanpa titik)
* ❌ *AkuSukaBuku.* (Tidak ada jarak spasi)
* ✅ **Aku suka membaca buku.** (Sempurna! Huruf awal kapital, berjarak, dan bertitik).

---
# 🎯 Latihan Memperbaiki Kalimat

Ayo sebutkan perbaikannya di udara:
* "ibu masak nasi" 👉 **I**bu masak nasi**.**
* "adik main bola" 👉 **A**dik main bola**.**`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan bikin kalimat sederhana!',
                ice_breaker:
                    'Ayo tepuk tangan: "Huruf kapital!" tepuk 1x, "Tanda titik!" tepuk 1x!',
                apperception:
                    'Coba ingat kalimat "Aku suka buku." Apa huruf awalnya? Kapital!',
                trigger_question:
                    'Bagaimana cara menulis kalimat yang benar? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Kalimat: diawali huruf kapital, diakhiri tanda titik, ada spasi.',
                concrete_steps: [
                    'Tunjukkan kalimat "Aku suka buku."',
                    'Tunjuk huruf "A" kapital di awal.',
                    'Tunjuk tanda "." di akhir.',
                    'Minta anak bikin kalimat sendiri.',
                    'Bantu perbaiki jika ada yang salah.',
                ],
                script_parent:
                    '"Nah sayang, kalimat yang benar diawali huruf besar dan diakhiri titik. Yuk, kita bikin kalimat!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Susun Kalimat Ceria',
                game_rules: [
                    'Guru membagikan kartu kata acak.',
                    'Anak menyusun jadi kalimat yang benar.',
                    'Yang paling tepat dapat bintang emas ⭐.',
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
                task_focus: 'Menulis kalimat sederhana.',
                worksheet_print_ready: {
                    title: 'LKPD 8.1: Ayo Bikin Kalimat Sederhana!',
                    instructions:
                        'Tulis kalimat berikut dengan huruf kapital & tanda titik yang benar!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question: 'Tulis kalimat berikut dengan benar!',
                            data: {
                                lines: 4,
                                prompt: 'Tulis kalimat:',
                                example: 'aku suka buku → Aku suka buku.',
                            },
                            answer_key: 'Anak menulis kalimat dengan benar.',
                            explanation: 'Latihan menulis kalimat.',
                        },
                        {
                            id: 2,
                            type: 'FILL_THE_WORD',
                            question: 'Lengkapi kalimat berikut!',
                            data: {
                                word: 'buku',
                                displayWord: 'Aku suka b_k_',
                                icon: '📚',
                            },
                            answer_key: 'Aku suka buku.',
                            explanation: 'Melengkapi kalimat.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah sesuai kalimat "Aku suka buku."!',
                            data: {
                                prompt: 'Aku suka buku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku suka buku:',
                            },
                            answer_key: 'Anak menggambar buku.',
                            explanation: 'Memahami kalimat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana cara menulis kalimat, sayang?',
                    'Kapan pakai huruf kapital?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis kalimat pada LKPD 8.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 23: Ayo Bikin Cerita 3 Kalimat!',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menulis cerita 3 kalimat dengan alur sederhana.',
            allocated_minutes: 45,
            required_materials: [
                'Buku tulis berpetak',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `
# 🎨 Ayo Menjadi Pengarang Cilik!

Sekarang giliranmu membuat cerita 3 kalimat buatanmu sendiri bersama **Asiya** dan **Fatimah**! ✨

---
# 🏗️ Susunan Cerita 3 Kalimat

* **Langkah 1 (Pembuka)**: Kenalkan siapa tokoh atau benda milikmu.  
  *Contoh:* *"Aku memelihara seekor anak kucing."* 🐱
* **Langkah 2 (Isi)**: Ceritakan sifat atau apa yang dilakukannya.  
  *Contoh:* *"Kucingku berbulu putih dan suka melompat."* 🧶
* **Langkah 3 (Penutup)**: Ceritakan perasaanmu.  
  *Contoh:* *"Aku sangat bahagia bermain bersamanya."* ❤️

---
# 🎭 Komik: Cerita Bola Maheer

**Maheer**: "Aku juga bisa bikin cerita bola!"  
1. ⚽ *Aku punya bola sepak baru.*  
2. 🏃 *Aku menendang bola ke gawang.*  
3. 🎉 *Aku bersorak gembira!*  

---
# 🌟 Sekarang Giliranmu!

Pilih 1 hal kesukaanmu untuk dijadikan cerita:
* Boneka atau robot mainanmu 🧸🤖
* Makanan kesukaanmu 🍉🥞
* Hewan peliharaanmu 🐱🐰`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan bikin cerita 3 kalimat!',
                ice_breaker:
                    'Ayo tepuk tangan 3x sambil sebut: "A-ku pu-nya ku-cing!"',
                apperception:
                    'Coba pikirkan mainan favoritmu. Bisa bikin cerita tentang itu?',
                trigger_question:
                    'Bagaimana cara bikin cerita 3 kalimat? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Cerita 3 kalimat: pembuka, isi, penutup.',
                concrete_steps: [
                    'Tunjukkan contoh cerita "Aku punya kucing. Kucingku lucu. Aku sayang kucingku."',
                    'Tunjuk kalimat 1, 2, 3 satu per satu.',
                    'Jelaskan fungsi: pembuka, isi, penutup.',
                    'Minta anak bikin cerita sendiri tentang mainan favoritnya.',
                    'Bantu jika anak kesulitan ide.',
                ],
                script_parent:
                    '"Nah sayang, cerita 3 kalimat: pembuka, isi, penutup. Yuk, kita bikin cerita tentang kucingmu!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Lanjut Cerita Ceria',
                game_rules: [
                    'Guru memulai: "Aku punya kucing..."',
                    'Anak melanjutkan: "...kucingku lucu..."',
                    'Giliran berikutnya: "...aku sayang kucingku!"',
                    'Yang paling seru dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Bercerita dengan bantuan guru, 2 kalimat dulu.',
                    child_level_advanced:
                        'Bercerita 3-5 kalimat sendiri.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menulis cerita 3 kalimat.',
                worksheet_print_ready: {
                    title: 'LKPD 8.2: Ayo Bikin Cerita 3 Kalimat!',
                    instructions:
                        'Tulis cerita 3 kalimat tentang dirimu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question:
                                'Tulis cerita 3 kalimat tentang dirimu!',
                            data: {
                                lines: 4,
                                prompt: 'Ceritaku:',
                                example: 'Aku punya kucing. Kucingku lucu. Aku sayang kucingku.',
                            },
                            answer_key: 'Anak menulis cerita 3 kalimat.',
                            explanation: 'Latihan menulis cerita.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question: 'Gambarlah tokoh dalam ceritamu!',
                            data: {
                                prompt: 'Tokoh ceritaku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Tokoh ceritaku:',
                            },
                            answer_key: 'Anak menggambar.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Bagaimana perasaanmu setelah menulis cerita?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah menulis cerita?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Bangga' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Bisa' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Cerita apa yang kamu tulis, sayang?',
                    'Bagaimana cara menyusun cerita?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menulis cerita pada LKPD 8.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 24: Ayo Berbagi Cerita (Presentasi)',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat membacakan & membagikan cerita yang telah ditulis dengan percaya diri.',
            allocated_minutes: 45,
            required_materials: [
                'Cerita anak',
                'Pensil warna',
                'Medali kertas (opsional)',
                'LKPD',
            ],
            content_text: `
# 🎤 Ayo Berani Berbagi Cerita!

Saatnya menampilkan karya ceritamu di depan teman dan keluarga! 
Bercerita itu mudah dan sangat menyenangkan! 🌟

---
# 🌟 4 Langkah Pembicara Percaya Diri

1. 🧍 **Berdiri Tegak**: Kaki seimbang dan pandangan menghadap ke depan.
2. 😮‍💨 **Tarik Napas Dalam**: Ambil napas tenang agar rasa gugup hilang.
3. 🗣️ **Suara Lantang & Jelas**: Ucapkan kata demi kata dengan ramah.
4. 😊 **Tersenyum Manis**: Bagikan keceriaan ceritamu kepada semua orang!

---
# 👂 Menjadi Pendengar yang Baik

Saat temanmu sedang membacakan ceritanya di depan:
* Pasang telinga baik-baik. 👂
* Jangan memotong pembicaraan. 🤫
* Berikan tepuk tangan meriah setelah teman selesai membaca! 👏

---
# 🏆 Selamat, Kamu Penulis Hebat!

Kamu telah menuntaskan seluruh tantangan Bab 8. 
Sekarang, siapkan ceritamu dan tampilkan dengan senyuman terbaik! 🏅✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita akan berbagi cerita dengan berani!',
                ice_breaker:
                    'Ayo berdiri tegak! Tarik napas... hembuskan... senyum manis! Siap bercerita!',
                apperception:
                    'Coba ingat cerita yang kamu tulis kemarin. Siap baca di depan kelas?',
                trigger_question:
                    'Bagaimana cara berbagi cerita dengan berani? Ayo kita coba!',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Berbagi cerita: berdiri tegak, tarik napas, baca lantang, senyum manis.',
                concrete_steps: [
                    'Tunjukkan cara berdiri tegak & tarik napas.',
                    'Contohkan membaca cerita dengan lantang.',
                    'Minta anak berlatih di tempat dulu.',
                    'Lalu maju satu per satu membaca cerita.',
                    'Beri tepuk tangan untuk setiap anak.',
                ],
                script_parent:
                    '"Nah sayang, bercerita itu mudah. Berdiri tegak, tarik napas, baca lantang, senyum!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Panggung Cerita Ceria',
                game_rules: [
                    'Setiap anak tampil bercerita di depan kelas.',
                    'Teman mendengarkan dengan saksama.',
                    'Setiap tampilan diberi tepuk tangan & medali kertas 🏅.',
                ],
                multi_grade_adaptation: {
                    child_level_basic:
                        'Bercerita dengan bantuan guru (dibisiki).',
                    child_level_advanced:
                        'Bercerita tanpa bantuan & dengan ekspresi.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Berbagi cerita & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 8.3: Ayo Berbagi Cerita!',
                    instructions:
                        'Tulis cerita finalmu, lalu bacakan di depan kelas!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'WRITING_LINES',
                            question:
                                'Tulis cerita finalmu (3-5 kalimat)!',
                            data: {
                                lines: 5,
                                prompt: 'Cerita Finalku:',
                                example: 'Aku punya kucing. Kucingku lucu...',
                            },
                            answer_key: 'Anak menulis cerita final.',
                            explanation: 'Menulis cerita.',
                        },
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah ilustrasi cerita finalmu!',
                            data: {
                                prompt: 'Ilustrasi ceritaku',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Ilustrasi ceritaku:',
                            },
                            answer_key: 'Anak menggambar ilustrasi.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 3,
                            type: 'EXPRESSION_CARD',
                            question:
                                'Bagaimana perasaanmu setelah berbagi cerita?',
                            data: {
                                question: 'Bagaimana perasaanmu setelah berbagi cerita?',
                                options: [
                                    { emoji: '😊', label: 'Senang & Bangga' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Malu' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Melatih refleksi.',
                        },
                    ],
                },
                reflection_questions: [
                    'Bagaimana perasaanmu bercerita, sayang?',
                    'Cerita apa yang paling kamu sukai?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil cerita final pada LKPD 8.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Akhir Bab 8: Aku Bisa Bikin Cerita!',
                    quiz_question_count: 5,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Kalimat yang benar diawali dengan...',
                            option_a: 'Huruf kecil',
                            option_b: 'Huruf kapital',
                            option_c: 'Angka',
                            option_d: 'Simbol',
                            correct_answer: 'B',
                            explanation: 'Kalimat diawali huruf kapital.',
                        },
                        {
                            question_text: 'Kalimat yang benar diakhiri dengan...',
                            option_a: 'Titik (.)',
                            option_b: 'Koma (,)',
                            option_c: 'Tanya (?)',
                            option_d: 'Seru (!)',
                            correct_answer: 'A',
                            explanation: 'Kalimat berita diakhiri titik.',
                        },
                        {
                            question_text: 'Cerita sederhana terdiri dari...',
                            option_a: '1 kalimat',
                            option_b: 'Beberapa kalimat',
                            option_c: 'Angka',
                            option_d: 'Gambar',
                            correct_answer: 'B',
                            explanation: 'Cerita terdiri dari beberapa kalimat.',
                        },
                        {
                            question_text: 'Saat berbagi cerita, kita harus...',
                            option_a: 'Malu-malu',
                            option_b: 'Bicara lantang & jelas',
                            option_c: 'Berbisik',
                            option_d: 'Diam',
                            correct_answer: 'B',
                            explanation: 'Bicara lantang & jelas.',
                        },
                        {
                            question_text: 'Apa yang kamu pelajari di Bab 8?',
                            option_a: 'Menulis kalimat & cerita',
                            option_b: 'Berhitung',
                            option_c: 'Menyanyi',
                            option_d: 'Melukis',
                            correct_answer: 'A',
                            explanation: 'Menulis kalimat & cerita.',
                        },
                    ],
                },
            ],
        },
    ],
};