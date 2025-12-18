import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
      },
      {
        protocol: "https",
        hostname: "quiet-raccoon-409.convex.cloud",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "files.virgool.io",
      },
      // avatar.vercel.sh
      // new URL("https://picsum.photos/**")
    ],
    // remotePatterns: [new URL("https://images.unsplash.com/***")],
  },
};

export default nextConfig;
