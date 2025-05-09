"use client";

import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  Search,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchCryptoData } from "@/lib/api";
import type { CryptoData } from "@/lib/types";
import CoinList from "@/components/CoinList";

export default function LeaderboardClient() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCryptoData(timeframe);
      if (data.length === 0) {
        setError(
          "No data available. The API may be rate limited. Please try again later."
        );
      } else {
        setCryptoData(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch crypto data:", error);
      setError("Failed to fetch cryptocurrency data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Set up polling every 2 minutes (120000ms)
    // Using a longer interval to respect API rate limits
    const intervalId = setInterval(loadData, 120000);

    return () => clearInterval(intervalId);
  }, [timeframe]);

  const filteredData = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gainers = [...filteredData]
    .sort((a, b) => b.priceChangePercentage - a.priceChangePercentage)
    .filter((coin) => coin.priceChangePercentage > 0)
    .slice(0, 10);

  const losers = [...filteredData]
    .sort((a, b) => a.priceChangePercentage - b.priceChangePercentage)
    .filter((coin) => coin.priceChangePercentage < 0)
    .slice(0, 10);

  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#ECECEC] font-inter">
            Crypto Leaderboard
          </h1>
          {lastUpdated && (
            <p className="text-sm text-[#ECECEC]/60 font-jetbrains-mono mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ECECEC]/50" />
            <Input
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1C1C1C] border-[#2C3E50] text-[#ECECEC] placeholder:text-[#ECECEC]/50 w-full"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={loadData}
            disabled={isLoading}
            className="border-[#2C3E50] text-[#00FFAB] hover:text-[#00FFAB] hover:bg-[#2C3E50]/30"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 bg-[#2C3E50]/30 border-red-500/50 text-[#ECECEC]">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-6">
        <Tabs
          defaultValue="24h"
          onValueChange={(value) => setTimeframe(value as "24h" | "7d" | "30d")}
        >
          <TabsList className="bg-[#1C1C1C] border border-[#2C3E50]">
            <TabsTrigger
              value="24h"
              className="data-[state=active]:bg-[#2C3E50] data-[state=active]:text-[#00FFAB]"
            >
              24h
            </TabsTrigger>
            <TabsTrigger
              value="7d"
              className="data-[state=active]:bg-[#2C3E50] data-[state=active]:text-[#00FFAB]"
            >
              7d
            </TabsTrigger>
            <TabsTrigger
              value="30d"
              className="data-[state=active]:bg-[#2C3E50] data-[state=active]:text-[#00FFAB]"
            >
              30d
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1C1C1C] border-[#2C3E50] shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-[#00FFAB] font-jetbrains-mono">
              <ArrowUp className="mr-2 h-5 w-5" />
              Top Gainers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CoinList coins={gainers} isLoading={isLoading} type="gainers" />
          </CardContent>
        </Card>

        <Card className="bg-[#1C1C1C] border-[#2C3E50] shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-[#00FFAB] font-jetbrains-mono">
              <ArrowDown className="mr-2 h-5 w-5" />
              Top Losers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CoinList coins={losers} isLoading={isLoading} type="losers" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
