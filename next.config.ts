import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Profile-managemen',
  assetPrefix: '/Profile-managemen',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
