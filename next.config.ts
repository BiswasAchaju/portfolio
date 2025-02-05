import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  reactStrictMode: true,
  images: {
    domains: ['logo.clearbit.com', 'i.ibb.co', 'www.nepaltechinnov.com'], // Add this line
  },
};

export default nextConfig;
