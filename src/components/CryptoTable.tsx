"use client";

import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PriceChart } from "@/components/PriceChart2";
import type { CoinData } from "@/lib/crypto-actions";
import { useFilter } from "@/components/FilterContext";

interface CryptoTableProps {
  initialCoins: CoinData[];
}

export default function CryptoTable({ initialCoins }: CryptoTableProps) {
  const [coins, setCoins] = useState<(CoinData & { favorite: boolean })[]>(
    initialCoins.map((coin) => ({ ...coin, favorite: false }))
  );

  const { sortConfig, setSortConfig, applyFilters } = useFilter();

  // Load favorites from localStorage on client side
  useEffect(() => {
    const storedFavorites = localStorage.getItem("cryptoFavorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites) as string[];
      setCoins((prevCoins) =>
        prevCoins.map((coin) => ({
          ...coin,
          favorite: favorites.includes(coin.id),
        }))
      );
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setCoins((prevCoins) => {
      const newCoins = prevCoins.map((coin) =>
        coin.id === id ? { ...coin, favorite: !coin.favorite } : coin
      );

      // Save favorites to localStorage
      const favorites = newCoins
        .filter((coin) => coin.favorite)
        .map((coin) => coin.id);
      localStorage.setItem("cryptoFavorites", JSON.stringify(favorites));

      return newCoins;
    });
  };

  const formatNumber = (num: number, digits = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(digits)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(digits)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(digits)}K`;
    return `$${num.toFixed(digits)}`;
  };

  const handleSort = (key: string) => {
    let direction = sortConfig.direction;
    if (sortConfig.key === key) {
      // Toggle direction if clicking the same column
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    } else {
      // Default to ascending for rank and name, descending for everything else
      direction =
        key === "market_cap_rank" || key === "name"
          ? "ascending"
          : "descending";
    }

    setSortConfig({
      key: key as any,
      direction,
    });
  };

  // Apply all filters and sorting
  const filteredCoins = applyFilters(coins);

  // Show a message when no coins match the filters
  const noResults = filteredCoins.length === 0;

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader className="bg-[#2C3E50]">
          <TableRow>
            <TableHead className="w-[50px] text-[#ECECEC] font-jetbrains-mono"></TableHead>
            <TableHead
              className="w-[50px] text-[#ECECEC] font-jetbrains-mono cursor-pointer"
              onClick={() => handleSort("market_cap_rank")}
            >
              <div className="flex items-center">
                #
                {sortConfig.key === "market_cap_rank" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-[#ECECEC] font-jetbrains-mono cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortConfig.key === "name" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-right text-[#ECECEC] font-jetbrains-mono cursor-pointer"
              onClick={() => handleSort("current_price")}
            >
              <div className="flex items-center justify-end">
                Price
                {sortConfig.key === "current_price" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-right text-[#ECECEC] font-jetbrains-mono hidden md:table-cell cursor-pointer"
              onClick={() => handleSort("price_change_percentage_24h")}
            >
              <div className="flex items-center justify-end">
                24h %
                {sortConfig.key === "price_change_percentage_24h" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-right text-[#ECECEC] font-jetbrains-mono hidden lg:table-cell cursor-pointer"
              onClick={() => handleSort("market_cap")}
            >
              <div className="flex items-center justify-end">
                Market Cap
                {sortConfig.key === "market_cap" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-right text-[#ECECEC] font-jetbrains-mono hidden lg:table-cell cursor-pointer"
              onClick={() => handleSort("total_volume")}
            >
              <div className="flex items-center justify-end">
                Volume (24h)
                {sortConfig.key === "total_volume" && (
                  <span className="ml-1">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead className="text-right text-[#ECECEC] font-jetbrains-mono hidden md:table-cell">
              Last 7 Days
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {noResults ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-[#ECECEC]/70 font-inter"
              >
                No cryptocurrencies match your filters
              </TableCell>
            </TableRow>
          ) : (
            filteredCoins.map((coin) => (
              <TableRow
                key={coin.id}
                className="border-b border-[#2C3E50]/30 hover:bg-[#2C3E50]/20"
              >
                <TableCell>
                  <button
                    onClick={() => toggleFavorite(coin.id)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        coin.favorite
                          ? "text-[#00FFAB] fill-[#00FFAB]"
                          : "text-[#ECECEC]/30"
                      }`}
                    />
                  </button>
                </TableCell>
                <TableCell className="font-jetbrains-mono">
                  {coin.market_cap_rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <img
                      src={
                        coin.image ||
                        `/placeholder.svg?height=24&width=24&query=${coin.name} cryptocurrency logo`
                      }
                      alt={coin.name}
                      className="h-6 w-6 mr-2 rounded-full bg-[#1C1C1C]"
                      onError={(e) => {
                        // If the image fails to load, replace with a placeholder
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite error loop
                        target.src = `/placeholder.svg?height=24&width=24&query=${coin.name} logo`;
                      }}
                    />
                    <div>
                      <div className="font-medium font-inter">{coin.name}</div>
                      <div className="text-xs text-[#ECECEC]/70 font-jetbrains-mono">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-jetbrains-mono">
                  $
                  {coin.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
                </TableCell>
                <TableCell
                  className={`text-right hidden md:table-cell font-jetbrains-mono ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-[#00FFAB]"
                      : "text-red-500"
                  }`}
                >
                  <div className="flex items-center justify-end">
                    {coin.price_change_percentage_24h >= 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell font-jetbrains-mono">
                  {formatNumber(coin.market_cap, 2)}
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell font-jetbrains-mono">
                  {formatNumber(coin.total_volume, 2)}
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  <div className="h-10 w-24 ml-auto">
                    <PriceChart
                      data={coin.sparkline_in_7d?.price || []}
                      color={
                        coin.price_change_percentage_24h >= 0
                          ? "#00FFAB"
                          : "#ef4444"
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
