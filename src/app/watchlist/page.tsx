import type { Metadata } from "next";
import WatchlistContainer from "@/components/WatchlistContainer";

export const metadata: Metadata = {
  title: "Watchlist | Crypto Dashboard",
  description: "Track your favorite cryptocurrencies in one place",
};

export default function WatchlistPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-[#ECECEC] mb-6 font-inter">
        Watchlist
      </h1>
      <WatchlistContainer />
    </main>
  );
}
