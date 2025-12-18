import { ConvexClientProvider } from "@/components/provider/ConvexClientProvider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/web/theme-toggle";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmtn = Vazirmatn({
  variable: "--font-vazirmtn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "لاگ پرو | وبلاگ حرفه‌ای برنامه‌نویسان فرانت‌اند",
    template: "%s | لاگ پرو",
  },

  description:
    "لاگ پرو، وبلاگ جامع و تخصصی برای برنامه‌نویسان فرانت‌اند و علاقه‌مندان به تکنولوژی‌های وب. مقالات عمیق و به‌روز درباره React، Next.js، TypeScript، JavaScript مدرن، Tailwind CSS، UI/UX و بهترین پراکتیس‌های توسعه وب.",

  keywords: [
    "فرانت اند",
    "برنامه نویسی وب",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "وبلاگ برنامه نویسی",
    "آموزش فرانت اند",
    "تکنولوژی وب",
  ],

  authors: [{ name: "لاگ پرو" }],
  creator: "لاگ پرو",
  publisher: "لاگ پرو",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  /* =======================
     Open Graph (Telegram, FB, LinkedIn)
     ======================= */
  openGraph: {
    title: "لاگ پرو | وبلاگ حرفه‌ای فرانت‌اند",
    description:
      "مقالات تخصصی React، Next.js و تکنولوژی‌های مدرن وب. آموزش، نکات پیشرفته و بررسی ابزارهای توسعه برای برنامه‌نویسان حرفه‌ای.",
    // url: "https://logpro.ir", // حتماً دامنه نهایی
    siteName: "لاگ پرو",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Log Pro - Front-End Development Blog",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },

  /* =======================
     Twitter
     ======================= */
  twitter: {
    card: "summary_large_image",
    title: "لاگ پرو | وبلاگ حرفه‌ای برنامه‌نویسان فرانت‌اند",
    description:
      "آموزش‌ها و مقالات عمیق درباره React، Next.js، TypeScript و توسعه مدرن وب.",
    images: ["/og-image.jpg"],
    // creator: "@logpro_ir", // اگه نداشتی می‌تونی حذفش کنی
  },

  /* =======================
     Icons (دقیقاً مطابق فایل‌ها)
     ======================= */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  /* =======================
     SEO Robots
     ======================= */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // alternates: {
  //   canonical: "https://logpro.ir",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmtn.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <main className="min-h-[calc(100vh-3.75rem)]">{children}</main>
          </ConvexClientProvider>
          <div className="fixed bottom-4 left-4">
            <ThemeToggle />
          </div>
          <Toaster dir="rtl" closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
