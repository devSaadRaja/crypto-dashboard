"use client";
import { ArrowDown, ArrowUp, DollarSign, Coins, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { GlobalData } from "@/lib/crypto-actions";

interface MarketStatsProps {
  globalData: GlobalData;
}

export default function MarketStats({ globalData }: MarketStatsProps) {
  const { data } = globalData;

  // Format large numbers
  const formatNumber = (num: number, digits = 2) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(digits)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(digits)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(digits)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(digits)}K`;
    return `$${num.toFixed(digits)}`;
  };

  // Extract data for display
  const marketCap = data.total_market_cap?.usd || 0;
  const volume = data.total_volume?.usd || 0;
  const btcDominance = data.market_cap_percentage?.btc || 0;
  const marketCapChange = data.market_cap_change_percentage_24h_usd || 0;
  const activeCoins = data.active_cryptocurrencies || 0;

  const stats = [
    {
      title: "Market Cap",
      value: formatNumber(marketCap),
      change: marketCapChange,
      icon: <DollarSign className="h-5 w-5 text-[#00FFAB]" />,
    },
    {
      title: "24h Volume",
      value: formatNumber(volume),
      change: volume ? (volume / marketCap) * 100 - 100 : 0, // Estimate change based on volume/market cap ratio
      icon: <BarChart3 className="h-5 w-5 text-[#00FFAB]" />,
    },
    {
      title: "BTC Dominance",
      value: `${btcDominance.toFixed(1)}%`,
      change: 0, // API doesn't provide change for dominance
      icon: <img src="/bitcoin-logo.png" alt="Bitcoin" className="h-5 w-5" />,
    },
    {
      title: "Active Coins",
      value: activeCoins.toLocaleString(),
      change: 0, // API doesn't provide change for active coins
      icon: <Coins className="h-5 w-5 text-[#00FFAB]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-[#2C3E50] border-none shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {stat.icon}
                <span className="text-sm font-medium font-inter">
                  {stat.title}
                </span>
              </div>
              {stat.change !== 0 && (
                <div
                  className={`flex items-center text-xs ${
                    stat.change >= 0 ? "text-[#00FFAB]" : "text-red-500"
                  }`}
                >
                  {stat.change >= 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(stat.change).toFixed(2)}%
                </div>
              )}
            </div>
            <div className="mt-2 text-xl font-bold font-inter">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
