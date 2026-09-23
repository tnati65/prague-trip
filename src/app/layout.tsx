import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
