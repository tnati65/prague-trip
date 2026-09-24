import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import CopyProtection from "@/components/CopyProtection";
import { BASE_PATH } from "@/lib/basePath";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "פראג למשפחה 2026 – המסלול שלנו",
  description: "תוכנית טיול דינמית ומפות ניווט ל-6 ימים",
  openGraph: {
    title: "פראג למשפחה 2026 – המסלול שלנו",
    description: "תוכנית טיול דינמית ומפות ניווט ל-6 ימים",
    type: "website",
    locale: "he_IL",
  },
  // Next.js לא מוסיף אוטומטית את ה-basePath לכתובות manifest/icons (בניגוד ל-<Image>/<Link>) —
  // נבדק אמפירית: עם / בלבד הקישור התפרסם כ-/manifest.json בלי /prague-trip. לכן הקידומת מוזנת ידנית.
  manifest: `/${BASE_PATH}/manifest.json`,
  icons: {
    icon: [
      {
        url: `/${BASE_PATH}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: `/${BASE_PATH}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: `/${BASE_PATH}/icons/apple-touch-icon.png`, sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "פראג 2026",
  },
};

export const viewport: Viewport = {
  themeColor: "#4c0519",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <CopyProtection />
        {children}
      </body>
    </html>
  );
}
