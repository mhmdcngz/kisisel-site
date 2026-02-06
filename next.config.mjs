/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScript hatalarını görmezden gel
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint hatalarını görmezden gel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;