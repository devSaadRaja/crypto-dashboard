import { Suspense } from "react";
import NewsHeadlines from "@/components/NewsHeadlines";
import { Loader2 } from "lucide-react";
import MarketTicker from "@/components/MarketTicker";

export default function NewsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <>
      <MarketTicker />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#ECECEC] mb-6 font-inter">
          Crypto News
        </h1>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#00FFAB]" />
            </div>
          }
        >
          <NewsHeadlines initialCategory={searchParams.category} />
        </Suspense>
      </div>
    </>
  );
}
