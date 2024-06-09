import { useState, useEffect } from 'react';
import { cars, clients, repairs } from '../utils';
import { API_ENDPOINTS } from '../utils/api/api_endpoints';

export function useRepairDetails(repairID, isNewRepair) {
  const [repairDetails, setRepairDetails] = useState(null);

  useEffect(() => {
    if (!isNewRepair) {
      const selectedRepair = repairs.find(
        (item) => item.repairID === parseInt(repairID)
      );
      if (selectedRepair) {
        const carData = cars.find(
          (car) => car.carID === selectedRepair.carID
        );
        const clientData = clients.find(
          (client) => client.clientID === carData.clientID
        );
        setRepairDetails({
          ...selectedRepair,
          ...carData,
          ...clientData,
        });
      }
    }
  }, [repairID, isNewRepair]);

  const saveRepairDetails = async (editedRepair) => {
    try {
      const url = isNewRepair
        ? API_ENDPOINTS.ADD_CAR_FOR_REPAIR(repairDetails?.repairID)
        : API_ENDPOINTS.GET_CARS;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: repairDetails?.repairID,
          ...editedRepair,
        }),
      };
      const response = await fetch(url, requestOptions);
      return response.ok;
    } catch (error) {
      console.error('Error saving repair details:', error);
      return false;
    }
  };

  return { repairDetails, saveRepairDetails };
}
