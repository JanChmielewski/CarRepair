import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import CarList from './components/CarList';
import Snackbar from '@mui/material/Snackbar';
import useSearchQuery from '../../hooks/useSearchQuery';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';

function Dashboard() {
  const [searchQuery, handleSearchInputChange] = useSearchQuery();
  const [cars, setCars] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchCars = () => {
    const token = localStorage.getItem('token');
    console.log(token);

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
  };

  const removeCarFromList = (carId) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    setSnackbarOpen(true); // Pokazanie Snackbar po usunięciu samochodu
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar handleSearchInputChange={handleSearchInputChange} />
      <CarList
        searchQuery={searchQuery}
        cars={cars}
        refreshCars={fetchCars}
        removeCar={removeCarFromList}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Samochód został pomyślnie usunięty"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

export default Dashboard;
