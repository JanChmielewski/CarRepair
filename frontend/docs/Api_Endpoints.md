# `API endpoints`

The file, `src/utils/api/api_endpoints.js`, defines and exports a constant object `API_ENDPOINTS` that contains the URLs for various API endpoints used in the application.

## Base URL

The base URL for all endpoints is

```
http://localhost:8080
```

## Importing

```js
import { API_ENDPOINTS } from './api_endpoints';
```

## API_ENDPOINTS

- `API_ENDPOINTS` is an object that contains the following properties:

- `GET_USERS`: Endpoint to get all users. (`http://localhost:8080/users`)

- `REGISTER`: Endpoint to register a new user. (`http://localhost:8080/register`)

- `LOGIN`: Endpoint for user login. (`http://localhost:8080/api/login`)

- `GET_CLIENTS`: Endpoint to get all clients. (`http://localhost:8080/clients`)

- `ADD_CLIENT`: Endpoint to add a new client. (`http://localhost:8080/addClient`)

- `GET_CARS`: Endpoint to get all cars. (`http://localhost:8080/cars`)

- `ADD_CAR_FOR_REPAIR`: Function that takes a clientId and returns the endpoint to add a car for repair for the specified client. (`http://localhost:8080/addCarForRepair/{clientId}`)

- `DELETE_ALL_CARS`: Endpoint to delete all cars. (`http://localhost:8080/deleteAllCars`)

- `GET_CARS_FOR_DASHBOARD`: Endpoint to get cars for the dashboard. (`http://localhost:8080/carsForDashboard`)

## Usage

You can use these constants in your API calls. For example:

```js
fetch(API_ENDPOINTS.GET_USERS)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

This will fetch all users from the `GET_USERS` endpoint.
