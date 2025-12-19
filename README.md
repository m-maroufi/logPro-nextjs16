# Log Pro (لاگ پرو)

![Next.js](https://img.shields.io/badge/Next.js-16-blue?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3.3-blue?style=for-the-badge)
![Convex](https://img.shields.io/badge/Convex-Backend-purple?style=for-the-badge)
![Better Auth](https://img.shields.io/badge/Better_Auth-Auth%20System-green?style=for-the-badge)
![PNPM](https://img.shields.io/badge/PNPM-v8-orange?style=for-the-badge)

**سایت رسمی:** [https://log-pro-nextjs16.vercel.app/](https://log-pro-nextjs16.vercel.app/)
**ریپوزیتوری:** [GitHub](https://github.com/m-maroufi/logPro-nextjs16)

**Log Pro** یک وبلاگ تخصصی در حوزه **فرانت‌اند و طراحی وب** است که مقالات عمیق و به‌روز درباره React، Next.js، TypeScript، Tailwind CSS و دیگر تکنولوژی‌های وب را ارائه می‌دهد.

---

## 🚀 ویژگی‌ها (Features)

| فیچر                     | توضیحات                                                        |
| ------------------------ | -------------------------------------------------------------- |
| احراز هویت کامل کاربران  | شامل ثبت‌نام، ورود، مدیریت کاربران با **Better Auth**          |
| ایجاد وبلاگ جدید         | امکان ایجاد و انتشار پست‌های جدید                              |
| Next.js 16               | بهره‌گیری از Server/Client Components و caching برای سرعت بهتر |
| Convex                   | Backend و مدیریت دیتابیس serverless                            |
| Tailwind CSS & Shadcn/ui | طراحی واکنش‌گرا و مدرن                                         |
| مدیریت state و UI        | عملیات سریع و بهینه با Next.js 16                              |

---

## 🛠 تکنولوژی‌ها و پکیج‌ها

- **Next.js 16**
- **React**
- **TypeScript**
- **Tailwind CSS & Shadcn/ui**
- **Convex**
- **Better Auth**
- **PNPM**

---

## ⚡ نصب و اجرا

### 1️⃣ نصب وابستگی‌ها

```bash
pnpm install
```

### 2️⃣ راه‌اندازی Convex (Backend)

```bash
pnpm dlx convex dev
```

- مطمئن شوید که متغیرهای محیطی (`.env`) درست ست شده‌اند (مقادیر مثال زیر را جایگزین مقادیر اصلی کنید):

```env
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BETTER_AUTH_SECRET=YOUR_SECRET_KEY
```

### 3️⃣ اجرای Next.js (Frontend)

```bash
pnpm dev
```

- دسترسی به سایت روی: [http://localhost:3000](http://localhost:3000)

---

## 📂 پوشه‌بندی پروژه

```
.
├─ app/                # Next.js App Router
├─ components/         # کامپوننت‌های UI و Provider ها
├─ lib/                # توابع کمکی و auth
├─ _generated/         # فایل‌های خودکار تولید شده توسط Convex
├─ public/             # فایل‌های استاتیک
├─ styles/             # CSS و Tailwind
├─ package.json
└─ README.md
```

---

## 💡 نکات

- پروژه از قابلیت‌های **Server Components و Client Components** Next.js 16 بهره می‌برد تا عملیات رندر و fetch داده‌ها بهینه شود.
- تمامی کامپوننت‌ها و استایل‌ها **واکنش‌گرا** هستند و برای موبایل و دسکتاپ بهینه شده‌اند.
- احراز هویت و مدیریت کاربران کاملاً امن و با استفاده از Better Auth انجام شده است.

---

## 🔗 دمو آنلاین

[https://log-pro-nextjs16.vercel.app/](https://log-pro-nextjs16.vercel.app/)

---

## ⭐ پیشنهادات

- اضافه کردن **پشتیبانی از چند کاربر و رول‌های مختلف** برای مدیریت بهتر وبلاگ‌ها
