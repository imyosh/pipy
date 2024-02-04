import { apiGetUserRecentPositions } from "@/lib/api";
import Position from "@/components/Position";
import { Skeleton } from "@/components/ui/skeleton";

export default async function RecentPositions() {
  const positions = await apiGetUserRecentPositions();

  return (
    <section className="flex flex-grow flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1>Posistions</h1>
      </div>
      <div className="flex-grow flex relative flex-col gap-4">
        {positions?.length !== 0 ? (
          positions?.map((position) => (
            <Position key={position.id} position={position} />
          ))
        ) : (
          <p className="text-gray-400 -translate-x-1/2 -translate-y-1/2 absolute text-sm top-1/2 left-1/2">
            Start adding positions!
          </p>
        )}
      </div>
    </section>
  );
}

RecentPositions.Skeleton = function RecentPositionsSkeleton() {
  return (
    <section className="flex flex-grow flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1>Posistions</h1>
      </div>
      <div className="flex-grow flex relative flex-col gap-4">
        <Skeleton className="h-[48px]" />
        <Skeleton className="h-[48px] delay-150" />
      </div>
    </section>
  );
};
