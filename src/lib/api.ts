import type { CryptoData, NewsItem, NewsDetail } from "@/lib/types";

// Base URL for CoinGecko API
const API_BASE_URL = "https://api.coingecko.com/api/v3";

// Function to fetch cryptocurrency data from CoinGecko
export async function fetchCryptoData(
  timeframe: "24h" | "7d" | "30d" = "24h"
): Promise<CryptoData[]> {
  try {
    // Map timeframe to CoinGecko's price change percentage parameter
    const priceChangeParam =
      timeframe === "24h"
        ? "price_change_percentage_24h"
        : timeframe === "7d"
        ? "price_change_percentage_7d"
        : "price_change_percentage_30d";

    // Construct the API URL with necessary parameters
    const url = `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=${
      timeframe === "24h" ? "24h" : timeframe === "7d" ? "7d" : "30d"
    }`;

    // Fetch data from the API
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      // Add cache: 'no-store' to ensure fresh data on each request
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Transform the API response to match our CryptoData type
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      currentPrice: coin.current_price,
      priceChangePercentage:
        coin[`${priceChangeParam}`] || coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume: coin.total_volume,
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // Return empty array on error
    return [];
  }
}

// Mock data for news headlines
const mockNewsHeadlines: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin Surges Past $50,000 as Institutional Adoption Accelerates",
    summary:
      "Bitcoin has broken through the $50,000 barrier again as major financial institutions announce new crypto investment products.",
    source: "CryptoNews",
    sourceUrl: "https://example.com/crypto-news",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    categories: ["Bitcoin", "Markets", "Institutional"],
  },
  {
    id: "2",
    title:
      "Ethereum Completes Major Network Upgrade, Gas Fees Expected to Drop",
    summary:
      "The Ethereum network has successfully implemented its latest upgrade, promising reduced transaction costs and improved scalability.",
    source: "BlockchainInsider",
    sourceUrl: "https://example.com/blockchain-insider",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    categories: ["Ethereum", "Technology", "Development"],
  },
  {
    id: "3",
    title: "Regulatory Clarity: New Framework for Crypto Assets Announced",
    summary:
      "Government officials have unveiled a comprehensive regulatory framework for cryptocurrencies, providing much-needed clarity for investors and businesses.",
    source: "CryptoRegulation",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    categories: ["Regulation", "Government", "Policy"],
  },
  {
    id: "4",
    title: "DeFi Protocol Suffers $20M Exploit, Developers Working on Fix",
    summary:
      "A popular decentralized finance protocol has been exploited, with hackers making off with approximately $20 million in digital assets.",
    source: "DeFiAlert",
    sourceUrl: "https://example.com/defi-alert",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    categories: ["DeFi", "Security", "Hacks"],
  },
  {
    id: "5",
    title:
      "Major Bank Launches Crypto Custody Service for Institutional Clients",
    summary:
      "One of the world's largest banks has announced a new cryptocurrency custody service aimed at institutional investors, marking a significant step in mainstream adoption.",
    source: "FinancialTech",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    categories: ["Banking", "Institutional", "Adoption"],
  },
  {
    id: "6",
    title: "NFT Market Shows Signs of Recovery After Months of Decline",
    summary:
      "The non-fungible token market is showing signs of renewed activity after a prolonged downturn, with trading volumes increasing across major platforms.",
    source: "NFTWorld",
    sourceUrl: "https://example.com/nft-world",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    categories: ["NFT", "Markets", "Art"],
  },
];

// Mock data for news details
const mockNewsDetails: Record<string, NewsDetail> = {
  "1": {
    ...mockNewsHeadlines[0],
    content: `Bitcoin has surged past the $50,000 mark for the first time in several months, driven by increased institutional adoption and positive market sentiment.\n\nAnalysts attribute the price movement to several major financial institutions announcing new cryptocurrency investment products and services. These developments signal growing mainstream acceptance of digital assets as a legitimate investment class.\n\nJane Smith, Chief Crypto Strategist at Global Investments, commented: "This breakthrough represents more than just a price milestone. It reflects the maturing ecosystem and the increasing confidence institutional players have in the long-term value proposition of Bitcoin."\n\nTrading volumes have also increased significantly across major exchanges, with derivatives markets showing strong bullish sentiment. Open interest in Bitcoin futures has reached new highs, suggesting traders are positioning for continued upward momentum.\n\nHowever, some experts urge caution. "While the institutional narrative is compelling, investors should remain aware of regulatory uncertainties and potential market volatility," warned crypto economist John Davis.`,
    imageUrl: "/bitcoin-chart.png",
    tags: ["Bitcoin", "Institutional Investment", "Market Analysis"],
    relatedLinks: [
      {
        title: "Bitcoin Historical Price Data",
        url: "https://example.com/bitcoin-price-history",
      },
      {
        title: "Understanding Institutional Crypto Adoption",
        url: "https://example.com/institutional-crypto-adoption",
      },
    ],
  },
  "2": {
    ...mockNewsHeadlines[1],
    content: `The Ethereum network has successfully completed its latest major upgrade, aimed at reducing gas fees and improving network scalability.\n\nThe upgrade, which went live early this morning, introduces several technical improvements to the network's underlying infrastructure. Most notably, it optimizes the way transactions are processed and stored on the blockchain.\n\nEthereum developers have been working on this upgrade for months, with extensive testing on various testnets before today's mainnet implementation. The community response has been overwhelmingly positive, with many users already reporting lower transaction costs.\n\n"This upgrade represents a significant step forward in addressing one of Ethereum's most persistent challenges," said Maria Chen, a core Ethereum developer. "By improving gas efficiency, we're making the network more accessible to users and developers alike."\n\nInitial data suggests gas fees have decreased by approximately 30% on average, though this may fluctuate as network usage adjusts to the new conditions. The upgrade also lays groundwork for future improvements that will further enhance Ethereum's scalability.`,
    imageUrl: "/ethereum-network.png",
    tags: ["Ethereum", "Network Upgrade", "Gas Fees", "Scalability"],
    relatedLinks: [
      {
        title: "Ethereum Improvement Proposals (EIPs)",
        url: "https://example.com/ethereum-eips",
      },
      {
        title: "Understanding Gas Fees",
        url: "https://example.com/ethereum-gas-explained",
      },
    ],
  },
  "3": {
    ...mockNewsHeadlines[2],
    content: `Government officials have unveiled a comprehensive regulatory framework for cryptocurrencies, providing much-needed clarity for investors and businesses operating in the space.\n\nThe framework, announced yesterday, addresses several key areas including asset classification, investor protection, taxation, and anti-money laundering requirements. It represents the most detailed regulatory guidance on digital assets to date.\n\n"Our goal is to foster innovation while ensuring adequate consumer protection and market integrity," said Robert Johnson, head of the regulatory task force. "This framework strikes a balance that we believe will benefit all stakeholders in the ecosystem."\n\nThe new regulations classify cryptocurrencies into several categories, each with specific compliance requirements. Bitcoin and Ethereum have been classified as commodity-like digital assets, while certain tokens associated with specific projects will be treated more like securities.\n\nIndustry reaction has been mixed but generally positive. "While some compliance requirements will increase operational costs, the clarity this framework provides is invaluable for long-term business planning," noted Sarah Williams, CEO of a major cryptocurrency exchange.\n\nThe framework will be implemented in phases over the next 18 months, giving businesses time to adapt to the new requirements.`,
    imageUrl: "/cryptocurrency-regulation.png",
    tags: ["Regulation", "Compliance", "Policy"],
    relatedLinks: [
      {
        title: "Full Regulatory Framework Document",
        url: "https://example.com/crypto-regulatory-framework",
      },
      {
        title: "Compliance Guide for Crypto Businesses",
        url: "https://example.com/crypto-compliance-guide",
      },
    ],
  },
  "4": {
    ...mockNewsHeadlines[3],
    content: `A popular decentralized finance protocol has been exploited, with hackers making off with approximately $20 million in digital assets.\n\nThe attack, which occurred late last night, targeted a vulnerability in the protocol's smart contract code. Security researchers have identified the specific exploit, which involved manipulating the protocol's price oracle to execute a flash loan attack.\n\n"We are working around the clock to address the situation," said a spokesperson for the protocol's development team. "We've paused all contract interactions and are collaborating with security experts to recover funds and patch the vulnerability."\n\nThe team has already identified the wallets containing the stolen funds and is working with blockchain analytics firms and exchanges to track and potentially freeze the assets. They have also reached out to law enforcement agencies.\n\nThis incident highlights the ongoing security challenges facing the DeFi ecosystem, despite increasing maturity and adoption. It marks the third major exploit in the sector this year, bringing the total funds lost to hacks to approximately $50 million in 2023.\n\nThe protocol's governance token has fallen by 25% following news of the exploit, though some market analysts suggest this may represent an overreaction given the team's prompt response and the protocol's insurance fund, which may cover a portion of the losses.`,
    imageUrl: "/defi-security.png",
    tags: ["DeFi", "Security", "Exploit", "Smart Contracts"],
    relatedLinks: [
      {
        title: "Technical Analysis of the Exploit",
        url: "https://example.com/defi-exploit-analysis",
      },
      {
        title: "DeFi Security Best Practices",
        url: "https://example.com/defi-security-guide",
      },
    ],
  },
  "5": {
    ...mockNewsHeadlines[4],
    content: `One of the world's largest banks has announced a new cryptocurrency custody service aimed at institutional investors, marking a significant step in mainstream adoption.\n\nThe service, which will initially support Bitcoin and Ethereum, provides secure storage solutions specifically designed for institutional clients with regulatory and compliance requirements. The bank has partnered with several blockchain security firms to develop the custody infrastructure.\n\n"After extensive research and development, we're confident that our custody solution meets the rigorous security and compliance standards our institutional clients expect," said James Wilson, the bank's Head of Digital Asset Services.\n\nThe move comes as institutional interest in cryptocurrencies continues to grow, with many large investors seeking regulated channels to gain exposure to digital assets. The bank's entry into this space is seen as particularly significant given its conservative reputation and global influence.\n\nIndustry experts suggest this development could trigger a domino effect, with other major financial institutions launching similar services to remain competitive. "When a bank of this size and reputation enters the crypto space, it removes a significant psychological barrier for other institutions that have been watching from the sidelines," noted crypto analyst Patricia Lopez.\n\nThe custody service will launch next month for select clients, with a broader rollout planned for later this year.`,
    imageUrl: "/bank-cryptocurrency.png",
    tags: ["Banking", "Institutional", "Custody", "Adoption"],
    relatedLinks: [
      {
        title: "Institutional Crypto Custody Explained",
        url: "https://example.com/institutional-crypto-custody",
      },
      {
        title: "Banking Sector's Crypto Evolution",
        url: "https://example.com/banking-crypto-evolution",
      },
    ],
  },
  "6": {
    ...mockNewsHeadlines[5],
    content: `The non-fungible token (NFT) market is showing signs of renewed activity after a prolonged downturn, with trading volumes increasing across major platforms.\n\nData from several NFT marketplaces indicates a 40% increase in trading volume over the past month, reversing a trend of declining activity that began in late 2022. The recovery appears to be driven by a combination of new collections launching and renewed interest in established NFT projects.\n\n"We're seeing healthy signs of market maturation," said NFT analyst Michael Chen. "The focus has shifted from pure speculation to projects with genuine utility and community engagement."\n\nParticularly notable is the growth in gaming-related NFTs, which now account for approximately 35% of total trading volume. These assets, which provide in-game benefits or ownership rights, have proven more resilient than purely collectible NFTs.\n\nInstitutional interest in the NFT space is also returning, with several venture capital firms announcing new funds dedicated to NFT and metaverse investments. This includes a $100 million fund announced last week by a prominent Web3 investment group.\n\nDespite the positive indicators, overall market activity remains significantly below the peak levels seen during the 2021-2022 NFT boom. However, many in the industry view the current growth as more sustainable, built on stronger fundamentals rather than speculative excess.`,
    imageUrl: "/nft-marketplace-concept.png",
    tags: ["NFT", "Digital Art", "Collectibles", "Market Trends"],
    relatedLinks: [
      {
        title: "NFT Market Data Dashboard",
        url: "https://example.com/nft-market-data",
      },
      {
        title: "Evolution of NFT Use Cases",
        url: "https://example.com/nft-use-cases",
      },
    ],
  },
};

// Get all unique categories from news items
export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>();

  mockNewsHeadlines.forEach((item) => {
    item.categories.forEach((category) => {
      categoriesSet.add(category);
    });
  });

  return Array.from(categoriesSet).sort();
}

// Simulate API fetch with delay
export async function fetchNewsHeadlines(): Promise<NewsItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockNewsHeadlines;
}

export async function fetchNewsDetail(id: string): Promise<NewsDetail | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockNewsDetails[id] || null;
}
