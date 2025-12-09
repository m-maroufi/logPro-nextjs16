import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string("نام نمیتواند خالی باشذ")
    .min(3, "حداقل 3 کارکتر")
    .max(20, "نام بین 3 تا 20 کارکتر باشد"),
  email: z.email({ message: "ایمیل نامعتبر است" }),
  password: z
    .string("کلمه عبور نمیتواند خالی باشد.")
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "ایمیل نامعتبر است" }),
  password: z.string("کلمه عبور نمیتواند خالی باشد."),
});
