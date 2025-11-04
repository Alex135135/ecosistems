import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/ecosistems',
  assetPrefix: '/ecosistems/',
  images: {
    unoptimized: true
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;