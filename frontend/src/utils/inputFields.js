const statusOptions = [
  { value: 'IN_REPAIR', label: 'w naprawie' },
  { value: 'READY_TO_PICK_UP', label: 'gotowy do odbioru' },
  { value: 'REPAIRED', label: 'naprawiony' },
  { value: 'WAITING_FOR_PAYMENT', label: 'oczekiwanie na zapłatę' },
  { value: 'WAITING_FOR_PARTS', label: 'oczekiwanie na części' },
  {
    value: 'WAITING_FOR_DIAGNOSIS',
    label: 'oczekiwanie na diagnostykę',
  },
];

const inputFields = [
  {
    label: 'Imię',
    name: 'clientFirstName',
    maxLength: 40,
    minLength: 1,
    required: true,
  },
  {
    label: 'Nazwisko',
    name: 'clientLastName',
    maxLength: 40,
    minLength: 1,
    required: true,
  },
  {
    label: 'Numer telefonu',
    name: 'phone',
    type: 'tel',
    maxLength: 15,
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
    label: 'Marka',
    name: 'brand',
    maxLength: 40,
    minLength: 1,
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
    label: 'Numer VIN',
    name: 'vinNumber',
    maxLength: 17,
    minLength: 17,
    required: true,
  },
  {
    label: 'Silnik',
    name: 'engine',
    maxLength: 50,
    minLength: 1,
    required: false,
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
  {
    label: 'Data przyjęcia',
    name: 'dateOfAdmission',
    type: 'date',
    required: true,
  },
  {
    label: 'Data deadline',
    name: 'dateOfHandingOver',
    type: 'date',
    required: true,
  },
  {
    label: 'Status',
    name: 'status',
    type: 'select',
    options: statusOptions,
    required: true,
  },
  {
    label: 'Stan naprawy',
    name: 'repairStatus',
    type: 'text',
    required: false,
  },
  {
    label: 'Naprawiane przez',
    name: 'repairedBy',
    type: 'text',
    required: false,
  },
];

export default inputFields;
