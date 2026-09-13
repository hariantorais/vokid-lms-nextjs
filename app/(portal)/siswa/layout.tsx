import React from 'react';
import { StudentProvider } from '@/features/student/context/StudentContext';
import { StudentHeaderHUD } from '@/features/student/components/StudentHeaderHUD';
import { getStudentProfileAction } from './_actions/profile.actions';
import { getStudentTotalStars } from '@/features/student/actions/star.actions';

export default async function SiswaRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profileRes = await getStudentProfileAction();
    const profile = profileRes.success ? profileRes.data : null;

    const activeStudentId =
        profile?.id ||
        (process.env.NODE_ENV === 'development'
            ? '22222222-2222-2222-2222-222222222222'
            : '');

    // Ambil bintang aktual langsung dari database
    const totalStars = activeStudentId
        ? await getStudentTotalStars(activeStudentId)
        : 0;

    const initialData = {
        studentId: activeStudentId,
        studentName: profile?.full_name || 'Petualang',
        avatarUrl: profile?.avatar_url || null,
        totalStars, // SINKRON DENGAN DATABASE
    };

    return (
        <StudentProvider initialData={initialData}>
            <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
                {/* Header HUD membaca totalStars aktual */}
                <StudentHeaderHUD />

                <main className="flex-1 mx-auto w-full px-4 py-4 max-w-sm sm:max-w-xl md:max-w-2xl">
                    {children}
                </main>
            </div>
        </StudentProvider>
    );
}