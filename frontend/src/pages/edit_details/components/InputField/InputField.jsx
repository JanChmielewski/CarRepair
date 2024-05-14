// InputField.jsx
import React, { useState } from 'react';
import InputLabel from './InputLabel';
import Input from './Input';
import ErrorMessage from './ErrorMessage'; // Import ErrorMessage component
import setError from '../../utils/setError';

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  className = 'details-input',
  labelClassName = 'details-input-label',
  minLength = null,
  maxLength = null,
  isRequired = false,
  isOnlyDigits = false, // Add isOnlyDigits prop
}) => {
  const [error, setError] = useState(null); // State to manage error message

  // Function to handle onBlur event
  const handleBlur = (e) => {
    const { value } = e.target;
    const errorMessage = validateInput(value);
    setError(errorMessage); // Update error state
  };

  // Function to validate input based on props
  const validateInput = (value) => {
    return setError(
      label,
      value,
      maxLength,
      minLength,
      isOnlyDigits,
      isRequired
    );
  };

  return (
    <div>
      <InputLabel label={label} className={labelClassName} />
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur} // Pass handleBlur function to onBlur prop
        className={className}
        maxLength={maxLength}
        minLength={minLength}
        isRequired={isRequired}
      />
      {error && <ErrorMessage message={error} />}{' '}
      {/* Display error message if exists */}
    </div>
  );
};

export default InputField;
