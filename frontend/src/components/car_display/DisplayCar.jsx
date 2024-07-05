import React, { useEffect, useRef } from 'react';
import { useCarDetails } from '../../hooks/useCarDetails';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/pages/_displayCar.css';
import CopyButton from '../common/CopyButton';
import Navbar from '../common/Navbar';
import { ROUTES } from '../../utils/routes';
import { statusMap } from '../../utils/statusMap';

function DisplayCar() {
  const navigate = useNavigate();
  const { repairID } = useParams();
  const { car, client, repair, error, isLoading } =
    useCarDetails(repairID);

  const vinRef = useRef(null);

  useEffect(() => {
    if (error) {
      navigate(`${ROUTES.NOT_FOUND}`, {
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
    navigate(`${ROUTES.EDIT_DETAILS}/${repairID}`);
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <div className="root">
      <div className="flex-container">
        <div className="car-display">
          <div className="buttons">
            <Navbar
              page={'Szczegóły samochodu'}
              handleEditButton={handleEditButton}
              car={car}
            />
          </div>

          <ul className="car-info-list">
            <h3 className="section-title header-title car-title">
              Informacje o samochodzie
            </h3>
            <li>
              <span className="label">Marka i model:</span>
              <span className="info-content">
                {car.brand} {car.model}
              </span>
            </li>

            <li>
              <span className="label">Numer VIN:</span>
              <span
                className="info-content copy-content"
                ref={vinRef}
              >
                {car.vin}
                <CopyButton content={car.vin} />
              </span>
            </li>
            <li>
              <span className="label">Numer rejestracyjny:</span>
              <span className="info-content copy-content">
                {car.registrationNumber}
                <CopyButton content={car.registrationNumber} />
              </span>
            </li>
            <li>
              <span className="label">Data produkcji:</span>
              <span className="info-content">
                {car.yearOfProduction}
              </span>
            </li>
            <li>
              <span className="label">Przebieg:</span>
              <span className="info-content">{car.mileage}</span>
            </li>
            <li>
              <span className="label">Silnik:</span>
              <span className="info-content">{car.engine}</span>
            </li>

            <h3 className="section-title header-title">
              Informacje o właścicielu
            </h3>
            <li>
              <span className="label">Właściciel:</span>
              <span className="info-content">{client.ownerName}</span>
            </li>
            <li>
              <span className="label">Email:</span>
              <span className="info-content copy-content">
                {client.email}
                <CopyButton content={client.email} />
              </span>
            </li>
            <li>
              <span className="label">Telefon:</span>
              <span className="info-content copy-content">
                {client.phone}
                <CopyButton content={client.phone} />
              </span>
            </li>
            <h3 className="section-title header-title">
              Informacje o naprawie
            </h3>
            <li>
              <span className="label">Data przyjęcia:</span>
              <span className="info-content">
                {formatDate(repair.dateOfAdmission)}
              </span>
            </li>
            <li>
              <span className="label">Data wydania:</span>
              <span className="info-content">
                {formatDate(repair.dateOfHandingOver)}
              </span>
            </li>
            <li className="info-from-client">
              <span className="label">Informacje od klienta:</span>
              <span className="info-content">
                {repair.infoFromClient}
              </span>
            </li>
            <li>
              <span className="label">Stan naprawy:</span>
              <span className="info-content">
                {statusMap[car.status]}
              </span>
            </li>
            <li>
              <span className="label">Naprawiane przez:</span>
              <span className="info-content">
                {repair.repairedBy}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisplayCar;
