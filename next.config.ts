import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,

  images: {
    remotePatterns: [
      {
        hostname: 'plus.unsplash.com',
      },
    ],
  },
}

export default nextConfig
