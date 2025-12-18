import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const commentSchema = z.object({
  body: z
    .string("متن کامنت نمیتواند خالی باشد")
    .min(3, "حداقل 3 کارکتر بنویسید"),
  postId: z.custom<Id<"posts">>(
    (val) => typeof val === "string" && val.length > 0,
    {
      message: "شناسه پست معتبر نیست",
    }
  ),
});
