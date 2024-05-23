# Hooks

`useCarDetails`: A custom hook that fetches and returns car, client, and repair details based on the provided `repairID`. It also manages loading and error states.

Usage:

```js
const { car, client, repair, error, isLoading } =
  useCarDetails(repairID);
```

`useRepairDetails`: A custom hook that fetches and returns repair details based on the provided `repairID` and `isNewRepair` flag. It also includes a `saveRepairDetails` function that sends a POST request to either add a new repair or update an existing one.

Usage:

```js
const { repairDetails, saveRepairDetails } = useRepairDetails(
  repairID,
  isNewRepair
);
```

`useSearchQuery`: A custom hook that manages a search query state. It returns the current search query and a handler function to update it.

Usage:

```js
const [searchQuery, handleSearchInputChange] = useSearchQuery();
```
