// scripts/seed-all.mjs
// Script untuk menjalankan seluruh seeder Vokid LMS

import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const seeders = [
    { name: 'Auth Users', file: 'seed-auth-users.ts' },
    { name: 'Matematika Fase A', file: 'seed-matematika-fase-a-kelas1.ts' },
    { name: 'Bahasa Inggris Fase A', file: 'seed-bahasa-inggris-fase-a-kelas1.ts' },
    { name: 'Seni Budaya Fase A', file: 'seed-seni-budaya-fase-a-kelas1.ts' },
    { name: 'Pendidikan Pancasila', file: 'seed-pendidikan-pancasila-fase-a-kelas1.ts' },
    { name: 'IPAS Fase A', file: 'seed-ipas-fase-a-kelas1.ts' },
    { name: 'Bahasa Indonesia Batch 1', file: 'seed-bahasa-indonesia-batch1.ts' },
    { name: 'Bahasa Indonesia Batch 2', file: 'seed-bahasa-indonesia-batch2.ts' },
    { name: 'Bahasa Indonesia Batch 3', file: 'seed-bahasa-indonesia-batch3.ts' },
    { name: 'Bahasa Indonesia Batch 4', file: 'seed-bahasa-indonesia-batch4.ts' },
];

console.log('================================================================');
console.log('  MENJALANKAN SEMUA SEEDER VOKID LMS');
console.log('================================================================');

let successCount = 0;
let failCount = 0;
const failedSeeders = [];

function runSeeder(seeder) {
    return new Promise(function (resolve) {
        const scriptPath = path.join('scripts', seeder.file);

        console.log('');
        console.log('[' + seeder.name + '] Menjalankan ' + seeder.file + '...');
        console.log('----------------------------------------------------------------');

        if (!fs.existsSync(scriptPath)) {
            console.log('File ' + scriptPath + ' tidak ditemukan! Skipping...');
            failCount++;
            failedSeeders.push(seeder.name);
            resolve();
            return;
        }

        const child = spawn('npx', ['tsx', scriptPath], {
            stdio: 'inherit',
            shell: true,
        });

        child.on('close', function (code) {
            console.log('');
            if (code === 0) {
                console.log('[' + seeder.name + '] BERHASIL');
                successCount++;
            } else {
                console.log('[' + seeder.name + '] GAGAL (Exit Code: ' + code + ')');
                failCount++;
                failedSeeders.push(seeder.name);
            }
            resolve();
        });

        child.on('error', function (err) {
            console.log('[' + seeder.name + '] ERROR: ' + err.message);
            failCount++;
            failedSeeders.push(seeder.name);
            resolve();
        });
    });
}

async function main() {
    for (const seeder of seeders) {
        await runSeeder(seeder);
    }

    console.log('');
    console.log('================================================================');
    console.log('  RINGKASAN HASIL SEEDING');
    console.log('================================================================');
    console.log('Berhasil : ' + successCount + ' seeder');
    console.log('Gagal    : ' + failCount + ' seeder');
    console.log('');

    if (failCount > 0) {
        console.log('Seeder yang gagal:');
        for (const name of failedSeeders) {
            console.log('   - ' + name);
        }
        console.log('');
        process.exit(1);
    } else {
        console.log('SEMUA SEEDER BERHASIL DIJALANKAN!');
        console.log('');
        process.exit(0);
    }
}

main();