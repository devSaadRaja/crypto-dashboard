"use client";

import { ArrowDown, ArrowUp, MoreHorizontal, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils";

interface CoinCardProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    volume_24h: number;
    circulating_supply: number;
    image: string;
  };
  onClick: () => void;
  isSelected: boolean;
  view: string;
}

export default function CoinCard({
  coin,
  onClick,
  isSelected,
  view,
}: CoinCardProps) {
  const {
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap,
    volume_24h,
    circulating_supply,
    image,
  } = coin;
  const isPositive = price_change_percentage_24h >= 0;

  if (view === "list") {
    return (
      <Card
        className={`bg-[#2C3E50]/80 backdrop-blur-sm border-0 hover:bg-[#2C3E50] transition-all duration-300 cursor-pointer overflow-hidden group ${
          isSelected ? "ring-2 ring-[#00FFAB]" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div
                  className={`absolute -inset-1 rounded-full blur-sm ${
                    isPositive ? "bg-[#00FFAB]/30" : "bg-red-500/30"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative w-10 h-10 rounded-full bg-[#1C1C1C] p-1.5 flex items-center justify-center">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold">{name}</h3>
                  <span className="text-xs text-[#ECECEC]/70 uppercase ml-2 bg-[#1C1C1C] px-1.5 py-0.5 rounded-full">
                    {symbol}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <p className="font-mono font-bold">
                    {formatCurrency(current_price)}
                  </p>
                  <div
                    className={`flex items-center ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      isPositive
                        ? "text-[#00FFAB] bg-[#00FFAB]/10"
                        : "text-red-400 bg-red-400/10"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {formatPercentage(price_change_percentage_24h)}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#ECECEC]/70">Volume (24h)</p>
              <p className="font-mono text-sm">
                {formatCurrency(volume_24h, 0)}
              </p>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`bg-[#2C3E50]/80 backdrop-blur-sm border-0 hover:bg-[#2C3E50] transition-all duration-300 cursor-pointer overflow-hidden group ${
        isSelected ? "ring-2 ring-[#00FFAB]" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div
          className={`h-1.5 w-full ${
            isPositive ? "bg-[#00FFAB]" : "bg-red-400"
          }`}
        ></div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div
                  className={`absolute -inset-1 rounded-full blur-sm ${
                    isPositive ? "bg-[#00FFAB]/30" : "bg-red-500/30"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative w-10 h-10 rounded-full bg-[#1C1C1C] p-1.5 flex items-center justify-center">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-xs text-[#ECECEC]/70 uppercase">{symbol}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <p className="font-mono font-bold text-xl">
              {formatCurrency(current_price)}
            </p>
            <div
              className={`flex items-center text-sm ${
                isPositive ? "text-[#00FFAB]" : "text-red-400"
              }`}
            >
              {isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {formatPercentage(price_change_percentage_24h)}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#1C1C1C]/30">
            <div>
              <p className="text-xs text-[#ECECEC]/70 mb-1">Market Cap</p>
              <p className="font-mono text-sm truncate">
                {formatCurrency(market_cap, 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#ECECEC]/70 mb-1">Volume (24h)</p>
              <p className="font-mono text-sm truncate">
                {formatCurrency(volume_24h, 0)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
