import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setIsEmailValid(true);
    }
  }, [isOpen]);

  const handleEmailValidation = (e) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    setIsEmailValid(isValid);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    handleEmailValidation(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
    onClose();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      switchLinkText="Sign up"
      onSwitchLinkClick={onSwitchToRegister}
    >
      <form className="modal__form" onSubmit={handleSubmit}>
        <label className="modal__label" htmlFor="email">
          Email
        </label>
        <input
          className="modal__input"
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailValidation}
          required
        />
        {!isEmailValid && email && (
          <span className="modal__error-message">Invalid email address</span>
        )}

        <label className="modal__label" htmlFor="password">
          Password
        </label>
        <input
          className="modal__input"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button
          className="modal__submit-button"
          type="submit"
          disabled={!email || !password || !isEmailValid}
        >
          Sign in
        </button>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
