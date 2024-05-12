// InputField.jsx
import React, { useState, useEffect } from 'react';
import InputLabel from './InputLabel';
import Input from './Input';
import ErrorMessage from './ErrorMessage';

const InputField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  showError = false,
  errorMessage = '',
  className = 'details-input',
  labelClassName = 'details-input-label',
  minLength = null,
  maxLength = null,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    setInputValue(inputValue);
    onChange(e);
  };

  return (
    <div>
      <InputLabel label={label} className={labelClassName} />
      <Input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onBlur={onBlur}
        className={className}
        maxLength={maxLength}
        required
      />
      {showError && (errorMessage || error) && (
        <ErrorMessage message={errorMessage || error} />
      )}
    </div>
  );
};

export default InputField;
