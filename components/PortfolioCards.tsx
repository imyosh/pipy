import ValueShare from "./ValueShare";
import { Skeleton } from "@/components/ui/skeleton";
import { apiGetUserPortfolio } from "@/lib/api";
import { User } from "next-auth";

export default async function PortfolioCards({ session }: { session: User }) {
  const portfolio = await apiGetUserPortfolio();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4 py-8">
        <h2 className="text-sm font-bold text-secondary-foreground">
          PORTFOLIO
        </h2>
        <p className="text-5xl">
          <span className="text-2xl">$</span>
          {((portfolio?.mine || 0) + (portfolio?.invistor1 || 0)).toFixed(1)}
        </p>
      </div>
      {/* <div className='w-full h-28 border-t-2 border-primary bg-gradient-to-b from-[#1B2943] to-background'></div> */}
      <ValueShare
        share={{ title: "mine", value: portfolio?.mine || 0, handler: "mine" }}
      />

      <div className="flex w-full gap-2">
        <ValueShare
          share={{
            title: "invistor 1",
            value: portfolio?.invistor1 || 0,
            handler: "invistor1",
            recentInvistorBaseBalance: portfolio["invistor1-basebalance"],
          }}
        />
        <ValueShare
          share={{
            title: "invistor 2",
            value: portfolio?.invistor2 || 0,
            handler: "invistor2",
            recentInvistorBaseBalance: portfolio["invistor2-basebalance"],
          }}
        />
      </div>
    </div>
  );
}

export function PortfolioCardsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4 py-8">
        <h2 className="text-sm font-bold text-secondary-foreground">
          PORTFOLIO
        </h2>
        <Skeleton className=" h-[49px] w-[200px]" />
      </div>
      {/* <div className='w-full h-28 border-t-2 border-primary bg-gradient-to-b from-[#1B2943] to-background'></div> */}
      <div className="flex w-full gap-2">
        <Skeleton className="h-[90px] flex-grow rounded-xl  p-4" />
        <Skeleton className="h-[90px] flex-grow rounded-xl  p-4 delay-150" />
      </div>
    </div>
  );
}
