// DataFetchingComponent.jsx
import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { cars, clients, repairs } from '../../utils/api';
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
    if (!isNewRepair) {
      const repair = repairs.find(
        (item) => item.repairID === parseInt(repairID)
      );

      if (repair) {
        const carData = cars.find(
          (car) => car.carID === repair.carID
        );
        const clientData = clients.find(
          (client) => client.clientID === carData.clientID
        );
        setSelectedRepair({
          ...repair,
          ...carData,
          ...clientData,
        });
      } else {
        navigate(`${ROUTES.NOT_FOUND}`);
      }
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
