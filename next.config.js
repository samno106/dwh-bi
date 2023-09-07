/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL,
    SECRET_PASS: process.env.SECRET_PASS,
  },
};

module.exports = nextConfig;
