const BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  // User endpoints
  GET_USERS: `${BASE_URL}/users`,
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/api/login`,

  // Client endpoints
  GET_CLIENTS: `${BASE_URL}/clients`,
  ADD_CLIENT: `${BASE_URL}/addClient`,

  // Car endpoints
  GET_CARS: `${BASE_URL}/cars`,
  ADD_CAR_FOR_REPAIR: (clientId) =>
    `${BASE_URL}/addCarForRepair/${clientId}`,
  DELETE_ALL_CARS: `${BASE_URL}/deleteAllCars`,
  GET_CARS_FOR_DASHBOARD: `${BASE_URL}/carsForDashboard`,
  DELETE_CAR: `${BASE_URL}/deleteCar/`,
  EDIT_CAR_INFO: `${BASE_URL}/editCarInfo`,

  // Repair endpoints
  GET_REPAIRS: `${BASE_URL}/repairs`,
};
