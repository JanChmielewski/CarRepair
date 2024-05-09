// handleVinNumber.js
const VIN_LENGTH_MIN = 11;
const VIN_LENGTH_MAX = 17;

export const handleVinNumber = (
  value,
  setEditedCar,
  setPhoneNumberError
) => {
  const formattedValue = value.toUpperCase().slice(0, VIN_LENGTH_MAX);
  setEditedCar((prevCar) => ({
    ...prevCar,
    vinNumber: formattedValue,
  }));
  validateVinNumberLength(formattedValue, setPhoneNumberError);
};

const validateVinNumberLength = (
  formattedValue,
  setPhoneNumberError
) => {
  if (formattedValue.length < VIN_LENGTH_MIN) {
    setPhoneNumberError(
      'Numer VIN musi zawierać co najmniej 11 znaków.'
    );
  } else if (formattedValue.length > VIN_LENGTH_MAX) {
    setPhoneNumberError(
      'Numer VIN nie może zawierać więcej niż 17 znaków.'
    );
  } else {
    setPhoneNumberError('');
  }
};
