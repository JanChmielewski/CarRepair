// utils/formatDate.js
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

// Dodatkowe logi
console.log('Original date:', dateString);
console.log('Formatted date:', `${year}-${month}-${day}`);
