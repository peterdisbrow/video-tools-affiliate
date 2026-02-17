/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/comparisons', destination: '/blog', permanent: true },
      { source: '/comparisons/:path*', destination: '/blog', permanent: true },
      { source: '/products', destination: '/gear', permanent: true },
      { source: '/guides', destination: '/gear', permanent: true },
      { source: '/guides/:path*', destination: '/gear', permanent: true },
    ];
  },
};

module.exports = nextConfig;
