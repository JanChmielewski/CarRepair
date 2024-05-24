import { useState } from 'react';

export function useInput(defaultValue, validationFunc) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  // Check if input is valid
  const valueIsValid = validationFunc(enteredValue);

  function handleInputChange(event) {
    // Update the state with the new value entered by the user
    setEnteredValue(event.target.value);
    // Reset the input every time the user starts typing again
    setDidEdit(false);
  }

  // Confirm if the user started editing the input field
  function handleInputBlur(identifier) {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
