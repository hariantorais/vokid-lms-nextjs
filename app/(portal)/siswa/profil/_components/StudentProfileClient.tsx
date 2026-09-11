'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { UploadCloud, Check, Loader2, Sparkles, Star, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import { updateStudentAvatarAction, type StudentProfile } from '../_actions/profile.actions';

interface StudentProfileClientProps {
  initialProfile: StudentProfile;
  totalStars?: number;
}

const PRESET_AVATARS = [
  '🦁', '🐯', '🐼', '🦊', '🐰', '🐨', '🐵', '🦄', '🚀', '⭐', '🌈', '🎨'
];

export function StudentProfileClient({ initialProfile, totalStars = 0 }: StudentProfileClientProps) {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePresetSelect = (emoji: string) => {
    startTransition(async () => {
      const res = await updateStudentAvatarAction(emoji);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setProfile((prev) => ({ ...prev, avatar_url: emoji }));
      toast.success('Avatar berhasil diperbarui!');
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Berkas harus berupa gambar (JPG/PNG/WEBP)');
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
        setProfile((prev) => ({ ...prev, avatar_url: data.url }));
        toast.success('Foto profil berhasil diunggah dan disimpan!');
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengunggah avatar.';
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const isCustomImage =
    profile.avatar_url &&
    (profile.avatar_url.startsWith('http') || profile.avatar_url.startsWith('/'));

  return (
    <StudentLayoutShell
      title="Profil Siswa"
      backHref="/siswa"
      showBottomNav={true}
      maxWidth="sm"
      starsCount={totalStars}
      userAvatarUrl={profile.avatar_url}
    >
      <div className="space-y-4">
        {/* Card Profil Utama */}
        <section className="bg-white rounded-3xl p-5 border-2 border-b-6 border-slate-200/90 shadow-sm flex flex-col items-center text-center space-y-3">
          {/* Tampilan Avatar Aktif */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-300 border-4 border-white shadow-lg flex items-center justify-center text-5xl overflow-hidden select-none">
              {isCustomImage ? (
                <Image
                  src={profile.avatar_url!}
                  alt={profile.full_name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{profile.avatar_url || '🦁'}</span>
              )}
            </div>

            {(isUploading || isPending) && (
              <div className="absolute inset-0 rounded-3xl bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>

          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {profile.full_name}
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Petualang Belajar SD
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-black shadow-2xs">
            <Star className="w-4 h-4 fill-amber-500 text-amber-600" />
            <span>{totalStars} Total Bintang Diperoleh</span>
          </div>
        </section>

        {/* Upload Foto Avatar Kustom */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-b-6 border-slate-200/90 shadow-sm space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <UploadCloud className="w-4 h-4 text-teal-600" />
            <span>Upload Foto Avatar</span>
          </h3>
          <label className="border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 hover:bg-teal-50/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all active:scale-98">
            <input
              type="file"
              accept="image/*"
              disabled={isUploading || isPending}
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center mb-1.5 shadow-2xs">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
            </div>
            <span className="text-xs font-bold text-teal-950">
              {isUploading ? 'Sedang mengunggah...' : 'Pilih Foto dari Perangkat (Maksimal 5MB)'}
            </span>
          </label>
        </section>

        {/* Pilihan Karakter / Avatar Preset Ceria */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-b-6 border-slate-200/90 shadow-sm space-y-3">
          <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Atau Pilih Karakter Lucu</span>
          </h3>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {PRESET_AVATARS.map((emoji) => {
              const isSelected = profile.avatar_url === emoji;
              return (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handlePresetSelect(emoji)}
                  disabled={isPending || isUploading}
                  className={`h-14 rounded-2xl border-2 flex items-center justify-center text-2xl transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-b-4 border-teal-600 bg-teal-50 ring-2 ring-teal-400 scale-105'
                      : 'border-b-4 border-slate-200 bg-white hover:bg-slate-50 active:translate-y-0.5'
                  }`}
                >
                  <span>{emoji}</span>
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </StudentLayoutShell>
  );
}
