import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/Profile-managemen' : '',
  assetPrefix: isProd ? '/Profile-managemen' : '',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
