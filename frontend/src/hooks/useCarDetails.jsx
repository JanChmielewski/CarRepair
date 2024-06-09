import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../utils/api/api_endpoints';

export const useCarDetails = (repairID) => {
  const [car, setCar] = useState(null);
  const [client, setClient] = useState({});
  const [repair, setRepair] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(
          `${API_ENDPOINTS.GET_CARS_FOR_DASHBOARD}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const carData = data.cars.find(
          (car) => car.id === parseInt(repairID)
        );
        if (carData) {
          setCar(carData);
          setClient({
            ownerName: `${carData.client.name} ${carData.client.surname}`,
            email: carData.client.email,
            phone: carData.client.phoneNumber,
          });
          setRepair({
            dateOfArrival: carData.dateOfArrival,
            deadlineDate: carData.deadlineDate,
            clientInfo: carData.clientInfo,
            repairStatus: carData.status,
            repairedBy: carData.repairedBy,
          });
        } else {
          setError('Car not found');
        }
      } catch (error) {
        console.error('Fetching data failed: ', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [repairID]);

  return { car, client, repair, error, isLoading };
};
