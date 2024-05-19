import React, { useState } from 'react';
import Calendar from 'react-calendar';
import RenderTileContent from './RenderTileContent';
import RepairPopup from './RepairPopup';
import { repairs, cars, clients } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { getCarInfo, formatDate, countRepairsForDate } from './utils';

import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';

const CalendarPage = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRepairs, setSelectedRepairs] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const repairCount = countRepairsForDate(repairs, date);
    const formattedDate = formatDate(date);
    const filteredRepairs = repairs.filter(
      (repair) => repair.deadlineDate === formattedDate
    );
    setSelectedRepairs(filteredRepairs);
  };

  return (
    <div className="calendar-page">
      <div className="calendar">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) => (
            <RenderTileContent repairs={repairs} date={date} />
          )}
        />
      </div>
      {selectedRepairs.length > 0 && (
        <RepairPopup
          selectedDate={selectedDate}
          selectedRepairs={selectedRepairs}
          navigate={navigate}
          getCarInfo={(carID) => getCarInfo(carID, cars, clients)}
        />
      )}
    </div>
  );
};

export default CalendarPage;
