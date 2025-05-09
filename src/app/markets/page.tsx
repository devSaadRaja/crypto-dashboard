import { Suspense } from "react";
import CryptoTable from "@/components/CryptoTable";
import MarketStats from "@/components/MarketStats";
import FilterBar from "@/components/FilterBar";
import { Skeleton } from "@/components/ui/skeleton";
import RefreshButton from "@/components/RefreshButton";
import { getCoins, getGlobalData } from "@/lib/crypto-actions";
import { FilterProvider } from "@/components/FilterContext";

export default async function MarketsPage() {
  // Fetch data server-side
  const coinsPromise = getCoins();
  const globalDataPromise = getGlobalData();

  // Wait for both promises to resolve
  const [coins, globalData] = await Promise.all([
    coinsPromise,
    globalDataPromise,
  ]);

  return (
    <main className="min-h-screen bg-[#1C1C1C] text-[#ECECEC]">
      <div className="container mx-auto space-y-6 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-inter">
            Cryptocurrency Markets
          </h1>
          <RefreshButton />
        </div>

        <Suspense fallback={<Skeleton className="h-24 w-full bg-[#2C3E50]" />}>
          <MarketStats globalData={globalData} />
        </Suspense>

        <FilterProvider>
          <Suspense
            fallback={<Skeleton className="h-12 w-full bg-[#2C3E50]" />}
          >
            <FilterBar />
          </Suspense>

          <Suspense
            fallback={
              <div className="space-y-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full bg-[#2C3E50]" />
                  ))}
              </div>
            }
          >
            <CryptoTable initialCoins={coins} />
          </Suspense>
        </FilterProvider>
      </div>
    </main>
  );
}
