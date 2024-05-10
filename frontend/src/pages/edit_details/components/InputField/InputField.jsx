// InputField.jsx
import React, { useState } from 'react';
import InputLabel from './InputLabel';
import Input from './Input';
import ErrorMessage from './ErrorMessage';

const InputField = (props) => {
  const {
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
  } = props;

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (maxLength && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    setInputValue(inputValue);
    onChange(e);
  };

  const renderPlaceholder = () => {
    if (type === 'date') {
      return 'dd-mm-yyyy';
    }
    return '';
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
        placeholder={renderPlaceholder()}
      />
      {showError && errorMessage && (
        <ErrorMessage message={errorMessage} />
      )}
    </div>
  );
};

export default InputField;
