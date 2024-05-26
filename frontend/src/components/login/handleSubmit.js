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

    const response = await fetch('http://localhost:8080/api/login', {
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
      navigate('/dashboard');
    } else {
      setLoginError('Niepoprawne ID lub hasło.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setLoginError('Wystąpił błąd podczas logowania.');
  }
}

export default handleSubmit;
