import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SiswaPortalPage from '@/app/(portal)/siswa/page';

// Mock student-service
vi.mock('@/features/student/services/student-service', () => ({
  getStudentClassrooms: vi.fn().mockResolvedValue({
    success: true,
    data: [
      {
        id: 'aaaaaaaa-1111-0000-0000-000000000001',
        name: 'Kelas 1-A Amanah [Seed]',
        grade_level: 1,
        academic_year: '2026/2027',
        created_by: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 'aaaaaaaa-5555-0000-0000-000000000005',
        name: 'Kelas 5-B Cendekia [Seed]',
        grade_level: 5,
        academic_year: '2026/2027',
        created_by: null,
        created_at: new Date().toISOString(),
      },
    ],
  }),
}));

describe('SiswaPortalPage Classroom Cards Navigation', () => {
  it('harus merender kartu kelas yang dibungkus komponen Link ke /siswa/kelas/[id]', async () => {
    const Component = await SiswaPortalPage();
    render(Component);

    // Verifikasi judul dan header
    expect(screen.getByText(/Pilih Kelas Belajarmu! 🎒/i)).toBeInTheDocument();

    // Verifikasi keberadaan nama kelas
    expect(screen.getByText('Kelas 1-A Amanah [Seed]')).toBeInTheDocument();
    expect(screen.getByText('Kelas 5-B Cendekia [Seed]')).toBeInTheDocument();

    // Verifikasi setiap kartu kelas merupakan link anchor yang mengarah ke /siswa/kelas/[id]
    const classLinks = screen.getAllByRole('link', { name: /Kelas (1-A|5-B)/i });
    expect(classLinks.length).toBe(2);

    expect(classLinks[0]).toHaveAttribute(
      'href',
      '/siswa/kelas/aaaaaaaa-1111-0000-0000-000000000001'
    );
    expect(classLinks[1]).toHaveAttribute(
      'href',
      '/siswa/kelas/aaaaaaaa-5555-0000-0000-000000000005'
    );

    // Verifikasi kelas CSS pembungkus sesuai arahan
    expect(classLinks[0]).toHaveClass('block', 'p-6', 'rounded-2xl', 'border-2', 'cursor-pointer');
  });
});
