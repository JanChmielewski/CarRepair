// EditDetails.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import EditDetailsForm from './EditDetailsForm';
import ErrorMessage from '../common/InputField/ErrorMessage';
import handleInputChange from '../../utils/handleInputChange';
import { handleSave as handleSaveFunction } from './handleSave';
import { cars, clients, repairs } from '../../utils/api';
import Navbar from '../common/Navbar';

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
  }, [isNewRepair, repairID, navigate]);

  const [editedRepair, setEditedRepair] = useState(
    isNewRepair ? {} : selectedRepair || {}
  );

  const [error, setError] = useState(null);

  const handleSave = useCallback(async () => {
    const error = await handleSaveFunction(
      isNewRepair,
      selectedRepair,
      editedRepair
    );
    setError(error);
  }, [isNewRepair, selectedRepair, editedRepair]);
  {
    error && <ErrorMessage message={error} />;
  }
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
          selectedRepair={selectedRepair}
          editedRepair={editedRepair}
          onChange={(e) =>
            handleInputChange(e, editedRepair, setEditedRepair)
          }
          onSave={handleSave}
          isNewRepair={isNewRepair}
          allData={allData}
          error={error}
          setError={setError}
        />
      </div>
    </div>
  );
}

export default EditDetails;
