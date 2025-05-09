"use client";

import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilter } from "@/components/FilterContext";
import { FilterBadge } from "@/components/FilterBadge";
import type { SortKey } from "@/components/FilterContext";

export default function FilterBar() {
  const {
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
  } = useFilter();

  const handleSortChange = (value: string) => {
    setSortConfig({
      key: value as SortKey,
      direction: "descending", // Default to descending for most metrics (higher values first)
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setMarketCapFilter("all");
    setChangeFilter("all");
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery ||
    priceRange.min ||
    priceRange.max ||
    marketCapFilter !== "all" ||
    changeFilter !== "all";

  return (
    <div className="flex flex-col bg-[#2C3E50] p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#ECECEC]/50" />
          <Input
            placeholder="Search coins..."
            className="pl-8 bg-[#1C1C1C] border-none text-[#ECECEC] placeholder:text-[#ECECEC]/50 font-inter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-2.5 text-[#ECECEC]/50 hover:text-[#ECECEC]"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            className="border-[#00FFAB] text-[#00FFAB] hover:bg-[#00FFAB]/10 font-jetbrains-mono"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter
            <FilterBadge />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-[#00FFAB] text-[#00FFAB] hover:bg-[#00FFAB]/10 font-jetbrains-mono"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2C3E50] border-[#00FFAB]/20 text-[#ECECEC]">
              <DropdownMenuRadioGroup
                value={sortConfig.key}
                onValueChange={handleSortChange}
              >
                <DropdownMenuRadioItem
                  value="market_cap_rank"
                  className="focus:bg-[#00FFAB]/10 focus:text-[#00FFAB]"
                >
                  Rank
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="name"
                  className="focus:bg-[#00FFAB]/10 focus:text-[#00FFAB]"
                >
                  Name
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="current_price"
                  className="focus:bg-[#00FFAB]/10 focus:text-[#00FFAB]"
                >
                  Price
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="price_change_percentage_24h"
                  className="focus:bg-[#00FFAB]/10 focus:text-[#00FFAB]"
                >
                  24h Change
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="market_cap"
                  className="focus:bg-[#00FFAB]/10 focus:text-[#00FFAB]"
                >
                  Market Cap
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="total_volume"
                  className="focus:bg-[#00FFAB]/10 focus:text-[#00FFAB]"
                >
                  24h Volume
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filterOpen && (
        <div className="w-full mt-4 border-t border-[#ECECEC]/10 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-[#ECECEC]/70 mb-1 block font-inter">
                Price Range
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Min"
                  className="bg-[#1C1C1C] border-none text-[#ECECEC] placeholder:text-[#ECECEC]/50 font-jetbrains-mono"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  type="number"
                  min="0"
                />
                <Input
                  placeholder="Max"
                  className="bg-[#1C1C1C] border-none text-[#ECECEC] placeholder:text-[#ECECEC]/50 font-jetbrains-mono"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  type="number"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#ECECEC]/70 mb-1 block font-inter">
                Market Cap
              </label>
              <select
                className="w-full bg-[#1C1C1C] border-none text-[#ECECEC] rounded-md h-10 px-3 font-inter"
                value={marketCapFilter}
                onChange={(e) => setMarketCapFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="large">Large Cap (&gt;$10B)</option>
                <option value="mid">Mid Cap ($1B-$10B)</option>
                <option value="small">Small Cap (&lt;$1B)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#ECECEC]/70 mb-1 block font-inter">
                24h Change
              </label>
              <select
                className="w-full bg-[#1C1C1C] border-none text-[#ECECEC] rounded-md h-10 px-3 font-inter"
                value={changeFilter}
                onChange={(e) => setChangeFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-500/10 font-jetbrains-mono"
                onClick={resetFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
