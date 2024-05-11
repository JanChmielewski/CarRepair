import React from 'react';
import InputField from './InputField/InputField';
import inputFields from '../utils/inputFields';
import SaveButton from './SaveButton';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

function EditDetailsForm({
  selectedCar,
  editedCar,
  phoneNumberError,
  vinNumberError,
  onChange,
  onSave,
  isNewCar,
}) {
  const renderInputFields = () => {
    return inputFields.map((field) => (
      <div key={field.name}>
        <InputField
          label={field.label}
          name={field.name}
          value={
            field.name === 'date'
              ? formatDate(editedCar[field.name])
              : editedCar[field.name] || ''
          }
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
    ));
  };

  return (
    <div className="details-form">
      {isNewCar || selectedCar !== null ? (
        <div className="details-form">
          {renderInputFields()}
          <SaveButton onClick={onSave} />
        </div>
      ) : (
        <p className="not-found-message">
          {!isNewCar && (
            <>
              Nie udało się znaleźć samochodu o podanym numerze VIN.
              Sprawdź poprawność numeru i spróbuj ponownie
            </>
          )}
        </p>
      )}
    </div>
  );
}

export default EditDetailsForm;
