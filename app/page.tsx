import Link from 'next/link';
import { Sparkles, GraduationCap, BookOpen, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-amber-50 text-slate-900 flex flex-col justify-between">
      {/* Navbar */}
      <header className="px-6 py-4 max-w-7xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xl shadow-xs">
            V
          </div>
          <span className="text-2xl font-black text-slate-900">
            Vo<span className="text-amber-500">kid</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            Masuk Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/80 border border-amber-300/80 rounded-full text-amber-900 text-xs sm:text-sm font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>LMS Adaptif SD Kelas 1–6 Berbasis Kurikulum Merdeka</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
          Pendidikan Dasar yang Menyenangkan, <span className="text-amber-500">Adaptif</span>, & <span className="text-sky-600">Terpadu</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Disesuaikan untuk karakteristik fase belajar anak: Fase A dengan audio & sentuhan ramah anak, serta Fase B/C dengan materi modular dan penugasan mandiri.
        </p>

        {/* Portals Fast Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 text-left">
          <Link
            href="/siswa"
            className="p-6 rounded-3xl bg-white border-2 border-amber-300 hover:border-amber-400 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                Portal Siswa
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-3 group-hover:text-amber-600 transition-colors">
                Ruang Siswa SD (Kelas 1–6)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fitur Fase A (Audio & Sentuh 64px) dan Fase B/C (Materi Terstruktur).
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-700">
              <span>Masuk sebagai Siswa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/guru"
            className="p-6 rounded-3xl bg-white border-2 border-sky-300 hover:border-sky-400 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-900">
                Dashboard Guru
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-3 group-hover:text-sky-600 transition-colors">
                Ruang Pendidik & Penilaian
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kelola kelas, materi kurikulum merdeka, dan antrean penilaian tugas suara/foto.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-sky-700">
              <span>Masuk Dashboard Guru</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-slate-200/80 bg-white/60 text-center text-xs text-slate-500">
        <p>© 2026 Vokid LMS • Kurikulum Merdeka Sekolah Dasar</p>
      </footer>
    </div>
  );
}
