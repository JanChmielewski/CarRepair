import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import EditDetailsForm from './components/EditDetailsForm';
import PreviousPageButton from '../../components/PreviousPageButton';
import { handleChange } from './utils/handleChange';
import { cars, clients, repairs } from '../../utils';

import './EditDetails.css';

function EditDetails() {
  const navigate = useNavigate();
  const { vinNumber } = useParams();
  const location = useLocation();
  const isNewCar = location.pathname === '/edit-details/add-new-car';

  const allData = [...cars, ...clients, ...repairs];

  let selectedCar = null;

  if (!isNewCar) {
    selectedCar = allData.find((item) =>
      ['vinNumber', 'id', 'repairID'].some(
        (key) => key in item && item[key] === vinNumber
      )
    );

    if (selectedCar) {
      const clientData = clients.find(
        (client) => client.id === selectedCar.vinNumber
      );
      const repairData = repairs.find(
        (repair) => repair.repairID === selectedCar.vinNumber
      );
      selectedCar = { ...selectedCar, ...clientData, ...repairData };
    }
  }

  useEffect(() => {
    if (
      !isNewCar &&
      !allData.some((item) => item.vinNumber === vinNumber)
    )
      navigate('/not-found');
  }, [isNewCar, allData, vinNumber, navigate]);

  const [editedCar, setEditedCar] = useState(
    isNewCar ? {} : selectedCar || {}
  );
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [vinNumberError, setVinNumberError] = useState('');

  const handleSave = () => {
    console.log('Save clicked', editedCar);
    // Add logic to save edited car details
  };

  return (
    <div>
      <PreviousPageButton buttonColor="pink" />
      <EditDetailsForm
        selectedCar={selectedCar}
        editedCar={editedCar}
        phoneNumberError={phoneNumberError}
        vinNumberError={vinNumberError}
        onChange={(e) =>
          handleChange(
            e,
            editedCar,
            setEditedCar,
            setPhoneNumberError,
            setVinNumberError
          )
        }
        onSave={handleSave}
        isNewCar={isNewCar}
        allData={allData}
      />
    </div>
  );
}

export default EditDetails;
