import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName, getR2PublicDomain } from '@/lib/storage/r2';
import type { ActionResponse } from '../types/storage';

export type R2Folder = 'materials' | 'audio-prompts' | 'submissions' | 'avatars';

export interface UploadFileToR2Params {
  folder: R2Folder;
  fileName: string;
  fileBuffer: Buffer | Uint8Array;
  contentType: string;
}

export interface UploadR2Result {
  key: string;
  publicUrl: string;
}

/**
 * Ekstrak key berkas R2 dari URL publik Cloudflare R2
 * Contoh: "https://pub-vokid.r2.dev/materials/modul_1.pdf" -> "materials/modul_1.pdf"
 */
export function extractR2KeyFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const publicDomain = getR2PublicDomain();
    if (url.startsWith(publicDomain)) {
      const path = url.slice(publicDomain.length).replace(/^\/+/, '');
      return path.length > 0 ? path : null;
    }

    const parsed = new URL(url);
    const pathname = parsed.pathname.replace(/^\/+/, '');
    const validFolders: R2Folder[] = ['materials', 'audio-prompts', 'submissions', 'avatars'];
    if (validFolders.some((f) => pathname.startsWith(`${f}/`))) {
      return pathname;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Mengubah URL Cloudflare R2 publik menjadi URL internal proxy Next.js (/api/media?url=...)
 * Hal ini memastikan berkas (seperti PDF) dapat dibuka 100% lancar di browser pengguna
 * tanpa terhalang blokir DNS / Internet Positif provider seluler Indonesia pada domain *.r2.dev.
 */
export function getMediaProxyUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.includes('.r2.dev') || url.startsWith('materials/') || url.startsWith('audio-prompts/') || url.startsWith('submissions/') || url.startsWith('avatars/')) {
    return `/api/media?url=${encodeURIComponent(url)}`;
  }
  return url;
}

/**
 * Service: Menghapus berkas dari Cloudflare R2 Bucket
 * @param keyOrUrl Key berkas (contoh: "materials/file.pdf") atau URL publik R2
 */
export async function deleteFileFromR2(keyOrUrl: string): Promise<ActionResponse<boolean>> {
  try {
    const key = extractR2KeyFromUrl(keyOrUrl) || keyOrUrl;
    if (!key || key.trim().length === 0) {
      return { success: false, error: 'Key berkas R2 tidak valid.' };
    }

    const client = getR2Client();
    const bucket = getR2BucketName();

    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    await client.send(command);

    return {
      success: true,
      data: true,
    };
  } catch (err: unknown) {
    console.error('[Storage Service Error] Delete from Cloudflare R2 failed:', err);
    const msg =
      err instanceof Error ? err.message : 'Gagal menghapus berkas dari Cloudflare R2.';
    return {
      success: false,
      error: msg,
    };
  }
}

/**
 * Service: Mengunggah berkas ke Cloudflare R2 Bucket (1 Bucket dengan Sub-Folder)
 * @param params folder, fileName, fileBuffer, contentType
 * @returns ActionResponse<UploadR2Result>
 */
export async function uploadFileToR2({
  folder,
  fileName,
  fileBuffer,
  contentType,
}: UploadFileToR2Params): Promise<ActionResponse<UploadR2Result>> {
  try {
    const validFolders: R2Folder[] = ['materials', 'audio-prompts', 'submissions', 'avatars'];
    if (!validFolders.includes(folder)) {
      return {
        success: false,
        error: `Sub-folder R2 tidak valid. Pilih dari: ${validFolders.join(', ')}`,
      };
    }

    // Sanitasi nama berkas untuk mencegah path traversal dan karakter bermasalah
    const cleanFileName = fileName
      .trim()
      .replace(/[\/\\]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');

    const finalFileName = cleanFileName.length > 0 ? cleanFileName : `file_${Date.now()}`;
    const key = `${folder}/${finalFileName}`;

    const client = getR2Client();
    const bucket = getR2BucketName();

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await client.send(command);

    const publicDomain = getR2PublicDomain();
    const publicUrl = `${publicDomain}/${key}`;

    return {
      success: true,
      data: {
        key,
        publicUrl,
      },
    };
  } catch (err: unknown) {
    console.error('[Storage Service Error] Upload to Cloudflare R2 failed:', err);
    const msg =
      err instanceof Error ? err.message : 'Gagal mengunggah berkas ke penyimpanan Cloudflare R2.';
    return {
      success: false,
      error: msg,
    };
  }
}
