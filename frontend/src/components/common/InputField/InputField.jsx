import React from 'react';
import InputLabel from './InputLabel';
import Input from './Input';

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
}) => {
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
        placeholder={label}
      />
    </div>
  );
};

export default InputField;
