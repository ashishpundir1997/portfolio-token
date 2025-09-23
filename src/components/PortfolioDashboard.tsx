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
  const { tokens, totalValue } = useSelector((state: RootState) => state.watchlist);
  
  const tokenList = Object.values(tokens) as WatchedToken[];
  const tokenData = tokenList.map((token) => ({
    ...token,
    value: token.holdings * token.current_price,
    percentage: (token.holdings * token.current_price / totalValue) * 100,
    color: generateColor(tokenList.indexOf(token))
  }));

  return (
    <div className="w-full bg-[#27272A] rounded-[12px] p-6 mt-[70px]">
      {/* Main grid with two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        {/* Left Column - Portfolio Stats */}

          {/* Portfolio Total Section */}
          <div className="text-left flex flex-col justify-between h-full">
              <div>
                <p className="text-text-secondary text-base">Portfolio Total</p>
                <p className="text-[56px] font-medium text-[#f4f4f5]">${totalValue.toLocaleString()}</p>
              </div>

              <div className="text-text-secondary text-normal text-xs flex gap-1">
                <p>Last Updated:</p>
               <p>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true, second: "2-digit" }).toUpperCase()}</p>
              </div>
          </div>

        {/* Right Column - Distribution Chart */}
        <div className="text-left rounded-lg">
          <p className="text-text-secondary text-base">Portfolio Total</p>
          <div className="flex gap-8 mt-5"> 
            <div className="w-[200px] h-[200px]">
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
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary">
                  No tokens added
                </div>
              )}
            </div>
            <div className="flex-1">
              {tokenData.length > 0 ? (
                <div className="space-y-3">
                  {tokenData.map((token) => (
                    <div key={token.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">

                        <span className="font-medium text-sm"  style={{ color: token.color }}>{token.name} ({token.symbol.toUpperCase()})</span>
                      </div>
                      <span className="text-text-secondary font-medium text-sm">{token.percentage.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-text-secondary text-center">
                  Add tokens to see distribution
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
