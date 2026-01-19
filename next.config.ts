import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "web.jne.gob.pe",
        pathname: "/radarelectoral/api/proxy/logo/**",
      },
    ],
  },
};

export default nextConfig;
