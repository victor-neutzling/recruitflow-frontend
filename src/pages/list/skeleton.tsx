import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
  return (
    <div className="h-full w-full mt-16 flex justify-center">
      <div className="max-w-350 w-full h-full p-4 mx-16 gap-4 flex flex-col bg-surface shadow-md">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-full border rounded-2xl flex flex-col min-h-24 shadow animate-pulse"
          >
            <div className="w-full py-2 px-4 flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex width-full px-4 py-3 items-center border-t justify-between"
              >
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
