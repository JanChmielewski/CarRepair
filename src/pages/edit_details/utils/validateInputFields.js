import setError from './setError';

export const validateInputFields = (
  inputFields,
  editedRepairState
) => {
  const formErrors = {};

  inputFields.forEach((field) => {
    const { name } = field;
    const value = editedRepairState[name]; // Use editedRepairState
    const isOnlyDigits = name === 'phone' || name === 'mileage';
    const isEmail = name === 'email';
    const errorMessage = setError(
      field.label,
      value,
      field.maxLength,
      field.minLength,
      isOnlyDigits,
      field.required,
      isEmail
    );
    if (errorMessage) {
      formErrors[name] = errorMessage;
    }
  });

  return formErrors;
};
