import React from 'react';
import { getStudentClassroom } from '@/features/student/services/student-service';
import { AdaptivePortal } from '@/features/student/components/AdaptivePortal';
import { StudentLayoutShell } from '@/features/student/components/StudentLayoutShell';
import type { GradeLevel } from '@/types/database';

export const dynamic = 'force-dynamic';

interface StudentClassPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentClassPage({ params }: StudentClassPageProps) {
  const { id: classId } = await params;

  const result = await getStudentClassroom(classId);

  // Fallback data jika kelas belum tersinkronisasi di cloud saat penjelajahan rute
  const classroomData = result.success
    ? result.data
    : {
        classData: {
          id: classId,
          name: 'Kelas Pembelajaran SD',
          grade_level: 1 as GradeLevel,
          academic_year: '2026/2027',
          created_by: null,
          created_at: new Date().toISOString(),
        },
        subjects: [
          {
            id: 'bbbbbbbb-1111-0000-0000-000000000001',
            class_id: classId,
            name: 'Bahasa Indonesia',
            code: 'BIND-1',
            created_at: new Date().toISOString(),
            modules: [
              {
                id: 'cccccccc-1111-0000-0000-000000000001',
                subject_id: 'bbbbbbbb-1111-0000-0000-000000000001',
                title: 'Membaca Suku Kata [Seed]',
                order_index: 1,
                is_published: true,
                created_at: new Date().toISOString(),
                lessons: [
                  {
                    id: 'dddddddd-1111-0000-0000-000000000001',
                    module_id: 'cccccccc-1111-0000-0000-000000000001',
                    title: 'Pengenalan Fonik Suku Kata Ba-Bi-Bu',
                    content_type: 'AUDIO' as const,
                    content_url: 'https://storage.googleapis.com/vokid-cdn/audio/vokid-seed-ba-bi-bu.mp3',
                    content_text: null,
                    learning_objectives: null,
                    order_index: 1,
                    created_at: new Date().toISOString(),
                    assignments: [
                      {
                        id: 'eeeeeeee-1111-0000-0000-000000000001',
                        lesson_id: 'dddddddd-1111-0000-0000-000000000001',
                        type: 'VOICE_TASK' as const,
                        prompt: 'Tekan tombol mikrofon besar, lalu ucapkan kalimat: "Buku Budi Baru" dengan lantang [vokid-seed]',
                        instruction_audio_url: 'https://storage.googleapis.com/vokid-cdn/audio/vokid-seed-instruksi-tugas1.mp3',
                        due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
                        created_at: new Date().toISOString(),
                        quiz_question_count: null,
                        passing_score: null,
                        hasSubmitted: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };

  const gradeLevel = (classroomData.classData.grade_level ?? 1) as GradeLevel;
  const isFaseA = gradeLevel <= 2;
  const faseText = isFaseA ? 'Fase A' : gradeLevel <= 4 ? 'Fase B' : 'Fase C';

  return (
    <StudentLayoutShell
      title={classroomData.classData.name}
      subtitle={`Kelas ${gradeLevel} SD • ${faseText}`}
      badgeText={faseText}
      badgeVariant={isFaseA ? 'amber' : 'sky'}
      backHref="/siswa"
      activeNavTab="MATERI"
      showBottomNav={true}
      maxWidth="sm"
    >
      <AdaptivePortal
        classroomData={classroomData}
        gradeLevel={gradeLevel}
      />
    </StudentLayoutShell>
  );
}
