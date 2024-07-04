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
    console.log(`Field changed: ${name}, New value: ${value}`); // Logowanie
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
      setIsPhoneValid(/^\d{9,15}$/.test(value)); // Adjust the regex based on your phone number validation requirements
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

  const handleCheckClient = async () => {
    const clientExists = await checkClientExists(editedRepairState);
    if (clientExists) {
      setClientExistsMessage('Client already exists');
    } else {
      setClientExistsMessage('Client does not exist');
    }
  };

  const renderInputFields = () => {
    return inputFields.map((field) => {
      let value = editedRepairState[field.name] || '';

      // Handle date fields without formatDate function for now
      if (
        (field.name === 'dateOfAdmission' ||
          field.name === 'dateOfHandingOver') &&
        value
      ) {
        value = value.split('T')[0]; // Ensure the value is in YYYY-MM-DD format
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
