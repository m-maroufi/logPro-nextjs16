import z from "zod";

export const createBlogSchema = z.object({
  title: z
    .string("عنوان بین 10 تا 200 کارکتر مجاز است")
    .min(10, "عنوان بین 10 تا 200 کارکتر مجاز است")
    .max(150, "عنوان بین 10 تا 200 کارکتر مجاز است"),
  content: z
    .string("متن پست حداقل 50 کارکتر")
    .min(50, "متن پست حداقل 50 کارکتر"),
});
