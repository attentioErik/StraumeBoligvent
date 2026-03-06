import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Silence the monorepo workspace-root warning
  outputFileTracingRoot: path.join(__dirname, '../'),

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
}

export default nextConfig
