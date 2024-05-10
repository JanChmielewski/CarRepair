const PHONE_LENGTH_MAX = 11;

export const formatPhoneNumber = (value) => {
  const formattedValue = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
  return formattedValue.length > PHONE_LENGTH_MAX
    ? formattedValue.slice(0, PHONE_LENGTH_MAX)
    : formattedValue;
};

export const handlePhoneNumber = (
  value,
  setEditedCar,
  setPhoneNumberError
) => {
  const formattedValue = formatPhoneNumber(value);
  setEditedCar((prevCar) => ({
    ...prevCar,
    phoneNumber: formattedValue,
  }));
  validatePhoneNumber(formattedValue, setPhoneNumberError);
};

const validatePhoneNumber = (formattedValue, setPhoneNumberError) => {
  const isValidPhoneNumber = /^\d{3}-\d{3}-\d{3}$/.test(
    formattedValue
  );
  setPhoneNumberError(
    isValidPhoneNumber ? '' : 'Numer telefonu musi zawierać 9 cyfr.'
  );
};
