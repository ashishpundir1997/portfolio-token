import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchCoinsQuery, useGetTokenPricesQuery } from "../store/services/tokenApi";
import { addToken, removeToken, updateTokenHoldings, updateTokenPrice } from "../store/slices/watchlistSlice";
import type { WatchedToken } from "../store/slices/watchlistSlice";
import debounce from "lodash/debounce";
import type { RootState } from "../store/store";
import star from "../assets/icons/star.svg";
import PrimaryButton from "./common/PrimaryButton";
import plus from "../assets/icons/plus-mini.svg";
import OptionMenu from "./common/OptionMenu";


const WatchList: React.FC = () => {
  const dispatch = useDispatch();
  const watchedTokens = useSelector((state: RootState) => 
    Object.values(state.watchlist.tokens)) as WatchedToken[];
  const totalValue = useSelector((state: RootState) => state.watchlist.totalValue);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search term
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => {
      setSearchTerm(value.toLowerCase().trim());
    }, 300),
    []
  );

  // Fetch prices for watched tokens
  const tokenIds = watchedTokens.map((token) => token.id);
  const { data: prices } = useGetTokenPricesQuery(tokenIds, {
    skip: tokenIds.length === 0,
    pollingInterval: 60000 // Update every minute
  });

  // Update prices when data is received
  useEffect(() => {
    if (prices) {
      Object.entries(prices).forEach(([id, priceData]) => {
        dispatch(
          updateTokenPrice({
            tokenId: id,
            price: priceData.usd,
            change24h: priceData.usd_24h_change || 0,
            sparkline: priceData.sparkline_7d?.price || []
          })
        );
      });
    }
  }, [prices, dispatch]);

  const { data: searchResults, isLoading } = useSearchCoinsQuery(searchTerm, {
    skip: !isSearchOpen || searchTerm.length < 2,
  });

  const handleAddToWatchlist = (coin: { id: string; name: string; symbol: string; thumb: string }) => {
    // Add token to watchlist using Redux
    const newToken: WatchedToken = {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.thumb,
      holdings: 0,
      current_price: 0,
      price_change_percentage_24h: 0,
      sparkline_7d: [],
      last_updated: new Date().toISOString(),
    };
    
    dispatch(addToken(newToken));
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="rounded-[12px] w-full">
      {/* Header with Total Value and Add Token button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-[1px] w-[280px] h-[28px]">
            <img src={star} alt="watchlist" />
          <h2 className="text-2xl font-medium text-[#f4f4f5]">Watchlist</h2>
        
        </div>
      <PrimaryButton text="Add Token" icon={plus} radius="rounded-md" onClick={() => setIsSearchOpen(true)} />
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className=" rounded-lg p-6 max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Search Tokens</h3>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              placeholder="Search by token name..."
              className="w-full px-4 py-2 border rounded-lg mb-4"
              autoFocus
            />

            <div className="overflow-y-auto flex-1">
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="space-y-2">
                  {searchResults?.coins.map((coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToWatchlist(coin)}
                        className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Watchlist Table */}
      <div className="overflow-x-auto rounded-[12px] border border-[var(--alpha-white-alpha-8,#FFFFFF14)]">
        <table className="min-w-full  ">
          <thead className="bg-secondary h-[48px]">
            <tr>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Token</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">24h %</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Sparkline (7d)</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Holdings</th>
             
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Value</th>
        
            
              <th className="w-[48px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#FFFFFF14]">
            {watchedTokens.map((token) => (
              <tr key={token.id} className="hover:bg-[#FFFFFF08]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full" />
                    <div className="ml-3">
                        <div className="flex">
                             <p className="font-normal text-[13px] text-[#f4f4f5]">{token.name}</p>
                             <p className="font-normal text-[13px] text-text-secondary ml-1">({token.symbol.toUpperCase()})</p>
                        </div>
                     
                    </div>
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#f4f4f5]">
                    ${token.current_price?.toFixed(2) || '0.00'}
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm ${token.price_change_percentage_24h >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                    {token.price_change_percentage_24h?.toFixed(2) || '0.00'}%
                  </span>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-8 bg-[#27272A] rounded">
                    {/* Placeholder for sparkline chart */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {token.editingHoldings ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={token.holdings || ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          dispatch(updateTokenHoldings({ tokenId: token.id, holdings: value }));
                        }}
                        className="w-24 px-2 py-1 bg-[#27272A] border border-[#FFFFFF14] rounded text-[#f4f4f5]"
                        placeholder="0.00"
                        min="0"
                        step="any"
                        autoFocus
                      />
                      <button 
                        onClick={() => dispatch(updateTokenHoldings({ tokenId: token.id, editingHoldings: false }))}
                        className="text-[#22C55E] hover:text-[#16A34A] px-2 py-1"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-[#f4f4f5]">
                      {token.holdings?.toFixed(8) || '0.00000000'}
                    </div>
                  )}
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-[#f4f4f5]">
                    ${((token.holdings || 0) * token.current_price).toFixed(2)}
                  </div>
                </td>
              
              
                <td className="pr-4 py-4 whitespace-nowrap">
                  <OptionMenu
                    onEdit={() => dispatch(updateTokenHoldings({ tokenId: token.id, editingHoldings: true }))}
                    onDelete={() => dispatch(removeToken(token.id))}
                  />
                </td>
              </tr>
            ))}
            {watchedTokens.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-text-secondary">
                  No tokens in watchlist. Click "Add Token" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
