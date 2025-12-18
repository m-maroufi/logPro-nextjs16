import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <Skeleton className="h-10 w-24 mb-6" />
      <Skeleton className="h-96 w-full rounded-xl mb-8" />
      <div className="space-y-6">
        <Skeleton className="h-14 w-3/4 mb-4" />
        <Skeleton className="h-48 w-full mb-2" />
        <Skeleton className="h-15 w-full mb-2" />
      </div>
    </div>
  );
}
