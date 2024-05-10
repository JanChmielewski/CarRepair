const inputFields = [
  {
    label: 'Numer VIN',
    name: 'vinNumber',
    maxLength: 17,
  },
  { label: 'Model', name: 'name', maxLength: 40 },
  { label: 'Klient', name: 'owner', maxLength: 40 },
  {
    label: 'Numer telefonu',
    name: 'phoneNumber',
    type: 'tel',
    maxLength: 11,
  },
  { label: 'Informacje od klienta', name: 'infoFromClient' },
  { label: 'Informacje od mechanika', name: 'additionalInfo' },
  { label: 'Data przyjęcia', name: 'date', type: 'date' },
];
export default inputFields;
