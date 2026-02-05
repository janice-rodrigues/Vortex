/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Contentstack Launch commonly hosts as static output.
  // This makes `next build` emit a fully static site in `out/`.
  output: 'export',
  trailingSlash: false
};

export default nextConfig;

