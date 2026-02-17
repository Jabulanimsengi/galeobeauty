



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
  async redirects() {
    return [
      // === SEO URL CONSOLIDATION ===
      // All /services URLs redirect to /prices equivalents

      // 1. /services hub → /prices
      {
        source: '/services',
        destination: '/prices',
        permanent: true,
      },
      // 2. /services/[category] → /prices/[category]
      {
        source: '/services/:category',
        destination: '/prices/:category',
        permanent: true,
      },
      // 3. /services/[category]/[service] → /prices/[category]/[service]
      {
        source: '/services/:category/:service',
        destination: '/prices/:category/:service',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
