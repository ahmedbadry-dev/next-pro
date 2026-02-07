import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: 'plus.unsplash.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'admired-parrot-422.convex.cloud',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'cdn.dribbble.com',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

export default nextConfig
