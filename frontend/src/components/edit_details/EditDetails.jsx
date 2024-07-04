import React, { useState, useEffect, useCallback } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import EditDetailsForm from './EditDetailsForm';
import Navbar from '../common/Navbar';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';
import { ROUTES } from '../../utils/routes';
import handleInputChange from '../../utils/handleInputChange';
import {
  handleSave as handleSaveFunction,
  checkClientExists,
} from './handleSave';

function EditDetails() {
  const navigate = useNavigate();
  const { repairID } = useParams();
  const location = useLocation();
  const isNewRepair = location.pathname === `${ROUTES.ADD_NEW_CAR}`;

  const [selectedRepair, setSelectedRepair] = useState(null);
  const [editedRepair, setEditedRepair] = useState({
    brand: '',
    model: '',
    vinNumber: '',
    engine: '',
    clientFirstName: '',
    clientLastName: '',
    phone: '',
    email: '',
    registrationNumber: '',
    mechanicInfo: '',
    clientInfo: '',
    productionDate: '',
    mileage: '',
    dateOfAdmission: '',
    dateOfHandingOver: '',
  });
  const [error, setError] = useState(null);
  const [clientExists, setClientExists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        if (!isNewRepair) {
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

            if (!repairResponse.ok) {
              throw new Error(
                `HTTP error! status: ${repairResponse.status}`
              );
            }

            const repairData = await repairResponse.json();
            const repair = repairData.repairs.find(
              (r) => r.car.id === car.id
            );

            setSelectedRepair(car);
            setEditedRepair({
              brand: car.brand,
              model: car.model,
              vinNumber: car.vin,
              engine: car.engine,
              clientFirstName: car.client.name,
              clientLastName: car.client.surname,
              phone: car.client.phoneNumber,
              email: car.client.email,
              registrationNumber: car.registrationNumber,
              mechanicInfo: repair ? repair.infoFromWorker : '',
              clientInfo: repair ? repair.infoFromClient : '',
              productionDate: car.yearOfProduction,
              mileage: car.mileage,
              dateOfAdmission: repair
                ? repair.dateOfAdmission.split('T')[0]
                : '',
              dateOfHandingOver: repair
                ? repair.dateOFHandingOver.split('T')[0]
                : '',
            });
          } else {
            navigate(`${ROUTES.NOT_FOUND}`);
          }
        }
      } catch (error) {
        console.error('Fetching data failed:', error);
        setError('An error occurred while fetching data.');
      }
    };

    if (!isNewRepair) {
      fetchData();
    }
  }, [isNewRepair, repairID, navigate]);

  const handleSave = useCallback(async () => {
    console.log('Edited Repair email:', editedRepair.email);
    console.log('Edited Repair phone:', editedRepair.phone);
    const error = await handleSaveFunction(
      isNewRepair,
      selectedRepair,
      editedRepair
    );
    setError(error);
  }, [isNewRepair, selectedRepair, editedRepair]);

  const handleCheckClientExists = async () => {
    const exists = await checkClientExists(editedRepair);
    setClientExists(exists);
  };

  return (
    <div className="content">
      <div className="buttons">
        <Navbar
          page={
            isNewRepair
              ? 'Dodawanie nowego pojazdu'
              : 'Edycja naprawy'
          }
          car={selectedRepair || {}}
        />
      </div>

      <div className="edit-form">
        <EditDetailsForm
          editedRepair={editedRepair}
          onChange={(e) =>
            handleInputChange(e, editedRepair, setEditedRepair)
          }
          onSave={handleSave}
          isNewRepair={isNewRepair}
          error={error}
          setError={setError}
          checkClientExists={handleCheckClientExists}
          clientExists={clientExists}
        />
      </div>
    </div>
  );
}

export default EditDetails;
