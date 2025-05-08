"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TickerItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  high24h: number;
  low24h: number;
  sparkline?: number[];
}

export default function MarketTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockData: TickerItem[] = [
      {
        id: "1",
        symbol: "BTC",
        name: "Bitcoin",
        price: 51243.67,
        change: 1203.45,
        changePercent: 2.34,
        volume: "$32.5B",
        marketCap: "$1.02T",
        high24h: 52105.78,
        low24h: 50012.34,
        sparkline: [50100, 50400, 50800, 51200, 51000, 51300, 51250],
      },
      {
        id: "2",
        symbol: "ETH",
        name: "Ethereum",
        price: 2876.12,
        change: 43.21,
        changePercent: 1.56,
        volume: "$18.7B",
        marketCap: "$345.8B",
        high24h: 2901.45,
        low24h: 2830.19,
        sparkline: [2840, 2855, 2870, 2880, 2860, 2875, 2876],
      },
      {
        id: "3",
        symbol: "SOL",
        name: "Solana",
        price: 102.45,
        change: 5.67,
        changePercent: 5.78,
        volume: "$8.2B",
        marketCap: "$45.6B",
        high24h: 103.78,
        low24h: 96.32,
        sparkline: [97, 98, 99.5, 101, 102, 102.5, 102.45],
      },
      {
        id: "4",
        symbol: "ADA",
        name: "Cardano",
        price: 0.58,
        change: -0.01,
        changePercent: -1.23,
        volume: "$3.1B",
        marketCap: "$20.4B",
        high24h: 0.59,
        low24h: 0.57,
        sparkline: [0.59, 0.585, 0.58, 0.575, 0.57, 0.575, 0.58],
      },
      {
        id: "5",
        symbol: "DOT",
        name: "Polkadot",
        price: 7.89,
        change: -0.04,
        changePercent: -0.45,
        volume: "$2.8B",
        marketCap: "$10.2B",
        high24h: 7.95,
        low24h: 7.82,
        sparkline: [7.92, 7.9, 7.88, 7.85, 7.87, 7.89, 7.89],
      },
      {
        id: "6",
        symbol: "AVAX",
        name: "Avalanche",
        price: 35.67,
        change: 1.12,
        changePercent: 3.21,
        volume: "$2.5B",
        marketCap: "$13.1B",
        high24h: 36.12,
        low24h: 34.45,
        sparkline: [34.5, 34.8, 35.2, 35.5, 35.7, 35.6, 35.67],
      },
      {
        id: "7",
        symbol: "DOGE",
        name: "Dogecoin",
        price: 0.12,
        change: 0.01,
        changePercent: 8.76,
        volume: "$2.1B",
        marketCap: "$16.8B",
        high24h: 0.125,
        low24h: 0.11,
        sparkline: [0.11, 0.115, 0.118, 0.12, 0.122, 0.121, 0.12],
      },
      {
        id: "8",
        symbol: "LINK",
        name: "Chainlink",
        price: 14.32,
        change: 0.3,
        changePercent: 2.11,
        volume: "$1.9B",
        marketCap: "$8.4B",
        high24h: 14.45,
        low24h: 14.01,
        sparkline: [14.05, 14.15, 14.25, 14.35, 14.3, 14.32, 14.32],
      },
      {
        id: "9",
        symbol: "UNI",
        name: "Uniswap",
        price: 7.65,
        change: -0.18,
        changePercent: -2.34,
        volume: "$1.7B",
        marketCap: "$5.8B",
        high24h: 7.85,
        low24h: 7.6,
        sparkline: [7.82, 7.78, 7.72, 7.68, 7.65, 7.63, 7.65],
      },
      {
        id: "10",
        symbol: "MATIC",
        name: "Polygon",
        price: 0.89,
        change: 0.01,
        changePercent: 1.45,
        volume: "$1.5B",
        marketCap: "$8.9B",
        high24h: 0.9,
        low24h: 0.87,
        sparkline: [0.875, 0.88, 0.885, 0.89, 0.888, 0.89, 0.89],
      },
    ];

    setTickerData(mockData);
    setIsLoading(false);

    // In a real app, you would set up a WebSocket or polling here
    const interval = setInterval(() => {
      // Simulate price changes
      setTickerData((prevData) =>
        prevData.map((item) => {
          const priceChange = (Math.random() * 0.02 - 0.01) * item.price;
          const newPrice = Number.parseFloat(
            (item.price + priceChange).toFixed(2)
          );
          const newChangePercent = Number.parseFloat(
            (item.changePercent + (Math.random() * 0.4 - 0.2)).toFixed(2)
          );
          const newChange = Number.parseFloat(
            ((newChangePercent / 100) * newPrice).toFixed(2)
          );

          // Update sparkline with new price point
          const newSparkline = [...(item.sparkline || []).slice(1), newPrice];

          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            sparkline: newSparkline,
            high24h: Math.max(item.high24h, newPrice),
            low24h: Math.min(item.low24h, newPrice),
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#2C3E50] py-2 overflow-hidden border-b border-[#1C1C1C]/20">
        <div className="animate-pulse flex space-x-12 px-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-[#1C1C1C]/30 rounded w-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2C3E50] py-2  overflow-hidden border-b border-[#1C1C1C]/20">
      <div className="ticker-container">
        <div className="ticker-wrapper">
          {/* Duplicate the items to create a seamless loop */}
          {[...tickerData, ...tickerData].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="ticker-item font-jetbrains-mono inline-flex items-center mr-12"
            >
              <div className="flex items-center">
                <div className="flex flex-col mr-3">
                  <span className="font-bold text-[#ECECEC]">
                    {item.symbol}
                  </span>
                  <span className="text-xs text-[#ECECEC]/60">{item.name}</span>
                </div>

                <div className="flex flex-col mr-4">
                  <span className="text-[#ECECEC]">
                    $
                    {item.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <div
                    className={cn(
                      "inline-flex items-center text-xs",
                      item.changePercent >= 0
                        ? "text-[#00FFAB]"
                        : "text-red-400"
                    )}
                  >
                    {item.changePercent >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    ${Math.abs(item.change).toFixed(2)} (
                    {Math.abs(item.changePercent).toFixed(2)}%)
                  </div>
                </div>

                <div className="hidden sm:flex flex-col mr-4">
                  <div className="flex items-center text-xs text-[#ECECEC]/70">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    <span>Vol: {item.volume}</span>
                  </div>
                  <div className="flex items-center text-xs text-[#ECECEC]/70">
                    <span className="mr-1">24h:</span>
                    <span className="text-[#00FFAB]">
                      H: ${item.high24h.toFixed(2)}
                    </span>
                    <span className="mx-1">|</span>
                    <span className="text-red-400">
                      L: ${item.low24h.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Mini sparkline visualization */}
                {/* <div className="hidden md:block h-8 w-20 relative">
                  <div className="absolute inset-0 flex items-end">
                    {item.sparkline?.map((value, i) => {
                      const height =
                        ((value - Math.min(...item.sparkline!)) /
                          (Math.max(...item.sparkline!) -
                            Math.min(...item.sparkline!))) *
                        100;

                      return (
                        <div
                          key={i}
                          style={{ height: `${Math.max(5, height)}%` }}
                          className={cn(
                            "w-2 mx-0.5 rounded-t",
                            item.changePercent >= 0
                              ? "bg-[#00FFAB]/70"
                              : "bg-red-400/70"
                          )}
                        ></div>
                      );
                    })}
                  </div>
                </div> */}

                <div className="hidden lg:flex items-center ml-3">
                  <span className="text-xs text-[#ECECEC]/70">
                    MCap: {item.marketCap}
                  </span>
                  {item.changePercent >= 3 ? (
                    <TrendingUp className="ml-2 h-4 w-4 text-[#00FFAB]" />
                  ) : item.changePercent <= -3 ? (
                    <TrendingDown className="ml-2 h-4 w-4 text-red-400" />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
