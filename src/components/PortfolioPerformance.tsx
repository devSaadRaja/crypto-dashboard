"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioPerformance() {
  const [performanceData, setPerformanceData] = useState({
    allTimeROI: 0,
    bestPerformer: { symbol: "", percentage: 0 },
    worstPerformer: { symbol: "", percentage: 0 },
    isLoading: true,
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      // In a real app, fetch from API
      await new Promise((resolve) => setTimeout(resolve, 700));

      setPerformanceData({
        allTimeROI: 32.45,
        bestPerformer: { symbol: "ETH", percentage: 18.72 },
        worstPerformer: { symbol: "SOL", percentage: -5.23 },
        isLoading: false,
      });
    };

    fetchData();
  }, []);

  return (
    <Card className="bg-[#2C3E50] border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#ECECEC] font-inter">
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {performanceData.isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-[#1C1C1C] rounded w-3/4"></div>
            <div className="h-6 bg-[#1C1C1C] rounded w-1/2"></div>
            <div className="h-6 bg-[#1C1C1C] rounded w-2/3"></div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#ECECEC] font-inter">All-time ROI</span>
              <span
                className={`font-bold font-jetbrains-mono ${
                  performanceData.allTimeROI >= 0
                    ? "text-[#00FFAB]"
                    : "text-red-500"
                }`}
              >
                {performanceData.allTimeROI >= 0 ? "+" : ""}
                {performanceData.allTimeROI.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#ECECEC] font-inter">Best performer</span>
              <span className="font-bold text-[#00FFAB] font-jetbrains-mono">
                {performanceData.bestPerformer.symbol} (+
                {performanceData.bestPerformer.percentage.toFixed(2)}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#ECECEC] font-inter">Worst performer</span>
              <span className="font-bold text-red-500 font-jetbrains-mono">
                {performanceData.worstPerformer.symbol} (
                {performanceData.worstPerformer.percentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
