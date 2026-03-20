/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Prevent ESLint/TypeScript from failing the build on Launch/CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Required for Contentstack Launch on-demand cache revalidation
  generateBuildId: async () => {
    return process.env.CONTENTSTACK_LAUNCH_DEPLOYMENT_UID ?? 'vortex-build';
  },
};

export default nextConfig;

