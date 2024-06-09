import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from './utils/routes';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;
