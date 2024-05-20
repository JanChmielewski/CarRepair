import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DisplayCar from './DisplayCar';
import { cars, clients, repairs } from '../../utils';

function DisplayCarDetails() {
  const navigate = useNavigate();
  const { repairID } = useParams();

  console.log('vinNumber:', repairID);

  useEffect(() => {
    const carExists = [...cars, ...clients, ...repairs].some((item) =>
      ['vinNumber', 'id', 'repairID'].some(
        (key) => key in item && item[key] === repairID
      )
    );

    // If the car does not exist, navigate to not-found page
    if (!carExists) {
      navigate('/not-found');
    }
  }, [repairID, navigate]);

  return (
    <div>
      {/* Pass the vinNumber to the DisplayCar component */}
      <DisplayCar repairID={repairID} />
    </div>
  );
}

export default DisplayCarDetails;
