// data/pkn-batch-2.ts
// Bab 3: Aku Mengenal Indonesia (Semester 2)
// Konten 100% ramah anak — karakter: Maryam, Asiya, Fatimah, Maheer, Khadijah

import type { SeedModuleItem } from './types';

// =============================================================================
// BAB 3: AKU MENGENAL INDONESIA
// =============================================================================
const BAB_3: SeedModuleItem = {
    title: 'Bab 3: Aku Mengenal Indonesia',
    order_index: 3,
    target_semester: 2,
    week_target: 7,
    lessons: [
        {
            title: 'Pertemuan 7: Aku Mengenal Bendera Indonesia',
            order_index: 1,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal bendera Indonesia (Merah Putih), menyebutkan makna warnanya, dan menunjukkan sikap hormat.',
            allocated_minutes: 45,
            required_materials: [
                'Bendera Merah Putih mini',
                'Kertas gambar',
                'Pensil warna (merah & putih)',
                'LKPD',
            ],
            content_text: `# 🇮🇩 Ayo Kenalan dengan Bendera Indonesia!

Halo sahabat cilik! Indonesia punya bendera **Merah Putih** yang indah! 
Ayo **Maryam** dan **Maheer** ajak kalian berkenalan! 🎉

---

### 🌟 1. Bendera Merah Putih

| Warna | Arti | Emoji |
| :---: | :--- | :---: |
| **Merah** | Berani | ❤️ |
| **Putih** | Suci | 🤍 |

**Bendera Merah Putih** = lambang negara Indonesia! 🇮🇩

---

### 🎭 Komik: Maryam & Maheer Hormat Bendera

\`\`\`text
  Maryam : "Maheer, lihat! Bendera Indonesia!" 🇮🇩👧
  Maheer : "Warnanya merah & putih!" 👦
  Maryam : "Merah artinya berani, putih artinya suci!" ❤️🤍
  Asiya  : "Aku berdiri tegak saat upacara!" 🧍👧
  Fatimah: "Aku juga hormat!" 🫡👧
  Khadijah: "Kita bangga jadi anak Indonesia!" 👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Bendera **Merah Putih**:
1. **Merah** = berani ❤️
2. **Putih** = suci 🤍

Saat upacara bendera, kita:
* Berdiri **tegak** 🧍
* **Hormat** 🫡
* **Tidak bicara** 🤫

---

### 🔍 Ayo Cek Sendiri:
* Apa warna bendera Indonesia? 🇮🇩
* Apa arti merah? ❤️
* Apa arti putih? 🤍

Ayo jadi **Anak Cinta Indonesia**! 🇮🇩✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan bendera Indonesia!',
                ice_breaker:
                    'Ayo nyanyikan "Bendera Merah Putih" bersama-sama!',
                apperception:
                    'Siapa yang tahu warna bendera Indonesia?',
                trigger_question:
                    'Apa warna bendera Indonesia? Apa makna warnanya?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Bendera Merah Putih adalah lambang negara Indonesia.',
                concrete_steps: [
                    'Tunjukkan bendera mini.',
                    'Jelaskan makna merah & putih.',
                    'Tunjukkan sikap hormat saat upacara.',
                    'Anak berlatih berdiri tegak & hormat.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Bendera Merah Putih adalah lambang negara kita. Merah artinya berani, putih artinya suci."',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Permainan Bendera',
                game_rules: [
                    'Anak mencari benda merah & putih di kelas.',
                    'Yang paling banyak dapat bintang emas ⭐.',
                    'Akhiri dengan menyanyikan lagu "Bendera Merah Putih".',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Mencari benda dengan bantuan guru.',
                    child_level_advanced: 'Menyebutkan 5 benda merah & putih.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menggambar bendera Indonesia.',
                worksheet_print_ready: {
                    title: 'LKPD 3.1: Aku Mengenal Bendera Indonesia',
                    instructions:
                        'Gambar & warnai bendera Indonesia dengan rapi!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah bendera Indonesia! Warnai merah di atas, putih di bawah.',
                            data: {
                                prompt: 'Bendera Merah Putih',
                                guideLines: 'baseline',
                                rows: 1,
                                label: 'Bendera Indonesia:',
                            },
                            answer_key: 'Anak menggambar bendera merah atas, putih bawah.',
                            explanation: 'Mengenal simbol negara.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'EXPRESSION_CARD',
                            question: 'Bagaimana perasaanmu sebagai anak Indonesia?',
                            data: {
                                question: 'Bagaimana perasaanmu sebagai anak Indonesia?',
                                options: [
                                    { emoji: '😊', label: 'Bangga & Cinta Indonesia' },
                                    { emoji: '😐', label: 'Biasa Saja' },
                                    { emoji: '😢', label: 'Belum Tahu' },
                                ],
                            },
                            answer_key: 'Refleksi personal anak.',
                            explanation: 'Menumbuhkan cinta tanah air.',
                        },
                    ],
                },
                reflection_questions: [
                    'Apa warna bendera Indonesia, sayang?',
                    'Apa arti warna merah & putih?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil menggambar bendera pada LKPD 3.1, lalu kirim ke Ibu/Bapak Guru!',
                },
            ],
        },
        {
            title: 'Pertemuan 8: Aku Mengenal Lagu Indonesia Raya',
            order_index: 2,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat menyanyikan lagu Indonesia Raya dengan sikap hormat dan memahami maknanya.',
            allocated_minutes: 45,
            required_materials: [
                'Teks lagu Indonesia Raya',
                'Speaker',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🎵 Ayo Kenalan dengan Lagu Indonesia Raya!

Halo sahabat cilik! Indonesia punya **lagu kebangsaan** yang indah! 
Ayo **Asiya** dan **Fatimah** ajak kalian menyanyikannya! 🎉

---

### 🌟 1. Lagu Indonesia Raya

**Ciptaan:** W.R. Supratman 🇮🇩

**Dinyanyikan saat:**
* Upacara bendera 🚩
* Hari besar nasional 🎉

**Sikap saat menyanyikan:**
* Berdiri **tegak** 🧍
* **Hormat** 🫡
* **Khidmat** 💖

---

### 🎭 Komik: Asiya & Fatimah Nyanyi Indonesia Raya

\`\`\`text
  Asiya  : "Fatimah, ayo nyanyikan Indonesia Raya!" 🎵👧
  Fatimah: "Indonesia tanah air beta..." 🇮🇩👧
  Asiya  : "Pusaka abadi nan jaya!" ✨
  Maheer : "Aku berdiri tegak saat menyanyikan!" 🧍👦
  Khadijah: "Lagu ini menyatukan Indonesia!" 👧
  Maryam : "Aku bangga jadi anak Indonesia!" 🇮🇩👧
\`\`\`

---

### 💡 Yang Perlu Diingat:
Lagu Indonesia Raya:
1. Ciptaan **W.R. Supratman** 🎵
2. Dinyanyikan saat **upacara** 🚩
3. Sikap **tegak & hormat** 🧍🫡

---

### 🔍 Ayo Cek Sendiri:
* Siapa pencipta Indonesia Raya? 👉 **W.R. Supratman**
* Kapan dinyanyikan? 👉 **Saat upacara**
* Bagaimana sikapnya? 👉 **Tegak & hormat**

Ayo jadi **Anak yang Hormat**! 🇮🇩✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita menyanyikan lagu Indonesia Raya!',
                ice_breaker:
                    'Ayo berdiri tegak & siap menyanyikan Indonesia Raya!',
                apperception:
                    'Siapa yang sudah hafal lagu Indonesia Raya?',
                trigger_question:
                    'Siapa yang tahu lagu kebangsaan Indonesia?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Indonesia Raya adalah lagu kebangsaan yang harus dihormati.',
                concrete_steps: [
                    'Jelaskan sejarah singkat lagu Indonesia Raya.',
                    'Anak menyanyikan bait pertama.',
                    'Ajarkan sikap berdiri tegak & hormat.',
                    'Anak berlatih 3x.',
                    'Beri apresiasi setiap usaha.',
                ],
                script_parent:
                    '"Lagu Indonesia Raya adalah lagu kebangsaan kita. Nyanyikan dengan hormat!"',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sambung Lirik Indonesia Raya',
                game_rules: [
                    'Guru menyanyikan 1 baris lirik.',
                    'Anak melanjutkan baris berikutnya.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menyambung dengan bantuan guru.',
                    child_level_advanced: 'Menyanyikan solo.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Menyanyikan Indonesia Raya & refleksi.',
                worksheet_print_ready: {
                    title: 'LKPD 3.2: Aku Mengenal Lagu Indonesia Raya',
                    instructions:
                        'Centang ✓ sikap yang sudah kamu lakukan saat menyanyikan Indonesia Raya!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'RULES_CARD',
                            question:
                                'Centang ✓ sikap saat menyanyikan Indonesia Raya!',
                            data: {
                                rules: [
                                    { name: 'Berdiri tegak', icon: '🧍', description: 'Sikap sempurna' },
                                    { name: 'Hormat', icon: '🫡', description: 'Tangan kanan hormat' },
                                    { name: 'Tidak bicara', icon: '🤫', description: 'Diam saat menyanyi' },
                                    { name: 'Khidmat', icon: '🎵', description: 'Menyanyi sungguh-sungguh' },
                                ],
                                showCheckbox: true,
                            },
                            answer_key: 'Anak mencentang sikap yang dilakukan.',
                            explanation: 'Melatih sikap hormat.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah dirimu menyanyikan Indonesia Raya dengan sikap hormat!',
                            data: {
                                prompt: 'Menyanyikan Indonesia Raya',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Aku menyanyikan Indonesia Raya:',
                            },
                            answer_key: 'Anak menggambar diri menyanyikan.',
                            explanation: 'Melatih cinta tanah air.',
                        },
                    ],
                },
                reflection_questions: [
                    'Siapa pencipta lagu Indonesia Raya, sayang?',
                    'Bagaimana sikap saat menyanyikannya?',
                ],
            },
            assignments: [
                {
                    type: 'VOICE_TASK',
                    prompt:
                        'Rekam suaramu menyanyikan Indonesia Raya bait pertama dengan sikap hormat!',
                },
            ],
        },
        {
            title: 'Pertemuan 9: Aku Mengenal Lambang Garuda Pancasila',
            order_index: 3,
            content_type: 'TEXT',
            learning_objectives:
                'Anak dapat mengenal lambang Garuda Pancasila dan menyebutkan 5 simbol sila Pancasila.',
            allocated_minutes: 45,
            required_materials: [
                'Gambar Garuda Pancasila',
                'Kertas gambar',
                'Pensil warna',
                'LKPD',
            ],
            content_text: `# 🦅 Ayo Kenalan dengan Garuda Pancasila!

Halo sahabat cilik! Indonesia punya **lambang negara** yang gagah! 
Ayo **Maryam** dan **Khadijah** ajak kalian berkenalan! 🎉

---

### 🌟 1. Lima Simbol Pancasila

| Sila | Simbol | Emoji |
| :---: | :--- | :---: |
| **1** | Bintang | ⭐ |
| **2** | Rantai | 🔗 |
| **3** | Pohon Beringin | 🌳 |
| **4** | Kepala Banteng | 🐂 |
| **5** | Padi & Kapas | 🌾 |

---

### 🎭 Komik: Maryam & Khadijah Kenal Pancasila

\`\`\`text
  Maryam  : "Khadijah, apa itu Pancasila?" 🦅👧
  Khadijah: "Pancasila adalah dasar negara kita!" 👧
  Maryam  : "Ada berapa silanya?" 
  Khadijah: "Ada 5! Sila 1 bintang, sila 2 rantai..." ⭐🔗
  Maheer  : "Sila 3 pohon beringin! Sila 4 kepala banteng!" 🌳🐂👦
  Khadijah: "Sila 5 padi & kapas!" 🌾👧✨
\`\`\`

---

### 💡 Yang Perlu Diingat:
Pancasila punya **5 sila** dengan simbol:
1. **Bintang** ⭐
2. **Rantai** 🔗
3. **Pohon Beringin** 🌳
4. **Kepala Banteng** 🐂
5. **Padi & Kapas** 🌾

---

### 🔍 Ayo Cek Sendiri:
* Ada berapa sila? 👉 **5**
* Simbol sila 1? 👉 **Bintang** ⭐
* Simbol sila 5? 👉 **Padi & kapas** 🌾

Ayo jadi **Anak Cinta Pancasila**! 🦅✨`,
            intro_guide: {
                duration_minutes: 5,
                greeting:
                    'Halo anak hebat! Hari ini kita berkenalan dengan Garuda Pancasila!',
                ice_breaker:
                    'Ayo nyanyikan "Garuda Pancasila" bersama-sama!',
                apperception:
                    'Siapa yang tahu apa itu Pancasila?',
                trigger_question:
                    'Ada berapa sila dalam Pancasila?',
            },
            mindful_guide: {
                duration_minutes: 15,
                concept_focus:
                    'Pancasila punya 5 sila dengan simbol masing-masing.',
                concrete_steps: [
                    'Tunjukkan gambar Garuda Pancasila.',
                    'Sebutkan 5 simbol sila.',
                    'Anak menghafal bunyi 5 sila.',
                    'Tunjukkan setiap simbol.',
                    'Beri apresiasi setiap hafalan.',
                ],
                script_parent:
                    '"Pancasila adalah dasar negara. Ada 5 sila dengan simbol masing-masing."',
            },
            joyful_guide: {
                duration_minutes: 15,
                game_title: 'Sebut Sila!',
                game_rules: [
                    'Guru menyebutkan tindakan sehari-hari.',
                    'Anak menebak sila yang sesuai.',
                    'Yang paling cepat & tepat dapat bintang emas ⭐.',
                ],
                multi_grade_adaptation: {
                    child_level_basic: 'Menebak dengan bantuan guru.',
                    child_level_advanced: 'Menyebutkan bunyi sila lengkap.',
                },
            },
            meaningful_guide: {
                duration_minutes: 8,
                task_focus: 'Mengenal simbol Pancasila.',
                worksheet_print_ready: {
                    title: 'LKPD 3.3: Aku Mengenal Lambang Garuda Pancasila',
                    instructions:
                        'Jodohkan simbol Pancasila dengan nomor sila yang benar!',
                    section_a_basic: [
                        {
                            id: 1,
                            type: 'SYMBOL_CARD',
                            question:
                                'Isi nama sila yang sesuai dengan simbol Pancasila!',
                            data: {
                                symbols: [
                                    { sila: 1, name: 'Ketuhanan Yang Maha Esa', icon: '⭐', meaning: 'Bintang — cahaya Tuhan' },
                                    { sila: 2, name: 'Kemanusiaan yang Adil dan Beradab', icon: '🔗', meaning: 'Rantai — persatuan manusia' },
                                    { sila: 3, name: 'Persatuan Indonesia', icon: '🌳', meaning: 'Pohon beringin — tempat berteduh' },
                                    { sila: 4, name: 'Kerakyatan yang Dipimpin oleh Hikmat', icon: '🐂', meaning: 'Kepala banteng — musyawarah' },
                                    { sila: 5, name: 'Keadilan Sosial bagi Seluruh Rakyat', icon: '🌾', meaning: 'Padi & kapas — kesejahteraan' },
                                ],
                            },
                            answer_key: 'Anak menuliskan bunyi sila sesuai simbol.',
                            explanation: 'Mengenal simbol & bunyi sila.',
                        },
                    ],
                    section_b_enrichment: [
                        {
                            id: 2,
                            type: 'DRAWING_FRAME',
                            question:
                                'Gambarlah salah satu simbol Pancasila yang paling kamu sukai!',
                            data: {
                                prompt: 'Simbol Pancasila favoritku',
                                guideLines: 'none',
                                rows: 1,
                                label: 'Simbol favoritku:',
                            },
                            answer_key: 'Anak menggambar simbol Pancasila.',
                            explanation: 'Melatih kreativitas & pemahaman.',
                        },
                    ],
                },
                reflection_questions: [
                    'Ada berapa sila, sayang?',
                    'Simbol sila ke-1 apa?',
                ],
            },
            assignments: [
                {
                    type: 'PHOTO_HOMEWORK',
                    prompt:
                        'Foto hasil LKPD 3.3, lalu kirim ke Ibu/Bapak Guru!',
                },
                {
                    type: 'QUIZ_CBT',
                    prompt: 'Kuis Bab 3: Aku Mengenal Indonesia',
                    quiz_question_count: 4,
                    passing_score: 70,
                    quiz_questions: [
                        {
                            question_text: 'Warna bendera Indonesia adalah...',
                            option_a: 'Merah dan Putih',
                            option_b: 'Merah dan Biru',
                            option_c: 'Putih dan Hijau',
                            option_d: 'Biru dan Kuning',
                            correct_answer: 'A',
                            explanation: 'Bendera Indonesia Merah Putih.',
                        },
                        {
                            question_text: 'Lagu kebangsaan Indonesia adalah...',
                            option_a: 'Garuda Pancasila',
                            option_b: 'Indonesia Raya',
                            option_c: 'Bendera Merah Putih',
                            option_d: 'Hari Merdeka',
                            correct_answer: 'B',
                            explanation: 'Lagu kebangsaan = Indonesia Raya.',
                        },
                        {
                            question_text: 'Simbol sila ke-1 Pancasila adalah...',
                            option_a: 'Rantai',
                            option_b: 'Bintang',
                            option_c: 'Pohon Beringin',
                            option_d: 'Padi dan Kapas',
                            correct_answer: 'B',
                            explanation: 'Sila 1 = bintang.',
                        },
                        {
                            question_text: 'Jumlah sila dalam Pancasila adalah...',
                            option_a: '3',
                            option_b: '4',
                            option_c: '5',
                            option_d: '6',
                            correct_answer: 'C',
                            explanation: 'Pancasila punya 5 sila.',
                        },
                    ],
                },
            ],
        },
    ],
};

export const PKN_BATCH_2: SeedModuleItem[] = [BAB_3];