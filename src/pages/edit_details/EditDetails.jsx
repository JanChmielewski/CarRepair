import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cars } from '../../utils/cars';
import EditDetailsForm from './components/EditDetailsForm';
import { handleChange } from './utils/handleChange.js';
import './EditDetails.css';
import Icons from '../../utils/icons.js';
import '../../components/PreviousPageButton.jsx';
import PreviousPageButton from '../../components/PreviousPageButton.jsx';

function EditDetails() {
  const { vinNumber } = useParams();
  const selectedCar = cars.find((car) => car.vinNumber === vinNumber);
  const [editedCar, setEditedCar] = useState(selectedCar || {});
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
      />
    </div>
  );
}

export default EditDetails;
