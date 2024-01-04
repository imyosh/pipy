import { Skeleton } from "@/components/ui/skeleton";

export default async function Positions() {
  return (
    <main className="flex overflow-hidden flex-grow flex-col gap-6">
      <div className="flex min-h-[32px] items-center justify-between">
        <h1>Posistions</h1>
      </div>

      <div className="flex-grow">
        <div className="flex relative flex-col gap-4">
          <Skeleton className="h-[48px]" />
          <Skeleton className="h-[48px] delay-100" />
          <Skeleton className="h-[48px] delay-200" />
          <Skeleton className="h-[48px] delay-300" />
          <Skeleton className="h-[48px] delay-400" />
          <Skeleton className="h-[48px] delay-500" />
          <Skeleton className="h-[48px] delay-600" />
          <Skeleton className="h-[48px] delay-700" />
        </div>
      </div>
    </main>
  );
}
