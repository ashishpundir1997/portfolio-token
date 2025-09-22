
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
					url: `/simple/price?ids=${ids.join(",")}&vs_currencies=usd&include_24hr_change=true&include_sparkline=true`,
				}),
			}),
	}),
});

export const { useSearchCoinsQuery, useGetTrendingCoinsQuery, useGetTokenPricesQuery } = coingeckoApi;
