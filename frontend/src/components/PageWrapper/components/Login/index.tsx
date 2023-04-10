import { useState } from "react";
import { useSessionContext } from "../../../../contexts/sessionContext";

import "./styles.css";

// create a modal with a form to login containing only email
const Login = () => {
  const [email, setEmail] = useState("");
  const { setUser } = useSessionContext();

  return (
    <div className="login" data-testid="login">
      <div className="login-container">
        <div className="login-container-header">
          <h1 className="login-container-header-title">Login</h1>
        </div>
        <div className="login-container-content">
          <form
            className="login-container-content-form"
            onSubmit={(e) => {
              e.preventDefault();
              setUser(email);
            }}
          >
            <div className="login-container-content-form-field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-container-content-form-field">
              <button type="submit" data-testid="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
