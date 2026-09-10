Vokid - AI Agent Directives & Architecture Rules
1. Project Context & Domain
Project Name: Vokid

Domain: Dedicated Primary School (Sekolah Dasar / SD Kelas 1–6) Learning Management System based on Indonesian Kurikulum Merdeka.

Adaptive UX Pattern: Interface adapts dynamically based on the student's grade_level:

Fase A (Grades 1–2): Low-literacy, visual-first, audio-narrated prompts, large touch targets (minimum 64x64px), one-touch voice recording, and camera photo capture.

Fase B/C (Grades 3–6): Standard structured layout, sidebar navigation, rich reading/video materials, and homework photo uploads.

2. Core Tech Stack
Framework: Next.js (App Router, strictly TypeScript)

Language: TypeScript (Strict Mode enabled, NEVER use any, use generics, unknown, or explicit type narrowing)

Styling: Tailwind CSS & shadcn/ui

Backend & Database: Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Row Level Security)

Validation: Zod schemas

Testing: Vitest & React Testing Library

3. Architecture & Code Organization (Feature-Driven Structure)
3.1 Directory Layout Strategy
Apply Feature-Driven Architecture (Vertical Slice) under the features/ directory. Each business domain must be self-contained:

Struktur folder fitur (features/<feature-name>/):

actions/: Next.js Server Actions ('use server')

components/: Feature-specific UI components (RSC or 'use client')

services/: Data Access Layer (DAL) & Supabase queries/mutations

validations/: Zod validation schemas

types/: Local types specific to this feature (optional)

Aturan direktori lainnya:

app/ Directory: Strictly reserved for routing, page entry points (page.tsx), and route layouts (layout.tsx). Pages must remain thin and delegate logic/rendering to feature components.

features/shared/ or components/ui/: Generic, reusable UI primitives (shadcn/ui buttons, inputs, dialogs) and global utility helpers.

lib/: Third-party client initializers (lib/supabase/client.ts, lib/supabase/server.ts).

types/: Global database contracts and domain enums (types/database.ts).

3.2 Strict Layer Separation (Clean Architecture)
Presentation Layer (components/):

Default to React Server Components (RSC).

Use 'use client' strictly when browser APIs (e.g., MediaRecorder, HTML Canvas), state hooks (useState), or event listeners are required.

PROHIBITED: Directly executing raw Supabase queries inside Client Components.

Action Layer (actions/):

Server Actions act as controllers. They receive payloads, validate data via Zod, enforce user session authorization, call the Service Layer, and trigger Next.js cache revalidation (revalidatePath or revalidateTag).

Data Access & Service Layer (services/):

All Supabase database queries, RPC calls, and mutations must reside exclusively in this layer.

Every function must declare explicit TypeScript return types.

4. Engineering Standards, Media Storage & Caching
4.1 Mutation & Standard Result Pattern
All Server Actions must wrap responses in a standardized discriminated union:

TypeScript
export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
Always log original errors on the server console (console.error('[Action Error]:', error)) before returning a sanitized user-friendly error message.

4.2 Supabase Storage Guidelines
Do NOT store raw binary/base64 strings inside PostgreSQL tables.

Use dedicated Supabase Storage buckets:

learning-materials: For PDFs and lesson media.

audio-prompts: For teacher voice instructions (audio/webm, audio/mp3).

homework-submissions: For student voice recordings and photo homework.

Store only the storage file path or public/signed URL in database tables.

4.3 Cache Management
Whenever a Server Action mutates data, explicitly invoke revalidatePath() for affected routes to avoid stale views.

4.4 Security & Data Isolation
Row-Level Security (RLS): Every PostgreSQL table must have RLS enabled with explicit granular policies for teachers vs students.

Secret Isolation: SUPABASE_SERVICE_ROLE_KEY is STRICTLY PROHIBITED from being exposed to Client Components or general public Server Actions.

Ownership Verification: Before mutating or deleting a resource, verify that the active user owns or has the institutional role (GURU) to perform the action.

5. Code Quality & Verification Protocol
Zero-Stub Policy: Prohibited from writing stubs, mock fallbacks, or comments like // TODO: implement later or // ... rest of the code. Always generate complete, production-ready code.

Explicit Interfaces: Define typed models and Zod schemas before writing business logic or UI bindings.

Natural Indonesian Localization: When providing UI labels or messages in Indonesian, use standard educational terminology (e.g., "Mata Pelajaran", "Tugas Suara", "Kirim Jawaban", "Menunggu Nilai", "Sudah Dinilai").

Verification Gates:

Unit tests via npm run test or npx vitest run <path-to-test>.

Type-safety check via npx tsc --noEmit (must yield zero errors).

Production build verification via npm run build.