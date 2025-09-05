import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password || !username) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (email === "example@test.com") {
      setErrorMessage("This email is not available");
      return;
    }

    onRegister(email, password, username);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      switchLinkText="Sign in"
      onSwitchLinkClick={onSwitchToLogin}
    >
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__label" htmlFor="register-email">
          Email
        </label>
        <input
          className="modal__input"
          type="email"
          id="register-email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="modal__label" htmlFor="register-password">
          Password
        </label>
        <input
          className="modal__input"
          type="password"
          id="register-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="modal__label" htmlFor="register-username">
          Username
        </label>
        <input
          className="modal__input"
          type="text"
          id="register-username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {errorMessage && <p className="modal__error-message">{errorMessage}</p>}

        <button
          className="modal__submit-button"
          type="submit"
          disabled={!email || !password || !username}
        >
          Sign up
        </button>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
