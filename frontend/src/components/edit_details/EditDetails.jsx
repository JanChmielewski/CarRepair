import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditDetailsForm from './EditDetailsForm';
import ErrorMessage from '../common/InputField/ErrorMessage';
import { handleSave as handleSaveFunction } from './handleSave';
import Navbar from '../common/Navbar';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';
import { ROUTES } from '../../utils/routes';
import handleInputChange from '../../utils/handleInputChange';
import { handleLogout } from '../common/handleLogout';

function EditDetails() {
  const navigate = useNavigate();
  const { repairID } = useParams();
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [editedRepair, setEditedRepair] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        const car = data.cars.find(
          (car) => car.id === parseInt(repairID)
        );
        if (car) {
          setSelectedRepair(car);
          setEditedRepair({
            brand: car.brand,
            model: car.model,
            vinNumber: car.vin,
            engine: car.engine,
            clientName: car.client.name,
            phone: car.client.phoneNumber,
            email: car.client.email,
            registrationNumber: car.registrationNumber,
            mechanicInfo: car.mechanicInfo || '',
            clientInfo: car.clientInfo || '',
            productionDate: car.yearOfProduction,
            mileage: car.mileage,
            dateOfArrival: car.dateOfArrival,
            deadlineDate: car.deadlineDate,
          });
        } else {
          navigate(`${ROUTES.NOT_FOUND}`);
        }
      } catch (error) {
        console.error('Fetching data failed: ', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [repairID, navigate]);

  const handleSave = useCallback(async () => {
    const error = await handleSaveFunction(
      false, // Not a new repair
      selectedRepair,
      editedRepair
    );
    setError(error);
  }, [selectedRepair, editedRepair]);

  return (
    <div className="content">
      <div className="buttons">
        <Navbar page="Edycja naprawy" car={selectedRepair || {}} />
      </div>

      <div className="edit-form">
        <EditDetailsForm
          editedRepair={editedRepair}
          onChange={(e) =>
            handleInputChange(e, editedRepair, setEditedRepair)
          }
          onSave={handleSave}
          isNewRepair={false}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
}

export default EditDetails;
