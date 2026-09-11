import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function getProjectId(): string {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        throw new Error('Berkas .env.local tidak ditemukan.');
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=https?:\/\/([^.]+)\.supabase\.co/);

    if (!match || !match[1]) {
        throw new Error('Gagal mengekstrak Project ID dari NEXT_PUBLIC_SUPABASE_URL di .env.local.');
    }

    return match[1].trim();
}

async function main() {
    try {
        const projectId = getProjectId();
        console.log(`\n🚀 Terhubung ke Project ID: ${projectId}`);

        // 1. Eksekusi push migrasi ke remote DB
        console.log('\n📦 [1/2] Menjalankan supabase db push...');
        execSync('npx supabase db push', { stdio: 'inherit' });

        // 2. Generate ulang types/database.ts secara resmi
        console.log('\n📝 [2/2] Melakukan generate types/database.ts...');
        const typesOutput = execSync(`npx supabase gen types typescript --project-id ${projectId}`, {
            encoding: 'utf8',
            maxBuffer: 10 * 1024 * 1024,
        });

        // 3. Pastikan type aliases tetap ada di akhir berkas
        const aliases = `
// Alias entity types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ClassRecord = Database['public']['Tables']['classes']['Row'];
export type Subject = Database['public']['Tables']['subjects']['Row'];
export type Module = Database['public']['Tables']['modules']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type LessonCompletion = Database['public']['Tables']['lesson_completions']['Row'];
export type Assignment = Database['public']['Tables']['assignments']['Row'];
export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
export type Submission = Database['public']['Tables']['submissions']['Row'];
`;

        const finalContent = `${typesOutput.trim()}\n${aliases}`;
        const targetPath = path.resolve(process.cwd(), 'types/database.ts');
        fs.writeFileSync(targetPath, finalContent, 'utf8');

        console.log('✅ Berhasil: Migrasi terdorong dan types/database.ts sudah diperbarui!\n');
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Terjadi kegagalan saat sinkronisasi database.';
        console.error(`\n❌ Error: ${msg}\n`);
        process.exit(1);
    }
}

main();