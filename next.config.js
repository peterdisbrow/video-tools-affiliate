/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/comparisons', destination: '/blog', permanent: true },
      { source: '/comparisons/:path*', destination: '/blog', permanent: true },
    ];
  },
};

module.exports = nextConfig;
