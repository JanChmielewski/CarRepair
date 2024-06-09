const setError = (
  label,
  value,
  maxLength,
  minLength,
  isOnlyDigits,
  isRequired,
  isEmail
) => {
  const lowercasedFirstCharLabel =
    label.charAt(0).toLowerCase() + label.slice(1);

  if (isRequired && (!value || !value.trim())) {
    return `Pole ${lowercasedFirstCharLabel} nie może być puste.`;
  }

  if (minLength && value.length < minLength) {
    if (minLength === 1) {
      return `Pole ${lowercasedFirstCharLabel} powinno mieć co najmniej ${minLength} znak.`;
    }
    if (minLength > 1 && minLength < 5) {
      return `Pole ${lowercasedFirstCharLabel} powinno mieć co najmniej ${minLength} znaki.`;
    }
    return `Pole ${lowercasedFirstCharLabel} powinno mieć co najmniej ${minLength} znaków.`;
  }

  if (isOnlyDigits && !/^\d+$/.test(value)) {
    return `Pole ${lowercasedFirstCharLabel} powinno zawierać tylko cyfry.`;
  }

  if (isOnlyDigits && minLength && value.length < minLength) {
    return `Pole ${lowercasedFirstCharLabel} powinno składać się z samych cyfr i mieć co najmniej ${minLength} znaków.`;
  }

  if (maxLength && value.length > maxLength) {
    return `Pole ${lowercasedFirstCharLabel} może mieć maksymalnie ${maxLength} znaków.`;
  }

  if (isEmail && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `Wprowadź poprawny adres e-mail.`;
  }

  return null;
};

export default setError;
