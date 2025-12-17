import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NotFoundPost } from "@/components/web/notfound-post";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convertDateToShamsi } from "@/lib/utils";
import { fetchQuery } from "convex/nextjs";
import { Forward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface IPostDetail {
  params: Promise<{ id: Id<"posts"> }>;
}
export default async function PostDetail({ params }: IPostDetail) {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getPostById, { id: id });
  if (!post) {
    return <NotFoundPost />;
  }
  console.log(post);
  return (
    <section className="max-w-4xl mx-auto container animate-in fade-in duration-500 relative mt-20">
      <Link href={"/blog"} className={buttonVariants({ variant: "ghost" })}>
        <Forward />
        بازگشت به وبلاگ ها
      </Link>
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm mt-4">
        <Image
          src={post.imageUrl ?? "https://picsum.photos/id/20/300/192.webp"}
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <main className="space-y-4 flex flex-col w-full pb-10">
        <h1 className="text-right">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          تاریخ انتشار : {convertDateToShamsi(post._creationTime)}
        </p>
        <Separator />
        <div className="content tracking-wider leading-loose text-base md:text-lg  text-foreground/90  not-first:mt-6">
          {post.body}
        </div>
        <Separator className="my-8"/>
      </main>
    </section>
  );
}
