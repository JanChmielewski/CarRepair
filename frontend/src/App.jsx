import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import EditDetails from './components/edit_details/EditDetails.jsx';
import NotFound from './components/not_found/NotFound.jsx';
import CalendarPage from './components/calendar/CalendarPage.jsx';
import DisplayCar from './components/car_display/DisplayCar.jsx';

import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/car/:repairID" element={<DisplayCar />} />
        <Route
          path="/edit-details/:repairID"
          element={<EditDetails />}
        />
        <Route
          path="/edit-details/add-new-car"
          element={<EditDetails />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
