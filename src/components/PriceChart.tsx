"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { generateChartData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

interface PriceChartProps {
  coinId: string;
  timeframe: string;
}

export default function PriceChart({ coinId, timeframe }: PriceChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highestValue, setHighestValue] = useState(0);
  const [lowestValue, setLowestValue] = useState(0);

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
  const lastPrice = chartData[chartData.length - 1]?.value || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercentage = (priceChange / firstPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <Card className="bg-[#2C3E50]/80 backdrop-blur-sm border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-mono font-bold">
                {lastPrice.toFixed(2)}
              </h3>
              <span
                className={`ml-2 text-sm px-2 py-0.5 rounded-full ${
                  isPositive
                    ? "bg-[#00FFAB]/10 text-[#00FFAB]"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {isPositive ? "+" : ""}
                {priceChange.toFixed(2)} ({isPositive ? "+" : ""}
                {priceChangePercentage.toFixed(2)}%)
              </span>
            </div>
            <p className="text-sm text-[#ECECEC]/70 mt-1">
              {new Date().toLocaleDateString()} · {timeframe.toUpperCase()}{" "}
              Chart
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0">
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
          </div>
        </div>

        <div className="h-80 w-full relative">
          {/* Chart background grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-[#1C1C1C]/20"></div>
            ))}
          </div>

          {/* This is a placeholder for the chart. In a real app, you would use a charting library like Chart.js, Recharts, etc. */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 1000 400">
            {/* Gradient for the area under the line */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00FFAB" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00FFAB" stopOpacity="0" />
              </linearGradient>

              {/* Glow effect for the line */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Area under the line */}
            <path
              d={`M0,${400 - chartData[0]?.value} ${chartData
                .map(
                  (point, i) =>
                    `L${(i / (chartData.length - 1)) * 1000},${
                      400 - point.value
                    }`
                )
                .join(" ")} L1000,400 L0,400 Z`}
              fill="url(#gradient)"
            />

            {/* The line itself */}
            <path
              d={`M0,${400 - chartData[0]?.value} ${chartData
                .map(
                  (point, i) =>
                    `L${(i / (chartData.length - 1)) * 1000},${
                      400 - point.value
                    }`
                )
                .join(" ")}`}
              fill="none"
              stroke="#00FFAB"
              strokeWidth="3"
              filter="url(#glow)"
              className="drop-shadow-[0_0_8px_rgba(0,255,171,0.5)]"
            />

            {/* Data points */}
            {chartData
              .filter((_, i) => i % Math.ceil(chartData.length / 10) === 0)
              .map((point, i) => (
                <circle
                  key={i}
                  cx={((i * 10) / (chartData.length / 10 - 1)) * 1000}
                  cy={400 - point.value}
                  r="5"
                  fill="#00FFAB"
                  className="drop-shadow-[0_0_8px_rgba(0,255,171,0.8)]"
                />
              ))}
          </svg>

          {/* Y-axis labels */}
          <div className="absolute top-0 right-0 bottom-0 flex flex-col justify-between text-xs text-[#ECECEC]/70 py-2 pr-2">
            <span className="font-mono">${highestValue.toFixed(2)}</span>
            <span className="font-mono">
              ${((highestValue + lowestValue) / 2).toFixed(2)}
            </span>
            <span className="font-mono">${lowestValue.toFixed(2)}</span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-[#ECECEC]/70 px-2">
            {chartData
              .filter((_, i) => i % Math.ceil(chartData.length / 6) === 0)
              .map((point, i) => (
                <span key={i} className="font-mono">
                  {point.label}
                </span>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
