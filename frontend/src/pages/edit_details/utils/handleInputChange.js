const handleInputChange = (e, editedCar, setEditedCar) => {
  const { name, value } = e.target;

  setEditedCar((prevCar) => ({ ...prevCar, [name]: value }));
};
export default handleInputChange;
