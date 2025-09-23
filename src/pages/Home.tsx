import React from 'react';
import PortfolioDashboard from '../components/PortfolioDashboard.tsx';
import WatchList from '../components/Watchlist.tsx';

const Home: React.FC = () => {
  return (
    <div className="p-6 flex-1 flex flex-col gap-6">
      <PortfolioDashboard />
      <WatchList />
    </div>
  );
};

export default Home;
