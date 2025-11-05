/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/ecosistems' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ecosistems/' : '',
  images: {
    unoptimized: true
  },
  // Добавляем для корректной работы с GitHub Pages
  env: {
    CUSTOM_BASE_PATH: process.env.NODE_ENV === 'production' ? '/ecosistems' : ''
  }
}

module.exports = nextConfig