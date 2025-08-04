"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchNewsDetail } from "@/lib/api";
import type { NewsDetail as NewsDetailType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function NewsDetail({ id }: { id: string }) {
  const [news, setNews] = useState<NewsDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNewsDetail = async () => {
      try {
        const newsData = await fetchNewsDetail(id);
        setNews(newsData);
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getNewsDetail();
  }, [id]);

  if (isLoading) {
    return (
      <Card className="bg-[#2C3E50] border-none">
        <CardContent className="p-6 animate-pulse">
          <div className="h-8 bg-[#1C1C1C] rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-[#1C1C1C] rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-[#1C1C1C] rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-[#1C1C1C] rounded"></div>
            <div className="h-4 bg-[#1C1C1C] rounded"></div>
            <div className="h-4 bg-[#1C1C1C] rounded"></div>
            <div className="h-4 bg-[#1C1C1C] rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!news) {
    return (
      <Card className="bg-[#2C3E50] border-none">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-[#ECECEC] mb-2">
            News article not found
          </h2>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#2C3E50] border-none">
      <CardContent className="p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#ECECEC] mb-2 font-inter">
          {news.title}
        </h1>

        {news.categories && news.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {news.categories.map((category) => (
              <Link
                href={`/news?category=${encodeURIComponent(category)}`}
                key={category}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#1C1C1C] text-[#ECECEC] hover:bg-[#1C1C1C]/80 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#ECECEC]/70 font-jetbrains-mono">
          <div className="flex items-center">
            <span className="font-medium text-[#00FFAB]">{news.source}</span>
            {news.sourceUrl && (
              <button
                type="button"
                onClick={() =>
                  window.open(news.sourceUrl, "_blank", "noopener,noreferrer")
                }
                className="ml-1 inline-flex items-center hover:text-[#00FFAB] bg-transparent border-none p-0 cursor-pointer"
              >
                <ExternalLink className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={news.publishedAt}>
              {formatDistanceToNow(new Date(news.publishedAt), {
                addSuffix: true,
              })}
            </time>
          </div>
        </div>

        {news.imageUrl && (
          <div className="mb-6 relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image
              src={news.imageUrl || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none font-inter">
          {news.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {news.tags && news.tags.length > 0 && (
          <div className="mt-8 flex items-center flex-wrap gap-2">
            <Tag className="h-4 w-4 text-[#00FFAB] mr-2" />
            {news.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[#1C1C1C] text-[#ECECEC] hover:bg-[#1C1C1C]/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {news.relatedLinks && news.relatedLinks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#ECECEC] mb-2 font-inter">
              Related Links
            </h3>
            <ul className="space-y-2">
              {news.relatedLinks.map((link, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(link.url, "_blank", "noopener,noreferrer")
                    }
                    className="text-[#00FFAB] hover:text-[#00FFAB]/80 inline-flex items-center font-inter bg-transparent border-none p-0 cursor-pointer"
                  >
                    {link.title}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
