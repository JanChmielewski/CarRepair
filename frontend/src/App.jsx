import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES, PARAMS } from './utils/routes';
import Login from './components/login/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import EditDetails from './components/edit_details/EditDetails.jsx';
import NotFound from './components/not_found/NotFound.jsx';
import CalendarPage from './components/calendar/CalendarPage.jsx';
import DisplayCar from './components/car_display/DisplayCar.jsx';
import CarParts from './components/car_parts/CarParts.jsx';
import PrivateRoute from './PrivateRoute';

import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path={`${ROUTES.CAR}/:${PARAMS.DYNAMIC_ID}`}
          element={<PrivateRoute element={<DisplayCar />} />}
        />
        <Route
          path={`${ROUTES.EDIT_DETAILS}/:${PARAMS.DYNAMIC_ID}`}
          element={<PrivateRoute element={<EditDetails />} />}
        />
        <Route
          path={ROUTES.ADD_NEW_CAR}
          element={<PrivateRoute element={<EditDetails />} />}
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.NOT_FOUND} />}
        />
        <Route
          path={ROUTES.CALENDAR}
          element={<PrivateRoute element={<CalendarPage />} />}
        />
        <Route
          path={ROUTES.CAR_PARTS}
          element={<PrivateRoute element={<CarParts />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
