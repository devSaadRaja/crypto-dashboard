"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WatchlistTable from "./WatchlistTable";
import AddCoinDialog from "./AddCoinDialog";
import { toast } from "react-hot-toast";

// Define the coin type
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

export default function WatchlistContainer() {
  const [watchlist, setWatchlist] = useState<Coin[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("crypto-watchlist");
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error("Failed to parse watchlist:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("crypto-watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, isLoading]);

  // Add a coin to the watchlist
  const addCoin = (coin: Coin) => {
    if (watchlist.some((item) => item.id === coin.id)) {
      toast.error(`${coin.name} is already in your watchlist.`);
      return;
    }

    setWatchlist((prev) => [...prev, coin]);
    toast.success(`${coin.name} has been added to your watchlist.`);
  };

  // Remove a coin from the watchlist
  const removeCoin = (coinId: string) => {
    const coinToRemove = watchlist.find((coin) => coin.id === coinId);
    setWatchlist((prev) => prev.filter((coin) => coin.id !== coinId));

    if (coinToRemove) {
      toast.success(
        `${coinToRemove.name} has been removed from your watchlist.`
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[#ECECEC] font-inter">
          Your Tracked Coins
        </h2>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#2C3E50] hover:bg-[#00FFAB] hover:text-[#1C1C1C] text-[#ECECEC]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Coin
        </Button>
      </div>

      {isLoading ? (
        <Card className="p-8 bg-[#2C3E50] border-none">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#00FFAB]" />
          </div>
        </Card>
      ) : watchlist.length > 0 ? (
        <WatchlistTable coins={watchlist} onRemove={removeCoin} />
      ) : (
        <Card className="p-8 text-center bg-[#2C3E50] border-none">
          <p className="text-[#ECECEC] mb-4 font-inter">
            Your watchlist is empty.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#00FFAB] text-[#1C1C1C] hover:bg-[#00FFAB]/80"
          >
            Add your first coin
          </Button>
        </Card>
      )}

      <AddCoinDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCoin={addCoin}
      />
    </div>
  );
}
