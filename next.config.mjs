/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Required for Contentstack Launch on-demand cache revalidation
  generateBuildId: async () => {
    return process.env.CONTENTSTACK_LAUNCH_DEPLOYMENT_UID ?? 'vortex-build';
  },
};

export default nextConfig;

