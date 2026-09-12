import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

function loadEnv(): void {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim();
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Kredensial Supabase belum ditemukan di .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type LkpdItemType =
  | 'PICT_COUNT'
  | 'NUMBER_BOND'
  | 'SHAPE_CARD'
  | 'TEN_FRAME'
  | 'LENGTH_COMPARE'
  | 'PICT_CHART'
  | 'MATH_PROBLEM';

export interface LkpdItem {
  id: string | number;
  type: LkpdItemType;
  question: string;
  answer_key?: string;
  explanation?: string;
  data?: Record<string, unknown>;
}

interface LessonItem {
  title: string;
  order_index: number;
  learning_objectives: string;
  content_text: string;
  required_materials: string[];
  intro_guide: {
    duration_minutes: number;
    greeting: string;
    ice_breaker: string;
    apperception: string;
    trigger_question: string;
  };
  mindful_guide: {
    duration_minutes: number;
    concept_focus: string;
    concrete_steps: string[];
    script_parent: string;
  };
  joyful_guide: {
    duration_minutes: number;
    game_title: string;
    game_rules: string[];
    multi_grade_adaptation: {
      child_level_basic: string;
      child_level_advanced: string;
    };
  };
  meaningful_guide: {
    duration_minutes: number;
    task_focus: string;
    worksheet_print_ready: {
      title: string;
      instructions: string;
      section_a_basic: LkpdItem[];
      section_b_enrichment: LkpdItem[];
    };
    reflection_questions: string[];
  };
  assignments: Array<{
    type: 'PHOTO_HOMEWORK' | 'VOICE_TASK' | 'QUIZ_CBT';
    prompt: string;
    quiz_questions?: Array<{
      question_text: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_answer: 'A' | 'B' | 'C' | 'D';
    }>;
  }>;
}

interface ChapterItem {
  chapter_number: number;
  title: string;
  target_semester: number;
  week_target: number;
  lessons: LessonItem[];
}

const CHAPTERS_DATA: ChapterItem[] = [
  // ===========================================================================
  // BAB 1: AYO MEMBILANG SAMPAI DENGAN 10 (5 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 1,
    title: 'Bab 1: Ayo Membilang sampai dengan 10',
    target_semester: 1,
    week_target: 1,
    lessons: [
      {
        title: 'Pertemuan 1: Membilang dan Menulis Angka 1–5',
        order_index: 1,
        learning_objectives: 'Peserta didik membilang benda konkret 1-5 dengan korespondensi satu-satu dan menuliskan lambang bilangan 1-5 secara benar.',
        content_text: 'Fokus materi adalah pemahaman kuantitas melalui sentuhan fisik benda nyata dan menghubungkannya dengan lambang angka 1 sampai 5.',
        required_materials: ['5 buah sendok makan', 'Kartu angka 1-5', 'Buku kotak berpetak'],
        intro_guide: {
          duration_minutes: 10,
          greeting: 'Beri tos tangan: "Selamat pagi! Siap berburu angka 1 sampai 5 hari ini?"',
          ice_breaker: 'Tepuk Berirama: Ayah bertepuk tangan acak 1-5 kali, anak melompat sesuai jumlah tepukan.',
          apperception: 'Tunjukkan 1 tangan: "Ada berapa jari tangan kanan kita? Ayo hitung bersama."',
          trigger_question: 'Jika Ayah memegang 3 sendok lalu meletakkan 1 lagi di meja, bagaimana jarimu menunjukkannya?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Korespondensi satu-satu benda fisik dengan lambang angka 1-5.',
          concrete_steps: [
            'Bariskan 5 sendok di meja.',
            'Minta anak menyentuh tiap sendok sambil menyebut angkanya: 1, 2, 3, 4, 5.',
            'Cocokkan kartu angka 1-5 di samping masing-masing sendok.'
          ],
          script_parent: '"Setiap satu sentuhan jari pada sendok mewakili tepat satu angka."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Misi Ambil Benda 1-5',
          game_rules: ['Ayah tunjukkan kartu angka, anak berlari mengambil benda sejumlah angka tersebut.'],
          multi_grade_adaptation: {
            child_level_basic: 'Mengambil 1-5 benda dengan sentuhan fisik.',
            child_level_advanced: 'Mengambil benda sejumlah angka yang dikalikan dua.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menghitung ikon visual dan menulis lambang angka 1-5.',
          worksheet_print_ready: {
            title: 'LKPD 1.1: MENULIS LAMBANG BILANGAN 1-5',
            instructions: 'Hitung benda pada gambar visual, lalu tuliskan lambang bilangannya di kotak jawaban.',
            section_a_basic: [
              { id: 1, type: 'PICT_COUNT', question: 'Hitung jumlah apel merah berikut:', answer_key: '3 (tiga)', explanation: 'Siswa membilang 1, 2, 3 apel merah.', data: { total: 3, icon: '🍎' } },
              { id: 2, type: 'PICT_COUNT', question: 'Hitung jumlah pensil belajar berikut:', answer_key: '5 (lima)', explanation: 'Siswa menghitung 5 pensil dan menuliskan lambang 5.', data: { total: 5, icon: '✏️' } },
              { id: 3, type: 'PICT_COUNT', question: 'Hitung jumlah bintang kecil berikut:', answer_key: '2 (dua)', explanation: 'Siswa mengenali kuantitas 2 bintang.', data: { total: 2, icon: '⭐' } },
              { id: 4, type: 'MATH_PROBLEM', question: 'Tuliskan urutan bilangan dari 1 sampai 5 dengan rapi di buku berpetakmu!', answer_key: '1, 2, 3, 4, 5', explanation: 'Urutan maju bilangan bulat positif terkecil.' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'PICT_COUNT', question: 'Hitung seluruh benda berikut dan sebutkan nama bilangannya:', answer_key: '4 (empat)', explanation: 'Membilang 4 bola dan menulis lambang angka 4.', data: { total: 4, icon: '⚽' } },
              { id: 6, type: 'MATH_PROBLEM', question: 'Kucing memiliki 4 kaki. Jika ada 1 ekor kucing dan 1 ekor burung, berapa jumlah seluruh kaki mereka?', answer_key: '6 kaki (4 kaki kucing + 2 kaki burung = 6)', explanation: 'Penalaran konkret penjumlahan anggota tubuh hewan.' }
            ]
          },
          reflection_questions: ['Benda apa di wajah kita yang jumlahnya persis ada 2?', 'Angka berapa yang paling mudah kamu tulis?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto tulisan latihan angka 1 sampai 5 di buku berpetakmu!' }]
      },
      {
        title: 'Pertemuan 2: Membilang 6–10 dan Konsep Angka Nol (0)',
        order_index: 2,
        learning_objectives: 'Peserta didik membilang terurut benda 6-10, menuliskan angkanya, dan memahami arti angka nol (0) sebagai himpunan kosong.',
        content_text: 'Pengenalan acuan dasar lima jari tangan untuk angka 6-10 dan makna kuantitas nol (0) saat tidak ada benda yang tersisa.',
        required_materials: ['10 kancing baju', 'Mangkuk kosong', 'Kartu angka 0-10'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita jelajahi angka 6 sampai 10 dan rahasia angka nol!"',
          ice_breaker: 'Buka Jari Kilat: Buka 5 jari kiri, lalu buka 3 jari kanan -> anak berseru "Delapan!"',
          apperception: 'Tunjukkan mangkuk berisi 3 kancing, ambil semuanya: "Berapa kancing di mangkuk sekarang?"',
          trigger_question: 'Jika piring kue sudah dimakan habis tanpa sisa, kita sebut piring itu berisi angka berapa?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Pola lima-an (five-frame) dan pemahaman konkret angka nol.',
          concrete_steps: [
            'Susun 5 kancing di baris atas, dan 1 kancing di baris bawah -> perkenalkan 6.',
            'Lanjutkan menambah kancing di baris bawah hingga 10 kancing penuh.',
            'Keluarkan seluruh kancing dari mangkuk hingga kosong -> perkenalkan lambang 0.'
          ],
          script_parent: '"Enam adalah lima dan satu. Nol artinya mangkuk ini kosong bersih tanpa ada benda."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Tebak Kilat Subitizing 6-10',
          game_rules: ['Ayah perlihatkan sekelompok kancing selama 2 detik lalu tutup; anak menebak jumlahnya.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menebak kancing 6-10 dengan pola baris lima.',
            child_level_advanced: 'Menyebutkan berapa kancing lagi agar pas menjadi 20.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menghitung visual benda 6-10 dan mencatat arti angka nol.',
          worksheet_print_ready: {
            title: 'LKPD 1.2: BILANGAN 6-10 DAN ANGKA NOL',
            instructions: 'Hitung benda pada visual berikut dan tuliskan lambang bilangannya.',
            section_a_basic: [
              { id: 1, type: 'PICT_COUNT', question: 'Hitung jumlah jeruk segar berikut:', answer_key: '7 (tujuh)', explanation: 'Membilang 7 jeruk (5 di baris atas dan 2 di baris bawah).', data: { total: 7, icon: '🍊' } },
              { id: 2, type: 'PICT_COUNT', question: 'Hitung jumlah ikan di akuarium berikut:', answer_key: '9 (sembilan)', explanation: 'Membilang 9 ekor ikan.', data: { total: 9, icon: '🐟' } },
              { id: 3, type: 'PICT_COUNT', question: 'Hitung jumlah buku di rak berikut:', answer_key: '6 (enam)', explanation: 'Membilang 6 buku.', data: { total: 6, icon: '📚' } },
              { id: 4, type: 'MATH_PROBLEM', question: 'Di dalam piring ada 0 butir kue. Apa arti angka 0 pada kalimat tersebut?', answer_key: 'Piring kosong / tidak ada kue sama sekali', explanation: 'Konsep kuantitas nol (0) sebagai himpunan kosong.' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'PICT_COUNT', question: 'Hitung jumlah telur di wadah berikut:', answer_key: '10 (sepuluh)', explanation: 'Wadah terisi penuh 10 telur (sepuluh puluhan awal).', data: { total: 10, icon: '🥚' } },
              { id: 6, type: 'MATH_PROBLEM', question: 'Lengkapi deret bilangan yang hilang berikut: 6, [ ... ], 8, [ ... ], 10.', answer_key: '7 dan 9', explanation: 'Bilangan loncat 1 urutan maju dari 6 sampai 10.' }
            ]
          },
          reflection_questions: ['Mengapa angka 10 ditulis dengan dua digit (1 dan 0)?', 'Kapan kita melihat angka 0 di rumah?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil penulisan angka 6-10 dan lambang 0 di buku tulismu!' }]
      },
      {
        title: 'Pertemuan 3: Membandingkan Banyak Benda dan Mengurutkan 1–10',
        order_index: 3,
        learning_objectives: 'Peserta didik mampu membandingkan kuantitas menggunakan istilah lebih banyak atau lebih sedikit, serta mengurutkan kelompok bilangan.',
        content_text: 'Membandingkan himpunan benda dengan pasangan satu-satu untuk menemukan sisa kelebihan benda.',
        required_materials: ['8 balok lego merah', '5 balok lego biru'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita adu menara balok lego: siapa yang lebih tinggi dan banyak!"',
          ice_breaker: 'Tinggi Rendah: Angka besar anak berdiri jinjit, angka kecil anak jongkok ke lantai.',
          apperception: 'Pegang 2 kelereng di tangan kiri dan 6 di tangan kanan: "Mana tangan yang membawa kelereng lebih banyak?"',
          trigger_question: 'Bagaimana cara membuktikan 7 balok lebih banyak dari 4 balok tanpa menebak?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Pemasangan satu-lawan-satu untuk menemukan selisih.',
          concrete_steps: [
            'Buat menara 7 balok merah dan menara 4 balok biru.',
            'Sejajarkan keduanya di atas meja.',
            'Pasangkan dari bawah: terlihat ada 3 balok merah menjulang tanpa pasangan.',
            'Simpulkan: 7 lebih banyak dari 4.'
          ],
          script_parent: '"Kelompok yang memiliki sisa balok tanpa pasangan adalah kelompok yang lebih banyak."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Perang Kartu Angka Terbesar',
          game_rules: ['Buka kartu bersamaan: pemain dengan angka lebih besar berseru "Lebih banyak!" dan mengambil kartu lawan.'],
          multi_grade_adaptation: {
            child_level_basic: 'Membandingkan kartu rentang 1-10.',
            child_level_advanced: 'Membandingkan kartu puluhan (misal 34 vs 43).'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Membandingkan visual panjang dan mengisi tanda perbandingan.',
          worksheet_print_ready: {
            title: 'LKPD 1.3: MEMBANDINGKAN DAN MENGURUTKAN BILANGAN',
            instructions: 'Bandingkan panjang deretan benda dan urutkan bilangannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'LENGTH_COMPARE',
                question: 'Bandingkan kedua kelompok balok berikut, kelompok mana yang lebih banyak?',
                answer_key: 'Balok Merah (8 balok)',
                explanation: '8 balok lebih panjang/banyak dibandingkan 5 balok.',
                data: {
                  items: [
                    { name: 'Balok Merah', units: 8 },
                    { name: 'Balok Biru', units: 5 }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Isilah dengan kata "lebih banyak dari" atau "lebih sedikit dari": 7 apel [ ... ] 4 apel.', answer_key: 'lebih banyak dari', explanation: 'Kuantitas 7 lebih besar daripada 4.' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Urutkan bilangan berikut dari yang terkecil: 7, 2, 9, 4, 1 -> [ ..., ..., ..., ..., ... ]', answer_key: '1, 2, 4, 7, 9', explanation: 'Urutan naik dari kuantitas paling sedikit.' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Urutkan bilangan mundur dari yang terbesar: 3, 8, 10, 5, 2 -> [ ..., ..., ..., ..., ... ]', answer_key: '10, 8, 5, 3, 2', explanation: 'Urutan turun dari kuantitas terbesar.' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Aku sebuah angka. Aku lebih besar dari 6 tetapi lebih kecil dari 8. Bilangan berapakah aku?', answer_key: '7 (tujuh)', explanation: 'Bilangan bulat di antara 6 dan 8.' }
            ]
          },
          reflection_questions: ['Mengapa angka di sebelah kanan garis bilangan bernilai lebih besar?', 'Berapa selisih antara angka 8 dan 5?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar kerja LKPD 1.3 perbandingan bilangan!' }]
      },
      {
        title: 'Pertemuan 4: Pasangan Bilangan (Number Bonds) Pengurai Angka 10',
        order_index: 4,
        learning_objectives: 'Peserta didik memahami konsep partisi bilangan (part-part-whole) dan menguasai seluruh pasangan bilangan pembentuk angka 10.',
        content_text: 'Dekomposisi bilangan 10 ke dalam pasangan komplementer: 1+9, 2+8, 3+7, 4+6, 5+5 sebagai fondasi utama aritmetika mental.',
        required_materials: ['10 butir kelereng / tutup botol', 'Diagram pohon Number Bond'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita pecahkan rahasia pohon ajaib angka 10!"',
          ice_breaker: 'Jari Bersahabat: Ayah angkat 4 jari, anak secepat kilat mengangkat 6 jari (agar pas 10).',
          apperception: 'Pegang 10 kancing, sembunyikan sebagian di balik punggung: "Ada 3 di meja, berapa di belakang Ayah?"',
          trigger_question: 'Jika kamu punya 10 permen dan membaginya ke 2 toples, ada berapa kombinasi pembagiannya?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Struktur Part-Part-Whole pada bilangan 10.',
          concrete_steps: [
            'Siapkan kertas bergambar 1 lingkaran besar di atas bercabang ke 2 lingkaran di bawah.',
            'Letakkan 10 kancing di lingkaran atas (Whole).',
            'Geser 3 kancing ke cabang kiri (Part), lalu geser sisanya ke cabang kanan (Part).'
          ],
          script_parent: '"Sepuluh itu utuh. Tiga dan tujuh adalah dua bagian yang jika disatukan kembali tetap berjumlah sepuluh."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Kartu Cari Jodoh Angka 10',
          game_rules: ['Kocok kartu 1-9; setiap pemain harus memasangkan kartunya agar totalnya tepat 10.'],
          multi_grade_adaptation: {
            child_level_basic: 'Mencari pasangan 10 dengan bantuan menghitung jari tangan.',
            child_level_advanced: 'Mencari 3 bilangan yang bila dijumlahkan menjadi 10 (misal: 2+3+5).'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Melengkapi diagram visual SVG Number Bonds pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 1.4: PASANGAN BILANGAN 10 (NUMBER BONDS)',
            instructions: 'Amati diagram cabang bilangan di bawah ini, lalu isi lingkaran yang masih bertanda tanya (?) agar genap menjadi 10.',
            section_a_basic: [
              {
                id: 1,
                type: 'NUMBER_BOND',
                question: 'Lengkapi pasangan 10 jika cabang kirinya bernilai 3:',
                answer_key: '7 (karena 3 + 7 = 10)',
                explanation: 'Pasangan komplemen 10 dari 3 adalah 7.',
                data: { whole: 10, part1: 3, part2: '?' }
              },
              {
                id: 2,
                type: 'NUMBER_BOND',
                question: 'Lengkapi pasangan 10 jika cabang kirinya bernilai 6:',
                answer_key: '4 (karena 6 + 4 = 10)',
                explanation: 'Pasangan komplemen 10 dari 6 adalah 4.',
                data: { whole: 10, part1: 6, part2: '?' }
              },
              {
                id: 3,
                type: 'NUMBER_BOND',
                question: 'Lengkapi pasangan 10 jika cabang kirinya bernilai 1:',
                answer_key: '9 (karena 1 + 9 = 10)',
                explanation: 'Pasangan komplemen 10 dari 1 adalah 9.',
                data: { whole: 10, part1: 1, part2: '?' }
              }
            ],
            section_b_enrichment: [
              {
                id: 4,
                type: 'NUMBER_BOND',
                question: 'Tentukan kedua cabang jika nilainya sama besar (angka kembar):',
                answer_key: '5 dan 5 (karena 5 + 5 = 10)',
                explanation: 'Dua bagian kembar sama besar pembentuk 10 adalah 5 dan 5.',
                data: { whole: 10, part1: '?', part2: '?' }
              },
              {
                id: 5,
                type: 'MATH_PROBLEM',
                question: 'Ibu memiliki 10 butir telur. Sebanyak 4 butir digoreng untuk sarapan. Berapa butir telur yang belum digoreng?',
                answer_key: '6 butir (10 - 4 = 6)',
                explanation: 'Aplikasi dekomposisi pasangan 10 dalam soal cerita kontekstual.'
              }
            ]
          },
          reflection_questions: ['Pasangan angka 10 mana yang paling cepat kamu ingat di kepala?', 'Berapa pasangan dari angka 8 agar jadi 10?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar kerja diagram pohon bilangan LKPD 1.4 yang sudah kamu isi!' }]
      },
      {
        title: 'Pertemuan 5: Evaluasi dan Penguatan Bab 1 (Proyek Menara Angka 1-10)',
        order_index: 5,
        learning_objectives: 'Peserta didik mendemonstrasikan ketuntasan membilang, menulis, membandingkan, dan mengurai pasangan bilangan 1-10 secara komprehensif.',
        content_text: 'Asesmen formatif sumatif Bab 1 untuk mengonfirmasi kesiapan kognitif anak sebelum melangkah ke operasi hitung penjumlahan.',
        required_materials: ['10 balok mainan / cangkir', 'Kartu evaluasi'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi kapten! Hari ini ujian pembuktian Master Angka 1 sampai 10!"',
          ice_breaker: 'Kuis Lisan Kilat: "Pasangan 4? Pasangan 2? Pasangan 5?"',
          apperception: 'Review singkat materi lambang, perbandingan, dan pasangan bilangan.',
          trigger_question: 'Bisakah kamu menyelesaikan seluruh tantangan kuis hari ini tanpa menghitung jari?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Sintesis konsep bilangan: kuantitas, lambang, dan partisi angka.',
          concrete_steps: [
            'Beri anak 10 balok berseri angka 1 sampai 10.',
            'Minta anak menata menara piramida dari yang terbesar ke terkecil.',
            'Uji pemahaman nol: singkirkan balok dan jelaskan maknanya.'
          ],
          script_parent: '"Kamu sudah membuktikan bahwa angka memiliki kuantitas nyata yang teratur."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Estafet Pos Angka Juara',
          game_rules: ['Anak menyelesaikan 4 pos tantangan beruntun (Tulis, Hitung, Bandingkan, dan Pasangan 10).'],
          multi_grade_adaptation: {
            child_level_basic: 'Menyelesaikan pos tantangan 1-10.',
            child_level_advanced: 'Menyelesaikan pos tantangan pola loncat 2 dan 5.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengerjakan evaluasi formatif Bab 1 pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 1.5: EVALUASI KETUNTASAN BAB 1',
            instructions: 'Selesaikan soal evaluasi mandiri berikut dengan teliti.',
            section_a_basic: [
              { id: 1, type: 'PICT_COUNT', question: 'Hitung jumlah bintang berikut:', data: { total: 8, icon: '⭐' } },
              {
                id: 2,
                type: 'NUMBER_BOND',
                question: 'Lengkapi pasangan sahabat 10 berikut:',
                data: { whole: 10, part1: 5, part2: '?' }
              },
              { id: 3, type: 'MATH_PROBLEM', question: 'Isilah tanda > atau < : 9 [ ... ] 6.' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Urutkan dari yang terkecil: 8, 3, 5, 1 -> [ ..., ..., ..., ... ]' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Di meja ada 10 buku. 4 bersampul cokelat, sisanya bersampul biru. Berapa buku yang bersampul biru?' }
            ]
          },
          reflection_questions: ['Bagian mana dari angka 1-10 yang paling menyenangkan bagimu?', 'Apakah kamu sudah hafal seluruh kawan sepuluh?']
        },
        assignments: [
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Evaluasi Bab 1: Ayo Membilang sampai dengan 10',
            quiz_questions: [
              {
                question_text: 'Pasangan angka 7 agar jumlahnya genap menjadi 10 adalah...',
                option_a: '2',
                option_b: '3',
                option_c: '4',
                option_d: '5',
                correct_answer: 'B'
              },
              {
                question_text: 'Manakah pernyataan perbandingan yang benar?',
                option_a: '3 lebih banyak dari 7',
                option_b: '8 lebih banyak dari 4',
                option_c: '5 sama dengan 9',
                option_d: '2 lebih banyak dari 6',
                correct_answer: 'B'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 2: PENJUMLAHAN SAMPAI DENGAN 10 (5 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 2,
    title: 'Bab 2: Penjumlahan sampai dengan 10',
    target_semester: 1,
    week_target: 3,
    lessons: [
      {
        title: 'Pertemuan 6: Makna Penggabungan Benda dan Simbol Tambah (+)',
        order_index: 1,
        learning_objectives: 'Peserta didik memahami arti penjumlahan sebagai penggabungan dua kelompok benda dan menggunakan simbol (+) serta (=).',
        content_text: 'Pengenalan makna tanda tambah (+) sebagai penggabungan dua kelompok benda dan tanda sama dengan (=) sebagai hasil akhir gabungan.',
        required_materials: ['2 piring plastik', '10 butir biskuit / lego', 'Kartu (+) dan (=)'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita belajar keajaiban matematika: membuat benda bertambah banyak!"',
          ice_breaker: 'Tepuk Gabung: Buka dua tangan, lalu tepuk keras bersamaan: "GABUNG!"',
          apperception: 'Taruh 3 biskuit di kiri dan 2 di kanan. Satukan ke tengah: "Berapa biskuit sekarang?"',
          trigger_question: 'Apa tanda matematika untuk menunjukkan dua kelompok disatukan?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Transisi manipulasi piring ke kalimat matematika formal.',
          concrete_steps: [
            'Letakkan 4 lego di piring 1, dan 3 lego di piring 2.',
            'Letakkan kartu (+) di tengah: "4 ditambah 3".',
            'Letakkan kartu (=) dan kumpulkan seluruh lego di sebelah kanan: total 7.',
            'Tulis rumus formal: 4 + 3 = 7.'
          ],
          script_parent: '"Tanda tambah (+) seperti jembatan yang menyatukan dua kelompok kawan."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Lempar Bola Keranjang Ganda',
          game_rules: ['Lempar bola ke keranjang A (masuk 3) dan keranjang B (masuk 2); tuliskan rumusnya 3 + 2 = 5.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menjumlahkan bola di bawah 10.',
            child_level_advanced: 'Menghitung poin dengan kelipatan 5 atau 10.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menerjemahkan visual penggabungan benda ke dalam kalimat matematika.',
          worksheet_print_ready: {
            title: 'LKPD 2.1: MAKNA PENGGABUNGAN DAN SIMBOL (+)',
            instructions: 'Amati visual penggabungan benda di bawah ini, lalu tuliskan kalimat matematikanya.',
            section_a_basic: [
              { id: 1, type: 'PICT_COUNT', question: 'Kelompok 1 (3 apel) digabung Kelompok 2 (2 apel). Berapa jumlahnya? Tuliskan: [ ... + ... = ... ]', data: { total: 5, icon: '🍎' } },
              { id: 2, type: 'PICT_COUNT', question: 'Kelompok 1 (4 bola) digabung Kelompok 2 (4 bola). Berapa jumlahnya? Tuliskan: [ ... + ... = ... ]', data: { total: 8, icon: '⚽' } },
              { id: 3, type: 'MATH_PROBLEM', question: 'Hitunglah hasil operasi penjumlahan berikut: 2 + 6 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Ibu membeli 3 apel merah dan 4 apel hijau. Tuliskan kalimat matematikanya dan hitung total buah Ibu!' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Lengkapi kotak yang kosong: [ ... ] + 4 = 7' }
            ]
          },
          reflection_questions: ['Apakah penggabungan benda membuat jumlahnya bertambah banyak?', 'Apa arti tanda (=)?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil penulisan kalimat matematika penjumlahan pada LKPD 2.1!' }]
      },
      {
        title: 'Pertemuan 7: Penjumlahan Cepat dengan Strategi Hitung Maju (Counting On)',
        order_index: 2,
        learning_objectives: 'Peserta didik mampu melakukan penjumlahan dengan metode hitung maju (counting on) dengan menyimpan bilangan terbesar di kepala.',
        content_text: 'Strategi mental counting on: menyimpan bilangan terbesar di kepala, lalu melangkah maju sebanyak bilangan penambah.',
        required_materials: ['Garis bilangan lantai 1-10', 'Dadu angka'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita belajar trik berhitung cepat tanpa mulai dari angka satu!"',
          ice_breaker: 'Tepuk Dahi & Melangkah: Sentuh dahi sebut "ENAM!", lompat 2 kali: "TUJUH, DELAPAN!"',
          apperception: 'Tanyakan: "Kalau menghitung 7 + 2, apakah kita harus mulai menghitung dari 1, 2, 3 lagi?"',
          trigger_question: 'Bagaimana cara menjumlahkan 6 + 3 hanya dalam 3 detik?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Mengunci angka terbesar di kepala dan melangkah maju.',
          concrete_steps: [
            'Tulis soal: 6 + 3. Pilih yang terbesar: 6.',
            'Sentuh kepala: "Kunci 6 di kepala."',
            'Buka 3 jari: hitung maju setelah 6 -> "Tujuh, delapan, sembilan!"',
            'Buktikan pada garis bilangan di lantai.'
          ],
          script_parent: '"Simpan angka terbesar di kepala, biarkan jarimu hanya melangkah maju sedikit mengikuti angka yang kecil."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Katak Lompat di Garis Bilangan',
          game_rules: ['Berdiri di petak angka dadu pertama (misal 5), lempar dadu kedua (misal 3), lalu lompat maju sambil menghitung: 6, 7, 8!'],
          multi_grade_adaptation: {
            child_level_basic: 'Melompat maju 1-3 petak.',
            child_level_advanced: 'Melompat maju dari angka puluhan (misal 45 + 7).'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengerjakan latihan hitung maju pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 2.2: PENJUMLAHAN HITUNG MAJU (COUNTING ON)',
            instructions: 'Simpan angka yang lebih besar di kepala, gunakan jarimu untuk melangkah maju.',
            section_a_basic: [
              { id: 1, type: 'MATH_PROBLEM', question: '5 + 2 = [ ... ] (Mulai dari 5, hitung maju: 6, 7)' },
              { id: 2, type: 'MATH_PROBLEM', question: '6 + 3 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '3 + 5 = [ ... ] (Ingat: simpan 5 di kepala, buka 3 jari!)' },
              { id: 4, type: 'MATH_PROBLEM', question: '2 + 8 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'MATH_PROBLEM', question: 'Maryam berada di tangga nomor 4. Ia melangkah naik 5 anak tangga lagi. Di tangga berapakah Maryam sekarang?' },
              { id: 6, type: 'MATH_PROBLEM', question: 'Buktikan bahwa 4 + 5 hasilnya sama dengan 5 + 4!' }
            ]
          },
          reflection_questions: ['Mengapa kita menyimpan angka yang besar di kepala?', 'Apakah 2 + 7 sama dengan 7 + 2?']
        },
        assignments: [{ type: 'VOICE_TASK', prompt: 'Rekam suaramu menjelaskan cara hitung maju untuk soal 6 + 4!' }]
      },
      {
        title: 'Pertemuan 8: Penjumlahan Bilangan yang Menghasilkan Angka 10',
        order_index: 3,
        learning_objectives: 'Peserta didik memanfaatkan pasangan bilangan 10 untuk menyelesaikan operasi penjumlahan secara otomatis.',
        content_text: 'Otomatisasi fakta penjumlahan 10: 1+9, 2+8, 3+7, 4+6, 5+5 dan sifat komutatif pertukaran bilangan.',
        required_materials: ['Wadah 10 lubang (ten-frame)', '10 butir kancing merah dan biru'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita buktikan pasangan sahabat 10 membuat penjumlahan super cepat!"',
          ice_breaker: 'Tepuk Kawan 10: Ayah sebut "Empat!", anak balas sebut "Enam!" serentak.',
          apperception: 'Tunjukkan kotak 10 berisi 7 kancing: "Berapa kancing lagi agar kotak ini pas penuh 10?"',
          trigger_question: 'Jika 6 + 4 = 10, berapa hasil dari 4 + 6?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Visualisasi pengisian ten-frame dan sifat komutatif penjumlahan.',
          concrete_steps: [
            'Isi wadah 10 dengan 8 kancing merah.',
            'Tutup lubang kosong dengan 2 kancing biru -> 8 + 2 = 10.',
            'Putar posisinya: 2 + 8 = 10.',
            'Tegaskan bahwa posisi boleh bertukar tempat, hasilnya tetap 10.'
          ],
          script_parent: '"Wadah sepuluh selalu konsisten: jika delapan terisi, pasti selalu ada dua ruang kosong pasangannya."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Domino Sahabat Sepuluh',
          game_rules: ['Sambungkan kartu angka yang jika ujungnya bertemu menghasilkan jumlah pas 10.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menyambungkan kartu pasangan 10.',
            child_level_advanced: 'Menyambungkan kartu pasangan 20 atau 100.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Melengkapi ten-frame dan persamaan penjumlahan 10.',
          worksheet_print_ready: {
            title: 'LKPD 2.3: FAKTA PENJUMLAHAN BILANGAN 10',
            instructions: 'Amati kotak sepuluh di bawah ini, lalu tuliskan angka pelengkapnya agar genap menjadi 10.',
            section_a_basic: [
              {
                id: 1,
                type: 'TEN_FRAME',
                question: 'Berapa bulatan lagi agar kotak sepuluh berikut terisi penuh 10? (8 + [ ... ] = 10)',
                data: { frames: [{ filled: 8 }] }
              },
              {
                id: 2,
                type: 'TEN_FRAME',
                question: 'Berapa bulatan lagi agar kotak sepuluh berikut terisi penuh 10? (6 + [ ... ] = 10)',
                data: { frames: [{ filled: 6 }] }
              },
              { id: 3, type: 'MATH_PROBLEM', question: 'Lengkapi persamaan: 4 + [ ... ] = 10 dan 1 + [ ... ] = 10' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Tuliskan 5 kalimat penjumlahan berbeda yang hasilnya sama dengan 10!' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Jika [ ... ] + 7 = 10, berapakah angka di dalam kotak tersebut?' }
            ]
          },
          reflection_questions: ['Mengapa pasangan 5 + 5 paling mudah diingat?', 'Berapa kawan dari angka 7 agar jadi 10?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan LKPD 2.3 fakta penjumlahan 10!' }]
      },
      {
        title: 'Pertemuan 9: Menyelesaikan Soal Cerita Penjumlahan Sehari-hari',
        order_index: 4,
        learning_objectives: 'Peserta didik mendeteksi kata kunci penjumlahan dalam cerita sehari-hari dan menuliskan kalimat matematikanya.',
        content_text: 'Literasi numerasi pemula: menghubungkan alur narasi kejadian di rumah dengan operasi penjumlahan simbolik.',
        required_materials: ['Papan tulis mini', 'Mainan miniatur'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi detektif cerita! Hari ini kita pecahkan teka-teki dari kisah sehari-hari!"',
          ice_breaker: 'Tebak Kata Kunci: Jika Ayah sebut "DIBERI LAGI", anak teriak "TAMBAH!"',
          apperception: 'Bercerita: "Asiyah punya 2 donat di piring. Ibu memberi lagi 3 donat. Apa yang terjadi dengan jumlah donat Asiyah?"',
          trigger_question: 'Kata-kata apa dalam cerita yang menandakan bahwa barang bertambah banyak?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Langkah 3-T: Temukan angka, Tentukan kata kunci, Tulis kalimat matematikanya.',
          concrete_steps: [
            'Peragakan dengan mobil mainan: 4 mobil sedang parkir.',
            'Dekatkan 2 mobil lagi: "Datang lagi 2 mobil ikut parkir."',
            'Tulis kalimat matematikanya: 4 + 2 = 6 mobil.'
          ],
          script_parent: '"Bayangkan ceritanya seperti film: perhatikan apakah barangnya makin bertumpuk banyak atau berkurang."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Panggung Drama Jual Beli Mainan',
          game_rules: ['Anak menjadi penjual buah; Ayah membeli 3 jeruk dan adik membeli 4 jeruk; anak menghitung totalnya.'],
          multi_grade_adaptation: {
            child_level_basic: 'Drama penjumlahan dengan barang konkret di bawah 10.',
            child_level_advanced: 'Drama transaksi jual beli dengan uang mainan puluhan ribu.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Membaca soal cerita berilustrasi dan menghitung jawabannya.',
          worksheet_print_ready: {
            title: 'LKPD 2.4: SOAL CERITA PENJUMLAHAN DI RUMAH',
            instructions: 'Bacalah cerita di bawah ini, tulis kalimat matematikanya, dan hitung jawabannya.',
            section_a_basic: [
              { id: 1, type: 'MATH_PROBLEM', question: 'Di meja ada 4 gelas susu. Ibu meletakkan lagi 3 gelas susu. Berapa jumlah gelas susu semuanya? (Tulis: [ ... + ... = ... ])' },
              { id: 2, type: 'MATH_PROBLEM', question: 'Khadijah memiliki 5 jepit rambut. Maryam memberi 2 jepit rambut lagi. Berapa jepit rambut Khadijah sekarang?' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Ada 6 burung di dahan pohon. Datang lagi 3 burung ikut bertengger. Berapa jumlah burung di dahan sekarang?' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Buatlah sebuah soal cerita buatanmu sendiri berdasarkan kalimat matematika 5 + 4 = 9!' }
            ]
          },
          reflection_questions: ['Mengapa membaca soal cerita harus teliti?', 'Kapan kamu menjumlahkan barang di rumah hari ini?']
        },
        assignments: [{ type: 'VOICE_TASK', prompt: 'Bacakan dengan lantang satu soal cerita dari LKPD 2.4 dan sebutkan jawaban hitunganmu!' }]
      },
      {
        title: 'Pertemuan 10: Evaluasi dan Penguatan Bab 2 (Olimpiade Penjumlahan)',
        order_index: 5,
        learning_objectives: 'Peserta didik mendemonstrasikan kelancaran operasi penjumlahan sampai dengan 10 secara lisan, tertulis, dan CBT.',
        content_text: 'Asesmen formatif Bab 2 untuk memastikan otomatisasi penjumlahan dasar di bawah 10 tuntas sebelum lanjut ke pengurangan.',
        required_materials: ['Stopwatch HP', 'Kartu soal penjumlahan kilat'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi sang juara! Hari ini panggung Olimpiade Penjumlahan 1-10 dibuka!"',
          ice_breaker: 'Uji Lisan Kilat: "3 + 3? 4 + 4? 5 + 5? 2 + 7?"',
          apperception: 'Review kilat strategi hitung maju dan kawan sepuluh.',
          trigger_question: 'Berapa banyak soal penjumlahan yang bisa kamu jawab benar dalam 1 menit?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Review terpadu penjumlahan cepat dan sifat identitas nol (n + 0 = n).',
          concrete_steps: [
            'Latih pola bilangan kembar: 2+2=4, 3+3=6, 4+4=8, 5+5=10.',
            'Tegaskan hukum nol: angka berapa pun ditambah 0 hasilnya tetap angka itu sendiri.'
          ],
          script_parent: '"Angka nol seperti cermin ajaib: siapa pun yang ditambah nol, jumlahnya tetap tidak bertambah."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Tantangan Kilat 60 Detik',
          game_rules: ['Anak menjawab 10 kartu soal penjumlahan dalam waktu 60 detik.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menjawab soal penjumlahan rentang 1-10.',
            child_level_advanced: 'Menjawab soal penjumlahan dua digit cepat.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengerjakan evaluasi formatif Bab 2 dan tes CBT.',
          worksheet_print_ready: {
            title: 'LKPD 2.5: TANTANGAN AKHIR BAB 2 (PENJUMLAHAN)',
            instructions: 'Selesaikan operasi penjumlahan di bawah ini dengan tepat.',
            section_a_basic: [
              { id: 1, type: 'MATH_PROBLEM', question: '6 + 2 = [ ... ]' },
              { id: 2, type: 'MATH_PROBLEM', question: '3 + 7 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '4 + 5 = [ ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: '8 + 0 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'MATH_PROBLEM', question: 'Lengkapi kotak yang kosong: [ ... ] + 5 = 9' },
              { id: 6, type: 'MATH_PROBLEM', question: 'Di meja ada 3 buku cerita, 4 buku pelajaran, dan 2 buku gambar. Berapa jumlah seluruh buku di meja?' }
            ]
          },
          reflection_questions: ['Strategi mana yang paling membuatmu cepat: hitung maju atau pasangan 10?', 'Apakah kamu sudah siap lanjut ke materi pengurangan?']
        },
        assignments: [
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Akhir Bab 2: Penjumlahan sampai dengan 10',
            quiz_questions: [
              {
                question_text: 'Hasil dari 5 + 4 adalah...',
                option_a: '8',
                option_b: '9',
                option_c: '10',
                option_d: '7',
                correct_answer: 'B'
              },
              {
                question_text: 'Ibu memiliki 3 butir telur, lalu membeli 4 telur lagi. Jumlah telur Ibu sekarang adalah...',
                option_a: '6',
                option_b: '7',
                option_c: '8',
                option_d: '9',
                correct_answer: 'B'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 3: PENGURANGAN SAMPAI DENGAN 10 (5 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 3,
    title: 'Bab 3: Pengurangan sampai dengan 10',
    target_semester: 1,
    week_target: 5,
    lessons: [
      {
        title: 'Pertemuan 11: Makna Memisahkan/Mengambil Benda dan Simbol Kurang (-)',
        order_index: 1,
        learning_objectives: 'Peserta didik memahami arti pengurangan sebagai tindakan mengambil/memisahkan sebagian benda dan mengenal simbol (-) serta (=).',
        content_text: 'Pengurangan sebagai proses dekonstruksi benda awal. Nilai akhir pengurangan biasa akan selalu lebih sedikit dari nilai mula-mula.',
        required_materials: ['10 keping biskuit / lego', '1 piring saji', 'Kartu tanda (-) dan (=)'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita belajar misteri benda yang diambil dan berkurang!"',
          ice_breaker: 'Tepuk Balon Kempes: Tiup balon imajiner... "DOR!" tepuk tangan dan kempiskan tubuh.',
          apperception: 'Taruh 5 biskuit di piring, Ayah pura-pura memakan 2 biskuit: "Apakah biskuitnya bertambah atau berkurang?"',
          trigger_question: 'Jika kamu punya 6 balon dan meletus 2 balon, berapa balon yang tersisa?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Pemisahan fisik benda nyata dan pembentukan rumus pengurangan formal.',
          concrete_steps: [
            'Letakkan 8 lego di meja.',
            'Minta anak mengambil 3 lego dan memindahkannya ke dalam kotak tertutup.',
            'Hitung sisa lego di meja: tersisa 5 lego.',
            'Tunjukkan simbol kartu (-): 8 - 3 = 5.'
          ],
          script_parent: '"Tanda kurang (-) seperti gunting yang mengambil sebagian barang kita. Benda mula-mula selalu ditulis paling depan."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Bowling Botol Plastik',
          game_rules: ['Susun 10 botol plastik, anak melempar bola; hitung botol yang jatuh dan botol yang masih berdiri tegak.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menghitung botol berdiri dan jatuh rentang 1-10.',
            child_level_advanced: 'Bermain bowling dengan skor kelipatan 5 atau 10.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menyelesaikan pengurangan dengan mencoret objek visual SVG.',
          worksheet_print_ready: {
            title: 'LKPD 3.1: MAKNA PENGURANGAN DAN SIMBOL (-)',
            instructions: 'Hitung benda awal, amati benda yang dicoret silang (✕), lalu tuliskan kalimat matematika pengurangannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'PICT_COUNT',
                question: 'Ada 6 donat di piring, dimakan 2 donat (dicoret). Berapa sisa donat? (Tulis: 6 - 2 = [ ... ])',
                data: { total: 6, crossed: 2, icon: '🍩' }
              },
              {
                id: 2,
                type: 'PICT_COUNT',
                question: 'Ada 8 balon pesta, meletus 3 balon (dicoret). Berapa sisa balon yang utuh? (Tulis: 8 - 3 = [ ... ])',
                data: { total: 8, crossed: 3, icon: '🎈' }
              },
              {
                id: 3,
                type: 'PICT_COUNT',
                question: 'Ada 7 layang-layang terbang, putus 4 layang-layang (dicoret). Berapa sisa layang-layang? (Tulis: 7 - 4 = [ ... ])',
                data: { total: 7, crossed: 4, icon: '🪁' }
              }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Di dalam toples ada 10 butir permen. Dimakan adik 3 butir permen. Berapa butir permen yang masih ada di toples? Tuliskan kalimat matematikanya!' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Hitung hasil pengurangan berikut: 9 - 5 = [ ... ]' }
            ]
          },
          reflection_questions: ['Mengapa pada pengurangan biasa angka di depan harus paling besar?', 'Apa yang terjadi jika kamu punya 5 permen dan dimakan kelima-limanya?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan mencoret gambar pengurangan pada LKPD 3.1!' }]
      },
      {
        title: 'Pertemuan 12: Pengurangan Cepat dengan Strategi Hitung Mundur (Counting Back)',
        order_index: 2,
        learning_objectives: 'Peserta didik mampu menghitung pengurangan secara mental menggunakan strategi melangkah mundur dari bilangan awal.',
        content_text: 'Hitung mundur (counting back): menyimpan bilangan awal di kepala dan melangkah mundur ke belakang sebanyak bilangan pengurangnya.',
        required_materials: ['Garis bilangan lantai 1-10', 'Dadu angka 1-3'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita mengendarai mobil mundur dengan rem pakem!"',
          ice_breaker: 'Langkah Mundur: Berdiri tegak, hitung mundur bersama: "10, 9, 8, 7, 6, 5, 4, 3, 2, 1... STOP!"',
          apperception: 'Tunjukkan jari di angka 7: "Kalau melangkah mundur 2 langkah dari angka 7, kita mendarat di angka berapa?"',
          trigger_question: 'Bagaimana cara menghitung 9 - 3 tanpa perlu menggambar dan mencoret sembilan lingkaran?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Strategi mental melangkah mundur 1, 2, atau 3 langkah dari angka awal.',
          concrete_steps: [
            'Tulis soal: 8 - 3.',
            'Sentuh kepala: "Kunci angka 8 di kepala."',
            'Buka 3 jari: hitung mundur -> "Tujuh... Enam... Lima!"',
            'Buktikan di garis bilangan lantai: berdiri di petak 8, jalan mundur 3 langkah berhenti di petak 5.'
          ],
          script_parent: '"Hitung mundur sama seperti menuruni anak tangga: sebut angka awal di kepala, lalu jarimu melangkah turun."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Mobil Mundur Halang Rintang',
          game_rules: ['Mobil mainan parkir di petak 9; lempar dadu kecil (misal 3), jalankan mobil mundur 3 petak sambil menghitung: 8, 7, 6!'],
          multi_grade_adaptation: {
            child_level_basic: 'Menjalankan mobil mundur 1-3 petak.',
            child_level_advanced: 'Menghitung mundur dari bilangan puluhan (misal 35 mundur 6 langkah).'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengerjakan pengurangan hitung mundur pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 3.2: PENGURANGAN HITUNG MUNDUR (COUNTING BACK)',
            instructions: 'Simpan angka pertama di kepala, buka jari sebanyak pengurang, lalu hitung mundur.',
            section_a_basic: [
              { id: 1, type: 'MATH_PROBLEM', question: '7 - 2 = [ ... ] (Mulai dari 7, hitung mundur 2 langkah: 6, 5)' },
              { id: 2, type: 'MATH_PROBLEM', question: '9 - 3 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '6 - 2 = [ ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: '10 - 3 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'MATH_PROBLEM', question: 'Pesawat mainan berada di ketinggian 8 meter, lalu turun 3 meter. Di ketinggian berapakah pesawat sekarang?' },
              { id: 6, type: 'MATH_PROBLEM', question: 'Hitunglah: 8 - 1 = [ ... ] dan 8 - 0 = [ ... ]' }
            ]
          },
          reflection_questions: ['Mengapa hitung mundur sangat cepat jika angka pengurangnya kecil (1, 2, atau 3)?', 'Berapakah 8 - 0?']
        },
        assignments: [{ type: 'VOICE_TASK', prompt: 'Rekam suaramu saat mempraktikkan cara hitung mundur untuk soal 8 - 3!' }]
      },
      {
        title: 'Pertemuan 13: Hubungan Penjumlahan dan Pengurangan (Fact Families)',
        order_index: 3,
        learning_objectives: 'Peserta didik memahami relasi timbal-balik (invers) antara penjumlahan dan pengurangan sebagai satu keluarga fakta bilangan.',
        content_text: 'Memahami jika A + B = C, maka C - B = A dan C - A = B. Memahami korelasi ini mempermudah penguasaan pengurangan tanpa perlu menghafal rumus terpisah.',
        required_materials: ['Segitiga karton Fakta Bilangan', '10 butir tutup botol'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita berkenalan dengan keluarga segitiga ajaib yang tidak pernah berpisah!"',
          ice_breaker: 'Tepuk Bolak-Balik: Maju 3 langkah, mundur 3 langkah kembali ke posisi awal.',
          apperception: 'Tunjukkan 3 kelereng merah dan 4 kelereng biru: "3 + 4 = 7. Kalau diambil yang biru, tersisa warna apa?"',
          trigger_question: 'Jika kamu sudah tahu bahwa 6 + 4 = 10, apakah kamu perlu menghitung jari lagi untuk tahu 10 - 4?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Segitiga fakta bilangan: Puncak adalah total, dua sudut dasar adalah bagian penyusun.',
          concrete_steps: [
            'Tulis 7 di puncak segitiga, 3 di sudut kiri bawah, dan 4 di sudut kanan bawah.',
            'Tutup puncak 7: "3 + 4 = 7."',
            'Tutup sudut kiri 3: "7 - 4 = 3."',
            'Tutup sudut kanan 4: "7 - 3 = 4."'
          ],
          script_parent: '"Tiga angka ini adalah satu keluarga. Jika dua angka di bawah dijumlahkan hasilnya puncak atas. Jika puncak dikurangi salah satu bawah, hasilnya adalah kawan bawahnya."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Tebak Sudut Tertutup Segitiga',
          game_rules: ['Ayah menutup salah satu sudut segitiga angka dengan ibu jari; anak menebak angka yang tertutup beserta alasan rumusnya.'],
          multi_grade_adaptation: {
            child_level_basic: 'Bermain segitiga fakta bilangan rentang 1-10.',
            child_level_advanced: 'Bermain segitiga fakta perkalian dan pembagian.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menuliskan 4 kalimat matematika dari satu segitiga fakta bilangan.',
          worksheet_print_ready: {
            title: 'LKPD 3.3: KELUARGA FAKTA BILANGAN (FACT FAMILIES)',
            instructions: 'Tuliskan 4 kalimat matematika (2 penjumlahan, 2 pengurangan) dari segitiga bilangan visual.',
            section_a_basic: [
              {
                id: 1,
                type: 'NUMBER_BOND',
                question: 'Segitiga Bilangan (Puncak 8, Cabang 5 dan 3). Tuliskan 2 kalimat penjumlahan dan 2 kalimat pengurangannya!',
                data: { whole: 8, part1: 5, part2: 3 }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Tambah 1: [ ... + ... = ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Tambah 2: [ ... + ... = ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: 'Kurang 1: [ ... - ... = ... ]' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Kurang 2: [ ... - ... = ... ]' }
            ],
            section_b_enrichment: [
              {
                id: 6,
                type: 'NUMBER_BOND',
                question: 'Lengkapi segitiga sakti jika Puncaknya 10 dan Sudut Kirinya 7. Berapakah sudut kanannya?',
                data: { whole: 10, part1: 7, part2: '?' }
              },
              { id: 7, type: 'MATH_PROBLEM', question: 'Jika 2 + 6 = 8, buktikan kebenarannya dengan menuliskan 2 kalimat pengurangan!' }
            ]
          },
          reflection_questions: ['Mengapa belajar penjumlahan otomatis membuat kita bisa pengurangan?', 'Berapa segitiga fakta dari angka 5, 5, dan 10?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar kerja segitiga fakta bilangan LKPD 3.3 milikmu!' }]
      },
      {
        title: 'Pertemuan 14: Pengurangan sebagai Selisih Dua Benda dan Soal Cerita',
        order_index: 4,
        learning_objectives: 'Peserta didik memahami pengurangan sebagai perbandingan untuk mencari selisih (berapa lebihnya / berapa kurangnya) dan memecahkan soal cerita.',
        content_text: 'Pengurangan bukan hanya aksi mengambil benda, tetapi juga mencari selisih (difference) antara dua kelompok benda yang dibandingkan secara sejajar.',
        required_materials: ['6 pensil merah', '4 pensil biru', 'Kartu soal cerita'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi detektif pembanding! Hari ini kita mencari tahu selisih rahasia antara dua kelompok!"',
          ice_breaker: 'Adu Panjang Telunjuk: Pasangkan jari telunjukmu dengan Ayah: "Siapa yang lebih panjang? Berapa selisih kelebihannya?"',
          apperception: 'Bariskan 6 sendok di atas dan 4 garpu di bawah: "Berapa sendok yang tidak punya kawan garpu?"',
          trigger_question: 'Jika Maryam punya 7 stiker dan Asiyah punya 5 stiker, berapa selisih stiker mereka berdua?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Memahami makna kata "selisih" melalui pasangan satu lawan satu.',
          concrete_steps: [
            'Bariskan 6 pensil merah secara horizontal.',
            'Bariskan 4 pensil biru tepat sejajar di bawahnya.',
            'Tunjukkan bahwa 4 pensil merah berpasangan dengan 4 pensil biru.',
            'Tunjuk 2 pensil merah di ujung tanpa pasangan: "Inilah SELISIH-nya."',
            'Tulis rumus formal: 6 - 4 = 2 pensil selisihnya.'
          ],
          script_parent: '"Mencari selisih sama seperti mencari siapa yang tidak kebagian kawan. Kamu cukup mengurangkan angka yang banyak dengan angka yang sedikit."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Balapan Menara Selisih Kancing',
          game_rules: ['Ayah dan anak melempar dadu, menyusun kancing setinggi dadunya; pemain dengan menara lebih tinggi menyebutkan selisih tingginya.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menghitung selisih menara rentang 1-10 secara visual.',
            child_level_advanced: 'Menghitung selisih usia anggota keluarga atau selisih uang saku.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menganalisis soal cerita bertema selisih pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 3.4: MENGHITUNG SELISIH DAN SOAL CERITA PENGURANGAN',
            instructions: 'Pasangkan gambar, temukan selisihnya, dan tuliskan kalimat matematikanya.',
            section_a_basic: [
              {
                id: 1,
                type: 'LENGTH_COMPARE',
                question: 'Amati kedua kelompok berikut, berapa selisih jumlah benda antara Pensil Merah dan Pensil Biru?',
                data: {
                  items: [
                    { name: 'Pensil Merah', units: 7 },
                    { name: 'Pensil Biru', units: 4 }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Di kulkas ada 9 butir telur ayam dan 6 butir telur bebek. Berapa butir lebihnya telur ayam dibanding telur bebek? (Tulis: 9 - 6 = [ ... ])' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Khadijah punya 8 balon. Meletus 3 balon. Berapa sisa balon Khadijah sekarang?' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Asiyah berumur 7 tahun. Adik berumur 3 tahun. Berapakah selisih umur Asiyah dan Adik sekarang? Berapakah selisih umur mereka 2 tahun lagi?' }
            ]
          },
          reflection_questions: ['Mengapa selisih umur dua orang tidak akan pernah berubah setiap tahun?', 'Kata kunci apa yang menandakan pengurangan?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar kerja LKPD 3.4 pengerjaan soal selisih di buku tulismu!' }]
      },
      {
        title: 'Pertemuan 15: Evaluasi dan Penguatan Bab 3 (Tantangan Ahli Selisih)',
        order_index: 5,
        learning_objectives: 'Peserta didik mendemonstrasikan penguasaan konsep pengurangan secara menyeluruh melalui tes formatif tertulis dan digital (CBT).',
        content_text: 'Asesmen formatif sumatif Bab 3 untuk mengonfirmasi ketuntasan operasi pengurangan di bawah 10 sebelum melangkah ke geometri bangun datar.',
        required_materials: ['Papan tulis kecil', 'Kartu angka 1-10'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi sang penakluk! Hari ini kita kunci gelar Master Pengurangan 1-10!"',
          ice_breaker: 'Kuis Cepat Lisan: "10 - 5? 8 - 4? 6 - 3? 9 - 0? 7 - 7?"',
          apperception: 'Review kilat trik mobil mundur dan aturan pengurangan nol.',
          trigger_question: 'Jika sebuah angka dikurangi dengan dirinya sendiri (misal 7 - 7), hasilnya selalu berapa?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Generalisasi hukum pengurangan: dikurangi nol (n - 0 = n) dan dikurangi diri sendiri (n - n = 0).',
          concrete_steps: [
            'Pegang 5 kelereng: berikan 0 ke anak -> tetap 5 (5 - 0 = 5).',
            'Pegang 5 kelereng: berikan kelima-limanya ke anak -> habis 0 (5 - 5 = 0).',
            'Simpulkan aturan ini di papan tulis mini anak.'
          ],
          script_parent: '"Jika dikurangi nol angkanya tetap utuh. Jika dikurangi dirinya sendiri hasilnya selalu habis menjadi nol."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Estafet Soal Cepat Tanggap',
          game_rules: ['Anak membalik 8 kartu soal pengurangan dan menyebutkan jawabannya langsung secepat kilat.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menjawab pengurangan rentang 1-10.',
            child_level_advanced: 'Menjawab pengurangan belasan cepat.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengerjakan evaluasi formatif akhir bab pada LKPD dan sistem CBT.',
          worksheet_print_ready: {
            title: 'LKPD 3.5: EVALUASI KETUNTASAN BAB 3 (PENGURANGAN)',
            instructions: 'Selesaikan soal pengurangan di bawah ini secara mandiri.',
            section_a_basic: [
              {
                id: 1,
                type: 'PICT_COUNT',
                question: 'Hitung sisa benda setelah dicoret: 9 - 4 = [ ... ]',
                data: { total: 9, crossed: 4, icon: '🍎' }
              },
              { id: 2, type: 'MATH_PROBLEM', question: '8 - 8 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '7 - 0 = [ ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: '10 - 6 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'MATH_PROBLEM', question: 'Isilah kotak dengan angka yang benar: 10 - [ ... ] = 4' },
              { id: 6, type: 'MATH_PROBLEM', question: 'Di dahan ada 8 ekor burung. Beberapa burung terbang sehingga tersisa 5 ekor burung. Berapa banyak burung yang terbang?' }
            ]
          },
          reflection_questions: ['Apa bedanya berhitung penjumlahan dengan pengurangan?', 'Kapan pengurangan berguna dalam kehidupanmu?']
        },
        assignments: [
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Akhir Bab 3: Pengurangan sampai dengan 10',
            quiz_questions: [
              {
                question_text: 'Hasil dari 8 - 3 adalah...',
                option_a: '4',
                option_b: '5',
                option_c: '6',
                option_d: '7',
                correct_answer: 'B'
              },
              {
                question_text: 'Ada 10 apel di keranjang. Dimakan adik 4 buah. Sisa apel di keranjang adalah...',
                option_a: '5',
                option_b: '6',
                option_c: '7',
                option_d: '4',
                correct_answer: 'B'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 4: MENGENAL BENTUK (3 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 4,
    title: 'Bab 4: Mengenal Bentuk Datar dan Lengkung',
    target_semester: 1,
    week_target: 7,
    lessons: [
      {
        title: 'Pertemuan 16: Mengenal Ciri Segiempat dan Segitiga (Garis Lurus & Titik Sudut)',
        order_index: 1,
        learning_objectives: 'Peserta didik mengidentifikasi benda berbentuk segiempat dan segitiga, mendeskripsikan ciri fisiknya (jumlah sisi lurus dan sudut tajam), serta membedakan keduanya.',
        content_text: 'Geometri intuitif: memahami bangun datar melalui rabaan fisik tepi lurus (sisi) dan pojok tajam (sudut).',
        required_materials: ['Buku tulis (segiempat)', 'Gantungan baju (segitiga)', 'Tusuk gigi dan plastisin'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi arsitek cilik! Hari ini kita selidiki bentuk sakti penyusun bangunan!"',
          ice_breaker: 'Bentuk Tubuh: Satukan ujung tangan di atas kepala membentuk segitiga, lalu rentangkan siku membentuk segiempat.',
          apperception: 'Tunjukkan buku tulis dan penggaris segitiga: "Sentuh pojok-pojoknya. Apakah terasa tajam menusuk jari?"',
          trigger_question: 'Ada berapa tiang pagar lurus yang menyusun daun jendela kamar tidur kita?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Eksplorasi kinestetik meraba sisi lurus dan menghitung titik sudut tajam.',
          concrete_steps: [
            'Bimbing telunjuk anak meraba 4 tepian lurus buku tulis (SISI) dan 4 pojok tajamnya (SUDUT) -> SEGIEMPAT.',
            'Raba gantungan baju: 3 sisi lurus dan 3 pojok tajam -> SEGITIGA.',
            'Rakit model konkret: buat 4 bulatan plastisin sebagai sudut dan 4 tusuk gigi sebagai sisi membentuk segiempat.',
            'Ulangi membuat segitiga dengan 3 bulatan plastisin dan 3 tusuk gigi.'
          ],
          script_parent: '"Tanda pengenal bentuk: segiempat punya 4 sisi lurus dan 4 sudut tajam. Segitiga punya 3 sisi lurus dan 3 sudut tajam."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Detektif Sudut Tajam di Rumah',
          game_rules: ['Beri waktu 3 menit: anak mencari dan menyentuh 3 benda segiempat dan 2 benda segitiga di sekitar rumah.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menemukan benda segiempat dan segitiga di rumah.',
            child_level_advanced: 'Membedakan persegi sama sisi dan persegi panjang pada perabot rumah.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengamati visual SVG bangun datar dan menghitung unsur-unsurnya.',
          worksheet_print_ready: {
            title: 'LKPD 4.1: CIRI SEGIEMPAT DAN SEGITIGA',
            instructions: 'Amati gambar bangun datar di bawah ini, lalu hitung jumlah sisi dan sudutnya.',
            section_a_basic: [
              {
                id: 1,
                type: 'SHAPE_CARD',
                question: 'Amati bangun berikut, hitung sisi dan sudutnya:',
                data: {
                  shapes: [
                    { name: 'Segitiga', type: 'triangle' },
                    { name: 'Segiempat', type: 'square' }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Bangun segitiga memiliki [ ... ] sisi lurus dan [ ... ] titik sudut tajam.' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Bangun segiempat memiliki [ ... ] sisi lurus dan [ ... ] titik sudut tajam.' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Sebutkan 3 benda di dalam kamarmu yang berbentuk segiempat!' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Jika kertas segiempat dilipat miring dari pojok ke pojok, akan menghasilkan dua bangun berbentuk apa?' }
            ]
          },
          reflection_questions: ['Mengapa atap rumah banyak yang berbentuk segitiga miring?', 'Berapa roda mobil yang berbentuk segiempat? Kenapa tidak ada?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto rangka segiempat dan segitiga dari plastisin dan tusuk gigi yang kamu buat!' }]
      },
      {
        title: 'Pertemuan 17: Mengenal Bentuk Lengkung dan Lingkaran',
        order_index: 2,
        learning_objectives: 'Peserta didik mengenali bangun datar yang memiliki garis lengkung (lingkaran), memahami ketiadaan sudut tajam, dan membedakannya dari segiempat/segitiga.',
        content_text: 'Lingkaran tersusun atas satu garis lengkung tertutup tanpa sudut tajam, sehingga mudah menggelinding lancar di permukaan datar.',
        required_materials: ['Tutup toples bulat / piring plastik', 'Koin uang logam', 'Krayon dan kertas HVS'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita berkenalan dengan bentuk yang paling suka berputar dan menggelinding!"',
          ice_breaker: 'Putar Roda: Putar kedua lengan membentuk lingkaran besar di udara seperti kincir angin.',
          apperception: 'Gulingkan koin dan buku di atas meja: "Kenapa koin bisa meluncur berputar lancar sementara buku tidak bisa?"',
          trigger_question: 'Berapa sudut tajam yang menusuk jarimu saat kamu meraba tepian piring makan bulat?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Karakteristik garis lengkung mulus tanpa titik sudut pada lingkaran.',
          concrete_steps: [
            'Berikan tutup toples bulat: minta anak menelusuri tepiannya secara memutar tanpa henti.',
            'Tanya anak: "Apakah telunjukmu menemukan sudut tajam?" (Jawab: 0 sudut).',
            'Jiplak koin uang logam di atas kertas membentuk lingkaran sempurna.',
            'Gunting hasil jiplakan lingkaran tersebut.'
          ],
          script_parent: '"Lingkaran tidak memiliki sudut tajam sama sekali. Garis tepinya meliung bulat bersambung tanpa putus."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Balapan Menggelindingkan Benda',
          game_rules: ['Luncurkan benda bulat dan kotak di papan seluncur kardus; amati benda mana yang meluncur mulus.'],
          multi_grade_adaptation: {
            child_level_basic: 'Membedakan benda yang bisa menggelinding dan yang tidak.',
            child_level_advanced: 'Menjelaskan hubungan bentuk lingkaran dengan minimnya hambatan gesek.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menyortir bangun lingkaran dari kumpulan bangun datar visual.',
          worksheet_print_ready: {
            title: 'LKPD 4.2: BENTUK LENGKUNG DAN LINGKARAN',
            instructions: 'Amati bentuk visual berikut dan jawab pertanyaannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'SHAPE_CARD',
                question: 'Manakah di antara bangun berikut yang merupakan lingkaran?',
                data: {
                  shapes: [
                    { name: 'Segiempat', type: 'square' },
                    { name: 'Lingkaran', type: 'circle' },
                    { name: 'Segitiga', type: 'triangle' }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Lingkaran memiliki [ ... ] garis tepi lengkung dan [ ... ] titik sudut tajam.' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Sebutkan 2 benda di dapur rumahmu yang memiliki permukaan berbentuk lingkaran!' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Mengapa kancing baju dan roda sepeda kebanyakan dibuat berbentuk lingkaran?' }
            ]
          },
          reflection_questions: ['Apa jadinya jika roda sepeda motor kita berbentuk segitiga?', 'Benda apa di langit malam yang berbentuk lingkaran sempurna?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil jiplakan koin lingkaran pada LKPD 4.2 milikmu!' }]
      },
      {
        title: 'Pertemuan 18: Menyusun dan Mengurai Bentuk Datar (Tangram & Kreasi Bangun)',
        order_index: 3,
        learning_objectives: 'Peserta didik mengombinasikan bangun datar menjadi wujud baru dan menguraikan bangun gabungan menjadi bentuk dasarnya.',
        content_text: 'Komposisi dan dekomposisi geometri: memahami bahwa wujud baru dapat dibentuk dari susunan bangun datar sederhana (Tangram).',
        required_materials: ['Kertas origami warna-warni', 'Gunting tumpul dan lem', 'Keping pola tangram'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi perancang hebat! Hari ini kita bermain puzzle yang bisa berubah jadi aneka binatang dan roket!"',
          ice_breaker: 'Lipat Kertas: Lipat kertas origami segiempat jadi dua: "Hap! Berubah jadi apa?" (Dua segitiga!).',
          apperception: 'Tunjukkan gambar rumah: "Atapnya berbentuk apa? Temboknya berbentuk apa?"',
          trigger_question: 'Bisakah kita membuat sebuah perahu layar hanya dengan potongan segitiga dan segiempat?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Penggabungan dua segitiga menjadi segiempat dan penguraian bentuk.',
          concrete_steps: [
            'Dekatkan sisi miring dua segitiga origami sama ukuran: perlihatkan keduanya bersatu membentuk segiempat.',
            'Potong segiempat lurus menjadi dua: perlihatkan terbentuknya dua persegi panjang.',
            'Bimbing anak menata kepingan bangun dasar membentuk rumah di buku gambar.'
          ],
          script_parent: '"Bangun datar seperti potongan balok ajaib: jika disatukan dengan pas, mereka menciptakan wujud baru yang menakjubkan."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Tantangan Kreasi Tangram Cilik',
          game_rules: ['Tunjukkan siluet gambar (kucing/roket); anak berlomba menata kepingan bangun datar menutup siluet tersebut.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menyusun 3-4 keping bentuk dasar membentuk rumah atau perahu.',
            child_level_advanced: 'Menyusun puzzle tangram 7 keping utuh membentuk hewan atau manusia.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Membuat kolase tangram dan evaluasi Bab 4.',
          worksheet_print_ready: {
            title: 'LKPD 4.3: KREASI TANGRAM DAN EVALUASI BAB 4',
            instructions: 'Tempelkan potongan bangun datar origamimu membentuk karya gambar baru.',
            section_a_basic: [
              {
                id: 1,
                type: 'SHAPE_CARD',
                question: 'Gunakan kepingan bangun dasar berikut untuk merancang rumah impianmu:',
                data: {
                  shapes: [
                    { name: 'Atap', type: 'triangle' },
                    { name: 'Dinding', type: 'square' },
                    { name: 'Jendela', type: 'circle' }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Tuliskan jumlah kepingan yang kamu pakai: [ ... ] segitiga, [ ... ] segiempat, [ ... ] lingkaran.' }
            ],
            section_b_enrichment: [
              { id: 3, type: 'MATH_PROBLEM', question: 'Bagaimana cara membagi selembar roti tawar kotak segiempat menjadi dua segitiga yang sama besar?' }
            ]
          },
          reflection_questions: ['Bentuk apa yang paling kamu sukai saat membuat kolase tadi?', 'Mengapa potongan segitiga sangat fleksibel disusun?']
        },
        assignments: [
          {
            type: 'PHOTO_HOMEWORK',
            prompt: 'Foto karya kolase tempel bentuk origami (rumah/roket/perahu) di buku gambarmu!'
          },
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Evaluasi Akhir Bab 4: Mengenal Bentuk Datar',
            quiz_questions: [
              {
                question_text: 'Bangun datar yang memiliki 3 sisi lurus dan 3 sudut tajam adalah...',
                option_a: 'Segiempat',
                option_b: 'Segitiga',
                option_c: 'Lingkaran',
                option_d: 'Garis lengkung',
                correct_answer: 'B'
              },
              {
                question_text: 'Benda di rumah yang memiliki permukaan berbentuk lingkaran adalah...',
                option_a: 'Buku tulis',
                option_b: 'Pintu kamar',
                option_c: 'Tutup toples bulat',
                option_d: 'Layar televisi',
                correct_answer: 'C'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 5: AYO MEMBILANG 11 SAMPAI DENGAN 20 (3 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 5,
    title: 'Bab 5: Ayo Membilang 11 sampai dengan 20',
    target_semester: 2,
    week_target: 9,
    lessons: [
      {
        title: 'Pertemuan 19: Menghitung Maju 11–20 dan Membaca Lambang Bilangan',
        order_index: 1,
        learning_objectives: 'Peserta didik mampu membilang secara urut 11-20, membaca nama dan lambang bilangannya, serta memahami urutan maju dan mundur.',
        content_text: 'Membilang terurut 11-20 dan memahami bahwa bilangan belasan tersusun atas basis 10 ditambah angka satuan berikutnya (11 = 10 dan 1, 12 = 10 dan 2, dst.).',
        required_materials: ['20 batang sedotan / lidi', 'Kartu angka 11 sampai 20'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat datang di liga belasan! Jari tangan kita cuma 10, bagaimana kita menghitung lebih banyak?"',
          ice_breaker: 'Yel-yel Belasan: "Sepuluh dan satu: SEBELAS! Sepuluh dan dua: DUA BELAS!"',
          apperception: 'Buka 10 jari tangan penuh, minta anak membuka 3 jari: "Berapa jari yang terlihat sekarang?"',
          trigger_question: 'Mengapa angka belasan selalu dimulai dengan angka 1 di depannya?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Membilang terurut 11-20 dan menghubungkan jumlah sedotan dengan kartu lambangnya.',
          concrete_steps: [
            'Keluarkan 10 sedotan dalam satu baris.',
            'Tambahkan 1 sedotan di sebelahnya: hitung bersama "Sebelas (11)".',
            'Tambahkan lagi 1 sedotan: "Dua belas (12)". Lanjutkan hingga 20 sedotan.',
            'Latih menulis angka belasan dengan tarikan garis benar di buku kotak.'
          ],
          script_parent: '"Kata belasan berasal dari kata sepuluh dan satuan. Angka satu di depan melambangkan sepuluh."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Kartu Berantai Belasan',
          game_rules: ['Sebar kartu 11-20 secara acak; anak berlomba menyusun kartu berbaris rapi dari 11 sampai 20 secepat mungkin.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menyusun urutan kartu 11 sampai 20.',
            child_level_advanced: 'Menyusun kartu mundur dari 20 ke 11 dalam 20 detik.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menuliskan lambang dan nama bilangan belasan pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 5.1: MEMBILANG BILANGAN 11 SAMPAI 20',
            instructions: 'Hitung visual kotak ten-frame berikut dan tuliskan lambang bilangannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'TEN_FRAME',
                question: 'Hitung jumlah bulatan pada dua kotak berikut (10 + 4):',
                data: { frames: [{ filled: 10 }, { filled: 4 }] }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Tuliskan lambang bilangannya: tiga belas [ 13 ], lima belas [ 15 ], delapan belas [ 18 ]' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Lengkapi urutan: 11, 12, [ ... ], 14, 15, [ ... ], 17, 18, [ ... ], 20' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Urutkan bilangan mundur dari yang terbesar: 14, 19, 11, 17, 13 -> [ ..., ..., ..., ..., ... ]' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Bilangan berapakah yang terletak tepat di antara 16 dan 18?' }
            ]
          },
          reflection_questions: ['Benda apa di rumah yang jumlahnya belasan buah (11-20)?', 'Mengapa setelah 19 kita menyebutnya dua puluh?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto tulisan urutan bilangan 11-20 pada LKPD 5.1 di bukumu!' }]
      },
      {
        title: 'Pertemuan 20: Konsep Nilai Tempat: 1 Puluhan dan Satuan',
        order_index: 2,
        learning_objectives: 'Peserta didik memahami konsep nilai tempat bahwa bilangan belasan terdiri dari 1 puluhan dan sejumlah satuan.',
        content_text: 'Mengikat 10 satuan menjadi satu kelompok bernama "1 Puluhan". Bilangan 14 bermakna 1 puluhan (nilai 10) dan 4 satuan (nilai 4).',
        required_materials: ['20 batang stik es krim / lidi', '2 karet gelang', 'Wadah label PULUHAN dan SATUAN'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita mengepak barang ke dalam ikatan resmi sepuluh!"',
          ice_breaker: 'Tepuk Puluhan-Satuan: Ayah teriak "PULUHAN!" anak hentakkan kaki; "SATUAN!" anak tepuk tangan.',
          apperception: 'Bawa 14 lidi berceceran: "Lebih mudah membawa lidi berserakan atau diikat rapi sepuluh-sepuluh?"',
          trigger_question: 'Apa bedanya angka 1 pada bilangan 1 dengan angka 1 pada bilangan 17?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Pengikatan konkret 10 lidi menjadi 1 kelompok Puluhan.',
          concrete_steps: [
            'Minta anak menghitung 10 batang lidi, ikat erat dengan karet gelang. Letakkan di wadah "PULUHAN".',
            'Tegaskan: ini bernilai 1 PULUHAN (nilainya 10).',
            'Taruh 6 lidi lepas di wadah "SATUAN": bernilai 6 SATUAN.',
            'Gabungkan keduanya: 1 puluhan dan 6 satuan membentuk angka 16.'
          ],
          script_parent: '"Angka 1 di depan pada bilangan belasan itu memakai jubah pahlawan: dia bernilai sepuluh batang lidi yang diikat jadi satu."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Toko Penjual Puluhan dan Satuan',
          game_rules: ['Ayah memesan barang: "Tolong siapkan 17 lidi!"; anak harus cepat mengambil 1 ikat puluhan dan 7 lidi satuan ke meja.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menyiapkan bilangan 11-20 dengan 1 ikat puluhan dan satuan lepas.',
            child_level_advanced: 'Menyiapkan bilangan ratusan (misal 145 = 1 ratusan, 4 puluhan, 5 satuan).'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengisi tabel nilai tempat puluhan dan satuan pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 5.2: NILAI TEMPAT PULUHAN DAN SATUAN',
            instructions: 'Uraikan bilangan belasan ke dalam bentuk puluhan dan satuan.',
            section_a_basic: [
              {
                id: 1,
                type: 'TEN_FRAME',
                question: 'Visual Nilai Tempat: 1 Kotak Penuh (Puluhan) dan 6 Bulatan Lepas (Satuan):',
                data: { frames: [{ filled: 10 }, { filled: 6 }] }
              },
              { id: 2, type: 'MATH_PROBLEM', question: '14 = [ ... ] Puluhan + [ ... ] Satuan' },
              { id: 3, type: 'MATH_PROBLEM', question: '18 = [ ... ] Puluhan + [ ... ] Satuan' },
              { id: 4, type: 'MATH_PROBLEM', question: '1 Puluhan + 5 Satuan = Bilangan [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'MATH_PROBLEM', question: 'Pada bilangan 16, angka yang menempati nilai tempat puluhan adalah angka [ ... ], bernilai [ ... ].' },
              { id: 6, type: 'MATH_PROBLEM', question: 'Aku adalah bilangan belasan. Angka satuanku adalah 7. Bilangan berapakah aku?' }
            ]
          },
          reflection_questions: ['Mengapa kita membuat kelompok sepuluh untuk memudahkan berhitung?', 'Berapa ikat puluhan dari 20 batang lidi?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto ikatan 1 puluhan dan lidi satuan di mejamu beserta hasil LKPD 5.2!' }]
      },
      {
        title: 'Pertemuan 21: Membandingkan dan Mengurutkan Bilangan 11–20',
        order_index: 3,
        learning_objectives: 'Peserta didik mampu membandingkan dua bilangan belasan berdasarkan nilai tempatnya dan mengurutkan barisan bilangan 11-20.',
        content_text: 'Membandingkan bilangan dua digit: karena puluhannya sama-sama 1, penentu perbandingan terletak pada angka satuannya (18 > 14 karena 8 > 4).',
        required_materials: ['Kartu angka 11-20', 'Lidi ikat dan lepas'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita adu kekuatan angka belasan: siapa yang paling besar!"',
          ice_breaker: 'Kuis Kilat: Ayah sebut "15 vs 18!", anak serentak melompat ke kanan sambil teriak "18 LEBIH BESAR!"',
          apperception: 'Tunjukkan 13 lidi dan 17 lidi: "Keduanya sama-sama punya 1 ikat puluhan, lalu siapa yang menang?"',
          trigger_question: 'Mengapa angka 19 lebih besar dari 12 padahal angka depannya sama-sama 1?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Aturan membandingkan dua bilangan belasan berdasarkan angka satuan di belakang.',
          concrete_steps: [
            'Letakkan kartu 14 di kiri dan 17 di kanan.',
            'Kedua sisi sama-sama punya 1 ikat puluhan (imbang).',
            'Lihat satuannya: kiri 4 lidi, kanan 7 lidi.',
            'Karena 7 > 4, maka 17 lebih besar dari 14 (14 < 17).'
          ],
          script_parent: '"Jika puluhannya sudah sama-sama satu, langsung lihat satuannya di belakang. Satuan yang lebih besarlah pemenangnya."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Perang Kartu Belasan Terbesar',
          game_rules: ['Buka kartu angka 11-20 bersamaan; pemain dengan angka lebih besar menyebutkan perbandingannya untuk mengambil kartu lawan.'],
          multi_grade_adaptation: {
            child_level_basic: 'Membandingkan dua kartu belasan 11-20.',
            child_level_advanced: 'Membandingkan dua bilangan puluhan bebas hingga 100.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengurutkan rangkaian 5 bilangan belasan yang acak dan tes formatif Bab 5.',
          worksheet_print_ready: {
            title: 'LKPD 5.3: PERBANDINGAN DAN EVALUASI BAB 5',
            instructions: 'Beri tanda > (lebih besar) atau < (lebih kecil) dan urutkan bilangannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'LENGTH_COMPARE',
                question: 'Bandingkan panjang kedua barisan balok belasan berikut:',
                data: {
                  items: [
                    { name: 'Kelompok A', units: 15 },
                    { name: 'Kelompok B', units: 12 }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: '13 [ ... ] 19' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Urutkan dari terkecil ke terbesar: 16, 11, 20, 14, 17 -> [ ..., ..., ..., ..., ... ]' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Urutkan dari terbesar ke terkecil: 12, 18, 15, 13, 19 -> [ ..., ..., ..., ..., ... ]' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Maryam punya 16 stiker, Asiyah 14 stiker, Khadijah 18 stiker. Siapakah yang memiliki stiker paling banyak?' }
            ]
          },
          reflection_questions: ['Bagaimana cara termudah mengurutkan lima angka belasan yang acak?', 'Siapa yang punya uang lebih banyak: 15 ribu atau 18 ribu?']
        },
        assignments: [
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Evaluasi Akhir Bab 5: Membilang 11 sampai dengan 20',
            quiz_questions: [
              {
                question_text: 'Bilangan 17 terdiri atas...',
                option_a: '1 puluhan dan 7 satuan',
                option_b: '7 puluhan dan 1 satuan',
                option_c: '17 puluhan',
                option_d: '10 puluhan dan 7 satuan',
                correct_answer: 'A'
              },
              {
                question_text: 'Manakah tanda perbandingan yang benar untuk 14 [...] 19?',
                option_a: '>',
                option_b: '<',
                option_c: '=',
                option_d: '+',
                correct_answer: 'B'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 6: PENJUMLAHAN DAN PENGURANGAN SAMPAI DENGAN 20 (4 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 6,
    title: 'Bab 6: Penjumlahan dan Pengurangan sampai dengan 20',
    target_semester: 2,
    week_target: 11,
    lessons: [
      {
        title: 'Pertemuan 22: Penjumlahan Melewati Sepuluh dengan Strategi Make-10',
        order_index: 1,
        learning_objectives: 'Peserta didik terampil melakukan penjumlahan bilangan satu digit yang hasilnya melampaui 10 menggunakan strategi menggenapkan puluhan sepuluh (Make-10).',
        content_text: 'Strategi Make-10 memecah angka kedua agar dapat melengkapi angka pertama menjadi 10 bulat. Contoh: 8 + 5 = (8 + 2) + 3 = 10 + 3 = 13.',
        required_materials: ['2 lembar kertas Ten-Frame (petak sepuluh)', '20 butir kancing merah dan biru'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi para master strategi! Hari ini kita taklukkan penjumlahan tembus angka 10!"',
          ice_breaker: 'Kuis Kawan 10: "Delapan butuh berapa jadi 10? Sembilan butuh berapa jadi 10?"',
          apperception: 'Cerita bus: "Bus isi 10 bangku sudah duduk 8 anak. Naik lagi 5 anak. Berapa yang masuk bus pertama agar penuh?"',
          trigger_question: 'Jika menghitung 9 + 6, bisakah kita selesaikan tanpa menghitung jari dari angka 1?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Manipulasi fisik Ten-Frame memecah bilangan penambah untuk menggenapkan 10.',
          concrete_steps: [
            'Isi Ten-Frame 1 dengan 8 kancing merah (ada 2 kotak kosong).',
            'Pegang 5 kancing biru di tangan.',
            'Pindahkan 2 kancing biru menutup kotak kosong frame 1 hingga genap 10.',
            'Amati sisa kancing biru di tangan: masih ada 3 butir.',
            'Letakkan 3 butir sisa di frame 2 -> 10 + 3 = 13 (8 + 5 = 13).'
          ],
          script_parent: '"Genapkan dulu rumah sepuluhnya dengan meminjam kawan dari sebelah, lalu tempelkan sisanya."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Penuhkan Bus Sepuluh',
          game_rules: ['Lempar dua dadu (misal 9 dan 4); pemain pertama yang menyebutkan kalimat Make-10: "9 pinjam 1 jadi 10, sisa 3 jadi 13!" berhak mendapat skor.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menggunakan Ten-Frame fisik memindahkan kancing kawan 10.',
            child_level_advanced: 'Menerapkan strategi Make-100 secara mental (80 + 50 = 130).'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menyelesaikan penjumlahan Make-10 berbantuan visual ten-frame.',
          worksheet_print_ready: {
            title: 'LKPD 6.1: STRATEGI PENJUMLAHAN MAKE-10',
            instructions: 'Amati kotak sepuluh di bawah ini, pindahkan bulatan agar kotak pertama genap 10, lalu hitung totalnya.',
            section_a_basic: [
              {
                id: 1,
                type: 'TEN_FRAME',
                question: 'Selesaikan 8 + 5 dengan melengkapi kotak pertama menjadi 10:',
                data: { frames: [{ filled: 8 }, { filled: 5 }] }
              },
              { id: 2, type: 'MATH_PROBLEM', question: '9 + 4 = 9 + [ 1 ] + [ 3 ] = 10 + 3 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '7 + 5 = 7 + [ 3 ] + [ 2 ] = 10 + 2 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Di piring ada 8 kue cokelat dan 7 kue keju. Berapa total kue di piring? Tuliskan cara Make-10 nya!' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Isilah titik-titik: 6 + [ ... ] = 14' }
            ]
          },
          reflection_questions: ['Mengapa menghitung 10 + 3 lebih mudah daripada 8 + 5?', 'Berapa kawan yang dibutuhkan angka 8 agar jadi 10?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto latihan strategi Make-10 pada LKPD 6.1 milikmu!' }]
      },
      {
        title: 'Pertemuan 23: Pengurangan Belasan dengan Memecah Puluhan',
        order_index: 2,
        learning_objectives: 'Peserta didik mampu menyelesaikan pengurangan bilangan belasan (11-20) dengan strategi memecah puluhan sepuluh secara konseptual.',
        content_text: 'Pengurangan belasan (14 - 6): pecah 14 menjadi 10 dan 4. Kurangkan langsung dari sepuluhnya: 10 - 6 = 4. Gabungkan dengan sisa satuan: 4 + 4 = 8.',
        required_materials: ['1 ikat 10 lidi dan 5 lidi lepas', 'Lembar kerja'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi! Hari ini kita belajar cara membongkar ikatan puluhan untuk pengurangan!"',
          ice_breaker: 'Kuis Kilat Pengurangan 10: "10 - 7? 10 - 4? 10 - 8? 10 - 2?"',
          apperception: 'Tunjukkan 13 lidi: "Ayah mau ambil 5 lidi, padahal lidi lepas cuma ada 3. Dari mana kita ambil kekurangannya?"',
          trigger_question: 'Bagaimana cara membuka ikatan karet gelang untuk mengambil lidi yang kita butuhkan?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Pengurangan dari basis 10 (subtract from 10).',
          concrete_steps: [
            'Letakkan 1 ikat puluhan (10) dan 4 lidi lepas (angka 14). Soal: 14 - 6.',
            'Karena lidi lepas hanya 4, ambil langsung dari ikatan sepuluh: lepas karetnya, ambil 6 lidi.',
            'Hitung sisa dari ikatan sepuluh: tersisa 4 lidi (10 - 6 = 4).',
            'Gabungkan sisa tersebut dengan 4 lidi lepas mula-mula: 4 + 4 = 8 (14 - 6 = 8).'
          ],
          script_parent: '"Jika satuannya kurang, kurangkan langsung dari kelompok sepuluhnya, lalu gabungkan sisanya dengan satuan yang ada."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Toko Pembongkar Karet Gelang',
          game_rules: ['Anak menjadi kasir memegang ikatan puluhan; Ayah membeli barang seharga 7 koin lidi dari dompet berisi 13 lidi.'],
          multi_grade_adaptation: {
            child_level_basic: 'Pengurangan belasan dengan benda konkret lidi.',
            child_level_advanced: 'Pengurangan bersusun dua digit teknik meminjam puluhan.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menyelesaikan pengurangan belasan pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 6.2: PENGURANGAN BILANGAN BELASAN',
            instructions: 'Gunakan pemecahan puluhan sepuluh untuk mengurangkan bilangan berikut.',
            section_a_basic: [
              {
                id: 1,
                type: 'TEN_FRAME',
                question: 'Visual 14 dikurang 6: Kotak sepuluh dikurang 6 bersisa 4, lalu digabung 4 bulatan satuan:',
                data: { frames: [{ filled: 10 }, { filled: 4 }] }
              },
              { id: 2, type: 'MATH_PROBLEM', question: '13 - 5 = (10 - 5) + 3 = 5 + 3 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '15 - 7 = (10 - 7) + 5 = 3 + 5 = [ ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: '12 - 6 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 5, type: 'MATH_PROBLEM', question: 'Di meja ada 15 butir telur. 6 butir dipakai memasak. Berapa sisa telur di meja sekarang?' },
              { id: 6, type: 'MATH_PROBLEM', question: 'Mary memiliki 17 buku cerita. 9 buku dipinjam teman. Berapa buku yang tersisa di rak Maryam?' }
            ]
          },
          reflection_questions: ['Mengapa mengurangkan dari angka 10 jauh lebih mudah?', 'Apa bedanya 15 - 3 dengan 15 - 7?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto lembar pengerjaan pengurangan belasan LKPD 6.2 milikmu!' }]
      },
      {
        title: 'Pertemuan 24: Soal Cerita Bertingkat Penjumlahan dan Pengurangan s.d. 20',
        order_index: 3,
        learning_objectives: 'Peserta didik mampu menuntaskan soal cerita kontekstual bertingkat dua langkah yang memadukan operasi penjumlahan dan pengurangan rentang 1-20.',
        content_text: 'Numerasi dua langkah (two-step word problems): memahami alur kejadian berurutan (mula-mula ada barang, bertambah, kemudian berkurang).',
        required_materials: ['Papan tulis mini', 'Koin kelereng mainan'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi kapten! Hari ini kita pecahkan teka-teki soal cerita dua babak!"',
          ice_breaker: 'Tebak Alur: "Punya 5 koin. Diberi Ayah 3 koin (jadi 8). Hilang 2 koin. Sisa berapa?" (6!).',
          apperception: 'Cerita: "Ibu beli 12 jeruk. Ayah bawa 4 jeruk lagi. Lalu kita makan 5 jeruk. Bagaimana cara menghitungnya?"',
          trigger_question: 'Bagaimana cara membedakan mana yang harus ditambah dan mana yang harus dikurang?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Memecah cerita bertingkat menjadi Tahap 1 (tambah) dan Tahap 2 (kurang).',
          concrete_steps: [
            'Bacakan cerita kalimat demi kalimat.',
            'Tahap 1: "Ibu beli 12 jeruk, Ayah bawa 4 jeruk" -> 12 + 4 = 16 jeruk.',
            'Tahap 2: "Dimakan 5 jeruk" -> 16 - 5 = 11 jeruk.',
            'Tulis kesimpulan akhir: "Jadi, sisa jeruk di meja ada 11 buah."'
          ],
          script_parent: '"Cerita bertingkat seperti menaiki tangga lalu menuruninya: selesaikan langkah pertama, baru lanjutkan ke langkah berikutnya."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Permainan Petak Maju Mundur',
          game_rules: ['Bidak di lantai: kartu misi "Maju 5 langkah, lalu terkena jebakan mundur 2 langkah"; hitung posisi akhir.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menjalankan bidak dua langkah pada petak 1-20.',
            child_level_advanced: 'Menyelesaikan transaksi bertingkat nilai uang puluhan ribu.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menyelesaikan soal cerita bertingkat dua langkah pada lembar kerja.',
          worksheet_print_ready: {
            title: 'LKPD 6.3: SOAL CERITA DUA LANGKAH (BERTINGKAT)',
            instructions: 'Selesaikan soal cerita berikut dengan menuliskan tahap pengerjaannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'MATH_PROBLEM',
                question: 'Asiyah punya 8 pensil warna. Ibu membelikan 6 pensil lagi. Lalu Asiyah memberikan 4 pensil ke Khadijah. Berapa pensil Asiyah sekarang?\nTahap 1 (Tambah): [ ... + ... = ... ]\nTahap 2 (Kurang): [ ... - ... = ... ] pensil.'
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Ada 14 roti di meja. Adik memakan 2 roti. Ayah membawa pulang 5 roti lagi. Berapa jumlah roti di meja sekarang? [ ... ] roti.' }
            ],
            section_b_enrichment: [
              { id: 3, type: 'MATH_PROBLEM', question: 'Buatlah sebuah soal cerita bertingkat buatanmu sendiri yang melibatkan penjumlahan lalu pengurangan!' }
            ]
          },
          reflection_questions: ['Mengapa kita tidak boleh terburu-buru saat membaca soal cerita bertingkat?', 'Kapan barangmu pernah bertambah lalu berkurang?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto penyelesaian soal cerita bertingkat pada LKPD 6.3 milikmu!' }]
      },
      {
        title: 'Pertemuan 25: Evaluasi dan Penguatan Bab 6 (CBT & Portofolio Aritmetika)',
        order_index: 4,
        learning_objectives: 'Peserta didik mendemonstrasikan ketuntasan operasi penjumlahan dan pengurangan rentang 1-20 secara cepat, akurat, dan percaya diri.',
        content_text: 'Asesmen formatif Bab 6 untuk memastikan ketuntasan seluruh operasi hitung dasar Fase A sebelum melangkah ke pengukuran dan diagram.',
        required_materials: ['Stopwatch HP', 'Kartu soal evaluasi mandiri'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi sang juara! Hari ini kita uji kehebatan berhitung sampai angka 20!"',
          ice_breaker: 'Kuis Lisan Kilat: "9 + 5? 14 - 7? 8 + 8? 15 - 6?"',
          apperception: 'Review kilat trik bus Make-10 dan membongkar ikatan puluhan.',
          trigger_question: 'Berapa skor tertinggi yang bisa kamu raih di kuis CBT hari ini?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Review strategi mental math dan ketelitian membaca tanda operasi hitung.',
          concrete_steps: [
            'Latih ketelitian membaca simbol: jangan tertukar antara tanda (+) dan tanda (-).',
            'Beri tips memeriksa jawaban pengurangan dengan menjumlahkannya kembali ke atas.'
          ],
          script_parent: '"Juara matematika bukan hanya cepat, tetapi teliti. Periksa selalu tanda tambah dan kurangnya."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Papan Skor Bintang Emas',
          game_rules: ['Jawab 10 kartu soal berhitung cepat rentang 1-20 dalam waktu di bawah 5 detik per kartu.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menjawab soal rentang 1-20.',
            child_level_advanced: 'Menjawab soal operasi campuran tiga bilangan.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mengerjakan evaluasi formatif akhir bab di lembar kerja dan tes CBT.',
          worksheet_print_ready: {
            title: 'LKPD 6.4: EVALUASI TUNTAS BAB 6',
            instructions: 'Hitunglah operasi campuran penjumlahan dan pengurangan berikut.',
            section_a_basic: [
              { id: 1, type: 'MATH_PROBLEM', question: '8 + 7 = [ ... ]' },
              { id: 2, type: 'MATH_PROBLEM', question: '9 + 6 = [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: '15 - 8 = [ ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: '13 - 7 = [ ... ]' },
              { id: 5, type: 'MATH_PROBLEM', question: '11 + 4 - 3 = [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 6, type: 'MATH_PROBLEM', question: 'Di perpustakaan ada 12 buku. Masuk 6 buku baru. 5 buku dipinjam siswa. Berapa sisa buku di perpustakaan sekarang?' }
            ]
          },
          reflection_questions: ['Bagian berhitung mana yang paling kamu sukai di Bab 6 ini?', 'Apakah kamu sekarang sudah percaya diri melihat angka belasan?']
        },
        assignments: [
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Akhir Bab 6: Penjumlahan dan Pengurangan s.d. 20',
            quiz_questions: [
              {
                question_text: 'Hasil dari 8 + 7 adalah...',
                option_a: '14',
                option_b: '15',
                option_c: '16',
                option_d: '13',
                correct_answer: 'B'
              },
              {
                question_text: 'Hasil dari 16 - 9 adalah...',
                option_a: '6',
                option_b: '7',
                option_c: '8',
                option_d: '5',
                correct_answer: 'B'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 7: MENGUKUR PANJANG BENDA (2 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 7,
    title: 'Bab 7: Mengukur Panjang Benda',
    target_semester: 2,
    week_target: 14,
    lessons: [
      {
        title: 'Pertemuan 26: Membandingkan Panjang Dua Benda Secara Langsung',
        order_index: 1,
        learning_objectives: 'Peserta didik mampu membandingkan panjang dua benda secara langsung (lebih panjang, lebih pendek, sama panjang) dengan meratakan garis pangkal awal.',
        content_text: 'Prinsip pengukuran panjang: perbandingan visual hanya sah apabila garis start (baseline) kedua benda diletakkan sejajar rata.',
        required_materials: ['Pensil panjang dan pensil pendek', 'Sedotan utuh dan terpotong', 'Buku dan kotak pensil'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi para insinyur cilik! Hari ini kita menyelidiki panjang dan pendeknya seisi rumah!"',
          ice_breaker: 'Regang Tangan: "PANJANG SEPERTI KERETA API!", rapatkan telapak: "PENDEK SEPERTI SEMUT!"',
          apperception: 'Adu panjang pensil di meja dengan posisi satu pensil dimajukan: "Apakah adil kalau garis startnya tidak sama rata?"',
          trigger_question: 'Bagaimana cara membuktikan sapu lebih panjang dari kemoceng?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Aturan garis pangkal sejajar (baseline alignment) dalam perbandingan langsung.',
          concrete_steps: [
            'Buat garis lurus di meja menggunakan lakban kertas.',
            'Letakkan ujung bawah pensil A dan B menempel sejajar di garis tersebut.',
            'Lihat ujung atasnya: pensil yang menjulang lebih tinggi adalah yang LEBIH PANJANG.',
            'Gunakan istilah resmi: lebih panjang dari, lebih pendek dari, sama panjang dengan.'
          ],
          script_parent: '"Garis start harus selalu sama rata sejajar. Jika garis awalnya curang, perbandingannya tidak sah."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Tantangan Menara Pensil Berbaris',
          game_rules: ['Kumpulkan 5 alat tulis di meja, susun berbaris dari yang paling pendek ke yang paling panjang dalam 1 menit.'],
          multi_grade_adaptation: {
            child_level_basic: 'Membandingkan dan mengurutkan 3-5 benda fisik secara langsung.',
            child_level_advanced: 'Mengukur panjang benda menggunakan penggaris sentimeter (cm) baku.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Menyelesaikan lembar perbandingan visual batang pada LKPD.',
          worksheet_print_ready: {
            title: 'LKPD 7.1: MEMBANDINGKAN PANJANG BENDA',
            instructions: 'Amati visual perbandingan panjang di bawah ini, lalu jawab pertanyaannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'LENGTH_COMPARE',
                question: 'Amati kedua benda berikut, benda manakah yang lebih panjang?',
                data: {
                  items: [
                    { name: 'Sapu Lantai', units: 9 },
                    { name: 'Kemoceng Bulu', units: 4 }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Penghapus karet [ ... ] daripada pensil baru.' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Urutkan benda dari yang paling pendek: Krayon, Tongkat Pramuka, Sendok -> [ ..., ..., ... ]' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Mengapa saat mengukur tinggi badan di posyandu anak harus berdiri tegak merapat ke dinding tanpa memakai alas kaki?' }
            ]
          },
          reflection_questions: ['Benda apa di kamarmu yang paling panjang ukurannya?', 'Benda apa di kamarmu yang paling pendek ukurannya?']
        },
        assignments: [{ type: 'PHOTO_HOMEWORK', prompt: 'Foto hasil pengerjaan LKPD 7.1 perbandingan panjang benda!' }]
      },
      {
        title: 'Pertemuan 27: Mengukur Panjang dengan Satuan Tidak Baku Berulang',
        order_index: 2,
        learning_objectives: 'Peserta didik mampu mengukur panjang benda menggunakan satuan tidak baku (jengkal tangan, klip kertas, korek api) yang ditata rapat tanpa celah dan tanpa tumpang tindih.',
        content_text: 'Satuan pengukuran berulang (unit iteration): mengukur panjang adalah membilang berapa kali suatu satuan pas menutup panjang benda dari ujung ke ujung.',
        required_materials: ['1 kotak klip kertas ukuran sama', 'Pensil warna', 'Buku gambar'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat pagi tukang ukur hebat! Hari ini kita mengukur meja makan menggunakan tangan dan klip kertas!"',
          ice_breaker: 'Buka Jengkal: Rentangkan jempol dan kelingking lebar: "Ini jengkalku, siap mengukur dunia!"',
          apperception: 'Rentangkan jengkal anak di atas buku tulis: "Ada berapa jengkal panjang bukumu?"',
          trigger_question: 'Mengapa klip kertas saat mengukur harus disambung rapat dan tidak boleh bertumpuk?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Prinsip pengukuran rapat tanpa celah dan tanpa tumpang tindih.',
          concrete_steps: [
            'Letakkan klip kertas pertama tepat di ujung kiri buku gambar.',
            'Sambung klip kedua menyentuh ujung klip pertama hingga mencapai ujung kanan.',
            'Hitung jumlah klip kertas: "Panjang buku gambar = 8 klip kertas."',
            'Ajarkan mengukur meja dengan jengkal melompat teratur dari kelingking ke jempol.'
          ],
          script_parent: '"Alat ukur berulang harus berbaris rapi seperti semut: menyentuh ujung ke ujung, tidak boleh miring, dan tidak boleh bertumpuk."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Ekspedisi Jengkal Detektif Rumah',
          game_rules: ['Ukur Meja Belajar, Layar TV, dan Bantal Tidur menggunakan jengkal tangan; catat hasilnya di tabel.'],
          multi_grade_adaptation: {
            child_level_basic: 'Mengukur 3 benda rumah tangga menggunakan jengkal tangan.',
            child_level_advanced: 'Membandingkan hasil jengkal anak dengan jengkal Ayah dan menjelaskan mengapa hasilnya berbeda.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Mencatat hasil pengukuran satuan tidak baku dan tes formatif Bab 7.',
          worksheet_print_ready: {
            title: 'LKPD 7.2: MENGUKUR DENGAN SATUAN TIDAK BAKU & EVALUASI BAB 7',
            instructions: 'Amati visual pengukuran klip kertas berikut dan jawab pertanyaannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'LENGTH_COMPARE',
                question: 'Berapa panjang kotak pensil dan buku gambar dalam satuan klip kertas?',
                data: {
                  items: [
                    { name: 'Kotak Pensil', units: 6 },
                    { name: 'Buku Gambar', units: 8 }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Panjang meja belajar setelah diukur = [ ... ] jengkal tangan anak.' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Benda yang membutuhkan klip kertas paling banyak adalah [ ... ]' }
            ],
            section_b_enrichment: [
              { id: 4, type: 'MATH_PROBLEM', question: 'Ayah mengukur meja menghasilkan 6 jengkal. Anak mengukur meja yang sama menghasilkan 9 jengkal. Mengapa hasil ukur jengkal anak lebih banyak daripada Ayah?' }
            ]
          },
          reflection_questions: ['Mengapa kita membutuhkan penggaris sentimeter baku di sekolah?', 'Apa yang terjadi jika penjual kain memakai jengkal tangannya sendiri?']
        },
        assignments: [
          {
            type: 'VOICE_TASK',
            prompt: 'Kirim rekaman suaramu: Sebutkan 3 benda yang kamu ukur dengan jengkal tangan dan mana yang paling panjang!'
          },
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Evaluasi Akhir Bab 7: Mengukur Panjang Benda',
            quiz_questions: [
              {
                question_text: 'Syarat utama saat membandingkan panjang dua pensil secara langsung adalah...',
                option_a: 'Kedua pensil harus diletakkan sejajar dari garis awal yang sama',
                option_b: 'Pensil harus diletakkan miring',
                option_c: 'Satu pensil ditaruh lebih maju',
                option_d: 'Pensil harus berwarna sama',
                correct_answer: 'A'
              },
              {
                question_text: 'Meja A panjangnya 8 jengkal. Meja B panjangnya 5 jengkal. Meja yang lebih panjang adalah...',
                option_a: 'Meja B',
                option_b: 'Meja A',
                option_c: 'Kedua meja sama panjang',
                option_d: 'Tidak dapat diukur',
                correct_answer: 'B'
              }
            ]
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // BAB 8: MENGENAL DIAGRAM PIKTOGRAM (2 PERTEMUAN)
  // ===========================================================================
  {
    chapter_number: 8,
    title: 'Bab 8: Mengenal Diagram Piktogram',
    target_semester: 2,
    week_target: 15,
    lessons: [
      {
        title: 'Pertemuan 28: Menyortir Data dan Menyajikan Diagram Gambar (Piktogram)',
        order_index: 1,
        learning_objectives: 'Peserta didik mampu menyortir data objek konkret (maksimal 4 kategori), menyajikannya ke dalam diagram gambar (piktogram) skala 1-ke-1, serta membaca kesimpulan informasinya.',
        content_text: 'Penyajian data piktogram: mengubah data berserakan menjadi bagan visual yang rapi. Membaca kolom tertinggi sebagai yang terbanyak dan terendah sebagai yang tersedikit.',
        required_materials: ['Aneka buah / aneka mainan (mobil, lego, bola)', 'Kertas karton bagan 4 kolom', 'Stiker bintang'],
        intro_guide: {
          duration_minutes: 10,
          greeting: '"Selamat datang di laboratorium analis data cilik! Hari ini kita membaca rahasia data lewat gambar!"',
          ice_breaker: 'Tepuk Buah: Ayah sebut "Apel!" (anak lompat), sebut "Pisang!" (anak tepuk tangan 2 kali).',
          apperception: 'Tumpahkan sekeranjang mainan campur aduk: "Bagaimana cara kita tahu mainan apa yang paling banyak tanpa menghitung ulang terus?"',
          trigger_question: 'Jika ada 5 gambar mobil di tiang diagram dan 1 gambar mewakili 1 mobil, berapa mobil yang ada sebenarnya?'
        },
        mindful_guide: {
          duration_minutes: 20,
          concept_focus: 'Penyortiran kategori dan representasi 1-to-1 pada bagan piktogram.',
          concrete_steps: [
            'Sortir mainan di lantai ke dalam 3 kelompok: Mobil, Lego, dan Balok.',
            'Gelar kertas bagan berkolom di meja.',
            'Tempelkan 1 stiker bintang di kolom Mobil untuk mewakili 1 mobil nyata (disusun dari bawah ke atas).',
            'Lakukan hal yang sama untuk kolom Lego dan Balok.',
            'Tunjukkan cara membaca bagan: kolom dengan menara stiker paling tinggi adalah mainan yang paling banyak.'
          ],
          script_parent: '"Diagram gambar seperti foto barisan lomba: dengan sekali pandang matamu langsung tahu siapa menara yang paling tinggi tanpa perlu membaca tulisan panjang."'
        },
        joyful_guide: {
          duration_minutes: 20,
          game_title: 'Sensus Sarapan Favorit Keluarga',
          game_rules: ['Wawancarai anggota keluarga di rumah: "Pilih 1 makanan: Nasi Goreng, Roti Bakar, atau Telur?"; tempel stiker suara pada papan diagram piktogram.'],
          multi_grade_adaptation: {
            child_level_basic: 'Menyusun diagram piktogram skala 1 gambar = 1 orang.',
            child_level_advanced: 'Mencatat data dengan turus lidi (||||) dan diagram berskala 1 gambar = 2 benda.'
          }
        },
        meaningful_guide: {
          duration_minutes: 15,
          task_focus: 'Membaca dan menafsirkan tabel visual diagram piktogram buah kesukaan.',
          worksheet_print_ready: {
            title: 'LKPD 8.1: DIAGRAM GAMBAR PIKTOGRAM & KELULUSAN MATEMATIKA KELAS 1',
            instructions: 'Amati tabel diagram piktogram buah kesukaan di bawah ini dengan teliti, lalu jawab pertanyaannya.',
            section_a_basic: [
              {
                id: 1,
                type: 'PICT_CHART',
                question: 'Tabel Diagram Piktogram Buah Favorit Siswa (1 Bintang = 1 Anak):',
                data: {
                  categories: [
                    { name: 'Apel', count: 5 },
                    { name: 'Pisang', count: 3 },
                    { name: 'Jeruk', count: 6 },
                    { name: 'Mangga', count: 2 }
                  ]
                }
              },
              { id: 2, type: 'MATH_PROBLEM', question: 'Buah apakah yang paling banyak disukai berdasarkan diagram di atas? [ ... ]' },
              { id: 3, type: 'MATH_PROBLEM', question: 'Buah apakah yang paling sedikit disukai siswa? [ ... ]' },
              { id: 4, type: 'MATH_PROBLEM', question: 'Berapa banyak anak yang menyukai buah apel? [ ... ] anak.' },
              { id: 5, type: 'MATH_PROBLEM', question: 'Berapa selisih antara anak yang menyukai buah jeruk dan mangga? (6 - 2 = [ ... ] anak)' }
            ],
            section_b_enrichment: [
              {
                id: 6,
                type: 'PICT_CHART',
                question: 'Gunakan data diagram piktogram buah favorit di atas untuk menjawab pertanyaan logika berikut:',
                data: {
                  categories: [
                    { name: 'Apel', count: 5 },
                    { name: 'Pisang', count: 3 },
                    { name: 'Jeruk', count: 6 },
                    { name: 'Mangga', count: 2 }
                  ]
                }
              },
              { id: 7, type: 'MATH_PROBLEM', question: 'Berapa jumlah seluruh anak yang ikut memilih dalam survei buah tersebut? [ ... ] anak.' },
              { id: 8, type: 'MATH_PROBLEM', question: 'Jika esok hari ada 3 anak baru yang semuanya memilih buah Pisang, buah apakah yang sekarang menjadi paling banyak disukai? [ ... ]' }
            ]
          },
          reflection_questions: ['Kapan seorang pemilik toko butuh melihat diagram penjualan barangnya?', 'Apakah kamu bangga sudah menyelesaikan seluruh petualangan Matematika Kelas 1?']
        },
        assignments: [
          {
            type: 'PHOTO_HOMEWORK',
            prompt: 'Foto bagan diagram piktogram sensus sarapan keluarga yang sudah kamu tempel rapi di bukumu!'
          },
          {
            type: 'QUIZ_CBT',
            prompt: 'Kuis Akhir Bab 8 & Kelulusan Matematika Fase A (Kelas 1)',
            quiz_questions: [
              {
                question_text: 'Pada diagram piktogram, Kolom Kucing memiliki 6 gambar dan Kolom Kelinci memiliki 4 gambar. Hewan yang paling banyak adalah...',
                option_a: 'Kelinci',
                option_b: 'Kucing',
                option_c: 'Kedua hewan sama banyak',
                option_d: 'Tidak ada yang benar',
                correct_answer: 'B'
              },
              {
                question_text: 'Berapakah selisih antara 6 gambar kucing dan 4 gambar kelinci?',
                option_a: '1',
                option_b: '2',
                option_c: '3',
                option_d: '10',
                correct_answer: 'B'
              },
              {
                question_text: 'Jika 1 gambar bintang mewakili 1 buku, maka 5 gambar bintang mewakili berapa buku?',
                option_a: '1 buku',
                option_b: '3 buku',
                option_c: '5 buku',
                option_d: '10 buku',
                correct_answer: 'C'
              }
            ]
          }
        ]
      }
    ]
  }
];

async function seedMatematikaLengkap28Pertemuan() {
  console.log('================================================================');
  console.log('📐 SEEDING RESMI: MATEMATIKA FASE A (28 PERTEMUAN VISUAL TERSTRUKTUR)');
  console.log('================================================================');

  console.log('\n🧹 [1/3] Menghapus data kurikulum lama agar bebas duplikasi...');

  const { data: existingClass } = await supabase
    .from('classes')
    .select('id')
    .eq('grade_level', 1)
    .maybeSingle();

  if (existingClass) {
    const classId = existingClass.id;

    const { data: existingSubjects } = await supabase
      .from('subjects')
      .select('id')
      .eq('class_id', classId);

    const subjectIds = (existingSubjects ?? []).map((s) => s.id);

    if (subjectIds.length > 0) {
      const { data: existingModules } = await supabase
        .from('modules')
        .select('id')
        .in('subject_id', subjectIds);

      const moduleIds = (existingModules ?? []).map((m) => m.id);

      if (moduleIds.length > 0) {
        const { data: existingLessons } = await supabase
          .from('lessons')
          .select('id')
          .in('module_id', moduleIds);

        const lessonIds = (existingLessons ?? []).map((l) => l.id);

        if (lessonIds.length > 0) {
          await supabase.from('lesson_schedules').delete().in('lesson_id', lessonIds);
          await supabase
            .from('learning_competency_evaluations')
            .delete()
            .in('lesson_id', lessonIds);
          await supabase.from('lesson_completions').delete().in('lesson_id', lessonIds);

          const { data: existingAssignments } = await supabase
            .from('assignments')
            .select('id')
            .in('lesson_id', lessonIds);

          const assignmentIds = (existingAssignments ?? []).map((a) => a.id);

          if (assignmentIds.length > 0) {
            await supabase.from('quiz_questions').delete().in('assignment_id', assignmentIds);
            await supabase.from('submissions').delete().in('assignment_id', assignmentIds);
            await supabase.from('assignments').delete().in('id', assignmentIds);
          }

          await supabase.from('lessons').delete().in('id', lessonIds);
        }

        await supabase.from('modules').delete().in('id', moduleIds);
      }

      await supabase.from('subjects').delete().in('id', subjectIds);
    }

    await supabase.from('classes').delete().eq('id', classId);
    console.log('   ✓ Seluruh data lama Kelas 1 berhasil dibersihkan.');
  } else {
    console.log('   ✓ Basis data sudah bersih.');
  }

  console.log('\n🏫 [2/3] Mendaftarkan Kelas 1 SD dan Mapel Matematika...');

  const { data: newClass, error: classErr } = await supabase
    .from('classes')
    .insert({
      name: 'Kelas 1 SD (Fase A)',
      grade_level: 1,
      academic_year: '2026/2027',
    })
    .select('id')
    .single();

  if (classErr || !newClass) {
    console.error('Gagal membuat kelas:', classErr?.message);
    process.exit(1);
  }

  const classId = newClass.id;
  console.log(`   ✓ Kelas 1 SD terdaftar (ID: ${classId})`);

  const { data: newSubject, error: subjErr } = await supabase
    .from('subjects')
    .insert({
      class_id: classId,
      name: 'Matematika',
      code: 'MTK-1',
    })
    .select('id')
    .single();

  if (subjErr || !newSubject) {
    console.error('Gagal membuat mapel Matematika:', subjErr?.message);
    process.exit(1);
  }

  const subjectId = newSubject.id;
  console.log(`   ✓ Mata Pelajaran Matematika terdaftar (ID: ${subjectId})`);

  console.log('\n📚 [3/3] Menyimpan 8 Bab dan 28 Pertemuan Ajar dengan Visual Terstruktur...');

  let totalLessonsCreated = 0;

  for (const chapter of CHAPTERS_DATA) {
    console.log(`\n📦 Menyimpan ${chapter.title} (Pekan Target: ${chapter.week_target})...`);

    const { data: modData, error: modErr } = await supabase
      .from('modules')
      .insert({
        subject_id: subjectId,
        title: chapter.title,
        order_index: chapter.chapter_number,
        target_semester: chapter.target_semester,
        week_target: chapter.week_target,
        is_published: true,
      })
      .select('id')
      .single();

    if (modErr || !modData) {
      console.error(`Gagal menyimpan bab ${chapter.title}:`, modErr?.message);
      continue;
    }

    const moduleId = modData.id;

    for (const lesson of chapter.lessons) {
      console.log(`   └─ 📖 [Sesi ${lesson.order_index}] ${lesson.title}`);

      const { data: lesData, error: lesErr } = await supabase
        .from('lessons')
        .insert({
          module_id: moduleId,
          title: lesson.title,
          order_index: lesson.order_index,
          content_type: 'TEXT',
          content_text: lesson.content_text,
          learning_objectives: lesson.learning_objectives,
          allocated_minutes: 70,
          required_materials: lesson.required_materials,
          intro_guide: lesson.intro_guide,
          mindful_guide: lesson.mindful_guide,
          joyful_guide: lesson.joyful_guide,
          meaningful_guide: lesson.meaningful_guide,
        })
        .select('id')
        .single();

      if (lesErr || !lesData) {
        console.error(`Gagal menyimpan materi ${lesson.title}:`, lesErr?.message);
        continue;
      }

      totalLessonsCreated++;
      const lessonId = lesData.id;

      for (const asg of lesson.assignments) {
        const { data: asgData, error: asgErr } = await supabase
          .from('assignments')
          .insert({
            lesson_id: lessonId,
            type: asg.type,
            prompt: asg.prompt,
            quiz_question_count: asg.quiz_questions ? asg.quiz_questions.length : 5,
            passing_score: 70,
          })
          .select('id')
          .single();

        if (asgErr || !asgData) {
          console.error(`Gagal membuat tugas ${asg.type}:`, asgErr?.message);
          continue;
        }

        if (asg.type === 'QUIZ_CBT' && asg.quiz_questions) {
          for (let qIdx = 0; qIdx < asg.quiz_questions.length; qIdx++) {
            const q = asg.quiz_questions[qIdx];
            await supabase.from('quiz_questions').insert({
              assignment_id: asgData.id,
              question_text: q.question_text,
              option_a: q.option_a,
              option_b: q.option_b,
              option_c: q.option_c,
              option_d: q.option_d,
              correct_answer: q.correct_answer,
              order_index: qIdx + 1,
            });
          }
        }
      }
    }
  }

  console.log('\n================================================================');
  console.log('🎉 SEEDING BERHASIL 100%!');
  console.log(`Total 8 Bab dan ${totalLessonsCreated} Pertemuan Ajar tersimpan dengan visual terstruktur.`);
  console.log('================================================================\n');
}

seedMatematikaLengkap28Pertemuan().catch((err) => {
  console.error('Terjadi kesalahan fatal saat seeding:', err);
  process.exit(1);
});