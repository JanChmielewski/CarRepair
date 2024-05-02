import { useRef } from 'react';

export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.taget);
    const data = Object.fromEntries(fd.entries());
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="id">ID pracownika</label>
          <input id="id" type="text" name="id" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button">Login</button>
      </p>
    </form>
  );
}
