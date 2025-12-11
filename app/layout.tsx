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
  title: "لاگ پرو",
  description:
    "لاگ پرو - وبلاگ جامع برای برنامه نویسان حوزه فرانت اند و تکنولوژی های وب",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
