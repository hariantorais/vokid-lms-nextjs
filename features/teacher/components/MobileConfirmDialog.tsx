'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X, Info } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function MobileConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Ya, Hapus',
  cancelLabel = 'Batal',
  variant = 'danger',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const timer = requestAnimationFrame(() => {
        setVisible(true);
      });
      document.body.style.overflow = 'hidden';
      return () => cancelAnimationFrame(timer);
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 250);
      document.body.style.overflow = '';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!mounted || typeof document === 'undefined') return null;

  const iconColors = {
    danger: 'bg-rose-100 text-rose-600 ring-rose-200/80',
    warning: 'bg-amber-100 text-amber-600 ring-amber-200/80',
    info: 'bg-sky-100 text-sky-600 ring-sky-200/80',
  }[variant];

  const confirmBtnStyles = {
    danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-rose-600/25',
    warning: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-amber-500/25',
    info: 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-sky-600/25',
  }[variant];

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:p-4 select-none">
      {/* Backdrop */}
      <div
        onClick={isLoading ? undefined : onCancel}
        className={`absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 ease-out cursor-pointer ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile Native Action Sheet / Dialog Box - Slides and fades from bottom up */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        className={`relative w-full max-w-[420px] bg-white rounded-t-[2.2rem] sm:rounded-3xl shadow-2xl p-6 sm:p-7 z-10 transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col items-center text-center ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        {/* Pull Indicator Pill (Mobile native style) */}
        <div className="w-12 h-1.5 rounded-full bg-slate-200 mb-5 sm:hidden" />

        {/* Icon Circle */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-8 mb-4 shadow-sm shrink-0 transition-transform active:scale-95 ${iconColors}`}
        >
          {variant === 'danger' && <Trash2 className="w-7 h-7 stroke-[2.2]" />}
          {variant === 'warning' && <AlertTriangle className="w-7 h-7 stroke-[2.2]" />}
          {variant === 'info' && <Info className="w-7 h-7 stroke-[2.2]" />}
        </div>

        {/* Title & Description */}
        <h3
          id="confirm-dialog-title"
          className="text-base sm:text-lg font-black text-slate-900 leading-snug tracking-tight px-2"
        >
          {title}
        </h3>

        <p
          id="confirm-dialog-desc"
          className="text-xs sm:text-sm text-slate-500 font-medium mt-2 leading-relaxed px-1"
        >
          {description}
        </p>

        {/* Action Buttons (Native Stack: Action on top, Cancel bottom) */}
        <div className="w-full mt-6 space-y-2.5">
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`w-full min-h-[50px] rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${confirmBtnStyles} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Memproses...</span>
              </span>
            ) : (
              confirmLabel
            )}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="w-full min-h-[48px] rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-200/80 active:scale-98 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
