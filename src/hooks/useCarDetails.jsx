// useCarDetails.js
import { useState, useEffect } from 'react';
import { cars, clients, repairs } from '../utils/api';

export function useCarDetails(repairID) {
  const [car, setCar] = useState(null);
  const [client, setClient] = useState(null);
  const [repair, setRepair] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const repair = repairs.find(
        (repair) => repair.repairID === parseInt(repairID)
      );
      const car = cars.find((car) => car.carID === repair.carID);
      const client = clients.find(
        (client) => client.clientID === car.clientID
      );

      setCar(car);
      setClient(client);
      setRepair(repair);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [repairID]);

  return { car, client, repair, error, isLoading };
}
