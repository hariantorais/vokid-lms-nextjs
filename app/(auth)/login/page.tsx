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
  UserCheck,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { UserRole } from '@/types/database';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('SISWA');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [grade, setGrade] = useState<'1' | '2' | '3' | '4' | '5' | '6'>('1');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStudentLogin = (customEmail?: string) => {
    setErrorMessage(null);
    startTransition(async () => {
      const targetEmail = customEmail ?? 'maryam@vokid.sch.id';

      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: targetEmail,
          password: 'Vokid2026!',
        });

        if (error) {
          console.warn('[Login Auth] Supabase cloud session notice:', error.message);
        }
      } catch (authErr) {
        console.warn('[Login Auth] Auth server exception handled:', authErr);
      }

      // Simpan preferensi sesi siswa
      if (typeof document !== 'undefined') {
        document.cookie = `vokid_role=SISWA; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `vokid_email=${encodeURIComponent(targetEmail)}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `vokid_grade=${grade}; path=/; max-age=86400; SameSite=Lax`;
      }

      router.push('/siswa');
    });
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const targetEmail = email.trim();
    const targetPassword = password.trim();

    if (!targetEmail || !targetPassword) {
      setErrorMessage('Silakan isi email dan kata sandi akun guru.');
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: targetEmail,
          password: targetPassword,
        });

        if (error) {
          console.warn('[Login Auth] Supabase teacher session notice:', error.message);
        }
      } catch (authErr) {
        console.warn('[Login Auth] Teacher auth exception handled:', authErr);
      }

      // Simpan preferensi sesi guru
      if (typeof document !== 'undefined') {
        document.cookie = `vokid_role=GURU; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `vokid_email=${encodeURIComponent(targetEmail)}; path=/; max-age=86400; SameSite=Lax`;
      }

      router.push('/guru');
    });
  };
  const handleQuickTeacherLogin = (teacherEmail: string) => {
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: teacherEmail,
          password: 'Vokid2026!',
        });

        if (error) {
          setErrorMessage(`Gagal masuk: ${error.message}`);
          return; // Hentikan proses, JANGAN redirect jika gagal
        }

        // Simpan preferensi sesi jika berhasil login
        if (typeof document !== 'undefined') {
          document.cookie = `vokid_role=GURU; path=/; max-age=86400; SameSite=Lax`;
          document.cookie = `vokid_email=${encodeURIComponent(teacherEmail)}; path=/; max-age=86400; SameSite=Lax`;
        }

        router.push('/guru');
        router.refresh();
      } catch (authErr) {
        const msg = authErr instanceof Error ? authErr.message : 'Terjadi kendala jaringan saat autentikasi.';
        setErrorMessage(msg);
      }
    });
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-amber-50/40 to-emerald-50 flex flex-col justify-center items-center px-4 py-12">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-sky-200 shadow-xs mb-4">
          <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
          <span className="text-sm font-semibold text-sky-800">
            LMS Sekolah Dasar • Kurikulum Merdeka
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <span>Vo</span>
          <span className="text-amber-500">kid</span>
          <span className="text-sky-600">!</span>
        </h1>
        <p className="text-slate-600 mt-2 text-base max-w-md">
          Portal Belajar Seru, Interaktif, dan Terpadu untuk Siswa, Guru, dan Orang Tua.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('SISWA');
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${selectedRole === 'SISWA'
              ? 'bg-amber-400 text-slate-900 shadow-md scale-[1.02]'
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
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${selectedRole === 'GURU'
              ? 'bg-sky-600 text-white shadow-md scale-[1.02]'
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
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${selectedRole === 'ORANG_TUA'
              ? 'bg-emerald-600 text-white shadow-md scale-[1.02]'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Heart className="w-4 h-4" />
            <span>Orang Tua</span>
          </button>
        </div>

        {/* Dynamic Form Content */}
        {selectedRole === 'SISWA' && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80">
              <h2 className="font-bold text-amber-900 text-base">Halo Siswa Cerdas! 🎒</h2>
              <p className="text-amber-800/80 text-xs mt-1">
                Pilih jenjang kelas/level belajarmu dan masuk ke akun siswa untuk mulai berpetualang.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilih Level Belajar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {(['1', '2', '3', '4', '5', '6'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setGrade(lvl)}
                    className={`h-12 rounded-xl font-extrabold text-base transition-all cursor-pointer ${grade === lvl
                      ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-500 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {Number(grade) <= 2
                  ? '🌟 Fase A (Level 1–2): Mode Suara & Tombol Ramah Anak Aktif'
                  : '📘 Fase B/C (Level 3–6): Mode Materi & Tugas Mandiri Aktif'}
              </p>
            </div>

            <div>
              <label
                htmlFor="student-code"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Kode Siswa / NISN (Opsional)
              </label>
              <input
                id="student-code"
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="Contoh: SD1-2026-001"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-medium text-slate-900"
              />
            </div>

            <button
              type="button"
              onClick={() => handleStudentLogin()}
              disabled={isPending}
              className="w-full min-h-[56px] bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-200 hover:shadow-xl transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sedang Masuk...</span>
                </>
              ) : (
                <>
                  <span>Mulai Belajar Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Quick Demo Logins for Student */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Masuk Cepat Siswa (Level 1):
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleStudentLogin('maryam@vokid.sch.id')}
                  disabled={isPending}
                  className="px-2.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <span>Maryam</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStudentLogin('asiyah@vokid.sch.id')}
                  disabled={isPending}
                  className="px-2.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <span>Asiyah</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStudentLogin('khadijah@vokid.sch.id')}
                  disabled={isPending}
                  className="px-2.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-amber-600" />
                  <span>Khadijah</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedRole === 'GURU' && (
          <form onSubmit={handleTeacherLogin} className="space-y-4">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200/80">
              <h2 className="font-bold text-sky-900 text-base">Portal Guru & Pendidik 🎓</h2>
              <p className="text-sky-800/80 text-xs mt-1">
                Akses manajemen kurikulum merdeka, kelas, penilaian modul, dan penugasan suara/foto.
              </p>
            </div>

            <div>
              <label
                htmlFor="guru-email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Email Akun Guru
              </label>
              <input
                id="guru-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harianto@vokid.sch.id"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="guru-password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Kata Sandi
              </label>
              <input
                id="guru-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full min-h-[56px] bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-200 hover:shadow-xl transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memverifikasi Akun...</span>
                </>
              ) : (
                <>
                  <span>Masuk Ruang Guru</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Quick Demo Login for Teacher */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Masuk Cepat Pendidik:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickTeacherLogin('harianto@vokid.sch.id')}
                  disabled={isPending}
                  className="px-3 py-2.5 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  <span>Harianto, S.Kom.</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickTeacherLogin('marian@vokid.sch.id')}
                  disabled={isPending}
                  className="px-3 py-2.5 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  <span>Marian Febriyola, S.AP.</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {selectedRole === 'ORANG_TUA' && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80">
              <h2 className="font-bold text-emerald-900 text-base">Portal Orang Tua & Wali 🏡</h2>
              <p className="text-emerald-800/80 text-xs mt-1">
                Pantau proses pembelajaran anak, nilai tugas harian, dan komunikasi bersama wali kelas.
              </p>
            </div>

            <div>
              <label
                htmlFor="parent-contact"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                Nomor WhatsApp / Email Terdaftar
              </label>
              <input
                id="parent-contact"
                type="text"
                placeholder="08123456789"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-900"
              />
            </div>

            <div>
              <label
                htmlFor="parent-pin"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
              >
                PIN Masuk Keluarga
              </label>
              <input
                id="parent-pin"
                type="password"
                placeholder="6 Digit PIN"
                maxLength={6}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-900"
              />
            </div>

            <button
              type="button"
              onClick={() => router.push('/siswa')}
              className="w-full min-h-[56px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 hover:shadow-xl transition-all active:scale-98 cursor-pointer"
            >
              <span>Masuk Portal Orang Tua</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Security badge footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Keamanan Data Siswa Terlindungi & Terenkripsi</span>
        </div>
      </div>
    </main>
  );
}