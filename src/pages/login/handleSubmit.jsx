//!!Not used right now, not integrated with back - end yet

async function handleSubmit(
  idValue,
  passwordValue,
  idHasError,
  passwordHasError,
  setLoginError,
  history
) {
  try {
    // Prevent page reloading when submitting a form
    event.preventDefault();

    if (idHasError || passwordHasError) {
      return;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idValue,
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
