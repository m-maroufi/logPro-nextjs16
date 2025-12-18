import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";

// ساخت baseURL به صورت هوشمند و امن
const getBaseURL = () => {
  // اولویت ۱: اگر NEXT_PUBLIC_SITE_URL ست شده باشه (توصیه شده برای Vercel)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // اولویت ۲: اگر روی Vercel هستیم، از VERCEL_URL استفاده کن
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // اولویت ۳: لوکال
  return "http://localhost:3000";
};

const baseURL = getBaseURL();

// برای trustedOrigins هم همین منطق رو اعمال کن
const trustedOrigins = [
  process.env.CONVEX_SITE_URL || "", // Convex همیشه داره، اما برای اطمینان
  baseURL, // دامنه اصلی سایت (Vercel یا لوکال)
  "http://localhost:3000", // برای توسعه محلی
].filter(Boolean); // خالی‌ها رو حذف کن

// The component client
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  return betterAuth({
    logger: {
      disabled: optionsOnly,
    },
    baseURL, // حالا همیشه مقدار معتبر داره
    trustedOrigins, // لیست کامل و درست
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
