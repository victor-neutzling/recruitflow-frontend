import { Skeleton } from "@/components/ui/skeleton";

export function ViewModeSkeleton() {
  return (
    <>
      <div className="pl-6 pr-2.5 mt-21 h-16 max-w-284 w-full bg-surface rounded-xl border shadow flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>
      </div>

      <div className="w-full h-full flex justify-center gap-4">
        <div className="flex flex-col gap-4 max-w-200 w-full bg-surface border shadow pt-16 pb-24 px-16 ml-16 mt-4 mb-8 rounded-xl">
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-5 w-80" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-3 items-end">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="w-full border-b my-4" />

          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-20" />
            <div className="flex w-full gap-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-16 rounded-md" />
            </div>
          </div>
        </div>

        <div className="mt-4 mb-8 mr-16 flex flex-col gap-4">
          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-xl p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
            <div className="w-full border-b my-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
            <div className="w-full border-b my-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </>
  );
}

export function EditModeSkeleton() {
  return (
    <div className="flex flex-col items-center px-16 w-full">
      <div className="pl-6 pr-2.5 mt-21 h-16 max-w-284 w-full bg-surface rounded-xl border shadow flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>

      <div className="w-full h-full flex justify-center gap-4">
        <div className="flex flex-col gap-6 max-w-200 w-full bg-surface border shadow pt-16 pb-24 px-16 mt-4 mb-8 rounded-xl">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-72 rounded-md" />
            </div>
          </div>

          <div className="w-full border-b my-4" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-1/2 rounded-md" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-20" />
            <div className="flex w-full gap-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-16 rounded-md" />
            </div>
          </div>
        </div>

        <div className="mt-4 mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-xl p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
            <div className="w-full border-b my-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
            <div className="w-full border-b my-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
