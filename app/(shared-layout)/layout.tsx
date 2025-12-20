import { Navbar } from "@/components/web/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-15rem)] bg-zinc-50 dark:bg-black">
        {children}
      </main>
    </>
  );
}
