"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ChevronDown, Search, Star } from "lucide-react";

// Sample crypto assets data
const cryptoAssets = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    amount: 0.42,
    value: 12450.32,
    price: 29643.62,
    change24h: 2.34,
    allocation: 50.44,
    favorite: true,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    amount: 3.75,
    value: 7865.25,
    price: 2097.4,
    change24h: 3.56,
    allocation: 31.86,
    favorite: true,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    amount: 45.2,
    value: 2345.88,
    price: 51.9,
    change24h: -1.23,
    allocation: 9.5,
    favorite: false,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    amount: 2500,
    value: 1025.0,
    price: 0.41,
    change24h: -0.78,
    allocation: 4.15,
    favorite: false,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    amount: 150,
    value: 998.97,
    price: 6.66,
    change24h: 1.45,
    allocation: 4.05,
    favorite: false,
  },
];

type SortField = "name" | "value" | "price" | "change24h" | "allocation";
type SortDirection = "asc" | "desc";

export default function PortfolioAssets() {
  const [assets, setAssets] = useState<typeof cryptoAssets>([]);
  const [filteredAssets, setFilteredAssets] = useState<typeof cryptoAssets>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: "value",
    direction: "desc",
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setAssets(cryptoAssets);
      setFilteredAssets(cryptoAssets);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter assets based on search query
    const filtered = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort filtered assets
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (sortConfig.field === "name") {
        return sortConfig.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      return sortConfig.direction === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    setFilteredAssets(sorted);
  }, [searchQuery, assets, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleFavorite = (id: string) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id ? { ...asset, favorite: !asset.favorite } : asset
      )
    );
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) return null;

    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <Card className="bg-[#2C3E50] border-none shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg text-[#ECECEC] font-inter">
            Your Assets
          </CardTitle>
          <div className="w-full sm:w-auto flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#ECECEC] opacity-70" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-[#1C1C1C] border-none text-[#ECECEC] placeholder:text-[#ECECEC] placeholder:opacity-50 font-inter"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center px-3 py-2 bg-[#1C1C1C] rounded-md text-[#ECECEC] font-inter">
                Filter
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1C1C1C] border-none text-[#ECECEC]">
                <DropdownMenuItem
                  onClick={() => setFilteredAssets([...assets])}
                >
                  All Assets
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setFilteredAssets(assets.filter((a) => a.favorite))
                  }
                >
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setFilteredAssets(assets.filter((a) => a.change24h > 0))
                  }
                >
                  Gainers
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setFilteredAssets(assets.filter((a) => a.change24h < 0))
                  }
                >
                  Losers
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-[#1C1C1C] rounded w-full"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-[#1C1C1C] rounded w-full"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#1C1C1C] hover:bg-transparent">
                  <TableHead className="text-[#ECECEC] font-inter w-10"></TableHead>
                  <TableHead
                    className="text-[#ECECEC] font-inter cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Asset
                      <SortIcon field="name" />
                    </div>
                  </TableHead>
                  <TableHead className="text-[#ECECEC] font-inter">
                    Holdings
                  </TableHead>
                  <TableHead
                    className="text-[#ECECEC] font-inter text-right cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center justify-end">
                      Price
                      <SortIcon field="price" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-[#ECECEC] font-inter text-right cursor-pointer"
                    onClick={() => handleSort("value")}
                  >
                    <div className="flex items-center justify-end">
                      Value
                      <SortIcon field="value" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-[#ECECEC] font-inter text-right cursor-pointer"
                    onClick={() => handleSort("change24h")}
                  >
                    <div className="flex items-center justify-end">
                      24h
                      <SortIcon field="change24h" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-[#ECECEC] font-inter text-right cursor-pointer"
                    onClick={() => handleSort("allocation")}
                  >
                    <div className="flex items-center justify-end">
                      Allocation
                      <SortIcon field="allocation" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-[#ECECEC] font-inter"
                    >
                      No assets found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
                    <TableRow
                      key={asset.id}
                      className="border-b border-[#1C1C1C] hover:bg-[#1C1C1C]/30"
                    >
                      <TableCell className="font-medium">
                        <button
                          onClick={() => toggleFavorite(asset.id)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              asset.favorite
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-[#ECECEC] opacity-50"
                            }`}
                          />
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#1C1C1C] flex items-center justify-center mr-2 text-xs font-bold font-jetbrains-mono">
                            {asset.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium text-[#ECECEC] font-inter">
                              {asset.name}
                            </div>
                            <div className="text-xs text-[#ECECEC] opacity-70 font-jetbrains-mono">
                              {asset.symbol}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-[#ECECEC] font-jetbrains-mono">
                          {asset.amount.toLocaleString("en-US", {
                            maximumFractionDigits: 8,
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-jetbrains-mono text-[#ECECEC]">
                        $
                        {asset.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right font-jetbrains-mono text-[#ECECEC]">
                        $
                        {asset.value.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell
                        className={`text-right font-jetbrains-mono ${
                          asset.change24h >= 0
                            ? "text-[#00FFAB]"
                            : "text-red-500"
                        }`}
                      >
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="relative w-full h-4 bg-[#1C1C1C] rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#00FFAB]"
                            style={{ width: `${asset.allocation}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-[#ECECEC] mt-1 font-jetbrains-mono">
                          {asset.allocation.toFixed(2)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
