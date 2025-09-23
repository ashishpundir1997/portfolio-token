
import { createApi } from "@reduxjs/toolkit/query/react";
import type { TokenSearchResult, TrendingTokensResponse, TokenPriceData } from "../../types";

// CoinGecko API (no auth required)
export const coingeckoApi = createApi({
	reducerPath: "coingeckoApi",
	baseQuery: async ({ url }: { url: string }) => {
		const response = await fetch(`https://api.coingecko.com/api/v3${url}`);
		const data = await response.json();
		return { data };
	},
	endpoints: (builder) => ({
			searchCoins: builder.query<{ coins: TokenSearchResult[] }, string>({
				query: (searchTerm) => ({
					url: `/search?query=${encodeURIComponent(searchTerm)}`,
				}),
			}),
			getTrendingCoins: builder.query<TrendingTokensResponse, void>({
				query: () => ({
					url: "/search/trending",
				}),
			}),
		getTokenPrices: builder.query<Record<string, TokenPriceData>, string[]>({
  query: (ids) => ({
    url: `/coins/markets?vs_currency=usd&ids=${ids.join(",")}&sparkline=true`,
  }),
  transformResponse: (response: any[]) => {
    const transformed: Record<string, TokenPriceData> = {};
    response.forEach((token) => {
      transformed[token.id] = {
        usd: token.current_price,
        usd_24h_change: token.price_change_percentage_24h ?? 0,
       sparkline_7d: token.sparkline_in_7d?.price ?? [],
      };
    });
    return transformed;
  },
}),


	}),
});

export const { useSearchCoinsQuery, useGetTrendingCoinsQuery, useGetTokenPricesQuery } = coingeckoApi;
