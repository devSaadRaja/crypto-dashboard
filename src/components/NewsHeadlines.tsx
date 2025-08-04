"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchNewsHeadlines } from "@/lib/api";
import type { NewsItem } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";

interface NewsHeadlinesProps {
  initialCategory?: string;
}

export default function NewsHeadlines({ initialCategory }: NewsHeadlinesProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchNewsHeadlines();
        setNews(newsData);
        setFilteredNews(newsData);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredNews(news);
    } else {
      setFilteredNews(
        news.filter((item) =>
          item.categories.some((category) =>
            selectedCategories.includes(category)
          )
        )
      );
    }
  }, [selectedCategories, news]);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-[#2C3E50] rounded-full w-20"></div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-[#2C3E50] border-none">
              <CardContent className="p-0">
                <div className="p-4 animate-pulse">
                  <div className="h-4 bg-[#1C1C1C] rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#1C1C1C] rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-[#1C1C1C] rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      {filteredNews.length === 0 ? (
        <div className="bg-[#2C3E50] rounded-lg p-8 text-center">
          <p className="text-[#ECECEC] mb-2">
            No news articles match your selected filters.
          </p>
          <button
            onClick={() => setSelectedCategories([])}
            className="text-[#00FFAB] hover:text-[#00FFAB]/80 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id}>
              <Card className="bg-[#2C3E50] border-none hover:bg-[#2C3E50]/80 transition-colors h-full">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold text-[#ECECEC] mb-2 font-inter line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-[#ECECEC]/70 mb-4 line-clamp-3 font-inter">
                    {item.summary}
                  </p>

                  {item.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.categories.map((category) => (
                        <span
                          key={category}
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            selectedCategories.includes(category)
                              ? "bg-[#00FFAB] text-[#1C1C1C]"
                              : "bg-[#1C1C1C] text-[#ECECEC]"
                          )}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-sm text-[#00FFAB] font-jetbrains-mono">
                      <span>{item.source}</span>
                      {item.sourceUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(
                              item.sourceUrl,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="ml-1 inline-flex items-center hover:text-[#00FFAB]/80 bg-transparent border-none p-0 cursor-pointer"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-[#ECECEC]/50 font-jetbrains-mono">
                        {formatDistanceToNow(new Date(item.publishedAt), {
                          addSuffix: true,
                        })}
                      </span>
                      <ChevronRight className="ml-1 h-4 w-4 text-[#00FFAB]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
