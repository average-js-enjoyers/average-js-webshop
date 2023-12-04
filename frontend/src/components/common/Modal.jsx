//src/components/common/Modal.jsx

import React, { useState, useEffect } from "react";

function Modal({ isOpen, toggleModal, modalContent }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCloseModal = () => {
    toggleModal();
  };

  useEffect(() => {
    // Function to handle keydown event
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleModal();
      }
    };

    // Add event listener when the modal is open
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Remove event listener when the modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggleModal]);

  return (
    <>
      {isOpen && (
        <div
          className={`modal-overlay ${isHovered ? "overlay-hover" : ""}`}
          onClick={handleCloseModal}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="modal__content">{modalContent}</div>
            <button
              className="modal__close"
              onClick={toggleModal}
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
