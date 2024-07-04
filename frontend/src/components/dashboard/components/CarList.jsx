import React from 'react';
import Card from './Card'; // Upewnij się, że ta ścieżka jest poprawna

function CarList({ searchQuery, cars, refreshCars, removeCar }) {
  const filteredCars = cars.filter((car) => {
    const client = car.client;
    const ownerName = client
      ? `${client.name.toLowerCase()} ${client.surname.toLowerCase()}`
      : '';
    const modelName =
      car.model.toLowerCase() + car.brand.toLowerCase();
    const query = searchQuery.toLowerCase();

    return modelName.includes(query) || ownerName.includes(query);
  });

  return (
    <div className="car-list">
      {filteredCars.map((car) => {
        const client = car.client;

        return (
          <li key={car.id}>
            <Card
              repairID={car.id}
              model={car.model}
              brand={car.brand}
              owner={client ? `${client.name} ${client.surname}` : ''}
              status={car.status}
              refreshCars={refreshCars}
              removeCar={removeCar}
            />
          </li>
        );
      })}
    </div>
  );
}

export default CarList;
