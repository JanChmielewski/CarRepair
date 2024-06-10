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
      let clientId;

      const clientExists = await checkClientExists(editedRepair);
      if (clientExists) {
        console.log('Client already exists');
        clientId = clientExists.clientId;
      } else {
        const addClientResponse = await fetch(
          `${API_ENDPOINTS.ADD_CLIENT}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
              name: firstName,
              surname: lastName,
              email: editedRepair.email,
              phoneNumber: editedRepair.phone,
            }),
          }
        );

        const newClientData = await safeParseJSON(addClientResponse);
        if (!addClientResponse.ok) {
          throw new Error(
            `Failed to add client: ${
              newClientData.raw || newClientData
            }`
          );
        }

        if (newClientData.raw) {
          // Handle non-JSON response
          const clientCheck = await checkClientExists(editedRepair);
          clientId = clientCheck.clientId;
        } else {
          clientId = newClientData.clientId;
        }

        console.log('Client successfully added');
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

      console.log('Car successfully added');
      return null;
    } else {
      const url = '/api/update-repair-details';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          id: selectedRepair?.id,
          brand: editedRepair.brand,
          model: editedRepair.model,
          yearOfProduction: editedRepair.productionDate,
          registrationNumber: editedRepair.registrationNumber,
          vin: editedRepair.vinNumber,
          mileage: editedRepair.mileage,
          engine: editedRepair.engine,
          status: selectedRepair?.status,
          client: {
            clientId: selectedRepair?.client.clientId,
            name: firstName,
            surname: lastName,
            email: editedRepair.email,
            phoneNumber: editedRepair.phone,
          },
        }),
      };
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.log('Repair details saved successfully');
        return null; // No error
      } else {
        const errorText = await response.text();
        throw new Error(
          `Failed to save repair details: ${errorText}`
        );
      }
    }
  } catch (error) {
    console.error('Error saving repair details:', error);
    return 'Wystąpił błąd podczas zapisu. Spróbuj ponownie.';
  }
}

export async function checkClientExists(editedRepair) {
  const token = localStorage.getItem('token');
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
  console.log('Raw response:', clientsResponseText);

  if (!clientsResponse.ok) {
    throw new Error('Failed to fetch clients');
  }

  const clientsData = JSON.parse(clientsResponseText);
  const existingClient = clientsData.clients.find(
    (client) =>
      client.email === editedRepair.email ||
      client.phoneNumber === editedRepair.phone
  );

  return existingClient;
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
