"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, generateChartData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

// Add TradingView types
declare global {
  interface Window {
    TradingView: any;
  }
}

interface PriceChartProps {
  coinId: string;
  timeframe: string;
  livePriceData?: {
    price: number;
    lastUpdated: Date;
  };
}

export default function PriceChart({
  coinId,
  timeframe,
  livePriceData,
}: PriceChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highestValue, setHighestValue] = useState(0);
  const [lowestValue, setLowestValue] = useState(0);

  // Helper function to convert our timeframe to TradingView interval
  const timeframeToInterval = (tf: string): string => {
    switch (tf) {
      case "1h":
        return "5";
      case "24h":
        return "15";
      case "7d":
        return "60";
      case "30d":
        return "D";
      default:
        return "15";
    }
  };

  // Helper function to get the correct symbol format for TradingView
  const getCryptoSymbol = (id: string): string => {
    // Map common coin IDs to their proper TradingView symbols
    const symbolMap: Record<string, string> = {
      bitcoin: "BINANCE:BTCUSDT",
      ethereum: "BINANCE:ETHUSDT",
      solana: "BINANCE:SOLUSDT",
      cardano: "BINANCE:ADAUSDT",
      ripple: "BINANCE:XRPUSDT",
      polkadot: "BINANCE:DOTUSDT",
    };

    // Return the mapped symbol or a default format if not in the map
    return symbolMap[id] || `BINANCE:${id.toUpperCase()}USDT`;
  };

  useEffect(() => {
    setIsLoading(true);

    // In a real app, you would fetch real chart data
    // For demo purposes, we'll generate mock data
    const data = generateChartData(timeframe, coinId);
    setChartData(data);

    const highest = Math.max(...data.map((p) => p.value));
    const lowest = Math.min(...data.map((p) => p.value));
    setHighestValue(highest);
    setLowestValue(lowest);

    setIsLoading(false);
  }, [coinId, timeframe]);

  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          autosize: true,
          symbol: getCryptoSymbol(coinId),
          interval: timeframeToInterval(timeframe),
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#2C3E50",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: true,
          container_id: "tradingview_chart",
          // studies: ["RSI@tv-basicstudies"],
          disabled_features: ["header_symbol_search"],
          overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#00FFAB",
            "mainSeriesProperties.candleStyle.downColor": "#f44336",
            "mainSeriesProperties.candleStyle.wickUpColor": "#00FFAB",
            "mainSeriesProperties.candleStyle.wickDownColor": "#f44336",
            "paneProperties.background": "#1C1C1C",
            "paneProperties.vertGridProperties.color": "#2C3E50",
            "paneProperties.horzGridProperties.color": "#2C3E50",
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": "#ECECEC",
            "scalesProperties.lineColor": "#2C3E50",
          },
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [coinId, timeframe]);

  if (isLoading) {
    return (
      <Card className="bg-[#2C3E50]/80 backdrop-blur-sm border-0">
        <CardContent className="p-6 h-80 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-[#00FFAB]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#00FFAB] rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate price change
  const firstPrice = chartData[0]?.value || 0;
  const lastPrice =
    livePriceData?.price || chartData[chartData.length - 1]?.value || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercentage = (priceChange / firstPrice) * 100;
  const isPositive = priceChange >= 0;

  // Format the time since last update
  const getTimeSinceUpdate = () => {
    if (!livePriceData?.lastUpdated) return "";

    const seconds = Math.floor(
      (new Date().getTime() - livePriceData.lastUpdated.getTime()) / 1000
    );

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <Card className="bg-[#2C3E50]/80 backdrop-blur-sm border-0 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-mono font-bold">
                {formatCurrency(lastPrice)}
              </h3>
              {/* <span
                className={`ml-2 text-sm px-2 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-[#00FFAB]/10 text-[#00FFAB]"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {formatCurrency(priceChange)} ({isPositive ? "+" : ""}
                {priceChangePercentage.toFixed(2)}%)
              </span> */}
              {livePriceData?.lastUpdated && (
                <span className="ml-2 text-xs text-[#ECECEC]/50">
                  Updated {getTimeSinceUpdate()}
                </span>
              )}
            </div>
            <p className="text-sm text-[#ECECEC]/70 mt-1">
              {new Date().toLocaleDateString()} · {timeframe.toUpperCase()}{" "}
              Chart
            </p>
          </div>

          {/* <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#1C1C1C] border-0 text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#1C1C1C] border-0 text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-[#1C1C1C] border-0 text-[#ECECEC]/70 hover:text-[#00FFAB] hover:bg-[#1C1C1C]"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div> */}
        </div>

        <div className="h-[500px] w-full relative">
          {/* TradingView Widget BEGIN */}
          <div
            className="tradingview-widget-container"
            style={{ height: "100%", width: "100%" }}
          >
            <div
              id="tradingview_chart"
              style={{ height: "calc(100% - 24px)", width: "100%" }}
            ></div>
            <div className="tradingview-widget-copyright">
              <a
                href={`https://www.tradingview.com/symbols/${coinId.toUpperCase()}USDT/?exchange=BINANCE`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-xs text-[#ECECEC]/50 hover:text-[#00FFAB]"
              >
                <span className="blue-text">Chart by TradingView</span>
              </a>
            </div>
          </div>
          {/* TradingView Widget END */}
        </div>
      </CardContent>
    </Card>
  );
}
