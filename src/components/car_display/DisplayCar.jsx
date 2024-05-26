// DisplayCar.jsx
import React, { useEffect } from 'react';
import { useCarDetails } from '../../hooks/useCarDetails';
import PreviousPageButton from '../common/PreviousPageButton';
import { useParams } from 'react-router-dom';
import Icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';

function DisplayCar() {
  const navigate = useNavigate();
  const { repairID } = useParams();
  const { car, client, repair, error, isLoading } =
    useCarDetails(repairID);

  useEffect(() => {
    if (error) {
      navigate('/not-found', {
        state: {
          message:
            'Przepraszamy, samochód o podanym numerze VIN nie istnieje. Prosimy sprawdzić poprawność adresu VIN.',
        },
      });
    }
  }, [error, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return null;
  }

  const handleEditButton = () => {
    navigate(`/edit-details/${repairID}`);
  };

  return (
    <div>
      <div className="buttons">
        <PreviousPageButton buttonColor={'pink'} />
        <button
          className="button edit-btn"
          onClick={handleEditButton}
        >
          <Icons.Edit className="icon black-icon" />
          Edit
        </button>
      </div>
      <h2 className="car-title">
        {car.brand} {car.model}
      </h2>
      <ul className="car-info-list">
        <li>
          <span className="label">Numer VIN:</span> {car.vinNumber}
        </li>
        <li>
          <span className="label">Numer rejestracyjny:</span>{' '}
          {car.registrationNumber}
        </li>
        <li>
          <span className="label">Data produkcji:</span>{' '}
          {car.productionDate}
        </li>
        <li>
          <span className="label">Przebieg:</span> {car.mileage}
        </li>
        <li>
          <span className="label">Silnik:</span> {car.engine}
        </li>
        <br />
        <li>
          <span className="label">Właściciel:</span>{' '}
          {client.ownerName}
        </li>
        <li>
          <span className="label">Data przyjęcia:</span>{' '}
          {repair.dateOfArrival}
        </li>
        <li>
          <span className="label">Data wydania:</span>{' '}
          {repair.deadlineDate}
        </li>
        <li>
          <span className="label">Informacje od klienta:</span>{' '}
          {repair.clientInfo}
        </li>
        <li>
          <span className="label">Stan naprawy:</span>{' '}
          {repair.repairStatus}
        </li>
        <li>
          <span className="label">Naprawiane przez:</span>{' '}
          {repair.repairedBy}
        </li>
      </ul>
    </div>
  );
}

export default DisplayCar;
