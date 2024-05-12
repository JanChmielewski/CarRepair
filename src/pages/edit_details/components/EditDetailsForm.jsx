import React from 'react';
import InputField from './InputField/InputField';
import SaveButton from './SaveButton';
import inputFields from '../utils/inputFields';
import { formatDate } from '../utils/formatDate';

function EditDetailsForm({
  selectedCar,
  editedCar,
  phoneNumberError,
  vinNumberError,
  onChange,
  onSave,
}) {
  const renderInputFields = () => {
    return inputFields.map((field) => {
      const value =
        field.name === 'date'
          ? formatDate(editedCar[field.name])
          : editedCar[field.name] || selectedCar?.[field.name] || '';

      return (
        <div key={field.name}>
          <InputField
            label={field.label}
            name={field.name}
            value={value}
            onChange={onChange}
            type={field.type === 'date' ? 'date' : 'text'}
            maxLength={field.maxLength}
            minLength={field.minLength}
          />
          {field.name === 'vinNumber' && vinNumberError && (
            <p className="vin-error">{vinNumberError}</p>
          )}
          {field.name === 'phoneNumber' && phoneNumberError && (
            <p className="number-error">{phoneNumberError}</p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="details-form">
      {renderInputFields()}
      <SaveButton onClick={onSave} />
    </div>
  );
}

export default EditDetailsForm;
