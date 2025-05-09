"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioSummary() {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    change24h: 0,
    changePercentage: 0,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      // In a real app, fetch from API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPortfolioData({
        totalValue: 24685.42,
        change24h: 1245.32,
        changePercentage: 5.32,
        isLoading: false,
      });
    };

    fetchData();
  }, []);

  const isPositive = portfolioData.change24h >= 0;

  return (
    <Card className="bg-[#2C3E50] border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#ECECEC] font-inter">
          Portfolio Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        {portfolioData.isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-[#1C1C1C] rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-[#1C1C1C] rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold text-[#ECECEC] font-jetbrains-mono">
              $
              {portfolioData.totalValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={`flex items-center mt-2 ${
                isPositive ? "text-[#00FFAB]" : "text-red-500"
              } font-jetbrains-mono`}
            >
              {isPositive ? (
                <ArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="mr-1">
                $
                {Math.abs(portfolioData.change24h).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span>({portfolioData.changePercentage.toFixed(2)}%)</span>
            </div>
            <div className="text-xs text-[#ECECEC] opacity-70 mt-2 font-inter">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
