/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./Modal.css";

function Modal({ isVisible, hideModal, children }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        hideModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [hideModal]);

  if (!isVisible) {
    return null;
  }

  return (
    <div onClick={hideModal} className="modal-container">
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        <button onClick={hideModal} className="modal-close">
          X
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
