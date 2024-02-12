import PositionCalculator from "@/components/PositionCalculator";
import { apiGetUserPortfolio } from "@/lib/api";

export default async function Positions() {
  const portfolio = await apiGetUserPortfolio();

  return (
    <main className="flex overflow-hidden flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1>Posistion Calculator</h1>
      </div>

      <PositionCalculator
        capital={portfolio.invistor1 + portfolio.invistor2 + portfolio.mine}
      />
    </main>
  );
}
