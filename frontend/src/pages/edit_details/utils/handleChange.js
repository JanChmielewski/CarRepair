import { handlePhoneNumber } from './handlePhoneNumber';
import { handleVinNumber } from './handleVinNumber';

export const handleChange = (
  e,
  editedCar,
  setEditedCar,
  setPhoneNumberError,
  setVinNumberError
) => {
  const { name, value } = e.target;

  switch (name) {
    case 'phoneNumber':
      handlePhoneNumber(value, setEditedCar, setPhoneNumberError);
      break;
    case 'vinNumber':
      handleVinNumber(value, setEditedCar, setVinNumberError);
      break;
    default:
      setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
      break;
  }
};
