import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import { repairs, cars, clients } from '../../utils';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRepairs, setSelectedRepairs] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    const filteredRepairs = repairs.filter(
      (repair) => repair.deadlineDate === formattedDate
    );
    setSelectedRepairs(filteredRepairs);
  };

  const countRepairsForDate = (date) => {
    const formattedDate = formatDate(date);
    return repairs.filter(
      (repair) => repair.deadlineDate === formattedDate
    ).length;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getCarInfo = (carID) => {
    const car = cars.find((car) => car.carID === carID);
    const client = clients.find(
      (client) => client.clientID === car.clientID
    );
    return `${car.brand} ${car.model} (Owner: ${client.ownerName})`;
  };

  const renderRepairPopup = () => {
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

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const repairCount = countRepairsForDate(date);
      let repairString = 'napraw';

      // Customize the string based on the number of repairs
      if (repairCount === 1) {
        repairString = 'naprawa';
      } else if ([0, 5, 6, 7, 8, 9].includes(repairCount)) {
        repairString = 'napraw';
      } else if ([2, 3, 4].includes(repairCount)) {
        repairString = 'naprawy';
      }

      return (
        <p
          className={`repair-count ${
            repairCount === 0 ? 'grey-text' : 'pink-text'
          }`}
        >
          {repairCount} {repairString}
        </p>
      );
    }
  };

  return (
    <div className="calendar-page">
      <div className="calendar">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={renderTileContent}
        />
      </div>
      {selectedRepairs.length > 0 && renderRepairPopup()}
    </div>
  );
};

export default CalendarPage;
