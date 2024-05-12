// Input.jsx
import React from 'react';

const Input = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  className,
  maxLength,
  minLength,
  placeholder,
  required = false,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className={className}
    maxLength={maxLength}
    minLength={minLength}
    placeholder={placeholder}
    required={required}
  />
);

export default Input;
