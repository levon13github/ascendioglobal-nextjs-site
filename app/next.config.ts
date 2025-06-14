// ascendioglobal-nextjs-site/app/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Keep this for robust serverless bundling
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;