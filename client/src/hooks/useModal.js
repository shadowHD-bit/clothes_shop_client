import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  return {
    showModal,
    handleOpenModal,
    handleCloseModal
  };
};

export default useModal;
