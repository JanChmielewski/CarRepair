// EditDetailsForm.jsx
import React from 'react';
import InputField from './InputField';

function EditDetailsForm({
  selectedCar,
  editedCar,
  phoneNumberError,
  vinNumberError,
  onChange,
  onSave,
}) {
  const renderInputFields = () => {
    return inputFields.map((field) => (
      <div key={field.name}>
        <InputField
          label={field.label}
          name={field.name}
          value={editedCar[field.name] || ''}
          onChange={onChange}
          type={field.type}
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

  const inputFields = [
    {
      label: 'Numer VIN',
      name: 'vinNumber',
      showError: !!vinNumberError,
      errorMessage: vinNumberError,
    },
    { label: 'Model', name: 'name' },
    { label: 'Klient', name: 'owner' },
    {
      label: 'Numer telefonu',
      name: 'phoneNumber',
      type: 'tel',
      showError: !!phoneNumberError,
      errorMessage: phoneNumberError,
    },
    { label: 'Informacje od klienta', name: 'infoFromClient' },
    { label: 'Informacje od mechanika', name: 'additionalInfo' },
    { label: 'Data przyjęcia', name: 'date', type: 'date' },
  ];

  return (
    <div>
      {selectedCar ? (
        <div className="details-form">
          {renderInputFields()}
          <button className="save-btn" onClick={onSave}>
            Save
          </button>
        </div>
      ) : (
        <p className="not-found-message">
          Nie udało się znaleźć samochodu o podanym numerze VIN.
          Sprawdź poprawność numeru i spróbuj ponownie
        </p>
      )}
    </div>
  );
}

export default EditDetailsForm;
