import React from 'react';
import { formatDate } from './utils';

const RepairPopup = ({
  isOpen,
  selectedDate,
  selectedRepairs,
  navigate,
  getCarInfo,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="popup-background open">
      <div className="popup">
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
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
    </div>
  );
};

export default RepairPopup;
