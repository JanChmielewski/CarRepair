import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { ROUTES } from '../../../utils/routes';

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
            <Link to={`${ROUTES.EDIT_DETAILS}/${car.id}`}>
              <Card
                repairID={car.id}
                model={car.model}
                brand={car.brand}
                owner={
                  client ? `${client.name} ${client.surname}` : ''
                }
                date={car.status}
                repairs={[]}
              />
            </Link>
          </li>
        );
      })}
    </div>
  );
}

export default CarList;
