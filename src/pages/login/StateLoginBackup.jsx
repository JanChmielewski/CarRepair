import { useState } from 'react';

export default function Login() {
  const [idIsInvalid, setIdIsInvalid] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
    id: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    id: false,
    password: false,
  });

  const IdIsInvalid = didEdit.id && enteredValues.id.length < 8;

  function handleSubmit(event) {
    // Prevent page reloading when submitting a form
    event.preventDefault();
    // Prevent further code execution if invalid data
    if (IdIsInvalid) {
      setIdIsInvalid(true);
      return;
    }
  }

  function handleInputChange(identifier, value) {
    // Update the state with the new value entered by the user
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    // Reset the input every time the user starts typing again
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  // Confirm if the user started editing the input field
  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="id">ID pracownika</label>
          <input
            id="id"
            type="text"
            name="id"
            onBlur={() => handleInputBlur('id')}
            onChange={(event) =>
              handleInputChange('id', event.target.value)
            }
            value={enteredValues.id}
          />
          <div className="control-error">
            {IdIsInvalid && <p>Wprowadź poprawne ID.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button">Login</button>
      </p>
    </form>
  );
}
