// handleVinNumber.js
const VIN_LENGTH_MIN = 11;
const VIN_LENGTH_MAX = 17;

export const handleVinNumber = (
  value,
  setEditedCar,
  setVinNumberError
) => {
  const formattedValue = value.toUpperCase().slice(0, VIN_LENGTH_MAX);
  setEditedCar((prevCar) => ({
    ...prevCar,
    vinNumber: formattedValue,
  }));
  validateVinNumber(formattedValue, setVinNumberError);
};

const validateVinNumber = (formattedValue, setVinNumberError) => {
  const hasValidLength = formattedValue.length >= VIN_LENGTH_MIN;
  const hasNumbers = /\d/.test(formattedValue);

  if (!hasValidLength) {
    setVinNumberError(
      'Numer VIN musi zawierać co najmniej 11 znaków.'
    );
  } else if (!hasNumbers) {
    setVinNumberError('Numer VIN musi zawierać cyfry.');
  } else {
    setVinNumberError('');
  }
};
