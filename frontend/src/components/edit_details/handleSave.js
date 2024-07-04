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

    if (isNewRepair) {
      // Logika dla dodawania nowego samochodu i klienta (jak w twoim kodzie)
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
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            brand: editedRepair.brand,
            model: editedRepair.model,
            yearOfProduction: editedRepair.productionDate,
            registrationNumber: editedRepair.registrationNumber,
            vin: editedRepair.vinNumber,
            mileage: editedRepair.mileage,
            engine: editedRepair.engine,
            status: 'WAITING_FOR_DIAGNOSIS',
          }),
        }
      );

      const addCarData = await safeParseJSON(addCarResponse);
      if (!addCarResponse.ok) {
        throw new Error(
          `Failed to add car: ${addCarData.raw || addCarData}`
        );
      }

      console.log('Car successfully added', addCarData);
      return null;
    } else {
      // Logika dla edytowania istniejących danych
      const carId = selectedRepair.id;
      const editCarResponse = await fetch(
        `${API_ENDPOINTS.EDIT_CAR_INFO}/${carId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            brand: editedRepair.brand,
            model: editedRepair.model,
            yearOfProduction: editedRepair.productionDate,
            registrationNumber: editedRepair.registrationNumber,
            vin: editedRepair.vinNumber,
            mileage: editedRepair.mileage,
            engine: editedRepair.engine,
            status: selectedRepair.status,
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

      if (!editCarResponse.ok) {
        const errorText = await editCarResponse.text();
        throw new Error(`Failed to save car details: ${errorText}`);
      }

      // Jeśli istnieją dane naprawy do zaktualizowania, zrób to
      if (selectedRepair.repairId) {
        const repairId = selectedRepair.repairId;
        const editRepairResponse = await fetch(
          `${API_ENDPOINTS.EDIT_REPAIR}/${repairId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
              repairDescription: editedRepair.mechanicInfo,
              repairCost: editedRepair.repairCost,
              repairStatus: editedRepair.repairStatus,
            }),
          }
        );

        if (!editRepairResponse.ok) {
          const errorText = await editRepairResponse.text();
          throw new Error(
            `Failed to save repair details: ${errorText}`
          );
        }
      }

      console.log('Repair details saved successfully');
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
        Authorization: 'Bearer ' + token,
      },
    }
  );

  const clientsResponseText = await clientsResponse.text();

  if (!clientsResponse.ok) {
    throw new Error('Failed to fetch clients');
  }

  const clientsData = JSON.parse(clientsResponseText);

  const searchEmail = editedRepair.phone.toLowerCase().trim();
  const searchPhone = editedRepair.email.trim();

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
        Authorization: 'Bearer ' + token,
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
