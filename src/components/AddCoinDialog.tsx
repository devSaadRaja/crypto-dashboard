"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Coin } from "@/components/WatchlistContainer";

interface AddCoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCoin: (coin: Coin) => void;
}

export default function AddCoinDialog({
  open,
  onOpenChange,
  onAddCoin,
}: AddCoinDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch coins when dialog opens
  useEffect(() => {
    if (open) {
      fetchCoins();
    }
  }, [open]);

  // Filter coins based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCoins(coins);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredCoins(
        coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(query) ||
            coin.symbol.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, coins]);

  const fetchCoins = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (coins.length === 0) {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch coins");
        }

        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
      setError("Failed to load coins. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCoin = (coin: Coin) => {
    onAddCoin(coin);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#2C3E50] border-none text-[#ECECEC]">
        <DialogHeader>
          <DialogTitle className="text-[#ECECEC] font-inter">
            Add Coin to Watchlist
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#ECECEC]/50" />
          <Input
            type="search"
            placeholder="Search coins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-[#1C1C1C] border-[#1C1C1C] text-[#ECECEC] placeholder:text-[#ECECEC]/50 focus-visible:ring-[#00FFAB] font-inter"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#00FFAB]" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400 font-inter">
            <p>{error}</p>
            <Button
              onClick={fetchCoins}
              variant="outline"
              className="mt-4 border-[#00FFAB] text-[#00FFAB] hover:bg-[#00FFAB] hover:text-[#1C1C1C]"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            {filteredCoins.length > 0 ? (
              <div className="space-y-2">
                {filteredCoins.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-[#1C1C1C] cursor-pointer"
                    onClick={() => handleAddCoin(coin)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image || "/placeholder.svg"}
                        alt={coin.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-[#ECECEC] font-inter">
                          {coin.name}
                        </p>
                        <p className="text-sm text-[#ECECEC]/60 font-jetbrains-mono">
                          {coin.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#ECECEC] font-jetbrains-mono">
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h >= 0
                            ? "text-[#00FFAB]"
                            : "text-red-500"
                        } font-jetbrains-mono`}
                      >
                        {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#ECECEC]/70 font-inter">
                No coins found matching "{searchQuery}"
              </div>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
