import type { Metadata, Viewport } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "نظارات الفرنسي بلس | للبصريات والسمعيات - صنعاء",
    template: "%s | نظارات الفرنسي بلس",
  },
  description:
    "مركز نظارات الفرنسي بلس للبصريات والسمعيات في صنعاء - سعوان. فحص كمبيوتر دقيق، أحدث النظارات الطبية والشمسية، والعدسات السمعية. أناقة وإبداع .. رؤية بلا صداع.",
  keywords: [
    "نظارات الفرنسي بلس",
    "بصريات صنعاء",
    "نظارات صنعاء",
    "فحص نظر صنعاء",
    "نظارات سعوان",
    "سمعيات صنعاء",
    "عدسات لاصقة",
    "سماعات أذن طبية",
    "Al-Fransi Plus Optics",
  ],
  authors: [{ name: "نظارات الفرنسي بلس" }],
  creator: "نظارات الفرنسي بلس",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/brand/logo-mark.png",
  },
  openGraph: {
    title: "نظارات الفرنسي بلس | للبصريات والسمعيات - صنعاء",
    description: "أناقة وإبداع .. رؤية بلا صداع - أحدث النظارات الطبية والشمسية والخدمات السمعية متطورة.",
    siteName: "نظارات الفرنسي بلس",
    images: [
      {
        url: "/brand/logo-primary.png",
        width: 1200,
        height: 630,
        alt: "لوجو نظارات الفرنسي بلس للبصريات والسمعيات",
      },
    ],
    locale: "ar_YE",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#071a2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#F7FAFC] text-slate-800 antialiased selection:bg-[#F4C400] selection:text-[#071A2B]">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
