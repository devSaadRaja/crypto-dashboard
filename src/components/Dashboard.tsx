"use client";

import { useEffect, useState } from "react";
import { ChevronDown, RefreshCw, TrendingUp, Zap } from "lucide-react";
import Header from "@/components/Header";
import CoinCard from "@/components/CoinCard";
import MarketMetrics from "@/components/MarketMetrics";
import PriceChart from "@/components/PriceChart";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types for our data
interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
  image: string;
}

interface MarketData {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  active_cryptocurrencies: number;
  btc_dominance: number;
}

export default function Dashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("24h");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [view, setView] = useState("grid");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch from a real API
      // For demo purposes, we'll use mock data
      const mockCoins: Coin[] = [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          current_price: 63245.32,
          price_change_percentage_24h: 2.34,
          market_cap: 1236789012345,
          volume_24h: 28765432100,
          circulating_supply: 19568425,
          image: "/btc-abstract-representation.png",
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          current_price: 3421.76,
          price_change_percentage_24h: -1.23,
          market_cap: 412345678901,
          volume_24h: 15432678900,
          circulating_supply: 120567890,
          image: "/ethereum-logo-abstract.png",
        },
        {
          id: "solana",
          name: "Solana",
          symbol: "SOL",
          current_price: 142.87,
          price_change_percentage_24h: 5.67,
          market_cap: 61234567890,
          volume_24h: 5678901234,
          circulating_supply: 428765432,
          image: "/sol-abstract.png",
        },
        {
          id: "cardano",
          name: "Cardano",
          symbol: "ADA",
          current_price: 0.45,
          price_change_percentage_24h: -0.78,
          market_cap: 15987654321,
          volume_24h: 1234567890,
          circulating_supply: 35678901234,
          image: "/ada-lovelace-portrait.png",
        },
        {
          id: "ripple",
          name: "XRP",
          symbol: "XRP",
          current_price: 0.56,
          price_change_percentage_24h: 3.45,
          market_cap: 29876543210,
          volume_24h: 3456789012,
          circulating_supply: 53456789012,
          image: "/xrp-abstract-design.png",
        },
        {
          id: "polkadot",
          name: "Polkadot",
          symbol: "DOT",
          current_price: 6.78,
          price_change_percentage_24h: 1.23,
          market_cap: 8765432109,
          volume_24h: 987654321,
          circulating_supply: 1293456789,
          image: "/dot-pattern.png",
        },
      ];

      const mockMarketData: MarketData = {
        total_market_cap: 2345678901234,
        total_volume: 123456789012,
        market_cap_change_percentage_24h: 1.45,
        active_cryptocurrencies: 10483,
        btc_dominance: 42.3,
      };

      setCoins(mockCoins);
      setMarketData(mockMarketData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up interval for live updates
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#ECECEC] font-sans">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#2C3E50]/50 to-transparent pointer-events-none" />

      <Header />

      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#00FFAB] to-[#00FFAB]/70 text-transparent bg-clip-text">
              Crypto Dashboard
            </h1>
            <p className="text-[#ECECEC]/70">Live market data and analytics</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-[#2C3E50] bg-[#2C3E50]/50 text-[#ECECEC] hover:bg-[#2C3E50] hover:text-[#00FFAB] transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2C3E50] bg-[#2C3E50]/50 text-[#ECECEC] hover:bg-[#2C3E50] hover:text-[#00FFAB] transition-all duration-300"
                >
                  {timeframe.toUpperCase()}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#2C3E50] border-[#2C3E50] text-[#ECECEC]">
                <DropdownMenuItem onClick={() => setTimeframe("1h")}>
                  1H
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("24h")}>
                  24H
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("7d")}>
                  7D
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe("30d")}>
                  30D
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#00FFAB]/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#00FFAB] rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            {marketData && <MarketMetrics data={marketData} />}

            <div className="mt-12 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#00FFAB]" />
                  <h2 className="text-xl font-semibold">
                    Top Cryptocurrencies
                  </h2>
                </div>

                <Tabs
                  defaultValue="grid"
                  className="w-full md:w-auto"
                  onValueChange={(value) => setView(value)}
                >
                  <TabsList className="bg-[#2C3E50]/50 border border-[#2C3E50]">
                    <TabsTrigger
                      value="grid"
                      className="data-[state=active]:bg-[#2C3E50] data-[state=active]:text-[#00FFAB]"
                    >
                      Grid View
                    </TabsTrigger>
                    <TabsTrigger
                      value="list"
                      className="data-[state=active]:bg-[#2C3E50] data-[state=active]:text-[#00FFAB]"
                    >
                      List View
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coins.map((coin) => (
                  <CoinCard
                    key={coin.id}
                    coin={coin}
                    onClick={() => setSelectedCoin(coin.id)}
                    isSelected={selectedCoin === coin.id}
                    view={view}
                  />
                ))}
              </div>
            </div>

            <div className="mt-12 mb-6">
              <div className="flex items-center mb-6">
                <Zap className="h-5 w-5 mr-2 text-[#00FFAB]" />
                <h2 className="text-xl font-semibold">
                  {coins.find((c) => c.id === selectedCoin)?.name || "Bitcoin"}{" "}
                  Price Chart
                </h2>
              </div>
              <PriceChart coinId={selectedCoin} timeframe={timeframe} />
            </div>
          </>
        )}
      </main>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#2C3E50]/30 to-transparent pointer-events-none" />
    </div>
  );
}
