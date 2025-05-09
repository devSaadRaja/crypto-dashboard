import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PortfolioSummary from "@/components/PortfolioSummary";
import PortfolioAssets from "@/components/PortfolioAssets";
import PortfolioChart from "@/components/PortfolioChart";
import PortfolioPerformance from "@/components/PortfolioPerformance";
import PortfolioAllocation from "@/components/PortfolioAllocation";

export default function PortfolioPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#ECECEC] mb-6 font-inter">
        Portfolio
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Suspense
          fallback={<Skeleton className="h-[180px] w-full bg-[#2C3E50]" />}
        >
          <PortfolioSummary />
        </Suspense>

        <Suspense
          fallback={<Skeleton className="h-[180px] w-full bg-[#2C3E50]" />}
        >
          <PortfolioPerformance />
        </Suspense>

        <Suspense
          fallback={<Skeleton className="h-[180px] w-full bg-[#2C3E50]" />}
        >
          <PortfolioAllocation />
        </Suspense>
      </div>

      <div className="mb-8">
        <Suspense
          fallback={<Skeleton className="h-[400px] w-full bg-[#2C3E50]" />}
        >
          <PortfolioChart />
        </Suspense>
      </div>

      <div>
        <Suspense
          fallback={<Skeleton className="h-[400px] w-full bg-[#2C3E50]" />}
        >
          <PortfolioAssets />
        </Suspense>
      </div>
    </main>
  );
}
