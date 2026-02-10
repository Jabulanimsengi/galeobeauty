import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Compiler for faster builds (can re-enable later)
  // reactCompiler: true,

  // Skip TypeScript errors during build — run `tsc --noEmit` separately for type checking
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize build performance
  experimental: {
    // Reduce memory usage during build
    webpackMemoryOptimizations: true,
  },

  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
        pathname: "/**",
      },
    ],
  },

  // Reduce build output noise
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
