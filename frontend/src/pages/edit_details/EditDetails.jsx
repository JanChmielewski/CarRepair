import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import EditDetailsForm from './components/EditDetailsForm';
import PreviousPageButton from '../../components/PreviousPageButton';
import handleInputChange from './utils/handleInputChange';
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

  const handleSave = async () => {
    try {
      const url = isNewCar
        ? '/api/add-new-car'
        : '/api/update-car-details';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedCar.id, // Include the ID of the car
          ...editedCar, // Include the edited car details
        }),
      };
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.log('Car details saved successfully');
        // Optionally, you can navigate to a different page or show a success message here
      } else {
        console.error('Failed to save car details');
        // Handle error scenario here
      }
    } catch (error) {
      console.error('Error saving car details:', error);
      // Handle error scenario here
    }
  };

  return (
    <div>
      <PreviousPageButton buttonColor="pink" />
      <EditDetailsForm
        selectedCar={selectedCar}
        editedCar={editedCar}
        onChange={(e) =>
          handleInputChange(e, editedCar, setEditedCar)
        }
        onSave={handleSave}
        isNewCar={isNewCar}
        allData={allData}
      />
    </div>
  );
}

export default EditDetails;
