"use client";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import SearchInput from "./search-input";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-40">
      <div className="container flex items-center gap-7 h-15 justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold text-nowrap">
            لاگ <span className="text-primary rounded-xl">پرو</span>
          </h1>
        </Link>
        <nav className="flex items-center justify-between gap-5">
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            وبلاگ
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "ghost" })}>
            درباره ما
          </Link>
        </nav>
        <div className="hidden md:block">
          <SearchInput />
        </div>
        <div className="flex items-center gap-5">
          {isLoading ? (
            <Skeleton className="h-8 w-[100px] rounded-md" />
          ) : isAuthenticated ? (
            <Button
              onClick={() => {
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      toast.success("با موفقیت خارج شدید", {
                        duration: 3000,
                        position: "top-center",
                        richColors: true,
                        icon: "🥳",
                      });
                      router.push("/");
                    },
                    onError: () => {
                      toast.error("خطا در خروج", {
                        duration: 3000,
                        position: "top-center",
                        richColors: true,
                        icon: "😢",
                      });
                    },
                  },
                });
              }}
            >
              خروج
            </Button>
          ) : (
            <>
              {" "}
              <Link href={"/auth/login"} className={buttonVariants()}>
                ورود
              </Link>
              <Link
                href={"/auth/sign-up"}
                className={buttonVariants({ variant: "secondary" })}
              >
                ثبت نام
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
