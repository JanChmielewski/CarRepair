// setError.js

const setError = (
  label,
  value,
  maxLength,
  minLength,
  isOnlyDigits,
  isRequired
) => {
  if (isRequired && !value.trim()) {
    return `Pole ${label} nie może być puste`;
  }

  if (minLength && value.length < minLength) {
    return `${label} powinien mieć min. ${minLength} znaków`;
  }

  if (isOnlyDigits && !/^\d+$/.test(value)) {
    return `${label} powinien zawierać tylko cyfry`;
  }

  if (isOnlyDigits && minLength && value.length < minLength) {
    return `${label} powinien składać się z samych cyfr`;
  }

  if (maxLength && value.length > maxLength) {
    return `${label} może mieć maksymalnie ${maxLength} znaków`;
  }

  return null;
};

export default setError;
