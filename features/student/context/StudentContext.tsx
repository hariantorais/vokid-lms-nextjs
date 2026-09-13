'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StudentContextData {
    studentId: string;
    studentName: string;
    avatarUrl: string | null;
    totalStars: number;
    setTotalStars: (stars: number) => void;
    setAvatarUrl: (url: string | null) => void;
}

const StudentContext = createContext<StudentContextData | null>(null);

export function StudentProvider({
    children,
    initialData,
}: {
    children: ReactNode;
    initialData: {
        studentId: string;
        studentName: string;
        avatarUrl: string | null;
        totalStars: number;
    };
}) {
    const [totalStars, setTotalStars] = useState(initialData.totalStars);
    const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);

    return (
        <StudentContext.Provider
            value={{
                studentId: initialData.studentId,
                studentName: initialData.studentName,
                avatarUrl,
                totalStars,
                setTotalStars,
                setAvatarUrl,
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}

export function useStudent() {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudent must be used within a StudentProvider');
    }
    return context;
}