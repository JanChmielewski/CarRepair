import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import RenderTileContent from './RenderTileContent';
import RepairPopup from './RepairPopup';
import { useNavigate } from 'react-router-dom';
import { formatDate, countRepairsForDate, getCarInfo } from './utils'; // Added getCarInfo here
import Navbar from '../common/Navbar';
import 'react-calendar/dist/Calendar.css';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRepairs, setSelectedRepairs] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const repairsResponse = await fetch(
          API_ENDPOINTS.GET_REPAIRS,
          {
            headers,
          }
        );
        const carsResponse = await fetch(API_ENDPOINTS.GET_CARS, {
          headers,
        });
        const clientsResponse = await fetch(
          API_ENDPOINTS.GET_CLIENTS,
          {
            headers,
          }
        );

        if (
          !repairsResponse.ok ||
          !carsResponse.ok ||
          !clientsResponse.ok
        ) {
          throw new Error('Failed to fetch data');
        }

        const repairsData = await repairsResponse.json();
        const carsData = await carsResponse.json();
        const clientsData = await clientsResponse.json();

        setRepairs(repairsData.repairs);
        setCars(carsData.cars);
        setClients(clientsData.clients);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    const filteredRepairs = repairs.filter(
      (repair) =>
        repair.dateOFHandingOver &&
        repair.dateOFHandingOver.split('T')[0] === formattedDate
    );
    setSelectedRepairs(filteredRepairs);
    setIsPopupOpen(true);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (selectedRepairs.length > 0) {
      setIsPopupOpen(true);
    }
  }, [selectedRepairs]);

  return (
    <div className="calendar-page">
      <Navbar page={'Kalendarz'} />
      <div className="calendar">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="pl-PL"
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
