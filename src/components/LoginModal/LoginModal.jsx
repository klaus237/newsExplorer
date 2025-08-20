import React, { useState } from "react";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // Pass email and password to the login handler in App
  };

  if (!isOpen) {
    return null; // Don't render if not open
  }

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>{" "}
      {/* Click outside to close */}
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          &times; {/* 'x' icon for closing */}
        </button>
        <h2 className="modal__title">Sign in</h2>
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="modal__label" htmlFor="password">
            Password
          </label>
          <input
            className="modal__input"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="modal__submit-button" type="submit">
            Sign in
          </button>
        </form>
        <p className="modal__switch-link">
          or <span onClick={onSwitchToRegister}>Sign up</span>{" "}
          {/* Link to switch to register form */}
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
