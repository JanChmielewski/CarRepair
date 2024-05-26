import React, { useState } from 'react';
import InputLabel from './InputLabel';
import Input from './Input';
import ErrorMessage from './ErrorMessage';

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
  isOnlyDigits = false,
}) => {
  const [error, setErrorState] = useState(null);

  return (
    <div>
      <InputLabel label={label} className={labelClassName} />
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        maxLength={maxLength}
        minLength={minLength}
        isRequired={isRequired}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default InputField;
