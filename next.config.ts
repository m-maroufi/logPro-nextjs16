import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
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
      {
        protocol: "https",
        hostname: "images-www.contentful.com",
      },
      {
        protocol: "https",
        hostname: "blog.logrocket.com",
      },
      {
        protocol: "https",
        hostname: "hip-porpoise-533.convex.cloud",
      },
      // avatar.vercel.sh
      //images-www.contentful.com blog.logrocket.com a.storyblok.com
      // new URL("https://picsum.photos/**")
    ],
    // remotePatterns: [new URL("https://images.unsplash.com/***")],
  },
};

export default nextConfig;
