<div align="center">

# 🎒 Vokid LMS
### Next-Generation LMS Sekolah Dasar Berbasis Kurikulum Merdeka

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-emerald?logo=supabase&logoColor=white)](https://supabase.com/)
[![Cloudflare R2](https://img.shields.io/badge/Storage-Cloudflare%20R2-orange?logo=cloudflare&logoColor=white)](https://www.cloudflare.com/products/r2/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  Platform Pembelajaran Interaktif yang dirancang khusus untuk siswa Sekolah Dasar (SD) Indonesia dengan pendekatan <b>Mobile-First Gamified</b>, memfasilitasi <b>Fase A (Kelas 1-2)</b> berbasis audio/suara visual dan <b>Fase B & C (Kelas 3-6)</b> berbasis literasi, video, serta ujian CBT interaktif.
</p>

</div>

---

## 🌟 Fitur Unggulan

### 1. 🎓 Portal Siswa Adaptif (Per Fase Perkembangan)
- **Fase A (Kelas 1 & 2 SD - Literasi Dini)**:
  - Antarmuka super ceria dengan tombol ramah sentuhan tangan anak (*thumb-friendly*).
  - **Tugas Rekaman Suara**: Siswa menjawab instruksi guru hanya dengan menekan tombol mikrofon tanpa perlu mengetik teks rumit.
  - **Pemutar Instruksi Audio Guru**: Siswa dapat mendengarkan arahan suara guru secara langsung.
- **Fase B & C (Kelas 3 - 6 SD - Transisi Kemandirian)**:
  - Pembelajaran berbasis Bab & Modul terstruktur (*Learning Journey*).
  - Dukungan beragam media: Video Interaktif (YouTube Embed responsif), Materi Bacaan, dan Dokumen PDF LKPD.
  - **Foto PR / Lembar Kerja**: Siswa dapat mengunggah bukti pengerjaan buku tulis mereka ke penyimpanan awan.

### 2. ⚡ Kuis CBT Interaktif (Computer Based Test)
- **Bank Soal & Pengacakan (Randomized Question Pool)**: Soal diacak (*Fisher-Yates shuffle*) dari bank soal guru dengan pembatasan jumlah soal tampil.
- **Integritas Ujian Terjamin**: Kunci jawaban tetap berada di server, tidak pernah dibocorkan ke client.
- **Koreksi Otomatis Real-time**: Jawaban langsung dikoreksi otomatis di server dan nilai langsung tersimpan ke Supabase.
- **Gamifikasi & Selebrasi Skor**:
  - Efek kembang api konfeti dinamis untuk skor sempurna 100 (*Perfect Score*).
  - Tinjauan skor instan dengan indikator ketuntasan KKM.
  - Opsi *Ulangi Kuis* dengan kombinasi soal acak baru.

### 3. 👩‍🏫 Manajemen Kurikulum & Guru (Teacher Workspace)
- **Hierarki 5-Tingkat Kurikulum Merdeka**:
  - `Tingkat 1: Kelas (Fase)` ➔ `Tingkat 2: Mata Pelajaran` ➔ `Tingkat 3: Bab (Modul)` ➔ `Tingkat 4: Materi Pembelajaran` ➔ `Tingkat 5: Penugasan Siswa`.
- **Drawer Manajemen Cepat**: Tambah, edit, dan susun kurikulum tanpa berpindah halaman secara rumit.
- **Unggah PDF Langsung ke Cloudflare R2**: Dilengkapi pratinjau instan berkas dokumen.
- **Pusat Penilaian & Evaluasi**:
  - Antrean tugas suara dan foto PR yang menunggu penilaian guru.
  - Pemutar audio terintegrasi untuk mendengarkan rekaman suara jawaban siswa.
  - Pembesar foto pengerjaan tugas (*Interactive Image Viewer*).
  - Formulir penilaian cepat dengan dukungan rekaman audio umpan balik (*Voice Feedback*) dari guru untuk siswa.

---

## 🛠️ Arsitektur & Teknologi

| Layer | Teknologi | Keterangan |
|---|---|---|
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Server Actions, Streaming, Route Groups `(dashboard)` & `(portal)` |
| **Frontend** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Type-safe end-to-end tanpa penggunaan `any` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Mobile-native design, transisi halus, glassmorphism |
| **Database & Auth** | [Supabase PostgreSQL](https://supabase.com/) | Row Level Security (RLS), Supabase SSR Client |
| **Media Storage** | [Cloudflare R2](https://www.cloudflare.com/products/r2/) via S3 SDK | Penyimpanan berkas rekaman suara, foto PR, dan PDF |
| **Ikon & Efek** | [Lucide React](https://lucide.dev/) + [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) | Ikonografi modern dan efek selebrasi gamifikasi |
| **Testing** | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | Unit and Component Testing |

---

## 📁 Struktur Direktori

```text
vokid-lms-nextjs/
├── app/                           # Next.js App Router
│   ├── (auth)/login/              # Autentikasi Guru & Siswa
│   ├── (dashboard)/guru/          # Workspace Pendidik & Penilaian
│   │   ├── kelas/[id]/materi/     # Kurikulum Hierarkis Bab & Materi
│   │   ├── penilaian/             # Antrean & Lembar Koreksi Guru
│   │   └── siswa/                 # Rekapitulasi Kemajuan Siswa
│   ├── (portal)/siswa/            # Portal Belajar Siswa (Fase A/B/C)
│   │   └── kelas/[id]/bab/        # Learning Journey per Bab
│   └── api/                       # Media Proxy & Upload Handlers
├── features/                      # Domain-Driven Architecture
│   ├── shared/                    # Layanan bersama (Storage, S3 R2 client)
│   ├── student/                   # Logika & UI Siswa (CBT, Audio, Foto)
│   └── teacher/                   # Logika & UI Guru (Kurikulum, Grading)
├── lib/                           # Konfigurasi Supabase, Formatter & Validasi Zod
├── supabase/
│   └── migrations/                # Skema SQL, Enum, RLS & Seed Data
└── types/                         # Definisi Tipe Database & Schema
```

---

## 🚀 Memulai (Getting Started)

### Prasyarat
- Node.js versi 20 atau lebih baru.
- Akun [Supabase](https://supabase.com/) (atau instans PostgreSQL lokal).
- Akun [Cloudflare R2](https://dash.cloudflare.com/) (opsional untuk penyimpanan berkas).

### 1. Klon Repositori
```bash
git clone https://github.com/hariantorais/vokid-lms-nextjs.git
cd vokid-lms-nextjs
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (`.env.local`)
Buat berkas `.env.local` di root proyek dan lengkapi konfigurasi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudflare R2 / S3 Storage (Opsional untuk Upload Media)
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=your-bucket-name
R2_PUBLIC_DOMAIN=https://your-cdn.example.com
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di peramban Anda.

---

## 🧪 Validasi & Pengujian

Jalankan perintah pengujian dan verifikasi tipe:

```bash
# Menjalankan unit test
npm test

# Build untuk produksi
npm run build
```

---

## 📝 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
Dikembangkan dengan ❤️ untuk kemajuan pendidikan anak Indonesia.
