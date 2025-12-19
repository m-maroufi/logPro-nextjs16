import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - About */}
      <section className="bg-linear-to-b from-background to-muted/50 py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid gap-12 items-center max-w-2xl mx-auto">
            {/* متن و توضیحات */}
            <div className="space-y-8 animate-fade-in-up animation-delay-200 flex flex-col items-center justify-center ">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  درباره <span className="text-primary">لاگ پرو</span>
                </h1>
                <p className="text-xl text-muted-foreground  animate-fade-in-up animation-delay-400">
                  لاگ پرو یک بلاگ شخصی در حوزه توسعه فرانت‌اند است که با هدف به
                  اشتراک گذاشتن تجربیات، نکات کاربردی و آموزش‌های مدرن در زمینه
                  React، Next.js، Tailwind CSS و سایر ابزارهای روز فرانت‌اند
                  ساخته شده.
                </p>
                <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-600">
                  اینجا سعی می‌کنم مطالب رو ساده، عملی و به زبان فارسی بنویسم تا
                  همه توسعه‌دهندگان ایرانی بتونن به راحتی ازشون استفاده کنن. از
                  آموزش‌های پایه تا تکنیک‌های پیشرفته — همه چیز رو پوشش می‌دم.
                </p>
              </div>

              <div className="flex gap-4 animate-fade-in-up animation-delay-800">
                <Button size="lg" asChild>
                  <Link href="/">بازگشت به خانه</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/blog">مشاهده مطالب</Link>
                </Button>
              </div>
            </div>

          
          </div>
        </div>
      </section>

      {/* بخش سازنده */}
      <section className="py-16 bg-background">
        <div className="container">
          <Card className="max-w-4xl mx-auto overflow-hidden hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                سازنده این وبلاگ
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                مهدی معروفی
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex justify-center">
                <Image
                  src="https://avatars.githubusercontent.com/u/167571727?v=4"
                  alt="مهدی معروفی"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-primary/20 shadow-lg"
                />
              </div>
              <p className="text-lg text-center text-muted-foreground leading-relaxed">
                سلام! من مهدی معروفی هستم، توسعه‌دهنده فرانت‌اند با علاقه زیاد
                به Next.js، React و طراحی سیستم‌های مدرن. این بلاگ رو ساختم تا
                تجربیاتم رو با جامعه فارسی‌زبان توسعه‌دهندگان به اشتراک بذارم و
                کمک کنم همه با هم پیشرفت کنیم.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="https://github.com/m-maroufi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    گیت‌هاب من
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="https://t.me/mehdidevlo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    تلگرام: @mehdidevlo
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="mailto:mehdimaroufi.it@gmail.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    ایمیل من
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* بخش مشارکت و سورس کد */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">مشارکت و استفاده از سورس کد</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              این پروژه کاملاً{" "}
              <span className="font-semibold text-primary">اوپن سورس</span> هست
              و سورس کدش روی گیت‌هاب در دسترسه. اگر دوست داشتی مشارکت کنی، باگ
              گزارش بدی، فیچر پیشنهاد بدی یا حتی از کدش برای پروژه خودت استفاده
              کنی — خیلی خوشحال می‌شم!
            </p>
            <div className="flex justify-center gap-6">
              <Button size="lg" asChild>
                <Link
                  href="https://github.com/m-maroufi/logPro-nextjs16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  مشاهده سورس کد در گیت‌هاب
                </Link>
              </Button>
            </div>
            <p className="text-muted-foreground">
              برای هر گونه سوال، پیشنهاد یا همکاری می‌تونی از راه‌های بالا با من
              در ارتباط باشی.
            </p>
          </div>
        </div>
      </section>

      {/* Footer ساده (اختیاری - اگر هدر داری، فوتر هم می‌تونی اینجا تکرار کنی) */}
      <footer className="bg-muted py-8 mt-auto">
        <div className="container text-center text-muted-foreground">
          <p>&copy; ۱۴۰۴ مهدی معروفی — لاگ پرو. همه حقوق محفوظ است.</p>
        </div>
      </footer>
    </div>
  );
}
