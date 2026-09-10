'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X, RotateCcw } from 'lucide-react';

interface SubmissionImageViewerProps {
  src: string;
  alt?: string;
}

export function SubmissionImageViewer({
  src,
  alt = 'Pengerjaan Tugas Siswa',
}: SubmissionImageViewerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setZoomScale(1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale(1);
  };

  return (
    <>
      <div className="relative group rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-testid="student-photo-work"
          src={src}
          alt={alt}
          className="max-h-80 w-auto rounded-xl object-contain shadow-xs transition-transform duration-200 group-hover:scale-[1.01]"
        />

        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            data-testid="open-lightbox-btn"
            className="px-4 py-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Maximize2 className="w-4 h-4 text-sky-600" />
            <span>Perbesar Gambar (Lightbox)</span>
          </button>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-testid="submission-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Top Bar Controls */}
          <div
            className="w-full max-w-5xl flex items-center justify-between pb-3 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-extrabold text-slate-200">
              {alt} • Skala {Math.round(zoomScale * 100)}%
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomIn}
                data-testid="lightbox-zoom-in"
                title="Perbesar"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                data-testid="lightbox-zoom-out"
                title="Perkecil"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset Ukuran"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClose}
                data-testid="lightbox-close-btn"
                title="Tutup (Esc)"
                className="p-2 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white transition-colors cursor-pointer ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="flex-1 w-full max-w-5xl flex items-center justify-center overflow-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              style={{ transform: `scale(${zoomScale})` }}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-2xl transition-transform duration-150"
            />
          </div>
        </div>
      )}
    </>
  );
}
