import React, { useState } from 'react';
import SearchField from './SearchField'; // Correct import
import { cars } from './cars'; // Importing the cars data from cars.js
import Card from './Card';

function CarList() {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cars based on search query
  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="dashboard">
      <SearchField
        className="search-input"
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
      />
      {filteredCars.map((car) => (
        <li key={car.id}>
          <Card model={car.name} owner={car.owner} date={car.date} />
        </li>
      ))}
    </div>
  );
}

export default CarList;
