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
  const { repairID } = useParams();
  const location = useLocation();
  const isNewRepair =
    location.pathname === '/edit-details/add-new-car';

  const allData = [...cars, ...clients, ...repairs];

  let selectedRepair = null;

  if (!isNewRepair) {
    selectedRepair = repairs.find(
      (item) => item.repairID === parseInt(repairID)
    );

    if (selectedRepair) {
      const carData = cars.find(
        (car) => car.carID === selectedRepair.carID
      );
      const clientData = clients.find(
        (client) => client.clientID === carData.clientID
      );
      selectedRepair = {
        ...selectedRepair,
        ...carData,
        ...clientData,
      };
    }
  }

  useEffect(() => {
    if (
      !isNewRepair &&
      !repairs.some((item) => item.repairID === parseInt(repairID))
    )
      navigate('/not-found');
  }, [isNewRepair, repairs, repairID, navigate]);

  const [editedRepair, setEditedRepair] = useState(
    isNewRepair ? {} : selectedRepair || {}
  );

  const handleSave = async () => {
    try {
      const url = isNewRepair
        ? '/api/add-new-repair'
        : '/api/update-repair-details';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedRepair.repairID,
          ...editedRepair,
        }),
      };
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.log('Repair details saved successfully');
      } else {
        console.error('Failed to save repair details');
      }
    } catch (error) {
      console.error('Error saving repair details:', error);
    }
  };

  return (
    <div>
      <div className="buttons">
        <PreviousPageButton buttonColor="pink" />
      </div>
      <EditDetailsForm
        selectedRepair={selectedRepair}
        editedRepair={editedRepair}
        onChange={(e) =>
          handleInputChange(e, editedRepair, setEditedRepair)
        }
        onSave={handleSave}
        isNewRepair={isNewRepair}
        allData={allData}
      />
    </div>
  );
}

export default EditDetails;
