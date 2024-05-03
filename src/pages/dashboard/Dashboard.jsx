import React, { useState } from 'react';
import Navbar from './Navbar';
import CarList from './CarList';

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
