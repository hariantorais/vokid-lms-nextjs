'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  Heart,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Mail,
  Lock,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('SISWA');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const targetEmail = email.trim().toLowerCase();
    const targetPassword = password.trim();

    if (!targetEmail || !targetPassword) {
      setErrorMessage('Silakan lengkapi alamat email dan kata sandi akun.');
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email: targetEmail,
            password: targetPassword,
          });

        if (authError || !authData.user) {
          setErrorMessage(
            authError?.message ?? 'Gagal masuk. Periksa kembali email dan kata sandi.'
          );
          return;
        }

        // Verifikasi role dari tabel profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', authData.user.id)
          .single();

        if (profileError || !profile) {
          setErrorMessage('Profil pengguna tidak ditemukan.');
          return;
        }

        // Simpan sesi ke cookies untuk routing middleware
        if (typeof document !== 'undefined') {
          document.cookie = `vokid_role=${profile.role}; path=/; max-age=86400; SameSite=Lax`;
          document.cookie = `vokid_email=${encodeURIComponent(
            targetEmail
          )}; path=/; max-age=86400; SameSite=Lax`;
        }

        // Navigasi sesuai role riil pengguna
        if (profile.role === 'GURU') {
          router.push('/guru');
        } else if (profile.role === 'SISWA') {
          router.push('/siswa');
        } else {
          router.push('/siswa');
        }

        router.refresh();
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Terjadi kendala jaringan saat autentikasi.';
        setErrorMessage(msg);
      }
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50 flex flex-col justify-center items-center px-4 py-12 select-none font-sans">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-sky-200 shadow-xs mb-4">
          <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
          <span className="text-xs font-bold text-sky-800 tracking-wide">
            LMS Sekolah Dasar • Kurikulum Merdeka
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1">
          <span>Vo</span>
          <span className="text-amber-500">kid</span>
          <span className="text-teal-600">!</span>
        </h1>
        <p className="text-slate-600 mt-2 text-xs sm:text-sm font-medium max-w-sm mx-auto leading-relaxed">
          Portal Pembelajaran Terpadu Sekolah Dasar untuk Siswa, Guru, dan Orang Tua.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border-2 border-b-6 border-slate-200/90 p-6 sm:p-8">
        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs font-bold animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Segmented Role Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 border border-slate-200/60">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('SISWA');
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${selectedRole === 'SISWA'
              ? 'bg-amber-400 text-slate-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Siswa</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('GURU');
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${selectedRole === 'GURU'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Guru</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('ORANG_TUA');
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${selectedRole === 'ORANG_TUA'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Heart className="w-4 h-4" />
            <span>Orang Tua</span>
          </button>
        </div>

        {/* Role Banner Guide */}
        <div
          className={`p-3.5 rounded-2xl border mb-5 ${selectedRole === 'SISWA'
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : selectedRole === 'GURU'
              ? 'bg-teal-50/70 border-teal-200 text-teal-950'
              : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
        >
          <p className="text-xs font-extrabold flex items-center gap-1.5">
            <span>
              {selectedRole === 'SISWA'
                ? '🎒 Ruang Belajar Siswa'
                : selectedRole === 'GURU'
                  ? '🎓 Portal Pengajar & Kurikulum'
                  : '🏡 Portal Pendampingan Orang Tua'}
            </span>
          </p>
          <p className="text-[11px] font-medium opacity-85 mt-0.5 leading-relaxed">
            {selectedRole === 'SISWA'
              ? 'Masukkan email dan kata sandi siswa yang telah didaftarkan pihak sekolah.'
              : selectedRole === 'GURU'
                ? 'Gunakan akun pendidik untuk mengelola modul kurikulum dan penilaian tugas.'
                : 'Pantau laporan capaian pos belajar anak dan riwayat penilaian guru.'}
          </p>
        </div>

        {/* Form Autentikasi Riil */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="auth-email"
              className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Alamat Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                placeholder={
                  selectedRole === 'SISWA'
                    ? 'maryam@vokid.sch.id'
                    : selectedRole === 'GURU'
                      ? 'harianto@vokid.sch.id'
                      : 'orangtua@vokid.sch.id'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="auth-password"
              className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Kata Sandi *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="auth-password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border-2 border-slate-200 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full min-h-[50px] rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 border-b-6 active:border-b-2 active:translate-y-1 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 ${selectedRole === 'SISWA'
              ? 'bg-amber-400 hover:bg-amber-500 border-amber-600 text-slate-950'
              : selectedRole === 'GURU'
                ? 'bg-teal-600 hover:bg-teal-700 border-teal-800 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-800 text-white'
              }`}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi Akun...</span>
              </>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4 stroke-[2.8]" />
              </>
            )}
          </button>
        </form>

        {/* Security Badge */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Keamanan Data Terenkripsi Supabase Auth</span>
        </div>
      </div>
    </main>
  );
}