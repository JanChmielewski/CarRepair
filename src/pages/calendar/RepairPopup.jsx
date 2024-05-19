import React from 'react';
import { formatDate } from './utils';

const RepairPopup = ({
  selectedDate,
  selectedRepairs,
  navigate,
  getCarInfo,
  cars,
}) => {
  return (
    <div className="popup">
      <h3>Naprawy na {formatDate(selectedDate)}:</h3>
      <ul className="repair-list">
        {selectedRepairs.map((repair) => (
          <li
            className="repair-data"
            key={repair.repairID}
            onClick={() => navigate(`/car/${repair.repairID}`)}
          >
            <strong>Samochód:</strong> {getCarInfo(repair.carID)}{' '}
            <br />
            <strong>Mechanik:</strong> {repair.repairedBy} <br />
            <strong>Status:</strong> {repair.repairStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairPopup;
