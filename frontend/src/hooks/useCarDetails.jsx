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

        const carResponse = await fetch(
          `${API_ENDPOINTS.GET_CARS_FOR_DASHBOARD}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );

        const repairResponse = await fetch(
          `${API_ENDPOINTS.GET_REPAIRS}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );

        if (!carResponse.ok || !repairResponse.ok) {
          throw new Error(
            `HTTP error! status: ${carResponse.status} or ${repairResponse.status}`
          );
        }

        const carData = await carResponse.json();
        const repairData = await repairResponse.json();

        const carDetails = carData.cars.find(
          (car) => car.id === parseInt(repairID)
        );
        const repairDetails = carDetails
          ? repairData.repairs.find(
              (repair) => repair.car.id === carDetails.id
            )
          : null;

        if (carDetails && repairDetails) {
          setCar(carDetails);
          setClient({
            ownerName: `${carDetails.client.name} ${carDetails.client.surname}`,
            email: carDetails.client.email,
            phone: carDetails.client.phoneNumber,
          });
          setRepair({
            dateOfAdmission: repairDetails.dateOfAdmission,
            dateOfHandingOver: repairDetails.dateOFHandingOver,
            infoFromClient: repairDetails.infoFromClient,
            infoFromWorker: repairDetails.infoFromWorker,
            repairStatus: repairDetails.repairStatus,
            repairedBy: `${repairDetails.repairedBy.workerCode}`,
          });
        } else {
          setError('Car or Repair not found');
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
