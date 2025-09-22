import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface WatchedToken {
  id: string;
  name: string;
  symbol: string;
  image: string;
  holdings: number;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_7d: number[];
  last_updated: string;
  editingHoldings?: boolean;
}

export interface WatchlistState {
  tokens: { [key: string]: WatchedToken };
  totalValue: number;
}

// Initial state
const initialState: WatchlistState = {
  tokens: {},
  totalValue: 0,
};

// Create the slice
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<WatchedToken>) => {
      const token = action.payload;
      state.tokens[token.id] = {
        ...token,
        editingHoldings: false
      };
      state.totalValue = Object.values(state.tokens).reduce(
        (total, token) => total + (token.holdings * token.current_price),
        0
      );
    },
    removeToken: (state, action: PayloadAction<string>) => {
      const tokenId = action.payload;
      delete state.tokens[tokenId];
      state.totalValue = Object.values(state.tokens).reduce(
        (total, token) => total + (token.holdings * token.current_price),
        0
      );
    },
    updateTokenHoldings: (
      state,
      action: PayloadAction<{ 
        tokenId: string; 
        holdings?: number; 
        editingHoldings?: boolean;
      }>
    ) => {
      const { tokenId, holdings, editingHoldings } = action.payload;
      if (state.tokens[tokenId]) {
        if (holdings !== undefined) {
          state.tokens[tokenId].holdings = holdings;
          state.totalValue = Object.values(state.tokens).reduce(
            (total, token) => total + (token.holdings * token.current_price),
            0
          );
        }
        if (editingHoldings !== undefined) {
          state.tokens[tokenId].editingHoldings = editingHoldings;
        }
      }
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{
        tokenId: string;
        price: number;
        change24h: number;
        sparkline?: number[];
      }>
    ) => {
      const { tokenId, price, change24h, sparkline } = action.payload;
      if (state.tokens[tokenId]) {
        state.tokens[tokenId].current_price = price;
        state.tokens[tokenId].price_change_percentage_24h = change24h;
        if (sparkline) {
          state.tokens[tokenId].sparkline_7d = sparkline;
        }
        state.tokens[tokenId].last_updated = new Date().toISOString();
        state.totalValue = Object.values(state.tokens).reduce(
          (total, token) => total + (token.holdings * token.current_price),
          0
        );
      }
    },
  },
});

// Action creators
export const { addToken, removeToken, updateTokenHoldings, updateTokenPrice } = 
  watchlistSlice.actions;

// Selectors
export const selectWatchedTokens = (state: { watchlist: WatchlistState }) => 
  Object.values(state.watchlist.tokens);

export const selectTotalValue = (state: { watchlist: WatchlistState }) => 
  state.watchlist.totalValue;

// Export the reducer
export default watchlistSlice.reducer;