# Components

## `/login`

`Login`: A component that renders the login form. It uses the `useInput` hook for input state and validation, and `handleSubmit` for form submission.

Usage:

```js
<Login />
```

`handleSubmit`: A function that handles the form submission. It validates the inputs, makes a POST request to the login endpoint, and navigates to the dashboard if the request is successful.

Usage:

```js
handleSubmit(
  event,
  idValue,
  passwordValue,
  idHasError,
  passwordHasError,
  setLoginError,
  navigate
);
```

`Input`: A reusable input component that displays a label, an input field, and an optional error message.

Usage:

```js
<Input label="ID" fieldId="id" error={idHasError && 'Invalid ID.'} />
```

`useInput`: A custom hook for managing input state and validation. It returns the current value, handlers for input change and blur events, and a boolean indicating if there's an error.

Usage:

```js
const { value, handleInputChange, handleInputBlur, hasError } =
  useInput('', validationFunc);
```

In the `validation.js` file:

`hasMinLength`: A function that checks if a value meets a minimum length.

Usage:

```js
hasMinLength(value, minLength);
```

`isEqualToOtherValue`: A function that checks if a value equals another value.

Usage:

```js
isEqualsToOtherValue(value, otherValue);
```

## `/dashboard`

`Dashboard`: Main layout component. Uses `Navbar` for navigation and `CarList` for displaying cars. Utilizes `useSearchQuery` hook to manage search functionality.

`Card`: A component that displays car repair details. It includes edit and delete buttons. Clicking on the card navigates to the car's details page, clicking on the edit button navigates to the edit details page, and clicking on the delete button opens a delete confirmation dialog.

Usage:

```js
<Card
  repairID={repairID}
  brand={brand}
  model={model}
  owner={owner}
  date={date}
/>
```

`CarList`: A component that displays a list of cars. It filters the cars based on the search query and maps each car to a `Card` component.

Usage:

```js
<CarList searchQuery={searchQuery} />
```

`DeleteConfirmationDialog`: A component that displays a delete confirmation dialog. It calls the `onConfirm` prop when the confirm button is clicked and the `onCancel` prop when the cancel button is clicked.

Usage:

```js
<DeleteConfirmationDialog
  isOpen={isOpen}
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>
```

`Navbar`: A component that displays a navigation bar. It includes a search field and icon buttons for calendar, add new car, and logout.

Usage:

```js
<Navbar handleSearchInputChange={handleSearchInputChange} />
```

`SearchField`: A component that displays a search field. It calls the `handleSearchInputChange` prop when the input value changes.

Usage:

```js
<SearchField handleSearchInputChange={handleSearchInputChange} />
```

### `/calendar`

`CalendarPage`: This component displays a calendar where each date tile shows the number of repairs scheduled for that date. When a date is selected, it filters the repairs for that date and opens a popup if there are any repairs.

Usage:

```js
<CalendarPage />
```

`RenderTileContent`: This component displays the number of repairs for a given date. It also handles the pluralization of the word "repair" in Polish. When clicked, it triggers the `onClickRepair` function passed as a prop.

Usage:

```js
<RenderTileContent
  repairs={repairs}
  date={date}
  onClickRepair={handleOpenPopup}
/>
```

`RepairPopup`: This component displays a popup with the list of repairs for the selected date. Each repair includes the car info, the mechanic, and the status. Clicking on a repair navigates to the repair details page. The popup can be closed by clicking on the close button.

Usage:

```js
<RepairPopup
  isOpen={isPopupOpen}
  selectedDate={selectedDate}
  selectedRepairs={selectedRepairs}
  navigate={navigate}
  getCarInfo={(carID) => getCarInfo(carID, cars, clients)}
  onClose={handleClosePopup}
/>
```

In the `utils.js` file:

`getCarInfo`: This function takes a car ID, an array of cars, and an array of clients. It finds the car and the client associated with the car and returns a string containing the car brand, model, and the owner's name.

Usage:

```js
const carInfo = getCarInfo(carID, cars, clients);
```

`formatDate`: This function takes a date object and returns a string in the format "dd-mm-yyyy".

Usage:

```js
const formattedDate = formatDate(date);
```

`countRepairsForDate`: This function takes an array of repairs and a date. It returns the number of repairs scheduled for that date.

Usage:

```js
const repairCount = countRepairsForDate(repairs, date);
```

### `/car_display`

`DisplayCar`: A component that displays the details of a car. It uses the `useCarDetails` hook to fetch the car details, and `useNavigate` and `useParams` from `react-router-dom` for navigation and parameter extraction.

Usage:

```js
<DisplayCar />
```

`DisplayCarDetails`: A component that wraps the `DisplayCar` component. It uses `useParams` from react-router-dom to extract the `repairID` from the URL parameters and passes it to the `DisplayCar` component.

Usage:

```js
<DisplayCarDetails />
```

## `/edit_details`

`EditDetails`: A component that handles the editing of repair details. It uses `useParams`, `useLocation`, and `useNavigate` from `react-router-dom` for navigation, parameter extraction, and location checking. It also uses `useEffect` to redirect to a `not-found` page if the repair does not exist.

Usage:

```js
<EditDetails />
```

`EditDetailsForm`: A component that renders a form for editing repair details. It uses local state to manage the form fields and error messages. It also includes a save button that triggers the `onSave` callback when clicked.

Usage:

```js
<EditDetailsForm
  editedRepair={editedRepair}
  onChange={handleChange}
  onSave={handleSave}
  isNewRepair={isNewRepair}
/>
```

`handleSave`: An async function that sends a POST request to either add a new repair or update an existing one. It returns an error message if the request fails.

Usage:

```js
const error = await handleSave(
  isNewRepair,
  selectedRepair,
  editedRepair
);
```

`SaveButton`: A reusable button component that triggers the `onClick` callback when clicked. It includes an icon and a label.

Usage:

```js
<SaveButton onClick={handleSave} />
```

## `/common`

`PreviousPageButton`: A reusable component that renders a button for navigating to the previous page or a specific destination. It uses `useNavigate` from `react-router-dom` for navigation.

Usage:

```js
<PreviousPageButton buttonColor="pink" pageDestination="/home" />
```

`CopyButton`: A component that copies content to the clipboard and displays a notification when the content is successfully copied. It uses the `navigator.clipboard` API to copy the content and local state to manage the visibility of the notification.

Usage:

```js
<CopyButton content={content} />
```

`IconButton`: Button component that navigates to a specified destination when clicked.

Usage:

```js
<IconButton icon={IconComponent} destination={destination} />
```

### `/common/InputField`

`InputField`: A reusable input field component that includes a label, an input field, and an optional error message. It uses local state to manage the error message.

Usage:

```js
<InputField
  label="Name"
  name="name"
  value={name}
  onChange={handleChange}
/>
```

`InputLabel`: A reusable label component for input fields.

Usage:

```js
<InputLabel label="Name" className="input-label" />
```

`Input`: A reusable input component.

Usage:

```js
<Input
  type="text"
  name="name"
  value={name}
  onChange={handleChange}
  className="input-field"
/>
```

`ErrorMessage`: A reusable component that displays an error message.

Usage:

```js
<ErrorMessage message="Invalid input" />
```

`RenderInputFields`: A component that renders a list of `InputField` components based on the `inputFields` array. It uses the `formatDate` function to format date strings.

Usage:

```js
<RenderInputFields
  editedRepair={editedRepair}
  onChange={handleChange}
/>
```

## `/Not_found`

`NotFound`: A component that displays a 404 page when the user navigates to a route that does not exist. It uses `useLocation` from `react-router-dom` to access the location state and display a custom message if provided. It also includes a `PreviousPageButton` that redirects the user to the dashboard.

Usage:

```js
<NotFound />
```
