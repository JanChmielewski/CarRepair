import cars from './cars';
const repairs = [
  {
    repairID: cars[0].vinNumber,
    deadlineDate: '20-05-2024',
    dateOfArrival: '10-05-2024',
    repairStatus: 'completed',
    mechanicInfo: 'Replaced brake pads',
    clientInfo: 'Car was making squeaking noise when braking',
  },
  {
    repairID: '2HGFC2F59JH520434',
    deadlineDate: '25-05-2024',
    dateOfArrival: '12-05-2024',
    repairStatus: 'not completed',
    mechanicInfo: 'Replaced transmission fluid',
    clientInfo: 'Transmission slipping occasionally',
  },
  {
    repairID: '1FAFP4041KF131509',
    deadlineDate: '22-05-2024',
    dateOfArrival: '09-05-2024',
    repairStatus: 'completed',
    mechanicInfo: 'Fixed coolant leak',
    clientInfo: 'Car overheating issue',
  },
  {
    repairID: '1G1YY32G915120062',
    deadlineDate: '24-05-2024',
    dateOfArrival: '11-05-2024',
    repairStatus: 'not completed',
    mechanicInfo: 'Replaced worn-out tires',
    clientInfo: 'Tires losing traction in wet conditions',
  },
  {
    repairID: '5UXWX9C53H0W58752',
    deadlineDate: '21-05-2024',
    dateOfArrival: '08-05-2024',
    repairStatus: 'completed',
    mechanicInfo: 'Repaired power window mechanism',
    clientInfo: 'Driver-side window not functioning properly',
  },
  {
    repairID: 'JTHGL46F595025883',
    deadlineDate: '23-05-2024',
    dateOfArrival: '07-05-2024',
    repairStatus: 'not completed',
    mechanicInfo: 'Replaced worn-out suspension components',
    clientInfo: 'Car bouncing excessively over bumps',
  },
];

export default repairs;
