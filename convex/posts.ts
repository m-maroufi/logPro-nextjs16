import { ConvexError, v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("کاربر احراز هویت نشده لطفا لاگین کنید");
    }
    const blogArticle = await ctx.db.insert("posts", {
      body: args.body,
      title: args.title,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;
        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});
export const getLatestPosts = query({
  args: {},
  handler: async (ctx) => {
    // فقط ۳ پست آخر رو بر اساس تاریخ یا id (معمولاً desc یعنی جدیدترین اول)
    const posts = await ctx.db
      .query("posts")
      .order("desc") // فرض می‌کنیم فیلد _creationTime یا یک فیلد تاریخ داری که مرتب‌سازی درسته
      .take(3); // فقط ۳ تا بگیر

    // برای هر پست، اگر تصویر داشته باشه URL رو resolve کن
    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("کاربر احراز هویت نشده لطفا لاگین کنید");
    }
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return uploadUrl;
  },
});

export const getPostById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) {
      return null;
    }
    const resolvedImageUrl =
      post?.imageStorageId !== undefined
        ? await ctx.storage.getUrl(post.imageStorageId)
        : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface ISearchResultTypes {
  _id: string;
  title: string;
  body: string;
}

export const searchPosts = query({
  args: { trem: v.string(), limit: v.number() },
  handler: async (ctx, args) => {
    const limit = args.limit;
    const results: Array<ISearchResultTypes> = [];
    const seen = new Set();

    const pushDoc = async (docs: Array<Doc<"posts">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;
        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
        });
        if (results.length > limit) break;
      }
    };

    const titleMetches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.trem))
      .take(limit);
    await pushDoc(titleMetches);

    if (results.length < limit) {
      const bodyMetches = await ctx.db
        .query("posts")
        .withSearchIndex("search_body", (q) => q.search("body", args.trem))
        .take(limit);
      await pushDoc(bodyMetches);
    }

    return results;
  },
});
