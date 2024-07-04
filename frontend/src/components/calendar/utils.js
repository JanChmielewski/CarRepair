export const formatDate = (date) => {
  const d = new Date(date);
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

export const countRepairsForDate = (repairs, date) => {
  const formattedDate = formatDate(date);
  console.log('Counting repairs for date:', formattedDate);
  const filteredRepairs = repairs.filter((repair) => {
    const repairDate = formatDate(new Date(repair.dateOFHandingOver));
    console.log('Repair Date:', repairDate);
    return repairDate === formattedDate;
  });
  console.log('Filtered Repairs:', filteredRepairs);
  return filteredRepairs.length;
};

export const getCarInfo = (carID, cars, clients) => {
  const car = cars.find((car) => car.id === carID);
  if (!car) return 'Nie znaleziono informacji o samochodzie';
  const client = clients.find(
    (client) => client.clientId === car.clientId
  );
  return `${car.brand} ${car.model} (${client.name} ${client.surname})`;
};
