import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import EditDetails from './pages/edit_details/EditDetails.jsx';
import NotFound from './pages/not_found/NotFound.jsx';
import Calendar from './pages/calendar/Calendar.jsx';
import DisplayCar from './pages/car-display/DisplayCar.jsx';

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
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
