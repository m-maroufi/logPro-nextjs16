import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-static";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
export const revalidate = 30;
// false | 0 | number

export default async function BlogPage() {
  return (
    <section className="py-24 container mx-auto grid grid-cols-1 space-y-6">
      <div className="text-center">
        <h1>وبلاگ های ما</h1>
        <p className="text-xl text-muted-foreground">
          بینش‌ها، افکار و روندهای تیم ما
        </p>
      </div>
      <div>
        <Suspense fallback={<SkeletonLoading />}>
          <LoadBlogList />
        </Suspense>
      </div>
    </section>
  );
}

async function LoadBlogList() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="mt-10  max-w-5xl gap-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
      {data?.map((post) => (
        <article key={post._id} className="h-full">
          <Card className="pt-0 overflow-hidden h-full flex flex-col">
            <CardHeader className="h-48 w-full relative overflow-hidden p-0">
              <Image
                src={
                  post.imageUrl ?? "https://picsum.photos/id/20/300/192.webp"
                }
                alt={post.title}
                fill
                className="object-cover"
                preload
              />
            </CardHeader>

            <CardContent className="flex-1">
              <Link href={`/blog/${post._id}`}>
                <h2 className="text-lg hover:text-primary line-clamp-1 min-h-[28px]">
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
                className={`${buttonVariants({ variant: "default" })} w-full`}
              >
                ادامه مطلب
                <MoveLeft />
              </Link>
            </CardFooter>
          </Card>
        </article>
      ))}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid max-w-5xl w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mx-auto mt-10">
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <div className="flex flex-col space-y-3 w-full" key={i}>
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </div>
  );
}
