# Utils

## `/utils`

`formatDate.js`: A utility function that takes a date string in the format 'dd-mm-yyyy' and returns it in the format 'yyyy-mm-dd'.

Usage:

```js
formatDate('12-05-2021'); // Returns '2021-05-12'
```

`handleInputChange.js`: A function that handles input changes. It takes an event, the current state of the edited car, and a setter function for the edited car. It updates the state with the new value of the input field that triggered the event.

Usage:

```js
handleInputChange(event, editedCar, setEditedCar);
```

`validateInputFields.js`: A function that validates input fields. It takes an array of input fields and the current state of the edited repair. It returns an object with error messages for each field that fails validation.

Usage:

```js
validateInputFields(inputFields, editedRepairState);
```

`icons.js`: An object that maps icon names to their corresponding SVG components.

Usage:

```js
<Icons.Save /> // Renders the save icon
```

`index.js`: Exports API modules for cars, clients, and repairs.

`setFieldError.js`: A function that validates a single input field and returns an error message if the field fails validation. It takes the field label, value, max length, min length, whether the field should only contain digits, whether the field is required, and whether the field is an email.

Usage:

```js
setError(
  label,
  value,
  maxLength,
  minLength,
  isOnlyDigits,
  isRequired,
  isEmail
);
```

`validateInputFields.js`: A function that validates input fields. It takes an array of input fields and the current state of the edited repair. It returns an object with error messages for each field that fails validation.

Usage:

```js
validateInputFields(inputFields, editedRepairState);
```

## `/utils/api`

`cars.js`: An array of car objects. Each car object has properties for carID, vinNumber, brand, model, registrationNumber, productionDate, mileage, engine, and clientID.

Usage:

```js
import cars from './cars';
console.log(cars[0].brand); // Outputs 'Toyota'
```

`clients.js`: An array of client objects. Each client object has properties for clientID, ownerName, phone, and email.

Usage:

```js
import clients from './clients';
console.log(clients[0].ownerName); // Outputs 'John Doe'
```

`repairs.js`: An array of repair objects. Each repair object has properties for repairID, dateOfArrival, deadlineDate, carID, mechanicInfo, clientInfo, repairStatus, and repairedBy.

Usage:

```js
import repairs from './repairs';
console.log(repairs[0].mechanicInfo); // Outputs 'Replaced brake pads'
```
