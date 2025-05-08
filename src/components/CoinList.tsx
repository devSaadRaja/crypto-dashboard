import type { CryptoData } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";

interface CoinListProps {
  coins: CryptoData[];
  isLoading: boolean;
  type: "gainers" | "losers";
}

export default function CoinList({ coins, isLoading, type }: CoinListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border-b border-[#2C3E50]"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (coins.length === 0) {
    return (
      <div className="py-8 text-center text-[#ECECEC]/70">
        {type === "gainers"
          ? "No gainers found in the current market"
          : "No losers found in the current market"}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {coins.map((coin) => (
        <Link
          href={`/coins/${coin.id}`}
          key={coin.id}
          className="flex items-center justify-between p-3 rounded-md hover:bg-[#2C3E50]/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-[#2C3E50]">
              <Image
                src={
                  coin.image ||
                  `/placeholder.svg?height=32&width=32&query=${coin.name} logo`
                }
                alt={coin.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-[#ECECEC] font-inter">
                {coin.name}
              </h3>
              <p className="text-sm text-[#ECECEC]/70 font-jetbrains-mono">
                {coin.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-jetbrains-mono font-medium text-sm">
              $
              {coin.currentPrice.toLocaleString(undefined, {
                minimumFractionDigits: coin.currentPrice < 1 ? 4 : 2,
                maximumFractionDigits: coin.currentPrice < 1 ? 6 : 2,
              })}
            </span>
            <div
              className={`flex items-center ml-2 ${
                coin.priceChangePercentage > 0
                  ? "text-[#00FFAB]"
                  : "text-red-500"
              }`}
            >
              {coin.priceChangePercentage > 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span className="font-jetbrains-mono font-medium">
                {Math.abs(coin.priceChangePercentage).toFixed(2)}%
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
