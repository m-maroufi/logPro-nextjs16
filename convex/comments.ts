import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCommentsByPostId = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();
    return data;
  },
});

export const createComment = mutation({
  args: {
    body: v.string(),
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("کاربر احراز هویت نشده لطفا لاگین کنید");
    }
    return await ctx.db.insert("comments", {
      postId: args.postId,
      body: args.body,
      authorId: user._id,
      authorName: user.name,
      authorEmail:user.email
    });
  },
});
