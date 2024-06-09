import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayCar from './DisplayCar';
import { PARAMS } from '../../utils/routes';

function DisplayCarDetails() {
  const params = useParams();
  const dynamicId = params[PARAMS.DYNAMIC_ID];

  return (
    <div>
      <DisplayCar repairID={dynamicId} />
    </div>
  );
}

export default DisplayCarDetails;
