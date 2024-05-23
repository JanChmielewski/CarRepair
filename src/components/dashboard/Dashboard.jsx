import React from 'react';
import Navbar from './components/Navbar';
import CarList from './components/CarList';
import useSearchQuery from '../../hooks/useSearchQuery';

function Dashboard() {
  const [searchQuery, handleSearchInputChange] = useSearchQuery();

  return (
    <div>
      <Navbar handleSearchInputChange={handleSearchInputChange} />
      <CarList searchQuery={searchQuery} />
    </div>
  );
}

export default Dashboard;
