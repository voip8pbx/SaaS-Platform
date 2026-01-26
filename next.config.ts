import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: process.env.DIST_DIR || '.next',
  reactCompiler: true,
};

export default nextConfig;
