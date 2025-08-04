"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getAllCategories } from "@/lib/api";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const allCategories = getAllCategories();
    setCategories(allCategories);
    setIsLoading(false);
  }, []);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
  };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 mb-6 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 bg-[#2C3E50] rounded-full w-20"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-[#ECECEC] font-jetbrains-mono">
          Filter by Category
        </h2>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#00FFAB] hover:text-[#00FFAB]/80 flex items-center font-jetbrains-mono"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              "border border-[#2C3E50] font-jetbrains-mono",
              selectedCategories.includes(category)
                ? "bg-[#00FFAB] text-[#1C1C1C] border-[#00FFAB]"
                : "bg-[#2C3E50] text-[#ECECEC] hover:bg-[#2C3E50]/80"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
