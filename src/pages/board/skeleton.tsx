import { Skeleton } from "@/components/ui/skeleton";

export default function BoardSkeleton() {
  return (
    <div className="w-full h-full flex justify-center gap-4 mt-16 pt-4">
      <Skeleton className="w-[254px] h-[227px] rounded-2xl" />
      <Skeleton className="w-[254px] h-[333px] rounded-2xl" />
      <Skeleton className="w-[254px] h-[333px] rounded-2xl" />
      <Skeleton className="w-[254px] h-[153px] rounded-2xl" />
      <Skeleton className="w-[254px] h-[153px] rounded-2xl" />
      <Skeleton className="w-[254px] h-[153px] rounded-2xl" />
    </div>
  );
}
