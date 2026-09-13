import Link from 'next/link';
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Users,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Heart,
  Star,
  Play,
  Rocket,
  Target,
  Compass,
  Award as AwardIcon,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Calculator,
  Languages,
  Palette,
  Globe,
  Flag,
  Dumbbell,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">

      {/* ==================================================================
          1. STICKY NAVBAR
         ================================================================== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black flex items-center justify-center text-xl shadow-md shadow-amber-300/50 group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Vo<span className="text-amber-500">kid</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#fitur" className="hover:text-amber-600 transition-colors">
              Fitur
            </a>
            <a href="#akselerasi" className="hover:text-amber-600 transition-colors">
              Akselerasi
            </a>
            <a href="#kurikulum" className="hover:text-amber-600 transition-colors">
              Kurikulum
            </a>
            <a href="#testimoni" className="hover:text-amber-600 transition-colors">
              Testimoni
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:block px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-sm hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ==================================================================
          2. HERO SECTION
         ================================================================== */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-amber-300/60 rounded-full text-amber-900 text-xs font-black shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>LMS ADAPTIF KURIKULUM MERDEKA</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                Belajar SD Jadi{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-amber-500">Menyenangkan</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-200/60 -z-0 rounded" />
                </span>
                {' '}&{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-sky-600">Adaptif</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-sky-200/60 -z-0 rounded" />
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Platform pembelajaran <strong className="text-slate-900">Fase A (Kelas 1–2)</strong> dan{' '}
                <strong className="text-slate-900">Fase B/C (Kelas 3–6)</strong> dengan pendekatan{' '}
                <em className="text-amber-600 not-italic font-bold">Mindful, Joyful, Meaningful</em>.
                Dilengkapi program <strong className="text-sky-700">akselerasi</strong> untuk anak yang tertinggal.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base hover:shadow-xl hover:shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Mulai Petualangan</span>
                </Link>
                <Link
                  href="#fitur"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-bold text-base hover:border-slate-300 hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Lihat Fitur</span>
                </Link>
              </div>

              {/* Stats Mini */}
              <div className="flex items-center gap-6 pt-4 justify-center lg:justify-start flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['👦', '👧', '🧒', '👦'].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 border-2 border-white flex items-center justify-center text-sm shadow-sm"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    <div className="text-slate-900">100+ Siswa</div>
                    <div className="text-slate-500 font-medium">Aktif Belajar</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    <div className="text-slate-900">4.9/5.0</div>
                    <div className="text-slate-500 font-medium">Rating Orang Tua</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Illustration */}
            <div className="relative">
              {/* Main Card Mockup */}
              <div className="relative z-10 mx-auto max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border-2 border-slate-100 p-5 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        Selamat Pagi, Maryam!
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-black">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>12</span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
                      <div className="text-[10px] font-black uppercase opacity-80">
                        PELAJARAN HARI INI
                      </div>
                      <div className="text-sm font-black mt-1">
                        🧮 Matematika — Membilang 1-5
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[10px] font-bold">
                        <Clock className="w-3 h-3" />
                        <span>70 menit</span>
                        <span>•</span>
                        <span>Pagi</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200">
                        <div className="text-[10px] font-black text-sky-700 uppercase">
                          Misi
                        </div>
                        <div className="text-xs font-bold text-slate-800 mt-1">
                          🎤 Rekam Suara
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                        <div className="text-[10px] font-black text-purple-700 uppercase">
                          Bintang
                        </div>
                        <div className="text-xs font-bold text-slate-800 mt-1">
                          ⭐ 3 Bintang
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 border border-amber-200">
                      <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm">
                        ✓
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">
                          Progres Mingguan
                        </div>
                        <div className="w-full h-2 rounded-full bg-amber-100 overflow-hidden mt-1">
                          <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                        </div>
                      </div>
                      <div className="text-xs font-black text-amber-700">75%</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl border-2 border-emerald-200 p-3 transform -rotate-6 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-500">AKSELERASI</div>
                      <div className="text-xs font-black text-emerald-700">6 Bulan</div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl border-2 border-sky-200 p-3 transform rotate-6 hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center">
                      <Award className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-500">6 MAPEL</div>
                      <div className="text-xs font-black text-sky-700">Lengkap</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. TRUST BAR
         ================================================================== */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            Dipercaya oleh Orang Tua & Pendidik
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, label: 'Kurikulum Merdeka', sub: 'Sesuai Kemendikbud' },
              { icon: Users, label: 'Multi Anak', sub: 'Kelola semua anak' },
              { icon: TrendingUp, label: 'Tracking Progress', sub: 'Real-time' },
              { icon: Award, label: 'Fase A & B/C', sub: 'SD Kelas 1-6' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800">{item.label}</div>
                  <div className="text-[10px] font-bold text-slate-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. PROBLEM STATEMENT
         ================================================================== */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-black uppercase tracking-wider border border-rose-200">
              MASALAHNYA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
              Apakah Anak Anda Mengalami Ini?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Banyak orang tua menghadapi tantangan yang sama saat mendampingi anak belajar SD.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '😰',
                title: 'Anak Tertinggal 1 Tahun',
                desc: 'Karena sesuatu hal, anak tertinggal pelajaran satu tahun dari teman sebayanya.',
                color: 'from-rose-500 to-pink-500',
              },
              {
                emoji: '😩',
                title: 'Sulit Fokus & Bosan',
                desc: 'Anak cepat bosan saat belajar, tidak fokus, dan sulit memahami materi.',
                color: 'from-orange-500 to-amber-500',
              },
              {
                emoji: '😵',
                title: 'Orang Tua Bingung',
                desc: 'Tidak tahu materi apa yang harus diajarkan, urutannya, dan bagaimana cara mengajarkannya.',
                color: 'from-purple-500 to-violet-500',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-3xl bg-white border-2 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. SOLUTION / FITUR UNGGULAN
         ================================================================== */}
      <section id="fitur" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
              SOLUSINYA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
              Vokid Hadir dengan Solusi Lengkap
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Platform LMS yang dirancang khusus untuk anak SD dengan pendekatan adaptif dan menyenangkan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Program Akselerasi',
                desc: 'Tuntaskan 2 kelas dalam 6-12 bulan dengan jadwal terstruktur dan rotasi mapel anti bosan.',
                color: 'from-amber-500 to-orange-500',
                bg: 'bg-amber-50',
                border: 'border-amber-200',
              },
              {
                icon: Heart,
                title: 'Metode Deep Learning',
                desc: 'Pendekatan Mindful, Joyful, Meaningful — anak belajar dengan hati senang dan pemahaman mendalam.',
                color: 'from-rose-500 to-pink-500',
                bg: 'bg-rose-50',
                border: 'border-rose-200',
              },
              {
                icon: BookOpen,
                title: '6 Mapel Lengkap',
                desc: 'Matematika, B. Indonesia, B. Inggris, IPAS, PPKn, Seni Budaya. Semua terintegrasi.',
                color: 'from-sky-500 to-blue-500',
                bg: 'bg-sky-50',
                border: 'border-sky-200',
              },
              {
                icon: Award,
                title: 'Adaptif Fase A/B/C',
                desc: 'Fase A (Kelas 1-2) audio-first & visual. Fase B/C (Kelas 3-6) literasi & mandiri.',
                color: 'from-purple-500 to-violet-500',
                bg: 'bg-purple-50',
                border: 'border-purple-200',
              },
              {
                icon: Target,
                title: 'Tracking Progress',
                desc: 'Pantau kemajuan anak secara real-time. Lihat nilai, tugas, dan capaian per pekan.',
                color: 'from-emerald-500 to-teal-500',
                bg: 'bg-emerald-50',
                border: 'border-emerald-200',
              },
              {
                icon: Compass,
                title: 'Jadwal Otomatis',
                desc: 'Sistem membuat jadwal harian otomatis dengan rotasi mapel agar anak tidak bosan.',
                color: 'from-indigo-500 to-blue-600',
                bg: 'bg-indigo-50',
                border: 'border-indigo-200',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl ${feature.bg} border-2 ${feature.border} hover:shadow-xl transition-all group`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. HIGHLIGHT AKSELERASI
         ================================================================== */}
      <section id="akselerasi" className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
                <Rocket className="w-3 h-3" />
                <span>PROGRAM UNGGULAN</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                Kejar Ketinggalan dengan{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Program Akselerasi
                </span>
              </h2>

              <p className="text-lg text-slate-300 font-medium leading-relaxed">
                Anak tertinggal 1 tahun? Tidak masalah. Dengan program akselerasi terstruktur,
                anak dapat <strong className="text-white">menuntaskan 2 kelas dalam 6-12 bulan</strong> dengan
                jadwal yang disesuaikan.
              </p>

              {/* Benefit List */}
              <ul className="space-y-3">
                {[
                  'Jadwal otomatis dengan rotasi mapel anti bosan',
                  'Fokus kualitas > kuantitas (1 pelajaran tuntas/hari)',
                  'Tracking progress visual untuk orang tua',
                  'Panduan mengajar lengkap untuk guru/orang tua',
                  'Dukungan metode Mindful-Joyful-Meaningful',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm hover:shadow-xl hover:shadow-amber-500/30 active:scale-95 transition-all"
              >
                <Rocket className="w-4 h-4" />
                <span>Mulai Akselerasi Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Akselerasi Visual */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 space-y-4">
                {/* Timeline */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Timeline Akselerasi
                  </div>
                  <div className="text-xs font-black text-amber-400">
                    6 Bulan
                  </div>
                </div>

                {[
                  { month: 'Bulan 1-2', progress: 25, label: 'Fondasi', color: 'from-amber-500 to-orange-500' },
                  { month: 'Bulan 3-4', progress: 55, label: 'Intensif', color: 'from-sky-500 to-blue-500' },
                  { month: 'Bulan 5-6', progress: 85, label: 'Penguatan', color: 'from-purple-500 to-violet-500' },
                  { month: 'Selesai', progress: 100, label: 'Graduation', color: 'from-emerald-500 to-teal-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-300">{item.month}</span>
                      <span className="font-black text-white">{item.label}</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-black text-amber-400">129</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Pelajaran
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-sky-400">6</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Mapel
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-400">26</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Pekan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          7. KURIKULUM 6 MAPEL
         ================================================================== */}
      <section id="kurikulum" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-black uppercase tracking-wider border border-sky-200">
              KURIKULUM LENGKAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
              6 Mata Pelajaran Terintegrasi
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Semua mapel sesuai Kurikulum Merdeka Fase A (Kelas 1-2) & Fase B/C (Kelas 3-6).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Calculator, name: 'Matematika', color: 'from-amber-500 to-orange-500' },
              { icon: BookOpen, name: 'B. Indonesia', color: 'from-emerald-500 to-teal-500' },
              { icon: Languages, name: 'B. Inggris', color: 'from-sky-500 to-blue-500' },
              { icon: Globe, name: 'IPAS', color: 'from-purple-500 to-violet-500' },
              { icon: Flag, name: 'PPKn', color: 'from-rose-500 to-pink-500' },
              { icon: Palette, name: 'Seni Budaya', color: 'from-indigo-500 to-blue-600' },
            ].map((subject, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all text-center group"
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${subject.color} text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform`}
                >
                  <subject.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-slate-800">{subject.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          8. HOW IT WORKS
         ================================================================== */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200">
              CARA KERJA
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
              Mulai dalam 3 Langkah Mudah
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: '01',
                title: 'Masuk Portal',
                desc: 'Login sebagai Siswa atau Guru dengan akun yang sudah didaftarkan sekolah.',
                icon: ShieldCheck,
                color: 'from-sky-500 to-blue-500',
              },
              {
                step: '02',
                title: 'Ikuti Jadwal',
                desc: 'Belajar sesuai jadwal harian. Setiap pelajaran 70 menit dengan metode Deep Learning.',
                icon: Clock,
                color: 'from-amber-500 to-orange-500',
              },
              {
                step: '03',
                title: 'Tracking Progress',
                desc: 'Pantau kemajuan anak setiap pekan. Lihat nilai, tugas, dan capaian bintang.',
                icon: TrendingUp,
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                {/* Step Number Background */}
                <div className="absolute -top-4 -left-2 text-7xl font-black text-slate-100 select-none">
                  {step.step}
                </div>

                <div className="relative bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-lg mb-4`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          9. TESTIMONI
         ================================================================== */}
      <section id="testimoni" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider border border-amber-200">
              TESTIMONI
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
              Apa Kata Orang Tua?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ibu Sari',
                role: 'Orang Tua Maryam (Kelas 1)',
                avatar: '👩',
                text: 'Alhamdulillah, program akselerasi sangat membantu Maryam yang tertinggal 1 tahun. Dalam 6 bulan, dia sudah bisa menyusul teman-temannya!',
                rating: 5,
              },
              {
                name: 'Bapak Ahmad',
                role: 'Orang Tua Asiyah (Kelas 1)',
                avatar: '👨',
                text: 'Metode Deep Learning-nya luar biasa. Anak saya jadi senang belajar karena setiap pelajaran ada permainan dan cerita.',
                rating: 5,
              },
              {
                name: 'Ibu Rina',
                role: 'Orang Tua Khadijah (Kelas 1)',
                avatar: '👩‍🦱',
                text: 'Tracking progress-nya sangat membantu saya sebagai orang tua. Tahu persis anak sudah sampai mana dan apa yang perlu ditingkatkan.',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-100 hover:shadow-xl transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          10. CTA FINAL
         ================================================================== */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider mb-6 border border-white/30">
            <Sparkles className="w-3 h-3" />
            <span>MULAI HARI INI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            Siap Memulai Petualangan Belajar?
          </h2>

          <p className="text-lg text-amber-50 mb-8 max-w-2xl mx-auto font-medium">
            Bergabung dengan ratusan orang tua yang telah membuktikan bahwa belajar SD bisa menyenangkan dan efektif.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl bg-white text-amber-700 font-black text-base hover:shadow-2xl hover:shadow-amber-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              <span>Mulai Sekarang</span>
            </Link>
            <Link
              href="#fitur"
              className="px-8 py-4 rounded-2xl bg-amber-700/40 backdrop-blur-sm text-white font-black text-base border-2 border-white/30 hover:bg-amber-700/60 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Tanya Dulu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
          11. FOOTER
         ================================================================== */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black flex items-center justify-center text-xl shadow-md">
                  V
                </div>
                <span className="text-2xl font-black text-white">
                  Vo<span className="text-amber-400">kid</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                LMS adaptif untuk Sekolah Dasar berbasis Kurikulum Merdeka.
                Mendukung Fase A (Kelas 1-2) dan Fase B/C (Kelas 3-6) dengan
                pendekatan Mindful, Joyful, Meaningful.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kurikulum Merdeka</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold">
                  <AwardIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Fase A & B/C</span>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">
                Menu
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#fitur" className="hover:text-amber-400 transition-colors">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#akselerasi" className="hover:text-amber-400 transition-colors">
                    Akselerasi
                  </a>
                </li>
                <li>
                  <a href="#kurikulum" className="hover:text-amber-400 transition-colors">
                    Kurikulum
                  </a>
                </li>
                <li>
                  <a href="#testimoni" className="hover:text-amber-400 transition-colors">
                    Testimoni
                  </a>
                </li>
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">
                Kontak
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>info@vokid.sch.id</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>+62 812-3456-7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Jakarta, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Vokid LMS. All rights reserved.</p>
            <p>Dibuat dengan ❤️ untuk pendidikan anak Indonesia</p>
          </div>
        </div>
      </footer>

    </div>
  );
}