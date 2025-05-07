"use client";

import {
  ArrowDown,
  ArrowUp,
  MoreHorizontal,
  Star,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercentage, formatNumber } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { apiCallsTracker } from "@/components/Dashboard";

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
  onPriceUpdate: (price: number) => void;
  livePriceData?: {
    price: number;
    lastUpdated: Date;
  };
}

export default function CoinCard({
  coin,
  onClick,
  isSelected,
  view,
  onPriceUpdate,
  livePriceData,
}: CoinCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    id,
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

  // Get live price and last updated time from props or use null
  const livePrice = livePriceData?.price || null;
  const lastUpdated = livePriceData?.lastUpdated || null;

  // Function to check if we can make an API call
  const canMakeApiCall = () => {
    const now = Date.now();

    // If we're in a throttled state, check if enough time has passed
    if (apiCallsTracker.isThrottled) {
      if (now > apiCallsTracker.resetTime) {
        // Reset throttled state after the cooldown period
        apiCallsTracker.isThrottled = false;
        apiCallsTracker.callCount = 0;
      } else {
        return false;
      }
    }

    // Ensure at least 2 seconds between API calls
    if (now - apiCallsTracker.lastCall < 2000) {
      return false;
    }

    // Allow up to 10 calls in a 60-second window
    if (apiCallsTracker.callCount >= 10) {
      // Set throttled state with a 60-second cooldown
      apiCallsTracker.isThrottled = true;
      apiCallsTracker.resetTime = now + 60000;
      return false;
    }

    return true;
  };

  // Function to fetch live price data
  const fetchLivePrice = async (force = false) => {
    // Skip if already refreshing
    if (isRefreshing) return;

    // Check if we can make an API call, unless forced
    if (!force && !canMakeApiCall()) {
      setApiError("API rate limited. Try again later.");
      return;
    }

    setIsRefreshing(true);
    setApiError(null);

    try {
      // Update API call tracker
      apiCallsTracker.lastCall = Date.now();
      apiCallsTracker.callCount++;

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
      );

      // Check if response is OK
      if (!response.ok) {
        const text = await response.text();
        if (text.includes("Throttled")) {
          apiCallsTracker.isThrottled = true;
          apiCallsTracker.resetTime = Date.now() + 60000;
          throw new Error("API rate limited. Try again later.");
        }
        throw new Error(`API error: ${response.status} ${text}`);
      }

      const data = await response.json();

      if (data && data[id]) {
        const price = data[id].usd;
        onPriceUpdate(price); // Update the parent component with the new price
        setApiError(null);
      } else {
        throw new Error("No data returned for this coin");
      }
    } catch (error) {
      console.error("Error fetching live price:", error);
      setApiError(
        error instanceof Error ? error.message : "Failed to fetch price"
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  // Fetch live price on initial render with a staggered delay to avoid multiple simultaneous requests
  useEffect(() => {
    const initialDelay = Math.random() * 2000; // Random delay between 0-2 seconds
    const timeout = setTimeout(() => {
      fetchLivePrice();
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  // Calculate if the live price is higher or lower than the stored price
  const livePriceChange = livePrice !== null ? livePrice - current_price : 0;
  const livePriceIsPositive = livePriceChange >= 0;

  // Format the time since last update
  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return "";

    const seconds = Math.floor(
      (new Date().getTime() - lastUpdated.getTime()) / 1000
    );

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

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
                    {livePrice !== null
                      ? formatCurrency(livePrice)
                      : formatCurrency(current_price)}
                    {livePrice !== null && livePrice !== current_price && (
                      <span
                        className={`ml-1 text-xs ${
                          livePriceIsPositive
                            ? "text-[#00FFAB]"
                            : "text-red-400"
                        }`}
                      >
                        {livePriceIsPositive ? "↑" : "↓"}
                      </span>
                    )}
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

            {/* Right section - Actions */}
            <div className="flex items-center ml-4">
              {/* <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
                onClick={(e) => {
                  e.stopPropagation();
                  fetchLivePrice(true);
                }}
                title={apiError || "Refresh price"}
              >
                {apiError ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                ) : (
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                )}
              </Button> */}
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

            <div className="flex items-center">
              {/* {lastUpdated && !apiError && (
                <span className="text-xs text-[#ECECEC]/50 mr-2">
                  {getTimeSinceUpdate()}
                </span>
              )}
              {apiError && (
                <span
                  className="text-xs text-amber-400/80 mr-2"
                  title={apiError}
                >
                  API limited
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
                onClick={(e) => {
                  e.stopPropagation();
                  fetchLivePrice(true);
                }}
                title={apiError || "Refresh price"}
              >
                {apiError ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                ) : (
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                )}
              </Button> */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="font-mono font-bold text-xl">
                {livePrice !== null
                  ? formatCurrency(livePrice)
                  : formatCurrency(current_price)}
              </p>
              {/* {livePrice !== null &&
                livePrice !== current_price &&
                !apiError && (
                  <p
                    className={`text-xs ${
                      livePriceIsPositive ? "text-[#00FFAB]" : "text-red-400"
                    }`}
                  >
                    {livePriceIsPositive ? "↑" : "↓"}{" "}
                    {formatCurrency(Math.abs(livePriceChange))} since last
                    update
                  </p>
                )} */}
            </div>
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
