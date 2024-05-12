// handleInput.js
export const handleInput = (
  input,
  label,
  minLength,
  maxLength,
  allDigits,
  setError,
  required
) => {
  let formattedInput = input.slice(0, maxLength);

  if (allDigits) {
    formattedInput = formattedInput.replace(/\D/g, '');
  }

  const hasNumbers = /\d/.test(formattedInput);
  const hasValidLength = formattedInput.length >= minLength;

  if (required && formattedInput.trim() === '') {
    setError(`${label} is required.`);
    formattedInput = ''; // Reset input value if it's empty
  } else {
    setError('');
  }

  if (label === 'phone') {
    if (!hasValidLength) {
      setError(`${label} must contain at least ${minLength} digits.`);
    }
  } else if (label === 'VIN') {
    if (!hasNumbers && !hasValidLength) {
      setError(
        `${label} must contain at least ${minLength} characters and digits.`
      );
    } else if (!hasValidLength) {
      setError(
        `${label} must contain at least ${minLength} characters.`
      );
    } else if (!hasNumbers) {
      setError('VIN number must contain digits.');
    }
  }

  return formattedInput;
};
