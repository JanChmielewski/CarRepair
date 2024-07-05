import { API_ENDPOINTS } from '../../utils/api/api_endpoints';

export async function handleSave(
  isNewRepair,
  selectedRepair,
  editedRepair
) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const firstName = editedRepair.clientFirstName;
    const lastName = editedRepair.clientLastName;

    console.log('Status before save:', editedRepair.status);

    if (isNewRepair) {
      let clientId;

      const clientExists = await checkClientExists(
        editedRepair,
        token
      );
      if (clientExists) {
        clientId = clientExists.id;
      } else {
        const newClient = await addClient(editedRepair, token);
        clientId = newClient.clientId;
      }

      if (!clientId) {
        throw new Error(
          'Client ID is undefined after adding a new client.'
        );
      }

      const addCarResponse = await fetch(
        `${API_ENDPOINTS.ADD_CAR_FOR_REPAIR(clientId)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            brand: editedRepair.brand,
            model: editedRepair.model,
            yearOfProduction: editedRepair.productionDate,
            registrationNumber: editedRepair.registrationNumber,
            vin: editedRepair.vinNumber,
            mileage: editedRepair.mileage,
            engine: editedRepair.engine,
            status: editedRepair.status,
          }),
        }
      );

      const addCarData = await safeParseJSON(addCarResponse);
      if (!addCarResponse.ok) {
        throw new Error(
          `Failed to add car: ${addCarData.raw || addCarData}`
        );
      }

      // Add repair details
      const addRepairResponse = await fetch(
        `${API_ENDPOINTS.ADD_REPAIR}/${addCarData.carID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            repairDescription: editedRepair.repairDescription,
            repairCost: editedRepair.repairCost,
            repairStatus: editedRepair.repairStatus,
            dateOfAdmission: editedRepair.dateOfAdmission,
            dateOfHandingOver: editedRepair.dateOfHandingOver,
            infoFromClient: editedRepair.infoFromClient,
            infoFromWorker: editedRepair.infoFromWorker,
            repairedBy: editedRepair.repairedBy,
          }),
        }
      );

      const addRepairData = await safeParseJSON(addRepairResponse);
      if (!addRepairResponse.ok) {
        throw new Error(
          `Failed to add repair: ${
            addRepairData.raw || addRepairData
          }`
        );
      }

      console.log(
        'Car and repair successfully added',
        addCarData,
        addRepairData
      );
      return null;
    } else {
      if (!selectedRepair) {
        throw new Error('Selected repair is not defined.');
      }

      const carId = selectedRepair.id;
      if (!carId) {
        throw new Error('Car ID is undefined.');
      }

      // Update car details
      const editCarResponse = await fetch(
        `${API_ENDPOINTS.EDIT_CAR_INFO}/${carId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            brand: editedRepair.brand,
            model: editedRepair.model,
            yearOfProduction: editedRepair.productionDate,
            registrationNumber: editedRepair.registrationNumber,
            vin: editedRepair.vinNumber,
            mileage: editedRepair.mileage,
            engine: editedRepair.engine,
            status: editedRepair.status,
            client: {
              clientId: selectedRepair.client.clientId,
              name: firstName,
              surname: lastName,
              email: editedRepair.email,
              phoneNumber: editedRepair.phone,
            },
          }),
        }
      );
      console.log(
        'Sending car update request with status:',
        editedRepair.status
      );

      const editCarData = await safeParseJSON(editCarResponse);
      console.log('Response from server:', editCarData); // Debug log

      if (!editCarResponse.ok) {
        throw new Error(
          `Failed to save car details: ${
            editCarData.raw || editCarData
          }`
        );
      }

      // Update repair details
      if (selectedRepair.repairId) {
        const repairId = selectedRepair.repairId;
        const editRepairResponse = await fetch(
          `${API_ENDPOINTS.EDIT_REPAIR}/${repairId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              repairDescription: editedRepair.repairDescription,
              repairCost: editedRepair.repairCost,
              repairStatus: editedRepair.repairStatus,
              dateOfAdmission: editedRepair.dateOfAdmission,
              dateOfHandingOver: editedRepair.dateOfHandingOver,
              infoFromClient: editedRepair.infoFromClient,
              infoFromWorker: editedRepair.infoFromWorker,
              repairedBy: editedRepair.repairedBy,
            }),
          }
        );

        const editRepairData = await safeParseJSON(
          editRepairResponse
        );
        if (!editRepairResponse.ok) {
          const errorText = await editRepairResponse.text();
          throw new Error(
            `Failed to save repair details: ${errorText}`
          );
        }
        console.log(
          'Repair details saved successfully',
          editRepairData
        );
      }

      return null;
    }
  } catch (error) {
    console.error('Error saving repair details:', error);
    return 'Wystąpił błąd podczas zapisu. Spróbuj ponownie.';
  }
}

export async function checkClientExists(editedRepair, token) {
  if (!token) {
    throw new Error('No token found');
  }

  const clientsResponse = await fetch(
    `${API_ENDPOINTS.GET_CLIENTS}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const clientsResponseText = await clientsResponse.text();

  if (!clientsResponse.ok) {
    throw new Error('Failed to fetch clients');
  }

  const clientsData = JSON.parse(clientsResponseText);

  const searchEmail = editedRepair.email.toLowerCase().trim();
  const searchPhone = editedRepair.phone.trim();

  const existingClient = clientsData.clients.find((client) => {
    const clientEmail = (client.email || '').toLowerCase().trim();
    const clientPhone = (client.phoneNumber || '').trim();

    const isEmailMatch = clientEmail === searchEmail;
    const isPhoneMatch = clientPhone === searchPhone;

    return isEmailMatch || isPhoneMatch;
  });

  return existingClient || undefined;
}

async function addClient(editedRepair, token) {
  const addClientResponse = await fetch(
    `${API_ENDPOINTS.ADD_CLIENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editedRepair.clientFirstName,
        surname: editedRepair.clientLastName,
        email: editedRepair.email,
        phoneNumber: editedRepair.phone,
      }),
    }
  );

  const textResponse = await addClientResponse.text();

  if (!addClientResponse.ok) {
    throw new Error(`Failed to add client: ${textResponse}`);
  }

  const parsedResponse = JSON.parse(textResponse);
  if (parsedResponse && parsedResponse.clientId) {
    return parsedResponse;
  }

  throw new Error('Failed to add client: Invalid response format');
}

async function safeParseJSON(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    console.warn('Failed to parse JSON:', text);
    return { raw: text }; // Return the raw text wrapped in an object
  }
}
