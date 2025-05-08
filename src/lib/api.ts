import type { CryptoData } from "@/lib/types";

// Base URL for CoinGecko API
const API_BASE_URL = "https://api.coingecko.com/api/v3";

// Function to fetch cryptocurrency data from CoinGecko
export async function fetchCryptoData(
  timeframe: "24h" | "7d" | "30d" = "24h"
): Promise<CryptoData[]> {
  try {
    // Map timeframe to CoinGecko's price change percentage parameter
    const priceChangeParam =
      timeframe === "24h"
        ? "price_change_percentage_24h"
        : timeframe === "7d"
        ? "price_change_percentage_7d"
        : "price_change_percentage_30d";

    // Construct the API URL with necessary parameters
    const url = `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=${
      timeframe === "24h" ? "24h" : timeframe === "7d" ? "7d" : "30d"
    }`;

    // Fetch data from the API
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      // Add cache: 'no-store' to ensure fresh data on each request
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Transform the API response to match our CryptoData type
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      currentPrice: coin.current_price,
      priceChangePercentage:
        coin[`${priceChangeParam}`] || coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // Return empty array on error
    return [];
  }
}
