import React, { useState } from 'react';
import Calendar from 'react-calendar';
import RenderTileContent from './RenderTileContent';
import RepairPopup from './RepairPopup';
import { repairs, cars, clients } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { getCarInfo, formatDate, countRepairsForDate } from './utils';

import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
import PreviousPageButton from '../../components/PreviousPageButton';

const CalendarPage = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRepairs, setSelectedRepairs] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    const filteredRepairs = repairs.filter(
      (repair) => repair.deadlineDate === formattedDate
    );
    setSelectedRepairs(filteredRepairs);
    setIsPopupOpen(filteredRepairs.length > 0); // Open the popup if there are repairs on the selected date
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="calendar-page">
      <PreviousPageButton buttonColor={'pink'} />
      <div className="calendar">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date }) => (
            <RenderTileContent
              repairs={repairs}
              date={date}
              onClickRepair={handleOpenPopup}
            />
          )}
        />
      </div>
      {isPopupOpen && (
        <RepairPopup
          isOpen={isPopupOpen}
          selectedDate={selectedDate}
          selectedRepairs={selectedRepairs}
          navigate={navigate}
          getCarInfo={(carID) => getCarInfo(carID, cars, clients)}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default CalendarPage;
