import Input from './Input.jsx';
import { hasMinLength } from './validation.js';
import { useInput } from './useInput.js';

export default function Login() {
  // Setting aliases
  const {
    value: idValue,
    handleInputChange: handleIdChange,
    handleInputBlur: handleIdBlur,
    hasError: idHasError,
  } = useInput('', (value) => hasMinLength(value, 6));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    // Prevent page reloading when submitting a form
    event.preventDefault();
    // Don't continue when invalid data
    if (idHasError || passwordHasError) {
      return;
    }
    // !! Temporary solution for easier coding
    window.location.href = '/dashboard';
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logowanie</h2>

      <div className="control-row">
        <Input
          label="ID pracownika"
          id="userId"
          type="text"
          name="userId"
          onBlur={handleIdBlur}
          onChange={handleIdChange}
          value={idValue}
          error={idHasError && 'Wprowadź poprawne ID.'}
        />

        <Input
          label="Hasło"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'Wprowadź poprawne hasło.'}
        />
      </div>

      <p className="form-actions">
        <button className="button">Zaloguj</button>
      </p>
    </form>
  );
}
