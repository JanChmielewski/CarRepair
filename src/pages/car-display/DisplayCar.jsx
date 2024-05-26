import React from 'react';
import { cars, clients, repairs } from '../../utils';
import PreviousPageButton from '../../components/PreviousPageButton';
import { useParams } from 'react-router-dom';
import Icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';
import './DisplayCar.css';

function DisplayCar() {
  const navigate = useNavigate();
  const { repairID } = useParams();

  console.log('Repair id:', repairID);
  const repair = repairs.find(
    (repair) => repair.repairID === parseInt(repairID)
  );

  if (!repair) {
    return <div>Repair not found for id: {repairID}</div>;
  }

  const car = cars.find((car) => car.carID === repair.carID);

  if (!car) {
    return <div>Car not found for repair ID: {repairID}</div>;
  }

  const client = clients.find(
    (client) => client.clientID === car.clientID
  );

  if (!client) {
    return <div>Client not found for car ID: {car.carID}</div>;
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
