async function handleSubmit(
  idValue,
  passwordValue,
  idHasError,
  passwordHasError,
  setLoginError,
  navigate
) {
  try {
    // Prevent page reloading when submitting a form
    event.preventDefault();

    if (idHasError || passwordHasError) {
      return;
    }

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workerCode: idValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
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
