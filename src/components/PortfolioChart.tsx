"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const timeRanges = [
  { value: "24h", label: "24H" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "1y", label: "1Y" },
  { value: "all", label: "ALL" },
];

// The issue is with the data generation function and how the chart renders the data.
// Let's improve the data generation to create more realistic market trends and ensure the line properly connects data points.

// Replace the generateChartData function with this improved version:
const generateChartData = (range: string) => {
  const data = [];
  let points = 0;
  const startValue = 20000;
  let trend = 0.05; // Overall trend direction (positive)
  let volatility = 0; // Day-to-day volatility

  // Create a date object for today
  const today = new Date();

  switch (range) {
    case "24h":
      points = 24;
      volatility = 0.005;
      // Hourly pattern - typically higher in mornings and evenings
      trend = 0.02;
      break;
    case "7d":
      points = 7;
      volatility = 0.01;
      // Weekly pattern - typically up during week, down on weekends
      trend = 0.03;
      break;
    case "30d":
      points = 10;
      volatility = 0.015;
      trend = 0.04;
      break;
    case "90d":
      points = 12;
      volatility = 0.02;
      trend = 0.06;
      break;
    case "1y":
      points = 12;
      volatility = 0.03;
      trend = 0.08;
      break;
    case "all":
      points = 10;
      volatility = 0.04;
      trend = 0.1;
      break;
  }

  // Create a continuous trend with realistic market patterns
  let previousDirection = 1; // Start with uptrend
  let directionDuration = 0; // How long current trend has lasted
  let trendValue = startValue;

  for (let i = 0; i < points; i++) {
    // Gradually shift trend direction for realism
    directionDuration++;

    // 30% chance to change direction if trend has lasted for 3 or more points
    if (directionDuration >= 3 && Math.random() < 0.3) {
      previousDirection *= -1;
      directionDuration = 0;
    }

    // Calculate the change for this data point
    // Main trend component + volatility + current direction
    const trendComponent = startValue * trend * (i / points);
    const volatilityComponent = startValue * volatility * (Math.random() - 0.5);
    const directionComponent = startValue * (0.01 * previousDirection);

    trendValue =
      startValue + trendComponent + volatilityComponent + directionComponent;

    // Ensure values don't go negative or too low
    trendValue = Math.max(trendValue, startValue * 0.7);

    let label = "";
    const date = new Date(today);

    if (range === "24h") {
      date.setHours(date.getHours() - (points - i - 1));
      label = date.getHours().toString().padStart(2, "0") + ":00";
    } else if (range === "7d") {
      date.setDate(date.getDate() - (points - i - 1));
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      label = days[date.getDay()];
    } else if (range === "30d") {
      date.setDate(
        date.getDate() - Math.floor((30 / points) * (points - i - 1))
      );
      label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (range === "90d") {
      date.setDate(
        date.getDate() - Math.floor((90 / points) * (points - i - 1))
      );
      label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else if (range === "1y") {
      date.setMonth(date.getMonth() - (points - i - 1));
      label = date.toLocaleDateString("en-US", { month: "short" });
    } else {
      date.setFullYear(
        date.getFullYear() - Math.floor((5 / points) * (points - i - 1))
      );
      label = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    }

    data.push({
      label,
      value: trendValue,
      date: date.toISOString(),
    });
  }

  return data;
};

export default function PortfolioChart() {
  const [selectedRange, setSelectedRange] = useState("7d");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Simulate API fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setChartData(generateChartData(selectedRange));
      setIsLoading(false);
    };

    fetchData();
  }, [selectedRange]);

  return (
    <Card className="bg-[#2C3E50] border-none shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg text-[#ECECEC] font-inter">
            Portfolio Performance
          </CardTitle>
          <Tabs
            value={selectedRange}
            onValueChange={setSelectedRange}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-[#1C1C1C] grid grid-cols-3 sm:grid-cols-6 w-full sm:w-auto">
              {timeRanges.map((range) => (
                <TabsTrigger
                  key={range.value}
                  value={range.value}
                  className="data-[state=active]:bg-[#2C3E50] data-[state=active]:text-[#00FFAB] text-[#ECECEC] font-jetbrains-mono"
                >
                  {range.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FFAB]"></div>
          </div>
        ) : (
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                // // Add these properties for smoother animation and better rendering:
                // animationDuration={750}
                // animationEasing="ease-in-out"
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFAB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00FFAB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C3E50" />
                <XAxis
                  dataKey="label"
                  stroke="#ECECEC"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#ECECEC", fontFamily: "JetBrains Mono" }}
                  dy={10}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#ECECEC"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#ECECEC", fontFamily: "JetBrains Mono" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1C1C1C",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ECECEC",
                    fontFamily: "JetBrains Mono",
                  }}
                  itemStyle={{ color: "#00FFAB" }}
                  formatter={(value: any) => [
                    `$${value.toLocaleString()}`,
                    "Value",
                  ]}
                  labelFormatter={(label: string, payload: any[]) => {
                    if (
                      payload &&
                      payload.length > 0 &&
                      payload[0].payload.date
                    ) {
                      const date = new Date(payload[0].payload.date);
                      return date.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                    }
                    return label;
                  }}
                  labelStyle={{
                    color: "#ECECEC",
                    fontFamily: "JetBrains Mono",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#00FFAB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  connectNulls={true}
                  activeDot={{
                    r: 8,
                    fill: "#00FFAB",
                    stroke: "#1C1C1C",
                    strokeWidth: 2,
                  }}
                  dot={false} // Only show dots on hover for cleaner lines
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
