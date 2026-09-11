import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName } from '@/lib/storage/r2';
import { extractR2KeyFromUrl } from '@/features/shared/services/storage-service';

export const dynamic = 'force-dynamic';

/**
 * Route Handler untuk streaming / serve berkas dari R2 secara langsung
 * lewat domain aplikasi (Next.js server), sehingga 100% bebas dari blokir
 * Internet Positif / DNS ISP Indonesia pada domain publik .r2.dev
 *
 * Contoh penggunaan:
 * /api/media?url=https://pub-xxx.r2.dev/materials/file.pdf
 * atau
 * /api/media?key=materials/file.pdf
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyParam = searchParams.get('key');
    const urlParam = searchParams.get('url');

    let key = keyParam;
    if (!key && urlParam) {
      key = extractR2KeyFromUrl(urlParam);
    }

    if (!key) {
      return new NextResponse('Parameter "key" atau "url" tidak valid.', { status: 400 });
    }

    const client = getR2Client();
    const bucket = getR2BucketName();

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await client.send(command);

    if (!response.Body) {
      return new NextResponse('Berkas tidak ditemukan.', { status: 404 });
    }

    const contentType = response.ContentType || 'application/pdf';
    const contentLength = response.ContentLength ? String(response.ContentLength) : undefined;

    // Convert S3 stream to Web ReadableStream
    const bodyAny = response.Body as any;
    const stream = typeof bodyAny.transformToWebStream === 'function'
      ? bodyAny.transformToWebStream()
      : (bodyAny as ReadableStream);

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
    // Inline agar PDF bisa langsung dibuka/dibaca di browser tanpa dipaksa download
    headers.set('Content-Disposition', 'inline');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (err: unknown) {
    console.error('[API Media Proxy Error]:', err);
    return new NextResponse('Gagal memuat berkas media.', { status: 500 });
  }
}
