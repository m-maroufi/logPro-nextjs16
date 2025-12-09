import { buttonVariants } from "@/components/ui/button";
import { Forward } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="absolute top-4 right-4">
        <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
          <Forward />
          بازگشت
        </Link>
      </div>
      {children}
    </section>
  );
}
