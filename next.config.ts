import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/ecosistems' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecosistems/' : '',
  images: {
    unoptimized: true
  },

  skipTrailingSlashRedirect: true,
};

export default nextConfig;