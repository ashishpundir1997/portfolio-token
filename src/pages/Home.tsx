import React from 'react';
import PortfolioDashboard from '../components/PortfolioDashboard.tsx';
import WatchList from '../components/Watchlist.tsx';

const Home: React.FC = () => {
  return (
    <div className='w-full h-full p-6 space-y-6'>
      <PortfolioDashboard />
      <WatchList />
    </div>
  );
};

export default Home;
