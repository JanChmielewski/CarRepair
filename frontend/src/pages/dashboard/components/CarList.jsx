import React from 'react';
import { cars, clients, repairs } from '../../../utils';
import Card from './Card';

function CarList({ searchQuery }) {
  const carClient = (car) =>
    clients.find((client) => client.id === car.vinNumber);

  const filteredCars = cars.filter((car) => {
    const client = carClient(car);
    const ownerName = client ? client.ownerName.toLowerCase() : '';
    const modelName = car.model.toLowerCase();
    const query = searchQuery.toLowerCase();

    return modelName.includes(query) || ownerName.includes(query);
  });

  return (
    <div className="car-list">
      {filteredCars.map((car) => {
        const carRepairs = repairs.filter(
          (repair) => repair.repairID === car.vinNumber
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
          <li key={car.vinNumber}>
            <Card
              vinNumber={car.vinNumber}
              model={car.model}
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
