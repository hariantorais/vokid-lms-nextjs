/**
 * Utility untuk memformat judul bab secara konsisten dan otomatis.
 * Membersihkan awalan "Bab X:" atau "Bab X -" jika guru mengetikkannya secara manual,
 * lalu mengembalikan judul bersih serta format judul lengkap ber-nomor bab otomatis.
 */

export function cleanModuleTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  // Menghapus pola seperti "Bab 1:", "BAB 1 -", "Bab 1. ", "Bab 1 ", dll di awal teks
  return rawTitle.replace(/^bab\s*\d+\s*[:.\-–—]?\s*/i, '').trim();
}

export function formatModuleTitle(orderIndex: number, rawTitle: string): string {
  const clean = cleanModuleTitle(rawTitle);
  if (!clean) {
    return `Bab ${orderIndex}`;
  }
  return `Bab ${orderIndex}: ${clean}`;
}
