import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import CarList from './components/CarList';
import useSearchQuery from '../../hooks/useSearchQuery';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';

function Dashboard() {
  const [searchQuery, handleSearchInputChange] = useSearchQuery();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${API_ENDPOINTS.GET_CARS_FOR_DASHBOARD}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCars(data.cars);
      })
      .catch((error) => {
        console.log('Fetching cars failed: ', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar handleSearchInputChange={handleSearchInputChange} />
      <CarList searchQuery={searchQuery} cars={cars} />
    </div>
  );
}

export default Dashboard;
