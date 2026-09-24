import type { NextConfig } from "next";
import withPWA, { runtimeCaching } from "@ducanh2912/next-pwa";
import { BASE_PATH } from "./src/lib/basePath";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${BASE_PATH}`,
  images: {
    // next/image optimization needs a server — unavailable under static export.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  disable: process.env.NODE_ENV === "development",
  // ברירת המחדל precacheAndRoute מכסה רק JS/CSS — בלי runtimeCaching, טעינה
  // מחדש של דף (למשל אחרי סגירת האפליקציה) בזמן שאין רשת תיכשל עוד לפני
  // שקוד ה-JS המטמון בכלל רץ. NetworkFirst על ה-HTML פותר את זה: טרי כשיש
  // רשת, ומהמטמון כשאין (אחרי ביקור ראשון מחובר).
  workboxOptions: {
    runtimeCaching,
  },
})(nextConfig);
