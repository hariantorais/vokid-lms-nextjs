'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
    /**
     * Konten dalam format Markdown.
     * Mendukung: **bold**, *italic*, `code`, list, heading, blockquote, dll.
     */
    content: string;
    /**
     * Class tambahan dari Tailwind untuk override styling default.
     */
    className?: string;
    /**
     * Ukuran teks: 'xs' (default, untuk card/LKPD), 'sm', atau 'base'.
     */
    size?: 'xs' | 'sm' | 'base';
}

/**
 * Komponen reusable untuk menampilkan teks Markdown dengan styling yang
 * konsisten di seluruh aplikasi Vokid LMS.
 *
 * Contoh pemakaian:
 * ```tsx
 * <MarkdownContent content="**Hello** *world*" />
 * ```
 */
export function MarkdownContent({
    content,
    className = '',
    size = 'xs',
}: MarkdownContentProps) {
    const sizeClasses = {
        xs: 'prose-xs',
        sm: 'prose-sm',
        base: 'prose-base',
    }[size];

    return (
        <div
            className={`prose max-w-none ${sizeClasses}
        /* Heading styles */
        prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
        prose-h1:text-lg prose-h1:mb-2 prose-h1:mt-3
        prose-h2:text-base prose-h2:mb-1.5 prose-h2:mt-3
        prose-h3:text-sm prose-h3:mb-1 prose-h3:mt-2
        prose-h4:text-xs prose-h4:mb-1 prose-h4:mt-2
        
        /* Paragraph & text */
        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:my-1.5
        
        /* Strong (bold) */
        prose-strong:font-black prose-strong:text-slate-900
        
        /* Emphasis (italic) */
        prose-em:italic prose-em:text-slate-700
        
        /* Lists */
        prose-ul:my-2 prose-ul:pl-5 prose-ul:list-disc
        prose-ol:my-2 prose-ol:pl-5 prose-ol:list-decimal
        prose-li:text-slate-700 prose-li:my-0.5 prose-li:leading-relaxed prose-li:marker:text-slate-400
        
        /* Code */
        prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 
        prose-code:rounded prose-code:text-[0.9em] prose-code:font-mono
        prose-code:text-rose-600 prose-code:font-bold
        prose-code:before:content-none prose-code:after:content-none
        
        /* Blockquote */
        prose-blockquote:border-l-4 prose-blockquote:border-amber-400 
        prose-blockquote:bg-amber-50/50 prose-blockquote:py-1 prose-blockquote:px-3
        prose-blockquote:rounded-r-md prose-blockquote:italic
        prose-blockquote:text-slate-700 prose-blockquote:my-2
        
        /* Links */
        prose-a:text-sky-600 prose-a:font-bold prose-a:no-underline 
        hover:prose-a:underline
        
        /* Horizontal rule */
        prose-hr:border-slate-200 prose-hr:my-3
        
        /* Table */
        prose-table:text-xs prose-table:my-3
        prose-th:bg-slate-100 prose-th:p-2 prose-th:text-left prose-th:font-black
        prose-td:p-2 prose-td:border-t prose-td:border-slate-200
        
        ${className}`}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Kustomisasi komponen tertentu jika diperlukan
                    a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}