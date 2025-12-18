import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";

// لیست trustedOrigins رو به صورت دستی و کامل بنویس
// چون توی محیط Convex متغیرهای Vercel مثل VERCEL_URL در دسترس نیستن
const trustedOrigins = [
  "https://hip-porpoise-533.convex.site", // دامنه Convex (همیشه هست)
  "https://log-pro-nextjs16.vercel.app", // دامنه اصلی Vercel — مهم!
  "http://localhost:3000", // برای توسعه محلی
  // اگر بعداً دامنه سفارشی اضافه کردی، اینجا هم اضافه کن
]; // as const اختیاریه اما خوبه

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  return betterAuth({
    logger: {
      disabled: optionsOnly,
    },
    // baseURL رو هم هوشمند نگه دار (این قبلاً فیکس شده بود)
    baseURL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.SITE_URL
        ? `https://${process.env.SITE_URL}`
        : "http://localhost:3000"),
    trustedOrigins,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [convex()],
  });
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
