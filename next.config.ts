import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: (process.env.DIST_DIR || '.next').trim(),
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactCompiler: true,
};
console.log('Using distDir: ["' + nextConfig.distDir + '"] Length:', nextConfig.distDir?.length);

export default nextConfig;
