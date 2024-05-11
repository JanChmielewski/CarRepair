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
}) => {
  return (
    <div>
      <label className={labelClassName}>{label}:</label>{' '}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`details-input ${className}`}
      />
      {showError && errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
