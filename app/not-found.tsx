import React from 'react';
import Link from 'next/link';
import {
    Compass,
    ArrowLeft,
    Sparkles,
    GraduationCap,
    Home,
    HelpCircle,
} from 'lucide-react';

export default function NotFound() {
    return (
        <main className="relative min-h-screen bg-linear-to-b from-sky-50 via-amber-50/50 to-emerald-50 flex flex-col justify-center items-center px-4 py-12 overflow-hidden select-none">
            {/* Ornamen Latar Belakang Lingkaran Halus */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

            {/* Kartu Utama */}
            <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-sky-900/10 border border-white/80 p-8 sm:p-10 text-center space-y-7 z-10">

                {/* Maskot & Lencana 404 */}
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-linear-to-tr from-amber-400/30 to-orange-400/30 animate-pulse" />
                    <div className="relative w-28 h-28 rounded-3xl bg-linear-to-tr from-amber-100 to-amber-200 border-2 border-amber-300 shadow-inner flex flex-col items-center justify-center text-5xl">
                        🧭
                    </div>
                    <div className="absolute -bottom-1 -right-1 px-3 py-1 bg-sky-600 text-white font-black text-xs rounded-full shadow-md flex items-center gap-1 border-2 border-white">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>404</span>
                    </div>
                </div>

                {/* Teks Informasi */}
                <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-black tracking-wide">
                        <span>Ups! Jalur Belajar Terputus</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                        Halaman materi, kelas, atau berkas yang dituju mungkin telah dipindahkan atau kode URL kurang tepat.
                    </p>
                </div>

                {/* Pilihan Tombol Aksi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Tombol Siswa */}
                    <Link
                        href="/siswa"
                        className="group min-h-[64px] p-4 rounded-2xl bg-linear-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-200 active:scale-95 transition-all flex flex-col justify-center items-center gap-0.5 cursor-pointer"
                    >
                        <div className="flex items-center gap-1.5 font-black text-sm">
                            <Home className="w-4 h-4" />
                            <span>Portal Siswa</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-900/80 group-hover:underline">
                            Kembali ke Beranda
                        </span>
                    </Link>

                    {/* Tombol Guru */}
                    <Link
                        href="/guru"
                        className="group min-h-[64px] p-4 rounded-2xl bg-linear-to-b from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white shadow-lg shadow-sky-200 active:scale-95 transition-all flex flex-col justify-center items-center gap-0.5 cursor-pointer"
                    >
                        <div className="flex items-center gap-1.5 font-black text-sm">
                            <GraduationCap className="w-4 h-4 text-sky-200" />
                            <span>Ruang Guru</span>
                        </div>
                        <span className="text-[11px] font-medium text-sky-100 group-hover:underline">
                            Buka Dasbor Pendidik
                        </span>
                    </Link>
                </div>

                {/* Bar Bantuan Bawah */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                    <Link
                        href="/login"
                        className="hover:text-sky-600 font-bold flex items-center gap-1 transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Ganti Akun</span>
                    </Link>

                    <span className="text-slate-400">•</span>

                    <span className="font-semibold text-slate-600">
                        Vo<span className="text-amber-500 font-black">kid</span> LMS SD
                    </span>
                </div>
            </div>
        </main>
    );
}