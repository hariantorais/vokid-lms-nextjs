import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, getR2BucketName } from '@/features/shared/services/r2-client';
import { extractR2KeyFromUrl } from '@/features/shared/services/storage-service';

export const dynamic = 'force-dynamic';

const ALLOWED_PREFIXES = ['materials/', 'submissions/', 'avatars/'];

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

    // Cegah path traversal dan karakter berbahaya
    if (key.includes('..') || key.includes('//') || key.startsWith('/') || key.startsWith('\\')) {
      return new NextResponse('Akses ditolak: format path tidak valid.', { status: 403 });
    }

    // Whitelist folder R2 yang boleh diakses
    const isAllowed = ALLOWED_PREFIXES.some((prefix) => key!.startsWith(prefix));
    if (!isAllowed) {
      return new NextResponse('Akses ditolak: folder berkas tidak diizinkan.', { status: 403 });
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

    const contentType = response.ContentType || 'application/octet-stream';
    const contentLength = response.ContentLength ? String(response.ContentLength) : undefined;

    const bodyAny = response.Body as unknown as { transformToWebStream?: () => ReadableStream };
    const stream = typeof bodyAny.transformToWebStream === 'function'
      ? bodyAny.transformToWebStream()
      : (response.Body as unknown as ReadableStream);

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
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