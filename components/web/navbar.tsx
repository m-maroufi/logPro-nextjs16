import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background">
      <div className="container flex items-center gap-7 h-15 justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            لاگ <span className="text-primary rounded-xl">پرو</span>
          </h1>
        </Link>
        <nav className="flex items-center justify-between gap-5">
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            وبلاگ
          </Link>
          <Link
            href="/contact-us"
            className={buttonVariants({ variant: "ghost" })}
          >
            درباره ما
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          <Link href={"/login"} className={buttonVariants()}>
            ورود
          </Link>
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "secondary" })}
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </header>
  );
}
