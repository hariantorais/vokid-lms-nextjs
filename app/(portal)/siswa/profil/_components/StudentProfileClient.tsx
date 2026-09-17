'use client';

import React, { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Loader2,
  Star,
  Info,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { useStudent } from '@/features/student/context/StudentContext';
import { createClient } from '@/lib/supabase/client';
import { updateStudentAvatarAction } from '../../_actions/profile.actions';
import { StudentAvatar } from '@/features/student/components';

export function StudentProfileClient() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ambil state global dari Context
  const { studentId, studentName, avatarUrl, totalStars, setAvatarUrl } = useStudent();

  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAvatarClick = () => {
    if (isUploading || isPending) return;
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Berkas harus berupa gambar (JPG, PNG, atau WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran foto maksimal 5MB.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'avatars');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error || 'Gagal mengunggah foto avatar.');
      }

      startTransition(async () => {
        const updateRes = await updateStudentAvatarAction(data.url);
        if (!updateRes.success) {
          toast.error(updateRes.error);
          return;
        }
        // Update state global: Avatar di header & di profil langsung berubah bersamaan
        setAvatarUrl(data.url);
        toast.success('Foto profil berhasil diperbarui!');
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah avatar.';
      toast.error(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast.success('Berhasil keluar akun.');
      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Gagal keluar akun.');
    }
  };

  return (
    <div className="space-y-4 select-none pb-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
        disabled={isUploading || isPending}
      />

      {/* KARTU IDENTITAS */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-b-6 border-slate-200/90 shadow-xs flex flex-col items-center text-center space-y-3">
        <div className="relative group">
          <button
            type="button"
            onClick={handleAvatarClick}
            disabled={isUploading || isPending}
            className="relative cursor-pointer rounded-3xl transition-transform active:scale-95 focus:outline-none"
            title="Klik untuk ganti foto profil"
          >
            <StudentAvatar
              avatarUrl={avatarUrl}
              studentName={studentId || studentName}
              size="xl"
            />

            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-teal-500 hover:bg-teal-600 border-2 border-white text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
              <Camera className="w-4 h-4 stroke-[2.5]" />
            </div>

            {(isUploading || isPending) && (
              <div className="absolute inset-0 rounded-3xl bg-black/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white z-10">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-[10px] font-bold mt-1">Mengunggah...</span>
              </div>
            )}
          </button>
        </div>

        <div className="space-y-0.5">
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            {studentName}
          </h2>
          <p className="text-xs font-bold text-slate-500">
            Petualang Belajar SD
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black shadow-2xs">
          <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
          <span>{totalStars} Total Bintang Diperoleh</span>
        </div>
      </section>

      {/* MENU AKUN */}
      <section className="bg-white rounded-3xl p-2 border-2 border-b-6 border-slate-200/90 shadow-xs divide-y divide-slate-100">
        <Link
          href="/siswa/tentang"
          className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200/60 shrink-0">
              <Info className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-teal-700 transition-colors">
                Tentang Aplikasi
              </h4>
              <p className="text-[11px] font-bold text-slate-400">
                Versi & pengembang platform
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/siswa/bantuan"
          className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 shrink-0">
              <HelpCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-slate-800 group-hover:text-amber-700 transition-colors">
                Bantuan Petualang
              </h4>
              <p className="text-[11px] font-bold text-slate-400">
                Panduan belajar & misi
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <div className="flex items-center justify-between p-3.5 text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-black text-slate-800">
                Status Akun
              </h4>
              <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Aktif Terdaftar
              </p>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full bg-rose-50 hover:bg-rose-100/80 active:translate-y-0.5 border-2 border-b-4 border-rose-300 text-rose-700 rounded-2xl p-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs"
      >
        <LogOut className="w-4 h-4 stroke-[2.5]" />
        <span>Keluar dari Akun</span>
      </button>
    </div>
  );
}