import React, { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import EditDetailsForm from './components/EditDetailsForm';
import PreviousPageButton from '../../components/PreviousPageButton.jsx';
import { handleChange } from './utils/handleChange.js';
import { cars } from '../../utils/cars';
import './EditDetails.css';

function EditDetails() {
  const navigate = useNavigate();
  const { vinNumber } = useParams();
  const location = useLocation();
  const isNewCar = location.pathname === '/edit-details/add-new-car';

  let selectedCar = null;
  if (!isNewCar) {
    selectedCar = cars.find((car) => car.vinNumber === vinNumber);
  }

  useEffect(() => {
    if (
      !isNewCar &&
      !cars.some((car) => car.vinNumber === vinNumber)
    ) {
      console.log('Redirecting to /not-found');
      navigate('/not-found');
    }
  }, [isNewCar, cars, vinNumber, navigate]);

  const [editedCar, setEditedCar] = useState(
    isNewCar ? {} : selectedCar || {}
  );
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [vinNumberError, setVinNumberError] = useState('');

  const handleSave = () => {
    console.log('Save clicked', editedCar);
    // Add logic to save edited car details
  };

  return (
    <div>
      <PreviousPageButton buttonColor="pink" />
      <EditDetailsForm
        selectedCar={selectedCar}
        editedCar={editedCar}
        phoneNumberError={phoneNumberError}
        vinNumberError={vinNumberError}
        onChange={(e) =>
          handleChange(
            e,
            editedCar,
            setEditedCar,
            setPhoneNumberError,
            setVinNumberError
          )
        }
        onSave={handleSave}
        isNewCar={isNewCar} // Pass isNewCar as prop to indicate if it's a new car
      />
    </div>
  );
}

export default EditDetails;
