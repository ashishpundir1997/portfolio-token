import React from "react";

import type { RootState } from "../store/store";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { WatchedToken } from "../store/slices/watchlistSlice";
import { useSelector } from "react-redux";


ChartJS.register(ArcElement, Tooltip, Legend);

const generateColor = (index: number): string => {
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#8AC926', '#1982C4', '#6A4C93', '#FF595E'
  ];
  return colors[index % colors.length];
};

const PortfolioDashboard: React.FC = () => {
  const { tokens, totalValue, lastUpdated } = useSelector((state: RootState) => state.watchlist);
  
  // Format currency with appropriate units
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  // Get all tokens and filter those with holdings
  const tokenList = Object.values(tokens) as WatchedToken[];
  const tokensWithHoldings = tokenList.filter(token => token.holdings > 0);
  
  // Calculate data for tokens with holdings
  const tokenData = tokensWithHoldings.map((token, index) => ({
    ...token,
    value: token.holdings * token.current_price,
    percentage: (token.holdings * token.current_price / totalValue) * 100,
    color: generateColor(index)
  }))
  .sort((a, b) => b.value - a.value);

  return (
    <div className="w-full bg-[#27272A] lg:rounded-[12px] p-6 mt-[90px] lg:mt-[70px]">
      {/* Main grid with two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        {/* Left Column - Portfolio Stats */}

          {/* Portfolio Total Section */}
          <div className="text-left flex flex-col justify-between h-full">
              <div>
                <p className="text-text-secondary text-base">Portfolio Total</p>
                <p className="text-[40px] lg:text-[56px] font-medium text-[#f4f4f5]">${totalValue.toLocaleString()}</p>
              </div>

              <div className="text-text-secondary text-normal text-xs flex gap-1">
                <p>Last Updated:</p>
                <p>{new Date(lastUpdated).toLocaleTimeString([], { 
                  hour: "2-digit", 
                  minute: "2-digit", 
                  hour12: true, 
                  second: "2-digit" 
                }).toUpperCase()}</p>
              </div>
          </div>

        {/* Right Column - Distribution Chart */}
        <div className="text-left rounded-lg">
          <p className="text-text-secondary text-base">Portfolio Total</p>
          <div className="flex-col gap-8 mt-5 lg:flex-row flex"> 
            <div className="w-[200px] h-[200px] mx-auto ">
              {tokenData.length > 0 ? (
                <Doughnut
                  data={{
                    labels: tokenData.map(t => t.symbol.toUpperCase()),
                    datasets: [{
                      data: tokenData.map(t => t.value),
                      backgroundColor: tokenData.map(t => t.color),
                      borderWidth: 0
                    }]
                  }}
                  options={{
                    cutout: '70%',
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: (context: any) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = tokenData[context.dataIndex]?.percentage || 0;
                            return `${label}: ${formatCurrency(value)} (${percentage.toFixed(2)}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                  No tokens with holdings
                </div>
              )}
            </div>
            <div className="flex-1">
              {tokenData.length > 0 ? (
                <div className="space-y-3 h-[230px] overflow-y-auto pr-2">
                  {tokenData.map((token) => (
                    <div key={token.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                   
                        <span className={`font-medium text-sm  text-[#f4f4f5]`}  style={{ color: token.color }}>
                          {token.name} ({token.symbol.toUpperCase()})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                    
                        <span className="text-text-secondary font-medium text-sm min-w-[60px] text-right">
                          {token.percentage.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-text-secondary text-center">
                  Add token holdings to see distribution
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
      

  );
};

export default PortfolioDashboard;
