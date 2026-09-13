'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
    content: string;
    className?: string;
    size?: 'xs' | 'sm' | 'base';
}

export function MarkdownContent({
    content,
    className = '',
    size = 'xs',
}: MarkdownContentProps) {
    const sizeClasses = {
        xs: 'prose-xs text-xs',
        sm: 'prose-sm text-sm',
        base: 'prose-base text-base',
    }[size];

    return (
        <div
            className={`prose max-w-none font-sans select-text ${sizeClasses} prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:font-black prose-strong:text-slate-900 ${className}`}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Menghilangkan bungkus latar hitam <pre>
                    pre: ({ children }) => {
                        return <div className="my-3 w-full not-prose">{children}</div>;
                    },

                    // Deteksi dialog di dalam blok teks
                    code: ({ className: codeClassName, children, ...props }) => {
                        const rawContent = String(children).trim();
                        const lines = rawContent
                            .split('\n')
                            .map((l) => l.trim())
                            .filter(Boolean);

                        // Cek apakah konten berupa percakapan (tiap baris mengandung tanda titik dua ':')
                        const isDialogBlock =
                            lines.length > 1 && lines.every((line) => line.includes(':'));

                        if (isDialogBlock) {
                            const speakers = Array.from(
                                new Set(lines.map((l) => l.split(':')[0].trim()))
                            );
                            const firstSpeaker = speakers[0];

                            return (
                                <div className="w-full space-y-3 p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-2xs">
                                    {lines.map((line, idx) => {
                                        const colonIndex = line.indexOf(':');
                                        const speaker = line.slice(0, colonIndex).trim();
                                        const text = line.slice(colonIndex + 1).trim();
                                        const isFirst = speaker === firstSpeaker;

                                        return (
                                            <div
                                                key={idx}
                                                className={`flex flex-col ${isFirst ? 'items-start' : 'items-end'
                                                    }`}
                                            >
                                                {/* Label Nama Tokoh */}
                                                <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 px-2 mb-1">
                                                    {speaker}
                                                </span>

                                                {/* Balon Ucapan */}
                                                <div
                                                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl text-xs sm:text-[13px] font-bold leading-relaxed border-2 shadow-2xs ${isFirst
                                                            ? 'bg-teal-50 border-teal-200 text-teal-950 rounded-tl-xs text-left'
                                                            : 'bg-amber-50 border-amber-200 text-amber-950 rounded-tr-xs text-left'
                                                        }`}
                                                >
                                                    {text.replace(/^["']|["']$/g, '')}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }

                        // Fallback inline code biasa
                        return (
                            <code
                                className="bg-amber-100/80 text-amber-900 font-bold px-1.5 py-0.5 rounded-md text-[0.9em] border border-amber-200 before:content-none after:content-none font-sans"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },

                    // Heading
                    h1: ({ children }) => (
                        <h1 className="text-base sm:text-lg font-black text-teal-800 mb-2 mt-3 flex items-center gap-1.5">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-sm sm:text-base font-black text-slate-800 mb-1.5 mt-3">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xs sm:text-sm font-black text-amber-800 mb-1 mt-2">
                            {children}
                        </h3>
                    ),

                    // Blockquote (Catatan Guru/Fakta Menarik)
                    blockquote: ({ children }) => (
                        <blockquote className="my-2.5 p-3 rounded-2xl bg-amber-50/80 border-2 border-amber-200 text-amber-950 font-bold not-italic text-xs leading-relaxed shadow-2xs">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}