'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export interface StudentLayoutShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  badgeVariant?: 'amber' | 'sky' | 'teal' | 'rose' | string;
  backHref?: string;
  activeNavTab?: 'BERANDA' | 'DASHBOARD' | 'MATERI' | 'TUGAS' | 'PROFIL' | string;
  showBottomNav?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg';
  transparentHeader?: boolean;
  starsCount?: number;
  userAvatarUrl?: string | null;
  studentName?: string;
  className?: string;
}

export function StudentLayoutShell({
  children,
  title,
  subtitle,
  badgeText,
  backHref,
  maxWidth = 'sm',
  className = '',
}: StudentLayoutShellProps) {
  const containerMaxWidth = {
    sm: 'max-w-sm sm:max-w-xl md:max-w-2xl',
    md: 'max-w-md sm:max-w-2xl md:max-w-3xl',
    lg: 'max-w-lg sm:max-w-3xl md:max-w-4xl',
  }[maxWidth];

  return (
    <div className={`w-full mx-auto ${containerMaxWidth} ${className}`}>
      <div>{children}</div>
    </div>
  );
}