"use client";

import { Badge } from "@/components/ui/badge";
import { useFilter } from "@/components/FilterContext";

export function FilterBadge() {
  const { searchQuery, priceRange, marketCapFilter, changeFilter } =
    useFilter();

  // Count active filters
  let activeFilters = 0;
  if (searchQuery) activeFilters++;
  if (priceRange.min || priceRange.max) activeFilters++;
  if (marketCapFilter !== "all") activeFilters++;
  if (changeFilter !== "all") activeFilters++;

  if (activeFilters === 0) return null;

  return (
    <Badge className="bg-[#00FFAB] text-[#1C1C1C] ml-2 font-jetbrains-mono">
      {activeFilters} active
    </Badge>
  );
}
