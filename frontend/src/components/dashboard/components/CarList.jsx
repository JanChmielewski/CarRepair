import React from 'react';
import Card from './Card';

function CarList({ searchQuery, cars }) {
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
              repairID={car.id} // Assuming repairID is same as car.id
              model={car.model}
              brand={car.brand}
              owner={client ? `${client.name} ${client.surname}` : ''}
              date={car.status} // Assuming status here for simplicity
              repairs={[]} // No repair data provided in the given API response
            />
          </li>
        );
      })}
    </div>
  );
}

export default CarList;
