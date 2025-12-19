import z from "zod";
const MAX_FILE_SIZE = 900 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
export const createBlogSchema = z.object({
  title: z
    .string("عنوان بین 10 تا 200 کارکتر مجاز است")
    .min(10, "عنوان بین 10 تا 200 کارکتر مجاز است")
    .max(150, "عنوان بین 10 تا 200 کارکتر مجاز است"),
  content: z
    .string("متن پست حداقل 50 کارکتر")
    .min(50, "متن پست حداقل 50 کارکتر"),
  image: z.instanceof(File).superRefine((file, ctx) => {
    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: "custom", // این رو اضافه کردیم
        message: "حداکثر حجم تصویر ۹۰۰ کیلوبایت است",
      });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: "custom", // این هم اضافه شد
        message: "فرمت تصویر مجاز نیست",
      });
    }
  }),
});
