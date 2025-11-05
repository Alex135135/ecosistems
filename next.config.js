/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/ecosistems' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecosistems/' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig