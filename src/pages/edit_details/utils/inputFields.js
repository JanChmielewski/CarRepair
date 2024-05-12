const inputFields = [
  {
    label: 'Numer VIN',
    name: 'vinNumber',
    maxLength: 17,
    minLength: 17,
    required: true,
  },
  {
    label: 'Model',
    name: 'model',
    maxLength: 40,
    minLength: 1,
    required: true,
  },
  {
    label: 'Właściciel',
    name: 'ownerName',
    maxLength: 40,
    minLength: 1,
    required: true,
  },
  {
    label: 'Numer telefonu',
    name: 'phone',
    type: 'tel',
    maxLength: 11,
    minLength: 9,
    required: true,
  },
  {
    label: 'E-mail właściciela',
    name: 'email',
    type: 'email',
    maxLength: 40,
    minLength: 6,
    required: true,
  },
  {
    label: 'Numer rejestracyjny',
    name: 'registrationNumber',
    maxLength: 11,
    minLength: 6,
    required: true,
  },
  {
    label: 'Informacje od mechanika',
    name: 'mechanicInfo',
    required: false,
  },
  {
    label: 'Informacje od klienta',
    name: 'clientInfo',
    required: false,
  },
  {
    label: 'Data produkcji',
    name: 'productionDate',
    type: 'text',
    required: false,
  },
  { label: 'Przebieg', name: 'mileage', required: false },
  { label: 'Status naprawy', name: 'repairStatus', required: true },
  {
    label: 'Data przyjęcia',
    name: 'dateOfArrival',
    type: 'date',
    required: true,
  },
  {
    label: 'Data deadline',
    name: 'deadlineDate',
    type: 'date',
    required: true,
  },
];
export default inputFields;
