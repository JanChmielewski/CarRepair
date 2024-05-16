// EditDetailsForm.jsx
import React, { useState } from 'react';
import InputField from './InputField/InputField';
import SaveButton from './SaveButton';
import inputFields from '../utils/inputFields';
import { formatDate } from '../utils/formatDate';
import setError from '../utils/setError';

function EditDetailsForm({ editedCar, onChange, onSave }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedErrors = { ...errors };
    delete updatedErrors[name];
    setErrors(updatedErrors);
    onChange(e);
  };

  const renderInputFields = () => {
    return inputFields.map((field) => {
      const value =
        field.name === 'date'
          ? formatDate(editedCar[field.name])
          : editedCar[field.name] || '';

      return (
        <div key={field.name}>
          <InputField
            label={field.label}
            name={field.name}
            value={value}
            onChange={handleChange}
            onBlur={() => {}}
            type={field.type === 'date' ? 'date' : 'text'}
            maxLength={field.maxLength}
            minLength={field.minLength}
            isRequired={field.required}
            isOnlyDigits={
              field.name === 'phone' || field.name === 'mileage'
            }
          />
          {errors[field.name] && (
            <p className="error-message red">{errors[field.name]}</p>
          )}{' '}
          {/* Display error message if exists */}
        </div>
      );
    });
  };

  const handleSave = () => {
    const formErrors = {};
    inputFields.forEach((field) => {
      let isOnlyDigits =
        field.name === 'phone' || field.name === 'mileage';
      let isEmail = field.name === 'email';
      let errorMessage = setError(
        field.label,
        editedCar[field.name],
        field.maxLength,
        field.minLength,
        isOnlyDigits,
        field.required,
        isEmail
      );
      if (
        isEmail &&
        editedCar[field.name] &&
        !validateEmail(editedCar[field.name])
      ) {
        errorMessage = 'Wprowadź poprawny adres email';
      }
      if (errorMessage) {
        formErrors[field.name] = errorMessage;
      }
    });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSave();
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  return (
    <div className="details-form">
      {renderInputFields()}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

export default EditDetailsForm;
