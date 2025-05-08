import type { Metadata } from "next";
import LeaderboardClient from "@/components/LeaderboardClient";

export const metadata: Metadata = {
  title: "Crypto Leaderboard | Top Gainers & Losers",
  description:
    "Track the best and worst performing cryptocurrencies in real-time",
};

export default function LeaderboardPage() {
  return <LeaderboardClient />;
}
