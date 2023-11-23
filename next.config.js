/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_URL: process.env.API_URL,
    SECRET_PASS: process.env.SECRET_PASS,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
