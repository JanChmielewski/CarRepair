import React from 'react';
import InputField from './InputField/InputField';
import inputFields from '../utils/inputFields';

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

const RenderInputFields = ({ editedRepair, onChange }) => {
  const renderField = (field) => {
    const value =
      field.name === 'date'
        ? formatDate(editedRepair[field.name])
        : editedRepair[field.name] || '';

    return (
      <div key={field.name}>
        <InputField
          label={field.label}
          name={field.name}
          value={value}
          onChange={onChange}
          type={field.type === 'date' ? 'date' : 'text'}
          maxLength={field.maxLength}
        />
      </div>
    );
  };

  return inputFields.map(renderField);
};

export default RenderInputFields;
