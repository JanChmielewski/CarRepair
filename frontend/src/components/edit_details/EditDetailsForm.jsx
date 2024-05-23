import React, { useState } from 'react';
import InputField from '../common/InputField/InputField';
import SaveButton from './SaveButton';
import inputFields from '../../utils/inputFields';
import { formatDate } from '../../utils/formatDate';
import { validateInputFields } from '../../utils/handleInputChange';

function EditDetailsForm({
  editedRepair,
  onChange,
  onSave,
  isNewRepair,
}) {
  const [errors, setErrors] = useState({});

  const defaultValues = inputFields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});

  const [editedRepairState, setEditedRepairState] = useState(
    isNewRepair ? defaultValues : editedRepair
  );

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
    }
  };

  const renderInputFields = () => {
    return inputFields.map((field) => {
      const value =
        field.name === 'date'
          ? formatDate(editedRepairState[field.name])
          : editedRepairState[field.name] || '';

      return (
        <div key={field.name}>
          <InputField
            label={field.label}
            name={field.name}
            value={value}
            onChange={handleChange}
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
          )}
        </div>
      );
    });
  };

  return (
    <div className="details-form">
      {renderInputFields()}
      <SaveButton onClick={handleSave} />
    </div>
  );
}

export default EditDetailsForm;
