'use client';

import React from 'react';
import { FaseAView } from './FaseAView';
import { FaseBCView } from './FaseBCView';
import type { StudentClassroomData } from '../services/student-service';
import type { GradeLevel } from '@/types/database';

interface AdaptivePortalProps {
  classroomData: StudentClassroomData;
  gradeLevel: GradeLevel;
}

/**
 * Komponen Adaptif: Mengalihkan tampilan portal berdasarkan jenjang kelas siswa
 * - Fase A (Kelas 1–2): Audio-first, tombol besar min 64px, visual ramah anak.
 * - Fase B/C (Kelas 3–6): Layout terstruktur sidebar, viewer modul & materi.
 */
export function AdaptivePortal({ classroomData, gradeLevel }: AdaptivePortalProps) {
  if (gradeLevel <= 2) {
    return <FaseAView classroomData={classroomData} />;
  }

  return <FaseBCView classroomData={classroomData} />;
}
