import React from 'react';
import { notFound } from 'next/navigation';
import { getStudentReportData } from '@/features/teacher/services/teacher-service';
import { StudentReportPrintView } from '@/features/teacher/components/StudentPrintView';

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ studentId: string }>;
}

export default async function StudentRaporPage({ params }: Props) {
    const { studentId } = await params;
    const result = await getStudentReportData(studentId);

    if (!result.success || !result.data) {
        notFound();
    }

    return <StudentReportPrintView data={result.data} />;
}