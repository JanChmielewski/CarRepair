import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cars } from '../../utils/cars';
import InputField from './InputField';

function EditDetails() {
  const { id } = useParams();
  const selectedCar =
    cars.find((car) => car.id === parseInt(id)) || {};
  const [editedCar, setEditedCar] = useState(selectedCar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCar({ ...editedCar, [name]: value });
  };

  const handleSave = () => {
    console.log('Save clicked', editedCar);
    // Add logic to save edited car details
  };

  const inputFields = [
    { label: 'Name', name: 'name' },
    { label: 'Owner', name: 'owner' },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
    { label: 'Info from Client', name: 'infoFromClient' },
    { label: 'Additional Info', name: 'additionalInfo' },
    { label: 'Date', name: 'date', type: 'date' },
  ];

  return (
    <div>
      <h1>Edit Details</h1>
      <div>
        {inputFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={editedCar[field.name] || ''}
            onChange={handleChange}
          />
        ))}
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default EditDetails;
