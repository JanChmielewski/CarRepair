import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';
import EditDetailsForm from './EditDetailsForm';
import ErrorComponent from './ErrorComponent';
import { ROUTES } from '../../utils/routes';

function DataFetching() {
  const navigate = useNavigate();
  const { repairID } = useParams();
  const location = useLocation();
  const isNewRepair = location.pathname === `${ROUTES.ADD_NEW_CAR}`;

  const [selectedRepair, setSelectedRepair] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
          setSelectedRepair({
            ...repairDetails,
            ...carDetails,
            client: {
              ...carDetails.client,
              ownerName: `${carDetails.client.name} ${carDetails.client.surname}`,
              email: carDetails.client.email,
              phone: carDetails.client.phoneNumber,
            },
            repair: {
              ...repairDetails,
              dateOfAdmission:
                repairDetails.dateOfAdmission.split('T')[0],
              dateOfHandingOver:
                repairDetails.dateOFHandingOver.split('T')[0],
            },
          });
        } else {
          navigate(`${ROUTES.NOT_FOUND}`);
        }
      } catch (error) {
        console.error('Fetching data failed: ', error);
        setError('An error occurred while fetching data.');
      }
    };

    if (!isNewRepair) {
      fetchData();
    }
  }, [isNewRepair, repairID, navigate]);

  return (
    <div>
      {error && <ErrorComponent message={error} />}
      <EditDetailsForm
        selectedRepair={selectedRepair}
        isNewRepair={isNewRepair}
        setError={setError}
      />
    </div>
  );
}

export default DataFetching;
