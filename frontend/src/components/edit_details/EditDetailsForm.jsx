import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField/InputField';
import SaveButton from './SaveButton';
import inputFields from '../../utils/inputFields';
import { validateInputFields } from '../../utils/handleInputChange';

function EditDetailsForm({
  editedRepair,
  onChange,
  onSave,
  isNewRepair,
  error,
  setError,
}) {
  const [errors, setErrors] = useState({});

  const [editedRepairState, setEditedRepairState] = useState({});

  useEffect(() => {
    setEditedRepairState(editedRepair);
  }, [editedRepair]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRepairState((prevEditedRepair) => ({
      ...prevEditedRepair,
      [name]: value,
    }));
    onChange(e);
  };

  const handleSave = () => {
    const formErrors = validateInputFields(
      inputFields,
      editedRepairState
    );
    setErrors(formErrors);
    const isValid = Object.keys(formErrors).length === 0;

    if (isValid) {
      onSave();
    } else {
      setError('Wystąpił błąd podczas zapisu. Spróbuj ponownie.');
    }
  };

  const renderInputFields = () => {
    return inputFields.map((field) => {
      const value =
        field.name === 'date'
          ? formatDate(editedRepairState[field.name])
          : editedRepairState[field.name] || '';

      return (
        <div key={field.name} className="input">
          <InputField
            label={field.label}
            name={field.name}
            value={value}
            onChange={handleChange}
            type={field.type || 'text'}
            maxLength={field.maxLength}
            minLength={field.minLength}
            isRequired={field.required}
            isOnlyDigits={
              field.name === 'phone' || field.name === 'mileage'
            }
            error={errors[field.name]} // Pass the error message
          />
          {errors[field.name] && (
            <p className="error-message red">{errors[field.name]}</p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="details-form">
      {renderInputFields()}
      {error && (
        <p className="error-message red saving-error-msg">{error}</p>
      )}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

export default EditDetailsForm;
