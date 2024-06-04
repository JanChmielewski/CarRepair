import React from 'react';
import Navbar from '../common/Navbar';
import CarList from './components/CarList';
import useSearchQuery from '../../hooks/useSearchQuery';

function Dashboard() {
  const [searchQuery, handleSearchInputChange] = useSearchQuery();

  return (
    <div className="dashboard-container">
      <Navbar handleSearchInputChange={handleSearchInputChange} />
      <CarList searchQuery={searchQuery} />
    </div>
  );
}

export default Dashboard;
