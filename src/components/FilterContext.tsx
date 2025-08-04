"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CoinData } from "@/lib/crypto-actions";

export type SortDirection = "ascending" | "descending";
export type SortKey =
  | "market_cap_rank"
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap"
  | "total_volume";

export interface FilterContextType {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Sorting
  sortConfig: { key: SortKey; direction: SortDirection };
  setSortConfig: (config: { key: SortKey; direction: SortDirection }) => void;

  // Filters
  priceRange: { min: string; max: string };
  setPriceRange: (range: { min: string; max: string }) => void;

  marketCapFilter: string;
  setMarketCapFilter: (filter: string) => void;

  changeFilter: string;
  setChangeFilter: (filter: string) => void;

  // Filter visibility
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;

  // Apply filters to data
  applyFilters: (
    coins: (CoinData & { favorite: boolean })[]
  ) => (CoinData & { favorite: boolean })[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: "market_cap_rank",
    direction: "ascending",
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [marketCapFilter, setMarketCapFilter] = useState("all");
  const [changeFilter, setChangeFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const applyFilters = (coins: (CoinData & { favorite: boolean })[]) => {
    return coins
      .filter((coin) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            coin.name.toLowerCase().includes(query) ||
            coin.symbol.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .filter((coin) => {
        // Price range filter
        const min = priceRange.min ? Number.parseFloat(priceRange.min) : 0;
        const max = priceRange.max
          ? Number.parseFloat(priceRange.max)
          : Number.POSITIVE_INFINITY;
        return coin.current_price >= min && coin.current_price <= max;
      })
      .filter((coin) => {
        // Market cap filter
        switch (marketCapFilter) {
          case "large":
            return coin.market_cap >= 10_000_000_000; // $10B+
          case "mid":
            return (
              coin.market_cap >= 1_000_000_000 &&
              coin.market_cap < 10_000_000_000
            ); // $1B-$10B
          case "small":
            return coin.market_cap < 1_000_000_000; // <$1B
          default:
            return true;
        }
      })
      .filter((coin) => {
        // 24h change filter
        switch (changeFilter) {
          case "positive":
            return coin.price_change_percentage_24h > 0;
          case "negative":
            return coin.price_change_percentage_24h < 0;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        // Sorting
        let aValue: any = a[sortConfig.key];
        let bValue: any = b[sortConfig.key];

        // Special case for name sorting
        if (sortConfig.key === "name") {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        }

        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
  };

  const value = {
    searchQuery,
    setSearchQuery,
    sortConfig,
    setSortConfig,
    priceRange,
    setPriceRange,
    marketCapFilter,
    setMarketCapFilter,
    changeFilter,
    setChangeFilter,
    filterOpen,
    setFilterOpen,
    applyFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
