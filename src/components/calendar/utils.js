export const getCarInfo = (carID, cars, clients) => {
  const car = cars.find((car) => car.carID === carID);
  const client = clients.find(
    (client) => client.clientID === car.clientID
  );
  return `${car.brand} ${car.model} (Owner: ${client.ownerName})`;
};

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const countRepairsForDate = (repairs, date) => {
  const formattedDate = formatDate(date);
  return repairs.filter(
    (repair) => repair.deadlineDate === formattedDate
  ).length;
};
