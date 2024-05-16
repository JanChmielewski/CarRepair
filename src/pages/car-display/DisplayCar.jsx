import React from 'react';
import { cars, clients, repairs } from '../../utils';
import PreviousPageButton from '../../components/PreviousPageButton';
import { useParams } from 'react-router-dom';
import Icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';

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

  // Find the car associated with the repair
  const car = cars.find((car) => car.carID === repair.carID);

  if (!car) {
    return <div>Car not found for repair ID: {repairID}</div>;
  }

  // Find the client associated with the car
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
        </button>
      </div>
      <h2 className="car-title">
        {car.brand} {car.model}
      </h2>
      <ul className="car-info-list">
        <li>Number VIN: {car.vinNumber}</li>
        <li>Number rejestracyjny: {car.registrationNumber}</li>
        <li>Data produkcji: {car.productionDate}</li>
        <li>Przebieg: {car.mileage}</li>
        <li>Silnik: {car.engine}</li>
        <br />
        <li>Właściciel: {client.ownerName}</li>
        <li>Data przyjęcia: {repair.dateOfArrival}</li>
        <li>Data wydania: {repair.deadlineDate}</li>
        <li>Informacje od klienta: {repair.clientInfo}</li>
        <li>Stan naprawy: {repair.repairStatus}</li>
        <li>Naprawiane przez: {repair.repairedBy}</li>
      </ul>
    </div>
  );
}

export default DisplayCar;
