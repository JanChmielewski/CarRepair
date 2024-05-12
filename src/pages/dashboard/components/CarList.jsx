import React from 'react';
import { cars } from '../../../utils/cars.js';
import Card from './Card';

function CarList({ searchQuery }) {
  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="car-list">
      {filteredCars.map((car) => (
        <li key={car.vinNumber}>
          <Card
            vinNumber={car.vinNumber}
            model={car.name}
            owner={car.owner}
            date={car.date}
          />
        </li>
      ))}
    </div>
  );
}

export default CarList;
