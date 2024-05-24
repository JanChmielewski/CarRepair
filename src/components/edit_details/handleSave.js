// handleSave.js

export async function handleSave(
  isNewRepair,
  selectedRepair,
  editedRepair
) {
  try {
    const url = isNewRepair
      ? '/api/add-new-repair'
      : '/api/update-repair-details';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: selectedRepair?.repairID,
        ...editedRepair,
      }),
    };
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      console.log('Repair details saved successfully');
      return null; // No error
    } else {
      throw new Error('Failed to save repair details');
    }
  } catch (error) {
    console.error('Error saving repair details:', error);
    return 'Wystąpił błąd podczas zapisu. Spróbuj ponownie.';
  }
}
