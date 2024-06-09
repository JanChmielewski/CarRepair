# `App Routing`

## `App.jsx`

This is the main application component that sets up the routing for the application.

- `BrowserRouter` as Router, Routes, Route`: These are components from `react-router-dom` used to set up routing.
- `Navigate`: This is a component from `react-router-dom` used to navigate to different routes.
- `Login, Dashboard, EditDetails, NotFound, CalendarPage, DisplayCar`: These are the different components that are rendered based on the route.
- `main.css`: This is the main CSS file for the application.

The `App` function returns a `Router` component with different `Route` components. Each `Route` has a `path` prop that matches the URL and an `element` prop that renders a component when the URL matches the path.

## `main.jsx`

This is the entry point of the application.

- `React`: This is the main React library.
- `ReactDOM`: This is the DOM-specific methods library in React.
- `App`: This is the main application component.
- `main.css`: This is the main CSS file for the application.

The `ReactDOM.createRoot` method is used to create a root container where the whole React application will live. The `.render` method then renders the `App` component into this root container. The `App` component is wrapped in `React.StrictMode` which checks for potential problems in the application during development.

## `routes.js`

This file exports two objects: `PARAMS` and `ROUTES`.

- `PARAMS`: This object contains parameters that are used in the routes. Currently, it only contains `DYNAMIC_ID` which is set to 'repairID'.
- `ROUTES`: This object contains the paths for the different routes in the application. Each property in the object represents a route and its value is the path for that route.

```javascript
export const PARAMS = {
  DYNAMIC_ID: 'repairID',
};

export const ROUTES = {
  DASHBOARD: '/dashboard',
  CALENDAR: '/calendar',
  CAR: '/car',
  EDIT_DETAILS: '/edit-details',
  ADD_NEW_CAR: '/edit-details/add-new-car',
  LOGIN: '/',
  NOT_FOUND: '/not-found',
};
```
