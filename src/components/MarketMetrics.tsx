import type React from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart2,
  Coins,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";

interface MarketMetricsProps {
  data: {
    total_market_cap: number;
    total_volume: number;
    market_cap_change_percentage_24h: number;
    active_cryptocurrencies: number;
    btc_dominance: number;
  };
}

export default function MarketMetrics({ data }: MarketMetricsProps) {
  const {
    total_market_cap,
    total_volume,
    market_cap_change_percentage_24h,
    active_cryptocurrencies,
    btc_dominance,
  } = data;
  const isPositive = market_cap_change_percentage_24h >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Market Cap"
        value={formatCurrency(total_market_cap, 0)}
        change={market_cap_change_percentage_24h}
        icon={<DollarSign className="h-5 w-5" />}
      />

      <MetricCard
        title="24h Volume"
        value={formatCurrency(total_volume, 0)}
        subtitle={`${formatPercentage(
          (total_volume / total_market_cap) * 100
        )} of market cap`}
        icon={<BarChart2 className="h-5 w-5" />}
      />

      <MetricCard
        title="Active Cryptocurrencies"
        value={formatNumber(active_cryptocurrencies)}
        subtitle="Trading on exchanges"
        icon={<Coins className="h-5 w-5" />}
      />

      <MetricCard
        title="BTC Dominance"
        value={`${btc_dominance}%`}
        progress={btc_dominance}
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  subtitle?: string;
  progress?: number;
  icon: React.ReactNode;
}

function MetricCard({
  title,
  value,
  change,
  subtitle,
  progress,
  icon,
}: MetricCardProps) {
  const isPositive = change && change >= 0;

  return (
    <Card className="bg-[#2C3E50]/80 backdrop-blur-sm border-0 overflow-hidden group hover:bg-[#2C3E50] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-[#ECECEC]/70">{title}</h3>
          <div className="w-8 h-8 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#00FFAB] group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        <p className="text-2xl font-bold font-mono mb-1">{value}</p>

        {change !== undefined && (
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
            {formatPercentage(change)}
          </div>
        )}

        {subtitle && (
          <div className="text-sm text-[#ECECEC]/70 mt-1">{subtitle}</div>
        )}

        {progress !== undefined && (
          <div className="w-full mt-3">
            <div className="w-full bg-[#1C1C1C] rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#00FFAB] to-[#00FFAB]/70 h-2 rounded-full transition-all duration-1000 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
