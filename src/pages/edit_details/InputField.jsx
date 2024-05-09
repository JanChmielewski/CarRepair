// InputField.jsx
import React from 'react';

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  className = 'details-input',
  labelClassName = 'details-input-label',
}) => (
  <p>
    <label className={labelClassName}>{label}:</label>{' '}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`details-input ${className}`}
    />
  </p>
);

export default InputField;
