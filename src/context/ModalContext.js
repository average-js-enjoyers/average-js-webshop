//src/context/ModalContext.js

import Modal from "components/common/Modal";
import React, { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const setModalChildren = (content) => {
    setModalContent(content);
  };

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal, setModalChildren }}>
      {children}
      <Modal
        isOpen={isOpen}
        modalContent={modalContent}
        toggleModal={toggleModal}
      />
    </ModalContext.Provider>
  );
};

export default ModalContext;
