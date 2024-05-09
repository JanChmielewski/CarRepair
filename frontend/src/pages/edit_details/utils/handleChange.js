// handleChange.js
import { handlePhoneNumber } from './handlePhoneNumber';
import { handleVinNumber } from './handleVinNumber';

export const handleChange = (
  e,
  editedCar,
  setEditedCar,
  setPhoneNumberError
) => {
  const { name, value } = e.target;

  if (name === 'phoneNumber') {
    handlePhoneNumber(value, setEditedCar, setPhoneNumberError);
  } else if (name === 'vinNumber') {
    handleVinNumber(value, setEditedCar, setPhoneNumberError);
  } else {
    setEditedCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  }
};
