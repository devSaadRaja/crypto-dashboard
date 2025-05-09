"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Coin } from "@/components/WatchlistContainer";
import { formatCurrencyShort } from "@/lib/utils";

interface WatchlistTableProps {
  coins: Coin[];
  onRemove: (id: string) => void;
}

type SortField =
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap";
type SortDirection = "asc" | "desc";

export default function WatchlistTable({
  coins,
  onRemove,
}: WatchlistTableProps) {
  const [sortField, setSortField] = useState<SortField>("market_cap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  return (
    <Card className="overflow-hidden bg-[#2C3E50] border-none">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#1C1C1C]">
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="text-[#ECECEC] hover:text-[#00FFAB] font-jetbrains-mono"
                >
                  Coin
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("current_price")}
                  className="text-[#ECECEC] hover:text-[#00FFAB] font-jetbrains-mono"
                >
                  Price
                  {sortField === "current_price" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price_change_percentage_24h")}
                  className="text-[#ECECEC] hover:text-[#00FFAB] font-jetbrains-mono"
                >
                  24h %
                  {sortField === "price_change_percentage_24h" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("market_cap")}
                  className="text-[#ECECEC] hover:text-[#00FFAB] font-jetbrains-mono"
                >
                  Market Cap
                  {sortField === "market_cap" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCoins.map((coin) => (
              <TableRow key={coin.id} className="hover:bg-[#1C1C1C]/50">
                <TableCell>
                  <img
                    src={coin.image || "/placeholder.svg"}
                    alt={coin.name}
                    className="ml-1 h-8 w-8 rounded-full"
                  />
                </TableCell>
                <TableCell className="font-medium text-[#ECECEC] font-inter">
                  <div className="flex flex-col">
                    <span>{coin.name}</span>
                    <span className="text-sm text-[#ECECEC]/60 font-jetbrains-mono">
                      {coin.symbol.toUpperCase()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-[#ECECEC] font-jetbrains-mono">
                  {formatCurrencyShort(coin.current_price)}
                </TableCell>
                <TableCell
                  className={`font-jetbrains-mono ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-[#00FFAB]"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell className="hidden md:table-cell text-[#ECECEC] font-jetbrains-mono">
                  {formatCurrencyShort(coin.market_cap)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(coin.id)}
                    className="text-[#ECECEC] hover:text-red-500 hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove {coin.name}</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
