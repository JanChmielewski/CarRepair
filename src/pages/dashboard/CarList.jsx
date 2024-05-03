import React from 'react';
import { cars } from './cars';
import Card from './Card';

function CarList({ searchQuery }) {
  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard">
      {filteredCars.map((car) => (
        <li key={car.id}>
          <Card model={car.name} owner={car.owner} date={car.date} />
        </li>
      ))}
    </div>
  );
}

export default CarList;
