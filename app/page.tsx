import PortfolioCards, {
  PortfolioCardsSkeleton,
} from "@/components/PortfolioCards";
import RecentPositions from "@/components/RecentPositions";
import { Suspense } from "react";
import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getUserSession();
  if (!session) redirect("/login");

  return (
    <main className="flex flex-grow flex-col gap-6">
      <Suspense fallback={<PortfolioCardsSkeleton />}>
        <PortfolioCards session={session} />
      </Suspense>
      <div className="mx-auto h-[1px] w-1/2 bg-secondary" />
      <Suspense fallback={<RecentPositions.Skeleton />}>
        <RecentPositions />
      </Suspense>
    </main>
  );
}
