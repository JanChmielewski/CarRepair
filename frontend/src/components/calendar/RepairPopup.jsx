import React from 'react';
import { formatDate } from './utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const RepairPopup = ({
  isOpen,
  selectedDate,
  selectedRepairs,
  getCarInfo,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleAddNewRepair = () => {
    navigate(`${ROUTES.ADD_NEW_CAR}`);
  };

  return (
    <div className="popup-background open">
      <div className="popup">
        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>
        <h3>Naprawy na {formatDate(selectedDate)}:</h3>
        {selectedRepairs.length > 0 ? (
          <ul className="repair-list">
            {selectedRepairs.map((repair, index) => (
              <li key={repair.repairID}>
                <div
                  className="repair-data"
                  onClick={() =>
                    navigate(`${ROUTES.CAR}/${repair.repairID}`)
                  }
                >
                  <div className="repair-data-content">
                    <span className="calendar-dialog-label">
                      Samochód:
                    </span>{' '}
                    {getCarInfo(repair.carID, cars, clients)} <br />
                    <span className="calendar-dialog-label">
                      Mechanik:
                    </span>{' '}
                    {repair.repairedBy} <br />
                    <span className="calendar-dialog-label">
                      Status:
                    </span>{' '}
                    {repair.repairStatus}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Brak</p>
        )}
        <button
          className="add-repair-btn button"
          onClick={handleAddNewRepair}
        >
          Dodaj nową naprawę
        </button>
      </div>
    </div>
  );
};

export default RepairPopup;
