import { S3Client } from '@aws-sdk/client-s3';

let r2ClientInstance: S3Client | null = null;

export function resetR2Client(): void {
  r2ClientInstance = null;
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY
  );
}

export function getR2Client(): S3Client {
  if (r2ClientInstance) {
    return r2ClientInstance;
  }

  const accountId = process.env.R2_ACCOUNT_ID || 'dummy-account-id';
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || 'dummy-access-key';
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || 'dummy-secret-key';

  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(
        '[Cloudflare R2] Peringatan: Kredensial R2 belum lengkap di environment. Menggunakan konfigurasi fallback aman untuk mencegah kegagalan build statis.'
      );
    }
  }

  r2ClientInstance = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return r2ClientInstance;
}

export function getR2BucketName(): string {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) {
    return 'vokid-storage';
  }
  return bucket;
}

export function getR2PublicDomain(): string {
  const domain = process.env.R2_PUBLIC_DOMAIN;
  if (!domain) {
    return 'https://pub-vokid.r2.dev';
  }
  return domain.replace(/\/+$/, '');
}

