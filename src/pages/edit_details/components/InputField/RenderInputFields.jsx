// RenderInputFields.js
import React from 'react';
import InputField from './InputField/InputField';
import inputFields from '../utils/inputFields';

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

const RenderInputFields = ({
  editedCar,
  vinNumberError,
  phoneNumberError,
  onChange,
}) => {
  const renderField = (field) => {
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
          onChange={onChange}
          type={field.type === 'date' ? 'date' : 'text'}
          maxLength={field.maxLength}
        />
        {field.name === 'vinNumber' && vinNumberError && (
          <p className="vin-error">{vinNumberError}</p>
        )}
        {field.name === 'phoneNumber' && phoneNumberError && (
          <p className="number-error">{phoneNumberError}</p>
        )}
      </div>
    );
  };

  return inputFields.map(renderField);
};

export default RenderInputFields;
