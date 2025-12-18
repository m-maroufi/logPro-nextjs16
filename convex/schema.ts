import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  }),
  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.string(),
    authorName: v.string(),
    body: v.string(),
    authorEmail: v.string(),
  }),
});
