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
  placeholder,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className={className}
    maxLength={maxLength}
    placeholder={placeholder}
  />
);

export default Input;
