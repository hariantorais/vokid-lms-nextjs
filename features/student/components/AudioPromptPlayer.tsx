'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Pause, Play, Sparkles } from 'lucide-react';

interface AudioPromptPlayerProps {
  audioUrl: string;
  title?: string;
}

export function AudioPromptPlayer({ audioUrl, title = 'Dengarkan Suara Ibu Guru' }: AudioPromptPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Playback error or blocked by browser autoplay policy:', err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-3xl bg-linear-to-r from-amber-400 via-amber-300 to-orange-400 text-slate-950 shadow-md">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Big Touch Target Play/Pause Button (min 64x64px) */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Jeda Audio Petunjuk' : 'Putar Audio Petunjuk Guru'}
        className={`w-16 h-16 min-w-[64px] min-h-[64px] rounded-2xl bg-white text-slate-900 shadow-md hover:shadow-lg flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
          isPlaying ? 'ring-4 ring-amber-500 scale-105 animate-pulse' : 'hover:scale-105'
        }`}
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 fill-slate-900 text-slate-900" />
        ) : (
          <Play className="w-8 h-8 fill-slate-900 text-slate-900 ml-1" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900/80 mb-0.5">
          <Volume2 className="w-4 h-4 text-amber-900" />
          <span>Petunjuk Suara Guru</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        </div>
        <p className="text-base font-extrabold text-slate-950 truncate">{title}</p>
        <p className="text-xs text-slate-800 font-medium mt-0.5">
          {isPlaying ? '🔊 Sedang bersuara... dengarkan baik-baik ya!' : '👉 Tekan tombol bulat putih untuk mendengarkan!'}
        </p>
      </div>
    </div>
  );
}
