import React from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  children,
  switchLinkText,
  onSwitchLinkClick,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>

      <div className="modal__content">
        {/* Le bouton est maintenant à l'intérieur de modal__content */}
        <button className="modal__close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <h2 className="modal__title">{title}</h2>
        {children}
        {switchLinkText && onSwitchLinkClick && (
          <p className="modal__switch-link">
            or <span onClick={onSwitchLinkClick}>{switchLinkText}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;
