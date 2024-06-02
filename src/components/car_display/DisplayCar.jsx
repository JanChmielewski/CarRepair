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
    <div className="car-display">
      <div className="buttons">
        <PreviousPageButton
          buttonColor={'pink'}
          arrowClassName="arrow-car-display"
        />
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
          <span className="label">Numer VIN:</span>
          <span className="info-content">{car.vinNumber}</span>
        </li>
        <li>
          <span className="label">Numer rejestracyjny:</span>
          <span className="info-content">
            {car.registrationNumber}
          </span>
        </li>
        <li>
          <span className="label">Data produkcji:</span>
          <span className="info-content">{car.productionDate}</span>
        </li>
        <li>
          <span className="label">Przebieg:</span>
          <span className="info-content">{car.mileage}</span>
        </li>
        <li>
          <span className="label">Silnik:</span>
          <span className="info-content">{car.engine}</span>
        </li>
        <br />
        <li>
          <span className="label">Właściciel:</span>
          <span className="info-content">{client.ownerName}</span>
        </li>
        <li>
          <span className="label">Data przyjęcia:</span>
          <span className="info-content">{repair.dateOfArrival}</span>
        </li>
        <li>
          <span className="label">Data wydania:</span>
          <span className="info-content">{repair.deadlineDate}</span>
        </li>
        <li className="info-from-client">
          <span className="label ">Informacje od klienta:</span>
          <span className="info-content">{repair.clientInfo}</span>
        </li>
        <li>
          <span className="label">Stan naprawy:</span>
          <span className="info-content">{repair.repairStatus}</span>
        </li>
        <li>
          <span className="label">Naprawiane przez:</span>
          <span className="info-content">{repair.repairedBy}</span>
        </li>
      </ul>
    </div>
  );
}

export default DisplayCar;
