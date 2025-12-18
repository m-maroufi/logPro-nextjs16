"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { createBlogSchema } from "./schemas/blog";

export async function createBlogAction(data: z.infer<typeof createBlogSchema>) {
  try {
    const parsed = await createBlogSchema.safeParseAsync(data);
    if (!parsed.success) {
      throw new Error("خطای ارسال دیتای نامعتبر لطفا دیتای معتبر ارسال کنید.");
    }
    const token = await getToken();
    if (!token) {
      throw new Error("کاربر احراز هویت نشده لطفا دوباره وارید شوید.");
    }
    // generate image upload url
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token: token }
    );
    const uplaodResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });
    if (!uplaodResult.ok) {
      return {
        error: "خطا در آپلود تصویر",
      };
    }

    const { storageId } = await uplaodResult.json();
    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token: token }
    );
  } catch (error) {
    return {
      error: "خطا در ایجاد پست لطفا دوباره تلاش کنید.",
      messsage: error instanceof Error ? error.message : String(error),
    };
  }
  updateTag("blog-posts");
  updateTag("last-post");
  // revalidatePath("/blog");
  return redirect("/blog");
}
