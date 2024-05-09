// Login.jsx
import React, { useState } from 'react';
import Input from './Input.jsx';
import { hasMinLength } from './validation.js';
import { useInput } from './useInput.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import handleSubmit from './handleSubmit.jsx'; // Import handleSubmit function

export default function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loginError, setLoginError] = useState(null); // Define loginError state

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

  // Handle form submission
  const handleSubmitForm = (event) => {
    event.preventDefault();

    // Call the handleSubmit function with necessary parameters
    handleSubmit(
      idValue,
      passwordValue,
      idHasError,
      passwordHasError,
      setLoginError, // Pass setLoginError to handleSubmit
      navigate // Pass navigate for navigation
    );
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <h2>Logowanie</h2>
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
      {loginError && <p className="error-message">{loginError}</p>}{' '}
      {/* Display login error message if exists */}
      <p className="form-actions">
        <button className="button">Zaloguj</button>
      </p>
    </form>
  );
}
