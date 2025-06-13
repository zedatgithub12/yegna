import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ui-avatars.com",
        protocol: "https",
      },
      {
        hostname: "lembosa-crm.amanueld.info",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
