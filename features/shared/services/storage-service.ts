import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName, getR2PublicDomain } from '@/lib/storage/r2';
import type { ActionResponse } from '../types/storage';

export type R2Folder = 'materials' | 'audio-prompts' | 'submissions';

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
    const validFolders: R2Folder[] = ['materials', 'audio-prompts', 'submissions'];
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
