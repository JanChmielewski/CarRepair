const PHONE_NUMBER_LENGTH_MAX = 11;

export const formatPhoneNumber = (phoneNumberInput) => {
  if (!phoneNumberInput) return '';

  return phoneNumberInput
    .replace(/\D/g, '')
    .slice(0, PHONE_NUMBER_LENGTH_MAX);
};

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
