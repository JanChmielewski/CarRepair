import React from 'react';
import InputField from './InputField';
import Icons from '../../../utils/icons';

const formatDate = (dateString) => {
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

  const inputFields = [
    {
      label: 'Numer VIN',
      name: 'vinNumber',
      showError: !!vinNumberError,
      errorMessage: vinNumberError,
    },
    { label: 'Model', name: 'name', maxLength: 40 },
    { label: 'Klient', name: 'owner', maxLength: 40 },
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
            <Icons.Save className="icon black-icon save-icon" />
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
