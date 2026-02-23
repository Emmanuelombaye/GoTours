/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [320, 640, 1280, 1920],
    minimumCacheTTL: 31536000
  }
};

module.exports = nextConfig;
