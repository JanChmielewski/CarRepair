import { ROUTES } from '../../utils/routes';
import { API_ENDPOINTS } from '../../utils/api/api_endpoints';

async function handleSubmit(
  event,
  idValue,
  passwordValue,
  idHasError,
  passwordHasError,
  setLoginError,
  navigate
) {
  try {
    event.preventDefault();

    if (idHasError || passwordHasError) {
      return;
    }

    const response = await fetch(`${API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workerCode: idValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate(`${ROUTES.DASHBOARD}`);
    } else {
      setLoginError('Niepoprawne ID lub hasło.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setLoginError('Wystąpił błąd podczas logowania.');
  }
}

export default handleSubmit;
