import React, { useMemo } from 'react';
import { useSearchCoinsQuery, useGetTrendingCoinsQuery } from "../../store/services/tokenApi";
import debounce from "lodash/debounce";
import Spinner from "./Spinner";

interface SearchTokenProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToken: (coin: { id: string; name: string; symbol: string; thumb: string }) => void;
}

const SearchToken: React.FC<SearchTokenProps> = ({
  isOpen,
  onClose,
  onAddToken
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCoins, setSelectedCoins] = React.useState<Set<string>>(new Set());

  // Debounced search term
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => {
      setSearchTerm(value.toLowerCase().trim());
    }, 300),
    []
  );

  const { data: searchResults, isLoading: isSearchLoading } = useSearchCoinsQuery(searchTerm, {
    skip: !isOpen || searchTerm.length < 2,
  });

  const { data: trendingData, isLoading: isTrendingLoading } = useGetTrendingCoinsQuery();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#212124D9] bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#212124] rounded-lg max-w-[640px] w-full max-h-[60vh] flex flex-col
        shadow-[0px_8px_16px_0px_#00000052,0px_4px_8px_0px_#00000052,0px_0px_0px_1px_#FFFFFF1A,0px_-1px_0px_0px_#FFFFFF0A,0px_0px_0px_1.5px_#FFFFFF0F_inset,0px_0px_0px_1px_#18181B_inset]">
      

        <input
          type="text"
          onChange={(e) => debouncedSetSearchTerm(e.target.value)}
          placeholder="Search tokens (e.g., ETH, SOL)..."
          className="w-full px-4 py-2 rounded-[6px]  text-[#f4f4f5]
          placeholder-[#71717A] focus:outline-none focus:border-[#FFFFFF29] h-[52px]"
          autoFocus
        />
      <div className='bg-[var(--borders-border-menu-bot,#FFFFFF14)] h-[1px]'></div>
      <div className='flex flex-col h-[calc(60vh-52px)]'>
        <div className='px-4 flex-1 overflow-y-auto'>
          {searchTerm.length < 2 ? (
            <>
              <p className='text-[#71717A] font-medium text-xs mt-[12px] mb-2'>Trending</p>
              {isTrendingLoading ? (
                <div className="text-center py-4 text-[#71717A]">
                  <Spinner size="md" color="#71717A" />
                  <p className="mt-2">Loading trending tokens...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {trendingData?.coins.map((item) => {
                    const coin = item.item;
                    return (
                      <div
                        key={coin.id}
                        className="flex items-center justify-between p-3 hover:bg-[#27272A] rounded-[6px] group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="font-medium text-[#f4f4f5]">{coin.name}</p>
                            <p className="text-sm text-[#71717A]">{coin.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div 
                            className={`w-[15px] h-[15px] rounded-full border-2 cursor-pointer relative
                              ${selectedCoins.has(coin.id) 
                                ? ' bg-[#22C55E] ' 
                                : 'border-[#71717A]'
                              }`}
                            onClick={() => {
                              setSelectedCoins(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(coin.id)) {
                                  newSet.delete(coin.id);
                                } else {
                                  newSet.add(coin.id);
                                }
                                return newSet;
                              });
                            }}
                          >
                            {selectedCoins.has(coin.id) && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[15px] h-[15px] rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              <p className='text-[#71717A] font-medium text-xs mt-[12px] mb-2'>Search Results</p>
              {isSearchLoading ? (
                <div className="text-center py-4 text-[#71717A]">
                  <Spinner size="md" color="#71717A" />
                  <p className="mt-2">Searching tokens...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults?.coins.map((coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between p-3 hover:bg-[#27272A] rounded-[6px] group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-medium text-[#f4f4f5]">{coin.name}</p>
                          <p className="text-sm text-[#71717A]">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div 
                          className={`w-[15px] h-[15px] rounded-full border-2 cursor-pointer relative
                            ${selectedCoins.has(coin.id) 
                              ? ' bg-[#22C55E]' 
                              : 'border-[#71717A] '
                            }`}
                          onClick={() => {
                            setSelectedCoins(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(coin.id)) {
                                newSet.delete(coin.id);
                              } else {
                                newSet.add(coin.id);
                              }
                              return newSet;
                            });
                          }}
                        >
                          {selectedCoins.has(coin.id) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-[15px] h-[15px] rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="p-4 border-t border-[#FFFFFF14] bg-secondary flex justify-end">
          <button
            onClick={() => {
              const selectedTokens = Array.from(selectedCoins).map(id => {
                const coin = searchTerm.length < 2
                  ? trendingData?.coins.find(item => item.item.id === id)?.item
                  : searchResults?.coins.find(coin => coin.id === id);
                return coin;
              }).filter(Boolean);
              
              selectedTokens.forEach(coin => {
                if (coin) {
                  onAddToken(coin);
                }
              });
              setSelectedCoins(new Set());
              onClose();
            }}
            disabled={selectedCoins.size === 0}
            className="px-[10px] py-[6px] bg-secondary border rounded-[6px] border-[var(--borders-border-base,#FFFFFF1A)]
            font-medium text-[13px] text-[#52525B] cursor-pointer 
             hover:bg-[var(--buttons-bg-primary-hover,#FFFFFF14)] transition-colors "
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SearchToken;
