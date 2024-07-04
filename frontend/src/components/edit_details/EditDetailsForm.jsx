import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField/InputField';
import SaveButton from './SaveButton';
import inputFields from '../../utils/inputFields';
import { validateInputFields } from '../../utils/handleInputChange';
import { checkClientExists } from './handleSave';

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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [clientExistsMessage, setClientExistsMessage] = useState('');

  useEffect(() => {
    setEditedRepairState(editedRepair);
    setEmail(editedRepair.email || '');
    setPhone(editedRepair.phone || '');
  }, [editedRepair]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRepairState((prevEditedRepair) => ({
      ...prevEditedRepair,
      [name]: value,
    }));
    onChange(e);

    if (name === 'email') {
      setEmail(value);
      setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    } else if (name === 'phone') {
      setPhone(value);
      setIsPhoneValid(/^\d{9,15}$/.test(value));
    }
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
      let value = editedRepairState[field.name] || '';

      if (
        (field.name === 'dateOfAdmission' ||
          field.name === 'dateOfHandingOver') &&
        value
      ) {
        value = value.split('T')[0];
      }

      if (field.type === 'select') {
        return (
          <div key={field.name} className="input">
            <label>{field.label}</label>
            <select
              name={field.name}
              value={value}
              onChange={handleChange}
              required={field.required}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="error-message red">
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      }

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
            error={errors[field.name]}
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
