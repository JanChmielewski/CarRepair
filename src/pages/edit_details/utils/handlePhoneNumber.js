const PHONE_NUMBER_LENGTH_MAX = 11;

// Formats the phone number in the format xxx-xxx-xxx
export const formatPhoneNumber = (phoneNumberInput) => {
  if (!phoneNumberInput) return '';

  const formattedValue = phoneNumberInput
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');

  return formattedValue.slice(0, PHONE_NUMBER_LENGTH_MAX);
};

// Handles the phone number input, formats it, and validates it
export const handlePhoneNumber = (
  phoneNumberInput,
  setEditedCar,
  setPhoneNumberError
) => {
  const formattedValue = formatPhoneNumber(phoneNumberInput);
  setEditedCar((prevCar) => ({
    ...prevCar,
    phoneNumber: formattedValue,
  }));
  validatePhoneNumber(formattedValue, setPhoneNumberError);
};

const validatePhoneNumber = (formattedValue, setPhoneNumberError) => {
  if (
    formattedValue.length !== PHONE_NUMBER_LENGTH_MAX ||
    !/^\d{3}-\d{3}-\d{3}$/.test(formattedValue)
  ) {
    setPhoneNumberError(
      'Numer telefonu może zawierać maksymalnie 11 cyfr.'
    );
  } else {
    setPhoneNumberError('');
  }
};
