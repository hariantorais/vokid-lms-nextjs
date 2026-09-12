import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/media/**',
        search: '?**',
      },
    ],
  },
};

export default nextConfig;