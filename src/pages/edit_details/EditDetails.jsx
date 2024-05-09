// EditDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cars } from '../../utils/cars';
import EditDetailsForm from './components/EditDetailsForm';
import { handleChange } from './utils/handleChange.js';
import './EditDetails.css';

function EditDetails() {
  const { id } = useParams();
  const selectedCar = cars.find((car) => car.VinNumber === id);
  const [editedCar, setEditedCar] = useState(selectedCar || {});
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleChangeWrapper = (e) => {
    handleChange(e, editedCar, setEditedCar, setPhoneNumberError);
  };

  const handleSave = () => {
    console.log('Save clicked', editedCar);
    // Add logic to save edited car details
  };

  return (
    <div>
      <EditDetailsForm
        selectedCar={selectedCar}
        editedCar={editedCar}
        phoneNumberError={phoneNumberError}
        onChange={handleChangeWrapper}
        onSave={handleSave}
      />
    </div>
  );
}

export default EditDetails;
