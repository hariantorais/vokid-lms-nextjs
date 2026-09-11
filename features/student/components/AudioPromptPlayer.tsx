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
    <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-amber-100/80 border border-amber-300/80 text-slate-900">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Touch Button Play/Pause */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Jeda Suara' : 'Putar Suara Guru'}
        className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-xs cursor-pointer ${
          isPlaying ? 'ring-2 ring-amber-600 scale-105 animate-pulse' : 'hover:bg-amber-400'
        }`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-slate-950" />
        ) : (
          <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-950">
          <Volume2 className="w-3.5 h-3.5 text-amber-800 shrink-0" />
          <span>{title}</span>
        </div>
        <p className="text-[10px] text-amber-900/80 font-bold truncate">
          {isPlaying ? 'Sedang bersuara...' : 'Sentuh tombol untuk mendengar'}
        </p>
      </div>
    </div>
  );
}
