// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { uploadFileToR2, type R2Folder } from '@/features/shared/services/storage-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if ((authError || !user) && process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { success: false, error: 'Akses tidak diizinkan. Silakan login terlebih dahulu.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const folderInput = formData.get('folder');

    if (
      !file ||
      typeof file === 'string' ||
      typeof (file as { arrayBuffer?: unknown }).arrayBuffer !== 'function'
    ) {
      return NextResponse.json(
        { success: false, error: 'Berkas tidak ditemukan dalam permintaan form data.' },
        { status: 400 }
      );
    }

    // Daftar folder yang diizinkan, termasuk 'voice'
    const validFolders: R2Folder[] = [
      'materials',
      'audio-prompts',
      'submissions',
      'avatars',
      'submissions/voices',
    ];

    const folder = (
      typeof folderInput === 'string' && validFolders.includes(folderInput as R2Folder)
        ? folderInput
        : 'submissions'
    ) as R2Folder;

    const fileObj = file as Blob & { name?: string };
    const customFileName = formData.get('fileName') || formData.get('filename');
    const resolvedName =
      typeof customFileName === 'string' && customFileName.trim().length > 0
        ? customFileName.trim()
        : fileObj.name;

    const fileName =
      resolvedName && resolvedName !== 'blob'
        ? resolvedName
        : `upload_${Date.now()}.${fileObj.type?.includes('audio') ? 'webm' : 'jpg'}`;

    const arrayBuffer = await fileObj.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const contentType = fileObj.type || 'application/octet-stream';

    const result = await uploadFileToR2({
      folder,
      fileName,
      fileBuffer,
      contentType,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.data.publicUrl,
    });
  } catch (err: unknown) {
    console.error('[API Upload Route] Exception:', err);
    const msg = err instanceof Error ? err.message : 'Kesalahan server internal saat upload berkas.';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}