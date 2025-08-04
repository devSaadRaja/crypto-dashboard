import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrencyShort(value: number): string {
  // Format large numbers with appropriate suffixes
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function generateChartData(timeframe: string, coinId: string): any[] {
  const now = new Date();
  const data = [];
  let points = 0;
  let startValue = 0;
  let volatility = 0;

  // Set parameters based on coin and timeframe
  if (coinId === "bitcoin") {
    startValue = 63000;
    volatility = 0.005;
  } else if (coinId === "ethereum") {
    startValue = 3400;
    volatility = 0.008;
  } else if (coinId === "solana") {
    startValue = 140;
    volatility = 0.012;
  } else if (coinId === "cardano") {
    startValue = 0.45;
    volatility = 0.01;
  } else if (coinId === "ripple") {
    startValue = 0.56;
    volatility = 0.015;
  } else {
    startValue = 6.8;
    volatility = 0.01;
  }

  // Set number of data points and time interval based on timeframe
  switch (timeframe) {
    case "1h":
      points = 60;
      break;
    case "24h":
      points = 24;
      break;
    case "7d":
      points = 7 * 24;
      break;
    case "30d":
      points = 30;
      break;
    default:
      points = 24;
  }

  let currentValue = startValue;
  let trend = 0; // -1 for downtrend, 0 for neutral, 1 for uptrend
  let trendDuration = 0;
  const maxTrendDuration = Math.floor(points / 4);

  for (let i = 0; i < points; i++) {
    // Occasionally change the trend
    if (trendDuration <= 0) {
      trend = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      trendDuration = Math.floor(Math.random() * maxTrendDuration) + 5;
    }
    trendDuration--;

    // Generate a random price movement with trend bias
    const trendBias = trend * volatility * currentValue * 0.3;
    const randomComponent = currentValue * volatility * (Math.random() * 2 - 1);
    const change = trendBias + randomComponent;

    currentValue += change;
    // Ensure value doesn't go below a reasonable floor
    currentValue = Math.max(currentValue, startValue * 0.7);

    // Generate label based on timeframe
    let label = "";
    const date = new Date(now);

    if (timeframe === "1h") {
      date.setMinutes(now.getMinutes() - (points - i));
      label = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (timeframe === "24h") {
      date.setHours(now.getHours() - (points - i) / 24);
      label = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (timeframe === "7d") {
      date.setHours(now.getHours() - (points - i));
      if (i % 24 === 0) {
        label = date.toLocaleDateString([], { month: "short", day: "numeric" });
      }
    } else {
      date.setDate(now.getDate() - (points - i));
      label = date.toLocaleDateString([], { month: "short", day: "numeric" });
    }

    if (label) {
      data.push({
        value: currentValue,
        label,
      });
    }
  }

  // Filter to reduce number of points for rendering
  const maxPointsToRender = 100;
  if (data.length > maxPointsToRender) {
    const step = Math.floor(data.length / maxPointsToRender);
    return data.filter((_, i) => i % step === 0 || i === data.length - 1);
  }

  return data;
}
