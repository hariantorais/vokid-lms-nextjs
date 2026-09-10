import React from 'react';

/**
 * Mendapatkan URL embed aman dari tautan video (YouTube, Google Drive, Vimeo)
 */
export function getVideoEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube standard (watch?v=), short (youtu.be/), embed/, shorts/, or live/
  const ytMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Google Drive preview
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

interface VideoPlayerProps {
  url: string;
  title: string;
  className?: string;
}

/**
 * Komponen Video Player Responsif:
 * - Secara otomatis mendeteksi link YouTube/Drive/Vimeo dan merendernya sebagai iframe embed responsif.
 * - Jika berupa link file video langsung (.mp4, .webm), merender tag HTML5 <video>.
 */
export function VideoPlayer({ url, title, className = '' }: VideoPlayerProps) {
  const embedUrl = getVideoEmbedUrl(url);

  if (embedUrl) {
    return (
      <div
        className={`relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-950 shadow-md ${className}`}
      >
        <iframe
          src={embedUrl}
          title={`Video Pembelajaran: ${title}`}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback direct HTML5 video
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md ${className}`}
    >
      <video
        controls
        playsInline
        src={url}
        className="w-full max-h-[400px] aspect-video object-contain"
      >
        Browser kamu belum mendukung pemutaran video langsung.
      </video>
    </div>
  );
}
