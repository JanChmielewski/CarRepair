import React from 'react';
import { cars, clients, repairs } from '../../../utils/api';
import Card from './Card';

function CarList({ searchQuery }) {
  const carClient = (car) =>
    clients.find((client) => client.clientID === car.clientID);

  const filteredCars = cars.filter((car) => {
    const client = carClient(car);
    const ownerName = client ? client.ownerName.toLowerCase() : '';
    const modelName =
      car.model.toLowerCase() + car.brand.toLowerCase();
    const query = searchQuery.toLowerCase();

    return modelName.includes(query) || ownerName.includes(query);
  });

  return (
    <div className="car-list">
      {filteredCars.map((car) => {
        const carRepairs = repairs.filter(
          (repair) => repair.repairID === car.carID
        );
        const client = carClient(car);
        const deadlineRepair =
          carRepairs.length > 0
            ? carRepairs.reduce((prev, current) =>
                prev.deadlineDate < current.deadlineDate
                  ? prev
                  : current
              )
            : null;

        return (
          <li key={car.carID}>
            <Card
              repairID={
                carRepairs.length > 0 ? carRepairs[0].repairID : null
              }
              model={car.model}
              brand={car.brand}
              owner={client ? client.ownerName : ''}
              date={deadlineRepair ? deadlineRepair.deadlineDate : ''}
              repairs={carRepairs}
            />
          </li>
        );
      })}
    </div>
  );
}

export default CarList;
