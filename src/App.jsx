import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ROUTES, PARAMS } from './utils/routes';
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
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={`${ROUTES.CAR}/:${PARAMS.DYNAMIC_ID}`}
          element={<DisplayCar />}
        />
        <Route
          path={`${ROUTES.EDIT_DETAILS}/:${PARAMS.DYNAMIC_ID}`}
          element={<EditDetails />}
        />
        <Route path={ROUTES.ADD_NEW_CAR} element={<EditDetails />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.NOT_FOUND} />}
        />
        <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
