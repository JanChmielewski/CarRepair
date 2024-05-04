import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CarList from './components/CarList';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Navbar handleSearchInputChange={handleSearchInputChange} />
      <CarList searchQuery={searchQuery} />
    </div>
  );
}

export default Dashboard;
