import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: (process.env.VERCEL_PROJECT_NAME === 'saas-platform-superadmin')
    ? 'build-main'
    : (process.env.VERCEL_PROJECT_NAME === 'saas-platform-admindashboard')
      ? 'build-admin'
      : (process.env.DIST_DIR || '.next'),
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  reactCompiler: true,
};
console.log('Using distDir: ["' + nextConfig.distDir + '"] Length:', nextConfig.distDir?.length);

export default nextConfig;
