// DisplayCarDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayCar from './DisplayCar';

function DisplayCarDetails() {
  const { repairID } = useParams();

  return (
    <div>
      {/* Pass the vinNumber to the DisplayCar component */}
      <DisplayCar repairID={repairID} />
    </div>
  );
}

export default DisplayCarDetails;
