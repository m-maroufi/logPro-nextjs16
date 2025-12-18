import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CommnetSection from "@/components/web/comment-section";
import { NotFoundPost } from "@/components/web/notfound-post";
import { PostPresence } from "@/components/web/post-presence";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { convertDateToShamsi } from "@/lib/utils";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { Forward } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
interface IPostDetail {
  params: Promise<{ id: Id<"posts"> }>;
}

export async function generateMetadata({
  params,
}: IPostDetail): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getPostById, { id: id });
  if (!post) {
    return {
      title: "صفحه مورد نظر یافت نشد! - 404",
    };
  }
  return {
    title: post.title,
    description: post.body,
  };
}

export default async function PostDetail({ params }: IPostDetail) {
  const { id } = await params;
  const token = await getToken();
  const [post, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { id: id }),
    await preloadQuery(api.comments.getCommentsByPostId, {
      postId: id,
    }),
    await fetchQuery(api.presence.getUserId, {}, { token: token }),
  ]);
  if (!userId) {
    redirect("/auth/login");
  }
  if (!post) {
    return <NotFoundPost />;
  }
  console.log(post);
  return (
    <section className="max-w-4xl mx-auto container animate-in fade-in duration-500 relative mt-20 flex! flex-col">
      <Link
        href={"/blog"}
        className={buttonVariants({ variant: "ghost", className: "w-fit" })}
      >
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
        {userId && <PostPresence roomId={post._id} userId={userId} />}

        <Separator />
        <div className="content tracking-wider leading-loose text-base md:text-lg  text-foreground/90  not-first:mt-6">
          {post.body}
        </div>

        <Separator className="my-8" />
        <CommnetSection preloadedComments={preloadedComments} />
      </main>
    </section>
  );
}
