export interface TokenPriceData {
  usd: number;
  usd_24h_change?: number;
  sparkline_7d?: number[];
}

export interface TokenSearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank?: number;
  thumb: string;
  large: string;
}

export interface TrendingTokensResponse {
  coins: Array<{
    item: TokenSearchResult;
  }>;
}