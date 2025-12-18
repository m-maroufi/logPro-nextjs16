import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Github, MoveLeft } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const featuredCategories = [
  { name: "React", description: "مقالات مرتبط با React و اکوسیستم آن." },
  {
    name: "CSS & Styling",
    description: "راهنماهای استایل‌دهی مدرن با CSS و ابزارهای مرتبط.",
  },
  {
    name: "JavaScript",
    description: "نکات پیشرفته جاوااسکریپت برای توسعه‌دهندگان فرانت‌اند.",
  },
  { name: "Performance", description: "بهینه‌سازی عملکرد وب‌اپلیکیشن‌ها." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section با انیمیشن‌های جذاب */}
      <section className="bg-linear-to-b from-background to-muted/50 py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-6 animate-fade-in-up animation-delay-200">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  لاگ پرو <br />
                  <span className="text-primary">
                    جایی برای یادگیری و الهام‌گیری
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg animate-fade-in-up animation-delay-400">
                  آخرین اخبار، ترفندها و راهنماهای توسعه فرانت‌اند. از React و
                  Tailwind تا بهترین شیوه‌های UI/UX.
                </p>
              </div>

              <div className="flex gap-4 animate-fade-in-up animation-delay-600">
                <Button size="lg" asChild className="animate-slide-in-left">
                  <Link href="/blog">مشاهده مطالب</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="animate-slide-in-right"
                >
                  اشتراک خبرنامه
                </Button>
              </div>
            </div>

            {/* تصویر هیرو با افکت‌های انیمیشنی */}
            <div className="relative hidden md:block animate-fade-in animation-delay-800">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-slow opacity-50" />
              <Image
                src="https://images-www.contentful.com/fo9twyrwpveg/6KGQmbqHHD6tNy0lIh7gCm/7dba34d910ed09b5d1e3bff38ac44423/-blog-_Tailwind_CSS_React.png"
                alt="فرانت‌اند هیرو - توسعه مدرن با React و Tailwind CSS"
                width={800}
                height={450}
                className="rounded-2xl shadow-2xl relative z-10 transform transition-transform duration-1000 hover:scale-105"
                priority
              />
              <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-primary/10 rounded-full animate-float" />
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-ring/20 rounded-full animate-float animation-delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}

      <LastPostList />

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">دسته‌بندی‌ها</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/categories/${category.name.toLowerCase()}`}>
                      مشاهده
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">اشتراک در خبرنامه</h2>
            <p className="text-xl text-muted-foreground">
              از آخرین مطالب و به‌روزرسانی‌های فرانت‌اند مطلع شوید.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">
                  ایمیل
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>
              <Button type="submit" size="lg">
                اشتراک
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-auto">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            &copy; ۱۴۰۴ مهدی معروفی. همه حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/m-maroufi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-8" />
                <span className="sr-only">گیت‌هاب</span>
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
async function LastPostList() {
  "use cache";
  cacheLife("hours");
  cacheTag("last-post");
  const lastPost = await fetchQuery(api.posts.getLatestPosts);
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">جدیدترین مطالب</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {lastPost?.map((post) => (
            <article key={post._id} className="h-full">
              <Card className="pt-0 overflow-hidden h-full flex flex-col">
                <CardHeader className="h-48 w-full relative overflow-hidden p-0">
                  <Image
                    src={
                      post.imageUrl ??
                      "https://picsum.photos/id/20/300/192.webp"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                    preload
                  />
                </CardHeader>

                <CardContent className="flex-1">
                  <Link href={`/blog/${post._id}`}>
                    <h2 className="text-lg hover:text-primary line-clamp-1 min-h-7">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="mt-2 text-muted-foreground line-clamp-3 min-h-[72px]">
                    {post.body}
                  </p>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Link
                    href={`/blog/${post._id}`}
                    className={`${buttonVariants({
                      variant: "default",
                    })} w-full`}
                  >
                    ادامه مطلب
                    <MoveLeft />
                  </Link>
                </CardFooter>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
