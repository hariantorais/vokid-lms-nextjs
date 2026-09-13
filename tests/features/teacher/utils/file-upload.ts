import { toast } from 'sonner';

/**
 * Mengunggah berkas dokumen PDF modul pembelajaran ke Cloudflare R2 via internal API route.
 * Batas ukuran maksimal: 20MB.
 */
export const uploadPdfFile = async (file: File): Promise<string | null> => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        toast.error('Berkas harus berupa dokumen PDF (.pdf)');
        return null;
    }

    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
        toast.error('Ukuran berkas PDF maksimal 20MB.');
        return null;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('folder', 'materials');

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success || !data.url) {
            throw new Error(data.error || 'Gagal mengunggah PDF ke Cloudflare R2.');
        }

        toast.success(`Berkas PDF "${file.name}" berhasil diunggah ke R2!`);
        return data.url as string;
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat mengunggah PDF.';
        toast.error(msg);
        return null;
    }
};