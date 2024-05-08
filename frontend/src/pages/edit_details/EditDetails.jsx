import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cars } from '../../utils/cars';

// Reusable Input Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
}) => (
  <p>
    {label}:{' '}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </p>
);

function EditDetails() {
  const { id } = useParams();
  const selectedCar = cars.find((car) => car.id === parseInt(id));
  const [editedCar, setEditedCar] = useState(selectedCar || {});

  useEffect(() => {
    if (selectedCar && selectedCar.date) {
      const [day, month, year] = selectedCar.date.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      setEditedCar((prevCar) => ({
        ...prevCar,
        date: formattedDate,
      }));
    }
  }, [selectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const parseDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
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
      {selectedCar ? (
        <div>
          {inputFields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              value={editedCar[field.name] || ''}
              onChange={handleChange}
              type={field.type}
            />
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>Car not found</p>
      )}
    </div>
  );
}

export default EditDetails;
