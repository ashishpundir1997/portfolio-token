import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTokenPricesQuery } from "../store/services/tokenApi";
import { addToken, removeToken, updateTokenHoldings, updateTokenPrice } from "../store/slices/watchlistSlice";
import type { WatchedToken } from "../store/slices/watchlistSlice";
import type { RootState } from "../store/store";
import star from "../assets/icons/star.svg";
import PrimaryButton from "./common/PrimaryButton";
import plus from "../assets/icons/plus-mini.svg";
import OptionMenu from "./common/OptionMenu";
import EditHoldings from "./common/EditHoldings";
import Spinner from "./common/Spinner";
import SearchToken from "./common/SearchToken";
import cached from "../assets/icons/cached.svg";
import { Sparklines, SparklinesLine } from 'react-sparklines';

const WatchList: React.FC = () => {
  const dispatch = useDispatch();
  const watchedTokens = useSelector((state: RootState) => 
    Object.values(state.watchlist.tokens)) as WatchedToken[];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination calculations
  const totalItems = watchedTokens.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentTokens = watchedTokens.slice(startIndex, endIndex);

  // Fetch prices for watched tokens
  const tokenIds = watchedTokens.map((token) => token.id);
  const { data: prices, refetch, isFetching } = useGetTokenPricesQuery(tokenIds, {
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
            sparkline: priceData.sparkline_7d || []
          })
        );
      });
    }
  }, [prices, dispatch]);

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
  };

  return (
    <div className="rounded-[12px] w-full">
      {/* Header with Total Value and Add Token button */}
      <div className="flex justify-between items-center mb-6 mx-4 lg:mx-0">
        <div className="flex items-center gap-[1px] h-[28px]">
            <img src={star} alt="watchlist" />
          <h2 className="text-lg lg:text-2xl font-medium text-[#f4f4f5]">Watchlist</h2>
        
        </div>
   <div className="flex gap-3">
    <button
      onClick={() => {
        if (tokenIds.length > 0 && !isFetching) {
          refetch();
        }
      }}
      disabled={tokenIds.length === 0 || isFetching}
      className={`flex items-center gap-[6px] 
      h-[36px]
      rounded-[6px]
      px-[10px] py-[6px]
      bg-[#27272A] 
      shadow-[0_0_0_1px_#18181B,0_1px_2px_0px_#00000066,inset_0_0.75px_0_0_#FFFFFF33]
      cursor-pointer
      ${(tokenIds.length === 0 || isFetching) ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {isFetching ? (
          <Spinner size="sm" color="#ffffffd6" />
        ) : (
          <img
            src={cached}
            alt="Button Icon"
            className="max-w-[20px] max-h-[20px] lg:max-w-[15px] lg:max-h-[15px]"
          />
        )}
  
      <span className="hidden lg:inline text-[#f4f4f5] font-medium leading-[20px] ml-1 text-[14px]">
    {isFetching ? 'Refreshing...' : 'Refresh Prices'}
  </span>
    </button>

      <PrimaryButton text="Add Token" icon={plus} radius="rounded-md" onClick={() => setIsSearchOpen(true)} />
      </div>
</div>
      {/* Search Modal */}
      <SearchToken
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToken={handleAddToWatchlist}
        watchedTokenIds={tokenIds}
      />

      {/* Watchlist Table */}
      <div className="overflow-x-auto rounded-[12px] border border-[var(--alpha-white-alpha-8,#FFFFFF14)] mx-4 lg:mx-0 mb-8 lg:mb-0">
        <table className="min-w-full  ">
          <thead className="bg-secondary h-[48px]">
            <tr>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Token</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">24h %</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Sparkline (7d)</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Holdings</th>
                <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Value</th>
             <th className="px-6 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {currentTokens.map((token) => (
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
                  <div className="text-[13px] font-normal text-[#A1A1AA]">
                    ${token.current_price?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })  || '0.00'}
                  </div>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-[13px] font-normal text-[#A1A1AA]`}>
                    {token.price_change_percentage_24h?.toFixed(2) || '0.00'}%
                  </span>
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-8  rounded">
                   <Sparklines data={token.sparkline_7d} width={100} height={30}>
                    <SparklinesLine color={token.price_change_percentage_24h >= 0 ? "#22C55E" : "#EF4444"}   style={{ fill: "transparent", strokeWidth: 2 }} />
                   </Sparklines>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {token.editingHoldings ? (
                    <EditHoldings
                      initialValue={token.holdings}
                      onSave={(value) => {
                        dispatch(updateTokenHoldings({ 
                          tokenId: token.id, 
                          holdings: value,
                          editingHoldings: false 
                        }));
                      }}
                      onCancel={() => {
                        dispatch(updateTokenHoldings({ 
                          tokenId: token.id,
                          editingHoldings: false 
                        }));
                      }}
                    />
                  ) : (
                    <div className="text-[13px] text-[#f4f4f5]">
                      {token.holdings?.toFixed(4) || '0.0000'}
                    </div>
                  )}
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-[13px] text-[#f4f4f5]">
                    ${((token.holdings || 0) * token.current_price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
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
          <tfoot>
            <tr className="border-t border-[#FFFFFF14]">
              <td colSpan={7}>
                <div className="flex justify-between items-center px-6 h-[60px] text-text-secondary text-sm">
                  <div>
                    {watchedTokens.length > 0 ? (
                      `${startIndex + 1}-${endIndex} of ${totalItems} results`
                    ) : (
                      "0 results"
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {totalPages > 1 && (
                      <>
                      
                        <span>
                          {currentPage} of {totalPages} pages
                        </span>
                          <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`px-2 py-1 rounded hover:bg-[#FFFFFF14] ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`px-2 py-1 rounded hover:bg-[#FFFFFF14] ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                        >
                          Next
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default WatchList;
