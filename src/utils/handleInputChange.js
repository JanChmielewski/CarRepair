import setError from './setFieldError';

const handleInputChange = (e, editedCar, setEditedCar) => {
  const { name, value } = e.target;

  setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
};

export default handleInputChange;

export const validateInputFields = (
  inputFields,
  editedRepairState
) => {
  const formErrors = {};

  inputFields.forEach((field) => {
    const { name } = field;
    const value = editedRepairState[name];
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
