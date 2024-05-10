import React, { useState } from 'react';

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
  maxLength = null,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (!maxLength || inputValue.length <= maxLength) {
      setInputValue(inputValue);
      onChange(e);
    }
  };

  const renderPlaceholder = () => {
    if (type === 'date') {
      return 'dd-mm-yyyy';
    }
    return '';
  };

  return (
    <div>
      <label className={labelClassName}>{label}:</label>{' '}
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        onBlur={onBlur}
        className={`details-input ${className}`}
        maxLength={maxLength}
        placeholder={renderPlaceholder()}
      />
      {showError && errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
