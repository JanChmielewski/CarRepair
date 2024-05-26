// Login.jsx
import React, { useState } from 'react';
import Input from './Input.jsx';
import { hasMinLength } from './validation.js';
import { useInput } from './useInput.js';
import { useNavigate } from 'react-router-dom';
import handleSubmit from './handleSubmit.js';

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  // Setting aliases for inputs
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

  const handleSubmitForm = (event) => {
    handleSubmit(
      event,
      idValue,
      passwordValue,
      idHasError,
      passwordHasError,
      setLoginError,
      navigate
    );
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <h2 className="form-title login-title">Logowanie</h2>
      <div className="control-row">
        <Input
          label="ID pracownika"
          type="text"
          onBlur={handleIdBlur}
          onChange={handleIdChange}
          value={idValue}
          error={idHasError && 'Wprowadź poprawne ID.'}
        />

        <Input
          label="Hasło"
          type="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'Wprowadź poprawne hasło.'}
        />
      </div>
      {loginError && (
        <p className="error-message login-error">{loginError}</p>
      )}{' '}
      {/* Display login error message if exists */}
      <p className="form-actions">
        <button className="button login-btn">Zaloguj</button>
      </p>
    </form>
  );
}
