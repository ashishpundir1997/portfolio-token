import React, { useMemo } from 'react';
import { useSearchCoinsQuery } from "../../store/services/tokenApi";
import debounce from "lodash/debounce";
import type { WatchedToken } from "../../store/slices/watchlistSlice.ts";
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

  // Debounced search term
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => {
      setSearchTerm(value.toLowerCase().trim());
    }, 300),
    []
  );

  const { data: searchResults, isLoading } = useSearchCoinsQuery(searchTerm, {
    skip: !isOpen || searchTerm.length < 2,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#212124D9] bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#212124] rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col
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
      <div className='px-4'>
      <p className='text-[#71717A] font-medium text-xs mt-[12px]'>Trending</p>
        <div className="overflow-y-auto flex-1">
          {isLoading ? (
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
                  <button
                    onClick={() => onAddToken(coin)}
                    className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-[#22C55E] text-white rounded-[6px] 
                      hover:bg-[#16A34A] transition-all text-sm font-medium"
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
    </div>
  );
};

export default SearchToken;
