import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessRegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Registration successfully completed!"
      onSwitchLinkClick={onSwitchToLogin}
    >
      <p className="modal__success-signin-link">
        {" "}
        <span onClick={onSwitchToLogin}>Sign in</span>
      </p>
    </ModalWithForm>
  );
}

export default SuccessRegisterModal;
