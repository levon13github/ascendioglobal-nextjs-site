// ascendioglobal-nextjs-site/app/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is generally recommended for Next.js App Router on Netlify
  // It creates a standalone folder with all necessary files for serverless deployment.
  output: 'standalone',

  // Keep this if you have chosen to use the `src` directory
  experimental: {
    appDir: true,
  },

  // Add any other configurations here if needed in the future
};

module.exports = nextConfig;