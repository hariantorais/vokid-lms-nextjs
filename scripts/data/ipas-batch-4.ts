// data/ipas-batch-4.ts
// Bab 7-8: Sumber Energi di Rumah & Langit dan Bintang (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './bahasa-indonesia-batch-1';

// =============================================================================
// BAB 7: SUMBER ENERGI DI RUMAH
// =============================================================================
const BAB_7: SeedModuleItem = {
    title: 'Bab 7: Sumber Energi di Rumah',
    order_index: 7,
    target_semester: 2,
    week_target: 19,
    lessons: [
        {
            title: 'Pertemuan 19: Sumber Energi Matahari & Air',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal sumber energi matahari & air serta manfaatnya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar sumber energi',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ☀️💧 Ayo Kenalan dengan Sumber Energi!

Halo sahabat cilik! Matahari & air adalah **sumber energi** untuk hidup kita! 
Ayo **Maryam** dan **Maheer** ajak kalian berkenalan! 🎉

---

### 🌟 1. Dua Sumber Energi Ajaib

| Sumber | Manfaat | Emoji |
| :---: | :--- | :---: |
| **Matahari** | Memberi cahaya & panas | ☀️ |
| **Air** | Untuk minum, mandi, cuci | 💧 |

---

### 🎭 Komik: Maryam & Maheer Amati Matahari

\`\`\`text
  Maryam : "Maheer, matahari bersinar terang!" ☀️👧
  Maheer : "Iya! Matahari bikin hangat!" 👦
  Maryam : "Kalau air di rumah?" 💧
  Maheer : "Untuk minum, mandi, & cuci tangan!" 
  Asiya  : "Aku minum air setiap hari!" 🥤👧
  Khadijah: "Matahari & air karunia Tuhan!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Matahari & air adalah **sumber energi**:
1. **Matahari** = cahaya & panas ☀️
2. **Air** = untuk kehidupan 💧

---

### 🔍 Ayo Cari di Rumahmu:
* Matahari untuk apa? 👉 **Jemur baju** 👕
* Air untuk apa? 👉 **Minum, mandi** 💧

Ayo jadi **Detektif Sumber Energi**! 🕵️‍♀️✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar sumber energi matahari & air!',
                ice_breaker:
                    'Ayo nyanyikan "Matahari" bersama-sama!',
                apperception:
                    'Apa manfaat matahari untuk kita? Apa manfaat air?',
                trigger_question:
                    'Apa manfaat matahari untuk kita? Apa manfaat air?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Matahari & air adalah sumber energi penting untuk kehidupan.',
                concrete_steps: [
                    'Jelaskan manfaat matahari.',
                    'Jelaskan manfaat air.',
                    'Tunjukkan gambar aktivitas yang memanfaatkannya.',
                    'Diskusi penggunaan sehari-hari.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Matahari memberi cahaya & panas. Air memberi kehidupan. Syukuri keduanya!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Manfaat',
                game_rules: [
                    'Guru menyebutkan aktivitas (menjemur baju, minum).',
                    'Anak menebak sumber energinya (matahari/air).',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan manfaat.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal sumber energi & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 7.1: Sumber Energi Matahari & Air',
                    instructions:
                        'Jodohkan aktivitas dengan sumber energinya, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan aktivitas dengan sumber energinya!',
                            data: {
                                pairs: [
                                    { left: '👕 Menjemur baju', right: '☀️ Matahari' },
                                    { left: '💡 Panel surya', right: '☀️ Matahari' },
                                    { left: '🚿 Mandi', right: '💧 Air' },
                                    { left: '🥤 Minum', right: '💧 Air' },
                                ],
                            },
                            answer_key: 'Jemur baju→matahari, Mandi→air.',
                            explanation: 'Mengenal manfaat sumber energi.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu memanfaatkan energi matahari!',
                            data: {
                                prompt: 'Aku manfaatkan matahari',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku manfaatkan matahari:',
                            },
                            answer_key: 'Anak menggambar.',
                            explanation: 'Melatih pemahaman.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa manfaat matahari, sayang?',
                    'Apa manfaat air?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 7.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 20: Listrik di Rumah',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal listrik sebagai sumber energi di rumah.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar benda listrik',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 💡 Listrik di Rumahku

Halo sahabat cilik! Listrik menyalakan **banyak benda** di rumah kita! 
Ayo **Asiya** dan **Fatimah** ajak kalian belajar! 🎉

---

### 🌟 1. Benda yang Menggunakan Listrik

| Benda | Fungsi | Emoji |
| :---: | :--- | :---: |
| **Lampu** | Penerangan | 💡 |
| **TV** | Hiburan | 📺 |
| **Kulkas** | Menyimpan makanan | 🧊 |
| **Kipas** | Pendingin | 🌀 |

---

### 🎭 Komik: Asiya & Fatimah Amati Listrik

\`\`\`text
  Asiya  : "Fatimah, apa yang menyalakan lampu?" 💡👧
  Fatimah: "Listrik! Kalau tidak ada listrik, gelap!" 👧
  Asiya  : "Kalau TV di rumahmu?" 📺
  Fatimah: "Pakai listrik juga!" 
  Maheer : "Kulkas di rumahku nyala terus!" 🧊👦
  Khadijah: "Listrik penting, tapi harus hemat!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Listrik menyalakan:
1. **Lampu** 💡
2. **TV** 📺
3. **Kulkas** 🧊
4. **Kipas** 🌀

Tapi kita harus **hemat listrik**!

---

### 🔍 Ayo Cek Benda Listrik:
* Ada **lampu**? 💡
* Ada **TV**? 📺
* Ada **kulkas**? 🧊

Ayo jadi **Detektif Listrik**! ⚡✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar listrik di rumah!',
                ice_breaker:
                    'Ayo tirukan suara TV: "Bzzz..." & suara kipas: "Wusss..."',
                apperception:
                    'Apa yang menyalakan lampu di rumahmu?',
                trigger_question:
                    'Benda apa di rumahmu yang menggunakan listrik?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Listrik menyalakan banyak benda di rumah.',
                concrete_steps: [
                    'Jelaskan listrik sebagai sumber energi.',
                    'Sebutkan benda listrik di rumah.',
                    'Tunjukkan gambar setiap benda.',
                    'Diskusi manfaatnya.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Listrik itu penting, tapi kita harus hemat. Matikan yang tidak dipakai!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Mati atau Nyala',
                game_rules: [
                    'Guru menyebutkan benda.',
                    'Anak menebak apakah pakai listrik/tidak.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menjelaskan manfaat.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal benda listrik.',
                worksheet_print_ready: {
                    title: 'LKPD 7.2: Listrik di Rumah',
                    instructions:
                        'Centang ✓ benda listrik yang ada di rumahmu!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ benda listrik yang ada di rumahmu!',
                            data: {
                                rules: [
                                    { name: 'Lampu', icon: '💡', description: 'Penerangan' },
                                    { name: 'TV', icon: '📺', description: 'Hiburan' },
                                    { name: 'Kulkas', icon: '🧊', description: 'Menyimpan makanan' },
                                    { name: 'Kipas', icon: '🌀', description: 'Pendingin' },
                                    { name: 'AC', icon: '❄️', description: 'Pendingin ruangan' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang benda listrik.',
                            explanation: 'Mengenal benda listrik.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah poster "Hemat Listrik!"',
                            data: {
                                prompt: 'Poster hemat listrik',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Poster hemat listrik:',
                            },
                            answer_key: 'Anak menggambar poster.',
                            explanation: 'Melatih kesadaran hemat.',
                        },
                    ],
                },
                reflection_questions: [
                    'Benda apa yang menggunakan listrik, sayang?',
                    'Mengapa harus hemat listrik?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 7.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 21: Ayo Hemat Energi!',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menunjukkan sikap hemat energi dalam kehidupan sehari-hari.',
            allocated_minutes: 45,
            required_materials: [
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌱 Ayo Hemat Energi!

Halo sahabat cilik! Hemat energi = **sayang bumi**! 
Ayo **Maheer** dan **Khadijah** ajak kalian belajar hemat! 🎉

---

### 🌟 1. Cara Hemat Energi

| Kegiatan | Emoji |
| :--- | :---: |
| Matikan lampu saat keluar | 💡 |
| Cabut charger saat tidak dipakai | 🔌 |
| Hemat air | 💧 |
| Matikan TV saat tidak ditonton | 📺 |
| Buka jendela pakai cahaya matahari | 🪟 |

---

### 🎭 Komik: Maheer & Khadijah Hemat Energi

\`\`\`text
  Maheer  : "Khadijah, aku matikan lampu tadi!" 💡👦
  Khadijah: "Hebat! Aku cabut charger setelah dipakai!" 🔌👧
  Maheer  : "Aku juga hemat air saat mandi!" 💧
  Khadijah: "Bagus! Hemat energi = sayang bumi!" 🌏
  Asiya   : "Aku buka jendela, pakai matahari!" 🪟👧
  Khadijah: "Kalian semua anak hemat energi!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Hemat energi dengan:
1. **Matikan lampu** saat keluar 💡
2. **Cabut charger** saat tidak dipakai 🔌
3. **Hemat air** 💧
4. **Buka jendela** pakai matahari 🪟

---

### 🔍 Ayo Cek Kebiasaanmu:
* Sudah matikan lampu? 💡
* Sudah cabut charger? 🔌
* Sudah hemat air? 💧

Ayo jadi **Pahlawan Hemat Energi**! ⚡✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar hemat energi!',
                ice_breaker:
                    'Ayo nyanyikan lagu "Hemat Energi" bersama-sama!',
                apperception:
                    'Bagaimana cara hemat listrik di rumah?',
                trigger_question:
                    'Bagaimana cara hemat energi di rumah?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Hemat energi = sayang bumi. Mulai dari kebiasaan kecil.',
                concrete_steps: [
                    'Jelaskan cara hemat lampu.',
                    'Jelaskan cara hemat air.',
                    'Jelaskan cara hemat listrik lainnya.',
                    'Diskusi manfaat hemat.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Matikan lampu, cabut charger, hemat air. Hemat energi = sayang bumi!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Hemat Energi!',
                game_rules: [
                    'Guru menyebutkan situasi.',
                    'Anak memeragakan hemat energi.',
                    'Yang paling tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Memeragakan dengan bantuan.',
                    child_level_advanced: 'Menjelaskan alasan.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Membiasakan hemat energi.',
                worksheet_print_ready: {
                    title: 'LKPD 7.3: Ayo Hemat Energi!',
                    instructions:
                        'Centang ✓ kegiatan hemat energi yang sudah kamu lakukan!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ kegiatan hemat energi yang sudah kamu lakukan!',
                            data: {
                                rules: [
                                    { name: 'Matikan lampu', icon: '💡', description: 'Saat keluar ruangan' },
                                    { name: 'Cabut charger', icon: '🔌', description: 'Saat tidak dipakai' },
                                    { name: 'Hemat air', icon: '💧', description: 'Matikan keran' },
                                    { name: 'Matikan TV', icon: '📺', description: 'Saat tidak ditonton' },
                                    { name: 'Buka jendela', icon: '🪟', description: 'Pakai cahaya matahari' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang kegiatan.',
                            explanation: 'Melatih kebiasaan hemat.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu mematikan lampu!',
                            data: {
                                prompt: 'Aku hemat listrik',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku hemat listrik:',
                            },
                            answer_key: 'Anak menggambar.',
                            explanation: 'Melatih kesadaran.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa itu hemat energi, sayang?',
                    'Mengapa penting?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyebutkan 3 cara hemat energi!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 7: Sumber Energi di Rumah',
                    quiz_question_count: 5,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Sumber energi utama di bumi adalah...',
                            option_a: 'Bulan',
                            option_b: 'Matahari',
                            option_c: 'Bintang',
                            option_d: 'Awan',
                            correct_answer: 'B',
                            explanation: 'Matahari sumber energi utama.',
                        },
                        {
                            question_text: 'Contoh benda yang menggunakan listrik adalah...',
                            option_a: 'Batu',
                            option_b: 'Lampu',
                            option_c: 'Kayu',
                            option_d: 'Air',
                            correct_answer: 'B',
                            explanation: 'Lampu pakai listrik.',
                        },
                        {
                            question_text: 'Cara hemat listrik antara lain...',
                            option_a: 'Matikan lampu saat keluar',
                            option_b: 'Nyalakan semua lampu',
                            option_c: 'Biarkan TV menyala',
                            option_d: 'Tidak cabut charger',
                            correct_answer: 'A',
                            explanation: 'Matikan lampu saat keluar.',
                        },
                        {
                            question_text: 'Manfaat matahari untuk kehidupan adalah...',
                            option_a: 'Memberi cahaya & panas',
                            option_b: 'Membuat gelap',
                            option_c: 'Membuat dingin',
                            option_d: 'Membuat hujan',
                            correct_answer: 'A',
                            explanation: 'Matahari memberi cahaya & panas.',
                        },
                        {
                            question_text: 'Air berguna untuk...',
                            option_a: 'Minum & mandi',
                            option_b: 'Membakar',
                            option_c: 'Menyalakan lampu',
                            option_d: 'Menghangatkan',
                            correct_answer: 'A',
                            explanation: 'Air untuk minum & mandi.',
                        },
                    ],
                },
            ],
        },
    ],
};

// =============================================================================
// BAB 8: LANGIT DAN BINTANG
// =============================================================================
const BAB_8: SeedModuleItem = {
    title: 'Bab 8: Langit dan Bintang',
    order_index: 8,
    target_semester: 2,
    week_target: 22,
    lessons: [
        {
            title: 'Pertemuan 22: Matahari & Bulan',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal matahari & bulan sebagai benda langit beserta cirinya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar matahari & bulan',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ☀️🌙 Ayo Kenalan dengan Matahari & Bulan!

Halo sahabat cilik! Di langit ada **matahari & bulan** yang indah! 
Ayo **Maryam** dan **Fatimah** ajak kalian berkenalan! 🎉

---

### 🌟 1. Dua Benda Langit Ajaib

| Benda | Muncul | Ciri | Emoji |
| :---: | :--- | :--- | :---: |
| **Matahari** | Siang hari | Panas & terang | ☀️ |
| **Bulan** | Malam hari | Bercahaya lembut | 🌙 |

---

### 🎭 Komik: Maryam & Fatimah Amati Langit

\`\`\`text
  Maryam : "Fatimah, lihat! Matahari terang sekali!" ☀️👧
  Fatimah: "Iya! Matahari muncul siang hari!" 👧
  Maryam : "Kalau malam?" 🌙
  Fatimah: "Bulan muncul! Bercahaya lembut!" 
  Maheer : "Aku suka lihat bulan purnama!" 🌕👦
  Khadijah: "Matahari & bulan ciptaan Tuhan!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
* **Matahari** = muncul siang, panas & terang ☀️
* **Bulan** = muncul malam, bercahaya lembut 🌙

---

### 🔍 Ayo Amati Langit:
* Siang hari, ada apa? 👉 **Matahari** ☀️
* Malam hari, ada apa? 👉 **Bulan & bintang** 🌙⭐

Ayo jadi **Pengamat Langit**! 🌌✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar matahari & bulan!',
                ice_breaker:
                    'Ayo nyanyikan "Bintang Kecil" bersama-sama!',
                apperception:
                    'Apa yang terlihat di langit siang? Apa yang terlihat di langit malam?',
                trigger_question:
                    'Apa yang terlihat di langit siang? Apa yang terlihat di langit malam?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Matahari muncul siang, bulan muncul malam. Keduanya ciptaan Tuhan.',
                concrete_steps: [
                    'Jelaskan matahari: muncul siang, panas & terang.',
                    'Jelaskan bulan: muncul malam, bercahaya lembut.',
                    'Tunjukkan gambar keduanya.',
                    'Diskusi keindahan langit.',
                    'Beri apresiasi setiap jawaban.',
                ],
                script_parent:
                    '"Matahari & bulan adalah ciptaan Tuhan yang indah. Yuk, amati & syukuri!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Siang atau Malam',
                game_rules: [
                    'Guru menyebutkan ciri.',
                    'Anak menebak waktu (siang/malam).',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan.',
                    child_level_advanced: 'Menjelaskan lebih detail.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal matahari & bulan.',
                worksheet_print_ready: {
                    title: 'LKPD 8.1: Matahari & Bulan',
                    instructions:
                        'Jodohkan ciri dengan benda langit, lalu warnai!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'MATCH_PAIRS',
                            question: 'Jodohkan ciri dengan benda langit yang tepat!',
                            data: {
                                pairs: [
                                    { left: '☀️ Muncul siang', right: 'Matahari' },
                                    { left: '🌙 Muncul malam', right: 'Bulan' },
                                    { left: '🔥 Panas & terang', right: 'Matahari' },
                                    { left: '✨ Bercahaya lembut', right: 'Bulan' },
                                ],
                            },
                            answer_key: 'Siang→matahari, Malam→bulan.',
                            explanation: 'Mengenal matahari & bulan.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah langit siang & langit malam!',
                            data: {
                                prompt: 'Langit siang & malam',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Langit siang & malam:',
                            },
                            answer_key: 'Anak menggambar 2 suasana.',
                            explanation: 'Melatih pengamatan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa bedanya matahari & bulan, sayang?',
                    'Kapan matahari muncul?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 8.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 23: Bintang di Langit',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal bintang di langit malam sebagai ciptaan Tuhan.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar langit malam',
                'Kertas',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# ⭐ Bintang di Langit Malam

Halo sahabat cilik! Bintang adalah **lampu kecil** di langit malam! 
Ayo **Asiya** dan **Maheer** ajak kalian berkenalan! 🎉

---

### 🌟 1. Ciri-Ciri Bintang

| Ciri | Keterangan | Emoji |
| :--- | :--- | :---: |
| **Muncul** | Malam hari | 🌙 |
| **Warna** | Bercahaya terang | ✨ |
| **Jumlah** | Banyak sekali | ⭐⭐⭐ |
| **Bentuk** | Kecil & berkilau | 🌟 |

---

### 🎭 Komik: Asiya & Maheer Amati Bintang

\`\`\`text
  Asiya  : "Maheer, lihat langit! Banyak bintang!" ⭐👧
  Maheer : "Iya! Seperti lampu kecil berkilau!" 👦
  Asiya  : "Aku suka lihat bintang!" 
  Maheer : "Ayo hitung bintangnya!" 1, 2, 3... 
  Fatimah: "Bintang ciptaan Tuhan yang indah!" 👧✨
  Khadijah: "Mari bersyukur melihatnya!" 👧
\`\`\`

---

### 💡 Yang Perlu Diingat:
Bintang:
1. Muncul **malam hari** 🌙
2. **Bercahaya** terang ✨
3. **Banyak sekali** ⭐
4. **Ciptaan Tuhan** 💫

---

### 🔍 Ayo Amati Langit Malam:
* Ada **bintang**? ⭐
* Berapa banyak? 👉 **Banyak sekali!**
* Warna apa? 👉 **Bercahaya terang!**

Ayo jadi **Pengamat Bintang**! 🌌✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita belajar bintang di langit!',
                ice_breaker:
                    'Ayo nyanyikan "Bintang Kecil" bersama-sama!',
                apperception:
                    'Siapa yang pernah lihat bintang di langit malam?',
                trigger_question:
                    'Apa yang terlihat di langit malam? Bagaimana bentuknya?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Bintang bersinar di langit malam, ciptaan Tuhan yang indah.',
                concrete_steps: [
                    'Jelaskan bintang: muncul malam, bercahaya.',
                    'Tunjukkan gambar langit berbintang.',
                    'Ajak anak menghitung bintang.',
                    'Diskusi keindahan.',
                    'Beri apresiasi setiap pengamatan.',
                ],
                script_parent:
                    '"Bintang adalah lampu kecil di langit. Indah sekali ciptaan Tuhan!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Hitung Bintang',
                game_rules: [
                    'Guru menunjukkan gambar bintang.',
                    'Anak menghitung jumlahnya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menghitung 1-5 bintang.',
                    child_level_advanced: 'Menghitung hingga 10.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal bintang & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 8.2: Bintang di Langit',
                    instructions:
                        'Hitung bintang & warnai gambar berikut!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'PICT_COUNT',
                            question: 'Hitung jumlah bintang berikut!',
                            data: { total: 8, symbol: '⭐' },
                            answer_key: '8 (delapan)',
                            explanation: 'Menghitung bintang.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah langit malam dengan banyak bintang!',
                            data: {
                                prompt: 'Langit malam',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Langit malam:',
                            },
                            answer_key: 'Anak menggambar langit.',
                            explanation: 'Melatih kreativitas.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa itu bintang, sayang?',
                    'Kapan bintang terlihat?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 8.2, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 24: Indahnya Alam Semesta',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengagumi keindahan alam semesta sebagai ciptaan Tuhan dan mensyukurinya.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar alam semesta',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🌌 Indahnya Alam Semesta!

Halo sahabat cilik! Alam semesta ini **indah sekali**! 
Ayo **semua sahabat** — Maryam, Asiya, Fatimah, Maheer, Khadijah — ajak kalian bersyukur! 🎉

---

### 🌟 1. Benda Langit Ciptaan Tuhan

| Benda | Kapan Muncul | Emoji |
| :---: | :--- | :---: |
| **Matahari** | Siang hari | ☀️ |
| **Bulan** | Malam hari | 🌙 |
| **Bintang** | Malam hari | ⭐ |
| **Awan** | Siang/malam | ☁️ |

---

### 🎭 Komik: Semua Sahabat Amati Langit

\`\`\`text
  Maryam  : "Lihat! Matahari terbit!" ☀️👧
  Asiya   : "Siang nanti ada awan putih!" ☁️👧
  Fatimah : "Malam ada bulan & bintang!" 🌙⭐👧
  Maheer  : "Indah sekali ya!" 👦
  Khadijah: "Semua ciptaan Tuhan. Kita harus bersyukur!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Alam semesta berisi:
1. **Matahari** ☀️
2. **Bulan** 🌙
3. **Bintang** ⭐
4. **Awan** ☁️

Semuanya ciptaan Tuhan yang indah! 🌌

---

### 🔍 Ayo Amati Langit:
* Siang hari? 👉 **Matahari & awan** ☀️☁️
* Malam hari? 👉 **Bulan & bintang** 🌙⭐
* Bagaimana perasaanmu? 👉 **Kagum & bersyukur!** 💖

Ayo jadi **Anak yang Bersyukur**! 🌌✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita mengagumi keindahan alam semesta!',
                ice_breaker:
                    'Ayo nyanyikan "Bintang Kecil" bersama-sama!',
                apperception:
                    'Apa saja yang ada di langit? Bagaimana rasanya melihatnya?',
                trigger_question:
                    'Apa saja yang ada di langit? Bagaimana rasanya melihatnya?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Alam semesta indah, ciptaan Tuhan yang harus disyukuri.',
                concrete_steps: [
                    'Jelaskan matahari, bulan, bintang, awan.',
                    'Tunjukkan gambar setiap benda langit.',
                    'Diskusi keindahan.',
                    'Ajak anak bersyukur.',
                    'Beri apresiasi.',
                ],
                script_parent:
                    '"Langit, matahari, bulan, bintang - semuanya ciptaan Tuhan. Yuk, syukuri!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Tebak Benda Langit',
                game_rules: [
                    'Guru menyebutkan ciri.',
                    'Anak menebak benda langit.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan.',
                    child_level_advanced: 'Menjelaskan ciri lebih banyak.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar langit lengkap & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 8.3: Indahnya Alam Semesta',
                    instructions:
                        'Gambarlah pemandangan langit lengkap (matahari/bulan, bintang, awan)!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah pemandangan langit indah dengan matahari atau bulan, bintang, dan awan!',
                            data: {
                                prompt: 'Langit indah',
                                guideLines: 'none',
                                rows: 2,
                                label: 'Langit indahku:',
                            },
                            answer_key: 'Anak menggambar langit lengkap.',
                            explanation: 'Melatih kreativitas & syukur.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ benda langit yang sudah kamu lihat!',
                            data: {
                                rules: [
                                    { name: 'Matahari', icon: '☀️', description: 'Siang hari' },
                                    { name: 'Bulan', icon: '🌙', description: 'Malam hari' },
                                    { name: 'Bintang', icon: '⭐', description: 'Malam hari' },
                                    { name: 'Awan', icon: '☁️', description: 'Siang/malam' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang benda langit.',
                            explanation: 'Melatih pengamatan.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa saja benda langit, sayang?',
                    'Bagaimana perasaanmu melihat keindahan langit?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil gambar langit pada LKPD 8.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 8: Langit dan Bintang',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Benda langit yang muncul siang hari adalah...',
                            option_a: 'Bulan',
                            option_b: 'Matahari',
                            option_c: 'Bintang',
                            option_d: 'Awan gelap',
                            correct_answer: 'B',
                            explanation: 'Matahari muncul siang hari.',
                        },
                        {
                            question_text: 'Benda langit yang bersinar di malam hari adalah...',
                            option_a: 'Matahari',
                            option_b: 'Bintang',
                            option_c: 'Awan putih',
                            option_d: 'Pelangi',
                            correct_answer: 'B',
                            explanation: 'Bintang bersinar malam hari.',
                        },
                        {
                            question_text: 'Bintang terlihat seperti...',
                            option_a: 'Batu besar',
                            option_b: 'Lampu kecil berkilau',
                            option_c: 'Awan gelap',
                            option_d: 'Air',
                            correct_answer: 'B',
                            explanation: 'Bintang seperti lampu kecil berkilau.',
                        },
                        {
                            question_text: 'Alam semesta adalah ciptaan...',
                            option_a: 'Manusia',
                            option_b: 'Tuhan Yang Maha Esa',
                            option_c: 'Hewan',
                            option_d: 'Tumbuhan',
                            correct_answer: 'B',
                            explanation: 'Alam semesta ciptaan Tuhan.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const IPAS_BATCH_4: SeedModuleItem[] = [BAB_7, BAB_8];