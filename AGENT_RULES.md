# Vokid - AI Agent Directives & Architecture Rules

## 1. Project Context & Domain
- Project Name: Vokid
- Domain: Dedicated Primary School (SD Kelas 1–6) LMS based on Kurikulum Merdeka.
- Core UX Pattern: Adaptive interface based on grade_level:
  - Fase A (Grades 1–2): Audio-first, big touch targets (min 64x64px), voice recording, homework photo upload.
  - Fase B/C (Grades 3–6): Structured sidebar navigation, standard reading/video materials, homework submissions.

## 2. Tech Stack & Constraints
- Framework: Next.js (App Router)
- Language: TypeScript (Strict mode enabled, HARAM menggunakan 'any')
- Styling: Tailwind CSS & shadcn/ui
- Database & Auth: Supabase (PostgreSQL, Auth, Storage, RLS)
- Validation: Zod
- Testing: Vitest & React Testing Library

## 3. Engineering Rules
- Default to React Server Components (RSC). Use 'use client' only when browser APIs/state are strictly required.
- All mutations must use Next.js Server Actions with strict Zod validation.
- All PostgreSQL tables must have Row Level Security (RLS) enabled.
- Production-ready code only: no stubs, no incomplete functions, no placeholders.

