async function handleSubmit(
  idValue,
  passwordValue,
  idHasError,
  passwordHasError,
  setLoginError,
  history
) {
  try {
    event.preventDefault();

    if (idHasError || passwordHasError) {
      return;
    }

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workerCode: idValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
      history.push('/dashboard');
    } else {
      setLoginError('Niepoprawne ID lub hasło.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setLoginError('Wystąpił błąd podczas logowania.');
  }
}
export default handleSubmit;
