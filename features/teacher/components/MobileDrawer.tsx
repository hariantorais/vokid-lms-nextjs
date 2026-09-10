'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function MobileDrawer({ isOpen, onClose, title, children }: MobileDrawerProps) {
  // Render state to allow closing animations to complete before unmounting
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Small timeout to allow DOM node to mount in off-screen state, then transition in
      const timer = requestAnimationFrame(() => {
        setVisible(true);
      });
      // Prevent background scrolling while drawer is open
      document.body.style.overflow = 'hidden';
      return () => {
        cancelAnimationFrame(timer);
      };
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300); // match transition duration
      document.body.style.overflow = '';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 select-none">
      {/* Backdrop with smooth fade transition */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-out cursor-pointer ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer Card with springy/smooth cubic-bezier slide-up and scale transition */}
      <div
        className={`relative w-full max-w-[430px] bg-white rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden border-t-2 border-amber-300 sm:border-slate-200/80 z-10 transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? 'translate-y-0 opacity-100 sm:scale-100'
            : 'translate-y-full opacity-0 sm:scale-95 sm:translate-y-4'
        }`}
      >
        {/* Drag Pill Handle */}
        <div className="pt-3 pb-1 flex justify-center shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="font-black text-base text-slate-900 tracking-tight">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}