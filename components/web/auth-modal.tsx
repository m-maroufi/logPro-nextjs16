// components/AuthModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";

export default function AuthModal() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md animate-fade-in-up">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            خوش آمدید به لاگ پرو 👋
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-4 leading-relaxed">
            برای دسترسی کامل به مطالب بلاگ، مشاهده پست‌ها و مشارکت در بحث‌ها،
            لطفاً ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Button size="lg" className="w-full" asChild>
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              ورود به حساب
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full" asChild>
            <Link href="/auth/sign-up" onClick={() => setOpen(false)}>
              ثبت‌نام
            </Link>
          </Button>
        </div>

        {/* دکمه "بعداً" برای بستن modal بدون لاگین */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            بعداً، فقط مرور کنم
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          بعد از ورود یا بستن این پیام، می‌تونی سایت رو مرور کنی.
        </p>
      </DialogContent>
    </Dialog>
  );
}
